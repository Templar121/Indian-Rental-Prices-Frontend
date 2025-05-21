import React from 'react';
import { Quote } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-md relative`}>
      <Quote className="absolute top-4 right-4 h-10 w-10 text-blue-200 opacity-40" />
      <div className="mb-4 relative z-10">
        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} italic`}>
          "{testimonial.content}"
        </p>
      </div>
      <div className="flex items-center">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            {testimonial.name}
          </h4>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;