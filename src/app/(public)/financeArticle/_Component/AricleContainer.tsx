'use client';

import Animatetext from '@/component/AnimatedText/AnimatedText';
import { containerVariants } from '@/component/Home/ArticleSection';
import ArticleCard from '@/component/shared/ArticleCard/Articlecard';
import ReusablePagination from '@/component/shared/CustomPagination/CustomPagination';
import EmptyState from '@/component/shared/EmptyState/EmptyState';
import { AnimatedSkeletonCard } from '@/component/shared/Skeleton/SkeletonLoader';
import { Input } from '@/components/ui/input';
import UsegetAllArticle from '@/Hooks/UsegetAllArticle';
import { motion } from 'framer-motion';
import { FileText, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function AricleContainer() {
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

  const { article, loading, error, refetch } = UsegetAllArticle({
    limit,
    page: currentPage,
    searchText: debouncedSearch,
  });

  const articlesList = article?.data || [];

  return (
    <div className="max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8 !my-10 md:!my-16">
      <div className="!mb-10 md:!mb-14 !space-y-4">
        <Animatetext x={20} duration={0.8}>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground text-center">
            Insights for a Better Financial Future
          </h1>
        </Animatetext>
        <Animatetext x={-20} duration={0.8}>
          <p className="text-center text-pretty text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl !mx-auto">
            Explore expert advice, in-depth articles, and practical tips to help you make smarter
            financial decisions.
          </p>
        </Animatetext>
        <div className="flex justify-center !pt-2">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Input
              value={searchInput}
              placeholder="Search articles..."
              className="!pl-10 h-11 rounded-full"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Article Section */}
      <section className="w-full bg-background">
        {loading ? (
          <AnimatedSkeletonCard count={6} />
        ) : error ? (
          <EmptyState
            icon={FileText}
            title="Could Not Load Articles"
            description="Something went wrong while fetching articles. Please try again."
            actionLabel="Try Again"
            onAction={refetch}
          />
        ) : articlesList.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No Articles Found"
            description={
              debouncedSearch
                ? `We couldn't find any articles matching "${debouncedSearch}". Try another search term.`
                : 'No financial articles have been published yet. Please check back soon!'
            }
            actionLabel={debouncedSearch ? 'Clear Search' : undefined}
            onAction={debouncedSearch ? () => setSearchInput('') : undefined}
          />
        ) : (
          <motion.div
            className="w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articlesList.map((item, index) => (
                <ArticleCard key={item._id || item.id || index} {...item} index={index} />
              ))}
            </div>
            <ReusablePagination
              meta={article?.meta}
              onPageChange={(newPage) => setCurrentPage(newPage)}
            />
          </motion.div>
        )}
      </section>
    </div>
  );
}
