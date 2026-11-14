'use client';

import ResponsiveContainer from '@/component/ResponsiveContainer/ResponsiveContainer';
import React from 'react';
import { motion } from 'framer-motion';
import Animatetext from '@/component/AnimatedText/AnimatedText';
import ProductCard from '@/component/shared/ProductCard/ProductCard';
import UsegetAllProduct from '@/Hooks/UsegetAllProduct';
import { AnimatedSkeletonCard } from '@/component/shared/Skeleton/SkeletonLoader';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function RelatedProducts({ currentProductId }) {
  const { product, loading } = UsegetAllProduct({
    limit: 4,
    page: 1,
    searchText: '',
    priceRange: '',
  });

  const relatedList = (product?.data || [])
    .filter((item) => (item._id || item.id) !== currentProductId)
    .slice(0, 3);

  if (!loading && relatedList.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer className="!my-12 md:!my-20">
      <div className="w-full">
        <Animatetext x={-20} duration={0.8}>
          <motion.p className="text-xs sm:text-sm text-center uppercase font-medium text-muted-foreground !mb-2 tracking-widest">
            Product
          </motion.p>
        </Animatetext>
        <Animatetext x={20} duration={0.8}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-foreground !mb-8 max-w-4xl !mx-auto">
            You Might Also Like
          </h2>
        </Animatetext>

        <section className="w-full bg-background !mt-6">
          {loading ? (
            <AnimatedSkeletonCard count={3} />
          ) : (
            <motion.div
              className="max-w-full !mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedList.map((item, index) => (
                  <ProductCard key={item._id || item.id || index} {...item} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </ResponsiveContainer>
  );
}
