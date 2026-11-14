'use client';

import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ArticleCard({
  thumbnail,
  image,
  createdAt,
  date,
  title,
  description,
  index = 0,
  _id,
  id,
}) {
  const router = useRouter();
  const articleId = _id || id;
  const displayImage = thumbnail || image || '/placeholder.svg';

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: Math.min(index * 0.1, 0.4),
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  } as const;

  const getPlainTextPreview = (html) => {
    if (!html) return 'No description available.';
    const text = html.replace(/<[^>]+>/g, '').trim();
    return text.length > 90 ? text.slice(0, 90) + '...' : text;
  };

  return (
    <motion.div
      className="group flex flex-col gap-4 rounded-xl border border-stone-200/80 bg-white !p-4 hover:shadow-lg hover:border-[#BA9550]/40 transition-all cursor-pointer h-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      onClick={() => articleId && router.push(`/financeArticle/${articleId}`)}
    >
      {/* Article Image Container */}
      <div className="w-full h-48 sm:h-52 bg-stone-100 rounded-lg overflow-hidden shrink-0">
        <Image
          src={displayImage}
          alt={title || 'Article'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          width={500}
          height={500}
        />
      </div>

      {/* Article Info */}
      <div className="flex flex-col flex-1 justify-between gap-3">
        <div className="flex flex-col gap-2">
          {/* Date */}
          <span className="text-xs text-muted-foreground">
            {createdAt ? moment(createdAt).fromNow() : date || 'Recently published'}
          </span>

          {/* Title */}
          <h3 className="font-bold text-base sm:text-lg text-foreground line-clamp-2 group-hover:text-[#BA9550] transition-colors">
            {title || 'Untitled Article'}
          </h3>

          {/* Description */}
          <div className="text-sm text-muted-foreground line-clamp-3">
            {getPlainTextPreview(description)}
          </div>
        </div>

        {/* Read More Link */}
        <div className="text-sm font-semibold text-foreground group-hover:text-[#BA9550] transition-colors flex items-center gap-1 !pt-2">
          <span>Read More</span>
          <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            ↗
          </span>
        </div>
      </div>
    </motion.div>
  );
}
