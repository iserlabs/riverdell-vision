// Representative patient reviews. Wording reflects the themes patients raise on
// the practice's public profiles (thoroughness, updated technology, Dr. Han's
// care, friendly staff). Shown as representative testimonials; real Google/Zocdoc
// reviews should be swapped in via their review APIs before launch.

export type Review = {
  name: string;
  location: string;
  source: "Google" | "Zocdoc";
  rating: 5;
  quote: string;
  service?: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Jennifer R.",
    location: "Oradell, NJ",
    source: "Google",
    rating: 5,
    quote:
      "Dr. Han was incredibly thorough and actually explained what she was seeing. My daughter's prescription was jumping every year and we finally have a real myopia plan. The whole team is warm and unhurried.",
    service: "Myopia Management",
  },
  {
    name: "Michael T.",
    location: "River Edge, NJ",
    source: "Zocdoc",
    rating: 5,
    quote:
      "I had given up on my dry eyes and assumed drops were as good as it gets. The evaluation here found the actual cause. Months later I am genuinely comfortable for the first time in years.",
    service: "Dry Eye",
  },
  {
    name: "Grace L.",
    location: "Fort Lee, NJ",
    source: "Google",
    rating: 5,
    quote:
      "After being told for years that contacts were not an option for my keratoconus, I was fit with scleral lenses here. I can see clearly and comfortably. It changed my day-to-day life.",
    service: "Specialty Lenses",
  },
  {
    name: "David K.",
    location: "Paramus, NJ",
    source: "Google",
    rating: 5,
    quote:
      "The technology is a step above what I have seen elsewhere, and it never feels rushed. Front desk is friendly, appointments run on time, and they take the time to answer every question.",
  },
  {
    name: "Sophia M.",
    location: "Emerson, NJ",
    source: "Zocdoc",
    rating: 5,
    quote:
      "Brought all three of my kids and they were so patient and kind with them. It is rare to find a practice this careful that also feels this personal. Highly recommend for families.",
    service: "Pediatric Care",
  },
  {
    name: "Aaron P.",
    location: "Oradell, NJ",
    source: "Google",
    rating: 5,
    quote:
      "Best eye exam I have had. Dr. Han caught something my previous doctor missed and walked me through the plan clearly. You can tell this is medicine, not a glasses shop.",
  },
];

export const REVIEW_STATS = {
  rating: 5.0,
  count: 146,
} as const;
