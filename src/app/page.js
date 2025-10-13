import Featured from "@/components/Featured";
import RecentPosts from "@/components/RecentPosts";
import Latest from "@/components/Latest";
import {fetchPosts, getFeaturedPosts, fetchAllPosts} from "@/lib/api/posts";

export default async function Home() {
  const [featuredPosts, all, songs, news, videos, ] = await Promise.all([
    getFeaturedPosts(),
    fetchAllPosts(0, 8),
    fetchPosts(0, 8, "song"),
    fetchPosts(0, 8, "news"),
    fetchPosts(0, 8, "video"),
  ]);

  return (
    <main className="lg:w-[70%]">
      <Featured posts={featuredPosts} />
      <Latest sortedPosts={all?.posts} />
      <RecentPosts songs={songs} news={news} videos={videos} />
    </main>
  );
}