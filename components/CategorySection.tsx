import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import type { Category } from "@/lib/categories";
import ArticleRow from "@/components/ArticleRow";

export default function CategorySection({
  category,
  articles,
}: {
  category: Category;
  articles: Article[];
}) {
  const [featured, ...rest] = articles;
  const sideArticles = rest.slice(0, 4);

  if (!featured) return null;

  return (
    <section className="py-10 first:pt-6">
      <div className="mb-6 flex items-baseline justify-between border-b-2 border-charcoal pb-3">
        <h2 className="font-serif text-2xl font-bold text-charcoal sm:text-3xl">
          {category.name}
        </h2>
        <Link
          href={`/category/${category.slug}`}
          className="text-sm font-semibold text-terracotta transition-colors hover:text-terracotta-dark"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <Link
          href={`/article/${featured.slug}`}
          className="group flex flex-col md:col-span-5"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-charcoal/5">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              priority={false}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="pt-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-terracotta">
              {category.shortName}
            </span>
            <h3 className="mt-1 font-serif text-xl font-bold leading-snug text-charcoal transition-colors group-hover:text-terracotta-dark sm:text-2xl">
              {featured.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-charcoal-soft/80">
              {featured.excerpt}
            </p>
          </div>
        </Link>

        <div className="divide-y divide-charcoal/10 md:col-span-7 md:pl-2">
          {sideArticles.map((article) => (
            <ArticleRow key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
