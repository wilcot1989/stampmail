"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const error = searchParams.get("error");

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setMessage("");

    if (mode === "register") {
      // Register first, then sign in
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name: name || undefined }),
        });
        const data = await res.json() as { error?: string; success?: boolean };

        if (!res.ok) {
          setMessage(data.error || "Registration failed");
          setLoading(false);
          return;
        }
      } catch {
        setMessage("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    }

    // Sign in
    const result = await signIn("credentials", {
      email: email.toLowerCase().trim(),
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setMessage(mode === "register" ? "Account created! But sign-in failed. Try logging in." : "Invalid email or password.");
      setLoading(false);
    } else if (result?.url) {
      window.location.href = result.url;
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <a href="https://neatstamp.com" className="inline-block mb-6">
            <img src="/logo.svg" alt="NeatStamp" className="h-10 mx-auto" />
          </a>
          <h1 className="text-2xl font-bold text-slate-900">
            {mode === "register" ? "Create your account" : "Sign in to NeatStamp"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Save your signatures, access Pro features, manage your subscription.
          </p>
        </div>

        {/* Why sign in */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Why sign in?</h2>
          <ul className="space-y-2">
            {[
              "Save your signatures to the cloud",
              "Access from any device",
              "Create multiple signatures",
              "Get Pro templates & analytics",
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-sm text-slate-600">
                <svg className="h-4 w-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {(error || message) && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {message || (error === "CredentialsSignin" ? "Invalid email or password." : "Something went wrong. Please try again.")}
          </div>
        )}

        {/* Google */}
        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-base font-semibold text-slate-900 hover:bg-slate-50 transition-colors shadow-sm hover:shadow-md"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 border-t border-slate-200"></div>
          <span className="text-xs text-slate-400">or use email</span>
          <div className="flex-1 border-t border-slate-200"></div>
        </div>

        {/* Email + Password form */}
        <form onSubmit={handleEmailPassword} className="space-y-3">
          {mode === "register" && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name (optional)"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "register" ? "Create a password (min 8 characters)" : "Password"}
            required
            minLength={8}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "register" ? "Create account" : "Sign in"}
          </button>
        </form>

        {/* Forgot password */}
        {mode === "login" && (
          <p className="mt-2 text-center">
            <Link href="/auth/reset-password" className="text-sm text-slate-400 hover:text-blue-600 transition-colors">
              Forgot your password?
            </Link>
          </p>
        )}

        {/* Toggle login/register */}
        <p className="mt-4 text-center text-sm text-slate-500">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button onClick={() => { setMode("register"); setMessage(""); }} className="text-blue-600 font-medium hover:underline">
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => { setMode("login"); setMessage(""); }} className="text-blue-600 font-medium hover:underline">
                Sign in
              </button>
            </>
          )}
        </p>

        <p className="mt-6 text-center text-xs text-slate-400">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">Terms</Link> and{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
        </p>

        {/* Free editor escape */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-center">
          <p className="text-sm font-medium text-slate-900">Just want a quick signature?</p>
          <p className="mt-0.5 text-xs text-slate-500">No sign-in needed.</p>
          <Link
            href="/editor"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
          >
            Go to the free editor
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
