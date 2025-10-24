'use client'
import { useEffect } from "react";
import Image from "next/image";

const PostContent = ({ post, postHeading, postUrl }) => {
    useEffect(() => {
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
    }, [post]);

    return (
        <section className="space-y-2 mb-16">
            <h2 className="font-semibold font-lora text-4xl">{post.heading}</h2>
            <p className="date text-sm mb-4 text-my-text">{new Date(post.createdAt).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })}</p>

            <figure className="w-full h-[300px] xs:h-[350px] md:h-[400px] mb-5 overflow-hidden rounded-xl">
                <img src={post.featuredImage.url} className="w-full h-full object-cover" alt="" />
            </figure>

            <div className="space-y-6">
                {post.content.length > 0 && 
                    post.content.map((block, i) => {
                        if (block.type === 'text') return <p key={i}>{block.content}</p>;

                        if (block.type === 'quote') return <blockquote key={i} className="italic border-l-2 border-[#777] p-3 bg-my-content rounded-e-lg my-3 text-my-text">{block.content}</blockquote>;

                        if (block.type === 'image') return (
                            <figure key={i} className="justify-center w-full h-auto max-w-[500px] mx-auto overflow-hidden rounded-xl">
                                <Image 
                                width={600}
                                height={300}
                                src={block.content.url} 
                                alt="" 
                                className="w-full h-auto object-contain" style={{ width: block.content.width, height: 'auto' }} 
                                />
                            </figure>
                        );

                        if (block.type === 'link') {
                            const url = block.url;

                            if (block.linkType === 'youtube') {
                                const videoId = url.split('v=')[1]?.split('&')[0];
                                return (
                                <div key={i} className="max-w-[800px] mx-auto rounded-xl overflow-hidden">
                                    <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    />
                                </div>
                                );
                            }

                            if (block.linkType === 'spotify') {
                                const parts = url.split('/');
                                const type = parts[3];
                                const id = parts[4]?.split('?')[0];
                                return (
                                <div key={i}>
                                    <iframe
                                    style={{ borderRadius: "12px" }}
                                    src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator`}
                                    width="100%"
                                    height="152"
                                    frameBorder="0"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    />
                                </div>
                                );
                            }

                            if (block.linkType === 'instagram') {
                                return (
                                <div key={i} className="embed-container">
                                    <blockquote
                                    key={i}
                                    className="instagram-media !w-full !mx-auto !min-w-auto !max-w-full sm:!max-w-[400px]"
                                    data-instgrm-permalink={block.url}
                                    data-instgrm-version="14"
                                    />
                                </div>
                                );
                            }

                            if (block.linkType === 'streaming') {
                                return (
                                    <div key={i} className="mx-auto text-center">
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="font-bold pb-1 border-b-2 text-my-pink text-xl active:text-my-blue active:scale-95">Listen/Stream</a>
                                    </div>
                                );
                            }

                            return null;
                        }

                        return null;
                    })
                }
            </div>

            <div className="my-10">
                {(post.type === 'ep' || post.type === 'album') && (post.content.some(block => block.type === 'link' && block.linkType === 'download' && block.songTitle !== null)) && (
                    <p className="mb-3 text-my-muted-text text-xl font-bold">Download/stream below;</p>
                )}

                {post.content.map((block, i) => {
                    if (block.type === 'link' && block.linkType === 'download') {
                        const url = block.url;

                        if (post.type === 'ep' || post.type === 'album') {
                            const songTitle = block.songTitle;

                            return (
                                <div key={i} className="w-full mb-2">
                                    <a href={url} target="_blank" className="font-bold pb-1 border-b-2 text-my-pink text-xl active:text-my-blue active:scale-95">{songTitle}</a>
                                </div>
                            );

                        } else {
                            return (
                                <div key={i} className="w-full flex flex-col gap-y-8 justify-center items-center my-10">
                                    <audio controls preload="none" className="width:100%; border-radius:12px;">
                                        <source src={url} type="audio/mpeg"/>
                                        Your browser does not support the audio element.
                                    </audio>
    
                                    <a href={url} target="_blank" className="font-extrabold text-my-pink pb-1 border-b-2 text-lg active:text-my-blue active:scale-95">Download</a>
                                </div>
                            );
                        }
                    }
                })}
            </div>

            <div className="my-10">
                <p className="text-base font-bold mb-2">Share:</p>

                <div className="flex items-center gap-2 flex-wrap">
                    <a href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${postHeading}`} target="_blank" rel="noopener noreferrer" className="p-2.5 border rounded">
                        <img src="/icons/x.svg" alt="Share on Twitter" className="w-4 h-4" />
                    </a>

                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`} target="_blank" rel="noopener noreferrer" className="p-2.5 border rounded">
                        <img src="/icons/facebook.svg" alt="Share on Facebook" className="w-4 h-4" />
                    </a>

                    <a href={`https://wa.me/?text=${postHeading}%20${postUrl}`} target="_blank" rel="noopener noreferrer" className="p-2.5 border rounded">
                        <img src="/icons/whatsapp.svg" alt="Share on WhatsApp" className="w-4 h-4" />
                    </a>

                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`} target="_blank" rel="noopener noreferrer" className="p-2.5 border rounded">
                        <img src="/icons/linkedin.svg" alt="Share on LinkedIn" className="w-4 h-4" />
                    </a>

                    <a href={`mailto:?subject=${postHeading}&body=${postUrl}`} target="_blank" rel="noopener noreferrer" className="p-2.5 border rounded">
                        <img src="/icons/mail.svg" alt="Share on WhatsApp" className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {post.tags.length > 0 && 
                <div className="flex items-center gap-2 flex-wrap">
                    {post.tags.map((tag, i) => (
                        <p key={i} className="py-2 px-4 border border-[#777] text-my-text text-xs">{tag}</p>
                    ))}
                </div>
            }
        </section>
    )
}

export default PostContent;