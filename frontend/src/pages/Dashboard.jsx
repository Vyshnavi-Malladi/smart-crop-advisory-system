// import { useState, useEffect } from "react";
// import { motion } from 'framer-motion';
// import { Cloud, Sun, Droplets, Wind, ArrowRight, Sprout, TrendingUp, AlertCircle, ShoppingBag, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import api from '../api';
// import { User, Home } from "lucide-react";
// import { useTranslation } from 'react-i18next';

// export default function Dashboard() {
//     const { t } = useTranslation();
//     const [farmerProfile, setFarmerProfile] = useState(null);

// const [loadingProfile, setLoadingProfile] = useState(true);
//     const [weather, setWeather] = useState(null);
//     const [locationName, setLocationName] = useState(t('loading_weather'));


//     const [sowingDate, setSowingDate] = useState('');
// const [selectedCrop, setSelectedCrop] = useState('rice');


//     const [cropStage, setCropStage] = useState(null);
// const [tempDate, setTempDate] = useState('');


//     const crops = ['rice', 'wheat', 'maize', 'cotton', 'tomato', 'potato'];




// const saveGrowth = async (date, crop) => {
//     try {
//         await api.post("/growth", {
//             sowingDate: date,
//             crop
//         });
//     } catch (err) {
//         console.error("Save Growth Error:", err);
//     }
// };




//     useEffect(() => {
//         fetchFarmerProfile();
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(success, error);
//         } else {
//             setLocationName(t('location_not_supported'));
//         }

//         if (sowingDate) {
//             calculateCropStage(sowingDate, selectedCrop);
//         }
//     }, [sowingDate, selectedCrop]);






//     useEffect(() => {
//     const fetchGrowth = async () => {
//         try {
//             const res = await api.get("/growth");

            
//            if (res.data && res.data.sowingDate) {
//     setSowingDate(res.data.sowingDate);
//     setSelectedCrop(res.data.crop || 'rice');
   
// }
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     fetchGrowth();
// }, []);

// const fetchFarmerProfile = async () => {

//     try {

//         const res = await api.get("/farmer");

//         if (res.data.exists) {

//             setFarmerProfile(res.data.profile);

//         }

//     }

//     catch (err) {

//         console.log(err);

//     }

//     finally {

//         setLoadingProfile(false);

//     }

// };

//     const success = (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         fetchWeather(lat, lon);
//     };

//     const error = () => {
//         setLocationName(t('location_denied'));
//         fetchWeather(28.61, 77.20);
//     };

//     const fetchWeather = async (lat, lon) => {
//         try {
//             const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability`);
//             const data = await res.json();

//             setWeather({
//                 temp: Math.round(data.current_weather.temperature),
//                 condition: getWeatherCondition(data.current_weather.weathercode),
//                 wind: Math.round(data.current_weather.windspeed),
//                 humidity: data.hourly.relativehumidity_2m[0],
//                 rain_prob: data.hourly.precipitation_probability ? data.hourly.precipitation_probability[0] : 0,
//                 code: data.current_weather.weathercode
//             });
//             setLocationName(`${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`);
//         } catch (err) {
//             console.error("Weather fetch failed", err);
//         }
//     };

//     const getWeatherCondition = (code) => {

//     if (code <= 3) return t("weather_clear");
//     if (code <= 48) return t("weather_foggy");
//     if (code <= 67) return t("weather_rainy");
//     if (code <= 77) return t("weather_snowy");
//     return t("weather_stormy");

// };

//     const isSafeToSpray = () => {
//         if (!weather) return true;
//         // Unsafe if Wind > 15km/h OR Rain Probability > 50% OR Condition is Rainy/Stormy
//         if (weather.wind > 15 || weather.rain_prob > 50 || weather.code > 60) return false;
//         return true;
//     };

//     const calculateCropStage = (dateStr, crop) => {
//         const start = new Date(dateStr);
//         const today = new Date();
//         const diffTime = Math.abs(today - start);
//         const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//         // Simplified Logic: Different crops have shorter/longer cycles
//         // Rice: ~120 days, Wheat: ~140 days
//         const totalDays = crop === 'wheat' ? 140 : 120;

//         let stage = { key: 'germination', progress: 10, color: 'bg-emerald-200 text-emerald-800' };

// if (days > 15)
//   stage = { key: 'vegetative', progress: 40, color: 'bg-green-200 text-green-800' };

// if (days > (totalDays * 0.4))
//   stage = { key: 'flowering', progress: 70, color: 'bg-yellow-200 text-yellow-800' };

// if (days > (totalDays * 0.8))
//   stage = { key: 'harvest', progress: 100, color: 'bg-amber-200 text-amber-800' };

//         setCropStage({ days, ...stage, totalDays });
        
//     };

//     const container = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: { staggerChildren: 0.1 }
//         }
//     };

//     return (
//         <div className="space-y-8">
//             {/* Header */}
//             {/* <div className="flex flex-col md:flex-row justify-between items-end gap-4">
//                 <div>
//                     <h1 className="text-4xl font-bold text-gray-800">{t('my_farm')}</h1>
//                     <p className="text-gray-500 mt-1 flex items-center gap-2"><MapPin size={16} /> {locationName}</p>
//                 </div>
//                 <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
//                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
//                     <span className="text-sm font-medium text-gray-600">{t('system_op')}</span>
//                 </div>
//             </div> */}



// {/* ================= WELCOME SECTION ================= */}

// <div className="mb-8 mt-6">

//     <div className="flex flex-col gap-1">

        

//         <h1 className="text-3xl font-semibold text-gray-900">
//             Welcome,{" "}
//             <span className="text-primary">
//                 {farmerProfile?.fullName || "Farmer"}
//             </span>
//         </h1>

//         <p className="text-gray-500 text-base mt-1">
//             Here's what's happening on your farm today.
//         </p>

//     </div>

// </div>

//             {/* Extreme Weather Alert */}
//             {weather && (weather.code > 90 || weather.wind > 40) && (
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3"
//                 >
//                     <AlertCircle className="text-red-500 mt-1" />
//                     <div>
//                         <h3 className="font-bold text-red-700">{t('weather_alert')}!</h3>
//                         <p className="text-red-600 text-sm">{weather.code > 90 ? t("severe_thunderstorm") : t("wind_high")}. Secure your crops.</p>
//                     </div>
//                 </motion.div>
//             )}

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Weather Widget */}
//                 <motion.div
//     id="weather-card"
//     style={{
//         position:"relative",
//         zIndex:9996
//     }}
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-primary-dark text-white p-8 shadow-glass-hover"
//                 >
//                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>

//                     <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 h-full">
//                         <div className="flex items-center gap-6">
//                             <Sun size={64} className="text-accent animate-pulse" />
//                             <div>
//                                 {weather ? (
//                                     <>
//                                         <div className="text-5xl font-bold">{weather.temp}°C</div>
//                                         <div className="text-xl opacity-90">{weather.condition}</div>
//                                     </>
//                                 ) : (
//                                     <div className="animate-pulse">{t('loading_weather')}</div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="flex gap-8 text-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
//                             <div>
//                                 <div className="flex items-center justify-center gap-1 opacity-75 mb-1"><Droplets size={16} /> {t('humidity')}</div>
//                                 <div className="text-xl font-bold">{weather?.humidity || '--'}%</div>
//                             </div>
//                             <div className="w-px bg-white/20"></div>
//                             <div>
//                                 <div className="flex items-center justify-center gap-1 opacity-75 mb-1"><Wind size={16} /> {t('wind')}</div>
//                                 <div className="text-xl font-bold">{weather?.wind || '--'} km/h</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Spray Guidance Badge */}
//                     {weather && (
//                         <div className={`absolute bottom-4 right-4 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2
//                     ${isSafeToSpray() ? 'bg-green-500 text-white' : 'bg-red-500 text-white animate-pulse'}`}>
//                             {isSafeToSpray() ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
//                             {isSafeToSpray() ? t('safe_to_spray') : t('unsafe_to_spray')}
//                         </div>
//                     )}
//                 </motion.div>

//                {/* Crop Growth Tracker Widget */}
// <div
//     id="crop-tracker"
//     className="glass-card bg-white p-6 relative"
// >
//     <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//         <Calendar size={20} className="text-primary" /> {t('crop_tracker')}
//     </h3>

//     {!sowingDate ? (
//         <>
//             <div className="mb-4">
//                 <label className="text-xs font-bold text-gray-400 uppercase">
//                     {t('select_crop')}
//                 </label>
//                 <select
//                     value={selectedCrop}
//                     onChange={(e) => setSelectedCrop(e.target.value)}
//                     className="w-full mt-1 p-2 rounded-lg bg-gray-50 border border-gray-200 text-sm"
//                 >
//                     {crops.map(c => (
//                         <option key={c} value={c}>
//     {t(`crop_names.${c}`)}
// </option>
//                     ))}
//                 </select>
//             </div>

//             <div className="text-center py-4">
//                 <p className="text-gray-500 mb-2 text-sm">
//                     {t('enter_sowing_date')}
//                 </p>

//                 <input
//                     type="date"
//                     className="input-field text-sm w-full mb-3"
//                     value={tempDate}
//                     onChange={(e) => setTempDate(e.target.value)}
//                 />

//                 {/* ✅ NEW BUTTON */}
//                 <button
//                     onClick={() => {
//     if (tempDate) {
//         setSowingDate(tempDate);
//         saveGrowth(tempDate, selectedCrop); 
//         setTempDate('');  // ✅ SAVE TO DB
//     }
// }}
//                     disabled={!tempDate}
//                     className={`w-full py-2 rounded-lg text-sm font-semibold transition 
//                         ${tempDate 
//                             ? "bg-primary text-white hover:opacity-90" 
//                             : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         }`}
//                 >
//                     {t("track_growth")}
//                 </button>
//             </div>
//         </>
//     ) : (
//         <div className="space-y-4">
//             <div className="flex justify-between items-center">
//                 <div className="text-sm">
//                     <span className="text-gray-500 block">{t('crop')}</span>
//                     <span className="font-bold text-primary">
//     {t(`crop_names.${selectedCrop}`)}
// </span>
//                 </div>
//                 <div className="text-right">
//                     <span className="text-sm text-gray-500 block">{t('days_passed')}</span>
//                     <span className="text-2xl font-bold text-gray-800">
//                       {cropStage?.days || 0} {t('days')}
//                     </span>
//                 </div>
//             </div>

//             <div className="space-y-2">
//                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
//                     <span>{t('current_stage')}</span>
//                     <span className={cropStage?.color ? cropStage.color.split(' ')[1] : ''}>
//                         {cropStage?.key ? t(cropStage.key) : '--'}
//                     </span>
//                 </div>

//                 <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
//                     <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: `${cropStage?.progress || 0}%` }}
//                         className={`h-full ${
//                             cropStage?.color
//                                 ? cropStage.color.split(' ')[0]
//                                 : 'bg-gray-200'
//                         }`}
//                     />
//                 </div>
//             </div>

//             <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
//                 <h4 className="text-xs font-bold text-blue-700 uppercase mb-1">
//                     {t('advice')}
//                 </h4>
//               <p className="text-xs text-blue-800 leading-relaxed">
//     {cropStage?.key === "germination" && t('advice_germination')}
// {cropStage?.key === "vegetative" && t('advice_vegetative')}
// {cropStage?.key === "flowering" && t('advice_flowering')}
// {cropStage?.key === "harvest" && t('advice_harvest')}
// </p>
//             </div>

//             <div className="pt-2 mt-2 border-t border-gray-100 flex gap-2">
//                 <button
//     onClick={async () => {
//         try {
//             await api.post("/growth", {
//                 sowingDate: "",
//                 crop: ""
//             });

//             setSowingDate('');
//             setTempDate('');
//             setSelectedCrop('rice');
//             setCropStage(null);

//         } catch (err) {
//             console.error(err);
//         }
//     }}
//     className="text-xs text-gray-400 hover:text-red-500"
// >
//     {t('reset')}
// </button>
//             </div>
//         </div>
//     )}
// </div>
//             </div>
//             {/* Quick Actions Grid */}
//             <motion.div
//                 variants={container}
//                 initial="hidden"
//                 animate="show"
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//             >
//                 <ActionCard
//     id="crop-consult-card"
//     to="/crop-recommend"
//                     title={t('crop_consult')}
//                     desc={t('crop_consult_desc')}
//                     icon={<Sprout size={28} />}
//                     color="bg-green-100 text-green-600"
//                     delay={0}
//                     t={t}
//                 />
//                 <ActionCard
//     id="yield-card"
//     to="/yield-predict"
//                     title={t('yield_forecast')}
//                     desc={t('yield_forecast_desc')}
//                     icon={<TrendingUp size={28} />}
//                     color="bg-blue-100 text-blue-600"
//                     delay={0.1}
//                     t={t}
//                 />
//             <ActionCard
//     id="disease-card"
//     to="/disease-detect"
//                     title={t('disease_lab')}
//                     desc={t('disease_lab_desc')}
//                     icon={<AlertCircle size={28} />}
//                     color="bg-red-100 text-red-600"
//                     delay={0.2}
//                     t={t}
//                 />
//                <ActionCard
//     id="store-card"
//     to="/store"
//                     title={t('farm_store')}
//                     desc={t('farm_store_desc')}
//                     icon={<ShoppingBag size={28} />}
//                     color="bg-amber-100 text-amber-600"
//                     delay={0.3}
//                     t={t}
//                 />
//             </motion.div>
//         </div>
//     );
// }

// function ActionCard({
//     id,
//     to,
//     title,
//     desc,
//     icon,
//     color,
//     delay,
//     t
// }) {
//     return (
//         <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
//             <Link
//     id={id}
//     to={to} className="group block h-full bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-glass-hover hover:-translate-y-1 transition-all">
//                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
//                     {icon}
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
//                 <p className="text-sm text-gray-500 mb-4">{desc}</p>
//                 <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
//                     {t('launch_tool')} <ArrowRight size={16} className="ml-1" />
//                 </div>
//             </Link>
//         </motion.div>
//     );
// }








// import { useState, useEffect } from "react";
// import { motion } from 'framer-motion';
// import { Cloud, Sun, Droplets, Wind, ArrowRight, Sprout, TrendingUp, AlertCircle, ShoppingBag, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import api from '../api';
// import { User, Home } from "lucide-react";
// import { useTranslation } from 'react-i18next';

// export default function Dashboard() {
//     const { t } = useTranslation();
//     const getGreeting = () => {
//     const hour = new Date().getHours();

//     if (hour < 12) return t("good_morning");
//     if (hour < 17) return t("good_afternoon");
//     if (hour < 21) return t("good_evening");

//     return t("good_night");
// };
//     const [farmerProfile, setFarmerProfile] = useState(null);
//     const [loadingProfile, setLoadingProfile] = useState(true);
//     const [weather, setWeather] = useState(null);
//     const [locationName, setLocationName] = useState(t('loading_weather'));
//     const [sowingDate, setSowingDate] = useState('');
//     const [selectedCrop, setSelectedCrop] = useState('rice');
//     const [cropStage, setCropStage] = useState(null);
//     const [tempDate, setTempDate] = useState('');

//     const crops = ['rice', 'wheat', 'maize', 'cotton', 'tomato', 'potato'];

//     const saveGrowth = async (date, crop) => {
//         try {
//             await api.post("/growth", {
//                 sowingDate: date,
//                 crop
//             });
//         } catch (err) {
//             console.error("Save Growth Error:", err);
//         }
//     };

//     useEffect(() => {
//         fetchFarmerProfile();
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(success, error);
//         } else {
//             setLocationName(t('location_not_supported'));
//         }

//         if (sowingDate) {
//             calculateCropStage(sowingDate, selectedCrop);
//         }
//     }, [sowingDate, selectedCrop]);

//     useEffect(() => {
//         const fetchGrowth = async () => {
//             try {
//                 const res = await api.get("/growth");
//                 if (res.data && res.data.sowingDate) {
//                     setSowingDate(res.data.sowingDate);
//                     setSelectedCrop(res.data.crop || 'rice');
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchGrowth();
//     }, []);

//     const fetchFarmerProfile = async () => {
//         try {
//             const res = await api.get("/farmer");
//             if (res.data.exists) {
//                 setFarmerProfile(res.data.profile);
//             }
//         } catch (err) {
//             console.log(err);
//         } finally {
//             setLoadingProfile(false);
//         }
//     };

//     const success = (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         fetchWeather(lat, lon);
//     };

//     const error = () => {
//         setLocationName(t('location_denied'));
//         fetchWeather(28.61, 77.20);
//     };

//     const fetchWeather = async (lat, lon) => {
//         try {
//             const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability`);
//             const data = await res.json();

//             setWeather({
//                 temp: Math.round(data.current_weather.temperature),
//                 condition: getWeatherCondition(data.current_weather.weathercode),
//                 wind: Math.round(data.current_weather.windspeed),
//                 humidity: data.hourly.relativehumidity_2m[0],
//                 rain_prob: data.hourly.precipitation_probability ? data.hourly.precipitation_probability[0] : 0,
//                 code: data.current_weather.weathercode
//             });
//             setLocationName(`${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`);
//         } catch (err) {
//             console.error("Weather fetch failed", err);
//         }
//     };

//     const getWeatherCondition = (code) => {
//         if (code <= 3) return t("weather_clear");
//         if (code <= 48) return t("weather_foggy");
//         if (code <= 67) return t("weather_rainy");
//         if (code <= 77) return t("weather_snowy");
//         return t("weather_stormy");
//     };

//     const isSafeToSpray = () => {
//         if (!weather) return true;
//         if (weather.wind > 15 || weather.rain_prob > 50 || weather.code > 60) return false;
//         return true;
//     };

//     const calculateCropStage = (dateStr, crop) => {
//         const start = new Date(dateStr);
//         const today = new Date();
//         const diffTime = Math.abs(today - start);
//         const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//         const totalDays = crop === 'wheat' ? 140 : 120;

//         let stage = { key: 'germination', progress: 10, color: 'bg-emerald-200 text-emerald-800' };

//         if (days > 15)
//             stage = { key: 'vegetative', progress: 40, color: 'bg-green-200 text-green-800' };

//         if (days > (totalDays * 0.4))
//             stage = { key: 'flowering', progress: 70, color: 'bg-yellow-200 text-yellow-800' };

//         if (days > (totalDays * 0.8))
//             stage = { key: 'harvest', progress: 100, color: 'bg-amber-200 text-amber-800' };

//         setCropStage({ days, ...stage, totalDays });
//     };

//     const container = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: { staggerChildren: 0.1 }
//         }
//     };

//     return (
//         <div className="space-y-8">
//             {/* ================= WELCOME SECTION ================= */}
//             <div className="mb-8 mt-6">
//                 <div className="flex flex-col gap-1">
//                   <h1 className="text-3xl font-semibold text-gray-900">
//     {getGreeting()},
//     <span className="text-primary ml-2">
//         {farmerProfile?.fullName || t("farmer")}
//     </span>
// </h1>
//                     <p className="text-gray-500 text-base mt-1">
//                         {t('dashboard_subtitle')}
//                     </p>
//                 </div>
//             </div>

//             {/* Extreme Weather Alert */}
//             {weather && (weather.code > 90 || weather.wind > 40) && (
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3"
//                 >
//                     <AlertCircle className="text-red-500 mt-1" />
//                     <div>
//                         <h3 className="font-bold text-red-700">{t('weather_alert')}!</h3>
//                         <p className="text-red-600 text-sm">{weather.code > 90 ? t("severe_thunderstorm") : t("wind_high")}. {t('secure_crops')}</p>
//                     </div>
//                 </motion.div>
//             )}

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Weather Widget */}
//                 <motion.div
//                     id="weather-card"
//                     style={{
//                         position: "relative",
//                         zIndex: 9996
//                     }}
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-primary-dark text-white p-8 shadow-glass-hover"
//                 >
//                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>

//                     <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 h-full">
//                         <div className="flex items-center gap-6">
//                             <Sun size={64} className="text-accent animate-pulse" />
//                             <div>
//                                 {weather ? (
//                                     <>
//                                         <div className="text-5xl font-bold">{weather.temp}°C</div>
//                                         <div className="text-xl opacity-90">{weather.condition}</div>
//                                     </>
//                                 ) : (
//                                     <div className="animate-pulse">{t('loading_weather')}</div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="flex gap-8 text-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
//                             <div>
//                                 <div className="flex items-center justify-center gap-1 opacity-75 mb-1"><Droplets size={16} /> {t('humidity')}</div>
//                                 <div className="text-xl font-bold">{weather?.humidity || '--'}%</div>
//                             </div>
//                             <div className="w-px bg-white/20"></div>
//                             <div>
//                                 <div className="flex items-center justify-center gap-1 opacity-75 mb-1"><Wind size={16} /> {t('wind')}</div>
//                                 <div className="text-xl font-bold">{weather?.wind || '--'} km/h</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Spray Guidance Badge */}
//                     {weather && (
//                         <div className={`absolute bottom-4 right-4 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2
//                     ${isSafeToSpray() ? 'bg-green-500 text-white' : 'bg-red-500 text-white animate-pulse'}`}>
//                             {isSafeToSpray() ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
//                             {isSafeToSpray() ? t('safe_to_spray') : t('unsafe_to_spray')}
//                         </div>
//                     )}
//                 </motion.div>

//                 {/* Crop Growth Tracker Widget */}
//                 <div
//                     id="crop-tracker"
//                     className="glass-card bg-white p-6 relative"
//                 >
//                     <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                         <Calendar size={20} className="text-primary" /> {t('crop_tracker')}
//                     </h3>

//                     {!sowingDate ? (
//                         <>
//                             <div className="mb-4">
//                                 <label className="text-xs font-bold text-gray-400 uppercase">
//                                     {t('select_crop')}
//                                 </label>
//                                 <select
//                                     value={selectedCrop}
//                                     onChange={(e) => setSelectedCrop(e.target.value)}
//                                     className="w-full mt-1 p-2 rounded-lg bg-gray-50 border border-gray-200 text-sm"
//                                 >
//                                     {crops.map(c => (
//                                         <option key={c} value={c}>
//                                             {t(`crop_names.${c}`)}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="text-center py-4">
//                                 <p className="text-gray-500 mb-2 text-sm">
//                                     {t('enter_sowing_date')}
//                                 </p>

//                                 <input
//                                     type="date"
//                                     className="input-field text-sm w-full mb-3"
//                                     value={tempDate}
//                                     onChange={(e) => setTempDate(e.target.value)}
//                                 />

//                                 <button
//                                     onClick={() => {
//                                         if (tempDate) {
//                                             setSowingDate(tempDate);
//                                             saveGrowth(tempDate, selectedCrop);
//                                             setTempDate('');
//                                         }
//                                     }}
//                                     disabled={!tempDate}
//                                     className={`w-full py-2 rounded-lg text-sm font-semibold transition 
//                                         ${tempDate 
//                                             ? "bg-primary text-white hover:opacity-90" 
//                                             : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                         }`}
//                                 >
//                                     {t("track_growth")}
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <div className="space-y-4">
//                             <div className="flex justify-between items-center">
//                                 <div className="text-sm">
//                                     <span className="text-gray-500 block">{t('crop')}</span>
//                                     <span className="font-bold text-primary">
//                                         {t(`crop_names.${selectedCrop}`)}
//                                     </span>
//                                 </div>
//                                 <div className="text-right">
//                                     <span className="text-sm text-gray-500 block">{t('days_passed')}</span>
//                                     <span className="text-2xl font-bold text-gray-800">
//                                         {cropStage?.days || 0} {t('days')}
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
//                                     <span>{t('current_stage')}</span>
//                                     <span className={cropStage?.color ? cropStage.color.split(' ')[1] : ''}>
//                                         {cropStage?.key ? t(cropStage.key) : '--'}
//                                     </span>
//                                 </div>

//                                 <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
//                                     <motion.div
//                                         initial={{ width: 0 }}
//                                         animate={{ width: `${cropStage?.progress || 0}%` }}
//                                         className={`h-full ${
//                                             cropStage?.color
//                                                 ? cropStage.color.split(' ')[0]
//                                                 : 'bg-gray-200'
//                                         }`}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
//                                 <h4 className="text-xs font-bold text-blue-700 uppercase mb-1">
//                                     {t('advice')}
//                                 </h4>
//                                 <p className="text-xs text-blue-800 leading-relaxed">
//                                     {cropStage?.key === "germination" && t('advice_germination')}
//                                     {cropStage?.key === "vegetative" && t('advice_vegetative')}
//                                     {cropStage?.key === "flowering" && t('advice_flowering')}
//                                     {cropStage?.key === "harvest" && t('advice_harvest')}
//                                 </p>
//                             </div>

//                             <div className="pt-2 mt-2 border-t border-gray-100 flex gap-2">
//                                 <button
//                                     onClick={async () => {
//                                         try {
//                                             await api.post("/growth", {
//                                                 sowingDate: "",
//                                                 crop: ""
//                                             });
//                                             setSowingDate('');
//                                             setTempDate('');
//                                             setSelectedCrop('rice');
//                                             setCropStage(null);
//                                         } catch (err) {
//                                             console.error(err);
//                                         }
//                                     }}
//                                     className="text-xs text-gray-400 hover:text-red-500"
//                                 >
//                                     {t('reset')}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Quick Actions Grid */}
//             <motion.div
//                 variants={container}
//                 initial="hidden"
//                 animate="show"
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
//             >
//                 <ActionCard
//                     id="crop-consult-card"
//                     to="/crop-recommend"
//                     title={t('crop_consult')}
//                     desc={t('crop_consult_desc')}
//                     icon={<Sprout size={28} />}
//                     color="bg-green-100 text-green-600"
//                     delay={0}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="yield-card"
//                     to="/yield-predict"
//                     title={t('yield_forecast')}
//                     desc={t('yield_forecast_desc')}
//                     icon={<TrendingUp size={28} />}
//                     color="bg-blue-100 text-blue-600"
//                     delay={0.1}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="disease-card"
//                     to="/disease-detect"
//                     title={t('disease_lab')}
//                     desc={t('disease_lab_desc')}
//                     icon={<AlertCircle size={28} />}
//                     color="bg-red-100 text-red-600"
//                     delay={0.2}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="soil-card"
//                     to="/soil-centers"
//                     title={t('soil_centers')}
//                     desc={t('soil_centers_desc')}
//                     icon={<MapPin size={28} />}
//                     color="bg-purple-100 text-purple-600"
//                     delay={0.3}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="store-card"
//                     to="/store"
//                     title={t('farm_store')}
//                     desc={t('farm_store_desc')}
//                     icon={<ShoppingBag size={28} />}
//                     color="bg-amber-100 text-amber-600"
//                     delay={0.4}
//                     t={t}
//                 />
//             </motion.div>
//         </div>
//     );
// }

// function ActionCard({
//     id,
//     to,
//     title,
//     desc,
//     icon,
//     color,
//     delay,
//     t
// }) {
//     return (
//         <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
//             <Link
//                 id={id}
//                 to={to}
//                 className="group block h-full bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-glass-hover hover:-translate-y-1 transition-all"
//             >
//                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
//                     {icon}
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
//                 <p className="text-sm text-gray-500 mb-4">{desc}</p>
//                 <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
//                     {t('launch_tool')} <ArrowRight size={16} className="ml-1" />
//                 </div>
//             </Link>
//         </motion.div>
//     );
// }













// import { useState, useEffect } from "react";
// import { motion } from 'framer-motion';
// import { Cloud, Sun, Droplets, Wind, ArrowRight, Sprout, TrendingUp, AlertCircle, ShoppingBag, MapPin, Calendar, CheckCircle2, Microscope } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import api from '../api';
// import { useTranslation } from 'react-i18next';

// export default function Dashboard() {
//     const { t } = useTranslation();
//     const getGreeting = () => {
//         const hour = new Date().getHours();
//         if (hour < 12) return t("good_morning");
//         if (hour < 17) return t("good_afternoon");
//         if (hour < 21) return t("good_evening");
//         return t("good_night");
//     };
    
//     const [farmerProfile, setFarmerProfile] = useState(null);
//     const [loadingProfile, setLoadingProfile] = useState(true);
//     const [weather, setWeather] = useState(null);
//     const [locationName, setLocationName] = useState(t('loading_weather'));
//     const [sowingDate, setSowingDate] = useState('');
//     const [selectedCrop, setSelectedCrop] = useState('rice');
//     const [cropStage, setCropStage] = useState(null);
//     const [tempDate, setTempDate] = useState('');

//     const crops = ['rice', 'wheat', 'maize', 'cotton', 'tomato', 'potato'];

//     const saveGrowth = async (date, crop) => {
//         try {
//             await api.post("/growth", {
//                 sowingDate: date,
//                 crop
//             });
//         } catch (err) {
//             console.error("Save Growth Error:", err);
//         }
//     };

//     useEffect(() => {
//         fetchFarmerProfile();
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(success, error);
//         } else {
//             setLocationName(t('location_not_supported'));
//         }

//         if (sowingDate) {
//             calculateCropStage(sowingDate, selectedCrop);
//         }
//     }, [sowingDate, selectedCrop]);

//     useEffect(() => {
//         const fetchGrowth = async () => {
//             try {
//                 const res = await api.get("/growth");
//                 if (res.data && res.data.sowingDate) {
//                     setSowingDate(res.data.sowingDate);
//                     setSelectedCrop(res.data.crop || 'rice');
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchGrowth();
//     }, []);

//     const fetchFarmerProfile = async () => {
//         try {
//             const res = await api.get("/farmer");
//             if (res.data.exists) {
//                 setFarmerProfile(res.data.profile);
//             }
//         } catch (err) {
//             console.log(err);
//         } finally {
//             setLoadingProfile(false);
//         }
//     };

//     const success = (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         fetchWeather(lat, lon);
//     };

//     const error = () => {
//         setLocationName(t('location_denied'));
//         fetchWeather(28.61, 77.20);
//     };

//     const fetchWeather = async (lat, lon) => {
//         try {
//             const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability`);
//             const data = await res.json();

//             setWeather({
//                 temp: Math.round(data.current_weather.temperature),
//                 condition: getWeatherCondition(data.current_weather.weathercode),
//                 wind: Math.round(data.current_weather.windspeed),
//                 humidity: data.hourly.relativehumidity_2m[0],
//                 rain_prob: data.hourly.precipitation_probability ? data.hourly.precipitation_probability[0] : 0,
//                 code: data.current_weather.weathercode
//             });
//             setLocationName(`${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`);
//         } catch (err) {
//             console.error("Weather fetch failed", err);
//         }
//     };

//     const getWeatherCondition = (code) => {
//         if (code <= 3) return t("weather_clear");
//         if (code <= 48) return t("weather_foggy");
//         if (code <= 67) return t("weather_rainy");
//         if (code <= 77) return t("weather_snowy");
//         return t("weather_stormy");
//     };

//     const isSafeToSpray = () => {
//         if (!weather) return true;
//         if (weather.wind > 15 || weather.rain_prob > 50 || weather.code > 60) return false;
//         return true;
//     };

//     const calculateCropStage = (dateStr, crop) => {
//         const start = new Date(dateStr);
//         const today = new Date();
//         const diffTime = Math.abs(today - start);
//         const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//         const totalDays = crop === 'wheat' ? 140 : 120;

//         let stage = { key: 'germination', progress: 10, color: 'bg-emerald-200 text-emerald-800' };

//         if (days > 15)
//             stage = { key: 'vegetative', progress: 40, color: 'bg-green-200 text-green-800' };

//         if (days > (totalDays * 0.4))
//             stage = { key: 'flowering', progress: 70, color: 'bg-yellow-200 text-yellow-800' };

//         if (days > (totalDays * 0.8))
//             stage = { key: 'harvest', progress: 100, color: 'bg-amber-200 text-amber-800' };

//         setCropStage({ days, ...stage, totalDays });
//     };

//     const container = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: { staggerChildren: 0.1 }
//         }
//     };

//     return (
//         <div className="space-y-8">
//             {/* ================= WELCOME SECTION ================= */}
//             <div className="mb-8 mt-6">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                     <div className="flex flex-col gap-1">
//                         <h1 className="text-3xl font-semibold text-gray-900">
//                             {getGreeting()},
//                             <span className="text-primary ml-2">
//                                 {farmerProfile?.fullName || t("farmer")}
//                             </span>
//                         </h1>
//                         <p className="text-gray-500 text-base mt-1">
//                             {t('dashboard_subtitle')}
//                         </p>
//                     </div>
                    
//                     {/* OPTION 4: Split Layout with Color Block - Soil Testing Centers */}
//                     <Link
//                         to="/soil-centers"
//                         className="group relative flex items-stretch bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-emerald-200 transition-all duration-400 hover:-translate-y-1.5 overflow-hidden lg:min-w-[400px]"
//                     >
//                         {/* Left - Icon Section with Gradient */}
//                         <div className="w-24 bg-gradient-to-b from-emerald-500 to-green-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
//                             <div className="relative">
//                                 <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
//                                 <Microscope size={32} className="text-white relative" />
//                                 <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
//                                     <span className="text-[7px] font-bold text-emerald-600">✓</span>
//                                 </div>
//                             </div>
//                         </div>
                        
//                         {/* Right - Content */}
//                         <div className="flex-1 p-4 pr-5">
//                             <div className="flex items-start justify-between">
//                                 <div>
//                                     <div className="flex items-center gap-2">
//                                         <h3 className="text-base font-bold text-gray-800">
//                                             {t("soil_testing_centers")}
//                                         </h3>
//                                         <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] font-bold rounded-full">
//                                             {t("new")}
//                                         </span>
//                                     </div>
//                                     <p className="text-sm text-gray-500 mt-0.5">
//                                         {t("soil_testing_desc")}
//                                     </p>
//                                 </div>
//                                 <div className="bg-emerald-50 p-2 rounded-xl group-hover:bg-emerald-100 transition-all">
//                                     <ArrowRight size={16} className="text-emerald-600 group-hover:translate-x-1 transition-transform" />
//                                 </div>
//                             </div>
                            
//                             <div className="flex items-center gap-3 mt-2.5">
//                                 <div className="flex items-center gap-1.5">
//                                     <MapPin size={11} className="text-emerald-500" />
//                                     <span className="text-xs text-gray-600 font-medium">{t("find_nearby")}</span>
//                                 </div>
//                                 <div className="w-px h-4 bg-gray-200"></div>
//                                 <div className="flex items-center gap-1">
//                                     <span className="text-[9px] text-gray-500 font-medium">Govt.</span>
//                                     <span className="text-[8px] text-green-600">✓</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </Link>
//                 </div>
//             </div>

//             {/* Extreme Weather Alert */}
//             {weather && (weather.code > 90 || weather.wind > 40) && (
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3"
//                 >
//                     <AlertCircle className="text-red-500 mt-1" />
//                     <div>
//                         <h3 className="font-bold text-red-700">{t('weather_alert')}!</h3>
//                         <p className="text-red-600 text-sm">{weather.code > 90 ? t("severe_thunderstorm") : t("wind_high")}. {t('secure_crops')}</p>
//                     </div>
//                 </motion.div>
//             )}

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Weather Widget */}
//                 <motion.div
//                     id="weather-card"
//                     style={{
//                         position: "relative",
//                         zIndex: 9996
//                     }}
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-primary-dark text-white p-8 shadow-glass-hover"
//                 >
//                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>

//                     <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 h-full">
//                         <div className="flex items-center gap-6">
//                             <Sun size={64} className="text-accent animate-pulse" />
//                             <div>
//                                 {weather ? (
//                                     <>
//                                         <div className="text-5xl font-bold">{weather.temp}°C</div>
//                                         <div className="text-xl opacity-90">{weather.condition}</div>
//                                     </>
//                                 ) : (
//                                     <div className="animate-pulse">{t('loading_weather')}</div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="flex gap-8 text-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
//                             <div>
//                                 <div className="flex items-center justify-center gap-1 opacity-75 mb-1"><Droplets size={16} /> {t('humidity')}</div>
//                                 <div className="text-xl font-bold">{weather?.humidity || '--'}%</div>
//                             </div>
//                             <div className="w-px bg-white/20"></div>
//                             <div>
//                                 <div className="flex items-center justify-center gap-1 opacity-75 mb-1"><Wind size={16} /> {t('wind')}</div>
//                                 <div className="text-xl font-bold">{weather?.wind || '--'} km/h</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Spray Guidance Badge */}
//                     {weather && (
//                         <div className={`absolute bottom-4 right-4 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2
//                     ${isSafeToSpray() ? 'bg-green-500 text-white' : 'bg-red-500 text-white animate-pulse'}`}>
//                             {isSafeToSpray() ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
//                             {isSafeToSpray() ? t('safe_to_spray') : t('unsafe_to_spray')}
//                         </div>
//                     )}
//                 </motion.div>

//                 {/* Crop Growth Tracker Widget */}
//                 <div
//                     id="crop-tracker"
//                     className="glass-card bg-white p-6 relative"
//                 >
//                     <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                         <Calendar size={20} className="text-primary" /> {t('crop_tracker')}
//                     </h3>

//                     {!sowingDate ? (
//                         <>
//                             <div className="mb-4">
//                                 <label className="text-xs font-bold text-gray-400 uppercase">
//                                     {t('select_crop')}
//                                 </label>
//                                 <select
//                                     value={selectedCrop}
//                                     onChange={(e) => setSelectedCrop(e.target.value)}
//                                     className="w-full mt-1 p-2 rounded-lg bg-gray-50 border border-gray-200 text-sm"
//                                 >
//                                     {crops.map(c => (
//                                         <option key={c} value={c}>
//                                             {t(`crop_names.${c}`)}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="text-center py-4">
//                                 <p className="text-gray-500 mb-2 text-sm">
//                                     {t('enter_sowing_date')}
//                                 </p>

//                                 <input
//                                     type="date"
//                                     className="input-field text-sm w-full mb-3"
//                                     value={tempDate}
//                                     onChange={(e) => setTempDate(e.target.value)}
//                                 />

//                                 <button
//                                     onClick={() => {
//                                         if (tempDate) {
//                                             setSowingDate(tempDate);
//                                             saveGrowth(tempDate, selectedCrop);
//                                             setTempDate('');
//                                         }
//                                     }}
//                                     disabled={!tempDate}
//                                     className={`w-full py-2 rounded-lg text-sm font-semibold transition 
//                                         ${tempDate 
//                                             ? "bg-primary text-white hover:opacity-90" 
//                                             : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                         }`}
//                                 >
//                                     {t("track_growth")}
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <div className="space-y-4">
//                             <div className="flex justify-between items-center">
//                                 <div className="text-sm">
//                                     <span className="text-gray-500 block">{t('crop')}</span>
//                                     <span className="font-bold text-primary">
//                                         {t(`crop_names.${selectedCrop}`)}
//                                     </span>
//                                 </div>
//                                 <div className="text-right">
//                                     <span className="text-sm text-gray-500 block">{t('days_passed')}</span>
//                                     <span className="text-2xl font-bold text-gray-800">
//                                         {cropStage?.days || 0} {t('days')}
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
//                                     <span>{t('current_stage')}</span>
//                                     <span className={cropStage?.color ? cropStage.color.split(' ')[1] : ''}>
//                                         {cropStage?.key ? t(cropStage.key) : '--'}
//                                     </span>
//                                 </div>

//                                 <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
//                                     <motion.div
//                                         initial={{ width: 0 }}
//                                         animate={{ width: `${cropStage?.progress || 0}%` }}
//                                         className={`h-full ${
//                                             cropStage?.color
//                                                 ? cropStage.color.split(' ')[0]
//                                                 : 'bg-gray-200'
//                                         }`}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
//                                 <h4 className="text-xs font-bold text-blue-700 uppercase mb-1">
//                                     {t('advice')}
//                                 </h4>
//                                 <p className="text-xs text-blue-800 leading-relaxed">
//                                     {cropStage?.key === "germination" && t('advice_germination')}
//                                     {cropStage?.key === "vegetative" && t('advice_vegetative')}
//                                     {cropStage?.key === "flowering" && t('advice_flowering')}
//                                     {cropStage?.key === "harvest" && t('advice_harvest')}
//                                 </p>
//                             </div>

//                             <div className="pt-2 mt-2 border-t border-gray-100 flex gap-2">
//                                 <button
//                                     onClick={async () => {
//                                         try {
//                                             await api.post("/growth", {
//                                                 sowingDate: "",
//                                                 crop: ""
//                                             });
//                                             setSowingDate('');
//                                             setTempDate('');
//                                             setSelectedCrop('rice');
//                                             setCropStage(null);
//                                         } catch (err) {
//                                             console.error(err);
//                                         }
//                                     }}
//                                     className="text-xs text-gray-400 hover:text-red-500"
//                                 >
//                                     {t('reset')}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Quick Actions Grid - 4 Cards (Soil Centers removed from grid) */}
//             <motion.div
//                 variants={container}
//                 initial="hidden"
//                 animate="show"
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//             >
//                 <ActionCard
//                     id="crop-consult-card"
//                     to="/crop-recommend"
//                     title={t('crop_consult')}
//                     desc={t('crop_consult_desc')}
//                     icon={<Sprout size={28} />}
//                     color="bg-green-100 text-green-600"
//                     delay={0}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="yield-card"
//                     to="/yield-predict"
//                     title={t('yield_forecast')}
//                     desc={t('yield_forecast_desc')}
//                     icon={<TrendingUp size={28} />}
//                     color="bg-blue-100 text-blue-600"
//                     delay={0.1}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="disease-card"
//                     to="/disease-detect"
//                     title={t('disease_lab')}
//                     desc={t('disease_lab_desc')}
//                     icon={<AlertCircle size={28} />}
//                     color="bg-red-100 text-red-600"
//                     delay={0.2}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="store-card"
//                     to="/store"
//                     title={t('farm_store')}
//                     desc={t('farm_store_desc')}
//                     icon={<ShoppingBag size={28} />}
//                     color="bg-amber-100 text-amber-600"
//                     delay={0.3}
//                     t={t}
//                 />
//             </motion.div>
//         </div>
//     );
// }

// function ActionCard({
//     id,
//     to,
//     title,
//     desc,
//     icon,
//     color,
//     delay,
//     t
// }) {
//     return (
//         <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
//             <Link
//                 id={id}
//                 to={to}
//                 className="group block h-full bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-glass-hover hover:-translate-y-1 transition-all"
//             >
//                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
//                     {icon}
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
//                 <p className="text-sm text-gray-500 mb-4">{desc}</p>
//                 <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
//                     {t('launch_tool')} <ArrowRight size={16} className="ml-1" />
//                 </div>
//             </Link>
//         </motion.div>
//     );
// }






















// // Dashboard.jsx - Farmer's Daily Command Center
// import React, { useState, useEffect } from "react";
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { 
//   Sun, Droplets, Wind, ArrowRight, Sprout, TrendingUp, 
//   AlertCircle, ShoppingBag, Calendar, CheckCircle2, 
//   Shield, Thermometer, Leaf, Zap, Clock, 
//   FlaskConical, Droplet, Wheat, BarChart3
// } from 'lucide-react';
// import api from '../api';
// import { useTranslation } from 'react-i18next';
// import styles from './Dashboard.module.css';

// export default function Dashboard() {
//   const { t } = useTranslation();
//   const [farmerProfile, setFarmerProfile] = useState(null);
//   const [weather, setWeather] = useState(null);
//   const [sowingDate, setSowingDate] = useState('');
//   const [selectedCrop, setSelectedCrop] = useState('rice');
//   const [cropStage, setCropStage] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 17) return "Good Afternoon";
//     if (hour < 21) return "Good Evening";
//     return "Good Night";
//   };

//   useEffect(() => {
//     fetchFarmerProfile();
//     getLocation();
//   }, []);

//   const fetchFarmerProfile = async () => {
//     try {
//       const res = await api.get("/farmer");
//       if (res.data.exists) {
//         setFarmerProfile(res.data.profile);
//       }
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
//         () => fetchWeather(28.61, 77.20)
//       );
//     } else {
//       fetchWeather(28.61, 77.20);
//     }
//   };

//   const fetchWeather = async (lat, lon) => {
//     try {
//       const res = await fetch(
//         `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability`
//       );
//       const data = await res.json();
//       setWeather({
//         temp: Math.round(data.current_weather.temperature),
//         wind: Math.round(data.current_weather.windspeed),
//         humidity: data.hourly.relativehumidity_2m[0],
//       });
//     } catch (err) {
//       console.error("Weather fetch failed", err);
//     }
//   };

//   // Health metrics (mock data - replace with real API data)
//   const healthMetrics = [
//     { label: 'Soil Health', value: 82, status: 'Good', color: '#4ade80' },
//     { label: 'Water Status', value: 68, status: 'Moderate', color: '#fbbf24' },
//     { label: 'Crop Health', value: 91, status: 'Healthy', color: '#4ade80' },
//     { label: 'Disease Risk', value: 18, status: 'Low', color: '#60a5fa' },
//   ];

//   // Recommended actions
//   const actions = [
//     { icon: Droplet, label: 'Irrigation Needed', description: 'Rice needs water within 2 days', action: 'View →', color: '#3b82f6' },
//     { icon: FlaskConical, label: 'Soil Test Due', description: 'Your soil test is overdue', action: 'Find Center →', color: '#8b5cf6' },
//     { icon: AlertCircle, label: 'Disease Scan', description: 'Check your crop for early signs', action: 'Scan Crop →', color: '#ef4444' },
//   ];

//   return (
//     <div className={styles.dashboard}>
//       {/* ===== GREETING ===== */}
//       <div className={styles.greetingSection}>
//         <div>
//           <h1 className={styles.greeting}>
//             {getGreeting()}, <span className={styles.greetingName}>
//               {farmerProfile?.fullName || 'Farmer'}
//             </span>
//           </h1>
//           <p className={styles.greetingSub}>Here's what needs your attention today.</p>
//         </div>
//         <div className={styles.attentionBadge}>
//           <span className={styles.attentionDot}></span>
//           2 recommendations for you today
//         </div>
//       </div>

//       {/* ===== WEATHER + CROP TRACKER ===== */}
//       <div className={styles.gridTwoCol}>
//         {/* Weather Card */}
//         <div className={styles.weatherCard}>
//           <div className={styles.weatherGlow}></div>
//           <div className={styles.weatherContent}>
//             <div className={styles.weatherMain}>
//               <Sun size={48} className={styles.weatherIcon} />
//               <div>
//                 <div className={styles.weatherTemp}>
//                   {weather?.temp || '--'}°<span>C</span>
//                 </div>
//                 <div className={styles.weatherCondition}>Clear / Cloudy</div>
//               </div>
//             </div>
//             <div className={styles.weatherStats}>
//               <div className={styles.weatherStat}>
//                 <Droplets size={14} />
//                 <span className={styles.statLabel}>Humidity</span>
//                 <span className={styles.statValue}>{weather?.humidity || '--'}%</span>
//               </div>
//               <div className={styles.weatherDivider}></div>
//               <div className={styles.weatherStat}>
//                 <Wind size={14} />
//                 <span className={styles.statLabel}>Wind</span>
//                 <span className={styles.statValue}>{weather?.wind || '--'} km/h</span>
//               </div>
//             </div>
//           </div>
//           <div className={styles.weatherWarning}>
//             ⚠️ Conditions are unsafe for spraying
//           </div>
//         </div>

//         {/* Crop Tracker */}
//         <div className={styles.cropTracker}>
//           <div className={styles.trackerHeader}>
//             <Calendar size={18} /> Crop Tracker
//           </div>
//           <div className={styles.trackerContent}>
//             <div className={styles.trackerInfo}>
//               <div>
//                 <span className={styles.trackerLabel}>Crop</span>
//                 <span className={styles.trackerValue}>Rice</span>
//               </div>
//               <div className={styles.trackerDays}>
//                 <span className={styles.trackerLabel}>Days Passed</span>
//                 <span className={styles.trackerDaysValue}>62 <span>days</span></span>
//               </div>
//             </div>
//             <div className={styles.trackerProgress}>
//               <div className={styles.trackerStage}>
//                 <span>Current Stage</span>
//                 <span className={styles.stageHighlight}>Flowering</span>
//               </div>
//               <div className={styles.trackerBar}>
//                 <div className={styles.trackerBarFill} style={{ width: '70%' }}></div>
//               </div>
//             </div>
//             <div className={styles.trackerAction}>
//               <span>💧 Irrigate within 2 days</span>
//               <Link to="/my-crops" className={styles.trackerLink}>View Crop →</Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ===== FARM HEALTH ===== */}
//       <div className={styles.healthSection}>
//         <h2 className={styles.sectionTitle}>🌾 Farm Health</h2>
//         <div className={styles.healthGrid}>
//           {healthMetrics.map((metric, idx) => (
//             <div key={idx} className={styles.healthCard}>
//               <div className={styles.healthHeader}>
//                 <span className={styles.healthLabel}>{metric.label}</span>
//                 <span className={`${styles.healthStatus} ${metric.status === 'Good' || metric.status === 'Healthy' ? styles.statusGood : styles.statusModerate}`}>
//                   {metric.status}
//                 </span>
//               </div>
//               <div className={styles.healthBar}>
//                 <div 
//                   className={styles.healthBarFill} 
//                   style={{ width: `${metric.value}%`, background: metric.color }}
//                 ></div>
//               </div>
//               <span className={styles.healthValue}>{metric.value}%</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ===== RECOMMENDED ACTIONS ===== */}
//       <div className={styles.actionsSection}>
//         <h2 className={styles.sectionTitle}>📋 Recommended Actions</h2>
//         <div className={styles.actionsGrid}>
//           {actions.map((action, idx) => (
//             <div key={idx} className={styles.actionCard}>
//               <div className={styles.actionIcon} style={{ background: `${action.color}15`, color: action.color }}>
//                 <action.icon size={20} />
//               </div>
//               <div className={styles.actionContent}>
//                 <h3 className={styles.actionTitle}>{action.label}</h3>
//                 <p className={styles.actionDesc}>{action.description}</p>
//                 <button className={styles.actionBtn}>{action.action}</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ===== FARMXPERT TOOLS ===== */}
//       <div className={styles.toolsSection}>
//         <h2 className={styles.sectionTitle}>🔧 FarmXpert Tools</h2>
//         <div className={styles.toolsGrid}>
//           <ToolCard 
//             to="/crop-recommend"
//             icon={<Sprout size={22} />}
//             title="Crop Consult"
//             desc="Get AI-based crop recommendations"
//             color="#16a34a"
//           />
//           <ToolCard 
//             to="/yield-predict"
//             icon={<TrendingUp size={22} />}
//             title="Yield Forecast"
//             desc="Estimate your harvest volume"
//             color="#3b82f6"
//           />
//           <ToolCard 
//             to="/disease-detect"
//             icon={<AlertCircle size={22} />}
//             title="Disease Lab"
//             desc="Detect crop diseases via image"
//             color="#ef4444"
//           />
//           <ToolCard 
//             to="/store"
//             icon={<ShoppingBag size={22} />}
//             title="Farm Store"
//             desc="Buy seeds and fertilizers"
//             color="#eab308"
//           />
//         </div>
//       </div>

//       {/* ===== SOIL TESTING ===== */}
//       <div className={styles.soilSection}>
//         <div className={styles.soilCard}>
//           <div className={styles.soilIcon}>🧪</div>
//           <div className={styles.soilContent}>
//             <h3 className={styles.soilTitle}>Check Your Soil</h3>
//             <p className={styles.soilDesc}>Find certified soil testing centers near your farm.</p>
//             <Link to="/soil-centers" className={styles.soilBtn}>
//               Find Nearby Centers →
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ToolCard({ to, icon, title, desc, color }) {
//   return (
//     <Link to={to} className={styles.toolCard}>
//       <div className={styles.toolIcon} style={{ background: `${color}10`, color: color }}>
//         {icon}
//       </div>
//       <h3 className={styles.toolTitle}>{title}</h3>
//       <p className={styles.toolDesc}>{desc}</p>
//       <span className={styles.toolLink}>Open →</span>
//     </Link>
//   );
// }

















// // Dashboard.jsx - Keep existing content, add language support
// import React, { useState, useEffect } from "react";
// import { motion } from 'framer-motion';
// import { 
//   Cloud, Sun, Droplets, Wind, ArrowRight, Sprout, TrendingUp, 
//   AlertCircle, ShoppingBag, MapPin, Calendar, CheckCircle2, Microscope 
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import api from '../api';
// import { useTranslation } from 'react-i18next';

// export default function Dashboard() {
//     const { t } = useTranslation();
//     const getGreeting = () => {
//         const hour = new Date().getHours();
//         if (hour < 12) return t("good_morning");
//         if (hour < 17) return t("good_afternoon");
//         if (hour < 21) return t("good_evening");
//         return t("good_night");
//     };
    
//     const [farmerProfile, setFarmerProfile] = useState(null);
//     const [loadingProfile, setLoadingProfile] = useState(true);
//     const [weather, setWeather] = useState(null);
//     const [locationName, setLocationName] = useState(t('loading_weather'));
//     const [sowingDate, setSowingDate] = useState('');
//     const [selectedCrop, setSelectedCrop] = useState('rice');
//     const [cropStage, setCropStage] = useState(null);
//     const [tempDate, setTempDate] = useState('');

//     const crops = ['rice', 'wheat', 'maize', 'cotton', 'tomato', 'potato'];

//     const saveGrowth = async (date, crop) => {
//         try {
//             await api.post("/growth", {
//                 sowingDate: date,
//                 crop
//             });
//         } catch (err) {
//             console.error("Save Growth Error:", err);
//         }
//     };

//     useEffect(() => {
//         fetchFarmerProfile();
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(success, error);
//         } else {
//             setLocationName(t('location_not_supported'));
//         }

//         if (sowingDate) {
//             calculateCropStage(sowingDate, selectedCrop);
//         }
//     }, [sowingDate, selectedCrop]);

//     useEffect(() => {
//         const fetchGrowth = async () => {
//             try {
//                 const res = await api.get("/growth");
//                 if (res.data && res.data.sowingDate) {
//                     setSowingDate(res.data.sowingDate);
//                     setSelectedCrop(res.data.crop || 'rice');
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchGrowth();
//     }, []);

//     const fetchFarmerProfile = async () => {
//         try {
//             const res = await api.get("/farmer");
//             if (res.data.exists) {
//                 setFarmerProfile(res.data.profile);
//             }
//         } catch (err) {
//             console.log(err);
//         } finally {
//             setLoadingProfile(false);
//         }
//     };

//     const success = (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         fetchWeather(lat, lon);
//     };

//     const error = () => {
//         setLocationName(t('location_denied'));
//         fetchWeather(28.61, 77.20);
//     };

//     const fetchWeather = async (lat, lon) => {
//         try {
//             const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability`);
//             const data = await res.json();

//             setWeather({
//                 temp: Math.round(data.current_weather.temperature),
//                 condition: getWeatherCondition(data.current_weather.weathercode),
//                 wind: Math.round(data.current_weather.windspeed),
//                 humidity: data.hourly.relativehumidity_2m[0],
//                 rain_prob: data.hourly.precipitation_probability ? data.hourly.precipitation_probability[0] : 0,
//                 code: data.current_weather.weathercode
//             });
//             setLocationName(`${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`);
//         } catch (err) {
//             console.error("Weather fetch failed", err);
//         }
//     };

//     const getWeatherCondition = (code) => {
//         if (code <= 3) return t("weather_clear");
//         if (code <= 48) return t("weather_foggy");
//         if (code <= 67) return t("weather_rainy");
//         if (code <= 77) return t("weather_snowy");
//         return t("weather_stormy");
//     };

//     const isSafeToSpray = () => {
//         if (!weather) return true;
//         if (weather.wind > 15 || weather.rain_prob > 50 || weather.code > 60) return false;
//         return true;
//     };

//     const calculateCropStage = (dateStr, crop) => {
//         const start = new Date(dateStr);
//         const today = new Date();
//         const diffTime = Math.abs(today - start);
//         const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//         const totalDays = crop === 'wheat' ? 140 : 120;

//         let stage = { key: 'germination', progress: 10, color: 'bg-emerald-200 text-emerald-800' };

//         if (days > 15)
//             stage = { key: 'vegetative', progress: 40, color: 'bg-green-200 text-green-800' };

//         if (days > (totalDays * 0.4))
//             stage = { key: 'flowering', progress: 70, color: 'bg-yellow-200 text-yellow-800' };

//         if (days > (totalDays * 0.8))
//             stage = { key: 'harvest', progress: 100, color: 'bg-amber-200 text-amber-800' };

//         setCropStage({ days, ...stage, totalDays });
//     };

//     const container = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: { staggerChildren: 0.1 }
//         }
//     };

//     return (
//         <div className="space-y-8">
//             {/* ================= WELCOME SECTION ================= */}
//             <div className="mb-8 mt-6">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                     <div className="flex flex-col gap-1">
//                         <h1 className="text-3xl font-semibold text-gray-900">
//                             {getGreeting()},
//                             <span className="text-primary ml-2">
//                                 {farmerProfile?.fullName || t("farmer")}
//                             </span>
//                         </h1>
//                         <p className="text-gray-500 text-base mt-1">
//                             {t('dashboard_subtitle')}
//                         </p>
//                     </div>
                    
//                     {/* Soil Testing Centers */}
//                     <Link
//                         to="/soil-centers"
//                         className="group relative flex items-stretch bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-emerald-200 transition-all duration-400 hover:-translate-y-1.5 overflow-hidden lg:min-w-[400px]"
//                     >
//                         {/* Left - Icon Section with Gradient */}
//                         <div className="w-24 bg-gradient-to-b from-emerald-500 to-green-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
//                             <div className="relative">
//                                 <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
//                                 <Microscope size={32} className="text-white relative" />
//                                 <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
//                                     <span className="text-[7px] font-bold text-emerald-600">✓</span>
//                                 </div>
//                             </div>
//                         </div>
                        
//                         {/* Right - Content */}
//                         <div className="flex-1 p-4 pr-5">
//                             <div className="flex items-start justify-between">
//                                 <div>
//                                     <div className="flex items-center gap-2">
//                                         <h3 className="text-base font-bold text-gray-800">
//                                             {t("soil_testing_centers")}
//                                         </h3>
//                                         <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] font-bold rounded-full">
//                                             {t("new")}
//                                         </span>
//                                     </div>
//                                     <p className="text-sm text-gray-500 mt-0.5">
//                                         {t("soil_testing_desc")}
//                                     </p>
//                                 </div>
//                                 <div className="bg-emerald-50 p-2 rounded-xl group-hover:bg-emerald-100 transition-all">
//                                     <ArrowRight size={16} className="text-emerald-600 group-hover:translate-x-1 transition-transform" />
//                                 </div>
//                             </div>
                            
//                             <div className="flex items-center gap-3 mt-2.5">
//                                 <div className="flex items-center gap-1.5">
//                                     <MapPin size={11} className="text-emerald-500" />
//                                     <span className="text-xs text-gray-600 font-medium">{t("find_nearby")}</span>
//                                 </div>
//                                 <div className="w-px h-4 bg-gray-200"></div>
//                                 <div className="flex items-center gap-1">
//                                     <span className="text-[9px] text-gray-500 font-medium">Govt.</span>
//                                     <span className="text-[8px] text-green-600">✓</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </Link>
//                 </div>
//             </div>

//             {/* Extreme Weather Alert */}
//             {weather && (weather.code > 90 || weather.wind > 40) && (
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3"
//                 >
//                     <AlertCircle className="text-red-500 mt-1" />
//                     <div>
//                         <h3 className="font-bold text-red-700">{t('weather_alert')}!</h3>
//                         <p className="text-red-600 text-sm">{weather.code > 90 ? t("severe_thunderstorm") : t("wind_high")}. {t('secure_crops')}</p>
//                     </div>
//                 </motion.div>
//             )}

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Weather Widget */}
//                 <motion.div
//                     id="weather-card"
//                     style={{
//                         position: "relative",
//                         zIndex: 9996
//                     }}
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-primary-dark text-white p-8 shadow-glass-hover"
//                 >
//                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>

//                     <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 h-full">
//                         <div className="flex items-center gap-6">
//                             <Sun size={64} className="text-accent animate-pulse" />
//                             <div>
//                                 {weather ? (
//                                     <>
//                                         <div className="text-5xl font-bold">{weather.temp}°C</div>
//                                         <div className="text-xl opacity-90">{weather.condition}</div>
//                                     </>
//                                 ) : (
//                                     <div className="animate-pulse">{t('loading_weather')}</div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="flex gap-8 text-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
//                             <div>
//                                 <div className="flex items-center justify-center gap-1 opacity-75 mb-1"><Droplets size={16} /> {t('humidity')}</div>
//                                 <div className="text-xl font-bold">{weather?.humidity || '--'}%</div>
//                             </div>
//                             <div className="w-px bg-white/20"></div>
//                             <div>
//                                 <div className="flex items-center justify-center gap-1 opacity-75 mb-1"><Wind size={16} /> {t('wind')}</div>
//                                 <div className="text-xl font-bold">{weather?.wind || '--'} km/h</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Spray Guidance Badge */}
//                     {weather && (
//                         <div className={`absolute bottom-4 right-4 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2
//                     ${isSafeToSpray() ? 'bg-green-500 text-white' : 'bg-red-500 text-white animate-pulse'}`}>
//                             {isSafeToSpray() ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
//                             {isSafeToSpray() ? t('safe_to_spray') : t('unsafe_to_spray')}
//                         </div>
//                     )}
//                 </motion.div>

//                 {/* Crop Growth Tracker Widget */}
//                 <div
//                     id="crop-tracker"
//                     className="glass-card bg-white p-6 relative"
//                 >
//                     <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                         <Calendar size={20} className="text-primary" /> {t('crop_tracker')}
//                     </h3>

//                     {!sowingDate ? (
//                         <>
//                             <div className="mb-4">
//                                 <label className="text-xs font-bold text-gray-400 uppercase">
//                                     {t('select_crop')}
//                                 </label>
//                                 <select
//                                     value={selectedCrop}
//                                     onChange={(e) => setSelectedCrop(e.target.value)}
//                                     className="w-full mt-1 p-2 rounded-lg bg-gray-50 border border-gray-200 text-sm"
//                                 >
//                                     {crops.map(c => (
//                                         <option key={c} value={c}>
//                                             {t(`crop_names.${c}`)}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="text-center py-4">
//                                 <p className="text-gray-500 mb-2 text-sm">
//                                     {t('enter_sowing_date')}
//                                 </p>

//                                 <input
//                                     type="date"
//                                     className="input-field text-sm w-full mb-3"
//                                     value={tempDate}
//                                     onChange={(e) => setTempDate(e.target.value)}
//                                 />

//                                 <button
//                                     onClick={() => {
//                                         if (tempDate) {
//                                             setSowingDate(tempDate);
//                                             saveGrowth(tempDate, selectedCrop);
//                                             setTempDate('');
//                                         }
//                                     }}
//                                     disabled={!tempDate}
//                                     className={`w-full py-2 rounded-lg text-sm font-semibold transition 
//                                         ${tempDate 
//                                             ? "bg-primary text-white hover:opacity-90" 
//                                             : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                         }`}
//                                 >
//                                     {t("track_growth")}
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <div className="space-y-4">
//                             <div className="flex justify-between items-center">
//                                 <div className="text-sm">
//                                     <span className="text-gray-500 block">{t('crop')}</span>
//                                     <span className="font-bold text-primary">
//                                         {t(`crop_names.${selectedCrop}`)}
//                                     </span>
//                                 </div>
//                                 <div className="text-right">
//                                     <span className="text-sm text-gray-500 block">{t('days_passed')}</span>
//                                     <span className="text-2xl font-bold text-gray-800">
//                                         {cropStage?.days || 0} {t('days')}
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
//                                     <span>{t('current_stage')}</span>
//                                     <span className={cropStage?.color ? cropStage.color.split(' ')[1] : ''}>
//                                         {cropStage?.key ? t(cropStage.key) : '--'}
//                                     </span>
//                                 </div>

//                                 <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
//                                     <motion.div
//                                         initial={{ width: 0 }}
//                                         animate={{ width: `${cropStage?.progress || 0}%` }}
//                                         className={`h-full ${
//                                             cropStage?.color
//                                                 ? cropStage.color.split(' ')[0]
//                                                 : 'bg-gray-200'
//                                         }`}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
//                                 <h4 className="text-xs font-bold text-blue-700 uppercase mb-1">
//                                     {t('advice')}
//                                 </h4>
//                                 <p className="text-xs text-blue-800 leading-relaxed">
//                                     {cropStage?.key === "germination" && t('advice_germination')}
//                                     {cropStage?.key === "vegetative" && t('advice_vegetative')}
//                                     {cropStage?.key === "flowering" && t('advice_flowering')}
//                                     {cropStage?.key === "harvest" && t('advice_harvest')}
//                                 </p>
//                             </div>

//                             <div className="pt-2 mt-2 border-t border-gray-100 flex gap-2">
//                                 <button
//                                     onClick={async () => {
//                                         try {
//                                             await api.post("/growth", {
//                                                 sowingDate: "",
//                                                 crop: ""
//                                             });
//                                             setSowingDate('');
//                                             setTempDate('');
//                                             setSelectedCrop('rice');
//                                             setCropStage(null);
//                                         } catch (err) {
//                                             console.error(err);
//                                         }
//                                     }}
//                                     className="text-xs text-gray-400 hover:text-red-500"
//                                 >
//                                     {t('reset')}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Quick Actions Grid - 4 Cards */}
//             <motion.div
//                 variants={container}
//                 initial="hidden"
//                 animate="show"
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//             >
//                 <ActionCard
//                     id="crop-consult-card"
//                     to="/crop-recommend"
//                     title={t('crop_consult')}
//                     desc={t('crop_consult_desc')}
//                     icon={<Sprout size={28} />}
//                     color="bg-green-100 text-green-600"
//                     delay={0}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="yield-card"
//                     to="/yield-predict"
//                     title={t('yield_forecast')}
//                     desc={t('yield_forecast_desc')}
//                     icon={<TrendingUp size={28} />}
//                     color="bg-blue-100 text-blue-600"
//                     delay={0.1}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="disease-card"
//                     to="/disease-detect"
//                     title={t('disease_lab')}
//                     desc={t('disease_lab_desc')}
//                     icon={<AlertCircle size={28} />}
//                     color="bg-red-100 text-red-600"
//                     delay={0.2}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="store-card"
//                     to="/store"
//                     title={t('farm_store')}
//                     desc={t('farm_store_desc')}
//                     icon={<ShoppingBag size={28} />}
//                     color="bg-amber-100 text-amber-600"
//                     delay={0.3}
//                     t={t}
//                 />
//             </motion.div>
//         </div>
//     );
// }

// function ActionCard({
//     id,
//     to,
//     title,
//     desc,
//     icon,
//     color,
//     delay,
//     t
// }) {
//     return (
//         <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
//             <Link
//                 id={id}
//                 to={to}
//                 className="group block h-full bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-glass-hover hover:-translate-y-1 transition-all"
//             >
//                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
//                     {icon}
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
//                 <p className="text-sm text-gray-500 mb-4">{desc}</p>
//                 <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
//                     {t('launch_tool')} <ArrowRight size={16} className="ml-1" />
//                 </div>
//             </Link>
//         </motion.div>
//     );
// }


















// // src/pages/Dashboard.jsx
// import { useState, useEffect } from "react";
// import { motion } from 'framer-motion';
// import { Cloud, Sun, Droplets, Wind, ArrowRight, Sprout, TrendingUp, AlertCircle, ShoppingBag, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import api from '../api';
// import { useTranslation } from 'react-i18next';
// import { useDemo } from '../context/DemoContext';

// export default function Dashboard() {
//     const { t } = useTranslation();
//     const { startDemo } = useDemo();
    
//     const getGreeting = () => {
//         const hour = new Date().getHours();
//         if (hour < 12) return t("good_morning");
//         if (hour < 17) return t("good_afternoon");
//         if (hour < 21) return t("good_evening");
//         return t("good_night");
//     };
    
//     const [farmerProfile, setFarmerProfile] = useState(null);
//     const [loadingProfile, setLoadingProfile] = useState(true);
//     const [weather, setWeather] = useState(null);
//     const [locationName, setLocationName] = useState(t('loading_weather'));
//     const [sowingDate, setSowingDate] = useState('');
//     const [selectedCrop, setSelectedCrop] = useState('rice');
//     const [cropStage, setCropStage] = useState(null);
//     const [tempDate, setTempDate] = useState('');

//     const crops = ['rice', 'wheat', 'maize', 'cotton', 'tomato', 'potato'];

//     const saveGrowth = async (date, crop) => {
//         try {
//             await api.post("/growth", {
//                 sowingDate: date,
//                 crop
//             });
//         } catch (err) {
//             console.error("Save Growth Error:", err);
//         }
//     };

//     useEffect(() => {
//         fetchFarmerProfile();
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(success, error);
//         } else {
//             setLocationName(t('location_not_supported'));
//         }

//         if (sowingDate) {
//             calculateCropStage(sowingDate, selectedCrop);
//         }
//     }, [sowingDate, selectedCrop]);

//     useEffect(() => {
//         const fetchGrowth = async () => {
//             try {
//                 const res = await api.get("/growth");
//                 if (res.data && res.data.sowingDate) {
//                     setSowingDate(res.data.sowingDate);
//                     setSelectedCrop(res.data.crop || 'rice');
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchGrowth();
//     }, []);

//     const fetchFarmerProfile = async () => {
//         try {
//             const res = await api.get("/farmer");
//             if (res.data.exists) {
//                 setFarmerProfile(res.data.profile);
//             }
//         } catch (err) {
//             console.log(err);
//         } finally {
//             setLoadingProfile(false);
//         }
//     };

//     const success = (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         fetchWeather(lat, lon);
//     };

//     const error = () => {
//         setLocationName(t('location_denied'));
//         fetchWeather(28.61, 77.20);
//     };

//     const fetchWeather = async (lat, lon) => {
//         try {
//             const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability`);
//             const data = await res.json();

//             setWeather({
//                 temp: Math.round(data.current_weather.temperature),
//                 condition: getWeatherCondition(data.current_weather.weathercode),
//                 wind: Math.round(data.current_weather.windspeed),
//                 humidity: data.hourly.relativehumidity_2m[0],
//                 rain_prob: data.hourly.precipitation_probability ? data.hourly.precipitation_probability[0] : 0,
//                 code: data.current_weather.weathercode
//             });
//             setLocationName(`${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`);
//         } catch (err) {
//             console.error("Weather fetch failed", err);
//         }
//     };

//     const getWeatherCondition = (code) => {
//         if (code <= 3) return t("weather_clear");
//         if (code <= 48) return t("weather_foggy");
//         if (code <= 67) return t("weather_rainy");
//         if (code <= 77) return t("weather_snowy");
//         return t("weather_stormy");
//     };

//     const isSafeToSpray = () => {
//         if (!weather) return true;
//         if (weather.wind > 15 || weather.rain_prob > 50 || weather.code > 60) return false;
//         return true;
//     };

//     const calculateCropStage = (dateStr, crop) => {
//         const start = new Date(dateStr);
//         const today = new Date();
//         const diffTime = Math.abs(today - start);
//         const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//         const totalDays = crop === 'wheat' ? 140 : 120;

//         let stage = { key: 'germination', progress: 10, color: 'bg-emerald-200 text-emerald-800' };

//         if (days > 15)
//             stage = { key: 'vegetative', progress: 40, color: 'bg-green-200 text-green-800' };

//         if (days > (totalDays * 0.4))
//             stage = { key: 'flowering', progress: 70, color: 'bg-yellow-200 text-yellow-800' };

//         if (days > (totalDays * 0.8))
//             stage = { key: 'harvest', progress: 100, color: 'bg-amber-200 text-amber-800' };

//         setCropStage({ days, ...stage, totalDays });
//     };

//     const container = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: { staggerChildren: 0.1 }
//         }
//     };

//     return (
//         <div className="space-y-8"
       
//         >
//             {/* ================= WELCOME SECTION ================= */}
//             <div className="mb-8 mt-6">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                     <div className="flex flex-col gap-1">
//                         <h1 className="text-3xl font-semibold text-gray-900">
//                             {getGreeting()},
//                             <span className="text-primary ml-2">
//                                 {farmerProfile?.fullName || t("farmer")}
//                             </span>
//                         </h1>
//                         <p className="text-gray-500 text-base mt-1">
//                             {t('dashboard_subtitle')}
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Extreme Weather Alert */}
//             {weather && (weather.code > 90 || weather.wind > 40) && (
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3"
//                 >
//                     <AlertCircle className="text-red-500 mt-1" />
//                     <div>
//                         <h3 className="font-bold text-red-700">{t('weather_alert')}!</h3>
//                         <p className="text-red-600 text-sm">{weather.code > 90 ? t("severe_thunderstorm") : t("wind_high")}. {t('secure_crops')}</p>
//                     </div>
//                 </motion.div>
//             )}

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Weather Widget - data-tour added */}
//                 <motion.div
//                     id="weather-card"
//                     data-tour="weather"
//                     style={{
//                         position: "relative",
//                         zIndex: 9996
//                     }}
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-primary-dark text-white p-8 shadow-glass-hover"
//                 >
//                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>

//                     <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 h-full">
//                         <div className="flex items-center gap-6">
//                             <Sun size={64} className="text-accent animate-pulse" />
//                             <div>
//                                 {weather ? (
//                                     <>
//                                         <div className="text-5xl font-bold">{weather.temp}°C</div>
//                                         <div className="text-xl opacity-90">{weather.condition}</div>
//                                     </>
//                                 ) : (
//                                     <div className="animate-pulse">{t('loading_weather')}</div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="flex gap-8 text-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
//                             <div>
//                                 <div className="flex items-center justify-center gap-1 opacity-75 mb-1"><Droplets size={16} /> {t('humidity')}</div>
//                                 <div className="text-xl font-bold">{weather?.humidity || '--'}%</div>
//                             </div>
//                             <div className="w-px bg-white/20"></div>
//                             <div>
//                                 <div className="flex items-center justify-center gap-1 opacity-75 mb-1"><Wind size={16} /> {t('wind')}</div>
//                                 <div className="text-xl font-bold">{weather?.wind || '--'} km/h</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Spray Guidance Badge */}
//                     {weather && (
//                         <div className={`absolute bottom-4 right-4 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2
//                     ${isSafeToSpray() ? 'bg-green-500 text-white' : 'bg-red-500 text-white animate-pulse'}`}>
//                             {isSafeToSpray() ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
//                             {isSafeToSpray() ? t('safe_to_spray') : t('unsafe_to_spray')}
//                         </div>
//                     )}
//                 </motion.div>

//                 {/* Crop Growth Tracker Widget - data-tour added */}
//                 <div
//                     id="crop-tracker"
//                     data-tour="crop-tracker"
//                     className="glass-card bg-white p-6 relative"
//                 >
//                     <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                         <Calendar size={20} className="text-primary" /> {t('crop_tracker')}
//                     </h3>

//                     {!sowingDate ? (
//                         <>
//                             <div className="mb-4">
//                                 <label className="text-xs font-bold text-gray-400 uppercase">
//                                     {t('select_crop')}
//                                 </label>
//                                 <select
//                                     value={selectedCrop}
//                                     onChange={(e) => setSelectedCrop(e.target.value)}
//                                     className="w-full mt-1 p-2 rounded-lg bg-gray-50 border border-gray-200 text-sm"
//                                 >
//                                     {crops.map(c => (
//                                         <option key={c} value={c}>
//                                             {t(`crop_names.${c}`)}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="text-center py-4">
//                                 <p className="text-gray-500 mb-2 text-sm">
//                                     {t('enter_sowing_date')}
//                                 </p>

//                                 <input
//                                     type="date"
//                                     className="input-field text-sm w-full mb-3"
//                                     value={tempDate}
//                                     onChange={(e) => setTempDate(e.target.value)}
//                                 />

//                                 <button
//                                     onClick={() => {
//                                         if (tempDate) {
//                                             setSowingDate(tempDate);
//                                             saveGrowth(tempDate, selectedCrop);
//                                             setTempDate('');
//                                         }
//                                     }}
//                                     disabled={!tempDate}
//                                     className={`w-full py-2 rounded-lg text-sm font-semibold transition 
//                                         ${tempDate 
//                                             ? "bg-primary text-white hover:opacity-90" 
//                                             : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                         }`}
//                                 >
//                                     {t("track_growth")}
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <div className="space-y-4">
//                             <div className="flex justify-between items-center">
//                                 <div className="text-sm">
//                                     <span className="text-gray-500 block">{t('crop')}</span>
//                                     <span className="font-bold text-primary">
//                                         {t(`crop_names.${selectedCrop}`)}
//                                     </span>
//                                 </div>
//                                 <div className="text-right">
//                                     <span className="text-sm text-gray-500 block">{t('days_passed')}</span>
//                                     <span className="text-2xl font-bold text-gray-800">
//                                         {cropStage?.days || 0} {t('days')}
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
//                                     <span>{t('current_stage')}</span>
//                                     <span className={cropStage?.color ? cropStage.color.split(' ')[1] : ''}>
//                                         {cropStage?.key ? t(cropStage.key) : '--'}
//                                     </span>
//                                 </div>

//                                 <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
//                                     <motion.div
//                                         initial={{ width: 0 }}
//                                         animate={{ width: `${cropStage?.progress || 0}%` }}
//                                         className={`h-full ${
//                                             cropStage?.color
//                                                 ? cropStage.color.split(' ')[0]
//                                                 : 'bg-gray-200'
//                                         }`}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
//                                 <h4 className="text-xs font-bold text-blue-700 uppercase mb-1">
//                                     {t('advice')}
//                                 </h4>
//                                 <p className="text-xs text-blue-800 leading-relaxed">
//                                     {cropStage?.key === "germination" && t('advice_germination')}
//                                     {cropStage?.key === "vegetative" && t('advice_vegetative')}
//                                     {cropStage?.key === "flowering" && t('advice_flowering')}
//                                     {cropStage?.key === "harvest" && t('advice_harvest')}
//                                 </p>
//                             </div>

//                             <div className="pt-2 mt-2 border-t border-gray-100 flex gap-2">
//                                 <button
//                                     onClick={async () => {
//                                         try {
//                                             await api.post("/growth", {
//                                                 sowingDate: "",
//                                                 crop: ""
//                                             });
//                                             setSowingDate('');
//                                             setTempDate('');
//                                             setSelectedCrop('rice');
//                                             setCropStage(null);
//                                         } catch (err) {
//                                             console.error(err);
//                                         }
//                                     }}
//                                     className="text-xs text-gray-400 hover:text-red-500"
//                                 >
//                                     {t('reset')}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Quick Actions Grid - data-tour attributes added */}
//             <motion.div
//                 variants={container}
//                 initial="hidden"
//                 animate="show"
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//             >
//                 <ActionCard
//                     id="crop-consult-card"
//                     data-tour="crop-consult"
//                     to="/crop-recommend"
//                     title={t('crop_consult')}
//                     desc={t('crop_consult_desc')}
//                     icon={<Sprout size={28} />}
//                     color="bg-green-100 text-green-600"
//                     delay={0}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="yield-card"
//                     data-tour="yield-forecast"
//                     to="/yield-predict"
//                     title={t('yield_forecast')}
//                     desc={t('yield_forecast_desc')}
//                     icon={<TrendingUp size={28} />}
//                     color="bg-blue-100 text-blue-600"
//                     delay={0.1}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="disease-card"
//                     data-tour="disease-lab"
//                     to="/disease-detect"
//                     title={t('disease_lab')}
//                     desc={t('disease_lab_desc')}
//                     icon={<AlertCircle size={28} />}
//                     color="bg-red-100 text-red-600"
//                     delay={0.2}
//                     t={t}
//                 />
//                 <ActionCard
//                     id="store-card"
//                     data-tour="farm-store"
//                     to="/store"
//                     title={t('farm_store')}
//                     desc={t('farm_store_desc')}
//                     icon={<ShoppingBag size={28} />}
//                     color="bg-amber-100 text-amber-600"
//                     delay={0.3}
//                     t={t}
//                 />
//             </motion.div>
//         </div>
//     );
// }

// function ActionCard({
//     id,
//     dataTour,
//     to,
//     title,
//     desc,
//     icon,
//     color,
//     delay,
//     t
// }) {
//     return (
//         <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
//             <Link
//                 id={id}
//                 data-tour={dataTour}
//                 to={to}
//                 className="group block h-full bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-glass-hover hover:-translate-y-1 transition-all"
//             >
//                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
//                     {icon}
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
//                 <p className="text-sm text-gray-500 mb-4">{desc}</p>
//                 <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
//                     {t('launch_tool')} <ArrowRight size={16} className="ml-1" />
//                 </div>
//             </Link>
//         </motion.div>
//     );
// }



















// // src/pages/Dashboard.jsx

// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { motion } from "framer-motion";
// import {
//   AlertCircle,
//   CheckCircle2,
//   Calendar,
//   Sprout,
//   RotateCcw,
// } from "lucide-react";

// import api from "../api";
// import { useDemo } from "../context/DemoContext";

// import WelcomeBanner from "../components/dashboard/WelcomeBanner";
// import WeatherCard from "../components/dashboard/WeatherCard";
// import FarmStats from "../components/dashboard/FarmStats";
// import QuickAccess from "../components/dashboard/QuickAccess";

// import styles from "./Dashboard.module.css";

// export default function Dashboard() {
//   const { t } = useTranslation();
//   const { startDemo } = useDemo();

//   // =========================================================
//   // STATE
//   // =========================================================

//   const [farmerProfile, setFarmerProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   const [weather, setWeather] = useState(null);
//   const [weatherLoading, setWeatherLoading] = useState(true);
//   const [weatherError, setWeatherError] = useState(false);

//   const [locationName, setLocationName] = useState(
//     "Kakinada, Andhra Pradesh"
//   );

//   // =========================================================
//   // CROP TRACKER
//   // =========================================================

//   const [sowingDate, setSowingDate] = useState("");
//   const [selectedCrop, setSelectedCrop] = useState("rice");
//   const [cropStage, setCropStage] = useState(null);
//   const [tempDate, setTempDate] = useState("");

//   const crops = [
//     "rice",
//     "wheat",
//     "maize",
//     "cotton",
//     "tomato",
//     "potato",
//   ];

//   // =========================================================
//   // GREETING
//   // =========================================================

//   const getGreeting = () => {
//     const hour = new Date().getHours();

//     if (hour < 12) return t("good_morning");
//     if (hour < 17) return t("good_afternoon");
//     if (hour < 21) return t("good_evening");

//     return t("good_night");
//   };

//   // =========================================================
//   // FARMER PROFILE
//   // =========================================================

//   const fetchFarmerProfile = async () => {
//     try {
//       const res = await api.get("/farmer");

//       if (res.data?.exists) {
//         setFarmerProfile(res.data.profile);
//       }
//     } catch (error) {
//       console.error("Farmer profile error:", error);
//     } finally {
//       setLoadingProfile(false);
//     }
//   };

//   // =========================================================
//   // WEATHER CONDITION
//   // =========================================================

//   const getWeatherCondition = (code) => {
//     if (code === undefined || code === null) {
//       return t("loading_weather");
//     }

//     if (code <= 3) return t("weather_clear");
//     if (code <= 48) return t("weather_foggy");
//     if (code <= 67) return t("weather_rainy");
//     if (code <= 77) return t("weather_snowy");

//     return t("weather_stormy");
//   };

//   // =========================================================
//   // WEATHER
//   // =========================================================

//   const fetchWeather = async (lat, lon) => {
//     try {
//       setWeatherLoading(true);
//       setWeatherError(false);

//       const url =
//         `https://api.open-meteo.com/v1/forecast` +
//         `?latitude=${lat}` +
//         `&longitude=${lon}` +
//         `&current_weather=true` +
//         `&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,apparent_temperature` +
//         `&timezone=auto`;

//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error("Weather API failed");
//       }

//       const data = await response.json();

//       const current = data.current_weather;

//       if (!current) {
//         throw new Error("Current weather data unavailable");
//       }

//       const humidity =
//         data.hourly?.relativehumidity_2m?.[0] ?? null;

//       const rainProbability =
//         data.hourly?.precipitation_probability?.[0] ?? 0;

//       const apparentTemperature =
//         data.hourly?.apparent_temperature?.[0] ??
//         Math.round(current.temperature);

//       setWeather({
//         temp: Math.round(current.temperature),

//         condition: getWeatherCondition(
//           current.weathercode
//         ),

//         wind: Math.round(current.windspeed),

//         humidity,

//         rain_prob: rainProbability,

//         code: current.weathercode,

//         feelsLike: Math.round(apparentTemperature),
//       });

//       setLocationName(
//         `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`
//       );
//     } catch (error) {
//       console.error("Weather fetch failed:", error);
//       setWeatherError(true);
//     } finally {
//       setWeatherLoading(false);
//     }
//   };

//   // =========================================================
//   // GEOLOCATION
//   // =========================================================

//   const handleLocationSuccess = (position) => {
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;

//     fetchWeather(lat, lon);
//   };

//   const handleLocationError = () => {
//     setLocationName("Kakinada, Andhra Pradesh");

//     // Kakinada coordinates
//     fetchWeather(16.9891, 82.2475);
//   };

//   const retryWeather = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         handleLocationSuccess,
//         handleLocationError
//       );
//     } else {
//       handleLocationError();
//     }
//   };

//   // =========================================================
//   // SPRAY SAFETY
//   // =========================================================

//   const isSafeToSpray = () => {
//     if (!weather) return false;

//     /*
//      * Spraying should be avoided when:
//      *
//      * - Wind is greater than 15 km/h
//      * - Rain probability is greater than 50%
//      * - Weather code indicates rain/storm conditions
//      */

//     if (
//       Number(weather.wind) > 15 ||
//       Number(weather.rain_prob) > 50 ||
//       Number(weather.code) > 60
//     ) {
//       return false;
//     }

//     return true;
//   };

//   // =========================================================
//   // CROP TRACKER
//   // =========================================================

//   const saveGrowth = async (date, crop) => {
//     try {
//       await api.post("/growth", {
//         sowingDate: date,
//         crop,
//       });
//     } catch (error) {
//       console.error("Save growth error:", error);
//     }
//   };

//   const calculateCropStage = (dateStr, crop) => {
//     if (!dateStr) {
//       setCropStage(null);
//       return;
//     }

//     const start = new Date(dateStr);

//     if (Number.isNaN(start.getTime())) {
//       setCropStage(null);
//       return;
//     }

//     const today = new Date();

//     /*
//      * Do not allow future sowing dates to produce
//      * negative crop days.
//      */
//     const diffTime = Math.max(
//       0,
//       today.getTime() - start.getTime()
//     );

//     const days = Math.floor(
//       diffTime / (1000 * 60 * 60 * 24)
//     );

//     /*
//      * Crop duration.
//      *
//      * Wheat = 140 days
//      * Other crops = 120 days
//      */
//     const totalDays =
//       crop === "wheat" ? 140 : 120;

//     let stage = {
//       key: "germination",
//       progress: 10,
//     };

//     if (days > 15) {
//       stage = {
//         key: "vegetative",
//         progress: 40,
//       };
//     }

//     if (days > totalDays * 0.4) {
//       stage = {
//         key: "flowering",
//         progress: 70,
//       };
//     }

//     if (days > totalDays * 0.8) {
//       stage = {
//         key: "harvest",
//         progress: 100,
//       };
//     }

//     setCropStage({
//       days,
//       totalDays,
//       ...stage,
//     });
//   };

//   // =========================================================
//   // FETCH SAVED GROWTH
//   // =========================================================

//   const fetchGrowth = async () => {
//     try {
//       const response = await api.get("/growth");

//       if (response.data?.sowingDate) {
//         const date = response.data.sowingDate;
//         const crop = response.data.crop || "rice";

//         setSowingDate(date);
//         setSelectedCrop(crop);

//         calculateCropStage(date, crop);
//       }
//     } catch (error) {
//       console.error("Growth fetch error:", error);
//     }
//   };

//   // =========================================================
//   // RESET GROWTH
//   // =========================================================

//   const resetGrowth = async () => {
//     try {
//       await api.post("/growth", {
//         sowingDate: "",
//         crop: "",
//       });

//       setSowingDate("");
//       setTempDate("");
//       setSelectedCrop("rice");
//       setCropStage(null);
//     } catch (error) {
//       console.error("Reset growth error:", error);
//     }
//   };

//   // =========================================================
//   // CROP STAGE TEXT
//   // =========================================================

//   const getCropStageText = () => {
//     if (!cropStage?.key) {
//       return "--";
//     }

//     const translated = t(cropStage.key);

//     /*
//      * If translation does not exist,
//      * show a readable fallback.
//      */
//     if (
//       !translated ||
//       translated === cropStage.key
//     ) {
//       const fallback = {
//         germination: "Germination",
//         vegetative: "Vegetative Growth",
//         flowering: "Flowering",
//         harvest: "Ready for Harvest",
//       };

//       return (
//         fallback[cropStage.key] ||
//         cropStage.key
//       );
//     }

//     return translated;
//   };

//   // =========================================================
//   // CROP ADVICE
//   // =========================================================

//   const getCropAdvice = () => {
//     if (!cropStage?.key) {
//       return "";
//     }

//     const adviceKey = `advice_${cropStage.key}`;
//     const translated = t(adviceKey);

//     if (
//       !translated ||
//       translated === adviceKey
//     ) {
//       const fallback = {
//         germination:
//           "Keep the soil adequately moist and monitor the young seedlings regularly.",

//         vegetative:
//           "Support healthy leaf and root growth with proper irrigation and nutrients.",

//         flowering:
//           "Monitor water, nutrients and weather conditions carefully during flowering.",

//         harvest:
//           "Check crop maturity and prepare for harvesting at the appropriate time.",
//       };

//       return (
//         fallback[cropStage.key] ||
//         "Continue monitoring your crop regularly."
//       );
//     }

//     return translated;
//   };

//   // =========================================================
//   // INITIAL LOAD
//   // =========================================================

//   useEffect(() => {
//     fetchFarmerProfile();
//     fetchGrowth();

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         handleLocationSuccess,
//         handleLocationError
//       );
//     } else {
//       handleLocationError();
//     }
//   }, []);

//   // =========================================================
//   // UPDATE CROP STAGE
//   // =========================================================

//   useEffect(() => {
//     if (sowingDate) {
//       calculateCropStage(
//         sowingDate,
//         selectedCrop
//       );
//     }
//   }, [sowingDate, selectedCrop]);

//   // =========================================================
//   // DEMO SUPPORT
//   // =========================================================

//   useEffect(() => {
//     if (typeof startDemo !== "function") {
//       return;
//     }

//     // Demo tour is handled by DashboardLayout.
//   }, [startDemo]);

//   // =========================================================
//   // USER NAME
//   // =========================================================

//   const farmerName =
//     farmerProfile?.fullName ||
//     farmerProfile?.name ||
//     t("farmer");

//   // =========================================================
//   // RENDER
//   // =========================================================

//   return (
//     <div className={styles.dashboard}>

//       {/* =====================================================
//           WELCOME
//       ===================================================== */}

//       <motion.section
//         className={styles.welcomeSection}
//         initial={{
//           opacity: 0,
//           y: 15,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           duration: 0.45,
//         }}
//       >
//         <WelcomeBanner
//           greeting={getGreeting()}
//           farmerName={farmerName}
//           location={locationName}
//         />
//       </motion.section>


//       {/* =====================================================
//           WEATHER ALERT
//       ===================================================== */}

//       {weather &&
//         (Number(weather.code) > 90 ||
//           Number(weather.wind) > 40) && (
//           <motion.div
//             className={styles.weatherAlert}
//             initial={{
//               opacity: 0,
//               y: -10,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//           >
//             <div className={styles.alertIcon}>
//               <AlertCircle size={20} />
//             </div>

//             <div className={styles.alertContent}>
//               <strong>
//                 {t("weather_alert")}!
//               </strong>

//               <p>
//                 {Number(weather.code) > 90
//                   ? t("severe_thunderstorm")
//                   : t("wind_high")}
//                 . {t("secure_crops")}
//               </p>
//             </div>
//           </motion.div>
//         )}


//       {/* =====================================================
//           TOP DASHBOARD
//       ===================================================== */}

//       <section
//         className={styles.topDashboardGrid}
//       >

//         {/* =================================================
//             FARM STATISTICS
//         ================================================= */}

//         <motion.div
//           className={styles.statsArea}
//           initial={{
//             opacity: 0,
//             y: 20,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             duration: 0.45,
//             delay: 0.1,
//           }}
//         >
//           <FarmStats
//             farmerProfile={farmerProfile}
//             crop={selectedCrop}
//             cropStage={cropStage}

//             /*
//              * IMPORTANT:
//              * FarmStats expects individual values,
//              * not the entire weather object.
//              */

//             rainfall={weather?.rain_prob ?? null}
//             temperature={weather?.temp ?? null}
//             feelsLike={weather?.feelsLike ?? null}

//             /*
//              * Open-Meteo does not provide actual soil
//              * moisture in the current request.
//              *
//              * Therefore keep this null until your
//              * soil API is connected.
//              */
//             soilMoisture={null}

//             loading={
//               weatherLoading ||
//               loadingProfile
//             }
//           />
//         </motion.div>


//         {/* =================================================
//             WEATHER CARD
//         ================================================= */}

//         <motion.div
//           id="weather-card"
//           data-tour="weather"
//           className={styles.weatherArea}
//           initial={{
//             opacity: 0,
//             scale: 0.98,
//           }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//           }}
//           transition={{
//             duration: 0.45,
//             delay: 0.15,
//           }}
//         >
//           <WeatherCard
//             weather={weather}
//             loading={weatherLoading}
//             error={weatherError}
//             location={locationName}
//             isSafeToSpray={isSafeToSpray()}
//             onRetry={retryWeather}
//           />
//         </motion.div>

//       </section>


//       {/* =====================================================
//           MAIN CONTENT
//       ===================================================== */}

//       <section className={styles.mainGrid}>

//         {/* =================================================
//             LEFT COLUMN
//         ================================================= */}

//         <div className={styles.mainColumn}>

//           {/* =================================================
//               CROP TRACKER
//           ================================================= */}

//           <motion.section
//             id="crop-tracker"
//             data-tour="crop-tracker"
//             className={styles.cropTracker}
//             initial={{
//               opacity: 0,
//               y: 20,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               duration: 0.45,
//               delay: 0.2,
//             }}
//           >

//             <div className={styles.cropTrackerHeader}>
//               <div className={styles.cropTrackerTitle}>
//                 <div className={styles.cropTrackerIcon}>
//                   <Calendar size={19} />
//                 </div>

//                 <div>
//                   <h2>
//                     {t("crop_tracker")}
//                   </h2>

//                   <p>
//                     {sowingDate
//                       ? "Track your crop growth"
//                       : "Start tracking your crop"}
//                   </p>
//                 </div>
//               </div>
//             </div>


//             {/* =================================================
//                 NO CROP TRACKING YET
//             ================================================= */}

//             {!sowingDate ? (
//               <div className={styles.cropSetup}>

//                 <div className={styles.formGroup}>
//                   <label>
//                     {t("select_crop")}
//                   </label>

//                   <select
//                     value={selectedCrop}
//                     onChange={(e) =>
//                       setSelectedCrop(
//                         e.target.value
//                       )
//                     }
//                   >
//                     {crops.map((crop) => (
//                       <option
//                         key={crop}
//                         value={crop}
//                       >
//                         {t(
//                           `crop_names.${crop}`
//                         )}
//                       </option>
//                     ))}
//                   </select>
//                 </div>


//                 <div className={styles.formGroup}>
//                   <label>
//                     {t("enter_sowing_date")}
//                   </label>

//                   <input
//                     type="date"
//                     value={tempDate}
//                     max={
//                       new Date()
//                         .toISOString()
//                         .split("T")[0]
//                     }
//                     onChange={(e) =>
//                       setTempDate(
//                         e.target.value
//                       )
//                     }
//                   />
//                 </div>


//                 <button
//                   type="button"
//                   className={
//                     tempDate
//                       ? styles.trackButton
//                       : styles.trackButtonDisabled
//                   }
//                   disabled={!tempDate}
//                   onClick={() => {
//                     if (!tempDate) return;

//                     setSowingDate(tempDate);

//                     saveGrowth(
//                       tempDate,
//                       selectedCrop
//                     );

//                     setTempDate("");
//                   }}
//                 >
//                   <Sprout size={16} />

//                   {t("track_growth")}
//                 </button>

//               </div>
//             ) : (

//               /* =================================================
//                  ACTIVE CROP TRACKER
//               ================================================= */

//               <div className={styles.cropTrackerBody}>

//                 {/* Crop + Days */}

//                 <div className={styles.cropSummary}>

//                   <div>
//                     <span>
//                       {t("crop")}
//                     </span>

//                     <strong>
//                       {t(
//                         `crop_names.${selectedCrop}`
//                       )}
//                     </strong>
//                   </div>

//                   <div className={styles.daysBox}>
//                     <span>
//                       {t("days_passed")}
//                     </span>

//                     <strong>
//                       {cropStage?.days || 0}
//                       <small>
//                         {" "}
//                         {t("days")}
//                       </small>
//                     </strong>
//                   </div>

//                 </div>


//                 {/* Progress */}

//                 <div className={styles.progressSection}>

//                   <div className={styles.progressHeader}>
//                     <span>
//                       {t("current_stage")}
//                     </span>

//                     <strong>
//                       {getCropStageText()}
//                     </strong>
//                   </div>

//                   <div className={styles.progressTrack}>
//                     <motion.div
//                       className={
//                         styles.progressFill
//                       }
//                       initial={{
//                         width: 0,
//                       }}
//                       animate={{
//                         width: `${
//                           cropStage?.progress || 0
//                         }%`,
//                       }}
//                       transition={{
//                         duration: 0.8,
//                         ease: "easeOut",
//                       }}
//                     />
//                   </div>

//                   <div
//                     className={
//                       styles.progressMeta
//                     }
//                   >
//                     <span>
//                       {cropStage?.progress || 0}%
//                     </span>

//                     <span>
//                       ~
//                       {" "}
//                       {cropStage?.totalDays || 120}
//                       {" "}
//                       {t("days")}
//                     </span>
//                   </div>

//                 </div>


//                 {/* Stage Steps */}

//                 <div
//                   className={
//                     styles.stageTimeline
//                   }
//                 >

//                   {[
//                     {
//                       key: "germination",
//                       label: "Germination",
//                       progress: 10,
//                     },
//                     {
//                       key: "vegetative",
//                       label: "Vegetative",
//                       progress: 40,
//                     },
//                     {
//                       key: "flowering",
//                       label: "Flowering",
//                       progress: 70,
//                     },
//                     {
//                       key: "harvest",
//                       label: "Harvest",
//                       progress: 100,
//                     },
//                   ].map((stage) => {

//                     const active =
//                       cropStage?.key ===
//                       stage.key;

//                     const completed =
//                       (cropStage?.progress || 0) >=
//                       stage.progress;

//                     return (
//                       <div
//                         key={stage.key}
//                         className={`
//                           ${styles.stageItem}
//                           ${
//                             active
//                               ? styles.stageActive
//                               : ""
//                           }
//                           ${
//                             completed
//                               ? styles.stageCompleted
//                               : ""
//                           }
//                         `}
//                       >
//                         <div
//                           className={
//                             styles.stageDot
//                           }
//                         />

//                         <span>
//                           {stage.label}
//                         </span>
//                       </div>
//                     );
//                   })}

//                 </div>


//                 {/* Advice */}

//                 <div
//                   className={
//                     styles.cropAdvice
//                   }
//                 >
//                   <div
//                     className={
//                       styles.cropAdviceTitle
//                     }
//                   >
//                     <Sprout size={15} />

//                     {t("advice")}
//                   </div>

//                   <p>
//                     {getCropAdvice()}
//                   </p>
//                 </div>


//                 {/* Reset */}

//                 <div
//                   className={
//                     styles.cropTrackerFooter
//                   }
//                 >
//                   <span>
//                     {t(
//                       `crop_names.${selectedCrop}`
//                     )}
//                   </span>

//                   <button
//                     type="button"
//                     onClick={resetGrowth}
//                   >
//                     <RotateCcw size={13} />

//                     {t("reset")}
//                   </button>
//                 </div>

//               </div>
//             )}

//           </motion.section>


//           {/* =================================================
//               QUICK ACCESS
//           ================================================= */}

//           <motion.section
//             className={styles.dashboardSection}
//             initial={{
//               opacity: 0,
//               y: 20,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               duration: 0.45,
//               delay: 0.3,
//             }}
//           >
//             <QuickAccess />
//           </motion.section>

//         </div>


//         {/* =================================================
//             RIGHT SIDEBAR
//         ================================================= */}

//         <aside className={styles.sideColumn}>

//           {/* =================================================
//               FARM STATUS
//           ================================================= */}

//           <section
//             className={
//               styles.dashboardSection
//             }
//           >

//             <div
//               className={
//                 styles.farmStatusCard
//               }
//             >

//               <div
//                 className={
//                   styles.farmStatusHeader
//                 }
//               >
//                 <Sprout size={18} />

//                 <span>
//                   Farm Status
//                 </span>
//               </div>


//               <div
//                 className={
//                   styles.farmStatusRow
//                 }
//               >
//                 <span>
//                   Active crop
//                 </span>

//                 <strong>
//                   {t(
//                     `crop_names.${selectedCrop}`
//                   )}
//                 </strong>
//               </div>


//               <div
//                 className={
//                   styles.farmStatusRow
//                 }
//               >
//                 <span>
//                   Crop stage
//                 </span>

//                 <strong>
//                   {cropStage
//                     ? getCropStageText()
//                     : "Not tracked"}
//                 </strong>
//               </div>


//               <div
//                 className={
//                   styles.farmStatusRow
//                 }
//               >
//                 <span>
//                   Weather
//                 </span>

//                 <strong>
//                   {weather
//                     ? weather.condition
//                     : "--"}
//                 </strong>
//               </div>


//               <div
//                 className={
//                   styles.farmStatusRow
//                 }
//               >
//                 <span>
//                   Spray
//                 </span>

//                 <strong
//                   className={
//                     weather
//                       ? isSafeToSpray()
//                         ? styles.safeText
//                         : styles.unsafeText
//                       : ""
//                   }
//                 >
//                   {weather
//                     ? isSafeToSpray()
//                       ? t("safe_to_spray")
//                       : t("unsafe_to_spray")
//                     : "--"}
//                 </strong>
//               </div>

//             </div>

//           </section>

//         </aside>

//       </section>


//       {/* =====================================================
//           SPRAY STATUS
//       ===================================================== */}

//       {weather && (
//         <div
//           className={`
//             ${styles.sprayStatus}
//             ${
//               isSafeToSpray()
//                 ? styles.spraySafe
//                 : styles.sprayUnsafe
//             }
//           `}
//           aria-live="polite"
//         >
//           {isSafeToSpray() ? (
//             <CheckCircle2 size={16} />
//           ) : (
//             <AlertCircle size={16} />
//           )}

//           <span>
//             {isSafeToSpray()
//               ? t("safe_to_spray")
//               : t("unsafe_to_spray")}
//           </span>
//         </div>
//       )}

//     </div>
//   );
// }




















// // src/pages/Dashboard.jsx

// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { motion } from "framer-motion";
// import {
//   AlertCircle,
//   CheckCircle2,
//   Calendar,
//   Sprout,
//   RotateCcw,
// } from "lucide-react";

// import api from "../api";
// import { useDemo } from "../context/DemoContext";

// import WelcomeBanner from "../components/dashboard/WelcomeBanner";
// import WeatherCard from "../components/dashboard/WeatherCard";
// import FarmStats from "../components/dashboard/FarmStats";
// import QuickAccess from "../components/dashboard/QuickAccess";
// import FarmOverview from "../components/dashboard/FarmOverview";

// import styles from "./Dashboard.module.css";

// export default function Dashboard() {
//   const { t } = useTranslation();
//   const { startDemo } = useDemo();

//   // =========================================================
//   // STATE
//   // =========================================================

//   const [farmerProfile, setFarmerProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   const [weather, setWeather] = useState(null);
//   const [weatherLoading, setWeatherLoading] = useState(true);
//   const [weatherError, setWeatherError] = useState(false);

//   const [locationName, setLocationName] = useState(
//     "Kakinada, Andhra Pradesh"
//   );

//   // =========================================================
//   // CROP TRACKER
//   // =========================================================

//   const [sowingDate, setSowingDate] = useState("");
//   const [selectedCrop, setSelectedCrop] = useState("rice");
//   const [cropStage, setCropStage] = useState(null);
//   const [tempDate, setTempDate] = useState("");

//   const crops = [
//     "rice",
//     "wheat",
//     "maize",
//     "cotton",
//     "tomato",
//     "potato",
//   ];

//   // =========================================================
//   // GREETING
//   // =========================================================

//   const getGreeting = () => {
//     const hour = new Date().getHours();

//     if (hour < 12) return t("good_morning");
//     if (hour < 17) return t("good_afternoon");
//     if (hour < 21) return t("good_evening");

//     return t("good_night");
//   };

//   // =========================================================
//   // FARMER PROFILE
//   // =========================================================

//   const fetchFarmerProfile = async () => {
//     try {
//       const res = await api.get("/farmer");

//       if (res.data?.exists) {
//         setFarmerProfile(res.data.profile);
//       }
//     } catch (error) {
//       console.error("Farmer profile error:", error);
//     } finally {
//       setLoadingProfile(false);
//     }
//   };

//   // =========================================================
//   // WEATHER CONDITION
//   // =========================================================

//   const getWeatherCondition = (code) => {
//     if (code === undefined || code === null) {
//       return t("loading_weather");
//     }

//     if (code <= 3) return t("weather_clear");
//     if (code <= 48) return t("weather_foggy");
//     if (code <= 67) return t("weather_rainy");
//     if (code <= 77) return t("weather_snowy");

//     return t("weather_stormy");
//   };

//   // =========================================================
//   // WEATHER
//   // =========================================================

//   const fetchWeather = async (lat, lon) => {
//     try {
//       setWeatherLoading(true);
//       setWeatherError(false);

//       const url =
//         `https://api.open-meteo.com/v1/forecast` +
//         `?latitude=${lat}` +
//         `&longitude=${lon}` +
//         `&current_weather=true` +
//         `&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,apparent_temperature` +
//         `&timezone=auto`;

//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error("Weather API failed");
//       }

//       const data = await response.json();

//       const current = data.current_weather;

//       if (!current) {
//         throw new Error("Current weather data unavailable");
//       }

//       const humidity =
//         data.hourly?.relativehumidity_2m?.[0] ?? null;

//       const rainProbability =
//         data.hourly?.precipitation_probability?.[0] ?? 0;

//       const apparentTemperature =
//         data.hourly?.apparent_temperature?.[0] ??
//         Math.round(current.temperature);

//       setWeather({
//         temp: Math.round(current.temperature),

//         condition: getWeatherCondition(
//           current.weathercode
//         ),

//         wind: Math.round(current.windspeed),

//         humidity,

//         rain_prob: rainProbability,

//         code: current.weathercode,

//         feelsLike: Math.round(apparentTemperature),
//       });

//       setLocationName(
//         `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`
//       );
//     } catch (error) {
//       console.error("Weather fetch failed:", error);
//       setWeatherError(true);
//     } finally {
//       setWeatherLoading(false);
//     }
//   };

//   // =========================================================
//   // GEOLOCATION
//   // =========================================================

//   const handleLocationSuccess = (position) => {
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;

//     fetchWeather(lat, lon);
//   };

//   const handleLocationError = () => {
//     setLocationName("Kakinada, Andhra Pradesh");

//     // Kakinada fallback coordinates
//     fetchWeather(16.9891, 82.2475);
//   };

//   const retryWeather = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         handleLocationSuccess,
//         handleLocationError
//       );
//     } else {
//       handleLocationError();
//     }
//   };

//   // =========================================================
//   // SPRAY SAFETY
//   // =========================================================

//   const isSafeToSpray = () => {
//     if (!weather) return false;

//     if (
//       Number(weather.wind) > 15 ||
//       Number(weather.rain_prob) > 50 ||
//       Number(weather.code) > 60
//     ) {
//       return false;
//     }

//     return true;
//   };

//   // =========================================================
//   // SAVE CROP GROWTH
//   // =========================================================

//   const saveGrowth = async (date, crop) => {
//     try {
//       await api.post("/growth", {
//         sowingDate: date,
//         crop,
//       });
//     } catch (error) {
//       console.error("Save growth error:", error);
//     }
//   };

//   // =========================================================
//   // CALCULATE CROP STAGE
//   // =========================================================

//   const calculateCropStage = (dateStr, crop) => {
//     if (!dateStr) {
//       setCropStage(null);
//       return;
//     }

//     const start = new Date(dateStr);

//     if (Number.isNaN(start.getTime())) {
//       setCropStage(null);
//       return;
//     }

//     const today = new Date();

//     const diffTime = Math.max(
//       0,
//       today.getTime() - start.getTime()
//     );

//     const days = Math.floor(
//       diffTime / (1000 * 60 * 60 * 24)
//     );

//     const totalDays =
//       crop === "wheat" ? 140 : 120;

//     let stage = {
//       key: "germination",
//       progress: 10,
//     };

//     if (days > 15) {
//       stage = {
//         key: "vegetative",
//         progress: 40,
//       };
//     }

//     if (days > totalDays * 0.4) {
//       stage = {
//         key: "flowering",
//         progress: 70,
//       };
//     }

//     if (days > totalDays * 0.8) {
//       stage = {
//         key: "harvest",
//         progress: 100,
//       };
//     }

//     setCropStage({
//       days,
//       totalDays,
//       ...stage,
//     });
//   };

//   // =========================================================
//   // FETCH SAVED GROWTH
//   // =========================================================

//   const fetchGrowth = async () => {
//     try {
//       const response = await api.get("/growth");

//       if (response.data?.sowingDate) {
//         const date = response.data.sowingDate;
//         const crop = response.data.crop || "rice";

//         setSowingDate(date);
//         setSelectedCrop(crop);

//         calculateCropStage(date, crop);
//       }
//     } catch (error) {
//       console.error("Growth fetch error:", error);
//     }
//   };

//   // =========================================================
//   // RESET GROWTH
//   // =========================================================

//   const resetGrowth = async () => {
//     try {
//       await api.post("/growth", {
//         sowingDate: "",
//         crop: "",
//       });

//       setSowingDate("");
//       setTempDate("");
//       setSelectedCrop("rice");
//       setCropStage(null);
//     } catch (error) {
//       console.error("Reset growth error:", error);
//     }
//   };

//   // =========================================================
//   // CROP STAGE TEXT
//   // =========================================================

//   const getCropStageText = () => {
//     if (!cropStage?.key) {
//       return "--";
//     }

//     const translated = t(cropStage.key);

//     if (
//       !translated ||
//       translated === cropStage.key
//     ) {
//       const fallback = {
//         germination: "Germination",
//         vegetative: "Vegetative Growth",
//         flowering: "Flowering",
//         harvest: "Ready for Harvest",
//       };

//       return (
//         fallback[cropStage.key] ||
//         cropStage.key
//       );
//     }

//     return translated;
//   };

//   // =========================================================
//   // CROP ADVICE
//   // =========================================================

//   const getCropAdvice = () => {
//     if (!cropStage?.key) {
//       return "";
//     }

//     const adviceKey = `advice_${cropStage.key}`;
//     const translated = t(adviceKey);

//     if (
//       !translated ||
//       translated === adviceKey
//     ) {
//       const fallback = {
//         germination:
//           "Keep the soil adequately moist and monitor the young seedlings regularly.",

//         vegetative:
//           "Support healthy leaf and root growth with proper irrigation and nutrients.",

//         flowering:
//           "Monitor water, nutrients and weather conditions carefully during flowering.",

//         harvest:
//           "Check crop maturity and prepare for harvesting at the appropriate time.",
//       };

//       return (
//         fallback[cropStage.key] ||
//         "Continue monitoring your crop regularly."
//       );
//     }

//     return translated;
//   };

//   // =========================================================
//   // INITIAL LOAD
//   // =========================================================

//   useEffect(() => {
//     fetchFarmerProfile();
//     fetchGrowth();

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         handleLocationSuccess,
//         handleLocationError
//       );
//     } else {
//       handleLocationError();
//     }
//   }, []);

//   // =========================================================
//   // UPDATE CROP STAGE
//   // =========================================================

//   useEffect(() => {
//     if (sowingDate) {
//       calculateCropStage(
//         sowingDate,
//         selectedCrop
//       );
//     }
//   }, [sowingDate, selectedCrop]);

//   // =========================================================
//   // DEMO SUPPORT
//   // =========================================================

//   useEffect(() => {
//     if (typeof startDemo !== "function") {
//       return;
//     }
//   }, [startDemo]);

//   // =========================================================
//   // USER NAME
//   // =========================================================

//   const farmerName =
//     farmerProfile?.fullName ||
//     farmerProfile?.name ||
//     t("farmer");

//   // =========================================================
//   // RENDER
//   // =========================================================

//   return (
//     <div className={styles.dashboard}>

//       {/* WELCOME */}
//       <motion.section
//         className={styles.welcomeSection}
//         initial={{ opacity: 0, y: 12 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.35 }}
//       >
//         <WelcomeBanner
//           greeting={getGreeting()}
//           farmerName={farmerName}
//           location={locationName}
//         />
//       </motion.section>

//       {/* WEATHER ALERT */}
//       {weather &&
//         (Number(weather.code) > 90 ||
//           Number(weather.wind) > 40) && (
//           <motion.div
//             className={styles.weatherAlert}
//             initial={{ opacity: 0, y: -8 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <div className={styles.alertIcon}>
//               <AlertCircle size={19} />
//             </div>
//             <div className={styles.alertContent}>
//               <strong>{t("weather_alert")}!</strong>
//               <p>
//                 {Number(weather.code) > 90
//                   ? t("severe_thunderstorm")
//                   : t("wind_high")}
//                 . {t("secure_crops")}
//               </p>
//             </div>
//           </motion.div>
//         )}

//       {/* TOP DASHBOARD */}
//       <section className={styles.topDashboardGrid}>
//         <motion.div
//           className={styles.statsArea}
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.35, delay: 0.05 }}
//         >
//           <FarmStats
//             farmerProfile={farmerProfile}
//             crop={selectedCrop}
//             cropStage={cropStage}
//             rainfall={weather?.rain_prob ?? null}
//             temperature={weather?.temp ?? null}
//             feelsLike={weather?.feelsLike ?? null}
//             soilMoisture={null}
//             loading={weatherLoading || loadingProfile}
//           />
//         </motion.div>

//         <motion.div
//           id="weather-card"
//           data-tour="weather"
//           className={styles.weatherArea}
//           initial={{ opacity: 0, scale: 0.99 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.35, delay: 0.1 }}
//         >
//           <WeatherCard
//             weather={weather}
//             loading={weatherLoading}
//             error={weatherError}
//             location={locationName}
//             isSafeToSpray={isSafeToSpray()}
//             onRetry={retryWeather}
//           />
//         </motion.div>
//       </section>

//       {/* MAIN CONTENT */}
//       <section className={styles.mainGrid}>

//         {/* LEFT COLUMN */}
//         <div className={styles.mainColumn}>

//           {/* FARM OVERVIEW */}
//           <motion.section
//             className={styles.dashboardSection}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.35, delay: 0.12 }}
//           >
//             <FarmOverview
//               farmerProfile={farmerProfile}
//               crop={selectedCrop}
//               cropStage={cropStage}
//               sowingDate={sowingDate}
//               location={locationName}
//             />
//           </motion.section>

//           {/* CROP TRACKER */}
//           <motion.section
//             id="crop-tracker"
//             data-tour="crop-tracker"
//             className={styles.cropTracker}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.35, delay: 0.15 }}
//           >
//             <div className={styles.cropTrackerHeader}>
//               <div className={styles.cropTrackerTitle}>
//                 <div className={styles.cropTrackerIcon}>
//                   <Calendar size={18} />
//                 </div>
//                 <div>
//                   <h2>{t("crop_tracker")}</h2>
//                   <p>
//                     {sowingDate
//                       ? "Track your crop growth"
//                       : "Start tracking your crop"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {!sowingDate ? (
//               <div className={styles.cropSetup}>
//                 <div className={styles.formGroup}>
//                   <label>{t("select_crop")}</label>
//                   <select
//                     value={selectedCrop}
//                     onChange={(e) =>
//                       setSelectedCrop(e.target.value)
//                     }
//                   >
//                     {crops.map((crop) => (
//                       <option key={crop} value={crop}>
//                         {t(`crop_names.${crop}`)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label>{t("enter_sowing_date")}</label>
//                   <input
//                     type="date"
//                     value={tempDate}
//                     max={
//                       new Date()
//                         .toISOString()
//                         .split("T")[0]
//                     }
//                     onChange={(e) =>
//                       setTempDate(e.target.value)
//                     }
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   className={
//                     tempDate
//                       ? styles.trackButton
//                       : styles.trackButtonDisabled
//                   }
//                   disabled={!tempDate}
//                   onClick={() => {
//                     if (!tempDate) return;
//                     setSowingDate(tempDate);
//                     saveGrowth(tempDate, selectedCrop);
//                     setTempDate("");
//                   }}
//                 >
//                   <Sprout size={16} />
//                   {t("track_growth")}
//                 </button>
//               </div>
//             ) : (
//               <div className={styles.cropTrackerBody}>
//                 <div className={styles.cropSummary}>
//                   <div>
//                     <span>{t("crop")}</span>
//                     <strong>
//                       {t(`crop_names.${selectedCrop}`)}
//                     </strong>
//                   </div>
//                   <div className={styles.daysBox}>
//                     <span>{t("days_passed")}</span>
//                     <strong>
//                       {cropStage?.days || 0}
//                       <small> {t("days")}</small>
//                     </strong>
//                   </div>
//                 </div>

//                 <div className={styles.progressSection}>
//                   <div className={styles.progressHeader}>
//                     <span>{t("current_stage")}</span>
//                     <strong>{getCropStageText()}</strong>
//                   </div>
//                   <div className={styles.progressTrack}>
//                     <motion.div
//                       className={styles.progressFill}
//                       initial={{ width: 0 }}
//                       animate={{
//                         width: `${cropStage?.progress || 0}%`,
//                       }}
//                       transition={{
//                         duration: 0.7,
//                         ease: "easeOut",
//                       }}
//                     />
//                   </div>
//                   <div className={styles.progressMeta}>
//                     <span>{cropStage?.progress || 0}%</span>
//                     <span>
//                       ~ {cropStage?.totalDays || 120}{" "}
//                       {t("days")}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={styles.stageTimeline}>
//                   {[
//                     { key: "germination", label: "Germination", progress: 10 },
//                     { key: "vegetative", label: "Vegetative", progress: 40 },
//                     { key: "flowering", label: "Flowering", progress: 70 },
//                     { key: "harvest", label: "Harvest", progress: 100 },
//                   ].map((stage) => {
//                     const active = cropStage?.key === stage.key;
//                     const completed =
//                       (cropStage?.progress || 0) >= stage.progress;

//                     return (
//                       <div
//                         key={stage.key}
//                         className={`
//                           ${styles.stageItem}
//                           ${active ? styles.stageActive : ""}
//                           ${completed ? styles.stageCompleted : ""}
//                         `}
//                       >
//                         <div className={styles.stageDot} />
//                         <span>{stage.label}</span>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div className={styles.cropAdvice}>
//                   <div className={styles.cropAdviceTitle}>
//                     <Sprout size={15} />
//                     {t("advice")}
//                   </div>
//                   <p>{getCropAdvice()}</p>
//                 </div>

//                 <div className={styles.cropTrackerFooter}>
//                   <span>{t(`crop_names.${selectedCrop}`)}</span>
//                   <button type="button" onClick={resetGrowth}>
//                     <RotateCcw size={13} />
//                     {t("reset")}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </motion.section>

//           {/* QUICK ACCESS */}
//           <motion.section
//             className={styles.dashboardSection}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.35, delay: 0.2 }}
//           >
//             <QuickAccess />
//           </motion.section>
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <aside className={styles.sideColumn}>
//           {/* FARM STATUS */}
//           <section className={styles.dashboardSection}>
//             <div className={styles.farmStatusCard}>
//               <div className={styles.farmStatusHeader}>
//                 <Sprout size={17} />
//                 <span>Farm Status</span>
//               </div>

//               <div className={styles.farmStatusRow}>
//                 <span>Active crop</span>
//                 <strong>{t(`crop_names.${selectedCrop}`)}</strong>
//               </div>

//               <div className={styles.farmStatusRow}>
//                 <span>Crop stage</span>
//                 <strong>
//                   {cropStage ? getCropStageText() : "Not tracked"}
//                 </strong>
//               </div>

//               <div className={styles.farmStatusRow}>
//                 <span>Weather</span>
//                 <strong>{weather ? weather.condition : "--"}</strong>
//               </div>

//               <div className={styles.farmStatusRow}>
//                 <span>Spray</span>
//                 <strong
//                   className={
//                     weather
//                       ? isSafeToSpray()
//                         ? styles.safeText
//                         : styles.unsafeText
//                       : ""
//                   }
//                 >
//                   {weather
//                     ? isSafeToSpray()
//                       ? t("safe_to_spray")
//                       : t("unsafe_to_spray")
//                     : "--"}
//                 </strong>
//               </div>
//             </div>
//           </section>
//         </aside>
//       </section>

//       {/* SPRAY STATUS */}
//       {weather && (
//         <div
//           className={`
//             ${styles.sprayStatus}
//             ${isSafeToSpray() ? styles.spraySafe : styles.sprayUnsafe}
//           `}
//           aria-live="polite"
//         >
//           {isSafeToSpray() ? (
//             <CheckCircle2 size={16} />
//           ) : (
//             <AlertCircle size={16} />
//           )}
//           <span>
//             {isSafeToSpray()
//               ? t("safe_to_spray")
//               : t("unsafe_to_spray")}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }














// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { motion } from "framer-motion";

// import {
//   AlertCircle,
//   ArrowUpRight,
//   BarChart3,
//   CalendarDays,
//   CheckCircle2,
//   ChevronRight,
//   Cloud,
//   CloudRain,
//   Droplets,
//   Leaf,
//   MapPin,
//   RotateCcw,
//   ShieldCheck,
//   ShoppingCart,
//   Sparkles,
//   Sprout,
//   Stethoscope,
//   CloudSun,
//   Sun,
//   TrendingUp,
//   Wind,
// } from "lucide-react";

// import api from "../api";

// import FarmDashboardBanner from "../assets/FarmDashboardBanner.png";
// /* =========================================================
//    FARMXPERT DASHBOARD

//    Includes:
//    - Welcome Banner
//    - Weather
//    - Crop Tracker
//    - Farm Status
//    - Quick Access
//    - Animations
//    - Responsive Design

//    Sidebar + Topbar are already handled by your project.
//    ========================================================= */


// export default function Dashboard() {

//   const { t } = useTranslation();


//   /* =========================================================
//      FARMER
//      ========================================================= */

//   const [farmerProfile, setFarmerProfile] =
//     useState(null);

//   const [loadingProfile, setLoadingProfile] =
//     useState(true);


//   /* =========================================================
//      WEATHER
//      ========================================================= */

//   const [weather, setWeather] =
//     useState(null);

//   const [weatherLoading, setWeatherLoading] =
//     useState(true);

//   const [weatherError, setWeatherError] =
//     useState(false);

//   const [locationName, setLocationName] =
//     useState(
//       "Kakinada, Andhra Pradesh"
//     );


//   /* =========================================================
//      CROP TRACKER
//      ========================================================= */

//   const [sowingDate, setSowingDate] =
//     useState("");

//   const [selectedCrop, setSelectedCrop] =
//     useState("rice");

//   const [cropStage, setCropStage] =
//     useState(null);

//   const [tempDate, setTempDate] =
//     useState("");


//   const crops = [
//     "rice",
//     "wheat",
//     "maize",
//     "cotton",
//     "tomato",
//     "potato",
//   ];


//   /* =========================================================
//      TRANSLATION
//      ========================================================= */

//   const translate = (
//     key,
//     fallback
//   ) => {

//     const value = t(key);

//     if (
//       !value ||
//       value === key
//     ) {
//       return fallback;
//     }

//     return value;
//   };


//   /* =========================================================
//      GREETING
//      ========================================================= */

//   const getGreeting = () => {

//     const hour =
//       new Date().getHours();

//     if (hour < 12) {
//       return translate(
//         "good_morning",
//         "Good Morning"
//       );
//     }

//     if (hour < 17) {
//       return translate(
//         "good_afternoon",
//         "Good Afternoon"
//       );
//     }

//     if (hour < 21) {
//       return translate(
//         "good_evening",
//         "Good Evening"
//       );
//     }

//     return translate(
//       "good_night",
//       "Good Night"
//     );
//   };


//   /* =========================================================
//      FARMER PROFILE
//      ========================================================= */

//   const fetchFarmerProfile =
//     async () => {

//       try {

//         setLoadingProfile(true);

//         const response =
//           await api.get("/farmer");

//         if (
//           response.data?.exists
//         ) {

//           setFarmerProfile(
//             response.data.profile
//           );

//         }

//       } catch (error) {

//         console.error(
//           "Farmer profile error:",
//           error
//         );

//       } finally {

//         setLoadingProfile(false);

//       }
//     };


//   /* =========================================================
//      WEATHER CONDITION
//      ========================================================= */

//   const getWeatherCondition =
//     (code) => {

//       if (
//         code === undefined ||
//         code === null
//       ) {

//         return "Loading weather...";

//       }

//       if (code === 0)
//         return "Clear Sky";

//       if (code <= 3)
//         return "Partly Cloudy";

//       if (code <= 48)
//         return "Foggy";

//       if (code <= 67)
//         return "Rainy";

//       if (code <= 77)
//         return "Snowy";

//       if (code <= 82)
//         return "Rain Showers";

//       if (code <= 86)
//         return "Snow Showers";

//       return "Thunderstorm";
//     };


//   /* =========================================================
//      WEATHER ICON
//      ========================================================= */

//   const WeatherIcon = ({
//     code,
//     size = 58,
//   }) => {

//     if (code === 0) {

//       return (
//         <Sun
//           size={size}
//         />
//       );

//     }

//   if (code <= 3) {
//   return (
//     <CloudSun
//       size={size}
//       strokeWidth={1.8}
//       color="#F4B400"
//     />
//   );
// }

//     if (code <= 48) {

//       return (
//         <Cloud
//           size={size}
//         />
//       );

//     }

//     return (
//       <CloudRain
//         size={size}
//       />
//     );
//   };


//   /* =========================================================
//      WEATHER API
//      ========================================================= */

//   const fetchWeather =
//     async (
//       lat,
//       lon
//     ) => {

//       try {

//         setWeatherLoading(true);

//         setWeatherError(false);

//         const url =
//           `https://api.open-meteo.com/v1/forecast` +
//           `?latitude=${lat}` +
//           `&longitude=${lon}` +
//           `&current_weather=true` +
//           `&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,apparent_temperature` +
//           `&timezone=auto`;

//         const response =
//           await fetch(url);

//         if (!response.ok) {

//           throw new Error(
//             "Weather API failed"
//           );

//         }

//         const data =
//           await response.json();

//         const current =
//           data.current_weather;

//         if (!current) {

//           throw new Error(
//             "Current weather unavailable"
//           );

//         }

//         const humidity =
//           data.hourly
//             ?.relativehumidity_2m
//             ?.[0] ?? null;

//         const rainProbability =
//           data.hourly
//             ?.precipitation_probability
//             ?.[0] ?? 0;

//         const apparentTemperature =
//           data.hourly
//             ?.apparent_temperature
//             ?.[0] ??
//           Math.round(
//             current.temperature
//           );

//         setWeather({

//           temp:
//             Math.round(
//               current.temperature
//             ),

//           condition:
//             getWeatherCondition(
//               current.weathercode
//             ),

//           wind:
//             Math.round(
//               current.windspeed
//             ),

//           humidity,

//           rain_prob:
//             rainProbability,

//           code:
//             current.weathercode,

//           feelsLike:
//             Math.round(
//               apparentTemperature
//             ),

//         });


//         setLocationName(
//           `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`
//         );


//       } catch (error) {

//         console.error(
//           "Weather fetch failed:",
//           error
//         );

//         setWeatherError(true);

//       } finally {

//         setWeatherLoading(false);

//       }
//     };


//   /* =========================================================
//      LOCATION
//      ========================================================= */

//   const handleLocationSuccess =
//     (position) => {

//       const lat =
//         position.coords.latitude;

//       const lon =
//         position.coords.longitude;

//       fetchWeather(
//         lat,
//         lon
//       );

//     };


//   const handleLocationError =
//     () => {

//       setLocationName(
//         "Kakinada, Andhra Pradesh"
//       );

//       fetchWeather(
//         16.9891,
//         82.2475
//       );

//     };


//   const retryWeather =
//     () => {

//       if (
//         navigator.geolocation
//       ) {

//         navigator.geolocation.getCurrentPosition(
//           handleLocationSuccess,
//           handleLocationError
//         );

//       } else {

//         handleLocationError();

//       }
//     };


//   /* =========================================================
//      SPRAY SAFETY
//      ========================================================= */

//   const isSafeToSpray =
//     () => {

//       if (!weather) {
//         return false;
//       }

//       if (
//         Number(weather.wind) > 15 ||
//         Number(weather.rain_prob) > 50 ||
//         Number(weather.code) > 60
//       ) {

//         return false;

//       }

//       return true;
//     };


//   /* =========================================================
//      CROP GROWTH
//      ========================================================= */

//   const saveGrowth =
//     async (
//       date,
//       crop
//     ) => {

//       try {

//         await api.post(
//           "/growth",
//           {
//             sowingDate:
//               date,

//             crop,
//           }
//         );

//       } catch (error) {

//         console.error(
//           "Save growth error:",
//           error
//         );

//       }
//     };


//   const calculateCropStage =
//     (
//       dateStr,
//       crop
//     ) => {

//       if (!dateStr) {

//         setCropStage(null);

//         return;
//       }


//       const start =
//         new Date(dateStr);


//       if (
//         Number.isNaN(
//           start.getTime()
//         )
//       ) {

//         setCropStage(null);

//         return;

//       }


//       const today =
//         new Date();


//       const diffTime =
//         Math.max(
//           0,
//           today.getTime() -
//             start.getTime()
//         );


//       const days =
//         Math.floor(
//           diffTime /
//             (
//               1000 *
//               60 *
//               60 *
//               24
//             )
//         );


//       const totalDays =
//         crop === "wheat"
//           ? 140
//           : 120;


//       const progress =
//         Math.min(
//           100,
//           Math.max(
//             0,
//             Math.round(
//               (
//                 days /
//                 totalDays
//               ) * 100
//             )
//           )
//         );


//       let stage = {
//         key:
//           "germination",
//       };


//       if (
//         progress >= 80
//       ) {

//         stage = {
//           key:
//             "harvest",
//         };

//       } else if (
//         progress >= 40
//       ) {

//         stage = {
//           key:
//             "flowering",
//         };

//       } else if (
//         progress >= 15
//       ) {

//         stage = {
//           key:
//             "vegetative",
//         };

//       }


//       setCropStage({

//         days,

//         totalDays,

//         progress,

//         ...stage,

//       });

//     };


//   const fetchGrowth =
//     async () => {

//       try {

//         const response =
//           await api.get(
//             "/growth"
//           );


//         if (
//           response.data?.sowingDate
//         ) {

//           const date =
//             response.data.sowingDate;

//           const crop =
//             response.data.crop ||
//             "rice";


//           setSowingDate(
//             date
//           );

//           setSelectedCrop(
//             crop
//           );


//           calculateCropStage(
//             date,
//             crop
//           );

//         }

//       } catch (error) {

//         console.error(
//           "Growth fetch error:",
//           error
//         );

//       }
//     };


//   const resetGrowth =
//     async () => {

//       try {

//         await api.post(
//           "/growth",
//           {
//             sowingDate: "",
//             crop: "",
//           }
//         );


//         setSowingDate("");

//         setTempDate("");

//         setSelectedCrop(
//           "rice"
//         );

//         setCropStage(
//           null
//         );

//       } catch (error) {

//         console.error(
//           "Reset growth error:",
//           error
//         );

//       }
//     };


//   /* =========================================================
//      CROP TEXT
//      ========================================================= */

//   const getCropStageText =
//     () => {

//       if (!cropStage?.key) {

//         return "Not Tracked";

//       }


//       const fallback = {

//         germination:
//           "Germination",

//         vegetative:
//           "Vegetative",

//         flowering:
//           "Flowering",

//         harvest:
//           "Harvest",

//       };


//       const translated =
//         t(
//           cropStage.key
//         );


//       if (
//         !translated ||
//         translated ===
//           cropStage.key
//       ) {

//         return fallback[
//           cropStage.key
//         ];

//       }


//       return translated;

//     };


//   const getCropAdvice =
//     () => {

//       if (!cropStage?.key) {

//         return (
//           "Start tracking your crop to receive personalized advice."
//         );

//       }


//       const fallback = {

//         germination:
//           "Keep the soil adequately moist and monitor the young seedlings regularly.",

//         vegetative:
//           "Support healthy leaf and root growth with proper irrigation and nutrients.",

//         flowering:
//           "Monitor water, nutrients and weather conditions carefully during flowering.",

//         harvest:
//           "Check crop maturity and prepare for harvesting at the appropriate time.",

//       };


//       const key =
//         `advice_${cropStage.key}`;


//       const translated =
//         t(key);


//       if (
//         !translated ||
//         translated === key
//       ) {

//         return fallback[
//           cropStage.key
//         ];

//       }


//       return translated;

//     };


//   const getCropName =
//     (crop) => {

//       const translated =
//         t(
//           `crop_names.${crop}`
//         );


//       if (
//         !translated ||
//         translated ===
//           `crop_names.${crop}`
//       ) {

//         const names = {

//           rice:
//             "Rice",

//           wheat:
//             "Wheat",

//           maize:
//             "Maize",

//           cotton:
//             "Cotton",

//           tomato:
//             "Tomato",

//           potato:
//             "Potato",

//         };


//         return (
//           names[crop] ||
//           crop
//         );

//       }


//       return translated;

//     };


//   /* =========================================================
//      INITIAL LOAD
//      ========================================================= */

//   useEffect(() => {

//     fetchFarmerProfile();

//     fetchGrowth();


//     if (
//       navigator.geolocation
//     ) {

//       navigator.geolocation.getCurrentPosition(
//         handleLocationSuccess,
//         handleLocationError
//       );

//     } else {

//       handleLocationError();

//     }

//   }, []);


//   useEffect(() => {

//     if (sowingDate) {

//       calculateCropStage(
//         sowingDate,
//         selectedCrop
//       );

//     }

//   }, [
//     sowingDate,
//     selectedCrop,
//   ]);


//   /* =========================================================
//      DATA
//      ========================================================= */

//   const farmerName =
//     farmerProfile?.fullName ||
//     farmerProfile?.name ||
//     "Vyshnavi";


//   const stages = [

//     {
//       key:
//         "germination",

//       label:
//         "Germination",

//       progress:
//         10,
//     },

//     {
//       key:
//         "vegetative",

//       label:
//         "Vegetative",

//       progress:
//         40,
//     },

//     {
//       key:
//         "flowering",

//       label:
//         "Flowering",

//       progress:
//         70,
//     },

//     {
//       key:
//         "harvest",

//       label:
//         "Harvest",

//       progress:
//         100,
//     },

//   ];


//   /* =========================================================
//      QUICK ACCESS DATA
//      ========================================================= */

//   const quickAccessItems = [

//     {
//       number:
//         "01",

//       title:
//         "Crop Consult",

//       description:
//         "Get AI-powered crop recommendations based on your soil, climate and farming conditions.",

//       button:
//         "Get Started",

//       icon:
//         Leaf,

//       decoration:
//         Sprout,

//       className:
//         "green",

//       path:
//         "/crop-consult",

//     },

//     {
//       number:
//         "02",

//       title:
//         "Yield Forecast",

//       description:
//         "Predict your expected harvest and make smarter decisions for the upcoming season.",

//       button:
//         "View Forecast",

//       icon:
//         TrendingUp,

//       decoration:
//         BarChart3,

//       className:
//         "blue",

//       path:
//         "/yield-predict",

//     },

//     {
//       number:
//         "03",

//       title:
//         "Disease Lab",

//       description:
//         "Upload a crop image and identify possible diseases with AI-powered diagnosis.",

//       button:
//         "Diagnose Now",

//       icon:
//         ShieldCheck,

//       decoration:
//         Stethoscope,

//       className:
//         "red",

//       path:
//         "/disease",

//     },

//     {
//       number:
//         "04",

//       title:
//         "Farm Store",

//       description:
//         "Find quality seeds, fertilizers and essential farming products in one place.",

//       button:
//         "Shop Now",

//       icon:
//         ShoppingCart,

//       decoration:
//         ShoppingCart,

//       className:
//         "orange",

//       path:
//         "/store",

//     },

//   ];


//   /* =========================================================
//      RENDER
//      ========================================================= */

//   return (

//     <>

//       <style>{`

// /* =========================================================
//    FARMXPERT DASHBOARD
//    ========================================================= */

// .farmx-dashboard {

//   width: 100%;

//   min-height:
//     calc(100vh - 80px);

//     padding:
//     14px 28px 24px 34px;

//   background:
//     #ffffff;

//   color:
//     #111827;

//   font-family:
//     Inter,
//     "Segoe UI",
//     Arial,
//     sans-serif;

//   box-sizing:
//     border-box;

// }


// .farmx-dashboard *,
// .farmx-dashboard *::before,
// .farmx-dashboard *::after {

//   box-sizing:
//     border-box;

// }

// /* =========================================================
//    WELCOME BANNER
//    EXACT REFERENCE LAYOUT
//    ========================================================= */

// .farmx-welcome {
//   position: relative;
//   width: 100%;
//   height: 92px;

//   margin: 0 0 8px;

//   overflow: hidden;

//   border-radius: 0;

//   background: #ffffff;

//   isolation: isolate;
// }


// /* =========================================================
//    FARM IMAGE
//    ========================================================= */

// .farmx-welcome-image {
//   position: absolute;

//   top: 0;
//   right: 0;

//   width: 61%;
//   height: 100%;

//   object-fit: cover;
//   object-position: center center;

//   z-index: 1;

//   pointer-events: none;

//   user-select: none;

//   -webkit-mask-image:
//     linear-gradient(
//       to right,
//       transparent 0%,
//       rgba(0,0,0,.20) 8%,
//       #000 24%,
//       #000 100%
//     );

//   mask-image:
//     linear-gradient(
//       to right,
//       transparent 0%,
//       rgba(0,0,0,.20) 8%,
//       #000 24%,
//       #000 100%
//     );

//   animation: farmBannerFloat 8s ease-in-out infinite;
// }


// /* =========================================================
//    WHITE BLENDING ON LEFT
//    ========================================================= */

// .farmx-welcome-overlay {
//   position: absolute;

//   inset: 0;

//   z-index: 2;

//   pointer-events: none;

//   background:
//     linear-gradient(
//       90deg,
//       #ffffff 0%,
//       #ffffff 29%,
//       rgba(255,255,255,.96) 36%,
//       rgba(255,255,255,.35) 51%,
//       rgba(255,255,255,0) 69%
//     );
// }


// /* =========================================================
//    WELCOME CONTENT
//    ========================================================= */

// .farmx-welcome-content {
//   position: relative;

//   z-index: 5;

//   width: 50%;

//   height: 100%;

//   display: flex;

//   flex-direction: column;

//   justify-content: center;

//   padding: 0 0 0 2px;
// }


// /* =========================================================
//    TITLE
//    ========================================================= */

// .farmx-welcome-title {
//   margin: 0;

//   color: #111827;

//   font-size: 25px;

//   line-height: 30px;

//   font-weight: 750;

//   letter-spacing: -0.6px;

//   white-space: nowrap;
// }


// /* =========================================================
//    FARMER NAME
//    ========================================================= */

// .farmx-welcome-title .name {
//   color: #08752f;

//   font-weight: 760;
// }


// /* =========================================================
//    PLANT
//    ========================================================= */

// .farmx-welcome-title .plant {
//   display: inline-block;

//   margin-left: 7px;

//   font-size: 20px;

//   transform-origin: bottom center;

//   animation:
//     farmPlantWave
//     3s
//     ease-in-out
//     infinite;
// }


// /* =========================================================
//    SUBTITLE
//    ========================================================= */

// .farmx-welcome-subtitle {
//   margin: 4px 0 0;

//   color: #46534b;

//   font-size: 12px;

//   line-height: 18px;

//   font-weight: 400;

//   max-width: 430px;
// }


// /* =========================================================
//    IMAGE ANIMATION
//    ========================================================= */

// @keyframes farmBannerFloat {

//   0%,
//   100% {
//     transform: scale(1);
//   }

//   50% {
//     transform: scale(1.015);
//   }
// }


// @keyframes farmPlantWave {

//   0%,
//   100% {
//     transform:
//       rotate(0deg)
//       scale(1);
//   }

//   50% {
//     transform:
//       rotate(7deg)
//       scale(1.08);
//   }
// }

// /* =========================================================
//    WEATHER OUTER CONTAINER
//    ========================================================= */

// .farmx-weather-outer {
//   position: relative;

//   width: 100%;

//   height: 117px;

//   margin: 0 0 14px;

//   overflow: hidden;

//   border-radius: 15px;

//   border: 1px solid #e8eeea;

//   background: #ffffff;

//   box-shadow:
//     0 3px 12px
//     rgba(20,70,37,.035);
// }


// /* =========================================================
//    GREEN WEATHER CARD
//    ========================================================= */

// .farmx-weather-card {
//   position: relative;

//   z-index: 3;

//   width: 59%;

//   height: 116px;

//   padding: 12px 18px;

//   border-radius: 15px;

//   color: #ffffff;

//   background:
//     linear-gradient(
//       135deg,
//       #075e2d 0%,
//       #087d3a 55%,
//       #128d46 100%
//     );

//   box-shadow:
//     0 7px 18px
//     rgba(0,99,42,.16);
// }


// /* =========================================================
//    WEATHER HEADER
//    ========================================================= */

// .farmx-weather-heading {
//   display: flex;

//   align-items: center;

//   justify-content: space-between;

//   height: 20px;
// }


// .farmx-weather-heading h2 {
//   margin: 0;

//   font-size: 15px;

//   line-height: 20px;

//   font-weight: 700;
// }


// .farmx-live {
//   display: inline-flex;

//   align-items: center;

//   gap: 5px;

//   height: 21px;

//   padding: 0 9px;

//   border-radius: 20px;

//   background: rgba(0,0,0,.15);

//   font-size: 9px;

//   font-weight: 600;
// }


// .farmx-live-dot {
//   width: 6px;

//   height: 6px;

//   border-radius: 50%;

//   background: #a9ed42;

//   animation:
//     fxPulse
//     2s
//     infinite;
// }


// /* =========================================================
//    WEATHER CONTENT
//    ========================================================= */

// .farmx-weather-content {
//   display: grid;

//   grid-template-columns:
//     190px
//     1fr
//     1fr
//     1fr;

//   height: 78px;

//   align-items: center;
// }


// /* =========================================================
//    MAIN WEATHER
//    ========================================================= */

// .farmx-weather-main {
//   display: flex;

//   align-items: center;

//   gap: 7px;
// }


// .farmx-weather-icon {
//   width: 73px;

//   height: 64px;

//   display: flex;

//   align-items: center;

//   justify-content: center;

//   color: #ffdd35;
// }


// .fx-weather-icon-combo {
//   position: relative;

//   width: 57px;

//   height: 57px;
// }


// .fx-weather-icon-combo svg:first-child {
//   position: absolute;

//   left: 0;
//   top: 0;

//   color: #ffd72f;
// }


// .fx-weather-icon-combo svg:last-child {
//   position: absolute;

//   right: -3px;
//   bottom: 0;

//   color: #f7f8f7;
// }


// .farmx-temp {
//   font-size: 34px;

//   line-height: 35px;

//   font-weight: 750;

//   letter-spacing: -1.5px;
// }


// .farmx-condition {
//   margin-top: 2px;

//   font-size: 11px;

//   line-height: 15px;

//   font-weight: 600;
// }


// /* =========================================================
//    WEATHER STAT COLUMNS
//    ========================================================= */

// .farmx-weather-stat {
//   height: 48px;

//   padding-left: 18px;

//   border-left:
//     1px solid
//     rgba(255,255,255,.27);

//   display: flex;

//   flex-direction: column;

//   justify-content: center;
// }


// .farmx-weather-stat-label {
//   display: flex;

//   align-items: center;

//   gap: 6px;

//   font-size: 10px;

//   line-height: 14px;

//   font-weight: 600;
// }


// .farmx-weather-stat-value {
//   margin-top: 3px;

//   font-size: 14px;

//   line-height: 18px;

//   font-weight: 700;
// }

// /* =========================================================
//    MAIN GRID
//    ========================================================= */

// .farmx-main-grid {

//   display:
//     grid;

//   grid-template-columns:
//     minmax(0,1.04fr)
//     minmax(0,.96fr);

//   column-gap:
//     24px;

//   row-gap:
//     17px;

// }


// /* =========================================================
//    COMMON CARD
//    ========================================================= */

// .farmx-card {

//   background:
//     #ffffff;

//   border:
//     1px solid #e5ebe7;

//   border-radius:
//     18px;

//   box-shadow:
//     0 4px 16px
//     rgba(18,65,34,.035);

// }
// /* =========================================================
//    CROP TRACKER - COMPACT LAYOUT
//    ========================================================= */

// .farmx-crop-card {
//   width: 100%;
//   height: 430px;

//   background: #ffffff;

//   border: 1px solid #e5ebe7;
//   border-radius: 16px;

//   box-shadow:
//     0 2px 10px rgba(20, 70, 37, 0.04);

//   overflow: hidden;
// }


// /* =========================================================
//    HEADER
//    ========================================================= */

// .farmx-crop-card .farmx-card-header {
//   height: 62px;

//   padding: 13px 22px 8px;

//   display: flex;
//   align-items: center;

//   gap: 10px;
// }


// .farmx-crop-card .farmx-header-icon {
//   width: 30px;
//   height: 30px;

//   display: flex;
//   align-items: center;
//   justify-content: center;

//   color: #07943c;

//   background: transparent;
// }


// .farmx-crop-card .farmx-header-icon svg {
//   width: 27px;
//   height: 27px;

//   stroke-width: 2.3;
// }


// .farmx-crop-card .farmx-card-header h2 {
//   margin: 0;

//   color: #111923;

//   font-size: 21px;
//   line-height: 25px;

//   font-weight: 700;

//   letter-spacing: -0.25px;
// }


// /* =========================================================
//    BODY
//    ========================================================= */

// .farmx-crop-body {
//   padding: 0 20px 10px;
// }


// /* =========================================================
//    CROP SUMMARY
//    ========================================================= */

// .farmx-crop-summary {
//   width: 100%;

//   height: 108px;

//   display: grid;

//   grid-template-columns:
//     minmax(0, 2.2fr)
//     minmax(165px, 0.9fr);

//   gap: 18px;
// }


// /* =========================================================
//    ACTIVE CROP
//    ========================================================= */

// .farmx-active-crop {
//   height: 108px;

//   padding: 12px 14px;

//   display: flex;
//   align-items: center;

//   border: 1px solid #e5ebe7;

//   border-radius: 13px;

//   background: #ffffff;
// }


// .farmx-crop-icon {
//   width: 58px;
//   height: 58px;

//   flex-shrink: 0;

//   margin-right: 16px;

//   display: flex;
//   align-items: center;
//   justify-content: center;

//   border-radius: 13px;

//   background:
//     linear-gradient(
//       145deg,
//       #159b45,
//       #08752f
//     );

//   color: #ffffff;

//   box-shadow:
//     0 4px 10px rgba(8, 117, 47, 0.10);
// }


// .farmx-crop-icon svg {
//   width: 34px;
//   height: 34px;

//   stroke-width: 1.8;
// }


// /* =========================================================
//    LABEL
//    ========================================================= */

// .farmx-crop-card .farmx-label {
//   display: block;

//   margin: 0 0 2px;

//   color: #536059;

//   font-size: 14px;

//   line-height: 18px;

//   font-weight: 400;
// }


// /* =========================================================
//    CROP NAME
//    ========================================================= */

// .farmx-crop-card .farmx-crop-name {
//   display: block;

//   margin: 0;

//   color: #101820;

//   font-size: 25px;

//   line-height: 28px;

//   font-weight: 700;

//   letter-spacing: -0.4px;
// }


// /* =========================================================
//    CROP STAGE
//    ========================================================= */

// .farmx-crop-card .farmx-crop-stage {
//   display: block;

//   margin-top: 3px;

//   color: #08752f;

//   font-size: 15px;

//   line-height: 18px;

//   font-weight: 650;
// }


// /* =========================================================
//    DAYS PASSED
//    ========================================================= */

// .farmx-days {
//   height: 108px;

//   padding: 12px 17px;

//   display: flex;

//   flex-direction: column;

//   justify-content: center;

//   border: 1px solid #e5ebe7;

//   border-radius: 13px;

//   background: #ffffff;
// }


// .farmx-days .farmx-label {
//   margin-bottom: 3px;

//   font-size: 14px;
// }


// .farmx-days strong {
//   display: block;

//   color: #111923;

//   font-size: 27px;

//   line-height: 30px;

//   font-weight: 700;
// }


// .farmx-days strong small {
//   font-size: 15px;

//   line-height: 18px;

//   font-weight: 500;
// }


// .farmx-days-total {
//   display: block;

//   margin-top: 3px;

//   color: #5f6b64;

//   font-size: 13px;

//   line-height: 17px;
// }


// /* =========================================================
//    PROGRESS
//    ========================================================= */

// .farmx-progress {
//   margin-top: 15px;
// }


// .farmx-progress-heading {
//   height: 23px;

//   display: flex;
//   align-items: center;

//   gap: 7px;

//   color: #303b34;

//   font-size: 16px;

//   line-height: 21px;
// }


// .farmx-progress-heading strong {
//   color: #182019;

//   font-size: 16px;

//   font-weight: 650;
// }


// /* =========================================================
//    PROGRESS BAR
//    ========================================================= */

// .farmx-progress-track {
//   width: calc(100% - 55px);

//   height: 12px;

//   margin-top: 5px;

//   display: inline-block;

//   vertical-align: middle;

//   overflow: hidden;

//   border-radius: 20px;

//   background: #e9ecea;
// }


// .farmx-progress-fill {
//   height: 100%;

//   border-radius: 20px;

//   background:
//     linear-gradient(
//       90deg,
//       #08a83e,
//       #0b963b
//     );
// }


// .farmx-progress-percent {
//   width: 46px;

//   display: inline-block;

//   margin-left: 5px;

//   vertical-align: middle;

//   text-align: right;

//   color: #252e28;

//   font-size: 15px;

//   line-height: 18px;

//   font-weight: 650;
// }


// /* =========================================================
//    TIMELINE
//    ========================================================= */

// .farmx-timeline {
//   position: relative;

//   height: 76px;

//   margin:
//     3px 3px 0;

//   display: grid;

//   grid-template-columns:
//     repeat(4, 1fr);

//   align-items: start;
// }


// .farmx-timeline-line {
//   position: absolute;

//   top: 17px;

//   left: 10%;

//   right: 10%;

//   height: 2px;

//   background: #dfe4e1;

//   z-index: 0;
// }


// /* =========================================================
//    STAGES
//    ========================================================= */

// .farmx-stage {
//   position: relative;

//   z-index: 2;

//   display: flex;

//   flex-direction: column;

//   align-items: center;

//   min-width: 0;

//   color: #4c5750;

//   font-size: 14px;

//   line-height: 18px;

//   text-align: center;
// }


// .farmx-stage > span {
//   margin-top: 5px;

//   white-space: nowrap;
// }


// /* =========================================================
//    STAGE DOT
//    ========================================================= */

// .farmx-stage-dot {
//   width: 20px;
//   height: 20px;

//   flex-shrink: 0;

//   border:
//     2px solid #aeb6b1;

//   border-radius: 50%;

//   background: #ffffff;

//   position: relative;

//   z-index: 3;
// }


// /* =========================================================
//    COMPLETED
//    ========================================================= */

// .farmx-stage.completed .farmx-stage-dot {
//   background: #0a963d;

//   border-color: #0a963d;
// }


// .farmx-stage.completed .farmx-stage-dot::after {
//   content: "✓";

//   position: absolute;

//   left: 50%;
//   top: 50%;

//   transform:
//     translate(-50%, -50%);

//   color: #ffffff;

//   font-size: 11px;

//   line-height: 11px;

//   font-weight: 800;
// }


// /* =========================================================
//    SPROUT
//    ========================================================= */

// .farmx-stage-sprout {
//   width: 25px;
//   height: 25px;

//   display: flex;

//   align-items: center;
//   justify-content: center;

//   color: #07943c;

//   background: #ffffff;

//   position: relative;

//   z-index: 3;
// }


// .farmx-stage-sprout svg {
//   width: 25px;
//   height: 25px;

//   stroke-width: 2;
// }


// /* =========================================================
//    ACTIVE STAGE
//    ========================================================= */

// .farmx-stage.active {
//   color: #08752f;

//   font-weight: 650;
// }


// .farmx-stage.active .farmx-stage-dot {
//   width: 20px;
//   height: 20px;

//   background: #0b963d;

//   border-color: #0b963d;

//   box-shadow:
//     0 0 0 4px rgba(11, 150, 61, 0.07);
// }


// /* =========================================================
//    ADVICE
//    ========================================================= */

// .farmx-advice {
//   width: 100%;

//   min-height: 61px;

//   margin-top: 1px;

//   padding: 9px 12px;

//   display: flex;

//   align-items: flex-start;

//   gap: 9px;

//   border:
//     1px solid #dcebdd;

//   border-radius: 11px;

//   background: #f3faf4;
// }


// .farmx-advice-icon {
//   flex-shrink: 0;

//   margin-top: 1px;

//   color: #07933b;
// }


// .farmx-advice-icon svg {
//   width: 15px;
//   height: 15px;
// }


// .farmx-advice strong {
//   display: block;

//   margin: 0;

//   color: #08752f;

//   font-size: 15px;

//   line-height: 18px;

//   font-weight: 650;
// }


// .farmx-advice p {
//   margin: 1px 0 0;

//   color: #39473e;

//   font-size: 13px;

//   line-height: 18px;
// }


// /* =========================================================
//    RESET
//    ========================================================= */

// .farmx-reset-wrapper {
//   height: 27px;

//   display: flex;

//   align-items: flex-end;

//   justify-content: flex-end;
// }


// .farmx-reset {
//   display: inline-flex;

//   align-items: center;

//   gap: 6px;

//   padding: 2px 3px;

//   border: none;

//   background: transparent;

//   color: #e52b2b;

//   font-size: 13px;

//   line-height: 18px;

//   font-weight: 600;

//   cursor: pointer;
// }


// .farmx-reset:hover {
//   color: #c71919;
// }


// .farmx-reset svg {
//   width: 16px;
//   height: 16px;
// }































// .farmx-stage-sprout {
//   width: 31px;
//   height: 31px;

//   display: flex;

//   align-items: center;
//   justify-content: center;

//   color: #07943c;

//   position: relative;

//   z-index: 3;
// }

// .farmx-stage-sprout svg {
//   stroke-width: 2;
// }
//   .farmx-stage-sprout {
//   background: #ffffff;
//   padding: 0 3px;
// }

// /* =========================================================
//    FARM STATUS
//    ========================================================= */

// .farmx-status-body {

//   margin:
//     0 16px;

//   border:
//     1px solid #e5ebe7;

//   border-radius:
//     13px;

//   overflow:
//     hidden;

// }


// .farmx-status-row {

//   min-height:
//     50px;

//   display:
//     grid;

//   grid-template-columns:
//     1fr 1fr;

//   align-items:
//     center;

//   padding:
//     0 14px;

//   border-bottom:
//     1px solid #e7ebe9;

// }


// .farmx-status-row:last-child {

//   border-bottom:
//     none;

// }


// .farmx-status-label {

//   color:
//     #263229;

//   font-size:
//     12px;

// }


// .farmx-status-value {

//   display:
//     flex;

//   align-items:
//     center;

//   justify-content:
//     space-between;

//   gap:
//     10px;

//   color:
//     #111b15;

//   font-size:
//     12px;

// }


// .farmx-active-badge {

//   padding:
//     5px 10px;

//   border-radius:
//     18px;

//   background:
//     #eef8ee;

//   color:
//     #14732e;

//   font-size:
//     10px;

//   font-weight:
//     650;

// }


// .farmx-normal-badge {

//   padding:
//     5px 10px;

//   border-radius:
//     18px;

//   background:
//     #fff6e8;

//   color:
//     #e36b05;

//   font-size:
//     10px;

// }


// .farmx-safe {

//   color:
//     #078e3a;

// }


// .farmx-unsafe {

//   color:
//     #e03131;

// }


// /* =========================================================
//    QUICK ACCESS CONTAINER
//    ========================================================= */

// .farmx-quick-card {

//   grid-column:
//     1 / -1;

//   position:
//     relative;

//   min-height:
//     270px;

//   overflow:
//     hidden;

//   background:
//     linear-gradient(
//       180deg,
//       #ffffff 0%,
//       #fbfefb 100%
//     );

// }


// .farmx-quick-card::before {

//   content:
//     "";

//   position:
//     absolute;

//   width:
//     350px;

//   height:
//     350px;

//   right:
//     -160px;

//   top:
//     -190px;

//   border-radius:
//     50%;

//   background:
//     radial-gradient(
//       circle,
//       rgba(37,160,73,.10),
//       transparent 68%
//     );

// }


// .farmx-quick-header {

//   position:
//     relative;

//   z-index:
//     3;

//   height:
//     66px;

//   padding:
//     13px 20px;

//   display:
//     flex;

//   align-items:
//     center;

//   gap:
//     11px;

// }


// .farmx-quick-heading-icon {

//   width:
//     36px;

//   height:
//     36px;

//   display:
//     flex;

//   align-items:
//     center;

//   justify-content:
//     center;

//   border-radius:
//     10px;

//   color:
//     #ffffff;

//   background:
//     linear-gradient(
//       145deg,
//       #16a14c,
//       #08752f
//     );

//   box-shadow:
//     0 6px 14px
//     rgba(7,126,50,.18);

//   animation:
//     fxIconFloat
//     3.5s
//     ease-in-out
//     infinite;

// }


// .farmx-quick-heading-text {

//   flex:
//     1;

// }


// .farmx-quick-heading-text h2 {

//   margin:
//     0;

//   color:
//     #142019;

//   font-size:
//     17px;

//   line-height:
//     21px;

//   font-weight:
//     750;

// }


// .farmx-quick-heading-text p {

//   margin:
//     2px 0 0;

//   color:
//     #69766f;

//   font-size:
//     9px;

// }


// .farmx-quick-header-pill {

//   display:
//     inline-flex;

//   align-items:
//     center;

//   gap:
//     5px;

//   height:
//     27px;

//   padding:
//     0 9px;

//   border:
//     1px solid #e0ebe2;

//   border-radius:
//     20px;

//   color:
//     #08752f;

//   background:
//     #f4faf5;

//   font-size:
//     9px;

//   font-weight:
//     700;

// }


// .farmx-quick-header-pill
// span {

//   width:
//     6px;

//   height:
//     6px;

//   border-radius:
//     50%;

//   background:
//     #11a744;

//   animation:
//     fxPulse
//     2s
//     infinite;

// }


// /* =========================================================
//    QUICK ACCESS GRID
//    ========================================================= */

// .farmx-quick-grid {

//   position:
//     relative;

//   z-index:
//     2;

//   display:
//     grid;

//   grid-template-columns:
//     repeat(4,minmax(0,1fr));

//   gap:
//     15px;

//   padding:
//     0 15px 17px;

// }


// /* =========================================================
//    QUICK ACCESS CARD
//    ========================================================= */

// .farmx-quick-item {

//   --accent:
//     #078f3c;

//   --soft:
//     #eaf8ee;

//   --deep:
//     #076f30;

//   position:
//     relative;

//   min-height:
//     185px;

//   overflow:
//     hidden;

//   border:
//     1px solid
//     rgba(23,65,39,.10);

//   border-radius:
//     17px;

//   padding:
//     15px;

//   background:
//     linear-gradient(
//       145deg,
//       #ffffff 0%,
//       #fbfdfb 100%
//     );

//   box-shadow:
//     0 4px 14px
//     rgba(18,65,34,.035);

//   cursor:
//     pointer;

//   transition:
//     transform .35s cubic-bezier(.2,.8,.2,1),
//     box-shadow .35s ease,
//     border-color .35s ease;

// }


// .farmx-quick-item:hover {

//   transform:
//     translateY(-7px);

//   border-color:
//     color-mix(
//       in srgb,
//       var(--accent) 25%,
//       #ffffff
//     );

//   box-shadow:
//     0 18px 35px
//     rgba(18,65,34,.12);

// }


// /* =========================================================
//    CARD SHINE
//    ========================================================= */

// .farmx-quick-item::before {

//   content:
//     "";

//   position:
//     absolute;

//   top:
//     0;

//   left:
//     -130%;

//   width:
//     70%;

//   height:
//     100%;

//   transform:
//     skewX(-18deg);

//   background:
//     linear-gradient(
//       90deg,
//       transparent,
//       rgba(255,255,255,.65),
//       transparent
//     );

//   transition:
//     left .7s ease;

// }


// .farmx-quick-item:hover::before {

//   left:
//     150%;

// }


// /* =========================================================
//    CARD TOP COLOR LINE
//    ========================================================= */

// .farmx-quick-item::after {

//   content:
//     "";

//   position:
//     absolute;

//   left:
//     15px;

//   right:
//     15px;

//   top:
//     0;

//   height:
//     3px;

//   border-radius:
//     0 0 5px 5px;

//   background:
//     linear-gradient(
//       90deg,
//       var(--accent),
//       transparent
//     );

//   opacity:
//     .8;

// }


// /* =========================================================
//    COLOR THEMES
//    ========================================================= */

// .farmx-green {

//   --accent:
//     #07943d;

//   --soft:
//     #eaf8ee;

//   --deep:
//     #076e2f;

// }


// .farmx-blue {

//   --accent:
//     #0877d1;

//   --soft:
//     #eaf4ff;

//   --deep:
//     #075da5;

// }


// .farmx-red {

//   --accent:
//     #ed3438;

//   --soft:
//     #fff0f1;

//   --deep:
//     #b91f24;

// }


// .farmx-orange {

//   --accent:
//     #f18a0a;

//   --soft:
//     #fff5e8;

//   --deep:
//     #c76500;

// }


// /* =========================================================
//    NUMBER
//    ========================================================= */

// .farmx-quick-number {

//   position:
//     absolute;

//   right:
//     13px;

//   top:
//     11px;

//   color:
//     #cbd5ce;

//   font-size:
//     9px;

//   line-height:
//     12px;

//   font-weight:
//     750;

//   letter-spacing:
//     1px;

//   transition:
//     color .3s ease,
//     transform .3s ease;

// }


// .farmx-quick-item:hover
// .farmx-quick-number {

//   color:
//     var(--accent);

//   transform:
//     translateY(-2px);

// }


// /* =========================================================
//    ICON
//    ========================================================= */

// .farmx-quick-top {

//   position:
//     relative;

//   z-index:
//     4;

//   display:
//     flex;

//   align-items:
//     center;

//   gap:
//     11px;

// }


// .farmx-quick-icon {

//   position:
//     relative;

//   width:
//     50px;

//   height:
//     50px;

//   flex-shrink:
//     0;

//   display:
//     flex;

//   align-items:
//     center;

//   justify-content:
//     center;

//   border-radius:
//     15px;

//   color:
//     #ffffff;

//   background:
//     var(--accent);

//   box-shadow:
//     0 8px 17px
//     color-mix(
//       in srgb,
//       var(--accent) 24%,
//       transparent
//     );

//   transition:
//     transform .35s ease,
//     border-radius .35s ease;

// }


// .farmx-quick-icon::before {

//   content:
//     "";

//   position:
//     absolute;

//   inset:
//     -4px;

//   border:
//     1px solid
//     color-mix(
//       in srgb,
//       var(--accent) 25%,
//       transparent
//     );

//   border-radius:
//     18px;

//   opacity:
//     0;

//   transform:
//     scale(.7);

//   transition:
//     opacity .3s ease,
//     transform .3s ease;

// }


// .farmx-quick-item:hover
// .farmx-quick-icon {

//   transform:
//     rotate(-5deg)
//     scale(1.08);

//   border-radius:
//     17px;

// }


// .farmx-quick-item:hover
// .farmx-quick-icon::before {

//   opacity:
//     1;

//   transform:
//     scale(1);

// }


// .farmx-quick-icon svg {

//   position:
//     relative;

//   z-index:
//     2;

// }


// /* =========================================================
//    QUICK TITLE
//    ========================================================= */

// .farmx-quick-title {

//   margin:
//     0;

//   color:
//     #152019;

//   font-size:
//     14px;

//   line-height:
//     18px;

//   font-weight:
//     750;

// }


// .farmx-quick-label {

//   display:
//     block;

//   margin-bottom:
//     3px;

//   color:
//     var(--accent);

//   font-size:
//     8px;

//   font-weight:
//     750;

//   letter-spacing:
//     .5px;

//   text-transform:
//     uppercase;

// }


// /* =========================================================
//    DESCRIPTION
//    ========================================================= */

// .farmx-quick-description {

//   position:
//     relative;

//   z-index:
//     3;

//   width:
//     78%;

//   min-height:
//     51px;

//   margin:
//     12px 0 10px;

//   color:
//     #59655e;

//   font-size:
//     10px;

//   line-height:
//     15px;

// }


// /* =========================================================
//    BUTTON
//    ========================================================= */

// .farmx-quick-button {

//   position:
//     relative;

//   z-index:
//     5;

//   display:
//     inline-flex;

//   align-items:
//     center;

//   justify-content:
//     center;

//   gap:
//     6px;

//   height:
//     32px;

//   padding:
//     0 11px 0 13px;

//   border:
//     none;

//   border-radius:
//     9px;

//   color:
//     #ffffff;

//   background:
//     var(--accent);

//   font-size:
//     9px;

//   font-weight:
//     750;

//   cursor:
//     pointer;

//   box-shadow:
//     0 7px 15px
//     color-mix(
//       in srgb,
//       var(--accent) 20%,
//       transparent
//     );

//   transition:
//     transform .25s ease,
//     box-shadow .25s ease,
//     padding .25s ease;

// }


// .farmx-quick-button svg {

//   transition:
//     transform .25s ease;

// }


// .farmx-quick-button:hover {

//   transform:
//     translateY(-2px);

//   padding-right:
//     9px;

//   box-shadow:
//     0 10px 20px
//     color-mix(
//       in srgb,
//       var(--accent) 28%,
//       transparent
//     );

// }


// .farmx-quick-button:hover svg {

//   transform:
//     translateX(3px);

// }


// /* =========================================================
//    BACKGROUND DECORATION
//    ========================================================= */

// .farmx-decoration {

//   position:
//     absolute;

//   right:
//     -11px;

//   bottom:
//     -16px;

//   color:
//     var(--accent);

//   opacity:
//     .085;

//   transform:
//     rotate(-12deg)
//     scale(1.25);

//   transition:
//     opacity .35s ease,
//     transform .35s ease;

// }


// .farmx-quick-item:hover
// .farmx-decoration {

//   opacity:
//     .14;

//   transform:
//     rotate(-4deg)
//     scale(1.4)
//     translate(-5px,-5px);

// }


// /* =========================================================
//    MINI GLOW
//    ========================================================= */

// .farmx-quick-glow {

//   position:
//     absolute;

//   width:
//     90px;

//   height:
//     90px;

//   right:
//     -45px;

//   top:
//     -45px;

//   border-radius:
//     50%;

//   background:
//     var(--accent);

//   opacity:
//     .035;

//   transition:
//     transform .5s ease,
//     opacity .5s ease;

// }


// .farmx-quick-item:hover
// .farmx-quick-glow {

//   transform:
//     scale(2.5);

//   opacity:
//     .07;

// }


// /* =========================================================
//    WEATHER ERROR
//    ========================================================= */

// .farmx-weather-error {

//   width:
//     100%;

//   height:
//     155px;

//   display:
//     flex;

//   align-items:
//     center;

//   justify-content:
//     center;

//   gap:
//     10px;

//   color:
//     #69746e;

//   font-size:
//     13px;

// }


// .farmx-retry {

//   height:
//     32px;

//   padding:
//     0 12px;

//   border:
//     none;

//   border-radius:
//     7px;

//   background:
//     #eaf8ed;

//   color:
//     #08752f;

//   font-weight:
//     650;

//   cursor:
//     pointer;

// }


// /* =========================================================
//    CROP SETUP
//    ========================================================= */

// .farmx-crop-setup {

//   padding:
//     16px;

//   border:
//     1px solid #e6ece8;

//   border-radius:
//     12px;

//   background:
//     #fbfdfb;

// }


// .farmx-setup-grid {

//   display:
//     grid;

//   grid-template-columns:
//     1fr 1fr;

//   gap:
//     12px;

// }


// .farmx-form-group label {

//   display:
//     block;

//   margin-bottom:
//     6px;

//   color:
//     #34413a;

//   font-size:
//     11px;

//   font-weight:
//     650;

// }


// .farmx-form-group select,
// .farmx-form-group input {

//   width:
//     100%;

//   height:
//     39px;

//   padding:
//     0 10px;

//   border:
//     1px solid #dbe3de;

//   border-radius:
//     8px;

//   outline:
//     none;

//   background:
//     #ffffff;

//   color:
//     #18231c;

//   font-size:
//     12px;

// }


// .farmx-track {

//   width:
//     100%;

//   height:
//     38px;

//   margin-top:
//     13px;

//   border:
//     none;

//   border-radius:
//     8px;

//   background:
//     #078b39;

//   color:
//     #ffffff;

//   display:
//     flex;

//   align-items:
//     center;

//   justify-content:
//     center;

//   gap:
//     6px;

//   font-size:
//     11px;

//   font-weight:
//     700;

//   cursor:
//     pointer;

// }


// .farmx-track:disabled {

//   background:
//     #b9c5bd;

//   cursor:
//     not-allowed;

// }


// /* =========================================================
//    ANIMATIONS
//    ========================================================= */

// @keyframes fxSunGlow {

//   0%,
//   100% {

//     transform:
//       scale(1);

//     opacity:
//       .8;

//   }

//   50% {

//     transform:
//       scale(1.12);

//     opacity:
//       1;

//   }

// }


// @keyframes fxSunFloat {

//   0%,
//   100% {

//     transform:
//       translateY(0)
//       scale(1);

//   }

//   50% {

//     transform:
//       translateY(-5px)
//       scale(1.05);

//   }

// }


// @keyframes fxSkyFloat {

//   0%,
//   100% {

//     transform:
//       translate(0,0);

//   }

//   50% {

//     transform:
//       translate(-12px,7px);

//   }

// }


// @keyframes fxCloudMove {

//   0% {

//     transform:
//       translateX(0);

//   }

//   50% {

//     transform:
//       translateX(15px);

//   }

//   100% {

//     transform:
//       translateX(0);

//   }

// }


// @keyframes fxPlantWave {

//   0%,
//   100% {

//     transform:
//       rotate(0deg)
//       translateY(0);

//   }

//   50% {

//     transform:
//       rotate(8deg)
//       translateY(-3px);

//   }

// }


// @keyframes fxTextShine {

//   0% {

//     background-position:
//       0% center;

//   }

//   100% {

//     background-position:
//       200% center;

//   }

// }


// @keyframes fxPulse {

//   0% {

//     box-shadow:
//       0 0 0 0
//       rgba(17,167,68,.28);

//   }

//   70% {

//     box-shadow:
//       0 0 0 7px
//       rgba(17,167,68,0);

//   }

//   100% {

//     box-shadow:
//       0 0 0 0
//       rgba(17,167,68,0);

//   }

// }


// @keyframes fxSparkle {

//   0%,
//   100% {

//     transform:
//       rotate(0deg)
//       scale(1);

//   }

//   50% {

//     transform:
//       rotate(15deg)
//       scale(1.15);

//   }

// }


// @keyframes fxIconFloat {

//   0%,
//   100% {

//     transform:
//       translateY(0);

//   }

//   50% {

//     transform:
//       translateY(-3px);

//   }

// }


// @keyframes fxLeafFloat {

//   0%,
//   100% {

//     transform:
//       translateY(0)
//       rotate(-20deg);

//   }

//   50% {

//     transform:
//       translateY(-10px)
//       rotate(-5deg);

//   }

// }


// @keyframes fxParticleFloat {

//   0%,
//   100% {

//     transform:
//       translate(0,0);

//     opacity:
//       .25;

//   }

//   50% {

//     transform:
//       translate(9px,-12px);

//     opacity:
//       .75;

//   }

// }


// @keyframes fxTractorMove {

//   0%,
//   100% {

//     transform:
//       translateX(0);

//   }

//   50% {

//     transform:
//       translateX(-5px);

//   }

// }


// /* =========================================================
//    RESPONSIVE
//    ========================================================= */

// @media (max-width: 1200px) {

//   .farmx-dashboard {

//     padding-left:
//       25px;

//     padding-right:
//       25px;

//   }


//   .farmx-weather-card {

//     width:
//       68%;

//   }


//   .farmx-weather-content {

//     grid-template-columns:
//       205px
//       1fr
//       1fr
//       1fr;

//   }


//   .farmx-welcome-content {

//     width:
//       60%;

//   }


//   .farmx-quick-description {

//     width:
//       82%;

//   }

// }


// @media (max-width: 1050px) {

//   .farmx-quick-grid {

//     grid-template-columns:
//       repeat(2,1fr);

//   }


//   .farmx-quick-card {

//     min-height:
//       450px;

//   }


//   .farmx-quick-item {

//     min-height:
//       185px;

//   }

// }


// @media (max-width: 1000px) {

//   .farmx-main-grid {

//     grid-template-columns:
//       1fr;

//   }


//   .farmx-quick-card {

//     grid-column:
//       auto;

//   }


//   .farmx-weather-card {

//     width:
//       100%;

//   }


//   .farmx-weather-outer {

//     height:
//       155px;

//   }


//   .farmx-crop-card,
//   .farmx-status-card {

//     height:
//       auto;

//     min-height:
//       390px;

//   }


//   .farmx-welcome-content {

//     width:
//       65%;

//   }

// }


// @media (max-width: 750px) {

//   .farmx-dashboard {

//     padding:
//       18px 14px 25px;

//   }


//   .farmx-welcome {

//     min-height:
//       205px;

//   }


//   .farmx-welcome-content {

//     width:
//       100%;

//     padding:
//       22px 20px;

//   }


//   .farmx-welcome-title {

//     font-size:
//       24px;

//     line-height:
//       30px;

//   }


//   .farmx-welcome-subtitle {

//     max-width:
//       80%;

//   }


//   .farmx-welcome-stats {

//     flex-wrap:
//       wrap;

//   }


//   .farmx-landscape {

//     width:
//       76%;

//     opacity:
//       .43;

//   }


//   .farmx-weather-card {

//     height:
//       auto;

//     min-height:
//       155px;

//   }


//   .farmx-weather-content {

//     grid-template-columns:
//       1fr 1fr;

//     height:
//       auto;

//     padding-top:
//       8px;

//   }


//   .farmx-weather-main {

//     grid-column:
//       1 / -1;

//     margin-bottom:
//       8px;

//   }


//   .farmx-weather-stat {

//     border-left:
//       none;

//     padding-left:
//       0;

//     border-top:
//       1px solid
//       rgba(255,255,255,.25);

//     padding-top:
//       8px;

//   }


//   .farmx-crop-summary {

//     height:
//       auto;

//     grid-template-columns:
//       1fr;

//   }


//   .farmx-quick-card {

//     min-height:
//       auto;

//   }


//   .farmx-quick-grid {

//     grid-template-columns:
//       1fr 1fr;

//   }

// }


// @media (max-width: 560px) {

//   .farmx-welcome {

//     min-height:
//       235px;

//   }


//   .farmx-welcome-content {

//     padding:
//       20px 17px;

//   }


//   .farmx-welcome-title {

//     font-size:
//       21px;

//     line-height:
//       28px;

//   }


//   .farmx-welcome-subtitle {

//     max-width:
//       100%;

//     font-size:
//       12px;

//   }


//   .farmx-welcome-stat {

//     font-size:
//       8px;

//   }


//   .farmx-landscape {

//     width:
//       100%;

//     opacity:
//       .30;

//   }


//   .farmx-quick-grid {

//     grid-template-columns:
//       1fr;

//   }


//   .farmx-quick-card {

//     min-height:
//       auto;

//   }


//   .farmx-quick-item {

//     min-height:
//       175px;

//   }


//   .farmx-quick-description {

//     width:
//       75%;

//   }


//   .farmx-quick-header-pill {

//     display:
//       none;

//   }

// }


// @media (max-width: 400px) {

//   .farmx-dashboard {

//     padding:
//       14px 10px 22px;

//   }


//   .farmx-welcome {

//     min-height:
//       230px;

//   }


//   .farmx-welcome-title {

//     font-size:
//       19px;

//   }


//   .farmx-welcome-stats {

//     gap:
//       5px;

//   }


//   .farmx-welcome-stat {

//     padding:
//       4px 7px;

//   }


//   .farmx-quick-icon {

//     width:
//       46px;

//     height:
//       46px;

//   }


//   .farmx-quick-title {

//     font-size:
//       13px;

//   }

// }


// /* =========================================================
//    REDUCED MOTION
//    ========================================================= */

// @media (
//   prefers-reduced-motion: reduce
// ) {

//   .farmx-dashboard *,
//   .farmx-dashboard
//   *::before,
//   .farmx-dashboard
//   *::after {

//     animation-duration:
//       .01ms !important;

//     animation-iteration-count:
//       1 !important;

//     transition-duration:
//       .01ms !important;

//   }

// }


// /* =========================================================
//    FINAL REFERENCE MATCH
//    CROP TRACKER + FARM STATUS
//    ========================================================= */


// /* =========================================================
//    MAIN TWO-COLUMN LAYOUT
//    ========================================================= */

// .farmx-main-grid {
//   display: grid;

//   grid-template-columns:
//     minmax(0, 0.935fr)
//     minmax(0, 1fr);

//   column-gap: 24px;

//   row-gap: 17px;

//   width: 100%;
// }


// /* =========================================================
//    COMMON CARD
//    ========================================================= */

// .farmx-main-grid > .farmx-card {
//   min-width: 0;

//   border:
//     1px solid #e5ebe7;

//   border-radius:
//     18px;

//   background:
//     #ffffff;

//   box-shadow:
//     0 3px 14px rgba(18, 65, 34, 0.045);

//   overflow: hidden;
// }


// /* =========================================================
//    CROP TRACKER
//    ========================================================= */

// .farmx-crop-card {
//   width: 100%;

//   height: 423px;

//   border:
//     1px solid #e5ebe7;

//   border-radius:
//     18px;

//   background:
//     #ffffff;

//   box-shadow:
//     0 3px 14px rgba(18, 65, 34, 0.045);

//   overflow: hidden;
// }


// /* =========================================================
//    CROP HEADER
//    ========================================================= */

// .farmx-crop-card .farmx-card-header {

//   height: 64px;

//   padding:
//     13px 18px 8px;

//   display: flex;

//   align-items: center;

//   gap: 9px;
// }


// .farmx-crop-card .farmx-header-icon {

//   width: 28px;

//   height: 28px;

//   display: flex;

//   align-items: center;

//   justify-content: center;

//   color:
//     #07943c;

//   background:
//     transparent;
// }


// .farmx-crop-card .farmx-header-icon svg {

//   width: 25px;

//   height: 25px;

//   stroke-width:
//     2.35;
// }


// .farmx-crop-card .farmx-card-header h2 {

//   margin: 0;

//   color:
//     #111923;

//   font-size:
//     17px;

//   line-height:
//     21px;

//   font-weight:
//     700;

//   letter-spacing:
//     -0.2px;
// }


// /* =========================================================
//    CROP BODY
//    ========================================================= */

// .farmx-crop-body {

//   padding:
//     0 17px 8px;
// }


// /* =========================================================
//    ACTIVE CROP + DAYS
//    ========================================================= */

// .farmx-crop-summary {

//   width: 100%;

//   height: 108px;

//   display: grid;

//   grid-template-columns:
//     minmax(0, 2.2fr)
//     minmax(150px, 0.9fr);

//   gap:
//     17px;
// }


// /* =========================================================
//    ACTIVE CROP BOX
//    ========================================================= */

// .farmx-active-crop {

//   height: 108px;

//   padding:
//     12px 12px;

//   display: flex;

//   align-items: center;

//   border:
//     1px solid #e5ebe7;

//   border-radius:
//     13px;

//   background:
//     #ffffff;
// }


// .farmx-crop-icon {

//   width:
//     60px;

//   height:
//     60px;

//   flex-shrink:
//     0;

//   margin-right:
//     14px;

//   display:
//     flex;

//   align-items:
//     center;

//   justify-content:
//     center;

//   border-radius:
//     13px;

//   background:
//     linear-gradient(
//       145deg,
//       #159b45,
//       #08752f
//     );

//   color:
//     #ffffff;

//   box-shadow:
//     0 4px 10px
//     rgba(8,117,47,.10);
// }


// .farmx-crop-icon svg {

//   width:
//     35px;

//   height:
//     35px;

//   stroke-width:
//     1.8;
// }


// /* =========================================================
//    ACTIVE CROP TEXT
//    ========================================================= */

// .farmx-crop-card .farmx-label {

//   display:
//     block;

//   margin:
//     0 0 2px;

//   color:
//     #4f5b54;

//   font-size:
//     14px;

//   line-height:
//     17px;

//   font-weight:
//     400;
// }


// .farmx-crop-card .farmx-crop-name {

//   display:
//     block;

//   margin:
//     0;

//   color:
//     #111923;

//   font-size:
//     18px;

//   line-height:
//     27px;

//   font-weight:
//     700;

//   letter-spacing:
//     -0.4px;
// }


// .farmx-crop-card .farmx-crop-stage {

//   display:
//     block;

//   margin-top:
//     3px;

//   color:
//     #08752f;

//   font-size:
//     14px;

//   line-height:
//     17px;

//   font-weight:
//     650;
// }


// /* =========================================================
//    DAYS PASSED
//    ========================================================= */

// .farmx-days {

//   height:
//     108px;

//   padding:
//     12px 15px;

//   display:
//     flex;

//   flex-direction:
//     column;

//   justify-content:
//     center;

//   border:
//     1px solid #e5ebe7;

//   border-radius:
//     13px;

//   background:
//     #ffffff;

//   text-align:
//     center;
// }


// .farmx-days .farmx-label {

//   margin:
//     0 0 3px;

//   font-size:
//     13px;

//   line-height:
//     17px;
// }


// .farmx-days strong {

//   display:
//     block;

//   color:
//     #111923;

//   font-size:
//     20px;

//   line-height:
//     29px;

//   font-weight:
//     700;
// }


// .farmx-days strong small {

//   font-size:
//     14px;

//   line-height:
//     17px;

//   font-weight:
//     500;
// }


// .farmx-days-total {

//   display:
//     block;

//   margin-top:
//     3px;

//   color:
//     #5f6b64;

//   font-size:
//     12px;

//   line-height:
//     16px;
// }


// /* =========================================================
//    CROP PROGRESS
//    ========================================================= */

// .farmx-progress {

//   margin-top:
//     14px;
// }


// .farmx-progress-heading {

//   height:
//     21px;

//   display:
//     flex;

//   align-items:
//     center;

//   gap:
//     7px;

//   color:
//     #303b34;

//   font-size:
//     14px;

//   line-height:
//     19px;
// }


// .farmx-progress-heading strong {

//   color:
//     #182019;

//   font-size:
//     14px;

//   line-height:
//     19px;

//   font-weight:
//     650;
// }


// /* =========================================================
//    PROGRESS BAR
//    ========================================================= */

// .farmx-progress-track {

//   width:
//     calc(100% - 48px);

//   height:
//     12px;

//   margin-top:
//     4px;

//   display:
//     inline-block;

//   vertical-align:
//     middle;

//   overflow:
//     hidden;

//   border-radius:
//     20px;

//   background:
//     #e9ecea;
// }


// .farmx-progress-fill {

//   height:
//     100%;

//   border-radius:
//     20px;

//   background:
//     #079b3c;
// }


// .farmx-progress-percent {

//   width:
//     40px;

//   display:
//     inline-block;

//   margin-left:
//     4px;

//   vertical-align:
//     middle;

//   text-align:
//     right;

//   color:
//     #252e28;

//   font-size:
//     14px;

//   line-height:
//     17px;

//   font-weight:
//     650;
// }


// /* =========================================================
//    CROP TIMELINE
//    ========================================================= */

// .farmx-timeline {

//   position:
//     relative;

//   height:
//     75px;

//   margin:
//     3px 2px 0;

//   display:
//     grid;

//   grid-template-columns:
//     repeat(4, 1fr);

//   align-items:
//     start;
// }


// .farmx-timeline-line {

//   position:
//     absolute;

//   top:
//     16px;

//   left:
//     10%;

//   right:
//     10%;

//   height:
//     2px;

//   background:
//     #dfe4e1;

//   z-index:
//     0;
// }


// .farmx-stage {

//   position:
//     relative;

//   z-index:
//     2;

//   display:
//     flex;

//   flex-direction:
//     column;

//   align-items:
//     center;

//   min-width:
//     0;

//   color:
//     #4c5750;

//   font-size:
//     13px;

//   line-height:
//     17px;

//   text-align:
//     center;
// }


// .farmx-stage > span {

//   margin-top:
//     4px;

//   white-space:
//     nowrap;
// }


// /* =========================================================
//    SPROUT
//    ========================================================= */

// .farmx-stage-sprout {

//   width:
//     25px;

//   height:
//     25px;

//   display:
//     flex;

//   align-items:
//     center;

//   justify-content:
//     center;

//   color:
//     #07943c;

//   background:
//     #ffffff;

//   position:
//     relative;

//   z-index:
//     3;

//   padding:
//     0 2px;
// }


// .farmx-stage-sprout svg {

//   width:
//     24px;

//   height:
//     24px;

//   stroke-width:
//     2;
// }


// /* =========================================================
//    STAGE DOT
//    ========================================================= */

// .farmx-stage-dot {

//   width:
//     20px;

//   height:
//     20px;

//   flex-shrink:
//     0;

//   border:
//     2px solid #aeb6b1;

//   border-radius:
//     50%;

//   background:
//     #ffffff;

//   position:
//     relative;

//   z-index:
//     3;
// }


// /* COMPLETED */

// .farmx-stage.completed .farmx-stage-dot {

//   background:
//     #07943c;

//   border-color:
//     #07943c;
// }


// .farmx-stage.completed .farmx-stage-dot::after {

//   content:
//     "✓";

//   position:
//     absolute;

//   left:
//     50%;

//   top:
//     50%;

//   transform:
//     translate(-50%, -50%);

//   color:
//     #ffffff;

//   font-size:
//     10px;

//   line-height:
//     10px;

//   font-weight:
//     800;
// }


// /* ACTIVE */

// .farmx-stage.active {

//   color:
//     #08752f;

//   font-weight:
//     650;
// }


// .farmx-stage.active .farmx-stage-dot {

//   background:
//     #07943c;

//   border-color:
//     #07943c;

//   box-shadow:
//     none;
// }


// /* =========================================================
//    ADVICE
//    ========================================================= */

// .farmx-advice {

//   width:
//     100%;

//   height:
//     54px;

//   min-height:
//     54px;

//   margin-top:
//     0;

//   padding:
//     8px 11px;

//   display:
//     flex;

//   align-items:
//     flex-start;

//   gap:
//     8px;

//   border:
//     1px solid #dcebdd;

//   border-radius:
//     10px;

//   background:
//     #f3faf4;
// }


// .farmx-advice-icon {

//   flex-shrink:
//     0;

//   margin-top:
//     1px;

//   color:
//     #07933b;
// }


// .farmx-advice-icon svg {

//   width:
//     16px;

//   height:
//     16px;
// }


// .farmx-advice strong {

//   display:
//     block;

//   margin:
//     0;

//   color:
//     #08752f;

//   font-size:
//     13px;

//   line-height:
//     17px;

//   font-weight:
//     650;
// }


// .farmx-advice p {

//   margin:
//     0;

//   color:
//     #39473e;

//   font-size:
//     11px;

//   line-height:
//     16px;
// }


// /* =========================================================
//    RESET TRACKER
//    ========================================================= */

// .farmx-reset-wrapper {

//   height:
//     25px;

//   display:
//     flex;

//   align-items:
//     flex-end;

//   justify-content:
//     flex-end;
// }


// .farmx-reset {

//   display:
//     inline-flex;

//   align-items:
//     center;

//   gap:
//     5px;

//   padding:
//     1px 2px;

//   border:
//     none;

//   background:
//     transparent;

//   color:
//     #e52b2b;

//   font-size:
//     11px;

//   line-height:
//     16px;

//   font-weight:
//     600;

//   cursor:
//     pointer;
// }


// .farmx-reset svg {

//   width:
//     14px;

//   height:
//     14px;
// }


// /* =========================================================
//    FARM STATUS
//    ========================================================= */

// .farmx-status-card {

//   width:
//     100%;

//   height:
//     423px;

//   border:
//     1px solid #e5ebe7;

//   border-radius:
//     18px;

//   background:
//     #ffffff;

//   overflow:
//     hidden;
// }


// /* =========================================================
//    FARM STATUS HEADER
//    ========================================================= */

// .farmx-status-card .farmx-card-header {

//   height:
//     64px;

//   padding:
//     13px 18px 8px;

//   display:
//     flex;

//   align-items:
//     center;

//   gap:
//     9px;
// }


// .farmx-status-card .farmx-header-icon {

//   width:
//     29px;

//   height:
//     29px;

//   display:
//     flex;

//   align-items:
//     center;

//   justify-content:
//     center;

//   color:
//     #ffffff;

//   background:
//     #087d3a;

//   border-radius:
//     9px;
// }


// .farmx-status-card .farmx-header-icon svg {

//   width:
//     18px;

//   height:
//     18px;
// }


// .farmx-status-card .farmx-card-header h2 {

//   margin:
//     0;

//   color:
//     #111923;

//   font-size:
//     17px;

//   line-height:
//     21px;

//   font-weight:
//     700;

//   letter-spacing:
//     -0.2px;
// }


// /* =========================================================
//    STATUS TABLE
//    ========================================================= */

// .farmx-status-body {

//   margin:
//     0 17px;

//   border:
//     1px solid #e5ebe7;

//   border-radius:
//     13px;

//   overflow:
//     hidden;

//   background:
//     #ffffff;
// }


// .farmx-status-row {

//   height:
//     53px;

//   min-height:
//     53px;

//   display:
//     grid;

//   grid-template-columns:
//     1fr 1fr;

//   align-items:
//     center;

//   padding:
//     0 15px;

//   border-bottom:
//     1px solid #e7ebe9;
// }


// .farmx-status-row:last-child {

//   border-bottom:
//     none;
// }


// /* =========================================================
//    STATUS LABEL
//    ========================================================= */

// .farmx-status-label {

//   color:
//     #263229;

//   font-size:
//     13px;

//   line-height:
//     18px;

//   font-weight:
//     400;
// }


// /* =========================================================
//    STATUS VALUE
//    ========================================================= */

// .farmx-status-value {

//   display:
//     flex;

//   align-items:
//     center;

//   justify-content:
//     space-between;

//   gap:
//     10px;

//   color:
//     #111b15;

//   font-size:
//     13px;

//   line-height:
//     18px;

//   font-weight:
//     600;
// }


// .farmx-status-value strong {

//   font-size:
//     13px;

//   line-height:
//     18px;

//   font-weight:
//     650;
// }


// /* =========================================================
//    ACTIVE BADGE
//    ========================================================= */

// .farmx-active-badge {

//   padding:
//     5px 10px;

//   border:
//     1px solid #dcefdc;

//   border-radius:
//     18px;

//   background:
//     #eff9ef;

//   color:
//     #14732e;

//   font-size:
//     10px;

//   line-height:
//     14px;

//   font-weight:
//     650;

//   white-space:
//     nowrap;
// }


// /* =========================================================
//    NORMAL BADGE
//    ========================================================= */

// .farmx-normal-badge {

//   padding:
//     5px 10px;

//   border:
//     1px solid #f8e1bf;

//   border-radius:
//     18px;

//   background:
//     #fff7eb;

//   color:
//     #e36b05;

//   font-size:
//     10px;

//   line-height:
//     14px;

//   font-weight:
//     600;

//   white-space:
//     nowrap;
// }


// /* =========================================================
//    SAFE / UNSAFE
//    ========================================================= */

// .farmx-safe {

//   color:
//     #078e3a;
// }


// .farmx-unsafe {

//   color:
//     #e03131;
// }


// /* =========================================================
//    STATUS ICONS
//    ========================================================= */

// .farmx-status-value > svg {

//   flex-shrink:
//     0;

//   width:
//     20px;

//   height:
//     20px;
// }


// /* =========================================================
//    RESPONSIVE
//    ========================================================= */

// @media (max-width: 1100px) {

//   .farmx-main-grid {

//     grid-template-columns:
//       1fr;

//   }

//   .farmx-crop-card,
//   .farmx-status-card {

//     height:
//       auto;

//     min-height:
//       423px;
//   }
// }


// @media (max-width: 700px) {

//   .farmx-crop-summary {

//     grid-template-columns:
//       1fr;

//     height:
//       auto;

//   }

//   .farmx-active-crop,
//   .farmx-days {

//     height:
//       100px;

//   }

//   .farmx-status-row {

//     grid-template-columns:
//       .9fr 1.1fr;

//   }

// }

//       `}</style>


//       {/* =====================================================
//           DASHBOARD
//           ===================================================== */}

//       <main
//         className="farmx-dashboard"
//       >


//        {/* =========================================================
//     WELCOME BANNER
//    ========================================================= */}

// <motion.section
//   className="farmx-welcome"
//   initial={{
//     opacity: 0,
//     y: 10,
//   }}
//   animate={{
//     opacity: 1,
//     y: 0,
//   }}
//   transition={{
//     duration: 0.55,
//     ease: [0.22, 1, 0.36, 1],
//   }}
// >
//   {/* FARM LANDSCAPE IMAGE */}
//   <img
//     src={FarmDashboardBanner}
//     alt="Farm landscape"
//     className="farmx-welcome-image"
//   />

//   {/* SOFT OVERLAY */}
//   <div className="farmx-welcome-overlay" />

//   {/* CONTENT */}
//   <div className="farmx-welcome-content">
//     <motion.h1
//       className="farmx-welcome-title"
//       initial={{
//         opacity: 0,
//         x: -10,
//       }}
//       animate={{
//         opacity: 1,
//         x: 0,
//       }}
//       transition={{
//         delay: 0.12,
//         duration: 0.45,
//       }}
//     >
//       {getGreeting()},{" "}
//       <span className="name">
//         {farmerName}!
//       </span>

//       <span className="plant">
//         🌱
//       </span>
//     </motion.h1>

//     <motion.p
//       className="farmx-welcome-subtitle"
//       initial={{
//         opacity: 0,
//         x: -8,
//       }}
//       animate={{
//         opacity: 1,
//         x: 0,
//       }}
//       transition={{
//         delay: 0.2,
//         duration: 0.45,
//       }}
//     >
//       Here's what's happening on your farm today.
//     </motion.p>
//   </div>
// </motion.section>


//         {/* ===================================================
//             WEATHER
//             =================================================== */}

//         <motion.section

//           className="
//             farmx-weather-outer
//           "

//           id="weather-card"

//           data-tour="weather"

//           initial={{
//             opacity: 0,
//             y: 12,
//           }}

//           animate={{
//             opacity: 1,
//             y: 0,
//           }}

//           transition={{
//             duration: .45,
//             delay: .12,
//           }}

//         >

//           {weatherLoading ? (

//             <div
//               className="
//                 farmx-weather-card
//               "
//             >

//               <div
//                 className="
//                   farmx-weather-heading
//                 "
//               >

//                 <h2>
//                   Weather Today
//                 </h2>

//                 <span
//                   className="
//                     farmx-live
//                   "
//                 >

//                   <span
//                     className="
//                       farmx-live-dot
//                     "
//                   />

//                   Live

//                 </span>

//               </div>


//               <div
//                 className="
//                   farmx-weather-content
//                 "
//               >

//                 <div
//                   className="
//                     farmx-weather-main
//                   "
//                 >

//                   <div
//                     className="
//                       farmx-weather-icon
//                   "
//                   >

//                     <Cloud
//                       size={50}
//                     />

//                   </div>


//                   <div>

//                     <div
//                       className="
//                         farmx-temp
//                     "
//                     >
//                       --°C
//                     </div>

//                     <div
//                       className="
//                         farmx-condition
//                     "
//                     >
//                       Loading...
//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           ) : weatherError ? (

//             <div
//               className="
//                 farmx-weather-error
//               "
//             >

//               <AlertCircle
//                 size={19}
//               />

//               <span>
//                 Unable to load weather.
//               </span>

//               <button
//                 className="
//                   farmx-retry
//                 "

//                 onClick={
//                   retryWeather
//                 }
//               >

//                 Retry

//               </button>

//             </div>

//           ) : (

//             <div
//               className="
//                 farmx-weather-card
//               "
//             >

//               <div
//                 className="
//                   farmx-weather-heading
//                 "
//               >

//                 <h2>
//                   Weather Today
//                 </h2>

//                 <span
//                   className="
//                     farmx-live
//                   "
//                 >

//                   <span
//                     className="
//                       farmx-live-dot
//                   "
//                   />

//                   Live

//                 </span>

//               </div>


//               <div
//                 className="
//                   farmx-weather-content
//                 "
//               >

//                 <div
//                   className="
//                     farmx-weather-main
//                   "
//                 >

//                   <div
//                     className="
//                       farmx-weather-icon
//                   "
//                   >

//                     <WeatherIcon
//                       code={
//                         weather?.code
//                       }

//                       size={61}
//                     />

//                   </div>


//                   <div>

//                     <div
//                       className="
//                         farmx-temp
//                     "
//                     >

//                       {
//                         weather?.temp ??
//                         "--"
//                       }°C

//                     </div>


//                     <div
//                       className="
//                         farmx-condition
//                     "
//                     >

//                       {
//                         weather?.condition
//                       }

//                     </div>

//                   </div>

//                 </div>


//                 <div
//                   className="
//                     farmx-weather-stat
//                   "
//                 >

//                   <div
//                     className="
//                       farmx-weather-stat-label
//                   "
//                   >

//                     <Droplets
//                       size={17}
//                     />

//                     Humidity

//                   </div>

//                   <div
//                     className="
//                       farmx-weather-stat-value
//                   "
//                   >

//                     {
//                       weather?.humidity ??
//                       "--"
//                     }%

//                   </div>

//                 </div>


//                 <div
//                   className="
//                     farmx-weather-stat
//                   "
//                 >

//                   <div
//                     className="
//                       farmx-weather-stat-label
//                   "
//                   >

//                     <Wind
//                       size={17}
//                     />

//                     Wind

//                   </div>

//                   <div
//                     className="
//                       farmx-weather-stat-value
//                   "
//                   >

//                     {
//                       weather?.wind ??
//                       "--"
//                     } km/h

//                   </div>

//                 </div>


//                 <div
//                   className="
//                     farmx-weather-stat
//                   "
//                 >

//                   <div
//                     className="
//                       farmx-weather-stat-label
//                   "
//                   >

//                     <CloudRain
//                       size={17}
//                     />

//                     Rain Chance

//                   </div>

//                   <div
//                     className="
//                       farmx-weather-stat-value
//                   "
//                   >

//                     {
//                       weather?.rain_prob ??
//                       0
//                     }%

//                   </div>

//                 </div>

//               </div>

//             </div>

//           )}

//         </motion.section>


//         {/* ===================================================
//             MAIN CONTENT
//             =================================================== */}

//         <section
//           className="
//             farmx-main-grid
//           "
//         >


//           {/* =================================================
//               CROP TRACKER
//               ================================================= */}

//           <motion.section

//             className="
//               farmx-card
//               farmx-crop-card
//             "

//             id="crop-tracker"

//             data-tour="crop-tracker"

//             initial={{
//               opacity: 0,
//               y: 15,
//             }}

//             animate={{
//               opacity: 1,
//               y: 0,
//             }}

//             transition={{
//               duration: .45,
//               delay: .18,
//             }}

//           >

//             <div
//               className="
//                 farmx-card-header
//               "
//             >

//               <div
//                 className="
//                   farmx-header-icon
//                 "
//               >

//                 <CalendarDays
//                   size={18}
//                 />

//               </div>

//               <h2>
//                 Crop Tracker
//               </h2>

//             </div>


//             <div
//               className="
//                 farmx-crop-body
//               "
//             >

//               {!sowingDate ? (

//                 <div
//                   className="
//                     farmx-crop-setup
//                   "
//                 >

//                   <div
//                     className="
//                       farmx-setup-grid
//                   "
//                   >

//                     <div
//                       className="
//                         farmx-form-group
//                     "
//                     >

//                       <label>
//                         Select Crop
//                       </label>

//                       <select
//                         value={
//                           selectedCrop
//                         }

//                         onChange={(e) =>
//                           setSelectedCrop(
//                             e.target.value
//                           )
//                         }
//                       >

//                         {crops.map(
//                           (crop) => (

//                             <option
//                               key={crop}
//                               value={crop}
//                             >

//                               {
//                                 getCropName(
//                                   crop
//                                 )
//                               }

//                             </option>

//                           )
//                         )}

//                       </select>

//                     </div>


//                     <div
//                       className="
//                         farmx-form-group
//                     "
//                     >

//                       <label>
//                         Enter Sowing Date
//                       </label>

//                       <input
//                         type="date"

//                         value={
//                           tempDate
//                         }

//                         max={
//                           new Date()
//                             .toISOString()
//                             .split("T")[0]
//                         }

//                         onChange={(e) =>
//                           setTempDate(
//                             e.target.value
//                           )
//                         }

//                       />

//                     </div>

//                   </div>


//                   <button
//                     className="
//                       farmx-track
//                     "

//                     disabled={
//                       !tempDate
//                     }

//                     onClick={() => {

//                       if (
//                         !tempDate
//                       ) {
//                         return;
//                       }

//                       setSowingDate(
//                         tempDate
//                       );

//                       saveGrowth(
//                         tempDate,
//                         selectedCrop
//                       );

//                       setTempDate("");

//                     }}

//                   >

//                     <Sprout
//                       size={15}
//                     />

//                     Track Growth

//                   </button>

//                 </div>

//               ) : (

//                 <>

//                   <div
//                     className="
//                       farmx-crop-summary
//                     "
//                   >

//                     <div
//                       className="
//                         farmx-active-crop
//                     "
//                     >

//                       <div
//                         className="
//                           farmx-crop-icon
//                       "
//                       >

//                         <Leaf
//                           size={31}
//                         />

//                       </div>


//                       <div>

//                         <span
//                           className="
//                             farmx-label
//                         "
//                         >
//                           Active Crop
//                         </span>


//                         <strong
//                           className="
//                             farmx-crop-name
//                         "
//                         >

//                           {
//                             getCropName(
//                               selectedCrop
//                             )
//                           }

//                         </strong>


                   
//                       </div>

//                     </div>


//                     <div
//                       className="
//                         farmx-days
//                     "
//                     >

//                       <span
//                         className="
//                           farmx-label
//                       "
//                       >
//                         Days Passed
//                       </span>


//                       <strong>

//                         {
//                           cropStage?.days ||
//                           0
//                         }

//                         <small>
//                           {" "}days
//                         </small>

//                       </strong>


//                       <span
//                         className="
//                           farmx-days-total
//                       "
//                       >

//                         ~
//                         {
//                           cropStage?.totalDays ||
//                           120
//                         }

//                         {" "}days total

//                       </span>

//                     </div>

//                   </div>


//                   <div
//                     className="
//                       farmx-progress
//                   "
//                   >

//                     <div
//                       className="
//                         farmx-progress-heading
//                     "
//                     >

//                       <span>
//                         Current Stage:
//                       </span>

//                       <strong>
//                         {
//                           getCropStageText()
//                         }
//                       </strong>

//                     </div>


//                     <div
//                       className="
//                         farmx-progress-track
//                     "
//                     >

//                       <motion.div

//                         className="
//                           farmx-progress-fill
//                         "

//                         initial={{
//                           width: 0,
//                         }}

//                         animate={{
//                           width:
//                             `${
//                               cropStage?.progress ||
//                               0
//                             }%`,
//                         }}

//                         transition={{
//                           duration:
//                             .9,

//                           ease:
//                             "easeOut",
//                         }}

//                       />

//                     </div>


//                     <div
//                       className="
//                         farmx-progress-percent
//                     "
//                     >

//                       {
//                         cropStage?.progress ||
//                         0
//                       }%

//                     </div>

//                   </div>


//                   <div
//                     className="
//                       farmx-timeline
//                     "
//                   >

//                     <div
//                       className="
//                         farmx-timeline-line
//                     "
//                     />


//                     {stages.map(
//                       (stage) => {

//                         const completed =
//                           (
//                             cropStage?.progress ||
//                             0
//                           ) >=
//                           stage.progress;


//                         const active =
//                           cropStage?.key ===
//                           stage.key;


//                         return (

//                           <div

//                             key={
//                               stage.key
//                             }

//                             className={`
//                               farmx-stage

//                               ${
//                                 completed
//                                   ? "completed"
//                                   : ""
//                               }

//                               ${
//                                 active
//                                   ? "active"
//                                   : ""
//                               }
//                             `}

//                           >

//                           {stage.key === "germination" ||
//  stage.key === "vegetative" ? (
//   <div className="farmx-stage-sprout">
//     <Sprout size={31} />
//   </div>
// ) : (
//   <div className="farmx-stage-dot" />
// )}


//                             <span>
//                               {
//                                 stage.label
//                               }
//                             </span>

//                           </div>

//                         );

//                       }
//                     )}

//                   </div>


//                   <div
//                     className="
//                       farmx-advice
//                   "
//                   >

//                     <div
//                       className="
//                         farmx-advice-icon
//                     "
//                     >

//                       <Sprout
//                         size={16}
//                       />

//                     </div>


//                     <div>

//                       <strong>
//                         Advice
//                       </strong>

//                       <p>
//                         {
//                           getCropAdvice()
//                         }
//                       </p>

//                     </div>

//                   </div>


//                   <div
//                     className="
//                       farmx-reset-wrapper
//                   "
//                   >

//                     <button
//                       className="
//                         farmx-reset
//                     "

//                       onClick={
//                         resetGrowth
//                       }
//                     >

//                       <RotateCcw
//                         size={12}
//                       />

//                       Reset Tracker

//                     </button>

//                   </div>

//                 </>

//               )}

//             </div>

//           </motion.section>


//           {/* =================================================
//               FARM STATUS
//               ================================================= */}

//           <motion.section

//             className="
//               farmx-card
//               farmx-status-card
//             "

//             initial={{
//               opacity: 0,
//               y: 15,
//             }}

//             animate={{
//               opacity: 1,
//               y: 0,
//             }}

//             transition={{
//               duration: .45,
//               delay: .23,
//             }}

//           >

//             <div
//               className="
//                 farmx-card-header
//               "
//             >

//               <div
//                 className="
//                   farmx-header-icon
//               "
//               >

//                 <ShieldCheck
//                   size={18}
//                 />

//               </div>

//               <h2>
//                 Farm Status
//               </h2>

//             </div>


//             <div
//               className="
//                 farmx-status-body
//               "
//             >

//               <div
//                 className="
//                   farmx-status-row
//               "
//               >

//                 <span
//                   className="
//                     farmx-status-label
//                 "
//                 >
//                   Active Crop
//                 </span>


//                 <div
//                   className="
//                     farmx-status-value
//                 "
//                 >

//                   <strong>
//                     {
//                       getCropName(
//                         selectedCrop
//                       )
//                     }
//                   </strong>

//                   <span
//                     className="
//                       farmx-active-badge
//                   "
//                   >
//                     Active
//                   </span>

//                 </div>

//               </div>


//               <div
//                 className="
//                   farmx-status-row
//               "
//               >

//                 <span
//                   className="
//                     farmx-status-label
//                 "
//                 >
//                   Crop Stage
//                 </span>


//                 <div
//                   className="
//                     farmx-status-value
//                 "
//                 >

//                   <strong>

//                     {
//                       cropStage
//                         ? getCropStageText()
//                         : "Not Tracked"
//                     }

//                   </strong>


//                   <Sprout
//                     size={21}
//                     color="#15933d"
//                   />

//                 </div>

//               </div>


//               <div
//                 className="
//                   farmx-status-row
//               "
//               >

//                 <span
//                   className="
//                     farmx-status-label
//                 "
//                 >
//                   Weather
//                 </span>


//                 <div
//                   className="
//                     farmx-status-value
//                 "
//                 >

//                   <strong>
//                     {
//                       weather?.condition ||
//                       "--"
//                     }
//                   </strong>


//                   {weather && (

//                     <WeatherIcon
//                       code={
//                         weather.code
//                       }

//                       size={22}
//                     />

//                   )}

//                 </div>

//               </div>


//               <div
//                 className="
//                   farmx-status-row
//               "
//               >

//                 <span
//                   className="
//                     farmx-status-label
//                 "
//                 >
//                   Temperature
//                 </span>


//                 <div
//                   className="
//                     farmx-status-value
//                 "
//                 >

//                   <strong>
//                     {
//                       weather?.temp ??
//                       "--"
//                     }°C
//                   </strong>


//                   <span
//                     className="
//                       farmx-normal-badge
//                   "
//                   >
//                     Normal
//                   </span>

//                 </div>

//               </div>


//               <div
//                 className="
//                   farmx-status-row
//               "
//               >

//                 <span
//                   className="
//                     farmx-status-label
//                 "
//                 >
//                   Spray Status
//                 </span>


//                 <div
//                   className="
//                     farmx-status-value
//                 "
//                 >

//                   <strong
//                     className={
//                       weather
//                         ? isSafeToSpray()
//                           ? "farmx-safe"
//                           : "farmx-unsafe"
//                         : ""
//                     }
//                   >

//                     {
//                       weather
//                         ? isSafeToSpray()
//                           ? "Safe to Spray"
//                           : "Unsafe to Spray"
//                         : "--"
//                     }

//                   </strong>


//                   <span
//                     style={{
//                       width:
//                         "12px",

//                       height:
//                         "12px",

//                       borderRadius:
//                         "50%",

//                       background:
//                         weather
//                           ? isSafeToSpray()
//                             ? "#07943c"
//                             : "#e03131"
//                           : "#aab2ad",
//                     }}
//                   />

//                 </div>

//               </div>


//               <div
//                 className="
//                   farmx-status-row
//               "
//               >

//                 <span
//                   className="
//                     farmx-status-label
//                 "
//                 >
//                   Location
//                 </span>


//                 <div
//                   className="
//                     farmx-status-value
//                 "
//                 >

//                   <strong>
//                     {
//                       locationName
//                     }
//                   </strong>


//                   <MapPin
//                     size={20}
//                     color="#119d67"
//                   />

//                 </div>

//               </div>

//             </div>

//           </motion.section>


//           {/* =================================================
//               PREMIUM QUICK ACCESS
//               ================================================= */}

//           <motion.section

//             className="
//               farmx-card
//               farmx-quick-card
//             "

//             initial={{
//               opacity: 0,
//               y: 22,
//             }}

//             animate={{
//               opacity: 1,
//               y: 0,
//             }}

//             transition={{
//               duration: .6,
//               delay: .3,
//               ease: [
//                 .22,
//                 1,
//                 .36,
//                 1
//               ],
//             }}

//           >

//             {/* HEADER */}

//             <div
//               className="
//                 farmx-quick-header
//               "
//             >

//               <div
//                 className="
//                   farmx-quick-heading-icon
//               "
//               >

//                 <Sparkles
//                   size={18}
//                 />

//               </div>


//               <div
//                 className="
//                   farmx-quick-heading-text
//               "
//               >

//                 <h2>
//                   Quick Access
//                 </h2>

//                 <p>
//                   Everything you need for
//                   smarter farming
//                 </p>

//               </div>


//               <div
//                 className="
//                   farmx-quick-header-pill
//               "
//               >

//                 <span />

//                 4 Smart Tools

//               </div>

//             </div>


//             {/* CARDS */}

//             <div
//               className="
//                 farmx-quick-grid
//               "
//             >

//               {quickAccessItems.map(
//                 (
//                   item,
//                   index
//                 ) => {

//                   const Icon =
//                     item.icon;

//                   const Decoration =
//                     item.decoration;


//                   return (

//                     <motion.div

//                       key={
//                         item.title
//                       }

//                       className={`
//                         farmx-quick-item
//                         farmx-${item.className}
//                       `}

//                       initial={{
//                         opacity: 0,
//                         y: 18,
//                       }}

//                       animate={{
//                         opacity: 1,
//                         y: 0,
//                       }}

//                       transition={{
//                         delay:
//                           .38 +
//                           index * .09,

//                         duration:
//                           .5,

//                         ease:
//                           [
//                             .22,
//                             1,
//                             .36,
//                             1
//                           ],
//                       }}

//                       whileHover={{
//                         y: -6,
//                       }}

//                     >

//                       {/* NUMBER */}

//                       <span
//                         className="
//                           farmx-quick-number
//                       "
//                       >

//                         {item.number}

//                       </span>


//                       {/* GLOW */}

//                       <span
//                         className="
//                           farmx-quick-glow
//                       "
//                       />


//                       {/* TOP */}

//                       <div
//                         className="
//                           farmx-quick-top
//                       "
//                       >

//                         <div
//                           className="
//                             farmx-quick-icon
//                         "
//                         >

//                           <Icon
//                             size={24}
//                           />

//                         </div>


//                         <div>

//                           <span
//                             className="
//                               farmx-quick-label
//                           "
//                           >
//                             Smart Tool
//                           </span>


//                           <h3
//                             className="
//                               farmx-quick-title
//                           "
//                           >

//                             {
//                               item.title
//                             }

//                           </h3>

//                         </div>

//                       </div>


//                       {/* DESCRIPTION */}

//                       <p
//                         className="
//                           farmx-quick-description
//                       "
//                       >

//                         {
//                           item.description
//                         }

//                       </p>


//                       {/* BUTTON */}

//                       <button

//                         className="
//                           farmx-quick-button
//                         "

//                         onClick={() => {

//                           window.location.href =
//                             item.path;

//                         }}

//                       >

//                         {
//                           item.button
//                         }

//                         <ArrowUpRight
//                           size={13}
//                         />

//                       </button>


//                       {/* DECORATION */}

//                       <div
//                         className="
//                           farmx-decoration
//                       "
//                       >

//                         <Decoration
//                           size={95}
//                         />

//                       </div>

//                     </motion.div>

//                   );

//                 }
//               )}

//             </div>

//           </motion.section>

//         </section>


//       </main>

//     </>

//   );

// }







































// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { motion } from "framer-motion";

// import {
//   AlertCircle,
//   ArrowUpRight,
//   CalendarDays,
//   Cloud,
//   CloudRain,
//   CloudSun,
//   Droplets,
//   Leaf,
//   MapPin,
//   Navigation,
//   RotateCcw,
//   ShieldCheck,
//   Sprout,
//   Sun,
//   Wind,
// } from "lucide-react";

// import api from "../api";
// import FarmDashboardBanner from "../assets/FarmDashboardBanner.png";
// import styles from "./Dashboard.module.css";


// export default function Dashboard() {

//   const { t } = useTranslation();


//   /* =========================================================
//      FARMER
//      ========================================================= */

//   const [farmerProfile, setFarmerProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);


//   /* =========================================================
//      WEATHER
//      ========================================================= */

//   const [weather, setWeather] = useState(null);
//   const [weatherLoading, setWeatherLoading] = useState(true);
//   const [weatherError, setWeatherError] = useState(false);

//   const [locationName, setLocationName] = useState(
//     "Kakinada, Andhra Pradesh"
//   );


//   /* =========================================================
//      CROP TRACKER
//      ========================================================= */

//   const [sowingDate, setSowingDate] = useState("");
//   const [selectedCrop, setSelectedCrop] = useState("rice");
//   const [cropStage, setCropStage] = useState(null);
//   const [tempDate, setTempDate] = useState("");

//   const crops = [
//     "rice",
//     "wheat",
//     "maize",
//     "cotton",
//     "tomato",
//     "potato",
//   ];


  


//   /* =========================================================
//      TRANSLATION
//      ========================================================= */

//   const translate = (key, fallback) => {

//     const value = t(key);

//     if (!value || value === key) {
//       return fallback;
//     }

//     return value;
//   };


//   /* =========================================================
//      GREETING
//      ========================================================= */

//   const getGreeting = () => {

//     const hour = new Date().getHours();

//     if (hour < 12) {
//       return translate(
//         "good_morning",
//         "Good Morning"
//       );
//     }

//     if (hour < 17) {
//       return translate(
//         "good_afternoon",
//         "Good Afternoon"
//       );
//     }

//     if (hour < 21) {
//       return translate(
//         "good_evening",
//         "Good Evening"
//       );
//     }

//     return translate(
//       "good_night",
//       "Good Night"
//     );
//   };


//   /* =========================================================
//      FARMER PROFILE
//      ========================================================= */

//   const fetchFarmerProfile = async () => {

//     try {

//       setLoadingProfile(true);

//       const response = await api.get("/farmer");

//       if (response.data?.exists) {
//         setFarmerProfile(
//           response.data.profile
//         );
//       }

//     } catch (error) {

//       console.error(
//         "Farmer profile error:",
//         error
//       );

//     } finally {

//       setLoadingProfile(false);

//     }
//   };


//   /* =========================================================
//      WEATHER CONDITION
//      ========================================================= */

//   const getWeatherCondition = (code) => {

//     if (
//       code === undefined ||
//       code === null
//     ) {
//       return "Loading weather...";
//     }

//     if (code === 0) {
//       return "Clear Sky";
//     }

//     if (code <= 3) {
//       return "Partly Cloudy";
//     }

//     if (code <= 48) {
//       return "Foggy";
//     }

//     if (code <= 67) {
//       return "Rainy";
//     }

//     if (code <= 77) {
//       return "Snowy";
//     }

//     if (code <= 82) {
//       return "Rain Showers";
//     }

//     if (code <= 86) {
//       return "Snow Showers";
//     }

//     return "Thunderstorm";
//   };


//   /* =========================================================
//      WEATHER ICON
//      ========================================================= */

//   const WeatherIcon = ({
//     code,
//     size = 58,
//   }) => {

//     if (code === 0) {

//       return (
//         <Sun
//           size={size}
//           strokeWidth={1.8}
//           color="#F4B400"
//         />
//       );
//     }

//     if (code <= 3) {

//       return (
//         <CloudSun
//           size={size}
//           strokeWidth={1.8}
//           color="#F4B400"
//         />
//       );
//     }

//     if (code <= 48) {

//       return (
//         <Cloud
//           size={size}
//           strokeWidth={1.8}
//           color="#9AA4A0"
//         />
//       );
//     }

//     return (
//       <CloudRain
//         size={size}
//         strokeWidth={1.8}
//         color="#4E91C8"
//       />
//     );
//   };




//   /* =========================================================
//      WEATHER API
//      ========================================================= */

//   const fetchWeather = async (
//     lat,
//     lon
//   ) => {

//     try {

//       setWeatherLoading(true);
//       setWeatherError(false);

//       const url =
//         `https://api.open-meteo.com/v1/forecast` +
//         `?latitude=${lat}` +
//         `&longitude=${lon}` +
//         `&current_weather=true` +
//         `&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,apparent_temperature` +
//         `&timezone=auto`;

//       const response =
//         await fetch(url);

//       if (!response.ok) {
//         throw new Error(
//           "Weather API failed"
//         );
//       }

//       const data =
//         await response.json();

//       const current =
//         data.current_weather;

//       if (!current) {
//         throw new Error(
//           "Current weather unavailable"
//         );
//       }

//       const humidity =
//         data.hourly
//           ?.relativehumidity_2m?.[0] ??
//         null;

//       const rainProbability =
//         data.hourly
//           ?.precipitation_probability?.[0] ??
//         0;

//       const apparentTemperature =
//         data.hourly
//           ?.apparent_temperature?.[0] ??
//         Math.round(
//           current.temperature
//         );

//       setWeather({

//         temp:
//           Math.round(
//             current.temperature
//           ),

//         condition:
//           getWeatherCondition(
//             current.weathercode
//           ),

//         wind:
//           Math.round(
//             current.windspeed
//           ),

//         humidity,

//         rain_prob:
//           rainProbability,

//         code:
//           current.weathercode,

//         feelsLike:
//           Math.round(
//             apparentTemperature
//           ),
//       });

//       setLocationName(
//         `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`
//       );

//     } catch (error) {

//       console.error(
//         "Weather fetch failed:",
//         error
//       );

//       setWeatherError(true);

//     } finally {

//       setWeatherLoading(false);

//     }
//   };


//   /* =========================================================
//      LOCATION SUCCESS
//      ========================================================= */

//   const handleLocationSuccess = (
//     position
//   ) => {

//     const lat =
//       position.coords.latitude;

//     const lon =
//       position.coords.longitude;

//     /* Weather */
//     fetchWeather(
//       lat,
//       lon
//     );

   
//   };


//   /* =========================================================
//      LOCATION ERROR
//      ========================================================= */

//   const handleLocationError = () => {

//     setLocationName(
//       "Kakinada, Andhra Pradesh"
//     );

//     /* Kakinada fallback */
//     const lat = 16.9891;
//     const lon = 82.2475;

//     fetchWeather(
//       lat,
//       lon
//     );

//     fetchSoilCenters(
//       lat,
//       lon
//     );
//   };


//   /* =========================================================
//      RETRY WEATHER
//      ========================================================= */

//   const retryWeather = () => {

//     if (navigator.geolocation) {

//       navigator.geolocation.getCurrentPosition(
//         handleLocationSuccess,
//         handleLocationError
//       );

//     } else {

//       handleLocationError();

//     }
//   };


//   /* =========================================================
//      SPRAY SAFETY
//      ========================================================= */

//   const isSafeToSpray = () => {

//     if (!weather) {
//       return false;
//     }

//     if (
//       Number(weather.wind) > 15 ||
//       Number(weather.rain_prob) > 50 ||
//       Number(weather.code) > 60
//     ) {

//       return false;
//     }

//     return true;
//   };


//   /* =========================================================
//      CROP GROWTH
//      ========================================================= */

//   const saveGrowth = async (
//     date,
//     crop
//   ) => {

//     try {

//       await api.post(
//         "/growth",
//         {
//           sowingDate: date,
//           crop,
//         }
//       );

//     } catch (error) {

//       console.error(
//         "Save growth error:",
//         error
//       );

//     }
//   };


//   const calculateCropStage = (
//     dateStr,
//     crop
//   ) => {

//     if (!dateStr) {

//       setCropStage(null);

//       return;
//     }

//     const start =
//       new Date(dateStr);

//     if (
//       Number.isNaN(
//         start.getTime()
//       )
//     ) {

//       setCropStage(null);

//       return;
//     }

//     const today =
//       new Date();

//     const diffTime =
//       Math.max(
//         0,
//         today.getTime() -
//           start.getTime()
//       );

//     const days =
//       Math.floor(
//         diffTime /
//           (1000 * 60 * 60 * 24)
//       );

//     const totalDays =
//       crop === "wheat"
//         ? 140
//         : 120;

//     const progress =
//       Math.min(
//         100,
//         Math.max(
//           0,
//           Math.round(
//             (days / totalDays) *
//               100
//           )
//         )
//       );

//     let stage = {
//       key: "germination",
//     };

//     if (progress >= 80) {

//       stage = {
//         key: "harvest",
//       };

//     } else if (progress >= 40) {

//       stage = {
//         key: "flowering",
//       };

//     } else if (progress >= 15) {

//       stage = {
//         key: "vegetative",
//       };

//     }

//     setCropStage({
//       days,
//       totalDays,
//       progress,
//       ...stage,
//     });
//   };


//   const fetchGrowth = async () => {

//     try {

//       const response =
//         await api.get(
//           "/growth"
//         );

//       if (
//         response.data?.sowingDate
//       ) {

//         const date =
//           response.data.sowingDate;

//         const crop =
//           response.data.crop ||
//           "rice";

//         setSowingDate(date);

//         setSelectedCrop(crop);

//         calculateCropStage(
//           date,
//           crop
//         );
//       }

//     } catch (error) {

//       console.error(
//         "Growth fetch error:",
//         error
//       );

//     }
//   };


//   const resetGrowth = async () => {

//     try {

//       await api.post(
//         "/growth",
//         {
//           sowingDate: "",
//           crop: "",
//         }
//       );

//       setSowingDate("");

//       setTempDate("");

//       setSelectedCrop(
//         "rice"
//       );

//       setCropStage(null);

//     } catch (error) {

//       console.error(
//         "Reset growth error:",
//         error
//       );

//     }
//   };


//   /* =========================================================
//      CROP TEXT
//      ========================================================= */

//   const getCropStageText = () => {

//     if (!cropStage?.key) {
//       return "Not Tracked";
//     }

//     const fallback = {

//       germination:
//         "Germination",

//       vegetative:
//         "Vegetative",

//       flowering:
//         "Flowering",

//       harvest:
//         "Harvest",

//     };

//     const translated =
//       t(cropStage.key);

//     if (
//       !translated ||
//       translated === cropStage.key
//     ) {

//       return fallback[
//         cropStage.key
//       ];
//     }

//     return translated;
//   };


//   const getCropAdvice = () => {

//     if (!cropStage?.key) {

//       return (
//         "Start tracking your crop to receive personalized advice."
//       );
//     }

//     const fallback = {

//       germination:
//         "Keep the soil adequately moist and monitor the young seedlings regularly.",

//       vegetative:
//         "Support healthy leaf and root growth with proper irrigation and nutrients.",

//       flowering:
//         "Monitor water, nutrients and weather conditions carefully during flowering.",

//       harvest:
//         "Check crop maturity and prepare for harvesting at the appropriate time.",

//     };

//     const key =
//       `advice_${cropStage.key}`;

//     const translated =
//       t(key);

//     if (
//       !translated ||
//       translated === key
//     ) {

//       return fallback[
//         cropStage.key
//       ];
//     }

//     return translated;
//   };


//   const getCropName = (
//     crop
//   ) => {

//     const translated =
//       t(`crop_names.${crop}`);

//     if (
//       !translated ||
//       translated ===
//         `crop_names.${crop}`
//     ) {

//       const names = {

//         rice: "Rice",

//         wheat: "Wheat",

//         maize: "Maize",

//         cotton: "Cotton",

//         tomato: "Tomato",

//         potato: "Potato",

//       };

//       return (
//         names[crop] ||
//         crop
//       );
//     }

//     return translated;
//   };


//   /* =========================================================
//      INITIAL LOAD
//      ========================================================= */

//   useEffect(() => {

//     fetchFarmerProfile();

//     fetchGrowth();

//     if (navigator.geolocation) {

//       navigator.geolocation.getCurrentPosition(
//         handleLocationSuccess,
//         handleLocationError
//       );

//     } else {

//       handleLocationError();

//     }

//   }, []);


//   /* =========================================================
//      UPDATE CROP STAGE
//      ========================================================= */

//   useEffect(() => {

//     if (sowingDate) {

//       calculateCropStage(
//         sowingDate,
//         selectedCrop
//       );

//     }

//   }, [
//     sowingDate,
//     selectedCrop,
//   ]);


//   /* =========================================================
//      DATA
//      ========================================================= */

//   const farmerName =
//     farmerProfile?.fullName ||
//     farmerProfile?.name ||
//     "Vyshnavi";


//   const stages = [

//     {
//       key: "germination",
//       label: "Germination",
//       progress: 10,
//     },

//     {
//       key: "vegetative",
//       label: "Vegetative",
//       progress: 40,
//     },

//     {
//       key: "flowering",
//       label: "Flowering",
//       progress: 70,
//     },

//     {
//       key: "harvest",
//       label: "Harvest",
//       progress: 100,
//     },

//   ];


//   /* =========================================================
//      RENDER
//      ========================================================= */

//   return (

//     <main
//       className={
//         styles.dashboard
//       }
//     >

//       {/* =====================================================
//           WELCOME BANNER
//           ===================================================== */}

//       <motion.section
//         className={
//           styles.welcome
//         }

//         initial={{
//           opacity: 0,
//           y: 10,
//         }}

//         animate={{
//           opacity: 1,
//           y: 0,
//         }}

//         transition={{
//           duration: 0.55,
//           ease: [
//             0.22,
//             1,
//             0.36,
//             1,
//           ],
//         }}
//       >

//         <img
//           src={
//             FarmDashboardBanner
//           }

//           alt="Farm landscape"

//           className={
//             styles.welcomeImage
//           }
//         />

//         <div
//           className={
//             styles.welcomeOverlay
//           }
//         />

//         <div
//           className={
//             styles.welcomeContent
//           }
//         >

//           <motion.h1
//             className={
//               styles.welcomeTitle
//             }

//             initial={{
//               opacity: 0,
//               x: -10,
//             }}

//             animate={{
//               opacity: 1,
//               x: 0,
//             }}

//             transition={{
//               delay: 0.12,
//               duration: 0.45,
//             }}
//           >

//             {getGreeting()},{" "}

//             <span
//               className={
//                 styles.name
//               }
//             >
//               {farmerName}!
//             </span>

//             <span
//               className={
//                 styles.plant
//               }
//             >
//               🌱
//             </span>

//           </motion.h1>


//           <motion.p
//             className={
//               styles.welcomeSubtitle
//             }

//             initial={{
//               opacity: 0,
//               x: -8,
//             }}

//             animate={{
//               opacity: 1,
//               x: 0,
//             }}

//             transition={{
//               delay: 0.2,
//               duration: 0.45,
//             }}
//           >

//             Here's what's happening
//             on your farm today.

//           </motion.p>

//         </div>

//       </motion.section>


//       {/* =====================================================
//           WEATHER
//           ===================================================== */}

//       <motion.section
//         className={
//           styles.weatherOuter
//         }

//         id="weather-card"

//         data-tour="weather"

//         initial={{
//           opacity: 0,
//           y: 12,
//         }}

//         animate={{
//           opacity: 1,
//           y: 0,
//         }}

//         transition={{
//           duration: 0.45,
//           delay: 0.12,
//         }}
//       >

//         {weatherLoading ? (

//           <div
//             className={
//               styles.weatherCard
//             }
//           >

//             <div
//               className={
//                 styles.weatherHeading
//               }
//             >

//               <h2>
//                 Weather Today
//               </h2>

//               <span
//                 className={
//                   styles.live
//                 }
//               >

//                 <span
//                   className={
//                     styles.liveDot
//                   }
//                 />

//                 Live

//               </span>

//             </div>


//             <div
//               className={
//                 styles.weatherContent
//               }
//             >

//               <div
//                 className={
//                   styles.weatherMain
//                 }
//               >

//                 <div
//                   className={
//                     styles.weatherIcon
//                   }
//                 >

//                   <Cloud
//                     size={50}
//                   />

//                 </div>


//                 <div>

//                   <div
//                     className={
//                       styles.temp
//                     }
//                   >
//                     --°C
//                   </div>

//                   <div
//                     className={
//                       styles.condition
//                     }
//                   >
//                     Loading...
//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         ) : weatherError ? (

//           <div
//             className={
//               styles.weatherError
//             }
//           >

//             <AlertCircle
//               size={19}
//             />

//             <span>
//               Unable to load weather.
//             </span>

//             <button
//               className={
//                 styles.retry
//               }

//               onClick={
//                 retryWeather
//               }
//             >
//               Retry
//             </button>

//           </div>

//         ) : (

//           <div
//             className={
//               styles.weatherCard
//             }
//           >

//             <div
//               className={
//                 styles.weatherHeading
//               }
//             >

//               <h2>
//                 Weather Today
//               </h2>

//               <span
//                 className={
//                   styles.live
//                 }
//               >

//                 <span
//                   className={
//                     styles.liveDot
//                   }
//                 />

//                 Live

//               </span>

//             </div>


//             <div
//               className={
//                 styles.weatherContent
//               }
//             >

//               <div
//                 className={
//                   styles.weatherMain
//                 }
//               >

//                 <div
//                   className={
//                     styles.weatherIcon
//                   }
//                 >

//                   <WeatherIcon
//                     code={
//                       weather?.code
//                     }

//                     size={61}
//                   />

//                 </div>


//                 <div>

//                   <div
//                     className={
//                       styles.temp
//                     }
//                   >

//                     {weather?.temp ??
//                       "--"}
//                     °C

//                   </div>


//                   <div
//                     className={
//                       styles.condition
//                     }
//                   >

//                     {
//                       weather?.condition
//                     }

//                   </div>

//                 </div>

//               </div>


//               {/* HUMIDITY */}

//               <div
//                 className={
//                   styles.weatherStat
//                 }
//               >

//                 <div
//                   className={
//                     styles.weatherStatLabel
//                   }
//                 >

//                   <Droplets
//                     size={17}
//                   />

//                   Humidity

//                 </div>


//                 <div
//                   className={
//                     styles.weatherStatValue
//                   }
//                 >

//                   {
//                     weather?.humidity ??
//                     "--"
//                   }%

//                 </div>

//               </div>


//               {/* WIND */}

//               <div
//                 className={
//                   styles.weatherStat
//                 }
//               >

//                 <div
//                   className={
//                     styles.weatherStatLabel
//                   }
//                 >

//                   <Wind
//                     size={17}
//                   />

//                   Wind

//                 </div>


//                 <div
//                   className={
//                     styles.weatherStatValue
//                   }
//                 >

//                   {
//                     weather?.wind ??
//                     "--"
//                   } km/h

//                 </div>

//               </div>


//               {/* RAIN */}

//               <div
//                 className={
//                   styles.weatherStat
//                 }
//               >

//                 <div
//                   className={
//                     styles.weatherStatLabel
//                   }
//                 >

//                   <CloudRain
//                     size={17}
//                   />

//                   Rain Chance

//                 </div>


//                 <div
//                   className={
//                     styles.weatherStatValue
//                   }
//                 >

//                   {
//                     weather?.rain_prob ??
//                     0
//                   }%

//                 </div>

//               </div>

//             </div>

//           </div>

//         )}

//       </motion.section>


//       {/* =====================================================
//           MAIN CONTENT
//           ===================================================== */}

//       <section
//         className={
//           styles.mainGrid
//         }
//       >


//         {/* ===================================================
//             CROP TRACKER
//             =================================================== */}

//         <motion.section
//           className={`${styles.card} ${styles.cropCard}`}

//           id="crop-tracker"

//           data-tour="crop-tracker"

//           initial={{
//             opacity: 0,
//             y: 15,
//           }}

//           animate={{
//             opacity: 1,
//             y: 0,
//           }}

//           transition={{
//             duration: 0.45,
//             delay: 0.18,
//           }}
//         >

//           <div
//             className={
//               styles.cardHeader
//             }
//           >

//             <div
//               className={
//                 styles.headerIcon
//               }
//             >

//               <CalendarDays
//                 size={18}
//               />

//             </div>

//             <h2>
//               Crop Tracker
//             </h2>

//           </div>


//           <div
//             className={
//               styles.cropBody
//             }
//           >

//             {!sowingDate ? (

//               /* =============================================
//                  CROP SETUP
//                  ============================================= */

//               <div
//                 className={
//                   styles.cropSetup
//                 }
//               >

//                 <div
//                   className={
//                     styles.setupGrid
//                   }
//                 >

//                   <div
//                     className={
//                       styles.formGroup
//                     }
//                   >

//                     <label>
//                       Select Crop
//                     </label>

//                     <select
//                       value={
//                         selectedCrop
//                       }

//                       onChange={(e) =>
//                         setSelectedCrop(
//                           e.target.value
//                         )
//                       }
//                     >

//                       {crops.map(
//                         (crop) => (

//                           <option
//                             key={crop}
//                             value={crop}
//                           >
//                             {
//                               getCropName(
//                                 crop
//                               )
//                             }
//                           </option>

//                         )
//                       )}

//                     </select>

//                   </div>


//                   <div
//                     className={
//                       styles.formGroup
//                     }
//                   >

//                     <label>
//                       Enter Sowing Date
//                     </label>

//                     <input
//                       type="date"

//                       value={
//                         tempDate
//                       }

//                       max={
//                         new Date()
//                           .toISOString()
//                           .split("T")[0]
//                       }

//                       onChange={(e) =>
//                         setTempDate(
//                           e.target.value
//                         )
//                       }
//                     />

//                   </div>

//                 </div>


//                 <button
//                   className={
//                     styles.trackButton
//                   }

//                   disabled={
//                     !tempDate
//                   }

//                   onClick={() => {

//                     if (!tempDate)
//                       return;

//                     setSowingDate(
//                       tempDate
//                     );

//                     saveGrowth(
//                       tempDate,
//                       selectedCrop
//                     );

//                     setTempDate("");

//                   }}
//                 >

//                   <Sprout
//                     size={15}
//                   />

//                   Track Growth

//                 </button>

//               </div>

//             ) : (

//               /* =============================================
//                  TRACKED CROP
//                  ============================================= */

//               <>

//                 {/* CROP SUMMARY */}

//                 <div
//                   className={
//                     styles.cropSummary
//                   }
//                 >

//                   <div
//                     className={
//                       styles.activeCrop
//                     }
//                   >

//                     <div
//                       className={
//                         styles.cropIcon
//                       }
//                     >

//                       <Leaf
//                         size={31}
//                       />

//                     </div>


//                     <div>

//                       <span
//                         className={
//                           styles.label
//                         }
//                       >
//                         Active Crop
//                       </span>


//                       <strong
//                         className={
//                           styles.cropName
//                         }
//                       >

//                         {
//                           getCropName(
//                             selectedCrop
//                           )
//                         }

//                       </strong>

//                     </div>

//                   </div>


//                   {/* DAYS PASSED */}

//                   <div
//                     className={
//                       styles.days
//                     }
//                   >

//                     <span
//                       className={
//                         styles.label
//                       }
//                     >
//                       Days Passed
//                     </span>


//                     <strong>

//                       {
//                         cropStage?.days ||
//                         0
//                       }

//                       <small>
//                         {" "}days
//                       </small>

//                     </strong>


//                     <span
//                       className={
//                         styles.daysTotal
//                       }
//                     >

//                       ~
//                       {
//                         cropStage?.totalDays ||
//                         120
//                       }
//                       {" "}days total

//                     </span>

//                   </div>

//                 </div>


//                 {/* PROGRESS */}

//                 <div
//                   className={
//                     styles.progress
//                   }
//                 >

//                   <div
//                     className={
//                       styles.progressHeading
//                     }
//                   >

//                     <span>
//                       Current Stage:
//                     </span>

//                     <strong>
//                       {
//                         getCropStageText()
//                       }
//                     </strong>

//                   </div>


//                   <div
//                     className={
//                       styles.progressTrack
//                     }
//                   >

//                     <motion.div
//                       className={
//                         styles.progressFill
//                       }

//                       initial={{
//                         width: 0,
//                       }}

//                       animate={{
//                         width: `${
//                           cropStage?.progress ||
//                           0
//                         }%`,
//                       }}

//                       transition={{
//                         duration: 0.9,
//                         ease: "easeOut",
//                       }}
//                     />

//                   </div>


//                   <div
//                     className={
//                       styles.progressPercent
//                     }
//                   >

//                     {
//                       cropStage?.progress ||
//                       0
//                     }%

//                   </div>

//                 </div>


//                 {/* TIMELINE */}

//                 <div
//                   className={
//                     styles.timeline
//                   }
//                 >

//                   <div
//                     className={
//                       styles.timelineLine
//                     }
//                   />


//                   {stages.map(
//                     (stage) => {

//                       const completed =
//                         (
//                           cropStage?.progress ||
//                           0
//                         ) >=
//                         stage.progress;

//                       const active =
//                         cropStage?.key ===
//                         stage.key;


//                       return (

//                         <div
//                           key={
//                             stage.key
//                           }

//                           className={`
//                             ${styles.stage}
//                             ${
//                               completed
//                                 ? styles.completed
//                                 : ""
//                             }
//                             ${
//                               active
//                                 ? styles.active
//                                 : ""
//                             }
//                           `}
//                         >

//                           {
//                             stage.key ===
//                               "germination" ||
//                             stage.key ===
//                               "vegetative"
//                           ? (

//                             <div
//                               className={
//                                 styles.stageSprout
//                               }
//                             >

//                               <Sprout
//                                 size={31}
//                               />

//                             </div>

//                           ) : (

//                             <div
//                               className={
//                                 styles.stageDot
//                               }
//                             />

//                           )}


//                           <span>
//                             {
//                               stage.label
//                             }
//                           </span>

//                         </div>

//                       );

//                     }
//                   )}

//                 </div>


//                 {/* ADVICE */}

//                 <div
//                   className={
//                     styles.advice
//                   }
//                 >

//                   <div
//                     className={
//                       styles.adviceIcon
//                     }
//                   >

//                     <Sprout
//                       size={16}
//                     />

//                   </div>


//                   <div>

//                     <strong>
//                       Advice
//                     </strong>

//                     <p>
//                       {
//                         getCropAdvice()
//                       }
//                     </p>

//                   </div>

//                 </div>


//                 {/* RESET */}

//                 <div
//                   className={
//                     styles.resetWrapper
//                   }
//                 >

//                   <button
//                     className={
//                       styles.reset
//                     }

//                     onClick={
//                       resetGrowth
//                     }
//                   >

//                     <RotateCcw
//                       size={12}
//                     />

//                     Reset Tracker

//                   </button>

//                 </div>

//               </>

//             )}

//           </div>

//         </motion.section>


//         {/* ===================================================
//             FARM STATUS
//             =================================================== */}

//         <motion.section
//           className={`${styles.card} ${styles.statusCard}`}

//           initial={{
//             opacity: 0,
//             y: 15,
//           }}

//           animate={{
//             opacity: 1,
//             y: 0,
//           }}

//           transition={{
//             duration: 0.45,
//             delay: 0.23,
//           }}
//         >

//           <div
//             className={
//               styles.cardHeader
//             }
//           >

//             <div
//               className={
//                 styles.headerIcon
//               }
//             >

//               <ShieldCheck
//                 size={18}
//               />

//             </div>

//             <h2>
//               Farm Status
//             </h2>

//           </div>


//           <div
//             className={
//               styles.statusBody
//             }
//           >

//             {/* ACTIVE CROP */}

//             <div
//               className={
//                 styles.statusRow
//               }
//             >

//               <span
//                 className={
//                   styles.statusLabel
//                 }
//               >
//                 Active Crop
//               </span>


//               <div
//                 className={
//                   styles.statusValue
//                 }
//               >

//                 <strong>
//                   {
//                     getCropName(
//                       selectedCrop
//                     )
//                   }
//                 </strong>

//                 <span
//                   className={
//                     styles.activeBadge
//                   }
//                 >
//                   Active
//                 </span>

//               </div>

//             </div>


//             {/* CROP STAGE */}

//             <div
//               className={
//                 styles.statusRow
//               }
//             >

//               <span
//                 className={
//                   styles.statusLabel
//                 }
//               >
//                 Crop Stage
//               </span>


//               <div
//                 className={
//                   styles.statusValue
//                 }
//               >

//                 <strong>
//                   {
//                     cropStage
//                       ? getCropStageText()
//                       : "Not Tracked"
//                   }
//                 </strong>


//                 <Sprout
//                   size={21}
//                   color="#15933d"
//                 />

//               </div>

//             </div>


//             {/* WEATHER */}

//             <div
//               className={
//                 styles.statusRow
//               }
//             >

//               <span
//                 className={
//                   styles.statusLabel
//                 }
//               >
//                 Weather
//               </span>


//               <div
//                 className={
//                   styles.statusValue
//                 }
//               >

//                 <strong>
//                   {
//                     weather?.condition ||
//                     "--"
//                   }
//                 </strong>


//                 {weather && (

//                   <div
//                     className={
//                       styles.weatherStatusIcon
//                     }
//                   >

//                     <WeatherIcon
//                       code={
//                         weather.code
//                       }

//                       size={22}
//                     />

//                   </div>

//                 )}

//               </div>

//             </div>


//             {/* TEMPERATURE */}

//             <div
//               className={
//                 styles.statusRow
//               }
//             >

//               <span
//                 className={
//                   styles.statusLabel
//                 }
//               >
//                 Temperature
//               </span>


//               <div
//                 className={
//                   styles.statusValue
//                 }
//               >

//                 <strong>
//                   {
//                     weather?.temp ??
//                     "--"
//                   }°C
//                 </strong>


//                 <span
//                   className={
//                     styles.normalBadge
//                   }
//                 >
//                   Normal
//                 </span>

//               </div>

//             </div>


//             {/* SPRAY STATUS */}

//             <div
//               className={
//                 styles.statusRow
//               }
//             >

//               <span
//                 className={
//                   styles.statusLabel
//                 }
//               >
//                 Spray Status
//               </span>


//               <div
//                 className={
//                   styles.statusValue
//                 }
//               >

//                 <strong
//                   className={
//                     weather
//                       ? isSafeToSpray()
//                         ? styles.safe
//                         : styles.unsafe
//                       : ""
//                   }
//                 >

//                   {weather
//                     ? isSafeToSpray()
//                       ? "Safe to Spray"
//                       : "Unsafe to Spray"
//                     : "--"}

//                 </strong>


//                 <span
//                   className={
//                     styles.statusDot
//                   }

//                   style={{
//                     background:
//                       weather
//                         ? isSafeToSpray()
//                           ? "#07943c"
//                           : "#e03131"
//                         : "#aab2ad",
//                   }}
//                 />

//               </div>

//             </div>


//             {/* LOCATION */}

//             <div
//               className={
//                 styles.statusRow
//               }
//             >

//               <span
//                 className={
//                   styles.statusLabel
//                 }
//               >
//                 Location
//               </span>


//               <div
//                 className={
//                   styles.statusValue
//                 }
//               >

//                 <strong>
//                   {
//                     locationName
//                   }
//                 </strong>


//                 <MapPin
//                   size={20}
//                   color="#119d67"
//                 />

//               </div>

//             </div>

//           </div>

//         </motion.section>



//       </section>

//     </main>

//   );

// }















// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { motion } from "framer-motion";

// import {
//   AlertCircle,
//   ArrowUpRight,
//   CalendarDays,
//   Cloud,
//   CloudRain,
//   CloudSun,
//   Droplets,
//   Leaf,
//   MapPin,
//   Navigation,
//   RotateCcw,
//   ShieldCheck,
//   Sprout,
//   Sun,
//   Wind,
// } from "lucide-react";

// import api from "../api";
// import FarmDashboardBanner from "../assets/FarmDashboardBanner.png";
// import styles from "./Dashboard.module.css";


// export default function Dashboard() {

//   const { t } = useTranslation();


//   /* =========================================================
//      FARMER
//      ========================================================= */

//   const [farmerProfile, setFarmerProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);


//   /* =========================================================
//      WEATHER
//      ========================================================= */

//   const [weather, setWeather] = useState(null);
//   const [weatherLoading, setWeatherLoading] = useState(true);
//   const [weatherError, setWeatherError] = useState(false);

//   const [locationName, setLocationName] = useState(
//     "Kakinada, Andhra Pradesh"
//   );


//   /* =========================================================
//      CROP TRACKER
//      ========================================================= */

//   const [sowingDate, setSowingDate] = useState("");
//   const [selectedCrop, setSelectedCrop] = useState("rice");
//   const [cropStage, setCropStage] = useState(null);
//   const [tempDate, setTempDate] = useState("");

//   const crops = [
//     "rice",
//     "wheat",
//     "maize",
//     "cotton",
//     "tomato",
//     "potato",
//   ];


//   /* =========================================================
//      TRANSLATION
//      ========================================================= */

//   const translate = (key, fallback) => {

//     const value = t(key);

//     if (!value || value === key) {
//       return fallback;
//     }

//     return value;
//   };


//   /* =========================================================
//      GREETING
//      ========================================================= */

//   const getGreeting = () => {

//     const hour = new Date().getHours();

//     if (hour < 12) {
//       return translate(
//         "good_morning",
//         "Good Morning"
//       );
//     }

//     if (hour < 17) {
//       return translate(
//         "good_afternoon",
//         "Good Afternoon"
//       );
//     }

//     if (hour < 21) {
//       return translate(
//         "good_evening",
//         "Good Evening"
//       );
//     }

//     return translate(
//       "good_night",
//       "Good Night"
//     );
//   };


//   /* =========================================================
//      FARMER PROFILE
//      ========================================================= */

//   const fetchFarmerProfile = async () => {

//     try {

//       setLoadingProfile(true);

//       const response = await api.get("/farmer");

//       if (response.data?.exists) {
//         setFarmerProfile(
//           response.data.profile
//         );
//       }

//     } catch (error) {

//       console.error(
//         "Farmer profile error:",
//         error
//       );

//     } finally {

//       setLoadingProfile(false);

//     }
//   };


//   /* =========================================================
//      WEATHER CONDITION
//      ========================================================= */

//   const getWeatherCondition = (code) => {

//     if (
//       code === undefined ||
//       code === null
//     ) {
//       return "Loading weather...";
//     }

//     if (code === 0) {
//       return "Clear Sky";
//     }

//     if (code <= 3) {
//       return "Partly Cloudy";
//     }

//     if (code <= 48) {
//       return "Foggy";
//     }

//     if (code <= 67) {
//       return "Rainy";
//     }

//     if (code <= 77) {
//       return "Snowy";
//     }

//     if (code <= 82) {
//       return "Rain Showers";
//     }

//     if (code <= 86) {
//       return "Snow Showers";
//     }

//     return "Thunderstorm";
//   };


//   /* =========================================================
//      WEATHER ICON
//      ========================================================= */

//   const WeatherIcon = ({
//     code,
//     size = 58,
//   }) => {

//     if (code === 0) {

//       return (
//         <Sun
//           size={size}
//           strokeWidth={1.8}
//           color="#F4B400"
//         />
//       );
//     }

//     if (code <= 3) {

//       return (
//         <CloudSun
//           size={size}
//           strokeWidth={1.8}
//           color="#F4B400"
//         />
//       );
//     }

//     if (code <= 48) {

//       return (
//         <Cloud
//           size={size}
//           strokeWidth={1.8}
//           color="#9AA4A0"
//         />
//       );
//     }

//     return (
//       <CloudRain
//         size={size}
//         strokeWidth={1.8}
//         color="#4E91C8"
//       />
//     );
//   };


//   /* =========================================================
//      WEATHER API
//      ========================================================= */

//   const fetchWeather = async (
//     lat,
//     lon
//   ) => {

//     try {

//       setWeatherLoading(true);
//       setWeatherError(false);

//       const url =
//         `https://api.open-meteo.com/v1/forecast` +
//         `?latitude=${lat}` +
//         `&longitude=${lon}` +
//         `&current_weather=true` +
//         `&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,apparent_temperature` +
//         `&timezone=auto`;

//       const response =
//         await fetch(url);

//       if (!response.ok) {
//         throw new Error(
//           "Weather API failed"
//         );
//       }

//       const data =
//         await response.json();

//       const current =
//         data.current_weather;

//       if (!current) {
//         throw new Error(
//           "Current weather unavailable"
//         );
//       }

//       const humidity =
//         data.hourly
//           ?.relativehumidity_2m?.[0] ??
//         null;

//       const rainProbability =
//         data.hourly
//           ?.precipitation_probability?.[0] ??
//         0;

//       const apparentTemperature =
//         data.hourly
//           ?.apparent_temperature?.[0] ??
//         Math.round(
//           current.temperature
//         );

//       setWeather({

//         temp:
//           Math.round(
//             current.temperature
//           ),

//         condition:
//           getWeatherCondition(
//             current.weathercode
//           ),

//         wind:
//           Math.round(
//             current.windspeed
//           ),

//         humidity,

//         rain_prob:
//           rainProbability,

//         code:
//           current.weathercode,

//         feelsLike:
//           Math.round(
//             apparentTemperature
//           ),
//       });

//       setLocationName(
//         `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`
//       );

//     } catch (error) {

//       console.error(
//         "Weather fetch failed:",
//         error
//       );

//       setWeatherError(true);

//     } finally {

//       setWeatherLoading(false);

//     }
//   };


//   /* =========================================================
//      LOCATION SUCCESS
//      ========================================================= */

//   const handleLocationSuccess = (
//     position
//   ) => {

//     const lat =
//       position.coords.latitude;

//     const lon =
//       position.coords.longitude;

//     /* Weather */
//     fetchWeather(
//       lat,
//       lon
//     );

   
//   };


//   /* =========================================================
//      LOCATION ERROR
//      ========================================================= */

//   const handleLocationError = () => {

//     setLocationName(
//       "Kakinada, Andhra Pradesh"
//     );

//     /* Kakinada fallback */
//     const lat = 16.9891;
//     const lon = 82.2475;

//     fetchWeather(
//       lat,
//       lon
//     );

//   };


//   /* =========================================================
//      RETRY WEATHER
//      ========================================================= */

//   const retryWeather = () => {

//     if (navigator.geolocation) {

//       navigator.geolocation.getCurrentPosition(
//         handleLocationSuccess,
//         handleLocationError
//       );

//     } else {

//       handleLocationError();

//     }
//   };


//   /* =========================================================
//      SPRAY SAFETY
//      ========================================================= */

//   const isSafeToSpray = () => {

//     if (!weather) {
//       return false;
//     }

//     if (
//       Number(weather.wind) > 15 ||
//       Number(weather.rain_prob) > 50 ||
//       Number(weather.code) > 60
//     ) {

//       return false;
//     }

//     return true;
//   };


//   /* =========================================================
//      CROP GROWTH
//      ========================================================= */

//   const saveGrowth = async (
//     date,
//     crop
//   ) => {

//     try {

//       await api.post(
//         "/growth",
//         {
//           sowingDate: date,
//           crop,
//         }
//       );

//     } catch (error) {

//       console.error(
//         "Save growth error:",
//         error
//       );

//     }
//   };


//   const calculateCropStage = (
//     dateStr,
//     crop
//   ) => {

//     if (!dateStr) {

//       setCropStage(null);

//       return;
//     }

//     const start =
//       new Date(dateStr);

//     if (
//       Number.isNaN(
//         start.getTime()
//       )
//     ) {

//       setCropStage(null);

//       return;
//     }

//     const today =
//       new Date();

//     const diffTime =
//       Math.max(
//         0,
//         today.getTime() -
//           start.getTime()
//       );

//     const days =
//       Math.floor(
//         diffTime /
//           (1000 * 60 * 60 * 24)
//       );

//     const totalDays =
//       crop === "wheat"
//         ? 140
//         : 120;

//     const progress =
//       Math.min(
//         100,
//         Math.max(
//           0,
//           Math.round(
//             (days / totalDays) *
//               100
//           )
//         )
//       );

//     let stage = {
//       key: "germination",
//     };

//     if (progress >= 80) {

//       stage = {
//         key: "harvest",
//       };

//     } else if (progress >= 40) {

//       stage = {
//         key: "flowering",
//       };

//     } else if (progress >= 15) {

//       stage = {
//         key: "vegetative",
//       };

//     }

//     setCropStage({
//       days,
//       totalDays,
//       progress,
//       ...stage,
//     });
//   };


//   const fetchGrowth = async () => {

//     try {

//       const response =
//         await api.get(
//           "/growth"
//         );

//       if (
//         response.data?.sowingDate
//       ) {

//         const date =
//           response.data.sowingDate;

//         const crop =
//           response.data.crop ||
//           "rice";

//         setSowingDate(date);

//         setSelectedCrop(crop);

//         calculateCropStage(
//           date,
//           crop
//         );
//       }

//     } catch (error) {

//       console.error(
//         "Growth fetch error:",
//         error
//       );

//     }
//   };


//   const resetGrowth = async () => {

//     try {

//       await api.post(
//         "/growth",
//         {
//           sowingDate: "",
//           crop: "",
//         }
//       );

//       setSowingDate("");

//       setTempDate("");

//       setSelectedCrop(
//         "rice"
//       );

//       setCropStage(null);

//     } catch (error) {

//       console.error(
//         "Reset growth error:",
//         error
//       );

//     }
//   };


//   /* =========================================================
//      CROP TEXT
//      ========================================================= */

//   const getCropStageText = () => {

//     if (!cropStage?.key) {
//       return "Not Tracked";
//     }

//     const fallback = {

//       germination:
//         "Germination",

//       vegetative:
//         "Vegetative",

//       flowering:
//         "Flowering",

//       harvest:
//         "Harvest",

//     };

//     const translated =
//       t(cropStage.key);

//     if (
//       !translated ||
//       translated === cropStage.key
//     ) {

//       return fallback[
//         cropStage.key
//       ];
//     }

//     return translated;
//   };


//   const getCropAdvice = () => {

//     if (!cropStage?.key) {

//       return (
//         "Start tracking your crop to receive personalized advice."
//       );
//     }

//     const fallback = {

//       germination:
//         "Keep the soil adequately moist and monitor the young seedlings regularly.",

//       vegetative:
//         "Support healthy leaf and root growth with proper irrigation and nutrients.",

//       flowering:
//         "Monitor water, nutrients and weather conditions carefully during flowering.",

//       harvest:
//         "Check crop maturity and prepare for harvesting at the appropriate time.",

//     };

//     const key =
//       `advice_${cropStage.key}`;

//     const translated =
//       t(key);

//     if (
//       !translated ||
//       translated === key
//     ) {

//       return fallback[
//         cropStage.key
//       ];
//     }

//     return translated;
//   };


//   const getCropName = (
//     crop
//   ) => {

//     const translated =
//       t(`crop_names.${crop}`);

//     if (
//       !translated ||
//       translated ===
//         `crop_names.${crop}`
//     ) {

//       const names = {

//         rice: "Rice",

//         wheat: "Wheat",

//         maize: "Maize",

//         cotton: "Cotton",

//         tomato: "Tomato",

//         potato: "Potato",

//       };

//       return (
//         names[crop] ||
//         crop
//       );
//     }

//     return translated;
//   };


//   /* =========================================================
//      INITIAL LOAD
//      ========================================================= */

//   useEffect(() => {

//     fetchFarmerProfile();

//     fetchGrowth();

//     if (navigator.geolocation) {

//       navigator.geolocation.getCurrentPosition(
//         handleLocationSuccess,
//         handleLocationError
//       );

//     } else {

//       handleLocationError();

//     }

//   }, []);


//   /* =========================================================
//      UPDATE CROP STAGE
//      ========================================================= */

//   useEffect(() => {

//     if (sowingDate) {

//       calculateCropStage(
//         sowingDate,
//         selectedCrop
//       );

//     }

//   }, [
//     sowingDate,
//     selectedCrop,
//   ]);


//   /* =========================================================
//      DATA
//      ========================================================= */

//   const farmerName =
//     farmerProfile?.fullName ||
//     farmerProfile?.name ||
//     "Vyshnavi";


//   const stages = [

//     {
//       key: "germination",
//       label: "Germination",
//       progress: 10,
//     },

//     {
//       key: "vegetative",
//       label: "Vegetative",
//       progress: 40,
//     },

//     {
//       key: "flowering",
//       label: "Flowering",
//       progress: 70,
//     },

//     {
//       key: "harvest",
//       label: "Harvest",
//       progress: 100,
//     },

//   ];


//   /* =========================================================
//      RENDER
//      ========================================================= */

//   return (

//     <main
//       className={
//         styles.dashboard
//       }
//     >

//       {/* =====================================================
//           WELCOME BANNER
//           ===================================================== */}

//       <motion.section
//         className={
//           styles.welcome
//         }

//         initial={{
//           opacity: 0,
//           y: 10,
//         }}

//         animate={{
//           opacity: 1,
//           y: 0,
//         }}

//         transition={{
//           duration: 0.55,
//           ease: [
//             0.22,
//             1,
//             0.36,
//             1,
//           ],
//         }}
//       >

//         <img
//           src={
//             FarmDashboardBanner
//           }

//           alt="Farm landscape"

//           className={
//             styles.welcomeImage
//           }
//         />

//         <div
//           className={
//             styles.welcomeOverlay
//           }
//         />

//         <div
//           className={
//             styles.welcomeContent
//           }
//         >

//           <motion.h1
//             className={
//               styles.welcomeTitle
//             }

//             initial={{
//               opacity: 0,
//               x: -10,
//             }}

//             animate={{
//               opacity: 1,
//               x: 0,
//             }}

//             transition={{
//               delay: 0.12,
//               duration: 0.45,
//             }}
//           >

//             {getGreeting()},{" "}

//             <span
//               className={
//                 styles.name
//               }
//             >
//               {farmerName}!
//             </span>

//             <span
//               className={
//                 styles.plant
//               }
//             >
//               🌱
//             </span>

//           </motion.h1>


//           <motion.p
//             className={
//               styles.welcomeSubtitle
//             }

//             initial={{
//               opacity: 0,
//               x: -8,
//             }}

//             animate={{
//               opacity: 1,
//               x: 0,
//             }}

//             transition={{
//               delay: 0.2,
//               duration: 0.45,
//             }}
//           >

//             Here's what's happening
//             on your farm today.

//           </motion.p>

//         </div>

//       </motion.section>


//       {/* =====================================================
//           WEATHER + SPRAY GUIDANCE
//           ===================================================== */}

//       <motion.section
//         className={styles.weatherOuter}
//         id="weather-card"
//         data-tour="weather"
//         initial={{
//           opacity: 0,
//           y: 12,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           duration: 0.45,
//           delay: 0.12,
//         }}
//       >

//         {weatherLoading ? (

//           <div
//             className={
//               styles.weatherCard
//             }
//           >

//             <div
//               className={
//                 styles.weatherHeading
//               }
//             >

//               <h2>
//                 Weather Today
//               </h2>

//               <span
//                 className={
//                   styles.live
//                 }
//               >

//                 <span
//                   className={
//                     styles.liveDot
//                   }
//                 />

//                 Live

//               </span>

//             </div>


//             <div
//               className={
//                 styles.weatherContent
//               }
//             >

//               <div
//                 className={
//                   styles.weatherMain
//                 }
//               >

//                 <div
//                   className={
//                     styles.weatherIcon
//                   }
//                 >

//                   <Cloud
//                     size={50}
//                   />

//                 </div>


//                 <div>

//                   <div
//                     className={
//                       styles.temp
//                     }
//                   >
//                     --°C
//                   </div>

//                   <div
//                     className={
//                       styles.condition
//                     }
//                   >
//                     Loading...
//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         ) : weatherError ? (

//           <div
//             className={
//               styles.weatherError
//             }
//           >

//             <AlertCircle
//               size={19}
//             />

//             <span>
//               Unable to load weather.
//             </span>

//             <button
//               className={
//                 styles.retry
//               }

//               onClick={
//                 retryWeather
//               }
//             >
//               Retry
//             </button>

//           </div>

//         ) : (

//           <div className={styles.weatherRow}>

//             {/* WEATHER CARD */}

//             <div
//               className={
//                 styles.weatherCard
//               }
//             >

//               <div
//                 className={
//                   styles.weatherHeading
//                 }
//               >

//                 <h2>
//                   Weather Today
//                 </h2>

//                 <span
//                   className={
//                     styles.live
//                   }
//                 >

//                   <span
//                     className={
//                       styles.liveDot
//                     }
//                   />

//                   Live

//                 </span>

//               </div>


//               <div
//                 className={
//                   styles.weatherContent
//                 }
//               >

//                 <div
//                   className={
//                     styles.weatherMain
//                   }
//                 >

//                   <div
//                     className={
//                       styles.weatherIcon
//                     }
//                   >

//                     <WeatherIcon
//                       code={
//                         weather?.code
//                       }

//                       size={61}
//                     />

//                   </div>


//                   <div>

//                     <div
//                       className={
//                         styles.temp
//                       }
//                     >

//                       {weather?.temp ??
//                         "--"}
//                       °C

//                     </div>


//                     <div
//                       className={
//                         styles.condition
//                       }
//                     >

//                       {
//                         weather?.condition
//                       }

//                     </div>

//                   </div>

//                 </div>


//                 {/* HUMIDITY */}

//                 <div
//                   className={
//                     styles.weatherStat
//                   }
//                 >

//                   <div
//                     className={
//                       styles.weatherStatLabel
//                     }
//                   >

//                     <Droplets
//                       size={17}
//                     />

//                     Humidity

//                   </div>


//                   <div
//                     className={
//                       styles.weatherStatValue
//                     }
//                   >

//                     {
//                       weather?.humidity ??
//                       "--"
//                     }%

//                   </div>

//                 </div>


//                 {/* WIND */}

//                 <div
//                   className={
//                     styles.weatherStat
//                   }
//                 >

//                   <div
//                     className={
//                       styles.weatherStatLabel
//                     }
//                   >

//                     <Wind
//                       size={17}
//                     />

//                     Wind

//                   </div>


//                   <div
//                     className={
//                       styles.weatherStatValue
//                     }
//                   >

//                     {
//                       weather?.wind ??
//                       "--"
//                     } km/h

//                   </div>

//                 </div>


//                 {/* RAIN */}

//                 <div
//                   className={
//                     styles.weatherStat
//                   }
//                 >

//                   <div
//                     className={
//                       styles.weatherStatLabel
//                     }
//                   >

//                     <CloudRain
//                       size={17}
//                     />

//                     Rain Chance

//                   </div>


//                   <div
//                     className={
//                       styles.weatherStatValue
//                     }
//                   >

//                     {
//                       weather?.rain_prob ??
//                       0
//                     }%

//                   </div>

//                 </div>

//               </div>

//             </div>


//             {/* ================= NEW SPRAY GUIDANCE - MODERN BADGE STYLE ================= */}

//             {/* ================= SPRAY GUIDANCE - CLEAN & MINIMAL ================= */}

// <motion.div
//   className={`${styles.sprayBadge} ${
//     weather && isSafeToSpray()
//       ? styles.sprayBadgeSafe
//       : styles.sprayBadgeUnsafe
//   }`}
//   initial={{
//     opacity: 0,
//     y: 8,
//   }}
//   animate={{
//     opacity: 1,
//     y: 0,
//   }}
//   transition={{
//     duration: 0.4,
//     delay: 0.15,
//   }}
// >
//   {/* Header */}
//   <div className={styles.sprayBadgeHeader}>
//     <div className={styles.sprayBadgeHeaderIcon}>
//       <ShieldCheck size={12} />
//     </div>
//     <span className={styles.sprayBadgeHeaderTitle}>
//       Spray Status
//     </span>
//   </div>

//   {/* Body */}
//   <div className={styles.sprayBadgeBody}>
//     <div className={styles.sprayBadgeStatusIcon}>
//       {weather && isSafeToSpray() ? (
//         "✅"
//       ) : weather ? (
//         "❌"
//       ) : (
//         "⏳"
//       )}
//     </div>

//     <div className={styles.sprayBadgeBodyText}>
//       <div className={styles.sprayBadgeStatusText}>
//         {weather
//           ? isSafeToSpray()
//             ? "Safe to Spray"
//             : "Not Safe"
//           : "Checking..."}
//       </div>
//       <div className={styles.sprayBadgeDesc}>
//         {weather
//           ? isSafeToSpray()
//             ? "Perfect conditions today"
//             : "Weather not ideal"
//           : "Loading conditions..."}
//       </div>
//     </div>

//     <div className={styles.sprayBadgeIndicator} />
//   </div>
// </motion.div>

//           </div>

//         )}

//       </motion.section>


//       {/* =====================================================
//           MAIN CONTENT
//           ===================================================== */}

//       <section
//         className={
//           styles.mainGrid
//         }
//       >


//         {/* ===================================================
//             CROP TRACKER
//             =================================================== */}

//         <motion.section
//           className={`${styles.card} ${styles.cropCard}`}

//           id="crop-tracker"

//           data-tour="crop-tracker"

//           initial={{
//             opacity: 0,
//             y: 15,
//           }}

//           animate={{
//             opacity: 1,
//             y: 0,
//           }}

//           transition={{
//             duration: 0.45,
//             delay: 0.18,
//           }}
//         >

//           <div
//             className={
//               styles.cardHeader
//             }
//           >

//             <div
//               className={
//                 styles.headerIcon
//               }
//             >

//               <CalendarDays
//                 size={18}
//               />

//             </div>

//             <h2>
//               Crop Tracker
//             </h2>

//           </div>


//           <div
//             className={
//               styles.cropBody
//             }
//           >

//             {!sowingDate ? (

//               /* =============================================
//                  CROP SETUP
//                  ============================================= */

//               <div
//                 className={
//                   styles.cropSetup
//                 }
//               >

//                 <div
//                   className={
//                     styles.setupGrid
//                   }
//                 >

//                   <div
//                     className={
//                       styles.formGroup
//                     }
//                   >

//                     <label>
//                       Select Crop
//                     </label>

//                     <select
//                       value={
//                         selectedCrop
//                       }

//                       onChange={(e) =>
//                         setSelectedCrop(
//                           e.target.value
//                         )
//                       }
//                     >

//                       {crops.map(
//                         (crop) => (

//                           <option
//                             key={crop}
//                             value={crop}
//                           >
//                             {
//                               getCropName(
//                                 crop
//                               )
//                             }
//                           </option>

//                         )
//                       )}

//                     </select>

//                   </div>


//                   <div
//                     className={
//                       styles.formGroup
//                     }
//                   >

//                     <label>
//                       Enter Sowing Date
//                     </label>

//                     <input
//                       type="date"

//                       value={
//                         tempDate
//                       }

//                       max={
//                         new Date()
//                           .toISOString()
//                           .split("T")[0]
//                       }

//                       onChange={(e) =>
//                         setTempDate(
//                           e.target.value
//                         )
//                       }
//                     />

//                   </div>

//                 </div>


//                 <button
//                   className={
//                     styles.trackButton
//                   }

//                   disabled={
//                     !tempDate
//                   }

//                   onClick={() => {

//                     if (!tempDate)
//                       return;

//                     setSowingDate(
//                       tempDate
//                     );

//                     saveGrowth(
//                       tempDate,
//                       selectedCrop
//                     );

//                     setTempDate("");

//                   }}
//                 >

//                   <Sprout
//                     size={15}
//                   />

//                   Track Growth

//                 </button>

//               </div>

//             ) : (

//               /* =============================================
//                  TRACKED CROP
//                  ============================================= */

//               <>

//                 {/* CROP SUMMARY */}

//                 <div
//                   className={
//                     styles.cropSummary
//                   }
//                 >

//                   <div
//                     className={
//                       styles.activeCrop
//                     }
//                   >

//                     <div
//                       className={
//                         styles.cropIcon
//                       }
//                     >

//                       <Leaf
//                         size={31}
//                       />

//                     </div>


//                     <div>

//                       <span
//                         className={
//                           styles.label
//                         }
//                       >
//                         Active Crop
//                       </span>


//                       <strong
//                         className={
//                           styles.cropName
//                         }
//                       >

//                         {
//                           getCropName(
//                             selectedCrop
//                           )
//                         }

//                       </strong>

//                     </div>

//                   </div>


//                   {/* DAYS PASSED */}

//                   <div
//                     className={
//                       styles.days
//                     }
//                   >

//                     <span
//                       className={
//                         styles.label
//                       }
//                     >
//                       Days Passed
//                     </span>


//                     <strong>

//                       {
//                         cropStage?.days ||
//                         0
//                       }

//                       <small>
//                         {" "}days
//                       </small>

//                     </strong>


//                     <span
//                       className={
//                         styles.daysTotal
//                       }
//                     >

//                       ~
//                       {
//                         cropStage?.totalDays ||
//                         120
//                       }
//                       {" "}days total

//                     </span>

//                   </div>

//                 </div>


//                 {/* PROGRESS */}

//                 <div
//                   className={
//                     styles.progress
//                   }
//                 >

//                   <div
//                     className={
//                       styles.progressHeading
//                     }
//                   >

//                     <span>
//                       Current Stage:
//                     </span>

//                     <strong>
//                       {
//                         getCropStageText()
//                       }
//                     </strong>

//                   </div>


//                   <div
//                     className={
//                       styles.progressTrack
//                     }
//                   >

//                     <motion.div
//                       className={
//                         styles.progressFill
//                       }

//                       initial={{
//                         width: 0,
//                       }}

//                       animate={{
//                         width: `${ 
//                           cropStage?.progress ||
//                           0
//                         }%`,
//                       }}

//                       transition={{
//                         duration: 0.9,
//                         ease: "easeOut",
//                       }}
//                     />

//                   </div>


//                   <div
//                     className={
//                       styles.progressPercent
//                     }
//                   >

//                     {
//                       cropStage?.progress ||
//                       0
//                     }%

//                   </div>

//                 </div>


//                 {/* TIMELINE */}

//                 <div
//                   className={
//                     styles.timeline
//                   }
//                 >

//                   <div
//                     className={
//                       styles.timelineLine
//                     }
//                   />


//                   {stages.map(
//                     (stage) => {

//                       const completed =
//                         (
//                           cropStage?.progress ||
//                           0
//                         ) >=
//                         stage.progress;

//                       const active =
//                         cropStage?.key ===
//                         stage.key;


//                       return (

//                         <div
//                           key={
//                             stage.key
//                           }

//                           className={`
//                             ${styles.stage}
//                             ${
//                               completed
//                                 ? styles.completed
//                                 : ""
//                             }
//                             ${
//                               active
//                                 ? styles.active
//                                 : ""
//                             }
//                           `}
//                         >

//                           {
//                             stage.key ===
//                               "germination" ||
//                             stage.key ===
//                               "vegetative"
//                           ? (

//                             <div
//                               className={
//                                 styles.stageSprout
//                               }
//                             >

//                               <Sprout
//                                 size={31}
//                               />

//                             </div>

//                           ) : (

//                             <div
//                               className={
//                                 styles.stageDot
//                               }
//                             />

//                           )}


//                           <span>
//                             {
//                               stage.label
//                             }
//                           </span>

//                         </div>

//                       );

//                     }
//                   )}

//                 </div>


//                 {/* ADVICE */}

//                 <div
//                   className={
//                     styles.advice
//                   }
//                 >

//                   <div
//                     className={
//                       styles.adviceIcon
//                     }
//                   >

//                     <Sprout
//                       size={16}
//                     />

//                   </div>


//                   <div>

//                     <strong>
//                       Advice
//                     </strong>

//                     <p>
//                       {
//                         getCropAdvice()
//                       }
//                     </p>

//                   </div>

//                 </div>


//                 {/* RESET */}

//                 <div
//                   className={
//                     styles.resetWrapper
//                   }
//                 >

//                   <button
//                     className={
//                       styles.reset
//                     }

//                     onClick={
//                       resetGrowth
//                     }
//                   >

//                     <RotateCcw
//                       size={12}
//                     />

//                     Reset Tracker

//                   </button>

//                 </div>

//               </>

//             )}

//           </div>

//         </motion.section>


//         {/* ===================================================
//             FARM STATUS
//             =================================================== */}

//         <motion.section
//           className={`${styles.card} ${styles.statusCard}`}

//           initial={{
//             opacity: 0,
//             y: 15,
//           }}

//           animate={{
//             opacity: 1,
//             y: 0,
//           }}

//           transition={{
//             duration: 0.45,
//             delay: 0.23,
//           }}
//         >

//           <div
//             className={
//               styles.cardHeader
//             }
//           >

//             <div
//               className={
//                 styles.headerIcon
//               }
//             >

//               <ShieldCheck
//                 size={18}
//               />

//             </div>

//             <h2>
//               Farm Status
//             </h2>

//           </div>


//           <div
//             className={
//               styles.statusBody
//             }
//           >

//             {/* ACTIVE CROP */}

//             <div
//               className={
//                 styles.statusRow
//               }
//             >

//               <span
//                 className={
//                   styles.statusLabel
//                 }
//               >
//                 Active Crop
//               </span>


//               <div
//                 className={
//                   styles.statusValue
//                 }
//               >

//                 <strong>
//                   {
//                     getCropName(
//                       selectedCrop
//                     )
//                   }
//                 </strong>

//                 <span
//                   className={
//                     styles.activeBadge
//                   }
//                 >
//                   Active
//                 </span>

//               </div>

//             </div>


//             {/* CROP STAGE */}

//             <div
//               className={
//                 styles.statusRow
//               }
//             >

//               <span
//                 className={
//                   styles.statusLabel
//                 }
//               >
//                 Crop Stage
//               </span>


//               <div
//                 className={
//                   styles.statusValue
//                 }
//               >

//                 <strong>
//                   {
//                     cropStage
//                       ? getCropStageText()
//                       : "Not Tracked"
//                   }
//                 </strong>


//                 <Sprout
//                   size={21}
//                   color="#15933d"
//                 />

//               </div>

//             </div>


//             {/* WEATHER */}

//             <div
//               className={
//                 styles.statusRow
//               }
//             >

//               <span
//                 className={
//                   styles.statusLabel
//                 }
//               >
//                 Weather
//               </span>


//               <div
//                 className={
//                   styles.statusValue
//                 }
//               >

//                 <strong>
//                   {
//                     weather?.condition ||
//                     "--"
//                   }
//                 </strong>


//                 {weather && (

//                   <div
//                     className={
//                       styles.weatherStatusIcon
//                     }
//                   >

//                     <WeatherIcon
//                       code={
//                         weather.code
//                       }

//                       size={22}
//                     />

//                   </div>

//                 )}

//               </div>

//             </div>


//             {/* TEMPERATURE */}

//             <div
//               className={
//                 styles.statusRow
//               }
//             >

//               <span
//                 className={
//                   styles.statusLabel
//                 }
//               >
//                 Temperature
//               </span>


//               <div
//                 className={
//                   styles.statusValue
//                 }
//               >

//                 <strong>
//                   {
//                     weather?.temp ??
//                     "--"
//                   }°C
//                 </strong>


//                 <span
//                   className={
//                     styles.normalBadge
//                   }
//                 >
//                   Normal
//                 </span>

//               </div>

//             </div>


//             {/* SPRAY STATUS */}

//             <div
//               className={
//                 styles.statusRow
//               }
//             >

//               <span
//                 className={
//                   styles.statusLabel
//                 }
//               >
//                 Spray Status
//               </span>


//               <div
//                 className={
//                   styles.statusValue
//                 }
//               >

//                 <strong
//                   className={
//                     weather
//                       ? isSafeToSpray()
//                         ? styles.safe
//                         : styles.unsafe
//                       : ""
//                   }
//                 >

//                   {weather
//                     ? isSafeToSpray()
//                       ? "Safe to Spray"
//                       : "Unsafe to Spray"
//                     : "--"}

//                 </strong>


//                 <span
//                   className={
//                     styles.statusDot
//                   }

//                   style={{
//                     background:
//                       weather
//                         ? isSafeToSpray()
//                           ? "#07943c"
//                           : "#e03131"
//                         : "#aab2ad",
//                   }}
//                 />

//               </div>

//             </div>


//             {/* LOCATION */}

//             <div
//               className={
//                 styles.statusRow
//               }
//             >

//               <span
//                 className={
//                   styles.statusLabel
//                 }
//               >
//                 Location
//               </span>


//               <div
//                 className={
//                   styles.statusValue
//                 }
//               >

//                 <strong>
//                   {
//                     locationName
//                   }
//                 </strong>


//                 <MapPin
//                   size={20}
//                   color="#119d67"
//                 />

//               </div>

//             </div>

//           </div>

//         </motion.section>

//       </section>

//     </main>

//   );

// }






















import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import {
  AlertCircle,
  ArrowUpRight,
  CalendarDays,
  Cloud,
  CloudRain,
  CloudSun,
  Droplets,
  Leaf,
  MapPin,
  Navigation,
  RotateCcw,
  ShieldCheck,
  Sprout,
  Sun,
  Wind,
} from "lucide-react";

import api from "../api";
import FarmDashboardBanner from "../assets/FarmDashboardBanner.png";
import styles from "./Dashboard.module.css";


import Chatbot from "../components/Chatbot";

export default function Dashboard() {

  const { t } = useTranslation();

  // 👈 ADDED ref for crop tracker scrolling
  const cropTrackerRef = useRef(null);

  /* =========================================================
     FARMER
     ========================================================= */

  const [farmerProfile, setFarmerProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);


  /* =========================================================
     WEATHER
     ========================================================= */

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);

  const [locationName, setLocationName] = useState(
    "Kakinada, Andhra Pradesh"
  );


  /* =========================================================
     CROP TRACKER
     ========================================================= */

  const [sowingDate, setSowingDate] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("rice");
  const [cropStage, setCropStage] = useState(null);
  const [tempDate, setTempDate] = useState("");

  const crops = [
    "rice",
    "wheat",
    "maize",
    "cotton",
    "tomato",
    "potato",
  ];


  /* =========================================================
     TRANSLATION
     ========================================================= */

  const translate = (key, fallback) => {

    const value = t(key);

    if (!value || value === key) {
      return fallback;
    }

    return value;
  };


  /* =========================================================
     GREETING
     ========================================================= */

  const getGreeting = () => {

    const hour = new Date().getHours();

    if (hour < 12) {
      return translate(
        "good_morning",
        "Good Morning"
      );
    }

    if (hour < 17) {
      return translate(
        "good_afternoon",
        "Good Afternoon"
      );
    }

    if (hour < 21) {
      return translate(
        "good_evening",
        "Good Evening"
      );
    }

    return translate(
      "good_night",
      "Good Night"
    );
  };


  /* =========================================================
     FARMER PROFILE
     ========================================================= */

  const fetchFarmerProfile = async () => {

    try {

      setLoadingProfile(true);

      const response = await api.get("/farmer");

      if (response.data?.exists) {
        setFarmerProfile(
          response.data.profile
        );
      }

    } catch (error) {

      console.error(
        "Farmer profile error:",
        error
      );

    } finally {

      setLoadingProfile(false);

    }
  };


  /* =========================================================
     WEATHER CONDITION
     ========================================================= */

  const getWeatherCondition = (code) => {

    if (
      code === undefined ||
      code === null
    ) {
      return t('loading_weather');
    }

    if (code === 0) {
      return t('weather_clear');
    }

    if (code <= 3) {
      return t('weather_partly_cloudy');
    }

    if (code <= 48) {
      return t('weather_foggy');
    }

    if (code <= 67) {
      return t('weather_rainy');
    }

    if (code <= 77) {
      return t('weather_snowy');
    }

    if (code <= 82) {
      return t('weather_rain_showers');
    }

    if (code <= 86) {
      return t('weather_snow_showers');
    }

    return t('weather_thunderstorm');
  };


  /* =========================================================
     WEATHER ICON
     ========================================================= */

  const WeatherIcon = ({
    code,
    size = 58,
  }) => {

    if (code === 0) {

      return (
        <Sun
          size={size}
          strokeWidth={1.8}
          color="#F4B400"
        />
      );
    }

    if (code <= 3) {

      return (
        <CloudSun
          size={size}
          strokeWidth={1.8}
          color="#F4B400"
        />
      );
    }

    if (code <= 48) {

      return (
        <Cloud
          size={size}
          strokeWidth={1.8}
          color="#9AA4A0"
        />
      );
    }

    return (
      <CloudRain
        size={size}
        strokeWidth={1.8}
        color="#4E91C8"
      />
    );
  };


  /* =========================================================
     WEATHER API
     ========================================================= */

  const fetchWeather = async (
    lat,
    lon
  ) => {

    try {

      setWeatherLoading(true);
      setWeatherError(false);

      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}` +
        `&longitude=${lon}` +
        `&current_weather=true` +
        `&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,apparent_temperature` +
        `&timezone=auto`;

      const response =
        await fetch(url);

      if (!response.ok) {
        throw new Error(
          "Weather API failed"
        );
      }

      const data =
        await response.json();

      const current =
        data.current_weather;

      if (!current) {
        throw new Error(
          "Current weather unavailable"
        );
      }

      const humidity =
        data.hourly
          ?.relativehumidity_2m?.[0] ??
        null;

      const rainProbability =
        data.hourly
          ?.precipitation_probability?.[0] ??
        0;

      const apparentTemperature =
        data.hourly
          ?.apparent_temperature?.[0] ??
        Math.round(
          current.temperature
        );

      setWeather({

        temp:
          Math.round(
            current.temperature
          ),

        condition:
          getWeatherCondition(
            current.weathercode
          ),

        wind:
          Math.round(
            current.windspeed
          ),

        humidity,

        rain_prob:
          rainProbability,

        code:
          current.weathercode,

        feelsLike:
          Math.round(
            apparentTemperature
          ),
      });

      setLocationName(
        `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`
      );

    } catch (error) {

      console.error(
        "Weather fetch failed:",
        error
      );

      setWeatherError(true);

    } finally {

      setWeatherLoading(false);

    }
  };


  /* =========================================================
     LOCATION SUCCESS
     ========================================================= */

  const handleLocationSuccess = (
    position
  ) => {

    const lat =
      position.coords.latitude;

    const lon =
      position.coords.longitude;

    /* Weather */
    fetchWeather(
      lat,
      lon
    );

   
  };


  /* =========================================================
     LOCATION ERROR
     ========================================================= */

  const handleLocationError = () => {

    setLocationName(
      "Kakinada, Andhra Pradesh"
    );

    /* Kakinada fallback */
    const lat = 16.9891;
    const lon = 82.2475;

    fetchWeather(
      lat,
      lon
    );

  };


  /* =========================================================
     RETRY WEATHER
     ========================================================= */

  const retryWeather = () => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError
      );

    } else {

      handleLocationError();

    }
  };


  /* =========================================================
     SPRAY SAFETY
     ========================================================= */

  const isSafeToSpray = () => {

    if (!weather) {
      return false;
    }

    if (
      Number(weather.wind) > 15 ||
      Number(weather.rain_prob) > 50 ||
      Number(weather.code) > 60
    ) {

      return false;
    }

    return true;
  };


  /* =========================================================
     CROP GROWTH
     ========================================================= */

  const saveGrowth = async (
    date,
    crop
  ) => {

    try {

      await api.post(
        "/growth",
        {
          sowingDate: date,
          crop,
        }
      );

    } catch (error) {

      console.error(
        "Save growth error:",
        error
      );

    }
  };


  const calculateCropStage = (
    dateStr,
    crop
  ) => {

    if (!dateStr) {

      setCropStage(null);

      return;
    }

    const start =
      new Date(dateStr);

    if (
      Number.isNaN(
        start.getTime()
      )
    ) {

      setCropStage(null);

      return;
    }

    const today =
      new Date();

    const diffTime =
      Math.max(
        0,
        today.getTime() -
          start.getTime()
      );

    const days =
      Math.floor(
        diffTime /
          (1000 * 60 * 60 * 24)
      );

    const totalDays =
      crop === "wheat"
        ? 140
        : 120;

    const progress =
      Math.min(
        100,
        Math.max(
          0,
          Math.round(
            (days / totalDays) *
              100
          )
        )
      );

    let stage = {
      key: "germination",
    };

    if (progress >= 80) {

      stage = {
        key: "harvest",
      };

    } else if (progress >= 40) {

      stage = {
        key: "flowering",
      };

    } else if (progress >= 15) {

      stage = {
        key: "vegetative",
      };

    }

    setCropStage({
      days,
      totalDays,
      progress,
      ...stage,
    });
  };


  const fetchGrowth = async () => {

    try {

      const response =
        await api.get(
          "/growth"
        );

      if (
        response.data?.sowingDate
      ) {

        const date =
          response.data.sowingDate;

        const crop =
          response.data.crop ||
          "rice";

        setSowingDate(date);

        setSelectedCrop(crop);

        calculateCropStage(
          date,
          crop
        );
      }

    } catch (error) {

      console.error(
        "Growth fetch error:",
        error
      );

    }
  };


  const resetGrowth = async () => {

    try {

      await api.post(
        "/growth",
        {
          sowingDate: "",
          crop: "",
        }
      );

      setSowingDate("");

      setTempDate("");

      setSelectedCrop(
        "rice"
      );

      setCropStage(null);

    } catch (error) {

      console.error(
        "Reset growth error:",
        error
      );

    }
  };


  /* =========================================================
     CROP TEXT
     ========================================================= */

  const getCropStageText = () => {

    if (!cropStage?.key) {
      return t('not_tracked');
    }

    const fallback = {

      germination:
        t('germination'),

      vegetative:
        t('vegetative'),

      flowering:
        t('flowering'),

      harvest:
        t('harvest'),

    };

    const translated =
      t(cropStage.key);

    if (
      !translated ||
      translated === cropStage.key
    ) {

      return fallback[
        cropStage.key
      ];
    }

    return translated;
  };


  const getCropAdvice = () => {

    if (!cropStage?.key) {

      return t('start_tracking_advice');
    }

    const fallback = {

      germination:
        t('germination_advice'),

      vegetative:
        t('vegetative_advice'),

      flowering:
        t('flowering_advice'),

      harvest:
        t('harvest_advice'),

    };

    const key =
      `advice_${cropStage.key}`;

    const translated =
      t(key);

    if (
      !translated ||
      translated === key
    ) {

      return fallback[
        cropStage.key
      ];
    }

    return translated;
  };


  const getCropName = (
    crop
  ) => {

    const translated =
      t(`crop_names.${crop}`);

    if (
      !translated ||
      translated ===
        `crop_names.${crop}`
    ) {

      const names = {

        rice: "Rice",

        wheat: "Wheat",

        maize: "Maize",

        cotton: "Cotton",

        tomato: "Tomato",

        potato: "Potato",

      };

      return (
        names[crop] ||
        crop
      );
    }

    return translated;
  };


  /* =========================================================
     INITIAL LOAD
     ========================================================= */

  useEffect(() => {

    fetchFarmerProfile();

    fetchGrowth();

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError
      );

    } else {

      handleLocationError();

    }

  }, []);


  /* =========================================================
     UPDATE CROP STAGE
     ========================================================= */

  useEffect(() => {

    if (sowingDate) {

      calculateCropStage(
        sowingDate,
        selectedCrop
      );

    }

  }, [
    sowingDate,
    selectedCrop,
  ]);


  /* =========================================================
     DATA
     ========================================================= */

  const farmerName =
    farmerProfile?.fullName ||
    farmerProfile?.name ||
    "Vyshnavi";


  const stages = [

    {
      key: "germination",
      label: t('germination'),
      progress: 10,
    },

    {
      key: "vegetative",
      label: t('vegetative'),
      progress: 40,
    },

    {
      key: "flowering",
      label: t('flowering'),
      progress: 70,
    },

    {
      key: "harvest",
      label: t('harvest'),
      progress: 100,
    },

  ];


  /* =========================================================
     RENDER
     ========================================================= */

  return (

    <main
      className={
        styles.dashboard
      }
    >

      {/* =====================================================
          WELCOME BANNER
          ===================================================== */}

      <motion.section
        className={
          styles.welcome
        }

        initial={{
          opacity: 0,
          y: 10,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.55,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
      >

        <img
          src={
            FarmDashboardBanner
          }

          alt={t('farm_landscape')}

          className={
            styles.welcomeImage
          }
        />

        <div
          className={
            styles.welcomeOverlay
          }
        />

        <div
          className={
            styles.welcomeContent
          }
        >

          <motion.h1
            className={
              styles.welcomeTitle
            }

            initial={{
              opacity: 0,
              x: -10,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              delay: 0.12,
              duration: 0.45,
            }}
          >

            {getGreeting()},{" "}

            <span
              className={
                styles.name
              }
            >
              {farmerName}!
            </span>

            <span
              className={
                styles.plant
              }
            >
              🌱
            </span>

          </motion.h1>


          <motion.p
            className={
              styles.welcomeSubtitle
            }

            initial={{
              opacity: 0,
              x: -8,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              delay: 0.2,
              duration: 0.45,
            }}
          >

            {t('dashboard_subtitle')}

          </motion.p>

        </div>

      </motion.section>


      {/* =====================================================
          WEATHER + SPRAY GUIDANCE
          ===================================================== */}

      <motion.section
        className={styles.weatherOuter}
        id="weather-card"
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          delay: 0.12,
        }}
      >

        {weatherLoading ? (

          <div
            className={styles.weatherCard}
            data-tour="weather-card"
          >
            <div
              className={
                styles.weatherHeading
              }
            >

              <h2>
                {t('weather_today')}
              </h2>

              <span
                className={
                  styles.live
                }
              >

                <span
                  className={
                    styles.liveDot
                  }
                />

                {t('live')}

              </span>

            </div>


            <div
              className={
                styles.weatherContent
              }
            >

              <div
                className={
                  styles.weatherMain
                }
              >

                <div
                  className={
                    styles.weatherIcon
                  }
                >

                  <Cloud
                    size={50}
                  />

                </div>


                <div>

                  <div
                    className={
                      styles.temp
                    }
                  >
                    --°C
                  </div>

                  <div
                    className={
                      styles.condition
                    }
                  >
                    {t('loading')}...
                  </div>

                </div>

              </div>

            </div>

          </div>

        ) : weatherError ? (

          <div
            className={
              styles.weatherError
            }
          >

            <AlertCircle
              size={19}
            />

            <span>
              {t('unable_to_load_weather')}
            </span>

            <button
              className={
                styles.retry
              }

              onClick={
                retryWeather
              }
            >
              {t('retry')}
            </button>

          </div>

        ) : (

          <div className={styles.weatherRow}>

            {/* WEATHER CARD */}

            <div
              className={styles.weatherCard}
              data-tour="weather-card"
            >

              <div
                className={
                  styles.weatherHeading
                }
              >

                <h2>
                  {t('weather_today')}
                </h2>

                <span
                  className={
                    styles.live
                  }
                >

                  <span
                    className={
                      styles.liveDot
                    }
                  />

                  {t('live')}

                </span>

              </div>


              <div
                className={
                  styles.weatherContent
                }
              >

                <div
                  className={
                    styles.weatherMain
                  }
                >

                  <div
                    className={
                      styles.weatherIcon
                    }
                  >

                    <WeatherIcon
                      code={
                        weather?.code
                      }

                      size={61}
                    />

                  </div>


                  <div>

                    <div
                      className={
                        styles.temp
                      }
                    >

                      {weather?.temp ??
                        "--"}
                      °C

                    </div>


                    <div
                      className={
                        styles.condition
                      }
                    >

                      {
                        weather?.condition
                      }

                    </div>

                  </div>

                </div>


                {/* HUMIDITY */}

                <div
                  className={
                    styles.weatherStat
                  }
                >

                  <div
                    className={
                      styles.weatherStatLabel
                    }
                  >

                    <Droplets
                      size={17}
                    />

                    {t('humidity')}

                  </div>


                  <div
                    className={
                      styles.weatherStatValue
                    }
                  >

                    {
                      weather?.humidity ??
                      "--"
                    }%

                  </div>

                </div>


                {/* WIND */}

                <div
                  className={
                    styles.weatherStat
                  }
                >

                  <div
                    className={
                      styles.weatherStatLabel
                    }
                  >

                    <Wind
                      size={17}
                    />

                    {t('wind')}

                  </div>


                  <div
                    className={
                      styles.weatherStatValue
                    }
                  >

                    {
                      weather?.wind ??
                      "--"
                    } km/h

                  </div>

                </div>


                {/* RAIN */}

                <div
                  className={
                    styles.weatherStat
                  }
                >

                  <div
                    className={
                      styles.weatherStatLabel
                    }
                  >

                    <CloudRain
                      size={17}
                    />

                    {t('rain_chance')}

                  </div>


                  <div
                    className={
                      styles.weatherStatValue
                    }
                  >

                    {
                      weather?.rain_prob ??
                      0
                    }%

                  </div>

                </div>

              </div>

            </div>


            {/* ================= SPRAY GUIDANCE ================= */}

            <motion.div
              className={`${styles.sprayBadge} ${
                weather && isSafeToSpray()
                  ? styles.sprayBadgeSafe
                  : styles.sprayBadgeUnsafe
              }`}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.15,
              }}
            >
              {/* Header */}
              <div className={styles.sprayBadgeHeader}>
                <div className={styles.sprayBadgeHeaderIcon}>
                  <ShieldCheck size={12} />
                </div>
                <span className={styles.sprayBadgeHeaderTitle}>
                  {t('spray_status')}
                </span>
              </div>

              {/* Body */}
              <div className={styles.sprayBadgeBody}>
                <div className={styles.sprayBadgeStatusIcon}>
                  {weather && isSafeToSpray() ? (
                    "✅"
                  ) : weather ? (
                    "❌"
                  ) : (
                    "⏳"
                  )}
                </div>

                <div className={styles.sprayBadgeBodyText}>
                  <div className={styles.sprayBadgeStatusText}>
                    {weather
                      ? isSafeToSpray()
                        ? t('safe_to_spray')
                        : t('not_safe')
                      : t('checking')}
                  </div>
                  <div className={styles.sprayBadgeDesc}>
                    {weather
                      ? isSafeToSpray()
                        ? t('perfect_conditions')
                        : t('weather_not_ideal')
                      : t('loading_conditions')}
                  </div>
                </div>

                <div className={styles.sprayBadgeIndicator} />
              </div>
            </motion.div>

          </div>

        )}

      </motion.section>


      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <section
        className={
          styles.mainGrid
        }
      >


        {/* ===================================================
            CROP TRACKER
            =================================================== */}

        <motion.section
          ref={cropTrackerRef}  // 👈 ADDED ref
          className={`${styles.card} ${styles.cropCard}`}

          id="crop-tracker"

          data-tour="crop-tracker"

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.45,
            delay: 0.18,
          }}
        >

          <div
            className={
              styles.cardHeader
            }
          >

            <div
              className={
                styles.headerIcon
              }
            >

              <CalendarDays
                size={18}
              />

            </div>

            <h2>
              {t('crop_tracker')}
            </h2>

          </div>


          <div
            className={
              styles.cropBody
            }
          >

            {!sowingDate ? (

              /* =============================================
                 CROP SETUP
                 ============================================= */

              <div
                className={
                  styles.cropSetup
                }
              >

                <div
                  className={
                    styles.setupGrid
                  }
                >

                  <div
                    className={
                      styles.formGroup
                    }
                  >

                    <label>
                      {t('select_crop')}
                    </label>

                    <select
                      value={
                        selectedCrop
                      }

                      onChange={(e) =>
                        setSelectedCrop(
                          e.target.value
                        )
                      }
                    >

                      {crops.map(
                        (crop) => (

                          <option
                            key={crop}
                            value={crop}
                          >
                            {
                              getCropName(
                                crop
                              )
                            }
                          </option>

                        )
                      )}

                    </select>

                  </div>


                  <div
                    className={
                      styles.formGroup
                    }
                  >

                    <label>
                      {t('enter_sowing_date')}
                    </label>

                    <input
                      type="date"

                      value={
                        tempDate
                      }

                      max={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }

                      onChange={(e) =>
                        setTempDate(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>


                <button
                  className={
                    styles.trackButton
                  }

                  disabled={
                    !tempDate
                  }

                  onClick={() => {

                    if (!tempDate)
                      return;

                    setSowingDate(
                      tempDate
                    );

                    saveGrowth(
                      tempDate,
                      selectedCrop
                    );

                    setTempDate("");

                  }}
                >

                  <Sprout
                    size={15}
                  />

                  {t('track_growth')}

                </button>

              </div>

            ) : (

              /* =============================================
                 TRACKED CROP
                 ============================================= */

              <>

                {/* CROP SUMMARY */}

                <div
                  className={
                    styles.cropSummary
                  }
                >

                  <div
                    className={
                      styles.activeCrop
                    }
                  >

                    <div
                      className={
                        styles.cropIcon
                      }
                    >

                      <Leaf
                        size={31}
                      />

                    </div>


                    <div>

                      <span
                        className={
                          styles.label
                        }
                      >
                        {t('active_crop')}
                      </span>


                      <strong
                        className={
                          styles.cropName
                        }
                      >

                        {
                          getCropName(
                            selectedCrop
                          )
                        }

                      </strong>

                    </div>

                  </div>


                  {/* DAYS PASSED */}

                  <div
                    className={
                      styles.days
                    }
                  >

                    <span
                      className={
                        styles.label
                      }
                    >
                      {t('days_passed')}
                    </span>


                    <strong>

                      {
                        cropStage?.days ||
                        0
                      }

                      <small>
                        {" "}{t('days')}
                      </small>

                    </strong>


                    <span
                      className={
                        styles.daysTotal
                      }
                    >

                      ~
                      {
                        cropStage?.totalDays ||
                        120
                      }
                      {" "}{t('days_total')}

                    </span>

                  </div>

                </div>


                {/* PROGRESS */}

                <div
                  className={
                    styles.progress
                  }
                >

                  <div
                    className={
                      styles.progressHeading
                    }
                  >

                    <span>
                      {t('current_stage')}
                    </span>

                    <strong>
                      {
                        getCropStageText()
                      }
                    </strong>

                  </div>


                  <div
                    className={
                      styles.progressTrack
                    }
                  >

                    <motion.div
                      className={
                        styles.progressFill
                      }

                      initial={{
                        width: 0,
                      }}

                      animate={{
                        width: `${ 
                          cropStage?.progress ||
                          0
                        }%`,
                      }}

                      transition={{
                        duration: 0.9,
                        ease: "easeOut",
                      }}
                    />

                  </div>


                  <div
                    className={
                      styles.progressPercent
                    }
                  >

                    {
                      cropStage?.progress ||
                      0
                    }%

                  </div>

                </div>


                {/* TIMELINE */}

                <div
                  className={
                    styles.timeline
                  }
                >

                  <div
                    className={
                      styles.timelineLine
                    }
                  />


                  {stages.map(
                    (stage) => {

                      const completed =
                        (
                          cropStage?.progress ||
                          0
                        ) >=
                        stage.progress;

                      const active =
                        cropStage?.key ===
                        stage.key;


                      return (

                        <div
                          key={
                            stage.key
                          }

                          className={`
                            ${styles.stage}
                            ${
                              completed
                                ? styles.completed
                                : ""
                            }
                            ${
                              active
                                ? styles.active
                                : ""
                            }
                          `}
                        >

                          {
                            stage.key ===
                              "germination" ||
                            stage.key ===
                              "vegetative"
                          ? (

                            <div
                              className={
                                styles.stageSprout
                              }
                            >

                              <Sprout
                                size={31}
                              />

                            </div>

                          ) : (

                            <div
                              className={
                                styles.stageDot
                              }
                            />

                          )}


                          <span>
                            {
                              stage.label
                            }
                          </span>

                        </div>

                      );

                    }
                  )}

                </div>


                {/* ADVICE */}

                <div
                  className={
                    styles.advice
                  }
                >

                  <div
                    className={
                      styles.adviceIcon
                    }
                  >

                    <Sprout
                      size={16}
                    />

                  </div>


                  <div>

                    <strong>
                      {t('advice')}
                    </strong>

                    <p>
                      {
                        getCropAdvice()
                      }
                    </p>

                  </div>

                </div>


                {/* RESET */}

                <div
                  className={
                    styles.resetWrapper
                  }
                >

                  <button
                    className={
                      styles.reset
                    }

                    onClick={
                      resetGrowth
                    }
                  >

                    <RotateCcw
                      size={12}
                    />

                    {t('reset_tracker')}

                  </button>

                </div>

              </>

            )}

          </div>

        </motion.section>


        {/* ===================================================
            FARM STATUS
            =================================================== */}

        <motion.section
          className={`${styles.card} ${styles.statusCard}`}

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.45,
            delay: 0.23,
          }}
        >

          <div
            className={
              styles.cardHeader
            }
          >

            <div
              className={
                styles.headerIcon
              }
            >

              <ShieldCheck
                size={18}
              />

            </div>

            <h2>
              {t('farm_status')}
            </h2>

          </div>


          <div
            className={
              styles.statusBody
            }
          >

            {/* ACTIVE CROP */}

            <div
              className={
                styles.statusRow
              }
            >

              <span
                className={
                  styles.statusLabel
                }
              >
                {t('active_crop')}
              </span>


              <div
                className={
                  styles.statusValue
                }
              >

                <strong>
                  {
                    getCropName(
                      selectedCrop
                    )
                  }
                </strong>

                <span
                  className={
                    styles.activeBadge
                  }
                >
                  {t('active')}
                </span>

              </div>

            </div>


            {/* CROP STAGE */}

            <div
              className={
                styles.statusRow
              }
            >

              <span
                className={
                  styles.statusLabel
                }
              >
                {t('crop_stage')}
              </span>


              <div
                className={
                  styles.statusValue
                }
              >

                <strong>
                  {
                    cropStage
                      ? getCropStageText()
                      : t('not_tracked')
                  }
                </strong>


                <Sprout
                  size={21}
                  color="#15933d"
                />

              </div>

            </div>


            {/* WEATHER */}

            <div
              className={
                styles.statusRow
              }
            >

              <span
                className={
                  styles.statusLabel
                }
              >
                {t('weather')}
              </span>


              <div
                className={
                  styles.statusValue
                }
              >

                <strong>
                  {
                    weather?.condition ||
                    "--"
                  }
                </strong>


                {weather && (

                  <div
                    className={
                      styles.weatherStatusIcon
                    }
                  >

                    <WeatherIcon
                      code={
                        weather.code
                      }

                      size={22}
                    />

                  </div>

                )}

              </div>

            </div>


            {/* TEMPERATURE */}

            <div
              className={
                styles.statusRow
              }
            >

              <span
                className={
                  styles.statusLabel
                }
              >
                {t('temperature')}
              </span>


              <div
                className={
                  styles.statusValue
                }
              >

                <strong>
                  {
                    weather?.temp ??
                    "--"
                  }°C
                </strong>


                <span
                  className={
                    styles.normalBadge
                  }
                >
                  {t('normal')}
                </span>

              </div>

            </div>


            {/* SPRAY STATUS */}

            <div
              className={
                styles.statusRow
              }
            >

              <span
                className={
                  styles.statusLabel
                }
              >
                {t('spray_status')}
              </span>


              <div
                className={
                  styles.statusValue
                }
              >

                <strong
                  className={
                    weather
                      ? isSafeToSpray()
                        ? styles.safe
                        : styles.unsafe
                      : ""
                  }
                >

                  {weather
                    ? isSafeToSpray()
                      ? t('safe_to_spray')
                      : t('unsafe_to_spray')
                    : "--"}

                </strong>


                <span
                  className={
                    styles.statusDot
                  }

                  style={{
                    background:
                      weather
                        ? isSafeToSpray()
                          ? "#07943c"
                          : "#e03131"
                        : "#aab2ad",
                  }}
                />

              </div>

            </div>


            {/* LOCATION */}

            <div
              className={
                styles.statusRow
              }
            >

              <span
                className={
                  styles.statusLabel
                }
              >
                {t('location')}
              </span>


              <div
                className={
                  styles.statusValue
                }
              >

                <strong>
                  {
                    locationName
                  }
                </strong>


                <MapPin
                  size={20}
                  color="#119d67"
                />

              </div>

            </div>

          </div>

        </motion.section>

      </section>


  <Chatbot />
    </main>

  );

}