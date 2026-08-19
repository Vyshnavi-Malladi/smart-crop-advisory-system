// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import {
// //     User,
// //     Phone,
// //     Globe,
// //     MapPin,
// //     Tractor,
// //     Sprout,
// //     Mountain,
// //     Droplets,
// //     Calendar,
// //     ArrowRight,
// //     CheckCircle,
// //     Loader2
// // } from "lucide-react";

// // import { toast } from "react-toastify";
// // import { useTranslation } from "react-i18next";
// // import api from "../api";

// // export default function FarmerProfile() {

// //     const navigate = useNavigate();
// //     const { t, i18n } = useTranslation();

// //     const [loading, setLoading] = useState(false);

// //     const [step, setStep] = useState(1);

// //     const totalSteps = 4;

// //     const [profile, setProfile] = useState({

// //         fullName: "",

// //         mobile: "",

// //         gender: "",

// //         age: "",

// //         language: "en",

// //         state: "",

// //         district: "",

// //         village: "",

// //         pincode: "",

// //         latitude: "",

// //         longitude: "",

// //         farmName: "",

// //         landArea: "",

// //         landUnit: "Acres",

// //         soilType: "",

// //         irrigationType: "",

// //         primaryCrop: "",

// //         secondaryCrop: "",

// //         farmingType: "",

// //         farmingExperience: "",

// //         waterSource: "",

// //         livestock: ""

// //     });

// //     useEffect(() => {

// //         loadExistingProfile();

// //     }, []);

// //     const loadExistingProfile = async () => {

// //         try {

// //             const res = await api.get("/farmer");

// //             if (res.data.exists) {

// //                 setProfile(res.data.profile);

// //             }

// //         } catch (err) {

// //             console.log(err);

// //         }

// //     };

// //     const handleChange = (e) => {

// //         setProfile({

// //             ...profile,

// //             [e.target.name]: e.target.value

// //         });

// //     };

// //     const changeLanguage = (lang) => {

// //         i18n.changeLanguage(lang);

// //         setProfile({

// //             ...profile,

// //             language: lang

// //         });

// //     };

// //     const getCurrentLocation = () => {

// //         if (!navigator.geolocation) {

// //             toast.error("Location not supported");

// //             return;

// //         }

// //         navigator.geolocation.getCurrentPosition(

// //             (position) => {

// //                 setProfile(prev => ({

// //                     ...prev,

// //                     latitude: position.coords.latitude,

// //                     longitude: position.coords.longitude

// //                 }));

// //                 toast.success("Location detected");

// //             },

// //             () => {

// //                 toast.error("Unable to detect location");

// //             }

// //         );

// //     };

// //     const nextStep = () => {

// //         if (step < totalSteps)

// //             setStep(step + 1);

// //     };

// //     const previousStep = () => {

// //         if (step > 1)

// //             setStep(step - 1);

// //     };

// //     const saveProfile = async () => {

// //         try {

// //             setLoading(true);

// //             await api.post("/farmer", profile);

// //             toast.success("Profile Saved Successfully");

// //             navigate("/dashboard");

// //         }

// //         catch (err) {

// //             toast.error("Unable to save profile");

// //         }

// //         finally {

// //             setLoading(false);

// //         }

// //     };

// //     return (

// //         <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-10 px-5">

// //             <motion.div

// //                 initial={{ opacity: 0, y: 20 }}

// //                 animate={{ opacity: 1, y: 0 }}

// //                 className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden"

// //             >

// //                 {/* Header */}

// //                 <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8">

// //                     <h1 className="text-4xl font-bold">

// //                         🌾 Complete Farmer Profile

// //                     </h1>

// //                     <p className="mt-2 text-green-100">

// //                         Help us personalize FarmXpert for your farm.

// //                     </p>

// //                 </div>

// //                 {/* Progress */}

// //                 <div className="px-10 pt-8">

// //                     <div className="flex justify-between">

// //                         {[1,2,3,4].map((item)=>(
// //                             <div
// //                                 key={item}
// //                                 className="flex flex-col items-center"
// //                             >

// //                                 <div

// //                                     className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all

// //                                     ${step>=item

// //                                     ? "bg-green-600 text-white"

// //                                     : "bg-gray-200 text-gray-500"}

// //                                     `}

// //                                 >

// //                                     {step>item

// //                                     ?

// //                                     <CheckCircle size={20}/>

// //                                     :

// //                                     item}

// //                                 </div>

// //                                 <span className="text-xs mt-2 font-semibold">

// //                                     {

// //                                         item===1 && "Personal"

// //                                     }

// //                                     {

// //                                         item===2 && "Location"

// //                                     }

// //                                     {

// //                                         item===3 && "Farm"

// //                                     }

// //                                     {

// //                                         item===4 && "Crops"

// //                                     }

// //                                 </span>

// //                             </div>

// //                         ))}

// //                     </div>

// //                     <div className="mt-6 h-2 rounded-full bg-gray-200 overflow-hidden">

// //                         <motion.div

// //                             animate={{

// //                                 width:`${step*25}%`

// //                             }}

// //                             className="bg-green-600 h-full"

// //                         />

// //                     </div>

// //                 </div>

// //                 {/* Language Selection */}

// //                 <div className="px-10 mt-8">

// //                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2">

// //                         <Globe size={18}/>

// //                         Select Language

// //                     </label>

// //                     <div className="flex gap-4 mt-3">

// //                         <button

// //                             onClick={()=>changeLanguage("en")}

// //                             className={`px-5 py-2 rounded-xl transition

// //                             ${profile.language==="en"

// //                             ?"bg-green-600 text-white"

// //                             :"bg-gray-100"}

// //                             `}

// //                         >

// //                             English

// //                         </button>

// //                         <button

// //                             onClick={()=>changeLanguage("te")}

// //                             className={`px-5 py-2 rounded-xl transition

// //                             ${profile.language==="te"

// //                             ?"bg-green-600 text-white"

// //                             :"bg-gray-100"}

// //                             `}

// //                         >

// //                             తెలుగు

// //                         </button>

// //                         <button

// //                             onClick={()=>changeLanguage("hi")}

// //                             className={`px-5 py-2 rounded-xl transition

// //                             ${profile.language==="hi"

// //                             ?"bg-green-600 text-white"

// //                             :"bg-gray-100"}

// //                             `}

// //                         >

// //                             हिन्दी

// //                         </button>

// //                     </div>

// //                 </div>

// //                 {/* FORM STARTS BELOW */}


// //                 {/* ================= STEP 1 : PERSONAL DETAILS ================= */}

// // <div className="px-10 py-8">

// //     {step === 1 && (

// //         <motion.div
// //             initial={{ opacity: 0, x: 30 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             className="space-y-8"
// //         >

// //             <div>

// //                 <h2 className="text-3xl font-bold text-gray-800">
// //                     👨 Personal Information
// //                 </h2>

// //                 <p className="text-gray-500 mt-2">
// //                     Tell us about yourself.
// //                 </p>

// //             </div>

// //             <div className="grid md:grid-cols-2 gap-6">

// //                 {/* Full Name */}

// //                 <div>

// //                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">

// //                         <User size={18} className="text-green-600" />

// //                         Full Name

// //                     </label>

// //                     <input

// //                         type="text"

// //                         name="fullName"

// //                         value={profile.fullName}

// //                         onChange={handleChange}

// //                         placeholder="Enter your full name"

// //                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"

// //                     />

// //                 </div>

// //                 {/* Mobile */}

// //                 <div>

// //                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">

// //                         <Phone size={18} className="text-green-600" />

// //                         Mobile Number

// //                     </label>

// //                     <input

// //                         type="text"

// //                         name="mobile"

// //                         value={profile.mobile}

// //                         onChange={handleChange}

// //                         placeholder="9876543210"

// //                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"

// //                     />

// //                 </div>

// //                 {/* Gender */}

// //                 <div>

// //                     <label className="text-sm font-semibold text-gray-700 mb-2 block">

// //                         Gender

// //                     </label>

// //                     <select

// //                         name="gender"

// //                         value={profile.gender}

// //                         onChange={handleChange}

// //                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"

// //                     >

// //                         <option value="">Select Gender</option>

// //                         <option value="Male">Male</option>

// //                         <option value="Female">Female</option>

// //                         <option value="Other">Other</option>

// //                     </select>

// //                 </div>

// //                 {/* Age */}

// //                 <div>

// //                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">

// //                         <Calendar size={18} className="text-green-600" />

// //                         Age

// //                     </label>

// //                     <input

// //                         type="number"

// //                         name="age"

// //                         value={profile.age}

// //                         onChange={handleChange}

// //                         placeholder="35"

// //                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"

// //                     />

// //                 </div>

// //             </div>

// //             <div className="bg-green-50 rounded-2xl p-6 border border-green-100">

// //                 <div className="flex items-center gap-4">

// //                     <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white">

// //                         <User size={28} />

// //                     </div>

// //                     <div>

// //                         <h3 className="font-bold text-lg text-gray-800">

// //                             Your FarmXpert Identity

// //                         </h3>

// //                         <p className="text-gray-600">

// //                             These details help personalize recommendations,
// //                             weather alerts and crop advisory.

// //                         </p>

// //                     </div>

// //                 </div>

// //             </div>

// //         </motion.div>

// //     )}

// //     {/* ================= STEP 2 : LOCATION ================= */}

// //     {step === 2 && (

// //         <motion.div
// //             initial={{ opacity: 0, x: 30 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             className="space-y-8"
// //         >

// //             <div>

// //                 <h2 className="text-3xl font-bold text-gray-800">

// //                     📍 Farm Location

// //                 </h2>

// //                 <p className="text-gray-500 mt-2">

// //                     Where is your farm located?

// //                 </p>

// //             </div>

// //             <div className="grid md:grid-cols-2 gap-6">

// //                 <div>

// //                     <label className="font-semibold mb-2 block">

// //                         State

// //                     </label>

// //                     <input

// //                         type="text"

// //                         name="state"

// //                         value={profile.state}

// //                         onChange={handleChange}

// //                         placeholder="Andhra Pradesh"

// //                         className="w-full p-4 rounded-2xl border border-gray-200"

// //                     />

// //                 </div>

// //                 <div>

// //                     <label className="font-semibold mb-2 block">

// //                         District

// //                     </label>

// //                     <input

// //                         type="text"

// //                         name="district"

// //                         value={profile.district}

// //                         onChange={handleChange}

// //                         placeholder="East Godavari"

// //                         className="w-full p-4 rounded-2xl border border-gray-200"

// //                     />

// //                 </div>

// //                 <div>

// //                     <label className="font-semibold mb-2 block">

// //                         Village

// //                     </label>

// //                     <input

// //                         type="text"

// //                         name="village"

// //                         value={profile.village}

// //                         onChange={handleChange}

// //                         placeholder="Village"

// //                         className="w-full p-4 rounded-2xl border border-gray-200"

// //                     />

// //                 </div>

// //                 <div>

// //                     <label className="font-semibold mb-2 block">

// //                         PIN Code

// //                     </label>

// //                     <input

// //                         type="text"

// //                         name="pincode"

// //                         value={profile.pincode}

// //                         onChange={handleChange}

// //                         placeholder="533001"

// //                         className="w-full p-4 rounded-2xl border border-gray-200"

// //                     />

// //                 </div>

// //             </div>

// //             <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">

// //                 <div className="flex items-center justify-between">

// //                     <div>

// //                         <h3 className="font-bold text-blue-700">

// //                             GPS Location

// //                         </h3>

// //                         <p className="text-sm text-gray-600 mt-1">

// //                             Detect your exact farm location.

// //                         </p>

// //                     </div>

// //                     <button

// //                         onClick={getCurrentLocation}

// //                         className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"

// //                     >

// //                         Detect Location

// //                     </button>

// //                 </div>

// //                 {profile.latitude && (

// //                     <div className="mt-5 text-sm text-gray-700">

// //                         Latitude :

// //                         <strong> {profile.latitude}</strong>

// //                         <br />

// //                         Longitude :

// //                         <strong> {profile.longitude}</strong>

// //                     </div>

// //                 )}

// //             </div>

// //         </motion.div>

// //     )}
// //     {/* ================= STEP 3 : FARM DETAILS ================= */}

// // {step === 3 && (

// //     <motion.div
// //         initial={{ opacity: 0, x: 30 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         className="space-y-8"
// //     >

// //         <div>

// //             <h2 className="text-3xl font-bold text-gray-800">

// //                 🚜 Farm Information

// //             </h2>

// //             <p className="text-gray-500 mt-2">

// //                 Tell us about your farm.

// //             </p>

// //         </div>

// //         <div className="grid md:grid-cols-2 gap-6">

// //             <div>

// //                 <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">

// //                     <Tractor size={18} className="text-green-600" />

// //                     Farm Name

// //                 </label>

// //                 <input
// //                     type="text"
// //                     name="farmName"
// //                     value={profile.farmName}
// //                     onChange={handleChange}
// //                     placeholder="Green Valley Farm"
// //                     className="w-full p-4 rounded-2xl border border-gray-200"
// //                 />

// //             </div>

// //             <div>

// //                 <label className="font-semibold text-gray-700 mb-2">

// //                     Total Land

// //                 </label>

// //                 <input
// //                     type="number"
// //                     name="landArea"
// //                     value={profile.landArea}
// //                     onChange={handleChange}
// //                     placeholder="5"
// //                     className="w-full p-4 rounded-2xl border border-gray-200"
// //                 />

// //             </div>

// //             <div>

// //                 <label className="font-semibold text-gray-700 mb-2">

// //                     Land Unit

// //                 </label>

// //                 <select
// //                     name="landUnit"
// //                     value={profile.landUnit}
// //                     onChange={handleChange}
// //                     className="w-full p-4 rounded-2xl border border-gray-200"
// //                 >

// //                     <option value="Acres">Acres</option>
// //                     <option value="Hectares">Hectares</option>

// //                 </select>

// //             </div>

// //             <div>

// //                 <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">

// //                     <Mountain size={18} className="text-green-600" />

// //                     Soil Type

// //                 </label>

// //                 <select
// //                     name="soilType"
// //                     value={profile.soilType}
// //                     onChange={handleChange}
// //                     className="w-full p-4 rounded-2xl border border-gray-200"
// //                 >

// //                     <option value="">Select Soil</option>
// //                     <option>Black Soil</option>
// //                     <option>Red Soil</option>
// //                     <option>Clay Soil</option>
// //                     <option>Alluvial Soil</option>
// //                     <option>Laterite Soil</option>
// //                     <option>Sandy Soil</option>

// //                 </select>

// //             </div>

// //             <div>

// //                 <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">

// //                     <Droplets size={18} className="text-blue-600" />

// //                     Irrigation Type

// //                 </label>

// //                 <select
// //                     name="irrigationType"
// //                     value={profile.irrigationType}
// //                     onChange={handleChange}
// //                     className="w-full p-4 rounded-2xl border border-gray-200"
// //                 >

// //                     <option value="">Select Irrigation</option>
// //                     <option>Drip Irrigation</option>
// //                     <option>Sprinkler</option>
// //                     <option>Canal</option>
// //                     <option>Rainfed</option>
// //                     <option>Borewell</option>

// //                 </select>

// //             </div>

// //             <div>

// //                 <label className="font-semibold text-gray-700 mb-2">

// //                     Water Source

// //                 </label>

// //                 <select
// //                     name="waterSource"
// //                     value={profile.waterSource}
// //                     onChange={handleChange}
// //                     className="w-full p-4 rounded-2xl border border-gray-200"
// //                 >

// //                     <option value="">Select Water Source</option>
// //                     <option>Borewell</option>
// //                     <option>River</option>
// //                     <option>Canal</option>
// //                     <option>Pond</option>
// //                     <option>Rain Water</option>

// //                 </select>

// //             </div>

// //         </div>

// //     </motion.div>

// // )}

// // {/* ================= STEP 4 : CROPS ================= */}

// // {step === 4 && (

// //     <motion.div
// //         initial={{ opacity: 0, x: 30 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         className="space-y-8"
// //     >

// //         <div>

// //             <h2 className="text-3xl font-bold text-gray-800">

// //                 🌾 Crop Information

// //             </h2>

// //             <p className="text-gray-500 mt-2">

// //                 Tell us what you cultivate.

// //             </p>

// //         </div>

// //         <div className="grid md:grid-cols-2 gap-6">

// //             <div>

// //                 <label className="font-semibold mb-2 flex items-center gap-2">

// //                     <Sprout size={18} className="text-green-600" />

// //                     Primary Crop

// //                 </label>

// //                 <select
// //                     name="primaryCrop"
// //                     value={profile.primaryCrop}
// //                     onChange={handleChange}
// //                     className="w-full p-4 rounded-2xl border border-gray-200"
// //                 >

// //                     <option value="">Select Crop</option>
// //                     <option>Rice</option>
// //                     <option>Maize</option>
// //                     <option>Cotton</option>
// //                     <option>Groundnut</option>
// //                     <option>Sugarcane</option>
// //                     <option>Tomato</option>
// //                     <option>Potato</option>
// //                     <option>Chilli</option>
// //                     <option>Wheat</option>

// //                 </select>

// //             </div>

// //             <div>

// //                 <label className="font-semibold mb-2">

// //                     Secondary Crop

// //                 </label>

// //                 <input
// //                     type="text"
// //                     name="secondaryCrop"
// //                     value={profile.secondaryCrop}
// //                     onChange={handleChange}
// //                     placeholder="Optional"
// //                     className="w-full p-4 rounded-2xl border border-gray-200"
// //                 />

// //             </div>

// //             <div>

// //                 <label className="font-semibold mb-2">

// //                     Farming Type

// //                 </label>

// //                 <select
// //                     name="farmingType"
// //                     value={profile.farmingType}
// //                     onChange={handleChange}
// //                     className="w-full p-4 rounded-2xl border border-gray-200"
// //                 >

// //                     <option value="">Select</option>
// //                     <option>Organic</option>
// //                     <option>Conventional</option>
// //                     <option>Mixed</option>

// //                 </select>

// //             </div>

// //             <div>

// //                 <label className="font-semibold mb-2">

// //                     Farming Experience (Years)

// //                 </label>

// //                 <input
// //                     type="number"
// //                     name="farmingExperience"
// //                     value={profile.farmingExperience}
// //                     onChange={handleChange}
// //                     placeholder="10"
// //                     className="w-full p-4 rounded-2xl border border-gray-200"
// //                 />

// //             </div>

// //             <div className="md:col-span-2">

// //                 <label className="font-semibold mb-2">

// //                     Livestock

// //                 </label>

// //                 <input
// //                     type="text"
// //                     name="livestock"
// //                     value={profile.livestock}
// //                     onChange={handleChange}
// //                     placeholder="Cow, Buffalo, Goat..."
// //                     className="w-full p-4 rounded-2xl border border-gray-200"
// //                 />

// //             </div>

// //         </div>

// //         <div className="bg-green-50 rounded-2xl p-6 border border-green-100">

// //             <h3 className="font-bold text-green-700 text-lg">

// //                 🌱 You're almost done!

// //             </h3>

// //             <p className="text-gray-600 mt-2">

// //                 FarmXpert will use these details to personalize weather,
// //                 crop recommendations, disease detection and yield prediction.

// //             </p>

// //         </div>

// //     </motion.div>

// // )}
// // {/* ================= NAVIGATION ================= */}

// // <div className="mt-12 border-t border-gray-200 pt-8 flex items-center justify-between">

// //     <button
// //         onClick={previousStep}
// //         disabled={step === 1}
// //         className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300
// //         ${
// //             step === 1
// //                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
// //                 : "bg-gray-100 hover:bg-gray-200 text-gray-700"
// //         }`}
// //     >
// //         Previous
// //     </button>

// //     {step < totalSteps ? (

// //         <button
// //             onClick={nextStep}
// //             className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
// //         >
// //             Next
// //             <ArrowRight size={18} />
// //         </button>

// //     ) : (

// //         <button
// //             onClick={saveProfile}
// //             disabled={loading}
// //             className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
// //         >
// //             {loading ? (
// //                 <>
// //                     <Loader2 size={18} className="animate-spin" />
// //                     Saving...
// //                 </>
// //             ) : (
// //                 <>
// //                     Save Profile
// //                     <CheckCircle size={18} />
// //                 </>
// //             )}
// //         </button>

// //     )}

// // </div>

// // {/* Footer */}

// // <div className="mt-10 bg-gray-50 rounded-2xl p-5 border text-center">

// //     <p className="text-gray-500 text-sm">

// //         Your information is securely stored and used only to provide
// //         personalized crop recommendations, weather alerts,
// //         disease detection and yield prediction.

// //     </p>

// // </div>

// // </div>

// // </motion.div>

// // </div>

// // );

// // }

















// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//     User,
//     Phone,
//     Globe,
//     MapPin,
//     Tractor,
//     Sprout,
//     Mountain,
//     Droplets,
//     Calendar,
//     ArrowRight,
//     CheckCircle,
//     Loader2
// } from "lucide-react";

// import { toast } from "react-toastify";
// import { useTranslation } from "react-i18next";
// import api from "../api";

// export default function FarmerProfile() {

//     const navigate = useNavigate();
//     const { t, i18n } = useTranslation();

//     const [loading, setLoading] = useState(false);

//     const [step, setStep] = useState(1);

//     const totalSteps = 4;

//     const [profile, setProfile] = useState({

//         fullName: "",

//         mobile: "",

//         gender: "",

//         age: "",

//         language: "en",

//         state: "",

//         district: "",

//         village: "",

//         pincode: "",

//         latitude: "",

//         longitude: "",

//         farmName: "",

//         landArea: "",

//         landUnit: "Acres",

//         soilType: "",

//         irrigationType: "",

//         primaryCrop: "",

//         secondaryCrop: "",

//         farmingType: "",

//         farmingExperience: "",

//         waterSource: "",

//         livestock: ""

//     });

//     useEffect(() => {

//         loadExistingProfile();

//     }, []);

//     const loadExistingProfile = async () => {

//         try {

//             const res = await api.get("/farmer");

//             if (res.data.exists) {

//                 setProfile(res.data.profile);

//             }

//         } catch (err) {

//             console.log(err);

//         }

//     };

//     const handleChange = (e) => {

//         setProfile({

//             ...profile,

//             [e.target.name]: e.target.value

//         });

//     };

//     const changeLanguage = (lang) => {

//         i18n.changeLanguage(lang);

//         setProfile({

//             ...profile,

//             language: lang

//         });

//     };

//     const getCurrentLocation = () => {

//         if (!navigator.geolocation) {

//             toast.error(t("location_not_supported"));

//             return;

//         }

//         navigator.geolocation.getCurrentPosition(

//             (position) => {

//                 setProfile(prev => ({

//                     ...prev,

//                     latitude: position.coords.latitude,

//                     longitude: position.coords.longitude

//                 }));

//                 toast.success(t("location_detected"));

//             },

//             () => {

//                 toast.error(t("location_detection_failed"));

//             }

//         );

//     };

//     const nextStep = () => {

//         if (step < totalSteps)

//             setStep(step + 1);

//     };

//     const previousStep = () => {

//         if (step > 1)

//             setStep(step - 1);

//     };

//     const saveProfile = async () => {

//         try {

//             setLoading(true);

//             await api.post("/farmer", profile);

//             toast.success(t("profile_saved"));

//             navigate("/dashboard");

//         }

//         catch (err) {

//             toast.error(t("profile_save_failed"));

//         }

//         finally {

//             setLoading(false);

//         }

//     };

//     return (

//         <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-10 px-5">

//             <motion.div

//                 initial={{ opacity: 0, y: 20 }}

//                 animate={{ opacity: 1, y: 0 }}

//                 className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden"

//             >

//                 {/* Header */}

//                 <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8">

//                     <h1 className="text-4xl font-bold">

//                         🌾 {t("profile_title")}

//                     </h1>

//                     <p className="mt-2 text-green-100">

//                         {t("profile_subtitle")}

//                     </p>

//                 </div>

//                 {/* Progress */}

//                 <div className="px-10 pt-8">

//                     <div className="flex justify-between">

//                         {[1,2,3,4].map((item)=>(
//                             <div
//                                 key={item}
//                                 className="flex flex-col items-center"
//                             >

//                                 <div

//                                     className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all

//                                     ${step>=item

//                                     ? "bg-green-600 text-white"

//                                     : "bg-gray-200 text-gray-500"}

//                                     `}

//                                 >

//                                     {step>item

//                                     ?

//                                     <CheckCircle size={20}/>

//                                     :

//                                     item}

//                                 </div>

//                                 <span className="text-xs mt-2 font-semibold">

//                                     {

//                                         item===1 && t("personal")

//                                     }

//                                     {

//                                         item===2 && t("location")

//                                     }

//                                     {

//                                         item===3 && t("farm")

//                                     }

//                                     {

//                                         item===4 && t("crops")

//                                     }

//                                 </span>

//                             </div>

//                         ))}

//                     </div>

//                     <div className="mt-6 h-2 rounded-full bg-gray-200 overflow-hidden">

//                         <motion.div

//                             animate={{

//                                 width:`${step*25}%`

//                             }}

//                             className="bg-green-600 h-full"

//                         />

//                     </div>

//                 </div>

//                 {/* Language Selection */}

//                 <div className="px-10 mt-8">

//                     <label className="text-sm font-bold text-gray-700 flex items-center gap-2">

//                         <Globe size={18}/>

//                         {t("select_language")}

//                     </label>

//                     <div className="flex gap-4 mt-3">

//                         <button

//                             onClick={()=>changeLanguage("en")}

//                             className={`px-5 py-2 rounded-xl transition

//                             ${profile.language==="en"

//                             ?"bg-green-600 text-white"

//                             :"bg-gray-100"}

//                             `}

//                         >

//                             {t("english")}

//                         </button>

//                         <button

//                             onClick={()=>changeLanguage("te")}

//                             className={`px-5 py-2 rounded-xl transition

//                             ${profile.language==="te"

//                             ?"bg-green-600 text-white"

//                             :"bg-gray-100"}

//                             `}

//                         >

//                             {t("telugu")}

//                         </button>

//                         <button

//                             onClick={()=>changeLanguage("hi")}

//                             className={`px-5 py-2 rounded-xl transition

//                             ${profile.language==="hi"

//                             ?"bg-green-600 text-white"

//                             :"bg-gray-100"}

//                             `}

//                         >

//                             {t("hindi")}

//                         </button>

//                     </div>

//                 </div>

//                 {/* FORM STARTS BELOW */}


//                 {/* ================= STEP 1 : PERSONAL DETAILS ================= */}

// <div className="px-10 py-8">

//     {step === 1 && (

//         <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="space-y-8"
//         >

//             <div>

//                 <h2 className="text-3xl font-bold text-gray-800">
//                     👨 {t("personal_information")}
//                 </h2>

//                 <p className="text-gray-500 mt-2">
//                     {t("tell_about_yourself")}
//                 </p>

//             </div>

//             <div className="grid md:grid-cols-2 gap-6">

//                 {/* Full Name */}

//                 <div>

//                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">

//                         <User size={18} className="text-green-600" />

//                         {t("full_name")}

//                     </label>

//                     <input

//                         type="text"

//                         name="fullName"

//                         value={profile.fullName}

//                         onChange={handleChange}

//                         placeholder={t("enter_full_name")}

//                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"

//                     />

//                 </div>

//                 {/* Mobile */}

//                 <div>

//                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">

//                         <Phone size={18} className="text-green-600" />

//                         {t("mobile_number")}

//                     </label>

//                     <input

//                         type="text"

//                         name="mobile"

//                         value={profile.mobile}

//                         onChange={handleChange}

//                         placeholder="9876543210"

//                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"

//                     />

//                 </div>

//                 {/* Gender */}

//                 <div>

//                     <label className="text-sm font-semibold text-gray-700 mb-2 block">

//                         {t("gender")}

//                     </label>

//                     <select

//                         name="gender"

//                         value={profile.gender}

//                         onChange={handleChange}

//                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"

//                     >

//                         <option value="">{t("select_gender")}</option>

//                         <option value="Male">{t("male")}</option>

//                         <option value="Female">{t("female")}</option>

//                         <option value="Other">{t("other")}</option>

//                     </select>

//                 </div>

//                 {/* Age */}

//                 <div>

//                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">

//                         <Calendar size={18} className="text-green-600" />

//                         {t("age")}

//                     </label>

//                     <input

//                         type="number"

//                         name="age"

//                         value={profile.age}

//                         onChange={handleChange}

//                         placeholder="35"

//                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"

//                     />

//                 </div>

//             </div>

//             <div className="bg-green-50 rounded-2xl p-6 border border-green-100">

//                 <div className="flex items-center gap-4">

//                     <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white">

//                         <User size={28} />

//                     </div>

//                     <div>

//                         <h3 className="font-bold text-lg text-gray-800">

//                             {t("farmxpert_identity")}

//                         </h3>

//                         <p className="text-gray-600">

//                             {t("identity_description")}

//                         </p>

//                     </div>

//                 </div>

//             </div>

//         </motion.div>

//     )}

//     {/* ================= STEP 2 : LOCATION ================= */}

//     {step === 2 && (

//         <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="space-y-8"
//         >

//             <div>

//                 <h2 className="text-3xl font-bold text-gray-800">

//                     📍 {t("farm_location")}

//                 </h2>

//                 <p className="text-gray-500 mt-2">

//                     {t("farm_location_desc")}

//                 </p>

//             </div>

//             <div className="grid md:grid-cols-2 gap-6">

//                 <div>

//                     <label className="font-semibold mb-2 block">

//                         {t("state")}

//                     </label>

//                     <input

//                         type="text"

//                         name="state"

//                         value={profile.state}

//                         onChange={handleChange}

//                         placeholder="Andhra Pradesh"

//                         className="w-full p-4 rounded-2xl border border-gray-200"

//                     />

//                 </div>

//                 <div>

//                     <label className="font-semibold mb-2 block">

//                         {t("district")}

//                     </label>

//                     <input

//                         type="text"

//                         name="district"

//                         value={profile.district}

//                         onChange={handleChange}

//                         placeholder="East Godavari"

//                         className="w-full p-4 rounded-2xl border border-gray-200"

//                     />

//                 </div>

//                 <div>

//                     <label className="font-semibold mb-2 block">

//                         {t("village")}

//                     </label>

//                     <input

//                         type="text"

//                         name="village"

//                         value={profile.village}

//                         onChange={handleChange}

//                         placeholder="Village"

//                         className="w-full p-4 rounded-2xl border border-gray-200"

//                     />

//                 </div>

//                 <div>

//                     <label className="font-semibold mb-2 block">

//                         {t("pin_code")}

//                     </label>

//                     <input

//                         type="text"

//                         name="pincode"

//                         value={profile.pincode}

//                         onChange={handleChange}

//                         placeholder="533001"

//                         className="w-full p-4 rounded-2xl border border-gray-200"

//                     />

//                 </div>

//             </div>

//             <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">

//                 <div className="flex items-center justify-between">

//                     <div>

//                         <h3 className="font-bold text-blue-700">

//                             {t("gps_location")}

//                         </h3>

//                         <p className="text-sm text-gray-600 mt-1">

//                             {t("gps_description")}

//                         </p>

//                     </div>

//                     <button

//                         onClick={getCurrentLocation}

//                         className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"

//                     >

//                         {t("detect_location")}

//                     </button>

//                 </div>

//                 {profile.latitude && (

//                     <div className="mt-5 text-sm text-gray-700">

//                         {t("latitude")} :

//                         <strong> {profile.latitude}</strong>

//                         <br />

//                         {t("longitude")} :

//                         <strong> {profile.longitude}</strong>

//                     </div>

//                 )}

//             </div>

//         </motion.div>

//     )}
//     {/* ================= STEP 3 : FARM DETAILS ================= */}

// {step === 3 && (

//     <motion.div
//         initial={{ opacity: 0, x: 30 }}
//         animate={{ opacity: 1, x: 0 }}
//         className="space-y-8"
//     >

//         <div>

//             <h2 className="text-3xl font-bold text-gray-800">

//                 🚜 {t("farm_information")}

//             </h2>

//             <p className="text-gray-500 mt-2">

//                 {t("farm_information_desc")}

//             </p>

//         </div>

//         <div className="grid md:grid-cols-2 gap-6">

//             <div>

//                 <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">

//                     <Tractor size={18} className="text-green-600" />

//                     {t("farm_name")}

//                 </label>

//                 <input
//                     type="text"
//                     name="farmName"
//                     value={profile.farmName}
//                     onChange={handleChange}
//                     placeholder="Green Valley Farm"
//                     className="w-full p-4 rounded-2xl border border-gray-200"
//                 />

//             </div>

//             <div>

//                 <label className="font-semibold text-gray-700 mb-2">

//                     {t("total_land")}

//                 </label>

//                 <input
//                     type="number"
//                     name="landArea"
//                     value={profile.landArea}
//                     onChange={handleChange}
//                     placeholder="5"
//                     className="w-full p-4 rounded-2xl border border-gray-200"
//                 />

//             </div>

//             <div>

//                 <label className="font-semibold text-gray-700 mb-2">

//                     {t("land_unit")}

//                 </label>

//                 <select
//                     name="landUnit"
//                     value={profile.landUnit}
//                     onChange={handleChange}
//                     className="w-full p-4 rounded-2xl border border-gray-200"
//                 >

//                     <option value="Acres">{t("acres")}</option>
//                     <option value="Hectares">{t("hectares")}</option>

//                 </select>

//             </div>

//             <div>

//                 <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">

//                     <Mountain size={18} className="text-green-600" />

//                     {t("soil_type")}

//                 </label>

//                 <select
//                     name="soilType"
//                     value={profile.soilType}
//                     onChange={handleChange}
//                     className="w-full p-4 rounded-2xl border border-gray-200"
//                 >

//                     <option value="">{t("select_soil")}</option>
//                     <option>{t("black_soil")}</option>
//                     <option>{t("red_soil")}</option>
//                     <option>{t("clay_soil")}</option>
//                     <option>{t("alluvial_soil")}</option>
//                     <option>{t("laterite_soil")}</option>
//                     <option>{t("sandy_soil")}</option>

//                 </select>

//             </div>

//             <div>

//                 <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">

//                     <Droplets size={18} className="text-blue-600" />

//                     {t("irrigation_type")}

//                 </label>

//                 <select
//                     name="irrigationType"
//                     value={profile.irrigationType}
//                     onChange={handleChange}
//                     className="w-full p-4 rounded-2xl border border-gray-200"
//                 >

//                     <option value="">{t("select_irrigation")}</option>
//                     <option>{t("drip_irrigation")}</option>
//                     <option>{t("sprinkler")}</option>
//                     <option>{t("canal")}</option>
//                     <option>{t("rainfed")}</option>
//                     <option>{t("borewell")}</option>

//                 </select>

//             </div>

//             <div>

//                 <label className="font-semibold text-gray-700 mb-2">

//                     {t("water_source")}

//                 </label>

//                 <select
//                     name="waterSource"
//                     value={profile.waterSource}
//                     onChange={handleChange}
//                     className="w-full p-4 rounded-2xl border border-gray-200"
//                 >

//                     <option value="">{t("select_water_source")}</option>
//                     <option>{t("borewell")}</option>
//                     <option>{t("river")}</option>
//                     <option>{t("canal")}</option>
//                     <option>{t("pond")}</option>
//                     <option>{t("rain_water")}</option>

//                 </select>

//             </div>

//         </div>

//     </motion.div>

// )}

// {/* ================= STEP 4 : CROPS ================= */}

// {step === 4 && (

//     <motion.div
//         initial={{ opacity: 0, x: 30 }}
//         animate={{ opacity: 1, x: 0 }}
//         className="space-y-8"
//     >

//         <div>

//             <h2 className="text-3xl font-bold text-gray-800">

//                 🌾 {t("crop_information")}

//             </h2>

//             <p className="text-gray-500 mt-2">

//                 {t("crop_information_desc")}

//             </p>

//         </div>

//         <div className="grid md:grid-cols-2 gap-6">

//             <div>

//                 <label className="font-semibold mb-2 flex items-center gap-2">

//                     <Sprout size={18} className="text-green-600" />

//                     {t("primary_crop")}

//                 </label>

//                 <select
//                     name="primaryCrop"
//                     value={profile.primaryCrop}
//                     onChange={handleChange}
//                     className="w-full p-4 rounded-2xl border border-gray-200"
//                 >

//                     <option value="">{t("select_crop")}</option>
//                     <option>{t("rice")}</option>
//                     <option>{t("maize")}</option>
//                     <option>{t("cotton")}</option>
//                     <option>{t("groundnut")}</option>
//                     <option>{t("sugarcane")}</option>
//                     <option>{t("tomato")}</option>
//                     <option>{t("potato")}</option>
//                     <option>{t("chilli")}</option>
//                     <option>{t("wheat")}</option>

//                 </select>

//             </div>

//             <div>

//                 <label className="font-semibold mb-2">

//                     {t("secondary_crop")}

//                 </label>

//                 <input
//                     type="text"
//                     name="secondaryCrop"
//                     value={profile.secondaryCrop}
//                     onChange={handleChange}
//                     placeholder={t("optional")}
//                     className="w-full p-4 rounded-2xl border border-gray-200"
//                 />

//             </div>

//             <div>

//                 <label className="font-semibold mb-2">

//                     {t("farming_type")}

//                 </label>

//                 <select
//                     name="farmingType"
//                     value={profile.farmingType}
//                     onChange={handleChange}
//                     className="w-full p-4 rounded-2xl border border-gray-200"
//                 >

//                     <option value="">{t("select_farming_type")}</option>
//                     <option>{t("organic")}</option>
//                     <option>{t("conventional")}</option>
//                     <option>{t("mixed")}</option>

//                 </select>

//             </div>

//             <div>

//                 <label className="font-semibold mb-2">

//                     {t("farming_experience")}

//                 </label>

//                 <input
//                     type="number"
//                     name="farmingExperience"
//                     value={profile.farmingExperience}
//                     onChange={handleChange}
//                     placeholder="10"
//                     className="w-full p-4 rounded-2xl border border-gray-200"
//                 />

//             </div>

//             <div className="md:col-span-2">

//                 <label className="font-semibold mb-2">

//                     {t("livestock")}

//                 </label>

//                 <input
//                     type="text"
//                     name="livestock"
//                     value={profile.livestock}
//                     onChange={handleChange}
//                     placeholder={t("livestock_placeholder")}
//                     className="w-full p-4 rounded-2xl border border-gray-200"
//                 />

//             </div>

//         </div>

//         <div className="bg-green-50 rounded-2xl p-6 border border-green-100">

//             <h3 className="font-bold text-green-700 text-lg">

//                 🌱 {t("almost_done")}

//             </h3>

//             <p className="text-gray-600 mt-2">

//                 {t("almost_done_desc")}

//             </p>

//         </div>

//     </motion.div>

// )}
// {/* ================= NAVIGATION ================= */}

// <div className="mt-12 border-t border-gray-200 pt-8 flex items-center justify-between">

//     <button
//         onClick={previousStep}
//         disabled={step === 1}
//         className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300
//         ${
//             step === 1
//                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                 : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//         }`}
//     >
//         {t("previous")}
//     </button>

//     {step < totalSteps ? (

//         <button
//             onClick={nextStep}
//             className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
//         >
//             {t("next")}
//             <ArrowRight size={18} />
//         </button>

//     ) : (

//         <button
//             onClick={saveProfile}
//             disabled={loading}
//             className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
//         >
//             {loading ? (
//                 <>
//                     <Loader2 size={18} className="animate-spin" />
//                     {t("saving")}
//                 </>
//             ) : (
//                 <>
//                     {t("save_profile")}
//                     <CheckCircle size={18} />
//                 </>
//             )}
//         </button>

//     )}

// </div>

// {/* Footer */}

// <div className="mt-10 bg-gray-50 rounded-2xl p-5 border text-center">

//     <p className="text-gray-500 text-sm">

//         {t("profile_footer")}

//     </p>

// </div>

// </div>

// </motion.div>

// </div>

// );

// }







// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//     User,
//     Phone,
//     MapPin,
//     Tractor,
//     Sprout,
//     Mountain,
//     Droplets,
//     Calendar,
//     ArrowRight,
//     CheckCircle,
//     Loader2,
//     Globe
// } from "lucide-react";
// import { toast } from "react-toastify";
// import { useTranslation } from "react-i18next";
// import api from "../api";

// export default function FarmerProfile() {
//     const navigate = useNavigate();
//     const { t, i18n } = useTranslation();

//     const [loading, setLoading] = useState(false);
//     const [step, setStep] = useState(1);
//     const totalSteps = 4;

//     const [profile, setProfile] = useState({
//         fullName: "",
//         mobile: "",
//         gender: "",
//         age: "",
//         state: "",
//         district: "",
//         village: "",
//         pincode: "",
//         latitude: "",
//         longitude: "",
//         farmName: "",
//         landArea: "",
//         landUnit: "Acres",
//         soilType: "",
//         irrigationType: "",
//         primaryCrop: "",
//         secondaryCrop: "",
//         farmingType: "",
//         farmingExperience: "",
//         waterSource: "",
//         livestock: ""
//     });

//     // Force re-render when language changes
//     const [languageVersion, setLanguageVersion] = useState(0);

//     useEffect(() => {
//     loadExistingProfile();
// }, []);

// useEffect(() => {
//     loadExistingProfile();
// }, [i18n.language]);

//     // Listen for language changes from Navbar
//     useEffect(() => {
//         const handleLanguageChange = () => {
//             // Force re-render when language changes
//             setLanguageVersion(prev => prev + 1);
//         };

//         i18n.on('languageChanged', handleLanguageChange);

//         return () => {
//             i18n.off('languageChanged', handleLanguageChange);
//         };
//     }, [i18n]);

//     const loadExistingProfile = async () => {
//     try {
//         const res = await api.get("/farmer");

//         if (res.data.exists) {
//             setProfile(res.data.profile);

//             // Sync the language with the saved preference
//             if (
//                 res.data.profile.language &&
//                 res.data.profile.language !== i18n.language
//             ) {
//                 await i18n.changeLanguage(res.data.profile.language);
//             }
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };

//     const handleChange = (e) => {
//         setProfile({
//             ...profile,
//             [e.target.name]: e.target.value
//         });
//     };

//     const getCurrentLocation = () => {
//         if (!navigator.geolocation) {
//             toast.error(t("location_not_supported"));
//             return;
//         }

//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 setProfile(prev => ({
//                     ...prev,
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude
//                 }));
//                 toast.success(t("location_detected"));
//             },
//             () => {
//                 toast.error(t("location_detection_failed"));
//             }
//         );
//     };

//     const nextStep = () => {
//         if (step < totalSteps) setStep(step + 1);
//     };

//     const previousStep = () => {
//         if (step > 1) setStep(step - 1);
//     };

//     const saveProfile = async () => {
//         try {
//             setLoading(true);
//             // Save the current language from i18n
//             const profileData = { 
//                 ...profile,
//                 language: i18n.language
//             };
            
//             await api.post("/farmer", profileData);
//             toast.success(t("profile_saved"));
//             navigate("/profile");
//         } catch (err) {
//             toast.error(t("profile_save_failed"));
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-10 px-5">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden"
//             >
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8">
//                     <h1 className="text-4xl font-bold">
//                         🌾 {t("profile_title")}
//                     </h1>
//                     <p className="mt-2 text-green-100">
//                         {t("profile_subtitle")}
//                     </p>
                    
//                     {/* Display current language - updates when Navbar changes */}
//                     <div className="mt-4 flex items-center gap-2 text-green-100">
//                         <Globe size={18} />
//                         <span className="text-sm">{t("current_language")}:</span>
//                         <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
//                             {i18n.language === "en" && t("english")}
// {i18n.language === "te" && t("telugu")}
// {i18n.language === "hi" && t("hindi")}
//                         </span>
//                         <span className="text-xs text-green-200 ml-2">
//                             ({t("change_in_dashboard")})
//                         </span>
//                     </div>
//                 </div>

//                 {/* Progress */}
//                 <div className="px-10 pt-8">
//                     <div className="flex justify-between">
//                         {[1, 2, 3, 4].map((item) => (
//                             <div key={item} className="flex flex-col items-center">
//                                 <div
//                                     className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all
//                                     ${step >= item
//                                         ? "bg-green-600 text-white"
//                                         : "bg-gray-200 text-gray-500"
//                                     }`}
//                                 >
//                                     {step > item
//                                         ? <CheckCircle size={20} />
//                                         : item}
//                                 </div>
//                                 <span className="text-xs mt-2 font-semibold">
//                                     {item === 1 && t("personal")}
//                                     {item === 2 && t("location")}
//                                     {item === 3 && t("farm")}
//                                     {item === 4 && t("crops")}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="mt-6 h-2 rounded-full bg-gray-200 overflow-hidden">
//                         <motion.div
//                             animate={{
//                                 width: `${step * 25}%`
//                             }}
//                             className="bg-green-600 h-full"
//                         />
//                     </div>
//                 </div>

//                 {/* FORM STARTS BELOW */}
//                 <div className="px-10 py-8">
//                     {/* ================= STEP 1 : PERSONAL DETAILS ================= */}
//                     {step === 1 && (
//                         <motion.div
//                             initial={{ opacity: 0, x: 30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="space-y-8"
//                         >
//                             <div>
//                                 <h2 className="text-3xl font-bold text-gray-800">
//                                     👨 {t("personal_information")}
//                                 </h2>
//                                 <p className="text-gray-500 mt-2">
//                                     {t("tell_about_yourself")}
//                                 </p>
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-6">
//                                 {/* Full Name */}
//                                 <div>
//                                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
//                                         <User size={18} className="text-green-600" />
//                                         {t("full_name")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="fullName"
//                                         value={profile.fullName}
//                                         onChange={handleChange}
//                                         placeholder={t("enter_full_name")}
//                                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
//                                     />
//                                 </div>

//                                 {/* Mobile */}
//                                 <div>
//                                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
//                                         <Phone size={18} className="text-green-600" />
//                                         {t("mobile_number")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="mobile"
//                                         value={profile.mobile}
//                                         onChange={handleChange}
//                                         placeholder="9876543210"
//                                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
//                                     />
//                                 </div>

//                                 {/* Gender */}
//                                 <div>
//                                     <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                                         {t("gender")}
//                                     </label>
//                                     <select
//                                         name="gender"
//                                         value={profile.gender}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
//                                     >
//                                         <option value="">{t("select_gender")}</option>
//                                         <option value="Male">{t("male")}</option>
//                                         <option value="Female">{t("female")}</option>
//                                         <option value="Other">{t("other")}</option>
//                                     </select>
//                                 </div>

//                                 {/* Age */}
//                                 <div>
//                                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
//                                         <Calendar size={18} className="text-green-600" />
//                                         {t("age")}
//                                     </label>
//                                     <input
//                                         type="number"
//                                         name="age"
//                                         value={profile.age}
//                                         onChange={handleChange}
//                                         placeholder="35"
//                                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white">
//                                         <User size={28} />
//                                     </div>
//                                     <div>
//                                         <h3 className="font-bold text-lg text-gray-800">
//                                             {t("farmxpert_identity")}
//                                         </h3>
//                                         <p className="text-gray-600">
//                                             {t("identity_description")}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* ================= STEP 2 : LOCATION ================= */}
//                     {step === 2 && (
//                         <motion.div
//                             initial={{ opacity: 0, x: 30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="space-y-8"
//                         >
//                             <div>
//                                 <h2 className="text-3xl font-bold text-gray-800">
//                                     📍 {t("farm_location")}
//                                 </h2>
//                                 <p className="text-gray-500 mt-2">
//                                     {t("farm_location_desc")}
//                                 </p>
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="font-semibold mb-2 block">
//                                         {t("state")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="state"
//                                         value={profile.state}
//                                         onChange={handleChange}
//                                         placeholder="Andhra Pradesh"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold mb-2 block">
//                                         {t("district")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="district"
//                                         value={profile.district}
//                                         onChange={handleChange}
//                                         placeholder="East Godavari"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold mb-2 block">
//                                         {t("village")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="village"
//                                         value={profile.village}
//                                         onChange={handleChange}
//                                         placeholder="Village"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold mb-2 block">
//                                         {t("pin_code")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="pincode"
//                                         value={profile.pincode}
//                                         onChange={handleChange}
//                                         placeholder="533001"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <h3 className="font-bold text-blue-700">
//                                             {t("gps_location")}
//                                         </h3>
//                                         <p className="text-sm text-gray-600 mt-1">
//                                             {t("gps_description")}
//                                         </p>
//                                     </div>
//                                     <button
//                                         onClick={getCurrentLocation}
//                                         className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
//                                     >
//                                         {t("detect_location")}
//                                     </button>
//                                 </div>
//                                 {profile.latitude && (
//                                     <div className="mt-5 text-sm text-gray-700">
//                                         {t("latitude")} :
//                                         <strong> {profile.latitude}</strong>
//                                         <br />
//                                         {t("longitude")} :
//                                         <strong> {profile.longitude}</strong>
//                                     </div>
//                                 )}
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* ================= STEP 3 : FARM DETAILS ================= */}
//                     {step === 3 && (
//                         <motion.div
//                             initial={{ opacity: 0, x: 30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="space-y-8"
//                         >
//                             <div>
//                                 <h2 className="text-3xl font-bold text-gray-800">
//                                     🚜 {t("farm_information")}
//                                 </h2>
//                                 <p className="text-gray-500 mt-2">
//                                     {t("farm_information_desc")}
//                                 </p>
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                                         <Tractor size={18} className="text-green-600" />
//                                         {t("farm_name")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="farmName"
//                                         value={profile.farmName}
//                                         onChange={handleChange}
//                                         placeholder="Green Valley Farm"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold text-gray-700 mb-2">
//                                         {t("total_land")}
//                                     </label>
//                                     <input
//                                         type="number"
//                                         name="landArea"
//                                         value={profile.landArea}
//                                         onChange={handleChange}
//                                         placeholder="5"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold text-gray-700 mb-2">
//                                         {t("land_unit")}
//                                     </label>
//                                     <select
//                                         name="landUnit"
//                                         value={profile.landUnit}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     >
//                                         <option value="Acres">{t("acres")}</option>
//                                         <option value="Hectares">{t("hectares")}</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                                         <Mountain size={18} className="text-green-600" />
//                                         {t("soil_type")}
//                                     </label>
//                                     <select
//                                         name="soilType"
//                                         value={profile.soilType}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     >
//                                         <option value="">{t("select_soil")}</option>
//                                         <option>{t("black_soil")}</option>
//                                         <option>{t("red_soil")}</option>
//                                         <option>{t("clay_soil")}</option>
//                                         <option>{t("alluvial_soil")}</option>
//                                         <option>{t("laterite_soil")}</option>
//                                         <option>{t("sandy_soil")}</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                                         <Droplets size={18} className="text-blue-600" />
//                                         {t("irrigation_type")}
//                                     </label>
//                                     <select
//                                         name="irrigationType"
//                                         value={profile.irrigationType}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     >
//                                         <option value="">{t("select_irrigation")}</option>
//                                         <option>{t("drip_irrigation")}</option>
//                                         <option>{t("sprinkler")}</option>
//                                         <option>{t("canal")}</option>
//                                         <option>{t("rainfed")}</option>
//                                         <option>{t("borewell")}</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold text-gray-700 mb-2">
//                                         {t("water_source")}
//                                     </label>
//                                     <select
//                                         name="waterSource"
//                                         value={profile.waterSource}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     >
//                                         <option value="">{t("select_water_source")}</option>
//                                         <option>{t("borewell")}</option>
//                                         <option>{t("river")}</option>
//                                         <option>{t("canal")}</option>
//                                         <option>{t("pond")}</option>
//                                         <option>{t("rain_water")}</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* ================= STEP 4 : CROPS ================= */}
//                     {step === 4 && (
//                         <motion.div
//                             initial={{ opacity: 0, x: 30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="space-y-8"
//                         >
//                             <div>
//                                 <h2 className="text-3xl font-bold text-gray-800">
//                                     🌾 {t("crop_information")}
//                                 </h2>
//                                 <p className="text-gray-500 mt-2">
//                                     {t("crop_information_desc")}
//                                 </p>
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="font-semibold mb-2 flex items-center gap-2">
//                                         <Sprout size={18} className="text-green-600" />
//                                         {t("primary_crop")}
//                                     </label>
//                                     <select
//                                         name="primaryCrop"
//                                         value={profile.primaryCrop}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     >
//                                         <option value="">{t("select_crop")}</option>
//                                         <option>{t("rice")}</option>
//                                         <option>{t("maize")}</option>
//                                         <option>{t("cotton")}</option>
//                                         <option>{t("groundnut")}</option>
//                                         <option>{t("sugarcane")}</option>
//                                         <option>{t("tomato")}</option>
//                                         <option>{t("potato")}</option>
//                                         <option>{t("chilli")}</option>
//                                         <option>{t("wheat")}</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold mb-2">
//                                         {t("secondary_crop")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="secondaryCrop"
//                                         value={profile.secondaryCrop}
//                                         onChange={handleChange}
//                                         placeholder={t("optional")}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold mb-2">
//                                         {t("farming_type")}
//                                     </label>
//                                     <select
//                                         name="farmingType"
//                                         value={profile.farmingType}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     >
//                                         <option value="">{t("select_farming_type")}</option>
//                                         <option>{t("organic")}</option>
//                                         <option>{t("conventional")}</option>
//                                         <option>{t("mixed")}</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold mb-2">
//                                         {t("farming_experience")}
//                                     </label>
//                                     <input
//                                         type="number"
//                                         name="farmingExperience"
//                                         value={profile.farmingExperience}
//                                         onChange={handleChange}
//                                         placeholder="10"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="font-semibold mb-2">
//                                         {t("livestock")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="livestock"
//                                         value={profile.livestock}
//                                         onChange={handleChange}
//                                         placeholder={t("livestock_placeholder")}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
//                                 <h3 className="font-bold text-green-700 text-lg">
//                                     🌱 {t("almost_done")}
//                                 </h3>
//                                 <p className="text-gray-600 mt-2">
//                                     {t("almost_done_desc")}
//                                 </p>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* ================= NAVIGATION ================= */}
//                     <div className="mt-12 border-t border-gray-200 pt-8 flex items-center justify-between">
//                         <button
//                             onClick={previousStep}
//                             disabled={step === 1}
//                             className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300
//                             ${
//                                 step === 1
//                                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                     : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                             }`}
//                         >
//                             {t("previous")}
//                         </button>

//                         {step < totalSteps ? (
//                             <button
//                                 onClick={nextStep}
//                                 className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
//                             >
//                                 {t("next")}
//                                 <ArrowRight size={18} />
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={saveProfile}
//                                 disabled={loading}
//                                 className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
//                             >
//                                 {loading ? (
//                                     <>
//                                         <Loader2 size={18} className="animate-spin" />
//                                         {t("saving")}
//                                     </>
//                                 ) : (
//                                     <>
//                                         {t("save_profile")}
//                                         <CheckCircle size={18} />
//                                     </>
//                                 )}
//                             </button>
//                         )}
//                     </div>

//                     {/* Footer */}
//                     <div className="mt-10 bg-gray-50 rounded-2xl p-5 border text-center">
//                         <p className="text-gray-500 text-sm">
//                             {t("profile_footer")}
//                         </p>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// }



























// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//     User,
//     Phone,
//     MapPin,
//     Tractor,
//     Sprout,
//     Mountain,
//     Droplets,
//     Calendar,
//     ArrowRight,
//     CheckCircle,
//     Loader2,
//     Globe
// } from "lucide-react";
// import { toast } from "react-toastify";
// import { useTranslation } from "react-i18next";
// import api from "../api";

// export default function FarmerProfile() {
//     const navigate = useNavigate();
//     const { t, i18n } = useTranslation();

//     const [loading, setLoading] = useState(false);
//     const [step, setStep] = useState(1);
//     const totalSteps = 4;
//     const [isLoadingProfile, setIsLoadingProfile] = useState(true);

//     const [profile, setProfile] = useState({
//         fullName: "",
//         mobile: "",
//         gender: "",
//         age: "",
//         state: "",
//         district: "",
//         village: "",
//         pincode: "",
//         latitude: "",
//         longitude: "",
//         farmName: "",
//         landArea: "",
//         landUnit: "Acres",
//         soilType: "",
//         irrigationType: "",
//         primaryCrop: "",
//         secondaryCrop: "",
//         farmingType: "",
//         farmingExperience: "",
//         waterSource: "",
//         livestock: ""
//     });

//     // Force re-render when language changes
//     const [languageVersion, setLanguageVersion] = useState(0);

//     // ✅ Check if profile already exists on component mount
//     useEffect(() => {
//         checkExistingProfile();
//     }, []);

//     useEffect(() => {
//         checkExistingProfile();
//     }, [i18n.language]);

//     // Listen for language changes from Navbar
//     useEffect(() => {
//         const handleLanguageChange = () => {
//             // Force re-render when language changes
//             setLanguageVersion(prev => prev + 1);
//         };

//         i18n.on('languageChanged', handleLanguageChange);

//         return () => {
//             i18n.off('languageChanged', handleLanguageChange);
//         };
//     }, [i18n]);
// // In FarmerProfile.jsx - Update the checkExistingProfile function

// const checkExistingProfile = async () => {
//     try {
//         setIsLoadingProfile(true);
//         const res = await api.get("/farmer/check");

//         console.log("Profile check response:", res.data);

//         if (res.data.exists && res.data.isComplete) {
//             // ✅ Profile exists and is complete - redirect to dashboard directly
//             // Don't show toast message
//             navigate("/dashboard");
//             return;
//         } else if (res.data.exists && !res.data.isComplete) {
//             // Profile exists but incomplete - load it
//             setProfile(res.data.profile);
            
//             // Sync language if needed
//             if (res.data.profile.language && res.data.profile.language !== i18n.language) {
//                 await i18n.changeLanguage(res.data.profile.language);
//             }
//         }
//         // else: No profile exists, show empty form for new user
//     } catch (err) {
//         console.log("Error checking profile:", err);
//         // If error, still show the form
//     } finally {
//         setIsLoadingProfile(false);
//     }
// };

//     const handleChange = (e) => {
//         setProfile({
//             ...profile,
//             [e.target.name]: e.target.value
//         });
//     };

//     const getCurrentLocation = () => {
//         if (!navigator.geolocation) {
//             toast.error(t("location_not_supported"));
//             return;
//         }

//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 setProfile(prev => ({
//                     ...prev,
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude
//                 }));
//                 toast.success(t("location_detected"));
//             },
//             () => {
//                 toast.error(t("location_detection_failed"));
//             }
//         );
//     };

//     const nextStep = () => {
//         if (step < totalSteps) setStep(step + 1);
//     };

//     const previousStep = () => {
//         if (step > 1) setStep(step - 1);
//     };

//     // ✅ Save profile with validation
//     const saveProfile = async () => {
//         try {
//             setLoading(true);
            
//             // Validate required fields before sending
//             const requiredFields = ['fullName', 'mobile', 'state', 'district', 'farmName', 'primaryCrop'];
//             const missingFields = requiredFields.filter(field => 
//                 !profile[field] || profile[field].trim() === ''
//             );
            
//             if (missingFields.length > 0) {
//                 toast.error(t("please_fill_all_required_fields"));
//                 // Switch to the step where the first missing field is
//                 const stepMap = {
//                     'fullName': 1,
//                     'mobile': 1,
//                     'state': 2,
//                     'district': 2,
//                     'farmName': 3,
//                     'primaryCrop': 4
//                 };
//                 const firstMissingStep = stepMap[missingFields[0]] || 1;
//                 setStep(firstMissingStep);
//                 setLoading(false);
//                 return;
//             }
            
//             // Save the current language from i18n
//             const profileData = { 
//                 ...profile,
//                 language: i18n.language
//             };
            
//             const response = await api.post("/farmer", profileData);
//             console.log("Save response:", response.data);
            
//             toast.success(t("profile_saved"));
//             navigate("/profile");
//         } catch (err) {
//             console.error("Save error:", err);
//             toast.error(err.response?.data?.error || t("profile_save_failed"));
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (isLoadingProfile) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <Loader2 className="animate-spin h-12 w-12 text-green-600 mx-auto" />
//                     <p className="mt-4 text-gray-600">{t("loading_profile")}</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-10 px-5">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden"
//             >
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8">
//                     <h1 className="text-4xl font-bold">
//                         🌾 {t("profile_title")}
//                     </h1>
//                     <p className="mt-2 text-green-100">
//                         {t("profile_subtitle")}
//                     </p>
                    
//                     {/* Display current language - updates when Navbar changes */}
//                     <div className="mt-4 flex items-center gap-2 text-green-100">
//                         <Globe size={18} />
//                         <span className="text-sm">{t("current_language")}:</span>
//                         <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
//                             {i18n.language === "en" && t("english")}
//                             {i18n.language === "te" && t("telugu")}
//                             {i18n.language === "hi" && t("hindi")}
//                         </span>
//                         <span className="text-xs text-green-200 ml-2">
//                             ({t("change_in_dashboard")})
//                         </span>
//                     </div>
//                 </div>

//                 {/* Progress */}
//                 <div className="px-10 pt-8">
//                     <div className="flex justify-between">
//                         {[1, 2, 3, 4].map((item) => (
//                             <div key={item} className="flex flex-col items-center">
//                                 <div
//                                     className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all
//                                     ${step >= item
//                                         ? "bg-green-600 text-white"
//                                         : "bg-gray-200 text-gray-500"
//                                     }`}
//                                 >
//                                     {step > item
//                                         ? <CheckCircle size={20} />
//                                         : item}
//                                 </div>
//                                 <span className="text-xs mt-2 font-semibold">
//                                     {item === 1 && t("personal")}
//                                     {item === 2 && t("location")}
//                                     {item === 3 && t("farm")}
//                                     {item === 4 && t("crops")}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="mt-6 h-2 rounded-full bg-gray-200 overflow-hidden">
//                         <motion.div
//                             animate={{
//                                 width: `${step * 25}%`
//                             }}
//                             className="bg-green-600 h-full"
//                         />
//                     </div>
//                 </div>

//                 {/* FORM STARTS BELOW */}
//                 <div className="px-10 py-8">
//                     {/* ================= STEP 1 : PERSONAL DETAILS ================= */}
//                     {step === 1 && (
//                         <motion.div
//                             initial={{ opacity: 0, x: 30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="space-y-8"
//                         >
//                             <div>
//                                 <h2 className="text-3xl font-bold text-gray-800">
//                                     👨 {t("personal_information")}
//                                 </h2>
//                                 <p className="text-gray-500 mt-2">
//                                     {t("tell_about_yourself")}
//                                 </p>
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-6">
//                                 {/* Full Name */}
//                                 <div>
//                                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
//                                         <User size={18} className="text-green-600" />
//                                         {t("full_name")} <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="fullName"
//                                         value={profile.fullName}
//                                         onChange={handleChange}
//                                         placeholder={t("enter_full_name")}
//                                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
//                                     />
//                                 </div>

//                                 {/* Mobile */}
//                                 <div>
//                                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
//                                         <Phone size={18} className="text-green-600" />
//                                         {t("mobile_number")} <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="mobile"
//                                         value={profile.mobile}
//                                         onChange={handleChange}
//                                         placeholder="9876543210"
//                                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
//                                     />
//                                 </div>

//                                 {/* Gender */}
//                                 <div>
//                                     <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                                         {t("gender")}
//                                     </label>
//                                     <select
//                                         name="gender"
//                                         value={profile.gender}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
//                                     >
//                                         <option value="">{t("select_gender")}</option>
//                                         <option value="Male">{t("male")}</option>
//                                         <option value="Female">{t("female")}</option>
//                                         <option value="Other">{t("other")}</option>
//                                     </select>
//                                 </div>

//                                 {/* Age */}
//                                 <div>
//                                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
//                                         <Calendar size={18} className="text-green-600" />
//                                         {t("age")}
//                                     </label>
//                                     <input
//                                         type="number"
//                                         name="age"
//                                         value={profile.age}
//                                         onChange={handleChange}
//                                         placeholder="35"
//                                         className="w-full p-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white">
//                                         <User size={28} />
//                                     </div>
//                                     <div>
//                                         <h3 className="font-bold text-lg text-gray-800">
//                                             {t("farmxpert_identity")}
//                                         </h3>
//                                         <p className="text-gray-600">
//                                             {t("identity_description")}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* ================= STEP 2 : LOCATION ================= */}
//                     {step === 2 && (
//                         <motion.div
//                             initial={{ opacity: 0, x: 30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="space-y-8"
//                         >
//                             <div>
//                                 <h2 className="text-3xl font-bold text-gray-800">
//                                     📍 {t("farm_location")}
//                                 </h2>
//                                 <p className="text-gray-500 mt-2">
//                                     {t("farm_location_desc")}
//                                 </p>
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="font-semibold mb-2 block">
//                                         {t("state")} <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="state"
//                                         value={profile.state}
//                                         onChange={handleChange}
//                                         placeholder="Andhra Pradesh"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold mb-2 block">
//                                         {t("district")} <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="district"
//                                         value={profile.district}
//                                         onChange={handleChange}
//                                         placeholder="East Godavari"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold mb-2 block">
//                                         {t("village")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="village"
//                                         value={profile.village}
//                                         onChange={handleChange}
//                                         placeholder="Village"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold mb-2 block">
//                                         {t("pin_code")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="pincode"
//                                         value={profile.pincode}
//                                         onChange={handleChange}
//                                         placeholder="533001"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <h3 className="font-bold text-blue-700">
//                                             {t("gps_location")}
//                                         </h3>
//                                         <p className="text-sm text-gray-600 mt-1">
//                                             {t("gps_description")}
//                                         </p>
//                                     </div>
//                                     <button
//                                         onClick={getCurrentLocation}
//                                         className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
//                                     >
//                                         {t("detect_location")}
//                                     </button>
//                                 </div>
//                                 {profile.latitude && (
//                                     <div className="mt-5 text-sm text-gray-700">
//                                         {t("latitude")} :
//                                         <strong> {profile.latitude}</strong>
//                                         <br />
//                                         {t("longitude")} :
//                                         <strong> {profile.longitude}</strong>
//                                     </div>
//                                 )}
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* ================= STEP 3 : FARM DETAILS ================= */}
//                     {step === 3 && (
//                         <motion.div
//                             initial={{ opacity: 0, x: 30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="space-y-8"
//                         >
//                             <div>
//                                 <h2 className="text-3xl font-bold text-gray-800">
//                                     🚜 {t("farm_information")}
//                                 </h2>
//                                 <p className="text-gray-500 mt-2">
//                                     {t("farm_information_desc")}
//                                 </p>
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                                         <Tractor size={18} className="text-green-600" />
//                                         {t("farm_name")} <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="farmName"
//                                         value={profile.farmName}
//                                         onChange={handleChange}
//                                         placeholder="Green Valley Farm"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold text-gray-700 mb-2">
//                                         {t("total_land")}
//                                     </label>
//                                     <input
//                                         type="number"
//                                         name="landArea"
//                                         value={profile.landArea}
//                                         onChange={handleChange}
//                                         placeholder="5"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold text-gray-700 mb-2">
//                                         {t("land_unit")}
//                                     </label>
//                                     <select
//                                         name="landUnit"
//                                         value={profile.landUnit}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     >
//                                         <option value="Acres">{t("acres")}</option>
//                                         <option value="Hectares">{t("hectares")}</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                                         <Mountain size={18} className="text-green-600" />
//                                         {t("soil_type")}
//                                     </label>
//                                     <select
//                                         name="soilType"
//                                         value={profile.soilType}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     >
//                                         <option value="">{t("select_soil")}</option>
//                                         <option>{t("black_soil")}</option>
//                                         <option>{t("red_soil")}</option>
//                                         <option>{t("clay_soil")}</option>
//                                         <option>{t("alluvial_soil")}</option>
//                                         <option>{t("laterite_soil")}</option>
//                                         <option>{t("sandy_soil")}</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                                         <Droplets size={18} className="text-blue-600" />
//                                         {t("irrigation_type")}
//                                     </label>
//                                     <select
//                                         name="irrigationType"
//                                         value={profile.irrigationType}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     >
//                                         <option value="">{t("select_irrigation")}</option>
//                                         <option>{t("drip_irrigation")}</option>
//                                         <option>{t("sprinkler")}</option>
//                                         <option>{t("canal")}</option>
//                                         <option>{t("rainfed")}</option>
//                                         <option>{t("borewell")}</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold text-gray-700 mb-2">
//                                         {t("water_source")}
//                                     </label>
//                                     <select
//                                         name="waterSource"
//                                         value={profile.waterSource}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     >
//                                         <option value="">{t("select_water_source")}</option>
//                                         <option>{t("borewell")}</option>
//                                         <option>{t("river")}</option>
//                                         <option>{t("canal")}</option>
//                                         <option>{t("pond")}</option>
//                                         <option>{t("rain_water")}</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* ================= STEP 4 : CROPS ================= */}
//                     {step === 4 && (
//                         <motion.div
//                             initial={{ opacity: 0, x: 30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="space-y-8"
//                         >
//                             <div>
//                                 <h2 className="text-3xl font-bold text-gray-800">
//                                     🌾 {t("crop_information")}
//                                 </h2>
//                                 <p className="text-gray-500 mt-2">
//                                     {t("crop_information_desc")}
//                                 </p>
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="font-semibold mb-2 flex items-center gap-2">
//                                         <Sprout size={18} className="text-green-600" />
//                                         {t("primary_crop")} <span className="text-red-500">*</span>
//                                     </label>
//                                     <select
//                                         name="primaryCrop"
//                                         value={profile.primaryCrop}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     >
//                                         <option value="">{t("select_crop")}</option>
//                                         <option>{t("rice")}</option>
//                                         <option>{t("maize")}</option>
//                                         <option>{t("cotton")}</option>
//                                         <option>{t("groundnut")}</option>
//                                         <option>{t("sugarcane")}</option>
//                                         <option>{t("tomato")}</option>
//                                         <option>{t("potato")}</option>
//                                         <option>{t("chilli")}</option>
//                                         <option>{t("wheat")}</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold mb-2">
//                                         {t("secondary_crop")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="secondaryCrop"
//                                         value={profile.secondaryCrop}
//                                         onChange={handleChange}
//                                         placeholder={t("optional")}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold mb-2">
//                                         {t("farming_type")}
//                                     </label>
//                                     <select
//                                         name="farmingType"
//                                         value={profile.farmingType}
//                                         onChange={handleChange}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     >
//                                         <option value="">{t("select_farming_type")}</option>
//                                         <option>{t("organic")}</option>
//                                         <option>{t("conventional")}</option>
//                                         <option>{t("mixed")}</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="font-semibold mb-2">
//                                         {t("farming_experience")}
//                                     </label>
//                                     <input
//                                         type="number"
//                                         name="farmingExperience"
//                                         value={profile.farmingExperience}
//                                         onChange={handleChange}
//                                         placeholder="10"
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="font-semibold mb-2">
//                                         {t("livestock")}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="livestock"
//                                         value={profile.livestock}
//                                         onChange={handleChange}
//                                         placeholder={t("livestock_placeholder")}
//                                         className="w-full p-4 rounded-2xl border border-gray-200"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
//                                 <h3 className="font-bold text-green-700 text-lg">
//                                     🌱 {t("almost_done")}
//                                 </h3>
//                                 <p className="text-gray-600 mt-2">
//                                     {t("almost_done_desc")}
//                                 </p>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* ================= NAVIGATION ================= */}
//                     <div className="mt-12 border-t border-gray-200 pt-8 flex items-center justify-between">
//                         <button
//                             onClick={previousStep}
//                             disabled={step === 1}
//                             className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300
//                             ${
//                                 step === 1
//                                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                     : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                             }`}
//                         >
//                             {t("previous")}
//                         </button>

//                         {step < totalSteps ? (
//                             <button
//                                 onClick={nextStep}
//                                 className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
//                             >
//                                 {t("next")}
//                                 <ArrowRight size={18} />
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={saveProfile}
//                                 disabled={loading}
//                                 className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
//                             >
//                                 {loading ? (
//                                     <>
//                                         <Loader2 size={18} className="animate-spin" />
//                                         {t("saving")}
//                                     </>
//                                 ) : (
//                                     <>
//                                         {t("save_profile")}
//                                         <CheckCircle size={18} />
//                                     </>
//                                 )}
//                             </button>
//                         )}
//                     </div>

//                     {/* Footer */}
//                     <div className="mt-10 bg-gray-50 rounded-2xl p-5 border text-center">
//                         <p className="text-gray-500 text-sm">
//                             {t("profile_footer")}
//                         </p>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// }










// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// import {
//     User,
//     Phone,
//     MapPin,
//     Tractor,
//     Sprout,
//     Mountain,
//     Droplets,
//     Calendar,
//     ArrowRight,
//     ArrowLeft,
//     CheckCircle,
//     Loader2,
//     Globe
// } from "lucide-react";

// import { toast } from "react-toastify";
// import { useTranslation } from "react-i18next";
// import Cookies from "js-cookie";
// import api from "../api";


// export default function FarmerProfile() {

//     const navigate = useNavigate();
//     const { t, i18n } = useTranslation();


//     /* =========================================================
//        STATES
//     ========================================================= */

//     const [loading, setLoading] = useState(false);

//     const [step, setStep] = useState(1);

//     const totalSteps = 4;

//     const [isLoadingProfile, setIsLoadingProfile] =
//         useState(true);


//     const [profile, setProfile] = useState({
//         fullName: "",
//         mobile: "",
//         gender: "",
//         age: "",

//         state: "",
//         district: "",
//         village: "",
//         pincode: "",

//         latitude: "",
//         longitude: "",

//         farmName: "",
//         landArea: "",
//         landUnit: "Acres",

//         soilType: "",
//         irrigationType: "",

//         primaryCrop: "",
//         secondaryCrop: "",

//         farmingType: "",
//         farmingExperience: "",

//         waterSource: "",
//         livestock: ""
//     });


//     /*
//      * Used only to force UI refresh when language changes.
//      */
//     const [languageVersion, setLanguageVersion] =
//         useState(0);


//     /* =========================================================
//        GET CURRENT USER
//     ========================================================= */

//     const getCurrentUser = () => {

//         try {

//             const cookieUser = Cookies.get("user");

//             if (cookieUser) {
//                 return JSON.parse(cookieUser);
//             }

//         } catch (error) {

//             console.error(
//                 "Unable to read user cookie:",
//                 error
//             );

//         }

//         return null;
//     };


//     /*
//      * Same key format used in Login.jsx.
//      *
//      * This is important because Login.jsx checks this exact
//      * localStorage key before deciding whether to show
//      * FarmerProfile again.
//      */

//     const getSkipKey = () => {

//         const user = getCurrentUser();

//         const userId =
//             user?._id ||
//             user?.id ||
//             user?.email ||
//             null;

//         if (!userId) {
//             return null;
//         }

//         return `farmerProfileSkipped_${userId}`;
//     };


//     /* =========================================================
//        CHECK EXISTING PROFILE
//     ========================================================= */

//     useEffect(() => {

//         checkExistingProfile();

//     }, []);


//     /* =========================================================
//        LANGUAGE CHANGE
//     ========================================================= */

//     useEffect(() => {

//         const handleLanguageChange = () => {

//             setLanguageVersion(
//                 previous => previous + 1
//             );

//         };


//         i18n.on(
//             "languageChanged",
//             handleLanguageChange
//         );


//         return () => {

//             i18n.off(
//                 "languageChanged",
//                 handleLanguageChange
//             );

//         };

//     }, [i18n]);


//     /* =========================================================
//        CHECK PROFILE
//     ========================================================= */

//     const checkExistingProfile = async () => {

//         try {

//             setIsLoadingProfile(true);


//             const res =
//                 await api.get("/farmer/check");


//             console.log(
//                 "Profile check response:",
//                 res.data
//             );


//             /* =====================================================
//                PROFILE COMPLETED
//             ===================================================== */

//             if (
//                 res.data.exists &&
//                 res.data.isComplete
//             ) {

//                 /*
//                  * Profile is complete, so the user no longer
//                  * needs the skip flag.
//                  */

//                 const skipKey = getSkipKey();

//                 if (skipKey) {
//                     localStorage.removeItem(skipKey);
//                 }


//                 navigate("/dashboard");

//                 return;
//             }


//             /* =====================================================
//                PROFILE EXISTS BUT INCOMPLETE
//             ===================================================== */

//             if (
//                 res.data.exists &&
//                 !res.data.isComplete
//             ) {

//                 const existingProfile =
//                     res.data.profile || {};


//                 setProfile(previous => ({
//                     ...previous,
//                     ...existingProfile
//                 }));


//                 /*
//                  * Sync language saved in profile.
//                  */

//                 if (
//                     existingProfile.language &&
//                     existingProfile.language !==
//                         i18n.language
//                 ) {

//                     await i18n.changeLanguage(
//                         existingProfile.language
//                     );

//                 }

//             }


//             /*
//              * If no profile exists:
//              *
//              * Keep the empty form visible.
//              *
//              * Login.jsx already decides whether this user
//              * should reach this page or Dashboard.
//              */

//         } catch (err) {

//             console.log(
//                 "Error checking profile:",
//                 err
//             );

//         } finally {

//             setIsLoadingProfile(false);

//         }

//     };


//     /* =========================================================
//        HANDLE INPUT
//     ========================================================= */

//     const handleChange = (e) => {

//         const {
//             name,
//             value
//         } = e.target;


//         setProfile(previous => ({
//             ...previous,
//             [name]: value
//         }));

//     };


//     /* =========================================================
//        CURRENT LOCATION
//     ========================================================= */

//     const getCurrentLocation = () => {

//         if (!navigator.geolocation) {

//             toast.error(
//                 t("location_not_supported") ||
//                 "Location is not supported by your browser."
//             );

//             return;
//         }


//         navigator.geolocation.getCurrentPosition(

//             (position) => {

//                 setProfile(previous => ({
//                     ...previous,

//                     latitude:
//                         position.coords.latitude,

//                     longitude:
//                         position.coords.longitude
//                 }));


//                 toast.success(
//                     t("location_detected") ||
//                     "Location detected successfully."
//                 );

//             },

//             () => {

//                 toast.error(
//                     t("location_detection_failed") ||
//                     "Unable to detect your location."
//                 );

//             }

//         );

//     };


//     /* =========================================================
//        NEXT STEP
//     ========================================================= */

//     const nextStep = () => {

//         if (step < totalSteps) {

//             setStep(previous => previous + 1);

//         }

//     };


//     /* =========================================================
//        PREVIOUS STEP
//     ========================================================= */

//     const previousStep = () => {

//         if (step > 1) {

//             setStep(previous => previous - 1);

//         }

//     };


//     /* =========================================================
//        SKIP PROFILE
//     ========================================================= */
// const skipProfile = async () => {
//     try {
//         setLoading(true);

//         await api.post("/farmer/skip");

//         toast.success(
//             t("profile_skipped") ||
//             "Profile skipped. You can complete it later."
//         );

//         navigate("/dashboard");

//     } catch (err) {
//         console.error("Skip profile error:", err);

//         toast.error(
//             err.response?.data?.error ||
//             "Unable to skip profile."
//         );
//     } finally {
//         setLoading(false);
//     }
// };

//     /* =========================================================
//        SAVE PROFILE
//     ========================================================= */

//     const saveProfile = async () => {

//         try {

//             setLoading(true);


//             /* =================================================
//                REQUIRED FIELDS
//             ================================================= */

//             const requiredFields = [
//                 "fullName",
//                 "mobile",
//                 "state",
//                 "district",
//                 "farmName",
//                 "primaryCrop"
//             ];


//             const missingFields =
//                 requiredFields.filter(field => {

//                     const value =
//                         profile[field];

//                     return (
//                         !value ||
//                         String(value).trim() === ""
//                     );

//                 });


//             /* =================================================
//                VALIDATION
//             ================================================= */

//             if (
//                 missingFields.length > 0
//             ) {

//                 toast.error(
//                     t(
//                         "please_fill_all_required_fields"
//                     ) ||
//                     "Please fill all required fields."
//                 );


//                 const stepMap = {

//                     fullName: 1,

//                     mobile: 1,

//                     state: 2,

//                     district: 2,

//                     farmName: 3,

//                     primaryCrop: 4

//                 };


//                 const firstMissingStep =
//                     stepMap[
//                         missingFields[0]
//                     ] || 1;


//                 setStep(
//                     firstMissingStep
//                 );


//                 setLoading(false);

//                 return;

//             }


//             /* =================================================
//                SAVE LANGUAGE
//             ================================================= */

//             const profileData = {

//                 ...profile,

//                 language: i18n.language

//             };


//             /* =================================================
//                SAVE TO BACKEND
//             ================================================= */

//             const response =
//                 await api.post(
//                     "/farmer",
//                     profileData
//                 );


//             console.log(
//                 "Save response:",
//                 response.data
//             );


//             /* =================================================
//                REMOVE SKIP FLAG
//             ================================================= */

//             const skipKey =
//                 getSkipKey();


//             if (skipKey) {

//                 localStorage.removeItem(
//                     skipKey
//                 );

//             }


//             /* =================================================
//                SUCCESS
//             ================================================= */

//             toast.success(
//                 t("profile_saved") ||
//                 "Profile saved successfully."
//             );


//             /*
//              * IMPORTANT:
//              *
//              * First-time user should go to Dashboard,
//              * not /profile.
//              */

//             navigate("/dashboard");


//         } catch (err) {

//             console.error(
//                 "Save error:",
//                 err
//             );


//             toast.error(
//                 err.response?.data?.error ||
//                 t("profile_save_failed") ||
//                 "Failed to save profile."
//             );

//         } finally {

//             setLoading(false);

//         }

//     };


//     /* =========================================================
//        LOADING SCREEN
//     ========================================================= */

//     if (isLoadingProfile) {

//         return (

//             <div
//                 className="
//                     min-h-screen
//                     flex
//                     items-center
//                     justify-center
//                     bg-[#f5f8f6]
//                 "
//             >

//                 <div className="text-center">

//                     <Loader2
//                         className="
//                             animate-spin
//                             h-12
//                             w-12
//                             text-[#087443]
//                             mx-auto
//                         "
//                     />

//                     <p
//                         className="
//                             mt-4
//                             text-gray-600
//                             font-medium
//                         "
//                     >
//                         {t("loading_profile") ||
//                             "Loading profile..."}
//                     </p>

//                 </div>

//             </div>

//         );

//     }


//     /* =========================================================
//        MAIN UI
//     ========================================================= */

//     return (

//         <div
//             className="
//                 min-h-screen
//                 bg-[#f5f8f6]
//                 flex
//                 items-center
//                 justify-center
//                 py-10
//                 px-5
//             "
//         >

//             <motion.div
//                 initial={{
//                     opacity: 0,
//                     y: 20
//                 }}
//                 animate={{
//                     opacity: 1,
//                     y: 0
//                 }}
//                 transition={{
//                     duration: 0.45
//                 }}
//                 className="
//                     w-full
//                     max-w-5xl
//                     bg-white
//                     rounded-3xl
//                     shadow-[0_20px_60px_rgba(15,61,42,0.10)]
//                     border
//                     border-gray-100
//                     overflow-hidden
//                 "
//             >

//                 {/* =================================================
//                    HEADER
//                 ================================================= */}

//                 <div
//                     className="
//                         bg-gradient-to-r
//                         from-[#075d39]
//                         to-[#0b8048]
//                         text-white
//                         px-8
//                         py-8
//                         md:px-10
//                     "
//                 >

//                     <div
//                         className="
//                             flex
//                             flex-col
//                             md:flex-row
//                             md:items-center
//                             md:justify-between
//                             gap-5
//                         "
//                     >

//                         <div>

//                             <h1
//                                 className="
//                                     text-3xl
//                                     md:text-4xl
//                                     font-bold
//                                     tracking-tight
//                                 "
//                             >
//                                 {t("profile_title") ||
//                                     "Farmer Profile"}
//                             </h1>


//                             <p
//                                 className="
//                                     mt-2
//                                     text-green-50
//                                     text-base
//                                     md:text-lg
//                                 "
//                             >
//                                 {t("profile_subtitle") ||
//                                     "Tell us about yourself and your farm."}
//                             </p>

//                         </div>


//                         {/* LANGUAGE */}

//                         <div
//                             className="
//                                 flex
//                                 items-center
//                                 gap-2
//                                 text-green-50
//                                 text-sm
//                             "
//                         >

//                             <Globe size={18} />

//                             <span>
//                                 {t("current_language") ||
//                                     "Current Language"}
//                                 :
//                             </span>

//                             <span
//                                 className="
//                                     px-3
//                                     py-1.5
//                                     rounded-full
//                                     bg-white/15
//                                     border
//                                     border-white/10
//                                     font-medium
//                                 "
//                             >

//                                 {i18n.language === "en" &&
//                                     (t("english") ||
//                                         "English")}

//                                 {i18n.language === "te" &&
//                                     (t("telugu") ||
//                                         "Telugu")}

//                                 {i18n.language === "hi" &&
//                                     (t("hindi") ||
//                                         "Hindi")}

//                             </span>

//                         </div>

//                     </div>

//                 </div>


//                 {/* =================================================
//                    PROGRESS
//                 ================================================= */}

//                 <div
//                     className="
//                         px-7
//                         md:px-10
//                         pt-8
//                     "
//                 >

//                     <div
//                         className="
//                             flex
//                             justify-between
//                             gap-2
//                         "
//                     >

//                         {[1, 2, 3, 4].map(item => (

//                             <div
//                                 key={item}
//                                 className="
//                                     flex
//                                     flex-col
//                                     items-center
//                                     flex-1
//                                 "
//                             >

//                                 <div
//                                     className={`
//                                         w-11
//                                         h-11
//                                         md:w-12
//                                         md:h-12
//                                         rounded-full
//                                         flex
//                                         items-center
//                                         justify-center
//                                         font-bold
//                                         transition-all
//                                         duration-300
//                                         ${
//                                             step >= item
//                                                 ? "bg-[#087443] text-white shadow-md"
//                                                 : "bg-gray-100 text-gray-400"
//                                         }
//                                     `}
//                                 >

//                                     {step > item ? (

//                                         <CheckCircle
//                                             size={20}
//                                         />

//                                     ) : (

//                                         item

//                                     )}

//                                 </div>


//                                 <span
//                                     className="
//                                         text-xs
//                                         md:text-sm
//                                         mt-2
//                                         font-semibold
//                                         text-gray-600
//                                         text-center
//                                     "
//                                 >

//                                     {item === 1 &&
//                                         (t("personal") ||
//                                             "Personal")}

//                                     {item === 2 &&
//                                         (t("location") ||
//                                             "Location")}

//                                     {item === 3 &&
//                                         (t("farm") ||
//                                             "Farm")}

//                                     {item === 4 &&
//                                         (t("crops") ||
//                                             "Crops")}

//                                 </span>

//                             </div>

//                         ))}

//                     </div>


//                     <div
//                         className="
//                             mt-5
//                             h-1.5
//                             rounded-full
//                             bg-gray-100
//                             overflow-hidden
//                         "
//                     >

//                         <motion.div
//                             animate={{
//                                 width:
//                                     `${step * 25}%`
//                             }}
//                             transition={{
//                                 duration: 0.3
//                             }}
//                             className="
//                                 bg-[#087443]
//                                 h-full
//                                 rounded-full
//                             "
//                         />

//                     </div>

//                 </div>


//                 {/* =================================================
//                    FORM
//                 ================================================= */}

//                 <div
//                     className="
//                         px-7
//                         md:px-10
//                         py-8
//                     "
//                 >

//                     {/* =================================================
//                        STEP 1
//                     ================================================= */}

//                     {step === 1 && (

//                         <motion.div
//                             initial={{
//                                 opacity: 0,
//                                 x: 20
//                             }}
//                             animate={{
//                                 opacity: 1,
//                                 x: 0
//                             }}
//                             className="space-y-7"
//                         >

//                             <div>

//                                 <h2
//                                     className="
//                                         text-2xl
//                                         md:text-3xl
//                                         font-bold
//                                         text-[#172c25]
//                                     "
//                                 >
//                                     {t("personal_information") ||
//                                         "Personal Information"}
//                                 </h2>


//                                 <p
//                                     className="
//                                         text-gray-500
//                                         mt-2
//                                     "
//                                 >
//                                     {t("tell_about_yourself") ||
//                                         "Tell us a little about yourself."}
//                                 </p>

//                             </div>


//                             <div
//                                 className="
//                                     grid
//                                     md:grid-cols-2
//                                     gap-5
//                                 "
//                             >

//                                 {/* FULL NAME */}

//                                 <div>

//                                     <label
//                                         className="
//                                             text-sm
//                                             font-semibold
//                                             text-gray-700
//                                             flex
//                                             items-center
//                                             gap-2
//                                             mb-2
//                                         "
//                                     >

//                                         <User
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("full_name") ||
//                                             "Full Name"}

//                                         <span className="text-red-500">
//                                             *
//                                         </span>

//                                     </label>


//                                     <input
//                                         type="text"
//                                         name="fullName"
//                                         value={
//                                             profile.fullName
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder={
//                                             t(
//                                                 "enter_full_name"
//                                             ) ||
//                                             "Enter your full name"
//                                         }
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             text-gray-800
//                                             outline-none
//                                             transition
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                             focus:ring-2
//                                             focus:ring-[#087443]/10
//                                         "
//                                     />

//                                 </div>


//                                 {/* MOBILE */}

//                                 <div>

//                                     <label
//                                         className="
//                                             text-sm
//                                             font-semibold
//                                             text-gray-700
//                                             flex
//                                             items-center
//                                             gap-2
//                                             mb-2
//                                         "
//                                     >

//                                         <Phone
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("mobile_number") ||
//                                             "Mobile Number"}

//                                         <span className="text-red-500">
//                                             *
//                                         </span>

//                                     </label>


//                                     <input
//                                         type="text"
//                                         name="mobile"
//                                         value={
//                                             profile.mobile
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="9876543210"
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             text-gray-800
//                                             outline-none
//                                             transition
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                             focus:ring-2
//                                             focus:ring-[#087443]/10
//                                         "
//                                     />

//                                 </div>


//                                 {/* GENDER */}

//                                 <div>

//                                     <label
//                                         className="
//                                             text-sm
//                                             font-semibold
//                                             text-gray-700
//                                             mb-2
//                                             block
//                                         "
//                                     >
//                                         {t("gender") ||
//                                             "Gender"}
//                                     </label>


//                                     <select
//                                         name="gender"
//                                         value={
//                                             profile.gender
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             text-gray-800
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     >

//                                         <option value="">
//                                             {t("select_gender") ||
//                                                 "Select Gender"}
//                                         </option>

//                                         <option value="Male">
//                                             {t("male") ||
//                                                 "Male"}
//                                         </option>

//                                         <option value="Female">
//                                             {t("female") ||
//                                                 "Female"}
//                                         </option>

//                                         <option value="Other">
//                                             {t("other") ||
//                                                 "Other"}
//                                         </option>

//                                     </select>

//                                 </div>


//                                 {/* AGE */}

//                                 <div>

//                                     <label
//                                         className="
//                                             text-sm
//                                             font-semibold
//                                             text-gray-700
//                                             flex
//                                             items-center
//                                             gap-2
//                                             mb-2
//                                         "
//                                     >

//                                         <Calendar
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("age") ||
//                                             "Age"}

//                                     </label>


//                                     <input
//                                         type="number"
//                                         name="age"
//                                         value={
//                                             profile.age
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="35"
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             text-gray-800
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     />

//                                 </div>

//                             </div>


//                             <div
//                                 className="
//                                     bg-[#f2f8f4]
//                                     rounded-2xl
//                                     p-5
//                                     border
//                                     border-[#dceee3]
//                                 "
//                             >

//                                 <div
//                                     className="
//                                         flex
//                                         items-center
//                                         gap-4
//                                     "
//                                 >

//                                     <div
//                                         className="
//                                             w-12
//                                             h-12
//                                             rounded-xl
//                                             bg-white
//                                             border
//                                             border-[#dceee3]
//                                             flex
//                                             items-center
//                                             justify-center
//                                             text-[#087443]
//                                         "
//                                     >

//                                         <User size={23} />

//                                     </div>


//                                     <div>

//                                         <h3
//                                             className="
//                                                 font-bold
//                                                 text-gray-800
//                                             "
//                                         >
//                                             {t(
//                                                 "farmxpert_identity"
//                                             ) ||
//                                                 "Your FarmXpert Profile"}
//                                         </h3>


//                                         <p
//                                             className="
//                                                 text-sm
//                                                 text-gray-500
//                                                 mt-1
//                                             "
//                                         >
//                                             {t(
//                                                 "identity_description"
//                                             ) ||
//                                                 "This information helps personalize your farming experience."}
//                                         </p>

//                                     </div>

//                                 </div>

//                             </div>

//                         </motion.div>

//                     )}


//                     {/* =================================================
//                        STEP 2
//                     ================================================= */}

//                     {step === 2 && (

//                         <motion.div
//                             initial={{
//                                 opacity: 0,
//                                 x: 20
//                             }}
//                             animate={{
//                                 opacity: 1,
//                                 x: 0
//                             }}
//                             className="space-y-7"
//                         >

//                             <div>

//                                 <h2
//                                     className="
//                                         text-2xl
//                                         md:text-3xl
//                                         font-bold
//                                         text-[#172c25]
//                                     "
//                                 >
//                                     {t("farm_location") ||
//                                         "Farm Location"}
//                                 </h2>


//                                 <p
//                                     className="
//                                         text-gray-500
//                                         mt-2
//                                     "
//                                 >
//                                     {t("farm_location_desc") ||
//                                         "Tell us where your farm is located."}
//                                 </p>

//                             </div>


//                             <div
//                                 className="
//                                     grid
//                                     md:grid-cols-2
//                                     gap-5
//                                 "
//                             >

//                                 {/* STATE */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             mb-2
//                                             block
//                                             text-gray-700
//                                         "
//                                     >

//                                         {t("state") ||
//                                             "State"}

//                                         <span className="text-red-500">
//                                             *
//                                         </span>

//                                     </label>


//                                     <input
//                                         type="text"
//                                         name="state"
//                                         value={
//                                             profile.state
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="Andhra Pradesh"
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     />

//                                 </div>


//                                 {/* DISTRICT */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             mb-2
//                                             block
//                                             text-gray-700
//                                         "
//                                     >

//                                         {t("district") ||
//                                             "District"}

//                                         <span className="text-red-500">
//                                             *
//                                         </span>

//                                     </label>


//                                     <input
//                                         type="text"
//                                         name="district"
//                                         value={
//                                             profile.district
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="Kakinada"
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     />

//                                 </div>


//                                 {/* VILLAGE */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             mb-2
//                                             block
//                                             text-gray-700
//                                         "
//                                     >
//                                         {t("village") ||
//                                             "Village"}
//                                     </label>


//                                     <input
//                                         type="text"
//                                         name="village"
//                                         value={
//                                             profile.village
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="Village"
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     />

//                                 </div>


//                                 {/* PIN */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             mb-2
//                                             block
//                                             text-gray-700
//                                         "
//                                     >
//                                         {t("pin_code") ||
//                                             "PIN Code"}
//                                     </label>


//                                     <input
//                                         type="text"
//                                         name="pincode"
//                                         value={
//                                             profile.pincode
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="533001"
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     />

//                                 </div>

//                             </div>


//                             {/* GPS */}

//                             <div
//                                 className="
//                                     rounded-2xl
//                                     bg-[#f3f7fb]
//                                     border
//                                     border-[#dce7f1]
//                                     p-5
//                                 "
//                             >

//                                 <div
//                                     className="
//                                         flex
//                                         flex-col
//                                         md:flex-row
//                                         md:items-center
//                                         md:justify-between
//                                         gap-4
//                                     "
//                                 >

//                                     <div>

//                                         <h3
//                                             className="
//                                                 font-bold
//                                                 text-[#345064]
//                                             "
//                                         >
//                                             {t("gps_location") ||
//                                                 "GPS Location"}
//                                         </h3>


//                                         <p
//                                             className="
//                                                 text-sm
//                                                 text-gray-500
//                                                 mt-1
//                                             "
//                                         >
//                                             {t("gps_description") ||
//                                                 "Use your current location to automatically detect your farm coordinates."}
//                                         </p>

//                                     </div>


//                                     <button
//                                         type="button"
//                                         onClick={
//                                             getCurrentLocation
//                                         }
//                                         className="
//                                             px-5
//                                             py-2.5
//                                             rounded-xl
//                                             bg-[#315a70]
//                                             text-white
//                                             font-semibold
//                                             text-sm
//                                             hover:bg-[#274b5d]
//                                             transition
//                                         "
//                                     >
//                                         {t("detect_location") ||
//                                             "Detect Location"}
//                                     </button>

//                                 </div>


//                                 {profile.latitude && (

//                                     <div
//                                         className="
//                                             mt-4
//                                             text-sm
//                                             text-gray-600
//                                             bg-white
//                                             rounded-xl
//                                             p-4
//                                             border
//                                             border-gray-100
//                                         "
//                                     >

//                                         <span>
//                                             {t("latitude") ||
//                                                 "Latitude"}:
//                                         </span>

//                                         <strong className="ml-1">
//                                             {profile.latitude}
//                                         </strong>


//                                         <span className="ml-5">
//                                             {t("longitude") ||
//                                                 "Longitude"}:
//                                         </span>

//                                         <strong className="ml-1">
//                                             {profile.longitude}
//                                         </strong>

//                                     </div>

//                                 )}

//                             </div>

//                         </motion.div>

//                     )}


//                     {/* =================================================
//                        STEP 3
//                     ================================================= */}

//                     {step === 3 && (

//                         <motion.div
//                             initial={{
//                                 opacity: 0,
//                                 x: 20
//                             }}
//                             animate={{
//                                 opacity: 1,
//                                 x: 0
//                             }}
//                             className="space-y-7"
//                         >

//                             <div>

//                                 <h2
//                                     className="
//                                         text-2xl
//                                         md:text-3xl
//                                         font-bold
//                                         text-[#172c25]
//                                     "
//                                 >
//                                     {t("farm_information") ||
//                                         "Farm Information"}
//                                 </h2>


//                                 <p
//                                     className="
//                                         text-gray-500
//                                         mt-2
//                                     "
//                                 >
//                                     {t("farm_information_desc") ||
//                                         "Tell us about your farm."}
//                                 </p>

//                             </div>


//                             <div
//                                 className="
//                                     grid
//                                     md:grid-cols-2
//                                     gap-5
//                                 "
//                             >

//                                 {/* FARM NAME */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             text-gray-700
//                                             mb-2
//                                             flex
//                                             items-center
//                                             gap-2
//                                         "
//                                     >

//                                         <Tractor
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("farm_name") ||
//                                             "Farm Name"}

//                                         <span className="text-red-500">
//                                             *
//                                         </span>

//                                     </label>


//                                     <input
//                                         type="text"
//                                         name="farmName"
//                                         value={
//                                             profile.farmName
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="Green Valley Farm"
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     />

//                                 </div>


//                                 {/* LAND AREA */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             text-gray-700
//                                             mb-2
//                                             block
//                                         "
//                                     >
//                                         {t("total_land") ||
//                                             "Total Land"}
//                                     </label>


//                                     <input
//                                         type="number"
//                                         name="landArea"
//                                         value={
//                                             profile.landArea
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="5"
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     />

//                                 </div>


//                                 {/* LAND UNIT */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             text-gray-700
//                                             mb-2
//                                             block
//                                         "
//                                     >
//                                         {t("land_unit") ||
//                                             "Land Unit"}
//                                     </label>


//                                     <select
//                                         name="landUnit"
//                                         value={
//                                             profile.landUnit
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     >

//                                         <option value="Acres">
//                                             {t("acres") ||
//                                                 "Acres"}
//                                         </option>

//                                         <option value="Hectares">
//                                             {t("hectares") ||
//                                                 "Hectares"}
//                                         </option>

//                                     </select>

//                                 </div>


//                                 {/* SOIL */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             text-gray-700
//                                             mb-2
//                                             flex
//                                             items-center
//                                             gap-2
//                                         "
//                                     >

//                                         <Mountain
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("soil_type") ||
//                                             "Soil Type"}

//                                     </label>


//                                     <select
//                                         name="soilType"
//                                         value={
//                                             profile.soilType
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     >

//                                         <option value="">
//                                             {t("select_soil") ||
//                                                 "Select Soil"}
//                                         </option>

//                                         <option>
//                                             {t("black_soil") ||
//                                                 "Black Soil"}
//                                         </option>

//                                         <option>
//                                             {t("red_soil") ||
//                                                 "Red Soil"}
//                                         </option>

//                                         <option>
//                                             {t("clay_soil") ||
//                                                 "Clay Soil"}
//                                         </option>

//                                         <option>
//                                             {t("alluvial_soil") ||
//                                                 "Alluvial Soil"}
//                                         </option>

//                                         <option>
//                                             {t("laterite_soil") ||
//                                                 "Laterite Soil"}
//                                         </option>

//                                         <option>
//                                             {t("sandy_soil") ||
//                                                 "Sandy Soil"}
//                                         </option>

//                                     </select>

//                                 </div>


//                                 {/* IRRIGATION */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             text-gray-700
//                                             mb-2
//                                             flex
//                                             items-center
//                                             gap-2
//                                         "
//                                     >

//                                         <Droplets
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("irrigation_type") ||
//                                             "Irrigation Type"}

//                                     </label>


//                                     <select
//                                         name="irrigationType"
//                                         value={
//                                             profile.irrigationType
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     >

//                                         <option value="">
//                                             {t("select_irrigation") ||
//                                                 "Select Irrigation"}
//                                         </option>

//                                         <option>
//                                             {t("drip_irrigation") ||
//                                                 "Drip Irrigation"}
//                                         </option>

//                                         <option>
//                                             {t("sprinkler") ||
//                                                 "Sprinkler"}
//                                         </option>

//                                         <option>
//                                             {t("canal") ||
//                                                 "Canal"}
//                                         </option>

//                                         <option>
//                                             {t("rainfed") ||
//                                                 "Rainfed"}
//                                         </option>

//                                         <option>
//                                             {t("borewell") ||
//                                                 "Borewell"}
//                                         </option>

//                                     </select>

//                                 </div>


//                                 {/* WATER SOURCE */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             text-gray-700
//                                             mb-2
//                                             block
//                                         "
//                                     >
//                                         {t("water_source") ||
//                                             "Water Source"}
//                                     </label>


//                                     <select
//                                         name="waterSource"
//                                         value={
//                                             profile.waterSource
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     >

//                                         <option value="">
//                                             {t("select_water_source") ||
//                                                 "Select Water Source"}
//                                         </option>

//                                         <option>
//                                             {t("borewell") ||
//                                                 "Borewell"}
//                                         </option>

//                                         <option>
//                                             {t("river") ||
//                                                 "River"}
//                                         </option>

//                                         <option>
//                                             {t("canal") ||
//                                                 "Canal"}
//                                         </option>

//                                         <option>
//                                             {t("pond") ||
//                                                 "Pond"}
//                                         </option>

//                                         <option>
//                                             {t("rain_water") ||
//                                                 "Rain Water"}
//                                         </option>

//                                     </select>

//                                 </div>

//                             </div>

//                         </motion.div>

//                     )}


//                     {/* =================================================
//                        STEP 4
//                     ================================================= */}

//                     {step === 4 && (

//                         <motion.div
//                             initial={{
//                                 opacity: 0,
//                                 x: 20
//                             }}
//                             animate={{
//                                 opacity: 1,
//                                 x: 0
//                             }}
//                             className="space-y-7"
//                         >

//                             <div>

//                                 <h2
//                                     className="
//                                         text-2xl
//                                         md:text-3xl
//                                         font-bold
//                                         text-[#172c25]
//                                     "
//                                 >
//                                     {t("crop_information") ||
//                                         "Crop Information"}
//                                 </h2>


//                                 <p
//                                     className="
//                                         text-gray-500
//                                         mt-2
//                                     "
//                                 >
//                                     {t("crop_information_desc") ||
//                                         "Tell us about the crops you grow."}
//                                 </p>

//                             </div>


//                             <div
//                                 className="
//                                     grid
//                                     md:grid-cols-2
//                                     gap-5
//                                 "
//                             >

//                                 {/* PRIMARY CROP */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             mb-2
//                                             flex
//                                             items-center
//                                             gap-2
//                                             text-gray-700
//                                         "
//                                     >

//                                         <Sprout
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("primary_crop") ||
//                                             "Primary Crop"}

//                                         <span className="text-red-500">
//                                             *
//                                         </span>

//                                     </label>


//                                     <select
//                                         name="primaryCrop"
//                                         value={
//                                             profile.primaryCrop
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     >

//                                         <option value="">
//                                             {t("select_crop") ||
//                                                 "Select Crop"}
//                                         </option>

//                                         <option>
//                                             {t("rice") ||
//                                                 "Rice"}
//                                         </option>

//                                         <option>
//                                             {t("maize") ||
//                                                 "Maize"}
//                                         </option>

//                                         <option>
//                                             {t("cotton") ||
//                                                 "Cotton"}
//                                         </option>

//                                         <option>
//                                             {t("groundnut") ||
//                                                 "Groundnut"}
//                                         </option>

//                                         <option>
//                                             {t("sugarcane") ||
//                                                 "Sugarcane"}
//                                         </option>

//                                         <option>
//                                             {t("tomato") ||
//                                                 "Tomato"}
//                                         </option>

//                                         <option>
//                                             {t("potato") ||
//                                                 "Potato"}
//                                         </option>

//                                         <option>
//                                             {t("chilli") ||
//                                                 "Chilli"}
//                                         </option>

//                                         <option>
//                                             {t("wheat") ||
//                                                 "Wheat"}
//                                         </option>

//                                     </select>

//                                 </div>


//                                 {/* SECONDARY CROP */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             mb-2
//                                             block
//                                             text-gray-700
//                                         "
//                                     >
//                                         {t("secondary_crop") ||
//                                             "Secondary Crop"}
//                                     </label>


//                                     <input
//                                         type="text"
//                                         name="secondaryCrop"
//                                         value={
//                                             profile.secondaryCrop
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder={
//                                             t("optional") ||
//                                             "Optional"
//                                         }
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     />

//                                 </div>


//                                 {/* FARMING TYPE */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             mb-2
//                                             block
//                                             text-gray-700
//                                         "
//                                     >
//                                         {t("farming_type") ||
//                                             "Farming Type"}
//                                     </label>


//                                     <select
//                                         name="farmingType"
//                                         value={
//                                             profile.farmingType
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     >

//                                         <option value="">
//                                             {t("select_farming_type") ||
//                                                 "Select Farming Type"}
//                                         </option>

//                                         <option>
//                                             {t("organic") ||
//                                                 "Organic"}
//                                         </option>

//                                         <option>
//                                             {t("conventional") ||
//                                                 "Conventional"}
//                                         </option>

//                                         <option>
//                                             {t("mixed") ||
//                                                 "Mixed"}
//                                         </option>

//                                     </select>

//                                 </div>


//                                 {/* EXPERIENCE */}

//                                 <div>

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             mb-2
//                                             block
//                                             text-gray-700
//                                         "
//                                     >
//                                         {t("farming_experience") ||
//                                             "Farming Experience"}
//                                     </label>


//                                     <input
//                                         type="number"
//                                         name="farmingExperience"
//                                         value={
//                                             profile.farmingExperience
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="10"
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     />

//                                 </div>


//                                 {/* LIVESTOCK */}

//                                 <div
//                                     className="
//                                         md:col-span-2
//                                     "
//                                 >

//                                     <label
//                                         className="
//                                             font-semibold
//                                             text-sm
//                                             mb-2
//                                             block
//                                             text-gray-700
//                                         "
//                                     >
//                                         {t("livestock") ||
//                                             "Livestock"}
//                                     </label>


//                                     <input
//                                         type="text"
//                                         name="livestock"
//                                         value={
//                                             profile.livestock
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder={
//                                             t(
//                                                 "livestock_placeholder"
//                                             ) ||
//                                             "Example: Cows, Buffaloes"
//                                         }
//                                         className="
//                                             w-full
//                                             p-3.5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-gray-50/60
//                                             outline-none
//                                             focus:bg-white
//                                             focus:border-[#087443]
//                                         "
//                                     />

//                                 </div>

//                             </div>


//                             <div
//                                 className="
//                                     bg-[#f2f8f4]
//                                     rounded-2xl
//                                     p-5
//                                     border
//                                     border-[#dceee3]
//                                 "
//                             >

//                                 <h3
//                                     className="
//                                         font-bold
//                                         text-[#087443]
//                                         text-lg
//                                     "
//                                 >
//                                     {t("almost_done") ||
//                                         "Almost Done"}
//                                 </h3>


//                                 <p
//                                     className="
//                                         text-gray-600
//                                         mt-1.5
//                                     "
//                                 >
//                                     {t("almost_done_desc") ||
//                                         "Save your profile to personalize your FarmXpert dashboard."}
//                                 </p>

//                             </div>

//                         </motion.div>

//                     )}


//                     {/* =================================================
//                        NAVIGATION
//                     ================================================= */}

//                     <div
//                         className="
//                             mt-10
//                             pt-6
//                             border-t
//                             border-gray-100
//                         "
//                     >

//                         <div
//                             className="
//                                 flex
//                                 flex-col
//                                 sm:flex-row
//                                 sm:items-center
//                                 sm:justify-between
//                                 gap-4
//                             "
//                         >

//                             {/* LEFT BUTTONS */}

//                             <div
//                                 className="
//                                     flex
//                                     items-center
//                                     gap-3
//                                 "
//                             >

//                                 {/* PREVIOUS */}

//                                 {step > 1 ? (

//                                     <button
//                                         type="button"
//                                         onClick={
//                                             previousStep
//                                         }
//                                         disabled={loading}
//                                         className="
//                                             h-11
//                                             px-5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-white
//                                             text-gray-700
//                                             font-semibold
//                                             flex
//                                             items-center
//                                             gap-2
//                                             hover:bg-gray-50
//                                             transition
//                                             disabled:opacity-50
//                                         "
//                                     >

//                                         <ArrowLeft
//                                             size={17}
//                                         />

//                                         {t("previous") ||
//                                             "Previous"}

//                                     </button>

//                                 ) : (

//                                     <div />

//                                 )}


//                                 {/* SKIP */}

//                                 <button
//                                     type="button"
//                                     onClick={
//                                         skipProfile
//                                     }
//                                     disabled={loading}
//                                     className="
//                                         h-11
//                                         px-5
//                                         rounded-xl
//                                         text-gray-500
//                                         font-medium
//                                         hover:text-[#087443]
//                                         hover:bg-[#f3f7f5]
//                                         transition
//                                         disabled:opacity-50
//                                     "
//                                 >
//                                     Skip for now
//                                 </button>

//                             </div>


//                             {/* RIGHT BUTTON */}

//                             {step < totalSteps ? (

//                                 <button
//                                     type="button"
//                                     onClick={
//                                         nextStep
//                                     }
//                                     disabled={loading}
//                                     className="
//                                         h-11
//                                         px-6
//                                         rounded-xl
//                                         bg-[#087443]
//                                         text-white
//                                         font-semibold
//                                         flex
//                                         items-center
//                                         justify-center
//                                         gap-2
//                                         shadow-[0_5px_15px_rgba(8,116,67,0.18)]
//                                         hover:bg-[#076538]
//                                         hover:-translate-y-0.5
//                                         transition-all
//                                         disabled:opacity-50
//                                     "
//                                 >

//                                     {t("next") ||
//                                         "Next"}

//                                     <ArrowRight
//                                         size={18}
//                                     />

//                                 </button>

//                             ) : (

//                                 <button
//                                     type="button"
//                                     onClick={
//                                         saveProfile
//                                     }
//                                     disabled={
//                                         loading
//                                     }
//                                     className="
//                                         h-11
//                                         px-6
//                                         rounded-xl
//                                         bg-[#087443]
//                                         text-white
//                                         font-semibold
//                                         flex
//                                         items-center
//                                         justify-center
//                                         gap-2
//                                         shadow-[0_5px_15px_rgba(8,116,67,0.18)]
//                                         hover:bg-[#076538]
//                                         hover:-translate-y-0.5
//                                         transition-all
//                                         disabled:opacity-60
//                                         disabled:cursor-not-allowed
//                                     "
//                                 >

//                                     {loading ? (

//                                         <>

//                                             <Loader2
//                                                 size={18}
//                                                 className="
//                                                     animate-spin
//                                                 "
//                                             />

//                                             {t("saving") ||
//                                                 "Saving..."}

//                                         </>

//                                     ) : (

//                                         <>

//                                             {t("save_profile") ||
//                                                 "Save Profile"}

//                                             <CheckCircle
//                                                 size={18}
//                                             />

//                                         </>

//                                     )}

//                                 </button>

//                             )}

//                         </div>

//                     </div>


//                     {/* =================================================
//                        FOOTER
//                     ================================================= */}

//                     <div
//                         className="
//                             mt-7
//                             text-center
//                         "
//                     >

//                         <p
//                             className="
//                                 text-xs
//                                 md:text-sm
//                                 text-gray-400
//                             "
//                         >
//                             {t("profile_footer") ||
//                                 "You can update these details anytime from My Profile."}
//                         </p>

//                     </div>

//                 </div>

//             </motion.div>

//         </div>

//     );

// }
















// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// import {
//     User,
//     Phone,
//     Tractor,
//     Sprout,
//     Mountain,
//     Droplets,
//     Calendar,
//     ArrowRight,
//     ArrowLeft,
//     CheckCircle,
//     Loader2,
//     Globe,
//     MapPin
// } from "lucide-react";

// import { toast } from "react-toastify";
// import { useTranslation } from "react-i18next";

// import api from "../api";


// export default function FarmerProfile() {

//     const navigate = useNavigate();
//     const { t, i18n } = useTranslation();

//     /* =========================================================
//        STATES
//     ========================================================= */

//     const [loading, setLoading] = useState(false);

//     const [isLoadingProfile, setIsLoadingProfile] =
//         useState(true);

//     const [step, setStep] = useState(1);

//     const totalSteps = 4;


//     /* =========================================================
//        PROFILE STATE
//     ========================================================= */

//     const [profile, setProfile] = useState({

//         fullName: "",
//         mobile: "",
//         gender: "",
//         age: "",

//         state: "",
//         district: "",
//         village: "",
//         pincode: "",

//         latitude: "",
//         longitude: "",

//         farmName: "",
//         landArea: "",
//         landUnit: "Acres",

//         soilType: "",
//         irrigationType: "",
//         waterSource: "",

//         primaryCrop: "",
//         secondaryCrop: "",

//         farmingType: "",
//         farmingExperience: "",

//         livestock: ""

//     });


//     /* =========================================================
//        LANGUAGE REFRESH
//     ========================================================= */

//     const [, setLanguageVersion] = useState(0);

//     useEffect(() => {

//         const handleLanguageChange = () => {

//             setLanguageVersion(
//                 previous => previous + 1
//             );

//         };

//         i18n.on(
//             "languageChanged",
//             handleLanguageChange
//         );

//         return () => {

//             i18n.off(
//                 "languageChanged",
//                 handleLanguageChange
//             );

//         };

//     }, [i18n]);


//     /* =========================================================
//        CHECK EXISTING PROFILE
       
//        IMPORTANT:
//        No localStorage is used here.

//        MongoDB is the source of truth.
//     ========================================================= */

//     useEffect(() => {

//         checkExistingProfile();

//     }, []);


//     const checkExistingProfile = async () => {

//         try {

//             setIsLoadingProfile(true);

//             const response =
//                 await api.get("/farmer/check");

//             console.log(
//                 "Profile check:",
//                 response.data
//             );


//             /* =====================================================
//                PROFILE ALREADY COMPLETED
//             ===================================================== */

//             if (
//                 response.data.exists === true &&
//                 response.data.isComplete === true
//             ) {

//                 navigate("/dashboard");

//                 return;
//             }


//             /* =====================================================
//                PROFILE EXISTS BUT IS INCOMPLETE
//             ===================================================== */

//             if (
//                 response.data.exists === true &&
//                 response.data.isComplete === false
//             ) {

//                 const existingProfile =
//                     response.data.profile || {};


//                 setProfile(previous => ({
//                     ...previous,
//                     ...existingProfile
//                 }));


//                 /* -----------------------------------------------
//                    Sync saved language
//                 ------------------------------------------------ */

//                 if (
//                     existingProfile.language &&
//                     existingProfile.language !==
//                         i18n.language
//                 ) {

//                     await i18n.changeLanguage(
//                         existingProfile.language
//                     );

//                 }

//             }

//         } catch (error) {

//             console.error(
//                 "Error checking profile:",
//                 error
//             );

//         } finally {

//             setIsLoadingProfile(false);

//         }

//     };


//     /* =========================================================
//        INPUT CHANGE
//     ========================================================= */

//     const handleChange = (e) => {

//         const {
//             name,
//             value
//         } = e.target;

//         setProfile(previous => ({
//             ...previous,
//             [name]: value
//         }));

//     };


//     /* =========================================================
//        CURRENT LOCATION
//     ========================================================= */

//     const getCurrentLocation = () => {

//         if (!navigator.geolocation) {

//             toast.error(
//                 t("location_not_supported") ||
//                 "Location is not supported by your browser."
//             );

//             return;
//         }


//         navigator.geolocation.getCurrentPosition(

//             (position) => {

//                 setProfile(previous => ({

//                     ...previous,

//                     latitude:
//                         position.coords.latitude,

//                     longitude:
//                         position.coords.longitude

//                 }));


//                 toast.success(
//                     t("location_detected") ||
//                     "Location detected successfully."
//                 );

//             },

//             (error) => {

//                 console.error(
//                     "Location error:",
//                     error
//                 );

//                 toast.error(
//                     t("location_detection_failed") ||
//                     "Unable to detect your location."
//                 );

//             },

//             {
//                 enableHighAccuracy: true,
//                 timeout: 10000,
//                 maximumAge: 0
//             }

//         );

//     };


//     /* =========================================================
//        NEXT STEP
//     ========================================================= */

//     const nextStep = () => {

//         if (step < totalSteps) {

//             setStep(
//                 previous => previous + 1
//             );

//         }

//     };


//     /* =========================================================
//        PREVIOUS STEP
//     ========================================================= */

//     const previousStep = () => {

//         if (step > 1) {

//             setStep(
//                 previous => previous - 1
//             );

//         }

//     };


//     /* =========================================================
//        SKIP PROFILE

//        IMPORTANT:
//        This now updates MongoDB.

//        No localStorage.
//     ========================================================= */

//     const skipProfile = async () => {

//         try {

//             setLoading(true);


//             const response =
//                 await api.post("/farmer/skip");


//             console.log(
//                 "Skip profile response:",
//                 response.data
//             );


//             toast.success(
//                 t("profile_skipped") ||
//                 "Profile skipped. You can complete it later."
//             );


//             /*
//              * Backend should now have:
//              *
//              * hasCompletedProfile: true
//              */

//             navigate("/dashboard");


//         } catch (error) {

//             console.error(
//                 "Skip profile error:",
//                 error
//             );


//             toast.error(
//                 error.response?.data?.error ||
//                 error.response?.data?.message ||
//                 "Unable to skip profile."
//             );

//         } finally {

//             setLoading(false);

//         }

//     };


//     /* =========================================================
//        SAVE PROFILE
//     ========================================================= */

//     const saveProfile = async () => {

//         try {

//             setLoading(true);


//             /* =================================================
//                REQUIRED FIELDS
//             ================================================= */

//             const requiredFields = [

//                 "fullName",
//                 "mobile",
//                 "state",
//                 "district",
//                 "farmName",
//                 "primaryCrop"

//             ];


//             const missingFields =
//                 requiredFields.filter(
//                     field => {

//                         const value =
//                             profile[field];

//                         return (
//                             !value ||
//                             String(value).trim() === ""
//                         );

//                     }
//                 );


//             /* =================================================
//                VALIDATION
//             ================================================= */

//             if (
//                 missingFields.length > 0
//             ) {

//                 toast.error(

//                     t(
//                         "please_fill_all_required_fields"
//                     ) ||

//                     "Please fill all required fields."

//                 );


//                 const stepMap = {

//                     fullName: 1,
//                     mobile: 1,

//                     state: 2,
//                     district: 2,

//                     farmName: 3,

//                     primaryCrop: 4

//                 };


//                 const firstMissingStep =
//                     stepMap[
//                         missingFields[0]
//                     ] || 1;


//                 setStep(
//                     firstMissingStep
//                 );


//                 setLoading(false);

//                 return;
//             }


//             /* =================================================
//                PROFILE DATA
//             ================================================= */

//             const profileData = {

//                 ...profile,

//                 language:
//                     i18n.language

//             };


//             /* =================================================
//                SAVE TO MONGODB
//             ================================================= */

//             const response =
//                 await api.post(
//                     "/farmer",
//                     profileData
//                 );


//             console.log(
//                 "Profile save response:",
//                 response.data
//             );


//             /*
//              * Backend should now have:
//              *
//              * hasCompletedProfile: true
//              */


//             toast.success(

//                 t("profile_saved") ||

//                 "Profile saved successfully."

//             );


//             navigate("/dashboard");


//         } catch (error) {

//             console.error(
//                 "Save profile error:",
//                 error
//             );


//             toast.error(

//                 error.response?.data?.error ||

//                 error.response?.data?.message ||

//                 t("profile_save_failed") ||

//                 "Failed to save profile."

//             );

//         } finally {

//             setLoading(false);

//         }

//     };


//     /* =========================================================
//        LOADING SCREEN
//     ========================================================= */

//     if (isLoadingProfile) {

//         return (

//             <div
//                 className="
//                     min-h-screen
//                     flex
//                     items-center
//                     justify-center
//                     bg-[#f5f8f6]
//                 "
//             >

//                 <div className="text-center">

//                     <Loader2
//                         className="
//                             animate-spin
//                             h-12
//                             w-12
//                             text-[#087443]
//                             mx-auto
//                         "
//                     />

//                     <p
//                         className="
//                             mt-4
//                             text-gray-600
//                             font-medium
//                         "
//                     >
//                         {t("loading_profile") ||
//                             "Loading profile..."}
//                     </p>

//                 </div>

//             </div>

//         );

//     }


//     /* =========================================================
//        FIELD COMPONENT
//     ========================================================= */

//     const inputClass = `
//         w-full
//         p-3.5
//         rounded-xl
//         border
//         border-gray-200
//         bg-gray-50/60
//         text-gray-800
//         outline-none
//         transition
//         focus:bg-white
//         focus:border-[#087443]
//         focus:ring-2
//         focus:ring-[#087443]/10
//     `;


//     const labelClass = `
//         text-sm
//         font-semibold
//         text-gray-700
//         mb-2
//         block
//     `;


//     /* =========================================================
//        MAIN UI
//     ========================================================= */

//     return (

//         <div
//             className="
//                 min-h-screen
//                 bg-[#f5f8f6]
//                 flex
//                 items-center
//                 justify-center
//                 py-10
//                 px-5
//             "
//         >

//             <motion.div

//                 initial={{
//                     opacity: 0,
//                     y: 20
//                 }}

//                 animate={{
//                     opacity: 1,
//                     y: 0
//                 }}

//                 transition={{
//                     duration: 0.45
//                 }}

//                 className="
//                     w-full
//                     max-w-5xl
//                     bg-white
//                     rounded-3xl
//                     shadow-[0_20px_60px_rgba(15,61,42,0.10)]
//                     border
//                     border-gray-100
//                     overflow-hidden
//                 "
//             >

//                 {/* =================================================
//                    HEADER
//                 ================================================= */}

//                 <div
//                     className="
//                         bg-gradient-to-r
//                         from-[#075d39]
//                         to-[#0b8048]
//                         text-white
//                         px-8
//                         py-8
//                         md:px-10
//                     "
//                 >

//                     <div
//                         className="
//                             flex
//                             flex-col
//                             md:flex-row
//                             md:items-center
//                             md:justify-between
//                             gap-5
//                         "
//                     >

//                         <div>

//                             <h1
//                                 className="
//                                     text-3xl
//                                     md:text-4xl
//                                     font-bold
//                                     tracking-tight
//                                 "
//                             >
//                                 {t("profile_title") ||
//                                     "Farmer Profile"}
//                             </h1>

//                             <p
//                                 className="
//                                     mt-2
//                                     text-green-50
//                                     text-base
//                                     md:text-lg
//                                 "
//                             >
//                                 {t("profile_subtitle") ||
//                                     "Tell us about yourself and your farm."}
//                             </p>

//                         </div>


//                         {/* LANGUAGE */}

//                         <div
//                             className="
//                                 flex
//                                 items-center
//                                 gap-2
//                                 text-green-50
//                                 text-sm
//                             "
//                         >

//                             <Globe size={18} />

//                             <span>
//                                 {t("current_language") ||
//                                     "Current Language"}:
//                             </span>

//                             <span
//                                 className="
//                                     px-3
//                                     py-1.5
//                                     rounded-full
//                                     bg-white/15
//                                     border
//                                     border-white/10
//                                     font-medium
//                                 "
//                             >

//                                 {i18n.language === "en" &&
//                                     (t("english") ||
//                                         "English")}

//                                 {i18n.language === "te" &&
//                                     (t("telugu") ||
//                                         "Telugu")}

//                                 {i18n.language === "hi" &&
//                                     (t("hindi") ||
//                                         "Hindi")}

//                             </span>

//                         </div>

//                     </div>

//                 </div>


//                 {/* =================================================
//                    PROGRESS
//                 ================================================= */}

//                 <div
//                     className="
//                         px-7
//                         md:px-10
//                         pt-8
//                     "
//                 >

//                     <div
//                         className="
//                             flex
//                             justify-between
//                             gap-2
//                         "
//                     >

//                         {[1, 2, 3, 4].map(
//                             item => (

//                                 <div
//                                     key={item}
//                                     className="
//                                         flex
//                                         flex-col
//                                         items-center
//                                         flex-1
//                                     "
//                                 >

//                                     <div
//                                         className={`
//                                             w-11
//                                             h-11
//                                             md:w-12
//                                             md:h-12
//                                             rounded-full
//                                             flex
//                                             items-center
//                                             justify-center
//                                             font-bold
//                                             transition-all
//                                             duration-300
//                                             ${
//                                                 step >= item
//                                                     ? "bg-[#087443] text-white shadow-md"
//                                                     : "bg-gray-100 text-gray-400"
//                                             }
//                                         `}
//                                     >

//                                         {step > item ? (

//                                             <CheckCircle
//                                                 size={20}
//                                             />

//                                         ) : (

//                                             item

//                                         )}

//                                     </div>


//                                     <span
//                                         className="
//                                             text-xs
//                                             md:text-sm
//                                             mt-2
//                                             font-semibold
//                                             text-gray-600
//                                             text-center
//                                         "
//                                     >

//                                         {item === 1 &&
//                                             (t("personal") ||
//                                                 "Personal")}

//                                         {item === 2 &&
//                                             (t("location") ||
//                                                 "Location")}

//                                         {item === 3 &&
//                                             (t("farm") ||
//                                                 "Farm")}

//                                         {item === 4 &&
//                                             (t("crops") ||
//                                                 "Crops")}

//                                     </span>

//                                 </div>

//                             )
//                         )}

//                     </div>


//                     <div
//                         className="
//                             mt-5
//                             h-1.5
//                             rounded-full
//                             bg-gray-100
//                             overflow-hidden
//                         "
//                     >

//                         <motion.div

//                             animate={{
//                                 width:
//                                     `${step * 25}%`
//                             }}

//                             transition={{
//                                 duration: 0.3
//                             }}

//                             className="
//                                 bg-[#087443]
//                                 h-full
//                                 rounded-full
//                             "
//                         />

//                     </div>

//                 </div>


//                 {/* =================================================
//                    FORM CONTENT
//                 ================================================= */}

//                 <div
//                     className="
//                         px-7
//                         md:px-10
//                         py-8
//                     "
//                 >

//                     {/* =================================================
//                        STEP 1 — PERSONAL
//                     ================================================= */}

//                     {step === 1 && (

//                         <motion.div

//                             initial={{
//                                 opacity: 0,
//                                 x: 20
//                             }}

//                             animate={{
//                                 opacity: 1,
//                                 x: 0
//                             }}

//                             className="space-y-7"
//                         >

//                             <div>

//                                 <h2
//                                     className="
//                                         text-2xl
//                                         md:text-3xl
//                                         font-bold
//                                         text-[#172c25]
//                                     "
//                                 >
//                                     {t("personal_information") ||
//                                         "Personal Information"}
//                                 </h2>

//                                 <p
//                                     className="
//                                         text-gray-500
//                                         mt-2
//                                     "
//                                 >
//                                     {t("tell_about_yourself") ||
//                                         "Tell us a little about yourself."}
//                                 </p>

//                             </div>


//                             <div
//                                 className="
//                                     grid
//                                     md:grid-cols-2
//                                     gap-5
//                                 "
//                             >

//                                 {/* FULL NAME */}

//                                 <div>

//                                     <label
//                                         className={`
//                                             ${labelClass}
//                                             flex
//                                             items-center
//                                             gap-2
//                                         `}
//                                     >

//                                         <User
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("full_name") ||
//                                             "Full Name"}

//                                         <span className="text-red-500">
//                                             *
//                                         </span>

//                                     </label>

//                                     <input
//                                         type="text"
//                                         name="fullName"
//                                         value={
//                                             profile.fullName
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder={
//                                             t("enter_full_name") ||
//                                             "Enter your full name"
//                                         }
//                                         className={inputClass}
//                                     />

//                                 </div>


//                                 {/* MOBILE */}

//                                 <div>

//                                     <label
//                                         className={`
//                                             ${labelClass}
//                                             flex
//                                             items-center
//                                             gap-2
//                                         `}
//                                     >

//                                         <Phone
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("mobile_number") ||
//                                             "Mobile Number"}

//                                         <span className="text-red-500">
//                                             *
//                                         </span>

//                                     </label>

//                                     <input
//                                         type="tel"
//                                         name="mobile"
//                                         value={
//                                             profile.mobile
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="9876543210"
//                                         maxLength={10}
//                                         className={inputClass}
//                                     />

//                                 </div>


//                                 {/* GENDER */}

//                                 <div>

//                                     <label
//                                         className={labelClass}
//                                     >
//                                         {t("gender") ||
//                                             "Gender"}
//                                     </label>

//                                     <select
//                                         name="gender"
//                                         value={
//                                             profile.gender
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className={inputClass}
//                                     >

//                                         <option value="">
//                                             {t("select_gender") ||
//                                                 "Select Gender"}
//                                         </option>

//                                         <option value="Male">
//                                             {t("male") ||
//                                                 "Male"}
//                                         </option>

//                                         <option value="Female">
//                                             {t("female") ||
//                                                 "Female"}
//                                         </option>

//                                         <option value="Other">
//                                             {t("other") ||
//                                                 "Other"}
//                                         </option>

//                                     </select>

//                                 </div>


//                                 {/* AGE */}

//                                 <div>

//                                     <label
//                                         className={`
//                                             ${labelClass}
//                                             flex
//                                             items-center
//                                             gap-2
//                                         `}
//                                     >

//                                         <Calendar
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("age") ||
//                                             "Age"}

//                                     </label>

//                                     <input
//                                         type="number"
//                                         name="age"
//                                         min="1"
//                                         max="120"
//                                         value={
//                                             profile.age
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="35"
//                                         className={inputClass}
//                                     />

//                                 </div>

//                             </div>


//                             <div
//                                 className="
//                                     bg-[#f2f8f4]
//                                     rounded-2xl
//                                     p-5
//                                     border
//                                     border-[#dceee3]
//                                 "
//                             >

//                                 <div
//                                     className="
//                                         flex
//                                         items-center
//                                         gap-4
//                                     "
//                                 >

//                                     <div
//                                         className="
//                                             w-12
//                                             h-12
//                                             rounded-xl
//                                             bg-white
//                                             border
//                                             border-[#dceee3]
//                                             flex
//                                             items-center
//                                             justify-center
//                                             text-[#087443]
//                                         "
//                                     >
//                                         <User size={23} />
//                                     </div>

//                                     <div>

//                                         <h3
//                                             className="
//                                                 font-bold
//                                                 text-gray-800
//                                             "
//                                         >
//                                             {t("farmxpert_identity") ||
//                                                 "Your FarmXpert Profile"}
//                                         </h3>

//                                         <p
//                                             className="
//                                                 text-sm
//                                                 text-gray-500
//                                                 mt-1
//                                             "
//                                         >
//                                             {t("identity_description") ||
//                                                 "This information helps personalize your farming experience."}
//                                         </p>

//                                     </div>

//                                 </div>

//                             </div>

//                         </motion.div>

//                     )}


//                     {/* =================================================
//                        STEP 2 — LOCATION
//                     ================================================= */}

//                     {step === 2 && (

//                         <motion.div

//                             initial={{
//                                 opacity: 0,
//                                 x: 20
//                             }}

//                             animate={{
//                                 opacity: 1,
//                                 x: 0
//                             }}

//                             className="space-y-7"
//                         >

//                             <div>

//                                 <h2
//                                     className="
//                                         text-2xl
//                                         md:text-3xl
//                                         font-bold
//                                         text-[#172c25]
//                                     "
//                                 >
//                                     {t("farm_location") ||
//                                         "Farm Location"}
//                                 </h2>

//                                 <p
//                                     className="
//                                         text-gray-500
//                                         mt-2
//                                     "
//                                 >
//                                     {t("farm_location_desc") ||
//                                         "Tell us where your farm is located."}
//                                 </p>

//                             </div>


//                             <div
//                                 className="
//                                     grid
//                                     md:grid-cols-2
//                                     gap-5
//                                 "
//                             >

//                                 {/* STATE */}

//                                 <div>

//                                     <label
//                                         className={labelClass}
//                                     >
//                                         {t("state") ||
//                                             "State"}

//                                         <span className="text-red-500 ml-1">
//                                             *
//                                         </span>
//                                     </label>

//                                     <input
//                                         type="text"
//                                         name="state"
//                                         value={
//                                             profile.state
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="Andhra Pradesh"
//                                         className={inputClass}
//                                     />

//                                 </div>


//                                 {/* DISTRICT */}

//                                 <div>

//                                     <label
//                                         className={labelClass}
//                                     >
//                                         {t("district") ||
//                                             "District"}

//                                         <span className="text-red-500 ml-1">
//                                             *
//                                         </span>
//                                     </label>

//                                     <input
//                                         type="text"
//                                         name="district"
//                                         value={
//                                             profile.district
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="Kakinada"
//                                         className={inputClass}
//                                     />

//                                 </div>


//                                 {/* VILLAGE */}

//                                 <div>

//                                     <label
//                                         className={labelClass}
//                                     >
//                                         {t("village") ||
//                                             "Village"}
//                                     </label>

//                                     <input
//                                         type="text"
//                                         name="village"
//                                         value={
//                                             profile.village
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="Village"
//                                         className={inputClass}
//                                     />

//                                 </div>


//                                 {/* PINCODE */}

//                                 <div>

//                                     <label
//                                         className={labelClass}
//                                     >
//                                         {t("pin_code") ||
//                                             "PIN Code"}
//                                     </label>

//                                     <input
//                                         type="text"
//                                         name="pincode"
//                                         value={
//                                             profile.pincode
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="533001"
//                                         maxLength={6}
//                                         className={inputClass}
//                                     />

//                                 </div>

//                             </div>


//                             {/* GPS */}

//                             <div
//                                 className="
//                                     rounded-2xl
//                                     bg-[#f3f7fb]
//                                     border
//                                     border-[#dce7f1]
//                                     p-5
//                                 "
//                             >

//                                 <div
//                                     className="
//                                         flex
//                                         flex-col
//                                         md:flex-row
//                                         md:items-center
//                                         md:justify-between
//                                         gap-4
//                                     "
//                                 >

//                                     <div>

//                                         <div
//                                             className="
//                                                 flex
//                                                 items-center
//                                                 gap-2
//                                             "
//                                         >

//                                             <MapPin
//                                                 size={19}
//                                                 className="text-[#315a70]"
//                                             />

//                                             <h3
//                                                 className="
//                                                     font-bold
//                                                     text-[#345064]
//                                                 "
//                                             >
//                                                 {t("gps_location") ||
//                                                     "GPS Location"}
//                                             </h3>

//                                         </div>

//                                         <p
//                                             className="
//                                                 text-sm
//                                                 text-gray-500
//                                                 mt-1
//                                             "
//                                         >
//                                             {t("gps_description") ||
//                                                 "Use your current location to automatically detect your farm coordinates."}
//                                         </p>

//                                     </div>


//                                     <button
//                                         type="button"
//                                         onClick={
//                                             getCurrentLocation
//                                         }
//                                         disabled={loading}
//                                         className="
//                                             px-5
//                                             py-2.5
//                                             rounded-xl
//                                             bg-[#315a70]
//                                             text-white
//                                             font-semibold
//                                             text-sm
//                                             hover:bg-[#274b5d]
//                                             transition
//                                             disabled:opacity-50
//                                         "
//                                     >
//                                         {t("detect_location") ||
//                                             "Detect Location"}
//                                     </button>

//                                 </div>


//                                 {profile.latitude && (

//                                     <div
//                                         className="
//                                             mt-4
//                                             text-sm
//                                             text-gray-600
//                                             bg-white
//                                             rounded-xl
//                                             p-4
//                                             border
//                                             border-gray-100
//                                             flex
//                                             flex-wrap
//                                             gap-4
//                                         "
//                                     >

//                                         <div>
//                                             {t("latitude") ||
//                                                 "Latitude"}:

//                                             <strong className="ml-1">
//                                                 {profile.latitude}
//                                             </strong>
//                                         </div>

//                                         <div>
//                                             {t("longitude") ||
//                                                 "Longitude"}:

//                                             <strong className="ml-1">
//                                                 {profile.longitude}
//                                             </strong>
//                                         </div>

//                                     </div>

//                                 )}

//                             </div>

//                         </motion.div>

//                     )}


//                     {/* =================================================
//                        STEP 3 — FARM
//                     ================================================= */}

//                     {step === 3 && (

//                         <motion.div

//                             initial={{
//                                 opacity: 0,
//                                 x: 20
//                             }}

//                             animate={{
//                                 opacity: 1,
//                                 x: 0
//                             }}

//                             className="space-y-7"
//                         >

//                             <div>

//                                 <h2
//                                     className="
//                                         text-2xl
//                                         md:text-3xl
//                                         font-bold
//                                         text-[#172c25]
//                                     "
//                                 >
//                                     {t("farm_information") ||
//                                         "Farm Information"}
//                                 </h2>

//                                 <p
//                                     className="
//                                         text-gray-500
//                                         mt-2
//                                     "
//                                 >
//                                     {t("farm_information_desc") ||
//                                         "Tell us about your farm."}
//                                 </p>

//                             </div>


//                             <div
//                                 className="
//                                     grid
//                                     md:grid-cols-2
//                                     gap-5
//                                 "
//                             >

//                                 {/* FARM NAME */}

//                                 <div>

//                                     <label
//                                         className={`
//                                             ${labelClass}
//                                             flex
//                                             items-center
//                                             gap-2
//                                         `}
//                                     >

//                                         <Tractor
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("farm_name") ||
//                                             "Farm Name"}

//                                         <span className="text-red-500">
//                                             *
//                                         </span>

//                                     </label>

//                                     <input
//                                         type="text"
//                                         name="farmName"
//                                         value={
//                                             profile.farmName
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="Green Valley Farm"
//                                         className={inputClass}
//                                     />

//                                 </div>


//                                 {/* LAND AREA */}

//                                 <div>

//                                     <label
//                                         className={labelClass}
//                                     >
//                                         {t("total_land") ||
//                                             "Total Land"}
//                                     </label>

//                                     <input
//                                         type="number"
//                                         name="landArea"
//                                         min="0"
//                                         value={
//                                             profile.landArea
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="5"
//                                         className={inputClass}
//                                     />

//                                 </div>


//                                 {/* LAND UNIT */}

//                                 <div>

//                                     <label
//                                         className={labelClass}
//                                     >
//                                         {t("land_unit") ||
//                                             "Land Unit"}
//                                     </label>

//                                     <select
//                                         name="landUnit"
//                                         value={
//                                             profile.landUnit
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className={inputClass}
//                                     >

//                                         <option value="Acres">
//                                             {t("acres") ||
//                                                 "Acres"}
//                                         </option>

//                                         <option value="Hectares">
//                                             {t("hectares") ||
//                                                 "Hectares"}
//                                         </option>

//                                     </select>

//                                 </div>


//                                 {/* SOIL */}

//                                 <div>

//                                     <label
//                                         className={`
//                                             ${labelClass}
//                                             flex
//                                             items-center
//                                             gap-2
//                                         `}
//                                     >

//                                         <Mountain
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("soil_type") ||
//                                             "Soil Type"}

//                                     </label>

//                                     <select
//                                         name="soilType"
//                                         value={
//                                             profile.soilType
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className={inputClass}
//                                     >

//                                         <option value="">
//                                             {t("select_soil") ||
//                                                 "Select Soil"}
//                                         </option>

//                                         <option value="Black Soil">
//                                             {t("black_soil") ||
//                                                 "Black Soil"}
//                                         </option>

//                                         <option value="Red Soil">
//                                             {t("red_soil") ||
//                                                 "Red Soil"}
//                                         </option>

//                                         <option value="Clay Soil">
//                                             {t("clay_soil") ||
//                                                 "Clay Soil"}
//                                         </option>

//                                         <option value="Alluvial Soil">
//                                             {t("alluvial_soil") ||
//                                                 "Alluvial Soil"}
//                                         </option>

//                                         <option value="Laterite Soil">
//                                             {t("laterite_soil") ||
//                                                 "Laterite Soil"}
//                                         </option>

//                                         <option value="Sandy Soil">
//                                             {t("sandy_soil") ||
//                                                 "Sandy Soil"}
//                                         </option>

//                                     </select>

//                                 </div>


//                                 {/* IRRIGATION */}

//                                 <div>

//                                     <label
//                                         className={`
//                                             ${labelClass}
//                                             flex
//                                             items-center
//                                             gap-2
//                                         `}
//                                     >

//                                         <Droplets
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("irrigation_type") ||
//                                             "Irrigation Type"}

//                                     </label>

//                                     <select
//                                         name="irrigationType"
//                                         value={
//                                             profile.irrigationType
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className={inputClass}
//                                     >

//                                         <option value="">
//                                             {t("select_irrigation") ||
//                                                 "Select Irrigation"}
//                                         </option>

//                                         <option value="Drip Irrigation">
//                                             {t("drip_irrigation") ||
//                                                 "Drip Irrigation"}
//                                         </option>

//                                         <option value="Sprinkler">
//                                             {t("sprinkler") ||
//                                                 "Sprinkler"}
//                                         </option>

//                                         <option value="Canal">
//                                             {t("canal") ||
//                                                 "Canal"}
//                                         </option>

//                                         <option value="Rainfed">
//                                             {t("rainfed") ||
//                                                 "Rainfed"}
//                                         </option>

//                                         <option value="Borewell">
//                                             {t("borewell") ||
//                                                 "Borewell"}
//                                         </option>

//                                     </select>

//                                 </div>


//                                 {/* WATER SOURCE */}

//                                 <div>

//                                     <label
//                                         className={labelClass}
//                                     >
//                                         {t("water_source") ||
//                                             "Water Source"}
//                                     </label>

//                                     <select
//                                         name="waterSource"
//                                         value={
//                                             profile.waterSource
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className={inputClass}
//                                     >

//                                         <option value="">
//                                             {t("select_water_source") ||
//                                                 "Select Water Source"}
//                                         </option>

//                                         <option value="Borewell">
//                                             {t("borewell") ||
//                                                 "Borewell"}
//                                         </option>

//                                         <option value="River">
//                                             {t("river") ||
//                                                 "River"}
//                                         </option>

//                                         <option value="Canal">
//                                             {t("canal") ||
//                                                 "Canal"}
//                                         </option>

//                                         <option value="Pond">
//                                             {t("pond") ||
//                                                 "Pond"}
//                                         </option>

//                                         <option value="Rain Water">
//                                             {t("rain_water") ||
//                                                 "Rain Water"}
//                                         </option>

//                                     </select>

//                                 </div>

//                             </div>

//                         </motion.div>

//                     )}


//                     {/* =================================================
//                        STEP 4 — CROPS
//                     ================================================= */}

//                     {step === 4 && (

//                         <motion.div

//                             initial={{
//                                 opacity: 0,
//                                 x: 20
//                             }}

//                             animate={{
//                                 opacity: 1,
//                                 x: 0
//                             }}

//                             className="space-y-7"
//                         >

//                             <div>

//                                 <h2
//                                     className="
//                                         text-2xl
//                                         md:text-3xl
//                                         font-bold
//                                         text-[#172c25]
//                                     "
//                                 >
//                                     {t("crop_information") ||
//                                         "Crop Information"}
//                                 </h2>

//                                 <p
//                                     className="
//                                         text-gray-500
//                                         mt-2
//                                     "
//                                 >
//                                     {t("crop_information_desc") ||
//                                         "Tell us about the crops you grow."}
//                                 </p>

//                             </div>


//                             <div
//                                 className="
//                                     grid
//                                     md:grid-cols-2
//                                     gap-5
//                                 "
//                             >

//                                 {/* PRIMARY CROP */}

//                                 <div>

//                                     <label
//                                         className={`
//                                             ${labelClass}
//                                             flex
//                                             items-center
//                                             gap-2
//                                         `}
//                                     >

//                                         <Sprout
//                                             size={17}
//                                             className="text-[#087443]"
//                                         />

//                                         {t("primary_crop") ||
//                                             "Primary Crop"}

//                                         <span className="text-red-500">
//                                             *
//                                         </span>

//                                     </label>

//                                     <select
//                                         name="primaryCrop"
//                                         value={
//                                             profile.primaryCrop
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className={inputClass}
//                                     >

//                                         <option value="">
//                                             {t("select_crop") ||
//                                                 "Select Crop"}
//                                         </option>

//                                         <option value="Rice">
//                                             {t("rice") ||
//                                                 "Rice"}
//                                         </option>

//                                         <option value="Maize">
//                                             {t("maize") ||
//                                                 "Maize"}
//                                         </option>

//                                         <option value="Cotton">
//                                             {t("cotton") ||
//                                                 "Cotton"}
//                                         </option>

//                                         <option value="Groundnut">
//                                             {t("groundnut") ||
//                                                 "Groundnut"}
//                                         </option>

//                                         <option value="Sugarcane">
//                                             {t("sugarcane") ||
//                                                 "Sugarcane"}
//                                         </option>

//                                         <option value="Tomato">
//                                             {t("tomato") ||
//                                                 "Tomato"}
//                                         </option>

//                                         <option value="Potato">
//                                             {t("potato") ||
//                                                 "Potato"}
//                                         </option>

//                                         <option value="Chilli">
//                                             {t("chilli") ||
//                                                 "Chilli"}
//                                         </option>

//                                         <option value="Wheat">
//                                             {t("wheat") ||
//                                                 "Wheat"}
//                                         </option>

//                                     </select>

//                                 </div>


//                                 {/* SECONDARY CROP */}

//                                 <div>

//                                     <label
//                                         className={labelClass}
//                                     >
//                                         {t("secondary_crop") ||
//                                             "Secondary Crop"}
//                                     </label>

//                                     <input
//                                         type="text"
//                                         name="secondaryCrop"
//                                         value={
//                                             profile.secondaryCrop
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder={
//                                             t("optional") ||
//                                             "Optional"
//                                         }
//                                         className={inputClass}
//                                     />

//                                 </div>


//                                 {/* FARMING TYPE */}

//                                 <div>

//                                     <label
//                                         className={labelClass}
//                                     >
//                                         {t("farming_type") ||
//                                             "Farming Type"}
//                                     </label>

//                                     <select
//                                         name="farmingType"
//                                         value={
//                                             profile.farmingType
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         className={inputClass}
//                                     >

//                                         <option value="">
//                                             {t("select_farming_type") ||
//                                                 "Select Farming Type"}
//                                         </option>

//                                         <option value="Organic">
//                                             {t("organic") ||
//                                                 "Organic"}
//                                         </option>

//                                         <option value="Conventional">
//                                             {t("conventional") ||
//                                                 "Conventional"}
//                                         </option>

//                                         <option value="Mixed">
//                                             {t("mixed") ||
//                                                 "Mixed"}
//                                         </option>

//                                     </select>

//                                 </div>


//                                 {/* EXPERIENCE */}

//                                 <div>

//                                     <label
//                                         className={labelClass}
//                                     >
//                                         {t("farming_experience") ||
//                                             "Farming Experience"}
//                                     </label>

//                                     <input
//                                         type="number"
//                                         name="farmingExperience"
//                                         min="0"
//                                         value={
//                                             profile.farmingExperience
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder="10"
//                                         className={inputClass}
//                                     />

//                                 </div>


//                                 {/* LIVESTOCK */}

//                                 <div
//                                     className="
//                                         md:col-span-2
//                                     "
//                                 >

//                                     <label
//                                         className={labelClass}
//                                     >
//                                         {t("livestock") ||
//                                             "Livestock"}
//                                     </label>

//                                     <input
//                                         type="text"
//                                         name="livestock"
//                                         value={
//                                             profile.livestock
//                                         }
//                                         onChange={
//                                             handleChange
//                                         }
//                                         placeholder={
//                                             t("livestock_placeholder") ||
//                                             "Example: Cows, Buffaloes"
//                                         }
//                                         className={inputClass}
//                                     />

//                                 </div>

//                             </div>


//                             {/* COMPLETION MESSAGE */}

//                             <div
//                                 className="
//                                     bg-[#f2f8f4]
//                                     rounded-2xl
//                                     p-5
//                                     border
//                                     border-[#dceee3]
//                                 "
//                             >

//                                 <div
//                                     className="
//                                         flex
//                                         items-start
//                                         gap-3
//                                     "
//                                 >

//                                     <CheckCircle
//                                         size={22}
//                                         className="
//                                             text-[#087443]
//                                             mt-0.5
//                                             flex-shrink-0
//                                         "
//                                     />

//                                     <div>

//                                         <h3
//                                             className="
//                                                 font-bold
//                                                 text-[#087443]
//                                                 text-lg
//                                             "
//                                         >
//                                             {t("almost_done") ||
//                                                 "Almost Done"}
//                                         </h3>

//                                         <p
//                                             className="
//                                                 text-gray-600
//                                                 mt-1.5
//                                             "
//                                         >
//                                             {t("almost_done_desc") ||
//                                                 "Save your profile to personalize your FarmXpert dashboard."}
//                                         </p>

//                                     </div>

//                                 </div>

//                             </div>

//                         </motion.div>

//                     )}


//                     {/* =================================================
//                        NAVIGATION
//                     ================================================= */}

//                     <div
//                         className="
//                             mt-10
//                             pt-6
//                             border-t
//                             border-gray-100
//                         "
//                     >

//                         <div
//                             className="
//                                 flex
//                                 flex-col
//                                 sm:flex-row
//                                 sm:items-center
//                                 sm:justify-between
//                                 gap-4
//                             "
//                         >

//                             {/* LEFT */}

//                             <div
//                                 className="
//                                     flex
//                                     items-center
//                                     gap-3
//                                 "
//                             >

//                                 {/* PREVIOUS */}

//                                 {step > 1 ? (

//                                     <button
//                                         type="button"
//                                         onClick={
//                                             previousStep
//                                         }
//                                         disabled={loading}
//                                         className="
//                                             h-11
//                                             px-5
//                                             rounded-xl
//                                             border
//                                             border-gray-200
//                                             bg-white
//                                             text-gray-700
//                                             font-semibold
//                                             flex
//                                             items-center
//                                             gap-2
//                                             hover:bg-gray-50
//                                             transition
//                                             disabled:opacity-50
//                                         "
//                                     >

//                                         <ArrowLeft
//                                             size={17}
//                                         />

//                                         {t("previous") ||
//                                             "Previous"}

//                                     </button>

//                                 ) : (

//                                     <div />

//                                 )}


//                                 {/* SKIP */}

//                                 <button
//                                     type="button"
//                                     onClick={
//                                         skipProfile
//                                     }
//                                     disabled={loading}
//                                     className="
//                                         h-11
//                                         px-5
//                                         rounded-xl
//                                         text-gray-500
//                                         font-medium
//                                         hover:text-[#087443]
//                                         hover:bg-[#f3f7f5]
//                                         transition
//                                         disabled:opacity-50
//                                     "
//                                 >
//                                     {t("skip_for_now") ||
//                                         "Skip for now"}
//                                 </button>

//                             </div>


//                             {/* RIGHT */}

//                             {step < totalSteps ? (

//                                 <button
//                                     type="button"
//                                     onClick={
//                                         nextStep
//                                     }
//                                     disabled={loading}
//                                     className="
//                                         h-11
//                                         px-6
//                                         rounded-xl
//                                         bg-[#087443]
//                                         text-white
//                                         font-semibold
//                                         flex
//                                         items-center
//                                         justify-center
//                                         gap-2
//                                         shadow-[0_5px_15px_rgba(8,116,67,0.18)]
//                                         hover:bg-[#076538]
//                                         hover:-translate-y-0.5
//                                         transition-all
//                                         disabled:opacity-50
//                                     "
//                                 >

//                                     {t("next") ||
//                                         "Next"}

//                                     <ArrowRight
//                                         size={18}
//                                     />

//                                 </button>

//                             ) : (

//                                 <button
//                                     type="button"
//                                     onClick={
//                                         saveProfile
//                                     }
//                                     disabled={
//                                         loading
//                                     }
//                                     className="
//                                         h-11
//                                         px-6
//                                         rounded-xl
//                                         bg-[#087443]
//                                         text-white
//                                         font-semibold
//                                         flex
//                                         items-center
//                                         justify-center
//                                         gap-2
//                                         shadow-[0_5px_15px_rgba(8,116,67,0.18)]
//                                         hover:bg-[#076538]
//                                         hover:-translate-y-0.5
//                                         transition-all
//                                         disabled:opacity-60
//                                         disabled:cursor-not-allowed
//                                     "
//                                 >

//                                     {loading ? (

//                                         <>

//                                             <Loader2
//                                                 size={18}
//                                                 className="
//                                                     animate-spin
//                                                 "
//                                             />

//                                             {t("saving") ||
//                                                 "Saving..."}

//                                         </>

//                                     ) : (

//                                         <>

//                                             {t("save_profile") ||
//                                                 "Save Profile"}

//                                             <CheckCircle
//                                                 size={18}
//                                             />

//                                         </>

//                                     )}

//                                 </button>

//                             )}

//                         </div>

//                     </div>


//                     {/* =================================================
//                        FOOTER
//                     ================================================= */}

//                     <div
//                         className="
//                             mt-7
//                             text-center
//                         "
//                     >

//                         <p
//                             className="
//                                 text-xs
//                                 md:text-sm
//                                 text-gray-400
//                             "
//                         >
//                             {t("profile_footer") ||
//                                 "You can update these details anytime from My Profile."}
//                         </p>

//                     </div>

//                 </div>

//             </motion.div>

//         </div>

//     );

// }


















import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
    User,
    Phone,
    Tractor,
    Sprout,
    Mountain,
    Droplets,
    Calendar,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    Loader2,
    Globe,
    MapPin
} from "lucide-react";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import api from "../api";

export default function FarmerProfile() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [step, setStep] = useState(1);

    const totalSteps = 4;

    const [profile, setProfile] = useState({
        fullName: "",
        mobile: "",
        gender: "",
        age: "",

        state: "",
        district: "",
        village: "",
        pincode: "",

        latitude: "",
        longitude: "",

        farmName: "",
        landArea: "",
        landUnit: "Acres",

        soilType: "",
        irrigationType: "",
        waterSource: "",

        primaryCrop: "",
        secondaryCrop: "",

        farmingType: "",
        farmingExperience: "",

        livestock: "",
        language: "en"
    });

    /* =========================================================
       LANGUAGE CHANGE REFRESH
    ========================================================= */

    const [, setLanguageVersion] = useState(0);

    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguageVersion((previous) => previous + 1);
        };

        i18n.on("languageChanged", handleLanguageChange);

        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, [i18n]);

    /* =========================================================
       CHECK EXISTING PROFILE
    ========================================================= */

    useEffect(() => {
        checkExistingProfile();
    }, []);

    const checkExistingProfile = async () => {
        try {
            setIsLoadingProfile(true);

            const response = await api.get("/farmer/check");

            console.log("Profile check:", response.data);

            /* PROFILE ALREADY COMPLETED */

            if (
                response.data.exists === true &&
                response.data.isComplete === true
            ) {
                navigate("/dashboard");
                return;
            }

            /* PROFILE EXISTS BUT IS INCOMPLETE */

            if (
                response.data.exists === true &&
                response.data.isComplete === false
            ) {
                const existingProfile =
                    response.data.profile || {};

                setProfile((previous) => ({
                    ...previous,
                    ...existingProfile
                }));

                /* Restore saved language */

                if (existingProfile.language) {
                    const savedLanguage =
                        existingProfile.language;

                    if (
                        savedLanguage !== i18n.language
                    ) {
                        await i18n.changeLanguage(
                            savedLanguage
                        );
                    }
                }
            }
        } catch (error) {
            console.error(
                "Error checking profile:",
                error
            );
        } finally {
            setIsLoadingProfile(false);
        }
    };

    /* =========================================================
       LANGUAGE SELECTOR
    ========================================================= */

    const handleLanguageChange = async (e) => {
        const selectedLanguage = e.target.value;

        try {
            await i18n.changeLanguage(
                selectedLanguage
            );

            setProfile((previous) => ({
                ...previous,
                language: selectedLanguage
            }));
        } catch (error) {
            console.error(
                "Language change error:",
                error
            );

            toast.error(
                "Unable to change language."
            );
        }
    };

    /* =========================================================
       INPUT CHANGE
    ========================================================= */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    /* =========================================================
       CURRENT LOCATION
    ========================================================= */

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error(
                t("location_not_supported") ||
                    "Location is not supported by your browser."
            );

            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setProfile((previous) => ({
                    ...previous,
                    latitude:
                        position.coords.latitude,
                    longitude:
                        position.coords.longitude
                }));

                toast.success(
                    t("location_detected") ||
                        "Location detected successfully."
                );
            },
            (error) => {
                console.error(
                    "Location error:",
                    error
                );

                toast.error(
                    t("location_detection_failed") ||
                        "Unable to detect your location."
                );
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    /* =========================================================
       NEXT STEP
    ========================================================= */

    const nextStep = () => {
        if (step < totalSteps) {
            setStep(
                (previous) => previous + 1
            );
        }
    };

    /* =========================================================
       PREVIOUS STEP
    ========================================================= */

    const previousStep = () => {
        if (step > 1) {
            setStep(
                (previous) => previous - 1
            );
        }
    };

    /* =========================================================
       SKIP PROFILE
    ========================================================= */

    const skipProfile = async () => {
        try {
            setLoading(true);

            const response =
                await api.post("/farmer/skip");

            console.log(
                "Skip profile response:",
                response.data
            );

            toast.success(
                t("profile_skipped") ||
                    "Profile skipped. You can complete it later."
            );

            navigate("/dashboard", {
                state: {
                    startGuidedTour: true
                }
            });
        } catch (error) {
            console.error(
                "Skip profile error:",
                error
            );

            toast.error(
                error.response?.data?.error ||
                    error.response?.data?.message ||
                    "Unable to skip profile."
            );
        } finally {
            setLoading(false);
        }
    };

    /* =========================================================
       SAVE PROFILE
    ========================================================= */

    const saveProfile = async () => {
        try {
            setLoading(true);

            const requiredFields = [
                "fullName",
                "mobile",
                "state",
                "district",
                "farmName",
                "primaryCrop"
            ];

            const missingFields =
                requiredFields.filter(
                    (field) => {
                        const value =
                            profile[field];

                        return (
                            !value ||
                            String(value).trim() === ""
                        );
                    }
                );

            /* VALIDATION */

            if (missingFields.length > 0) {
                toast.error(
                    t(
                        "please_fill_all_required_fields"
                    ) ||
                        "Please fill all required fields."
                );

                const stepMap = {
                    fullName: 1,
                    mobile: 1,
                    state: 2,
                    district: 2,
                    farmName: 3,
                    primaryCrop: 4
                };

                const firstMissingStep =
                    stepMap[
                        missingFields[0]
                    ] || 1;

                setStep(firstMissingStep);

                setLoading(false);

                return;
            }

            /* PROFILE DATA */

            const profileData = {
                ...profile,
                language:
                    i18n.language
            };

            /* SAVE TO MONGODB */

            const response =
                await api.post(
                    "/farmer",
                    profileData
                );

            console.log(
                "Profile save response:",
                response.data
            );

            toast.success(
                t("profile_saved") ||
                    "Profile saved successfully."
            );

            /* START GUIDED TOUR AFTER PROFILE */

            navigate("/dashboard", {
                state: {
                    startGuidedTour: true
                }
            });
        } catch (error) {
            console.error(
                "Save profile error:",
                error
            );

            toast.error(
                error.response?.data?.error ||
                    error.response?.data?.message ||
                    t("profile_save_failed") ||
                    "Failed to save profile."
            );
        } finally {
            setLoading(false);
        }
    };

    /* =========================================================
       LOADING SCREEN
    ========================================================= */

    if (isLoadingProfile) {
        return (
            <div
                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-[#f5f8f6]
                "
            >
                <div className="text-center">
                    <Loader2
                        className="
                            animate-spin
                            h-12
                            w-12
                            text-[#087443]
                            mx-auto
                        "
                    />

                    <p
                        className="
                            mt-4
                            text-gray-600
                            font-medium
                        "
                    >
                        {t("loading_profile") ||
                            "Loading profile..."}
                    </p>
                </div>
            </div>
        );
    }

    /* =========================================================
       COMMON CLASSES
    ========================================================= */

    const inputClass = `
        w-full
        p-3.5
        rounded-xl
        border
        border-gray-200
        bg-gray-50/60
        text-gray-800
        outline-none
        transition
        focus:bg-white
        focus:border-[#087443]
        focus:ring-2
        focus:ring-[#087443]/10
    `;

    const labelClass = `
        text-sm
        font-semibold
        text-gray-700
        mb-2
        block
    `;

    /* =========================================================
       MAIN UI
    ========================================================= */

    return (
        <div
            className="
                min-h-screen
                bg-[#f5f8f6]
                flex
                items-center
                justify-center
                py-10
                px-5
            "
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.45
                }}
                className="
                    w-full
                    max-w-5xl
                    bg-white
                    rounded-3xl
                    shadow-[0_20px_60px_rgba(15,61,42,0.10)]
                    border
                    border-gray-100
                    overflow-hidden
                "
            >
                {/* =================================================
                   HEADER
                ================================================= */}

                <div
                    className="
                        bg-gradient-to-r
                        from-[#075d39]
                        to-[#0b8048]
                        text-white
                        px-8
                        py-8
                        md:px-10
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            md:justify-between
                            gap-5
                        "
                    >
                        <div>
                            <h1
                                className="
                                    text-3xl
                                    md:text-4xl
                                    font-bold
                                    tracking-tight
                                "
                            >
                                {t("profile_title") ||
                                    "Complete Farmer Profile"}
                            </h1>

                            <p
                                className="
                                    mt-2
                                    text-green-50
                                    text-base
                                    md:text-lg
                                "
                            >
                                {t("profile_subtitle") ||
                                    "Help us personalize FarmXpert for your farm."}
                            </p>
                        </div>

                        {/* =================================================
                           LANGUAGE SELECTOR
                        ================================================= */}

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-green-50
                                text-sm
                            "
                        >
                            <Globe size={18} />

                            <label
                                htmlFor="profile-language"
                                className="
                                    whitespace-nowrap
                                "
                            >
                                {t(
                                    "select_language",
                                    "Language"
                                )}
                            </label>

                            <select
                                id="profile-language"
                                value={
                                    i18n.language?.startsWith(
                                        "te"
                                    )
                                        ? "te"
                                        : i18n.language?.startsWith(
                                              "hi"
                                          )
                                        ? "hi"
                                        : "en"
                                }
                                onChange={
                                    handleLanguageChange
                                }
                                className="
                                    min-w-[125px]
                                    px-3
                                    py-2
                                    rounded-xl
                                    bg-white
                                    text-gray-800
                                    border
                                    border-white/20
                                    outline-none
                                    font-medium
                                    cursor-pointer
                                    shadow-sm
                                    focus:ring-2
                                    focus:ring-white/30
                                "
                            >
                                <option value="en">
                                    {t(
                                        "english",
                                        "English"
                                    )}
                                </option>

                                <option value="te">
                                    {t(
                                        "telugu",
                                        "Telugu"
                                    )}
                                </option>

                                <option value="hi">
                                    {t(
                                        "hindi",
                                        "Hindi"
                                    )}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* =================================================
                   PROGRESS
                ================================================= */}

                <div
                    className="
                        px-7
                        md:px-10
                        pt-8
                    "
                >
                    <div
                        className="
                            flex
                            justify-between
                            gap-2
                        "
                    >
                        {[1, 2, 3, 4].map(
                            (item) => (
                                <div
                                    key={item}
                                    className="
                                        flex
                                        flex-col
                                        items-center
                                        flex-1
                                    "
                                >
                                    <div
                                        className={`
                                            w-11
                                            h-11
                                            md:w-12
                                            md:h-12
                                            rounded-full
                                            flex
                                            items-center
                                            justify-center
                                            font-bold
                                            transition-all
                                            duration-300
                                            ${
                                                step >=
                                                item
                                                    ? "bg-[#087443] text-white shadow-md"
                                                    : "bg-gray-100 text-gray-400"
                                            }
                                        `}
                                    >
                                        {step > item ? (
                                            <CheckCircle
                                                size={20}
                                            />
                                        ) : (
                                            item
                                        )}
                                    </div>

                                    <span
                                        className="
                                            text-xs
                                            md:text-sm
                                            mt-2
                                            font-semibold
                                            text-gray-600
                                            text-center
                                        "
                                    >
                                        {item === 1 &&
                                            (t(
                                                "personal"
                                            ) ||
                                                "Personal")}

                                        {item === 2 &&
                                            (t(
                                                "location"
                                            ) ||
                                                "Location")}

                                        {item === 3 &&
                                            (t("farm") ||
                                                "Farm")}

                                        {item === 4 &&
                                            (t(
                                                "crops"
                                            ) ||
                                                "Crops")}
                                    </span>
                                </div>
                            )
                        )}
                    </div>

                    <div
                        className="
                            mt-5
                            h-1.5
                            rounded-full
                            bg-gray-100
                            overflow-hidden
                        "
                    >
                        <motion.div
                            animate={{
                                width: `${step * 25}%`
                            }}
                            transition={{
                                duration: 0.3
                            }}
                            className="
                                bg-[#087443]
                                h-full
                                rounded-full
                            "
                        />
                    </div>
                </div>

                {/* =================================================
                   FORM CONTENT
                ================================================= */}

                <div
                    className="
                        px-7
                        md:px-10
                        py-8
                    "
                >
                    {/* =================================================
                       STEP 1 — PERSONAL
                    ================================================= */}

                    {step === 1 && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 20
                            }}
                            animate={{
                                opacity: 1,
                                x: 0
                            }}
                            className="space-y-7"
                        >
                            <div>
                                <h2
                                    className="
                                        text-2xl
                                        md:text-3xl
                                        font-bold
                                        text-[#172c25]
                                    "
                                >
                                    {t(
                                        "personal_information"
                                    ) ||
                                        "Personal Information"}
                                </h2>

                                <p
                                    className="
                                        text-gray-500
                                        mt-2
                                    "
                                >
                                    {t(
                                        "tell_about_yourself"
                                    ) ||
                                        "Tell us a little about yourself."}
                                </p>
                            </div>

                            <div
                                className="
                                    grid
                                    md:grid-cols-2
                                    gap-5
                                "
                            >
                                {/* FULL NAME */}

                                <div>
                                    <label
                                        className={`
                                            ${labelClass}
                                            flex
                                            items-center
                                            gap-2
                                        `}
                                    >
                                        <User
                                            size={17}
                                            className="text-[#087443]"
                                        />

                                        {t(
                                            "full_name"
                                        ) ||
                                            "Full Name"}

                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        value={
                                            profile.fullName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder={
                                            t(
                                                "enter_full_name"
                                            ) ||
                                            "Enter your full name"
                                        }
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>

                                {/* MOBILE */}

                                <div>
                                    <label
                                        className={`
                                            ${labelClass}
                                            flex
                                            items-center
                                            gap-2
                                        `}
                                    >
                                        <Phone
                                            size={17}
                                            className="text-[#087443]"
                                        />

                                        {t(
                                            "mobile_number"
                                        ) ||
                                            "Mobile Number"}

                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={
                                            profile.mobile
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="9876543210"
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>

                                {/* GENDER */}

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        {t("gender") ||
                                            "Gender"}
                                    </label>

                                    <select
                                        name="gender"
                                        value={
                                            profile.gender
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={
                                            inputClass
                                        }
                                    >
                                        <option value="">
                                            {t(
                                                "select_gender"
                                            ) ||
                                                "Select Gender"}
                                        </option>

                                        <option value="Male">
                                            {t("male") ||
                                                "Male"}
                                        </option>

                                        <option value="Female">
                                            {t("female") ||
                                                "Female"}
                                        </option>

                                        <option value="Other">
                                            {t("other") ||
                                                "Other"}
                                        </option>
                                    </select>
                                </div>

                                {/* AGE */}

                                <div>
                                    <label
                                        className={`
                                            ${labelClass}
                                            flex
                                            items-center
                                            gap-2
                                        `}
                                    >
                                        <Calendar
                                            size={17}
                                            className="text-[#087443]"
                                        />

                                        {t("age") ||
                                            "Age"}
                                    </label>

                                    <input
                                        type="number"
                                        name="age"
                                        value={
                                            profile.age
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="35"
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>
                            </div>

                            {/* IDENTITY CARD */}

                            <div
                                className="
                                    p-5
                                    rounded-2xl
                                    bg-[#f1f8f4]
                                    border
                                    border-[#d8eee1]
                                    flex
                                    items-start
                                    gap-4
                                "
                            >
                                <div
                                    className="
                                        w-12
                                        h-12
                                        rounded-xl
                                        bg-white
                                        border
                                        border-[#d8eee1]
                                        flex
                                        items-center
                                        justify-center
                                        shrink-0
                                    "
                                >
                                    <User
                                        size={22}
                                        className="text-[#087443]"
                                    />
                                </div>

                                <div>
                                    <h3
                                        className="
                                            font-bold
                                            text-gray-800
                                        "
                                    >
                                        {t(
                                            "farmxpert_identity"
                                        ) ||
                                            "Your FarmXpert Profile"}
                                    </h3>

                                    <p
                                        className="
                                            text-sm
                                            text-gray-500
                                            mt-1
                                        "
                                    >
                                        {t(
                                            "identity_description"
                                        ) ||
                                            "This information helps personalize your farming experience."}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* =================================================
                       STEP 2 — LOCATION
                    ================================================= */}

                    {step === 2 && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 20
                            }}
                            animate={{
                                opacity: 1,
                                x: 0
                            }}
                            className="space-y-7"
                        >
                            <div>
                                <h2
                                    className="
                                        text-2xl
                                        md:text-3xl
                                        font-bold
                                        text-[#172c25]
                                    "
                                >
                                    {t(
                                        "farm_location"
                                    ) ||
                                        "Farm Location"}
                                </h2>

                                <p
                                    className="
                                        text-gray-500
                                        mt-2
                                    "
                                >
                                    {t(
                                        "farm_location_desc"
                                    ) ||
                                        "Tell us where your farm is located."}
                                </p>
                            </div>

                            <div
                                className="
                                    grid
                                    md:grid-cols-2
                                    gap-5
                                "
                            >
                                {/* STATE */}

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        {t("state") ||
                                            "State"}

                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        value={
                                            profile.state
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Andhra Pradesh"
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>

                                {/* DISTRICT */}

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        {t(
                                            "district"
                                        ) ||
                                            "District"}

                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="district"
                                        value={
                                            profile.district
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Kakinada"
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>

                                {/* VILLAGE */}

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        {t(
                                            "village"
                                        ) ||
                                            "Village"}
                                    </label>

                                    <input
                                        type="text"
                                        name="village"
                                        value={
                                            profile.village
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder={
                                            t(
                                                "village"
                                            ) ||
                                            "Village"
                                        }
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>

                                {/* PIN CODE */}

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        {t(
                                            "pin_code"
                                        ) ||
                                            "PIN Code"}
                                    </label>

                                    <input
                                        type="text"
                                        name="pincode"
                                        value={
                                            profile.pincode
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="533001"
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>
                            </div>

                            {/* GPS LOCATION */}

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    bg-[#f7faf8]
                                    p-5
                                "
                            >
                                <div
                                    className="
                                        flex
                                        flex-col
                                        md:flex-row
                                        md:items-center
                                        md:justify-between
                                        gap-5
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            items-start
                                            gap-4
                                        "
                                    >
                                        <div
                                            className="
                                                w-12
                                                h-12
                                                rounded-xl
                                                bg-white
                                                border
                                                border-gray-200
                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >
                                            <MapPin
                                                size={22}
                                                className="text-[#345064]"
                                            />
                                        </div>

                                        <div>
                                            <h3
                                                className="
                                                    font-bold
                                                    text-[#345064]
                                                "
                                            >
                                                {t(
                                                    "gps_location"
                                                ) ||
                                                    "GPS Location"}
                                            </h3>

                                            <p
                                                className="
                                                    text-sm
                                                    text-gray-500
                                                    mt-1
                                                    max-w-xl
                                                "
                                            >
                                                {t(
                                                    "gps_description"
                                                ) ||
                                                    "Use your current location to automatically detect your farm coordinates."}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={
                                            getCurrentLocation
                                        }
                                        disabled={
                                            loading
                                        }
                                        className="
                                            h-11
                                            px-5
                                            rounded-xl
                                            bg-[#345064]
                                            text-white
                                            font-semibold
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            hover:bg-[#274b5d]
                                            transition
                                            disabled:opacity-50
                                        "
                                    >
                                        <MapPin
                                            size={17}
                                        />

                                        {t(
                                            "detect_location"
                                        ) ||
                                            "Detect Location"}
                                    </button>
                                </div>

                                {(profile.latitude ||
                                    profile.longitude) && (
                                    <div
                                        className="
                                            mt-5
                                            pt-4
                                            border-t
                                            border-gray-200
                                            grid
                                            md:grid-cols-2
                                            gap-3
                                            text-sm
                                            text-gray-600
                                        "
                                    >
                                        <div>
                                            {t(
                                                "latitude"
                                            ) ||
                                                "Latitude"}
                                            :

                                            <strong className="ml-1">
                                                {
                                                    profile.latitude
                                                }
                                            </strong>
                                        </div>

                                        <div>
                                            {t(
                                                "longitude"
                                            ) ||
                                                "Longitude"}
                                            :

                                            <strong className="ml-1">
                                                {
                                                    profile.longitude
                                                }
                                            </strong>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* =================================================
                       STEP 3 — FARM
                    ================================================= */}

                    {step === 3 && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 20
                            }}
                            animate={{
                                opacity: 1,
                                x: 0
                            }}
                            className="space-y-7"
                        >
                            <div>
                                <h2
                                    className="
                                        text-2xl
                                        md:text-3xl
                                        font-bold
                                        text-[#172c25]
                                    "
                                >
                                    {t(
                                        "farm_information"
                                    ) ||
                                        "Farm Information"}
                                </h2>

                                <p
                                    className="
                                        text-gray-500
                                        mt-2
                                    "
                                >
                                    {t(
                                        "farm_information_desc"
                                    ) ||
                                        "Tell us about your farm."}
                                </p>
                            </div>

                            <div
                                className="
                                    grid
                                    md:grid-cols-2
                                    gap-5
                                "
                            >
                                {/* FARM NAME */}

                                <div>
                                    <label
                                        className={`
                                            ${labelClass}
                                            flex
                                            items-center
                                            gap-2
                                        `}
                                    >
                                        <Tractor
                                            size={17}
                                            className="text-[#087443]"
                                        />

                                        {t(
                                            "farm_name"
                                        ) ||
                                            "Farm Name"}

                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="farmName"
                                        value={
                                            profile.farmName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="My Farm"
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>

                                {/* TOTAL LAND */}

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        {t(
                                            "total_land"
                                        ) ||
                                            "Total Land"}
                                    </label>

                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            name="landArea"
                                            value={
                                                profile.landArea
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="5"
                                            min="0"
                                            step="0.01"
                                            className={
                                                inputClass
                                            }
                                        />

                                        <select
                                            name="landUnit"
                                            value={
                                                profile.landUnit
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className={`
                                                ${inputClass}
                                                max-w-[145px]
                                            `}
                                        >
                                            <option value="Acres">
                                                {t(
                                                    "acres"
                                                ) ||
                                                    "Acres"}
                                            </option>

                                            <option value="Hectares">
                                                {t(
                                                    "hectares"
                                                ) ||
                                                    "Hectares"}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                {/* SOIL TYPE */}

                                <div>
                                    <label
                                        className={`
                                            ${labelClass}
                                            flex
                                            items-center
                                            gap-2
                                        `}
                                    >
                                        <Mountain
                                            size={17}
                                            className="text-[#087443]"
                                        />

                                        {t(
                                            "soil_type"
                                        ) ||
                                            "Soil Type"}
                                    </label>

                                    <select
                                        name="soilType"
                                        value={
                                            profile.soilType
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={
                                            inputClass
                                        }
                                    >
                                        <option value="">
                                            {t(
                                                "select_soil"
                                            ) ||
                                                "Select Soil"}
                                        </option>

                                        <option value="Black Soil">
                                            {t(
                                                "black_soil"
                                            ) ||
                                                "Black Soil"}
                                        </option>

                                        <option value="Red Soil">
                                            {t(
                                                "red_soil"
                                            ) ||
                                                "Red Soil"}
                                        </option>

                                        <option value="Clay Soil">
                                            {t(
                                                "clay_soil"
                                            ) ||
                                                "Clay Soil"}
                                        </option>

                                        <option value="Alluvial Soil">
                                            {t(
                                                "alluvial_soil"
                                            ) ||
                                                "Alluvial Soil"}
                                        </option>

                                        <option value="Laterite Soil">
                                            {t(
                                                "laterite_soil"
                                            ) ||
                                                "Laterite Soil"}
                                        </option>

                                        <option value="Sandy Soil">
                                            {t(
                                                "sandy_soil"
                                            ) ||
                                                "Sandy Soil"}
                                        </option>
                                    </select>
                                </div>

                                {/* IRRIGATION */}

                                <div>
                                    <label
                                        className={`
                                            ${labelClass}
                                            flex
                                            items-center
                                            gap-2
                                        `}
                                    >
                                        <Droplets
                                            size={17}
                                            className="text-[#087443]"
                                        />

                                        {t(
                                            "irrigation_type"
                                        ) ||
                                            "Irrigation Type"}
                                    </label>

                                    <select
                                        name="irrigationType"
                                        value={
                                            profile.irrigationType
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={
                                            inputClass
                                        }
                                    >
                                        <option value="">
                                            {t(
                                                "select_irrigation"
                                            ) ||
                                                "Select Irrigation"}
                                        </option>

                                        <option value="Drip Irrigation">
                                            {t(
                                                "drip_irrigation"
                                            ) ||
                                                "Drip Irrigation"}
                                        </option>

                                        <option value="Sprinkler">
                                            {t(
                                                "sprinkler"
                                            ) ||
                                                "Sprinkler"}
                                        </option>

                                        <option value="Canal">
                                            {t("canal") ||
                                                "Canal"}
                                        </option>

                                        <option value="Rainfed">
                                            {t(
                                                "rainfed"
                                            ) ||
                                                "Rainfed"}
                                        </option>

                                        <option value="Borewell">
                                            {t(
                                                "borewell"
                                            ) ||
                                                "Borewell"}
                                        </option>
                                    </select>
                                </div>

                                {/* WATER SOURCE */}

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        {t(
                                            "water_source"
                                        ) ||
                                            "Water Source"}
                                    </label>

                                    <select
                                        name="waterSource"
                                        value={
                                            profile.waterSource
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={
                                            inputClass
                                        }
                                    >
                                        <option value="">
                                            {t(
                                                "select_water_source"
                                            ) ||
                                                "Select Water Source"}
                                        </option>

                                        <option value="Borewell">
                                            {t(
                                                "borewell"
                                            ) ||
                                                "Borewell"}
                                        </option>

                                        <option value="River">
                                            {t("river") ||
                                                "River"}
                                        </option>

                                        <option value="Canal">
                                            {t("canal") ||
                                                "Canal"}
                                        </option>

                                        <option value="Pond">
                                            {t("pond") ||
                                                "Pond"}
                                        </option>

                                        <option value="Rain Water">
                                            {t(
                                                "rain_water"
                                            ) ||
                                                "Rain Water"}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* =================================================
                       STEP 4 — CROPS
                    ================================================= */}

                    {step === 4 && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 20
                            }}
                            animate={{
                                opacity: 1,
                                x: 0
                            }}
                            className="space-y-7"
                        >
                            <div>
                                <h2
                                    className="
                                        text-2xl
                                        md:text-3xl
                                        font-bold
                                        text-[#172c25]
                                    "
                                >
                                    {t(
                                        "crop_information"
                                    ) ||
                                        "Crop Information"}
                                </h2>

                                <p
                                    className="
                                        text-gray-500
                                        mt-2
                                    "
                                >
                                    {t(
                                        "crop_information_desc"
                                    ) ||
                                        "Tell us about the crops you grow."}
                                </p>
                            </div>

                            <div
                                className="
                                    grid
                                    md:grid-cols-2
                                    gap-5
                                "
                            >
                                {/* PRIMARY CROP */}

                                <div>
                                    <label
                                        className={`
                                            ${labelClass}
                                            flex
                                            items-center
                                            gap-2
                                        `}
                                    >
                                        <Sprout
                                            size={17}
                                            className="text-[#087443]"
                                        />

                                        {t(
                                            "primary_crop"
                                        ) ||
                                            "Primary Crop"}

                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <select
                                        name="primaryCrop"
                                        value={
                                            profile.primaryCrop
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={
                                            inputClass
                                        }
                                    >
                                        <option value="">
                                            {t(
                                                "select_crop"
                                            ) ||
                                                "Select Crop"}
                                        </option>

                                        <option value="Rice">
                                            {t("rice") ||
                                                "Rice"}
                                        </option>

                                        <option value="Maize">
                                            {t("maize") ||
                                                "Maize"}
                                        </option>

                                        <option value="Cotton">
                                            {t(
                                                "cotton"
                                            ) ||
                                                "Cotton"}
                                        </option>

                                        <option value="Groundnut">
                                            {t(
                                                "groundnut"
                                            ) ||
                                                "Groundnut"}
                                        </option>

                                        <option value="Sugarcane">
                                            {t(
                                                "sugarcane"
                                            ) ||
                                                "Sugarcane"}
                                        </option>

                                        <option value="Tomato">
                                            {t(
                                                "tomato"
                                            ) ||
                                                "Tomato"}
                                        </option>

                                        <option value="Potato">
                                            {t(
                                                "potato"
                                            ) ||
                                                "Potato"}
                                        </option>

                                        <option value="Chilli">
                                            {t(
                                                "chilli"
                                            ) ||
                                                "Chilli"}
                                        </option>

                                        <option value="Wheat">
                                            {t("wheat") ||
                                                "Wheat"}
                                        </option>
                                    </select>
                                </div>

                                {/* SECONDARY CROP */}

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        {t(
                                            "secondary_crop"
                                        ) ||
                                            "Secondary Crop"}
                                    </label>

                                    <input
                                        type="text"
                                        name="secondaryCrop"
                                        value={
                                            profile.secondaryCrop
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder={
                                            t(
                                                "optional"
                                            ) ||
                                            "Optional"
                                        }
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>

                                {/* FARMING TYPE */}

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        {t(
                                            "farming_type"
                                        ) ||
                                            "Farming Type"}
                                    </label>

                                    <select
                                        name="farmingType"
                                        value={
                                            profile.farmingType
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={
                                            inputClass
                                        }
                                    >
                                        <option value="">
                                            {t(
                                                "select_farming_type"
                                            ) ||
                                                "Select Farming Type"}
                                        </option>

                                        <option value="Organic">
                                            {t(
                                                "organic"
                                            ) ||
                                                "Organic"}
                                        </option>

                                        <option value="Conventional">
                                            {t(
                                                "conventional"
                                            ) ||
                                                "Conventional"}
                                        </option>

                                        <option value="Mixed">
                                            {t("mixed") ||
                                                "Mixed"}
                                        </option>
                                    </select>
                                </div>

                                {/* EXPERIENCE */}

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        {t(
                                            "farming_experience"
                                        ) ||
                                            "Farming Experience"}
                                    </label>

                                    <input
                                        type="number"
                                        name="farmingExperience"
                                        value={
                                            profile.farmingExperience
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="10"
                                        min="0"
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>

                                {/* LIVESTOCK */}

                                <div className="md:col-span-2">
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        {t(
                                            "livestock"
                                        ) ||
                                            "Livestock"}
                                    </label>

                                    <input
                                        type="text"
                                        name="livestock"
                                        value={
                                            profile.livestock
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder={
                                            t(
                                                "livestock_placeholder"
                                            ) ||
                                            "Example: Cows, Buffaloes"
                                        }
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>
                            </div>

                            {/* ALMOST DONE CARD */}

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-[#d8eee1]
                                    bg-[#f1f8f4]
                                    p-5
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-start
                                        gap-4
                                    "
                                >
                                    <div
                                        className="
                                            w-12
                                            h-12
                                            rounded-xl
                                            bg-white
                                            flex
                                            items-center
                                            justify-center
                                            shrink-0
                                            border
                                            border-[#d8eee1]
                                        "
                                    >
                                        <CheckCircle
                                            size={23}
                                            className="text-[#087443]"
                                        />
                                    </div>

                                    <div>
                                        <h3
                                            className="
                                                font-bold
                                                text-[#087443]
                                                text-lg
                                            "
                                        >
                                            {t(
                                                "almost_done"
                                            ) ||
                                                "Almost Done"}
                                        </h3>

                                        <p
                                            className="
                                                text-gray-600
                                                mt-1.5
                                            "
                                        >
                                            {t(
                                                "almost_done_desc"
                                            ) ||
                                                "Save your profile to personalize your FarmXpert dashboard."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* =================================================
                       NAVIGATION
                    ================================================= */}

                    <div
                        className="
                            mt-10
                            pt-6
                            border-t
                            border-gray-100
                        "
                    >
                        <div
                            className="
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                                gap-4
                            "
                        >
                            {/* LEFT */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >
                                {/* PREVIOUS */}

                                {step > 1 ? (
                                    <button
                                        type="button"
                                        onClick={
                                            previousStep
                                        }
                                        disabled={
                                            loading
                                        }
                                        className="
                                            h-11
                                            px-5
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-white
                                            text-gray-700
                                            font-semibold
                                            flex
                                            items-center
                                            gap-2
                                            hover:bg-gray-50
                                            transition
                                            disabled:opacity-50
                                        "
                                    >
                                        <ArrowLeft
                                            size={17}
                                        />

                                        {t(
                                            "previous"
                                        ) ||
                                            "Previous"}
                                    </button>
                                ) : (
                                    <div />
                                )}

                                {/* SKIP */}

                                <button
                                    type="button"
                                    onClick={
                                        skipProfile
                                    }
                                    disabled={
                                        loading
                                    }
                                    className="
                                        h-11
                                        px-5
                                        rounded-xl
                                        text-gray-500
                                        font-medium
                                        hover:text-[#087443]
                                        hover:bg-[#f3f7f5]
                                        transition
                                        disabled:opacity-50
                                    "
                                >
                                    {t(
                                        "skip_for_now"
                                    ) ||
                                        "Skip for now"}
                                </button>
                            </div>

                            {/* RIGHT */}

                            {step < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={
                                        nextStep
                                    }
                                    disabled={
                                        loading
                                    }
                                    className="
                                        h-11
                                        px-6
                                        rounded-xl
                                        bg-[#087443]
                                        text-white
                                        font-semibold
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        shadow-[0_5px_15px_rgba(8,116,67,0.18)]
                                        hover:bg-[#076538]
                                        hover:-translate-y-0.5
                                        transition-all
                                        disabled:opacity-50
                                    "
                                >
                                    {t("next") ||
                                        "Next"}

                                    <ArrowRight
                                        size={18}
                                    />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={
                                        saveProfile
                                    }
                                    disabled={
                                        loading
                                    }
                                    className="
                                        h-11
                                        px-6
                                        rounded-xl
                                        bg-[#087443]
                                        text-white
                                        font-semibold
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        shadow-[0_5px_15px_rgba(8,116,67,0.18)]
                                        hover:bg-[#076538]
                                        hover:-translate-y-0.5
                                        transition-all
                                        disabled:opacity-60
                                        disabled:cursor-not-allowed
                                    "
                                >
                                    {loading ? (
                                        <>
                                            <Loader2
                                                size={18}
                                                className="
                                                    animate-spin
                                                "
                                            />

                                            {t(
                                                "saving"
                                            ) ||
                                                "Saving..."}
                                        </>
                                    ) : (
                                        <>
                                            {t(
                                                "save_profile"
                                            ) ||
                                                "Save Profile"}

                                            <CheckCircle
                                                size={18}
                                            />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* =================================================
                       FOOTER
                    ================================================= */}

                    <div
                        className="
                            mt-7
                            text-center
                        "
                    >
                        <p
                            className="
                                text-xs
                                md:text-sm
                                text-gray-400
                            "
                        >
                            {t(
                                "profile_footer"
                            ) ||
                                "You can update these details anytime from My Profile."}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}