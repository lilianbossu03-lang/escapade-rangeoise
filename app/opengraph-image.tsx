import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "L'Escapade Rangeoise — Locations de vacances sur la Côte d'Opale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2C3E50 0%, #1a2a38 60%, #0d1922 100%)",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Decorative top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #D4A853, #e8c070, #D4A853)",
          }}
        />

        {/* Decorative wave/sea motif */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(180deg, transparent 0%, rgba(212,168,83,0.08) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* Gold accent line */}
          <div
            style={{
              width: "60px",
              height: "2px",
              background: "#D4A853",
              marginBottom: "8px",
            }}
          />

          {/* Main title */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: "700",
              color: "#FAF8F3",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
            }}
          >
            L&apos;Escapade Rangeoise
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "26px",
              color: "#D4A853",
              fontWeight: "400",
              letterSpacing: "0.5px",
            }}
          >
            Locations de vacances
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "rgba(250,248,243,0.65)",
              maxWidth: "700px",
              lineHeight: 1.5,
              marginTop: "4px",
            }}
          >
            Côte d&apos;Opale · Rang-du-Fliers · Entre Berck et Le Touquet
          </div>

          {/* Gold accent line bottom */}
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "#D4A853",
              marginTop: "8px",
              opacity: 0.6,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
