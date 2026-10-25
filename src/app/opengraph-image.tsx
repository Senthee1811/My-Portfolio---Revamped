import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Sentheepan Ellankovan | Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "#ededed",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "300px",
            background: "radial-gradient(circle, rgba(10, 132, 255, 0.25) 0%, rgba(0,0,0,0) 70%)",
            top: "160px",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 20px",
            borderRadius: "9999px",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontSize: "18px",
            marginBottom: "24px",
            color: "#30d158",
            fontWeight: "bold",
          }}
        >
          ● Available for Junior Roles & Freelance Projects
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: 800,
            letterSpacing: "-2px",
            margin: "0 0 12px 0",
            textAlign: "center",
          }}
        >
          Sentheepan Ellankovan
        </h1>

        {/* Headline */}
        <p
          style={{
            fontSize: "28px",
            color: "#a1a1a6",
            margin: "0 0 24px 0",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Full-Stack Developer · MERN & Next.js · AI Integrations
        </p>

        {/* Location & Handle */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            fontSize: "20px",
            color: "#6e6e73",
          }}
        >
          <span>Kotahena, Colombo, LK</span>
          <span>·</span>
          <span>github.com/Senthee1811</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
