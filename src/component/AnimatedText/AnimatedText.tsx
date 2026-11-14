'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { HTMLMotionProps } from 'framer-motion';

type AnimatedTextProps = HTMLMotionProps<'div'> & {
  duration?: number;
  x?: number;
  y?: number;
};

const Animatetext = ({ children, duration, className, x, y }: AnimatedTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: x, y: y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: duration }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default Animatetext;
