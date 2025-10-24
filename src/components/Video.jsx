'use client'
import Image from "next/image";
import Link from "next/link";
import { useTrackView } from "@/context/TrackViewContext";
import { useLoading } from "@/context/LoadingContext";

const Video = ({ posts }) => {
    if (!posts ) {
        return (
        <div className="w-full flex justify-center items-center p-10">
            <p className="text-my-pink">Failed to load posts, try reloading</p>
        </div>
        )
    }
    const { trackPostViews } = useTrackView();
    const { startLoading } = useLoading();
    const videoPosts = posts?.posts;

    return (
        <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 md:grid-cols-4">
            {videoPosts.length > 0 ? videoPosts.map(post => (
                <article key={post.id} className="featured-post relative cursor-pointer transform transition-all ease-out duration-100 active:scale-[98%] group">
                    <Link href={`/${post.type}/${post.slug}`} key={post.slug} className="w-full">
                        <div onClick={() => {
                            trackPostViews(post.id);
                            startLoading();
                        }}>
                            <figure className="w-full rounded overflow-hidden">
                                <Image
                                    src={post.featuredImage.url || null}
                                    alt=""
                                    width={600}
                                    height={100}
                                    className="object-cover h-[100px] sm:h-[120px] transform transition-transform ease-out duration-200 hover:scale-105"
                                    style={{ width: '100%' }}
                                />
                            </figure>
        
                            <div className="content py-3 flex flex-col gap-1 backdrop-blur-xs">
                                <p className={`px-3 py-1 border w-fit rounded text-xs ${post.type === 'ep' ? 'uppercase' : 'capitalize'}`}>{post.type === 'song' ? 'single' : post.type}</p>
                                <h3 className="font-medium font-lora line-clamp-2 text-sm group-active:text-my-pink">{post.heading}</h3>
        
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

export default Video;