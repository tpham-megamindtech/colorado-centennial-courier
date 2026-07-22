import fs from "fs";
import path from "path";
import matter from "gray-matter";

const OUT_DIR = path.join(process.cwd(), "content/articles");

export function writeArticles(articles) {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const article of articles) {
    const { body, ...frontmatter } = article;
    const fileContents = matter.stringify(body.trim() + "\n", frontmatter);
    const filePath = path.join(OUT_DIR, `${article.slug}.md`);
    fs.writeFileSync(filePath, fileContents, "utf8");
  }

  console.log(`Wrote ${articles.length} article(s) to ${OUT_DIR}`);
}
