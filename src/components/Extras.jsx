import Link from "next/link";

const Extras = () => {
    return (
        <section className="my-2">
            <div className="newsletter my-3 p-6 bg-black/25 rounded-xl">
                <h4 className="font-bold text-sm">NEWSLETTER</h4>
                <p className="text-sm text-my-text mb-4 font-light">Get weekly entertainment drops.</p>

                <form className="hero">
                    <input type="email" placeholder="Email here..." className="w-full h-full mb-2 p-4 text-sm outline-none border-[0.5] border-my-content" />
                    <button className="w-full bg-my-yellow py-3 text-black rounded">Subscribe</button>
                </form>
            </div>

            <div className="socials my-2 p-6 bg-black/25 rounded-xl">
                <h4 className="font-bold text-sm">FOLLOW US</h4>
                <p className="text-sm text-my-text mb-4 font-light">Stay connected on social media.</p>
                
                <div className="flex items-center gap-2 my-2">
                    <a href="#" target="_blank">
                        <figure className="w-12 h-12 p-3 border border-my-text rounded-full">
                            <img src="/svgs/facebook.svg" className="w-full h-full" alt="" />
                        </figure>
                    </a>

                    <a href="#" target="_blank">
                        <figure className="w-12 h-12 p-3 border border-my-text rounded-full">
                            <img src="/svgs/instagram.svg" className="w-full h-full" alt="" />
                        </figure>
                    </a>

                    <a href="#" target="_blank">
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
                    <Link href='/song' className="w-fit"><button className="w-fit border border-my-blue px-6 py-2 rounded-full cursor-pointer">Songs</button></Link>
                    <Link href='/news' className="w-fit"><button className="w-fit border border-my-blue px-6 py-2 rounded-full cursor-pointer">News</button></Link>
                    <Link href='/video' className="w-fit"><button className="w-fit border border-my-blue px-6 py-2 rounded-full cursor-pointer">Videos</button></Link>
                    <Link href='/guide' className="w-fit"><button className="w-fit border border-my-blue px-6 py-2 rounded-full cursor-pointer">Guides</button></Link>
                </div>
            </div>
        </section>
    );
}

export default Extras;