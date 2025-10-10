import { getPostBySlug } from "@/lib/api/posts";

const Page = async({ params }) => {
    const { type, slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return <div className="m-3">Post not found</div>
    };

    const postUrl = encodeURIComponent(`https://sonexa-client.vercel.app/${type}/${slug}`);
    const postHeading = encodeURIComponent(post.heading);
    
    return (
        <section className="mt-5 mb-10 lg:w-[70%] space-y-2">
            <p className="date text-xs">{new Date(post.createdAt).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })}</p>

            <h2 className="font-bold text-lg">{post.heading}</h2>

            <figure className="w-full h-[300px] md:h-[350px] lg:h-[600px] mb-5 overflow-hidden rounded-xl">
                <img src={post.featuredImage.url} className="w-full h-full object-cover" alt="" />
            </figure>

            <div className="space-y-8">
                {post.content.length > 0 && 
                    post.content.map((block, i) => {
                        if (block.type === 'text') return <p key={i}>{block.content}</p>;
                        if (block.type === 'quote') return <blockquote key={i} className="italic border-l-2 border-[#777] p-3 bg-my-content rounded-e-lg my-3 text-my-text">{block.content}</blockquote>;
                        if (block.type === 'image') return (
                            <figure key={i} className="w-full h-[300px] md:h-[350px] lg:h-[400px] mb-3 overflow-hidden rounded-xl">
                                <img src={block.content.url} alt="" className="w-full h-full object-cover" style={{ width: block.content.width, }} />
                            </figure>
                        );

                        return null;
                    })
                }
            </div>

            <div className="flex justify-center gap-3 flex-wrap text-center my-10">
                {post.link.length > 0 && 
                    post.link.map((link, i) => {
                        if (link.linkType === 'spotify') return (                                                                             
                            <a href={link.url} key={i} target="_blank" className="text-green-400">
                                <button className="border-2 border-green-400 px-6 capitalize py-3 gap-2 flex items-center rounded-full cursor-pointer">
                                    {link.linkType} link
                                </button>
                            </a>
                        );

                        if (link.linkType === 'apple') return (                                                                             
                            <a href={link.url} key={i} target="_blank" className="text-my-pink">
                                <button className="border-2 border-my-pink px-6 capitalize py-3 gap-2 flex items-center rounded-full cursor-pointer">
                                    <span>{link.linkType} Link</span>
                                </button>
                            </a>
                        );

                        if (link.linkType === 'youtube') return (                                                                             
                            <a href={link.url} key={i} target="_blank" className="text-red-600">
                                <button className="border-2 border-red-600 px-6 capitalize py-3 gap-2 flex items-center rounded-full cursor-pointer">
                                    <span>{link.linkType} Link</span>
                                </button>
                            </a>
                        );

                        if (link.linkType === 'streaming') return (                                                                             
                            <a href={link.url} key={i} target="_blank" className="text-my-blue">
                                <button className="border-2 border-my-blue px-6 capitalize py-3 gap-2 flex items-center rounded-full cursor-pointer">
                                    <span>Stream</span>
                                </button>
                            </a>
                        );

                        return null;
                    })
                }
            </div>

            <div className="flex justify-center">
                {post.link.length > 0 && 
                    post.link.map((l, i) => {
                        if (l.linkType === 'download') return (                                                                             
                            <a href={l.url} key={i} target="_blank" className="text-my-text">
                                <button className="border-2 border-my-text px-6 capitalize py-3 gap-2 flex items-center rounded-full cursor-pointer">
                                    <span>{l.linkType}</span>
                                    <img src="/svgs/download.svg" className="w-3.5 h-3.5" alt="" />
                                </button>
                            </a>
                        );
                        
                        return null;
                    })}
            </div>

            {post.tags.length > 0 && 
                <div className="flex items-center gap-2 flex-wrap my-10">
                    {post.tags.map((tag, i) => (
                        <p key={i} className="py-2 px-4 border border-my-muted-text text-my-text text-xs">{tag}</p>
                    ))}
                </div>
            }

            <div>
                <p className="text-base font-bold">Share:</p>

                <div className="flex items-center gap-3 flex-wrap mt-4">
                    <a href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${postHeading}`} target="_blank" rel="noopener noreferrer">
                        <img src="/icons/x.svg" alt="Share on Twitter" className="w-7 h-7" />
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`} target="_blank" rel="noopener noreferrer">
                        <img src="/icons/facebook.svg" alt="Share on Facebook" className="w-8 h-8" />
                    </a>
                    <a href={`https://wa.me/?text=${postHeading}%20${postUrl}`} target="_blank" rel="noopener noreferrer">
                        <img src="/icons/whatsapp.svg" alt="Share on WhatsApp" className="w-8 h-8" />
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`} target="_blank" rel="noopener noreferrer">
                        <img src="/icons/linkedin.svg" alt="Share on LinkedIn" className="w-8 h-8" />
                    </a>
                    <a href={`mailto:?subject=${postHeading}&body=${postUrl}`} target="_blank" rel="noopener noreferrer">
                        <img src="/icons/mail.svg" alt="Share on WhatsApp" className="w-8 h-8" />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Page;