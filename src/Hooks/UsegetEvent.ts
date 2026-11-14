export async function fetcheventsDetails(id) {
  if (!id) throw new Error('Invalid event ID');
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/events/${id}`, {
      next: { revalidate: 5 },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch event details');
    }
    return await response.json();
  } catch (err) {
    throw new Error(err?.message || 'Failed to fetch event details');
  }
}
