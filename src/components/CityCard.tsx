import React from 'react';
import { MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface City {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface CityCardProps {
  city: City;
  onClick: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, onClick }) => {
  const { isDarkMode } = useTheme();

  return (
    <div 
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl cursor-pointer
      transform transition-all duration-300 hover:-translate-y-2 group
      ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={city.image} 
          alt={`${city.name} cityscape`} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          <h3 className="text-white text-xl font-bold">{city.name}</h3>
          <MapPin className="text-blue-400 h-5 w-5" />
        </div>
      </div>
      <div className="p-4">
        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mb-3`}>
          {city.description}
        </p>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
            View Predictions
          </span>
          <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Updates as per data 
          </span>
        </div>
      </div>
    </div>
  );
};

export default CityCard;