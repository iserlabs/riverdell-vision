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
  // W1a local-findability additions
  leadService?: string; // service slug a town page emphasizes
  route?: string; // real, owner-approved drive route + time
  landmarks?: string[]; // real cross-streets / landmarks
  ownerNote?: string; // verbatim owner sentence
  reviewService?: string; // service slug for review filtering (defaults to serviceSlug)
};

export const AREAS: Area[] = [
  {
    slug: "optometrist-oradell-nj",
    h1: "Optometrist in Oradell, NJ",
    metaTitle: "Optometrist in Oradell, NJ",
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
    metaTitle: "Eye Doctor near River Edge, NJ",
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
    metaTitle: "Optometrist near Paramus, NJ",
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
    metaTitle: "Eye Doctor near Emerson, NJ",
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
    metaTitle: "Myopia Management in Bergen County, NJ",
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
    metaTitle: "Dry Eye Doctor in Bergen County, NJ",
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
    metaTitle: "Scleral & Specialty Lenses in Bergen County, NJ",
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
    metaTitle: "Pediatric Eye Doctor in Bergen County, NJ",
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

  // --- W1a: town pages (geo-intent). Lead service chosen to complement, not
  // duplicate, any companion service+town page. Geo facts (route) are drafts
  // pending owner approval; see docs/geo-facts-review.md.
  {
    slug: "eye-doctor-hackensack-nj",
    h1: "Eye Doctor near Hackensack, NJ",
    metaTitle: "Eye Doctor near Hackensack, NJ",
    metaDescription:
      "Riverdell Vision is a physician-led eye doctor minutes from Hackensack, NJ, offering medical eye care, diabetic and glaucoma exams, dry eye treatment, and specialty lenses.",
    town: "Hackensack",
    region: "NJ",
    distance: "About 10 minutes north of Hackensack on Kinderkamack Road.",
    intro:
      "Hackensack patients come to Riverdell Vision for eye care treated like real medicine. Beyond routine exams, our doctors handle diabetic eye exams, glaucoma monitoring, and urgent eye problems, and coordinate with nearby specialists when surgery is needed.",
    angle:
      "A calm, physician-led practice a short drive from the county seat, built around careful diagnosis and eye health, not just a new prescription.",
    leadService: "medical-eye-care",
    route: "About 10 minutes from Hackensack, north on Kinderkamack Road.",
    keywords: ["eye doctor near Hackensack NJ", "optometrist Hackensack NJ", "diabetic eye exam Hackensack NJ"],
  },
  {
    slug: "eye-doctor-new-milford-nj",
    h1: "Eye Doctor in New Milford, NJ",
    metaTitle: "Eye Doctor near New Milford, NJ",
    metaDescription:
      "Riverdell Vision is a family eye doctor just minutes from New Milford, NJ, with pediatric exams and a dedicated myopia management program for growing eyes.",
    town: "New Milford",
    region: "NJ",
    distance: "Right next door, minutes up Kinderkamack Road from New Milford.",
    intro:
      "New Milford families barely have to travel for specialty children's eye care. Just up Kinderkamack Road, Riverdell Vision runs one of the area's dedicated myopia management programs, helping slow a child's worsening nearsightedness rather than simply strengthening the prescription each year.",
    angle:
      "The neighboring practice New Milford parents trust for thorough pediatric exams and a real plan to protect a child's vision.",
    leadService: "myopia-management",
    route: "About 6 minutes north along Kinderkamack Road from New Milford.",
    keywords: ["eye doctor New Milford NJ", "optometrist New Milford NJ", "myopia management New Milford NJ"],
  },
  {
    slug: "eye-doctor-maywood-nj",
    h1: "Eye Doctor near Maywood, NJ",
    metaTitle: "Eye Doctor near Maywood, NJ",
    metaDescription:
      "Riverdell Vision serves Maywood, NJ with physician-led medical eye care, comprehensive exams, dry eye treatment, and specialty contact lenses.",
    town: "Maywood",
    region: "NJ",
    distance: "About 10 minutes from Maywood via Essex Street.",
    intro:
      "For Maywood patients who want more than a quick glasses check, Riverdell Vision provides thorough, unhurried medical eye care, from diabetic and glaucoma exams to red-eye and ocular-surface problems, with modern imaging and a plan you understand.",
    angle:
      "A short drive for eye care handled as medicine, with the time and technology a rushed retail exam cannot offer.",
    leadService: "medical-eye-care",
    route: "About 10 minutes from Maywood via Essex Street and Kinderkamack Road.",
    keywords: ["eye doctor near Maywood NJ", "optometrist Maywood NJ"],
  },
  {
    slug: "eye-doctor-bergenfield-nj",
    h1: "Eye Doctor near Bergenfield, NJ",
    metaTitle: "Eye Doctor near Bergenfield, NJ",
    metaDescription:
      "Riverdell Vision is a family eye doctor near Bergenfield, NJ, with a dedicated dry eye program, comprehensive exams, and specialty contact lenses.",
    town: "Bergenfield",
    region: "NJ",
    distance: "About 10 minutes from Bergenfield via New Bridge Road.",
    intro:
      "Bergenfield patients tired of chronic dry, burning, or watery eyes find real answers at Riverdell Vision, where a dedicated dry eye evaluation looks for the underlying cause, often the eyelid oil glands, instead of sending you home with another bottle of drops.",
    angle:
      "A nearby practice known for treating dry eye as the medical condition it is, with in-office therapies for lasting relief.",
    leadService: "dry-eye-treatment",
    route: "About 10 minutes from Bergenfield via New Bridge Road.",
    keywords: ["eye doctor near Bergenfield NJ", "dry eye doctor Bergenfield NJ", "optometrist Bergenfield NJ"],
  },
  {
    slug: "eye-doctor-dumont-nj",
    h1: "Eye Doctor near Dumont, NJ",
    metaTitle: "Eye Doctor near Dumont, NJ",
    metaDescription:
      "Riverdell Vision serves Dumont, NJ with physician-led medical and family eye care, diabetic and glaucoma exams, and specialty lenses, minutes away in Oradell.",
    town: "Dumont",
    region: "NJ",
    distance: "About 8 minutes from Dumont via New Milford Avenue.",
    intro:
      "Riverdell Vision cares for Dumont families across every age, from a child's first exam to the medical eye care adults and seniors need, including diabetic exams and glaucoma monitoring, all a few minutes down the road in Oradell.",
    angle:
      "Close, personal, and genuinely thorough, with the medical depth to catch the eye problems that have no early symptoms.",
    leadService: "medical-eye-care",
    route: "About 8 minutes from Dumont via New Milford Avenue and Kinderkamack Road.",
    keywords: ["eye doctor near Dumont NJ", "optometrist Dumont NJ"],
  },
  {
    slug: "eye-doctor-westwood-nj",
    h1: "Eye Doctor near Westwood, NJ",
    metaTitle: "Eye Doctor near Westwood, NJ",
    metaDescription:
      "Riverdell Vision is a family eye doctor a short drive from Westwood, NJ, with pediatric exams and a dedicated myopia management program for children.",
    town: "Westwood",
    region: "NJ",
    distance: "About 8 minutes south of Westwood on Kinderkamack Road.",
    intro:
      "Westwood and Pascack Valley families come to Riverdell Vision for careful children's eye care and a dedicated myopia management program, a straight shot down Kinderkamack Road, that aims to slow a child's nearsightedness with Ortho-K, control lenses, or atropine.",
    angle:
      "The Pascack Valley's short drive for a real myopia plan, not just a stronger prescription each year.",
    leadService: "myopia-management",
    route: "About 8 minutes south down Kinderkamack Road from Westwood.",
    keywords: ["eye doctor near Westwood NJ", "optometrist Westwood NJ", "myopia management Westwood NJ"],
  },
  {
    slug: "optometrist-ridgewood-nj",
    h1: "Optometrist near Ridgewood, NJ",
    metaTitle: "Optometrist near Ridgewood, NJ",
    metaDescription:
      "Riverdell Vision serves Ridgewood, NJ with physician-led eye care: comprehensive and medical exams, dry eye treatment, specialty lenses, and children's myopia management.",
    town: "Ridgewood",
    region: "NJ",
    distance: "About 15 minutes from Ridgewood via Paramus and Century Road.",
    intro:
      "Ridgewood families who want physician-led eye care choose Riverdell Vision for thorough, unhurried exams and the medical depth to manage eye health over time, from diabetic and glaucoma monitoring to specialty lens fittings most local offices do not offer.",
    angle:
      "Worth the short drive from Ridgewood for careful, technology-forward care and specialty programs a general optical cannot match.",
    leadService: "medical-eye-care",
    route: "About 15 minutes from Ridgewood via Paramus Road and Century Road.",
    keywords: ["optometrist near Ridgewood NJ", "eye doctor Ridgewood NJ"],
  },
  {
    slug: "eye-doctor-englewood-nj",
    h1: "Eye Doctor near Englewood, NJ",
    metaTitle: "Eye Doctor near Englewood, NJ",
    metaDescription:
      "Riverdell Vision serves Englewood, NJ with a dedicated dry eye program, comprehensive and medical eye care, and specialty scleral contact lenses.",
    town: "Englewood",
    region: "NJ",
    distance: "About 15 minutes from Englewood via Route 4.",
    intro:
      "Englewood patients bring chronic dry eye, complex prescriptions, and a wish for unhurried care to Riverdell Vision, where a dedicated dry eye evaluation finds the underlying cause and modern in-office therapies deliver relief that drops alone never could.",
    angle:
      "A short drive over Route 4 for dry eye care treated as real medicine, plus the specialty lens expertise for eyes that need it.",
    leadService: "dry-eye-treatment",
    route: "About 15 minutes from Englewood via Route 4 and Kinderkamack Road.",
    keywords: ["eye doctor near Englewood NJ", "dry eye doctor Englewood NJ", "optometrist Englewood NJ"],
  },
  {
    slug: "eye-doctor-tenafly-nj",
    h1: "Eye Doctor near Tenafly, NJ",
    metaTitle: "Eye Doctor near Tenafly, NJ",
    metaDescription:
      "Riverdell Vision serves Tenafly, NJ with specialty and scleral contact lenses, comprehensive and medical eye care, and children's myopia management.",
    town: "Tenafly",
    region: "NJ",
    distance: "About 15 minutes from Tenafly via County Road.",
    intro:
      "Tenafly patients who have been told regular contacts will not work often find they can at Riverdell Vision, where Dr. Han fits scleral and specialty lenses for keratoconus, irregular corneas, and severe dry eye, alongside thorough family and children's eye care.",
    angle:
      "The Northern Valley's destination for custom specialty lenses and physician-led care, a short drive from Tenafly.",
    leadService: "specialty-contact-lenses",
    route: "About 15 minutes from Tenafly via County Road and New Milford.",
    keywords: ["eye doctor near Tenafly NJ", "scleral lenses Tenafly NJ", "optometrist Tenafly NJ"],
  },
  {
    slug: "eye-doctor-closter-nj",
    h1: "Eye Doctor near Closter, NJ",
    metaTitle: "Eye Doctor near Closter, NJ",
    metaDescription:
      "Riverdell Vision serves Closter, NJ with a dedicated dry eye program, comprehensive and medical eye care, and specialty contact lenses.",
    town: "Closter",
    region: "NJ",
    distance: "About 15 minutes from Closter via Closter Dock Road.",
    intro:
      "Closter and Northern Valley patients come to Riverdell Vision for the kind of eye care that takes its time, including a dedicated dry eye program that treats the cause of chronic irritation rather than masking it, and the medical depth to manage eye health year after year.",
    angle:
      "A worthwhile drive from Closter for unhurried, physician-led care and lasting dry eye relief.",
    leadService: "dry-eye-treatment",
    route: "About 15 minutes from Closter via Closter Dock Road and Kinderkamack Road.",
    keywords: ["eye doctor near Closter NJ", "dry eye doctor Closter NJ", "optometrist Closter NJ"],
  },

  // --- W1a: service+town pages (high-intent specialty). serviceSlug drives the
  // service link + service-matched reviews.
  {
    slug: "myopia-management-ridgewood-nj",
    h1: "Myopia Management near Ridgewood, NJ",
    metaTitle: "Myopia Management for Kids near Ridgewood, NJ",
    metaDescription:
      "Slow your child's worsening nearsightedness with myopia management near Ridgewood, NJ. Ortho-K, multifocal contacts, control glasses, and atropine at Riverdell Vision.",
    town: "Ridgewood",
    region: "NJ",
    distance: "About 15 minutes from Ridgewood via Paramus and Century Road.",
    intro:
      "Ridgewood parents who watch their child's prescription climb every year come to Riverdell Vision for a real myopia management plan. Dr. Mina Han evaluates each child and matches one of four evidence-informed approaches, Ortho-K, soft multifocal contacts, control spectacles, or low-dose atropine, to slow how fast the nearsightedness progresses.",
    angle:
      "A dedicated children's myopia program a short drive from Ridgewood, built to lower a child's final prescription, not just correct this year's blur.",
    serviceSlug: "myopia-management",
    route: "About 15 minutes from Ridgewood via Paramus Road and Century Road.",
    keywords: ["myopia management Ridgewood NJ", "ortho-k Ridgewood NJ", "child myopia control Ridgewood NJ"],
  },
  {
    slug: "myopia-management-tenafly-nj",
    h1: "Myopia Management near Tenafly, NJ",
    metaTitle: "Myopia Management for Kids near Tenafly, NJ",
    metaDescription:
      "Myopia management near Tenafly, NJ at Riverdell Vision: Ortho-K, multifocal contacts, control glasses, and low-dose atropine to slow a child's nearsightedness.",
    town: "Tenafly",
    region: "NJ",
    distance: "About 15 minutes from Tenafly via County Road.",
    intro:
      "For Tenafly families, Riverdell Vision offers a dedicated myopia management program that goes beyond a stronger prescription each year. Dr. Mina Han tracks each child's measurements and builds a personalized plan, using Ortho-K, multifocal contacts, control lenses, or atropine, to slow progression and protect long-term eye health.",
    angle:
      "A short drive from Tenafly for a measured, personalized plan to slow a child's worsening nearsightedness.",
    serviceSlug: "myopia-management",
    route: "About 15 minutes from Tenafly via County Road and New Milford.",
    keywords: ["myopia management Tenafly NJ", "ortho-k Tenafly NJ", "child myopia control Tenafly NJ"],
  },
  {
    slug: "myopia-management-closter-nj",
    h1: "Myopia Management near Closter, NJ",
    metaTitle: "Myopia Management for Kids near Closter, NJ",
    metaDescription:
      "Myopia management near Closter, NJ at Riverdell Vision: Ortho-K, multifocal contacts, myopia-control glasses, and atropine to slow a child's nearsightedness.",
    town: "Closter",
    region: "NJ",
    distance: "About 15 minutes from Closter via Closter Dock Road.",
    intro:
      "Closter parents come to Riverdell Vision when a child's nearsightedness keeps getting worse. Our dedicated myopia management program matches the right approach to each child, Ortho-K, soft multifocal contacts, control spectacles, or low-dose atropine, and tracks progress over time to confirm it is working.",
    angle:
      "A worthwhile drive from Closter for a genuine plan to slow a child's myopia, not just a new prescription each visit.",
    serviceSlug: "myopia-management",
    route: "About 15 minutes from Closter via Closter Dock Road and Kinderkamack Road.",
    keywords: ["myopia management Closter NJ", "ortho-k Closter NJ", "child myopia control Closter NJ"],
  },
  {
    slug: "scleral-lenses-hackensack-nj",
    h1: "Scleral & Specialty Lenses near Hackensack, NJ",
    metaTitle: "Scleral & Specialty Contact Lenses near Hackensack, NJ",
    metaDescription:
      "Scleral and specialty contact lenses near Hackensack, NJ for keratoconus, irregular corneas, and severe dry eye. Custom-fit at Riverdell Vision in Oradell.",
    town: "Hackensack",
    region: "NJ",
    distance: "About 10 minutes from Hackensack on Kinderkamack Road.",
    intro:
      "Hackensack patients told that ordinary contacts will not work often can wear lenses again at Riverdell Vision. Dr. Mina Han fits scleral and specialty lenses for keratoconus, irregular or post-surgical corneas, and severe dry eye, custom-designed to the exact shape of each eye for comfort and crisp vision.",
    angle:
      "A short drive from Hackensack for custom scleral and specialty lenses, and a clinician who fits the eyes others gave up on.",
    serviceSlug: "specialty-contact-lenses",
    route: "About 10 minutes from Hackensack, north on Kinderkamack Road.",
    keywords: ["scleral lenses Hackensack NJ", "specialty contact lenses Hackensack NJ", "keratoconus lenses Hackensack NJ"],
  },
  {
    slug: "scleral-lenses-englewood-nj",
    h1: "Scleral & Specialty Lenses near Englewood, NJ",
    metaTitle: "Scleral & Specialty Contact Lenses near Englewood, NJ",
    metaDescription:
      "Scleral and specialty contact lenses near Englewood, NJ for keratoconus, irregular corneas, and severe dry eye, custom-fit at Riverdell Vision in Oradell.",
    town: "Englewood",
    region: "NJ",
    distance: "About 15 minutes from Englewood via Route 4.",
    intro:
      "Englewood patients with keratoconus, an irregular cornea, or severe dry eye come to Riverdell Vision for scleral and specialty lenses built around their eyes. Dr. Mina Han maps each cornea precisely and fits custom lenses that create a smooth optical surface, often restoring sharp vision glasses could not.",
    angle:
      "A short drive over Route 4 for specialty lenses that make contacts possible again, fit by a clinician who specializes in difficult eyes.",
    serviceSlug: "specialty-contact-lenses",
    route: "About 15 minutes from Englewood via Route 4 and Kinderkamack Road.",
    keywords: ["scleral lenses Englewood NJ", "specialty contact lenses Englewood NJ", "keratoconus lenses Englewood NJ"],
  },
];

export function getArea(slug: string) {
  return AREAS.find((a) => a.slug === slug);
}
