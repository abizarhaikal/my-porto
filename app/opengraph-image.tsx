import { ImageResponse } from "next/og";

export const alt = "Haikal Abizar — Full-stack developer with a frontend focus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#eeeae3", color: "#242723" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, fontWeight: 700 }}>
        <span>HAIKAL ABIZAR<span style={{ color: "#9f4f3d" }}>.</span></span>
        <span style={{ fontSize: 18, letterSpacing: 3 }}>PORTFOLIO / 2026</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 86, fontFamily: "Georgia", lineHeight: 1 }}><span>Web applications</span><span>built around real work.</span></div>
        <div style={{ fontSize: 27, color: "#59605a" }}>Full-stack developer with a frontend focus · Jakarta</div>
      </div>
      <div style={{ display: "flex", width: "100%", height: 8, background: "#9f4f3d" }} />
    </div>,
    size,
  );
}
