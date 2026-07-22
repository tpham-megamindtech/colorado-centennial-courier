import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-charcoal text-cream-dark">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div>
            <span className="font-serif text-2xl font-black tracking-tight text-cream">
              Centennial <span className="text-gold-light">Courier</span>
            </span>
            <p className="mt-2 max-w-xs text-sm text-cream-dark/70">
              Independent news and insight from across Colorado, the
              Centennial State.
            </p>
          </div>
          <nav className="flex flex-col items-center gap-2 sm:items-end">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">
              Sections
            </span>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-end">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="text-sm text-cream-dark/80 transition-colors hover:text-gold-light"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="mt-10 border-t border-cream/10 pt-6 text-center text-xs text-cream-dark/60 sm:text-left">
          © {year} Centennial Courier. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
