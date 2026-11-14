'use client';

import Animatetext from '@/component/AnimatedText/AnimatedText';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutHero() {
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
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  } as const;

  return (
    <section className="!py-12 md:!py-20 !px-4 sm:!px-6 md:!px-8 lg:!px-16">
      <div className="max-w-7xl !mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Content */}
          <div className="!space-y-8">
            <div className="!space-y-4">
              <Animatetext x={20} duration={0.8}>
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground"
                  variants={itemVariants}
                >
                  About Us
                </motion.h2>
              </Animatetext>

              <motion.p
                className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                variants={itemVariants}
              >
                At Empirical, we believe that great products are not just about what you wear, but
                the story behind them. Founded on the principles of quality, sustainability, and
                ethical craftsmanship, we are driven to create more than just apparel—we create an
                experience.
              </motion.p>
              <Animatetext x={-20} duration={0.8}>
                <motion.p
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                  variants={itemVariants}
                >
                  We are a team of dreamers, creators, and innovators who are committed to breaking
                  stereotypes and crafting products that inspire. From hand-picking the finest
                  materials to ensuring sustainable practices, every detail matters. Our mission is
                  simple: to deliver clothing that makes you feel good, confident, and unique on the
                  inside and out.
                </motion.p>
              </Animatetext>
            </div>

            {/* Our Mission */}
            <div className="!space-y-4">
              <Animatetext x={20} duration={0.8}>
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground"
                  variants={itemVariants}
                >
                  Our Mission
                </motion.h2>
              </Animatetext>

              <Animatetext x={-20} duration={0.8}>
                <motion.p
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                  variants={itemVariants}
                >
                  Our mission is to empower individuals with timeless, responsibly crafted apparel
                  that bridges contemporary aesthetics with mindful production—reducing waste while
                  elevating everyday comfort.
                </motion.p>
              </Animatetext>
            </div>

            {/* Our Story */}
            <div className="!space-y-4">
              <Animatetext x={20} duration={0.8}>
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground"
                  variants={itemVariants}
                >
                  Our Story
                </motion.h2>
              </Animatetext>

              <Animatetext x={-20} duration={0.8}>
                <motion.p
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                  variants={itemVariants}
                >
                  What began as a passion for purposeful design evolved into a global community of
                  conscious consumers and artisans working together to redefine modern fashion.
                </motion.p>
              </Animatetext>
            </div>
          </div>

          {/* Right Image */}
          <motion.div
            className="relative h-72 sm:h-96 lg:h-[460px] rounded-2xl overflow-hidden shadow-xl"
            variants={itemVariants}
          >
            <Image
              src="/gallery/team.png"
              alt="About Us - Modern clothing store"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
