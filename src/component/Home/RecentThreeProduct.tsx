'use client';

import { motion } from 'framer-motion';
import ProductCard from '../shared/ProductCard/ProductCard';
import Animatetext from '../AnimatedText/AnimatedText';
import { useRouter } from 'next/navigation';
import UsegetAllProduct from '@/Hooks/UsegetAllProduct';
import { AnimatedSkeletonCard } from '../shared/Skeleton/SkeletonLoader';
import EmptyState from '../shared/EmptyState/EmptyState';
import { ShoppingBag } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
} as const;

const bannerVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' },
  },
  hover: {
    y: -5,
    transition: { duration: 0.3 },
  },
} as const;

export default function ProductsSection() {
  const router = useRouter();
  const limit = 6;

  // Use stable primitive priceRange string so useEffect never loops infinitely
  const { product, loading, error, refetch } = UsegetAllProduct({
    limit,
    page: 1,
    searchText: '',
    priceRange: '',
  });

  const productsList = product?.data || [];

  return (
    <section className="w-full !py-10 md:!py-16 !px-2 sm:!px-4 md:!px-8 bg-background">
      <motion.div
        className="max-w-7xl !mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Header with Title and View All Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 !mb-8 md:!mb-12 border-b-2 !pb-5">
          <div>
            <Animatetext x={20} duration={0.8}>
              <span className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
                Products
              </span>
            </Animatetext>
            <Animatetext x={-20} duration={0.8}>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground !mt-1">
                Our Products
              </h2>
            </Animatetext>
          </div>

          {/* View All Button */}
          <motion.button
            className="flex items-center gap-2 !px-4 sm:!px-5 !py-2 border border-foreground rounded-full text-xs sm:text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
            variants={buttonVariants}
            whileHover="hover"
            onClick={() => router.push('/product')}
          >
            View All
            <span className="text-base">↗</span>
          </motion.button>
        </div>

        {/* Products Grid and Featured Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <AnimatedSkeletonCard count={3} />
            ) : error ? (
              <EmptyState
                icon={ShoppingBag}
                title="Unable to Load Products"
                description="We encountered a temporary issue loading our latest products. Please try again."
                actionLabel="Try Again"
                onAction={refetch}
              />
            ) : productsList.length === 0 ? (
              <EmptyState
                icon={ShoppingBag}
                title="No Products Available Yet"
                description="Our new collection is being prepared. Check back soon for fresh arrivals!"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {productsList.map((item, index) => (
                  <ProductCard key={item._id || item.id || index} {...item} index={index} />
                ))}
              </div>
            )}
          </div>

          {/* Featured Collections Banner */}
          <motion.div
            className="lg:col-span-1 min-h-[280px] sm:min-h-[340px] lg:min-h-full bg-gradient-to-br from-stone-700 to-stone-900 rounded-2xl !p-6 flex flex-col justify-between overflow-hidden relative group cursor-pointer"
            variants={bannerVariants}
            whileHover="hover"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onClick={() => router.push('/product')}
          >
            {/* Background Image Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-65 transition-opacity duration-300"
              style={{
                backgroundImage:
                  'url(/hero2.webp), linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5))',
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="inline-block text-xs uppercase tracking-widest bg-white/20 backdrop-blur-sm text-white !px-3 !py-1 rounded-full">
                  Featured
                </span>
              </div>

              <div className="text-white !mt-auto !pt-16">
                <p className="text-sm text-white/80 !mb-1">Explore our curated catalog</p>
                <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                  <span className="text-lg">All Collections</span>
                  <span className="text-xl">↗</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
