// ...existing code...
import '../learn.css';

import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const articles = [
  {
    id: 1,
    title: 'Understanding Transformers: The Architecture Behind GPT',
    excerpt: 'A comprehensive guide to transformer architecture, self-attention mechanisms, and how they revolutionized NLP.',
    tags: ['NLP', 'Deep Learning', 'Transformers'],
    readingTime: 12,
    published: true,
  },
  {
    id: 2,
    title: 'Building Production-Ready ML Pipelines',
    excerpt: 'Best practices for designing, deploying, and monitoring machine learning systems at scale.',
    tags: ['MLOps', 'Production', 'Architecture'],
    readingTime: 8,
    published: true,
  },
  {
    id: 3,
    title: 'Computer Vision: From CNNs to Vision Transformers',
    excerpt: 'Evolution of computer vision architectures and practical applications in real-world scenarios.',
    tags: ['Computer Vision', 'CNNs', 'ViT'],
    readingTime: 15,
    published: true,
  },
  {
    id: 4,
    title: 'Feature Engineering for Time Series Forecasting',
    excerpt: 'Advanced techniques for extracting meaningful features from temporal data for better predictions.',
    tags: ['Time Series', 'Feature Engineering'],
    readingTime: 10,
    published: true,
  },
  {
    id: 5,
    title: 'Transfer Learning: When and How to Use Pretrained Models',
    excerpt: 'Practical guide to leveraging pretrained models for faster development and better performance.',
    tags: ['Transfer Learning', 'Best Practices'],
    readingTime: 7,
    published: true,
  },
  {
    id: 6,
    title: 'Explainable AI: Making ML Models Interpretable',
    excerpt: 'Techniques and tools for understanding what your models learn and making them transparent.',
    tags: ['XAI', 'Interpretability', 'Ethics'],
    readingTime: 9,
    published: true,
  },
];

export default function Learn() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<number | null>(null);

  const allTags = Array.from(new Set(articles.flatMap((article) => article.tags))).sort();
  const filteredArticles = selectedTag ? articles.filter((article) => article.tags.includes(selectedTag)) : articles;
  const activeContent = articles.find((a) => a.id === activeArticle);

  return (
    <section id="learn">
      <div className="learn-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="learn-hero-title">ML Blog & Resources</h1>
            <p className="learn-hero-desc">
              Explore curated articles, tutorials, and guides on Machine Learning, Deep Learning, and MLOps. Use the sidebar to browse by topic.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64">
            <nav>
              <h2 className="font-bold text-lg mb-4 text-gray-900">Topics</h2>
              <ul className="flex md:block flex-wrap gap-2 md:gap-0">
                <li>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`learn-tag-btn${selectedTag === null ? ' selected' : ''}`}
                  >
                    All Topics
                  </button>
                </li>
                {allTags.map((tag) => (
                  <li key={tag}>
                    <button
                      onClick={() => setSelectedTag(tag)}
                      className={`learn-tag-btn${selectedTag === tag ? ' selected' : ''}`}
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Blog Content */}
          <main className="flex-1">
            {activeContent ? (
              <div className="bg-white dark:bg-[#20243a] rounded-xl border-2 border-gray-100 dark:border-[#334155] shadow-md dark:shadow-blue-900/20 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-[#f3f4f6] mb-4">{activeContent.title}</h2>
                <div className="learn-article-meta mb-4">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-gray-700 dark:text-[#f3f4f6]">Article</span>
                  <span className="text-gray-400 dark:text-[#a3aed0]">•</span>
                  <Clock className="w-4 h-4" />
                  <span className="text-gray-700 dark:text-[#f3f4f6]">{activeContent.readingTime} min read</span>
                </div>
                <div className="learn-article-tags mb-4">
                  {activeContent.tags.map((tag) => (
                    <span key={tag} className="learn-article-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="learn-article-excerpt text-lg mb-8 dark:text-[#a3aed0]">{activeContent.excerpt}</p>
                <div className="text-gray-500 dark:text-[#a3aed0] italic">Blog content coming soon...</div>
                <button className="mt-8 learn-tag-btn dark:bg-[#20243a] dark:text-[#f3f4f6] dark:border-[#334155]" onClick={() => setActiveArticle(null)}>
                  ← Back to Articles
                </button>
              </div>
            ) : (
              <div>
                <div className="learn-articles">
                  {filteredArticles.map((article) => (
                    <article key={article.id} className="learn-article" onClick={() => setActiveArticle(article.id)}>
                      <div className="learn-article-content">
                        <div className="learn-article-meta">
                          <BookOpen className="w-4 h-4" />
                          <span>Article</span>
                          <span>•</span>
                          <Clock className="w-4 h-4" />
                          <span>{article.readingTime} min read</span>
                        </div>
                        <h3 className="learn-article-title">{article.title}</h3>
                        <p className="learn-article-excerpt">{article.excerpt}</p>
                        <div className="learn-article-tags">
                          {article.tags.map((tag) => (
                            <span key={tag} className="learn-article-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button className="learn-article-read" onClick={(e) => {e.stopPropagation();setActiveArticle(article.id);}}>
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
                {filteredArticles.length === 0 && (
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
