import "./globals.css";
import { Suspense } from "react";
import Script from "next/script";
import localFont from 'next/font/local';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Popular from "@/components/Popular";
import Extras from "@/components/Extras";
import { TrackViewProvider } from "@/context/TrackViewContext";
import { LoadingProvider } from '@/context/LoadingContext';
import NavigationHandler from "@/components/NavigationHandler";
import { getPopularPosts } from "@/lib/api/posts";

const clashDisplay = localFont({
  src: [
    { path: './fonts/CreatoDisplay-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/CreatoDisplay-RegularItalic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/CreatoDisplay-Black.woff2', weight: '900', style: 'normal' },
    { path: './fonts/CreatoDisplay-BlackItalic.woff2', weight: '900', style: 'italic' },
    { path: './fonts/CreatoDisplay-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/CreatoDisplay-BoldItalic.woff2', weight: '700', style: 'italic' },
    { path: './fonts/CreatoDisplay-ExtraBold.woff2', weight: '800', style: 'normal' },
    { path: './fonts/CreatoDisplay-ExtraBoldItalic.woff2', weight: '800', style: 'italic' },
    { path: './fonts/CreatoDisplay-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/CreatoDisplay-LightItalic.woff2', weight: '300', style: 'italic' },
    { path: './fonts/CreatoDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/CreatoDisplay-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: './fonts/CreatoDisplay-Thin.woff2', weight: '100', style: 'normal' },
    { path: './fonts/CreatoDisplay-ThinItalic.woff2', weight: '100', style: 'italic' },
  ],
  variable: '--font-clash-display',
  display: 'swap'
})

const lora = localFont({
  src: [
    { path: './fonts/Lora-Bold.ttf', weight: '900', style: 'normal' },
    { path: './fonts/Lora-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/Lora-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/Lora-Regular.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--font-lora',
  display: 'swap'
})

export const metadata = {
  title: 'Sonexa - Music & Entertainment Blog',
  description: 'Stay updated with the latest news, music releases, videos, and how-to guides from the world of music and entertainment.',
  icons: {
    icon: [
      {
        url: '/favicon-light.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-dark.svg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
  openGraph: {
    title: 'Sonexa - Music & Entertainment Blog',
    description: 'Stay updated with the latest news, music releases, videos, and how-to guides from the world of music and entertainment.',
    url: 'https://sonexa-client.vercel.app',
    siteName: 'Sonexa',
    images: [
      {
        url: '/sonexa-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sonexa Blog',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sonexa - Music & Entertainment Blog',
    description: 'Stay updated with the latest news, music releases, videos, and how-to guides.',
    images: ['/sonexa-og-image.png'],
  },
}

export default async function RootLayout({ children }) {
  const popularPosts = await getPopularPosts();

  return (
    <html lang="en" className={`scroll-smooth font-clash text-base ${clashDisplay.className} ${clashDisplay.variable} ${lora.className} ${lora.variable}`}>
      <body className="w-full h-full bg-my-bg text-my-text font-clash antialiased overflow-x-hidden">
        <LoadingProvider>
          <header className="text-my-text sticky top-0 left-0 right-0 z-[999]">
            <Nav />
          </header>

          <TrackViewProvider>
            <section className="w-full h-full mx-auto p-3 gap-4 flex flex-col lg:flex-row lg:items-start max-w-[1200px]">
              {children}
              
              <aside className="w-full lg:w-[25%]">
                <Extras />
              </aside>
            </section>

            <Popular popularPosts={popularPosts} />
          </TrackViewProvider>

          <footer>
            <Footer />
          </footer>
          
          <Suspense fallback={<div className="loader"></div>}>
            <NavigationHandler />
          </Suspense>
        </LoadingProvider>

        <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}