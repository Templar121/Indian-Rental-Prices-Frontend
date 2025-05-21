import React, { useState } from 'react';
import { Check, UserCircle as LoaderCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useApiStatus, predictPrice } from '../services/api';

interface PredictionFormProps {
  cityName: string;
}

const delhiLocations = ['Kalkaji', 'Mansarover Garden', 'Uttam Nagar', 'Model Town', 'Sector 13 Rohini', 'DLF Farms', 'laxmi nagar', 'Swasthya Vihar', 'Janakpuri', 'Pitampura', 'Gagan Vihar', 'Dabri', 'Govindpuri Extension', 'Paschim Vihar', 'Vijay Nagar', 'Vasant Kunj', 'Safdarjung Enclave', 'Hauz Khas', 'Bali Nagar', 'Rajouri Garden', 'Shalimar Bagh', 'Green Park', 'Dr Mukherji Nagar', 'Subhash Nagar', 'DLF Phase 5', 'Patel Nagar', 'Jasola', 'Dwarka Mor', 'Kaushambi', 'Surajmal Vihar', 'Sector 4 Dwarka', 'Sector 6 Dwarka', 'Sector 14 Dwarka', 'Sarvodaya Enclave', 'Chattarpur', 'Ramesh Nagar', 'Mayur Vihar II', 'Naraina', 'Greater Kailash', 'Chittaranjan Park', 'Sector 19 Dwarka', 'Sector 23 Dwarka', 'Lajpat Nagar III', 'South Extension 2', 'Sector-18 Dwarka', 'Mansa Ram Park', 'Gautam Nagar', 'Sector 22 Dwarka', 'Sheikh Sarai', 'Govindpuri', 'Sector 13 Dwarka', 'Shanti Niketan', 'Defence Colony', 'Malviya Nagar', 'Sector 23 Rohini', 'Kirti Nagar', 'Badarpur', 'Lajpat Nagar I', 'Sector-7 Rohini', 'Sector 23B Dwarka', 'vikaspuri', 'SULTANPUR', 'Sector 11 Dwarka', 'Karampura', 'Munirka', 'Mahavir Enclave', 'Greater kailash 1', 'Panchsheel Park', 'Sector 12 Dwarka', 'Sector 7 Dwarka', 'Bindapur', 'Alaknanda', 'Sitapuri', 'Dashrath Puri', 'Manglapuri', 'Sector 8 Dwarka', 'Sector 5 Dwarka', 'Kalyan Vihar', 'Sector-B Vasant Kunj', 'Green Park Extension', 'Safdarjung Development Area', 'Panchsheel Enclave', 'Lajpat Nagar', 'Shastri Nagar', 'Jor bagh', 'Golf Links', 'Vasant Vihar', 'Anand Niketan', 'Anand Lok', 'East of Kailash', 'Gulmohar park', 'Zone L Dwarka', 'Raja garden', 'Kalu Sarai', 'Tagore Garden Extension', 'Saket', 'Sector 2 Dwarka', 'Geeta Colony', 'Anand Vihar', 'Ashok Nagar', 'Dilshad Garden', 'Gujranwala Town', 'Sector 10 Dwarka', 'Sector 16 Dwarka', 'Palam', 'Vikas Puri', 'Masjid Moth Village', 'Sewak Park', 'Sagar Pur', 'Kamla Nagar', 'Ajmeri Gate', 'Rajpur', 'Jangpura', 'Greater Kailash II', 'Garhi', 'Nizamuddin East', 'Ansari Nagar West', 'Sat Bari', 'Central Ridge Reserve Forest', 'New Friends Colony', 'Sector 3 Dwarka', 'Sector 9 Dwarka', 'Moti Bagh', 'Sainik Farm', 'Karol Bagh', 'Sarvpriya Vihar', 'Uday Park', 'Kailash hills', 'Geetanjali Enclave', 'Soami Nagar', 'masoodpur', 'Mehrauli', 'Shakurpur', 'Razapur Khurd', 'Matiala', 'Khirki Extension', 'Sector 11 Rohini', 'Sector 8', 'Khushi Ram Park Delhi', 'dwarka sector 17', 'Preet Vihar', 'mayur vihar phase 1', 'Rajpur Khurd Village', 'Freedom Fighters Enclave', 'Inderpuri', 'Rajpur Khurd Extension', 'Navjeevan Vihar', 'Vishnu Garden', 'Shahdara', 'Patparganj', 'IP Extension', 'Punjabi Bagh', 'AGCR Enclave', 'Rajinder Nagar', 'Krishna Nagar', 'Niti Bagh', 'Shakurbasti', 'Sundar Nagar', 'Sector 11', 'Sector 16A Dwarka', 'Guru Angad Nagar', 'SECTOR 7 DWARKA NEW DELHI', 'Tuglak Road', 'Maharani Bagh', 'Friends Colony', 'Moti Nagar', 'New Moti Nagar', 'Shivalik', 'Shahpur Jat Village', 'Naraina Vihar', 'Sector 1 Dwarka', 'Tihar Village', 'Nizamuddin West', 'Ladosarai', 'Haiderpur', 'New Ashok Nagar', 'Jangpura Extension', 'Neb Sarai', 'Sunder Nagar', 'Mayur Vihar Phase II', 'West End', 'Ghitorni', 'Prithviraj Road', 'Malcha Marg', 'Lodhi Road', 'Tilak Marg', 'B1 Block Paschim Vihar', 'Sector 6 Rohini', 'New Rajinder Nagar', 'Aurungzeb Road', 'Amrita Shergill Marg', 'Babar Road', 'Lodhi Gardens', 'Lodhi Estate', 'East Patel Nagar', 'Sector 17 Dwarka', 'B 5 Block', 'New Rajendra Nagar', 'Lajpat Nagar IV', 'Prakash Mohalla Amritpuri', 'Rohini Sector 9', 'Old Rajender Nagar', 'Mayur Vihar 2 Phase', 'Dwarka 11 Sector', 'dwarka sector 12', 'Kishan Ganj', 'i p extension patparganj', 'Sector 14 Rohini', 'Amritpuri', 'Jamia Nagar', 'Kailash Colony', 'Prakash Mohalla', 'Hemkunt Colony', 'Chhatarpur Extension', 'Lajpat Nagar II', 'Connaught Place', 'Uttam Nagar west', 'Poorvi Pitampura', 'Vaishali Dakshini Pitampura', 'Uttari Pitampura', 'Sector 9 Rohini', 'Vasant Kunj Sector A', 'SectorB Vasant Kunj', 'Baljeet Nagar', 'PANCHSHEEL VIHAR', 'Lok Vihar', 'Dakshini Pitampura', 'Kohat Enclave', 'Saraswati Vihar', 'Prashant Vihar Sector 14', 'Engineers Enclave Harsh Vihar', 'Tarun Enclave', 'Block MP Poorvi Pitampura', 'Block PP Poorvi Pitampura', 'Kapil Vihar', 'Hauz Khas Enclave', 'Westend DLF Chattarpur Farms', 'Abul Fazal Enclave Jamia Nagar', 'Fateh Nagar', 'Pitampura Vaishali', 'Block DP Poorvi Pitampura', 'Block AP Poorvi Pitampura', 'Block WP Poorvi Pitampura', 'Sector 28 Rohini', 'Rohini sector 16', 'Block A3', 'Uttam Nagar East', 'Mahipalpur', 'Hari Nagar', 'Tri Nagar', 'Jhil Mil Colony', 'Yojna Vihar', 'Khanpur', 'West Patel Nagar', 'Ashok Vihar', 'Aya Nagar', 'Daheli Sujanpur', 'Khirki Extension Panchsheel Vihar', 'C R Park', 'Chhattarpur Enclave Phase1', 'Bawana', 'West Punjabi Bagh', 'Burari', 'Shakti Nagar', 'Sarita Vihar', 'Sector 3 Rohini', 'Mandawali', 'Vinod Nagar East', 'Sector 22 Rohini', 'Sheikh Sarai Village', 'Shakurpur Colony', 'Nangloi', 'Nehru Place', 'Mayur Vihar', 'Lajpat Nagar Vinoba Puri', 'Block E Lajpat Nagar I', 'Nawada', 'Nangli Sakrawati', 'Sector 34 Rohini', 'Nirman Vihar', 'Chattarpur Enclave', 'Vasant Kunj Enclave', 'Mayur Vihar 1 Extension', 'Santnagar', 'Kasturba Gandhi Marg', 'Vipin Garden', 'West Patel Nagar Road', 'dda flat'];

const mumbaiLocations = ['Ulwe', 'Panvel', 'Kandivali West', 'Chembur', 'Badlapur East', 'Dombivali', 'Bandra West', 'Andheri East', 'Bhayandar East', 'Goregaon West', 'Colaba', 'Kalamboli', 'Palghar', 'Nerul', 'Kandivali East', 'Sion', 'Andheri West', 'Juhu', 'Vasai', 'Thakurli', 'Powai', 'Jogeshwari East', 'Mira Road East', 'Thane West', 'Parel', 'Prabhadevi', 'Ghatkopar East', 'Kalyan West', 'Dadar East', 'vile parle west', 'Bhandup West', 'Borivali East', 'Mahalaxmi', 'Kanjurmarg', 'Seawoods', 'Dombivali East', 'Titwala', 'Karanjade', 'Girgaon', 'Malabar Hill', 'Dadar West', 'Goregaon East', 'Mahim', 'Sanpada', 'Mulund West', 'Tardeo', 'Malad East', 'Borivali West', 'Malad West', 'Kharghar', 'Jogeshwari West', 'Kamothe', 'Bandra East', 'Worli', 'Ville Parle East', 'Mulund East', 'Vikhroli', 'Ghatkopar West', 'Dombivli (West)', 'Cumballa Hill', 'Khar', 'Vevoor', 'Kanjurmarg East', 'Lower Parel', 'Marine Lines', 'Hiranandani Estates', 'Napeansea Road', 'Nala Sopara', 'Khar West', 'Byculla', 'Cuffe Parade', 'Matunga', 'Vasai east', 'MATUNGA WEST', 'Gamdevi', 'Agripada', 'Jacob Circle', 'Wadala', 'Sewri', 'Belapur', 'Airoli', 'Deonar', 'Dahisar West', 'Dahisar', 'Virar', 'Ghansoli', 'Boisar', 'Kalyan East', 'Churchgate', 'Kurla', 'Kurla East', 'Govandi', 'Tilak Nagar', 'Santosh Nagar', 'matunga east', 'Koper Khairane', 'Palava', 'Vashi', 'Santacruz West', 'Santacruz East', 'Bhayandar West', 'Bandra Kurla Complex', 'Dharamveer Nagar', 'Nalasopara West', 'Kalwa', 'Ville Parle West', 'Antarli', 'Shil Phata', 'Amrut Nagar', 'Virar East', 'Sector 21 Kamothe', 'Naigaon East', 'Khardi', 'Diva Gaon', 'Diva', 'Vasai West', 'Koproli', 'DN Nagar', 'Ambernath West', 'St Andrew Rd', 'Balkum', 'CBD Belapur East', 'Borivali (West)', 'Breach Candy', 'Sector 21 Ghansoli', 'Sector6 Kopar Khairane', 'Bhandup East', 'Parel Village', 'Pali Hill', 'Juhu Tara Rd', 'Juhu Scheme', 'Ghansoli Gaon', 'Mahape', 'Koparkhairane Station Road', 'Sector 5 Ghansoli', 'Mahim West', 'Marol andheri east', 'Badlapur West', 'juhu tara', 'Rasayani', 'Bhiwandi', 'Versova', 'Yari Road', 'colaba post office', 'Aarya Chanakya Nagar', 'Akurli Road', 'Akurli Road Number 1', 'Sector-15 Ghansoli', 'Walkeshwar', 'Sector-16 Koparkhairane', 'Carter Road', 'Marine Drive', 'Kasar vadavali', 'Sakinaka Andheri east', 'Ambernath East', 'Lokhandwala', 'nallasopara W', 'Seven Bunglow', 'Babhai Naka', 'Babhai', 'Kastur Park', 'yogi nagar', 'Jayraj Nagar near Yogi Nagar', 'Rabale', 'Virar West', 'Devidas Cross Lane', 'Devidas Rd', 'Ghodbunder Road', 'Kurla West', 'Piramal Nagar Housing Society Road', 'Taloja', 'Suyog Nagar', 'Hendre Pada', 'Peddar Road', 'Sector-19 Koper Khairane', 'Majiwada thane', 'karanjade panvel', 'Saphale', 'Syndicate', 'Sector5 Kopar Khairane', 'Nalasopara East', 'Gulmohar Road', 'Dahisar East', 'vakola santacuz e', 'Dharavi', 'Kapurbawadi', 'Vakola', 'Sector 12 Kharghar', 'Saki Naka'];

const puneLocations = ['Lohegaon', 'Anand Nagar', 'Wagholi', 'Sangamvadi', 'Wadgaon Sheri', 'Tathawade', 'Hinjewadi', 'Viman Nagar', 'Undri', 'Pimple Nilakh', 'Kharadi', 'Mohammed wadi', 'NIBM Annex Mohammadwadi', 'Bavdhan', 'Balewadi', 'Chinchwad', 'Hadapsar', 'Gultekdi', 'Karve Nagar', 'Baner', 'Sopan Baug', 'Dhayari', 'Koregaon Park', 'Gahunje', 'Yerawada', 'Chakan', 'Wakad', 'Wanowrie', 'Hingne Budrukh', 'Talegaon Dabhade', 'Chikhali', 'Loni Kalbhor', 'Pashan', 'Sukhsagar Nagar', 'Vishrantwadi', 'Pimple Gurav', 'Pimpri Chinchwad', 'Mahalunge', 'Vadgaon Budruk', 'Ganga Dham', 'Aundh', 'Narhe', 'Tingre Nagar', 'Mundhwa', 'Ghorpadi', 'Kondhwa', 'Dhanori', 'Hinjawadi Village', 'Pimple Saudagar', 'Bibwewadi', 'Kothrud', 'Shivane', 'Dhayari Phata', 'Ambegaon Budruk', 'Warje', 'New Kalyani Nagar', 'Kalas', 'Sus', 'Khadki', 'Kalyani Nagar', 'Patil Nager', 'Ravet', 'Wanwadi', 'Lulla Nagar', 'NIBM Annexe', 'Thergaon', 'Pimpri', 'Erandwane', 'Rahatani', 'Katraj', 'Shivaji Nagar', 'Kargil Vijay Nagar', 'Dhaygude Wada', 'Charholi Budruk', 'Sunarwadi', 'Chandan Nagar', 'Magarpatta', 'Kothrud Depot Road', 'Shirur', 'Moshi', 'Erandavana', 'Shindenagar', 'Khandve Nagar', 'Vanaz corner', 'khese park', 'NIBM', 'Wadgaon Budruk', 'Shivtirth Nagar', 'Bhairav Nagar', 'Vishnupuram Colony', 'Punawale', 'Alandi', 'Deccan', 'Vishal Nagar', 'Bopodi', 'Vishnu Dev Nagar', 'Shikshak nagar', 'Bhusari colony right', 'Sadashiv Peth', 'Narayan Peth', 'Fatima Nagar', 'Swargate', 'Shaniwar Peth', 'Warje Malwadi', 'Deccan Gymkhana', 'Sanaswadi', 'Porwal Road', 'Senapati Bapat Road', 'Manjari', 'Fursungi', 'Keshav Nagar', 'Lonikand', 'Nigdi', 'Kalewadi', 'Yewalewadi', 'Prabhat Road', 'kesnand', 'Vikas Nagar', 'Law College Road', 'Dighi', 'Akurdi', 'Dattavadi', 'Ashok Nagar', 'Model Colony', 'Baramati', 'Yamuna Nagar', 'Pradhikaran Nigdi', 'Maan', 'Pisoli', 'NIBM Road', 'Handewadi', 'Marunji', 'Mamurdi', 'hingne Khurd', 'Manjari Budruk', 'Indryani nagar', 'Chimbali', 'Old Kharadi Mundwa Road', 'Bopkhel', 'Baner Road', 'Ubale Nagar', 'Kaspate Wasti', 'Sector 25 Pradhikaran', 'Baner Pashan Link Road', 'Someshwarwadi', 'Landewadi', 'Sakal Nagar', 'Bhukum', 'Nigdi Sector 26', 'Cummins College Road', 'Bhosari', 'Parvati Darshan', 'Bhugaon', 'Kondhwa Budruk', 'Karve Road Erandwane', 'Bhelkenagar', 'Mohan Nagar', 'RMC Garden, Wagholi', 'Somnath Nagar', 'Veerbhadra Nagar', 'BT Kawde', 'Somatane Phata', 'New DP Road', 'Pratik Nagar Mohanwadi', 'New Modikhana', 'Siddartha Nagar', 'Balewadi High Street', 'Parihar Chowk', 'Siddharth nagar', 'Sanewadi', 'ITI road', 'Salunke Vihar', 'Bakhori', 'Sahakar Nagar', 'Bibwewadi Kondhwa Road', 'Mukund Nagar', 'Padmavati', 'Dhankawadi Road', 'Dhanakwadi', 'Bharati Vidyapeeth Campus', 'Satara road', 'New Sangavi', 'Hatti Chowk', 'Teen Hatti Chowk Road', 'SURESH NAGAR', 'Dhankawadi', 'Purnanagar', 'Saswad', 'Ambegaon Pathar', 'Dapodi', 'Borhade Wadi', 'Jawalkar Nagar', 'Maharashtra Housing Board', 'Vishal nagar square new dp road', 'Hadapsar Gaon', 'Kiwale', 'Rambaug Colony', 'Indrayani Nagar Sector 2', 'Walhekarwadi Chinchwad', 'Kolwadi', 'Sant tukaram Nagar', 'Kalewadi Main', 'Sai Nagar', 'charholi Khurd', 'Sector No 28', 'Chinchwade Nagar', 'Gokhalenagar', 'Talwade', 'B T Kawde Road', 'Tulaja Bhawani Nagar', 'Tukaram Nagar', 'Kasba Peth', 'Aundh Gaon', 'Old Sangvi', 'Shikrapur', 'Renuka Nagar', 'Agalambe', 'Ganj Peth', 'Talegaon', 'Pashan Sus Road', 'Shewalewadi', ' Kharadi', 'Kasarwadi', 'Taljai Temple Road', 'Dighi Gaonthan', 'Pan Card Club Road'];

const house_type_mapping = {
  'Apartment': 0,
  'Floor': 1,
  'House': 2,
  'Villa': 3,
  'penthouse': 4
};

const status_mapping = {
  'Unfurnished': 0,
  'Semi-Furnished': 1,
  'Furnished': 2,
};

const getCityCode = (cityName: string) => {
  const cityMapping: { [key: string]: number } = {
    'Delhi': 0,
    'Mumbai': 1,
    'Pune': 2,
    'Kolkata': 4
  };
  return cityMapping[cityName.toLowerCase()] || 5;
};

const getLocationOptions = (cityName: string) => {
  switch(cityName.toLowerCase()) {
    case 'delhi':
      return delhiLocations;
    case 'mumbai':
      return mumbaiLocations;
    case 'pune':
      return puneLocations;
    default:
      return [];
  }
};

const PredictionForm: React.FC<PredictionFormProps> = ({ cityName }) => {
  const { isDarkMode } = useTheme();
  const { isReady, isLoading, error: apiError } = useApiStatus(cityName.toLowerCase() === 'kolkata');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    house_type: 'Apartment',
    location: '',
    numBathrooms: '2',
    numBalconies: '1',
    isNegotiable: 'yes',
    verificationDate: formattedDate,
    SecurityDeposit: '50000',
    Status: 'Unfurnished',
    bhk: '3',
    house_size_sqft: '1200',
  });

  if (cityName.toLowerCase() === 'kolkata') {
    return (
      <div className={`p-8 rounded-lg text-center ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          Coming Soon
        </h3>
        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Rental price predictions for Kolkata will be available soon. Stay tuned!
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoaderCircle className={`animate-spin h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
        <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
          Initializing prediction service...
        </p>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900/50' : 'bg-red-50'}`}>
        <div className="flex items-center">
          <AlertCircle className={`h-5 w-5 ${isDarkMode ? 'text-red-400' : 'text-red-500'} mr-2`} />
          <p className={isDarkMode ? 'text-red-200' : 'text-red-700'}>
            {apiError}
          </p>
        </div>
      </div>
    );
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const requestData = {
      house_type: house_type_mapping[formData.house_type as keyof typeof house_type_mapping],
      city: cityName,
      location: formData.location,
      numBathrooms: parseInt(formData.numBathrooms),
      numBalconies: parseInt(formData.numBalconies),
      isNegotiable: formData.isNegotiable === 'yes' ? 1.0 : 0.0,
      verificationDate: formData.verificationDate,
      SecurityDeposit: parseInt(formData.SecurityDeposit),
      Status: status_mapping[formData.Status as keyof typeof status_mapping],
      bhk: parseInt(formData.bhk),
      house_size_sqft: parseInt(formData.house_size_sqft)
    };

    try {
      const result = await predictPrice(requestData, cityName.toLowerCase() === 'kolkata');
      
      if (result.status === 'success') {
        const price = result.predicted_price;
        let formattedPrice = '';
        if (price >= 100000) {
          formattedPrice = `₹${(price / 100000).toFixed(2)} Lakh`;
        } else {
          formattedPrice = `₹${price.toFixed(2)} Thousand`;
        }
        
        setPrediction(formattedPrice);
        setShowResult(true);
      } else {
        throw new Error('Prediction failed');
      }
    } catch (error) {
      setError('Failed to get prediction. Please try again.');
      setShowResult(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Property Type
            </label>
            <select
              name="house_type"
              value={formData.house_type}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            >
              {Object.keys(house_type_mapping).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Location
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            >
              <option value="">Select location</option>
              {getLocationOptions(cityName).map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              BHK
            </label>
            <select
              name="bhk"
              value={formData.bhk}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            >
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num} BHK</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Bathrooms
            </label>
            <select
              name="numBathrooms"
              value={formData.numBathrooms}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            >
              {[1,2,3,4].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Balconies
            </label>
            <select
              name="numBalconies"
              value={formData.numBalconies}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            >
              {[0,1,2,3].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Area (sq.ft)
            </label>
            <input
              type="number"
              name="house_size_sqft"
              value={formData.house_size_sqft}
              onChange={handleChange}
              placeholder="e.g. 1000"
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Security Deposit
            </label>
            <input
              type="number"
              name="SecurityDeposit"
              value={formData.SecurityDeposit}
              onChange={handleChange}
              placeholder="Amount in ₹"
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Status
            </label>
            <select
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            >
              {Object.keys(status_mapping).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Negotiable
            </label>
            <select
              name="isNegotiable"
              value={formData.isNegotiable}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Verification Date
            </label>
            <input
              type="date"
              name="verificationDate"
              value={formData.verificationDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 px-4 rounded-md ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-medium transition-colors flex items-center justify-center mt-6`}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin mr-2 h-5 w-5" />
              Calculating...
            </>
          ) : 'Predict Price'}
        </button>
      </form>
      
      {showResult && prediction && (
        <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-blue-50'} transition-all`}>
          <div className="flex items-center mb-2">
            <Check className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'} mr-2`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Predicted Monthly Rent
            </h3>
          </div>
          <div className="text-center">
            <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {prediction}
            </p>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Estimated rental value in {cityName}
            </p>
          </div>
          <div className={`text-xs mt-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Predictions are based on available data and statistical models. Actual values may vary and this information should not be considered a guarantee or exact representation of future outcomes.
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;