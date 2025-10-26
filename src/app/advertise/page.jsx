export async function generateMetadata({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sonexa-client.vercel.app';
  
  return {
    title: 'Advertise With This Blog - Sonexa Music Blog',
    description: 'Reach thousands of music lovers and grow your brand with advertising opportunities on Sonexa. Partner with a leading music blog to connect with engaged audiences.',
    keywords: 'advertise, music blog advertising, brand partnership, music marketing, Sonexa',
    
    openGraph: {
      title: 'Advertise With This Blog - Sonexa',
      description: 'Reach thousands of music lovers and grow your brand with Sonexa',
      images: [
        {
          url: '/sonexa-og-image.png',
          width: 1200,
          height: 630,
          alt: 'Advertise with Sonexa Music Blog',
        }
      ],
      type: 'website',
      url: `${baseUrl}/advertise`,
      siteName: 'Sonexa',
    },
    
    twitter: {
      card: 'summary_large_image',
      title: 'Advertise With This Blog - Sonexa',
      description: 'Reach thousands of music lovers and grow your brand with Sonexa',
      images: ['/sonexa-og-image.png'],
      creator: '@sonexa_wave',
    },
    
    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: `${baseUrl}/advertise`,
    },
  };
}

const Page = () => {
    return (
        <section className="w-full lg:w-[75%] mt-2 mb-10">
            <p>Advertise With This Blog</p>
        </section>
    )
}

export default Page;