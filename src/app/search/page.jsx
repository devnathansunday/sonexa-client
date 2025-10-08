'use client'
import { useSearchParams } from "next/navigation";
import { searchPosts } from "@/lib/api/posts";
import { useEffect, useState } from "react";
import { useTrackView } from "@/context/TrackViewContext";
import Link from "next/link";
import Image from "next/image";

const Posts = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    const { trackPostViews } = useTrackView();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, sethasMore] = useState(false);

    useEffect(() => {
        const fetchResults = async() => {
            const results = await searchPosts(query, 0, 3);
            setResults(results.posts);
            sethasMore(results.hasMore);
            console.log(results);
        }

        fetchResults();
    }, [query]);

    const handleLoadMore = async () => {
        console.log('loading more posts...')
        setLoading(true);

        const nextOffset = results?.length;

        const newPosts = await searchPosts(query, nextOffset, 3);

        setResults(prev => [...prev, ...newPosts.posts]);
        sethasMore(newPosts.hasMore);
        setLoading(false);
    };


    return (
        <section className="md:w-[70%]">
            <h2 className="font-bold mb-3 italic">Search results for <span className="text-my-blue">"{query}"</span></h2>

            <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                {results?.length > 0 ? results.map(post => (
                    <div key={post.slug}>
                        <Link href={`/${post.type}/${post.slug}`} className="w-full">
                            <div className="mb-3" onClick={() => trackPostViews(post.id)}>
                                <figure className="w-full h-[200px] xs:h-[175px] md:h-[150px] lg:h-[175px] object-cover overflow-hidden rounded-xl">
                                    <Image
                                        src={post.featuredImage.url || null}
                                        alt=""
                                        width={600}
                                        height={300}
                                        className="object-cover"
                                        style={{ width: '100%', height: "100%" }}
                                    />
                                </figure>

                                <div className="my-2 space-y-2">
                                    <p className="text-xs text-my-text capitalize border border-my-muted-text px-3 py-1 w-fit rounded">{post.type}</p>
                                    <h2 className="text-sm font-medium line-clamp-1">{post.heading}</h2>

                                    <div className="text-sm text-my-muted-text line-clamp-2">
                                        {post.content.map((c, index) =>
                                            c.type === 'text' ? <p key={index}>{c.content}</p> : null
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* <hr className="w-full h-1 bg-my-content border-none mb-3" /> */}
                    </div>
                )) : (
                    <p>Loading...</p>
                )}
            </div>

            <div className="w-full h-10 flex items-center gri justify-center my-5 overflow-hidden">
                {loading ? (
                    <div className="loader"></div>
                ) : hasMore ? (
                    <button onClick={handleLoadMore} className="px-5 py-2 text-xs border border-my-text rounded cursor-pointer">Load more</button>
                ) : (
                    <p className="text-xs text-my-muted-text">No more posts.</p>
                )}
            </div>
        </section>
    )
}

export default Posts;