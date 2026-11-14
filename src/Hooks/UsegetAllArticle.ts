'use client';

import { useEffect, useState, useCallback } from 'react';

const UsegetAllArticle = ({ limit = 10, page = 1, searchText = '' } = {}) => {
  const [article, setArticle] = useState({ data: [], meta: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const safeLimit = limit ?? 10;
  const safePage = page ?? 1;
  const safeSearch = searchText ?? '';

  const fetchArticle = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          limit: String(safeLimit),
          page: String(safePage),
          searchTerm: safeSearch,
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/articles?${params.toString()}`,
          { signal }
        );

        if (!res.ok) throw new Error('Failed to fetch articles');
        const data = await res.json();
        setArticle(data);
        setTotalPages(data?.meta?.totalPage || 1);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Failed to load articles');
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [safeLimit, safePage, safeSearch]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchArticle(controller.signal);
    return () => controller.abort();
  }, [fetchArticle]);

  return { article, loading, error, totalPages, refetch: () => fetchArticle() };
};

export default UsegetAllArticle;
