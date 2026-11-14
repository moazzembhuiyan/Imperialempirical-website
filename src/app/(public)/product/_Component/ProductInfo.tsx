'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slices/authSlice';
import { useAddToCartMutation } from '@/redux/api/cartApi';
import { toast } from 'sonner';

type ProductInfoData = {
  _id?: string;
  title?: string;
  description?: string;
  price?: number | string;
  discountPrice?: number | string;
  size?: Array<{ type: string; quantity: number | string }>;
};

export default function ProductInfo({ info = {} }: { info?: ProductInfoData }) {
  const sizesList = Array.isArray(info?.size) ? info.size : [];
  const firstAvailableSize = sizesList.find((s) => Number(s.quantity) > 0)?.type || null;

  const [selectedSize, setSelectedSize] = useState(firstAvailableSize);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const user = useSelector(selectUser);
  const UserId = user?._id || user?.id;

  const [addToCart, { isLoading }] = useAddToCartMutation();

  const selectedSizeObj = sizesList.find((s) => s.type === selectedSize);
  const maxStock = selectedSizeObj ? Number(selectedSizeObj.quantity) : 99;

  const handleAddToCart = async () => {
    if (!UserId) {
      toast.error('Please sign in to add products to your cart');
      router.push('/login');
      return;
    }

    if (sizesList.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    const productPayload = {
      user: UserId,
      product: info?._id,
      size: selectedSize || 'Default',
      quantity: quantity,
    };

    try {
      const res = await addToCart(productPayload).unwrap();
      if (res?.success) {
        toast.success('Product added to cart successfully');
        router.push('/cart');
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.error || 'Failed to add product to cart');
    }
  };

  const currentPrice = Number(info?.discountPrice ?? info?.price ?? 0);
  const regularPrice = Number(info?.price ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex flex-col gap-6 w-full"
    >
      {/* Product Title and Price */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground !mb-3">
          {info?.title || 'Product Title'}
        </h1>
        <div className="flex items-baseline gap-3">
          <p className="text-2xl sm:text-3xl font-bold text-foreground">
            ${currentPrice.toFixed(2)}
          </p>
          {regularPrice > currentPrice && (
            <span className="text-base sm:text-lg text-muted-foreground line-through">
              ${regularPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="!space-y-3 text-muted-foreground border-t border-b border-stone-200 !py-4">
        <div
          className="pro-description text-sm sm:text-base text-foreground/90 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: info?.description || '<p>No description available for this product.</p>',
          }}
        />
      </div>

      {/* Size Selection */}
      {sizesList.length > 0 && (
        <div>
          <label className="block text-sm font-semibold !mb-3">Select Size</label>
          <div className="flex flex-wrap gap-2.5">
            {sizesList.map((sizeItem) => {
              const outOfStock = Number(sizeItem.quantity) <= 0;
              return (
                <motion.button
                  key={sizeItem.type}
                  type="button"
                  disabled={outOfStock}
                  onClick={() => {
                    setSelectedSize(sizeItem.type);
                    setQuantity(1);
                  }}
                  whileHover={!outOfStock ? { scale: 1.04 } : undefined}
                  whileTap={!outOfStock ? { scale: 0.96 } : undefined}
                  className={`!px-4 !py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    outOfStock
                      ? 'border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed line-through'
                      : selectedSize === sizeItem.type
                        ? 'border-foreground bg-foreground text-background cursor-pointer'
                        : 'border-border hover:border-foreground cursor-pointer'
                  }`}
                >
                  {String(sizeItem.type).toUpperCase()} ({sizeItem.quantity})
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity and Add to Cart Button */}
      <div className="flex flex-col sm:flex-row gap-4 !pt-2">
        <div className="flex items-center justify-between sm:justify-start border border-border rounded-full sm:rounded-lg w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="!px-5 !py-2.5 hover:bg-muted transition-colors cursor-pointer text-lg font-medium"
          >
            −
          </button>
          <span className="!px-6 !py-2 font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(Math.min(Math.max(1, maxStock), quantity + 1))}
            className="!px-5 !py-2.5 hover:bg-muted transition-colors cursor-pointer text-lg font-medium"
          >
            +
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isLoading || (sizesList.length > 0 && !selectedSize)}
          className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-full !py-6 text-base sm:text-lg font-semibold cursor-pointer"
        >
          {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
        </Button>
      </div>
    </motion.div>
  );
}
