'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function ReusablePagination({ meta, onPageChange }) {
  const { page = 1, totalPage = 1 } = meta || {};

  if (!meta || totalPage <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPage; i++) {
    if (i === 1 || i === totalPage || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (i === page - 2 || i === page + 2) {
      pages.push('ellipsis-' + i);
    }
  }

  return (
    <Pagination className="!mt-8">
      <PaginationContent className="flex-wrap justify-center gap-1">
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
            className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>

        {/* Numbers */}
        {pages.map((p, i) =>
          typeof p === 'string' ? (
            <PaginationItem key={p + '-' + i}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(p);
                }}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPage) onPageChange(page + 1);
            }}
            className={page >= totalPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
