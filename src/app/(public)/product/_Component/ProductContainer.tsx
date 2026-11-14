'use client';

import ReusablePagination from '@/component/shared/CustomPagination/CustomPagination';
import EmptyState from '@/component/shared/EmptyState/EmptyState';
import ProductCard from '@/component/shared/ProductCard/ProductCard';
import { AnimatedSkeletonCard } from '@/component/shared/Skeleton/SkeletonLoader';
import UsegetAllProduct from '@/Hooks/UsegetAllProduct';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const ProductContainer = ({ filters, onResetFilters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  // Reset to page 1 whenever search or price filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search, filters.priceRange]);

  const { product, loading, error, refetch } = UsegetAllProduct({
    limit,
    page: currentPage,
    searchText: filters.search,
    priceRange: filters.priceRange,
  });

  if (loading) {
    return <AnimatedSkeletonCard count={6} />;
  }

  if (error) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Could Not Load Products"
        description="Something went wrong while fetching products. Please try again."
        actionLabel="Try Again"
        onAction={refetch}
      />
    );
  }

  const productsList = product?.data || [];
  const hasFilters =
    (filters.search && filters.search.trim() !== '') ||
    (filters.priceRange && filters.priceRange !== '0-5000');

  return (
    <section className="w-full bg-background">
      <motion.div
        className="max-w-full !mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {productsList.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="No Products Found"
            description={
              hasFilters
                ? "We couldn't find any products matching your current search or price filter. Try clearing your filters to see all available items."
                : 'No products are currently available in the store. Please check back soon!'
            }
            actionLabel={hasFilters ? 'Reset Filters' : undefined}
            onAction={hasFilters ? onResetFilters : undefined}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {productsList.map((item, index) => (
                <ProductCard key={item._id || item.id || index} {...item} index={index} />
              ))}
            </div>
            <div>
              <ReusablePagination
                meta={product?.meta}
                onPageChange={(newPage) => setCurrentPage(newPage)}
              />
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default ProductContainer;
