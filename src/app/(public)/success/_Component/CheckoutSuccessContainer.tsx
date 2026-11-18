'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

const ConfettiLottie = dynamic(() => import('./ConfettiLottie'), { ssr: false });
const SuccessLottie = dynamic(() => import('./SuccessLottie'), { ssr: false });

export default function CheckoutSuccessContainer() {
  return (
    <div className="relative flex flex-col items-center justify-center h-[90vh] overflow-hidden">
      {/* Confetti Background */}
      <ConfettiLottie />

      {/* Success animation */}
      <SuccessLottie />

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 1,
          type: 'spring',
          stiffness: 200,
          damping: 18,
        }}
        className="text-center !mt-6"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-green-600">Congratulations!</h2>

        <p className="!mt-4 !mb-8 text-gray-700 md:text-xl">Payment Successful 🎉</p>

        <Button asChild className="!px-6 text-white">
          <Link href="/">Go to Home</Link>
        </Button>
      </motion.div>
    </div>
  );
}
