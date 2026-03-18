"use client";

import Link from "next/link";
import { TEMPLATES, DEFAULT_SIGNATURE_DATA, SignatureData } from "@/lib/types";
import { generateSignatureHtml } from "@/lib/generateSignature";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Email Signature Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from 8 professionally designed templates. All templates are
            free — no account required. Pick one, customize it, and copy it to
            your email client in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {TEMPLATES.map((template) => {
            const previewData: SignatureData = {
              ...DEFAULT_SIGNATURE_DATA,
              template: template.id,
            };
            const html = generateSignatureHtml(previewData);

            return (
              <div
                key={template.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {template.name}
                    </h2>
                    {template.isPro && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                        Pro
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </div>

                <div className="p-6 bg-gray-50 overflow-x-auto">
                  <div
                    className="signature-preview"
                    dangerouslySetInnerHTML={{ __html: html }}
                    style={{ transform: "scale(0.85)", transformOrigin: "top left", minHeight: "120px" }}
                  />
                </div>

                <div className="px-6 py-4">
                  <Link
                    href="/editor"
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Use {template.name} Template
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center bg-white rounded-2xl border border-gray-200 p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            All templates are free
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Every template works in Gmail, Outlook, Apple Mail, Yahoo Mail, and
            all major email clients. No watermarks. No account required. Just
            copy and paste.
          </p>
          <Link
            href="/editor"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create My Signature — It&apos;s Free
          </Link>
        </div>
      </div>
    </div>
  );
}
