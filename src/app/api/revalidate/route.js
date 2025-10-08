// app/api/revalidate/route.js
import { revalidateTag } from 'next/cache';

export async function POST(request) {
  try {
    revalidateTag('posts');
    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return Response.json({ error: 'Error revalidating' }, { status: 500 });
  }
}