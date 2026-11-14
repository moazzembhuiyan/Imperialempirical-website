'use client';

import Animatetext from '@/component/AnimatedText/AnimatedText';
import EventCard from '@/component/EventCard/EventCard';
import { containerVariants } from '@/component/Home/ArticleSection';
import ReusablePagination from '@/component/shared/CustomPagination/CustomPagination';
import EmptyState from '@/component/shared/EmptyState/EmptyState';
import { AnimatedSkeletonCard } from '@/component/shared/Skeleton/SkeletonLoader';
import { Input } from '@/components/ui/input';
import UsegetAllEvent from '@/Hooks/UseGetAllEvent';
import { motion } from 'framer-motion';
import { Calendar, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function EventContainer() {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { event, loading, error, refetch } = UsegetAllEvent({
    limit,
    page: currentPage,
    searchtext: debouncedSearch,
  });

  const eventsList = event?.data || [];

  return (
    <div className="max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8 !my-10 md:!my-16">
      <div className="!mb-10 md:!mb-14 !space-y-4">
        <Animatetext x={20} duration={0.8}>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground text-center">
            Discover Amazing Events
          </h1>
        </Animatetext>
        <Animatetext x={-20} duration={0.8}>
          <p className="text-center text-pretty text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl !mx-auto">
            From creative workshops to networking events, find experiences that inspire and connect
            you with our vibrant community.
          </p>
        </Animatetext>
        <div className="flex justify-center !pt-2">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search events..."
              className="!pl-10 h-11 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Events Section */}
      <section className="w-full bg-background">
        {loading ? (
          <AnimatedSkeletonCard count={6} />
        ) : error ? (
          <EmptyState
            icon={Calendar}
            title="Could Not Load Events"
            description="Something went wrong while fetching events. Please try again."
            actionLabel="Try Again"
            onAction={refetch}
          />
        ) : eventsList.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No Events Found"
            description={
              debouncedSearch
                ? `We couldn't find any events matching "${debouncedSearch}". Try a different keyword.`
                : 'There are currently no upcoming events available. Please check back later!'
            }
            actionLabel={debouncedSearch ? 'Clear Search' : undefined}
            onAction={debouncedSearch ? () => setSearchInput('') : undefined}
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsList.map((evt, index) => (
                <EventCard key={evt._id || evt.id || index} event={evt} index={index} />
              ))}
            </div>
            <ReusablePagination
              meta={event?.meta}
              onPageChange={(newPage) => setCurrentPage(newPage)}
            />
          </motion.div>
        )}
      </section>
    </div>
  );
}
