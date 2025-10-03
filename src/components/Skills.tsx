import { Brain, Code, Database, Wrench } from 'lucide-react';

const skillCategories = [
  {
    id: 1,
    title: 'ML Frameworks',
    icon: Brain,
    skills: [
      'PyTorch',
      'TensorFlow',
      'Keras',
      'Scikit-learn',
      'XGBoost',
      'Hugging Face',
    ],
  },
  {
    id: 2,
    title: 'Programming Languages',
    icon: Code,
    skills: [
      'Python',
      'JavaScript',
      'TypeScript',
      'SQL',
      'R',
      'C++',
    ],
  },
  {
    id: 3,
    title: 'Data & Cloud',
    icon: Database,
    skills: [
      'AWS',
      'Docker',
      'Kubernetes',
      'PostgreSQL',
      'MongoDB',
      'Redis',
    ],
  },
  {
    id: 4,
    title: 'Tools & Technologies',
    icon: Wrench,
    skills: [
      'Git',
      'MLflow',
      'Apache Spark',
      'FastAPI',
      'Jupyter',
      'VS Code',
    ],
  },
];

const expertise = [
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'Time Series Analysis',
  'Recommendation Systems',
  'MLOps',
  'Model Deployment',
  'Feature Engineering',
];

export default function Skills() {
  return (
  <section id="skills" className="py-20 bg-blue-50 dark:bg-[#181f3a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Technologies and domains I work with
            </p>
          </div>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Technical Skills
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {skillCategories.map((category) => (
                <div key={category.id} className="mb-4 w-full max-w-xs">
                  <div className="flex items-center gap-2 mb-3 justify-center">
                    <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <category.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-[#f3f4f6]">
                      {category.title}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full font-semibold text-sm bg-white dark:bg-[#232a45] border border-gray-200 dark:border-[#334155] text-gray-700 dark:text-[#cbd5e1] shadow-sm hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Areas of Expertise
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {expertise.map((area) => (
                <div
                  key={area}
                  className="accent px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold shadow-lg dark:shadow-blue-900/20 hover:shadow-xl hover:scale-105 transition-all"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
