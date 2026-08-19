// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { TrendingUp, Ruler, Sprout, ArrowRight, Loader2 } from 'lucide-react';
// import api from '../api';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';

// export default function YieldPredict() {
//     const [form, setForm] = useState({ crop: 'rice', area: 10 });
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);
//     const { t } = useTranslation();

//     // Crops supported by the Yield Prediction Model
//     // Crops supported (ML + Heuristic)
//     const crops = [
//         'rice', 'wheat', 'maize', 'potato', 'banana', 'soybean', 'sorghum', 'cassava', 'sweet potato', 'yam',
//         'apple', 'orange', 'mango', 'grapes', 'watermelon', 'muskmelon', 'papaya', 'coconut',
//         'cotton', 'jute', 'coffee', 'groundnut', 'chickpea', 'pomegranate', 'lentil', 'mungbean', 'blackgram'
//     ];

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const { data } = await api.post('/ml/yield', form);
//             setResult(data);
//         } catch (err) {
//             toast.error(err.response?.data?.detail || t('prediction_failed'));
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto space-y-8">
//             <div className="text-center space-y-2">
//                 <h1 className="text-3xl font-bold text-gray-800">{t('yield_forecaster_title')}</h1>
//                 <p className="text-gray-500">{t('yield_forecaster_subtitle')}</p>
//             </div>

//             <div className="glass-card bg-white/60 p-8 shadow-xl relative overflow-hidden">
//                 {/* Background Decoration */}
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

//                 <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
//                     <div>
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//                             <Sprout size={18} className="text-primary" /> {t('select_crop_label')}
//                         </label>
//                         <select
//                             className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
//                             value={form.crop}
//                             onChange={e => setForm({ ...form, crop: e.target.value })}
//                         >
//                             {crops.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
//                         </select>
//                     </div>

//                     <div>
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//                             <Ruler size={18} className="text-secondary" /> {t('land_area_label')}
//                         </label>
//                         <input
//                             type="number"
//                             className="input-field"
//                             value={form.area}
//                             onChange={e => setForm({ ...form, area: Number(e.target.value) })}
//                         />
//                     </div>

//                     <button
//                         disabled={loading}
//                         className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg bg-gradient-to-r from-secondary to-secondary-dark"
//                     >
//                         {loading ? <Loader2 className="animate-spin" /> : <>{t('calculate_yield')} <TrendingUp size={20} /></>}
//                     </button>
//                 </form>

//                 {result && (
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="mt-8 pt-8 border-t border-gray-100 text-center"
//                     >
//                         <p className="text-gray-500 text-sm uppercase tracking-wide">{t('estimated_production')}</p>
//                         <div className="flex items-center justify-center gap-2 mt-2">
//                             <h3 className="text-5xl font-extrabold text-gray-800">
//                                 {result.predicted_yield}
//                             </h3>
//                             <span className="text-xl text-gray-400 font-medium self-end mb-2">{t('tons_unit')}</span>
//                         </div>
//                         <p className="text-sm text-gray-400 mt-2">
//                             {t('based_on_area', { area: result.area, crop: result.crop })}
//                         </p>
//                     </motion.div>
//                 )}
//             </div>
//         </div>
//     );
// }


















import { useState } from "react";
import { motion } from "framer-motion";
import {
    Sprout,
    Ruler,
    TrendingUp,
    Loader2,
    ShieldCheck,
    ChevronDown
} from "lucide-react";
import api from "../api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import backgroundImage from "../assets/yield_forecaster_background.png";

export default function YieldPredict() {
    const { t } = useTranslation();

    const [form, setForm] = useState({
        crop: "rice",
        area: 10
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const crops = [
        "rice", "wheat", "maize", "potato", "banana", "soybean",
        "sorghum", "cassava", "sweet potato", "yam", "apple", "orange",
        "mango", "grapes", "watermelon", "muskmelon", "papaya", "coconut",
        "cotton", "jute", "coffee", "groundnut", "chickpea", "pomegranate",
        "lentil", "mungbean", "blackgram"
    ];

    const formatCropName = (crop) => {
        // Try to get translated name
        const translated = t(`crop_names.${crop.toLowerCase()}`);
        
        // If translation exists, use it
        if (translated && translated !== `crop_names.${crop.toLowerCase()}`) {
            return translated;
        }
        
        // Fallback: Format the name
        return crop
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.crop) {
            toast.error(t("please_select_crop"));
            return;
        }

        if (!form.area || form.area <= 0) {
            toast.error(t("please_enter_valid_area"));
            return;
        }

        setLoading(true);

        try {
            const { data } = await api.post("/ml/yield", form);
            setResult(data);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.detail || t("prediction_failed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`

                /* =====================================================
                   MAIN PAGE
                ===================================================== */

                .yield-page {
                    width: 100%;
                    min-height: calc(100vh - 82px);
                    background: #f5f8f7;
                    color: #15293d;
                    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
                    overflow-y: auto;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                }

                .yield-page *,
                .yield-page *::before,
                .yield-page *::after {
                    box-sizing: border-box;
                }

                /* =====================================================
                   HERO
                ===================================================== */

                .yield-hero {
                    position: relative;
                    width: 100%;
                    height: 240px;
                    overflow: hidden;
                    background: linear-gradient(180deg, #edf9fb 0%, #edf9fb 55%, #e7f5ef 100%);
                    flex-shrink: 0;
                }

                .yield-background {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: auto;
                    min-height: 0;
                    display: block;
                    object-fit: contain;
                    object-position: bottom center;
                    z-index: 1;
                }

                .yield-hero-overlay {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    pointer-events: none;
                    background: linear-gradient(
                        180deg,
                        rgba(237,249,251,1) 0%,
                        rgba(237,249,251,.98) 20%,
                        rgba(237,249,251,.84) 39%,
                        rgba(237,249,251,.40) 60%,
                        rgba(237,249,251,.04) 80%
                    );
                }

                .yield-hero-content {
                    position: relative;
                    z-index: 5;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 0 20px;
                }

                .yield-hero-icon {
                    width: 72px;
                    height: 72px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: #d9f1dc;
                    color: #159447;
                    box-shadow: 0 4px 16px rgba(21, 148, 71, 0.1);
                }

                .yield-hero-icon svg {
                    width: 36px;
                    height: 36px;
                }

                .yield-title {
                    margin: 12px 0 0;
                    color: #10263a;
                    font-size: 36px;
                    line-height: 1.05;
                    font-weight: 750;
                    letter-spacing: -1px;
                }

               .yield-subtitle {
    margin: 8px 0 0;
    max-width: 560px;
    color: #4a5f73;
    font-size: 20px;
    line-height: 1.6;
    font-weight: 500;
    letter-spacing: -0.2px;
    background: linear-gradient(135deg, #252e38, #091218);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

                /* =====================================================
                   MAIN CONTENT
                ===================================================== */

                .yield-content {
                    position: relative;
                    z-index: 20;
                    max-width: 920px;
                    margin: 0 auto;
                    padding: 40px 60px 60px;
                    flex: 1;
                    display: flex;
                    align-items: flex-start;
                }

                /* =====================================================
                   FORM CARD
                ===================================================== */

                .yield-form-card {
                    width: 100%;
                    padding: 36px 40px 32px;
                    border: 1px solid #e1e9e4;
                    border-radius: 20px;
                    background: #ffffff;
                    box-shadow: 0 12px 40px rgba(31, 56, 42, 0.08);
                    transition: box-shadow 0.3s ease;
                    min-height: 380px;
                }

                .yield-form-card:hover {
                    box-shadow: 0 16px 48px rgba(31, 56, 42, 0.12);
                }

                /* =====================================================
                   CARD HEADER
                ===================================================== */

                .yield-card-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 28px;
                }

                .yield-card-icon {
                    width: 56px;
                    height: 56px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 14px;
                    background: #e8f7e9;
                    color: #159447;
                }

                .yield-card-icon svg {
                    width: 28px;
                    height: 28px;
                }

                .yield-card-title {
                    margin: 0;
                    color: #1b2e42;
                    font-size: 22px;
                    line-height: 1.15;
                    font-weight: 700;
                }

                .yield-card-subtitle {
                    margin: 4px 0 0;
                    color: #718096;
                    font-size: 14px;
                    line-height: 1.3;
                }

                /* =====================================================
                   FORM FIELDS
                ===================================================== */

                .yield-fields {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                }

                /* =====================================================
                   LABEL
                ===================================================== */

                .yield-label {
                    display: block;
                    margin: 0 0 8px;
                    color: #48586c;
                    font-size: 14px;
                    line-height: 1.2;
                    font-weight: 600;
                }

                /* =====================================================
                   INPUT BOX
                ===================================================== */

                .yield-input-box {
                    position: relative;
                    width: 100%;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    border: 1.5px solid #dce3e7;
                    border-radius: 12px;
                    background: #fafcfa;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
                }

                .yield-input-box:hover {
                    border-color: #b9d7bf;
                    background: #ffffff;
                }

                .yield-input-box:focus-within {
                    border-color: #16a34a;
                    box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.08);
                    background: #ffffff;
                }

                .yield-input-icon {
                    width: 56px;
                    height: 100%;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-right: 1px solid #dcebdc;
                    background: #f0f9ef;
                    color: #16a34a;
                }

                .yield-input-icon svg {
                    width: 22px;
                    height: 22px;
                }

                .yield-select {
                    width: 100%;
                    height: 100%;
                    padding: 0 40px 0 16px;
                    border: none;
                    outline: none;
                    appearance: none;
                    background: transparent;
                    color: #1b2e42;
                    font-size: 15px;
                    font-weight: 500;
                    cursor: pointer;
                }

                .yield-select-arrow {
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #65768a;
                    pointer-events: none;
                }

                .yield-area-input {
                    width: 100%;
                    height: 100%;
                    padding: 0 80px 0 16px;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #1b2e42;
                    font-size: 15px;
                    font-weight: 500;
                }

                .yield-area-input::-webkit-inner-spin-button,
                .yield-area-input::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                .yield-area-input[type="number"] {
                    -moz-appearance: textfield;
                }

                .yield-area-unit {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 78px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-left: 1px solid #e1e6e9;
                    background: #f4f6f7;
                    color: #68778a;
                    font-size: 13px;
                    font-weight: 500;
                }

                /* =====================================================
                   CALCULATE BUTTON
                ===================================================== */

                .yield-calculate {
                    width: 100%;
                    height: 58px;
                    margin-top: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    border: none;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #16a34a, #15803d);
                    color: #ffffff;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 16px rgba(22, 163, 74, 0.2);
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }

                .yield-calculate:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(22, 163, 74, 0.28);
                }

                .yield-calculate:active:not(:disabled) {
                    transform: translateY(0);
                }

                .yield-calculate:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                    transform: none;
                }

                .yield-calculate svg {
                    width: 20px;
                    height: 20px;
                }

                /* =====================================================
                   INFO LINE
                ===================================================== */

                .yield-info {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 20px;
                    color: #7a8898;
                    font-size: 13px;
                    line-height: 1.4;
                    flex-wrap: wrap;
                    padding: 4px 0;
                }

                .yield-info svg {
                    color: #16a34a;
                    flex-shrink: 0;
                    width: 16px;
                    height: 16px;
                }

                .yield-info-dot {
                    color: #c5ced6;
                    margin: 0 2px;
                }

                /* =====================================================
                   RESULT
                ===================================================== */

                .yield-result {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1.5px solid #edf0ee;
                    text-align: center;
                }

                .yield-result-label {
                    margin: 0;
                    color: #7c8996;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    font-weight: 600;
                }

                .yield-result-number {
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    gap: 6px;
                    margin-top: 6px;
                }

                .yield-result-number strong {
                    color: #10263a;
                    font-size: 36px;
                    line-height: 1;
                    font-weight: 800;
                }

                .yield-result-number span {
                    margin-bottom: 2px;
                    color: #788493;
                    font-size: 14px;
                    font-weight: 500;
                }

                .yield-result-description {
                    margin: 6px 0 0;
                    color: #87929f;
                    font-size: 13px;
                }

                /* =====================================================
                   SPINNER
                ===================================================== */

                .animate-spin {
                    animation: yield-spin 1s linear infinite;
                }

                @keyframes yield-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* =====================================================
                   RESPONSIVE: LAPTOP / DESKTOP
                ===================================================== */

                @media (min-width: 1024px) and (max-height: 900px) {
                    .yield-hero {
                        height: 200px;
                    }

                    .yield-hero-icon {
                        width: 60px;
                        height: 60px;
                    }

                    .yield-hero-icon svg {
                        width: 30px;
                        height: 30px;
                    }

                    .yield-title {
                        font-size: 30px;
                    }

                    .yield-subtitle {
                        font-size: 13px;
                    }

                    .yield-content {
                        padding: 30px 60px 40px;
                    }

                    .yield-form-card {
                        padding: 28px 32px 24px;
                        min-height: 340px;
                    }

                    .yield-input-box {
                        height: 48px;
                    }

                    .yield-calculate {
                        height: 50px;
                        font-size: 15px;
                        margin-top: 22px;
                    }

                    .yield-fields {
                        gap: 22px;
                    }

                    .yield-card-header {
                        margin-bottom: 20px;
                    }

                    .yield-card-icon {
                        width: 48px;
                        height: 48px;
                    }

                    .yield-card-icon svg {
                        width: 24px;
                        height: 24px;
                    }

                    .yield-card-title {
                        font-size: 19px;
                    }
                }

                @media (max-width: 1200px) {
                    .yield-content {
                        padding: 30px 40px 40px;
                    }
                }

                /* =====================================================
                   RESPONSIVE: TABLET
                ===================================================== */

                @media (max-width: 900px) {
                    .yield-hero {
                        height: 200px;
                    }

                    .yield-hero-icon {
                        width: 60px;
                        height: 60px;
                    }

                    .yield-hero-icon svg {
                        width: 30px;
                        height: 30px;
                    }

                    .yield-title {
                        font-size: 30px;
                    }

                    .yield-subtitle {
                        font-size: 13px;
                        max-width: 440px;
                    }

                    .yield-content {
                        padding: 24px 30px 32px;
                    }

                    .yield-form-card {
                        padding: 24px 24px 20px;
                        min-height: auto;
                    }

                    .yield-fields {
                        gap: 18px;
                    }

                    .yield-input-box {
                        height: 48px;
                    }

                    .yield-calculate {
                        height: 48px;
                        font-size: 15px;
                    }

                    .yield-card-header {
                        margin-bottom: 20px;
                    }

                    .yield-card-icon {
                        width: 48px;
                        height: 48px;
                    }

                    .yield-card-title {
                        font-size: 19px;
                    }
                }

                /* =====================================================
                   RESPONSIVE: MOBILE
                ===================================================== */

                @media (max-width: 650px) {
                    .yield-hero {
                        height: 180px;
                    }

                    .yield-hero-icon {
                        width: 52px;
                        height: 52px;
                    }

                    .yield-hero-icon svg {
                        width: 26px;
                        height: 26px;
                    }

                    .yield-title {
                        font-size: 26px;
                        margin-top: 8px;
                    }

                    .yield-subtitle {
                        font-size: 12px;
                        max-width: 320px;
                    }

                    .yield-content {
                        padding: 16px 16px 24px;
                    }

                    .yield-form-card {
                        padding: 18px 16px 16px;
                        border-radius: 16px;
                        min-height: auto;
                    }

                    .yield-card-header {
                        gap: 12px;
                        margin-bottom: 16px;
                    }

                    .yield-card-icon {
                        width: 42px;
                        height: 42px;
                    }

                    .yield-card-icon svg {
                        width: 20px;
                        height: 20px;
                    }

                    .yield-card-title {
                        font-size: 16px;
                    }

                    .yield-card-subtitle {
                        font-size: 12px;
                    }

                    .yield-fields {
                        grid-template-columns: 1fr;
                        gap: 14px;
                    }

                    .yield-label {
                        font-size: 12px;
                        margin-bottom: 4px;
                    }

                    .yield-input-box {
                        height: 46px;
                    }

                    .yield-input-icon {
                        width: 44px;
                    }

                    .yield-input-icon svg {
                        width: 18px;
                        height: 18px;
                    }

                    .yield-select,
                    .yield-area-input {
                        font-size: 13px;
                    }

                    .yield-calculate {
                        height: 48px;
                        margin-top: 16px;
                        font-size: 14px;
                        border-radius: 10px;
                    }

                    .yield-calculate svg {
                        width: 18px;
                        height: 18px;
                    }

                    .yield-info {
                        font-size: 11px;
                        gap: 4px;
                        margin-top: 12px;
                    }

                    .yield-info svg {
                        width: 14px;
                        height: 14px;
                    }

                    .yield-result {
                        margin-top: 14px;
                        padding-top: 14px;
                    }

                    .yield-result-number strong {
                        font-size: 28px;
                    }

                    .yield-result-number span {
                        font-size: 12px;
                    }

                    .yield-result-description {
                        font-size: 11px;
                    }
                }

                /* =====================================================
                   RESPONSIVE: SMALL MOBILE
                ===================================================== */

                @media (max-width: 400px) {
                    .yield-hero {
                        height: 160px;
                    }

                    .yield-hero-icon {
                        width: 44px;
                        height: 44px;
                    }

                    .yield-hero-icon svg {
                        width: 22px;
                        height: 22px;
                    }

                    .yield-title {
                        font-size: 22px;
                    }

                    .yield-subtitle {
                        font-size: 11px;
                    }

                    .yield-content {
                        padding: 12px 12px 16px;
                    }

                    .yield-form-card {
                        padding: 14px 12px 14px;
                    }

                    .yield-card-title {
                        font-size: 14px;
                    }

                    .yield-card-subtitle {
                        font-size: 11px;
                    }

                    .yield-input-box {
                        height: 42px;
                    }

                    .yield-select,
                    .yield-area-input {
                        font-size: 12px;
                        padding: 0 8px;
                    }

                    .yield-calculate {
                        height: 42px;
                        font-size: 13px;
                    }

                    .yield-result-number strong {
                        font-size: 24px;
                    }
                }

            `}</style>

            <div className="yield-page">

                {/* =====================================================
                   HERO
                ===================================================== */}

                <section className="yield-hero">

                    <img
                        src={backgroundImage}
                        alt="Agricultural landscape"
                        className="yield-background"
                    />

                    <div className="yield-hero-overlay" />

                    <div className="yield-hero-content">

                        <motion.div
                            className="yield-hero-icon"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Sprout strokeWidth={1.7} />
                        </motion.div>

                        <motion.h1
                            className="yield-title"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            {t("yield_forecaster_title")}
                        </motion.h1>

                        <motion.p
                            className="yield-subtitle"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            {t("yield_forecaster_subtitle")}
                        </motion.p>

                    </div>

                </section>

                {/* =====================================================
                   MAIN CONTENT
                ===================================================== */}

                <main className="yield-content">

                    <motion.section
                        className="yield-form-card"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >

                        {/* CARD HEADER */}

                        <div className="yield-card-header">

                            <div className="yield-card-icon">
                                <Sprout strokeWidth={1.7} />
                            </div>

                            <div>

                                <h2 className="yield-card-title">
                                    {t("enter_details")}
                                </h2>

                                <p className="yield-card-subtitle">
                                    {t("enter_details_desc")}
                                </p>

                            </div>

                        </div>

                        {/* FORM */}

                        <form onSubmit={handleSubmit}>

                            <div className="yield-fields">

                                {/* CROP */}

                                <div>

                                    <label className="yield-label">
                                        {t("select_crop_label")}
                                    </label>

                                    <div className="yield-input-box">

                                        <div className="yield-input-icon">
                                            <Sprout strokeWidth={1.7} />
                                        </div>

                                        <select
                                            value={form.crop}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    crop: e.target.value
                                                })
                                            }
                                            className="yield-select"
                                        >

                                            {crops.map((crop) => (
                                                <option key={crop} value={crop}>
                                                    {formatCropName(crop)}
                                                </option>
                                            ))}

                                        </select>

                                        <ChevronDown
                                            size={18}
                                            className="yield-select-arrow"
                                        />

                                    </div>

                                </div>

                                {/* LAND AREA */}

                                <div>

                                    <label className="yield-label">
                                        {t("land_area_label")}
                                    </label>

                                    <div className="yield-input-box">

                                        <div className="yield-input-icon">
                                            <Ruler strokeWidth={1.7} />
                                        </div>

                                        <input
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            value={form.area}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    area: Number(e.target.value)
                                                })
                                            }
                                            className="yield-area-input"
                                            placeholder="10"
                                        />

                                        <span className="yield-area-unit">
                                            acres
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* CALCULATE */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="yield-calculate"
                            >

                                {loading ? (
                                    <>
                                        <Loader2 size={19} className="animate-spin" />
                                        {t("calculating")}
                                    </>
                                ) : (
                                    <>
                                        {t("calculate_yield")}
                                        <TrendingUp size={20} />
                                    </>
                                )}

                            </button>

                        </form>

                        {/* INFO */}

                        <div className="yield-info">

                            <ShieldCheck size={16} />

                            <span>{t("ai_powered")}</span>

                            <span className="yield-info-dot">•</span>

                            <span>{t("based_on_historical")}</span>

                            <span className="yield-info-dot">•</span>

                            <span>{t("accurate_results")}</span>

                        </div>

                        {/* RESULT */}

                        {result && (

                            <motion.div
                                className="yield-result"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >

                                <p className="yield-result-label">
                                    {t("estimated_production")}
                                </p>

                                <div className="yield-result-number">

                                    <strong>
                                        {result.predicted_yield}
                                    </strong>

                                    <span>
                                        {t("tons_unit")}
                                    </span>

                                </div>

                                <p className="yield-result-description">
                                    {t("based_on_area", {
                                        area: result.area,
                                        crop: formatCropName(result.crop)
                                    })}
                                </p>

                            </motion.div>

                        )}

                    </motion.section>

                </main>

            </div>
        </>
    );
}