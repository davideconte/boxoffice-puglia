"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";
import { PROVINCES } from "@/lib/utils";

const schema = z.object({
  businessName: z.string().min(2, "Inserisci il nome dell'attività"),
  ownerName: z.string().min(2, "Inserisci il nome del titolare"),
  email: z.string().email("Email non valida"),
  phone: z.string().min(6, "Telefono non valido"),
  address: z.string().min(5, "Inserisci l'indirizzo completo"),
  city: z.string().min(2, "Inserisci la città"),
  province: z.string().min(2, "Seleziona la provincia"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const inputClass = "w-full px-4 py-3 rounded-brand border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm transition-colors";
const labelClass = "block text-sm font-medium text-brand-dark mb-1";
const errorClass = "text-red-500 text-xs mt-1";

export function PosApplicationForm() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/pos-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      reset();
    } catch {
      setServerError("Errore durante l'invio. Riprova più tardi o contattaci via email.");
    }
  };

  if (success) {
    return (
      <div className="flex items-start gap-4 bg-green-50 text-green-800 p-6 rounded-brand border border-green-200">
        <CheckCircle size={24} className="flex-shrink-0 mt-0.5 text-green-600" />
        <div>
          <p className="font-bold text-lg mb-1">Candidatura inviata!</p>
          <p className="text-sm">Ti contatteremo entro 48 ore per procedere con l'attivazione.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Nome attività *</label>
          <input {...register("businessName")} className={inputClass} placeholder="Es. Tabaccheria Rossi" />
          {errors.businessName && <p className={errorClass}>{errors.businessName.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Nome titolare *</label>
          <input {...register("ownerName")} className={inputClass} placeholder="Nome e cognome" />
          {errors.ownerName && <p className={errorClass}>{errors.ownerName.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input {...register("email")} type="email" className={inputClass} placeholder="info@attivita.it" />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Telefono *</label>
          <input {...register("phone")} type="tel" className={inputClass} placeholder="+39 080 000 0000" />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Indirizzo completo *</label>
          <input {...register("address")} className={inputClass} placeholder="Via Roma 1" />
          {errors.address && <p className={errorClass}>{errors.address.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Città *</label>
          <input {...register("city")} className={inputClass} placeholder="Bari" />
          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Provincia *</label>
          <select {...register("province")} className={inputClass}>
            <option value="">Seleziona provincia</option>
            {PROVINCES.map((p) => (
              <option key={p.value} value={p.value}>{p.label} ({p.value})</option>
            ))}
          </select>
          {errors.province && <p className={errorClass}>{errors.province.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Messaggio (opzionale)</label>
          <textarea
            {...register("message")}
            rows={4}
            className={inputClass}
            placeholder="Descrivici brevemente la tua attività..."
          />
        </div>
      </div>

      {serverError && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-brand text-sm">{serverError}</div>
      )}

      <Button type="submit" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
        Invia candidatura
      </Button>
    </form>
  );
}
