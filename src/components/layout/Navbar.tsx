"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/eventi", label: "Eventi" },
  { href: "/punti-vendita", label: "Punti Vendita" },
  { href: "/servizi", label: "Servizi" },
  { href: "/news", label: "News" },
  { href: "/chi-siamo", label: "Chi Siamo" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm" style={{ borderTop: "3px solid #013DFF" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
            <Image
              src="/logo-primary.svg"
              alt="Box Office Puglia"
              width={180}
              height={65}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "bg-brand-blue-light text-brand-blue"
                    : "text-brand-dark hover:bg-gray-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/diventa-punto-vendita"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-brand text-sm font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors"
            >
              Diventa PdV
            </Link>
            <button
              className="md:hidden p-2 rounded-lg text-brand-dark hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-brand-blue-light text-brand-blue"
                  : "text-brand-dark hover:bg-gray-100"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/diventa-punto-vendita"
            onClick={() => setMobileOpen(false)}
            className="block mt-2 px-4 py-2.5 rounded-brand text-sm font-semibold text-center bg-brand-blue text-white"
          >
            Diventa Punto Vendita
          </Link>
        </div>
      )}
    </header>
  );
}
