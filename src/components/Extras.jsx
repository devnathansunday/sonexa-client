'use client'
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";

const Extras = () => {
    const { startLoading } = useLoading();

    return (
        <section>
            <div className="flex flex-col md:flex-row lg:flex-col gap-2">
                <div className="flex-1 space-y-2">
                    <div className="socials p-6 bg-black/25 rounded-xl">
                        <h4 className="font-bold text-sm mb-4">Follow Us</h4>
                        
                        <div className="flex items-center gap-4 my-2">
                            <a href="https://www.facebook.com/profile.php?id=61582635120782" target="_blank">
                                <figure className="w-7 h-7">
                                    <img src="/svgs/facebook.svg" className="w-full h-full" alt="" />
                                </figure>
                            </a>

                            <a href="https://www.instagram.com/sonexa_wave" target="_blank">
                                <figure className="w-7 h-7">
                                    <img src="/svgs/instagram.svg" className="w-full h-full" alt="" />
                                </figure>
                            </a>

                            <a href="https://www.x.com/sonexa_wave" target="_blank">
                                <figure className="w-7 h-7">
                                    <img src="/svgs/x.svg" alt="" className="w-full h-full" />
                                </figure>
                            </a>

                            <a href="#" target="_blank">
                                <figure className="w-7 h-7">
                                    <img src="/svgs/youtube.svg" alt="" className="w-full h-full" />
                                </figure>
                            </a>
                        </div>
                    </div>

                    <div className="p-6 bg-black/25 rounded-xl">
                        <h4 className="font-bold text-sm mb-2">Advertise With Us</h4>

                         <p className="text-3xl text-my-text my-6 font-medium">
                            Reach thousands of music lovers and grow your brand with Sonexa.
                        </p>

                        <Link href={'/advertise'}>
                            <button onClick={() => startLoading()} className="w-full bg-my-text text-my-dark font-medium py-3.5 px-4 rounded-lg transition">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
                
                <div className="newsletter w-full md:max-w-[300px] p-6 bg-black/25 rounded-xl">
                    <h4 className="font-bold text-sm mb-2">Newsletter</h4>

                    <p className="text-3xl text-my-text my-6 font-medium">Get weekly entertainment drops.</p>

                    <form className="hero">
                        <input type="email" placeholder="Email here..." className="w-full h-full mb-3 p-4 text-base outline-none border-[0.5] border-[#777] rounded-lg" />
                        <button className="w-full bg-my-yellow py-3.5 text-black rounded-lg cursor-pointer">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="my-3 p-6 bg-black/25 rounded-xl">
                <h4 className="font-bold text-sm mb-3">Categories</h4>
                
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