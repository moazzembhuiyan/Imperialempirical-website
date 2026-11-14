'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Animatetext from '../AnimatedText/AnimatedText';
import { useRouter } from 'next/navigation';

export default function PhilosophySection() {
  const router = useRouter();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  } as const;

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  } as const;

  return (
    <section className="relative w-full min-h-[480px] md:min-h-[600px] flex items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(/philosophy.png)',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content container */}
      <motion.div
        className="relative z-10 w-full max-w-5xl !mx-auto !px-5 sm:!px-8 md:!px-12 !py-14 md:!py-20 !space-y-6 md:!space-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <Animatetext x={-20} duration={0.8}>
          <motion.h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-pretty">
            Our Philosophy
          </motion.h2>
        </Animatetext>

        {/* First paragraph */}
        <Animatetext x={20} duration={0.8}>
          <motion.p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed text-pretty max-w-3xl">
            At Empirical, we believe that quality clothing should be accessible to everyone. Our
            commitment to sustainable practices and ethical manufacturing ensures that every piece
            we create not only looks great but also contributes to a better world.
          </motion.p>
        </Animatetext>

        {/* Second paragraph */}
        <Animatetext x={-20} duration={0.8}>
          <motion.p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed text-pretty max-w-3xl">
            We focus on timeless designs, premium materials, and exceptional craftsmanship to
            deliver clothing that you&apos;ll love wearing for years to come.
          </motion.p>
        </Animatetext>

        {/* Learn More Button */}
        <motion.div variants={itemVariants} whileHover="hover" initial="initial">
          <motion.button
            className="flex items-center gap-2 text-sm md:text-base !px-6 !py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-colors cursor-pointer"
            variants={buttonVariants}
            onClick={() => router.push('/philosophy')}
          >
            Learn More
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
