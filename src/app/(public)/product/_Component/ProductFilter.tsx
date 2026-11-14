'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, Search, Sliders } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

export default function FilterSection({ filters, setFilters, onReset }) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');

  // Debounce filter updates so dragging the slider or typing doesn't spam API requests
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextPriceRange = `${priceRange[0]}-${priceRange[1]}`;
      setFilters((prev) => {
        if (prev.search === searchTerm && prev.priceRange === nextPriceRange) {
          return prev;
        }
        return {
          ...prev,
          search: searchTerm,
          priceRange: nextPriceRange,
        };
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, priceRange, setFilters]);

  const hasActiveFilters = searchTerm.trim() !== '' || priceRange[0] > 0 || priceRange[1] < 5000;

  return (
    <div className="!w-full bg-card rounded-xl border border-border !p-5 sm:!p-6 shadow-xs">
      <div className="flex items-center justify-between !mb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-base sm:text-lg font-semibold text-foreground">Filters</h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-[#BA9550] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative !mt-2">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <Input
          placeholder="Search products..."
          className="!pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Accordion type="multiple" className="w-full" defaultValue={['price']}>
        {/* Price Range */}
        <AccordionItem value="price" className="border-b-0 !mt-4">
          <AccordionTrigger className="!py-3 text-foreground font-medium hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="!pb-2">
            <div className="!space-y-4">
              <div className="!px-2 !mt-2">
                <Slider
                  min={0}
                  max={5000}
                  step={25}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>

              <div className="flex justify-between items-center text-xs sm:text-sm bg-stone-50 rounded-lg !px-3 !py-2 border border-stone-200/60">
                <span className="text-foreground font-semibold">
                  ${priceRange[0]?.toLocaleString()}
                </span>
                <span className="text-muted-foreground">to</span>
                <span className="text-foreground font-semibold">
                  ${priceRange[1]?.toLocaleString()}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
