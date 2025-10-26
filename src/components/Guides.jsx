'use client'
import Image from "next/image";
import Link from "next/link";
import { useTrackView } from "@/context/TrackViewContext";
import { useLoading } from "@/context/LoadingContext";

const Guides = ({ guides }) => {
    if (!guides ) {
        return (
        <div className="w-full flex justify-center items-center p-10">
            <p className="text-my-pink">Failed to load posts, try reloading</p>
        </div>
        )
    }
    
    const { trackPostViews } = useTrackView();
    const { startLoading } = useLoading();

    return (
        <section className="p-4 bg-black/25 rounded-xl">
            <div className="w-full flex items-center justify-between mb-2">
                <h2 className="capitalize font-bold text-xl rounded">Guides</h2>
                <Link href={`/guide`} className="ms-auto">
                    <button onClick={() => startLoading()} className="text-xs rounded-full py-1 px-3 border text-my-text cursor-pointer active:scale-95">
                        more
                    </button>
                </Link>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {guides?.posts?.length > 0 ? guides.posts.map(guide => (
                    <Link href={`/guides/${guide.slug}`} key={guide.slug} className="transform transition-all ease-out duration-100 active:scale-[98%] group">
                        <div className="flex gap-3" onClick={() => {
                            trackPostViews(guide.id);
                            startLoading();
                        }}>
                            <figure className="flex-1 w-full max-w-[140px] h-[100px] lg:h-[100px] object-cover overflow-hidden rounded-xl">
                                <Image
                                    src={guide.featuredImage.url}
                                    alt=""
                                    width={400}
                                    height={300}
                                    className="object-cover"
                                    style={{ width: '100%', height: "100%" }}
                                />
                            </figure>

                            <div className="flex-1">
                                <h2 className="text-base font-medium mb-1 font-lora line-clamp-2 md:line-clamp-2 group-active:text-my-pink">{guide.heading}</h2>

                                <div className="text-base text-my-muted-text line-clamp-2 md:line-clamp-2">
                                    {guide.content.map((c, index) =>
                                        c.type === 'text' ? <p key={index}>{c.content}</p> : null
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                )) : (
                    <p className="my-5 text-sm text-my-muted-text items-center">No posts</p>
                )}
            </div>
        </section>
    )
}

export default Guides;