export interface SeoPageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  steps: { title: string; description: string }[];
  features: string[];
  faq: { q: string; a: string }[];
}

export const SEO_PAGES: SeoPageData[] = [
  {
    slug: "email-signature-gmail",
    title: "Gmail",
    metaTitle: "Free Email Signature Generator for Gmail | NeatStamp",
    metaDescription:
      "Create a professional email signature for Gmail in 60 seconds. Free, no account needed. Copy and paste into Gmail settings. Outlook-proof HTML included.",
    h1: "Free Email Signature Generator for Gmail",
    intro:
      "Create a professional Gmail email signature in just 60 seconds. NeatStamp generates Outlook-proof HTML signatures that look perfect in Gmail on desktop and mobile. No account needed — just fill in your details, pick a design, and paste it into your Gmail settings.",
    steps: [
      {
        title: "Create your signature with NeatStamp",
        description:
          "Enter your name, title, contact details, and social media links. Choose a template and customize the colors.",
      },
      {
        title: "Click 'Copy Signature'",
        description:
          "NeatStamp copies the signature as rich HTML to your clipboard — perfectly formatted for Gmail.",
      },
      {
        title: "Open Gmail Settings",
        description:
          "Go to Gmail → Settings (gear icon) → See all settings → Scroll down to 'Signature' section.",
      },
      {
        title: "Paste your signature",
        description:
          "Click in the signature editor box and paste (Ctrl+V or Cmd+V). Your formatted signature appears instantly.",
      },
      {
        title: "Save changes",
        description:
          "Scroll down and click 'Save Changes'. Your new signature will appear on every email you send.",
      },
    ],
    features: [
      "Works perfectly in Gmail on desktop, mobile, and the Gmail app",
      "Supports profile photos, logos, and social media icons",
      "Responsive design that adapts to different screen sizes",
      "No Gmail extension or plugin required",
      "Compatible with Google Workspace (G Suite) accounts",
    ],
    faq: [
      {
        q: "Does this work with Google Workspace?",
        a: "Yes. NeatStamp signatures work with both personal Gmail accounts and Google Workspace (formerly G Suite) business accounts. Simply paste the signature in your Gmail settings.",
      },
      {
        q: "Why does my Gmail signature look different when I paste it?",
        a: "Gmail may slightly adjust formatting. NeatStamp signatures are specifically optimized for Gmail's rendering engine. If you see any issues, try pasting using Ctrl+Shift+V (paste without formatting) and then re-copy from NeatStamp.",
      },
      {
        q: "Can I have different signatures for different Gmail accounts?",
        a: "Yes. With NeatStamp Pro, you can create and save multiple signatures. For the free tier, simply create a new signature each time and paste it into the respective Gmail account.",
      },
    ],
  },
  {
    slug: "email-signature-outlook",
    title: "Outlook",
    metaTitle:
      "Free Email Signature Generator for Outlook | NeatStamp — Guaranteed to Work",
    metaDescription:
      "Create an Outlook-proof email signature for free. Built with table-based HTML that works in Outlook desktop, web, and mobile. No broken layouts — guaranteed.",
    h1: "Free Email Signature Generator for Outlook",
    intro:
      "Outlook is notorious for breaking email signatures. It uses Microsoft Word's rendering engine, which doesn't support modern CSS. NeatStamp solves this by generating signatures with table-based HTML and inline CSS — the only method guaranteed to work in every version of Outlook.",
    steps: [
      {
        title: "Create your signature with NeatStamp",
        description:
          "Enter your details and choose a template. Every NeatStamp template is built with Outlook-safe HTML.",
      },
      {
        title: "Click 'Copy Signature'",
        description:
          "NeatStamp copies Outlook-compatible HTML to your clipboard. No broken tables, no missing images.",
      },
      {
        title: "Open Outlook Signature Settings",
        description:
          "Outlook Desktop: File → Options → Mail → Signatures. Outlook Web: Settings → View all Outlook settings → Mail → Compose and reply.",
      },
      {
        title: "Create a new signature and paste",
        description:
          "Click 'New', give it a name, then paste your NeatStamp signature into the editor.",
      },
      {
        title: "Set as default",
        description:
          "Choose your new signature as the default for new messages and/or replies. Click OK.",
      },
    ],
    features: [
      "Table-based HTML layout — guaranteed to work in Outlook",
      "Inline CSS — no external stylesheets that Outlook strips",
      "Compatible with Outlook 2016, 2019, 2021, Microsoft 365",
      "Works in Outlook Web (OWA) and Outlook Mobile",
      "No broken images — optimized image sizing for Outlook's DPI handling",
    ],
    faq: [
      {
        q: "Why do other signatures break in Outlook?",
        a: "Outlook uses Microsoft Word's HTML rendering engine instead of a web browser engine. This means it doesn't support CSS flexbox, grid, float, or many modern CSS properties. NeatStamp uses only table-based layouts and inline CSS — the only approach that works reliably across all Outlook versions.",
      },
      {
        q: "Will this work with the new Outlook for Windows?",
        a: "Yes. NeatStamp signatures are tested in both classic Outlook and the new Outlook for Windows. The table-based HTML approach works in all versions.",
      },
      {
        q: "My images are showing as attachments in Outlook. Why?",
        a: "This happens when images are embedded as base64 data. NeatStamp uses hosted image URLs instead, which display correctly in Outlook without appearing as attachments.",
      },
    ],
  },
  {
    slug: "email-signature-apple-mail",
    title: "Apple Mail",
    metaTitle: "Free Email Signature Generator for Apple Mail | NeatStamp",
    metaDescription:
      "Create a beautiful email signature for Apple Mail on Mac, iPhone, and iPad. Free, no account needed. HTML signature that works perfectly in Apple Mail.",
    h1: "Free Email Signature Generator for Apple Mail",
    intro:
      "Apple Mail supports rich HTML signatures, making it easy to add a professional email signature on your Mac, iPhone, or iPad. NeatStamp generates clean HTML that renders beautifully in Apple Mail while remaining compatible with all other email clients your recipients use.",
    steps: [
      {
        title: "Create your signature with NeatStamp",
        description: "Enter your details, pick a template, customize your colors.",
      },
      {
        title: "Copy your signature",
        description:
          "Click 'Copy Signature' to copy the formatted signature to your clipboard.",
      },
      {
        title: "Open Apple Mail Preferences",
        description:
          "Mac: Mail → Settings (or Preferences) → Signatures tab. iPhone/iPad: Settings → Mail → Signature.",
      },
      {
        title: "Create and paste",
        description:
          "On Mac: Click '+' to add a new signature, then paste. On iPhone: Select the account and paste into the signature field.",
      },
      {
        title: "Uncheck 'Always match my default message font'",
        description:
          "Important: In Apple Mail on Mac, uncheck this option to preserve your signature's formatting.",
      },
    ],
    features: [
      "Works on Mac, iPhone, and iPad",
      "Rich HTML with images and social links",
      "Compatible with iCloud email accounts",
      "Preserves formatting across Apple devices",
      "Also works when sending to Outlook/Gmail recipients",
    ],
    faq: [
      {
        q: "Why does my signature lose formatting in Apple Mail?",
        a: "Apple Mail has a setting called 'Always match my default message font' that can override your signature's fonts. Make sure to uncheck this in Mail → Settings → Signatures.",
      },
      {
        q: "Can I use NeatStamp signatures on my iPhone?",
        a: "Yes. Copy the signature, then go to Settings → Mail → Signature on your iPhone. Select the account and paste the signature. Note that iOS has limited HTML support in the signature field, so some formatting may be simplified.",
      },
    ],
  },
  {
    slug: "email-signature-yahoo",
    title: "Yahoo Mail",
    metaTitle: "Free Email Signature Generator for Yahoo Mail | NeatStamp",
    metaDescription:
      "Create a professional Yahoo Mail email signature for free. No account needed. Copy and paste into Yahoo Mail settings in seconds.",
    h1: "Free Email Signature Generator for Yahoo Mail",
    intro:
      "Add a professional touch to your Yahoo Mail with a custom email signature. NeatStamp creates HTML signatures that work perfectly in Yahoo Mail's web interface and mobile app.",
    steps: [
      {
        title: "Create your signature with NeatStamp",
        description: "Fill in your details and choose a template.",
      },
      {
        title: "Copy your signature",
        description: "Click 'Copy Signature' to copy the formatted HTML.",
      },
      {
        title: "Open Yahoo Mail Settings",
        description: "Click the gear icon → More Settings → Writing email.",
      },
      {
        title: "Paste your signature",
        description: "Scroll to the Signature section, toggle it on, and paste your NeatStamp signature.",
      },
      {
        title: "Save",
        description: "Your signature will now appear on all outgoing Yahoo Mail messages.",
      },
    ],
    features: [
      "Compatible with Yahoo Mail web and mobile app",
      "Rich HTML with photos and social links",
      "Clean rendering in Yahoo's email editor",
      "Works when sending to Gmail, Outlook, and other clients",
    ],
    faq: [
      {
        q: "Does Yahoo Mail support HTML signatures?",
        a: "Yes. Yahoo Mail supports rich text and basic HTML in signatures. NeatStamp signatures are optimized to render correctly in Yahoo Mail while maintaining compatibility with all other email clients.",
      },
    ],
  },
  {
    slug: "email-signature-for-business",
    title: "Business",
    metaTitle: "Professional Email Signatures for Business | NeatStamp — Free",
    metaDescription:
      "Create professional business email signatures for your company. Free for individuals, team plans available. Consistent branding across your organization.",
    h1: "Professional Email Signatures for Business",
    intro:
      "Your business email signature is seen thousands of times a year. Make it count. NeatStamp helps businesses create professional, consistent email signatures that reinforce your brand with every message. From solo entrepreneurs to growing teams.",
    steps: [
      {
        title: "Choose a professional template",
        description:
          "Pick from Corporate, Modern, or Minimal templates designed for business use.",
      },
      {
        title: "Enter your business details",
        description:
          "Add your name, title, company, phone, email, and website. Include your company logo.",
      },
      {
        title: "Match your brand colors",
        description:
          "Customize the primary and accent colors to match your company's brand guidelines.",
      },
      {
        title: "Deploy to your team",
        description:
          "Free: copy and share with colleagues. Team plan: manage all signatures centrally.",
      },
    ],
    features: [
      "Professional templates designed for business environments",
      "Brand color customization to match your company identity",
      "Company logo integration",
      "Consistent formatting across all team members",
      "Works in all business email platforms (Outlook, Gmail, Google Workspace)",
      "Team plan for centralized signature management",
    ],
    faq: [
      {
        q: "Can I use NeatStamp for my entire company?",
        a: "Yes. For small teams, each person can create their own signature using the free tier. For larger teams, the Team plan ($3/user/month) lets you manage signatures centrally, enforce brand guidelines, and deploy signatures to all employees.",
      },
      {
        q: "Can I add my company logo?",
        a: "Yes. Upload your company logo in the Photo section. It will appear in your signature alongside your contact details. For best results, use a PNG or JPG image under 2MB.",
      },
    ],
  },
  {
    slug: "email-signature-for-freelancers",
    title: "Freelancers",
    metaTitle: "Free Email Signature Generator for Freelancers | NeatStamp",
    metaDescription:
      "Create a professional email signature as a freelancer. Free, no account needed. Stand out with a polished signature that builds trust with clients.",
    h1: "Free Email Signature for Freelancers",
    intro:
      "As a freelancer, your email signature is your digital business card. Every email you send is a chance to make a professional impression, share your portfolio, and build trust with potential clients. NeatStamp helps you create a polished signature in 60 seconds — for free.",
    steps: [
      {
        title: "Add your freelance details",
        description:
          "Your name, title (e.g., 'Freelance Designer'), email, phone, and portfolio website.",
      },
      {
        title: "Add social proof",
        description:
          "Link your LinkedIn, portfolio, Behance, Dribbble, or GitHub profile.",
      },
      {
        title: "Add a booking link",
        description:
          "Include your Calendly link so potential clients can book a call directly from your signature.",
      },
      {
        title: "Copy and use",
        description:
          "Paste into Gmail, Outlook, or whatever email client you use. Every email becomes a mini-portfolio.",
      },
    ],
    features: [
      "Designed for freelancers and solo consultants",
      "Social media and portfolio links",
      "Calendly booking button integration",
      "Professional appearance that builds client trust",
      "Free — no overhead for your freelance business",
    ],
    faq: [
      {
        q: "I'm just starting out as a freelancer. Is this worth it?",
        a: "Absolutely. A professional email signature immediately makes you look more established and trustworthy. Since NeatStamp is free, there's no cost — only upside.",
      },
      {
        q: "Can I include a link to my portfolio?",
        a: "Yes. Add your portfolio URL in the Website field, and it will appear as a clickable link in your signature. You can also add links to Behance, Dribbble, or any other platform through the social media section.",
      },
    ],
  },
  {
    slug: "email-signature-for-students",
    title: "Students",
    metaTitle: "Free Email Signature for Students | NeatStamp",
    metaDescription:
      "Create a professional email signature as a student. Perfect for internship applications, networking, and university email. Free, no account needed.",
    h1: "Free Email Signature for Students",
    intro:
      "Stand out in your professor's inbox and land that internship. A professional email signature shows you mean business — even as a student. NeatStamp lets you create one for free, with your university, major, expected graduation, and LinkedIn profile.",
    steps: [
      {
        title: "Enter your student details",
        description:
          "Your name, university, major or program, and expected graduation year in the job title field.",
      },
      {
        title: "Add contact info",
        description: "Your .edu email, phone, and LinkedIn profile.",
      },
      {
        title: "Pick a clean template",
        description:
          "The Minimal or Compact template works great for students — professional without being over-the-top.",
      },
      {
        title: "Copy and paste",
        description:
          "Add it to your university email and personal email for internship applications.",
      },
    ],
    features: [
      "Perfect for internship and job applications",
      "Clean, professional templates that don't overdo it",
      "LinkedIn integration for networking",
      "Works with university email systems",
      "100% free — no student discount needed because it's already free",
    ],
    faq: [
      {
        q: "What should a student email signature include?",
        a: "Keep it simple: your full name, university and major, expected graduation year, email, phone, and LinkedIn URL. Avoid including too many social media links — keep it professional.",
      },
      {
        q: "Should I use an email signature for university emails?",
        a: "Yes, especially when emailing professors, applying for internships, or networking. A professional signature sets you apart from other students and shows attention to detail.",
      },
    ],
  },
  {
    slug: "email-signature-for-real-estate",
    title: "Real Estate",
    metaTitle: "Free Email Signature for Real Estate Agents | NeatStamp",
    metaDescription:
      "Create a professional email signature for real estate. Include your photo, license number, listings, and booking link. Free for agents and brokers.",
    h1: "Free Email Signature for Real Estate Agents",
    intro:
      "Real estate is a people business, and your email signature is often the first impression. NeatStamp helps real estate agents and brokers create professional signatures that build trust, showcase your brand, and make it easy for clients to reach you or book a viewing.",
    steps: [
      {
        title: "Add your agent details",
        description:
          "Name, title (e.g., 'Licensed Real Estate Agent'), brokerage name, phone, and email.",
      },
      {
        title: "Upload your headshot",
        description:
          "A professional photo builds trust. Upload yours in the Photo section.",
      },
      {
        title: "Add your booking link",
        description:
          "Include your Calendly or scheduling link so clients can book viewings directly.",
      },
      {
        title: "Add a banner",
        description:
          "Pro feature: add a promotional banner for your latest listing or open house.",
      },
    ],
    features: [
      "Professional headshot display",
      "Brokerage branding with logo",
      "Calendly booking integration for viewings",
      "CTA banner for featured listings (Pro)",
      "Phone and email prominently displayed",
      "Works in all email clients your clients use",
    ],
    faq: [
      {
        q: "Can I add my real estate license number?",
        a: "Yes. Add it to the Job Title field (e.g., 'Licensed Agent | DRE #12345') or the Address field. Some states require this in all communications.",
      },
      {
        q: "Can I promote my listings in my signature?",
        a: "Yes. With NeatStamp Pro, you can add a CTA banner image below your signature. Use it to promote your latest listing, open house, or market report.",
      },
    ],
  },
];
