'use client';

import { useEffect, useState, useCallback } from 'react';

const UsegetAllEvent = ({
  limit = 10,
  page = 1,
  searchtext = '',
  searchText,
}: {
  limit?: number;
  page?: number;
  searchtext?: string;
  searchText?: string;
} = {}) => {
  const [event, setEvent] = useState({ data: [], meta: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const safeLimit = limit ?? 10;
  const safePage = page ?? 1;
  const safeSearch = (searchText !== undefined ? searchText : searchtext) ?? '';

  const fetchEvent = useCallback(
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
          `${process.env.NEXT_PUBLIC_BASE_URL}/events?${params.toString()}`,
          { signal }
        );

        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvent(data);
        setTotalPages(data?.meta?.totalPage || 1);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Failed to load events');
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
    fetchEvent(controller.signal);
    return () => controller.abort();
  }, [fetchEvent]);

  return { event, loading, error, totalPages, refetch: () => fetchEvent() };
};

export default UsegetAllEvent;
