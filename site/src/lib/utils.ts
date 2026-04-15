import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, opts?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    ...opts,
  }).format(date);
}

export function formatDateShort(dateString: string): string {
  return formatDate(dateString, { weekday: "short", day: "numeric", month: "short" });
}

export function formatTime(dateString: string): string {
  return new Intl.DateTimeFormat("it-IT", { hour: "2-digit", minute: "2-digit" }).format(new Date(dateString));
}

export const PROVINCES = [
  { value: "BA", label: "Bari" },
  { value: "BT", label: "Barletta-Andria-Trani" },
  { value: "BR", label: "Brindisi" },
  { value: "FG", label: "Foggia" },
  { value: "LE", label: "Lecce" },
  { value: "TA", label: "Taranto" },
] as const;

export type Province = typeof PROVINCES[number]["value"];

export const TICKETONE_AFFILIATE = process.env.NEXT_PUBLIC_TICKETONE_AFFILIATE ?? "BOXPUGLIA";

export function buildTicketOneUrl(baseUrl: string): string {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("affiliate", TICKETONE_AFFILIATE);
    return url.toString();
  } catch {
    return baseUrl;
  }
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}
