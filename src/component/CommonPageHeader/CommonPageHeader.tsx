import React from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function CommonPageHeader({
  pageTitle,
  previousPage,
}: {
  pageTitle?: string;
  previousPage?: { pageTitle?: string; pageRoute?: string };
}) {
  return (
    <div className="w-full !py-2">
      <div className="flex items-center">
        {previousPage?.pageTitle && (
          <Breadcrumb>
            <BreadcrumbList className="font-medium text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={previousPage?.pageRoute ? previousPage.pageRoute : '/'}>
                    {previousPage?.pageTitle}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
    </div>
  );
}
