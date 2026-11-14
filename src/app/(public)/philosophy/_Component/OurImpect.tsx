'use client';

import { motion } from 'framer-motion';
import ImpactCard from './ImpactCard';

export default function AboutImpact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const impactItems = [
    {
      icon: '🌱',
      title: 'Sustainability at the Core',
      description:
        'We are committed to reducing our environmental impact. From sustainable materials to eco-friendly packaging, we ensure that every product is made with the planet in mind.',
    },
    {
      icon: '✋',
      title: 'Ethical Manufacturing',
      description:
        'All our products are manufactured in facilities that adhere to strict ethical standards. We ensure fair wages and safe working conditions for all employees throughout our supply chain.',
    },
    {
      icon: '❤️',
      title: 'Giving Back to Communities',
      description:
        'We invest in local communities through charitable initiatives and partnerships. Through our contributions, we create lasting positive impact by supporting initiatives and organizations.',
    },
  ];

  return (
    <section className="!py-14 md:!py-20 !px-4 sm:!px-6 md:!px-8 lg:!px-16 bg-secondary/30">
      <div className="max-w-7xl !mx-auto">
        <motion.div
          className="text-center !mb-12 md:!mb-16 !space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground"
            variants={itemVariants}
          >
            Our Impact
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-muted-foreground max-w-2xl !mx-auto leading-relaxed"
            variants={itemVariants}
          >
            At the heart of everything we do is a commitment to making a meaningful difference.
            Whether through our ethical practices or community initiatives, we strive to create
            positive change and inspire others to join us in building a better future.
          </motion.p>
        </motion.div>

        {/* Impact Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {impactItems.map((item, index) => (
            <ImpactCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
