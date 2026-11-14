export async function fetchProductDetails(id) {
  if (!id) throw new Error('Invalid product ID');
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`, {
      next: { revalidate: 5 },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    return await response.json();
  } catch (err) {
    throw new Error(err?.message || 'Failed to fetch product details');
  }
}
