"use client";

import { useState, useMemo } from "react";

interface CostCalculatorProps {
  isPro?: boolean;
}

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
  hint?: string;
}

function SliderField({ label, value, min, max, step, format, onChange, hint }: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-sm font-bold text-slate-900 bg-slate-100 rounded-md px-2 py-0.5 min-w-[64px] text-center tabular-nums">
          {format(value)}
        </span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute inset-x-0 h-2 rounded-full bg-slate-200" />
        <div
          className="absolute left-0 h-2 rounded-full bg-blue-500 pointer-events-none"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full h-2 appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-blue-500
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-blue-500
            [&::-moz-range-thumb]:shadow-md"
        />
      </div>
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

function formatDollars(n: number): string {
  if (n >= 1000) {
    return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  return "$" + n.toFixed(0);
}

function formatDays(n: number): string {
  if (n < 1) return "less than a day";
  if (n === 1) return "1 day";
  return `${Math.round(n)} days`;
}

interface PricingCardProps {
  label: string;
  amount: number | null;
  customLabel?: string;
  highlight?: boolean;
  savingsBadge?: string;
  breakdown?: string;
}

function PricingCard({ label, amount, customLabel, highlight, savingsBadge, breakdown }: PricingCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        highlight
          ? "border-emerald-300 bg-emerald-50 ring-1 ring-emerald-200"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-semibold uppercase tracking-wide ${highlight ? "text-emerald-600" : "text-slate-400"}`}>
            {label}
          </p>
          {amount !== null ? (
            <p className={`mt-1 text-2xl font-bold tabular-nums ${highlight ? "text-emerald-700" : "text-slate-800"}`}>
              {formatDollars(amount)}
              <span className="text-sm font-normal text-slate-400">/yr</span>
            </p>
          ) : (
            <p className="mt-1 text-xl font-bold text-slate-500">{customLabel ?? "—"}</p>
          )}
          {breakdown && (
            <p className="mt-1 text-xs text-slate-400 leading-snug">{breakdown}</p>
          )}
        </div>
        {savingsBadge && (
          <span className="shrink-0 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white whitespace-nowrap">
            {savingsBadge}
          </span>
        )}
      </div>
    </div>
  );
}

export default function CostCalculator({ isPro = false }: CostCalculatorProps) {
  const [employees, setEmployees] = useState(50);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hoursPerUpdate, setHoursPerUpdate] = useState(1);
  const [updatesPerYear, setUpdatesPerYear] = useState(4);
  const [newHires, setNewHires] = useState(12);
  const [newHireTime, setNewHireTime] = useState(0.5);

  const results = useMemo(() => {
    // Manual cost
    const updateCost = employees * hoursPerUpdate * updatesPerYear * hourlyRate;
    const onboardingCost = newHires * newHireTime * hourlyRate;
    const manualCost = updateCost + onboardingCost;

    // NeatStamp pricing
    let neatstampCost: number | null;
    let neatstampCustom: string | undefined;
    if (employees <= 25) {
      neatstampCost = 348; // $29/mo
    } else if (employees <= 100) {
      neatstampCost = 708; // $59/mo
    } else {
      neatstampCost = null;
      neatstampCustom = "Contact us";
    }

    // Competitor pricing
    const exclaimerCost = employees * 2.5 * 12;
    const codettwoCost = employees * 1.11 * 12;

    // Savings
    const savings =
      neatstampCost !== null ? Math.max(0, manualCost - neatstampCost) : null;

    // ROI: days until NeatStamp pays for itself
    const roiDays =
      neatstampCost !== null && manualCost > 0
        ? (neatstampCost / manualCost) * 365
        : null;

    return {
      manualCost,
      updateCost,
      onboardingCost,
      neatstampCost,
      neatstampCustom,
      exclaimerCost,
      codettwoCost,
      savings,
      roiDays,
    };
  }, [employees, hourlyRate, hoursPerUpdate, updatesPerYear, newHires, newHireTime]);

  const savingsBadge =
    results.savings !== null && results.savings > 0
      ? `Save ${formatDollars(results.savings)}`
      : results.savings === 0
      ? "Break even"
      : undefined;

  return (
    <section className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-8 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 mb-3">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33" />
            </svg>
            Email Signature Cost Calculator
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            What does manual signature management really cost?
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
            Most IT teams underestimate the hidden cost. Enter your numbers and see exactly what you're spending — and how much you'd save.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT: Inputs */}
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-slate-700 border-b border-slate-100 pb-2">
              Your organisation
            </h3>

            <SliderField
              label="Number of employees"
              value={employees}
              min={5}
              max={500}
              step={5}
              format={(v) => v.toLocaleString()}
              onChange={setEmployees}
              hint="People who have an email signature"
            />

            <SliderField
              label="Average IT hourly rate"
              value={hourlyRate}
              min={20}
              max={150}
              step={5}
              format={(v) => `$${v}/hr`}
              onChange={setHourlyRate}
            />

            <h3 className="text-base font-semibold text-slate-700 border-b border-slate-100 pb-2 pt-2">
              Signature updates
            </h3>

            <SliderField
              label="Hours spent per signature update"
              value={hoursPerUpdate}
              min={0.5}
              max={4}
              step={0.5}
              format={(v) => `${v}h`}
              onChange={setHoursPerUpdate}
              hint="Time to update, test and deploy across all employees"
            />

            <SliderField
              label="Number of signature updates per year"
              value={updatesPerYear}
              min={1}
              max={12}
              step={1}
              format={(v) => `${v}×`}
              onChange={setUpdatesPerYear}
              hint="Seasonal banners, rebrands, new phone numbers, etc."
            />

            <h3 className="text-base font-semibold text-slate-700 border-b border-slate-100 pb-2 pt-2">
              New hires
            </h3>

            <SliderField
              label="New hires per year"
              value={newHires}
              min={0}
              max={100}
              step={1}
              format={(v) => `${v}`}
              onChange={setNewHires}
            />

            <SliderField
              label="Time to set up new hire signature"
              value={newHireTime}
              min={0.5}
              max={2}
              step={0.5}
              format={(v) => `${v}h`}
              onChange={setNewHireTime}
              hint="Per person: create, format, send instructions, follow up"
            />
          </div>

          {/* RIGHT: Results */}
          <div className="space-y-4">
            {/* Hero number */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
                You're spending
              </p>
              <p className="text-4xl font-extrabold text-slate-900 tabular-nums">
                {formatDollars(results.manualCost)}
                <span className="text-lg font-normal text-slate-400">/year</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">on manual signature management</p>
              <div className="mt-3 flex justify-center gap-4 text-xs text-slate-400">
                <span>
                  <span className="font-medium text-slate-600">{formatDollars(results.updateCost)}</span> updates
                </span>
                <span className="text-slate-200">|</span>
                <span>
                  <span className="font-medium text-slate-600">{formatDollars(results.onboardingCost)}</span> onboarding
                </span>
              </div>
            </div>

            {/* Comparison cards */}
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide pt-1">
              Compare your options
            </h3>

            <PricingCard
              label="Manual (your current cost)"
              amount={results.manualCost}
              breakdown={`${employees} employees × ${hoursPerUpdate}h × ${updatesPerYear} updates + ${newHires} hires`}
            />

            <PricingCard
              label="NeatStamp"
              amount={results.neatstampCost}
              customLabel={results.neatstampCustom}
              highlight
              savingsBadge={savingsBadge}
              breakdown={
                results.neatstampCost !== null
                  ? employees <= 25
                    ? "$29/mo · up to 25 users"
                    : "$59/mo · up to 100 users"
                  : "Custom pricing for 100+ users"
              }
            />

            <PricingCard
              label="Exclaimer"
              amount={results.exclaimerCost}
              breakdown={`$2.50/user/mo × ${employees} users`}
            />

            <PricingCard
              label="CodeTwo"
              amount={results.codettwoCost}
              breakdown={`$1.11/user/mo × ${employees} users`}
            />

            {/* Savings highlight */}
            {results.savings !== null && results.savings > 0 && (
              <div className="rounded-xl bg-emerald-500 p-4 text-white text-center">
                <p className="text-sm font-medium text-emerald-100">Switch to NeatStamp and save</p>
                <p className="text-3xl font-extrabold tabular-nums mt-0.5">
                  {formatDollars(results.savings)}
                  <span className="text-base font-normal text-emerald-200">/year</span>
                </p>
                {results.roiDays !== null && (
                  <p className="text-xs text-emerald-100 mt-1">
                    NeatStamp pays for itself in{" "}
                    <span className="font-semibold text-white">{formatDays(results.roiDays)}</span>
                  </p>
                )}
              </div>
            )}

            {results.neatstampCost === null && (
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
                <p className="text-sm text-blue-700 font-medium">
                  For teams over 100 employees, we offer custom pricing.
                </p>
                <a
                  href="mailto:hello@neatstamp.com?subject=NeatStamp%20Enterprise%20Pricing"
                  className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:underline"
                >
                  Contact us for a quote →
                </a>
              </div>
            )}

            {/* CTA */}
            <a
              href="/editor"
              className="block w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors text-white text-center font-semibold py-3.5 text-sm shadow-sm"
            >
              Try NeatStamp free — no account needed
            </a>
            <p className="text-center text-xs text-slate-400">
              Set up your whole team in under 10 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
