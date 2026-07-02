// Real, verbatim patient reviews from Riverdell Vision's public Google Business
// Profile (5.0 across 448 reviews) and Zocdoc. Names are as publicly posted by
// the reviewers. Text is quoted verbatim; only obvious truncation is trimmed to
// a complete sentence. Do not paraphrase or invent.

export type Review = {
  name: string;
  source: "Google" | "Zocdoc";
  rating: 5;
  quote: string;
  tag?: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Katherine Rodriguez",
    source: "Google",
    rating: 5,
    tag: "Pediatric & family",
    quote:
      "I first came to Dr. Han as a patient myself, and now she treats both of my children too. She's truly exceptional - so kind, patient, and thorough. Even my kids adore her. In fact, my 5-year-old walked out of the office today and said, “I love my doctor!”",
  },
  {
    name: "Hannah Verbrugge",
    source: "Google",
    rating: 5,
    tag: "Myopia management",
    quote:
      "Have been a patient here for over thirteen years, and have done all of their myopia treatments - wonderful office! The quality of care is amazing, and all the doctors are super thorough and knowledgeable. The front desk is also very warm and welcoming.",
  },
  {
    name: "Irene Voce",
    source: "Google",
    rating: 5,
    tag: "Complex care",
    quote:
      "I have an unusual and complicated vision situation caused by a retinal detachment and subsequent surgical repair. Dr Bruce Meyer was very knowledgeable, patient, caring and compassionate about finding an optical solution for me. After visiting several doctors, I feel the closest to a solution with his help.",
  },
  {
    name: "Joe Spivack",
    source: "Google",
    rating: 5,
    tag: "Vision therapy",
    quote:
      "Outstanding care team. Great care from courteous and attentive professionals. So grateful to do eye therapy with Victoria. Motivating and a joy to work with.",
  },
  {
    name: "Manpreet Kaur",
    source: "Google",
    rating: 5,
    tag: "Comprehensive care",
    quote:
      "Dr. Amy Mundanchira is the best optometrist I have ever seen. Knowledgeable, takes time, kind, able to handle complex medical histories and really listens!",
  },
  {
    name: "Janice Lu",
    source: "Google",
    rating: 5,
    tag: "Family eye care",
    quote:
      "I will recommend this office, their service are top notch, and their staff were very patient and helpful. Also the doctor are so caring. Dr. Han is incredible, and kind. Good doctor, good staff, good service, what can you ask for more! You have to bring your kids here if you need to see an eye doctor!",
  },
  {
    name: "Chris Bielecki",
    source: "Google",
    rating: 5,
    tag: "Two decades a patient",
    quote:
      "I've gone to Riverdell Vision for somewhere around two decades now; starting as a patient with Dr. Meyer and now Dr. Han. It always was and continues now to be a great place with a professional and very friendly staff who take the time to answer all your questions and find the best solution for your eye care needs.",
  },
  {
    name: "Marko Vujovic",
    source: "Google",
    rating: 5,
    tag: "Technology",
    quote:
      "Exceptional staff and eye doctor. Everything from the sign in process, VR devices and examination machines is well managed, up to date, clean and efficient. The doctor and staff are very helpful and answered all the questions I had. Would definitely recommend.",
  },
  {
    name: "Myles Mittwol",
    source: "Google",
    rating: 5,
    tag: "Thorough exam",
    quote:
      "Dr. Han is outstanding. Very knowledgeable, thorough and took the time to get everything perfect. Highly recommend her. The staff was great. And the remodeled new office is outstanding.",
  },
  {
    name: "Doriana Alikaj",
    source: "Google",
    rating: 5,
    tag: "10 years a patient",
    quote:
      "We have been patients of the practice for almost 10 years. Dr. Han is the best and the whole staff is professional, always helpful and friendly.",
  },
  {
    name: "J C",
    source: "Google",
    rating: 5,
    tag: "Welcoming",
    quote:
      "Had an excellent experience at this practice. The reception team is very kind, patient and capable. Dr. Mundanchira is superb - took time to talk with me, answer questions, and was very warm and caring.",
  },
  {
    name: "Manny (Su R.)",
    source: "Google",
    rating: 5,
    tag: "Vision therapy",
    quote:
      "The best service I have had by far. My son is getting vision therapy and Victoria is great with him. Victoria is very knowledgeable and takes her time explaining and with treatment.",
  },
];

// Headline proof numbers, sourced from the live public profiles.
export const REVIEW_STATS = {
  rating: 5.0,
  count: 448,
  source: "Google",
  zocdocRating: 4.9,
  zocdocCount: 396,
} as const;
