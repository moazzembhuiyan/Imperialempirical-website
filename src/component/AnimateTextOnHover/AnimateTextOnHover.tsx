'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function AnimateTextOnHover({
  children,
  link,
  path,
}: {
  children: ReactNode;
  link?: string;
  path?: string;
}) {
  const currentPathname = usePathname();

  if (link) {
    return (
      <Link href={link} className={cn('block', currentPathname === path && 'font-bold')}>
        <Container path={path} currentPathname={currentPathname}>
          {children}
        </Container>
      </Link>
    );
  }

  return (
    <Container path={path} currentPathname={currentPathname}>
      {children}
    </Container>
  );
}

function Container({
  children,
  path,
  currentPathname,
}: {
  children: ReactNode;
  path?: string;
  currentPathname: string;
}) {
  const text = typeof children === 'string' ? children : String(children ?? '');

  return (
    <motion.div
      className={cn(
        'relative max-h-max max-w-max overflow-hidden',
        currentPathname === path && 'font-bold text-[#BA9550]'
      )}
      initial="initial"
      whileHover="hovered"
      style={{ lineHeight: 1.2 }}
    >
      <motion.div>
        {text.split('').map((l, idx) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: '-100%',
              },
            }}
            transition={{
              duration: 0.5,
              ease: [0.85, 0, 0.15, 1],
              delay: 0.025 * idx,
            }}
            key={`top-${idx}`}
            className="inline-block"
          >
            {l === ' ' ? <span>&nbsp;</span> : l}
          </motion.span>
        ))}
      </motion.div>

      <motion.div className="absolute inset-0">
        {text.split('').map((l, idx) => (
          <motion.span
            variants={{
              initial: {
                y: '100%',
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: 0.5,
              ease: [0.95, 0, 0.15, 1],
              delay: 0.025 * idx,
            }}
            key={`bottom-${idx}`}
            className="inline-block"
          >
            {l === ' ' ? <span>&nbsp;</span> : l}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
