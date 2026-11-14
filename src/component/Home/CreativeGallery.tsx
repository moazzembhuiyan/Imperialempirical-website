'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ImageIcon } from 'lucide-react';
import Animatetext from '../AnimatedText/AnimatedText';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGetGalleryQuery } from '@/redux/api/galleryApi';
import { AnimatedSkeletonCard } from '../shared/Skeleton/SkeletonLoader';
import EmptyState from '../shared/EmptyState/EmptyState';

export default function CreativeGallery() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetGalleryQuery();
  const galleryItems = data?.data || [];

  return (
    <section className="!py-10 md:!py-16 !px-2 sm:!px-6 lg:!px-8 bg-background max-w-7xl !mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center !mb-10 md:!mb-14"
      >
        <Animatetext x={-20} duration={0.8}>
          <motion.p className="text-xs sm:text-sm uppercase font-medium text-muted-foreground !mb-2 tracking-widest">
            Creative Gallery
          </motion.p>
        </Animatetext>
        <Animatetext x={20} duration={0.8}>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground !mb-6 max-w-4xl !mx-auto leading-tight">
            Explore our artistic vision and creative works
          </h2>
        </Animatetext>

        {/* View More Button */}
        <motion.button
          onClick={() => router.push('/gallery')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex text-sm md:text-base cursor-pointer items-center justify-center gap-2 rounded-full !px-6 !py-2.5 bg-foreground text-background font-medium hover:shadow-lg transition-shadow"
        >
          View More
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Creative Gallery Carousel / Loading / Empty State */}
      {isLoading ? (
        <AnimatedSkeletonCard count={3} />
      ) : isError ? (
        <EmptyState
          icon={ImageIcon}
          title="Unable to Load Gallery"
          description="We couldn't load the creative gallery images right now. Please try again."
          actionLabel="Try Again"
          onAction={refetch}
        />
      ) : galleryItems.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="Gallery Is Currently Empty"
          description="We are curating new visual stories and artistic works. Check back soon!"
        />
      ) : (
        <div className="relative !px-0 md:!px-8">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-full !mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {galleryItems.map((item, index) => (
                <CarouselItem
                  key={item._id || item.id || index}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer"
                    onClick={() => router.push('/gallery')}
                  >
                    <Card className="border-0 overflow-hidden rounded-xl h-full !p-0">
                      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={`Gallery ${item._id || item.id || index + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 bg-white/90 hover:bg-white shadow-md cursor-pointer" />
            <CarouselNext className="hidden md:flex -right-4 bg-white/90 hover:bg-white shadow-md cursor-pointer" />
          </Carousel>
        </div>
      )}
    </section>
  );
}
