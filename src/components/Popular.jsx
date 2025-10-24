'use client'
import Image from "next/image";
import Link from "next/link";
import { useTrackView } from "@/context/TrackViewContext";
import { useLoading } from "@/context/LoadingContext";

const Popular = ({ popularPosts }) => {
    if (!popularPosts ) {
        return (
            <div className="w-full flex justify-center items-center p-10">
                <p className="text-my-pink">Failed to load posts, try reloading</p>
            </div>
        )
    }

    const { trackPostViews } = useTrackView();
    const { startLoading } = useLoading();

    return (
        <section className="mx-auto max-w-[1280px]">
            <div className="m-3 p-6 bg-my-dark">
                <h2 className="capitalize font-bold text-xl mb-3 rounded">Popular</h2>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {popularPosts.length > 0 && popularPosts.map(post => (
                        <Link href={`/${post.type}/${post.slug}`} key={post.id} className="flex-1 transform transition-all ease-out duration-100 active:scale-[98%] group">
                            <div className="flex gap-3" onClick={() => {
                                trackPostViews(post.id);
                                startLoading();
                            }}>
                                <figure className="flex-1 w-full max-w-[180px] h-[125px] object-cover overflow-hidden rounded-lg">
                                    <Image
                                        src={post.featuredImage.url}
                                        alt=""
                                        width={400}
                                        height={100}
                                        className="object-cover"
                                        style={{ width: '100%', height: "100%" }}
                                    />
                                </figure>

                                <div className="flex-1 space-y-1 my-0.5 min-w-0">
                                    <p className="text-xs text-my-text capitalize border border-my-muted-text px-3 py-1 w-fit rounded">{post.type}</p>
                                    
                                    <h2 className="text-base font-lora font-medium line-clamp-2 group-active:text-my-pink">{post.heading}</h2>

                                    <div className="text-sm text-my-muted-text line-clamp-2">
                                        {post.content.map((c, index) =>
                                            c.type === 'text' ? <p key={index}>{c.content}</p> : null
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Popular;