'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";

const Nav = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    const router = useRouter();

    const { startLoading } = useLoading();

    useEffect(() => {
        if (searchOpen && inputRef.current) {
            inputRef.current?.focus();
        } else if (!searchOpen) {
            setQuery('')
        }
    }, [searchOpen]);

    useEffect(() => {
        const close = (e) => {
            if (!inputRef.current?.contains(e.target)) setSearchOpen(false);
        }

        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => document.body.classList.remove('overflow-hidden');
    }, [menuOpen]);

    const closeMenu = () => {
        setMenuOpen(false);
    }

    const handleSearch = (e) => {
        startLoading();

        if (!query.trim()) return;

        router.push(`/search?query=${encodeURIComponent(query)}`);
        setSearchOpen(false);
    }

    return (
        <div className="relative bg-my-nav border-b-2 border-my-content">
            <div className="mx-auto relative max-w-[1200px]">
                <nav className="h-16 flex items-center justify-between px-3">
                    <a href="/" className="overflow-hidden flex items-center">
                        <img src="/icons/sonexa.svg" alt="logo" className="w-5 h-5" />
                        <p className="font-extrabold text-xl uppercase">ONEXA</p>
                    </a>
                    
                    {/* desktop nav */}
                    <div className="hidden h-full lg:flex md:items-center gap-10 font-bold text-base text-[#d7d7d7]">
                        <Link href="/">
                            <button onClick={() => startLoading()} className="w-fit uppercase hover:text-my-pink active:text-my-pink cursor-pointer">
                                Home
                            </button>
                        </Link>

                        <div className="w-fit h-full cursor-pointer flex justify-center items-center relative hover:border-b hover:border-my-text hover:text-my-pink group">
                            <button className="cursor-pointer uppercase">Explore</button>

                            <div className="absolute top-16 left-0 w-[225px] h-0 bg-my-content overflow-hidden group-hover:h-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out text-my-text">
                                <div className="flex flex-col">
                                    <Link href={`/song`}>
                                        <button onClick={() => startLoading()} className="w-full p-3 text-start hover:bg-my-dark hover:text-my-text cursor-pointer">
                                            Songs
                                            <p className="text-my-muted-text font-light text-xs">Browse music</p>
                                        </button>
                                    </Link>

                                    <hr className="w-full h-[1px] outline-0 border-0 bg-my-muted-text/20" />

                                    <Link href={`/news`}>
                                        <button onClick={() => startLoading()} className="w-full p-3 text-start hover:bg-my-dark hover:text-my-text cursor-pointer">
                                            News
                                            <p className="text-my-muted-text font-light text-xs">See latest news</p>
                                        </button>
                                    </Link>

                                    <hr className="w-full h-[1px] outline-0 border-0 bg-my-muted-text/20" />

                                    <Link href={`/video`}>
                                        <button onClick={() => startLoading()} className="w-full p-3 text-start hover:bg-my-dark hover:text-my-text cursor-pointer">
                                            Videos
                                            <p className="text-my-muted-text font-light text-xs">Browse videos</p>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href={`/about`}>
                            <button onClick={() => startLoading()} className="w-fit uppercase hover:text-my-pink active:text-my-pink cursor-pointer">
                                About
                            </button>
                        </Link>

                        <Link href={`/contact`}>
                            <button onClick={() => startLoading()} className="w-fit uppercase hover:text-my-pink active:text-my-pink cursor-pointer">
                                Contact
                            </button>
                        </Link>

                        <Link href={`/advertise`}>
                            <button onClick={() => startLoading()} className="w-fit uppercase hover:text-my-pink active:text-my-pink cursor-pointer">
                                Advertise with us
                            </button>
                        </Link>
                    </div>


                    <div className="flex items-center gap-5">
                        <Link href={`/advertise`} className="flex justify-center items-center active:scale-95">
                            <button onClick={() => startLoading()} className="cursor-pointer">
                                <img src="/icons/megaphone.svg" alt="" className="w-5.5 h-5.5" />
                            </button>
                        </Link>

                        <div onClick={() => setSearchOpen(true)} className="cursor-pointer active:scale-95">
                            <img src="/svgs/search.svg" alt="" className="w-5.5 h-5.5" />
                        </div>

                        <div className="hamburger flex flex-col justify-center gap-[3px] cursor-pointer lg:hidden" onClick={() => setMenuOpen(true)}>
                            <div className="w-4 h-0.5 bg-my-text rounded-full"></div>
                            <div className="w-6 h-0.5 bg-my-text rounded-full"></div>
                            <div className="w-5 h-0.5 bg-my-text rounded-full"></div>
                        </div>
                    </div>
                </nav>

                {/* search box */}
                <div className={`search-box px-3 absolute top-0 w-full border-b-2 border-my-content bg-my-nav overflow-hidden opacity-0 transition-all duration-300 ${searchOpen ? 'h-full opacity-100' : 'h-0'}`}>
                    <div className="flex items-center h-14 w-full">
                        <input 
                            type="search" 
                            ref={inputRef}
                            value={query} 
                            name="search"
                            placeholder="Search..." 
                            className="border-none outline-none text-sm py-1.5 w-full h-full" 
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                    e.target.blur();
                                    handleSearch();
                                }
                            }}
                        />

                        <button className="h-full text-xs py-1.5 cursor-pointer" onClick={() => setSearchOpen(false)}>Close</button>
                    </div>
                </div>

                {/* mobile menu */}
                <div className={`fixed -top-full left-0 right-0 bg-zinc-900 p-5 opacity-0 z-[1000] transition-all duration-300 ease-out ${menuOpen ? 'top-0 opacity-100 bottom-0' : ''}`}>
                    <div className="menu-heading mb-3 flex items-center justify-between">
                        <div>
                            <h4 className="font-extrabold text-lg">SONEXA</h4>
                            <p className="text-xs text-my-muted-text font-medium my-1">menu</p>
                        </div>
                        
                        <button onClick={closeMenu}>
                            <img src="/svgs/cancel.svg" alt="" />
                        </button>
                    </div>

                    <div className="w-full h-full flex flex-col">
                        <div className="flex flex-col justify-center gap-2 my-5 font-medium">
                            <Link href="/">
                                <button onClick={() => {
                                    closeMenu();
                                    startLoading();
                                }} className="w-fit uppercase text-my-text hover:text-my-pink active:text-my-pink">
                                    Home
                                </button>
                            </Link>
                            <Link href={`/song`}>
                                <button onClick={() => {
                                    closeMenu();
                                    startLoading();
                                }} className="w-fit uppercase text-my-text hover:text-my-pink active:text-my-pink">
                                    Songs
                                </button>
                            </Link>
                            <Link href={`/news`}>
                                <button onClick={() => {
                                    closeMenu();
                                    startLoading();
                                }} className="w-fit uppercase text-my-text hover:text-my-pink active:text-my-pink">
                                    News
                                </button>
                            </Link>
                            <Link href={`/video`}>
                                <button onClick={() => {
                                    closeMenu();
                                    startLoading();
                                }} className="w-fit uppercase text-my-text hover:text-my-pink active:text-my-pink">
                                    Videos
                                </button>
                            </Link>
                            <Link href={`/guide`}>
                                <button onClick={() => {
                                    closeMenu();
                                    startLoading();
                                }} className="w-fit uppercase text-my-text hover:text-my-pink active:text-my-pink">
                                    Guides
                                </button>
                            </Link>
                        </div>

                        <div className="text-my-muted-text my-5">
                            <div className="flex items-center gap-3">
                                <Link onClick={closeMenu} href="/about" className="active:text-my-pink">
                                    <button onClick={() => startLoading()}>About</button>
                                </Link>
                                <hr className="w-1 h-1 rounded-full border-none bg-my-muted-text" />
                                <Link onClick={closeMenu} href="/contact" className="active:text-my-pink">
                                    <button onClick={() => startLoading()}>Contact</button>
                                </Link>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link onClick={closeMenu} href="/privacy" className="active:text-my-pink">
                                    <button onClick={() => startLoading()}>Privacy</button>
                                </Link>
                                <hr className="w-1 h-1 rounded-full border-none bg-my-muted-text" />
                                <Link onClick={closeMenu} href="/disclaimer" className="active:text-my-pink">
                                    <button onClick={() => startLoading()}>Disclaimer</button>
                                </Link>
                            </div>
                        </div>

                        <button onClick={closeMenu} className="cta my-5 bg-my-yellow text-my-bg py-2 font-bold rounded">PROMOTE/ADV</button>

                        <div className="subscribe mt-5">
                            <div className="heading flex items-center gap-1">
                                <hr className="w-full h-0.5 rounded-full border-none bg-my-text" />
                                <span className="font-bold">Subscribe</span>
                                <hr className="w-full h-0.5 rounded-full border-none bg-my-text" />
                            </div>

                            <input type="email" placeholder="Enter your email" className="p-3 bg-my-bg w-full my-3 rounded border-[0.5px] border-my-content outline-none" required />

                            <button className="bg-black w-full py-3 rounded">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;