'use client'
import Image from "next/image";
import Link from "next/link";
import { useTrackView } from "@/context/TrackViewContext";
import { useLoading } from "@/context/LoadingContext";

const Latest = ({ sortedPosts }) => {
    if (!sortedPosts ) {
        return (
            <div className="w-full flex justify-center items-center p-10">
                <p className="text-my-pink">Failed to load posts, try reloading</p>
            </div>
        )
    }

    const { trackPostViews } = useTrackView();
    const { startLoading } = useLoading();

    const recentPosts = sortedPosts;
    const containerWidth = Math.min(recentPosts.length, 9) * 100 + '%';

    return (
        <section className="my-6 overflow-hidden">
            <div className="space-y-1.5 mb-4">
                <h3 className="font-bold text-xl">Latest</h3>

                <div className="flex items-center">
                    <hr className="w-10 h-[3px] bg-my-text border-none outline-none" />
                    <hr className="flex-1 h-[3px] bg-my-muted-text/60 border-none outline-none" />
                </div>
            </div>

            <div className="overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-x-3 mb-2" style={{ width: `${containerWidth}px` }}>
                    {recentPosts?.map(post => (
                        <article key={post.id} className="snap-center w-[80%] shrink-0 xs:w-[60%] sm:w-[45%] md:w-[35%] lg:w-[40%] xl:w-[35%] transform transition-all ease-out duration-100 active:scale-[98%] group">
                            <Link href={`/${post.type}/${post.slug}`} key={post.slug} className="w-full">
                                <div className="relative flex flex-col gap-2 hover:scale-[98%] transition-transform duration-300" onClick={() => {
                                    trackPostViews(post.id);
                                    startLoading();
                                }}>
                                    <figure className="w-full rounded-xl overflow-hidden">
                                        <Image
                                            src={post.featuredImage.url || null}
                                            alt=""
                                            width={600}
                                            height={200}
                                            className="object-cover transform transition-transform ease-out duration-200 hover:scale-105"
                                            style={{ width: '100%', height: '220px' }}
                
                                        />
                                    </figure>

                                    <p className={`absolute top-2 left-2 bg-my-text text-xs font-medium text-my-dark z-20 px-4 py-2 w-fit rounded-full shadow-md ${post.type === 'ep' ? 'uppercase' : 'capitalize'}`}>{post.type}</p>

                                    <h3 className="font-medium font-lora text-lg line-clamp-2 group-active:text-my-pink">{post.heading}</h3>
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