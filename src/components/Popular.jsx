'use client'
import Image from "next/image";
import Link from "next/link";
import { useTrackView } from "@/context/TrackViewContext";

const Popular = ({ popularPosts }) => {
    const { trackPostViews } = useTrackView();

    return (
        <section className="mx-auto max-w-[1280px]">
            <div className="m-3 p-3 bg-my-dark">
                <h2 className="capitalize font-bold text-sm mb-3 rounded">Popular</h2>

                <div className="grid gap-y-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                    {popularPosts.length > 0 && popularPosts.map(post => (
                        <Link href={`/${post.type}/${post.slug}`} key={post.id} className="flex-1">
                            <div className="flex gap-3" onClick={() => trackPostViews(post.id)}>
                                <figure className="flex-1 w-full max-w-[200px] h-[125px] xs:h-[150px] sm:h-[125px] object-cover overflow-hidden rounded-xl">
                                    <Image
                                        src={post.featuredImage.url}
                                        alt=""
                                        width={600}
                                        height={200}
                                        className="object-cover"
                                        style={{ width: '100%', height: "100%" }}
                                    />
                                </figure>

                                <div className="flex-1 space-y-1 my-1">
                                    <p className="text-xs text-my-text capitalize border border-my-muted-text px-3 py-1 w-fit rounded">{post.type}</p>
                                    <h2 className="text-sm font-medium line-clamp-3 xs:line-clamp-4 sm:line-clamp-3">{post.heading}</h2>
                                    <p className="text-my-muted-text text-xs">{new Date(post.createdAt).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}</p>
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