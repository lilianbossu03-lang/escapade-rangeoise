import { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { siteConfig } from "@/lib/seo-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createAdminClient();

  const [{ data: logements }, { data: lieux }] = await Promise.all([
    supabase.from("logements").select("slug, updated_at").eq("disponible", true),
    supabase.from("lieux_explorer").select("slug, created_at"),
  ]);

  const logementUrls: MetadataRoute.Sitemap = (logements ?? []).map((l) => ({
    url: `${siteConfig.url}/logements/${l.slug}`,
    lastModified: new Date(l.updated_at),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const lieuUrls: MetadataRoute.Sitemap = (lieux ?? []).map((l) => ({
    url: `${siteConfig.url}/explorer/${l.slug}`,
    lastModified: new Date(l.created_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...logementUrls,
    ...lieuUrls,
  ];
}
