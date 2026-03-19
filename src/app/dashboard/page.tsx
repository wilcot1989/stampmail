"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { SignatureData, DEFAULT_SIGNATURE_DATA, TemplateName } from "@/lib/types";
import SignatureForm from "@/components/SignatureForm";
import SignaturePreview from "@/components/SignaturePreview";
import TemplateSelector from "@/components/TemplateSelector";

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const upgraded = searchParams.get("upgraded");

  const [signatures, setSignatures] = useState<
    { id: string; name: string; data: SignatureData }[]
  >([]);
  const [activeSignature, setActiveSignature] = useState<number>(0);
  const [data, setData] = useState<SignatureData>(DEFAULT_SIGNATURE_DATA);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    // Load saved signatures from localStorage for now
    // TODO: Load from D1 database when Pro
    const saved = localStorage.getItem("neatstamp_signatures");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSignatures(parsed);
        if (parsed.length > 0) {
          setData(parsed[0].data);
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const saveSignature = () => {
    const newSig = {
      id: Date.now().toString(),
      name: data.fullName ? `${data.fullName}'s Signature` : "My Signature",
      data: { ...data },
    };

    const updated = [...signatures];
    if (signatures[activeSignature]) {
      updated[activeSignature] = {
        ...updated[activeSignature],
        data: { ...data },
      };
    } else {
      updated.push(newSig);
      setActiveSignature(updated.length - 1);
    }

    setSignatures(updated);
    localStorage.setItem("neatstamp_signatures", JSON.stringify(updated));
  };

  const addNewSignature = () => {
    const newSig = {
      id: Date.now().toString(),
      name: "New Signature",
      data: { ...DEFAULT_SIGNATURE_DATA },
    };
    const updated = [...signatures, newSig];
    setSignatures(updated);
    setActiveSignature(updated.length - 1);
    setData(DEFAULT_SIGNATURE_DATA);
    localStorage.setItem("neatstamp_signatures", JSON.stringify(updated));
  };

  const deleteSignature = (index: number) => {
    const updated = signatures.filter((_, i) => i !== index);
    setSignatures(updated);
    if (activeSignature >= updated.length) {
      setActiveSignature(Math.max(0, updated.length - 1));
    }
    if (updated[Math.max(0, updated.length - 1)]) {
      setData(updated[Math.max(0, updated.length - 1)].data);
    } else {
      setData(DEFAULT_SIGNATURE_DATA);
    }
    localStorage.setItem("neatstamp_signatures", JSON.stringify(updated));
  };

  const handleUpgrade = async (variant: "monthly" | "yearly") => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant }),
      });
      const result = await res.json() as { url?: string };
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-muted">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted">
            Welcome, {session.user?.name || session.user?.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt=""
              className="h-8 w-8 rounded-full"
            />
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm text-muted hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Upgrade success banner */}
      {upgraded && (
        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 flex items-center gap-3">
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <p className="text-sm text-green-800 font-medium">
            Welcome to NeatStamp Pro! All premium features are now unlocked.
          </p>
        </div>
      )}

      {/* Signature Tabs */}
      <div className="mb-6">
        <div className="flex items-center gap-2 border-b border-border">
          {signatures.map((sig, i) => (
            <button
              key={sig.id}
              onClick={() => {
                setActiveSignature(i);
                setData(sig.data);
              }}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                i === activeSignature
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {sig.name}
              {signatures.length > 1 && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSignature(i);
                  }}
                  className="text-muted-light hover:text-red-500 ml-1"
                >
                  x
                </span>
              )}
            </button>
          ))}
          <button
            onClick={addNewSignature}
            className="px-3 py-2 text-sm text-muted hover:text-primary"
          >
            + New
          </button>
        </div>
      </div>

      {/* Template Selector */}
      <div className="mb-8">
        <TemplateSelector
          data={data}
          selectedTemplate={data.template}
          onSelect={(t: TemplateName) => setData({ ...data, template: t })}
        />
      </div>

      {/* Editor */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="sticky top-20">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Your Details
              </h2>
              <button
                onClick={saveSignature}
                className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition-colors"
              >
                Save Signature
              </button>
            </div>
            <SignatureForm data={data} onChange={setData} />
          </div>
        </div>
        <div>
          <div className="sticky top-20">
            <SignaturePreview data={data} />
          </div>
        </div>
      </div>

      {/* Upgrade CTA (show if not Pro) */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary to-blue-700 p-8 text-white">
        <h2 className="text-2xl font-bold">Upgrade to Pro</h2>
        <p className="mt-2 text-blue-100">
          Get access to premium templates, Calendly buttons, CTA banners, analytics, and more.
        </p>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleUpgrade("monthly")}
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-gray-100 transition-colors"
          >
            $5/month
          </button>
          <button
            onClick={() => handleUpgrade("yearly")}
            className="rounded-lg bg-white/20 border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/30 transition-colors"
          >
            $39/year (save 35%)
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-muted">Loading...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
