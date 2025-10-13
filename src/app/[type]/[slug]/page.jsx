import { getPostBySlug } from "@/lib/api/posts";
import PostContent from "./PostContent";
import RelatedPosts from "./RelatedPosts";

const Page = async({ params }) => {
    const { type, slug } = await params;
    const post = await getPostBySlug(slug);
    
    if (!post) {
        return <div className="p-10 text-my-pink">Failed to fetch post, try reloading</div>
    };
    
    const postUrl = encodeURIComponent(`https://sonexa-client.vercel.app/${type}/${slug}`);
    const postHeading = encodeURIComponent(post.heading);
    

    return (
        <section className="mt-5 lg:w-[70%]">
            <PostContent post={post} postHeading={postHeading} postUrl={postUrl} />
            <RelatedPosts postId={post.id} />
        </section>
    )
}

export default Page;