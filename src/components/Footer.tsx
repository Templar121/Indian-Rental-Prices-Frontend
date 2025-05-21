import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  const cities = [
    { name: 'Delhi', path: '/city/delhi' },
    { name: 'Mumbai', path: '/city/mumbai' },
    { name: 'Pune', path: '/city/pune' },
    { name: 'Kolkata', path: '/city/kolkata' },
  ];
  
  const resources = [
    { name: 'Price Trends', path: '/trends' },
    { name: 'Market Analysis', path: '/analysis' },
    { name: 'Housing News', path: '/news' },
    { name: 'Investment Guide', path: '/guide' },
  ];

  return (
    <footer className={`${isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-800 text-white'}`}>
      {/* Decorative pattern - abstract representation of Indian architecture */}
      <div className="h-6 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 opacity-90 pattern-zigzag"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-7 w-7 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Indian Prices Prediction</h3>
            </div>
            <p className="text-slate-300 mb-4">
              Accurate housing price predictions for major Indian cities, powered by advanced AI algorithms and market analysis.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-blue-400 hover:text-blue-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-blue-400 hover:text-blue-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-blue-400 hover:text-blue-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-blue-400 hover:text-blue-300 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Cities */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Cities</h3>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={city.path}>
                  <Link 
                    to={city.path} 
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <MapPin size={16} className="mr-2" /> {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.path}>
                  <Link 
                    to={resource.path} 
                    className="text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-blue-400" />
                <span className="text-slate-300">
                  123 Property Lane, Cyber City<br />
                  New Delhi, 110001
                </span>
              </p>
              <p className="flex items-center">
                <Phone size={18} className="mr-2 text-blue-400" />
                <span className="text-slate-300">+91 98765 43210</span>
              </p>
              <p className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-400" />
                <span className="text-slate-300">info@indianprices.com</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Indian Prices Prediction. Made with ❤️ by{' '}
            <a 
              href="https://github.com/subhayanmukherjee" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Subhayan Mukherjee
            </a>
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Terms</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;