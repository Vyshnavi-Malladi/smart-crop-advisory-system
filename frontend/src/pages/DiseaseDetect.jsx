// import { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Upload, Camera, AlertTriangle, CheckCircle, X, Search } from 'lucide-react';
// import api from '../api';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';

// export default function DiseaseDetect() {
//     const [image, setImage] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);
//     const fileInputRef = useRef(null);
//     const { t } = useTranslation();

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImage(file);
//             setPreview(URL.createObjectURL(file));
//             setResult(null);
//         }
//     };

//     const handleScan = async () => {
//         if (!image) return;
//         setLoading(true);

//         const formData = new FormData();
//         formData.append('file', image);

//         try {
//             const { data } = await api.post('/ml/disease', formData);

//             setTimeout(() => {
//                 setResult(data);
//                 setLoading(false);
//             }, 2000);

//         } catch (err) {
//             toast.error(t('prediction_failed'));
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col md:flex-row gap-8">
            
//             {/* Left: Image Upload Zone */}
//             <div className="w-full md:w-1/2 flex flex-col">
//                 <div
//                     className={`flex-1 relative rounded-3xl border-2 border-dashed transition-all overflow-hidden flex items-center justify-center bg-gray-50
//                     ${preview ? 'border-primary/50' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-100'}`}
//                 >
//                     {preview ? (
//                         <>
//                             <img src={preview} alt="Upload" className="w-full h-full object-cover" />

//                             {loading && (
//                                 <motion.div
//                                     className="absolute top-0 left-0 right-0 h-1 bg-primary/80 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-10"
//                                     animate={{ top: ['0%', '100%'] }}
//                                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//                                 />
//                             )}

//                             <button
//                                 onClick={() => { setImage(null); setPreview(null); setResult(null); }}
//                                 className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
//                             >
//                                 <X size={20} />
//                             </button>
//                         </>
//                     ) : (
//                         <div
//                             className="text-center cursor-pointer p-8"
//                             onClick={() => fileInputRef.current.click()}
//                         >
//                             <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
//                                 <Camera size={40} />
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-700">{t('upload_leaf_title')}</h3>
//                             <p className="text-gray-500 mt-2">{t('upload_leaf_subtitle')}</p>
//                         </div>
//                     )}

//                     <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleFileChange}
//                         accept="image/*"
//                         className="hidden"
//                     />
//                 </div>

//                 <button
//                     onClick={handleScan}
//                     disabled={!image || loading}
//                     className="mt-6 btn-primary py-4 text-lg shadow-lg flex items-center justify-center gap-2"
//                 >
//                     {loading ? t('scanning') : <><Search size={22} /> {t('analyze_disease')}</>}
//                 </button>
//             </div>

//             {/* Right: Results Panel */}
//             <div className="w-full md:w-1/2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//                     <AlertTriangle className="text-accent" /> {t('analysis_report')}
//                 </h2>

//                 <AnimatePresence mode="wait">
//                     {result ? (
//                         <motion.div
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="space-y-6"
//                         >
//                             <div className="p-4 bg-red-50 rounded-xl border border-red-100">
//                                 <div className="text-red-500 font-bold uppercase text-xs tracking-wider mb-1">
//                                     {t('detected_issue')}
//                                 </div>

//                                 {/* FIXED DISEASE DISPLAY */}
//                                 <h3 className="text-2xl font-bold text-gray-800 capitalize">
//                                     {(result.disease || t('unknown')).replace(/_/g, ' ')}
//                                 </h3>

//                                 {/* FIXED CONFIDENCE DISPLAY */}
//                                 <div className="mt-2 flex items-center gap-2">
//                                     <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//                                         <div
//                                             className="h-full bg-gradient-to-r from-orange-500 to-red-500"
//                                             style={{ width: `${result.confidence || 0}%` }}
//                                         />
//                                     </div>
//                                     <span className="text-sm font-bold text-gray-600">
//                                         {Math.round(result.confidence || 0)}% {t('confidence')}
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 gap-4">
//                                 <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-100">
//                                     <h4 className="font-bold text-yellow-800 text-sm uppercase mb-1">
//                                         🛡️ {t('prevention')}
//                                     </h4>
//                                     <p className="text-gray-700 text-sm">
//                                        {result.prevention || t('default_prevention')}
//                                     </p>
//                                 </div>

//                                 <div className="p-3 bg-green-50 rounded-xl border border-green-100">
//                                     <h4 className="font-bold text-green-800 text-sm uppercase mb-1">
//                                         💊 {t('cure_treatment')}
//                                     </h4>
//                                     <p className="text-gray-700 text-sm">
//                                         {result.cure || t('default_cure')}
//                                     </p>
//                                 </div>

//                                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
//     <h4 className="font-bold text-blue-800 text-sm uppercase mb-1">
//         🌾 {t('soil_nutrient_advice')}
//     </h4>
//     <p className="text-gray-700 text-sm">
//         {result.fertilizer || t('default_fertilizer')}
//     </p>
// </div>
//                             </div>
//                         </motion.div>
//                     ) : (
//                         <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
//                             <Upload size={48} className="text-gray-300 mb-4" />
//                             <p className="text-gray-400">{t('upload_results_placeholder')}</p>
//                         </div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }



// import { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Upload, Camera, AlertTriangle, CheckCircle, X, Search } from 'lucide-react';
// import axios from 'axios'; // ✅ Added for ML service call
// import api from '../api'; // kept (used elsewhere in project)
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';

// export default function DiseaseDetect() {
//     const [image, setImage] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);
//     const fileInputRef = useRef(null);
//     const { t } = useTranslation();

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImage(file);
//             setPreview(URL.createObjectURL(file));
//             setResult(null);
//         }
//     };

//     const handleScan = async () => {
//         if (!image) return;
//         setLoading(true);

//         const formData = new FormData();
//         formData.append('file', image);

//         try {
//             // ✅ FIXED: Direct call to FastAPI ML server
//             const { data } = await axios.post(
//                 'http://localhost:8001/predict_disease',
//                 formData,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 }
//             );

//             setTimeout(() => {
//                 setResult(data);
//                 setLoading(false);
//             }, 2000);

//         } catch (err) {
//             console.error("Disease Prediction Error:", err);
//             toast.error(t('prediction_failed'));
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col md:flex-row gap-8">
            
//             {/* Left: Image Upload Zone */}
//             <div className="w-full md:w-1/2 flex flex-col">
//                 <div
//                     className={`flex-1 relative rounded-3xl border-2 border-dashed transition-all overflow-hidden flex items-center justify-center bg-gray-50
//                     ${preview ? 'border-primary/50' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-100'}`}
//                 >
//                     {preview ? (
//                         <>
//                             <img src={preview} alt="Upload" className="w-full h-full object-cover" />

//                             {loading && (
//                                 <motion.div
//                                     className="absolute top-0 left-0 right-0 h-1 bg-primary/80 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-10"
//                                     animate={{ top: ['0%', '100%'] }}
//                                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//                                 />
//                             )}

//                             <button
//                                 onClick={() => { setImage(null); setPreview(null); setResult(null); }}
//                                 className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
//                             >
//                                 <X size={20} />
//                             </button>
//                         </>
//                     ) : (
//                         <div
//                             className="text-center cursor-pointer p-8"
//                             onClick={() => fileInputRef.current.click()}
//                         >
//                             <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
//                                 <Camera size={40} />
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-700">{t('upload_leaf_title')}</h3>
//                             <p className="text-gray-500 mt-2">{t('upload_leaf_subtitle')}</p>
//                         </div>
//                     )}

//                     <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleFileChange}
//                         accept="image/*"
//                         className="hidden"
//                     />
//                 </div>

//                 <button
//                     onClick={handleScan}
//                     disabled={!image || loading}
//                     className="mt-6 btn-primary py-4 text-lg shadow-lg flex items-center justify-center gap-2"
//                 >
//                     {loading ? t('scanning') : <><Search size={22} /> {t('analyze_disease')}</>}
//                 </button>
//             </div>

//             {/* Right: Results Panel */}
//             <div className="w-full md:w-1/2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//                     <AlertTriangle className="text-accent" /> {t('analysis_report')}
//                 </h2>

//                 <AnimatePresence mode="wait">
//                     {result ? (
//                         <motion.div
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="space-y-6"
//                         >
//                             <div className="p-4 bg-red-50 rounded-xl border border-red-100">
//                                 <div className="text-red-500 font-bold uppercase text-xs tracking-wider mb-1">
//                                     {t('detected_issue')}
//                                 </div>

//                                 <h3 className="text-2xl font-bold text-gray-800 capitalize">
//                                     {(result.disease || t('unknown')).replace(/_/g, ' ')}
//                                 </h3>

//                                 <div className="mt-2 flex items-center gap-2">
//                                     <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//                                         <div
//                                             className="h-full bg-gradient-to-r from-orange-500 to-red-500"
//                                             style={{ width: `${result.confidence || 0}%` }}
//                                         />
//                                     </div>
//                                     <span className="text-sm font-bold text-gray-600">
//                                         {Math.round(result.confidence || 0)}% {t('confidence')}
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 gap-4">
//                                 <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-100">
//                                     <h4 className="font-bold text-yellow-800 text-sm uppercase mb-1">
//                                         🛡️ {t('prevention')}
//                                     </h4>
//                                     <p className="text-gray-700 text-sm">
//                                        {result.prevention || t('default_prevention')}
//                                     </p>
//                                 </div>

//                                 <div className="p-3 bg-green-50 rounded-xl border border-green-100">
//                                     <h4 className="font-bold text-green-800 text-sm uppercase mb-1">
//                                         💊 {t('cure_treatment')}
//                                     </h4>
//                                     <p className="text-gray-700 text-sm">
//                                         {result.cure || t('default_cure')}
//                                     </p>
//                                 </div>

//                                 <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
//                                     <h4 className="font-bold text-blue-800 text-sm uppercase mb-1">
//                                         🌾 {t('soil_nutrient_advice')}
//                                     </h4>
//                                     <p className="text-gray-700 text-sm">
//                                         {result.fertilizer || t('default_fertilizer')}
//                                     </p>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ) : (
//                         <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
//                             <Upload size={48} className="text-gray-300 mb-4" />
//                             <p className="text-gray-400">{t('upload_results_placeholder')}</p>
//                         </div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }















import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    AlertTriangle,
    X,
    Search,
    Leaf,
    ShieldCheck,
    Zap,
    Target,
    BarChart3,
    Pill,
    Sprout,
    ClipboardList
} from 'lucide-react';
import axios from 'axios';
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
            // DO NOT CHANGE - ML API
            const { data } = await axios.post(
                'http://localhost:8001/predict_disease',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setTimeout(() => {
                setResult(data);
                setLoading(false);
            }, 2000);

        } catch (err) {
            console.error("Disease Prediction Error:", err);
            toast.error(t('prediction_failed'));
            setLoading(false);
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
        setResult(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-full h-[calc(100vh-72px)] bg-[#f8fafb] overflow-hidden px-6 py-4">

            {/* =====================================================
                PAGE HEADER
            ===================================================== */}
            <div className="flex items-center gap-3 mb-3 h-[58px] flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-[#e9f5ef] flex items-center justify-center">
                    <ShieldCheck size={26} strokeWidth={2} className="text-[#15945a]" />
                </div>

                <div>
                    <h1 className="text-[24px] font-bold text-[#102a2f] leading-tight">
                        {t('disease_detect.title')}
                    </h1>
                    <p className="text-[13px] text-[#66777d] mt-0.5">
                        {t('disease_detect.subtitle')}
                    </p>
                </div>
            </div>

            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100%-71px)] min-h-0">

                {/* =================================================
                    LEFT CARD
                ================================================= */}
                <div className="bg-white rounded-[16px] border border-[#e7ece9] shadow-[0_3px_15px_rgba(20,50,40,0.05)] p-4 flex flex-col min-h-0">

                    {/* Upload Area */}
                    <div
                        className={`
                            flex-1 min-h-0 relative
                            rounded-[14px] border-[1.5px] border-dashed
                            transition-all duration-300 overflow-hidden
                            flex items-center justify-center bg-[#fbfdfc]
                            ${preview
                                ? 'border-[#48b981]'
                                : 'border-[#8ed8ba] hover:border-[#20a565] hover:bg-[#f7fcf9]'
                            }
                        `}
                        onClick={() => {
                            if (!preview) {
                                fileInputRef.current?.click();
                            }
                        }}
                    >
                        {preview ? (
                            <>
                                <img
                                    src={preview}
                                    alt="Uploaded leaf"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-black/5" />

                                {loading && (
                                    <motion.div
                                        className="absolute left-0 right-0 h-[3px] bg-[#18a565] shadow-[0_0_20px_rgba(24,165,101,0.9)] z-20"
                                        animate={{ top: ['0%', '100%'] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: 'linear'
                                        }}
                                    />
                                )}

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeImage();
                                    }}
                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/55 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/75 transition z-30"
                                >
                                    <X size={17} />
                                </button>

                                <div className="absolute left-3 bottom-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#127b4c] text-[11px] font-semibold shadow-sm">
                                    {t('disease_detect.leaf_selected')}
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-center px-5">
                                <div className="w-[62px] h-[62px] rounded-full bg-[#eaf6ef] flex items-center justify-center mb-3">
                                    <Leaf size={34} strokeWidth={2} className="text-[#15945a]" />
                                </div>

                                <h3 className="text-[17px] font-bold text-[#147d4c]">
                                    {t('disease_detect.upload_title')}
                                </h3>

                                <p className="text-[12px] text-[#566b70] mt-1.5">
                                    {t('disease_detect.upload_subtitle')}
                                </p>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                    }}
                                    className="mt-3 px-6 py-2 rounded-lg bg-[#15945a] hover:bg-[#117d4b] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-[0_4px_10px_rgba(21,148,90,0.16)] transition-all"
                                >
                                    <Upload size={16} />
                                    {t('disease_detect.choose_image')}
                                </button>

                                <p className="text-[10px] text-[#708087] mt-2.5">
                                    {t('disease_detect.supported_formats')}
                                </p>

                                <p className="text-[10px] text-[#708087] mt-0.5">
                                    {t('disease_detect.max_size')}
                                </p>

                                {/* Feature Strip */}
                                <div className="w-[90%] mt-5 rounded-xl bg-[#f3faf6] px-3 py-2.5 grid grid-cols-3">
                                    <div className="flex flex-col items-center justify-center text-center border-r border-[#d6e9df] px-2">
                                        <div className="w-6 h-6 rounded-full bg-[#e4f4eb] flex items-center justify-center mb-1">
                                            <Target size={14} className="text-[#15945a]" />
                                        </div>
                                        <span className="text-[10px] font-bold text-[#157849]">
                                            {t('disease_detect.feature_accurate')}
                                        </span>
                                        <span className="text-[9px] text-[#657a75] mt-0.5 leading-tight">
                                            {t('disease_detect.feature_accurate_desc')}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center text-center border-r border-[#d6e9df] px-2">
                                        <div className="w-6 h-6 rounded-full bg-[#e4f4eb] flex items-center justify-center mb-1">
                                            <Zap size={14} className="text-[#15945a]" />
                                        </div>
                                        <span className="text-[10px] font-bold text-[#157849]">
                                            {t('disease_detect.feature_fast')}
                                        </span>
                                        <span className="text-[9px] text-[#657a75] mt-0.5 leading-tight">
                                            {t('disease_detect.feature_fast_desc')}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center text-center px-2">
                                        <div className="w-6 h-6 rounded-full bg-[#e4f4eb] flex items-center justify-center mb-1">
                                            <ShieldCheck size={14} className="text-[#15945a]" />
                                        </div>
                                        <span className="text-[10px] font-bold text-[#157849]">
                                            {t('disease_detect.feature_secure')}
                                        </span>
                                        <span className="text-[9px] text-[#657a75] mt-0.5 leading-tight">
                                            {t('disease_detect.feature_secure_desc')}
                                        </span>
                                    </div>
                                </div>
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

                    {/* Analyze Button */}
                    <button
                        onClick={handleScan}
                        disabled={!image || loading}
                        className={`
                            mt-3 w-full h-[44px] rounded-[10px]
                            flex items-center justify-center gap-2
                            text-[15px] font-semibold text-white
                            transition-all duration-200 flex-shrink-0
                            ${!image || loading
                                ? 'bg-[#9edbc0] cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#15945a] to-[#4cc995] hover:from-[#117d4b] hover:to-[#38b982] shadow-[0_4px_12px_rgba(21,148,90,0.16)]'
                            }
                        `}
                    >
                        {loading ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: 'linear'
                                    }}
                                    className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                                />
                                {t('disease_detect.scanning')}
                            </>
                        ) : (
                            <>
                                <Search size={19} />
                                {t('disease_detect.analyze_button')}
                            </>
                        )}
                    </button>
                </div>

                {/* =================================================
                    RIGHT - ANALYSIS REPORT
                ================================================= */}
                <div className="bg-white rounded-[16px] border border-[#e7ece9] shadow-[0_3px_15px_rgba(20,50,40,0.05)] p-4 flex flex-col min-h-0">

                    {/* Report Header */}
                    <div className="flex items-center gap-2.5 pb-3 border-b border-[#edf1ef] flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[#edf7f1] flex items-center justify-center">
                            <BarChart3 size={16} className="text-[#15945a]" />
                        </div>
                        <h2 className="text-[16px] font-bold text-[#172f34]">
                            {t('analysis_report')}
                        </h2>
                    </div>

                    {/* Report Content */}
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-1 min-h-0 pt-3 flex flex-col justify-center gap-3"
                            >
                                {/* Detected Issue */}
                                <div className="p-3 bg-[#fff5f3] rounded-xl border border-[#f8ddd7]">
                                    <div className="text-[#e45b48] font-bold uppercase text-[9px] tracking-wider mb-1">
                                        {t('disease_detect.detected_issue')}
                                    </div>
                                    <h3 className="text-[18px] font-bold text-[#26383c] capitalize">
                                        {(result.disease || t('unknown')).replace(/_/g, ' ')}
                                    </h3>
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                                                style={{ width: `${result.confidence || 0}%` }}
                                            />
                                        </div>
                                        <span className="text-[11px] font-bold text-gray-600 whitespace-nowrap">
                                            {Math.round(result.confidence || 0)}% {t('disease_detect.confidence')}
                                        </span>
                                    </div>
                                </div>

                                {/* Prevention */}
                                <div className="p-3 bg-[#fffaf0] rounded-xl border border-[#f6e8bd]">
                                    <h4 className="font-bold text-[#9b7113] text-[10px] uppercase mb-1 flex items-center gap-1.5">
                                        🛡️ {t('disease_detect.prevention')}
                                    </h4>
                                    <p className="text-[#46565a] text-[12px] leading-snug">
                                        {result.prevention || t('default_prevention')}
                                    </p>
                                </div>

                                {/* Treatment */}
                                <div className="p-3 bg-[#effaf3] rounded-xl border border-[#d3eedc]">
                                    <h4 className="font-bold text-[#197b4b] text-[10px] uppercase mb-1 flex items-center gap-1.5">
                                        💊 {t('disease_detect.cure_treatment')}
                                    </h4>
                                    <p className="text-[#46565a] text-[12px] leading-snug">
                                        {result.cure || t('default_cure')}
                                    </p>
                                </div>

                                {/* Fertilizer */}
                                <div className="p-3 bg-[#eff7fc] rounded-xl border border-[#d5e9f5]">
                                    <h4 className="font-bold text-[#2775a4] text-[10px] uppercase mb-1 flex items-center gap-1.5">
                                        🌾 {t('disease_detect.soil_nutrient_advice')}
                                    </h4>
                                    <p className="text-[#46565a] text-[12px] leading-snug">
                                        {result.fertilizer || t('default_fertilizer')}
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            /* Empty Report State */
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 min-h-0 flex flex-col"
                            >
                                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                                    <div className="relative w-[90px] h-[90px] rounded-full bg-[#f0f8f4] flex items-center justify-center mb-4">
                                        <ClipboardList size={48} strokeWidth={1.5} className="text-[#7ac9a2]" />
                                        <Search size={22} strokeWidth={2} className="absolute right-1 bottom-3 text-[#15945a]" />
                                        <span className="absolute -left-4 top-1/2 text-[#7bcfa6] text-lg">✦</span>
                                        <span className="absolute -right-3 top-4 text-[#7bcfa6] text-base">✦</span>
                                        <span className="absolute -right-4 bottom-4 text-[#b5ddca] text-lg">✦</span>
                                    </div>

                                    <h3 className="text-[18px] font-bold text-[#1b3539]">
                                        {t('disease_detect.no_analysis_title')}
                                    </h3>
                                    <p className="max-w-[350px] text-[12px] text-[#66797e] leading-relaxed mt-1.5">
                                        {t('disease_detect.no_analysis_desc')}
                                    </p>
                                </div>

                                {/* Bottom Feature Bar */}
                                <div className="border-t border-[#edf1ef] pt-4 pb-1 grid grid-cols-4 flex-shrink-0">
                                    <div className="flex flex-col items-center text-center px-1">
                                        <Target size={21} strokeWidth={1.8} className="text-[#15945a] mb-1.5" />
                                        <span className="text-[10px] font-medium text-[#364c50] leading-tight">
                                            {t('disease_detect.disease_id')}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center text-center px-1">
                                        <BarChart3 size={21} strokeWidth={1.8} className="text-[#15945a] mb-1.5" />
                                        <span className="text-[10px] font-medium text-[#364c50] leading-tight">
                                            {t('disease_detect.confidence_score')}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center text-center px-1">
                                        <Pill size={21} strokeWidth={1.8} className="text-[#15945a] mb-1.5" />
                                        <span className="text-[10px] font-medium text-[#364c50] leading-tight">
                                            {t('disease_detect.treatment_recommendations')}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center text-center px-1">
                                        <Sprout size={21} strokeWidth={1.8} className="text-[#15945a] mb-1.5" />
                                        <span className="text-[10px] font-medium text-[#364c50] leading-tight">
                                            {t('disease_detect.prevention_tips')}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}