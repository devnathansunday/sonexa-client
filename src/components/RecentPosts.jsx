'use client'
import { useRef, useState } from "react";
import Link from "next/link";
import Music from "./Music";
import News from "./News";
import Video from "./Video";
import { useLoading } from "@/context/LoadingContext";

const RecentPosts = ({ songs, news, videos }) => {
    const [active, setActive] = useState(0);
    const postsSectionRef = useRef(null);

    const { startLoading } = useLoading();

    const scrollToTopOfPosts = () => {
        postsSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }
    
    return (
        <div>
            <section ref={postsSectionRef} className="py-2 scroll-mt-[65px]">
                <h3 className="font-bold text-xl mb-2">Categorized</h3>

                <nav className="p-3 mb-2 block bg-my-dark sticky top-16 z-[99]">
                    <div className="category-nav flex items-center gap-5 text-xs tracking-widest">
                        <button className={`relative pb-1 transform scale-95 text-my-muted-text after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-my-yellow after:rounded-full after:h-[1.5px] after:w-0 after:transition-all after:duration-200 after:ease-out transition-all duration-300 ease-out overflow-hidden ${active === 0 ? 'after:w-3/4 text-my-text scale-100' : ''}`} onClick={() => {setActive(0), scrollToTopOfPosts()}}>Music</button>
                        <button className={`relative pb-1 transform scale-95 text-my-muted-text after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-my-yellow after:rounded-full after:h-[1.5px] after:w-0 after:transition-all after:duration-200 after:ease-out transition-all duration-300 ease-out overflow-hidden ${active === 1 ? 'after:w-3/4 text-my-text scale-100' : ''}`} onClick={() => {setActive(1), scrollToTopOfPosts()}}>News</button>
                        <button className={`relative pb-1 transform scale-95 text-my-muted-text after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-my-yellow after:rounded-full after:h-[1.5px] after:w-0 after:transition-all after:duration-200 after:ease-out transition-all duration-300 ease-out overflow-hidden ${active === 2 ? 'after:w-3/4 text-my-text scale-100' : ''}`} onClick={() => {setActive(2), scrollToTopOfPosts()}}>Videos</button>
                    </div>
                </nav>
                
                <div className="bg-my-dark p-3">
                    {active === 0 ? (<div className="flex flex-col gap-2">
                        <Music posts={songs} />

                        <Link href={`/song`} className="ms-auto"><button onClick={() => startLoading()} className="mx-3 my-2 px-5 h-8 border text-end text-xs w-fit rounded-full cursor-pointer transform transition-all ease-out duration-100 active:scale-[98%]">More</button></Link>
                    </div>)

                        : active === 1 ?

                    (<div className="flex flex-col gap-2">
                        <News posts={news} />

                        <Link href={`/news`} className="ms-auto"><button onClick={() => startLoading()} className="mx-3 my-2 px-5 h-8 border text-end text-xs w-fit rounded-full cursor-pointer transform transition-all ease-out duration-100 active:scale-[98%]">More</button></Link>
                    </div>)

                        :

                    (<div className="flex flex-col gap-2">
                        <Video posts={videos} />

                        <Link href={`/video`} className="ms-auto"><button onClick={() => startLoading()} className="mx-3 my-2 px-5 h-8 border text-end text-xs w-fit rounded-full cursor-pointer transform transition-all ease-out duration-100 active:scale-[98%]">More</button></Link>
                    </div>)
                    }
                </div>
            </section>
        </div>
    );
}

export default RecentPosts;