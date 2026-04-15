import type { Metadata } from "next";
import { Ticket, Store, BarChart3, Globe, Headphones, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Servizi",
  description:
    "Box Office Puglia offre servizi completi per organizzatori di eventi: biglietteria online, rete di punti vendita, gestione accessi e reportistica in tempo reale.",
};

const services = [
  {
    icon: Ticket,
    number: "01",
    title: "Biglietteria Online",
    description:
      "Integrazione completa con TicketOne per la vendita di biglietti online. Il tuo evento raggiunge milioni di potenziali acquirenti su scala nazionale attraverso la rete TicketOne, con visibilità sui principali canali digitali.",
    features: [
      "Pagine evento brandizzate",
      "Prezzi dinamici e scontistiche",
      "Biglietti digitali con QR code",
      "Integrazione con TicketOne nazionale",
    ],
    accent: "#013DFF",
  },
  {
    icon: Store,
    number: "02",
    title: "Rete Punti Vendita",
    description:
      "Accesso alla nostra rete di oltre 50 punti vendita fisici distribuiti in tutte le province pugliesi. I clienti possono acquistare i biglietti del tuo evento anche senza connessione internet.",
    features: [
      "50+ POS in Bari, BAT, Brindisi, Foggia, Lecce, Taranto",
      "Terminali dedicati con software aggiornato",
      "Emissione biglietti con codice a barre",
      "Supporto operativo ai rivenditori",
    ],
    accent: "#D2FF5A",
    featured: true,
  },
  {
    icon: Globe,
    number: "03",
    title: "Promozione Digitale",
    description:
      "Non vendiamo solo biglietti: promuoviamo il tuo evento. Il tuo spettacolo viene pubblicato sul nostro sito, condiviso sui canali social e incluso nella newsletter con migliaia di iscritti.",
    features: [
      "Pubblicazione su boxofficepuglia.it",
      "Post sui social media (Instagram, Facebook, TikTok)",
      "Inclusione nella newsletter settimanale",
      "Scheda evento completa con foto e descrizione",
    ],
    accent: "#FF425E",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Reportistica e Analytics",
    description:
      "Dashboard in tempo reale con tutti i dati delle tue vendite. Monitora le performance del tuo evento, analizza i canali di vendita e ottimizza la strategia di marketing.",
    features: [
      "Dashboard vendite in tempo reale",
      "Breakdown per canale (online vs fisico)",
      "Report demografici acquirenti",
      "Export dati CSV/Excel",
    ],
    accent: "#5CFFEB",
  },
  {
    icon: Headphones,
    number: "05",
    title: "Customer Care",
    description:
      "Il nostro team di supporto risponde alle domande dei tuoi acquirenti, gestisce i reclami e assiste nelle procedure di rimborso. Tu ti concentri sull'evento, noi pensiamo al resto.",
    features: [
      "Supporto via email e telefono",
      "Gestione rimborsi e cambi data",
      "FAQ dedicata al tuo evento",
      "Risposta entro 24 ore lavorative",
    ],
    accent: "#013DFF",
  },
  {
    icon: ShieldCheck,
    number: "06",
    title: "Gestione Accessi",
    description:
      "Sistema di validazione biglietti affidabile e veloce. App mobile per il controllo accessi in porta, anti-duplicazione e reportistica ingressi in tempo reale.",
    features: [
      "App iOS e Android per scanner QR",
      "Anti-duplicazione biglietti",
      "Contatore ingressi in tempo reale",
      "Report presenze post-evento",
    ],
    accent: "#FF425E",
  },
];

const steps = [
  { step: "01", title: "Contattaci", desc: "Raccontaci il tuo evento e le tue esigenze" },
  { step: "02", title: "Accordo", desc: "Definiamo insieme le condizioni e i canali" },
  { step: "03", title: "Setup", desc: "Creiamo la pagina evento e attiviamo la vendita" },
  { step: "04", title: "Vai Live", desc: "I biglietti sono in vendita online e nei POS" },
];

export default function ServiziPage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-dark text-white py-24 px-4">
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Diagonal accent */}
        <div
          className="absolute -right-24 top-0 bottom-0 w-[40%] opacity-[0.06]"
          style={{
            background: "#fff",
            clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <span className="inline-block px-4 py-1 border-2 border-brand-lime text-brand-lime font-bold uppercase tracking-widest text-xs mb-6">
                Per gli organizzatori
              </span>
              <h1 className="text-5xl md:text-7xl font-mars uppercase mb-6 leading-none">
                Tutto quello
                <br />
                che ti serve
                <br />
                <span className="text-brand-lime">per il tuo evento</span>
              </h1>
              <p className="text-white/80 text-lg font-medium leading-relaxed mb-8 max-w-md">
                Da piccoli spettacoli teatrali a grandi concerti estivi: soluzioni su
                misura per qualsiasi tipo di evento, in tutta la Puglia.
              </p>
              <a
                href="/contatti"
                className="inline-flex items-center gap-2 bg-brand-blue border-2 border-transparent text-white font-bold text-base uppercase tracking-wide px-8 py-4 shadow-[4px_4px_0_#D2FF5A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                Richiedi un preventivo <ArrowRight size={18} />
              </a>
            </div>

            {/* Right: quick stats */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: "50+", label: "Punti vendita fisici", color: "#D2FF5A", text: "#1B1B1B" },
                { value: "6", label: "Province pugliesi coperte", color: "#013DFF", text: "#fff" },
                { value: "100+", label: "Eventi gestiti all'anno", color: "#FF425E", text: "#fff" },
                { value: "24/7", label: "Vendita online sempre attiva", color: "#1B1B1B", text: "#fff" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="border-2 border-brand-dark p-6"
                  style={{ backgroundColor: s.color }}
                >
                  <p className="text-4xl font-mars mb-1" style={{ color: s.text }}>{s.value}</p>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: s.text, opacity: 0.7 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured service banner ── */}
      <section className="bg-brand-lime border-y-2 border-brand-dark px-4 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-shrink-0 w-16 h-16 bg-brand-dark flex items-center justify-center border-2 border-brand-dark">
            <Store className="text-brand-lime" size={32} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-1">Servizio di punta</p>
            <h2 className="text-2xl font-extrabold uppercase text-brand-dark leading-none mb-2">Rete di 50+ Punti Vendita Fisici</h2>
            <p className="text-brand-dark font-medium text-sm max-w-2xl">
              Bari · BAT · Brindisi · Foggia · Lecce · Taranto — Copriamo l'intera Puglia con terminali
              dedicati e supporto operativo costante ai rivenditori.
            </p>
          </div>
          <a
            href="/punti-vendita"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-dark text-white font-bold uppercase text-sm tracking-wide px-6 py-3 border-2 border-brand-dark hover:bg-brand-blue transition-colors"
          >
            Vedi i POS <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="py-20 px-4 bg-gray-50 border-b-2 border-brand-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold uppercase text-brand-dark mb-3">I nostri servizi</h2>
            <p className="text-brand-dark font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
              Una soluzione completa per ogni fase del tuo evento
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter((s) => !s.featured).map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group bg-white border-2 border-brand-dark p-8 hover:-translate-y-1 hover:shadow-[6px_6px_0_#1B1B1B] transition-all"
                >
                  {/* Colored top accent */}
                  <div className="h-1 w-12 mb-6" style={{ backgroundColor: service.accent }} />
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-14 h-14 border-2 border-brand-dark flex items-center justify-center"
                      style={{ backgroundColor: `${service.accent}18` }}
                    >
                      <Icon className="text-brand-dark" size={26} />
                    </div>
                    <span className="font-mars text-brand-dark/20 text-4xl leading-none">{service.number}</span>
                  </div>
                  <h3 className="text-xl font-extrabold uppercase text-brand-dark mb-3">{service.title}</h3>
                  <p className="text-sm font-medium text-brand-dark/80 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 border-t-2 border-brand-dark/10 pt-5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-xs font-bold uppercase tracking-widest text-brand-dark"
                      >
                        <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: service.accent === "#D2FF5A" ? "#1B1B1B" : service.accent }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 px-4 bg-white border-b-2 border-brand-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold uppercase text-brand-dark mb-3">Come funziona</h2>
            <p className="text-brand-dark font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
              Mettere il tuo evento su Box Office Puglia è semplice e veloce
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-0 relative">
            {steps.map((item, i) => (
              <div key={item.step} className="relative">
                {/* Connector line (hidden on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] right-0 h-0.5 bg-brand-dark z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center text-center px-4">
                  <div className="w-14 h-14 bg-brand-dark text-brand-yellow flex items-center justify-center font-mars text-2xl mb-5 border-2 border-brand-dark relative">
                    {item.step}
                  </div>
                  <div className="bg-gray-50 border-2 border-brand-dark p-5 w-full hover:bg-brand-yellow transition-colors group">
                    <h4 className="font-bold uppercase text-brand-dark text-base tracking-wide mb-2">{item.title}</h4>
                    <p className="text-xs font-bold text-brand-dark/70 uppercase tracking-widest leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="py-10 px-4 bg-brand-dark border-b-2 border-brand-dark">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-white/60 font-bold uppercase tracking-widest text-xs">Partner ufficiale</p>
          <p className="text-white font-extrabold text-xl uppercase">TicketOne</p>
          <div className="hidden md:block w-px h-8 bg-white/20" />
          <p className="text-white/60 font-bold uppercase tracking-widest text-xs">Disponibile in tutta la</p>
          <p className="text-white font-extrabold text-xl uppercase">Puglia</p>
          <div className="hidden md:block w-px h-8 bg-white/20" />
          <p className="text-white/60 font-bold uppercase tracking-widest text-xs">Dal</p>
          <p className="text-white font-extrabold text-xl uppercase">2006</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 bg-brand-yellow border-b-2 border-brand-dark">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-dark font-bold uppercase tracking-widest text-xs mb-4">Inizia ora</p>
          <h2 className="text-5xl md:text-6xl font-extrabold uppercase text-brand-dark mb-6 leading-tight">
            Hai un evento
            <br />
            da promuovere?
          </h2>
          <p className="text-brand-dark font-bold text-lg mb-10 max-w-lg mx-auto">
            Contattaci oggi e scopri come possiamo aiutarti a raggiungere il
            tuo pubblico in tutta la Puglia.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contatti"
              className="inline-flex items-center gap-2 bg-brand-dark text-white border-2 border-brand-dark font-bold text-base uppercase tracking-wide px-10 py-5 shadow-[6px_6px_0_#1B1B1B] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
            >
              Parlaci del tuo evento <ArrowRight size={20} />
            </a>
            <a
              href="/punti-vendita"
              className="inline-flex items-center gap-2 bg-transparent text-brand-dark border-2 border-brand-dark font-bold text-base uppercase tracking-wide px-10 py-5 hover:bg-brand-dark hover:text-white transition-colors"
            >
              Vedi i punti vendita
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
