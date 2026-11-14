'use client';

import ResponsiveContainer from '@/component/ResponsiveContainer/ResponsiveContainer';
import EmptyState from '@/component/shared/EmptyState/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTermsAndConditionsPrivecyQuery } from '@/redux/api/termsandPrivecyApi';
import { FileText } from 'lucide-react';
import React from 'react';

const TermsAndCondition = () => {
  const { data, isLoading, isError, refetch } = useGetTermsAndConditionsPrivecyQuery();
  const content = data?.data?.termsAndConditions;

  return (
    <ResponsiveContainer className="!mx-auto">
      <div className="w-full max-w-4xl !mx-auto !my-6 md:!my-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground !mb-6 border-b !pb-4">
          Terms &amp; Conditions
        </h1>

        {isLoading ? (
          <div className="!space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-6 w-1/4 !mt-6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ) : isError ? (
          <EmptyState
            icon={FileText}
            title="Unable to Load Terms & Conditions"
            description="We encountered a problem loading our terms and conditions. Please try again."
            actionLabel="Try Again"
            onAction={refetch}
          />
        ) : !content ? (
          <EmptyState
            icon={FileText}
            title="Terms & Conditions Not Available"
            description="Our terms and conditions document is currently being updated. Please check back shortly."
            actionLabel="Back to Home"
            actionHref="/"
          />
        ) : (
          <div
            className="pro-description text-sm sm:text-base text-foreground leading-relaxed !space-y-4"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        )}
      </div>
    </ResponsiveContainer>
  );
};

export default TermsAndCondition;
