"use client";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Link from "next/link";
import Image from "next/image";
import { useTrackView } from "@/context/TrackViewContext";
import { useLoading } from "@/context/LoadingContext";

const Featured = ({ posts }) => {
    if (!posts ) {
        return (
            <div className="w-full flex justify-center items-center p-10">
                <p className="text-my-pink">Failed to load posts, try reloading</p>
            </div>
        )
    }

    const { trackPostViews } = useTrackView();
    const { startLoading } = useLoading();

    const originalSlides = posts;

    const slides =
        originalSlides.length > 0
            ? [
                originalSlides[originalSlides.length - 1],
                ...originalSlides,
                originalSlides[0],
                ]
            : [];

    const [currentIndex, setCurrentIndex] = useState(1);
    const [transition, setTransition] = useState(true);
    const timeoutRef = useRef(null);

    const slideWidth = 100 / slides.length;

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        }, 5000);

        return () => clearTimeout(timeoutRef.current);
    }, [currentIndex]);

    useEffect(() => {
        if (currentIndex === slides.length - 1) {
        setTimeout(() => {
            setTransition(false);
            setCurrentIndex(1);
        }, 500);
        }

        if (currentIndex === 0) {
        setTimeout(() => {
            setTransition(false);
            setCurrentIndex(slides.length - 2);
        }, 500);
        }
    }, [currentIndex, slides.length]);

    useEffect(() => {
        if (!transition) {
            setTimeout(() => setTransition(true), 20);
        }
    }, [transition]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        resetInterval();
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        resetInterval();
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    const resetInterval = () => {
        if (timeoutRef.current) clearInterval(timeoutRef.current);
        timeoutRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
    };

    return (
        <section className="featured-posts relative w-full overflow-hidden rounded-xl transform transition-all ease-out duration-100 active:scale-[98%] group">
            <div className="absolute top-3 left-3 z-30 flex items-center bg-my-text p-2 rounded-full">
                <img src="/svgs/fire.svg" alt="" />
            </div>

            {slides.length > 0 ? (
                <div
                    {...swipeHandlers}
                    className="flex"
                    style={{
                        width: `${slides.length * 100}%`,
                        transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
                        transition: transition ? "transform 0.5s ease-in-out" : "none",
                    }}
                >
                    {slides.map((slide, index) => (
                        <article
                        key={index}
                        className="shrink-0 w-full cursor-pointer"
                        style={{ width: `${slideWidth}%` }}
                    >
                        <Link href={`/${slide?.type}/${slide.slug}`} key={slide.slug} className="w-full">
                            <div className="post relative w-full rounded-xl overflow-hidden" onClick={() => {
                                trackPostViews(slide.id);
                                startLoading();
                            }}>
                                <figure className="w-full overflow-hidden">
                                    <Image
                                        src={slide.featuredImage.url || null}
                                        alt=""
                                        width={600}
                                        height={300}
                                        className="object-cover w-full h-[350px] md:h-[350px]"
                                    />
                                </figure>
                                
                                <div className="px-4 py-6 pb-14 h-[150px] bg-black/40">
                                    <p className={`text-xs text-my-yellow font-extrabold uppercase rounded-br ${slide.type === 'ep' ? 'uppercase' : ''}`}>{slide.type}</p>
                                    
                                    <h3 className="font-semibold text-my-text text-xl font-lora line-clamp-2 group-active:text-my-pink">{slide.heading}</h3>
                                </div>
                            </div>
                        </Link>
                    </article>
                    ))}
                </div>
            ) : (
                <p>No featured posts</p>
            )}

            <div className="indicators absolute right-5 bottom-5 flex items-center justify-center gap-1 mt-5">
                {originalSlides.map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            i + 1 === currentIndex ? "bg-my-pink" : "bg-my-muted-text"
                        }`}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default Featured;
