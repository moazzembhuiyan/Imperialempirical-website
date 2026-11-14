'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProductImageGallery({ images = [], Productimages = [] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const rawImages =
    Array.isArray(images) && images.length > 0
      ? images
      : Array.isArray(Productimages) && Productimages.length > 0
        ? Productimages
        : ['/placeholder.svg'];

  const activeImage = rawImages[selectedImage] || rawImages[0] || '/placeholder.svg';

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative bg-stone-100 rounded-2xl overflow-hidden aspect-[4/5] max-h-[540px] w-full group"
      >
        <Image
          src={activeImage}
          alt="Product"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          priority
        />
      </motion.div>

      {/* Thumbnail Gallery */}
      {rawImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto !pb-2">
          {rawImages.map((image, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer ${
                selectedImage === index ? 'border-foreground' : 'border-border'
              }`}
            >
              <Image
                src={image || '/placeholder.svg'}
                alt={`View ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
