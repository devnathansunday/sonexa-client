'use client'
import Image from "next/image";
import Link from "next/link";
import { useTrackView } from "@/context/TrackViewContext";

const Latest = ({ sortedPosts }) => {
    const { trackPostViews } = useTrackView();
    const recentPosts = sortedPosts;
    const containerWidth = Math.min(recentPosts.length, 9) * 100 + '%';

    return (
        <section className="my-6 overflow-hidden">
            <div className="flex items-center gap-1 mb-3">
                <h3 className="font-bold text-sm">LATEST</h3>
                <hr className="flex-1 h-0.5 bg-my-muted-text border-none" />
            </div>

            <div className="overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-x-3 mb-2" style={{ width: `${containerWidth}px` }}>
                    {recentPosts?.map(post => (
                        <article key={post.id} className="snap-center w-[90%] shrink-0 xs:w-[60%] sm:w-[45%] md:w-[35%] lg:w-[40%] xl:w-[35%]">
                            <Link href={`/${post.type}/${post.slug}`} key={post.slug} className="w-full">
                                <div className="flex flex-col gap-2" onClick={() => trackPostViews(post.id)}>
                                    <figure className="w-full rounded-xl overflow-hidden">
                                        <Image
                                            src={post.featuredImage.url || null}
                                            alt=""
                                            width={600}
                                            height={200}
                                            className="object-cover transform transition-transform ease-out duration-200 hover:scale-105"
                                            style={{ width: '100%', height: '250px' }}
                
                                        />
                                    </figure>

                                    <h3 className="text-medium line-clamp-1">{post.heading}</h3>
                                    <p className="text-xs text-my-muted-text">{new Date(post.createdAt).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}</p>
                                    <p className="text-xs text-my-text capitalize border border-my-muted-text px-3 py-1 w-fit rounded">{post.type}</p>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Latest;