'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Animatetext from '@/component/AnimatedText/AnimatedText';
import { useGetGalleryQuery } from '@/redux/api/galleryApi';
import EmptyState from '@/component/shared/EmptyState/EmptyState';

// Pure CSS responsive span classes for large screens (SSR-safe, no window.innerWidth needed)
const SPAN_PATTERN_LG = [
  'col-span-1 row-span-1 lg:col-span-1 lg:row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1 lg:col-span-2 lg:row-span-1',
  'col-span-1 row-span-1 lg:col-span-1 lg:row-span-2',
  'col-span-1 row-span-1',
];

export default function GalleryPage() {
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetGalleryQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  const galleryItems = data?.data || [];
  const totalPages =
    data?.meta?.totalPage ||
    (data?.meta?.total ? Math.ceil(data.meta.total / ITEMS_PER_PAGE) : 1) ||
    1;

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev <= 1 ? totalPages : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev >= totalPages ? 1 : prev + 1));
  };

  return (
    <main className="min-h-screen bg-background w-full !pb-12">
      {/* Header */}
      <motion.div
        className="!py-6 md:!py-10 !px-2 sm:!px-6 md:!px-8 text-center"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <Animatetext x={20} duration={0.8}>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground !mb-3">
            Artistry in Every Frame
          </h1>
        </Animatetext>
        <Animatetext x={-20} duration={0.8}>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl !mx-auto !mt-3">
            Immerse yourself in a gallery of vibrant, thought-provoking art and creative projects
            that spark imagination.
          </p>
        </Animatetext>
      </motion.div>

      {/* Content */}
      {isLoading ? (
        <div className="!py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[250px]">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <div
                key={index}
                className={`${SPAN_PATTERN_LG[index % SPAN_PATTERN_LG.length]} relative overflow-hidden rounded-xl`}
              >
                <div className="w-full h-full bg-muted rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ) : isError ? (
        <EmptyState
          icon={ImageIcon}
          title="Could Not Load Gallery"
          description="We encountered an error while loading the gallery images. Please try again."
          actionLabel="Try Again"
          onAction={refetch}
        />
      ) : galleryItems.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="No Gallery Images Found"
          description="Our creative gallery is currently empty. New visual stories will be added soon!"
        />
      ) : (
        <>
          <motion.div
            className="!py-4 md:!py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[220px] sm:auto-rows-[240px] md:auto-rows-[250px]">
              {galleryItems.map((item, index) => {
                const spanClass = SPAN_PATTERN_LG[index % SPAN_PATTERN_LG.length];
                return (
                  <motion.div
                    key={item._id || item.id || index}
                    className={`${spanClass} relative group overflow-hidden rounded-xl bg-stone-100`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Image
                      fill
                      src={item.image || '/placeholder.svg'}
                      alt={`Gallery item ${item._id || item.id || index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {totalPages > 1 && (
            <motion.div
              className="flex items-center justify-center gap-4 sm:gap-8 !py-6 !px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                type="button"
                onClick={handlePrevious}
                className="!p-2.5 border border-stone-200 hover:bg-secondary rounded-full transition-colors cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-muted-foreground text-xs sm:text-sm font-medium whitespace-nowrap">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="!p-2.5 border border-stone-200 hover:bg-secondary rounded-full transition-colors cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </>
      )}
    </main>
  );
}
