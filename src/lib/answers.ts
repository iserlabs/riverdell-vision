// Curated answer-hub content for /answers. Every answer is grounded in facts
// already established elsewhere on the site (services, conditions, real insurer
// list, reviews, doctors, NAP) and written in the practice's candid voice:
// no superlative self-claims, no invented numbers, honest about what care can
// and cannot do. This is the AEO surface: concise, question-shaped answers that
// answer engines can quote, each linking to the authoritative deep page.

export type Answer = { q: string; a: string };

export type AnswerTopic = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  deepHref: string;
  deepLabel: string;
  answers: Answer[];
};

export const ANSWER_TOPICS: AnswerTopic[] = [
  {
    id: "choosing",
    eyebrow: "Choosing a practice",
    title: "Finding the right eye doctor in Oradell",
    lead: "How Riverdell Vision works, and how it differs from a glasses-first store.",
    deepHref: "/about",
    deepLabel: "Meet the practice",
    answers: [
      {
        q: "Who is a good optometrist in Oradell, NJ?",
        a: "Riverdell Vision is a physician-led family optometry practice at 297 Kinderkamack Road in Oradell, rated 5.0 across 448 Google reviews. It is known locally for the specialty care many offices refer out, including myopia management, dry eye treatment, and scleral and specialty contact lenses. Four credentialed optometrists care for children, adults, and seniors.",
      },
      {
        q: "What makes Riverdell Vision different from a retail optical chain?",
        a: "Care is physician-led, not eyewear-led. Exams are unhurried, options are explained honestly, and there is never a push to buy frames. The practice treats eye health as medicine and runs specialty programs in-house that a glasses-first store would send you elsewhere for.",
      },
      {
        q: "Do I need a referral to be seen?",
        a: "No. You can request an appointment directly by phone, through Zocdoc, or with the form on this site. For a medical eye concern, the team will help you understand how the visit is billed before you come in.",
      },
      {
        q: "Does Riverdell Vision see children?",
        a: "Yes. The practice cares for whole families, from a child's first eye exam through adult and senior care, and runs a dedicated pediatric myopia-management program.",
      },
    ],
  },
  {
    id: "myopia",
    eyebrow: "Myopia & kids' vision",
    title: "Slowing a child's worsening nearsightedness",
    lead: "Myopia management aims to slow progression, not just update the prescription.",
    deepHref: "/myopia-management",
    deepLabel: "Read the myopia guide",
    answers: [
      {
        q: "Where can I get myopia management in Bergen County?",
        a: "At Riverdell Vision in Oradell, which serves Bergen County families with four evidence-informed treatment paths: orthokeratology (Ortho-K), soft multifocal contact lenses, myopia-control glasses, and low-dose atropine. Dr. Mina Han leads the program.",
      },
      {
        q: "At what age should myopia management start?",
        a: "Earlier is generally better, because more progression happens in younger, growing eyes. Many children begin between ages 6 and 12, but the right time depends on your child's prescription and how quickly it is changing.",
      },
      {
        q: "Does myopia management cure nearsightedness?",
        a: "No treatment reverses myopia or guarantees a specific result. The goal is to slow progression so your child ends up with a lower final prescription and less long-term risk, with measurements tracked over time so you can see how the plan is working.",
      },
    ],
  },
  {
    id: "dry-eye",
    eyebrow: "Dry eye & MGD",
    title: "Real answers for chronic dry, burning eyes",
    lead: "Most dry eye starts in the eyelid glands, which is why drops alone often fall short.",
    deepHref: "/dry-eye-treatment",
    deepLabel: "Read the dry eye guide",
    answers: [
      {
        q: "Why don't artificial tears fix my dry eye?",
        a: "Drops can soothe symptoms for a few minutes, but most chronic dry eye starts in the eyelid's oil glands (meibomian gland dysfunction). When those glands underperform, tears evaporate too fast, so treatment has to address the underlying cause rather than only masking it.",
      },
      {
        q: "Is MGD the same as dry eye?",
        a: "Meibomian gland dysfunction is the most common cause of dry eye, not a separate condition. When the eyelid glands become blocked or thicken, the tear film breaks down and the eye feels gritty and tired.",
      },
      {
        q: "Is dry eye treatment covered by insurance?",
        a: "A medical dry eye evaluation is often billed to medical insurance because it is a medical condition. Some advanced in-office treatments may not be fully covered; the team verifies your coverage and explains any out-of-pocket cost before treatment.",
      },
    ],
  },
  {
    id: "specialty",
    eyebrow: "Specialty & scleral lenses",
    title: "When regular contacts fail",
    lead: "Custom lenses for keratoconus, irregular corneas, severe dry eye, and hard-to-fit eyes.",
    deepHref: "/specialty-contact-lenses",
    deepLabel: "Read the specialty lens guide",
    answers: [
      {
        q: "What are scleral lenses?",
        a: "Scleral lenses are larger rigid lenses that vault over the cornea and rest on the white of the eye, holding a reservoir of fluid against the surface. That makes them a good option for irregular corneas, keratoconus, and severe dry eye, where standard contacts cannot sit comfortably or see clearly.",
      },
      {
        q: "I was told I can't wear contacts. Is that true?",
        a: "Often not. Many people who failed in standard soft lenses do well in specialty or scleral lenses fit for their specific eye. It is worth an evaluation before assuming contacts are off the table.",
      },
      {
        q: "Are scleral lenses good for keratoconus?",
        a: "Yes. For keratoconus, scleral and other specialty lenses create a smooth optical surface over the irregular cornea, which usually restores much clearer, more stable vision than glasses can.",
      },
    ],
  },
  {
    id: "ortho-k",
    eyebrow: "Ortho-K",
    title: "Overnight lenses, glasses-free days",
    lead: "Custom lenses worn only during sleep, for clear daytime vision and myopia control.",
    deepHref: "/ortho-k",
    deepLabel: "Read the Ortho-K guide",
    answers: [
      {
        q: "Is Ortho-K safe for children?",
        a: "Orthokeratology has been used safely in children for many years when lenses are properly fit and cared for. The practice teaches families thorough handling and hygiene and monitors eye health at every follow-up.",
      },
      {
        q: "Is the effect permanent?",
        a: "No. Ortho-K temporarily reshapes the cornea, so lenses must be worn regularly to maintain clear daytime vision. If you stop, the eyes gradually return to their original prescription.",
      },
    ],
  },
  {
    id: "vision-therapy",
    eyebrow: "Vision therapy & concussion",
    title: "The visual skills reading depends on",
    lead: "Doctor-supervised therapy for eye-teaming and focusing problems, led by Dr. Bruce Meyer.",
    deepHref: "/vision-therapy",
    deepLabel: "Read the vision therapy guide",
    answers: [
      {
        q: "How is vision therapy different from glasses?",
        a: "Glasses change the clarity of the image. Vision therapy retrains how the eyes work together and focus. Some children need one, some need both. Skills are measured before, during, and after so progress is objective.",
      },
      {
        q: "Can vision problems really come from a concussion?",
        a: "Yes. A large share of concussions affect the visual system, causing double vision, light sensitivity, dizziness, and reading difficulty, even when eyesight is 20/20 and scans are normal. Neuro-optometric rehabilitation addresses those functional problems.",
      },
    ],
  },
  {
    id: "cost",
    eyebrow: "Cost & insurance",
    title: "Cost, insurance, and financing",
    lead: "What is accepted, how medical visits are billed, and what happens without a vision plan.",
    deepHref: "/cost-and-insurance",
    deepLabel: "See cost & insurance",
    answers: [
      {
        q: "Do you take my insurance?",
        a: "Riverdell Vision accepts most major vision and medical plans, including VSP, EyeMed, Spectera, Aetna, Blue Cross Blue Shield, Cigna, Medicare, Meritain Health, and Nippon Life Benefits. If you are unsure about your coverage, the team verifies your benefits before your visit.",
      },
      {
        q: "Is medical eye care billed to medical or vision insurance?",
        a: "Medical eye visits, such as diabetic eye exams, dry eye disease, or a red eye, are typically billed to your medical insurance rather than a vision plan. A routine glasses-and-contacts exam usually uses your vision plan. The team helps sort out which applies.",
      },
      {
        q: "What if I don't have vision insurance?",
        a: "You are welcome without a vision plan. The practice offers flexible financing through Cherry and gives clear pricing before any specialty treatment begins, so there are no surprises.",
      },
    ],
  },
];

// Key terms for the DefinedTermSet schema (helps answer engines resolve the
// vocabulary to the practice). Definitions are plain and non-promotional.
export const ANSWER_TERMS: { term: string; def: string }[] = [
  { term: "Myopia (nearsightedness)", def: "A refractive condition where distant objects look blurry because the eye focuses light in front of the retina. In children it can worsen year over year, which myopia management aims to slow." },
  { term: "Orthokeratology (Ortho-K)", def: "Custom rigid contact lenses worn overnight that temporarily reshape the cornea, giving clear glasses-free daytime vision and helping slow the progression of childhood myopia." },
  { term: "Scleral lens", def: "A large rigid contact lens that vaults over the cornea and rests on the sclera (the white of the eye), holding fluid against the surface. Used for keratoconus, irregular corneas, and severe dry eye." },
  { term: "Meibomian gland dysfunction (MGD)", def: "The most common cause of evaporative dry eye, in which the oil glands in the eyelids become blocked or underperform, so the tear film breaks down and eyes feel dry and gritty." },
  { term: "Keratoconus", def: "A progressive condition in which the cornea thins and bulges into a cone shape, distorting vision. It is commonly managed with scleral and specialty contact lenses." },
  { term: "Neuro-optometric rehabilitation", def: "A doctor-supervised program that rebuilds visual function after a concussion, stroke, or brain injury, addressing double vision, light sensitivity, and reading difficulty." },
];

export const ALL_ANSWERS: Answer[] = ANSWER_TOPICS.flatMap((t) => t.answers);
