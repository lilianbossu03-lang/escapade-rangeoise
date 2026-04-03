import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LogementEditForm from "./LogementEditForm";
import PhotoManager from "./PhotoManager";

interface Props {
  params: { id: string };
}

export default async function LogementEditPage({ params }: Props) {
  const supabase = createAdminClient();
  const { data: logement } = await supabase
    .from("logements")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!logement) notFound();

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Back */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/logements"
          className="flex items-center gap-2 font-lato text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux logements
        </Link>
        <span className="text-gray-300">/</span>
        <span className="font-lato text-sm text-primary font-semibold">{logement.nom}</span>
      </div>

      {/* Infos + Équipements */}
      <LogementEditForm logement={logement} />

      {/* Photos */}
      <PhotoManager
        logementId={logement.id}
        initialPhotos={logement.photos ?? []}
        initialPrincipale={logement.photo_principale ?? ""}
      />
    </div>
  );
}
