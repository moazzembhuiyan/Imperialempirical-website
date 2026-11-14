'use client';

import { motion } from 'framer-motion';
import ArticleCard from '../shared/ArticleCard/Articlecard';
import Animatetext from '../AnimatedText/AnimatedText';
import { useRouter } from 'next/navigation';
import UsegetAllArticle from '@/Hooks/UsegetAllArticle';
import { AnimatedSkeletonCard } from '../shared/Skeleton/SkeletonLoader';
import EmptyState from '../shared/EmptyState/EmptyState';
import { FileText } from 'lucide-react';

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
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

export default function ArticlesSection() {
  const router = useRouter();
  const { article, loading, error, refetch } = UsegetAllArticle({
    limit: 3,
    page: 1,
    searchText: '',
  });
  const articlesList = article?.data || [];

  return (
    <section className="w-full !py-10 md:!py-16 !px-2 sm:!px-4 md:!px-8 bg-background">
      <motion.div
        className="max-w-7xl !w-full !mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Header with Title and View More Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 !mb-8 md:!mb-12 border-b-2 border-dashed border-muted !pb-5">
          <div>
            <Animatetext x={-20} duration={0.8}>
              <motion.span
                className="text-xs text-muted-foreground tracking-widest uppercase font-medium"
                variants={titleVariants}
              >
                Finance Article
              </motion.span>
            </Animatetext>
            <Animatetext x={20} duration={0.8}>
              <motion.h2
                className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground !mt-1"
                variants={titleVariants}
              >
                Articles and Insights
              </motion.h2>
            </Animatetext>
          </div>

          {/* View More Button */}
          <motion.button
            className="flex items-center gap-2 !px-4 sm:!px-5 !py-2 bg-foreground text-background rounded-full text-xs sm:text-sm font-medium hover:bg-muted-foreground transition-colors cursor-pointer"
            variants={buttonVariants}
            whileHover="hover"
            onClick={() => router.push('/financeArticle')}
          >
            View More
            <span className="text-base">↗</span>
          </motion.button>
        </div>

        {/* Articles Grid / Loading / Empty State */}
        {loading ? (
          <AnimatedSkeletonCard count={3} />
        ) : error ? (
          <EmptyState
            icon={FileText}
            title="Unable to Load Articles"
            description="We couldn't load the latest finance articles right now. Please try again."
            actionLabel="Try Again"
            onAction={refetch}
          />
        ) : articlesList.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No Articles Published Yet"
            description="We are working on new financial insights and guides. Check back soon!"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesList.map((item, index) => (
              <ArticleCard key={item._id || item.id || index} {...item} index={index} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
