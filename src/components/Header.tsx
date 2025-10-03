import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: 'home' },
  { label: 'Projects', href: 'projects' },
  { label: 'Experience', href: 'experience' },
  { label: 'Skills', href: 'skills' },
  { label: 'Learn', href: '/portfolio/learn', isRoute: true },
  { label: 'Contact', href: 'contact' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Always enable dark mode by default
    document.documentElement.classList.add('dark');
    if (!darkMode) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    e.preventDefault();
    if (item.isRoute) {
      navigate(item.href);
      setIsMenuOpen(false);
    } else {
      navigate('/portfolio/', { replace: false });
      setTimeout(() => {
        scrollToSection(item.href);
      }, 50);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-950 shadow-sm z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="/portfolio/#home"
            onClick={(e) => handleNavClick(e, navItems[0])}
            className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 transition-colors"
          >
            Shaik Fayaz
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.isRoute ? item.href : `/portfolio/#${item.href}`}
                onClick={(e) => handleNavClick(e, item)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            {/* Dark mode toggle */}
            <button
              className="ml-6 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2 transition-colors border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setDarkMode((d) => !d)}
              aria-label="Toggle dark mode"
            >
              <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {darkMode ? 'Dark' : 'Light'}
              </span>
              {darkMode ? (
                <Moon className="w-5 h-5 text-blue-500" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-900 dark:text-gray-100" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900 dark:text-gray-100" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.isRoute ? item.href : `/portfolio/#${item.href}`}
                onClick={(e) => handleNavClick(e, item)}
                className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            {/* Dark mode toggle for mobile */}
            <button
              className="mt-4 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2 transition-colors border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 w-full justify-center"
              onClick={() => setDarkMode((d) => !d)}
              aria-label="Toggle dark mode"
            >
              <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {darkMode ? 'Dark' : 'Light'}
              </span>
              {darkMode ? (
                <Moon className="w-5 h-5 text-blue-500" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
