/**
 * The glyph set, drawn rather than imported.
 *
 * Nine icons at 1.5px on an 18px box is not worth a dependency, and an icon library
 * would arrive with its own metrics and its own idea of weight. These are drawn to one
 * grid so the row reads as one set: same stroke, same optical size, same round caps.
 */

const S = {
  viewBox: "0 0 18 18",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function IconPoint() {
  return (
    <svg {...S}>
      <circle cx="9" cy="9" r="2.4" />
      <path d="M9 1.5v3M9 13.5v3M1.5 9h3M13.5 9h3" />
    </svg>
  );
}

export function IconBox() {
  return (
    <svg {...S}>
      <rect x="2.75" y="4.25" width="12.5" height="9.5" rx="1.2" />
    </svg>
  );
}

export function IconCircle() {
  return (
    <svg {...S}>
      <ellipse cx="9" cy="9" rx="6.5" ry="5" />
    </svg>
  );
}

export function IconDraw() {
  return (
    <svg {...S}>
      <path d="M2.5 12.5c2.2-5.6 3.6.8 5.4-2.6s2.6 2.4 4.3-1.2 2.2 1 3.3-1.4" />
    </svg>
  );
}

export function IconSection() {
  return (
    <svg {...S}>
      <rect x="2.5" y="2.75" width="13" height="5" rx="1.2" />
      <rect x="2.5" y="10.25" width="13" height="5" rx="1.2" opacity=".45" />
    </svg>
  );
}

export function IconPage() {
  return (
    <svg {...S}>
      <path d="M4 2.5h7l3 3v10H4z" />
      <path d="M10.75 2.6V5.5h2.9" opacity=".55" />
      <circle cx="9" cy="11" r="1.3" />
    </svg>
  );
}

export function IconEye() {
  return (
    <svg {...S}>
      <path d="M1.6 9S4.3 4.2 9 4.2 16.4 9 16.4 9 13.7 13.8 9 13.8 1.6 9 1.6 9Z" />
      <circle cx="9" cy="9" r="2.1" />
    </svg>
  );
}

export function IconUndo() {
  return (
    <svg {...S}>
      <path d="M6 4.5 2.8 7.7 6 10.9" />
      <path d="M2.8 7.7h7.4a4.5 4.5 0 0 1 0 9H7.6" />
    </svg>
  );
}

export function IconClose() {
  return (
    <svg {...S}>
      <path d="M4.6 4.6l8.8 8.8M13.4 4.6l-8.8 8.8" />
    </svg>
  );
}
