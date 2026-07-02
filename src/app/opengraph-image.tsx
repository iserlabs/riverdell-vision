import { ImageResponse } from "next/og";

export const alt = "Riverdell Vision - Optometrist & Eye Doctor in Oradell, NJ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const bone = "#F4EFE7";
  const tealDeep = "#123C46";
  const brass = "#C9A24B";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: tealDeep,
          color: bone,
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              border: `3px solid ${bone}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                background: bone,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 30,
              letterSpacing: 8,
              textTransform: "uppercase",
              fontFamily: "sans-serif",
              color: brass,
            }}
          >
            Riverdell Vision
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 900 }}>
            Family eye care, practiced like medicine.
          </div>
          <div
            style={{
              fontSize: 30,
              fontFamily: "sans-serif",
              color: "rgba(244,239,231,0.8)",
              maxWidth: 820,
            }}
          >
            Physician-led myopia management, dry eye, and specialty lenses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontFamily: "sans-serif",
            color: brass,
            letterSpacing: 1,
          }}
        >
          Oradell, New Jersey · Serving Bergen County
        </div>
      </div>
    ),
    { ...size },
  );
}
