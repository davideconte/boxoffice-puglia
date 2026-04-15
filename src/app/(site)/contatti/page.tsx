import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta Box Office Puglia per informazioni su eventi, servizi di biglietteria o per diventare punto vendita. Siamo qui per aiutarti.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@boxofficepuglia.it",
    href: "mailto:info@boxofficepuglia.it",
  },
  {
    icon: Phone,
    label: "Telefono",
    value: "+39 080 000 0000",
    href: "tel:+390800000000",
  },
  {
    icon: MapPin,
    label: "Sede",
    value: "Puglia, Italia",
    href: null,
  },
  {
    icon: Clock,
    label: "Orari",
    value: "Lun–Ven 9:00–18:00",
    href: null,
  },
];

export default function ContattiPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-brand-dark border-b-2 border-brand-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="bg-brand-yellow text-brand-dark font-bold uppercase tracking-widest text-sm mb-6 inline-block px-4 py-1 border-2 border-brand-dark">
            Siamo qui per te
          </p>
          <h1 className="text-5xl md:text-7xl font-mars uppercase mb-4 leading-none">Contattaci</h1>
          <p className="text-white/90 font-bold max-w-xl mx-auto text-xl">
            Hai domande su un evento, vuoi collaborare con noi o cerchi
            informazioni su come diventare punto vendita? Scrivici.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold uppercase text-brand-dark mb-6 border-b-2 border-gray-100 pb-3">
                Informazioni
              </h2>
              <div className="space-y-5">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 border-2 border-brand-dark flex items-center justify-center">
                        <Icon className="text-brand-dark" size={20} />
                      </div>
                      <div className="mt-1">
                        <p className="text-xs font-bold text-brand-dark uppercase tracking-widest mb-1 leading-none">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-brand-blue font-bold hover:text-brand-dark transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-brand-dark font-bold">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border-2 border-brand-dark p-6 transition-colors hover:bg-gray-50">
              <h3 className="font-semibold text-lg text-brand-dark mb-2">
                Vuoi diventare POS?
              </h3>
              <p className="text-sm font-medium text-brand-dark mb-4 leading-relaxed">
                Se hai un'attività commerciale e vuoi iniziare a vendere
                biglietti, usa il modulo dedicato.
              </p>
              <a
                href="/diventa-punto-vendita"
                className="text-sm font-bold uppercase tracking-widest text-brand-blue border-b-2 border-brand-blue hover:text-brand-dark hover:border-brand-dark transition-colors inline-block pb-1"
              >
                Candidati come punto vendita
              </a>
            </div>

            <div className="bg-white border-2 border-brand-dark p-6 transition-colors hover:bg-gray-50">
              <h3 className="font-semibold text-lg text-brand-dark mb-2">
                Hai un evento in Puglia?
              </h3>
              <p className="text-sm font-medium text-brand-dark mb-4 leading-relaxed">
                Scopri i nostri servizi per organizzatori e come portare il tuo
                evento sul nostro portale.
              </p>
              <a
                href="/servizi"
                className="text-sm font-bold uppercase tracking-widest text-brand-blue border-b-2 border-brand-blue hover:text-brand-dark hover:border-brand-dark transition-colors inline-block pb-1"
              >
                Scopri i servizi
              </a>
            </div>
          </div>

          {/* Form (client component) */}
          <div className="md:col-span-3">
            <h2 className="text-3xl font-extrabold uppercase text-brand-dark mb-6 border-b-2 border-gray-100 pb-3">
              Inviaci un messaggio
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
