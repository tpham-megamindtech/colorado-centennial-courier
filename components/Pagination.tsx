import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-12 flex items-center justify-center gap-2">
      <Link
        href={currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : "#"}
        aria-disabled={currentPage <= 1}
        className={`rounded-md border border-charcoal/15 px-3 py-1.5 text-sm font-medium transition-colors ${
          currentPage <= 1
            ? "pointer-events-none text-charcoal/30"
            : "text-charcoal-soft hover:border-terracotta hover:text-terracotta"
        }`}
      >
        Previous
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-terracotta text-cream"
              : "text-charcoal-soft hover:bg-charcoal/5"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={
          currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : "#"
        }
        aria-disabled={currentPage >= totalPages}
        className={`rounded-md border border-charcoal/15 px-3 py-1.5 text-sm font-medium transition-colors ${
          currentPage >= totalPages
            ? "pointer-events-none text-charcoal/30"
            : "text-charcoal-soft hover:border-terracotta hover:text-terracotta"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
