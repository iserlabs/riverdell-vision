// Legacy Roya URL redirects (301). Maps every old .html URL to its closest
// equivalent on the new site so link equity and bookmarks survive the cutover.
// Consumed by next.config.ts redirects(). Source of truth for the mapping is
// docs/superpowers/specs/2026-07-04-domain-cutover-and-lead-capture-design.md.

type LegacyRedirect = { source: string; destination: string; permanent: true };

// Old top-level and /services pages.
const pages: [string, string][] = [
  ["/index.html", "/"],
  ["/about.html", "/about"],
  ["/our-doctor.html", "/about"],
  ["/our-team.html", "/about"],
  ["/contact-us.html", "/oradell"],
  ["/request-an-appointment.html", "/book"],
  ["/reviews.html", "/reviews"],
  ["/financing.html", "/cost-and-insurance"],
  ["/payment-options.html", "/cost-and-insurance"],
  ["/frames.html", "/"],
  ["/services/eyewear.html", "/"],
  ["/blog.html", "/answers"],
  ["/sitemap.html", "/"],
  ["/services.html", "/"],
  ["/comprehensive-eye-exam.html", "/medical-eye-care"],
  ["/accessibility-statement.html", "/accessibility"],
  ["/privacy-policy.html", "/privacy"],
  ["/pediatric-eye-exams.html", "/about#care"],
  ["/services/pediatric-eye-exams.html", "/about#care"],
  ["/services-eye-health-exams.html", "/medical-eye-care"],
  ["/services/eye-health-exams.html", "/medical-eye-care"],
  ["/services-glaucoma-treatment.html", "/medical-eye-care"],
  ["/services/glaucoma-treatment.html", "/medical-eye-care"],
  ["/services/visual-field-exams.html", "/medical-eye-care"],
  ["/services/custom-contact-lens-fitting.html", "/specialty-contact-lenses"],
  ["/services/myopia-control.html", "/myopia-management"],
  ["/services/vision-therapy.html", "/vision-therapy"],
  ["/services/neuro-optometric-rehabilitation.html", "/neuro-optometric-rehabilitation"],
  ["/services/neuro-cognitive-optometry.html", "/neuro-optometric-rehabilitation"],
];

// Old blog posts, mapped topically. Authoritative table (Appendix A of the spec).
const blog: [string, string][] = [
  ["5-common-signs-your-child-may-benefit-from-vision-therapy", "/vision-therapy"],
  ["allergies", "/dry-eye-treatment"],
  ["atropine-eye-drops-how-they-help-slow-myopia-progression-in-kids", "/myopia-management"],
  ["better-vision", "/answers"],
  ["does-vision-therapy-require-ongoing-treatment-or-maintenance", "/vision-therapy"],
  ["dry-eye-or-allergies-how-to-tell-whats-really-irritating-your-eyes", "/dry-eye-treatment"],
  ["eye-education", "/answers"],
  ["glaucoma-and-family-history-are-you-at-higher-risk", "/medical-eye-care"],
  ["healthy-eyes-during-summer", "/answers"],
  ["how-a-custom-contact-lens-fitting-improves-comfort-and-vision", "/specialty-contact-lenses"],
  ["how-aging-environment-and-lifestyle-contribute-to-dry-eye", "/dry-eye-treatment"],
  ["how-can-specific-lifestyle-adjustments-help-prevent-myopia-from-worsening", "/myopia-management"],
  ["how-does-pediatric-vision-therapy-work", "/vision-therapy"],
  ["how-early-vision-care-prevents-long-term-problems-in-children", "/about#care"],
  ["how-glaucoma-treatment-has-evolved-protecting-your-peripheral-vision", "/medical-eye-care"],
  ["how-much-screen-time-is-too-much-protecting-your-childs-eyes", "/myopia-management"],
  ["how-neuro-cognitive-optometry-can-help-improve-learning-and-focus-boosting-mental-skills", "/neuro-optometric-rehabilitation"],
  ["how-to-maintain-strong-retinal-health-as-you-age", "/medical-eye-care"],
  ["how-vision-therapy-can-help-with-attention-and-focus-in-the-classroom", "/vision-therapy"],
  ["mapping-ocular-health-what-new-jersey-high-tech-retinal-imaging-reveals-about-your-wellness", "/medical-eye-care"],
  ["myopia-in-adults-causes-symptoms-and-treatment-options", "/myopia-management"],
  ["protect-your-eyes", "/answers"],
  ["the-importance-of-comprehensive-eye-exams-protect-your-vision-for-life", "/medical-eye-care"],
  ["the-role-of-vision-in-brain-injury-recovery-why-neuro-optometric-rehabilitation-matters", "/neuro-optometric-rehabilitation"],
  ["tips-for-managing-winter-dry-eye", "/dry-eye-treatment"],
  ["treating-visual-processing-issues-with-neuro-optometric-techniques", "/neuro-optometric-rehabilitation"],
  ["understanding-visual-field-testing-and-its-role-in-eye-health", "/medical-eye-care"],
  ["vision-genetics", "/answers"],
  ["what-is-neuro-cognitive-optometry-understanding-the-role-of-vision-in-learning-and-behavior", "/neuro-optometric-rehabilitation"],
  ["when-we-see-a-young-patient-with-rapid-vision-changes-this-is-what-we-recommend", "/medical-eye-care"],
];

export const legacyRedirects: LegacyRedirect[] = [
  ...pages.map(([source, destination]) => ({ source, destination, permanent: true as const })),
  ...blog.map(([slug, destination]) => ({
    source: `/blog/${slug}.html`,
    destination,
    permanent: true as const,
  })),
];
