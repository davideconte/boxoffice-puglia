import Link from "next/link";
import { EventCard } from "@/components/events/EventCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { getFeaturedEvents, getUpcomingEvents, getCategories } from "@/lib/sanity/queries";
import { MOCK_EVENTS, MOCK_CATEGORIES } from "@/lib/mockData";
import { ArrowRight, MapPin, Calendar, Users, TrendingUp, Star, ShieldCheck, Zap, Store } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [featuredEvents, upcomingEvents, categories] = await Promise.all([
    getFeaturedEvents().catch(() => []),
    getUpcomingEvents().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : MOCK_EVENTS;
  const displayCategories = categories.length > 0 ? categories : MOCK_CATEGORIES;

  return (
    <div>
      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#013DFF", minHeight: 580 }}
      >
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Diagonal accent shape — brand geometric style */}
        <div
          className="absolute -right-24 top-0 bottom-0 w-[45%] opacity-[0.07]"
          style={{
            background: "#fff",
            clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* ── Left: copy ── */}
            <div>
              {/* Tag */}
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/80 text-xs font-semibold tracking-widest uppercase mb-6">
                From Puglia, For Puglia
              </span>

              <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
                Tutti gli eventi
                <br />
                <span className="text-white/60">della Puglia.</span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                Concerti, teatro, sport e sagre in tutta la regione.
                Acquista online o in uno dei nostri 50+ punti vendita autorizzati.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/eventi"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-blue font-bold rounded-brand hover:bg-blue-50 transition-colors shadow-lg text-sm"
                >
                  Scopri gli eventi <ArrowRight size={17} />
                </Link>
                <Link
                  href="/punti-vendita"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-bold rounded-brand hover:bg-white/10 transition-colors text-sm"
                >
                  <MapPin size={17} /> Punti Vendita
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-10 border-t border-white/15">
                {[
                  { icon: Calendar, value: "500+", label: "eventi" },
                  { icon: MapPin, value: "6", label: "province" },
                  { icon: Users, value: "50+", label: "punti vendita" },
                  { icon: TrendingUp, value: "20k+", label: "biglietti" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-extrabold text-white">{s.value}</p>
                    <p className="text-white/45 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: event preview cards ── */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {MOCK_EVENTS.slice(0, 4).map((event) => {
                const color = event.category?.color ?? "#013DFF";
                return (
                  <div
                    key={event._id}
                    className="p-4 border-2 border-white/20 hover:-translate-y-1 transition-transform cursor-default"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 inline-block mb-3 uppercase tracking-widest"
                      style={{ backgroundColor: color, color: "#fff" }}
                    >
                      {event.category?.title}
                    </span>
                    <p className="text-white font-bold text-sm leading-snug line-clamp-2 mb-3">
                      {event.title}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
                      <p className="text-white/50 text-xs font-medium">{event.venue?.city}</p>
                      {event.price && (
                        <p className="text-white font-bold text-xs">{event.price}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </section>

      {/* ===== CATEGORY CHIPS ===== */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
            <Link
              href="/eventi"
              className="flex-shrink-0 px-4 py-2 rounded-full bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-dark transition-colors"
            >
              Tutti
            </Link>
            {displayCategories.map((cat: { _id?: string; title: string; slug: { current: string }; color?: string }) => (
              <Link
                key={cat._id ?? cat.slug.current}
                href={`/eventi?categoria=${cat.slug.current}`}
                className="flex-shrink-0 px-4 py-2 rounded-full border text-sm font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
                style={
                  cat.color
                    ? { borderColor: `${cat.color}55`, color: cat.color, backgroundColor: `${cat.color}12` }
                    : undefined
                }
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-1">In programma</p>
            <h2 className="text-3xl font-extrabold text-brand-dark">Prossimi eventi</h2>
            <p className="text-brand-gray mt-1">Non perdere gli eventi più attesi in Puglia</p>
          </div>
          <Link
            href="/eventi"
            className="hidden sm:flex items-center gap-1.5 text-brand-blue font-semibold hover:underline text-sm"
          >
            Vedi tutti <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayEvents.slice(0, 8).map((event: Parameters<typeof EventCard>[0]["event"], i: number) => (
            <EventCard key={event._id} event={event} priority={i < 4} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/eventi"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-brand-blue text-brand-blue font-bold rounded-brand hover:bg-brand-blue-light transition-colors"
          >
            Tutti gli eventi <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* ===== FROM PUGLIA FOR ===== */}
      <section className="overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            {
              word: "Puglia",
              href: "/eventi",
              bg: "#FF425E",
              text: "#fff",
            },
            {
              word: "Culture",
              href: "/eventi?categoria=cultura",
              bg: "#013DFF",
              text: "#fff",
            },
            {
              word: "Nature",
              href: "/eventi?categoria=natura",
              bg: "#D2FF5A",
              text: "#1B1B1B",
            },
            {
              word: "Events",
              href: "/eventi",
              bg: "#5CFFEB",
              text: "#1B1B1B",
            },
          ].map((item) => (
            <Link
              key={item.word}
              href={item.href}
              className="group relative flex flex-col justify-end min-h-[180px] sm:min-h-[260px] lg:min-h-[300px] p-5 sm:p-8 overflow-hidden"
              style={{ backgroundColor: item.bg }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.06] transition-colors duration-200" />
              <div className="relative z-10">
                <p
                  className="text-xl sm:text-3xl lg:text-[2rem] leading-snug tracking-tight"
                  style={{ color: item.text }}
                >
                  From{" "}
                  <span className="font-extrabold italic">Puglia</span>
                  <br />
                  For{" "}
                  <span className="font-extrabold italic">{item.word}</span>
                </p>
                <div
                  className="mt-3 flex items-center gap-1 text-xs sm:text-sm font-semibold opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                  style={{ color: item.text }}
                >
                  Scopri <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-2">Perché sceglierci</p>
          <h2 className="text-3xl font-extrabold text-brand-dark">Il modo più semplice per vivere la Puglia</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "Biglietti Sicuri",
              desc: "Acquisto certificato tramite circuito TicketOne. Nessuna sorpresa, nessuna fregatura.",
              accent: "#013DFF",
            },
            {
              icon: Store,
              title: "50+ Punti Vendita",
              desc: "Ritira il biglietto in tutta la Puglia: Bari, Lecce, Taranto e oltre. Anche senza internet.",
              accent: "#D2FF5A",
            },
            {
              icon: Zap,
              title: "Istantaneo",
              desc: "Paghi online e ricevi subito il biglietto via email. Acquisto in pochi secondi.",
              accent: "#FF425E",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group flex flex-col p-6 border-2 border-brand-dark bg-white hover:-translate-y-1 hover:shadow-[6px_6px_0_#1B1B1B] transition-all"
              >
                <div className="h-1 w-10 mb-5" style={{ backgroundColor: item.accent }} />
                <div
                  className="w-12 h-12 border-2 border-brand-dark flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ backgroundColor: `${item.accent}18` }}
                >
                  <Icon className="text-brand-dark" size={22} />
                </div>
                <h3 className="font-extrabold text-brand-dark text-lg mb-2">{item.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="relative overflow-hidden bg-brand-blue py-20">
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 text-white/60 text-xs font-bold uppercase tracking-widest mb-6">
            <Star size={12} /> Newsletter
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-3 leading-tight">
            Non perderti<br />nessun evento
          </h2>
          <p className="text-white/65 mb-8 text-base leading-relaxed">
            Iscriviti e ricevi ogni settimana i migliori eventi in Puglia, sconti esclusivi e anteprime.
          </p>
          <NewsletterForm />
          <p className="text-white/30 text-xs mt-5">Niente spam. Puoi disiscriverti in qualsiasi momento.</p>
        </div>
      </section>

      {/* ===== BECOME POS CTA ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 border-2 border-brand-dark shadow-[8px_8px_0_#1B1B1B] overflow-hidden">
          {/* Left: dark */}
          <div className="bg-brand-dark p-10 md:p-14">
            <span className="text-brand-lime text-xs font-bold uppercase tracking-widest block mb-5">
              Partner ufficiale TicketOne
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">
              Sei un esercente?
            </h2>
            <p className="text-white/65 leading-relaxed mb-8">
              Entra nel circuito Box Office Puglia come punto vendita autorizzato.
              Porta più clienti nella tua attività e guadagna commissioni su ogni biglietto venduto.
            </p>
            <Link
              href="/diventa-punto-vendita"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-bold hover:bg-brand-blue-dark transition-colors"
            >
              Diventa Punto Vendita <ArrowRight size={16} />
            </Link>
          </div>
          {/* Right: lime */}
          <div className="bg-brand-lime border-l-2 border-brand-dark p-10 md:p-14 flex flex-col justify-center">
            <p className="text-brand-dark/50 text-xs font-bold uppercase tracking-widest mb-2">La nostra rete</p>
            <p className="text-8xl font-mars text-brand-dark leading-none mb-3">50+</p>
            <p className="text-brand-dark font-bold text-lg leading-snug mb-6">
              punti vendita fisici<br />in tutta la Puglia
            </p>
            <div className="flex flex-wrap gap-2">
              {["Bari", "BAT", "Brindisi", "Foggia", "Lecce", "Taranto"].map((p) => (
                <span
                  key={p}
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 border-2 border-brand-dark text-brand-dark"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
