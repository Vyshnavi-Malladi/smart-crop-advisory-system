import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, AlertTriangle, CheckCircle, X, Search } from 'lucide-react';
import api from '../api';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function DiseaseDetect() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);
    const { t } = useTranslation();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
        }
    };

    const handleScan = async () => {
        if (!image) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('file', image);

        try {
            const { data } = await api.post('/ml/disease', formData);
            // Artificial delay for scanning effect
            setTimeout(() => {
                setResult(data);
                setLoading(false);
            }, 2000);
        } catch (err) {
            toast.error(t('prediction_failed'));
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col md:flex-row gap-8">
            {/* Left: Image Upload Zone */}
            <div className="w-full md:w-1/2 flex flex-col">
                <div
                    className={`flex-1 relative rounded-3xl border-2 border-dashed transition-all overflow-hidden flex items-center justify-center bg-gray-50
                    ${preview ? 'border-primary/50' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-100'}
                    `}
                >
                    {preview ? (
                        <>
                            <img src={preview} alt="Upload" className="w-full h-full object-cover" />
                            {/* Scanning Animation Overlay */}
                            {loading && (
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-1 bg-primary/80 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-10"
                                    animate={{ top: ['0%', '100%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                            )}
                            <button
                                onClick={() => { setImage(null); setPreview(null); setResult(null); }}
                                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
                            >
                                <X size={20} />
                            </button>
                        </>
                    ) : (
                        <div
                            className="text-center cursor-pointer p-8"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                                <Camera size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700">{t('upload_leaf_title')}</h3>
                            <p className="text-gray-500 mt-2">{t('upload_leaf_subtitle')}</p>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>

                <button
                    onClick={handleScan}
                    disabled={!image || loading}
                    className="mt-6 btn-primary py-4 text-lg shadow-lg flex items-center justify-center gap-2"
                >
                    {loading ? t('scanning') : <><Search size={22} /> {t('analyze_disease')}</>}
                </button>
            </div>

            {/* Right: Results Panel */}
            <div className="w-full md:w-1/2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <AlertTriangle className="text-accent" /> {t('analysis_report')}
                </h2>

                <AnimatePresence mode="wait">
                    {result ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                <div className="text-red-500 font-bold uppercase text-xs tracking-wider mb-1">{t('detected_issue')}</div>
                                <h3 className="text-2xl font-bold text-gray-800 capitalize">
                                    {(result.cnn?.disease || "Healthy").replace(/_/g, ' ')}
                                </h3>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                                            style={{ width: `${(result.cnn?.confidence || 0) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-600">
                                        {Math.round((result.cnn?.confidence || 0) * 100)}% {t('confidence')}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                                    <h4 className="font-bold text-yellow-800 text-sm uppercase mb-1">🛡️ {t('prevention')}</h4>
                                    <p className="text-gray-700 text-sm">{result.prevention || "Maintain good hygiene."}</p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                                    <h4 className="font-bold text-green-800 text-sm uppercase mb-1">💊 {t('cure_treatment')}</h4>
                                    <p className="text-gray-700 text-sm">{result.cure || "Consult an expert."}</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                    <h4 className="font-bold text-blue-800 text-sm uppercase mb-1">🌾 {t('recommended_fertilizer')}</h4>
                                    <p className="text-gray-700 text-sm">{result.fertilizer || "Balanced NPK."}</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                            <Upload size={48} className="text-gray-300 mb-4" />
                            <p className="text-gray-400">{t('upload_results_placeholder')}</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
