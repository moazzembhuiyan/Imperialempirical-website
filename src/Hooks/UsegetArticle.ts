export async function fetchArticleDetails(id) {
  if (!id) throw new Error('Invalid article ID');
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/${id}`, {
      next: { revalidate: 5 },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch article details');
    }
    return await response.json();
  } catch (err) {
    throw new Error(err?.message || 'Failed to fetch article details');
  }
}
