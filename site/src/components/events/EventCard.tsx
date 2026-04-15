import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn, formatDateShort, formatTime } from "@/lib/utils";
import type { Event } from "@/types";

interface EventCardProps {
  event: Event;
  className?: string;
  priority?: boolean;
}

// Generates a visually distinct gradient poster when no image is available
function EventPlaceholder({ event }: { event: Event }) {
  const color = event.category?.color ?? "#013DFF";
  const city = event.venue?.city ?? "Puglia";
  const catLabel = event.category?.title ?? "";

  // Derive a slightly darker shade for the gradient
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden select-none border-b-4 border-brand-dark"
      style={{
        backgroundColor: color,
      }}
    >
      {/* Large faded city text as decorative background */}
      <span
        className="absolute bottom-2 right-3 text-6xl font-black leading-none tracking-tighter opacity-[0.12] pointer-events-none"
        style={{ color }}
        aria-hidden
      >
        {city.toUpperCase()}
      </span>

      {/* Category pill */}
      {catLabel && (
        <span
          className="text-xs font-bold px-3 py-1 rounded-full mb-3 border"
          style={{
            background: color + "30",
            borderColor: color + "50",
            color,
          }}
        >
          {catLabel}
        </span>
      )}

      {/* Event title preview */}
      <p
        className="text-sm font-bold px-4 text-center leading-tight max-w-[140px] line-clamp-3"
        style={{ color }}
      >
        {event.title}
      </p>
    </div>
  );
}

export function EventCard({ event, className, priority = false }: EventCardProps) {
  const { title, slug, date, price, isSoldOut, isFeatured, category, venue, image } = event;

  return (
    <Link
      href={`/eventi/${slug.current}`}
      className={cn(
        "group flex flex-col h-full bg-white border-4 border-brand-dark shadow-[6px_6px_0_#1B1B1B] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1B1B1B] transition-all duration-200",
        className
      )}
    >
      {/* Image / placeholder */}
      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100 flex-shrink-0">
        {image?.asset ? (
          <img
            src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${image.asset._ref.replace("image-", "").replace(/-(\w+)$/, ".$1")}`}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
            <EventPlaceholder event={event} />
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {category && (
            <Badge label={category.title} color={category.color} size="sm" />
          )}
          {isSoldOut && (
            <Badge label="Sold Out" className="bg-brand-red text-white border-brand-dark shadow-none" size="sm" />
          )}
        </div>

        {isFeatured && !isSoldOut && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] px-2 py-0.5 bg-brand-lime tracking-wider uppercase border-2 border-brand-dark font-bold text-brand-dark shadow-[2px_2px_0_#1B1B1B]">
              ★ In evidenza
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-brand-dark text-sm leading-tight mb-2.5 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Date */}
        {date && (
          <div className="flex items-center gap-1.5 text-xs text-brand-gray mb-1.5">
            <Calendar size={12} className="flex-shrink-0 text-brand-blue" />
            <span className="capitalize font-medium">{formatDateShort(date)}</span>
            <span className="text-gray-300">·</span>
            <span>{formatTime(date)}</span>
          </div>
        )}

        {/* Venue */}
        {venue && (
          <div className="flex items-center gap-1.5 text-xs text-brand-gray">
            <MapPin size={12} className="flex-shrink-0 text-brand-blue" />
            <span className="truncate">{venue.name}, {venue.city}</span>
          </div>
        )}

        {/* Price row */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          {price ? (
            <span className="text-sm font-bold text-brand-blue">{price}</span>
          ) : (
            <span />
          )}
          <span
            className={cn(
              "text-xs font-semibold transition-colors",
              isSoldOut
                ? "text-red-500"
                : "text-brand-gray"
            )}
          >
            {isSoldOut ? "Esaurito" : "Acquista →"}
          </span>
        </div>
      </div>
    </Link>
  );
}
