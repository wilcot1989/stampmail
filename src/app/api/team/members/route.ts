import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// GET — list team members
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    const user = await db.prepare("SELECT id, plan FROM users WHERE email = ?")
      .bind(session.user.email).first<{ id: string; plan: string }>();

    if (!user || user.plan !== "team") {
      return NextResponse.json({ error: "Team plan required" }, { status: 403 });
    }

    // Get or create team
    let team = await db.prepare("SELECT id FROM teams WHERE owner_id = ? LIMIT 1")
      .bind(user.id).first<{ id: string }>();

    if (!team) {
      const teamId = crypto.randomUUID();
      await db.prepare("INSERT INTO teams (id, name, owner_id) VALUES (?, ?, ?)")
        .bind(teamId, "My Team", user.id).run();
      team = { id: teamId };
    }

    const result = await db.prepare(
      "SELECT * FROM team_members WHERE team_id = ? ORDER BY name ASC"
    ).bind(team.id).all();

    return NextResponse.json({ members: result.results, teamId: team.id });
  } catch (err) {
    console.error("Team members error:", err);
    return NextResponse.json({ members: [], error: String(err) });
  }
}

// POST — add team member(s)
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    const user = await db.prepare("SELECT id, plan FROM users WHERE email = ?")
      .bind(session.user.email).first<{ id: string; plan: string }>();

    if (!user || user.plan !== "team") {
      return NextResponse.json({ error: "Team plan required" }, { status: 403 });
    }

    let team = await db.prepare("SELECT id, max_members FROM teams WHERE owner_id = ? LIMIT 1")
      .bind(user.id).first<{ id: string; max_members: number }>();

    if (!team) {
      const teamId = crypto.randomUUID();
      await db.prepare("INSERT INTO teams (id, name, owner_id) VALUES (?, ?, ?)")
        .bind(teamId, "My Team", user.id).run();
      team = { id: teamId, max_members: 25 };
    }

    const body = await request.json() as {
      members?: Array<{ email: string; name: string; job_title?: string; department?: string; phone?: string }>;
      email?: string;
      name?: string;
      job_title?: string;
      department?: string;
      phone?: string;
    };

    // Single member or bulk
    const members = body.members || [{ email: body.email!, name: body.name!, job_title: body.job_title, department: body.department, phone: body.phone }];

    if (!members.length || !members[0]?.email) {
      return NextResponse.json({ error: "At least one member email required" }, { status: 400 });
    }

    // Check limit
    const current = await db.prepare("SELECT COUNT(*) as cnt FROM team_members WHERE team_id = ?")
      .bind(team.id).first<{ cnt: number }>();
    if (current && current.cnt + members.length > (team.max_members || 25)) {
      return NextResponse.json({ error: `Team limit is ${team.max_members || 25} members` }, { status: 400 });
    }

    let added = 0;
    for (const m of members) {
      if (!m.email) continue;

      // Skip if already in team
      const exists = await db.prepare("SELECT id FROM team_members WHERE team_id = ? AND email = ?")
        .bind(team.id, m.email).first();
      if (exists) continue;

      await db.prepare(
        "INSERT INTO team_members (id, team_id, email, name, job_title, department, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')"
      ).bind(crypto.randomUUID(), team.id, m.email, m.name || "", m.job_title || "", m.department || "", m.phone || "").run();
      added++;
    }

    return NextResponse.json({ success: true, added, total: (current?.cnt || 0) + added });
  } catch (err) {
    console.error("Add team member error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// DELETE — remove team member
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const memberId = searchParams.get("id");
  if (!memberId) {
    return NextResponse.json({ error: "Member ID required" }, { status: 400 });
  }

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    const user = await db.prepare("SELECT id FROM users WHERE email = ?")
      .bind(session.user.email).first<{ id: string }>();
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const team = await db.prepare("SELECT id FROM teams WHERE owner_id = ?")
      .bind(user.id).first<{ id: string }>();
    if (!team) return NextResponse.json({ error: "No team found" }, { status: 404 });

    await db.prepare("DELETE FROM team_members WHERE id = ? AND team_id = ?")
      .bind(memberId, team.id).run();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete team member error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
