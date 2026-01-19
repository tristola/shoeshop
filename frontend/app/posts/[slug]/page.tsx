import { getClient } from "@/lib/client";
import { GET_POST_BY_SLUG } from "@/lib/queries";
import { SinglePostContent } from "@/components/SinglePostContent";

import { MOCK_POSTS } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const isMockMode = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

  if (isMockMode) {
      const post = MOCK_POSTS.find(p => p.slug === slug);
      return <SinglePostContent post={post} />;
  }
  
  let post = null;
  try {
    const client = getClient();
    const { data } = await client.query({ 
        query: GET_POST_BY_SLUG,
        variables: { id: slug } 
    });
    post = data?.post;
  } catch (error) {
    console.error("Failed to fetch post:", error);
  }

  return <SinglePostContent post={post} />;
}
