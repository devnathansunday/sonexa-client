import { getPostBySlug } from "@/lib/api/posts";
import PostContent from "./PostContent";
import RelatedPosts from "./RelatedPosts";

async function getPost(slug) {
  return await getPostBySlug(slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  return {
    title: post.heading,
    openGraph: {
      title: post.heading,
      description: post.content
        ?.filter(item => item.type === 'text')
        ?.map(item => item.content)
        ?.join(' ')
        ?.substring(0, 160) || 'Sonexa Music Blog',
      images: [post.ogImage],
      type: 'article',
      publishedTime: post.createdAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.heading,
      images: [post.ogImage],
    }
  }
}

const Page = async({ params }) => {
    const { type, slug } = await params;
    const post = await getPost(slug);
    
    if (!post) {
        return <div className="p-10 text-my-pink">Failed to fetch post, try reloading</div>
    };
    
    const postUrl = encodeURIComponent(`https://sonexa-client.vercel.app/${type}/${slug}`);
    const postHeading = encodeURIComponent(post.heading);

    return (
        <section className="mt-2 lg:w-[75%]">
            <PostContent post={post} postHeading={postHeading} postUrl={postUrl} />
            <RelatedPosts postId={post.id} />
        </section>
    )
}

export default Page;