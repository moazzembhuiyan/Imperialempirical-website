import CommonPageHeader from '@/component/CommonPageHeader/CommonPageHeader';
import ResponsiveContainer from '@/component/ResponsiveContainer/ResponsiveContainer';
import ProductFilterWrapper from './_Component/ProductFilterWrap';

export const metadata = {
  title: 'Product',
  description:
    'Building fashion that speaks to you, while respecting the planet and empowering communities through ethical practices.',
};

export default function Page() {
  return (
    <ResponsiveContainer>
      <div className="!w-full !mx-auto !my-4 md:!my-8">
        {/* Page Header */}
        <CommonPageHeader
          pageTitle="Shop"
          previousPage={{
            pageTitle: 'Home',
            pageRoute: '/',
          }}
        />

        <ProductFilterWrapper />
      </div>
    </ResponsiveContainer>
  );
}
