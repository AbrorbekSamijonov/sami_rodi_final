import { ImageResponse } from "next/og";

export const alt = "SamiRodi | Shade-Resilient Solar Panels";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
          padding: 80, background: "linear-gradient(135deg,#0A1522,#16304A)", color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: "#C9A24A" }} />
          <div style={{ fontSize: 44, fontWeight: 700 }}>SamiRodi</div>
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 40, lineHeight: 1.05 }}>
          Solar panels that don’t burn out in the shade.
        </div>
        <div style={{ fontSize: 30, marginTop: 28, color: "#C9A24A" }}>Built on patent-registered research</div>
      </div>
    ),
    size
  );
}
