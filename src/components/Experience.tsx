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
			<section id="experience" className="py-20 bg-white dark:bg-[#181c2b]">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-[#f3f4f6] mb-4">
							Experience & Education
						</h2>
						<p className="text-xl text-gray-600 dark:text-[#a3aed0]">
							My professional journey
						</p>
					</div>
					<div className="relative">
						<div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-300 dark:from-blue-400 dark:to-blue-600"></div>
						<div className="space-y-8">
							{experiences.map((exp) => (
								<div key={exp.id} className="relative pl-20">
									<div className="absolute left-0 top-0 w-16 h-16 bg-white dark:bg-[#20243a] rounded-full border-4 border-blue-500 dark:border-blue-400 flex items-center justify-center shadow-lg dark:shadow-blue-900/20">
										<span className="text-blue-600 dark:text-blue-400 text-2xl font-bold">
											{exp.type === 'work' ? '💼' : '🎓'}
										</span>
									</div>
									<div className="card bg-white dark:bg-[#20243a] border-2 border-gray-100 dark:border-[#334155] rounded-xl shadow-md dark:shadow-blue-900/20 p-8 ml-8">
										<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
											<h3 className="text-2xl font-bold text-gray-900 dark:text-[#f3f4f6] mb-2 sm:mb-0">
												{exp.title}
											</h3>
											<span className="text-sm text-gray-500 dark:text-[#a3aed0]">
												{formatDate(exp.startDate)} -{' '}
												{formatDate(exp.endDate)}
											</span>
										</div>
										<div className="mb-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
											{exp.organization}
										</div>
										<div className="mb-2 text-gray-600 dark:text-[#a3aed0]">
											{exp.location}
										</div>
										<p className="text-gray-700 dark:text-[#cbd5e1]">
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
