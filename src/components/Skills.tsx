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
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-600">
              Technologies and domains I work with
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-blue-500 transition-all p-6 shadow-sm hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-gray-900">
                        {category.title}
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {category.skills.map((skill) => (
                        <div
                          key={skill}
                          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Areas of Expertise
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {expertise.map((area) => (
                <div
                  key={area}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
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
