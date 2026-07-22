import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { CategorySlug } from "./categories";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  category: CategorySlug;
  date: string;
  coverImage: string;
  featured: boolean;
  imageCredit: string;
}

export interface Article extends ArticleFrontmatter {
  content: string;
}

let cachedSlugs: string[] | null = null;

function getArticleSlugs(): string[] {
  if (cachedSlugs) return cachedSlugs;
  cachedSlugs = fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
  return cachedSlugs;
}

let cachedArticles: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (cachedArticles) return cachedArticles;

  const slugs = getArticleSlugs();
  const articles = slugs.map((slug) => {
    const fullPath = path.join(ARTICLES_DIR, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...(data as ArticleFrontmatter),
      content,
    };
  });

  cachedArticles = articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return cachedArticles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export async function getArticleHtml(content: string): Promise<string> {
  const processed = await remark().use(html).process(content);
  return processed.toString();
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getFeaturedArticle(): Article {
  const all = getAllArticles();
  const featured = all.find((article) => article.featured);
  return featured ?? all[0];
}

export function getLatestByCategory(
  category: CategorySlug,
  count: number
): Article[] {
  return getArticlesByCategory(category).slice(0, count);
}

export function getRelatedArticles(article: Article, count = 3): Article[] {
  const sameCategory = getArticlesByCategory(article.category).filter(
    (a) => a.slug !== article.slug
  );

  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }

  const others = getAllArticles().filter(
    (a) => a.slug !== article.slug && a.category !== article.category
  );

  return [...sameCategory, ...others].slice(0, count);
}

export function getAllSlugs(): string[] {
  return getArticleSlugs();
}
