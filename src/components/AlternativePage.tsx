import Link from "next/link";
import { AlternativePageData } from "@/lib/alternativePages";

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function AlternativePage({ page }: { page: AlternativePageData }) {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-700">
            Looking for a {page.competitorName} alternative?
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-3xl mx-auto">
            {page.intro}
          </p>
          <Link
            href="/editor"
            className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
          >
            Try NeatStamp Free — No Account Needed
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Pain Points */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Common {page.competitorName} Problems
          </h2>
          <div className="space-y-4">
            {page.painPoints.map((pain, i) => (
              <div key={i} className="rounded-lg border border-red-100 bg-red-50 p-5">
                <div className="flex items-start gap-3">
                  <XIcon />
                  <div>
                    <h3 className="font-semibold text-foreground">{pain.issue}</h3>
                    <p className="mt-1 text-sm text-muted">{pain.detail}</p>
                    <p className="mt-1 text-xs text-red-400 italic">Source: {pain.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            NeatStamp vs. {page.competitorName}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="py-3 text-left font-medium text-muted">Feature</th>
                  <th className="py-3 text-center font-semibold text-primary">NeatStamp</th>
                  <th className="py-3 text-center font-medium text-muted">{page.competitorName}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {page.comparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-surface" : ""}>
                    <td className="py-3 px-2 text-foreground">{row.feature}</td>
                    <td className="py-3 text-center">
                      {typeof row.us === "boolean" ? (
                        row.us ? <span className="inline-flex justify-center"><CheckIcon /></span> : <span className="inline-flex justify-center"><XIcon /></span>
                      ) : (
                        <span className="font-semibold text-primary">{row.us}</span>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      {typeof row.them === "boolean" ? (
                        row.them ? <span className="inline-flex justify-center"><CheckIcon /></span> : <span className="inline-flex justify-center"><XIcon /></span>
                      ) : (
                        <span className="text-muted">{row.them}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Switch Reasons */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Why Switch from {page.competitorName} to NeatStamp?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {page.switchReasons.map((reason, i) => (
              <div key={i} className="rounded-xl bg-white border border-border p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <CheckIcon />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{reason.title}</h3>
                <p className="mt-2 text-sm text-muted">{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-primary p-10 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to Switch from {page.competitorName}?
          </h2>
          <p className="mt-3 text-blue-100">
            Create your first NeatStamp signature in 60 seconds. Free. No account needed.
          </p>
          <Link
            href="/editor"
            className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
          >
            Try NeatStamp Free
          </Link>
          <p className="mt-4 text-sm text-blue-200">
            No credit card. No signup. No commitment.
          </p>
        </section>
      </div>
    </div>
  );
}
