// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Sprout, Droplets, Thermometer, Wind, Beaker, ArrowRight, Loader2, Cloud } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import api from '../api';
// import { toast } from 'react-toastify';

// export default function CropRecommend() {
//     const { t } = useTranslation();
//     const [formData, setFormData] = useState({
//         N: 90, P: 42, K: 43,
//         temperature: 20, humidity: 82, ph: 6, rainfall: 202
//     });
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);
//     const [fetchingWeather, setFetchingWeather] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const { data } = await api.post('/ml/recommend', formData);
//             setTimeout(() => {
//                 setResult(data.recommended_crop);
//                 setLoading(false);
//             }, 1000);
//         } catch (err) {
//             toast.error(t('recommendation_failed'));
//             setLoading(false);
//         }
//     };

//     const fetchCurrentWeather = () => {
//         if (!navigator.geolocation) {
//             toast.error(t('location_not_supported'));
//             return;
//         }
//         setFetchingWeather(true);
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//             try {
//                 const { latitude, longitude } = pos.coords;
//                 const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`);
//                 const data = await res.json();

//                 setFormData(prev => ({
//                     ...prev,
//                     temperature: Math.round(data.current_weather.temperature),
//                     humidity: data.hourly.relativehumidity_2m[0],
//                     rainfall: 100 // Default avg as API doesn't give historical rainfall easily
//                 }));
//                 toast.success(t('loading_weather'));
//             } catch (e) {
//                 toast.error(t('weather_fetch_failed'));
//             } finally {
//                 setFetchingWeather(false);
//             }
//         });
//     };

//     return (
//         <div className="max-w-4xl mx-auto space-y-8">
//             <div className="text-center space-y-2">
//                 <h1 className="text-3xl font-bold text-gray-800">{t('crop_consult')}</h1>
//                 <p className="text-gray-500">{t('crop_consult_desc')}</p>
//             </div>

//             <div className="glass-card bg-white/80 md:p-10">
//                 <form onSubmit={handleSubmit} className="space-y-8">
//                     {/* Section 1: Soil Data */}
//                     <div>
//                         <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
//                             <Beaker size={20} /> {t('soil_composition')}
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <Input label={t('nitrogen_label')} value={formData.N} onChange={v => setFormData({ ...formData, N: v })} />
//                             <Input label={t('phosphorus_label')} value={formData.P} onChange={v => setFormData({ ...formData, P: v })} />
//                             <Input label={t('potassium_label')} value={formData.K} onChange={v => setFormData({ ...formData, K: v })} />
//                             <Input label={t('ph_level_label')} value={formData.ph} onChange={v => setFormData({ ...formData, ph: v })} step="0.1" />
//                         </div>
//                     </div>

//                     <hr className="border-gray-100" />

//                     {/* Section 2: Environment */}
//                     <div>
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="flex items-center gap-2 text-lg font-semibold text-secondary">
//                                 <Cloud size={20} /> {t('environmental_factors')}
//                             </h3>
//                             <button
//                                 type="button"
//                                 onClick={fetchCurrentWeather}
//                                 className="text-xs flex items-center gap-1 text-primary hover:underline disabled:opacity-50"
//                                 disabled={fetchingWeather}
//                             >
//                                 {fetchingWeather ? <Loader2 size={12} className="animate-spin" /> : <Cloud size={12} />}
//                                 {t('fetch_weather')}
//                             </button>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <Input label={t('temperature_label')} value={formData.temperature} onChange={v => setFormData({ ...formData, temperature: v })} icon={<Thermometer size={16} />} />
//                             <Input label={t('humidity_label')} value={formData.humidity} onChange={v => setFormData({ ...formData, humidity: v })} icon={<Droplets size={16} />} />
//                             <Input label={t('rainfall_label')} value={formData.rainfall} onChange={v => setFormData({ ...formData, rainfall: v })} icon={<Wind size={16} />} />
//                         </div>
//                     </div>

//                     <div className="flex justify-end pt-4">
//                         <button
//                             disabled={loading}
//                             className="btn-primary w-full md:w-auto px-8 py-3 text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
//                         >
//                             {loading ? <Loader2 className="animate-spin" /> : <>{t('analyze')} <ArrowRight /></>}
//                         </button>
//                     </div>
//                 </form>
//             </div>

//             {/* Result Modal/Overlay */}
//             <AnimatePresence>
//                 {result && (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
//                         onClick={() => setResult(null)}
//                     >
//                         <motion.div
//                             className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
//                             onClick={e => e.stopPropagation()}
//                         >
//                             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
//                             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                                 <Sprout size={40} />
//                             </div>
//                             <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{t('result')}</h2>
//                             <h3 className="text-4xl font-extrabold text-gray-800 mb-6 capitalize">{result}</h3>

//                             <p className="text-gray-500 mb-8">{t('best_fitted_crop')}</p>

//                             <button onClick={() => setResult(null)} className="w-full btn-secondary">
//                                 {t('close')}
//                             </button>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }

// function Input({ label, value, onChange, type = "number", step = "1", icon }) {
//     return (
//         <div className="relative group">
//             <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">{label}</label>
//             <div className="relative">
//                 <input
//                     type={type}
//                     value={value}
//                     step={step}
//                     onChange={e => onChange(Number(e.target.value))}
//                     className="input-field pl-4 font-mono text-lg font-medium"
//                 />
//                 {icon && <div className="absolute right-4 top-3.5 text-gray-400 opacity-50">{icon}</div>}
//             </div>
//         </div>
//     );
// }






// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Sprout, Loader2, Cloud, Beaker, ArrowRight } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import api from '../api';
// import { toast } from 'react-toastify';

// export default function CropRecommend() {
//     const { t } = useTranslation();

//     const [formData, setFormData] = useState({
//         N: 90,
//         P: 42,
//         K: 43,
//         temperature: 20,
//         humidity: 82,
//         ph: 6,
//         rainfall: 202
//     });

//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);
//     const [fetchingWeather, setFetchingWeather] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const { data } = await api.post('/ml/recommend', formData);

//             setTimeout(() => {
//                 setResult(data.top_3_recommendations);
//                 setLoading(false);
//             }, 800);

//         } catch (err) {
//             toast.error("Recommendation failed");
//             setLoading(false);
//         }
//     };

//     const fetchCurrentWeather = () => {
//         if (!navigator.geolocation) {
//             toast.error("Geolocation not supported");
//             return;
//         }

//         setFetchingWeather(true);

//         navigator.geolocation.getCurrentPosition(async (pos) => {
//             try {
//                 const { latitude, longitude } = pos.coords;

//                 const res = await fetch(
//                     `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`
//                 );

//                 const data = await res.json();

//                 setFormData(prev => ({
//                     ...prev,
//                     temperature: Math.round(data.current_weather.temperature),
//                     humidity: data.hourly.relativehumidity_2m[0]
//                     // Rainfall is NOT overridden
//                 }));

//                 toast.success("Weather updated successfully");

//             } catch (e) {
//                 toast.error("Weather fetch failed");
//             } finally {
//                 setFetchingWeather(false);
//             }
//         });
//     };

//     return (
//         <div className="max-w-4xl mx-auto space-y-8">

//             {/* Header */}
//             <div className="text-center space-y-2">
//                 <h1 className="text-3xl font-bold text-gray-800">
//                     Smart Crop Recommendation
//                 </h1>
//                 <p className="text-gray-500">
//                     Get AI-powered crop suggestions based on soil and climate.
//                 </p>
//             </div>

//             {/* Form Card */}
//             <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8">

//                 <form onSubmit={handleSubmit} className="space-y-8">

//                     {/* Soil Section */}
//                     <div>
//                         <h3 className="flex items-center gap-2 text-lg font-semibold text-green-600 mb-4">
//                             <Beaker size={20} /> Soil Composition
//                         </h3>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <Input label="Nitrogen (N)" value={formData.N} onChange={v => setFormData({ ...formData, N: v })} />
//                             <Input label="Phosphorus (P)" value={formData.P} onChange={v => setFormData({ ...formData, P: v })} />
//                             <Input label="Potassium (K)" value={formData.K} onChange={v => setFormData({ ...formData, K: v })} />
//                             <Input label="pH Level" value={formData.ph} onChange={v => setFormData({ ...formData, ph: v })} step="0.1" />
//                         </div>
//                     </div>

//                     {/* Environment Section */}
//                     <div>
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-600">
//                                 <Cloud size={20} /> Environmental Factors
//                             </h3>

//                             <button
//                                 type="button"
//                                 onClick={fetchCurrentWeather}
//                                 disabled={fetchingWeather}
//                                 className="text-sm text-green-600 hover:underline flex items-center gap-1"
//                             >
//                                 {fetchingWeather ? <Loader2 size={14} className="animate-spin" /> : <Cloud size={14} />}
//                                 Fetch Weather
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <Input label="Temperature (°C)" value={formData.temperature} onChange={v => setFormData({ ...formData, temperature: v })} />
//                             <Input label="Humidity (%)" value={formData.humidity} onChange={v => setFormData({ ...formData, humidity: v })} />
//                             <Input label="Rainfall (mm)" value={formData.rainfall} onChange={v => setFormData({ ...formData, rainfall: v })} />
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="flex justify-end">
//                         <button
//                             disabled={loading}
//                             className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg hover:opacity-90 transition flex items-center gap-2"
//                         >
//                             {loading ? <Loader2 className="animate-spin" /> : <>Analyze <ArrowRight size={18} /></>}
//                         </button>
//                     </div>

//                 </form>
//             </div>

//             {/* ========================= */}
//             {/* Premium Result Modal */}
//             {/* ========================= */}
//             <AnimatePresence>
//                 {result && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
//                         onClick={() => setResult(null)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.8, y: 40 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.8, y: 40 }}
//                             transition={{ duration: 0.4 }}
//                             className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]"
//                             onClick={e => e.stopPropagation()}
//                         >
//                             {/* Top Gradient Strip */}
//                             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 rounded-t-3xl"></div>

//                             {/* Icon */}
//                             <div className="flex justify-center mb-6 mt-4">
//                                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//                                     <Sprout size={40} className="text-green-600" />
//                                 </div>
//                             </div>

//                             <h2 className="text-center text-gray-400 uppercase text-xs tracking-widest mb-2">
//                                 Smart Recommendation
//                             </h2>

//                             {/* Best Crop */}
//                             <div className="text-center mb-6">
//                                 <h3 className="text-3xl font-extrabold text-gray-800 capitalize">
//                                     {result[0].crop}
//                                 </h3>
//                                 <p className="text-green-600 font-semibold mt-1">
//                                     {result[0].confidence}% Best Match
//                                 </p>
//                             </div>

//                             <div className="border-t border-gray-100 my-4"></div>

//                             {/* Top 3 List */}
//                             <div className="space-y-4">
//                                 {result.map((item, index) => (
//                                     <div key={index}>
//                                         <div className="flex justify-between text-sm mb-1">
//                                             <span className={`capitalize ${index === 0 ? "font-bold text-green-700" : "text-gray-700"}`}>
//                                                 {index === 0 ? "👑 " : ""}{item.crop}
//                                             </span>
//                                             <span className="text-gray-500">{item.confidence}%</span>
//                                         </div>

//                                         <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//                                             <motion.div
//                                                 initial={{ width: 0 }}
//                                                 animate={{ width: `${item.confidence}%` }}
//                                                 transition={{ duration: 0.8 }}
//                                                 className={`h-2 rounded-full ${
//                                                     index === 0
//                                                         ? "bg-gradient-to-r from-green-500 to-emerald-400"
//                                                         : "bg-green-400"
//                                                 }`}
//                                             />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Insight */}
//                             <div className="mt-6 p-4 bg-green-50 rounded-xl text-sm text-gray-600">
//                                 Based on your soil nutrients and climate conditions,
//                                 <span className="font-semibold text-green-700 capitalize">
//                                     {" "}{result[0].crop}{" "}
//                                 </span>
//                                 appears highly suitable for cultivation.
//                             </div>

//                             {/* Close */}
//                             <button
//                                 onClick={() => setResult(null)}
//                                 className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:opacity-90 transition"
//                             >
//                                 Close
//                             </button>

//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//         </div>
//     );
// }

// function Input({ label, value, onChange, type = "number", step = "1" }) {
//     return (
//         <div>
//             <label className="block text-sm font-medium mb-1">{label}</label>
//             <input
//                 type={type}
//                 value={value}
//                 step={step}
//                 onChange={e => onChange(Number(e.target.value))}
//                 className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//         </div>
//     );
// }













// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Sprout, Loader2, Cloud, Beaker, ArrowRight } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import api from '../api';
// import { toast } from 'react-toastify';

// export default function CropRecommend() {
//     const { t } = useTranslation();

//     const [formData, setFormData] = useState({
//         N: 90,
//         P: 42,
//         K: 43,
//         temperature: 20,
//         humidity: 82,
//         ph: 6,
//         rainfall: 202
//     });

//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);
//     const [fetchingWeather, setFetchingWeather] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const { data } = await api.post('/ml/recommend', formData);

//             setTimeout(() => {
//                 setResult(data.top_3_recommendations);
//                 setLoading(false);
//             }, 800);

//         } catch (err) {
//             toast.error(t("recommendation_failed"));
//             setLoading(false);
//         }
//     };

//     const fetchCurrentWeather = () => {
//         if (!navigator.geolocation) {
//             toast.error(t("location_not_supported"));
//             return;
//         }

//         setFetchingWeather(true);

//         navigator.geolocation.getCurrentPosition(async (pos) => {
//             try {
//                 const { latitude, longitude } = pos.coords;

//                 const res = await fetch(
//                     `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`
//                 );

//                 const data = await res.json();

//                 setFormData(prev => ({
//                     ...prev,
//                     temperature: Math.round(data.current_weather.temperature),
//                     humidity: data.hourly.relativehumidity_2m[0]
//                 }));

//                 toast.success(t("fetch_weather"));

//             } catch (e) {
//                 toast.error(t("weather_fetch_failed"));
//             } finally {
//                 setFetchingWeather(false);
//             }
//         });
//     };

//     return (
//         <div className="max-w-4xl mx-auto space-y-8">

//             {/* Header */}
//             <div className="text-center space-y-2">
//                 <h1 className="text-3xl font-bold text-gray-800">
//                     {t("crop_consult")}
//                 </h1>
//                 <p className="text-gray-500">
//                     {t("crop_consult_desc")}
//                 </p>
//             </div>

//             {/* Form Card */}
//             <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8">

//                 <form onSubmit={handleSubmit} className="space-y-8">

//                     {/* Soil Section */}
//                     <div>
//                         <h3 className="flex items-center gap-2 text-lg font-semibold text-green-600 mb-4">
//                             <Beaker size={20} /> {t("soil_composition")}
//                         </h3>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <Input label={t("nitrogen_label")} value={formData.N} onChange={v => setFormData({ ...formData, N: v })} />
//                             <Input label={t("phosphorus_label")} value={formData.P} onChange={v => setFormData({ ...formData, P: v })} />
//                             <Input label={t("potassium_label")} value={formData.K} onChange={v => setFormData({ ...formData, K: v })} />
//                             <Input label={t("ph_level_label")} value={formData.ph} onChange={v => setFormData({ ...formData, ph: v })} step="0.1" />
//                         </div>
//                     </div>

//                     {/* Environment Section */}
//                     <div>
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-600">
//                                 <Cloud size={20} /> {t("environmental_factors")}
//                             </h3>

//                             <button
//                                 type="button"
//                                 onClick={fetchCurrentWeather}
//                                 disabled={fetchingWeather}
//                                 className="text-sm text-green-600 hover:underline flex items-center gap-1"
//                             >
//                                 {fetchingWeather ? <Loader2 size={14} className="animate-spin" /> : <Cloud size={14} />}
//                                 {t("fetch_weather")}
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <Input label={t("temperature_label")} value={formData.temperature} onChange={v => setFormData({ ...formData, temperature: v })} />
//                             <Input label={t("humidity_label")} value={formData.humidity} onChange={v => setFormData({ ...formData, humidity: v })} />
//                             <Input label={t("rainfall_label")} value={formData.rainfall} onChange={v => setFormData({ ...formData, rainfall: v })} />
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="flex justify-end">
//                         <button
//                             disabled={loading}
//                             className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg hover:opacity-90 transition flex items-center gap-2"
//                         >
//                             {loading ? (
//                                 <Loader2 className="animate-spin" />
//                             ) : (
//                                 <>
//                                     {t("analyze")} <ArrowRight size={18} />
//                                 </>
//                             )}
//                         </button>
//                     </div>

//                 </form>
//             </div>

//             {/* Result Modal */}
//             <AnimatePresence>
//                 {result && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
//                         onClick={() => setResult(null)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.8, y: 40 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.8, y: 40 }}
//                             transition={{ duration: 0.4 }}
//                             className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]"
//                             onClick={e => e.stopPropagation()}
//                         >

//                             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 rounded-t-3xl"></div>

//                             <div className="flex justify-center mb-6 mt-4">
//                                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//                                     <Sprout size={40} className="text-green-600" />
//                                 </div>
//                             </div>

//                             <h2 className="text-center text-gray-400 uppercase text-xs tracking-widest mb-2">
//                                 {t("result")}
//                             </h2>

//                             <div className="text-center mb-6">
//                                 <h3 className="text-3xl font-extrabold text-gray-800 capitalize">
//                                     {result[0].crop}
//                                 </h3>
//                                 <p className="text-green-600 font-semibold mt-1">
//                                     {result[0].confidence}% {t("confidence")}
//                                 </p>
//                             </div>

//                             <div className="border-t border-gray-100 my-4"></div>

//                             <div className="mt-6 p-4 bg-green-50 rounded-xl text-sm text-gray-600">
//                                 {t("best_fitted_crop")}
//                             </div>

//                             <button
//                                 onClick={() => setResult(null)}
//                                 className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:opacity-90 transition"
//                             >
//                                 {t("close")}
//                             </button>

//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//         </div>
//     );
// }

// function Input({ label, value, onChange, type = "number", step = "1" }) {
//     return (
//         <div>
//             <label className="block text-sm font-medium mb-1">{label}</label>
//             <input
//                 type={type}
//                 value={value}
//                 step={step}
//                 onChange={e => onChange(Number(e.target.value))}
//                 className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//         </div>
//     );
// }














// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Sprout, Loader2, Cloud, Beaker, ArrowRight } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import api from '../api';
// import { toast } from 'react-toastify';

// export default function CropRecommend() {
//     const { t } = useTranslation();

//     const [formData, setFormData] = useState({
//         N: 90,
//         P: 42,
//         K: 43,
//         temperature: 20,
//         humidity: 82,
//         ph: 6,
//         rainfall: 202
//     });

//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);
//     const [fetchingWeather, setFetchingWeather] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const { data } = await api.post('/ml/recommend', formData);

//             setTimeout(() => {
//                 setResult(data.top_3_recommendations);
//                 setLoading(false);
//             }, 800);

//         } catch (err) {
//             toast.error(t("recommendation_failed"));
//             setLoading(false);
//         }
//     };

//     const fetchCurrentWeather = () => {
//         if (!navigator.geolocation) {
//             toast.error(t("location_not_supported"));
//             return;
//         }

//         setFetchingWeather(true);

//         navigator.geolocation.getCurrentPosition(async (pos) => {
//             try {
//                 const { latitude, longitude } = pos.coords;

//                 const res = await fetch(
//                     `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`
//                 );

//                 const data = await res.json();

//                 setFormData(prev => ({
//                     ...prev,
//                     temperature: Math.round(data.current_weather.temperature),
//                     humidity: data.hourly.relativehumidity_2m[0]
//                 }));

//                 toast.success(t("fetch_weather"));

//             } catch (e) {
//                 toast.error(t("weather_fetch_failed"));
//             } finally {
//                 setFetchingWeather(false);
//             }
//         });
//     };

//     return (
//         <div className="max-w-4xl mx-auto space-y-8">

//             <div className="text-center space-y-2">
//                 <h1 className="text-3xl font-bold text-gray-800">
//                     {t("crop_consult")}
//                 </h1>
//                 <p className="text-gray-500">
//                     {t("crop_consult_desc")}
//                 </p>
//             </div>

//             <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8">

//                 <form onSubmit={handleSubmit} className="space-y-8">

//                     <div>
//                         <h3 className="flex items-center gap-2 text-lg font-semibold text-green-600 mb-4">
//                             <Beaker size={20} /> {t("soil_composition")}
//                         </h3>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <Input label={t("nitrogen_label")} value={formData.N} onChange={v => setFormData({ ...formData, N: v })} />
//                             <Input label={t("phosphorus_label")} value={formData.P} onChange={v => setFormData({ ...formData, P: v })} />
//                             <Input label={t("potassium_label")} value={formData.K} onChange={v => setFormData({ ...formData, K: v })} />
//                             <Input label={t("ph_level_label")} value={formData.ph} onChange={v => setFormData({ ...formData, ph: v })} step="0.1" />
//                         </div>
//                     </div>

//                     <div>
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-600">
//                                 <Cloud size={20} /> {t("environmental_factors")}
//                             </h3>

//                             <button
//                                 type="button"
//                                 onClick={fetchCurrentWeather}
//                                 disabled={fetchingWeather}
//                                 className="text-sm text-green-600 hover:underline flex items-center gap-1"
//                             >
//                                 {fetchingWeather ? <Loader2 size={14} className="animate-spin" /> : <Cloud size={14} />}
//                                 {t("fetch_weather")}
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <Input label={t("temperature_label")} value={formData.temperature} onChange={v => setFormData({ ...formData, temperature: v })} />
//                             <Input label={t("humidity_label")} value={formData.humidity} onChange={v => setFormData({ ...formData, humidity: v })} />
//                             <Input label={t("rainfall_label")} value={formData.rainfall} onChange={v => setFormData({ ...formData, rainfall: v })} />
//                         </div>
//                     </div>

//                     <div className="flex justify-end">
//                         <button
//                             disabled={loading}
//                             className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg hover:opacity-90 transition flex items-center gap-2"
//                         >
//                             {loading ? (
//                                 <Loader2 className="animate-spin" />
//                             ) : (
//                                 <>
//                                     {t("analyze")} <ArrowRight size={18} />
//                                 </>
//                             )}
//                         </button>
//                     </div>

//                 </form>
//             </div>

//             {/* Result Modal */}
//             <AnimatePresence>
//                 {result && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
//                         onClick={() => setResult(null)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.8, y: 40 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.8, y: 40 }}
//                             transition={{ duration: 0.4 }}
//                             className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]"
//                             onClick={e => e.stopPropagation()}
//                         >

//                             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 rounded-t-3xl"></div>

//                             <div className="flex justify-center mb-6 mt-4">
//                                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//                                     <Sprout size={40} className="text-green-600" />
//                                 </div>
//                             </div>

//                             <h2 className="text-center text-gray-400 uppercase text-xs tracking-widest mb-4">
//                                 {t("result")}
//                             </h2>

//                             {/* ✅ BEST CROP SECTION ADDED */}
//                             <div className="text-center mb-6">
//                                 <h3 className="text-sm text-gray-500 uppercase tracking-wide">
//                                     Best Crop
//                                 </h3>
//                                 <h2 className="text-2xl font-bold text-green-700 capitalize mt-1">
//                                     👑 {t(`crop_names.${result[0].crop}`, result[0].crop)}
//                                 </h2>
//                                 <p className="text-gray-600 mt-1">
//                                     {result[0].confidence}% {t("confidence")}
//                                 </p>
//                             </div>

//                             <div className="border-t border-gray-100 my-4"></div>

//                             {/* Top 3 Results */}
//                             <div className="space-y-4">
//                                 {result.map((item, index) => (
//                                     <div key={index}>
//                                         <div className="flex justify-between text-sm mb-1">
//                                             <span className="capitalize text-gray-700">
//                                                 #{index + 1} {t(`crop_names.${item.crop}`, item.crop)}
//                                             </span>
//                                             <span className="text-gray-500">
//                                                 {item.confidence}%
//                                             </span>
//                                         </div>

//                                         <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//                                             <motion.div
//                                                 initial={{ width: 0 }}
//                                                 animate={{ width: `${item.confidence}%` }}
//                                                 transition={{ duration: 0.8 }}
//                                                 className="h-2 rounded-full bg-green-500"
//                                             />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <button
//                                 onClick={() => setResult(null)}
//                                 className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:opacity-90 transition"
//                             >
//                                 {t("close")}
//                             </button>

//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//         </div>
//     );
// }

// function Input({ label, value, onChange, type = "number", step = "1" }) {
//     return (
//         <div>
//             <label className="block text-sm font-medium mb-1">{label}</label>
//             <input
//                 type={type}
//                 value={value}
//                 step={step}
//                 onChange={e => onChange(Number(e.target.value))}
//                 className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//         </div>
//     );
// }












// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Sprout, Loader2, Cloud, Beaker, ArrowRight } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import api from '../api';
// import { toast } from 'react-toastify';

// export default function CropRecommend() {
//     const { t } = useTranslation();

//     const [formData, setFormData] = useState({
//         N: 90,
//         P: 42,
//         K: 43,
//         temperature: 20,
//         humidity: 82,
//         ph: 6,
//         rainfall: 202
//     });

//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);
//     const [fetchingWeather, setFetchingWeather] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const { data } = await api.post('/ml/recommend', formData);

//             setTimeout(() => {
//                 setResult(data.top_3_recommendations);
//                 setLoading(false);
//             }, 800);

//         } catch (err) {
//             toast.error(t("recommendation_failed"));
//             setLoading(false);
//         }
//     };

//     const fetchCurrentWeather = () => {
//         if (!navigator.geolocation) {
//             toast.error(t("location_not_supported"));
//             return;
//         }

//         setFetchingWeather(true);

//         navigator.geolocation.getCurrentPosition(async (pos) => {
//             try {
//                 const { latitude, longitude } = pos.coords;

//                 const res = await fetch(
//                     `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`
//                 );

//                 const data = await res.json();

//                 setFormData(prev => ({
//                     ...prev,
//                     temperature: Math.round(data.current_weather.temperature),
//                     humidity: data.hourly.relativehumidity_2m[0]
//                 }));

//                 toast.success(t("fetch_weather"));
//             } catch (e) {
//                 toast.error(t("weather_fetch_failed"));
//             } finally {
//                 setFetchingWeather(false);
//             }
//         });
//     };

//     return (
//         <div className="max-w-4xl mx-auto space-y-8">

//             <div className="text-center space-y-2">
//                 <h1 className="text-3xl font-bold text-gray-800">
//                     {t("crop_consult")}
//                 </h1>
//                 <p className="text-gray-500">
//                     {t("crop_consult_desc")}
//                 </p>
//             </div>

//             <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8">

//                 <form onSubmit={handleSubmit} className="space-y-8">

//                     <div>
//                         <h3 className="flex items-center gap-2 text-lg font-semibold text-green-600 mb-4">
//                             <Beaker size={20} /> {t("soil_composition")}
//                         </h3>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <Input label={t("nitrogen_label")} value={formData.N} onChange={v => setFormData({ ...formData, N: v })} />
//                             <Input label={t("phosphorus_label")} value={formData.P} onChange={v => setFormData({ ...formData, P: v })} />
//                             <Input label={t("potassium_label")} value={formData.K} onChange={v => setFormData({ ...formData, K: v })} />
//                             <Input label={t("ph_level_label")} value={formData.ph} onChange={v => setFormData({ ...formData, ph: v })} step="0.1" />
//                         </div>
//                     </div>

//                     <div>
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-600">
//                                 <Cloud size={20} /> {t("environmental_factors")}
//                             </h3>

//                             <button
//                                 type="button"
//                                 onClick={fetchCurrentWeather}
//                                 disabled={fetchingWeather}
//                                 className="text-sm text-green-600 hover:underline flex items-center gap-1"
//                             >
//                                 {fetchingWeather ? <Loader2 size={14} className="animate-spin" /> : <Cloud size={14} />}
//                                 {t("fetch_weather")}
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <Input label={t("temperature_label")} value={formData.temperature} onChange={v => setFormData({ ...formData, temperature: v })} />
//                             <Input label={t("humidity_label")} value={formData.humidity} onChange={v => setFormData({ ...formData, humidity: v })} />
//                             <Input label={t("rainfall_label")} value={formData.rainfall} onChange={v => setFormData({ ...formData, rainfall: v })} />
//                         </div>
//                     </div>

//                     <div className="flex justify-end">
//                         <button
//                             disabled={loading}
//                             className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg hover:opacity-90 transition flex items-center gap-2"
//                         >
//                             {loading ? (
//                                 <Loader2 className="animate-spin" />
//                             ) : (
//                                 <>
//                                     {t("analyze")} <ArrowRight size={18} />
//                                 </>
//                             )}
//                         </button>
//                     </div>

//                 </form>
//             </div>

//             {/* Enhanced Result Modal */}
//             <AnimatePresence>
//                 {result && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
//                         onClick={() => setResult(null)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.8, y: 40 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.8, y: 40 }}
//                             transition={{ duration: 0.4 }}
//                             className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]"
//                             onClick={e => e.stopPropagation()}
//                         >

//                             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 rounded-t-3xl"></div>

//                             <div className="flex justify-center mb-4 mt-4">
//                                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//                                     <Sprout size={40} className="text-green-600" />
//                                 </div>
//                             </div>

//                             <h2 className="text-center text-gray-800 font-semibold text-lg mb-2">
//                                 {t("result")}
//                             </h2>

//                             <p className="text-center text-gray-500 text-sm mb-6">
//                                 {t("recommendation_summary")}
//                             </p>

//                             <div className="text-center mb-6">
//                                 <h3 className="text-sm text-gray-500 uppercase tracking-wide">
//                                     {t("best_crop")}
//                                 </h3>
//                                 <h2 className="text-2xl font-bold text-green-700 capitalize mt-1">
//                                     👑 {t(`crop_names.${result[0].crop}`, result[0].crop)}
//                                 </h2>
//                                 <p className="text-gray-600 mt-1">
//                                     {result[0].confidence}% {t("confidence")}
//                                 </p>
//                             </div>

//                             <div className="border-t border-gray-100 my-4"></div>

//                             <div className="space-y-4">
//                                 {result.map((item, index) => (
//                                     <div key={index}>
//                                         <div className="flex justify-between text-sm mb-1">
//                                             <span className="capitalize text-gray-700">
//                                                 #{index + 1} {t(`crop_names.${item.crop}`, item.crop)}
//                                             </span>
//                                             <span className="text-gray-500">
//                                                 {item.confidence}%
//                                             </span>
//                                         </div>

//                                         <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//                                             <motion.div
//                                                 initial={{ width: 0 }}
//                                                 animate={{ width: `${item.confidence}%` }}
//                                                 transition={{ duration: 0.8 }}
//                                                 className="h-2 rounded-full bg-green-500"
//                                             />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <button
//                                 onClick={() => setResult(null)}
//                                 className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:opacity-90 transition"
//                             >
//                                 {t("close")}
//                             </button>

//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//         </div>
//     );
// }

// function Input({ label, value, onChange, type = "number", step = "1" }) {
//     return (
//         <div>
//             <label className="block text-sm font-medium mb-1">{label}</label>
//             <input
//                 type={type}
//                 value={value}
//                 step={step}
//                 onChange={e => onChange(Number(e.target.value))}
//                 className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//         </div>
//     );
// }















import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    Sprout,
    Loader2,
    Cloud,
    ArrowRight,
    Leaf,
    Droplets,
    Thermometer,
    FlaskConical,
    Wheat,
    Info,
    CloudRain
} from "lucide-react";

import { useTranslation } from "react-i18next";
import api from "../api";
import { toast } from "react-toastify";

import cropLandscape from "../assets/crop-landscape.png";

export default function CropRecommend() {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        N: 90,
        P: 42,
        K: 43,
        temperature: 20,
        humidity: 82,
        ph: 6,
        rainfall: 202
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [fetchingWeather, setFetchingWeather] = useState(false);

    /* =========================================================
       GET CROP DISPLAY NAME
    ========================================================= */

    const getCropDisplayName = (cropKey) => {
        if (!cropKey) return t("unknown");

        const cropLower = cropKey.toLowerCase();
        const translated = t(`crop_names.${cropLower}`);

        if (
            translated &&
            translated !== `crop_names.${cropLower}`
        ) {
            return translated;
        }

        return cropKey
            .split("_")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1).toLowerCase()
            )
            .join(" ");
    };

    /* =========================================================
       UPDATE FIELD
    ========================================================= */

    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    /* =========================================================
       ANALYZE CROP
    ========================================================= */

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const { data } = await api.post(
                "/ml/recommend",
                formData
            );

            setTimeout(() => {
                setResult(data.top_3_recommendations);
                setLoading(false);
            }, 700);
        } catch (err) {
            console.error(err);

            toast.error(
                t("recommendation_failed")
            );

            setLoading(false);
        }
    };

    /* =========================================================
       CURRENT WEATHER
    ========================================================= */

    const fetchCurrentWeather = () => {
        if (!navigator.geolocation) {
            toast.error(
                t("location_not_supported")
            );

            return;
        }

        setFetchingWeather(true);

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const {
                        latitude,
                        longitude
                    } = pos.coords;

                    const res = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`
                    );

                    const data = await res.json();

                    setFormData((prev) => ({
                        ...prev,
                        temperature:
                            Math.round(
                                data.current_weather
                                    .temperature
                            ),
                        humidity:
                            data.hourly
                                .relativehumidity_2m[0]
                    }));

                    toast.success(
                        t("fetch_weather")
                    );
                } catch (error) {
                    console.error(error);

                    toast.error(
                        t("weather_fetch_failed")
                    );
                } finally {
                    setFetchingWeather(false);
                }
            },
            () => {
                setFetchingWeather(false);

                toast.error(
                    t("location_not_supported")
                );
            }
        );
    };

    /* =========================================================
       INPUT COMPONENT
    ========================================================= */

    const Input = ({
        label,
        value,
        onChange,
        icon,
        unit,
        step = "1"
    }) => {
        return (
            <div className="crop-input-group">
                <label className="crop-input-label">
                    <span>{label}</span>

                    <Info
                        size={12}
                        strokeWidth={1.8}
                        className="crop-info"
                    />
                </label>

                <div className="crop-input-box">
                    <div className="crop-input-icon">
                        {icon}
                    </div>

                    <input
                        type="number"
                        value={value}
                        step={step}
                        onChange={(e) =>
                            onChange(
                                Number(e.target.value)
                            )
                        }
                    />

                    {unit && (
                        <span className="crop-unit">
                            {unit}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <style>{`

                /* =====================================================
                   PAGE
                ===================================================== */

                .crop-page {
                    width: 100%;
                    height: calc(100vh - 82px);
                    min-height: 0;
                    overflow: hidden;

                    background:
                        linear-gradient(
                            180deg,
                            #f8fbf9 0%,
                            #f5f8f7 100%
                        );

                    color: #172b3d;

                    font-family:
                        Inter,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        Roboto,
                        Arial,
                        sans-serif;

                    box-sizing: border-box;
                }

                .crop-page *,
                .crop-page *::before,
                .crop-page *::after {
                    box-sizing: border-box;
                }


                /* =====================================================
                   HERO
                ===================================================== */

                .crop-hero {
                    position: relative;
                    width: 100%;
                    height: 158px;

                    overflow: hidden;

                    background:
                        linear-gradient(
                            105deg,
                            #f3fbf4 0%,
                            #edf9f0 46%,
                            #e4f4e8 100%
                        );
                }

                .crop-landscape {
                    position: absolute;

                    top: 0;
                    right: 0;

                    width: 66%;
                    height: 100%;

                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;

                    z-index: 1;
                }

                .crop-hero-fade {
                    position: absolute;

                    top: 0;
                    left: 0;

                    width: 64%;
                    height: 100%;

                    z-index: 2;

                    background:
                        linear-gradient(
                            90deg,
                            #f3fbf4 0%,
                            #f3fbf4 31%,
                            rgba(243,251,244,.98) 48%,
                            rgba(243,251,244,.78) 67%,
                            rgba(243,251,244,0) 100%
                        );
                }

                .crop-hero-content {
                    position: relative;

                    z-index: 5;

                    height: 100%;

                    display: flex;
                    align-items: center;

                    gap: 20px;

                    padding-left: 78px;
                    padding-right: 30px;
                }

                .crop-main-leaf {
                    width: 68px;
                    height: 68px;

                    flex-shrink: 0;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background:
                        #d9f1dc;

                    color:
                        #159447;

                    box-shadow:
                        0 4px 12px
                        rgba(30,145,65,.05);
                }

                .crop-main-leaf svg {
                    width: 35px;
                    height: 35px;
                }

                .crop-hero-copy {
                    margin-top: -1px;
                }

                .crop-hero-copy h1 {
                    margin: 0;

                    color: #14283b;

                    font-size: 34px;
                    line-height: 1.05;

                    font-weight: 700;

                    letter-spacing: -0.8px;
                }

                .crop-hero-copy p {
                    margin: 8px 0 0;

                    max-width: 470px;

                    color: #405469;

                    font-size: 14px;
                    line-height: 1.45;

                    font-weight: 400;
                }


                /* =====================================================
                   MAIN CONTENT
                ===================================================== */

                .crop-content {
                    position: relative;

                    z-index: 10;

                    width: calc(100% - 150px);
                    max-width: 1385px;

                    margin: -1px auto 0;

                    padding-top: 22px;
                    padding-bottom: 8px;
                }


                /* =====================================================
                   FORM CARD
                ===================================================== */

                .crop-form-card {
                    width: 100%;

                    border:
                        1px solid #edf0ef;

                    border-radius: 20px;

                    background: #ffffff;

                    box-shadow:
                        0 12px 28px
                        rgba(27,52,38,.075);

                    overflow: hidden;
                }

                .crop-form-card form {
                    padding:
                        18px 26px 14px;
                }


                /* =====================================================
                   SECTION
                ===================================================== */

                .crop-form-section {
                    width: 100%;
                }


                /* =====================================================
                   SECTION HEADING
                ===================================================== */

                .crop-section-heading {
                    display: flex;
                    align-items: center;

                    gap: 12px;

                    margin-bottom: 10px;
                }

                .crop-section-symbol {
                    width: 44px;
                    height: 44px;

                    flex-shrink: 0;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 10px;
                }

                .crop-section-symbol svg {
                    width: 23px;
                    height: 23px;
                }

                .soil-symbol {
                    background: #def3e1;
                    color: #139544;
                }

                .environment-symbol {
                    background: #def4ef;
                    color: #139b58;
                }

                .crop-section-heading h2 {
                    margin: 0;

                    color: #182a3c;

                    font-size: 19px;
                    line-height: 1.15;

                    font-weight: 700;

                    letter-spacing: -.15px;
                }

                .crop-section-heading p {
                    margin: 3px 0 0;

                    color: #405267;

                    font-size: 12.5px;
                    line-height: 1.25;

                    font-weight: 400;
                }


                /* =====================================================
                   INPUT GRID
                ===================================================== */

                .crop-input-grid {
                    display: grid;

                    grid-template-columns:
                        repeat(3, minmax(0, 1fr));

                    gap: 22px;

                    width: 100%;
                }


                /* =====================================================
                   INPUT
                ===================================================== */

                .crop-input-group {
                    width: 100%;
                }

                .crop-input-label {
                    display: flex;
                    align-items: center;

                    gap: 5px;

                    margin:
                        0 0 5px;

                    color: #17283b;

                    font-size: 12.5px;
                    line-height: 1.2;

                    font-weight: 600;
                }

                .crop-info {
                    color: #89949e;
                }

                .crop-input-box {
                    display: flex;
                    align-items: center;

                    width: 100%;
                    height: 44px;

                    overflow: hidden;

                    border:
                        1px solid #dfe4e7;

                    border-radius: 10px;

                    background: #ffffff;

                    transition:
                        border-color .2s ease,
                        box-shadow .2s ease;
                }

                .crop-input-box:hover {
                    border-color: #b9d7bf;
                }

                .crop-input-box:focus-within {
                    border-color: #42a65b;

                    box-shadow:
                        0 0 0 3px
                        rgba(36,163,74,.065);
                }

                .crop-input-icon {
                    width: 46px;
                    height: 100%;

                    flex-shrink: 0;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-right:
                        1px solid #d8ebda;

                    background:
                        #eff8ec;

                    color:
                        #36a44b;
                }

                .crop-input-icon svg {
                    width: 19px;
                    height: 19px;
                }

                .crop-input-box input {
                    width: 100%;
                    min-width: 0;
                    height: 100%;

                    border: 0;
                    outline: 0;

                    background: transparent;

                    padding:
                        0 11px;

                    color: #1e2e40;

                    font-size: 14px;
                    font-weight: 500;
                }

                .crop-input-box input::-webkit-inner-spin-button,
                .crop-input-box input::-webkit-outer-spin-button {
                    margin: 0;
                }

                .crop-unit {
                    flex-shrink: 0;

                    padding:
                        0 12px;

                    color: #687583;

                    font-size: 12px;
                    font-weight: 400;
                }


                /* =====================================================
                   PH
                ===================================================== */

                .crop-ph {
                    width: 390px;
                    max-width: 100%;

                    margin-top: 12px;
                }


                /* =====================================================
                   DIVIDER
                ===================================================== */

                .crop-divider {
                    width: 100%;
                    height: 1px;

                    margin:
                        14px 0 13px;

                    background:
                        #e4e8e6;
                }


                /* =====================================================
                   ENVIRONMENT HEADER
                ===================================================== */

                .crop-environment-heading {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 15px;

                    margin-bottom: 10px;
                }

                .crop-environment-heading
                .crop-section-heading {
                    margin-bottom: 0;
                }


                /* =====================================================
                   WEATHER BUTTON
                ===================================================== */

                .weather-button {
                    height: 40px;

                    flex-shrink: 0;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    gap: 6px;

                    padding:
                        0 13px;

                    border:
                        1px solid #e0e5e3;

                    border-radius: 9px;

                    background: #ffffff;

                    color: #119545;

                    font-size: 12.5px;
                    font-weight: 500;

                    cursor: pointer;

                    box-shadow:
                        0 2px 5px
                        rgba(0,0,0,.025);

                    transition:
                        border-color .2s ease,
                        background .2s ease,
                        transform .2s ease;
                }

                .weather-button svg {
                    width: 16px;
                    height: 16px;
                }

                .weather-button:hover {
                    border-color: #b7dcbf;
                    background: #f7fcf8;
                    transform: translateY(-1px);
                }

                .weather-button:disabled {
                    opacity: .6;
                    cursor: not-allowed;
                    transform: none;
                }


                /* =====================================================
                   ANALYZE BUTTON
                ===================================================== */

                .crop-analyze-wrapper {
                    display: flex;
                    justify-content: flex-end;

                    margin-top: 13px;
                }

                .crop-analyze-button {
                    min-width: 260px;
                    height: 45px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    gap: 9px;

                    border: 0;

                    border-radius: 10px;

                    background:
                        linear-gradient(
                            90deg,
                            #159d46,
                            #08a84f
                        );

                    color: #ffffff;

                    font-size: 14px;
                    font-weight: 600;

                    cursor: pointer;

                    box-shadow:
                        0 6px 15px
                        rgba(22,157,70,.16);

                    transition:
                        transform .2s ease,
                        box-shadow .2s ease;
                }

                .crop-analyze-button svg {
                    width: 18px;
                    height: 18px;
                }

                .crop-analyze-button:hover {
                    transform:
                        translateY(-1px);

                    box-shadow:
                        0 8px 18px
                        rgba(22,157,70,.22);
                }

                .crop-analyze-button:disabled {
                    opacity: .65;
                    cursor: not-allowed;
                    transform: none;
                }


                /* =====================================================
                   SPINNER
                ===================================================== */

                .weather-spin {
                    animation:
                        crop-spin
                        1s
                        linear
                        infinite;
                }

                @keyframes crop-spin {
                    from {
                        transform: rotate(0deg);
                    }

                    to {
                        transform: rotate(360deg);
                    }
                }


                /* =====================================================
                   RESULT OVERLAY
                ===================================================== */

                .result-overlay {
                    position: fixed;
                    inset: 0;

                    z-index: 9999;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    padding: 18px;

                    background:
                        rgba(12,24,18,.42);

                    backdrop-filter:
                        blur(7px);
                }


                /* =====================================================
                   RESULT MODAL
                ===================================================== */

                .result-modal {
                    position: relative;

                    width: 100%;
                    max-width: 425px;

                    max-height: 88vh;

                    overflow-y: auto;

                    padding:
                        23px 24px 22px;

                    border-radius: 21px;

                    background: #ffffff;

                    box-shadow:
                        0 24px 55px
                        rgba(0,0,0,.27);
                }

                .result-top-line {
                    position: absolute;

                    top: 0;
                    left: 0;

                    width: 100%;
                    height: 4px;

                    border-radius:
                        21px 21px 0 0;

                    background:
                        linear-gradient(
                            90deg,
                            #16a34a,
                            #10b981,
                            #0d9488
                        );
                }

                .result-icon-wrapper {
                    width: 58px;
                    height: 58px;

                    margin:
                        5px auto 10px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background:
                        #dcf5df;
                }

                .result-icon-green {
                    color: #159447;
                }

                .result-modal h2 {
                    margin: 0;

                    text-align: center;

                    color: #182a3c;

                    font-size: 19px;
                    font-weight: 700;
                }

                .result-description {
                    margin:
                        5px auto 15px;

                    max-width: 350px;

                    text-align: center;

                    color: #687583;

                    font-size: 12px;
                    line-height: 1.45;
                }

                .best-crop-box {
                    padding:
                        13px 14px;

                    text-align: center;

                    border-radius: 12px;

                    background:
                        #f1f9f1;
                }

                .best-crop-box h3 {
                    margin: 0;

                    color: #74817c;

                    font-size: 10px;

                    text-transform:
                        uppercase;

                    letter-spacing:
                        .7px;
                }

                .best-crop-box strong {
                    display: block;

                    margin-top: 3px;

                    color: #138a42;

                    font-size: 20px;
                }

                .best-crop-box p {
                    margin:
                        2px 0 0;

                    color: #687583;

                    font-size: 12px;
                }

                .result-list {
                    margin-top: 15px;

                    display: flex;
                    flex-direction: column;

                    gap: 10px;
                }

                .result-row-heading {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    margin-bottom: 5px;

                    color: #475665;

                    font-size: 12px;
                }

                .result-progress {
                    width: 100%;
                    height: 6px;

                    overflow: hidden;

                    border-radius: 20px;

                    background:
                        #e7ece9;
                }

                .result-progress div {
                    height: 100%;

                    border-radius:
                        inherit;

                    background:
                        linear-gradient(
                            90deg,
                            #20a84f,
                            #0da85a
                        );
                }

                .result-close {
                    width: 100%;
                    height: 40px;

                    margin-top: 16px;

                    border: 0;

                    border-radius: 10px;

                    background:
                        linear-gradient(
                            90deg,
                            #159d46,
                            #079f4d
                        );

                    color: #ffffff;

                    font-size: 13px;
                    font-weight: 600;

                    cursor: pointer;

                    transition:
                        transform .2s ease,
                        box-shadow .2s ease;
                }

                .result-close:hover {
                    transform:
                        translateY(-1px);

                    box-shadow:
                        0 6px 15px
                        rgba(21,157,70,.18);
                }


                /* =====================================================
                   LARGE DESKTOP
                ===================================================== */

                @media (min-width: 1366px) {

                    .crop-hero {
                        height: 158px;
                    }

                    .crop-content {
                        width:
                            calc(100% - 150px);

                        max-width:
                            1385px;
                    }
                }


                /* =====================================================
                   MEDIUM DESKTOP
                ===================================================== */

                @media (max-width: 1200px) {

                    .crop-content {
                        width:
                            calc(100% - 80px);
                    }

                    .crop-hero-content {
                        padding-left: 50px;
                    }

                    .crop-hero-copy h1 {
                        font-size: 32px;
                    }

                    .crop-input-grid {
                        gap: 18px;
                    }
                }


                /* =====================================================
                   TABLET
                ===================================================== */

                @media (max-width: 900px) {

                    .crop-page {
                        height: auto;
                        min-height:
                            calc(100vh - 82px);

                        overflow-y: auto;
                    }

                    .crop-hero {
                        height: 170px;
                    }

                    .crop-landscape {
                        width: 100%;
                    }

                    .crop-hero-fade {
                        width: 100%;

                        background:
                            linear-gradient(
                                90deg,
                                rgba(243,251,244,.98),
                                rgba(243,251,244,.84),
                                rgba(243,251,244,.25)
                            );
                    }

                    .crop-content {
                        width:
                            calc(100% - 40px);

                        padding-top: 12px;
                    }

                    .crop-input-grid {
                        grid-template-columns:
                            repeat(2, 1fr);
                    }
                }


                /* =====================================================
                   MOBILE
                ===================================================== */

                @media (max-width: 650px) {

                    .crop-page {
                        height: auto;

                        overflow-y: auto;
                    }

                    .crop-hero {
                        height: 165px;
                    }

                    .crop-hero-content {
                        padding:
                            0 20px;

                        gap: 13px;
                    }

                    .crop-main-leaf {
                        width: 55px;
                        height: 55px;
                    }

                    .crop-main-leaf svg {
                        width: 29px;
                        height: 29px;
                    }

                    .crop-hero-copy h1 {
                        font-size: 27px;
                    }

                    .crop-hero-copy p {
                        margin-top: 5px;

                        font-size: 11.5px;

                        max-width: 275px;
                    }

                    .crop-content {
                        width:
                            calc(100% - 20px);

                        padding-top: 10px;
                    }

                    .crop-form-card {
                        border-radius: 16px;
                    }

                    .crop-form-card form {
                        padding:
                            16px 13px;
                    }

                    .crop-section-heading {
                        gap: 10px;
                    }

                    .crop-section-symbol {
                        width: 41px;
                        height: 41px;
                    }

                    .crop-section-heading h2 {
                        font-size: 17px;
                    }

                    .crop-section-heading p {
                        font-size: 11.5px;
                    }

                    .crop-input-grid {
                        grid-template-columns: 1fr;

                        gap: 12px;
                    }

                    .crop-ph {
                        width: 100%;

                        margin-top: 12px;
                    }

                    .crop-environment-heading {
                        align-items:
                            flex-start;

                        flex-direction:
                            column;

                        gap: 9px;
                    }

                    .weather-button {
                        width: 100%;
                    }

                    .crop-analyze-wrapper {
                        justify-content:
                            stretch;
                    }

                    .crop-analyze-button {
                        width: 100%;
                        min-width: 0;
                    }

                    .result-modal {
                        max-width: 390px;

                        padding:
                            21px 19px 19px;
                    }
                }

            `}</style>

            <div className="crop-page">

                {/* =====================================================
                    HERO
                ===================================================== */}

                <section className="crop-hero">

                    <div
                        className="crop-landscape"
                        style={{
                            backgroundImage:
                                `url(${cropLandscape})`
                        }}
                    />

                    <div className="crop-hero-fade" />

                    <div className="crop-hero-content">

                        <div className="crop-main-leaf">
                            <Leaf
                                size={35}
                                strokeWidth={1.7}
                            />
                        </div>

                        <div className="crop-hero-copy">

                            <h1>
                                {t("crop_consult")}
                            </h1>

                            <p>
                                {t(
                                    "crop_consult_desc"
                                )}
                            </p>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    MAIN CONTENT
                ===================================================== */}

                <main className="crop-content">

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 8
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.35
                        }}
                        className="crop-form-card"
                    >

                        <form
                            onSubmit={handleSubmit}
                        >

                            {/* =================================================
                                SOIL COMPOSITION
                            ================================================= */}

                            <section
                                className="crop-form-section"
                            >

                                <div
                                    className="crop-section-heading"
                                >

                                    <div
                                        className="
                                            crop-section-symbol
                                            soil-symbol
                                        "
                                    >
                                        <Sprout
                                            size={23}
                                            strokeWidth={1.7}
                                        />
                                    </div>

                                    <div>

                                        <h2>
                                            {t(
                                                "soil_composition"
                                            )}
                                        </h2>

                                        <p>
                                            {t(
                                                "enter_soil_test_values"
                                            )}
                                        </p>

                                    </div>

                                </div>


                                <div
                                    className="
                                        crop-input-grid
                                    "
                                >

                                    <Input
                                        label={t(
                                            "nitrogen_label"
                                        )}
                                        value={
                                            formData.N
                                        }
                                        onChange={(v) =>
                                            updateField(
                                                "N",
                                                v
                                            )
                                        }
                                        icon={
                                            <Leaf
                                                size={19}
                                            />
                                        }
                                        unit="ppm"
                                    />

                                    <Input
                                        label={t(
                                            "phosphorus_label"
                                        )}
                                        value={
                                            formData.P
                                        }
                                        onChange={(v) =>
                                            updateField(
                                                "P",
                                                v
                                            )
                                        }
                                        icon={
                                            <Sprout
                                                size={19}
                                            />
                                        }
                                        unit="ppm"
                                    />

                                    <Input
                                        label={t(
                                            "potassium_label"
                                        )}
                                        value={
                                            formData.K
                                        }
                                        onChange={(v) =>
                                            updateField(
                                                "K",
                                                v
                                            )
                                        }
                                        icon={
                                            <Wheat
                                                size={19}
                                            />
                                        }
                                        unit="ppm"
                                    />

                                </div>


                                <div className="crop-ph">

                                    <Input
                                        label={t(
                                            "ph_level_label"
                                        )}
                                        value={
                                            formData.ph
                                        }
                                        onChange={(v) =>
                                            updateField(
                                                "ph",
                                                v
                                            )
                                        }
                                        icon={
                                            <FlaskConical
                                                size={19}
                                            />
                                        }
                                        step="0.1"
                                    />

                                </div>

                            </section>


                            {/* =================================================
                                DIVIDER
                            ================================================= */}

                            <div className="crop-divider" />


                            {/* =================================================
                                ENVIRONMENT
                            ================================================= */}

                            <section
                                className="crop-form-section"
                            >

                                <div
                                    className="
                                        crop-environment-heading
                                    "
                                >

                                    <div
                                        className="
                                            crop-section-heading
                                        "
                                    >

                                        <div
                                            className="
                                                crop-section-symbol
                                                environment-symbol
                                            "
                                        >
                                            <Cloud
                                                size={23}
                                            />
                                        </div>

                                        <div>

                                            <h2>
                                                {t(
                                                    "environmental_factors"
                                                )}
                                            </h2>

                                            <p>
                                                {t(
                                                    "provide_environmental_conditions"
                                                )}
                                            </p>

                                        </div>

                                    </div>


                                    <button
                                        type="button"
                                        onClick={
                                            fetchCurrentWeather
                                        }
                                        disabled={
                                            fetchingWeather
                                        }
                                        className="
                                            weather-button
                                        "
                                    >

                                        {fetchingWeather ? (
                                            <Loader2
                                                size={16}
                                                className="
                                                    weather-spin
                                                "
                                            />
                                        ) : (
                                            <Cloud
                                                size={16}
                                            />
                                        )}

                                        {fetchingWeather
                                            ? t(
                                                "fetching_weather"
                                            )
                                            : t(
                                                "fetch_weather"
                                            )}

                                    </button>

                                </div>


                                <div
                                    className="
                                        crop-input-grid
                                    "
                                >

                                    <Input
                                        label={t(
                                            "temperature_label"
                                        )}
                                        value={
                                            formData.temperature
                                        }
                                        onChange={(v) =>
                                            updateField(
                                                "temperature",
                                                v
                                            )
                                        }
                                        icon={
                                            <Thermometer
                                                size={19}
                                            />
                                        }
                                        unit="°C"
                                    />

                                    <Input
                                        label={t(
                                            "humidity_label"
                                        )}
                                        value={
                                            formData.humidity
                                        }
                                        onChange={(v) =>
                                            updateField(
                                                "humidity",
                                                v
                                            )
                                        }
                                        icon={
                                            <Droplets
                                                size={19}
                                            />
                                        }
                                        unit="%"
                                    />

                                    <Input
                                        label={t(
                                            "rainfall_label"
                                        )}
                                        value={
                                            formData.rainfall
                                        }
                                        onChange={(v) =>
                                            updateField(
                                                "rainfall",
                                                v
                                            )
                                        }
                                        icon={
                                            <CloudRain
                                                size={19}
                                            />
                                        }
                                        unit="mm"
                                    />

                                </div>


                                {/* =================================================
                                    ANALYZE
                                ================================================= */}

                                <div
                                    className="
                                        crop-analyze-wrapper
                                    "
                                >

                                    <button
                                        disabled={
                                            loading
                                        }
                                        type="submit"
                                        className="
                                            crop-analyze-button
                                        "
                                    >

                                        {loading ? (
                                            <>
                                                <Loader2
                                                    size={18}
                                                    className="
                                                        weather-spin
                                                    "
                                                />

                                                {t(
                                                    "analyzing"
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {t(
                                                    "analyze"
                                                )}

                                                <ArrowRight
                                                    size={18}
                                                />
                                            </>
                                        )}

                                    </button>

                                </div>

                            </section>

                        </form>

                    </motion.div>

                </main>


                {/* =====================================================
                    RESULT MODAL
                ===================================================== */}

                <AnimatePresence>

                    {result && (

                        <motion.div
                            className="
                                result-overlay
                            "
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1
                            }}
                            exit={{
                                opacity: 0
                            }}
                            onClick={() =>
                                setResult(null)
                            }
                        >

                            <motion.div
                                className="
                                    result-modal
                                "
                                initial={{
                                    scale: 0.88,
                                    y: 30
                                }}
                                animate={{
                                    scale: 1,
                                    y: 0
                                }}
                                exit={{
                                    scale: 0.88,
                                    y: 30
                                }}
                                transition={{
                                    duration: 0.3
                                }}
                                onClick={(e) =>
                                    e.stopPropagation()
                                }
                            >

                                <div
                                    className="
                                        result-top-line
                                    "
                                />

                                <div
                                    className="
                                        result-icon-wrapper
                                    "
                                >

                                    <Sprout
                                        size={34}
                                        className="
                                            result-icon-green
                                        "
                                    />

                                </div>


                                <h2>
                                    {t("result")}
                                </h2>


                                <p
                                    className="
                                        result-description
                                    "
                                >
                                    {t(
                                        "recommendation_summary"
                                    )}
                                </p>


                                {/* BEST CROP */}

                                <div
                                    className="
                                        best-crop-box
                                    "
                                >

                                    <h3>
                                        {t(
                                            "best_crop"
                                        )}
                                    </h3>

                                    <strong>

                                        👑{" "}

                                        {result?.[0] &&
                                            getCropDisplayName(
                                                result[0]
                                                    .crop
                                            )}

                                    </strong>

                                    <p>

                                        {
                                            result?.[0]
                                                ?.confidence
                                        }
                                        %{" "}

                                        {t(
                                            "confidence"
                                        )}

                                    </p>

                                </div>


                                {/* RESULTS */}

                                <div
                                    className="
                                        result-list
                                    "
                                >

                                    {result?.map(
                                        (
                                            item,
                                            index
                                        ) => (

                                            <div
                                                key={
                                                    index
                                                }
                                            >

                                                <div
                                                    className="
                                                        result-row-heading
                                                    "
                                                >

                                                    <span>

                                                        #
                                                        {index +
                                                            1}{" "}

                                                        {
                                                            getCropDisplayName(
                                                                item.crop
                                                            )
                                                        }

                                                    </span>

                                                    <span>
                                                        {
                                                            item.confidence
                                                        }%
                                                    </span>

                                                </div>


                                                <div
                                                    className="
                                                        result-progress
                                                    "
                                                >

                                                    <motion.div
                                                        initial={{
                                                            width: 0
                                                        }}
                                                        animate={{
                                                            width:
                                                                `${item.confidence}%`
                                                        }}
                                                        transition={{
                                                            duration:
                                                                0.8
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>


                                {/* CLOSE */}

                                <button
                                    onClick={() =>
                                        setResult(null)
                                    }
                                    className="
                                        result-close
                                    "
                                >
                                    {t("close")}
                                </button>

                            </motion.div>

                        </motion.div>

                    )}

                </AnimatePresence>

            </div>
        </>
    );
}