import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | NeatStamp",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <Link href="https://neatstamp.com" className="inline-block mb-8">
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Neat<span className="text-blue-600">Stamp</span>
          </span>
        </Link>

        {/* 404 indicator */}
        <p className="text-7xl font-black text-slate-200 leading-none mb-4 select-none">
          404
        </p>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          Page not found
        </h1>

        {/* Description */}
        <p className="text-slate-500 mb-10 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="https://neatstamp.com"
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Go to homepage
          </Link>
          <Link
            href="https://app.neatstamp.com/editor"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create a signature
          </Link>
        </div>
      </div>
    </div>
  );
}
