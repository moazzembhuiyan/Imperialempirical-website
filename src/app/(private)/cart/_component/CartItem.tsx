'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function CartItem({ item, index = 0, onRemove, isDeleting }) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  const unitPrice = Number(
    item?.discountPrice ?? item?.product?.discountPrice ?? item?.product?.price ?? 0
  );
  const qty = Number(item?.quantity || 1);
  const lineTotal = unitPrice * qty;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={itemVariants}
      className="flex flex-wrap sm:flex-nowrap items-center gap-4 border-b border-gray-200 last:border-b-0 !pb-4 last:!pb-0"
    >
      {/* Product Image */}
      <div className="h-20 w-20 sm:h-24 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <Image
          width={100}
          height={100}
          src={item?.product?.images?.[0] || '/placeholder.svg'}
          alt={item?.product?.title || 'Product'}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-[140px]">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1">
          {item?.product?.title || 'Product'}
        </h3>
        {item?.size && (
          <p className="!mt-1 text-xs sm:text-sm text-gray-500">
            Size: <span className="font-medium text-gray-700 uppercase">{item.size}</span>
          </p>
        )}
        <p className="!mt-1.5 text-base sm:text-lg font-bold text-gray-900">
          ${lineTotal.toFixed(2)}
        </p>
      </div>

      {/* Quantity & Delete Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto !pt-2 sm:!pt-0 border-t sm:border-t-0 border-stone-100">
        <div className="flex items-center gap-2 bg-stone-100 rounded-full !px-3 !py-1">
          <span className="text-gray-500 text-xs">Qty:</span>
          <span className="text-center text-sm font-semibold text-gray-900">{qty}</span>
        </div>

        <motion.button
          type="button"
          disabled={isDeleting}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRemove(item._id)}
          aria-label="Remove item"
          className="flex-shrink-0 text-red-500 hover:text-red-700 !p-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
        >
          <Trash2 size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}
