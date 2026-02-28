import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Droplets, Thermometer, Wind, Beaker, ArrowRight, Loader2, Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import api from '../api';
import { toast } from 'react-toastify';

export default function CropRecommend() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        N: 90, P: 42, K: 43,
        temperature: 20, humidity: 82, ph: 6, rainfall: 202
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [fetchingWeather, setFetchingWeather] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/ml/recommend', formData);
            setTimeout(() => {
                setResult(data.recommended_crop);
                setLoading(false);
            }, 1000);
        } catch (err) {
            toast.error(t('recommendation_failed'));
            setLoading(false);
        }
    };

    const fetchCurrentWeather = () => {
        if (!navigator.geolocation) {
            toast.error(t('location_not_supported'));
            return;
        }
        setFetchingWeather(true);
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const { latitude, longitude } = pos.coords;
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`);
                const data = await res.json();

                setFormData(prev => ({
                    ...prev,
                    temperature: Math.round(data.current_weather.temperature),
                    humidity: data.hourly.relativehumidity_2m[0],
                    rainfall: 100 // Default avg as API doesn't give historical rainfall easily
                }));
                toast.success(t('loading_weather'));
            } catch (e) {
                toast.error(t('weather_fetch_failed'));
            } finally {
                setFetchingWeather(false);
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">{t('crop_consult')}</h1>
                <p className="text-gray-500">{t('crop_consult_desc')}</p>
            </div>

            <div className="glass-card bg-white/80 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: Soil Data */}
                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
                            <Beaker size={20} /> {t('soil_composition')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input label={t('nitrogen_label')} value={formData.N} onChange={v => setFormData({ ...formData, N: v })} />
                            <Input label={t('phosphorus_label')} value={formData.P} onChange={v => setFormData({ ...formData, P: v })} />
                            <Input label={t('potassium_label')} value={formData.K} onChange={v => setFormData({ ...formData, K: v })} />
                            <Input label={t('ph_level_label')} value={formData.ph} onChange={v => setFormData({ ...formData, ph: v })} step="0.1" />
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Section 2: Environment */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-secondary">
                                <Cloud size={20} /> {t('environmental_factors')}
                            </h3>
                            <button
                                type="button"
                                onClick={fetchCurrentWeather}
                                className="text-xs flex items-center gap-1 text-primary hover:underline disabled:opacity-50"
                                disabled={fetchingWeather}
                            >
                                {fetchingWeather ? <Loader2 size={12} className="animate-spin" /> : <Cloud size={12} />}
                                {t('fetch_weather')}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input label={t('temperature_label')} value={formData.temperature} onChange={v => setFormData({ ...formData, temperature: v })} icon={<Thermometer size={16} />} />
                            <Input label={t('humidity_label')} value={formData.humidity} onChange={v => setFormData({ ...formData, humidity: v })} icon={<Droplets size={16} />} />
                            <Input label={t('rainfall_label')} value={formData.rainfall} onChange={v => setFormData({ ...formData, rainfall: v })} icon={<Wind size={16} />} />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            disabled={loading}
                            className="btn-primary w-full md:w-auto px-8 py-3 text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>{t('analyze')} <ArrowRight /></>}
                        </button>
                    </div>
                </form>
            </div>

            {/* Result Modal/Overlay */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
                        onClick={() => setResult(null)}
                    >
                        <motion.div
                            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Sprout size={40} />
                            </div>
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{t('result')}</h2>
                            <h3 className="text-4xl font-extrabold text-gray-800 mb-6 capitalize">{result}</h3>

                            <p className="text-gray-500 mb-8">{t('best_fitted_crop')}</p>

                            <button onClick={() => setResult(null)} className="w-full btn-secondary">
                                {t('close')}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Input({ label, value, onChange, type = "number", step = "1", icon }) {
    return (
        <div className="relative group">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    step={step}
                    onChange={e => onChange(Number(e.target.value))}
                    className="input-field pl-4 font-mono text-lg font-medium"
                />
                {icon && <div className="absolute right-4 top-3.5 text-gray-400 opacity-50">{icon}</div>}
            </div>
        </div>
    );
}
