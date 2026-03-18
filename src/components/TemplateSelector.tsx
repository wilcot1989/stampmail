"use client";

import { SignatureData, TemplateName, TEMPLATES } from "@/lib/types";
import { generateSignatureHtml } from "@/lib/generateSignature";

interface TemplateSelectorProps {
  data: SignatureData;
  selectedTemplate: TemplateName;
  onSelect: (template: TemplateName) => void;
}

export default function TemplateSelector({
  data,
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground mb-3">
        Choose a Template
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TEMPLATES.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const previewData = { ...data, template: template.id as TemplateName };
          const previewHtml = generateSignatureHtml(previewData);

          return (
            <button
              key={template.id}
              onClick={() => !template.isPro && onSelect(template.id)}
              className={`relative rounded-lg border-2 p-3 text-left transition-all ${
                isSelected
                  ? "border-primary bg-blue-50"
                  : template.isPro
                    ? "border-border bg-gray-50 opacity-60"
                    : "border-border bg-white hover:border-primary-light"
              }`}
            >
              {template.isPro && (
                <span className="absolute -top-2 -right-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">
                  PRO
                </span>
              )}
              <div
                className="mb-2 max-h-20 overflow-hidden pointer-events-none"
                style={{ transform: "scale(0.35)", transformOrigin: "top left", width: "280%", height: "57px" }}
              >
                <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
              </div>
              <p className="text-xs font-semibold text-foreground">
                {template.name}
              </p>
              <p className="text-[10px] text-muted">{template.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
