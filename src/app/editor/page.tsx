"use client";

import { useState } from "react";
import { SignatureData, TemplateName, DEFAULT_SIGNATURE_DATA } from "@/lib/types";
import SignatureForm from "@/components/SignatureForm";
import SignaturePreview from "@/components/SignaturePreview";
import TemplateSelector from "@/components/TemplateSelector";

export default function EditorPage() {
  const [data, setData] = useState<SignatureData>(DEFAULT_SIGNATURE_DATA);

  const handleTemplateSelect = (template: TemplateName) => {
    setData({ ...data, template });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Create Your Email Signature
        </h1>
        <p className="mt-2 text-muted">
          Free. No account needed. Works in Gmail, Outlook, Apple Mail & more.
        </p>
      </div>

      <div className="mb-8">
        <TemplateSelector
          data={data}
          selectedTemplate={data.template}
          onSelect={handleTemplateSelect}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="sticky top-20">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Your Details
            </h2>
            <SignatureForm data={data} onChange={setData} />
          </div>
        </div>
        <div>
          <div className="sticky top-20">
            <SignaturePreview data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
