import { EventCard } from "@/components/events/EventCard";
import { getUpcomingEvents, getCategories } from "@/lib/sanity/queries";
import { PROVINCES } from "@/lib/utils";
import { MOCK_EVENTS } from "@/lib/mockData";
import { Ticket, X } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import type { Event, Category } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Eventi in Puglia",
  description:
    "Scopri tutti gli eventi in Puglia: concerti, teatro, sport, cultura, sagre e molto altro. Acquista i biglietti online o nei punti vendita.",
};

interface SearchParams {
  provincia?: string;
  categoria?: string;
  dal?: string;
  al?: string;
  pagina?: string;
}

export default async function EventiPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const [rawEvents, categories] = await Promise.all([
    getUpcomingEvents({
      province: params.provincia,
      categorySlug: params.categoria,
      from: params.dal,
      to: params.al,
      page: params.pagina ? parseInt(params.pagina) - 1 : 0,
    }).catch(() => []),
    getCategories().catch(() => []),
  ]);

  const events: Event[] = rawEvents.length > 0 ? rawEvents : MOCK_EVENTS;

  const activeCategory = params.categoria
    ? categories.find((c: Category) => c.slug.current === params.categoria)
    : null;
  const activeProvince = params.provincia
    ? PROVINCES.find((p) => p.value === params.provincia)
    : null;
  const hasFilters = !!(params.categoria || params.provincia);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-brand-dark text-white overflow-hidden border-b-2 border-brand-dark">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-brand-lime text-xs font-bold uppercase tracking-widest mb-5">
            Box Office Puglia
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1 className="text-6xl md:text-8xl font-mars uppercase leading-none">
              {hasFilters ? (
                activeCategory?.title ??
                activeProvince?.label.split("-")[0] ??
                "Risultati"
              ) : (
                <>
                  Tutti gli
                  <br />
                  eventi
                </>
              )}
            </h1>
            <div className="sm:text-right">
              <p className="font-mars text-5xl text-white leading-none">
                {events.length}
              </p>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">
                {events.length === 1 ? "evento trovato" : "eventi trovati"}
              </p>
            </div>
          </div>

          {/* Active filter chips */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10 items-center">
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                Filtri attivi:
              </span>
              {activeCategory && (
                <Link
                  href={`/eventi${params.provincia ? `?provincia=${params.provincia}` : ""}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:border-white transition-colors"
                >
                  <span
                    className="w-2 h-2 flex-shrink-0"
                    style={{ backgroundColor: activeCategory.color }}
                  />
                  {activeCategory.title}
                  <X size={11} />
                </Link>
              )}
              {activeProvince && (
                <Link
                  href={`/eventi${params.categoria ? `?categoria=${params.categoria}` : ""}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:border-white transition-colors"
                >
                  {activeProvince.label}
                  <X size={11} />
                </Link>
              )}
              <Link
                href="/eventi"
                className="text-white/40 text-xs font-bold uppercase tracking-widest underline ml-2 hover:text-white transition-colors"
              >
                Rimuovi tutti
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Mobile category scroll ── */}
      <div className="lg:hidden bg-white border-b-2 border-brand-dark">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
          <Link
            href={`/eventi${params.provincia ? `?provincia=${params.provincia}` : ""}`}
            className={`flex-shrink-0 px-4 py-1.5 border-2 border-brand-dark font-bold text-sm uppercase tracking-wide transition-colors ${
              !params.categoria
                ? "bg-brand-dark text-white"
                : "bg-white text-brand-dark"
            }`}
          >
            Tutti
          </Link>
          {categories.map((cat: Category) => (
            <Link
              key={cat._id}
              href={`/eventi?categoria=${cat.slug.current}${params.provincia ? `&provincia=${params.provincia}` : ""}`}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 border-2 border-brand-dark font-bold text-sm uppercase tracking-wide transition-colors ${
                params.categoria === cat.slug.current
                  ? "bg-brand-dark text-white"
                  : "bg-white text-brand-dark"
              }`}
            >
              {cat.color && (
                <span
                  className="w-2 h-2 flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
              )}
              {cat.title}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── Sidebar (desktop only) ── */}
          <aside className="hidden lg:block lg:w-52 flex-shrink-0">
            <div className="sticky top-28 border-2 border-brand-dark overflow-hidden">
              {/* Categories */}
              <div className="font-bold text-brand-dark text-sm uppercase px-5 py-3 border-b-2 border-brand-dark bg-gray-50 tracking-widest">
                Categoria
              </div>
              <div className="p-2 space-y-0.5 border-b-2 border-brand-dark">
                <FilterLink
                  href={`/eventi${params.provincia ? `?provincia=${params.provincia}` : ""}`}
                  label="Tutte"
                  active={!params.categoria}
                />
                {categories.map((cat: Category) => (
                  <FilterLink
                    key={cat._id}
                    href={`/eventi?categoria=${cat.slug.current}${params.provincia ? `&provincia=${params.provincia}` : ""}`}
                    label={cat.title!}
                    active={params.categoria === cat.slug.current}
                    color={cat.color}
                  />
                ))}
              </div>

              {/* Provinces */}
              <div className="font-bold text-brand-dark text-sm uppercase px-5 py-3 border-b-2 border-brand-dark bg-gray-50 tracking-widest">
                Provincia
              </div>
              <div className="p-3 grid grid-cols-3 gap-1.5">
                <Link
                  href={`/eventi${params.categoria ? `?categoria=${params.categoria}` : ""}`}
                  className={`col-span-3 text-center py-2 text-xs font-bold uppercase tracking-widest border-2 transition-all ${
                    !params.provincia
                      ? "bg-brand-dark text-white border-brand-dark"
                      : "bg-white text-brand-dark border-brand-dark/30 hover:border-brand-dark"
                  }`}
                >
                  Tutte
                </Link>
                {PROVINCES.map((p) => (
                  <Link
                    key={p.value}
                    href={`/eventi?provincia=${p.value}${params.categoria ? `&categoria=${params.categoria}` : ""}`}
                    className={`text-center py-2 text-xs font-bold uppercase tracking-widest border-2 transition-all ${
                      params.provincia === p.value
                        ? "bg-brand-dark text-white border-brand-dark"
                        : "bg-white text-brand-dark border-brand-dark/30 hover:border-brand-dark"
                    }`}
                    title={p.label}
                  >
                    {p.value}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Event grid ── */}
          <div className="flex-1 min-w-0">
            {events.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {events.map((event: Event, i: number) => (
                  <EventCard key={event._id} event={event} priority={i < 6} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-4 bg-gray-50 border-2 border-brand-dark">
                <div className="w-20 h-20 bg-brand-dark flex items-center justify-center mx-auto mb-6">
                  <Ticket className="text-white" size={36} />
                </div>
                <h3 className="text-3xl font-extrabold text-brand-dark mb-3 uppercase leading-none">
                  Nessun evento trovato
                </h3>
                <p className="text-brand-gray font-medium mb-8 max-w-md mx-auto">
                  Prova a modificare i filtri di ricerca per trovare altri
                  risultati.
                </p>
                <Link
                  href="/eventi"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark text-white font-bold text-sm uppercase tracking-wide hover:bg-brand-blue transition-colors"
                >
                  Rimuovi tutti i filtri
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterLink({
  href,
  label,
  active,
  color,
}: {
  href: string;
  label: string;
  active: boolean;
  color?: string;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold uppercase tracking-widest border-2 transition-all ${
        active
          ? "bg-brand-dark text-white border-brand-dark"
          : "border-transparent text-brand-dark hover:border-brand-dark"
      }`}
    >
      {color && (
        <span
          className="w-2.5 h-2.5 flex-shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
      <span className="truncate">{label}</span>
    </Link>
  );
}
