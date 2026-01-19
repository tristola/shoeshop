import { getClient } from "@/lib/client";
import { GET_POSTS } from "@/lib/queries";
import { PostsContent } from "@/components/PostsContent";

import { MOCK_POSTS } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const isMockMode = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

  if (isMockMode) {
    return <PostsContent posts={MOCK_POSTS} />;
  }

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
