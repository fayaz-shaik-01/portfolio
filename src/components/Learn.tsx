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

  const allTags = Array.from(
    new Set(articles.flatMap((article) => article.tags))
  ).sort();

  const filteredArticles = selectedTag
    ? articles.filter((article) => article.tags.includes(selectedTag))
    : articles;

  return (
    <section id="learn" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Learn ML
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              In-depth articles and tutorials on machine learning concepts, techniques, and best practices
            </p>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedTag === null
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Topics
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl border-2 border-gray-100 hover:border-blue-500 transition-all shadow-sm hover:shadow-xl overflow-hidden group cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">Article</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4" />
                    <span>{article.readingTime} min read</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles found for this topic.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
