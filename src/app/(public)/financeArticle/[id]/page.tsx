import { fetchArticleDetails } from '@/Hooks/UsegetArticle';
import ArticleDetailsPage from '../_Component/ArticleDetails';

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const service = await fetchArticleDetails(id);
    return {
      title: `${service?.data?.title || 'Article Details'} - Empirical`,
      description:
        service?.data?.description || 'Discover detailed information about our articles.',
    };
  } catch {
    return {
      title: 'Article Details - Empirical',
      description: 'Discover detailed information about our articles.',
    };
  }
}

export default async function page({ params }) {
  const { id } = await params;
  let service = null;
  let error = null;

  try {
    service = await fetchArticleDetails(id);
  } catch (err) {
    error = err.message;
  }
  return (
    <div>
      <ArticleDetailsPage ArticleDetails={service} error={error} />
    </div>
  );
}
