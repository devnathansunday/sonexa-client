import Featured from "@/components/Featured";
import RecentPosts from "@/components/RecentPosts";
import Latest from "@/components/Latest";
import {fetchPosts, getFeaturedPosts, fetchAllPosts} from "@/lib/api/posts";

export default async function Home() {
  const [featuredPosts, all, songs, news, videos, ] = await Promise.all([
    getFeaturedPosts(),
    fetchAllPosts(0, 9),
    fetchPosts(0, 6, "song"),
    fetchPosts(0, 6, "news"),
    fetchPosts(0, 6, "video"),
  ]);

  return (
    <main className="lg:w-[70%]">
      <Featured posts={featuredPosts} />
      <Latest sortedPosts={all.posts} />
      <RecentPosts songs={songs} news={news} videos={videos} />
    </main>
  );
}