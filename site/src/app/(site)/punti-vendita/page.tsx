import { getPointsOfSale } from "@/lib/sanity/queries";
import { PROVINCES } from "@/lib/utils";
import { MapPin, Phone, Clock, Store } from "lucide-react";
import type { Metadata } from "next";
import type { PointOfSale } from "@/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Punti Vendita in Puglia",
  description: "Trova il punto vendita Box Office Puglia più vicino a te. Acquista i tuoi biglietti direttamente in negozio in tutte le province pugliesi.",
};

export default async function PuntiVenditaPage() {
  const pos: PointOfSale[] = await getPointsOfSale().catch(() => []);

  const byProvince = PROVINCES.reduce((acc, prov) => {
    acc[prov.value] = pos.filter((p) => p.province === prov.value);
    return acc;
  }, {} as Record<string, PointOfSale[]>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Header */}
      <div className="mb-10 pb-6 border-b-2 border-brand-dark">
        <h1 className="text-5xl md:text-7xl font-mars text-brand-dark uppercase tracking-wide leading-none">Punti Vendita</h1>
        <p className="text-brand-gray font-bold text-lg mt-4 uppercase tracking-widest">
          {pos.length}+ PUNTI VENDITA AUTORIZZATI IN PUGLIA
        </p>
      </div>

      {/* Google Maps placeholder */}
      <div className="border-2 border-dashed border-brand-dark bg-gray-50 mb-12 h-72 flex items-center justify-center">
        <div className="text-center text-brand-dark">
          <MapPin className="mx-auto mb-3 text-brand-dark" size={48} />
          <p className="font-bold uppercase tracking-widest text-2xl text-brand-dark">Mappa interattiva punti vendita</p>
          <p className="text-sm font-bold text-brand-gray tracking-widest uppercase mt-2">Configura NEXT_PUBLIC_GOOGLE_MAPS_KEY nel .env</p>
        </div>
      </div>

      {/* List by province */}
      {pos.length > 0 ? (
        <div className="space-y-12">
          {PROVINCES.map((prov) => {
            const provincePOS = byProvince[prov.value];
            if (!provincePOS?.length) return null;
            return (
              <div key={prov.value}>
                <h2 className="text-2xl font-extrabold text-brand-dark uppercase mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 border-2 border-brand-dark bg-brand-blue text-white text-lg flex items-center justify-center">
                    {prov.value}
                  </span>
                  {prov.label}
                  <span className="text-brand-gray text-base tracking-widest">
                    ({provincePOS.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {provincePOS.map((point) => (
                    <PosCard key={point._id} pos={point} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 border-2 border-brand-dark border-dashed bg-gray-50">
          <Store className="mx-auto text-brand-gray mb-4" size={48} />
          <h3 className="font-extrabold text-2xl text-brand-dark uppercase mb-2">Punti vendita in arrivo</h3>
          <p className="text-brand-gray font-bold uppercase tracking-widest">
            Stiamo ultimando la rete dei punti vendita nel territorio.
          </p>
        </div>
      )}
    </div>
  );
}

function PosCard({ pos }: { pos: PointOfSale }) {
  return (
    <div className="bg-white border-2 border-brand-dark p-6 transition-colors hover:bg-gray-50">
      <h3 className="font-semibold text-base uppercase text-brand-dark mb-3 border-b-2 border-gray-100 pb-2">{pos.name}</h3>

      <div className="space-y-2 text-sm text-brand-dark font-medium">
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-brand-blue flex-shrink-0 mt-0.5" />
          <span>{pos.address}, {pos.city} ({pos.province})</span>
        </div>
        {pos.phone && (
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-brand-blue flex-shrink-0" />
            <a href={`tel:${pos.phone}`} className="hover:text-brand-blue transition-colors">
              {pos.phone}
            </a>
          </div>
        )}
        {pos.openingHours && (
          <div className="flex items-start gap-2">
            <Clock size={16} className="text-brand-blue flex-shrink-0 mt-0.5" />
            <span className="whitespace-pre-line">{pos.openingHours}</span>
          </div>
        )}
      </div>

      {pos.services && pos.services.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t-2 border-gray-100">
          {pos.services.map((s) => (
            <span key={s} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-brand-light-gray text-brand-dark border border-gray-300">
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
