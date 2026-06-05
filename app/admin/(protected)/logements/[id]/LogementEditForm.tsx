"use client";

import { useState, useTransition } from "react";
import { Save, Plus, X, Check } from "lucide-react";
import { updateLogement } from "@/app/admin/actions";

interface Logement {
  id: string;
  nom: string;
  description: string;
  description_courte: string;
  prix_par_nuit: number;
  capacite: number;
  nb_chambres: number;
  nb_salles_de_bain: number;
  equipements: string[];
}

interface Props {
  logement: Logement;
}

export default function LogementEditForm({ logement }: Props) {
  // ── Infos générales ─────────────────────────────────────────────────────────
  const [infos, setInfos] = useState({
    nom: logement.nom ?? "",
    description: logement.description ?? "",
    description_courte: logement.description_courte ?? "",
    prix_par_nuit: logement.prix_par_nuit ?? 0,
    capacite: logement.capacite ?? 1,
    nb_chambres: logement.nb_chambres ?? 1,
    nb_salles_de_bain: logement.nb_salles_de_bain ?? 1,
  });
  const [infosSaved, setInfosSaved] = useState(false);
  const [isPendingInfos, startInfos] = useTransition();

  const saveInfos = () => {
    startInfos(async () => {
      await updateLogement(logement.id, {
        nom: infos.nom,
        description: infos.description,
        description_courte: infos.description_courte,
        prix_par_nuit: Number(infos.prix_par_nuit),
        capacite: Number(infos.capacite),
        nb_chambres: Number(infos.nb_chambres),
        nb_salles_de_bain: Number(infos.nb_salles_de_bain),
      });
      setInfosSaved(true);
      setTimeout(() => setInfosSaved(false), 2500);
    });
  };

  // ── Équipements ─────────────────────────────────────────────────────────────
  const [equipements, setEquipements] = useState<string[]>(logement.equipements ?? []);
  const [newEquip, setNewEquip] = useState("");
  const [equipSaved, setEquipSaved] = useState(false);
  const [isPendingEquip, startEquip] = useTransition();

  const addEquip = () => {
    const trimmed = newEquip.trim();
    if (!trimmed || equipements.includes(trimmed)) return;
    setEquipements((prev) => [...prev, trimmed]);
    setNewEquip("");
  };

  const removeEquip = (eq: string) => setEquipements((prev) => prev.filter((e) => e !== eq));

  const saveEquipements = () => {
    startEquip(async () => {
      await updateLogement(logement.id, { equipements });
      setEquipSaved(true);
      setTimeout(() => setEquipSaved(false), 2500);
    });
  };

  // ── UI ──────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Informations générales */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-playfair text-xl text-primary mb-5">Informations générales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Nom</label>
            <input
              type="text"
              value={infos.nom}
              onChange={(e) => setInfos((f) => ({ ...f, nom: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Description courte</label>
            <input
              type="text"
              value={infos.description_courte}
              onChange={(e) => setInfos((f) => ({ ...f, description_courte: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Description complète</label>
            <textarea
              rows={6}
              value={infos.description}
              onChange={(e) => setInfos((f) => ({ ...f, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold resize-none"
            />
          </div>
          <div>
            <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Capacité (personnes)</label>
            <input
              type="number" min={1} max={20}
              value={infos.capacite}
              onChange={(e) => setInfos((f) => ({ ...f, capacite: Number(e.target.value) }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold"
            />
          </div>
          <div>
            <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Nb. de chambres</label>
            <input
              type="number" min={1} max={10}
              value={infos.nb_chambres}
              onChange={(e) => setInfos((f) => ({ ...f, nb_chambres: Number(e.target.value) }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold"
            />
          </div>
          <div>
            <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Nb. de salles de bain</label>
            <input
              type="number" min={1} max={10}
              value={infos.nb_salles_de_bain}
              onChange={(e) => setInfos((f) => ({ ...f, nb_salles_de_bain: Number(e.target.value) }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold"
            />
          </div>
          <div>
            <label className="block font-lato text-xs font-semibold text-gray-600 mb-1.5">Prix de base / nuit (€)</label>
            <input
              type="number" min={0} step={0.01}
              value={infos.prix_par_nuit}
              onChange={(e) => setInfos((f) => ({ ...f, prix_par_nuit: Number(e.target.value) }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold"
            />
          </div>
        </div>

        <button
          onClick={saveInfos}
          disabled={isPendingInfos}
          className="mt-5 flex items-center gap-2 bg-primary text-white font-lato text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-secondary transition-colors disabled:opacity-60"
        >
          {infosSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isPendingInfos ? "Enregistrement..." : infosSaved ? "Enregistré !" : "Enregistrer"}
        </button>
      </div>

      {/* Équipements */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-playfair text-xl text-primary mb-5">Équipements</h2>

        {/* Tags existants */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[2.5rem]">
          {equipements.length === 0 && (
            <p className="font-lato text-sm text-gray-400">Aucun équipement ajouté.</p>
          )}
          {equipements.map((eq) => (
            <span
              key={eq}
              className="flex items-center gap-1.5 bg-sand/60 text-primary font-lato text-sm px-3 py-1 rounded-full border border-sand"
            >
              {eq}
              <button
                type="button"
                onClick={() => removeEquip(eq)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>

        {/* Ajouter */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            value={newEquip}
            onChange={(e) => setNewEquip(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addEquip())}
            placeholder="WiFi haut débit, Parking, Terrasse..."
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 font-lato text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold"
          />
          <button
            type="button"
            onClick={addEquip}
            className="flex items-center gap-1.5 bg-gold/10 text-gold font-lato text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gold/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>

        <button
          onClick={saveEquipements}
          disabled={isPendingEquip}
          className="flex items-center gap-2 bg-primary text-white font-lato text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-secondary transition-colors disabled:opacity-60"
        >
          {equipSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isPendingEquip ? "Enregistrement..." : equipSaved ? "Enregistré !" : "Enregistrer les équipements"}
        </button>
      </div>
    </>
  );
}
