"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  CalendarDays,
  ClipboardList,
  PartyPopper,
  UtensilsCrossed,
  ExternalLink,
  Tags,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Logements",
    href: "/admin/logements",
    icon: Home,
  },
  {
    label: "Disponibilités",
    href: "/admin/disponibilites",
    icon: CalendarDays,
  },
  {
    label: "Réservations",
    href: "/admin/reservations",
    icon: ClipboardList,
  },
  {
    label: "Événements",
    href: "/admin/evenements",
    icon: PartyPopper,
  },
  {
    label: "Restaurants",
    href: "/admin/restaurants",
    icon: UtensilsCrossed,
  },
  {
    label: "Tarifs",
    href: "/admin/tarifs",
    icon: Tags,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-primary text-white flex flex-col z-30 shadow-xl">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Image
          src="/logo-admin.svg"
          alt="L'Escapade Rangeoise"
          width={160}
          height={48}
          className="h-10 w-auto mb-1"
        />
        <p className="font-lato text-xs text-white/40">Administration</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-lato text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-gold text-primary"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-lato text-xs text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          Voir le site public
        </Link>
      </div>
    </aside>
  );
}
