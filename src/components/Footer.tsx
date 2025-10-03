import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
  <footer className="bg-gray-900 dark:bg-[#181f3a] text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">ML Portfolio</h3>
              <p className="text-gray-400">
                Building intelligent systems with machine learning
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/fayaz-shaik-01"
                target="_blank"
                rel="noopener noreferrer"
                className="accent p-3 bg-gray-800 dark:bg-blue-600 rounded-full hover:bg-gray-700 dark:hover:bg-blue-700 transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/shaik-fayaz-177526190/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#contact"
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p className="flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> and
              machine learning • {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
