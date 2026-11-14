import { cn } from '@/lib/utils';
import React from 'react';

const ResponsiveContainer = ({
  children,
  className,
  id,
  style,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) => {
  return (
    <div className="flex justify-center !mt-6 sm:!mt-10 md:!mt-14 w-full">
      <section
        className={cn(
          '!mx-auto flex !w-full max-w-[1440px] !px-4 sm:!px-6 md:!px-8 lg:!px-12',
          className
        )}
        id={id}
        style={style}
      >
        {children}
      </section>
    </div>
  );
};

export default ResponsiveContainer;
