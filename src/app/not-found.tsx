import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="z-10 min-h-[75vh] overflow-hidden !px-5 md:!px-10 !mx-auto w-full max-w-4xl flex flex-col justify-center items-center text-center !py-16">
      <div className="w-20 h-20 rounded-full bg-[#F4EBD3] flex items-center justify-center !mb-6">
        <span className="text-3xl font-bold text-[#BA9550]">404</span>
      </div>
      <h1 className="text-2xl sm:text-4xl font-bold text-foreground !mb-3">Page Not Found</h1>
      <p className="text-sm sm:text-base text-muted-foreground max-w-md !mb-8">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild className="rounded-full !bg-black !text-white !px-6 !py-2.5">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full !px-6 !py-2.5">
          <Link href="/product">Explore Shop</Link>
        </Button>
      </div>
    </div>
  );
}
