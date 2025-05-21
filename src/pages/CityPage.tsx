import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, ArrowLeft, LineChart, TrendingUp, MapPin, Building, Calendar } from 'lucide-react';
import PredictionForm from '../components/PredictionForm';
import PriceChart from '../components/PriceChart';
import { useTheme } from '../context/ThemeContext';
import kolkata from '../images/Kolkata.jpg';
import mumbai from '../images/Mumbai.jpg';
import pune from '../images/pune.jpeg';
import delhi from '../images/Delhi.jpg';


interface CityInfo {
  name: string;
  fullName: string;
  landmark: string;
  image: string;
  description: string;
  averagePrice: string;
  growth: string;
  hotAreas: string[];
}

const cityData: Record<string, CityInfo> = {
  delhi: {
    name: 'Delhi',
    fullName: 'New Delhi',
    landmark: 'India Gate',
    image: delhi,
    description: 'As India\'s capital, Delhi offers diverse housing options from luxury apartments in South Delhi to affordable housing in NCR regions.',
    averagePrice: '₹12,500/sq.ft',
    growth: '+5.2% YoY',
    hotAreas: ['South Delhi', 'Dwarka', 'Noida Extension', 'Rohini'],
  },
  mumbai: {
    name: 'Mumbai',
    fullName: 'Mumbai (Bombay)',
    landmark: 'Gateway of India',
    image: mumbai,
    description: 'Mumbai, India\'s financial capital, has some of the country\'s most premium real estate with significant variations across its diverse neighborhoods.',
    averagePrice: '₹19,850/sq.ft',
    growth: '+3.7% YoY',
    hotAreas: ['Bandra', 'Powai', 'Andheri West', 'Navi Mumbai'],
  },
  pune: {
    name: 'Pune',
    fullName: 'Pune',
    landmark: 'Shaniwar Wada',
    image: pune,
    description: 'Pune\'s real estate offers a perfect blend of modern housing developments alongside historical neighborhoods and educational institutions.',
    averagePrice: '₹7,200/sq.ft',
    growth: '+6.8% YoY',
    hotAreas: ['Kothrud', 'Baner', 'Viman Nagar', 'Hinjewadi'],
  },
  kolkata: {
    name: 'Kolkata',
    fullName: 'Kolkata (Calcutta)',
    landmark: 'Victoria Memorial',
    image: kolkata,
    description: 'Kolkata offers a unique mix of colonial-era properties and new developments, with excellent connectivity and cultural significance.',
    averagePrice: '₹6,400/sq.ft',
    growth: '+4.1% YoY',
    hotAreas: ['Salt Lake City', 'New Town', 'Ballygunge', 'Alipore'],
  },
};

const CityPage = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [city, setCity] = useState<CityInfo | null>(null);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    if (cityName && cityData[cityName.toLowerCase()]) {
      setCity(cityData[cityName.toLowerCase()]);
      // Update page title with city name
      document.title = `${cityData[cityName.toLowerCase()].name} Housing Predictions`;
    }
  }, [cityName]);

  if (!city) {
    return (
      <div className={`pt-24 min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-100'}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">City not found</h2>
          <p className="mb-6">We couldn't find data for the requested city.</p>
          <Link to="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white'}`}>
      {/* Hero Section with Landmark Background */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-slate-900/70' : 'bg-blue-900/40'}`}></div>
          <img 
            src={city.image} 
            alt={city.landmark} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 z-10">
          <Link to="/" className="inline-flex items-center text-white mb-6 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {city.name} Housing Price Predictions
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {city.description}
            </p>
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3 text-white">
                <div className="text-sm opacity-80">Average Price</div>
                <div className="font-semibold text-xl">{city.averagePrice}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3 text-white">
                <div className="text-sm opacity-80">Annual Growth</div>
                <div className="font-semibold text-xl text-green-400">{city.growth}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3 text-white">
                <div className="text-sm opacity-80">Last Updated</div>
                <div className="font-semibold text-xl">{new Date('2024-04-15').toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 opacity-90"></div>
      </section>

      {/* Prediction Tools Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Prediction Form */}
              <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  <Building className="inline-block mr-2 h-6 w-6 text-blue-500" />
                  Predict {city.name} Property Prices
                </h2>
                <PredictionForm cityName={city.name} />
              </div>
              
              {/* Price Chart */}
              <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  <LineChart className="inline-block mr-2 h-6 w-6 text-blue-500" />
                  Price Trends (2020-2025)
                </h2>
                <PriceChart cityName={city.name} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Property Hotspots Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              <MapPin className="inline-block mr-2 h-7 w-7 text-blue-500" />
              {city.name} Property Hotspots
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Explore trending neighborhoods with strong investment potential
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {city.hotAreas.map((area, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'} 
                transition-colors cursor-pointer text-center`}
              >
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  {area}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Detailed analysis coming soon
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Market Insights */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-900' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              <TrendingUp className="inline-block mr-2 h-7 w-7 text-blue-500" />
              {city.name} Market Insights
            </h2>
            
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-md mb-6`}>
              <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Current Market Overview
              </h3>
              <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {city.name}'s real estate market shows {city.growth.includes('+') ? 'positive' : 'negative'} growth trends with particular strength in residential apartments and commercial spaces near {city.hotAreas[0]} and {city.hotAreas[1]}.
              </p>
              <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Investors are primarily focused on 2-3 BHK apartments, with growing interest in premium housing segments. Infrastructure developments around {city.hotAreas[2]} are expected to drive significant price appreciation in the coming years.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                <Calendar className="inline-block mr-2 h-5 w-5 text-blue-500" />
                Future Outlook (2024-2025)
              </h3>
              <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Our AI models predict continued growth in {city.name}'s housing market, with an estimated annual appreciation of 5-7% in prime locations. The {city.hotAreas[0]} and {city.hotAreas[3]} areas are projected to outperform the overall market.
              </p>
              <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Upcoming metro expansions and commercial developments are likely to boost property values in peripheral areas, creating new investment opportunities for early movers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Want Personalized Price Predictions?
            </h2>
            <p className={`text-xl mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Sign up for custom reports and expert insights tailored to your specific investment needs.
            </p>
            <button 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg text-lg"
            >
              Get Custom Analysis
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CityPage;