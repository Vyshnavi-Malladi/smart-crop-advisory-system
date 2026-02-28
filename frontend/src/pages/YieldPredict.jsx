import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Ruler, Sprout, ArrowRight, Loader2 } from 'lucide-react';
import api from '../api';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function YieldPredict() {
    const [form, setForm] = useState({ crop: 'rice', area: 10 });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const { t } = useTranslation();

    // Crops supported by the Yield Prediction Model
    // Crops supported (ML + Heuristic)
    const crops = [
        'rice', 'wheat', 'maize', 'potato', 'banana', 'soybean', 'sorghum', 'cassava', 'sweet potato', 'yam',
        'apple', 'orange', 'mango', 'grapes', 'watermelon', 'muskmelon', 'papaya', 'coconut',
        'cotton', 'jute', 'coffee', 'groundnut', 'chickpea', 'pomegranate', 'lentil', 'mungbean', 'blackgram'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/ml/yield', form);
            setResult(data);
        } catch (err) {
            toast.error(err.response?.data?.detail || t('prediction_failed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">{t('yield_forecaster_title')}</h1>
                <p className="text-gray-500">{t('yield_forecaster_subtitle')}</p>
            </div>

            <div className="glass-card bg-white/60 p-8 shadow-xl relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Sprout size={18} className="text-primary" /> {t('select_crop_label')}
                        </label>
                        <select
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                            value={form.crop}
                            onChange={e => setForm({ ...form, crop: e.target.value })}
                        >
                            {crops.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Ruler size={18} className="text-secondary" /> {t('land_area_label')}
                        </label>
                        <input
                            type="number"
                            className="input-field"
                            value={form.area}
                            onChange={e => setForm({ ...form, area: Number(e.target.value) })}
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg bg-gradient-to-r from-secondary to-secondary-dark"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>{t('calculate_yield')} <TrendingUp size={20} /></>}
                    </button>
                </form>

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 pt-8 border-t border-gray-100 text-center"
                    >
                        <p className="text-gray-500 text-sm uppercase tracking-wide">{t('estimated_production')}</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <h3 className="text-5xl font-extrabold text-gray-800">
                                {result.predicted_yield}
                            </h3>
                            <span className="text-xl text-gray-400 font-medium self-end mb-2">{t('tons_unit')}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                            {t('based_on_area', { area: result.area, crop: result.crop })}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
