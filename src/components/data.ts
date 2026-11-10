export const APP_STORE_URL =
  "https://apps.apple.com/us/app/consultants-r-us/id6757849113";

export const NAV = [
  { id: "audience", label: "Who It's For" },
  { id: "how", label: "How It Works" },
  { id: "app", label: "Web and Mobile" },
  { id: "faq", label: "FAQ" },
] as const;

export type Person = {
  name: string;
  role: string;
  years: number;
  expertise: string;
  location: string;
  availability: string;
  cert: string;
};

export const PEOPLE: Person[] = [
  { name: "Ross Tanaka", role: "Completions Supervisor", years: 11, expertise: "Completions", location: "Williston, ND", availability: "Available now", cert: "IADC WellSharp" },
  { name: "Marcus Bell", role: "Workover Consultant", years: 16, expertise: "Work Over Completions", location: "Lafayette, LA", availability: "Available now", cert: "H2S Clean" },
  { name: "Elena Ruiz", role: "Production Engineer", years: 7, expertise: "Engineering", location: "Midland, TX", availability: "Project dependent", cert: "PE License" },
  { name: "Suzanne Porter", role: "Drilling Engineer", years: 5, expertise: "Engineering", location: "Denver, CO", availability: "Within 30 days", cert: "IADC WellSharp" },
  { name: "Sid Michael", role: "Oil Rig Operator", years: 3, expertise: "Completions", location: "Midland, TX", availability: "Available now", cert: "OSHA 30" },
];

export const CHIPS: { label: string; test: (p: Person) => boolean }[] = [
  { label: "Completions", test: (p) => p.expertise === "Completions" },
  { label: "Engineering", test: (p) => p.expertise === "Engineering" },
  { label: "5+ years", test: (p) => p.years >= 5 },
  { label: "Available now", test: (p) => p.availability === "Available now" },
];

export const AUDIENCE = {
  company: {
    title: "Find the right consultant without paying a recruiter.",
    features: [
      "Search and filter by location, certifications, experience, and availability",
      "Browse detailed profiles and resumes",
      "Shortlist and favorite candidates",
      "Contact consultants directly by email or phone",
    ],
    priceLabel: "For companies",
    price: "Free",
    priceNote: "No subscription. Full access to consultant profiles on web and mobile.",
    cta: "Book a Demo",
    ctaHref: "#demo",
  },
  consultant: {
    title: "Get found by the companies hiring your skills.",
    features: [
      "Build a professional profile and set your availability",
      "Upload resumes and certifications",
      "Get real-time alerts when you are shortlisted",
      "Store your documents securely",
    ],
    priceLabel: "For consultants",
    price: "$10/mo",
    priceNote:
      "A flat monthly price for profile visibility, resume uploads, notifications, and direct company contact.",
    cta: "Download the App",
    ctaHref: APP_STORE_URL,
  },
} as const;

export const STEPS = [
  { title: "Create a profile", body: "Consultants and oilfield companies can get set up in minutes." },
  { title: "Connect directly", body: "Browse verified profiles and reach out without a recruiter in between." },
  { title: "Hire or get hired", body: "Companies shortlist the right people. Consultants set availability, upload documents, and get discovered." },
];

export const FAQ = [
  {
    label: "For companies",
    items: [
      { q: "How do I find consultants?", a: "Filter by location, certifications, years of experience, and availability, then contact consultants directly." },
      { q: "Can I shortlist candidates?", a: "Yes. You can star and favorite consultant profiles and resumes." },
      { q: "Is there a fee for companies?", a: "No. Companies get full access to consultant profiles and features without a subscription." },
      { q: "Can multiple hiring managers use one account?", a: "Each account currently serves a single user. Team access is on the roadmap." },
    ],
  },
  {
    label: "For consultants",
    items: [
      { q: "Who can sign up?", a: "Anyone with relevant oilfield experience, certifications, and availability. Create a profile, upload a resume, and verify your credentials." },
      { q: "Is there a fee for consultants?", a: "Yes. A flat $10 monthly subscription covers all features, including profile visibility, resume uploads, notifications, and direct company contact." },
      { q: "How will companies contact me?", a: "Companies reach out by phone or email, using the information in your profile." },
      { q: "Is my information secure?", a: "Your documents are stored in a personal vault, and your data is protected under the privacy policy." },
    ],
  },
];
