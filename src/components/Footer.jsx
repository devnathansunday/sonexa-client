'use client'
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";

const Footer = () => {
    const { startLoading } = useLoading();

    return (
        <section className="my-6 p-4 bg-black/25">
            <div className="mx-auto max-w-[1200px]">
                <div className="mx-3">
                    <div className="my-10">
                        <h2 className="text-2xl font-bold">Sonexa</h2>
                        <p>Entertainment for all.</p>
                    </div>
                    
                    <div className="my-10 flex flex-col xs:flex-row xs:flex-wrap gap-x-32 gap-y-10 xs:gap-y-14">
                        <div>
                            <h4 className="font-bold text-lg my-1">Links</h4>
                            <div className="text-base text-my-muted-text flex flex-col gap-0.5">
                                <Link href={'/'}>
                                    <button onClick={() => startLoading()} className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Home</button>
                                </Link>

                                <Link href={'/contact'}>
                                    <button onClick={() => startLoading()} className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Contact Us</button>
                                </Link>

                                <Link href={'/about'}>
                                    <button onClick={() => startLoading()} className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">About</button>
                                </Link>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-bold my-1">Socials</h4>
                            <div className="text-base text-my-muted-text flex flex-col gap-0.5">
                                <a href="https://www.facebook.com/profile.php?id=61582635120782" target="_blank">
                                    <button className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Facebook</button>
                                </a>

                                <a href="https://www.x.com/sonexa_wave" target="_blank">
                                    <button className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">X (formerly twitter)</button>
                                </a>

                                <a href="https://www.instagram.com/sonexa_wave" target="_blank">
                                    <button className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Instagram</button>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold my-1">Blog</h4>
                            <div className="text-base text-my-muted-text flex flex-col gap-0.5">
                                <Link href={'/advertise'}>
                                    <button onClick={() => startLoading()} className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Promote/Advertise</button>
                                </Link>

                                <Link href={'/privacy'}>
                                    <button onClick={() => startLoading()} className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Privacy Policy</button>
                                </Link>

                                <Link href={'/disclaimer'}>
                                    <button onClick={() => startLoading()} className="w-fit hover:text-my-pink active:text-my-pink cursor-pointer">Disclaimer</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <p className="my-10 text-sm text-my-muted-text">© Sonexa 2025, all rights reserved.</p>
                </div>
            </div>
        </section>
    )
}

export default Footer;