import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";

export default function ArticleRow({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex items-center gap-4 py-3"
    >
      <div className="relative aspect-video w-28 flex-shrink-0 overflow-hidden rounded-md bg-charcoal/5 sm:w-32">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="128px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h4 className="line-clamp-3 font-serif text-sm font-semibold leading-snug text-charcoal transition-colors group-hover:text-terracotta-dark sm:text-base">
        {article.title}
      </h4>
    </Link>
  );
}
