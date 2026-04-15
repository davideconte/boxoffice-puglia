import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { client } from "@/lib/sanity/client";

const schema = z.object({
  businessName: z.string().min(2),
  ownerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  address: z.string().min(5),
  city: z.string().min(2),
  province: z.string().min(2),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Dati non validi", errors: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  try {
    // Save to Sanity as posApplication document
    await client.create({
      _type: "posApplication",
      ...data,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    // Send notification email via Resend (if configured)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL,
          to: [process.env.RESEND_TO_EMAIL],
          subject: `Nuova candidatura PdV — ${data.businessName} (${data.city})`,
          html: `
            <h2>Nuova candidatura punto vendita</h2>
            <p><strong>Attività:</strong> ${data.businessName}</p>
            <p><strong>Titolare:</strong> ${data.ownerName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Telefono:</strong> ${data.phone}</p>
            <p><strong>Indirizzo:</strong> ${data.address}, ${data.city} (${data.province})</p>
            ${data.message ? `<p><strong>Messaggio:</strong> ${data.message}</p>` : ""}
          `,
        }),
      }).catch(console.error);

      // Confirmation to applicant
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL,
          to: [data.email],
          subject: "Candidatura ricevuta — Box Office Puglia",
          html: `
            <h2>Grazie, ${data.ownerName}!</h2>
            <p>Abbiamo ricevuto la tua candidatura per diventare punto vendita Box Office Puglia.</p>
            <p>Ti contatteremo entro <strong>48 ore lavorative</strong> all'email ${data.email} o al numero ${data.phone}.</p>
            <br/>
            <p>Il team di Box Office Puglia</p>
          `,
        }),
      }).catch(console.error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POS application error:", err);
    return NextResponse.json({ message: "Errore durante l'invio" }, { status: 500 });
  }
}
