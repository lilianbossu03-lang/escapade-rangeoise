import { ImageResponse } from "next/og";
import { createAdminClient } from "@/lib/supabase/admin";
import { siteConfig } from "@/lib/seo-config";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: { slug: string };
}

export default async function OgImage({ params }: Props) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("lieux_explorer")
    .select("nom, sous_titre, description, image_hero, image, distance")
    .eq("slug", params.slug)
    .single();

  const nom = data?.nom ?? "À explorer";
  const sousTitre = data?.sous_titre ?? "";
  const description = data?.description ?? siteConfig.description;
  const photo = data?.image_hero ?? data?.image ?? null;
  const distance = data?.distance ?? null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "serif",
          overflow: "hidden",
        }}
      >
        {/* Background */}
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #2C3E50 0%, #1a2a38 100%)",
            }}
          />
        )}

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(13,25,34,0.90) 0%, rgba(13,25,34,0.55) 45%, rgba(13,25,34,0.15) 100%)",
          }}
        />

        {/* Gold top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, #D4A853, #e8c070, #D4A853)",
          }}
        />

        {/* "À explorer" label top-left */}
        <div
          style={{
            position: "absolute",
            top: "48px",
            left: "64px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "rgba(250,248,243,0.7)",
            fontSize: "16px",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "1px",
              background: "#D4A853",
            }}
          />
          À explorer
        </div>

        {/* Content bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "48px 64px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Distance badge */}
          {distance && (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  background: "#D4A853",
                  color: "#0d1922",
                  fontSize: "14px",
                  fontWeight: "700",
                  padding: "6px 14px",
                  borderRadius: "100px",
                }}
              >
                {distance} des logements
              </div>
            </div>
          )}

          {/* Place name */}
          <div
            style={{
              fontSize: "60px",
              fontWeight: "700",
              color: "#FAF8F3",
              lineHeight: 1.05,
              letterSpacing: "-0.5px",
            }}
          >
            {nom}
          </div>

          {/* Sous-titre or description */}
          {sousTitre && (
            <div
              style={{
                fontSize: "22px",
                color: "rgba(250,248,243,0.75)",
                lineHeight: 1.3,
              }}
            >
              {sousTitre}
            </div>
          )}

          <div
            style={{
              fontSize: "18px",
              color: "rgba(250,248,243,0.55)",
              maxWidth: "680px",
              lineHeight: 1.4,
            }}
          >
            {description.length > 110 ? description.slice(0, 110) + "…" : description}
          </div>

          {/* Site name */}
          <div
            style={{
              fontSize: "15px",
              color: "#D4A853",
              marginTop: "4px",
              letterSpacing: "1px",
            }}
          >
            L&apos;Escapade Rangeoise · Côte d&apos;Opale
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
