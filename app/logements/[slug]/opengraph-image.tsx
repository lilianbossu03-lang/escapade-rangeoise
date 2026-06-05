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
    .from("logements")
    .select("nom, description_courte, photos, ville, capacite, chambres")
    .eq("slug", params.slug)
    .single();

  const nom = data?.nom ?? "Logement";
  const description = data?.description_courte ?? siteConfig.description;
  const photo = data?.photos?.[0] ?? null;
  const ville = data?.ville ?? "Rang-du-Fliers";
  const capacite = data?.capacite ?? null;
  const chambres = data?.chambres ?? null;

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
        {/* Background image or fallback */}
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

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(13,25,34,0.92) 0%, rgba(13,25,34,0.65) 50%, rgba(13,25,34,0.25) 100%)",
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

        {/* Content — bottom aligned */}
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
          {/* Badges */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                background: "#D4A853",
                color: "#0d1922",
                fontSize: "14px",
                fontWeight: "700",
                padding: "6px 14px",
                borderRadius: "100px",
                letterSpacing: "0.5px",
              }}
            >
              {ville}
            </div>
            {capacite && (
              <div
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "rgba(250,248,243,0.9)",
                  fontSize: "14px",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {capacite} voyageurs
              </div>
            )}
            {chambres && (
              <div
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "rgba(250,248,243,0.9)",
                  fontSize: "14px",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {chambres} chambre{chambres > 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* Logement name */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: "700",
              color: "#FAF8F3",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
            }}
          >
            {nom}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "rgba(250,248,243,0.7)",
              maxWidth: "700px",
              lineHeight: 1.4,
            }}
          >
            {description.length > 120 ? description.slice(0, 120) + "…" : description}
          </div>

          {/* Site name */}
          <div
            style={{
              fontSize: "16px",
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
