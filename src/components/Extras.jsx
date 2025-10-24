'use client'
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";

const Extras = () => {
    const { startLoading } = useLoading();

    return (
        <section className="my-2">
            <div className="newsletter my-3 p-6 bg-black/25 rounded-xl">
                <h4 className="font-bold text-base mb-2">NEWSLETTER</h4>
                <hr className="flex-1 h-[2px] bg-my-content border-none outline-none" />

                <p className="text-3xl text-my-text font-lora my-6 font-medium">Get weekly entertainment drops.</p>

                <form className="hero">
                    <input type="email" placeholder="Email here..." className="w-full h-full mb-3 p-4 text-base outline-none border-[0.5] border-[#777] rounded" />
                    <button className="w-full bg-my-yellow py-3.5 text-black rounded cursor-pointer">Subscribe</button>
                </form>
            </div>

            <div className="socials my-2 p-6 bg-black/25 rounded-xl">
                <h4 className="font-bold text-base mb-2 ">FOLLOW US</h4>
                <hr className="flex-1 h-[2px] bg-my-content border-none outline-none" />

                <p className="text-3xl font-lora text-my-text my-6 font-medium">Stay connected on social media.</p>
                
                <div className="flex items-center gap-2 my-2">
                    <a href="https://www.facebook.com/profile.php?id=61582635120782" target="_blank">
                        <figure className="w-12 h-12 p-3 border border-my-text rounded-full">
                            <img src="/svgs/facebook.svg" className="w-full h-full" alt="" />
                        </figure>
                    </a>

                    <a href="https://www.instagram.com/sonexa_wave" target="_blank">
                        <figure className="w-12 h-12 p-3 border border-my-text rounded-full">
                            <img src="/svgs/instagram.svg" className="w-full h-full" alt="" />
                        </figure>
                    </a>

                    <a href="https://www.x.com/sonexa_wave" target="_blank">
                        <figure className="w-12 h-12 p-3 border border-my-text rounded-full">
                            <img src="/svgs/x.svg" alt="" className="w-full h-full" />
                        </figure>
                    </a>

                    <a href="#" target="_blank">
                        <figure className="w-12 h-12 p-3 border border-my-text rounded-full">
                            <img src="/svgs/youtube.svg" alt="" className="w-full h-full" />
                        </figure>
                    </a>
                </div>
            </div>

            <div className="my-3 p-6 bg-black/25 rounded-xl">
                <h4 className="font-bold text-sm mb-3">CATEGORIES</h4>
                
                <div className="text-sm text-my-blue flex flex-wrap gap-2">
                    <Link href='/song' className="w-fit"><button onClick={() => startLoading()} className="w-fit text-xs border border-my-blue px-6 py-2 rounded-full cursor-pointer">Songs</button></Link>
                    <Link href='/news' className="w-fit"><button onClick={() => startLoading()} className="w-fit text-xs border border-my-blue px-6 py-2 rounded-full cursor-pointer">News</button></Link>
                    <Link href='/video' className="w-fit"><button onClick={() => startLoading()} className="w-fit text-xs border border-my-blue px-6 py-2 rounded-full cursor-pointer">Videos</button></Link>
                    <Link href='/guide' className="w-fit"><button onClick={() => startLoading()} className="w-fit text-xs border border-my-blue px-6 py-2 rounded-full cursor-pointer">Guides</button></Link>
                </div>
            </div>
        </section>
    );
}

export default Extras;