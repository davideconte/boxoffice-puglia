"use client";

import { buildTicketOneUrl } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface TicketOneEmbedProps {
  ticketOneUrl: string;
  eventTitle?: string;
}

export function TicketOneEmbed({ ticketOneUrl, eventTitle }: TicketOneEmbedProps) {
  const affiliateUrl = buildTicketOneUrl(ticketOneUrl);

  return (
    <section id="acquista" className="mt-10 scroll-mt-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-brand-dark">Acquista i biglietti</h2>
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-brand-blue hover:underline"
        >
          Apri su TicketOne <ExternalLink size={14} />
        </a>
      </div>

      <div className="rounded-brand overflow-hidden border border-gray-200 bg-gray-50">
        <iframe
          src={affiliateUrl}
          className="w-full min-h-[600px]"
          title={eventTitle ? `Acquista biglietti - ${eventTitle}` : "Acquista biglietti su TicketOne"}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
        />
      </div>

      <p className="mt-2 text-xs text-brand-gray text-center">
        Acquisto sicuro tramite{" "}
        <a href="https://www.ticketone.it" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">
          TicketOne
        </a>
      </p>
    </section>
  );
}
