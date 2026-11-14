import ProductDetails from '../_Component/ProductDetails';
import RelatedProducts from '../_Component/RelatedProducts';
import { fetchProductDetails } from '@/Hooks/UsegetProductDetails';

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const service = await fetchProductDetails(id);
    return {
      title: `${service?.data?.title || 'Product Details'} - Empirical`,
      description:
        service?.data?.description || 'Discover detailed information about our products.',
    };
  } catch {
    return {
      title: 'Product Details - Empirical',
      description: 'Discover detailed information about our products.',
    };
  }
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  let service = null;
  let error = null;

  try {
    service = await fetchProductDetails(id);
  } catch (err) {
    error = err.message;
  }

  return (
    <div>
      <ProductDetails ProductDetails={service} error={error} />
      <RelatedProducts currentProductId={id} />
    </div>
  );
}
