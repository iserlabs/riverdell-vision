// The ten faces Dr. Han chooses the display type from: the one already shipped,
// plus nine alternatives. Ten on screen, which is the number he was promised. He rejected every typeface on the three renders, twice, so this
// exists instead of guessing at an eleventh.
//
// The incumbent is listed first and treated the same as the rest. What is
// already live is an option, not a baseline the others have to beat.
//
// All are Google Fonts, so they load in the preview and in the build from the
// same source. `family` is the exact Google Fonts family name: the picker
// builds its stylesheet URL from it, so a typo here is a silent fallback.

export type TypeOption = {
  id: string;
  family: string;
  /** What it is, factually. Not a pitch. */
  note: string;
  /** Weights the preview loads. Display use only, so no light weights. */
  weights: string;
  incumbent?: boolean;
};

export const TYPE_OPTIONS: TypeOption[] = [
  {
    id: "newsreader",
    family: "Newsreader",
    note: "What the site uses today. Built for on-screen reading, with an optical size axis.",
    weights: "400;500",
    incumbent: true,
  },
  {
    id: "source-serif",
    family: "Source Serif 4",
    note: "Adobe's text serif. Even colour, wide language coverage, no strong period.",
    weights: "400;500;600",
  },
  {
    id: "lora",
    family: "Lora",
    note: "Brushed contrast in the strokes. Warmer than most screen serifs.",
    weights: "400;500;600",
  },
  {
    id: "libre-baskerville",
    family: "Libre Baskerville",
    note: "Baskerville widened for screens. Large x-height, reads settled and traditional.",
    weights: "400;700",
  },
  {
    id: "crimson-pro",
    family: "Crimson Pro",
    note: "Old-style, book typography. The most classical face in this set.",
    weights: "400;500;600",
  },
  {
    id: "spectral",
    family: "Spectral",
    note: "Made for screens with slightly condensed forms. Fits more words on a line.",
    weights: "400;500;600",
  },
  {
    id: "literata",
    family: "Literata",
    note: "Drawn for e-readers. Sturdy at small sizes, calm at large ones.",
    weights: "400;500;600",
  },
  {
    id: "frank-ruhl-libre",
    family: "Frank Ruhl Libre",
    note: "High contrast between thick and thin. The sharpest, most clinical of the set.",
    weights: "400;500;700",
  },
  {
    id: "instrument-serif",
    family: "Instrument Serif",
    note: "One weight, tall and tight. Made for headlines, not for paragraphs.",
    weights: "400",
  },
  {
    id: "bitter",
    family: "Bitter",
    note: "Slab serif. Blunt rectangular ends, the most solid option here.",
    weights: "400;500;600",
  },
];

export function findTypeOption(id: string): TypeOption | undefined {
  return TYPE_OPTIONS.find((o) => o.id === id);
}

/** Google Fonts stylesheet URL for one option. */
export function fontHref(o: TypeOption): string {
  const fam = o.family.replace(/ /g, "+");
  return `https://fonts.googleapis.com/css2?family=${fam}:wght@${o.weights}&display=swap`;
}
