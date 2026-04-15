import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

const rateLimitMap = new Map<string, number>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = rateLimitMap.get(ip);
  if (last && now - last < 30_000) return true;
  rateLimitMap.set(ip, now);
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "Troppi tentativi. Riprova tra qualche secondo." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Dati non validi" }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ success: true }); // Silently pass if not configured
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [process.env.RESEND_TO_EMAIL],
        replyTo: email,
        subject: `Contatto: ${subject}`,
        html: `
          <p><strong>Da:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Oggetto:</strong> ${subject}</p>
          <p><strong>Messaggio:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ message: "Errore durante l'invio" }, { status: 500 });
  }
}
