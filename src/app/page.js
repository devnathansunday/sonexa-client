import Featured from "@/components/Featured";
import RecentPosts from "@/components/RecentPosts";
import Latest from "@/components/Latest";
import Guides from "@/components/Guides";
import {fetchPosts, getFeaturedPosts, fetchAllPosts} from "@/lib/api/posts";

export default async function Home() {
  const [featuredPosts, all, songs, news, videos, guides ] = await Promise.all([
    getFeaturedPosts(),
    fetchAllPosts(0, 8),
    fetchPosts(0, 8, "song"),
    fetchPosts(0, 8, "news"),
    fetchPosts(0, 8, "video"),
    fetchPosts(0, 3, "guide"),
  ]);

  return (
    <main className="lg:w-[75%]">
      <Featured posts={featuredPosts} />
      <Latest sortedPosts={all?.posts} />
      <RecentPosts songs={songs} news={news} videos={videos} />
      <Guides guides={guides} />
    </main>
  );
}