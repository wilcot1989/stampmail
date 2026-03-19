"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";

function ResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const emailParam = searchParams.get("email");

  // Two modes: request reset (no token) or set new password (with token)
  const hasToken = !!token && !!emailParam;

  const [email, setEmail] = useState(emailParam || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "reset" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request", email }),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset", token, email: emailParam, password }),
      });
      const data = await res.json() as { error?: string; success?: boolean };

      if (res.ok && data.success) {
        setStatus("reset");
      } else {
        setErrorMsg(data.error || "Failed to reset password.");
      }
    } catch {
      setErrorMsg("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <a href="https://neatstamp.com" className="inline-block mb-6">
            <img src="/logo.svg" alt="NeatStamp" className="h-10 mx-auto" />
          </a>
          <h1 className="text-2xl font-bold text-slate-900">
            {hasToken ? "Set a new password" : "Reset your password"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {hasToken ? "Choose a new password for your account." : "Enter your email and we'll send you a reset link."}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        {/* Email sent confirmation */}
        {status === "sent" && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center">
            <svg className="mx-auto h-8 w-8 text-emerald-500 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <h3 className="font-semibold text-emerald-800">Check your email</h3>
            <p className="mt-1 text-sm text-emerald-700">
              If an account exists for <strong>{email}</strong>, we sent a reset link.
            </p>
            <p className="mt-3 text-xs text-emerald-600">
              The link expires in 30 minutes. Check your spam folder too.
            </p>
          </div>
        )}

        {/* Password reset success */}
        {status === "reset" && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center">
            <svg className="mx-auto h-8 w-8 text-emerald-500 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <h3 className="font-semibold text-emerald-800">Password updated</h3>
            <p className="mt-1 text-sm text-emerald-700">
              Your password has been reset. You can now sign in.
            </p>
            <Link
              href="/login"
              className="mt-4 inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Go to sign in
            </Link>
          </div>
        )}

        {/* Request reset form (no token) */}
        {!hasToken && status === "idle" && (
          <form onSubmit={handleRequestReset} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        {/* Set new password form (with token) */}
        {hasToken && status === "idle" && (
          <form onSubmit={handleSetPassword} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password (min 8 characters)"
              required
              minLength={8}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              minLength={8}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Set new password"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    }>
      <ResetForm />
    </Suspense>
  );
}
