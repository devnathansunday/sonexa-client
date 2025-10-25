'use client'
import { useSearchParams } from "next/navigation";
import { searchPosts } from "@/lib/api/posts";
import { useEffect, useState } from "react";
import { useTrackView } from "@/context/TrackViewContext";
import { useLoading } from "@/context/LoadingContext";
import Link from "next/link";
import Image from "next/image";
import PostListSkeleton from "@/components/helper/PostListSkeleton";

const Results = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    
    const { trackPostViews } = useTrackView();
    const { startLoading } = useLoading();
    
    const [results, setResults] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hasMore, sethasMore] = useState(false);

    useEffect(() => {
        const fetchResults = async() => {
            try {
                setLoading(true);
                const results = await searchPosts(query, 0, 6);
                setResults(results.posts);
                sethasMore(results.hasMore);
                // console.log(results);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchResults();

    }, [query]);

    const handleLoadMore = async () => {
        // console.log('loading more posts...')
        setLoadingMore(true);

        const nextOffset = results?.length;

        const newPosts = await searchPosts(query, nextOffset, 6);

        setResults(prev => [...prev, ...newPosts.posts]);
        sethasMore(newPosts.hasMore);
        setLoadingMore(false);
    };

    return (
        <section className="lg:w-[75%]">
            <h2 className="font-medium my-3 italic">Search results for <span className="text-my-blue">"{query}"</span></h2>

            <div className="space-y-3">
                {loading ? (
                    <PostListSkeleton />
                ) : results.length > 0 ? results.map(post => (
                        <div key={post.slug} className="transform transition-all ease-out duration-100 active:scale-[98%] group">
                            <Link href={`/${post.type}/${post.slug}`} className="w-full">
                                <div className="flex gap-3 hover:scale-[98%] transition-transform duration-300" onClick={() => {
                                    trackPostViews(post.id);
                                    startLoading();
                                }}>
                                    <figure className="flex-1 w-full max-w-[160px] h-[125px] object-cover overflow-hidden rounded-lg">
                                        <Image
                                            src={post.featuredImage.url || null}
                                            alt=""
                                            width={600}
                                            height={100}
                                            className="object-cover"
                                            style={{ width: '100%', height: "100%" }}
                                        />
                                    </figure>

                                    <div className="flex-1 space-y-2">
                                        <p className="text-xs text-my-text capitalize border border-my-muted-text px-3 py-1 w-fit rounded">{post.type}</p>
                                        <h2 className="text-base font-medium font-lora line-clamp-2 group-active:text-my-pink">{post.heading}</h2>

                                        <div className="text-sm text-my-muted-text line-clamp-2">
                                            {post.content.map((c, index) =>
                                                c.type === 'text' ? <p key={index}>{c.content}</p> : null
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )) : (
                        <p className="text-xs text-my-muted-text">No post found!</p>
                    )
                }
            </div>

            <div className="w-full h-10 flex items-center gri justify-center my-5 overflow-hidden">
                {loadingMore || loading ? (
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

export default Results;