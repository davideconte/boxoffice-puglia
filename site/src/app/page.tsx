import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EventCard } from "@/components/events/EventCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { getFeaturedEvents, getUpcomingEvents, getCategories } from "@/lib/sanity/queries";
import { MOCK_EVENTS, MOCK_CATEGORIES } from "@/lib/mockData";
import { ArrowRight, MapPin, Calendar, Users, TrendingUp, Star } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [upcomingEvents, categories] = await Promise.all([
    getUpcomingEvents().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : MOCK_EVENTS;
  const displayCategories = categories.length > 0 ? categories : MOCK_CATEGORIES;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">

        {/* ===== HERO (Solid Blue, clean and minimal) ===== */}
        <section
          className="relative bg-brand-blue overflow-hidden pt-20 pb-32 lg:pb-40 z-10"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)" }}
        >
          {/* Logo watermark — behind dot grid */}
          <div className="absolute bottom-0 right-0 w-[55%] max-w-2xl opacity-[0.07] pointer-events-none select-none" aria-hidden="true">
            <Image src="/logo-only.svg" alt="" width={900} height={260} className="w-full h-auto" />
          </div>
          {/* Dot grid texture */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              
              {/* Left: copy */}
              <div>
                <span className="inline-block px-4 py-2 bg-brand-cyan text-brand-blue font-mars tracking-widest uppercase text-xl mb-8 border-4 border-brand-blue shadow-[6px_6px_0_#013DFF]">
                  Tickets for Puglia
                </span>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-mars text-white uppercase leading-[0.95] tracking-wide mb-8">
                  Tutti gli eventi <br />
                  della Puglia
                </h1>

                <p className="text-white/90 text-xl font-medium leading-tight mb-10 max-w-md">
                  Concerti, teatro, sport e sagre in tutta la regione.
                  Acquista online o in uno dei nostri 50+ punti vendita autorizzati.
                </p>

                <div className="flex flex-wrap gap-6 mt-12">
                  <Link
                    href="/eventi"
                    className="inline-flex items-center gap-2 px-10 py-5 bg-brand-lime text-brand-blue uppercase font-bold text-base border-4 border-brand-blue shadow-[8px_8px_0_#013DFF] hover:translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0_#013DFF] transition-all"
                  >
                    Scopri gli eventi <ArrowRight size={24} />
                  </Link>
                  <Link
                    href="/punti-vendita"
                    className="inline-flex items-center gap-2 px-10 py-5 bg-white text-brand-blue uppercase font-bold text-base border-4 border-brand-blue shadow-[8px_8px_0_#013DFF] hover:translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0_#013DFF] transition-all"
                  >
                    <MapPin size={24} /> Punti Vendita
                  </Link>
                </div>
              </div>

              {/* Right: Stats Block (Thick Brutalist Blocks) */}
              <div className="hidden lg:grid grid-cols-2 gap-6 items-end pb-8">
                {[
                  { value: "500+", label: "EVENTI ATTIVI", accentBg: "bg-white", accentText: "text-brand-blue", accent: "#013DFF" },
                  { value: "6", label: "PROVINCE", accentBg: "bg-brand-lime", accentText: "text-brand-dark", accent: "#1B1B1B" },
                  { value: "50+", label: "PUNTI VENDITA", accentBg: "bg-brand-red", accentText: "text-white", accent: "#1B1B1B" },
                  { value: "20K+", label: "BIGLIETTI", accentBg: "bg-brand-cyan", accentText: "text-brand-dark", accent: "#1B1B1B" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`${s.accentBg} ${s.accentText} p-6 border-4 border-brand-dark shadow-[6px_6px_0_#1B1B1B] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#1B1B1B]`}
                  >
                    <p className="font-mars text-5xl uppercase block mb-1">{s.value}</p>
                    <p className="font-bold text-xs tracking-widest opacity-70">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== CATEGORY CHIPS (Dark mode, monochrome accents) ===== */}
        <section className="bg-brand-dark -mt-20 pt-28 pb-6 sticky top-16 z-20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide items-center">
              <Link
                href="/eventi"
                className="flex-shrink-0 px-6 py-2 bg-white text-brand-dark font-bold text-sm uppercase tracking-wide hover:bg-gray-200 transition-colors"
              >
                Tutti
              </Link>
              {displayCategories.map(
                (cat: { _id?: string; title: string; slug: { current: string }; color?: string }) => {
                  return (
                    <Link
                      key={cat._id ?? cat.slug.current}
                      href={`/eventi?categoria=${cat.slug.current}`}
                      className="flex-shrink-0 px-5 py-2 border border-white/20 text-white font-bold text-sm uppercase tracking-wide hover:border-white hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                      {/* Optional subtle color dot if present */}
                      {cat.color && (
                        <span className="w-2.5 h-2.5 rounded-full block" style={{ backgroundColor: cat.color }} />
                      )}
                      {cat.title}
                    </Link>
                  )
                }
              )}
            </div>
          </div>
        </section>

        {/* ===== UPCOMING EVENTS ===== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          
          <div className="flex items-end justify-between mb-12 border-b-4 border-brand-dark pb-4">
            <div>
              <p className="text-brand-blue font-bold text-xs uppercase tracking-widest mb-1">
                In programma
              </p>
              <h2 className="text-5xl md:text-6xl font-extrabold text-brand-dark uppercase">Prossimi eventi</h2>
            </div>
            <Link
              href="/eventi"
              className="hidden sm:flex items-center gap-2 text-brand-dark font-semibold text-sm hover:text-brand-blue transition-colors"
            >
              Vedi tutti <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayEvents.slice(0, 8).map(
              (event: Parameters<typeof EventCard>[0]["event"], i: number) => (
                <EventCard key={event._id} event={event} priority={i < 4} />
              )
            )}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/eventi"
              className="inline-flex items-center gap-2 px-10 py-5 bg-brand-blue text-white uppercase font-bold text-base hover:bg-brand-blue-dark transition-colors"
            >
              Tutti gli eventi <ArrowRight size={24} />
            </Link>
          </div>
        </section>

        {/* ===== FROM PUGLIA FOR (Thematic Blocks using pure custom SVGs) ===== */}
        <section className="bg-white pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  labelIt: "Culture",
                  desc: "Mostre, musei e patrimoni UNESCO",
                  href: "/eventi?categoria=cultura",
                  textClass: "text-white",
                  src: "/frompugliaforculture.svg",
                },
                {
                  labelIt: "Nature",
                  desc: "Trekking, mare e avventura in natura",
                  href: "/eventi?categoria=natura",
                  textClass: "text-[#013DFF]",
                  src: "/frompugliafornature.svg",
                },
                {
                  labelIt: "Events",
                  desc: "Tradizione, cibo e musica popolare",
                  href: "/eventi",
                  textClass: "text-[#013DFF]",
                  src: "/frompugliaforevents.svg",
                },
              ].map((item) => (
                <Link
                  key={item.labelIt}
                  href={item.href}
                  className="block w-full focus:outline-none"
                >
                  <Image 
                    src={item.src} 
                    alt={`From Puglia For ${item.labelIt}`} 
                    width={1000} 
                    height={1000} 
                    className="w-full h-auto block object-contain" 
                    priority
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY US ===== */}
        <section className="border-t-2 border-b-2 border-brand-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark uppercase mb-8 text-center">
              Perché sceglierci
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-brand-dark border-t-2 border-brand-dark">
            {[
              {
                num: "01",
                title: "Biglietti Sicuri",
                desc: "Acquisto certificato tramite circuito TicketOne. Nessuna sorpresa, nessuna fregatura: il biglietto è garantito.",
                bg: "bg-white",
                accent: "#013DFF",
              },
              {
                num: "02",
                title: "50+ Punti Vendita",
                desc: "Ritira il biglietto in tutta la Puglia — Bari, Lecce, Taranto e oltre. Anche senza connessione internet.",
                bg: "bg-brand-lime",
                accent: "#1B1B1B",
              },
              {
                num: "03",
                title: "Istantaneo",
                desc: "Paghi online e ricevi subito il biglietto via email. Acquisto in pochi secondi, disponibile 24 ore su 24.",
                bg: "bg-white",
                accent: "#FF425E",
              },
            ].map((item) => (
              <div key={item.title} className={`${item.bg} p-10 lg:p-14 flex flex-col`}>
                <div className="h-1 w-12 mb-6" style={{ backgroundColor: item.accent }} />
                <p className="font-mars text-8xl text-brand-dark/10 leading-none mb-4 select-none">{item.num}</p>
                <h3 className="font-extrabold text-2xl uppercase text-brand-dark mb-4">{item.title}</h3>
                <p className="text-brand-dark/70 font-medium text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CTA: BECOME POS & NEWSLETTER (Monochrome split) ===== */}
        <section className="flex flex-col lg:flex-row">
          
          {/* POS CTA */}
          <div className="flex-1 bg-brand-dark text-white p-16 lg:p-24 flex flex-col justify-center">
             <div className="w-full max-w-lg mx-auto lg:ml-auto lg:mr-12">
                <span className="inline-block px-4 py-1 border border-white/20 text-white font-bold text-sm uppercase tracking-widest mb-6">
                  Partner TicketOne
                </span>
                <h2 className="text-5xl md:text-6xl font-extrabold uppercase mb-6 text-brand-lime leading-tight">Sei un esercente?</h2>
                <p className="text-xl font-medium mb-10 text-white/80">
                  Entra nel circuito Box Office Puglia. Porta più clienti e guadagna commissioni su ogni biglietto.
                </p>
                <Link
                  href="/diventa-punto-vendita"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-lime text-brand-dark font-bold text-base uppercase hover:bg-white transition-colors"
                >
                  Diventa Punto Vendita
                </Link>
             </div>
          </div>

          {/* NEWSLETTER */}
          <div className="flex-1 bg-brand-blue text-white p-16 lg:p-24 flex flex-col justify-center">
            <div className="w-full max-w-lg mx-auto lg:mr-auto lg:ml-12">
               <Star className="text-brand-cyan mb-6 w-12 h-12" />
               <h2 className="text-5xl md:text-6xl font-extrabold uppercase mb-6 leading-tight">Resta<br/>Aggiornato</h2>
               <p className="text-xl font-medium mb-10 text-white/80">
                 Eventi esclusivi e promozioni speciali direttamente nella tua casella email.
               </p>
               <div className="w-full max-w-sm">
                 <NewsletterForm />
               </div>
            </div>
          </div>

        </section>

      </main>
      <Footer />
    </>
  );
}
