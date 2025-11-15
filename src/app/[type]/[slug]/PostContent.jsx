'use client'
import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";
import Image from "next/image";

const PostContent = ({ post, postHeading, postUrl }) => {
    const { stopLoading } = useLoading();

    useEffect(() => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                stopLoading();
            })
        });
    }, []);

    useEffect(() => {
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
    }, [post]);

    const formatText = (text) => {
        const lines = text.split('\n');
        const elements = [];
        let currentList = [];
        let listType = null;
        
        lines.forEach((line, lineIndex) => {
            if (line.startsWith('## ')) {
                if (currentList.length > 0) {
                    elements.push(createList(currentList, listType, lineIndex));
                    currentList = [];
                    listType = null;
                }
                elements.push(<h2 key={lineIndex} className="text-2xl font-bold mb-2">{line.slice(3)}</h2>);
                return;
            }
            
            if (line.startsWith('### ')) {
                if (currentList.length > 0) {
                    elements.push(createList(currentList, listType, lineIndex));
                    currentList = [];
                    listType = null;
                }
                elements.push(<h3 key={lineIndex} className="text-xl font-bold mb-2">{line.slice(4)}</h3>);
                return;
            }
            
            const unorderedMatch = line.match(/^[\-\*]\s+(.+)$/);
            if (unorderedMatch) {
                if (listType !== 'ul' && currentList.length > 0) {
                    elements.push(createList(currentList, listType, lineIndex));
                    currentList = [];
                }
                listType = 'ul';
                currentList.push({ index: lineIndex, content: unorderedMatch[1] });
                return;
            }
            
            const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
            if (orderedMatch) {
                if (listType !== 'ol' && currentList.length > 0) {
                    elements.push(createList(currentList, listType, lineIndex));
                    currentList = [];
                }
                listType = 'ol';
                currentList.push({ index: lineIndex, content: orderedMatch[1] });
                return;
            }
            
            if (currentList.length > 0) {
                elements.push(createList(currentList, listType, lineIndex));
                currentList = [];
                listType = null;
            }
            
            if (line.trim()) {
                const formatted = parseInlineFormatting(line);
                elements.push(<p key={lineIndex} className="mb-6">{formatted}</p>);
            }
        });
        
        if (currentList.length > 0) {
            elements.push(createList(currentList, listType, lines.length));
        }
        
        return elements;
    };

    const createList = (items, type, keyBase) => {
        const ListTag = type === 'ul' ? 'ul' : 'ol';
        const listClass = type === 'ul' ? 'list-disc ml-8 mb-6' : 'list-decimal ml-8 mb-6';
        
        return (
            <ListTag key={`list-${keyBase}`} className={listClass}>
                {items.map((item) => (
                    <li key={item.index} className="mb-1">
                        {parseInlineFormatting(item.content)}
                    </li>
                ))}
            </ListTag>
        );
    };

    const parseInlineFormatting = (text) => {
        const parts = [];
        let lastIndex = 0;
        
        const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)/g;
        let match;
        
        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }
            
            if (match[1]) {
                parts.push(<strong key={match.index}>{match[2]}</strong>);
            } else if (match[3]) {
                parts.push(<em key={match.index}>{match[4]}</em>);
            }
            
            lastIndex = regex.lastIndex;
        }
        
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }
        
        return parts.length > 0 ? parts : text;
    };

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
                        if (block.type === 'text') return formatText(block.content);

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
                    <a href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${postHeading}`} target="_blank" rel="noopener noreferrer" className="p-2 border rounded group">
                        <img src="/icons/x.svg" alt="Share on Twitter" className="w-5 h-5 group-hover:scale-105 hover:-rotate-6 transition-transform duration-200" />
                    </a>

                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 border rounded group">
                        <img src="/icons/facebook.svg" alt="Share on Facebook" className="w-5 h-5 group-hover:scale-105 hover:-rotate-6 transition-transform duration-200" />
                    </a>

                    <a href={`https://wa.me/?text=${postHeading}%20${postUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 border rounded group">
                        <img src="/icons/whatsapp.svg" alt="Share on WhatsApp" className="w-5 h-5 group-hover:scale-105 hover:-rotate-6 transition-transform duration-200" />
                    </a>

                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 border rounded group">
                        <img src="/icons/linkedin.svg" alt="Share on LinkedIn" className="w-5 h-5 group-hover:scale-105 hover:-rotate-6 transition-transform duration-200" />
                    </a>

                    <a href={`mailto:?subject=${postHeading}&body=${postUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 border rounded group">
                        <img src="/icons/mail.svg" alt="Share on WhatsApp" className="w-5 h-5 group-hover:scale-105 hover:-rotate-6 transition-transform duration-200" />
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