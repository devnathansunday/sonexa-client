import Link from "next/link";

const Footer = () => {
    return (
        <section className="my-3 p-6 bg-black/25">
            <div className="mx-auto max-w-[1280px]">
                <div className="mx-3">
                    <div className="my-10 flex flex-wrap gap-x-[30%] md:gap-x-[15%] gap-y-6">
                        <div>
                            <h4 className="font-bold my-1">Links</h4>
                            <div className="text-sm text-my-muted-text flex flex-col gap-0.5">
                                <button className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Home</button>
                                <button className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Contact Us</button>
                                <button className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">About</button>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-bold my-1">Socials</h4>
                            <div className="text-sm text-my-muted-text flex flex-col gap-0.5">
                                <button className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Facebook</button>
                                <button className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">X (formerly twitter)</button>
                                <button className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Instagram</button>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold my-1">Blog</h4>
                            <div className="text-sm text-my-muted-text flex flex-col gap-0.5">
                                <button className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Promote/Advertise</button>
                                <button className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Privacy Policy</button>
                                <button className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Disclaimer</button>
                            </div>
                        </div>
                    </div>

                    <p className="my-10 text-xs text-my-muted-text">© Sonexa 2025, all rights reserved.</p>
                </div>
            </div>
        </section>
    )
}

export default Footer;