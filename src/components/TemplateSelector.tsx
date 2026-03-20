"use client";

import { useState, useMemo } from "react";
import {
  TEMPLATES,
  COLOR_THEMES,
  TEMPLATE_CATEGORIES,
  DEFAULT_SIGNATURE_DATA,
  TemplateName,
  ColorTheme,
} from "@/lib/types";
import { generateHtmlFromBlocks, getPresetForTemplate } from "@/lib/blocks";

interface TemplateSelectorProps {
  selectedTemplate: TemplateName;
  selectedTheme: string;
  isPro: boolean;
  onSelect: (template: TemplateName, theme: ColorTheme) => void;
}

export default function TemplateSelector({
  selectedTemplate,
  selectedTheme,
  isPro,
  onSelect,
}: TemplateSelectorProps) {
  const [activeStyleFilter, setActiveStyleFilter] = useState("all");
  const [activeProfessionFilter, setActiveProfessionFilter] = useState("all");
  const [activeThemeId, setActiveThemeId] = useState(
    () => COLOR_THEMES.find((t) => t.id === selectedTheme)?.id ?? COLOR_THEMES[0].id
  );

  const currentTheme = COLOR_THEMES.find((t) => t.id === activeThemeId) ?? COLOR_THEMES[0];

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const styleOk =
        activeStyleFilter === "all" || t.styleCategory === activeStyleFilter;
      const professionOk =
        activeProfessionFilter === "all" ||
        t.professionCategory === activeProfessionFilter;
      return styleOk && professionOk;
    });
  }, [activeStyleFilter, activeProfessionFilter]);

  function buildPreviewHtml(templateId: TemplateName): string {
    const template = TEMPLATES.find((t) => t.id === templateId);
    const previewData = {
      ...DEFAULT_SIGNATURE_DATA,
      template: templateId,
      primaryColor: currentTheme.primary,
      accentColor: currentTheme.accent,
      fullName: template?.previewName ?? DEFAULT_SIGNATURE_DATA.fullName,
      jobTitle: template?.previewTitle ?? DEFAULT_SIGNATURE_DATA.jobTitle,
      company: template?.previewCompany ?? DEFAULT_SIGNATURE_DATA.company,
      photoUrl: template?.previewPhoto ?? "",
    };
    const preset = getPresetForTemplate(templateId, previewData);
    return generateHtmlFromBlocks(preset.blocks, previewData, preset.wrapperSettings);
  }

  function handleSelect(templateId: TemplateName, templateIsPro: boolean) {
    if (templateIsPro && !isPro) return;
    onSelect(templateId, currentTheme);
  }

  function handleThemeChange(theme: ColorTheme) {
    setActiveThemeId(theme.id);
    // If a template is already selected and it's accessible, re-call onSelect with new theme
    const selected = TEMPLATES.find((t) => t.id === selectedTemplate);
    if (selected && (!selected.isPro || isPro)) {
      onSelect(selectedTemplate, theme);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Color theme picker */}
      <div>
        <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
          Color Theme
        </p>
        <div className="flex flex-wrap gap-2">
          {COLOR_THEMES.map((theme) => {
            const isActive = theme.id === activeThemeId;
            return (
              <button
                key={theme.id}
                title={theme.name}
                onClick={() => handleThemeChange(theme)}
                className="relative flex items-center gap-1.5 rounded-full border-2 px-2.5 py-1 text-xs font-medium transition-all hover:scale-105"
                style={{
                  borderColor: isActive ? theme.swatch : "transparent",
                  backgroundColor: isActive
                    ? `${theme.swatch}18`
                    : "transparent",
                  color: isActive ? theme.swatch : "#64748b",
                }}
              >
                <span
                  className="inline-block rounded-full flex-shrink-0"
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: theme.swatch,
                    boxShadow: isActive
                      ? `0 0 0 2px white, 0 0 0 3px ${theme.swatch}`
                      : "none",
                  }}
                />
                {theme.name}
                {isActive && (
                  <svg
                    className="w-3 h-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 12 12"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 6l3 3 5-5"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Style filter pills */}
      <div>
        <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
          Style
        </p>
        <div className="flex flex-wrap gap-1.5">
          {TEMPLATE_CATEGORIES.style.map((cat) => {
            const isActive = activeStyleFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveStyleFilter(cat.id)}
                className="rounded-full px-3 py-1 text-xs font-medium transition-all"
                style={{
                  backgroundColor: isActive ? "#2563eb" : "#f1f5f9",
                  color: isActive ? "#ffffff" : "#475569",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Profession filter pills */}
      <div>
        <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
          Industry
        </p>
        <div className="flex flex-wrap gap-1.5">
          {TEMPLATE_CATEGORIES.profession.map((cat) => {
            const isActive = activeProfessionFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveProfessionFilter(cat.id)}
                className="rounded-full px-3 py-1 text-xs font-medium transition-all"
                style={{
                  backgroundColor: isActive ? "#2563eb" : "#f1f5f9",
                  color: isActive ? "#ffffff" : "#475569",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Template count */}
      <p className="text-xs text-muted -mb-2">
        {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""}
        {filteredTemplates.length !== TEMPLATES.length
          ? ` of ${TEMPLATES.length}`
          : ""}
      </p>

      {/* Template grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const isLocked = template.isPro && !isPro;
          const previewHtml = buildPreviewHtml(template.id);

          return (
            <button
              key={template.id}
              onClick={() => handleSelect(template.id, template.isPro)}
              className={`group relative rounded-xl border-2 bg-white text-left transition-all duration-150 overflow-hidden ${
                isSelected
                  ? "border-blue-500 shadow-md shadow-blue-100"
                  : isLocked
                  ? "border-slate-200 cursor-not-allowed"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-100 cursor-pointer"
              }`}
              style={{ opacity: isLocked ? 0.65 : 1 }}
              title={template.name}
            >
              {/* PRO badge */}
              {template.isPro && !isPro && (
                <span className="absolute top-2 right-2 z-10 flex items-center gap-0.5 rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  PRO
                </span>
              )}

              {/* Selected checkmark */}
              {isSelected && (
                <span className="absolute top-2 right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 shadow-sm">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 12 12"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 6l3 3 5-5"
                    />
                  </svg>
                </span>
              )}

              {/* Signature preview */}
              <div
                className="relative bg-white overflow-hidden"
                style={{ height: 88 }}
              >
                <div
                  className="absolute top-3 left-3 pointer-events-none select-none"
                  style={{
                    transform: "scale(0.32)",
                    transformOrigin: "top left",
                    width: "290%",
                  }}
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
                {/* Fade-out gradient at bottom of preview */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))",
                  }}
                />
              </div>

              {/* Card footer */}
              <div
                className={`px-3 pb-3 pt-1.5 border-t ${
                  isSelected ? "border-blue-100 bg-blue-50/40" : "border-slate-100"
                }`}
              >
                <p className="text-xs font-semibold text-foreground leading-tight">
                  {template.name}
                </p>
                <p className="text-[10px] text-muted leading-tight mt-0.5 line-clamp-1">
                  {template.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredTemplates.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-12 text-center text-muted">
          <svg
            className="w-10 h-10 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm font-medium">No templates match these filters</p>
          <button
            onClick={() => {
              setActiveStyleFilter("all");
              setActiveProfessionFilter("all");
            }}
            className="text-xs text-blue-500 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
