import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Building2, MapPin, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const headerClass = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled 
      ? `${isDarkMode ? 'bg-slate-900/95 shadow-lg' : 'bg-white/95 shadow-md'}` 
      : `${isDarkMode ? 'bg-transparent' : 'bg-transparent'}`
  }`;

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Delhi', path: '/city/delhi', icon: <MapPin size={18} /> },
    { name: 'Mumbai', path: '/city/mumbai', icon: <MapPin size={18} /> },
    { name: 'Pune', path: '/city/pune', icon: <MapPin size={18} /> },
    { name: 'Kolkata', path: '/city/kolkata', icon: <MapPin size={18} /> },
    { name: 'Know More about Me', path: 'https://subhayanmukherjee.netlify.app/', icon: <Building2 size={18} /> },
  ];

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2" 
            onClick={() => setIsMenuOpen(false)}
          >
            <Building2 className={`h-7 w-7 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`} />
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'} transition-colors`}>
              Indian Prices Prediction
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  {link.path.startsWith('http') ? (
                    <a 
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-1 px-2 py-2 transition-colors ${
                        isDarkMode ? 'text-slate-200 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className={`flex items-center space-x-1 px-2 py-2 transition-colors ${
                        location.pathname === link.path 
                          ? `font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}` 
                          : `${isDarkMode ? 'text-slate-200 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`
                      }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-800 text-yellow-300' : 'bg-slate-100 text-slate-700'} transition-colors`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-800 text-yellow-300' : 'bg-slate-100 text-slate-700'} transition-colors`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={toggleMenu} 
              aria-label="Toggle menu"
              className={`p-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`fixed inset-0 top-16 z-40 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} md:hidden`}>
          <nav className="container mx-auto px-4 py-6">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  {link.path.startsWith('http') ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 py-3 text-lg ${
                        isDarkMode ? 'text-slate-200' : 'text-slate-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className={`flex items-center space-x-2 py-3 text-lg ${
                        location.pathname === link.path 
                          ? `font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}` 
                          : `${isDarkMode ? 'text-slate-200' : 'text-slate-600'}`
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;