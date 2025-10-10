import { fetchPosts } from "@/lib/api/posts";
import LoadMorePosts from "@/components/helper/LoadMorePosts";

const Posts = async({ params }) => {
    const { type } = await params;

    const validTypes = ['song', 'video', 'news', 'guide'];
    if (!validTypes.includes(type)) {
        return <h1>404 - Not Found</h1>;
    }
    const initialPosts = await fetchPosts(0, 6, type);

    const makePlural = type === 'news' ? '' : 's';

    return (
        <section className="w-full lg:w-[70%]">
            <h2 className="capitalize font-bold mb-3">{type + makePlural}</h2>
            <LoadMorePosts initialPosts={initialPosts} type={type} />
        </section>
    )
}

export default Posts;