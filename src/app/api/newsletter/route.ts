import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = rateLimitMap.get(ip);
  if (last && now - last < 10_000) return true;
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
    return NextResponse.json({ message: "Email non valida" }, { status: 400 });
  }

  const { email } = parsed.data;

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY ?? "",
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(process.env.BREVO_LIST_ID ?? "3")],
        updateEnabled: true,
      }),
    });

    if (!res.ok && res.status !== 204) {
      const data = await res.json();
      // Duplicate contact is fine
      if (data.code !== "duplicate_parameter") {
        throw new Error(data.message);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter error:", err);
    return NextResponse.json({ message: "Errore durante l'iscrizione" }, { status: 500 });
  }
}
