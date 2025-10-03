import { ExternalLink, Github, Star } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Neural Style Transfer',
    description: 'Deep learning model for artistic style transfer using CNNs. Applies artistic styles from famous paintings to any image.',
    tags: ['PyTorch', 'CNN', 'Computer Vision', 'Python'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Sentiment Analysis API',
    description: 'Production-ready NLP API for real-time sentiment analysis. Supports multiple languages with 95% accuracy.',
    tags: ['BERT', 'FastAPI', 'Docker', 'NLP'],
    github: 'https://github.com',
    featured: true,
  },
  {
    id: 3,
    title: 'Object Detection System',
    description: 'Real-time object detection using YOLO. Deployed on edge devices for industrial quality control.',
    tags: ['YOLO', 'TensorFlow', 'OpenCV', 'Edge Computing'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
  },
  {
    id: 4,
    title: 'Recommendation Engine',
    description: 'Collaborative filtering recommendation system with deep learning. Handles 1M+ users with sub-second latency.',
    tags: ['PyTorch', 'Redis', 'AWS', 'MLOps'],
    github: 'https://github.com',
    featured: false,
  },
  {
    id: 5,
    title: 'Time Series Forecasting',
    description: 'LSTM-based model for financial time series prediction. Includes automated feature engineering pipeline.',
    tags: ['LSTM', 'Keras', 'Pandas', 'Feature Engineering'],
    github: 'https://github.com',
    featured: false,
  },
  {
    id: 6,
    title: 'Medical Image Classifier',
    description: 'CNN model for detecting diseases from medical images. Trained on 100K+ annotated medical scans.',
    tags: ['ResNet', 'TensorFlow', 'Healthcare', 'Transfer Learning'],
    github: 'https://github.com',
    featured: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A collection of machine learning projects showcasing expertise in various domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-xl border-2 border-gray-100 hover:border-blue-500 transition-all shadow-sm hover:shadow-xl overflow-hidden"
              >
                {project.featured && (
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">Featured</span>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                      >
                        <Github className="w-5 h-5" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
