import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook Signature for Multiple Accounts: Full Guide",
  description:
    "Manage outlook signature multiple accounts: set a different signature for each. Works in Classic Outlook, New Outlook, OWA, and mobile.",
  alternates: {
    canonical: "https://neatstamp.com/blog/outlook-signature-multiple-accounts",
  },
};

const faqs = [
  {
    q: "Can I have a different signature for each Outlook account?",
    a: "In Classic Outlook (the traditional desktop app), yes — you can create unlimited signatures and assign a default for new emails and replies separately for each account. In New Outlook and OWA as of 2026, you're limited to one signature per account, but you can manually switch signatures when composing an email. Outlook mobile does not support per-account signatures at all.",
  },
  {
    q: "How do I assign a signature to a specific account in Classic Outlook?",
    a: "Go to File > Options > Mail > Signatures. In the 'Choose default signature' section, use the 'E-mail account' dropdown to select the account you want to configure. Then pick a signature for 'New messages' and a separate one for 'Replies/forwards'. Repeat for each account. Classic Outlook saves these assignments automatically.",
  },
  {
    q: "Why can't I see all my accounts in the New Outlook signature settings?",
    a: "New Outlook (the web-based version rolling out since 2024) handles signatures differently from Classic Outlook. As of 2026, it supports one signature per account, and the signature settings are found under Settings > Accounts > Signatures. If you only see one account, make sure the account is fully added and connected in New Outlook, not just visible in the left panel.",
  },
  {
    q: "Does Outlook automatically use the right signature when I change the From address?",
    a: "In Classic Outlook, yes — when you change the From field to a different account in a new email, Outlook inserts the default signature for that account automatically (if you've assigned one). In New Outlook, this behavior is inconsistent as of early 2026. You may need to switch the signature manually via the signature menu in the compose toolbar.",
  },
  {
    q: "Can I have different signatures for new emails vs. replies in the same account?",
    a: "In Classic Outlook, yes. When you set up signatures under File > Options > Mail > Signatures, there are separate dropdowns for 'New messages' and 'Replies/forwards' for each account. Many people use a full professional signature for new emails and a shorter one (just their name and phone) for replies. New Outlook currently only lets you set one default signature per account.",
  },
  {
    q: "How do I switch signatures manually in New Outlook?",
    a: "When composing an email in New Outlook, look for the signature icon in the compose toolbar at the bottom of the compose window (it looks like a pen on a line). Click it to see all your saved signatures and pick the one you want. The signature will replace whatever is currently inserted. This is the main workaround for New Outlook's one-per-account limitation.",
  },
  {
    q: "Does Outlook mobile support different signatures per account?",
    a: "No. As of 2026, the Outlook mobile app (iOS and Android) supports only one signature total — not per account, not per folder. You find it under Settings > your account name > Signature. If you manage multiple accounts on mobile, you'll need to manually edit the signature text before sending from a different account, or accept a generic signature that works across all of them.",
  },
  {
    q: "What's the easiest way to manage multiple different signatures across accounts?",
    a: "Build each signature in NeatStamp, save them, and copy the HTML into the right Outlook account. NeatStamp's free editor lets you create and store multiple signature designs — one for your work account, one for your personal business, one for a side project. When you need to update one, change it in NeatStamp, copy the new HTML, and paste it into Outlook. No sync issues, no limits.",
  },
];

export default function OutlookSignatureMultipleAccountsPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Outlook Signature Multiple Accounts",
            url: "https://neatstamp.com/blog/outlook-signature-multiple-accounts",
          },
        ]}
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-slate-700 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-700">Outlook Signature Multiple Accounts</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  How-To
                </span>
                <span className="text-sm text-slate-400">10 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Outlook Signature for Multiple Accounts: How to Set Different Signatures
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                You have a work account and a personal account in Outlook. Or maybe two
                business accounts — one for your main company, one for a side project. You
                want a different signature for each. Classic Outlook makes this straightforward.
                New Outlook is a different story. This guide covers every version, with exact
                steps and workarounds where the steps fall short.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 10 min read
              </p>
            </header>

            {/* Quick nav */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-bold text-amber-900 mb-3">
                Jump to the section you need
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  ["#how-classic-outlook-handles-multiple-signatures", "How Classic Outlook handles multiple signatures"],
                  ["#how-new-outlook-handles-them", "How New Outlook handles them (2026)"],
                  ["#classic-outlook-step-by-step", "Step-by-step: Classic Outlook"],
                  ["#new-outlook-step-by-step", "Step-by-step: New Outlook (and the workaround)"],
                  ["#owa-step-by-step", "Step-by-step: OWA (Outlook Web Access)"],
                  ["#outlook-mobile", "Outlook Mobile: what's possible"],
                  ["#workarounds", "Workarounds for New Outlook's limits"],
                  ["#neatstamp", "NeatStamp: manage multiple signatures without the friction"],
                  ["#related-guides", "Related guides"],
                  ["#faq", "Frequently asked questions"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-amber-800 hover:text-amber-900 hover:underline font-medium"
                    >
                      &rarr; {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 1: How Classic Outlook handles multiple signatures */}
            <section id="how-classic-outlook-handles-multiple-signatures" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How Classic Outlook handles multiple signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Classic Outlook — the traditional Windows desktop application (Outlook 2016,
                2019, 2021, and the &ldquo;classic&rdquo; version of Microsoft 365 Outlook) — has
                the best multi-account signature support of any Outlook version. Here&rsquo;s
                how it works.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                You can create an unlimited number of named signatures. Each signature is
                stored as a set of three files in your local{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  %APPDATA%\Microsoft\Signatures
                </code>{" "}
                folder — one HTML file, one RTF file, and one plain text file. The names
                are up to you. &ldquo;Work&rdquo;, &ldquo;Personal&rdquo;, &ldquo;Newsletter&rdquo; — whatever makes sense.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The key feature is the assignment system. For each email account you have
                connected, you can choose a default signature for new emails and a separate
                default signature for replies and forwards. So your work account can
                automatically insert your full branded signature in new emails but drop
                down to a shorter reply-only signature when you respond to threads. Your
                personal account can use a completely different signature.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                When you start a new email in Classic Outlook, it checks which account you&rsquo;re
                sending from and inserts the assigned signature automatically. If you change
                the &ldquo;From&rdquo; account in the compose window, Outlook swaps the signature for
                you. This is the behavior most people expect — and it works exactly as
                advertised in Classic Outlook.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-green-900 mb-2">Classic Outlook summary</p>
                <ul className="space-y-1.5 text-sm text-green-800">
                  {[
                    "Unlimited signatures — name them whatever you want",
                    "Assign a default per account, separately for new emails and replies",
                    "Outlook auto-swaps the signature when you change the From address",
                    "Signatures stored locally — no cloud sync needed",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-slate-600 leading-relaxed">
                For a full setup guide for Classic Outlook, see the{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook signature setup guide
                </Link>
                . If you&rsquo;re on Microsoft 365 specifically, the{" "}
                <Link href="/email-signature-outlook-365" className="text-blue-600 hover:underline">
                  Outlook 365 signature guide
                </Link>{" "}
                has version-specific instructions.
              </p>
            </section>

            {/* Section 2: How New Outlook handles them */}
            <section id="how-new-outlook-handles-them" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How New Outlook handles multiple signatures (2026)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                New Outlook is the web-based version that Microsoft has been rolling out
                since 2024 as a replacement for Classic Outlook. If you&rsquo;ve seen the
                toggle in Classic Outlook that says &ldquo;Try the new Outlook&rdquo; — that&rsquo;s the
                one. As of early 2026, it&rsquo;s still missing several features that power
                users depend on. Multi-account signature assignment is one of them.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                New Outlook does allow you to create multiple signatures and it stores them
                per account using Microsoft&rsquo;s roaming signatures system (signatures saved
                in Exchange Online rather than on your local machine). But the assignment
                logic is more limited: you get one default signature per account for new
                messages, and that same signature is also used for replies. There&rsquo;s no
                separate &ldquo;reply signature&rdquo; assignment.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                You can still create multiple signatures and manually switch between them
                when composing. But there&rsquo;s no automatic swap when you change the From
                address — you have to insert the correct one yourself. For people who
                regularly send from multiple accounts, this adds a step every time.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-amber-900 mb-2">Microsoft is still changing this</p>
                <p className="text-sm text-amber-800 leading-relaxed">
                  New Outlook&rsquo;s feature set is actively evolving. Microsoft releases updates
                  frequently, and signature behavior may have changed since this was written
                  in March 2026. If you&rsquo;re reading this later, check the current New Outlook
                  release notes to see if per-account reply signature assignment has been added.
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                For context on why New Outlook&rsquo;s signature system behaves the way it does,
                the{" "}
                <Link href="/blog/outlook-roaming-signatures" className="text-blue-600 hover:underline">
                  Outlook roaming signatures guide
                </Link>{" "}
                explains how cloud-based signature storage works and what its limitations are.
              </p>
            </section>

            {/* Section 3: Classic Outlook step-by-step */}
            <section id="classic-outlook-step-by-step" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Step-by-step: Classic Outlook
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                This example walks through setting up three different signatures and
                assigning each to a different account. Adjust the number of accounts
                and signatures to match your setup.
              </p>

              <div className="space-y-5">
                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Open the Signatures editor
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        In Classic Outlook, go to <strong>File &gt; Options &gt; Mail</strong>.
                        In the &ldquo;Compose messages&rdquo; section, click <strong>Signatures…</strong>
                        This opens the Signatures and Stationery dialog. Keep this window open
                        for the next steps.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Create your first signature
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-2">
                        Click <strong>New</strong>. Give it a clear name — something like
                        &ldquo;Work Full&rdquo; or &ldquo;Acme Corp&rdquo;. In the editing box below, type
                        or paste your signature content. You can format it with the toolbar,
                        or paste HTML directly using the plain-text box if you&rsquo;re copying
                        from a tool like{" "}
                        <Link href="/editor" className="text-blue-600 hover:underline">
                          NeatStamp&rsquo;s editor
                        </Link>
                        .
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Click <strong>Save</strong> before moving on. The signature name
                        appears in the list on the left.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Create the remaining signatures
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Repeat step 2 for each signature you need. For three accounts,
                        you might create: &ldquo;Work Full&rdquo;, &ldquo;Work Reply&rdquo; (a shorter
                        version for replies), &ldquo;Personal&rdquo;, and &ldquo;Consulting&rdquo;. There&rsquo;s
                        no limit on how many you create. Save each one before creating the next.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Assign signatures to each account
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-2">
                        On the right side of the Signatures dialog, find the
                        &ldquo;Choose default signature&rdquo; section. Use the
                        <strong> E-mail account</strong> dropdown to select your first account.
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed mb-2">
                        Set the <strong>New messages</strong> dropdown to the signature you
                        want for that account&rsquo;s outgoing emails. Set the
                        <strong> Replies/forwards</strong> dropdown to a different
                        (usually shorter) signature, or to &ldquo;(none)&rdquo; if you don&rsquo;t want a
                        signature appended to replies.
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Then switch the E-mail account dropdown to your second account and
                        repeat. Do this for every account. Click <strong>OK</strong> when done.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Test it
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Open a new compose window. The signature for your default sending
                        account should appear automatically. In the From field, change to
                        a different account. Outlook should swap the signature to the one
                        you assigned to that account. If it doesn&rsquo;t swap, close and
                        reopen the compose window — sometimes Outlook needs a moment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  Tip: using HTML signatures in Classic Outlook
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  If you want a professionally designed signature with a logo and social
                  icons, build it in{" "}
                  <Link href="/editor" className="text-blue-600 hover:underline">
                    NeatStamp
                  </Link>
                  , copy the generated HTML, and paste it into the Classic Outlook
                  signature editor using the <strong>Insert HTML source</strong> option
                  (right-click in the editing area, or use the source view if available).
                  For detailed instructions, see the{" "}
                  <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                    Outlook signature setup guide
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* Section 4: New Outlook step-by-step */}
            <section id="new-outlook-step-by-step" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Step-by-step: New Outlook (and the workaround)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                New Outlook&rsquo;s signature settings are in a different location and work
                differently from Classic Outlook. Here&rsquo;s how to set up per-account
                signatures and how to manually switch them when you need to.
              </p>

              <div className="space-y-5">
                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Open signature settings
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        In New Outlook, click the <strong>Settings</strong> gear icon
                        (top right). In the Settings panel, go to
                        <strong> Accounts &gt; Signatures</strong>. You&rsquo;ll see a list
                        of your connected accounts on the left.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Select the account and create a signature
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-2">
                        Click on an account to see its signature settings. Click
                        <strong> New signature</strong> and give it a name. Type or paste
                        your signature content in the editor. Enable the toggle for
                        &ldquo;Automatically include my signature on new messages I compose&rdquo;
                        if you want it inserted automatically.
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Click <strong>Save</strong>. Then click on the next account and
                        repeat the process. Each account&rsquo;s signature is stored separately
                        in Exchange Online via roaming signatures.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Manually switch signatures when composing (the workaround)
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-2">
                        When you compose a new email in New Outlook, look at the
                        compose toolbar at the bottom of the compose window. There&rsquo;s a
                        signature icon (a stylized pen). Click it to open the signature
                        picker.
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        You&rsquo;ll see all the signatures you&rsquo;ve created. Click the one you
                        want to insert. It replaces the current signature in the compose
                        window. This is the manual workaround for New Outlook&rsquo;s lack of
                        automatic per-account reply signature assignment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-amber-900 mb-2">
                  The current limitation
                </p>
                <p className="text-sm text-amber-800 leading-relaxed">
                  As of March 2026, New Outlook does not automatically switch the signature
                  when you change the From address in a compose window. You get one
                  auto-inserted default per account, but replies and manual account switches
                  require you to pick the signature yourself using the toolbar icon. If
                  this workflow bothers you, Classic Outlook or a copy-paste workflow via
                  NeatStamp is currently more reliable.
                </p>
              </div>
            </section>

            {/* Section 5: OWA step-by-step */}
            <section id="owa-step-by-step" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Step-by-step: OWA (Outlook Web Access)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                OWA is the browser-based version of Outlook you access at
                outlook.office.com or your organization&rsquo;s Exchange web URL. Its signature
                behavior is similar to New Outlook — they both use roaming signatures
                stored in Exchange Online.
              </p>

              <div className="space-y-5">
                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Open OWA settings
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        In OWA, click the <strong>Settings</strong> gear icon at the top
                        right. In the search box, type &ldquo;signature&rdquo; and click
                        <strong> Email signature</strong> from the results. Or navigate to
                        <strong> Mail &gt; Compose and reply</strong> in the settings sidebar.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Create and name your signature
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-2">
                        In the Email signature section, click <strong>+ New signature</strong>.
                        Give it a name and fill in the content. You can use the rich text
                        editor, or paste HTML if you&rsquo;re using a signature built in
                        NeatStamp or another generator.
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        You can create multiple named signatures and set one as the default
                        for new messages. Toggle on &ldquo;Automatically include my signature
                        on new messages&rdquo; and select the one you want as default. Save.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Switch signatures in the compose window
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        When composing in OWA, click the three-dot <strong>More options</strong>{" "}
                        menu at the bottom of the compose window, then select
                        <strong> Insert signature</strong>. You&rsquo;ll see all your saved
                        signatures and can pick the right one. Like New Outlook, OWA does
                        not automatically switch signatures based on which From account
                        you select — manual switching is the current workflow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-slate-600 leading-relaxed">
                  OWA shares its signature storage with New Outlook via roaming signatures.
                  A signature you create in New Outlook desktop will appear in OWA and vice
                  versa, as long as both are reading from the same Exchange Online account.
                  For the full setup process for Outlook 365 specifically, see the{" "}
                  <Link
                    href="/blog/outlook-365-signature-setup"
                    className="text-blue-600 hover:underline"
                  >
                    Outlook 365 signature setup guide
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* Section 6: Outlook Mobile */}
            <section id="outlook-mobile" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Outlook Mobile: what&rsquo;s possible
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Outlook mobile app (iOS and Android) is the most limited of all the
                Outlook versions when it comes to signature management. As of 2026, it
                supports a single signature only — not per account, not per folder.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                To find it: open Outlook mobile, tap your profile picture or initials
                at the top left, tap <strong>Settings</strong>, tap your account name,
                then tap <strong>Signature</strong>. You&rsquo;ll see a plain text editor
                with whatever is currently set as your signature. Edit it, save, done.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have multiple accounts connected in Outlook mobile, that same
                signature applies to all of them. There&rsquo;s no way to assign different
                signatures to different accounts in the mobile app.
              </p>

              <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-red-900 mb-2">Outlook Mobile limitations</p>
                <ul className="space-y-1.5 text-sm text-red-800">
                  {[
                    "One signature total — not per account",
                    "Plain text only — no HTML, no logos, no formatted layout",
                    "No automatic insertion for specific accounts",
                    "No reply-specific signature setting",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-600 leading-relaxed">
                If you need a professional signature on mobile, the practical answer right
                now is to set a simple plain text signature that works across all accounts
                (your name, title, phone) and accept that the fully designed HTML version
                is only for desktop. For the full picture, see the{" "}
                <Link href="/outlook-mobile-signature" className="text-blue-600 hover:underline">
                  Outlook mobile signature guide
                </Link>
                .
              </p>
            </section>

            {/* Section 7: Workarounds */}
            <section id="workarounds" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Workarounds for New Outlook&rsquo;s limits
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                If you&rsquo;re stuck on New Outlook and the one-default-per-account behavior
                isn&rsquo;t enough, here are the practical options available right now.
              </p>

              <div className="space-y-6">
                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                      A
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Use the manual signature picker every time
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        It&rsquo;s not automatic, but it works. Before you send any email from
                        a non-default account, click the signature icon in the compose
                        toolbar and select the right signature. Takes about two seconds.
                        Not ideal, but it&rsquo;s the zero-configuration option.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                      B
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Switch back to Classic Outlook
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        If you&rsquo;re on Microsoft 365 and haven&rsquo;t been forced to upgrade
                        yet, you can toggle back to Classic Outlook using the &ldquo;Go back
                        to classic Outlook&rdquo; link in New Outlook&rsquo;s settings. Classic
                        Outlook has the full per-account, per-message-type signature
                        assignment system. Microsoft will eventually remove this toggle,
                        but as of early 2026 it&rsquo;s still available for most users.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                      C
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Use a company-wide signature injection tool
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Server-side signature tools (like Exclaimer, Codestep, or
                        CodeTwo) add signatures to emails after they leave your email
                        client — directly on the Exchange server. This means the client
                        itself doesn&rsquo;t matter. You get per-account, per-rule signature
                        logic without depending on Outlook&rsquo;s built-in signature features.
                        These tools cost money and require IT setup, but they&rsquo;re worth
                        it for teams with strict signature requirements. The{" "}
                        <Link
                          href="/outlook-signature-for-company"
                          className="text-blue-600 hover:underline"
                        >
                          company Outlook signature guide
                        </Link>{" "}
                        covers this in detail.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                      D
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Build signatures externally and copy-paste
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Create each signature in a tool like NeatStamp, save the HTML
                        separately for each account, and paste the right one into Outlook
                        when you set up each account&rsquo;s signature settings. When something
                        changes — your phone number, title, logo — update it in NeatStamp
                        and repaste. This approach works across all Outlook versions and
                        isn&rsquo;t affected by roaming signatures limitations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: NeatStamp */}
            <section id="neatstamp" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                NeatStamp: manage multiple signatures without the friction
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Managing signatures for multiple accounts is one of the most common
                frustrations with Outlook — especially as Microsoft&rsquo;s transition from
                Classic to New Outlook introduces inconsistencies that didn&rsquo;t exist before.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                NeatStamp is a{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  free online signature editor
                </Link>{" "}
                that lets you build multiple signatures and save them. You might have one
                for your corporate account, one for your freelance identity, and one for a
                nonprofit you&rsquo;re involved with. Each one lives in NeatStamp with its own
                design, branding, and contact details. When you need to set up or update
                the signature for a particular Outlook account, you open that signature
                in NeatStamp, copy the HTML, and paste it into Outlook&rsquo;s signature editor.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Because the HTML is generated fresh from NeatStamp every time, you&rsquo;re
                always pasting the current version. There&rsquo;s no sync to wait for, no
                conflict between local and cloud versions, and no dependency on whether
                your organization has roaming signatures enabled or not.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-slate-900 mb-3">
                  Why this works across all Outlook versions
                </p>
                <ul className="space-y-2">
                  {[
                    "NeatStamp generates table-based HTML with inline styles — the format Outlook requires",
                    "The same HTML file works in Classic Outlook, New Outlook, and OWA",
                    "Compatible with Outlook 2016, 2019, 2021, and 365",
                    "No embedded images that become attachments — logos are hosted externally",
                    "Works for individual accounts and company-wide rollouts",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                For teams, NeatStamp works well as a distribution method: your IT or
                ops team builds the approved signature templates, shares them, and each
                person pastes their own version into their account. No server-side
                infrastructure, no Exchange admin required.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you need Outlook-compatible signatures specifically, see the{" "}
                <Link
                  href="/email-signature-outlook-compatible"
                  className="text-blue-600 hover:underline"
                >
                  guide to Outlook-compatible email signatures
                </Link>{" "}
                — it covers the technical requirements that make signatures render
                correctly in every version of Outlook. For Teams signatures to match,
                see the{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  Microsoft Teams email signature guide
                </Link>
                .
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you&rsquo;re running into issues with signatures not appearing or breaking
                after you set them up, the{" "}
                <Link
                  href="/blog/outlook-signature-not-working"
                  className="text-blue-600 hover:underline"
                >
                  Outlook signature not working guide
                </Link>{" "}
                covers the most common causes and fixes.
              </p>
            </section>

            {/* Related guides */}
            <section id="related-guides" className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related guides</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    href: "/email-signature-outlook",
                    label: "Outlook Signature Setup Guide",
                  },
                  {
                    href: "/email-signature-outlook-365",
                    label: "Outlook 365 Signature Guide",
                  },
                  {
                    href: "/blog/outlook-signature-not-working",
                    label: "Outlook Signature Not Working",
                  },
                  {
                    href: "/blog/outlook-roaming-signatures",
                    label: "Outlook Roaming Signatures Explained",
                  },
                  {
                    href: "/outlook-mobile-signature",
                    label: "Outlook Mobile Signature Setup",
                  },
                  {
                    href: "/outlook-signature-for-company",
                    label: "Outlook Signature for Your Company",
                  },
                  {
                    href: "/email-signature-for-teams",
                    label: "Email Signature for Microsoft Teams",
                  },
                  {
                    href: "/blog/outlook-365-signature-setup",
                    label: "Outlook 365 Signature Setup",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm font-medium text-slate-700"
                  >
                    {link.label} &rarr;
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group border border-slate-200 rounded-xl"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                      {faq.q}
                      <svg
                        className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-3"
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
                    <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Internal links block */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-4">
                More resources
              </p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                {[
                  { href: "/email-signature-outlook-compatible", label: "Outlook-compatible signature formats" },
                  { href: "/templates", label: "Email signature templates" },
                  { href: "/pricing", label: "NeatStamp Pro for teams" },
                  { href: "/editor", label: "Free signature editor" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Build a different signature for each account
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Create and save multiple signatures in NeatStamp — one per account, one per
                brand, however you need them. Copy the HTML, paste into Outlook. Works in
                every version. Free, no account required.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Create My Signature — Free
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
