'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const getDescriptionPreview = (html) => {
  if (!html) return 'No description available';
  const text = html.replace(/<[^>]+>/g, '').trim();
  return text.length > 80 ? text.slice(0, 80) + '...' : text;
};

export default function EventCard({ event, index = 0 }) {
  const router = useRouter();
  const eventId = event?._id || event?.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: 'easeOut' }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-card border border-border cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-primary/40 h-full"
      onClick={() => eventId && router.push(`/event/${eventId}`)}
    >
      <div>
        {/* Optimized Image */}
        <div className="relative !h-52 sm:!h-56 overflow-hidden !bg-muted">
          <Image
            src={event?.thumbnail || '/placeholder.svg'}
            alt={event?.title || 'Event'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="!p-5 !space-y-3">
          <div className="flex items-start justify-between !gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-foreground !line-clamp-2 group-hover:text-primary transition-colors">
              {event?.title || 'Untitled Event'}
            </h3>
            <ArrowRight className="!w-5 !h-5 shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>

          <div className="flex items-center !gap-2 text-sm text-muted-foreground">
            <MapPin className="!w-4 !h-4 shrink-0" />
            <span className="truncate">{event?.location || 'Location TBA'}</span>
          </div>

          <p className="!text-sm text-muted-foreground line-clamp-2">
            {getDescriptionPreview(event?.description)}
          </p>
        </div>
      </div>

      <div className="!px-5 !pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 !pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="!w-4 !h-4 shrink-0" />
            <span>{event?.date || 'Date TBA'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="!w-4 !h-4 shrink-0" />
            <span>{event?.time || 'Time TBA'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
