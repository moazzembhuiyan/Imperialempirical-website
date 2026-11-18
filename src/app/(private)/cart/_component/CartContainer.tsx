'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, ShoppingBag } from 'lucide-react';
import OrderSummary from './OrderSummary';
import CartItem from './CartItem';
import { useDeleteCartMutation, useGetCartQuery } from '@/redux/api/cartApi';
import { toast } from 'sonner';
import EmptyState from '@/component/shared/EmptyState/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { selectToken } from '@/redux/slices/authSlice';
import { useSelector } from 'react-redux';

export default function CartPage() {
  const token = useSelector(selectToken);
  const { data, isLoading, isError, refetch } = useGetCartQuery(undefined, {
    skip: !token,
  });
  const [deleteCart, { isLoading: isDeleteLoading }] = useDeleteCartMutation();

  const handleRemoveItem = async (itemId) => {
    try {
      const res = await deleteCart(itemId).unwrap();
      if (res?.success) {
        toast.success('Product removed from cart');
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.error || 'Failed to remove item');
    }
  };

  const cartItems = data?.data || [];

  const subtotal = cartItems.reduce((acc, item) => {
    const unitPrice = Number(
      item?.discountPrice ?? item?.product?.discountPrice ?? item?.product?.price ?? 0
    );
    const qty = Number(item?.quantity || 1);
    return acc + unitPrice * qty;
  }, 0);

  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal + deliveryFee;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <main className="min-h-[75vh] w-full">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="!mx-auto max-w-full !py-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </motion.div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="!mx-auto max-w-full !py-8 md:!py-12">
        {isLoading ? (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 !space-y-4">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} className="h-28 w-full rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        ) : isError ? (
          <EmptyState
            icon={ShoppingBag}
            title="Could Not Load Your Cart"
            description="We had trouble retrieving your shopping cart items. Please try again."
            actionLabel="Try Again"
            onAction={refetch}
          />
        ) : cartItems.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your Cart Is Empty"
            description="Looks like you haven't added any items to your cart yet. Explore our collection to find your perfect style!"
            actionLabel="Continue Shopping"
            actionHref="/product"
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 lg:grid-cols-3 items-start"
          >
            {/* Cart Items */}
            <motion.div className="lg:col-span-2 !space-y-4 bg-white rounded-2xl border border-stone-200/80 !p-4 sm:!p-6">
              {cartItems.map((item, index) => (
                <CartItem
                  key={item._id || item.id || index}
                  item={item}
                  index={index}
                  onRemove={handleRemoveItem}
                  isDeleting={isDeleteLoading}
                />
              ))}
            </motion.div>

            {/* Order Summary */}
            <div>
              <OrderSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                total={total}
                items={cartItems}
              />
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
