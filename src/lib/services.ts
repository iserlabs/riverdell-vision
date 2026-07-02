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
  {
    slug: "ortho-k",
    name: "Orthokeratology (Ortho-K)",
    shortName: "Ortho-K",
    icon: "lens",
    image: "/images/myopia.jpeg",
    imageAlt: "A young patient who will wake to clear vision after wearing ortho-k lenses overnight",
    eyebrow: "Overnight vision",
    headline: "Clear days without glasses, corrected while your child sleeps.",
    subhead:
      "Ortho-K reshapes vision overnight with custom lenses: a favorite for active kids and a proven way to slow myopia.",
    directAnswer:
      "Orthokeratology, or Ortho-K, uses custom rigid lenses worn only during sleep to gently and temporarily reshape the front of the eye. Children and adults then see clearly all day without glasses or daytime contacts. At Riverdell Vision, Dr. Mina Han fits Ortho-K both for daytime freedom and as one of the most effective ways to slow the progression of a child's nearsightedness.",
    problem:
      "For active kids, glasses fog up, slip, and break, and daytime contacts are not always practical during sports and long school days. Meanwhile, a prescription that keeps climbing raises lifelong eye-health risk. Ortho-K addresses both at once: clear, correction-free days, and a slower rate of myopia progression.",
    whoFor: [
      "Children and teens who play sports or dislike glasses",
      "Families looking to slow myopia progression",
      "Adults who want daytime freedom without surgery",
      "Anyone not ready for, or not a candidate for, LASIK",
    ],
    whenToSee: [
      "Your child is tired of glasses during sports or play",
      "A recent exam showed nearsightedness increasing",
      "You want a non-surgical way to reduce daytime dependence on glasses",
    ],
    howWeEvaluate: [
      { title: "Corneal mapping", body: "We measure the precise shape of the eye so lenses are designed to your child's anatomy." },
      { title: "Candidacy and fit", body: "Dr. Han confirms Ortho-K is appropriate and fits trial lenses to check comfort and response." },
      { title: "Trial and follow-up", body: "We track results over the first nights and follow up to fine-tune the fit and confirm clear, stable daytime vision." },
    ],
    whatTreatment: [
      { title: "Custom overnight lenses", body: "Rigid, highly breathable lenses worn during sleep and removed in the morning." },
      { title: "Daytime freedom", body: "Most patients see clearly through the day with no glasses or contacts, refreshed each night." },
      { title: "Myopia control benefit", body: "For children, Ortho-K also helps slow how quickly the prescription grows over time." },
    ],
    faqs: [
      { q: "Is Ortho-K safe for children?", a: "Ortho-K has been used safely in children for many years when lenses are properly fit and cared for. We teach thorough handling and hygiene and monitor eye health at every visit." },
      { q: "Is the effect permanent?", a: "No. Ortho-K temporarily reshapes the cornea, so lenses must be worn regularly to maintain clear daytime vision. If you stop, the eyes gradually return to their original prescription." },
      { q: "How quickly does it work?", a: "Many patients notice a big improvement within the first few nights, with vision stabilizing over one to two weeks. We follow up closely during this period." },
      { q: "Will insurance cover Ortho-K?", a: "Coverage varies and specialty lens materials are often not covered. We verify your benefits and give you clear pricing before you begin." },
    ],
    keywords: ["ortho-k Oradell NJ", "orthokeratology Bergen County", "ortho-k for myopia NJ"],
    related: ["myopia-management", "specialty-contact-lenses"],
    metaTitle: "Ortho-K (Orthokeratology) in Oradell & Bergen County, NJ",
    metaDescription:
      "Orthokeratology (Ortho-K) at Riverdell Vision in Oradell, NJ: custom overnight lenses for clear, glasses-free days and myopia control. Request an Ortho-K consult.",
    reviewedBy: "Dr. Mina Han, OD",
    dateReviewed: "June 2026",
  },
  {
    slug: "vision-therapy",
    name: "Vision Therapy",
    shortName: "Vision Therapy",
    icon: "eye",
    image: "/images/hero-care.jpeg",
    imageAlt: "A child engaged in a guided visual activity during a vision therapy session",
    eyebrow: "Visual skills",
    headline: "Building the visual skills that reading and learning depend on.",
    subhead:
      "A doctor-supervised program that strengthens eye teaming, tracking, and focusing, led by Dr. Bruce Meyer, FCOVD.",
    directAnswer:
      "Vision therapy is a personalized, doctor-supervised program of progressive activities that develops the visual skills behind reading, learning, and attention, including eye teaming, tracking, and focusing. At Riverdell Vision, Dr. Bruce Meyer, a Fellow of the College of Optometrists in Vision Development, directs each program and advances it as skills improve. It is not the same as reading glasses; it retrains how the eyes work together.",
    problem:
      "A child can have 20/20 eyesight and still struggle to read, lose their place, skip lines, or avoid near work, because clarity and visual skill are different things. When the eyes do not team, track, and focus efficiently, reading is exhausting and comprehension suffers. Vision therapy targets those underlying skills, not just the symptom.",
    whoFor: [
      "Children who avoid reading, lose their place, or reverse letters",
      "Kids with an eye-teaming or focusing problem found on exam",
      "Students whose effort does not match their results",
      "Adults with lingering visual symptoms after a concussion",
    ],
    whenToSee: [
      "Reading is a struggle despite clear eyesight",
      "A teacher or exam flagged an eye-teaming or tracking issue",
      "Your child skips lines, loses their place, or gets headaches with near work",
    ],
    howWeEvaluate: [
      { title: "A developmental vision evaluation", body: "We assess eye teaming, tracking, focusing, and how the visual system supports reading and learning." },
      { title: "A written program", body: "Dr. Meyer designs a personalized plan with clear goals and a realistic timeline." },
      { title: "Progress you can see", body: "We re-measure skills over the program so families can see objective improvement, not guesswork." },
    ],
    whatTreatment: [
      { title: "In-office therapy sessions", body: "Guided, progressive activities that build specific visual skills, supported by home practice." },
      { title: "Skill-by-skill progression", body: "The program advances as your child masters each level, keeping it effective." },
      { title: "Carryover to real life", body: "The goal is durable improvement in reading stamina, comfort, and confidence." },
    ],
    faqs: [
      { q: "How is vision therapy different from glasses?", a: "Glasses change the clarity of the image. Vision therapy retrains how the eyes work together and focus. Some children need one, some need both." },
      { q: "How long does a program take?", a: "It depends on the goals and the starting point. Many programs run over several months. Dr. Meyer gives you a clear plan and timeline after the evaluation." },
      { q: "Does it really work?", a: "Vision therapy is well established for specific diagnosed eye-teaming and focusing problems. We measure skills before, during, and after so progress is objective. We do not claim it treats unrelated conditions." },
      { q: "Is it covered by insurance?", a: "Some medical plans cover parts of diagnosed vision therapy. Benefits vary widely; we verify coverage and explain costs before starting." },
    ],
    keywords: ["vision therapy Bergen County", "vision therapy Oradell NJ", "vision therapy for kids NJ"],
    related: ["neuro-optometric-rehabilitation", "myopia-management"],
    metaTitle: "Vision Therapy in Oradell & Bergen County, NJ",
    metaDescription:
      "Doctor-supervised vision therapy at Riverdell Vision in Oradell, NJ, led by Dr. Bruce Meyer, FCOVD. Build the eye-teaming, tracking, and focusing skills reading depends on.",
    reviewedBy: "Dr. Bruce Meyer, FCOVD",
    dateReviewed: "June 2026",
  },
  {
    slug: "neuro-optometric-rehabilitation",
    name: "Neuro-Optometric Rehabilitation",
    shortName: "Neuro-Optometric Rehab",
    icon: "stethoscope",
    image: "/images/office-oradell.jpeg",
    imageAlt: "A calm, modern clinical space used for neuro-optometric rehabilitation",
    eyebrow: "After concussion or injury",
    headline: "Rebuilding vision after concussion, stroke, or brain injury.",
    subhead:
      "A personalized program for the visual symptoms that follow a concussion or neurological event, led by Dr. Bruce Meyer, FCOVD.",
    directAnswer:
      "Neuro-optometric rehabilitation treats the visual problems that often follow a concussion, traumatic brain injury, or stroke, such as double vision, light sensitivity, dizziness, difficulty reading, and trouble in busy environments. At Riverdell Vision, Dr. Bruce Meyer, FCOVD, evaluates how the injury has affected the visual system and builds a rehabilitation program, which may include therapeutic lenses, prisms, and guided therapy, to help the brain and eyes work together again.",
    problem:
      "After a concussion, many people are told their scans are normal and to simply wait, yet they still cannot read, tolerate screens, or feel steady in a busy aisle. Vision is deeply tied to balance, attention, and comfort, and when a brain injury disrupts the visual system, everyday life becomes exhausting. These symptoms are real, common, and treatable.",
    whoFor: [
      "People with lingering symptoms after a concussion or TBI",
      "Patients recovering from a stroke with new visual difficulty",
      "Anyone with double vision, light sensitivity, or dizziness after a head injury",
      "Those told their eyes are fine but who still cannot read or focus comfortably",
    ],
    whenToSee: [
      "Reading, screens, or busy places became hard after a head injury",
      "You have double vision, light sensitivity, or dizziness that will not resolve",
      "A concussion specialist recommended a vision evaluation",
    ],
    howWeEvaluate: [
      { title: "A neuro-visual evaluation", body: "We assess how the injury has affected eye teaming, focusing, eye movements, and visual processing." },
      { title: "A rehabilitation plan", body: "Dr. Meyer designs a personalized program, which may include therapeutic lenses, prisms, and guided therapy." },
      { title: "Coordinated care", body: "We work alongside your other providers and track progress toward specific, functional goals." },
    ],
    whatTreatment: [
      { title: "Therapeutic lenses and prisms", body: "Carefully prescribed lenses or prisms can ease double vision, strain, and disorientation." },
      { title: "Guided neuro-visual therapy", body: "Progressive activities help the visual system reorganize and regain stability." },
      { title: "Functional goals", body: "The aim is real-world improvement: reading, screens, driving, and moving through busy spaces with less strain." },
    ],
    faqs: [
      { q: "Can vision problems really come from a concussion?", a: "Yes. A large share of concussions affect the visual system, causing double vision, light sensitivity, dizziness, and reading difficulty, even when eyesight is 20/20 and scans are normal." },
      { q: "When should rehabilitation start?", a: "It can help both soon after injury and long afterward. If symptoms are limiting daily life, an evaluation is worthwhile whenever you are ready." },
      { q: "Will it cure my symptoms?", a: "Every injury is different and we make no guarantees. The goal is measurable, functional improvement, and we track progress toward your specific goals." },
      { q: "Do you coordinate with my other doctors?", a: "Yes. Neuro-optometric rehabilitation works best as part of a team, and we communicate with your other providers when helpful." },
    ],
    keywords: ["neuro optometric rehabilitation NJ", "concussion vision therapy Bergen County", "post concussion vision Oradell"],
    related: ["vision-therapy", "dry-eye-treatment"],
    metaTitle: "Neuro-Optometric Rehabilitation in Bergen County, NJ",
    metaDescription:
      "Neuro-optometric rehabilitation at Riverdell Vision in Oradell, NJ for visual symptoms after concussion, TBI, or stroke. Led by Dr. Bruce Meyer, FCOVD.",
    reviewedBy: "Dr. Bruce Meyer, FCOVD",
    dateReviewed: "June 2026",
  },
  {
    slug: "medical-eye-care",
    name: "Medical Eye Care",
    shortName: "Medical Eye Care",
    icon: "stethoscope",
    image: "/images/dry-eye.jpeg",
    imageAlt: "A calm clinical setting for medical eye care at Riverdell Vision",
    eyebrow: "Eye health, not just glasses",
    headline: "Medical eye care to protect your sight, not just update it.",
    subhead:
      "Diabetic eye exams, glaucoma monitoring, red eye, and urgent problems, handled here as real medicine.",
    directAnswer:
      "Medical eye care covers the health of your eyes beyond a glasses prescription: diabetic eye exams, glaucoma screening and monitoring, red or painful eyes and infections, sudden flashes or floaters, and ocular-surface disease. At Riverdell Vision, our doctors diagnose and manage these conditions, coordinate with your other physicians, and refer to trusted specialists when surgery or subspecialty care is needed.",
    problem:
      "Many eye conditions have no early symptoms. Glaucoma quietly narrows vision, diabetes can damage the retina before you notice, and a red or painful eye can be minor or serious. A practice that treats eye care as medicine catches these early, manages them over time, and knows when to escalate, rather than simply handing you a new prescription.",
    whoFor: [
      "People with diabetes who need a dilated retinal exam",
      "Patients with, or at risk for, glaucoma",
      "Anyone with a red, painful, or suddenly changed eye",
      "Patients on medications that require eye monitoring",
    ],
    whenToSee: [
      "You have diabetes and are due for a retinal exam",
      "You notice new flashes, floaters, or a curtain in your vision",
      "Your eye is red, painful, light-sensitive, or suddenly blurry",
      "You have a family history of glaucoma or other eye disease",
    ],
    howWeEvaluate: [
      { title: "A medical eye examination", body: "We assess eye health with modern imaging and testing appropriate to your concern, not a routine glasses check." },
      { title: "Diagnosis and a plan", body: "We explain what we find in plain language and lay out monitoring or treatment." },
      { title: "Coordinated, ongoing care", body: "We track conditions over time and coordinate with your primary care or specialists, referring for surgery when needed." },
    ],
    whatTreatment: [
      { title: "Diabetic and retinal monitoring", body: "Dilated exams and imaging to catch and track diabetic and other retinal changes early." },
      { title: "Glaucoma screening and management", body: "Pressure checks, imaging, and monitoring, with treatment or referral as appropriate." },
      { title: "Urgent and ocular-surface care", body: "Evaluation and management of red eye, infections, flashes and floaters, and ocular-surface disease." },
    ],
    faqs: [
      { q: "Do you handle eye emergencies?", a: "For red eye, sudden vision changes, flashes and floaters, or injuries, call the office promptly. We reserve time for urgent visits and will guide you on next steps." },
      { q: "Why do I need a dilated exam if I have diabetes?", a: "Diabetes can damage the retina before you notice any change in vision. A dilated exam lets us catch and monitor those changes early, when they are most manageable." },
      { q: "Do you treat glaucoma?", a: "We screen for and monitor glaucoma, and can begin management or coordinate with a specialist depending on your situation." },
      { q: "Is medical eye care billed to medical insurance?", a: "Yes. Medical eye visits are typically billed to your medical insurance rather than a vision plan. Our team will help you understand your coverage." },
    ],
    keywords: ["medical eye care Oradell NJ", "diabetic eye exam Bergen County", "glaucoma eye doctor NJ"],
    related: ["dry-eye-treatment", "specialty-contact-lenses"],
    metaTitle: "Medical Eye Care in Oradell & Bergen County, NJ",
    metaDescription:
      "Medical eye care at Riverdell Vision in Oradell, NJ: diabetic eye exams, glaucoma monitoring, red eye, flashes and floaters, and urgent eye problems.",
    reviewedBy: "Dr. Mina Han, OD",
    dateReviewed: "June 2026",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

// Maps each service page to the exact option string in the /book consult form,
// so a high-intent service visitor lands on the form already routed to their
// need (the values must match INTERESTS in consult-form.tsx verbatim).
const INTEREST_BY_SLUG: Record<string, string> = {
  "myopia-management": "Myopia Management",
  "dry-eye-treatment": "Dry Eye",
  "specialty-contact-lenses": "Specialty & Scleral Lenses",
  "ortho-k": "Orthokeratology (Ortho-K)",
  "vision-therapy": "Vision Therapy",
  "neuro-optometric-rehabilitation": "Neuro-Optometric Rehabilitation",
  "medical-eye-care": "Medical Eye Care",
};

// Deep-link to the booking form, pre-routed to a service when we know it.
export function bookHrefFor(slug?: string) {
  const interest = slug ? INTEREST_BY_SLUG[slug] : undefined;
  return interest ? `/book?interest=${encodeURIComponent(interest)}` : "/book";
}

// Depth layer for the high-ticket pages: an honest cost/insurance answer block
// (no invented prices), a plain-English glossary (feeds DefinedTerm schema and
// AI answer engines), and an option-comparison for services with real choices.
export type ServiceExtras = {
  costNote: string;
  glossary: { term: string; def: string }[];
  compare?: { headers: [string, string, string]; rows: [string, string, string][] };
};

export const SERVICE_EXTRAS: Record<string, ServiceExtras> = {
  "myopia-management": {
    costNote:
      "Myopia management is usually a mix of covered and out-of-pocket care. The eye-health exam is often billable to vision or medical insurance, while specialty materials (custom lenses, atropine) and the management program are frequently not fully covered. We verify your specific benefits and give you clear, itemized pricing before you commit, with no surprises.",
    glossary: [
      { term: "Axial length", def: "The front-to-back length of the eye. In myopia it grows too long; tracking it over time is the most precise way to measure progression." },
      { term: "Orthokeratology (Ortho-K)", def: "Custom rigid lenses worn overnight that gently reshape the cornea, giving clear daytime vision without glasses and helping slow myopia." },
      { term: "Low-dose atropine", def: "A once-nightly diluted eye drop shown to slow the progression of nearsightedness in many children." },
      { term: "Progression", def: "How quickly a prescription is worsening. The goal of management is a slower rate and a lower final prescription." },
    ],
    compare: {
      headers: ["Approach", "Best for", "How it helps"],
      rows: [
        ["Ortho-K (overnight lenses)", "Active kids who want glasses-free days", "Reshapes vision overnight and slows progression"],
        ["Soft multifocal contacts", "Daytime contact wearers", "Corrects vision while signaling the eye to slow growth"],
        ["Myopia-control glasses", "Younger children not ready for contacts", "Look like ordinary glasses, engineered to reduce progression"],
        ["Low-dose atropine", "A simple nightly drop, alone or added on", "A diluted nightly drop that slows progression"],
      ],
    },
  },
  "dry-eye-treatment": {
    costNote:
      "A medical dry eye evaluation is often billable to your medical insurance rather than a vision plan, because dry eye is a medical condition. Some advanced in-office gland treatments are typically not covered. We check your coverage in advance and explain any out-of-pocket cost before treatment.",
    glossary: [
      { term: "Meibomian glands", def: "Oil glands in the eyelids that keep tears from evaporating too fast. When they under-perform (MGD), tears break up and eyes feel dry." },
      { term: "Tear film", def: "The thin, layered film of water, oil, and mucus that coats and protects the surface of the eye." },
      { term: "Evaporative dry eye", def: "The most common form of dry eye, driven by poor-quality oil letting tears evaporate, rather than too few tears." },
      { term: "Ocular surface", def: "The cornea and conjunctiva, the tissues a healthy tear film protects." },
    ],
  },
  "specialty-contact-lenses": {
    costNote:
      "Some medically necessary specialty lenses, such as those for keratoconus, may have partial insurance coverage; many custom lenses are out-of-pocket. Benefits vary widely, so we verify your plan and provide clear pricing before ordering anything custom to your eyes.",
    glossary: [
      { term: "Scleral lens", def: "A large rigid lens that vaults over the cornea and rests on the white of the eye, holding a cushion of fluid for comfort and crisp vision." },
      { term: "Keratoconus", def: "A condition where the cornea thins and bulges into a cone shape, distorting vision in a way glasses often cannot fully correct." },
      { term: "Cornea", def: "The clear front window of the eye that does most of its focusing." },
      { term: "Rigid gas-permeable (RGP)", def: "A firm, breathable contact lens used for irregular corneas and high prescriptions." },
    ],
    compare: {
      headers: ["Lens type", "Best for", "How it helps"],
      rows: [
        ["Scleral lenses", "Keratoconus, irregular corneas, severe dry eye", "Vault the cornea with a fluid cushion for comfort and sharp vision"],
        ["Custom soft lenses", "High or astigmatic prescriptions", "Made to order beyond standard catalog parameters"],
        ["Rigid gas-permeable", "Irregular corneas needing sharp optics", "Firm, breathable lenses that mask surface irregularity"],
      ],
    },
  },
  "ortho-k": {
    costNote:
      "Ortho-K is generally an out-of-pocket program, since specialty lens materials and fitting are often not covered by vision plans. We verify any benefits you have and give you a clear, all-in quote (lenses, fitting, and follow-up) before you begin.",
    glossary: [
      { term: "Orthokeratology", def: "Custom rigid lenses worn only during sleep that temporarily reshape the cornea for clear, glasses-free daytime vision." },
      { term: "Corneal reshaping", def: "The gentle, reversible flattening of the cornea's front surface that produces the daytime correction." },
      { term: "Myopia control", def: "Slowing how fast nearsightedness worsens; Ortho-K is one of the most effective options in children." },
    ],
  },
  "vision-therapy": {
    costNote:
      "Some medical plans cover parts of diagnosed vision therapy when there is a documented eye-teaming or focusing disorder. Coverage varies, so we confirm benefits and explain the cost of the evaluation and program before you start.",
    glossary: [
      { term: "Eye teaming (binocular vision)", def: "How well the two eyes work together as a single team; poor teaming makes reading and focus exhausting." },
      { term: "Convergence", def: "The eyes' ability to turn inward and stay aligned on near work like reading." },
      { term: "Tracking (oculomotor)", def: "The eyes' ability to move smoothly and accurately along a line of text." },
      { term: "Accommodation", def: "The eye's focusing system that keeps near objects clear." },
    ],
  },
  "neuro-optometric-rehabilitation": {
    costNote:
      "Neuro-optometric rehabilitation is often billable to medical insurance, especially after a documented concussion, injury, or stroke. Coverage and visit limits vary; we verify your benefits, coordinate with your other providers, and explain any out-of-pocket cost before starting.",
    glossary: [
      { term: "Neuro-optometric rehabilitation", def: "Therapy that helps the visual system recover after a concussion, brain injury, or stroke, using lenses, prisms, and guided exercises." },
      { term: "Prism", def: "A lens element that bends light to relieve double vision and visual strain after a neurological event." },
      { term: "Post-concussion vision syndrome", def: "The cluster of visual symptoms (blur, double vision, light sensitivity, dizziness) that can follow a concussion even when eyesight is 20/20." },
      { term: "Visual midline shift", def: "A distorted sense of where straight-ahead is after brain injury, affecting balance and posture." },
    ],
  },
  "medical-eye-care": {
    costNote:
      "Medical eye visits (diabetic exams, glaucoma monitoring, red or painful eyes) are typically billed to your medical insurance rather than a vision plan. We help you understand your coverage and any copay, and coordinate with your primary care or specialists when needed.",
    glossary: [
      { term: "Diabetic retinopathy", def: "Damage to the retina's blood vessels from diabetes; a dilated exam catches it early, often before vision changes." },
      { term: "Glaucoma", def: "A group of conditions that quietly damage the optic nerve, usually tied to eye pressure; early detection protects sight." },
      { term: "Dilated exam", def: "Using drops to widen the pupil so the doctor can examine the retina and optic nerve thoroughly." },
      { term: "Intraocular pressure", def: "The fluid pressure inside the eye, a key measurement in screening for glaucoma." },
    ],
  },
};

export function getServiceExtras(slug: string): ServiceExtras | undefined {
  return SERVICE_EXTRAS[slug];
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
