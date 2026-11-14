import { TriangleAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

// Motion variant
const scaleUpVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 30,
      mass: 0.1,
    },
  },
};

export default function CustomFormError({
  formError,
  extraClass = '',
}: {
  formError: string;
  extraClass?: string;
}) {
  return (
    <motion.div
      className={`flex items-center justify-start !mt-5 gap-x-2 bg-red-500 !px-4 !py-2 font-medium text-white ${extraClass}`}
      variants={scaleUpVariants}
      initial="initial"
      animate="animate"
    >
      <TriangleAlert size={20} />
      <p>{formError}</p>
    </motion.div>
  );
}
