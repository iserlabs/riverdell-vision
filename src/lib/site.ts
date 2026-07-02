// Central practice configuration. Single source of truth for NAP, providers,
// booking, insurance and navigation so every page + JSON-LD block stays
// consistent (NAP consistency is a core local-SEO requirement).

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://riverdell-vision.vercel.app";

export const practice = {
  name: "Riverdell Vision",
  legalName: "Riverdell Vision",
  tagline: "Family eye care, practiced like medicine.",
  description:
    "Riverdell Vision is a family optometry practice in Oradell, NJ specializing in myopia management, dry eye, and specialty contact lenses. Physician-led, prevention-first eye care for children, adults, and seniors across Bergen County.",
  phone: "(201) 265-7900",
  phoneHref: "tel:+12012657900",
  email: "hello@riverdellvision.com",
  zocdocUrl: "https://www.zocdoc.com/search?dr_specialty=93&insurance_carrier=-1&address=Oradell%2C%20NJ&q=Riverdell%20Vision",
  founded: 2016,
  address: {
    street: "297 Kinderkamack Rd, Suite 200",
    city: "Oradell",
    region: "NJ",
    postal: "07649",
    country: "US",
    full: "297 Kinderkamack Rd, Suite 200, Oradell, NJ 07649",
  },
  geo: { lat: 40.9557, lng: -74.0393 },
  maps: "https://maps.google.com/?q=Riverdell+Vision+297+Kinderkamack+Rd+Oradell+NJ",
  hours: [
    { day: "Monday", open: "9:00", close: "17:00", label: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", open: "10:00", close: "18:00", label: "10:00 AM - 6:00 PM" },
    { day: "Wednesday", open: "9:00", close: "17:00", label: "9:00 AM - 5:00 PM" },
    { day: "Thursday", open: "10:00", close: "18:00", label: "10:00 AM - 6:00 PM" },
    { day: "Friday", open: "9:00", close: "17:00", label: "9:00 AM - 5:00 PM" },
    { day: "Saturday", open: "9:00", close: "14:00", label: "9:00 AM - 2:00 PM (alternating)" },
    { day: "Sunday", open: null, close: null, label: "Closed" },
  ],
  socials: {
    facebook: "https://www.facebook.com/riverdellvision",
    instagram: "https://www.instagram.com/riverdellvision",
    google: "https://maps.google.com/?q=Riverdell+Vision+Oradell+NJ",
  },
} as const;

// Second office in progress. Drives the Fort Lee coming-soon page + expansion
// narrative used across the site and the investor snapshot.
export const fortLee = {
  name: "Riverdell Vision - Fort Lee",
  status: "Opening 2027",
  city: "Fort Lee",
  region: "NJ",
  blurb:
    "A second Riverdell Vision office is coming to Fort Lee, bringing myopia management, dry eye care, and specialty lenses to the Palisades communities.",
  areas: ["Fort Lee", "Palisades Park", "Leonia", "Edgewater", "Cliffside Park", "Englewood Cliffs"],
} as const;

export const providers = [
  {
    slug: "dr-mina-han",
    name: "Dr. Mina Han",
    credential: "OD",
    role: "Optometric Physician",
    photo: "/images/dr-mina-han.png",
    focus: ["Myopia management", "Dry eye disease", "Specialty contact lenses"],
    short:
      "Dr. Han leads Riverdell Vision's medical eye-care and myopia-management programs, known by patients for thorough exams, updated technology, and a calm, unhurried chair-side manner.",
    languages: ["English", "Korean"],
  },
  {
    slug: "dr-bruce-meyer",
    name: "Dr. Bruce Meyer",
    credential: "FCOVD",
    role: "Developmental & Vision Therapy",
    photo: "/images/team-meyer.png",
    focus: ["Vision therapy", "Neuro-optometric rehabilitation"],
    short:
      "A Fellow of the College of Optometrists in Vision Development, Dr. Meyer directs the practice's vision therapy and neuro-rehabilitation work.",
    languages: ["English"],
  },
  {
    slug: "dr-amy-mundanchira",
    name: "Dr. Amy Mundanchira",
    credential: "OD",
    role: "Comprehensive & Pediatric Care",
    photo: "/images/team-mundanchira.png",
    focus: ["Pediatric exams", "Comprehensive eye health"],
    short:
      "Dr. Mundanchira cares for families across the age spectrum with a prevention-first approach to children's and adult eye health.",
    languages: ["English"],
  },
] as const;

export const insurers = [
  "VSP",
  "EyeMed",
  "Spectera",
  "Aetna",
  "Blue Cross Blue Shield",
  "Cigna",
  "Medicare",
  "Meritain Health",
  "Nippon Life Benefits",
] as const;

export const primaryNav = [
  {
    label: "Care",
    children: [
      { label: "Myopia Management", href: "/myopia-management", note: "Slow a child's worsening nearsightedness" },
      { label: "Dry Eye Treatment", href: "/dry-eye-treatment", note: "Real answers for chronic irritation" },
      { label: "Specialty & Scleral Lenses", href: "/specialty-contact-lenses", note: "When regular contacts do not work" },
      { label: "Pediatric & Family Care", href: "/about#care", note: "Prevention-first, every age" },
    ],
  },
  {
    label: "Practice",
    children: [
      { label: "Meet Dr. Mina Han", href: "/about", note: "The physician behind the practice" },
      { label: "Oradell Office", href: "/oradell", note: "297 Kinderkamack Rd" },
      { label: "Fort Lee (Coming Soon)", href: "/fort-lee", note: "Our second location" },
      { label: "Patient Reviews", href: "/reviews", note: "5.0 on Google" },
    ],
  },
] as const;

export const CONTACT_CTA = {
  book: "/book",
  bookLabel: "Request an appointment",
  callLabel: "Call the office",
} as const;
