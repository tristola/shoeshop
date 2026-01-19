"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function SinglePostContent({ post }: { post: any }) {
  const { t, locale } = useLanguage();

  if (!post) {
    return (
      <main className="min-h-screen pt-32 pb-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
            <h1 className="text-3xl font-bold">Post not found</h1>
            <Link href="/posts" className="mt-8 inline-block text-primary hover:underline">
                {t('news.back')}
            </Link>
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'sv' ? 'sv-SE' : 'fi-FI', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <Link href="/posts" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('news.back')}
        </Link>

        <header className="mb-12">
            <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary font-medium">
                    {formatDate(post.date)}
                </span>
                <span>•</span>
                <span>{post.author?.node?.name}</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                {post.title}
            </h1>
        </header>

        {post.featuredImage?.node?.sourceUrl && (
            <div className="relative mb-12 aspect-video overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        )}

        <div 
            className="prose prose-invert prose-lg max-w-none text-gray-300
            prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:underline
            prose-img:rounded-3xl prose-img:border prose-img:border-white/10"
            dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </main>
  );
}
