import { getPostBySlug } from "@/lib/api/posts";

const Page = async({ params }) => {
    const { type, slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return <div className="m-3">Post not found</div>
    };
    
    return (
        <section className="mt-5 mb-10 md:w-[70%]">
            <p className="date text-xs">{new Date(post.createdAt).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })}</p>

            <h2 className="font-bold text-lg my-2">{post.heading}</h2>

            <figure className="w-full h-[300px] md:h-[350px] lg:h-[400px] mb-3 overflow-hidden rounded-xl">
                <img src={post.featuredImage.url} className="w-full h-full object-cover" alt="" />
            </figure>

            <div>Share</div>
        </section>
    )
}

export default Page;