import { getClient } from "@/lib/client";
import { GET_POSTS } from "@/lib/queries";
import { PostsContent } from "@/components/PostsContent";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  let posts = [];
  try {
    const client = getClient();
    const { data } = await client.query({ query: GET_POSTS });
    posts = data?.posts?.nodes || [];
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return <PostsContent posts={posts} />;
}
