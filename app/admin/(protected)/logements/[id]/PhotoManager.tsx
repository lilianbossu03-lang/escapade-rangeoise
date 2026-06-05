"use client";

import { useState, useRef, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { updateLogement } from "@/app/admin/actions";
import { Upload, Trash2, Star, GripVertical, Loader2 } from "lucide-react";

interface Props {
  logementId: string;
  initialPhotos: string[];
  initialPrincipale: string;
}

export default function PhotoManager({ logementId, initialPhotos, initialPrincipale }: Props) {
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [principale, setPrincipale] = useState(initialPrincipale);
  const [uploading, setUploading] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Upload ──────────────────────────────────────────────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);

    const supabase = createClient();
    const newUrls: string[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `logements/${logementId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("photos").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (!error) {
        const { data } = supabase.storage.from("photos").getPublicUrl(path);
        newUrls.push(data.publicUrl);
      }
    }

    const updated = [...photos, ...newUrls];
    const newPrincipale = principale || updated[0] || "";
    setPhotos(updated);
    if (!principale && updated.length > 0) setPrincipale(updated[0]);

    await persistPhotos(updated, newPrincipale);
    setUploading(false);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (url: string) => {
    const updated = photos.filter((p) => p !== url);
    const newPrincipale = url === principale ? (updated[0] ?? "") : principale;
    setPhotos(updated);
    setPrincipale(newPrincipale);
    await persistPhotos(updated, newPrincipale);

    // Also delete from storage if it's a Supabase Storage URL
    const supabase = createClient();
    const urlObj = new URL(url);
    const pathMatch = urlObj.pathname.match(/\/object\/public\/photos\/(.+)/);
    if (pathMatch) {
      await supabase.storage.from("photos").remove([pathMatch[1]]);
    }
  };

  // ── Set principale ──────────────────────────────────────────────────────────
  const handleSetPrincipale = async (url: string) => {
    setPrincipale(url);
    await persistPhotos(photos, url);
  };

  // ── Drag & drop ─────────────────────────────────────────────────────────────
  const handleDragStart = (idx: number) => setDragIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setOverIdx(idx);
  };
  const handleDrop = async (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) { setDragIdx(null); setOverIdx(null); return; }
    const reordered = [...photos];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(idx, 0, moved);
    setPhotos(reordered);
    setDragIdx(null);
    setOverIdx(null);
    await persistPhotos(reordered, principale);
  };
  const handleDragEnd = () => { setDragIdx(null); setOverIdx(null); };

  // ── Persist ─────────────────────────────────────────────────────────────────
  const persistPhotos = async (newPhotos: string[], newPrincipale: string) => {
    startTransition(async () => {
      await updateLogement(logementId, {
        photos: newPhotos,
        photo_principale: newPrincipale,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-playfair text-xl text-primary">Photos</h2>
        <div className="flex items-center gap-3">
          {(isPending || uploading) && (
            <span className="flex items-center gap-1.5 font-lato text-xs text-gray-500">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              {uploading ? "Upload..." : "Sauvegarde..."}
            </span>
          )}
          {saved && !isPending && !uploading && (
            <span className="font-lato text-xs text-green-600 font-semibold">✓ Enregistré</span>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-primary text-white font-lato text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-secondary transition-colors disabled:opacity-60"
          >
            <Upload className="w-4 h-4" />
            Ajouter des photos
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {photos.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-2xl h-40 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gold transition-colors"
        >
          <Upload className="w-8 h-8 text-gray-300" />
          <p className="font-lato text-sm text-gray-400">Cliquez pour ajouter des photos</p>
        </div>
      ) : (
        <>
          <p className="font-lato text-xs text-gray-400 mb-3">
            Glissez pour réorganiser · L&apos;étoile indique la photo principale
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {photos.map((url, idx) => (
              <div
                key={url}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                onDragEnd={handleDragEnd}
                className={`relative group rounded-xl overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing ${
                  overIdx === idx && dragIdx !== idx
                    ? "border-gold scale-105"
                    : principale === url
                    ? "border-gold"
                    : "border-transparent"
                } ${dragIdx === idx ? "opacity-40" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-28 object-cover"
                  draggable={false}
                />

                {/* Drag handle */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg p-1">
                  <GripVertical className="w-3.5 h-3.5 text-white" />
                </div>

                {/* Principale badge */}
                {principale === url && (
                  <div className="absolute top-2 right-2 bg-gold rounded-full p-1">
                    <Star className="w-3 h-3 text-primary fill-primary" />
                  </div>
                )}

                {/* Actions overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  {principale !== url && (
                    <button
                      type="button"
                      onClick={() => handleSetPrincipale(url)}
                      title="Définir comme photo principale"
                      className="bg-gold text-primary p-1.5 rounded-full hover:bg-yellow-400 transition-colors"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(url)}
                    title="Supprimer"
                    className="bg-white text-red-600 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Index */}
                <div className="absolute bottom-2 left-2 bg-black/60 text-white font-lato text-xs px-1.5 py-0.5 rounded-full">
                  {idx + 1}
                </div>
              </div>
            ))}

            {/* Add more */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-28 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-gold transition-colors text-gray-400 hover:text-gold"
            >
              <Upload className="w-5 h-5" />
              <span className="font-lato text-xs">Ajouter</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
