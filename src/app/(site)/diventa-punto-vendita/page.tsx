import { PosApplicationForm } from "@/components/forms/PosApplicationForm";
import { CheckCircle, TrendingUp, Users, Package, Headphones } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diventa Punto Vendita",
  description: "Entra nel circuito Box Office Puglia come punto vendita autorizzato TicketOne. Aumenta il traffico nella tua attività e guadagna commissioni.",
};

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Aumenta il fatturato",
    desc: "Guadagna una commissione su ogni biglietto venduto tramite il tuo terminale TicketOne.",
  },
  {
    icon: Users,
    title: "Più clienti in negozio",
    desc: "Gli amanti degli eventi cercheranno il tuo negozio per acquistare i biglietti delle loro manifestazioni preferite.",
  },
  {
    icon: Package,
    title: "Materiale gratuito",
    desc: "Ricevi materiale promozionale Box Office Puglia: totem, locandine, roll-up e materiale POS brandizzato.",
  },
  {
    icon: Headphones,
    title: "Supporto dedicato",
    desc: "Un team dedicato ti supporta nell'attivazione e nella gestione quotidiana del terminale.",
  },
];

const REQUIREMENTS = [
  "Attività commerciale in centro urbano con almeno 15.000 abitanti",
  "Buona visibilità stradale (vetrina su strada principale)",
  "Personale disponibile alla vendita e supporto clienti",
  "Connessione internet stabile",
  "Disponibilità di spazio per il terminale e materiale espositivo",
];

export default function DiventaPuntoVenditaPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-brand-blue border-b-2 border-brand-dark text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-mars uppercase mb-6 leading-none">Diventa Punto Vendita</h1>
          <p className="text-white/90 text-xl md:text-2xl font-bold max-w-2xl leading-relaxed">
            Entra nel circuito Box Office Puglia e vendi biglietti per i migliori eventi pugliesi
            direttamente dalla tua attività.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Benefits */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold uppercase text-brand-dark mb-8 border-b-2 border-gray-100 pb-4">Perché aderire al circuito</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white border-2 border-brand-dark p-6 transition-colors hover:bg-gray-50">
                <div className="w-12 h-12 border-2 border-brand-dark bg-brand-cyan flex items-center justify-center mb-5">
                  <b.icon size={24} className="text-brand-dark" />
                </div>
                <h3 className="font-semibold text-lg text-brand-dark mb-2">{b.title}</h3>
                <p className="text-sm font-medium text-brand-gray leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-20">
          <div className="bg-brand-lime border-2 border-brand-dark p-8 md:p-12">
            <h2 className="text-3xl font-extrabold uppercase text-brand-dark mb-8 border-b-2 border-brand-dark pb-4">Requisiti</h2>
            <ul className="space-y-4">
              {REQUIREMENTS.map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-brand-dark flex-shrink-0 mt-0.5" />
                  <span className="text-brand-dark font-bold text-lg">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Form */}
        <section>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-brand-dark uppercase mb-3">Invia la tua candidatura</h2>
            <p className="text-brand-gray font-bold uppercase tracking-widest mb-10 border-b-2 border-gray-100 pb-4">
              Compila il modulo e ti contatteremo entro 48 ore lavorative per procedere con l'attivazione.
            </p>
            <PosApplicationForm />
          </div>
        </section>
      </div>
    </div>
  );
}
