"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  email: z.string().email("Email non valida"),
  subject: z.string().min(3, "Inserisci un oggetto"),
  message: z.string().min(20, "Il messaggio deve avere almeno 20 caratteri"),
  honeypot: z.string().max(0),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { honeypot: "" },
  });

  async function onSubmit(data: ContactFormData) {
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Errore nell'invio");
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore imprevisto");
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-brand p-6 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Send className="text-green-600" size={20} />
        </div>
        <h3 className="font-bold text-green-800 mb-1">Messaggio inviato!</h3>
        <p className="text-green-700 text-sm">
          Ti risponderemo entro 24 ore lavorative.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-medium text-green-700 hover:underline"
        >
          Invia un altro messaggio
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        {...register("honeypot")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">
            Nome e cognome <span className="text-brand-red">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
            placeholder="Mario Rossi"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">
            Email <span className="text-brand-red">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
            placeholder="mario@esempio.it"
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">
          Oggetto <span className="text-brand-red">*</span>
        </label>
        <input
          {...register("subject")}
          type="text"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
          placeholder="Come possiamo aiutarti?"
        />
        {errors.subject && (
          <p className="text-xs text-red-600 mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">
          Messaggio <span className="text-brand-red">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue resize-none"
          placeholder="Scrivi il tuo messaggio..."
        />
        {errors.message && (
          <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-blue text-white font-semibold py-3 rounded-full hover:bg-brand-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Invio in corso...
          </>
        ) : (
          <>
            <Send size={16} />
            Invia messaggio
          </>
        )}
      </button>

      <p className="text-xs text-brand-gray text-center">
        I tuoi dati verranno utilizzati solo per rispondere alla tua richiesta,
        in conformità con la nostra{" "}
        <a href="#" className="underline hover:text-brand-blue">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
