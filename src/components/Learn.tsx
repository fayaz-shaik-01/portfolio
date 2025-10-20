import React, { useMemo, useState } from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import HtmlRenderer from './HtmlRenderer';
import { motion, AnimatePresence } from 'framer-motion';
import '../learn.css';
import { basePath } from '../utils/basePath';

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

function extractHeadings(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return Array.from(doc.querySelectorAll('h2, h3')).map((el) => ({
    id: el.id || el.textContent?.replace(/\s+/g, '-').toLowerCase() || '',
    text: el.textContent || '',
    level: el.tagName === 'H2' ? 2 : 3,
  }));
}

type LearnProps = { isDark: boolean };

export default function Learn({ isDark }: LearnProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [showContents, setShowContents] = useState(false);

  // @ts-ignore
  const modules = import.meta.glob('/src/content/articles/*.html', { as: 'raw', eager: true }) as Record<string, string>;

  const articles: ArticleItem[] = useMemo(() => {
    return Object.entries(modules)
      .map(([path, raw]) => {
        const slug = path.split('/').pop()!.replace(/\.html$/, '');
        const { title, tags, readingTime, published } = parseHtmlMeta(raw);
        return {
          slug,
          filePath:import.meta.env.MODE === 'development' ? `/src/content/articles/${slug}.html` : `${basePath}/portfolio/learn/${slug}.html`,
          meta: {
            id: slug,
            title,
            tags,
            readingTime: readingTime ?? Math.max(2, Math.round((raw.split(/\s+/).length || 200) / 200)),
            published,
            source: 'html',
          },
        } as ArticleItem;
      })
      .filter((a) => a.meta.published)
      .sort((a, b) => a.meta.title.localeCompare(b.meta.title));
  }, [modules]);

  const allTags = useMemo(() => Array.from(new Set(articles.flatMap((a) => a.meta.tags ?? []))).sort(), [articles]);

  const filtered = selectedTag ? articles.filter((a) => a.meta.tags.includes(selectedTag)) : articles;
  const activeArticle = articles.find((a) => a.slug === activeSlug) ?? null;
  const headings = activeArticle ? extractHeadings(modules[`/src/content/articles/${activeArticle.slug}.html`]) : [];

  return (
    <section id="learn">
      <div className="learn-hero mb-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="learn-hero-title">ML Blog & Resources</h1>
          <p className="learn-hero-desc">
            Drop Jupyter-exported HTML files into <code>/public/learn</code> and matching metadata copies into{' '}
            <code>/src/content/articles</code>.
          </p>
        </div>
      </div>

      {/* Unified layout with reduced spacing */}
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[12rem,minmax(0,1fr),12rem] gap-6 md:gap-8 lg:gap-8">
          {/* Left Sidebar */}
          <aside className="w-full md:w-auto md:sticky md:top-24 self-start space-y-4">
            <nav>
              <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Topics</h2>
              <ul className="flex md:block flex-wrap gap-2 md:gap-0">
                <li>
                  <button
                    onClick={() => {
                      setSelectedTag(null);
                      setActiveSlug(null);
                    }}
                    className={`learn-tag-btn ${selectedTag === null ? 'selected' : ''}`}
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
                      className={`learn-tag-btn ${selectedTag === tag ? 'selected' : ''}`}
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeArticle ? (
              <div className="bg-white dark:bg-[#20243a] rounded-2xl border border-gray-200 dark:border-[#334155] shadow-md p-6 md:p-8 mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-[#f3f4f6] mb-4">{activeArticle.meta.title}</h2>
                <div className="learn-article-meta mb-6 flex items-center gap-3 text-sm dark:text-[#a3aed0]">
                  <BookOpen className="w-4 h-4" />
                  <span>Lecture</span>
                  <span>•</span>
                  <Clock className="w-4 h-4" />
                  <span>{activeArticle.meta.readingTime} min read</span>
                </div>
                <HtmlRenderer src={activeArticle.filePath} theme={isDark ? 'dark' : 'light'} />
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
              <div className="learn-articles grid gap-6">
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
                      <h3 className="learn-article-title">{article.meta.title}</h3>
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
            )}
          </main>

          {/* Right Sidebar */}
          {activeArticle && headings.length > 0 && (
            <aside className="hidden md:block md:sticky md:top-24 self-start">
              <nav>
                <h2 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">Contents</h2>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {headings.map((h) => (
                    <li key={h.id} className={`pl-${(h.level - 2) * 4}`}>
                      <a
                        href={`#${h.id}`}
                        className="hover:text-blue-500 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          const iframe = document.querySelector('iframe');
                          const doc = iframe?.contentDocument;
                          doc?.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
