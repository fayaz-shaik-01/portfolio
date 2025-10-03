import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: 'home' },
  { label: 'Projects', href: 'projects' },
  { label: 'Experience', href: 'experience' },
  { label: 'Skills', href: 'skills' },
  { label: 'Learn', href: '/portfolio/learn', isRoute: true },
  { label: 'Contact', href: 'contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      // Always navigate to /portfolio/ for section links
      navigate('/portfolio/', { replace: false });
      // Delay scroll to section until after navigation
      setTimeout(() => {
        scrollToSection(item.href);
      }, 50);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="/portfolio/#home"
            onClick={(e) => handleNavClick(e, navItems[0])}
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Shaik Fayaz
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.isRoute ? item.href : `/portfolio/#${item.href}`}
                onClick={(e) => handleNavClick(e, item)}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.isRoute ? item.href : `/portfolio/#${item.href}`}
                onClick={(e) => handleNavClick(e, item)}
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
