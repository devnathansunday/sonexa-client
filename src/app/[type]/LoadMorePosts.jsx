'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchPosts } from "@/lib/api/posts";
import { useTrackView } from "@/context/TrackViewContext";
import { useLoading } from "@/context/LoadingContext";

const LoadMorePosts = ({ initialPosts, type }) => {
    const { trackPostViews } = useTrackView();
    const { startLoading } = useLoading();

    const [noMorePosts, setNoMorePosts] = useState(!initialPosts.hasMore);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState(initialPosts.posts);
    
    const handleLoadMore = async () => {
        // console.log('loading more posts...')
        setLoading(true);

        const nextOffset = posts.length;
        const newPosts = await fetchPosts(nextOffset, 6, type);

        setPosts(prev => [...prev, ...newPosts.posts]);
        setNoMorePosts(!newPosts.hasMore);
        setLoading(false);
    };

    return (
        <div>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
                {posts.length > 0 && posts.map(post => (
                    <div key={post.slug} className="transform transition-all ease-out duration-100 active:scale-[98%] group">
                        <Link href={`/${post.type}/${post.slug}`} className="w-full">
                            <div className="mb-3 flex gap-3" onClick={() => {
                                trackPostViews(post.id);
                                startLoading();
                            }}>
                                <figure className="flex-1 w-full h-[120px] object-cover overflow-hidden rounded-xl">
                                    <Image
                                        src={post.featuredImage.url || null}
                                        alt=""
                                        width={600}
                                        height={300}
                                        className="object-cover"
                                        style={{ width: '100%', height: "100%" }}
                                    />
                                </figure>

                                <div className="flex-1 my-0.5 min-w-0">
                                    <p className="text-my-muted-text text-xs">{new Date(post.createdAt).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}</p>

                                    <h2 className="text-sm font-medium line-clamp-2 group-active:text-my-pink">{post.heading}</h2>

                                    <div className="text-sm text-my-muted-text line-clamp-3">
                                        {post.content.map((c, index) =>
                                            c.type === 'text' ? <p key={index}>{c.content}</p> : null
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="w-full h-10 flex items-center gri justify-center my-5 overflow-hidden">
                {loading ? (
                    <div className="loader"></div>
                ) : noMorePosts ? (
                    <p className="text-xs text-my-muted-text">No more posts.</p>
                ) : (
                    <button onClick={handleLoadMore} className="px-5 py-2 text-xs border border-my-text rounded cursor-pointer">Load more</button>
                )}
            </div>
        </div>
    )
}

export default LoadMorePosts;