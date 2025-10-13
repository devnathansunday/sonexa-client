'use client'
import Link from "next/link";
import Image from "next/image";
import { useTrackView } from "@/context/TrackViewContext";
import { useEffect, useState } from "react";
import { getRelatedPosts } from "@/lib/api/posts";

export default function RelatedPosts({ postId }) {
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    const { trackPostViews } = useTrackView();

    useEffect(() => {
        const fetchPosts = async() => {
            try {
                setLoading(true);
                const posts = await getRelatedPosts(postId);
                setRelated(posts);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, [postId]);

    if (!related) {
        return (
        <div className="w-full flex justify-center items-center p-10">
            <p className="text-my-pink">Failed to load posts, try reloading</p>
        </div>
        )
    }

    return (
        <div className="mt-10 bg-my-dark p-3 rounded">
            <h4 className="text-xl font-bold mb-3">Related</h4>

            <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {loading ? (
                    <div className="loader"></div>
                )
                
                : related.length > 0 ? related?.map(post => (
                    <Link href={`/guides/${post.slug}`} key={post.slug} className="transform transition-all ease-out duration-100 active:scale-[98%] group">
                        <div className="flex gap-3 relative" onClick={() => trackPostViews(post.id)}>
                            <p className={`px-3 py-1 bg-my-pink shadow-lg rounded-full absolute top-1.5 left-1.5 text-xs ${post.type === 'ep' ? 'uppercase' : 'capitalize'}`}>{post.type}</p>
                            <figure className="flex-1 w-full max-w-[140px] h-[100px] lg:h-[100px] object-cover overflow-hidden rounded-xl">
                                <Image
                                    src={post.featuredImage?.url}
                                    alt=""
                                    width={400}
                                    height={300}
                                    className="object-cover"
                                    style={{ width: '100%', height: "100%" }}
                                />
                            </figure>

                            <div className="flex-1 my-1">
                                <h2 className="text-base font-medium line-clamp-2 md:line-clamp-2 group-active:text-my-pink">{post.heading}</h2>

                                <div className="text-sm text-my-muted-text line-clamp-2 md:line-clamp-2">
                                    {post.content?.map((c, index) =>
                                        c.type === 'text' ? <p key={index}>{c.content}</p> : null
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                    )) : (
                        <p className="mx-3 my-5 text-sm text-my-muted-text items-center">No posts</p>
                    )
                }
            </div>
        </div>
    )
}