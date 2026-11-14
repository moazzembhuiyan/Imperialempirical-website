'use client';

import { useEffect, useState, useCallback } from 'react';

const UsegetAllProduct = ({ limit = 10, page = 1, searchText = '', priceRange = '' } = {}) => {
  const [product, setProduct] = useState({ data: [], meta: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // Normalize priceRange into a stable primitive string to prevent infinite useEffect loops
  const normalizedPriceRange = Array.isArray(priceRange)
    ? `${priceRange[0] ?? 0}-${priceRange[1] ?? 5000}`
    : typeof priceRange === 'string'
      ? priceRange
      : '';

  const safeLimit = limit ?? 10;
  const safePage = page ?? 1;
  const safeSearch = searchText ?? '';

  const fetchProduct = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('limit', String(safeLimit));
        params.set('page', String(safePage));
        params.set('searchTerm', safeSearch);
        if (normalizedPriceRange) {
          params.set('priceRange', normalizedPriceRange);
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products?${params.toString()}`,
          { signal }
        );

        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProduct(data);
        setTotalPages(data?.meta?.totalPage || 1);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Failed to load products');
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [safeLimit, safePage, safeSearch, normalizedPriceRange]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchProduct(controller.signal);
    return () => controller.abort();
  }, [fetchProduct]);

  return { product, loading, error, totalPages, refetch: () => fetchProduct() };
};

export default UsegetAllProduct;
