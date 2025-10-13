const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Universal safe fetch helper
async function safeFetch(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.warn(`Fetch failed: ${response.status} (${url})`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Fetch error for ${url}:`, err.message);
    return null;
  }
}

// Fetch posts by type
export async function fetchPosts(offset = 0, limit = 6, postType) {
  const params = new URLSearchParams();
  params.append('offset', offset);
  params.append('limit', limit);
  if (postType) params.append('type', postType);

  return await safeFetch(`${API_URL}/?${params}`, {
    method: 'GET',
    next: { tags: ['posts-by-type'] },
  });
}

// Fetch all posts
export async function fetchAllPosts(offset = 0, limit = 6) {
  const params = new URLSearchParams();
  params.append('offset', offset);
  params.append('limit', limit);

  return await safeFetch(`${API_URL}/all/?${params}`, {
    method: 'GET',
    next: { tags: ['all-posts'] },
  });
}

// Search posts
export async function searchPosts(query = null, offset = 0, limit = 6) {
  const params = new URLSearchParams();
  params.append('offset', offset);
  params.append('limit', limit);
  if (query) params.append('query', query);

  return await safeFetch(`${API_URL}/search/?${params}`, {
    method: 'GET',
  });
}

// Get featured posts
export async function getFeaturedPosts() {
  return await safeFetch(`${API_URL}/featured`, {
    method: 'GET',
    next: { tags: ['featured-posts'] },
  });
}

// Get post by slug
export async function getPostBySlug(slug) {
  return await safeFetch(`${API_URL}/${slug}/slug`, {
    method: 'GET',
    next: { tags: ['posts-by-slug'] },
  });
}

// Get popular posts
export async function getPopularPosts() {
  return await safeFetch(`${API_URL}/popular`, {
    method: 'GET',
    next: { tags: ['popular-posts'] },
  });
}

// Get related posts
export async function getRelatedPosts(postId) {
  return await safeFetch(`${API_URL}/${postId}/related`, {
    method: 'GET',
  });
}

// Track view (fire-and-forget)
let hasTracked = false;

export async function trackView(postId) {
  if (!hasTracked && postId) {
    try {
      await fetch(`${API_URL}/${postId}/track-view`, { method: 'POST' });
      hasTracked = true;
    } catch (err) {
      console.error('Track view error:', err.message);
    }
  }
}