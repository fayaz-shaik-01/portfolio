import React, { useMemo, useState } from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import HtmlRenderer from './HtmlRenderer';
import '../learn.css';

type ArticleMeta = {
  id: string;
  title: string;
  tags: string[];
  readingTime: number;
  published: boolean;
  source: 'html';
};

type ArticleItem = {
  meta: ArticleMeta;
  slug: string;
  filePath: string;
};

// 👇 import the Vite base URL
const base = import.meta.env.BASE_URL || '/';

// later in your articles map:



// 🔍 Parse metadata from meta tags in the file (title, tags, etc.)
function parseHtmlMeta(raw: string) {
  const doc = new DOMParser().parseFromString(raw, 'text/html');
  const metaTitle = doc.querySelector('meta[name="title"]')?.getAttribute('content') ?? undefined;
  const metaTags = doc.querySelector('meta[name="tags"]')?.getAttribute('content') ?? '';
  const metaReadingTime = doc.querySelector('meta[name="readingTime"]')?.getAttribute('content') ?? undefined;
  const metaPublished = doc.querySelector('meta[name="published"]')?.getAttribute('content') ?? 'true';
  const titleFromH1 = doc.querySelector('h1')?.textContent?.trim();

  const tags = metaTags.split(',').map((t) => t.trim()).filter(Boolean);
  const title = metaTitle ?? titleFromH1 ?? 'Untitled';
  const readingTime = metaReadingTime ? parseInt(metaReadingTime, 10) : undefined;
  const published = metaPublished === 'true';

  return { title, tags, readingTime, published };
}

export default function Learn() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // 🧠 Dynamically import all .html files in src/content/articles/
  // These are raw strings, but we'll only use them for metadata parsing.
  // The actual iframe src points to /learn/<filename>.html (served from /public/learn/)
  // @ts-ignore
  const modules = import.meta.glob('/src/content/articles/*.html', { as: 'raw', eager: true }) as Record<string, string>;

  // 🧩 Build article list
const articles: ArticleItem[] = useMemo(() => {
  const base = import.meta.env.BASE_URL || '/';
  return Object.entries(modules)
    .map(([path, raw]) => {
      const slug = path.split('/').pop()!.replace(/\.html$/, '');
      const { title, tags, readingTime, published } = parseHtmlMeta(raw);

      return {
        slug,
        filePath: `${base}learn/${slug}.html`, // ✅ works with Vite base
        meta: {
          id: slug,
          title,
          tags,
          readingTime:
            readingTime ??
            Math.max(2, Math.round((raw.split(/\s+/).length || 200) / 200)),
          published,
          source: 'html',
        },
      } as ArticleItem;
    })
    .filter((a) => a.meta.published)
    .sort((a, b) => a.meta.title.localeCompare(b.meta.title));
}, [modules]);


  const allTags = useMemo(
    () => Array.from(new Set(articles.flatMap((a) => a.meta.tags ?? []))).sort(),
    [articles]
  );

  const filtered = selectedTag
    ? articles.filter((a) => a.meta.tags.includes(selectedTag))
    : articles;

  const activeArticle = articles.find((a) => a.slug === activeSlug) ?? null;

  return (
    <section id="learn">
      <div className="learn-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="learn-hero-title">ML Blog & Resources</h1>
            <p className="learn-hero-desc">
              Drop Jupyter-exported HTML files into <code>/public/learn</code> and a matching
              copy into <code>/src/content/articles</code> (for metadata scanning).
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
            <nav>
              <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
                Topics
              </h2>
              <ul className="flex md:block flex-wrap gap-2 md:gap-0">
                <li>
                  <button
                    onClick={() => {
                      setSelectedTag(null);
                      setActiveSlug(null);
                    }}
                    className={`learn-tag-btn ${
                      selectedTag === null ? 'selected' : ''
                    }`}
                  >
                    All Topics
                  </button>
                </li>
                {allTags.map((tag) => (
                  <li key={tag}>
                    <button
                      onClick={() => {
                        setSelectedTag(tag);
                        setActiveSlug(null);
                      }}
                      className={`learn-tag-btn ${
                        selectedTag === tag ? 'selected' : ''
                      }`}
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="flex-1">
            {activeArticle ? (
              <div className="bg-white dark:bg-[#20243a] rounded-xl border-2 border-gray-100 dark:border-[#334155] shadow-md dark:shadow-blue-900/20 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-[#f3f4f6] mb-4">
                  {activeArticle.meta.title}
                </h2>

                <div className="learn-article-meta mb-6 flex items-center gap-3 text-sm dark:text-[#a3aed0]">
                  <BookOpen className="w-4 h-4" />
                  <span>Lecture</span>
                  <span>•</span>
                  <Clock className="w-4 h-4" />
                  <span>{activeArticle.meta.readingTime} min read</span>
                </div>

                {/* 🚀 Display full Jupyter-exported HTML file */}
                <HtmlRenderer src={activeArticle.filePath} theme="light" />

                <div className="mt-8">
                  <button
                    className="learn-tag-btn dark:bg-[#20243a] dark:text-[#f3f4f6] dark:border-[#334155]"
                    onClick={() => setActiveSlug(null)}
                  >
                    ← Back to Articles
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="learn-articles">
                  {filtered.map((article) => (
                    <article
                      key={article.slug}
                      className="learn-article"
                      onClick={() => setActiveSlug(article.slug)}
                    >
                      <div className="learn-article-content">
                        <div className="learn-article-meta">
                          <BookOpen className="w-4 h-4" />
                          <span>Lecture</span>
                          <span>•</span>
                          <Clock className="w-4 h-4" />
                          <span>{article.meta.readingTime} min read</span>
                        </div>

                        <h3 className="learn-article-title">
                          {article.meta.title}
                        </h3>

                        <div className="learn-article-tags">
                          {article.meta.tags.map((tag) => (
                            <span key={tag} className="learn-article-tag">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          className="learn-article-read"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSlug(article.slug);
                          }}
                        >
                          Read Lecture <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="learn-no-articles">
                    No articles found for this topic.
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
