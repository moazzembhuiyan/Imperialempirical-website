'use client';

import EmptyState from '@/component/shared/EmptyState/EmptyState';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, FileText } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

export default function ArticleDetailsPage({ ArticleDetails, error }) {
  const article = ArticleDetails?.data;

  if (error || !article) {
    return (
      <main className="min-h-[70vh] bg-background flex items-center justify-center !px-4">
        <div className="max-w-3xl w-full">
          <EmptyState
            icon={FileText}
            title="Article Not Found"
            description="The article you are looking for might have been removed or is currently unavailable."
            actionLabel="Back to Articles"
            actionHref="/financeArticle"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl !mx-auto !px-4 sm:!px-6 md:!px-8 !py-8 md:!py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="!space-y-6 md:!space-y-8"
        >
          {/* Breadcrumb */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <Link href="/financeArticle" className="hover:text-foreground">
              <span>Finance Articles</span>
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">
              {article?.title || 'Article'}
            </span>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={imageVariants}
            className="rounded-2xl overflow-hidden h-60 sm:h-80 md:h-96 relative bg-stone-100"
          >
            <Image
              src={article?.thumbnail || '/placeholder.svg'}
              alt={article?.title || 'Article'}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Published Date Info */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Calendar className="w-4 h-4 text-[#BA9550]" />
            <span>
              {article?.createdAt ? moment(article.createdAt).fromNow() : 'Recently published'}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground leading-tight"
          >
            {article?.title || ''}
          </motion.h1>

          {/* Article Body */}
          <motion.div
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            <div
              className="pro-description"
              dangerouslySetInnerHTML={{
                __html: article?.description || '<p>No article content available.</p>',
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
