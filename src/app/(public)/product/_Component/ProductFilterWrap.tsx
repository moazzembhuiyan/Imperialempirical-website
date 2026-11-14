'use client';

import { useState, useCallback } from 'react';
import FilterSection from './ProductFilter';
import ProductContainer from './ProductContainer';

const DEFAULT_FILTERS = {
  search: '',
  size: '',
  priceRange: '0-5000',
};

const ProductFilterWrapper = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [resetSignal, setResetSignal] = useState(0);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setResetSignal((prev) => prev + 1);
  }, []);

  return (
    <div className="!mt-6 md:!mt-8 flex flex-col lg:flex-row gap-8 lg:gap-10 w-full items-start">
      {/* Filter Sidebar */}
      <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
        <FilterSection
          key={resetSignal}
          filters={filters}
          setFilters={setFilters}
          onReset={handleResetFilters}
        />
      </div>

      {/* Products Grid */}
      <div className="w-full flex-1 min-w-0">
        <ProductContainer filters={filters} onResetFilters={handleResetFilters} />
      </div>
    </div>
  );
};

export default ProductFilterWrapper;
