"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function PostsContent({ posts }: { posts: any[] }) {
  const { t, locale } = useLanguage();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'sv' ? 'sv-SE' : 'fi-FI', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-12 text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('news.title')}
        </h1>

        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <article key={post.id} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:bg-white/10 flex flex-col">
                <Link href={`/posts/${post.slug}`} className="relative aspect-video overflow-hidden block">
                    <Image
                        src={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </Link>
                <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatDate(post.date)}</span>
                        <span>{post.author?.node?.name}</span>
                    </div>
                    <Link href={`/posts/${post.slug}`}>
                        <h2 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {post.title}
                        </h2>
                    </Link>
                    <div 
                        className="mb-4 line-clamp-3 text-sm text-muted-foreground flex-1"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <Link href={`/posts/${post.slug}`} className="text-sm font-bold text-primary hover:underline">
                        {t('news.readMore')}
                    </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 p-12 text-center">
            <p className="text-xl font-medium text-muted-foreground">{t('news.empty')}</p>
          </div>
        )}
      </div>
    </main>
  );
}
