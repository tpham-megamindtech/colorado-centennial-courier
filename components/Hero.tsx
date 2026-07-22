import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { getCategory } from "@/lib/categories";

export default function Hero({ article }: { article: Article }) {
  const category = getCategory(article.category);

  return (
    <Link
      href={`/article/${article.slug}`}
      className="group relative block h-[70vh] max-h-[560px] min-h-[380px] w-full overflow-hidden"
    >
      <Image
        src={article.coverImage}
        alt={article.title}
        fill
        priority
        sizes="100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/10" />
      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8">
        {category && (
          <span className="w-fit rounded-full bg-terracotta px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
            {category.shortName}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-cream/85 sm:text-base">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
