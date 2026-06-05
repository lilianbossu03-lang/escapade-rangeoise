"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Home,
  CalendarDays,
  ClipboardList,
  PartyPopper,
  UtensilsCrossed,
  ExternalLink,
  Tags,
  X,
} from "lucide-react";
import Image from "next/image";
import FocusTrap from "focus-trap-react";
import { useSidebar } from "./AdminSidebarContext";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Logements", href: "/admin/logements", icon: Home },
  { label: "Disponibilités", href: "/admin/disponibilites", icon: CalendarDays },
  { label: "Réservations", href: "/admin/reservations", icon: ClipboardList },
  { label: "Événements", href: "/admin/evenements", icon: PartyPopper },
  { label: "Restaurants", href: "/admin/restaurants", icon: UtensilsCrossed },
  { label: "Tarifs", href: "/admin/tarifs", icon: Tags },
];

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
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
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-lato text-sm font-medium transition-all duration-150 min-h-[44px] ${
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
          onClick={onLinkClick}
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-lato text-xs text-white/50 hover:text-white hover:bg-white/10 transition-all min-h-[44px]"
        >
          <ExternalLink className="w-4 h-4" />
          Voir le site public
        </Link>
      </div>
    </>
  );
}

export default function AdminSidebar() {
  const { isOpen, close } = useSidebar();

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  return (
    <>
      {/* ── Desktop sidebar (lg+) ─────────────────────────────────────── */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-primary text-white flex-col z-30 shadow-xl">
        <SidebarContent />
      </aside>

      {/* ── Mobile overlay ────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      <FocusTrap active={isOpen} focusTrapOptions={{ initialFocus: false, allowOutsideClick: true }}>
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation administration"
          className={`lg:hidden fixed top-0 left-0 h-screen w-[280px] max-w-[80vw] bg-primary text-white flex flex-col z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Fermer le menu"
          >
            <X className="w-5 h-5" />
          </button>

          <SidebarContent onLinkClick={close} />
        </aside>
      </FocusTrap>
    </>
  );
}
