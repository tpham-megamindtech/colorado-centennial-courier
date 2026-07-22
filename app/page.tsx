import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import { CATEGORIES } from "@/lib/categories";
import { getFeaturedArticle, getLatestByCategory } from "@/lib/articles";

export default function Home() {
  const featured = getFeaturedArticle();

  return (
    <div>
      <Hero article={featured} />
      <div className="mx-auto max-w-6xl divide-y divide-charcoal/10 px-4 sm:px-6 lg:px-8">
        {CATEGORIES.map((category) => (
          <CategorySection
            key={category.slug}
            category={category}
            articles={getLatestByCategory(category.slug, 5)}
          />
        ))}
      </div>
    </div>
  );
}
