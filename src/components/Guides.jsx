'use client'
import Image from "next/image";
import Link from "next/link";
import { useTrackView } from "@/context/TrackViewContext";

const Guides = ({ guides }) => {
    const { trackPostViews } = useTrackView();

    return (
        <section className="my-3 p-4 bg-black/25 rounded-xl">
            <div className="w-full flex items-center justify-between mb-2">
                <h3 className="capitalize font-bold text-sm">GUIDES</h3>
                <Link href={`/guide`} className="ms-auto">
                    <button className="text-xs text-my-muted-text cursor-pointer active:text-my-pink">
                        {`more >>`}
                    </button>
                </Link>
            </div>

            <hr className="w-full h-[1px] bg-my-content border-none mb-3" />
            
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
                {guides?.posts?.length > 0 ? guides.posts.map(guide => (
                    <Link href={`/guides/${guide.slug}`} key={guide.slug}>
                        <div className="flex gap-3" onClick={() => trackPostViews(guide.id)}>
                            <figure className="flex-1 w-full max-w-[200px] h-[125px] lg:h-[100px] object-cover overflow-hidden rounded-xl">
                                <Image
                                    src={guide.featuredImage.url}
                                    alt=""
                                    width={600}
                                    height={200}
                                    className="object-cover"
                                    style={{ width: '100%', height: "100%" }}
                                />
                            </figure>

                            <div className="flex-1 my-1">
                                <h2 className="text-sm font-medium line-clamp-2 md:line-clamp-2">{guide.heading}</h2>

                                <div className="text-sm text-my-muted-text line-clamp-3 md:line-clamp-2">
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