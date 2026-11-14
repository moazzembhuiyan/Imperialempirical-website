'use client';

import Animatetext from '@/component/AnimatedText/AnimatedText';
import { motion } from 'framer-motion';

export default function PhilosophyheroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative w-full min-h-[380px] sm:min-h-[460px] md:min-h-[550px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center z-0 bg-[url('/philosophy.png')]">
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content container */}
      <motion.div
        className="relative z-10 max-w-4xl !mx-auto !px-4 sm:!px-6 !py-16 md:!py-20 !space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Animatetext x={-20} duration={0.8}>
          <motion.h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white text-pretty text-center">
            Our Philosophy
          </motion.h1>
        </Animatetext>

        <Animatetext x={20} duration={0.8}>
          <motion.p className="text-sm sm:text-base md:text-xl w-full text-white/90 leading-relaxed text-pretty text-center">
            Building fashion that speaks to you, while respecting the planet and empowering
            communities through ethical practices.
          </motion.p>
        </Animatetext>
      </motion.div>
    </section>
  );
}
