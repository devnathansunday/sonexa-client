'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

const Nav = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    const router = useRouter();

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

    const handleSearch = () => {
        if (!query.trim()) return;
        router.push(`/search?query=${encodeURIComponent(query)}`);
        setSearchOpen(false);
    }

    return (
        <div className="relative bg-my-nav border-b-2 border-my-content">
            <div className="mx-auto max-w-[1280px]">
                <nav className="h-16 flex items-center justify-between px-3">
                    <Link href="/"><h1 className="font-extrabold text-xl">Sonexa</h1></Link>
                    
                    {/* desktop nav */}
                    <div className="hidden h-full md:flex md:items-center gap-12 font-bold text-sm text-my-muted-text">
                        <button className="w-fit hover:text-my-pink active:text-my-pink">
                            <Link href="/">Home</Link>
                        </button>

                        <div className="w-fit h-full cursor-pointer flex justify-center items-center relative hover:border-b hover:border-my-text group">
                            <button className="cursor-pointer">Categories</button>

                            <div className="absolute top-16 left-0 w-[225px] h-0 bg-my-content overflow-hidden group-hover:h-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                                <div className="flex flex-col">
                                    <Link href={`/song`} className="w-full p-3 text-start hover:bg-my-pink hover:text-my-text">
                                        Songs
                                        <p className="text-my-muted-text font-light text-xs">Browse music</p>
                                    </Link>

                                    <hr className="w-full h-[1px] outline-0 border-0 bg-my-muted-text/20" />

                                    <Link href={`/news`} className="w-full p-3 text-start hover:bg-my-pink hover:text-my-text">
                                        News
                                        <p className="text-my-muted-text font-light text-xs">See latest news</p>
                                    </Link>

                                    <hr className="w-full h-[1px] outline-0 border-0 bg-my-muted-text/20" />

                                    <Link href={`/video`} className="w-full p-3 text-start hover:bg-my-pink hover:text-my-text">
                                        Videos
                                        <p className="text-my-muted-text font-light text-xs">Browse videos</p>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <button className="w-fit hover:text-my-pink active:text-my-pink">
                            <Link href={`/video`}>About</Link>
                        </button>
                        <button className="w-fit hover:text-my-pink active:text-my-pink">
                            <Link href={`/guide`}>Contact</Link>
                        </button>
                        <button className="w-fit hover:text-my-pink active:text-my-pink">
                            <Link href={`/guide`}>Advertise with us</Link>
                        </button>
                    </div>

                    <div className="hidden lg:flex md:items-center bg-my-content overflow-hidden rounded-full">
                        <input 
                            type="text" 
                            ref={inputRef} 
                            value={query} 
                            name="search"
                            placeholder="Search..." 
                            className="border-none outline-none text-sm px-5 py-3 w-[200px] h-full" 
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />

                        <img src="/svgs/search.svg" className="pe-5 w-9 h-9" alt="" />
                    </div>

                    <div className="flex items-center gap-4 lg:hidden">
                        <div onClick={() => setSearchOpen(true)}>
                            <img src="/svgs/search.svg" alt="" />
                        </div>

                        <div className="hamburger flex flex-col justify-center gap-0.5 cursor-pointer md:hidden" onClick={() => setMenuOpen(true)}>
                            <div className="w-3 h-0.5 bg-my-text rounded-full"></div>
                            <div className="w-5 h-0.5 bg-my-text rounded-full"></div>
                            <div className="w-4 h-0.5 bg-my-text rounded-full"></div>
                        </div>
                    </div>
                </nav>

                {/* search box */}
                <div className={`search-box absolute top-0 w-full border-b-2 border-my-content bg-my-nav overflow-hidden opacity-0 transition-all duration-300 ${searchOpen ? 'h-full opacity-100' : 'h-0'}`}>
                    <div className="flex items-center h-14 w-full">
                        <input 
                            type="search" 
                            ref={inputRef} 
                            value={query} 
                            name="search"
                            placeholder="Search..." 
                            className="border-none outline-none text-sm px-3 py-1.5 w-full h-full" 
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />

                        <button className="h-full text-xs py-1.5 w-[100px]" onClick={() => setSearchOpen(false)}>Close</button>
                    </div>
                </div>

                {/* mobile menu */}
                <div className={`fixed -top-full left-0 right-0 bg-zinc-900 p-5 opacity-0 z-[1000] transition-all duration-300 ease-out ${menuOpen ? 'top-0 opacity-100 bottom-0' : ''}`}>
                    <div className="flex flex-col justify-center">
                        <div className="menu-heading mb-3 flex items-center justify-between">
                            <div>
                                <h4 className="font-extrabold">SONEXA</h4>
                                <p className="text-xs text-my-muted-text font-medium my-1">menu</p>
                            </div>
                            
                            <button onClick={closeMenu}>
                                <img src="/svgs/cancel.svg" alt="" />
                            </button>
                        </div>

                        <div className="flex flex-col justify-center gap-2 my-5 font-medium">
                            <button onClick={closeMenu} className="w-fit hover:text-my-pink active:text-my-pink">
                                <Link href="/">Home</Link>
                            </button>
                            <button onClick={closeMenu} className="w-fit hover:text-my-pink active:text-my-pink">
                                <Link href={`/song`}>Songs</Link>
                            </button>
                            <button onClick={closeMenu} className="w-fit hover:text-my-pink active:text-my-pink">
                                <Link href={`/news`}>News</Link>
                            </button>
                            <button onClick={closeMenu} className="w-fit hover:text-my-pink active:text-my-pink">
                                <Link href={`/video`}>Videos</Link>
                            </button>
                            <button onClick={closeMenu} className="w-fit hover:text-my-pink active:text-my-pink">
                                <Link href={`/guide`}>Guides</Link>
                            </button>
                        </div>

                        <div className="text-my-muted-text my-5">
                            <div className="flex items-center gap-3">
                                <Link onClick={closeMenu} href="/about">About</Link>
                                <hr className="w-1 h-1 rounded-full border-none bg-my-muted-text" />
                                <Link onClick={closeMenu} href="/contact">Contact</Link>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link onClick={closeMenu} href="/privacy">Privacy</Link>
                                <hr className="w-1 h-1 rounded-full border-none bg-my-muted-text" />
                                <Link onClick={closeMenu} href="/disclaimer">Disclaimer</Link>
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