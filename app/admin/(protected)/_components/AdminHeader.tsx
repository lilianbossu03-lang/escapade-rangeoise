"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout } from "../../actions";

const pageTitles: Record<string, string> = {
  "/admin": "Tableau de bord",
  "/admin/logements": "Logements",
  "/admin/disponibilites": "Disponibilités",
  "/admin/reservations": "Réservations",
  "/admin/evenements": "Événements",
  "/admin/restaurants": "Restaurants",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Administration";

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <h1 className="font-playfair text-xl text-primary">{title}</h1>

      <form action={logout}>
        <button
          type="submit"
          className="flex items-center gap-2 font-lato text-sm text-gray-500 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </form>
    </header>
  );
}
