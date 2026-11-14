'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProductCard({
  images,
  image,
  title,
  name,
  discountPrice,
  price,
  originalPrice,
  index = 0,
  _id,
  id,
}) {
  const router = useRouter();
  const productId = _id || id;
  const displayTitle = title || name || 'Untitled Product';
  const displayImage = images?.[0] || image || '/placeholder.svg';
  const currentPrice = Number(discountPrice ?? price ?? 0);
  const regularPrice = Number(price ?? originalPrice ?? 0);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: Math.min(index * 0.08, 0.4),
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  } as const;

  const imageVariants = {
    hidden: { scale: 0.96, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: Math.min(index * 0.08 + 0.1, 0.5),
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  } as const;

  return (
    <motion.div
      className="group flex flex-col gap-3 border border-stone-200 hover:border-[#BA9550]/50 bg-white rounded-xl !p-3.5 sm:!p-4 cursor-pointer transition-shadow hover:shadow-lg"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '50px' }}
      onClick={() => productId && router.push(`/product/${productId}`)}
    >
      {/* Product Image Container */}
      <motion.div
        className="relative w-full h-56 sm:h-60 bg-stone-100 rounded-lg overflow-hidden"
        variants={imageVariants}
        whileHover="hover"
      >
        <Image
          width={600}
          height={600}
          src={displayImage}
          alt={displayTitle}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Product Info */}
      <div className="flex flex-col gap-1.5 !pt-1">
        <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-1 group-hover:text-[#BA9550] transition-colors">
          {displayTitle}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground text-sm sm:text-base">
            ${currentPrice.toFixed(2)}
          </span>
          {regularPrice > currentPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${regularPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
