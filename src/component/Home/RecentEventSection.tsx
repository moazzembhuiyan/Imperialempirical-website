'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import EventCard from '../EventCard/EventCard';
import Animatetext from '../AnimatedText/AnimatedText';
import { useRouter } from 'next/navigation';
import UsegetAllEvent from '@/Hooks/UseGetAllEvent';
import { AnimatedSkeletonCard } from '../shared/Skeleton/SkeletonLoader';
import EmptyState from '../shared/EmptyState/EmptyState';

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function EventsSection() {
  const router = useRouter();
  const { event, loading, error, refetch } = UsegetAllEvent({ limit: 3, page: 1, searchtext: '' });
  const eventsList = event?.data || [];

  return (
    <section className="!py-10 md:!py-16 !px-2 sm:!px-6 lg:!px-8 bg-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-7xl !mx-auto !w-full"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center !mb-10 md:!mb-14"
        >
          <Animatetext x={-20} duration={0.8}>
            <motion.p className="text-xs sm:text-sm font-medium text-muted-foreground !mb-2 tracking-widest uppercase">
              Discover Events
            </motion.p>
          </Animatetext>
          <Animatetext x={20} duration={0.8}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground !mb-6 max-w-4xl !mx-auto leading-tight">
              Find experiences that inspire and connect you
            </h2>
          </Animatetext>

          {/* View More Button */}
          <motion.button
            onClick={() => router.push('/event')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex text-sm md:text-base cursor-pointer items-center justify-center gap-2 !px-6 !py-2.5 rounded-full bg-foreground text-background font-medium hover:shadow-lg transition-shadow"
          >
            View More
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Events Grid / Loading / Empty State */}
        {loading ? (
          <AnimatedSkeletonCard count={3} />
        ) : error ? (
          <EmptyState
            icon={Calendar}
            title="Unable to Load Events"
            description="We couldn't load upcoming events right now. Please try again."
            actionLabel="Try Again"
            onAction={refetch}
          />
        ) : eventsList.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No Upcoming Events"
            description="There are no events scheduled at the moment. Stay tuned for our next community gathering!"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsList.map((evt, index) => (
              <EventCard key={evt._id || evt.id || index} event={evt} index={index} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
