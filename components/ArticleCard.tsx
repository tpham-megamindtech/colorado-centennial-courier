import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { getCategory } from "@/lib/categories";

export default function ArticleCard({ article }: { article: Article }) {
  const category = getCategory(article.category);

  return (
    <Link href={`/article/${article.slug}`} className="group flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-charcoal/5">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col pt-3">
        {category && (
          <span className="text-xs font-semibold uppercase tracking-wide text-terracotta">
            {category.shortName}
          </span>
        )}
        <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-charcoal transition-colors group-hover:text-terracotta-dark">
          {article.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-charcoal-soft/80">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
