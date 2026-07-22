import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function Header() {
  return (
    <header className="border-b border-charcoal/10 bg-cream">
      <div className="h-1.5 bg-gradient-to-r from-terracotta via-gold to-terracotta" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-1 py-6 text-center">
          <Link href="/" className="group">
            <span className="font-serif text-3xl font-black tracking-tight text-charcoal sm:text-4xl">
              Centennial <span className="text-terracotta">Courier</span>
            </span>
          </Link>
          <p className="text-xs uppercase tracking-[0.25em] text-gold-dark">
            News from the Centennial State
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-charcoal/10 py-3 text-sm font-medium">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="text-charcoal-soft transition-colors hover:text-terracotta"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
