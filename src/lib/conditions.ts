// Long-tail condition pages: dedicated, AEO-optimized resources for the specific
// diagnoses behind the flagship services. Each links up to its parent service so
// internal-link equity flows both ways. Copy is conservative (no guarantees) and
// carries a reviewed-by byline.

export type Condition = {
  slug: string;
  name: string;
  aka: string;
  eyebrow: string;
  intro: string;
  parentSlug: string;
  parentLabel: string;
  bookInterest: string;
  metaTitle: string;
  metaDescription: string;
  shortAnswer: string;
  whatItIs: string;
  symptoms: string[];
  howWeHelp: string;
  faqs: { q: string; a: string }[];
  keywords: string[];
  reviewedBy: string;
  dateReviewed: string;
};

export const CONDITIONS: Condition[] = [
  {
    slug: "keratoconus",
    name: "Keratoconus",
    aka: "an irregular, cone-shaped cornea",
    eyebrow: "Corneal condition",
    intro:
      "When the cornea thins and bulges, glasses stop working well. Specialty lenses, fit to your eye, can bring vision back.",
    parentSlug: "specialty-contact-lenses",
    parentLabel: "Specialty & Scleral Lenses",
    bookInterest: "Specialty & Scleral Lenses",
    metaTitle: "Keratoconus Care & Scleral Lenses in Oradell & Bergen County, NJ",
    metaDescription:
      "Keratoconus care at Riverdell Vision in Oradell, NJ: diagnosis, monitoring, and scleral and specialty contact-lens fitting to restore clear, comfortable vision when glasses no longer work.",
    shortAnswer:
      "Keratoconus is a progressive condition in which the cornea thins and bulges into a cone shape, distorting vision in a way glasses often cannot fully correct. At Riverdell Vision, Dr. Mina Han diagnoses and monitors keratoconus and fits scleral and other specialty contact lenses that vault the irregular cornea to restore sharp, comfortable vision, coordinating with corneal specialists when a procedure such as cross-linking is appropriate.",
    whatItIs:
      "In a healthy eye, the cornea is smooth and round. In keratoconus it gradually weakens, thins, and pushes forward into an irregular cone. That irregular surface scatters light, so vision becomes blurry and distorted and changes often, and standard glasses can no longer make it truly sharp. Keratoconus usually begins in the teens or twenties and can keep progressing for years, which is why early diagnosis and monitoring matter.",
    symptoms: [
      "Blurry or distorted vision that glasses cannot fully sharpen",
      "Frequent prescription changes",
      "Glare, halos, and sensitivity to light",
      "Ghosting or double vision in one eye",
      "A diagnosis of keratoconus, or a family history of it",
    ],
    howWeHelp:
      "We map the precise shape of your cornea, confirm the diagnosis, and track it over time. When lenses are the answer, we fit scleral lenses that vault the cone and hold a cushion of fluid for comfort and crisp vision, or other specialty designs matched to your eye. If your keratoconus is still progressing, we coordinate with corneal specialists for procedures such as cross-linking, so your care is joined up rather than piecemeal.",
    faqs: [
      {
        q: "Can glasses fix keratoconus?",
        a: "In the earliest stages, glasses may help. As the cornea becomes more irregular, glasses can no longer make vision truly sharp, and specialty contact lenses (often scleral lenses) become the better option.",
      },
      {
        q: "Are scleral lenses good for keratoconus?",
        a: "Yes. Scleral lenses vault over the irregular cornea and rest on the white of the eye, creating a smooth optical surface and a fluid cushion. Many keratoconus patients describe far sharper, more comfortable vision than they thought possible.",
      },
      {
        q: "Does keratoconus keep getting worse?",
        a: "It can progress for years, especially when it starts young. Monitoring lets us catch progression early, and procedures such as corneal cross-linking (done by a corneal specialist we coordinate with) can help stabilize it.",
      },
      {
        q: "Is keratoconus care covered by insurance?",
        a: "Medically necessary lenses for keratoconus may have partial coverage; benefits vary widely. We verify your plan and give you clear pricing before ordering anything custom.",
      },
    ],
    keywords: [
      "keratoconus Bergen County",
      "keratoconus specialist NJ",
      "scleral lenses keratoconus Oradell",
    ],
    reviewedBy: "Dr. Mina Han, OD",
    dateReviewed: "June 2026",
  },
  {
    slug: "meibomian-gland-dysfunction",
    name: "Meibomian Gland Dysfunction",
    aka: "MGD, the leading cause of dry eye",
    eyebrow: "Eyelid & dry eye",
    intro:
      "Most dry eye starts in the eyelids. When the oil glands under-perform, tears evaporate too fast, and drops alone rarely fix it.",
    parentSlug: "dry-eye-treatment",
    parentLabel: "Dry Eye Treatment",
    bookInterest: "Dry Eye",
    metaTitle: "Meibomian Gland Dysfunction (MGD) Treatment in Bergen County, NJ",
    metaDescription:
      "Meibomian gland dysfunction (MGD) is the leading cause of evaporative dry eye. Riverdell Vision in Oradell, NJ diagnoses and treats the underlying gland problem with targeted therapy and in-office treatments.",
    shortAnswer:
      "Meibomian gland dysfunction (MGD) is the most common cause of dry eye. The oil glands in the eyelids become blocked or under-perform, so the tear film evaporates too quickly and the eyes feel dry, gritty, and tired. At Riverdell Vision, Dr. Mina Han evaluates the eyelid glands and tear film and treats the underlying MGD with targeted at-home therapy, prescription options, and in-office heat-based gland treatments, rather than only masking symptoms with drops.",
    whatItIs:
      "Along the edge of each eyelid sit dozens of meibomian glands that release a thin layer of oil onto the tear film. That oil is what stops your tears from evaporating between blinks. In MGD the glands become clogged or their oil thickens, the protective layer breaks down, and tears evaporate too fast. The surface of the eye is left exposed, so it burns, feels gritty, waters reflexively, and tires by the afternoon. Because the cause is in the glands, drops alone usually only cover the symptoms.",
    symptoms: [
      "Burning, gritty, or tired eyes, especially by afternoon",
      "Eyes that water for no clear reason",
      "Vision that blurs and clears when you blink",
      "Contact lenses that have become uncomfortable",
      "Drops that help for a few minutes, then wear off",
    ],
    howWeHelp:
      "We assess your eyelid glands and tear film to confirm MGD and gauge how far it has progressed, then build a staged plan. That may start with the right warm therapy, eyelid hygiene, and nutrition, add prescription treatment when inflammation is involved, and use in-office heat-based gland treatments to restore oil flow when the glands need more help. The goal is lasting comfort by treating the cause, not a lifetime of temporary relief.",
    faqs: [
      {
        q: "Is MGD the same as dry eye?",
        a: "MGD is the leading cause of dry eye. Dry eye is the set of symptoms; meibomian gland dysfunction is one of the main underlying causes, specifically the evaporative type.",
      },
      {
        q: "Why don't drops fix my dry eye?",
        a: "Most drops add moisture but do not fix the eyelid glands that keep tears from evaporating. If MGD is the cause, treating the glands is what brings lasting relief.",
      },
      {
        q: "Can MGD be cured?",
        a: "MGD is usually managed rather than cured, but the right plan can dramatically reduce symptoms and protect the glands. Catching it earlier gives the best results.",
      },
      {
        q: "Is MGD treatment covered by insurance?",
        a: "A medical dry eye evaluation is often billable to medical insurance. Some advanced in-office gland treatments are not covered; we explain what to expect and give clear pricing in advance.",
      },
    ],
    keywords: [
      "meibomian gland dysfunction NJ",
      "MGD treatment Bergen County",
      "evaporative dry eye Oradell",
    ],
    reviewedBy: "Dr. Mina Han, OD",
    dateReviewed: "June 2026",
  },
];

export function getCondition(slug: string) {
  return CONDITIONS.find((c) => c.slug === slug);
}
