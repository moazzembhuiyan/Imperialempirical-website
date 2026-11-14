import ResponsiveContainer from '@/component/ResponsiveContainer/ResponsiveContainer';
import React from 'react';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import EmptyState from '@/component/shared/EmptyState/EmptyState';
import { ShoppingBag } from 'lucide-react';
import CommonPageHeader from '@/component/CommonPageHeader/CommonPageHeader';

export default function ProductDetails({ ProductDetails, error }) {
  const productData = ProductDetails?.data;

  if (error || !productData) {
    return (
      <ResponsiveContainer>
        <div className="w-full !my-10">
          <EmptyState
            icon={ShoppingBag}
            title="Product Not Found"
            description="The product you are looking for may be unavailable or has been removed from our catalog."
            actionLabel="Back to Shop"
            actionHref="/product"
          />
        </div>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer>
      <div className="w-full !space-y-6">
        <CommonPageHeader
          pageTitle={productData.title || 'Product Details'}
          previousPage={{
            pageTitle: 'Shop',
            pageRoute: '/product',
          }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 !mb-12 items-start">
          <ProductImageGallery Productimages={productData.images} />
          <ProductInfo info={productData} />
        </div>
      </div>
    </ResponsiveContainer>
  );
}
