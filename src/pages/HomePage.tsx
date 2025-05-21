import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Zap, TrendingUp, Building, UserCircle as LoaderCircle } from 'lucide-react';
import CityCard from '../components/CityCard';
import { useTheme } from '../context/ThemeContext';
import kolkata from '../images/Kolkata.jpg';
import mumbai from '../images/Mumbai.jpg';
import pune from '../images/pune.jpeg';
import delhi from '../images/Delhi.jpg';
import hero from '../images/Hero.jpg';

const cities = [
  {
    id: 1,
    name: 'Delhi',
    image: delhi,
    description: 'Explore rental predictions in India\'s vibrant capital city',
  },
  {
    id: 2,
    name: 'Mumbai',
    image: mumbai,
    description: 'Discover rental trends in the financial capital of India',
  },
  {
    id: 3,
    name: 'Pune',
    image: pune,
    description: 'Find rental insights in Maharashtra\'s cultural hub',
  },
  {
    id: 4,
    name: 'Kolkata',
    image: kolkata,
    description: 'Analyze rental values in the City of Joy',
  },
];

const features = [
  {
    id: 1,
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    title: 'AI-Powered Predictions',
    description: 'Our advanced algorithms analyze thousands of market data points to provide accurate rental predictions.'
  },
  {
    id: 2,
    icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
    title: 'Market Trends Analysis',
    description: 'Stay informed with the latest rental trends and market shifts across major Indian cities.'
  },
  {
    id: 3,
    icon: <Building className="h-8 w-8 text-blue-500" />,
    title: 'Property Insights',
    description: 'Get detailed insights on property types, neighborhood comparisons, and rental opportunities.'
  },
  {
    id: 4,
    icon: <Home className="h-8 w-8 text-blue-500" />,
    title: 'Location Intelligence',
    description: 'Discover how location factors influence rental values in different parts of each city.'
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-slate-900/70' : 'bg-blue-900/30'}`}></div>
          <img 
            src={hero}
            alt="Indian cityscape" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Predict Tomorrow's Prices, Today!
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Leverage AI-powered insights to make smart housing decisions across India's major cities
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('cities-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg"
              >
                Explore Cities
              </button>
              <button className="px-8 py-3 bg-white hover:bg-slate-100 text-blue-800 font-medium rounded-lg transition-colors shadow-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 opacity-90"></div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Why Choose Our Prediction Platform?
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              We combine cutting-edge technology with deep market expertise to deliver reliable housing price forecasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.id} 
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-slate-800 hover:bg-slate-800/80' : 'bg-white hover:bg-slate-50'} 
                transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1`}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  {feature.title}
                </h3>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Cities Section */}
      <section id="cities-section" className={`py-16 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Explore Housing Predictions By City
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Select a city to discover detailed housing price predictions and market insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city) => (
              <CityCard 
                key={city.id}
                city={city}
                onClick={() => navigate(`/city/${city.name.toLowerCase()}`)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Disclaimer Section */}
      <section className={`py-8 ${isDarkMode ? 'bg-slate-900' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Predictions are based on available data and statistical models. Actual values may vary and this information should not be considered a guarantee or exact representation of future outcomes.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Ready to Predict Your Future Property Value?
            </h2>
            <p className={`text-xl mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Start exploring housing price trends in your preferred city today.
            </p>
            <button 
              onClick={() => document.getElementById('cities-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg text-lg"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;