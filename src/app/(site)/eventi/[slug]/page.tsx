import { notFound } from "next/navigation";
import Link from "next/link";
import { getEventBySlug, getRelatedEvents } from "@/lib/sanity/queries";
import { TicketOneEmbed } from "@/components/events/TicketOneEmbed";
import { EventCard } from "@/components/events/EventCard";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatTime } from "@/lib/utils";
import { MOCK_EVENTS } from "@/lib/mockData";
import { Calendar, MapPin, ChevronRight, Ticket, ExternalLink, Store } from "lucide-react";
import type { Metadata } from "next";
import type { Event } from "@/types";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getEvent(slug: string): Promise<Event | null> {
  const sanityEvent = await getEventBySlug(slug).catch(() => null);
  if (sanityEvent) return sanityEvent;
  return MOCK_EVENTS.find((e) => e.slug.current === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Evento non trovato" };

  return {
    title: event.seo?.metaTitle ?? event.title,
    description: event.seo?.metaDescription ?? event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      images: event.image?.asset
        ? [
            `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${event.image.asset._ref.replace("image-", "").replace(/-(\w+)$/, ".$1")}`,
          ]
        : undefined,
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) notFound();

  const related: Event[] = event.category
    ? await getRelatedEvents(event.category.slug.current, slug).catch(() =>
        MOCK_EVENTS.filter(
          (e) =>
            e.slug.current !== slug &&
            e.category?.slug.current === event.category?.slug.current
        ).slice(0, 4)
      )
    : [];

  const imageUrl = event.image?.asset
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${event.image.asset._ref.replace("image-", "").replace(/-(\w+)$/, ".$1")}`
    : null;

  const categoryColor = event.category?.color ?? "#013DFF";

  return (
    <div>
      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ minHeight: 480, backgroundColor: categoryColor }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Breadcrumb */}
        <div className="absolute top-5 left-4 sm:left-8 flex items-center gap-1.5 text-white/50 text-xs font-bold uppercase tracking-widest z-10">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/eventi" className="hover:text-white transition-colors">
            Eventi
          </Link>
          {event.category && (
            <>
              <ChevronRight size={12} />
              <Link
                href={`/eventi?categoria=${event.category.slug.current}`}
                className="hover:text-white transition-colors"
              >
                {event.category.title}
              </Link>
            </>
          )}
        </div>

        {/* Title block */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full pb-12 pt-24">
          <div className="flex flex-wrap gap-2 mb-5">
            {event.category && (
              <Badge label={event.category.title} color={event.category.color} />
            )}
            {event.isSoldOut && (
              <Badge
                label="Sold Out"
                className="bg-brand-red text-white border-transparent"
              />
            )}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-mars text-white uppercase leading-none max-w-4xl mb-6">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/70 text-sm font-bold">
            {event.date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-white/50" />
                <span className="capitalize">{formatDate(event.date)}</span>
                <span className="text-white/30">·</span>
                {formatTime(event.date)}
              </span>
            )}
            {event.venue && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-white/50" />
                {event.venue.name}, {event.venue.city}
              </span>
            )}
            {event.price && (
              <span className="font-bold text-white text-base leading-none">
                {event.price}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── Main column ── */}
          <div className="flex-1 min-w-0">

            {/* Short description */}
            {event.shortDescription && (
              <p
                className="text-xl text-brand-dark font-medium leading-relaxed mb-10 pl-5 border-l-4"
                style={{ borderColor: categoryColor }}
              >
                {event.shortDescription}
              </p>
            )}

            {/* Info boxes */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {event.venue && (
                <div className="border-2 border-brand-dark p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-3">
                    Dove
                  </p>
                  <p className="font-extrabold text-xl text-brand-dark uppercase leading-tight mb-1">
                    {event.venue.name}
                  </p>
                  <p className="text-sm text-brand-gray">{event.venue.address}</p>
                  <p className="text-sm font-bold text-brand-dark mt-0.5">
                    {event.venue.city} ({event.venue.province})
                  </p>
                  {event.venue.googleMapsUrl && (
                    <a
                      href={event.venue.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-brand-blue mt-3 hover:underline"
                    >
                      Apri in Maps <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              )}

              {event.date && (
                <div className="border-2 border-brand-dark p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-3">
                    Quando
                  </p>
                  <p className="font-extrabold text-xl text-brand-dark uppercase leading-tight mb-1 capitalize">
                    {formatDate(event.date)}
                  </p>
                  <p className="text-sm text-brand-gray">
                    Inizio ore {formatTime(event.date)}
                  </p>
                  {event.endDate && (
                    <p className="text-xs text-brand-gray mt-1">
                      Fine prevista: {formatDate(event.endDate)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* ── Ticket section ── */}
            {event.ticketOneUrl && !event.isSoldOut ? (
              <TicketOneEmbed
                ticketOneUrl={event.ticketOneUrl}
                eventTitle={event.title}
              />
            ) : event.isSoldOut ? (
              <div className="border-2 border-brand-red p-10 text-center">
                <div className="w-16 h-16 bg-brand-red flex items-center justify-center mx-auto mb-5">
                  <Ticket className="text-white" size={30} />
                </div>
                <p className="font-extrabold uppercase text-brand-dark text-3xl mb-2 leading-none">
                  Evento Sold Out
                </p>
                <p className="text-brand-gray font-medium">
                  I biglietti per questo evento sono esauriti.
                </p>
              </div>
            ) : (
              /* Generic CTA — no TicketOne URL yet */
              <div id="acquista" className="border-2 border-brand-dark overflow-hidden">
                <div className="bg-brand-dark px-7 py-5 flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-white text-xl uppercase leading-none">
                      Acquista i biglietti
                    </p>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">
                      Partner ufficiale TicketOne
                    </p>
                  </div>
                  {event.price && (
                    <p className="font-extrabold text-brand-lime text-2xl leading-none">
                      {event.price}
                    </p>
                  )}
                </div>
                <div className="p-7 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-blue flex items-center justify-center flex-shrink-0">
                      <Ticket className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-brand-dark mb-0.5">Acquisto online</p>
                      <p className="text-brand-gray text-sm leading-relaxed">
                        Disponibile su TicketOne.it — ricevi subito il biglietto via email in formato digitale con QR code.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-lime border-2 border-brand-dark flex items-center justify-center flex-shrink-0">
                      <Store className="text-brand-dark" size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-brand-dark mb-0.5">
                        50+ punti vendita fisici
                      </p>
                      <p className="text-brand-gray text-sm leading-relaxed">
                        Acquista di persona in tutta la Puglia — Bari, Lecce, Taranto, Foggia, Brindisi e BAT. Nessun account richiesto.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/punti-vendita"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-brand-blue text-white font-bold text-base uppercase tracking-wide hover:bg-brand-blue-dark transition-colors"
                  >
                    <MapPin size={18} /> Trova il punto vendita
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-28 space-y-4">

              {/* Details card */}
              <div className="border-2 border-brand-dark overflow-hidden">
                <div className="bg-gray-50 border-b-2 border-brand-dark px-6 py-4">
                  <h3 className="font-bold uppercase text-brand-dark text-xl tracking-widest leading-none">
                    Dettagli evento
                  </h3>
                </div>
                <div className="divide-y-2 divide-brand-dark/10">
                  {event.date && (
                    <div className="flex items-start gap-4 px-6 py-4">
                      <div
                        className="w-9 h-9 flex items-center justify-center flex-shrink-0 border-2 border-brand-dark mt-0.5"
                        style={{ backgroundColor: `${categoryColor}15` }}
                      >
                        <Calendar size={15} className="text-brand-dark" />
                      </div>
                      <div>
                        <p className="text-brand-gray text-xs font-bold uppercase tracking-widest mb-0.5">
                          Data e ora
                        </p>
                        <p className="font-bold text-brand-dark capitalize text-sm">
                          {formatDate(event.date)}
                        </p>
                        <p className="text-brand-gray text-xs">
                          Ore {formatTime(event.date)}
                        </p>
                      </div>
                    </div>
                  )}

                  {event.venue && (
                    <div className="flex items-start gap-4 px-6 py-4">
                      <div
                        className="w-9 h-9 flex items-center justify-center flex-shrink-0 border-2 border-brand-dark mt-0.5"
                        style={{ backgroundColor: `${categoryColor}15` }}
                      >
                        <MapPin size={15} className="text-brand-dark" />
                      </div>
                      <div>
                        <p className="text-brand-gray text-xs font-bold uppercase tracking-widest mb-0.5">
                          Luogo
                        </p>
                        <p className="font-bold text-brand-dark text-sm">
                          {event.venue.name}
                        </p>
                        <p className="text-brand-gray text-xs">
                          {event.venue.city}, {event.venue.province}
                        </p>
                      </div>
                    </div>
                  )}

                  {event.price && (
                    <div className="flex items-start gap-4 px-6 py-4">
                      <div
                        className="w-9 h-9 flex items-center justify-center flex-shrink-0 border-2 border-brand-dark mt-0.5"
                        style={{ backgroundColor: `${categoryColor}15` }}
                      >
                        <Ticket size={15} className="text-brand-dark" />
                      </div>
                      <div>
                        <p className="text-brand-gray text-xs font-bold uppercase tracking-widest mb-0.5">
                          Prezzo
                        </p>
                        <p className="font-extrabold text-brand-blue text-xl leading-none">
                          {event.price}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA buttons */}
                <div className="px-6 pb-6 pt-2 space-y-3">
                  {event.isSoldOut ? (
                    <div className="w-full py-4 bg-gray-100 text-brand-gray font-bold text-sm uppercase tracking-wide text-center border-2 border-brand-dark/20">
                      Sold Out
                    </div>
                  ) : (
                    <a
                      href={event.ticketOneUrl ?? "#acquista"}
                      className="flex items-center justify-center gap-2 w-full px-5 py-4 bg-brand-blue text-white font-bold text-base uppercase tracking-wide hover:bg-brand-blue-dark transition-colors"
                    >
                      <Ticket size={20} /> Acquista
                    </a>
                  )}

                  {event.venue?.googleMapsUrl && (
                    <a
                      href={event.venue.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 border-2 border-brand-dark text-brand-dark font-bold text-sm uppercase tracking-wide bg-white hover:bg-gray-50 transition-colors"
                    >
                      <MapPin size={16} /> Come arrivare{" "}
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>

              {/* POS reminder */}
              <div className="border-2 border-brand-dark bg-brand-lime p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-dark/50 mb-2">
                  Alternativa online
                </p>
                <p className="font-bold text-brand-dark text-base uppercase tracking-widest leading-tight mb-3">
                  Compra dal vivo
                </p>
                <p className="text-brand-dark/70 text-sm font-medium mb-4 leading-relaxed">
                  50+ negozi autorizzati in Puglia. Nessun account, nessuna commissione online.
                </p>
                <Link
                  href="/punti-vendita"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-brand-dark hover:underline"
                >
                  Trova il più vicino →
                </Link>
              </div>

              {/* Back to events */}
              <Link
                href="/eventi"
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-brand-dark/20 text-brand-gray font-bold text-xs uppercase tracking-widest hover:border-brand-dark hover:text-brand-dark transition-all"
              >
                ← Tutti gli eventi
              </Link>
            </div>
          </aside>
        </div>

        {/* ── Related events ── */}
        {related.length > 0 && (
          <section className="mt-16 border-t-2 border-brand-dark pt-12">
            <h2 className="text-3xl font-extrabold uppercase text-brand-dark mb-8 leading-none">
              Eventi correlati
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((ev: Event) => (
                <EventCard key={ev._id} event={ev} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
