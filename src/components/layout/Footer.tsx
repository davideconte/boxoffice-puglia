import Image from "next/image";
import Link from "next/link";
// Social icons as inline SVG (lucide-react doesn't include branded icons)
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

const FOOTER_LINKS = {
  "Scopri": [
    { href: "/eventi", label: "Tutti gli eventi" },
    { href: "/punti-vendita", label: "Punti Vendita" },
    { href: "/diventa-punto-vendita", label: "Diventa Punto Vendita" },
  ],
  "Azienda": [
    { href: "/chi-siamo", label: "Chi Siamo" },
    { href: "/servizi", label: "Servizi" },
    { href: "/news", label: "News" },
    { href: "/contatti", label: "Contatti" },
  ],
  "Legale": [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/termini-condizioni", label: "Termini e Condizioni" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Image
              src="/logo-white.svg"
              alt="Box Office Puglia"
              width={160}
              height={58}
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              La piattaforma di riferimento per gli eventi in Puglia.<br />
              From Puglia, For Puglia.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/boxofficepuglia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://facebook.com/boxofficepuglia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
              {/* TikTok */}
              <a
                href="https://tiktok.com/@boxofficepuglia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.8a4.85 4.85 0 01-1.07-.11z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Box Office Puglia. Tutti i diritti riservati.</p>
          <p className="text-xs">Biglietti acquistabili tramite circuito TicketOne</p>
        </div>
      </div>
    </footer>
  );
}
