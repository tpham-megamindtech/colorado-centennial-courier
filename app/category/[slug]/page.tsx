import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";

const PAGE_SIZE = 9;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: `${category.name} | Centennial Courier`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const { page: pageParam } = await searchParams;
  const allArticles = getArticlesByCategory(category.slug);
  const totalPages = Math.max(1, Math.ceil(allArticles.length / PAGE_SIZE));
  const currentPage = Math.min(
    Math.max(1, Number(pageParam) || 1),
    totalPages
  );
  const pageArticles = allArticles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl border-b-2 border-charcoal pb-6">
        <h1 className="font-serif text-3xl font-bold text-charcoal sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-3 text-charcoal-soft/80">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {pageArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/category/${category.slug}`}
      />
    </div>
  );
}
