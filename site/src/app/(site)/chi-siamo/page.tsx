import type { Metadata } from "next";
import Image from "next/image";
import { Users, MapPin, Ticket, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Chi Siamo",
  description:
    "Box Office Puglia è il punto di riferimento per la biglietteria degli eventi in Puglia. Scopri la nostra storia, la nostra missione e il nostro territorio.",
};

const values = [
  {
    icon: MapPin,
    title: "Radici Pugliesi",
    description:
      "Nati e cresciuti in Puglia, conosciamo ogni angolo della nostra terra. Dal Gargano al Salento, siamo presenti dove nascono le emozioni.",
  },
  {
    icon: Ticket,
    title: "Accesso Semplice",
    description:
      "Crediamo che partecipare alla cultura non debba essere complicato. Biglietti chiari, prezzi trasparenti, acquisto in pochi click.",
  },
  {
    icon: Users,
    title: "Rete Diffusa",
    description:
      "Oltre 50 punti vendita fisici in tutta la regione, perché sappiamo che non tutti preferiscono il digitale.",
  },
  {
    icon: Heart,
    title: "Passione Autentica",
    description:
      "Ogni evento che promuoviamo lo facciamo perché ci crediamo. Non siamo solo venditori di biglietti: siamo appassionati di Puglia.",
  },
];

const team = [
  {
    name: "Direzione",
    role: "Coordinamento generale e sviluppo rete",
  },
  {
    name: "Operazioni",
    role: "Gestione punti vendita e logistica",
  },
  {
    name: "Marketing & Digital",
    role: "Comunicazione, social e piattaforma web",
  },
  {
    name: "Customer Care",
    role: "Supporto clienti e gestione reclami",
  },
];

export default function ChiSiamoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-brand-dark border-b-2 border-brand-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="bg-white text-brand-dark font-bold uppercase tracking-widest text-sm mb-6 inline-block px-4 py-1 border-2 border-brand-dark">
            La nostra storia
          </p>
          <h1 className="text-5xl md:text-7xl font-mars uppercase mb-6 leading-none">
            From Puglia, <br />
            <span className="text-brand-lime">For Puglia</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-white max-w-2xl mx-auto leading-relaxed">
            Box Office Puglia nasce dalla convinzione che la cultura, la musica
            e gli eventi siano il cuore pulsante di una regione straordinaria.
            Siamo qui per connettere le persone con le emozioni.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 flex px-4 bg-white">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold uppercase text-brand-dark mb-6 border-b-2 border-gray-100 pb-4">
                La nostra missione
              </h2>
              <p className="text-brand-dark font-medium leading-relaxed mb-4">
                Siamo il sistema di biglietteria di riferimento per la Puglia:
                una piattaforma digitale moderna abbinata a una rete capillare
                di punti vendita fisici in tutte e sei le province della
                regione.
              </p>
              <p className="text-brand-dark font-medium leading-relaxed mb-4">
                Collaboriamo con organizzatori di concerti, festival, spettacoli
                teatrali, eventi sportivi e culturali per offrire al pubblico
                pugliese e ai turisti un accesso semplice, sicuro e affidabile
                agli eventi del territorio.
              </p>
              <p className="text-brand-dark font-medium leading-relaxed border-l-4 border-brand-blue pl-4">
                Grazie all'integrazione con TicketOne — il principale sistema
                nazionale di biglietteria — garantiamo visibilità agli eventi
                pugliesi su scala nazionale, portando più pubblico e più
                emozioni in Puglia.
              </p>
            </div>
            <div className="bg-white border-2 border-brand-dark p-8 md:p-10 shadow-[4px_4px_0_#1B1B1B]">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-mars text-brand-blue mb-2">6</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-dark">Province coperte</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-mars text-brand-blue mb-2">50+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-dark">Punti vendita</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-mars text-brand-blue mb-2">100+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-dark">Eventi all'anno</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-mars text-brand-blue mb-2">24/7</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-dark">Acquisto online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gray-50 border-t-2 border-b-2 border-brand-dark">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold uppercase text-brand-dark text-center mb-4">
            I nostri valori
          </h2>
          <p className="text-brand-dark font-bold uppercase tracking-widest text-center mb-12 max-w-xl mx-auto border-b-2 border-brand-dark pb-4">
            Cosa ci muove ogni giorno nel nostro lavoro
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white border-2 border-brand-dark p-6 flex gap-5 transition-colors hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-transparent border-2 border-brand-dark flex items-center justify-center">
                    <Icon className="text-brand-dark" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-brand-dark mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm font-medium text-brand-dark leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold uppercase text-brand-dark mb-4">
            Il nostro team
          </h2>
          <p className="text-brand-dark font-bold uppercase tracking-widest mb-12 max-w-xl mx-auto border-b-2 border-gray-100 pb-4">
            Professionisti appassionati che rendono gli eventi accessibili a tutti
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white border-2 border-brand-dark p-5 text-center transition-colors hover:bg-brand-lime"
              >
                <div className="w-14 h-14 bg-brand-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={24} />
                </div>
                <h4 className="font-semibold text-brand-dark text-base mb-1">
                  {member.name}
                </h4>
                <p className="text-xs font-bold text-brand-gray tracking-wider uppercase">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-brand-blue border-t-2 border-brand-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold uppercase mb-6 leading-tight">
            Vuoi far parte della rete?
          </h2>
          <p className="text-white/90 mb-10 text-xl font-bold max-w-xl mx-auto">
            Diventa un punto vendita Box Office Puglia e porta gli eventi direttamente nel
            tuo negozio.
          </p>
          <a
            href="/diventa-punto-vendita"
            className="inline-block bg-white border-2 border-brand-dark text-brand-dark font-bold text-sm uppercase tracking-wide px-10 py-5 transition-colors hover:bg-brand-yellow"
          >
            Scopri come diventare POS
          </a>
        </div>
      </section>
    </main>
  );
}
