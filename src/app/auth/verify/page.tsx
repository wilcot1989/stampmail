"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");

  useEffect(() => {
    if (!token || !email) {
      setStatus("error");
      return;
    }

    // Sign in via the Credentials provider with the magic link token
    signIn("magic-link", {
      email,
      token,
      callbackUrl: "/dashboard",
      redirect: true,
    }).catch(() => {
      setStatus("error");
    });
  }, [token, email]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="w-full max-w-sm px-4 text-center">
        <a href="https://neatstamp.com" className="inline-block mb-8">
          <img src="/logo.svg" alt="NeatStamp" className="h-10 mx-auto" />
        </a>

        {status === "verifying" && (
          <>
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            <h1 className="text-xl font-bold text-slate-900">Signing you in...</h1>
            <p className="mt-2 text-sm text-slate-500">Please wait while we verify your magic link.</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900">Link expired or invalid</h1>
            <p className="mt-2 text-sm text-slate-500">
              This magic link may have expired or already been used.
              Magic links are valid for 15 minutes.
            </p>
            <a
              href="/login"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Request a new link
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
