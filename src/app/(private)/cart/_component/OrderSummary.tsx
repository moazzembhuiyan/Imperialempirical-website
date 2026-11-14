'use client';

import { motion } from 'framer-motion';
import { BillingDetailsFormModal } from './BillingDetailsFormModal';

export default function OrderSummary({ subtotal = 0, deliveryFee = 0, total = 0, items = [] }) {
  const summaryVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  } as const;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={summaryVariants}
      className="rounded-2xl border border-gray-200 bg-white !p-6 shadow-xs"
    >
      <h2 className="!mb-6 text-xl font-bold text-gray-900">Order Summary</h2>

      <div className="!space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">${Number(subtotal).toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Delivery Fee</span>
          <span className="font-medium text-gray-900">${Number(deliveryFee).toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 !pt-4 flex justify-between text-base font-bold text-gray-900">
          <span>Total</span>
          <span>${Number(total).toFixed(2)}</span>
        </div>

        <BillingDetailsFormModal items={items} total={total}>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="!mt-6 w-full rounded-full bg-black hover:bg-stone-800 !py-3.5 text-white font-semibold cursor-pointer transition-colors"
          >
            Go to Checkout →
          </motion.button>
        </BillingDetailsFormModal>
      </div>
    </motion.div>
  );
}
