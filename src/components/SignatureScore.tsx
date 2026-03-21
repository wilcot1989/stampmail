"use client";

import { SignatureData } from "@/lib/types";

interface SignatureScoreProps {
  data: SignatureData;
}

interface ScoreItem {
  label: string;
  points: number;
  met: boolean;
  tip: string;
}

function calculateScore(data: SignatureData): { score: number; items: ScoreItem[]; grade: string; color: string } {
  const items: ScoreItem[] = [
    {
      label: "Full name",
      points: 10,
      met: data.fullName.trim().length > 2,
      tip: "Add your full name",
    },
    {
      label: "Job title",
      points: 10,
      met: data.jobTitle.trim().length > 0,
      tip: "Add your job title — recipients are 22% more likely to reply",
    },
    {
      label: "Company name",
      points: 8,
      met: data.company.trim().length > 0,
      tip: "Add your company for instant credibility",
    },
    {
      label: "Email address",
      points: 10,
      met: data.email.trim().length > 0 && data.email.includes("@"),
      tip: "Add your email — the most essential contact method",
    },
    {
      label: "Phone number",
      points: 10,
      met: data.phone.trim().length > 0,
      tip: "Add your phone number — increases response rate by 15%",
    },
    {
      label: "Website",
      points: 8,
      met: data.website.trim().length > 0,
      tip: "Link to your website to drive traffic",
    },
    {
      label: "Profile photo",
      points: 15,
      met: data.photoUrl.length > 0,
      tip: "Add a photo — signatures with photos get 32% more engagement",
    },
    {
      label: "Social media (1+)",
      points: 8,
      met: !!(data.linkedin || data.twitter || data.instagram || data.facebook || data.github || data.youtube),
      tip: "Add at least one social link to expand your network",
    },
    {
      label: "Social media (2+)",
      points: 5,
      met: [data.linkedin, data.twitter, data.instagram, data.facebook, data.github, data.youtube].filter(Boolean).length >= 2,
      tip: "Add a second social link for more visibility",
    },
    {
      label: "Professional template",
      points: 6,
      met: data.template !== "minimal" && data.template !== "simple" && data.template !== "compact",
      tip: "Try a professional template — first impressions matter",
    },
    {
      label: "CTA / Booking link",
      points: 5,
      met: data.calendlyUrl.trim().length > 0,
      tip: "Add a booking link to generate meetings directly from emails",
    },
    {
      label: "Address",
      points: 5,
      met: data.address.trim().length > 0,
      tip: "Add your address for local credibility",
    },
  ];

  const score = items.reduce((sum, item) => sum + (item.met ? item.points : 0), 0);
  const maxScore = items.reduce((sum, item) => sum + item.points, 0);
  const normalized = Math.round((score / maxScore) * 100);

  let grade: string;
  let color: string;
  if (normalized >= 90) { grade = "Excellent"; color = "#16a34a"; }
  else if (normalized >= 75) { grade = "Great"; color = "#2563eb"; }
  else if (normalized >= 55) { grade = "Good"; color = "#f59e0b"; }
  else if (normalized >= 35) { grade = "Fair"; color = "#ea580c"; }
  else { grade = "Needs work"; color = "#dc2626"; }

  return { score: normalized, items, grade, color };
}

// Circular progress ring
function ScoreRing({ score, color }: { score: number; color: string }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="100" height="100" className="-rotate-90">
        <circle cx="50" cy="50" r={radius} stroke="#e5e7eb" strokeWidth="6" fill="none" />
        <circle
          cx="50" cy="50" r={radius}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>{score}</span>
        <span className="text-[9px] text-slate-400 uppercase tracking-wider">/ 100</span>
      </div>
    </div>
  );
}

export default function SignatureScore({ data }: SignatureScoreProps) {
  const { score, items, grade, color } = calculateScore(data);
  const unmet = items.filter((i) => !i.met);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <ScoreRing score={score} color={color} />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-800">Signature Score</h3>
          <p className="text-xs mt-0.5" style={{ color }}>{grade}</p>
          {unmet.length > 0 && (
            <div className="mt-2 space-y-1">
              {unmet.slice(0, 3).map((item) => (
                <div key={item.label} className="flex items-start gap-1.5">
                  <svg className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <span className="text-[11px] text-slate-600 leading-tight">{item.tip}</span>
                </div>
              ))}
              {unmet.length > 3 && (
                <p className="text-[10px] text-slate-400 pl-5">+{unmet.length - 3} more improvements available</p>
              )}
            </div>
          )}
          {unmet.length === 0 && (
            <p className="text-xs text-emerald-600 mt-1">Perfect! Your signature is fully optimized.</p>
          )}
        </div>
      </div>
    </div>
  );
}
