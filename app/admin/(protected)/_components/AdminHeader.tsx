"use client";

import { usePathname } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { logout } from "../../actions";
import { useSidebar } from "./AdminSidebarContext";

const pageTitles: Record<string, string> = {
  "/admin": "Tableau de bord",
  "/admin/logements": "Logements",
  "/admin/disponibilites": "Disponibilités",
  "/admin/reservations": "Réservations",
  "/admin/evenements": "Événements",
  "/admin/restaurants": "Restaurants",
  "/admin/tarifs": "Tarifs",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const { toggle } = useSidebar();

  // Match exact or starts-with (e.g. /admin/logements/[id])
  const title =
    pageTitles[pathname] ??
    Object.entries(pageTitles).find(([key]) => pathname.startsWith(key + "/"))?.[1] ??
    "Administration";

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between shadow-sm gap-3">
      {/* Hamburger — mobile only */}
      <button
        onClick={toggle}
        className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
        aria-label="Ouvrir le menu"
      >
        <Menu className="w-5 h-5 text-primary" />
      </button>

      {/* Page title */}
      <h1 className="font-playfair text-lg sm:text-xl text-primary truncate flex-1 lg:flex-none">
        {title}
      </h1>

      {/* Déconnexion */}
      <form action={logout} className="flex-shrink-0">
        <button
          type="submit"
          className="flex items-center gap-2 font-lato text-sm text-gray-500 hover:text-primary transition-colors px-3 py-2 rounded-xl hover:bg-gray-100 min-h-[44px]"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Déconnexion</span>
        </button>
      </form>
    </header>
  );
}
