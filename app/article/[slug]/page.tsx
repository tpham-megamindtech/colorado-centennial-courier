import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getCategory } from "@/lib/categories";
import {
  getAllSlugs,
  getArticleBySlug,
  getArticleHtml,
  getRelatedArticles,
} from "@/lib/articles";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Centennial Courier`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const contentHtml = await getArticleHtml(article.content);
  const related = getRelatedArticles(article, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {category && (
        <Link
          href={`/category/${category.slug}`}
          className="text-xs font-semibold uppercase tracking-wide text-terracotta transition-colors hover:text-terracotta-dark"
        >
          {category.shortName}
        </Link>
      )}

      <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-charcoal sm:text-4xl">
        {article.title}
      </h1>

      <div className="mt-4 flex items-center gap-3 text-sm text-charcoal-soft/70">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
      </div>

      <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-lg bg-charcoal/5">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      <p className="mt-2 text-xs text-charcoal-soft/60">
        {article.imageCredit}
      </p>

      <div
        className="prose-article mt-8 text-base"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {related.length > 0 && (
        <section className="mt-16 border-t border-charcoal/10 pt-10">
          <h2 className="font-serif text-2xl font-bold text-charcoal">
            Related Stories
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
            {related.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.slug} article={relatedArticle} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
