import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function ogCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const titleSize = title.length > 28 ? 64 : title.length > 16 ? 84 : 104;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0b0b24 0%, #1e1b4b 55%, #3b0764 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 4, textTransform: "uppercase", color: "#c7d2fe" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 700, lineHeight: 1.05 }}>{title}</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: "#e0e7ff" }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#c7d2fe" }}>
          <span>Slang Decoder for iPhone</span>
          <span>jandhtechnology.com/slang</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
