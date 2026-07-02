// Flagship service content. Structured for both patients and answer engines:
// each page leads with a plain-English direct-answer block, then who-it-is-for,
// how the practice evaluates it, what treatment involves, and FAQs. Copy is
// deliberately conservative (no medical guarantees) and carries a reviewed-by
// byline so a clinician approval step is visible before publishing.

export type ServiceContent = {
  slug: string;
  name: string;
  shortName: string;
  icon: "eye" | "droplets" | "lens" | "baby" | "stethoscope" | "glasses";
  image: string;
  imageAlt: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  directAnswer: string;
  problem: string;
  whoFor: string[];
  whenToSee: string[];
  howWeEvaluate: { title: string; body: string }[];
  whatTreatment: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  keywords: string[];
  related: string[];
  metaTitle: string;
  metaDescription: string;
  reviewedBy: string;
  dateReviewed: string;
};

export const SERVICES: ServiceContent[] = [
  {
    slug: "myopia-management",
    name: "Myopia Management",
    shortName: "Myopia Management",
    icon: "eye",
    image: "/images/myopia.jpeg",
    imageAlt:
      "A young child trying on a trial frame with a parent nearby during a calm myopia exam",
    eyebrow: "For growing eyes",
    headline: "Help slow your child's worsening nearsightedness.",
    subhead:
      "A personalized myopia management plan built around your child, not a one-size prescription that only gets stronger each year.",
    directAnswer:
      "Myopia management is a set of evidence-informed treatments that aim to slow how quickly a child's nearsightedness gets worse. At Riverdell Vision, Dr. Mina Han evaluates each child and, when appropriate, recommends one of four approaches: orthokeratology (overnight lenses), soft multifocal contact lenses, myopia-control spectacle lenses, or low-dose atropine eye drops. The goal is not just clearer vision today, but a lower final prescription and reduced long-term eye-health risk.",
    problem:
      "Nearsightedness has always existed, but it is progressing faster and starting younger, in step with more time on screens and less time outdoors. Standard glasses correct today's blur but do nothing to slow the underlying change, so many children need a stronger prescription year after year. Higher myopia is more than an inconvenience: it raises lifelong risk of retinal problems, glaucoma, and cataract.",
    whoFor: [
      "Children whose prescription has increased noticeably in the past year",
      "Kids who started needing glasses before age 10",
      "Families with a history of high nearsightedness",
      "Parents who want to do more than update the prescription",
    ],
    whenToSee: [
      "Your child squints, sits close to screens, or complains of blur at distance",
      "A recent exam showed a jump in prescription",
      "Your child is spending long hours on near work with little time outdoors",
    ],
    howWeEvaluate: [
      {
        title: "Baseline measurements",
        body: "We record your child's refraction and axial length so progression can be tracked precisely over time, not estimated from memory.",
      },
      {
        title: "Candidacy review",
        body: "Dr. Han reviews age, prescription, lifestyle, and eye health to match the right treatment to your child rather than defaulting to one option.",
      },
      {
        title: "A clear plan and follow-up",
        body: "You leave with a written plan, expected timeline, and a follow-up schedule to confirm the approach is working and adjust if needed.",
      },
    ],
    whatTreatment: [
      {
        title: "Orthokeratology (Ortho-K)",
        body: "Custom lenses worn overnight gently reshape the front of the eye so your child can see clearly during the day without glasses or daytime contacts.",
      },
      {
        title: "Soft multifocal contact lenses",
        body: "Specially designed daytime soft lenses that correct vision while signaling the eye to slow its growth.",
      },
      {
        title: "Myopia-control spectacles",
        body: "Modern lens designs that look like ordinary glasses but are engineered to reduce progression, a good fit for younger children.",
      },
      {
        title: "Low-dose atropine",
        body: "A once-nightly, low-concentration eye drop used on its own or alongside another treatment to slow progression.",
      },
    ],
    faqs: [
      {
        q: "At what age should myopia management start?",
        a: "Earlier is generally better, because more progression happens in younger, growing eyes. Many children begin between ages 6 and 12, but the right time depends on your child's prescription and how quickly it is changing. An evaluation is the best way to know.",
      },
      {
        q: "Does myopia management cure nearsightedness?",
        a: "No treatment reverses myopia or guarantees a specific result. The goal is to slow progression so your child ends up with a lower final prescription and less long-term risk. We track measurements over time so you can see how the plan is working.",
      },
      {
        q: "Is Ortho-K safe for children?",
        a: "Orthokeratology has been used in children for many years and is considered safe when lenses are properly fit and cared for. We teach families thorough handling and hygiene and monitor eye health at every follow-up.",
      },
      {
        q: "Will insurance cover myopia management?",
        a: "Coverage varies. Some parts of an evaluation may be covered while specialty materials often are not. Our team will review your benefits and give you clear pricing before you commit to a plan.",
      },
    ],
    keywords: [
      "myopia management Oradell NJ",
      "myopia management Bergen County",
      "child myopia control Bergen County",
      "ortho-k Oradell NJ",
    ],
    related: ["specialty-contact-lenses", "dry-eye-treatment"],
    metaTitle: "Myopia Management for Children in Oradell & Bergen County, NJ",
    metaDescription:
      "Slow your child's worsening nearsightedness with a personalized myopia management plan at Riverdell Vision in Oradell, NJ. Ortho-K, multifocal contacts, myopia-control glasses, and atropine. Request a consult.",
    reviewedBy: "Dr. Mina Han, OD",
    dateReviewed: "June 2026",
  },
  {
    slug: "dry-eye-treatment",
    name: "Dry Eye Treatment",
    shortName: "Dry Eye",
    icon: "droplets",
    image: "/images/dry-eye.jpeg",
    imageAlt: "An adult resting comfortably in warm light, eyes gently closed",
    eyebrow: "Real relief",
    headline: "Real answers for chronic dry, burning, tired eyes.",
    subhead:
      "If drops are not enough anymore, there is usually a reason. We find it, then treat it, instead of asking you to live with it.",
    directAnswer:
      "Dry eye is a common, treatable medical condition, not just an occasional annoyance. At Riverdell Vision's dry eye evaluation, Dr. Mina Han identifies why your eyes are dry, most often a problem with the oil glands in your eyelids or the quality of your tears, and builds a treatment plan. Options range from targeted drops and eyelid therapies to in-office treatments for the underlying gland dysfunction. The aim is lasting comfort, not a lifetime of temporary relief.",
    problem:
      "Burning, grittiness, watering, fluctuating vision, and tired eyes by the afternoon are the everyday signs of dry eye. Over-the-counter drops can mask symptoms, but they rarely fix the cause. For most people, the real issue is meibomian gland dysfunction, the eyelid glands that should release a healthy layer of oil onto the tear film are blocked or underperforming, so tears evaporate too fast.",
    whoFor: [
      "Anyone who relies on drops through the day and still feels irritation",
      "Contact lens wearers whose lenses have become uncomfortable",
      "People with burning, gritty, watery, or fluctuating vision",
      "Long screen users, and patients considering LASIK",
    ],
    whenToSee: [
      "Your eyes burn, sting, or feel gritty most days",
      "Drops help for minutes, then the discomfort returns",
      "Your vision blurs and clears when you blink",
      "Contacts you once tolerated now feel dry by midday",
    ],
    howWeEvaluate: [
      {
        title: "A dedicated dry eye evaluation",
        body: "This is not a rushed add-on to a glasses check. We take time to assess your symptoms, tear quality, and the health of your eyelid glands.",
      },
      {
        title: "Finding the cause",
        body: "We look at whether the problem is too few tears, poor-quality tears, gland blockage, inflammation, or a mix, because the cause determines the fix.",
      },
      {
        title: "A staged plan",
        body: "You get a plan that starts with the least invasive effective step and escalates only if needed, with follow-up to confirm real improvement.",
      },
    ],
    whatTreatment: [
      {
        title: "Targeted at-home therapy",
        body: "The right lubricants, eyelid hygiene, warm therapy, and nutrition guidance, matched to your specific type of dry eye rather than guessed.",
      },
      {
        title: "Prescription treatment",
        body: "When inflammation is driving symptoms, prescription drops can calm the surface and help your eyes make healthier tears.",
      },
      {
        title: "In-office gland therapies",
        body: "For meibomian gland dysfunction, in-office heat-based and light-based treatments can restore oil flow and give longer-lasting relief.",
      },
    ],
    faqs: [
      {
        q: "Why do my eyes water if they are dry?",
        a: "Watering is a common dry eye symptom. When the surface of the eye is irritated, it triggers a flood of reflex tears that drain away quickly without fixing the underlying dryness. Treating the cause usually reduces the watering.",
      },
      {
        q: "Are artificial tears enough?",
        a: "For mild, occasional dryness, sometimes. For chronic symptoms, drops usually only mask the problem. A dry eye evaluation identifies the cause so treatment can actually improve it rather than temporarily cover it.",
      },
      {
        q: "How long until I feel better?",
        a: "It depends on the cause and severity. Some people feel relief within a couple of weeks of the right plan, while gland-related dry eye can take longer and may need in-office treatment. We schedule follow-up so we can confirm progress and adjust.",
      },
      {
        q: "Is dry eye treatment covered by insurance?",
        a: "A medical dry eye evaluation is often billable to medical insurance, while some advanced in-office treatments are not covered. We will explain what to expect and provide clear pricing in advance.",
      },
    ],
    keywords: [
      "dry eye doctor Oradell NJ",
      "dry eye treatment Bergen County",
      "meibomian gland dysfunction NJ",
    ],
    related: ["specialty-contact-lenses", "myopia-management"],
    metaTitle: "Dry Eye Treatment in Oradell & Bergen County, NJ",
    metaDescription:
      "Chronic dry, burning, or watery eyes? Riverdell Vision in Oradell, NJ offers a real dry eye evaluation and treatment for the underlying cause, including in-office gland therapies. Request an evaluation.",
    reviewedBy: "Dr. Mina Han, OD",
    dateReviewed: "June 2026",
  },
  {
    slug: "specialty-contact-lenses",
    name: "Specialty & Scleral Contact Lenses",
    shortName: "Specialty Lenses",
    icon: "lens",
    image: "/images/specialty-lens.jpeg",
    imageAlt: "A specialty scleral contact lens balanced on a fingertip in soft light",
    eyebrow: "When regular contacts fail",
    headline: "Custom lenses for eyes told regular contacts won't work.",
    subhead:
      "Keratoconus, irregular corneas, severe dry eye, and hard-to-fit prescriptions call for lenses built around your eye, not pulled from a box.",
    directAnswer:
      "Specialty contact lenses, including scleral lenses, are custom-designed medical devices for eyes that ordinary contacts cannot fit or comfortably correct. At Riverdell Vision, Dr. Mina Han fits scleral and other specialty lenses for keratoconus, irregular or post-surgical corneas, severe dry eye, high prescriptions, and long-standing contact lens discomfort. Scleral lenses vault over the cornea and rest on the white of the eye, creating a smooth optical surface and a cushion of fluid that can dramatically improve both vision and comfort.",
    problem:
      "Some eyes simply do not fit the standard lens catalog. A cornea shaped by keratoconus or refractive surgery, a very high or astigmatic prescription, or a severely dry ocular surface can make off-the-shelf contacts blurry, unstable, or painful. Patients are often told that contacts are not an option, when in reality they need a different kind of lens and a clinician who fits them.",
    whoFor: [
      "People diagnosed with keratoconus or an irregular cornea",
      "Patients after corneal surgery, transplant, or refractive surgery",
      "Anyone with severe dry eye who cannot tolerate normal contacts",
      "High or highly astigmatic prescriptions that never felt sharp",
    ],
    whenToSee: [
      "You were told you are not a candidate for contact lenses",
      "Your vision is not crisp even in your best glasses",
      "Contacts have always felt unstable, blurry, or uncomfortable",
      "You have keratoconus or a diagnosed corneal irregularity",
    ],
    howWeEvaluate: [
      {
        title: "Corneal mapping",
        body: "We measure the precise shape of your eye so the lens is designed to your anatomy rather than approximated.",
      },
      {
        title: "Diagnostic fitting",
        body: "You try trial lenses in the office so we can assess fit, comfort, and vision before your custom lenses are ordered.",
      },
      {
        title: "Teaching and follow-up",
        body: "We make sure you can confidently handle the lenses and we adjust the design over follow-up visits until it is right.",
      },
    ],
    whatTreatment: [
      {
        title: "Scleral lenses",
        body: "Larger lenses that vault the cornea and hold a reservoir of fluid, ideal for irregular corneas and severe dryness where comfort and stable vision matter most.",
      },
      {
        title: "Custom soft and rigid designs",
        body: "For high prescriptions and astigmatism, made-to-order soft or rigid gas-permeable lenses that standard fits cannot match.",
      },
      {
        title: "Keratoconus-specific fitting",
        body: "Lens designs developed for the cone-shaped cornea of keratoconus to restore sharpness that glasses cannot provide.",
      },
    ],
    faqs: [
      {
        q: "What are scleral lenses?",
        a: "Scleral lenses are larger rigid lenses that arch over the entire cornea and rest gently on the white of the eye. The space between the lens and cornea holds fluid, which creates a smooth optical surface and continuous hydration, helping both vision and comfort.",
      },
      {
        q: "Are specialty lenses hard to get used to?",
        a: "Most patients adapt well, and many with keratoconus or severe dry eye describe scleral lenses as far more comfortable than anything they have tried. We teach handling step by step and provide follow-up support.",
      },
      {
        q: "I was told I cannot wear contacts. Is that true?",
        a: "Often it is not. Being a poor candidate for standard contacts does not mean specialty lenses are off the table. A specialty fitting evaluation is the way to find out what is possible for your eyes.",
      },
      {
        q: "Does insurance cover specialty contact lenses?",
        a: "Some medically necessary specialty lenses, such as those for keratoconus, may have coverage. Benefits vary widely, so we verify your plan and provide clear pricing before ordering anything.",
      },
    ],
    keywords: [
      "scleral lenses Bergen County",
      "specialty contact lenses Bergen County",
      "keratoconus contact lenses NJ",
    ],
    related: ["dry-eye-treatment", "myopia-management"],
    metaTitle: "Scleral & Specialty Contact Lenses in Bergen County, NJ",
    metaDescription:
      "Scleral and specialty contact lenses at Riverdell Vision in Oradell, NJ for keratoconus, irregular corneas, severe dry eye, and hard-to-fit prescriptions. Request a specialty lens evaluation.",
    reviewedBy: "Dr. Mina Han, OD",
    dateReviewed: "June 2026",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

// The service ladder shown on the homepage: the three flagship pages plus the
// supporting family/medical/optical lines that round out the practice.
export const SERVICE_LADDER: {
  title: string;
  blurb: string;
  href: string;
  icon: ServiceContent["icon"];
  flagship?: boolean;
}[] = [
  {
    title: "Myopia Management",
    blurb:
      "Slow a child's worsening nearsightedness with Ortho-K, multifocal contacts, control lenses, or atropine.",
    href: "/myopia-management",
    icon: "eye",
    flagship: true,
  },
  {
    title: "Dry Eye Treatment",
    blurb:
      "Find and treat the cause of chronic burning, gritty, watery eyes, not just cover the symptoms.",
    href: "/dry-eye-treatment",
    icon: "droplets",
    flagship: true,
  },
  {
    title: "Specialty & Scleral Lenses",
    blurb:
      "Custom lenses for keratoconus, irregular corneas, severe dry eye, and hard-to-fit prescriptions.",
    href: "/specialty-contact-lenses",
    icon: "lens",
    flagship: true,
  },
  {
    title: "Pediatric & Family Care",
    blurb:
      "Prevention-first eye care for children, parents, and grandparents, all under one roof.",
    href: "/about#care",
    icon: "baby",
  },
  {
    title: "Medical Eye Care",
    blurb:
      "Diabetic exams, glaucoma monitoring, red eye, and ocular surface disease, eye health, not just prescriptions.",
    href: "/about#care",
    icon: "stethoscope",
  },
  {
    title: "Premium Eyewear",
    blurb:
      "A curated designer eyewear boutique with clinical precision and unhurried, personal guidance.",
    href: "/oradell#eyewear",
    icon: "glasses",
  },
];
