'use client'
import Image from "next/image";
import Link from "next/link";
import { useTrackView } from "@/context/TrackViewContext";

const Music = ({ posts }) => {
    const { trackPostViews } = useTrackView();
    const musicPosts = posts?.posts;
    
    return (
        <div className="mx-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {musicPosts.length > 0 ? musicPosts.map(post => (
                <article key={post.id} className="featured-post relative p-4 border border-my-content rounded-xl cursor-pointer">
                    <Link href={`/${post.type}/${post.slug}`} key={post.slug} className="w-full">
                        <div onClick={() => trackPostViews(post.id)}>
                            <figure className="w-full rounded-xl overflow-hidden">
                                <Image
                                    src={post.featuredImage.url || null}
                                    alt=""
                                    width={600}
                                    height={200}
                                    className="object-cover h-[200px] lg:h-[175px] transform transition-transform ease-out duration-200 hover:scale-105"
                                    style={{ width: '100%' }}
                                />
                            </figure>
        
                            <div className="content py-3 flex flex-col gap-1 backdrop-blur-xs">
                                <h3 className="font-medium line-clamp-2">{post.heading}</h3>
        
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-my-muted-text">{new Date(post.createdAt).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </article>
            )) : (
                <p className="mx-3 my-5 text-sm text-my-muted-text items-center">No posts</p>
            )}
        </div>
    );
}

export default Music;