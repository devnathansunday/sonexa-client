const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPosts(offset = 0, limit = 6, postType) {
    try {
        const params = new URLSearchParams();
        params.append('offset', offset);
        params.append('limit', limit);
        if (postType) params.append('type', postType);
        
        const response = await fetch(`${API_URL}/?${params}`, {
            method: 'GET',
            next: { 
                tags: ['posts']
            }
        });
        
        if (!response.ok) throw new Error(`API error ${response.status}`);
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch posts error:', error);
        throw error;
    }
}

export async function fetchAllPosts(offset = 0, limit = 6) {
    try {
        const params = new URLSearchParams();
        params.append('offset', offset);
        params.append('limit', limit);
        
        const response = await fetch(`${API_URL}/all/?${params}`, {
            method: 'GET',
            next: { 
                tags: ['posts']
            }
        });
        
        if (!response.ok) throw new Error(`API error ${response.status}`);
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch all posts error:', error);
        throw error;
    }
}

export async function searchPosts(query = null, offset = 0, limit = 6) {
    try {
        const params = new URLSearchParams();
        params.append('offset', offset);
        params.append('limit', limit);
        if (query) params.append('query', query);
        
        const response = await fetch(`${API_URL}/search/?${params}`, {
            method: 'GET',
        });
        
        if (!response.ok) throw new Error(`API error ${response.status}`);
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Search posts error:', error);
        throw error;
    }
}
    
export async function getFeaturedPosts() {
        try {
            const response = await fetch(`${API_URL}/featured`, {
                method: 'GET',
                next: { 
                    tags: ['posts']
                }
        });
            
        if (!response.ok) throw new Error(`API error ${response.status}`);

        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Fetch posts error:', error);
        throw error;
    }
}

export async function getPostBySlug(slug) {
    try {
        const response = await fetch(`${API_URL}/${slug}/slug`, {
            method: 'GET',
            next: { 
                tags: ['posts']
            }
        });
            
        if (!response.ok) throw new Error(`API error ${response.status}`);
        
        const post = await response.json();
        return post;
    } catch (error) {
        console.error('Fetch posts error:', error);
        throw error;
    }
}

export async function getPopularPosts() {
    try {
        const response = await fetch(`${API_URL}/popular`, {
            method: 'GET',
        });
        
        if (!response.ok) throw new Error(`API error ${response.status}`);

        const posts = await response.json();

        return posts;
    } catch (error) {
        console.error('Fetch posts error:', error);
        throw error;
    }
}

let hasTracked = false;

export async function trackView(postId) {
  if (!hasTracked) {
        await fetch(`${API_URL}/${postId}/track-view`, { method: 'POST' });
        hasTracked = true;
    }
};
