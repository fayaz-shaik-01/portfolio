import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const experiences = [
  {
    id: 1,
    type: 'work',
    title: 'Software Engineer',
    organization: 'Enphase Solar Eenrgy',
    location: 'Bengaluru, India',
    startDate: '2025-07',
    endDate: null,
    description: 'Focused on developing AI Based test automation frameworks and integrating Agentic models into the Test case generation process to enhance efficiency and accuracy.',
  },
  {
    id: 2,
    type: 'work',
    title: 'Associate Software Engineer',
    organization: 'Enphase Solar Eenrgy',
    location: 'Bengaluru, India',
    startDate: '2023-07',
    endDate: '2025-06',
    description: 'Developed test strategies and automated test cases for Enphase products using Java and Python. Collaborated with cross-functional teams to ensure product quality and reliability.',
  },
  {
    id: 3,
    type: 'work',
    title: 'Software Engineer Intern',
    organization: 'Enphase Solar Eenrgy',
    location: 'Bengaluru, India',
    startDate: '2023-01',
    endDate: '2023-06',
    description: 'Worked on creating and maintaining Test Automation Framework for the Enphase products. Developed test scripts using Java and integrated them with Jenkins for continuous testing.',
  },
  {
    id: 4,
    type: 'education',
    title: 'B.Tech in Electrical Engineering',
    organization: 'NIT Calicut',
    location: 'Calicut, India',
    startDate: '2019-07',
    endDate: '2023-06',
    description: 'Focus on algorithms, Core Engineering and Robotics. Got a knowledge of various engineering aspects. Graduated with First Class Honors.',
  },
];

function formatDate(dateStr: string | null) {
  if (!dateStr) return 'Present';
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Experience & Education
            </h2>
            <p className="text-xl text-gray-600">
              My professional journey
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-300"></div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative pl-20">
                  <div className="absolute left-0 top-0 w-16 h-16 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center shadow-lg">
                    {exp.type === 'work' ? (
                      <Briefcase className="w-7 h-7 text-blue-600" />
                    ) : (
                      <GraduationCap className="w-7 h-7 text-blue-600" />
                    )}
                  </div>

                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 border-gray-100 hover:border-blue-500">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-blue-600 font-semibold mb-1">
                          {exp.organization}
                        </p>
                        <p className="text-gray-600">{exp.location}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 mt-2 sm:mt-0">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium whitespace-nowrap">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
