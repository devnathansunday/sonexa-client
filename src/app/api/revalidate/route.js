import { revalidateTag } from 'next/cache';

export async function POST(request) {
  try {
    const { tags } = await request.json();
    
    if (!tags || !Array.isArray(tags)) {
      return Response.json({ error: 'No tags provided' }, { status: 400 });
    }

    tags.forEach(tag => revalidateTag(tag));
    
    return Response.json({ revalidated: true, tags, now: Date.now() });
  } catch (error) {
    return Response.json({ error: 'Error revalidating' }, { status: 500 });
  }
}