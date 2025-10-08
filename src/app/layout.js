import "./globals.css";
import localFont from 'next/font/local';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Popular from "@/components/Popular";
import PageLoader from "@/components/helper/PageLoader";
import Extras from "@/components/Extras";
import Guides from "@/components/Guides";
import { TrackViewProvider } from "@/context/TrackViewContext";
import { getPopularPosts, fetchPosts } from "@/lib/api/posts";

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
}

export default async function RootLayout({ children }) {
  const [ guides, popularPosts] = await Promise.all([
    fetchPosts(0, 6, 'guide'),
    getPopularPosts()
  ]);

  return (
    <html lang="en" className={`scroll-smooth ${clashDisplay.className} ${clashDisplay.variable}`}>
      <body className="w-full h-full bg-my-bg text-my-text font-clash antialiased overflow-x-hidden">
        <header className="text-my-text sticky top-0 left-0 right-0 z-[999]">
          <Nav />
        </header>
        <PageLoader />

        <TrackViewProvider>
          <section className="w-full h-full mx-auto p-3 gap-x-4 flex flex-col lg:flex-row max-w-[1280px]">
            {children}

            <aside className="flex-1 lg:w-[30%]">
              <Guides guides={guides} />
              <Extras />
            </aside>
          </section>

          <Popular popularPosts={popularPosts} />
        </TrackViewProvider>

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}