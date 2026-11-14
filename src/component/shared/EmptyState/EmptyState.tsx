'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PackageOpen, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = 'No Data Available',
  description = 'We could not find any items to display right now. Please check back later or try adjusting your search.',
  actionLabel,
  actionHref,
  onAction,
  className = '',
}: {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`w-full flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-stone-300 bg-stone-50/70 !px-6 !py-12 md:!py-16 !my-4 ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-[#F4EBD3] flex items-center justify-center !mb-4 shadow-sm">
        <Icon className="w-8 h-8 text-[#BA9550]" />
      </div>

      <h3 className="text-lg md:text-2xl font-bold text-foreground !mb-2">{title}</h3>

      <p className="text-sm md:text-base text-muted-foreground max-w-md !mx-auto !mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Button
          asChild
          className="rounded-full bg-foreground !text-white hover:bg-foreground/90 !px-6 !py-2.5 text-sm font-medium cursor-pointer"
        >
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}

      {actionLabel && onAction && !actionHref && (
        <button
          onClick={onAction}
          style={{ borderColor: '#BA9550', color: '#ffffff' }}
          className="rounded-full border-foreground !text-white hover:bg-foreground hover:text-background !px-6 !py-2.5 text-sm font-medium cursor-pointer inline-flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
