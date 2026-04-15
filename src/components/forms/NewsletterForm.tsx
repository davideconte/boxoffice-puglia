"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle } from "lucide-react";

const schema = z.object({
  email: z.string().email("Inserisci un'email valida"),
  honeypot: z.string().max(0, "Bot detected"),
});

type FormData = z.infer<typeof schema>;

export function NewsletterForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      if (!res.ok) throw new Error("Errore durante l'iscrizione");
      setSuccess(true);
      reset();
    } catch {
      setError("Si è verificato un errore. Riprova più tardi.");
    }
  };

  if (success) {
    return (
      <div className="flex items-center gap-3 text-green-700 bg-green-50 px-5 py-4 rounded-brand">
        <CheckCircle size={20} className="flex-shrink-0" />
        <p className="font-medium">Iscrizione avvenuta! Benvenuto nella community.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 mt-4">
      {/* Honeypot */}
      <input {...register("honeypot")} type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="flex-1">
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark z-10" size={24} />
          <input
            {...register("email")}
            type="email"
            placeholder="LA TUA EMAIL"
            className="w-full pl-14 pr-4 py-4 border-4 border-brand-dark bg-white text-brand-dark font-sans text-base shadow-[6px_6px_0_#5CFFEB] focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-[2px_2px_0_#5CFFEB] transition-all placeholder:text-brand-dark/40"
          />
        </div>
        {errors.email && <p className="text-brand-cyan font-bold text-sm mt-2">{errors.email.message}</p>}
      </div>

      <Button type="submit" loading={isSubmitting} variant="primary" className="flex-shrink-0 bg-brand-lime text-brand-dark shadow-[6px_6px_0_#013DFF]">
        ISCRIVITI
      </Button>

      {error && <p className="text-brand-red font-bold text-sm mt-2 sm:col-span-2">{error}</p>}
    </form>
  );
}
