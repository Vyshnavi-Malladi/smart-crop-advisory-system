import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, Droplets, Wind, ArrowRight, Sprout, TrendingUp, AlertCircle, ShoppingBag, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
    const { t } = useTranslation();
    const [weather, setWeather] = useState(null);
    const [locationName, setLocationName] = useState(t('loading_weather'));
    const [sowingDate, setSowingDate] = useState(Cookies.get('sowingDate') || '');
    const [selectedCrop, setSelectedCrop] = useState(Cookies.get('selectedCrop') || 'Rice');
    const [cropStage, setCropStage] = useState(null);

    const crops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Tomato', 'Potato'];

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            setLocationName(t('location_not_supported'));
        }

        if (sowingDate) {
            calculateCropStage(sowingDate, selectedCrop);
        }
    }, [sowingDate, selectedCrop, t]);

    const success = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(lat, lon);
    };

    const error = () => {
        setLocationName(t('location_denied'));
        fetchWeather(28.61, 77.20);
    };

    const fetchWeather = async (lat, lon) => {
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability`);
            const data = await res.json();

            setWeather({
                temp: Math.round(data.current_weather.temperature),
                condition: getWeatherCondition(data.current_weather.weathercode),
                wind: Math.round(data.current_weather.windspeed),
                humidity: data.hourly.relativehumidity_2m[0],
                rain_prob: data.hourly.precipitation_probability ? data.hourly.precipitation_probability[0] : 0,
                code: data.current_weather.weathercode
            });
            setLocationName(`${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`);
        } catch (err) {
            console.error("Weather fetch failed", err);
        }
    };

    const getWeatherCondition = (code) => {
        if (code <= 3) return 'Clear/Cloudy';
        if (code <= 48) return 'Foggy';
        if (code <= 67) return 'Rainy';
        if (code <= 77) return 'Snowy';
        return 'Stormy';
    };

    const isSafeToSpray = () => {
        if (!weather) return true;
        // Unsafe if Wind > 15km/h OR Rain Probability > 50% OR Condition is Rainy/Stormy
        if (weather.wind > 15 || weather.rain_prob > 50 || weather.code > 60) return false;
        return true;
    };

    const calculateCropStage = (dateStr, crop) => {
        const start = new Date(dateStr);
        const today = new Date();
        const diffTime = Math.abs(today - start);
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Simplified Logic: Different crops have shorter/longer cycles
        // Rice: ~120 days, Wheat: ~140 days
        const totalDays = crop === 'Wheat' ? 140 : 120;

        let stage = { name: t('germination'), progress: 10, color: 'bg-emerald-200 text-emerald-800' };
        if (days > 15) stage = { name: t('vegetative'), progress: 40, color: 'bg-green-200 text-green-800' };
        if (days > (totalDays * 0.4)) stage = { name: t('flowering'), progress: 70, color: 'bg-yellow-200 text-yellow-800' };
        if (days > (totalDays * 0.8)) stage = { name: t('harvest'), progress: 100, color: 'bg-amber-200 text-amber-800' };

        setCropStage({ days, ...stage, totalDays });
        Cookies.set('sowingDate', dateStr);
        Cookies.set('selectedCrop', crop);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{t('my_farm')}</h1>
                    <p className="text-gray-500 mt-1 flex items-center gap-2"><MapPin size={16} /> {locationName}</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm font-medium text-gray-600">{t('system_op')}</span>
                </div>
            </div>

            {/* Extreme Weather Alert */}
            {weather && (weather.code > 90 || weather.wind > 40) && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3"
                >
                    <AlertCircle className="text-red-500 mt-1" />
                    <div>
                        <h3 className="font-bold text-red-700">{t('weather_alert')}!</h3>
                        <p className="text-red-600 text-sm">{weather.code > 90 ? 'Severe Thunderstorms Detected' : t('wind_high')}. Secure your crops.</p>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weather Widget */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-primary-dark text-white p-8 shadow-glass-hover"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 h-full">
                        <div className="flex items-center gap-6">
                            <Sun size={64} className="text-accent animate-pulse" />
                            <div>
                                {weather ? (
                                    <>
                                        <div className="text-5xl font-bold">{weather.temp}°C</div>
                                        <div className="text-xl opacity-90">{weather.condition}</div>
                                    </>
                                ) : (
                                    <div className="animate-pulse">{t('loading_weather')}</div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-8 text-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                            <div>
                                <div className="flex items-center justify-center gap-1 opacity-75 mb-1"><Droplets size={16} /> {t('humidity')}</div>
                                <div className="text-xl font-bold">{weather?.humidity || '--'}%</div>
                            </div>
                            <div className="w-px bg-white/20"></div>
                            <div>
                                <div className="flex items-center justify-center gap-1 opacity-75 mb-1"><Wind size={16} /> {t('wind')}</div>
                                <div className="text-xl font-bold">{weather?.wind || '--'} km/h</div>
                            </div>
                        </div>
                    </div>

                    {/* Spray Guidance Badge */}
                    {weather && (
                        <div className={`absolute bottom-4 right-4 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2
                    ${isSafeToSpray() ? 'bg-green-500 text-white' : 'bg-red-500 text-white animate-pulse'}`}>
                            {isSafeToSpray() ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                            {isSafeToSpray() ? t('safe_to_spray') : t('unsafe_to_spray')}
                        </div>
                    )}
                </motion.div>

                {/* Crop Growth Tracker Widget */}
                <div className="glass-card bg-white p-6 relative">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-primary" /> {t('crop_tracker')}
                    </h3>

                    {!sowingDate ? (
                        <>
                            <div className="mb-4">
                                <label className="text-xs font-bold text-gray-400 uppercase">{t('select_crop')}</label>
                                <select
                                    value={selectedCrop}
                                    onChange={(e) => setSelectedCrop(e.target.value)}
                                    className="w-full mt-1 p-2 rounded-lg bg-gray-50 border border-gray-200 text-sm"
                                >
                                    {crops.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div className="text-center py-4">
                                <p className="text-gray-500 mb-2 text-sm">{t('enter_sowing_date')}</p>
                                <input
                                    type="date"
                                    className="input-field text-sm"
                                    onChange={(e) => setSowingDate(e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                {/* Display Selected Crop Name when active */}
                                <div className="text-sm">
                                    <span className="text-gray-500 block">{t('crop')}</span>
                                    <span className="font-bold text-primary">{selectedCrop}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm text-gray-500 block">{t('days_passed')}</span>
                                    <span className="text-2xl font-bold text-gray-800">{cropStage?.days} {t('days')}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span>{t('current_stage')}</span>
                                    <span className={cropStage?.color ? cropStage.color.split(' ')[1] : ''}>{cropStage?.name}</span>
                                </div>
                                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${cropStage?.progress || 0}%` }}
                                        className={`h-full ${cropStage?.color ? cropStage.color.split(' ')[0] : 'bg-gray-200'}`}
                                    />
                                </div>
                            </div>

                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                <h4 className="text-xs font-bold text-blue-700 uppercase mb-1">{t('advice')}</h4>
                                <p className="text-xs text-blue-800 leading-relaxed">
                                    {cropStage?.name === t('germination') && "Keep soil moist but not waterlogged. Ensure proper drainage."}
                                    {cropStage?.name === t('vegetative') && "Apply nitrogen-rich fertilizer. Monitor for early pests."}
                                    {cropStage?.name === t('flowering') && "Critical water stage. Avoid pesticide drift."}
                                    {cropStage?.name === t('harvest') && "Reduce watering. Check maturity signs before cutting."}
                                </p>
                            </div>

                            <div className="pt-2 mt-2 border-t border-gray-100 flex gap-2">
                                <button onClick={() => setSowingDate('')} className="text-xs text-gray-400 hover:text-red-500">{t('reset')}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Quick Actions Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <ActionCard
                    to="/crop-recommend"
                    title={t('crop_consult')}
                    desc={t('crop_consult_desc')}
                    icon={<Sprout size={28} />}
                    color="bg-green-100 text-green-600"
                    delay={0}
                    t={t}
                />
                <ActionCard
                    to="/yield-predict"
                    title={t('yield_forecast')}
                    desc={t('yield_forecast_desc')}
                    icon={<TrendingUp size={28} />}
                    color="bg-blue-100 text-blue-600"
                    delay={0.1}
                    t={t}
                />
                <ActionCard
                    to="/disease-detect"
                    title={t('disease_lab')}
                    desc={t('disease_lab_desc')}
                    icon={<AlertCircle size={28} />}
                    color="bg-red-100 text-red-600"
                    delay={0.2}
                    t={t}
                />
                <ActionCard
                    to="/store"
                    title={t('farm_store')}
                    desc={t('farm_store_desc')}
                    icon={<ShoppingBag size={28} />}
                    color="bg-amber-100 text-amber-600"
                    delay={0.3}
                    t={t}
                />
            </motion.div>
        </div>
    );
}

function ActionCard({ to, title, desc, icon, color, delay, t }) {
    return (
        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
            <Link to={to} className="group block h-full bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-glass-hover hover:-translate-y-1 transition-all">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-4">{desc}</p>
                <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                    {t('launch_tool')} <ArrowRight size={16} className="ml-1" />
                </div>
            </Link>
        </motion.div>
    );
}
