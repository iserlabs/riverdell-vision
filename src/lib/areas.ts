// Data-driven local landing pages. One entry renders one indexed page under
// /areas/[slug]. This is the scalable local-SEO structure: add a town or a
// service+town row here and a fully-formed, schema-marked page ships with it.

export type Area = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  town: string;
  region: string;
  distance: string;
  intro: string;
  angle: string;
  serviceSlug?: string;
  keywords: string[];
};

export const AREAS: Area[] = [
  {
    slug: "optometrist-oradell-nj",
    h1: "Optometrist in Oradell, NJ",
    metaTitle: "Optometrist in Oradell, NJ | Riverdell Vision",
    metaDescription:
      "Looking for an optometrist in Oradell, NJ? Riverdell Vision offers physician-led eye exams, myopia management, dry eye, and specialty lenses at 297 Kinderkamack Rd.",
    town: "Oradell",
    region: "NJ",
    distance: "Our home office, right on Kinderkamack Road.",
    intro:
      "Riverdell Vision is a physician-led optometry practice in the heart of Oradell. From routine family eye exams to specialty care most local offices do not offer, we serve Oradell patients with careful, unhurried attention.",
    angle:
      "Oradell families choose us for thorough exams, updated technology, and a team that treats every visit like real medicine, not a quick prescription check.",
    keywords: ["optometrist Oradell NJ", "eye doctor Oradell NJ", "eye exam Oradell NJ"],
  },
  {
    slug: "eye-doctor-river-edge-nj",
    h1: "Eye Doctor near River Edge, NJ",
    metaTitle: "Eye Doctor near River Edge, NJ | Riverdell Vision",
    metaDescription:
      "Riverdell Vision is a trusted eye doctor minutes from River Edge, NJ. Comprehensive exams, myopia management, dry eye treatment, and specialty contact lenses.",
    town: "River Edge",
    region: "NJ",
    distance: "Just minutes from River Edge, on Kinderkamack Road in Oradell.",
    intro:
      "River Edge families do not have to travel far for specialty eye care. Riverdell Vision sits just up Kinderkamack Road in neighboring Oradell, offering everything from children's exams to advanced dry eye and lens care.",
    angle:
      "A short drive for physician-led care, a curated eyewear boutique, and a calm experience your whole family will actually look forward to.",
    keywords: ["optometrist near River Edge NJ", "eye doctor River Edge NJ"],
  },
  {
    slug: "optometrist-paramus-nj",
    h1: "Optometrist near Paramus, NJ",
    metaTitle: "Optometrist near Paramus, NJ | Riverdell Vision",
    metaDescription:
      "A calmer alternative to the mall optical shops. Riverdell Vision serves Paramus, NJ with physician-led eye exams, myopia management, dry eye, and specialty lenses.",
    town: "Paramus",
    region: "NJ",
    distance: "A quick drive from Paramus via Route 4 and Kinderkamack Road.",
    intro:
      "For Paramus patients tired of rushed, retail-style optical shops, Riverdell Vision offers a different experience: a physician-led practice where eye health comes first and appointments are never hurried.",
    angle:
      "Skip the mall crowds for a practice built around careful diagnosis, honest guidance, and specialty programs you will not find at a big-box optical.",
    keywords: ["optometrist near Paramus NJ", "eye doctor Paramus NJ"],
  },
  {
    slug: "eye-doctor-emerson-nj",
    h1: "Eye Doctor near Emerson, NJ",
    metaTitle: "Eye Doctor near Emerson, NJ | Riverdell Vision",
    metaDescription:
      "Riverdell Vision is a family eye doctor near Emerson, NJ, offering comprehensive exams, pediatric care, myopia management, dry eye treatment, and specialty lenses.",
    town: "Emerson",
    region: "NJ",
    distance: "A short drive south from Emerson on Kinderkamack Road.",
    intro:
      "Riverdell Vision welcomes Emerson families for prevention-first eye care. From a child's first exam through specialty lens fittings, we care for every generation under one roof.",
    angle:
      "Nearby, personal, and genuinely thorough, with specialty programs for the eye problems that need real expertise.",
    keywords: ["optometrist near Emerson NJ", "eye doctor Emerson NJ"],
  },
  {
    slug: "myopia-management-bergen-county",
    h1: "Myopia Management in Bergen County, NJ",
    metaTitle: "Myopia Management in Bergen County, NJ | Riverdell Vision",
    metaDescription:
      "Slow your child's worsening nearsightedness with myopia management in Bergen County, NJ. Ortho-K, multifocal contacts, myopia-control glasses, and atropine at Riverdell Vision.",
    town: "Bergen County",
    region: "NJ",
    distance: "Serving families across Bergen County from our Oradell office.",
    intro:
      "Riverdell Vision runs one of Bergen County's dedicated myopia management programs, helping slow the progression of children's nearsightedness with personalized, evidence-informed treatment plans.",
    angle:
      "Families across Bergen County come to us for a real plan to protect their child's vision, not just a stronger prescription every year.",
    serviceSlug: "myopia-management",
    keywords: ["myopia management Bergen County", "child myopia control Bergen County", "ortho-k NJ"],
  },
  {
    slug: "dry-eye-doctor-bergen-county",
    h1: "Dry Eye Doctor in Bergen County, NJ",
    metaTitle: "Dry Eye Doctor in Bergen County, NJ | Riverdell Vision",
    metaDescription:
      "Chronic dry, burning, or watery eyes? Riverdell Vision offers real dry eye evaluation and treatment in Bergen County, NJ, including in-office therapies for the underlying cause.",
    town: "Bergen County",
    region: "NJ",
    distance: "Serving dry eye patients across Bergen County from Oradell.",
    intro:
      "If drops are not enough anymore, Riverdell Vision offers a dedicated dry eye program for patients across Bergen County, finding and treating the underlying cause rather than masking symptoms.",
    angle:
      "Bergen County patients come to us for lasting relief from chronic dry eye, backed by a real diagnostic evaluation and modern in-office treatments.",
    serviceSlug: "dry-eye-treatment",
    keywords: ["dry eye doctor Bergen County", "dry eye treatment Bergen County NJ"],
  },
  {
    slug: "scleral-lenses-bergen-county",
    h1: "Scleral & Specialty Lenses in Bergen County, NJ",
    metaTitle: "Scleral & Specialty Lenses in Bergen County, NJ | Riverdell Vision",
    metaDescription:
      "Scleral and specialty contact lenses in Bergen County, NJ for keratoconus, irregular corneas, severe dry eye, and hard-to-fit prescriptions. Riverdell Vision in Oradell.",
    town: "Bergen County",
    region: "NJ",
    distance: "The specialty lens destination for Bergen County, based in Oradell.",
    intro:
      "For eyes that ordinary contacts cannot fit, Riverdell Vision fits scleral and specialty lenses for patients across Bergen County, including keratoconus, irregular corneas, and severe dry eye.",
    angle:
      "Patients told they cannot wear contacts often can, with the right specialty lens and a clinician who fits them.",
    serviceSlug: "specialty-contact-lenses",
    keywords: ["scleral lenses Bergen County", "specialty contact lenses Bergen County", "keratoconus contact lenses NJ"],
  },
  {
    slug: "pediatric-eye-doctor-bergen-county",
    h1: "Pediatric Eye Doctor in Bergen County, NJ",
    metaTitle: "Pediatric Eye Doctor in Bergen County, NJ | Riverdell Vision",
    metaDescription:
      "Gentle, thorough pediatric eye exams in Bergen County, NJ. Riverdell Vision offers children's eye care and myopia management with a prevention-first approach.",
    town: "Bergen County",
    region: "NJ",
    distance: "Caring for Bergen County children from our Oradell office.",
    intro:
      "Riverdell Vision is a favorite pediatric eye doctor for Bergen County families, with a patient, prevention-first approach to children's vision and a natural path into myopia management when it is needed.",
    angle:
      "Careful and kind with kids, and serious about catching the vision issues that a quick school screening can miss.",
    keywords: ["pediatric eye doctor Bergen County", "pediatric optometrist Oradell NJ"],
  },
];

export function getArea(slug: string) {
  return AREAS.find((a) => a.slug === slug);
}
