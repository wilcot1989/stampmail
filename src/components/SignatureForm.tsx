"use client";

import { SignatureData } from "@/lib/types";

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

function FormSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group">
      <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-surface px-4 py-3 text-sm font-semibold text-foreground hover:bg-gray-100 transition-colors">
        {title}
        <svg
          className="h-4 w-4 text-muted transition-transform group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </summary>
      <div className="mt-3 space-y-3 px-1">{children}</div>
    </details>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-8 cursor-pointer rounded border border-border"
      />
      <div>
        <label className="block text-xs font-medium text-muted">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 rounded border border-border bg-white px-2 py-1 text-xs text-foreground focus:border-primary focus:outline-none"
        />
      </div>
    </div>
  );
}

export default function SignatureForm({ data, onChange }: SignatureFormProps) {
  const update = (field: keyof SignatureData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 200;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        update("photoUrl", dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <FormSection title="Personal Information">
        <InputField
          label="Full Name"
          value={data.fullName}
          onChange={(v) => update("fullName", v)}
          placeholder="John Doe"
        />
        <InputField
          label="Job Title"
          value={data.jobTitle}
          onChange={(v) => update("jobTitle", v)}
          placeholder="Marketing Manager"
        />
        <InputField
          label="Company"
          value={data.company}
          onChange={(v) => update("company", v)}
          placeholder="Acme Corp"
        />
        <InputField
          label="Pronouns"
          value={data.pronouns}
          onChange={(v) => update("pronouns", v)}
          placeholder="he/him, she/her, they/them"
        />
      </FormSection>

      <FormSection title="Contact Details">
        <InputField
          label="Email"
          value={data.email}
          onChange={(v) => update("email", v)}
          placeholder="john@company.com"
          type="email"
        />
        <InputField
          label="Phone"
          value={data.phone}
          onChange={(v) => update("phone", v)}
          placeholder="+1 (555) 123-4567"
          type="tel"
        />
        <InputField
          label="Website"
          value={data.website}
          onChange={(v) => update("website", v)}
          placeholder="www.company.com"
        />
        <InputField
          label="Address"
          value={data.address}
          onChange={(v) => update("address", v)}
          placeholder="123 Main St, New York, NY"
        />
      </FormSection>

      <FormSection title="Photo" defaultOpen={false}>
        <div>
          <label className="block text-xs font-medium text-muted mb-2">
            Profile Photo or Logo
          </label>
          {data.photoUrl ? (
            <div className="flex items-center gap-3">
              <img
                src={data.photoUrl}
                alt="Preview"
                className="h-16 w-16 rounded-full object-cover border border-border"
              />
              <button
                onClick={() => update("photoUrl", "")}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface px-4 py-6 text-sm text-muted hover:border-primary hover:text-primary transition-colors">
              <span>Click to upload (max 2MB)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          )}
          <p className="mt-1 text-xs text-muted-light">
            Or paste an image URL:
          </p>
          <input
            type="text"
            value={data.photoUrl.startsWith("data:") ? "" : data.photoUrl}
            onChange={(e) => update("photoUrl", e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </FormSection>

      <FormSection title="Social Media" defaultOpen={false}>
        <InputField
          label="LinkedIn"
          value={data.linkedin}
          onChange={(v) => update("linkedin", v)}
          placeholder="https://linkedin.com/in/username"
        />
        <InputField
          label="X (Twitter)"
          value={data.twitter}
          onChange={(v) => update("twitter", v)}
          placeholder="https://x.com/username"
        />
        <InputField
          label="Instagram"
          value={data.instagram}
          onChange={(v) => update("instagram", v)}
          placeholder="https://instagram.com/username"
        />
        <InputField
          label="Facebook"
          value={data.facebook}
          onChange={(v) => update("facebook", v)}
          placeholder="https://facebook.com/username"
        />
        <InputField
          label="GitHub"
          value={data.github}
          onChange={(v) => update("github", v)}
          placeholder="https://github.com/username"
        />
        <InputField
          label="YouTube"
          value={data.youtube}
          onChange={(v) => update("youtube", v)}
          placeholder="https://youtube.com/@channel"
        />
      </FormSection>

      <FormSection title="Styling">
        <div className="flex gap-6">
          <ColorField
            label="Primary Color"
            value={data.primaryColor}
            onChange={(v) => update("primaryColor", v)}
          />
          <ColorField
            label="Accent Color"
            value={data.accentColor}
            onChange={(v) => update("accentColor", v)}
          />
        </div>
      </FormSection>

      <FormSection title="Extras" defaultOpen={false}>
        <InputField
          label="Calendly / Booking URL"
          value={data.calendlyUrl}
          onChange={(v) => update("calendlyUrl", v)}
          placeholder="https://calendly.com/yourname"
        />
        <InputField
          label="CTA Banner Image URL"
          value={data.ctaBannerUrl}
          onChange={(v) => update("ctaBannerUrl", v)}
          placeholder="https://example.com/banner.png"
        />
        {data.ctaBannerUrl && (
          <InputField
            label="CTA Banner Link"
            value={data.ctaBannerLink}
            onChange={(v) => update("ctaBannerLink", v)}
            placeholder="https://example.com/promo"
          />
        )}
      </FormSection>
    </div>
  );
}
