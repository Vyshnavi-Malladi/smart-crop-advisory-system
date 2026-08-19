// // import { useEffect, useState } from "react";
// // import { motion } from "framer-motion";
// // import {
// //     User,
// //     Phone,
// //     MapPin,
// //     Sprout,
// //     Tractor,
// //     Globe,
// //     Edit3,
// //     Calendar,
// //     Droplets,
// //     Mountain
// // } from "lucide-react";

// // import { useNavigate } from "react-router-dom";
// // import api from "../api";

// // export default function Profile() {

// //     const navigate = useNavigate();

// //     const [profile, setProfile] = useState(null);

// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {

// //         fetchProfile();

// //     }, []);

// //     const fetchProfile = async () => {

// //         try {

// //             const res = await api.get("/farmer");

// //             if (res.data.exists) {

// //                 setProfile(res.data.profile);

// //             }

// //         }

// //         catch (err) {

// //             console.log(err);

// //         }

// //         finally {

// //             setLoading(false);

// //         }

// //     };

// //     if (loading) {

// //         return (

// //             <div className="flex justify-center items-center h-[70vh]">

// //                 <div className="text-lg font-semibold">

// //                     Loading...

// //                 </div>

// //             </div>

// //         );

// //     }

// //     return (

// // <div className="max-w-7xl mx-auto">

// // {/* HEADER */}

// // <motion.div

// // initial={{opacity:0,y:20}}

// // animate={{opacity:1,y:0}}

// // className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl text-white p-10 shadow-xl"

// // >

// // <div className="flex justify-between items-center flex-wrap gap-6">

// // <div className="flex items-center gap-6">

// // <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center text-5xl font-bold">

// // {

// // profile?.fullName

// // ?

// // profile.fullName.charAt(0)

// // :

// // <User/>

// // }

// // </div>

// // <div>

// // <h1 className="text-4xl font-bold">

// // {

// // profile?.fullName

// // }

// // </h1>

// // <p className="text-green-100 mt-2">

// // Farmer

// // </p>

// // <p className="text-green-100">

// // {

// // profile?.farmName ||

// // "My Farm"

// // }

// // </p>

// // </div>

// // </div>

// // <button

// // onClick={()=>navigate("/farmer-profile")}

// // className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition"

// // >

// // <Edit3 size={18}/>

// // Edit Profile

// // </button>

// // </div>

// // </motion.div>
// // {/* ================= CONTENT ================= */}

// // <div className="grid lg:grid-cols-2 gap-8 mt-8">

// //     {/* ================= PERSONAL DETAILS ================= */}

// //     <motion.div
// //         initial={{ opacity: 0, x: -20 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
// //     >

// //         <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">

// //             <User className="text-green-600"/>

// //             Personal Information

// //         </h2>

// //         <div className="space-y-5">

// //             <InfoRow
// //                 icon={<User size={18}/>}
// //                 title="Full Name"
// //                 value={profile.fullName}
// //             />

// //             <InfoRow
// //                 icon={<Phone size={18}/>}
// //                 title="Mobile"
// //                 value={profile.mobile}
// //             />

// //             <InfoRow
// //                 icon={<Calendar size={18}/>}
// //                 title="Age"
// //                 value={profile.age}
// //             />

// //             <InfoRow
// //                 icon={<User size={18}/>}
// //                 title="Gender"
// //                 value={profile.gender}
// //             />

// //             <InfoRow
// //                 icon={<Globe size={18}/>}
// //                 title="Language"
// //                 value={profile.language}
// //             />

// //         </div>

// //     </motion.div>

// //     {/* ================= FARM DETAILS ================= */}

// //     <motion.div
// //         initial={{ opacity: 0, x: 20 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
// //     >

// //         <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">

// //             <Tractor className="text-green-600"/>

// //             Farm Information

// //         </h2>

// //         <div className="space-y-5">

// //             <InfoRow
// //                 icon={<Tractor size={18}/>}
// //                 title="Farm Name"
// //                 value={profile.farmName}
// //             />

// //             <InfoRow
// //                 icon={<Sprout size={18}/>}
// //                 title="Primary Crop"
// //                 value={profile.primaryCrop}
// //             />

// //             <InfoRow
// //                 icon={<Sprout size={18}/>}
// //                 title="Secondary Crop"
// //                 value={profile.secondaryCrop || "-"}
// //             />

// //             <InfoRow
// //                 icon={<Mountain size={18}/>}
// //                 title="Soil Type"
// //                 value={profile.soilType}
// //             />

// //             <InfoRow
// //                 icon={<Droplets size={18}/>}
// //                 title="Irrigation"
// //                 value={profile.irrigationType}
// //             />

// //             <InfoRow
// //                 icon={<Droplets size={18}/>}
// //                 title="Water Source"
// //                 value={profile.waterSource}
// //             />

// //             <InfoRow
// //                 icon={<Tractor size={18}/>}
// //                 title="Land Area"
// //                 value={`${profile.landArea} ${profile.landUnit}`}
// //             />

// //         </div>

// //     </motion.div>

// // </div>

// // {/* ================= LOCATION ================= */}

// // <motion.div
// //     initial={{ opacity: 0, y: 20 }}
// //     animate={{ opacity: 1, y: 0 }}
// //     className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 mt-8"
// // >

// //     <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">

// //         <MapPin className="text-red-500"/>

// //         Farm Location

// //     </h2>

// //     <div className="grid md:grid-cols-4 gap-6">

// //         <InfoBox
// //             title="State"
// //             value={profile.state}
// //         />

// //         <InfoBox
// //             title="District"
// //             value={profile.district}
// //         />

// //         <InfoBox
// //             title="Village"
// //             value={profile.village}
// //         />

// //         <InfoBox
// //             title="PIN Code"
// //             value={profile.pincode}
// //         />

// //     </div>

// // </motion.div>
// // </div>

// // );

// // /* ================= INFO ROW COMPONENT ================= */

// // function InfoRow({ icon, title, value }) {

// //     return (

// //         <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-none">

// //             <div className="flex items-center gap-3">

// //                 <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">

// //                     {icon}

// //                 </div>

// //                 <span className="text-gray-600 font-medium">

// //                     {title}

// //                 </span>

// //             </div>

// //             <span className="font-semibold text-gray-800">

// //                 {value || "--"}

// //             </span>

// //         </div>

// //     );

// // }

// // /* ================= INFO BOX COMPONENT ================= */

// // function InfoBox({ title, value }) {

// //     return (

// //         <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">

// //             <p className="text-xs uppercase tracking-wider text-gray-400">

// //                 {title}

// //             </p>

// //             <h3 className="text-lg font-bold text-gray-800 mt-3">

// //                 {value || "--"}

// //             </h3>

// //         </div>

// //     );

// // }









// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   User,
//   Phone,
//   MapPin,
//   Sprout,
//   Tractor,
//   Globe,
//   Edit3,
//   Calendar,
//   Droplets,
//   Mountain,
//   ArrowLeft
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Profile() {

//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {

//       const res = await api.get("/farmer");

//       if (res.data.exists) {
//         setProfile(res.data.profile);
//       }

//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-[70vh] flex items-center justify-center">
//         <h2 className="text-xl font-semibold text-gray-600">
//           Loading Profile...
//         </h2>
//       </div>
//     );
//   }

//   return (

//     <div className="max-w-7xl mx-auto space-y-8">

//       {/* ================= HEADER ================= */}

//       <motion.div

//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}

//         className="rounded-3xl overflow-hidden bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 shadow-xl"

//       >

//         <div className="px-10 py-10">

//           <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

//             <div className="flex items-center gap-6">

//               {/* Avatar */}

//               <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center text-5xl font-bold text-white">

//                 {profile?.fullName
//                   ? profile.fullName.charAt(0).toUpperCase()
//                   : "F"}

//               </div>

//               {/* Details */}

//               <div>

//                 <h1 className="text-4xl font-bold text-white">

//                   {profile?.fullName}

//                 </h1>

//                 <p className="text-green-100 mt-2 text-lg">

//                   Smart Farmer

//                 </p>

//                 <div className="flex gap-3 mt-4 flex-wrap">

//                   <span className="px-4 py-1 rounded-full bg-white/20 text-white text-sm">

//                     🌾 {profile?.primaryCrop || "No Crop"}

//                   </span>

//                   <span className="px-4 py-1 rounded-full bg-white/20 text-white text-sm">

//                     🚜 {profile?.farmName || "Farm"}

//                   </span>

//                 </div>

//               </div>

//             </div>

//             {/* Buttons */}

//             <div className="flex gap-4">

//               <button

//                 onClick={() => navigate("/dashboard")}

//                 className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-green-700 font-semibold hover:scale-105 transition"

//               >

//                 <ArrowLeft size={18} />

//                 Dashboard

//               </button>

//               <button

//                 onClick={() => navigate("/farmer-profile")}

//                 className="flex items-center gap-2 px-5 py-3 rounded-xl bg-black/20 text-white border border-white/20 hover:bg-black/30 transition"

//               >

//                 <Edit3 size={18} />

//                 Edit Profile

//               </button>

//             </div>

//           </div>

//         </div>

//       </motion.div>
//             {/* ================= INFORMATION SECTION ================= */}

//       <div className="grid lg:grid-cols-2 gap-8">

//         {/* ================= PERSONAL INFORMATION ================= */}

//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
//         >

//           <div className="flex items-center gap-3 mb-8">

//             <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

//               <User className="text-green-600" />

//             </div>

//             <div>

//               <h2 className="text-2xl font-bold text-gray-800">
//                 Personal Information
//               </h2>

//               <p className="text-gray-500 text-sm">
//                 Basic details about the farmer
//               </p>

//             </div>

//           </div>

//           <div className="space-y-5">

//             <ProfileRow
//               icon={<User size={18} />}
//               label="Full Name"
//               value={profile?.fullName}
//             />

//             <ProfileRow
//               icon={<Phone size={18} />}
//               label="Mobile Number"
//               value={profile?.mobile}
//             />

//             <ProfileRow
//               icon={<Calendar size={18} />}
//               label="Age"
//               value={profile?.age}
//             />

//             <ProfileRow
//               icon={<User size={18} />}
//               label="Gender"
//               value={profile?.gender}
//             />

//             <ProfileRow
//               icon={<Globe size={18} />}
//               label="Language"
//               value={
//                 profile?.language === "te"
//                   ? "Telugu"
//                   : profile?.language === "hi"
//                   ? "Hindi"
//                   : "English"
//               }
//             />

//           </div>

//         </motion.div>

//         {/* ================= FARM INFORMATION ================= */}

//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
//         >

//           <div className="flex items-center gap-3 mb-8">

//             <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

//               <Tractor className="text-blue-600" />

//             </div>

//             <div>

//               <h2 className="text-2xl font-bold text-gray-800">
//                 Farm Information
//               </h2>

//               <p className="text-gray-500 text-sm">
//                 Farm and cultivation details
//               </p>

//             </div>

//           </div>

//           <div className="space-y-5">

//             <ProfileRow
//               icon={<Tractor size={18} />}
//               label="Farm Name"
//               value={profile?.farmName}
//             />

//             <ProfileRow
//               icon={<Sprout size={18} />}
//               label="Primary Crop"
//               value={profile?.primaryCrop}
//             />

//             <ProfileRow
//               icon={<Sprout size={18} />}
//               label="Secondary Crop"
//               value={profile?.secondaryCrop}
//             />

//             <ProfileRow
//               icon={<Mountain size={18} />}
//               label="Soil Type"
//               value={profile?.soilType}
//             />

//             <ProfileRow
//               icon={<Droplets size={18} />}
//               label="Irrigation"
//               value={profile?.irrigationType}
//             />

//             <ProfileRow
//               icon={<Droplets size={18} />}
//               label="Water Source"
//               value={profile?.waterSource}
//             />

//             <ProfileRow
//               icon={<Tractor size={18} />}
//               label="Land Area"
//               value={`${profile?.landArea || "--"} ${profile?.landUnit || ""}`}
//             />

//             <ProfileRow
//               icon={<Calendar size={18} />}
//               label="Experience"
//               value={`${profile?.farmingExperience || "--"} Years`}
//             />

//           </div>

//         </motion.div>

//       </div>

//       {/* ================= LOCATION ================= */}

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
//       >

//         <div className="flex items-center gap-3 mb-8">

//           <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">

//             <MapPin className="text-red-500" />

//           </div>

//           <div>

//             <h2 className="text-2xl font-bold text-gray-800">
//               Farm Location
//             </h2>

//             <p className="text-gray-500 text-sm">
//               Address of your farm
//             </p>

//           </div>

//         </div>

//         <div className="grid md:grid-cols-4 gap-5">

//           <LocationCard
//             title="State"
//             value={profile?.state}
//           />

//           <LocationCard
//             title="District"
//             value={profile?.district}
//           />

//           <LocationCard
//             title="Village"
//             value={profile?.village}
//           />

//           <LocationCard
//             title="PIN Code"
//             value={profile?.pincode}
//           />

//         </div>

//       </motion.div>
//           </div>

//   );

// }

// /* ===========================================================
//    PROFILE ROW COMPONENT
// =========================================================== */

// function ProfileRow({ icon, label, value }) {

//   return (

//     <div className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-none">

//       <div className="flex items-center gap-4">

//         <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-green-600">

//           {icon}

//         </div>

//         <div>

//           <p className="text-sm text-gray-500">

//             {label}

//           </p>

//           <p className="font-semibold text-gray-800">

//             {value || "--"}

//           </p>

//         </div>

//       </div>

//     </div>

//   );

// }

// /* ===========================================================
//    LOCATION CARD
// =========================================================== */

// function LocationCard({ title, value }) {

//   return (

//     <motion.div

//       whileHover={{ y: -4 }}

//       transition={{ duration: 0.2 }}

//       className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg"

//     >

//       <div className="w-12 h-12 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4">

//         <MapPin className="text-green-600" size={20} />

//       </div>

//       <p className="text-sm text-gray-500">

//         {title}

//       </p>

//       <h3 className="font-bold text-gray-800 mt-2">

//         {value || "--"}

//       </h3>

//     </motion.div>

//   );

// }








// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   User,
//   Phone,
//   MapPin,
//   Sprout,
//   Tractor,
//   Globe,
//   Edit3,
//   Calendar,
//   Droplets,
//   Mountain,
//   ArrowLeft
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import api from "../api";

// export default function Profile() {

//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {

//       const res = await api.get("/farmer");

//       if (res.data.exists) {
//         setProfile(res.data.profile);
//         if (res.data.profile.language) {
//           i18n.changeLanguage(res.data.profile.language);
//         }
//       }

//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-[70vh] flex items-center justify-center">
//         <h2 className="text-xl font-semibold text-gray-600">
//           {t("loading_profile")}
//         </h2>
//       </div>
//     );
//   }

//   return (

//     <div className="max-w-7xl mx-auto space-y-8">

//       {/* ================= HEADER ================= */}

//       <motion.div

//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}

//         className="rounded-3xl overflow-hidden bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 shadow-xl"

//       >

//         <div className="px-10 py-10">

//           <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

//             <div className="flex items-center gap-6">

//               {/* Avatar */}

//               <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center text-5xl font-bold text-white">

//                 {profile?.fullName
//                   ? profile.fullName.charAt(0).toUpperCase()
//                   : "F"}

//               </div>

//               {/* Details */}

//               <div>

//                 <h1 className="text-4xl font-bold text-white">

//                   {profile?.fullName}

//                 </h1>

//                 <p className="text-green-100 mt-2 text-lg">

//                   {t("smart_farmer")}

//                 </p>

//                 <div className="flex gap-3 mt-4 flex-wrap">

//                   <span className="px-4 py-1 rounded-full bg-white/20 text-white text-sm">

//                     🌾 {profile?.primaryCrop || t("no_crop")}

//                   </span>

//                   <span className="px-4 py-1 rounded-full bg-white/20 text-white text-sm">

//                     🚜 {profile?.farmName || t("farm")}

//                   </span>

//                 </div>

//               </div>

//             </div>

//             {/* Buttons */}

//             <div className="flex gap-4">

//               <button

//                 onClick={() => navigate("/dashboard")}

//                 className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-green-700 font-semibold hover:scale-105 transition"

//               >

//                 <ArrowLeft size={18} />

//                 {t("nav_dashboard")}

//               </button>

//               <button

//                 onClick={() => navigate("/farmer-profile")}

//                 className="flex items-center gap-2 px-5 py-3 rounded-xl bg-black/20 text-white border border-white/20 hover:bg-black/30 transition"

//               >

//                 <Edit3 size={18} />

//                 {t("edit_profile")}

//               </button>

//             </div>

//           </div>

//         </div>

//       </motion.div>
//             {/* ================= INFORMATION SECTION ================= */}

//       <div className="grid lg:grid-cols-2 gap-8">

//         {/* ================= PERSONAL INFORMATION ================= */}

//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
//         >

//           <div className="flex items-center gap-3 mb-8">

//             <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

//               <User className="text-green-600" />

//             </div>

//             <div>

//               <h2 className="text-2xl font-bold text-gray-800">
//                 {t("personal_information")}
//               </h2>

//               <p className="text-gray-500 text-sm">
//                 {t("personal_information_desc")}
//               </p>

//             </div>

//           </div>

//           <div className="space-y-5">

//             <ProfileRow
//               icon={<User size={18} />}
//               label={t("full_name")}
//               value={profile?.fullName}
//             />

//             <ProfileRow
//               icon={<Phone size={18} />}
//               label={t("mobile_number")}
//               value={profile?.mobile}
//             />

//             <ProfileRow
//               icon={<Calendar size={18} />}
//               label={t("age")}
//               value={profile?.age}
//             />

//             <ProfileRow
//               icon={<User size={18} />}
//               label={t("gender")}
//               value={profile?.gender}
//             />

//             <ProfileRow
//               icon={<Globe size={18} />}
//               label={t("language")}
//               value={
//                 profile?.language === "te"
//                   ? t("telugu")
//                   : profile?.language === "hi"
//                   ? t("hindi")
//                   : t("english")
//               }
//             />

//           </div>

//         </motion.div>

//         {/* ================= FARM INFORMATION ================= */}

//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
//         >

//           <div className="flex items-center gap-3 mb-8">

//             <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

//               <Tractor className="text-blue-600" />

//             </div>

//             <div>

//               <h2 className="text-2xl font-bold text-gray-800">
//                 {t("farm_information")}
//               </h2>

//               <p className="text-gray-500 text-sm">
//                 {t("farm_information_desc")}
//               </p>

//             </div>

//           </div>

//           <div className="space-y-5">

//             <ProfileRow
//               icon={<Tractor size={18} />}
//               label={t("farm_name")}
//               value={profile?.farmName}
//             />

//             <ProfileRow
//               icon={<Sprout size={18} />}
//               label={t("primary_crop")}
//               value={profile?.primaryCrop}
//             />

//             <ProfileRow
//               icon={<Sprout size={18} />}
//               label={t("secondary_crop")}
//               value={profile?.secondaryCrop}
//             />

//             <ProfileRow
//               icon={<Mountain size={18} />}
//               label={t("soil_type")}
//               value={profile?.soilType}
//             />

//             <ProfileRow
//               icon={<Droplets size={18} />}
//               label={t("irrigation_type")}
//               value={profile?.irrigationType}
//             />

//             <ProfileRow
//               icon={<Droplets size={18} />}
//               label={t("water_source")}
//               value={profile?.waterSource}
//             />

//             <ProfileRow
//               icon={<Tractor size={18} />}
//               label={t("land_area")}
//               value={`${profile?.landArea || "--"} ${profile?.landUnit || ""}`}
//             />

//             <ProfileRow
//               icon={<Calendar size={18} />}
//               label={t("experience")}
//               value={`${profile?.farmingExperience || "--"} ${t("years")}`}
//             />

//           </div>

//         </motion.div>

//       </div>

//       {/* ================= LOCATION ================= */}

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
//       >

//         <div className="flex items-center gap-3 mb-8">

//           <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">

//             <MapPin className="text-red-500" />

//           </div>

//           <div>

//             <h2 className="text-2xl font-bold text-gray-800">
//               {t("farm_location")}
//             </h2>

//             <p className="text-gray-500 text-sm">
//               {t("farm_location_desc")}
//             </p>

//           </div>

//         </div>

//         <div className="grid md:grid-cols-4 gap-5">

//           <LocationCard
//             title={t("state")}
//             value={profile?.state}
//           />

//           <LocationCard
//             title={t("district")}
//             value={profile?.district}
//           />

//           <LocationCard
//             title={t("village")}
//             value={profile?.village}
//           />

//           <LocationCard
//             title={t("pin_code")}
//             value={profile?.pincode}
//           />

//         </div>

//       </motion.div>
//           </div>

//   );

// }

// /* ===========================================================
//    PROFILE ROW COMPONENT
// =========================================================== */

// function ProfileRow({ icon, label, value }) {

//   return (

//     <div className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-none">

//       <div className="flex items-center gap-4">

//         <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-green-600">

//           {icon}

//         </div>

//         <div>

//           <p className="text-sm text-gray-500">

//             {label}

//           </p>

//           <p className="font-semibold text-gray-800">

//             {value || "--"}

//           </p>

//         </div>

//       </div>

//     </div>

//   );

// }

// /* ===========================================================
//    LOCATION CARD
// =========================================================== */

// function LocationCard({ title, value }) {

//   return (

//     <motion.div

//       whileHover={{ y: -4 }}

//       transition={{ duration: 0.2 }}

//       className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg"

//     >

//       <div className="w-12 h-12 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4">

//         <MapPin className="text-green-600" size={20} />

//       </div>

//       <p className="text-sm text-gray-500">

//         {title}

//       </p>

//       <h3 className="font-bold text-gray-800 mt-2">

//         {value || "--"}

//       </h3>

//     </motion.div>

//   );

// }













// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   User,
//   Phone,
//   MapPin,
//   Sprout,
//   Tractor,
//   Edit3,
//   Calendar,
//   Droplets,
//   Mountain,
//   ArrowLeft,
//   Globe
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import api from "../api";

// export default function Profile() {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   // ✅ Listen for language changes from Navbar
//   useEffect(() => {
//     // Force re-render when language changes
//     const handleLanguageChange = () => {
//       // Just trigger a re-render - the component will use updated i18n
//       setProfile(prev => ({ ...prev }));
//     };

//     // Subscribe to language changes
//     i18n.on('languageChanged', handleLanguageChange);

//     return () => {
//       i18n.off('languageChanged', handleLanguageChange);
//     };
//   }, [i18n]);

//   const fetchProfile = async () => {
//     try {
//       const res = await api.get("/farmer");

//       if (res.data.exists) {
//         setProfile(res.data.profile);
//         // Set language from profile if available
//         if (res.data.profile.language) {
//           i18n.changeLanguage(res.data.profile.language);
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-[70vh] flex items-center justify-center">
//         <h2 className="text-xl font-semibold text-gray-600">
//           {t("loading_profile")}
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto space-y-8">
//       {/* ================= HEADER ================= */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="rounded-3xl overflow-hidden bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 shadow-xl"
//       >
//         <div className="px-10 py-10">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
//             <div className="flex items-center gap-6">
//               {/* Avatar */}
//               <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center text-5xl font-bold text-white">
//                 {profile?.fullName
//                   ? profile.fullName.charAt(0).toUpperCase()
//                   : "F"}
//               </div>

//               {/* Details */}
//               <div>
//                 <h1 className="text-4xl font-bold text-white">
//                   {profile?.fullName}
//                 </h1>
//                 <p className="text-green-100 mt-2 text-lg">
//                   {t("smart_farmer")}
//                 </p>
//                 <div className="flex gap-3 mt-4 flex-wrap">
//                   <span className="px-4 py-1 rounded-full bg-white/20 text-white text-sm">
//                     🌾 {profile?.primaryCrop || t("no_crop")}
//                   </span>
//                   <span className="px-4 py-1 rounded-full bg-white/20 text-white text-sm">
//                     🚜 {profile?.farmName || t("farm")}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-4">
//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-green-700 font-semibold hover:scale-105 transition"
//               >
//                 <ArrowLeft size={18} />
//                 {t("nav_dashboard")}
//               </button>

//               <button
//                 onClick={() => navigate("/farmer-profile")}
//                 className="flex items-center gap-2 px-5 py-3 rounded-xl bg-black/20 text-white border border-white/20 hover:bg-black/30 transition"
//               >
//                 <Edit3 size={18} />
//                 {t("edit_profile")}
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* ================= INFORMATION SECTION ================= */}
//       <div className="grid lg:grid-cols-2 gap-8">
//         {/* ================= PERSONAL INFORMATION ================= */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
//         >
//           <div className="flex items-center gap-3 mb-8">
//             <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
//               <User className="text-green-600" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {t("personal_information")}
//               </h2>
//               <p className="text-gray-500 text-sm">
//                 {t("personal_information_desc")}
//               </p>
//             </div>
//           </div>

//           <div className="space-y-5">
//             <ProfileRow
//               icon={<User size={18} />}
//               label={t("full_name")}
//               value={profile?.fullName}
//             />

//             <ProfileRow
//               icon={<Phone size={18} />}
//               label={t("mobile_number")}
//               value={profile?.mobile}
//             />

//             <ProfileRow
//               icon={<Calendar size={18} />}
//               label={t("age")}
//               value={profile?.age}
//             />

//             <ProfileRow
//               icon={<User size={18} />}
//               label={t("gender")}
//               value={profile?.gender}
//             />
            
//             {/* ✅ Display current language - updates when Navbar changes */}
//             <ProfileRow
//               icon={<Globe size={18} />}
//               label={t("current_language")}
//               value={
//                 i18n.language === "en" ? "English" :
//                 i18n.language === "te" ? "తెలుగు" :
//                 i18n.language === "hi" ? "हिंदी" : "English"
//               }
//             />
//           </div>
//         </motion.div>

//         {/* ================= FARM INFORMATION ================= */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
//         >
//           <div className="flex items-center gap-3 mb-8">
//             <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
//               <Tractor className="text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {t("farm_information")}
//               </h2>
//               <p className="text-gray-500 text-sm">
//                 {t("farm_information_desc")}
//               </p>
//             </div>
//           </div>

//           <div className="space-y-5">
//             <ProfileRow
//               icon={<Tractor size={18} />}
//               label={t("farm_name")}
//               value={profile?.farmName}
//             />

//             <ProfileRow
//               icon={<Sprout size={18} />}
//               label={t("primary_crop")}
//               value={profile?.primaryCrop}
//             />

//             <ProfileRow
//               icon={<Sprout size={18} />}
//               label={t("secondary_crop")}
//               value={profile?.secondaryCrop}
//             />

//             <ProfileRow
//               icon={<Mountain size={18} />}
//               label={t("soil_type")}
//               value={profile?.soilType}
//             />

//             <ProfileRow
//               icon={<Droplets size={18} />}
//               label={t("irrigation_type")}
//               value={profile?.irrigationType}
//             />

//             <ProfileRow
//               icon={<Droplets size={18} />}
//               label={t("water_source")}
//               value={profile?.waterSource}
//             />

//             <ProfileRow
//               icon={<Tractor size={18} />}
//               label={t("land_area")}
//               value={`${profile?.landArea || "--"} ${profile?.landUnit || ""}`}
//             />

//             <ProfileRow
//               icon={<Calendar size={18} />}
//               label={t("experience")}
//               value={`${profile?.farmingExperience || "--"} ${t("years")}`}
//             />
//           </div>
//         </motion.div>
//       </div>

//       {/* ================= LOCATION ================= */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
//       >
//         <div className="flex items-center gap-3 mb-8">
//           <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
//             <MapPin className="text-red-500" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">
//               {t("farm_location")}
//             </h2>
//             <p className="text-gray-500 text-sm">
//               {t("farm_location_desc")}
//             </p>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-4 gap-5">
//           <LocationCard
//             title={t("state")}
//             value={profile?.state}
//           />

//           <LocationCard
//             title={t("district")}
//             value={profile?.district}
//           />

//           <LocationCard
//             title={t("village")}
//             value={profile?.village}
//           />

//           <LocationCard
//             title={t("pin_code")}
//             value={profile?.pincode}
//           />
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /* ===========================================================
//    PROFILE ROW COMPONENT
// =========================================================== */
// function ProfileRow({ icon, label, value }) {
//   return (
//     <div className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-none">
//       <div className="flex items-center gap-4">
//         <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-green-600">
//           {icon}
//         </div>
//         <div>
//           <p className="text-sm text-gray-500">
//             {label}
//           </p>
//           <p className="font-semibold text-gray-800">
//             {value || "--"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ===========================================================
//    LOCATION CARD
// =========================================================== */
// function LocationCard({ title, value }) {
//   return (
//     <motion.div
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.2 }}
//       className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg"
//     >
//       <div className="w-12 h-12 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4">
//         <MapPin className="text-green-600" size={20} />
//       </div>
//       <p className="text-sm text-gray-500">
//         {title}
//       </p>
//       <h3 className="font-bold text-gray-800 mt-2">
//         {value || "--"}
//       </h3>
//     </motion.div>
//   );
// }



















// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   User,
//   Phone,
//   MapPin,
//   Sprout,
//   Tractor,
//   Edit3,
//   Calendar,
//   Droplets,
//   Mountain,
//   ArrowLeft,
//   Globe,
//   Landmark,
//   Home,
//   Building2,
//   Save,
//   X,
//   Loader2,
// } from "lucide-react";

// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";

// import api from "../api";

// export default function Profile() {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();

//   const [profile, setProfile] = useState(null);
//   const [originalProfile, setOriginalProfile] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [editMode, setEditMode] = useState(false);

//   /* =========================================================
//      LOAD PROFILE
//   ========================================================= */

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   useEffect(() => {
//     const handleLanguageChange = () => {
//       setProfile((prev) => (prev ? { ...prev } : prev));
//     };

//     i18n.on("languageChanged", handleLanguageChange);

//     return () => {
//       i18n.off("languageChanged", handleLanguageChange);
//     };
//   }, [i18n]);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);

//       const res = await api.get("/farmer");

//       if (res.data.exists) {
//         const loadedProfile = res.data.profile;

//         setProfile(loadedProfile);
//         setOriginalProfile(loadedProfile);

//         if (
//           loadedProfile.language &&
//           loadedProfile.language !== i18n.language
//         ) {
//           await i18n.changeLanguage(loadedProfile.language);
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching profile:", err);

//       toast.error(
//         t("profile_load_failed") || "Unable to load profile"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      HANDLE INPUT
//   ========================================================= */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setProfile((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   /* =========================================================
//      EDIT
//   ========================================================= */

//   const handleEdit = () => {
//     setOriginalProfile({
//       ...profile,
//     });

//     setEditMode(true);
//   };

//   /* =========================================================
//      CANCEL
//   ========================================================= */

//   const handleCancel = () => {
//     setProfile({
//       ...originalProfile,
//     });

//     setEditMode(false);
//   };

//   /* =========================================================
//      SAVE
//   ========================================================= */

//   const handleSave = async () => {
//     try {
//       setSaving(true);

//       if (
//         !profile.fullName?.trim() ||
//         !profile.mobile?.trim()
//       ) {
//         toast.error(
//           t("please_fill_required_fields") ||
//             "Please fill all required fields"
//         );

//         setSaving(false);
//         return;
//       }

//       if (
//         !profile.state?.trim() ||
//         !profile.district?.trim()
//       ) {
//         toast.error(
//           "Please enter your location details"
//         );

//         setSaving(false);
//         return;
//       }

//       if (!profile.farmName?.trim()) {
//         toast.error(
//           "Please enter your farm name"
//         );

//         setSaving(false);
//         return;
//       }

//       if (!profile.primaryCrop?.trim()) {
//         toast.error(
//           "Please select your primary crop"
//         );

//         setSaving(false);
//         return;
//       }

//       const updatedProfile = {
//         ...profile,
//         language: i18n.language,
//       };

//       const response = await api.post(
//         "/farmer",
//         updatedProfile
//       );

//       const savedProfile =
//         response.data?.profile ||
//         updatedProfile;

//       setProfile(savedProfile);
//       setOriginalProfile(savedProfile);

//       setEditMode(false);

//       toast.success(
//         t("profile_saved") ||
//           "Profile updated successfully"
//       );
//     } catch (err) {
//       console.error(
//         "Profile update error:",
//         err
//       );

//       toast.error(
//         err.response?.data?.error ||
//           t("profile_save_failed") ||
//           "Failed to update profile"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =========================================================
//      LOADING
//   ========================================================= */

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f5f8f7] flex items-center justify-center">
//         <div className="text-center">

//           <div
//             className="
//               w-11
//               h-11
//               mx-auto
//               border-4
//               border-[#dcefe4]
//               border-t-[#159b52]
//               rounded-full
//               animate-spin
//             "
//           />

//           <p className="mt-4 text-[15px] font-medium text-gray-500">
//             {t("loading_profile") ||
//               "Loading profile..."}
//           </p>

//         </div>
//       </div>
//     );
//   }

//   /* =========================================================
//      NO PROFILE
//   ========================================================= */

//   if (!profile) {
//     return (
//       <div className="min-h-screen bg-[#f5f8f7] flex items-center justify-center">

//         <div
//           className="
//             bg-white
//             rounded-2xl
//             border
//             border-gray-100
//             shadow-sm
//             p-9
//             text-center
//           "
//         >

//           <h2 className="text-2xl font-bold text-[#18313a]">
//             {t("profile_title")}
//           </h2>

//           <button
//             onClick={() =>
//               navigate("/farmer-profile")
//             }
//             className="
//               mt-6
//               px-6
//               py-3
//               rounded-xl
//               bg-[#159b52]
//               text-white
//               text-[14px]
//               font-semibold
//               hover:bg-[#108447]
//               transition
//             "
//           >
//             {t("edit_profile")}
//           </button>

//         </div>

//       </div>
//     );
//   }

//   /* =========================================================
//      LANGUAGE
//   ========================================================= */

//   const languageName =
//     i18n.language === "te"
//       ? "తెలుగు"
//       : i18n.language === "hi"
//       ? "हिंदी"
//       : "English";

//   /* =========================================================
//      MAP
//   ========================================================= */

//   const mapLat =
//     Number(profile.latitude) ||
//     16.9891;

//   const mapLng =
//     Number(profile.longitude) ||
//     82.2475;

//   const mapDelta = 0.08;

//   const mapUrl =
//     `https://www.openstreetmap.org/export/embed.html?bbox=` +
//     `${mapLng - mapDelta}%2C${mapLat - mapDelta}%2C` +
//     `${mapLng + mapDelta}%2C${mapLat + mapDelta}` +
//     `&layer=mapnik&marker=${mapLat}%2C${mapLng}`;

//   return (
//     <div
//       className="
//         min-h-screen
//         bg-[#f5f8f7]
//         px-4
//         sm:px-5
//         py-7
//       "
//     >

//       <div className="max-w-[1295px] mx-auto">

//         {/* =====================================================
//             PROFILE HERO
//         ===================================================== */}

//         <motion.section
//           initial={{
//             opacity: 0,
//             y: 15,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           className="
//             relative
//             h-[190px]
//             overflow-hidden
//             rounded-[19px]
//             shadow-[0_7px_24px_rgba(22,78,52,0.14)]
//           "
//           style={{
//             backgroundImage:
//               "linear-gradient(90deg, rgba(3,70,43,0.94) 0%, rgba(7,113,65,0.82) 45%, rgba(20,157,79,0.62) 100%), url('/assets/soil-background-image.png')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >

//           <div
//             className="
//               absolute
//               inset-0
//               bg-gradient-to-t
//               from-[#064f32]/50
//               to-transparent
//             "
//           />

//           <div
//             className="
//               relative
//               z-10
//               h-full
//               px-7
//               lg:px-[85px]
//               flex
//               items-center
//               justify-between
//             "
//           >

//             {/* LEFT */}

//             <div className="flex items-center gap-7">

//               {/* AVATAR */}

//               <div
//                 className="
//                   w-[104px]
//                   h-[104px]
//                   shrink-0
//                   rounded-full
//                   border-2
//                   border-white/75
//                   bg-white/10
//                   backdrop-blur-sm
//                   flex
//                   items-center
//                   justify-center
//                   text-[45px]
//                   font-bold
//                   text-white
//                   shadow-lg
//                 "
//               >
//                 {profile.fullName
//                   ? profile.fullName
//                       .charAt(0)
//                       .toUpperCase()
//                   : "F"}
//               </div>

//               {/* NAME */}

//               <div>

//                 {editMode ? (
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={
//                       profile.fullName || ""
//                     }
//                     onChange={handleChange}
//                     className="
//                       w-[320px]
//                       max-w-[45vw]
//                       bg-white/15
//                       border
//                       border-white/30
//                       rounded-lg
//                       px-3
//                       py-2
//                       text-[27px]
//                       font-bold
//                       text-white
//                       outline-none
//                       placeholder:text-white/60
//                     "
//                   />
//                 ) : (
//                   <h1
//                     className="
//                       text-[31px]
//                       leading-tight
//                       font-bold
//                       text-white
//                       tracking-[-0.5px]
//                     "
//                   >
//                     {profile.fullName ||
//                       "--"}
//                   </h1>
//                 )}

//                 <p
//                   className="
//                     mt-2
//                     text-[15px]
//                     text-white/90
//                     font-medium
//                   "
//                 >
//                   {t("smart_farmer") ||
//                     "Smart Farmer"}
//                 </p>

//               </div>

//             </div>

//             {/* RIGHT BUTTONS */}

//             <div className="flex items-center gap-3">

//               {!editMode ? (
//                 <>
//                   <button
//                     onClick={() =>
//                       navigate("/dashboard")
//                     }
//                     className="
//                       h-[46px]
//                       px-5
//                       rounded-xl
//                       bg-white
//                       text-[#16894c]
//                       flex
//                       items-center
//                       gap-2
//                       text-[14px]
//                       font-semibold
//                       shadow-sm
//                       hover:bg-[#f4fff8]
//                       transition
//                     "
//                   >

//                     <ArrowLeft size={17} />

//                     {t("nav_dashboard") ||
//                       "Dashboard"}

//                   </button>

//                   <button
//                     onClick={handleEdit}
//                     className="
//                       h-[46px]
//                       px-5
//                       rounded-xl
//                       border
//                       border-white/45
//                       bg-white/10
//                       text-white
//                       flex
//                       items-center
//                       gap-2
//                       text-[14px]
//                       font-semibold
//                       backdrop-blur-sm
//                       hover:bg-white/20
//                       transition
//                     "
//                   >

//                     <Edit3 size={17} />

//                     {t("edit_profile") ||
//                       "Edit Profile"}

//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={handleCancel}
//                     disabled={saving}
//                     className="
//                       h-[46px]
//                       px-5
//                       rounded-xl
//                       bg-white
//                       text-gray-700
//                       flex
//                       items-center
//                       gap-2
//                       text-[14px]
//                       font-semibold
//                       shadow-sm
//                       hover:bg-gray-50
//                       transition
//                     "
//                   >

//                     <X size={17} />

//                     Cancel

//                   </button>

//                   <button
//                     onClick={handleSave}
//                     disabled={saving}
//                     className="
//                       h-[46px]
//                       px-5
//                       rounded-xl
//                       bg-white
//                       text-[#159b52]
//                       flex
//                       items-center
//                       gap-2
//                       text-[14px]
//                       font-semibold
//                       shadow-sm
//                       hover:bg-[#f4fff8]
//                       transition
//                       disabled:opacity-60
//                     "
//                   >

//                     {saving ? (
//                       <Loader2
//                         size={17}
//                         className="animate-spin"
//                       />
//                     ) : (
//                       <Save size={17} />
//                     )}

//                     {saving
//                       ? "Saving..."
//                       : "Save Changes"}

//                   </button>
//                 </>
//               )}

//             </div>

//           </div>

//         </motion.section>


//         {/* =====================================================
//             PERSONAL + FARM INFORMATION
//         ===================================================== */}

//         <div
//           className="
//             grid
//             lg:grid-cols-2
//             gap-5
//             mt-6
//           "
//         >

//           {/* PERSONAL */}

//           <motion.section
//             initial={{
//               opacity: 0,
//               x: -15,
//             }}
//             animate={{
//               opacity: 1,
//               x: 0,
//             }}
//             className="
//               bg-white
//               min-h-[390px]
//               rounded-[18px]
//               border
//               border-[#e5ebe8]
//               shadow-[0_4px_18px_rgba(25,60,44,0.06)]
//               px-6
//               pt-6
//             "
//           >

//             <CardHeader
//               icon={<User size={22} />}
//               title={t(
//                 "personal_information"
//               )}
//               subtitle={t(
//                 "personal_information_desc"
//               )}
//             />

//             <div className="mt-3">

//               {editMode ? (
//                 <>
//                   <EditRow
//                     icon={<User size={17} />}
//                     label={t("full_name")}
//                   >
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={
//                         profile.fullName || ""
//                       }
//                       onChange={handleChange}
//                     />
//                   </EditRow>

//                   <EditRow
//                     icon={<Phone size={17} />}
//                     label={t(
//                       "mobile_number"
//                     )}
//                   >
//                     <input
//                       type="text"
//                       name="mobile"
//                       value={
//                         profile.mobile || ""
//                       }
//                       onChange={handleChange}
//                     />
//                   </EditRow>

//                   <EditRow
//                     icon={
//                       <Calendar size={17} />
//                     }
//                     label={t("age")}
//                   >
//                     <input
//                       type="number"
//                       name="age"
//                       value={
//                         profile.age || ""
//                       }
//                       onChange={handleChange}
//                     />
//                   </EditRow>

//                   <EditRow
//                     icon={<User size={17} />}
//                     label={t("gender")}
//                   >
//                     <select
//                       name="gender"
//                       value={
//                         profile.gender || ""
//                       }
//                       onChange={handleChange}
//                     >
//                       <option value="">
//                         Select Gender
//                       </option>

//                       <option value="Male">
//                         Male
//                       </option>

//                       <option value="Female">
//                         Female
//                       </option>

//                       <option value="Other">
//                         Other
//                       </option>
//                     </select>
//                   </EditRow>

//                   <EditRow
//                     icon={<Globe size={17} />}
//                     label={t(
//                       "current_language"
//                     )}
//                     last
//                   >
//                     <select
//                       name="language"
//                       value={
//                         profile.language ||
//                         i18n.language
//                       }
//                       onChange={handleChange}
//                     >
//                       <option value="en">
//                         English
//                       </option>

//                       <option value="te">
//                         తెలుగు
//                       </option>

//                       <option value="hi">
//                         हिंदी
//                       </option>
//                     </select>
//                   </EditRow>
//                 </>
//               ) : (
//                 <>
//                   <ProfileRow
//                     icon={<User size={17} />}
//                     label={t("full_name")}
//                     value={
//                       profile.fullName
//                     }
//                   />

//                   <ProfileRow
//                     icon={<Phone size={17} />}
//                     label={t(
//                       "mobile_number"
//                     )}
//                     value={
//                       profile.mobile
//                     }
//                   />

//                   <ProfileRow
//                     icon={
//                       <Calendar size={17} />
//                     }
//                     label={t("age")}
//                     value={profile.age}
//                   />

//                   <ProfileRow
//                     icon={<User size={17} />}
//                     label={t("gender")}
//                     value={
//                       profile.gender
//                     }
//                   />

//                   <ProfileRow
//                     icon={<Globe size={17} />}
//                     label={t(
//                       "current_language"
//                     )}
//                     value={languageName}
//                     last
//                   />
//                 </>
//               )}

//             </div>

//           </motion.section>


//           {/* FARM */}

//           <motion.section
//             initial={{
//               opacity: 0,
//               x: 15,
//             }}
//             animate={{
//               opacity: 1,
//               x: 0,
//             }}
//             className="
//               bg-white
//               min-h-[390px]
//               rounded-[18px]
//               border
//               border-[#e5ebe8]
//               shadow-[0_4px_18px_rgba(25,60,44,0.06)]
//               px-6
//               pt-6
//             "
//           >

//             <CardHeader
//               icon={<Tractor size={22} />}
//               title={t(
//                 "farm_information"
//               )}
//               subtitle={t(
//                 "farm_information_desc"
//               )}
//             />

//             <div
//               className="
//                 grid
//                 grid-cols-2
//                 gap-x-8
//                 mt-3
//               "
//             >

//               {/* LEFT */}

//               <div>

//                 {editMode ? (
//                   <>
//                     <EditRow
//                       icon={
//                         <Tractor size={17} />
//                       }
//                       label={t("farm_name")}
//                     >
//                       <input
//                         type="text"
//                         name="farmName"
//                         value={
//                           profile.farmName ||
//                           ""
//                         }
//                         onChange={handleChange}
//                       />
//                     </EditRow>

//                     <EditRow
//                       icon={
//                         <Sprout size={17} />
//                       }
//                       label={t(
//                         "primary_crop"
//                       )}
//                     >
//                       <input
//                         type="text"
//                         name="primaryCrop"
//                         value={
//                           profile.primaryCrop ||
//                           ""
//                         }
//                         onChange={handleChange}
//                       />
//                     </EditRow>

//                     <EditRow
//                       icon={
//                         <Sprout size={17} />
//                       }
//                       label={t(
//                         "secondary_crop"
//                       )}
//                     >
//                       <input
//                         type="text"
//                         name="secondaryCrop"
//                         value={
//                           profile.secondaryCrop ||
//                           ""
//                         }
//                         onChange={handleChange}
//                       />
//                     </EditRow>

//                     <EditRow
//                       icon={
//                         <Mountain size={17} />
//                       }
//                       label={t("soil_type")}
//                       last
//                     >
//                       <input
//                         type="text"
//                         name="soilType"
//                         value={
//                           profile.soilType ||
//                           ""
//                         }
//                         onChange={handleChange}
//                       />
//                     </EditRow>
//                   </>
//                 ) : (
//                   <>
//                     <ProfileRow
//                       icon={
//                         <Tractor size={17} />
//                       }
//                       label={t(
//                         "farm_name"
//                       )}
//                       value={
//                         profile.farmName
//                       }
//                     />

//                     <ProfileRow
//                       icon={
//                         <Sprout size={17} />
//                       }
//                       label={t(
//                         "primary_crop"
//                       )}
//                       value={
//                         profile.primaryCrop
//                       }
//                     />

//                     <ProfileRow
//                       icon={
//                         <Sprout size={17} />
//                       }
//                       label={t(
//                         "secondary_crop"
//                       )}
//                       value={
//                         profile.secondaryCrop
//                       }
//                     />

//                     <ProfileRow
//                       icon={
//                         <Mountain size={17} />
//                       }
//                       label={t(
//                         "soil_type"
//                       )}
//                       value={
//                         profile.soilType
//                       }
//                       last
//                     />
//                   </>
//                 )}

//               </div>


//               {/* RIGHT */}

//               <div>

//                 {editMode ? (
//                   <>
//                     <EditRow
//                       icon={
//                         <Droplets size={17} />
//                       }
//                       label={t(
//                         "water_source"
//                       )}
//                     >
//                       <input
//                         type="text"
//                         name="waterSource"
//                         value={
//                           profile.waterSource ||
//                           ""
//                         }
//                         onChange={handleChange}
//                       />
//                     </EditRow>

//                     <EditRow
//                       icon={
//                         <Mountain size={17} />
//                       }
//                       label={t(
//                         "land_area"
//                       )}
//                     >
//                       <div className="flex gap-2">

//                         <input
//                           type="number"
//                           name="landArea"
//                           value={
//                             profile.landArea ||
//                             ""
//                           }
//                           onChange={
//                             handleChange
//                           }
//                           className="!w-[78px]"
//                         />

//                         <select
//                           name="landUnit"
//                           value={
//                             profile.landUnit ||
//                             "Acres"
//                           }
//                           onChange={
//                             handleChange
//                           }
//                           className="!w-[105px]"
//                         >
//                           <option value="Acres">
//                             Acres
//                           </option>

//                           <option value="Hectares">
//                             Hectares
//                           </option>
//                         </select>

//                       </div>
//                     </EditRow>

//                     <EditRow
//                       icon={
//                         <Calendar size={17} />
//                       }
//                       label={t(
//                         "experience"
//                       )}
//                     >
//                       <input
//                         type="number"
//                         name="farmingExperience"
//                         value={
//                           profile.farmingExperience ||
//                           ""
//                         }
//                         onChange={
//                           handleChange
//                         }
//                       />
//                     </EditRow>

//                     <EditRow
//                       icon={
//                         <Droplets size={17} />
//                       }
//                       label={t(
//                         "irrigation_type"
//                       )}
//                       last
//                     >
//                       <input
//                         type="text"
//                         name="irrigationType"
//                         value={
//                           profile.irrigationType ||
//                           ""
//                         }
//                         onChange={
//                           handleChange
//                         }
//                       />
//                     </EditRow>
//                   </>
//                 ) : (
//                   <>
//                     <ProfileRow
//                       icon={
//                         <Droplets size={17} />
//                       }
//                       label={t(
//                         "water_source"
//                       )}
//                       value={
//                         profile.waterSource
//                       }
//                     />

//                     <ProfileRow
//                       icon={
//                         <Mountain size={17} />
//                       }
//                       label={t(
//                         "land_area"
//                       )}
//                       value={
//                         profile.landArea
//                           ? `${profile.landArea} ${
//                               profile.landUnit ||
//                               "Acres"
//                             }`
//                           : "--"
//                       }
//                     />

//                     <ProfileRow
//                       icon={
//                         <Calendar size={17} />
//                       }
//                       label={t(
//                         "experience"
//                       )}
//                       value={
//                         profile.farmingExperience
//                           ? `${profile.farmingExperience} ${t(
//                               "years"
//                             )}`
//                           : "--"
//                       }
//                     />

//                     <ProfileRow
//                       icon={
//                         <Droplets size={17} />
//                       }
//                       label={t(
//                         "irrigation_type"
//                       )}
//                       value={
//                         profile.irrigationType
//                       }
//                       last
//                     />
//                   </>
//                 )}

//               </div>

//             </div>
//           </motion.section>
//         </div>


//         {/* =====================================================
//             FARM LOCATION
//         ===================================================== */}

//         <motion.section
//           initial={{
//             opacity: 0,
//             y: 15,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           className="
//             mt-6
//             bg-white
//             rounded-[18px]
//             border
//             border-[#e5ebe8]
//             shadow-[0_4px_18px_rgba(25,60,44,0.06)]
//             px-6
//             pt-6
//             pb-6
//           "
//         >

//           <CardHeader
//             icon={<MapPin size={22} />}
//             title={t("farm_location")}
//             subtitle={t(
//               "farm_location_desc"
//             )}
//           />


//           {editMode ? (

//             <div
//               className="
//                 grid
//                 md:grid-cols-2
//                 gap-5
//                 mt-5
//               "
//             >

//               <EditInput
//                 label={t("state")}
//                 name="state"
//                 value={profile.state}
//                 onChange={handleChange}
//               />

//               <EditInput
//                 label={t("district")}
//                 name="district"
//                 value={profile.district}
//                 onChange={handleChange}
//               />

//               <EditInput
//                 label={t("village")}
//                 name="village"
//                 value={profile.village}
//                 onChange={handleChange}
//               />

//               <EditInput
//                 label={t("pin_code")}
//                 name="pincode"
//                 value={profile.pincode}
//                 onChange={handleChange}
//               />

//               <EditInput
//                 label="Latitude"
//                 name="latitude"
//                 value={profile.latitude}
//                 onChange={handleChange}
//               />

//               <EditInput
//                 label="Longitude"
//                 name="longitude"
//                 value={profile.longitude}
//                 onChange={handleChange}
//               />

//             </div>

//           ) : (

//             <div
//               className="
//                 grid
//                 xl:grid-cols-[1.12fr_1fr]
//                 gap-5
//                 mt-5
//               "
//             >

//               {/* MAP */}

//               <div
//                 className="
//                   h-[140px]
//                   rounded-xl
//                   overflow-hidden
//                   border
//                   border-[#dce7e2]
//                   bg-[#edf5f0]
//                 "
//               >

//                 <iframe
//                   title="Farm Location"
//                   src={mapUrl}
//                   className="
//                     w-full
//                     h-full
//                     border-0
//                   "
//                   loading="lazy"
//                 />

//               </div>


//               {/* LOCATION CARDS */}

//               <div
//                 className="
//                   grid
//                   grid-cols-4
//                   gap-3
//                 "
//               >

//                 <LocationCard
//                   icon={
//                     <Landmark size={19} />
//                   }
//                   title={t("state")}
//                   value={profile.state}
//                 />

//                 <LocationCard
//                   icon={
//                     <MapPin size={19} />
//                   }
//                   title={t("district")}
//                   value={profile.district}
//                 />

//                 <LocationCard
//                   icon={
//                     <Home size={19} />
//                   }
//                   title={t("village")}
//                   value={profile.village}
//                 />

//                 <LocationCard
//                   icon={
//                     <Building2 size={19} />
//                   }
//                   title={t("pin_code")}
//                   value={profile.pincode}
//                 />

//               </div>

//             </div>

//           )}

//         </motion.section>

//       </div>
//     </div>
//   );
// }


// /* ============================================================
//    CARD HEADER
// ============================================================ */

// function CardHeader({
//   icon,
//   title,
//   subtitle,
// }) {
//   return (
//     <div className="flex items-center gap-3.5">

//       <div
//         className="
//           w-[45px]
//           h-[45px]
//           rounded-xl
//           bg-[#e9f8ef]
//           text-[#159b52]
//           flex
//           items-center
//           justify-center
//           shrink-0
//         "
//       >
//         {icon}
//       </div>

//       <div>

//         <h2
//           className="
//             text-[19px]
//             font-bold
//             text-[#1b3038]
//             leading-tight
//           "
//         >
//           {title}
//         </h2>

//         <p
//           className="
//             text-[12px]
//             text-[#788990]
//             mt-1
//           "
//         >
//           {subtitle}
//         </p>

//       </div>

//     </div>
//   );
// }


// /* ============================================================
//    PROFILE ROW
// ============================================================ */

// function ProfileRow({
//   icon,
//   label,
//   value,
//   last = false,
// }) {
//   return (
//     <div
//       className={`
//         min-h-[54px]
//         py-2.5
//         flex
//         items-center
//         gap-3.5

//         ${
//           !last
//             ? "border-b border-[#edf1ef]"
//             : ""
//         }
//       `}
//     >

//       <div
//         className="
//           w-[35px]
//           h-[35px]
//           rounded-lg
//           bg-[#eff8f2]
//           text-[#159b52]
//           flex
//           items-center
//           justify-center
//           shrink-0
//         "
//       >
//         {icon}
//       </div>

//       <div className="min-w-0">

//         <p
//           className="
//             text-[12px]
//             text-[#7c8c92]
//             leading-none
//           "
//         >
//           {label}
//         </p>

//         <p
//           className="
//             mt-1.5
//             text-[14px]
//             font-semibold
//             text-[#253840]
//             truncate
//           "
//         >
//           {value || "--"}
//         </p>

//       </div>

//     </div>
//   );
// }


// /* ============================================================
//    EDIT ROW
// ============================================================ */

// function EditRow({
//   icon,
//   label,
//   children,
//   last = false,
// }) {
//   return (
//     <div
//       className={`
//         min-h-[58px]
//         py-2.5
//         flex
//         items-center
//         gap-3.5

//         ${
//           !last
//             ? "border-b border-[#edf1ef]"
//             : ""
//         }
//       `}
//     >

//       <div
//         className="
//           w-[35px]
//           h-[35px]
//           rounded-lg
//           bg-[#eff8f2]
//           text-[#159b52]
//           flex
//           items-center
//           justify-center
//           shrink-0
//         "
//       >
//         {icon}
//       </div>

//       <div className="flex-1 min-w-0">

//         <p
//           className="
//             text-[12px]
//             text-[#7c8c92]
//             mb-1.5
//           "
//         >
//           {label}
//         </p>

//         {children}

//       </div>

//     </div>
//   );
// }


// /* ============================================================
//    LOCATION EDIT INPUT
// ============================================================ */

// function EditInput({
//   label,
//   name,
//   value,
//   onChange,
// }) {
//   return (
//     <div>

//       <label
//         className="
//           block
//           text-[12px]
//           font-semibold
//           text-[#687b82]
//           mb-2
//         "
//       >
//         {label}
//       </label>

//       <input
//         type="text"
//         name={name}
//         value={value || ""}
//         onChange={onChange}
//         className="
//           w-full
//           h-[44px]
//           px-3.5
//           rounded-xl
//           border
//           border-[#dce6e1]
//           bg-[#fbfdfc]
//           text-[14px]
//           font-medium
//           text-[#253840]
//           outline-none
//           focus:border-[#159b52]
//           focus:ring-2
//           focus:ring-[#159b52]/10
//         "
//       />

//     </div>
//   );
// }


// /* ============================================================
//    LOCATION CARD
// ============================================================ */

// function LocationCard({
//   icon,
//   title,
//   value,
// }) {
//   return (
//     <motion.div
//       whileHover={{
//         y: -2,
//       }}
//       className="
//         h-[140px]
//         rounded-xl
//         border
//         border-[#d9eee1]
//         bg-gradient-to-b
//         from-[#f3fcf6]
//         to-white
//         flex
//         flex-col
//         items-center
//         justify-center
//         text-center
//         px-2
//       "
//     >

//       <div
//         className="
//           w-[38px]
//           h-[38px]
//           rounded-full
//           bg-[#ddf7e7]
//           text-[#159b52]
//           flex
//           items-center
//           justify-center
//           mb-2.5
//         "
//       >
//         {icon}
//       </div>

//       <p
//         className="
//           text-[12px]
//           text-[#7a898f]
//         "
//       >
//         {title}
//       </p>

//       <p
//         className="
//           mt-1.5
//           text-[14px]
//           font-bold
//           text-[#253840]
//           truncate
//           max-w-full
//           px-1
//         "
//       >
//         {value || "--"}
//       </p>

//     </motion.div>
//   );
// }








// // src/pages/Profile.jsx

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// import {
//   User,
//   Phone,
//   MapPin,
//   Sprout,
//   Tractor,
//   Edit3,
//   Calendar,
//   Droplets,
//   Mountain,
//   ArrowLeft,
//   Globe,
//   Landmark,
//   Home,
//   Building2,
//   Save,
//   X,
//   Loader2,
// } from "lucide-react";

// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";

// import api from "../api";

// export default function Profile() {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();

//   const [profile, setProfile] = useState(null);
//   const [originalProfile, setOriginalProfile] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [editMode, setEditMode] = useState(false);

//   /* =========================================================
//      FETCH PROFILE
//   ========================================================= */

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);

//       const res = await api.get("/farmer");

//       if (res.data.exists) {
//         const loadedProfile = res.data.profile;

//         setProfile(loadedProfile);
//         setOriginalProfile(loadedProfile);

//         if (
//           loadedProfile.language &&
//           loadedProfile.language !== i18n.language
//         ) {
//           await i18n.changeLanguage(loadedProfile.language);
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching profile:", err);

//       toast.error(
//         t("profile_load_failed") || "Unable to load profile"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      HANDLE INPUT CHANGE
//   ========================================================= */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setProfile((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   /* =========================================================
//      EDIT PROFILE
//   ========================================================= */

//   const handleEdit = () => {
//     setOriginalProfile({
//       ...profile,
//     });

//     setEditMode(true);
//   };

//   /* =========================================================
//      CANCEL EDIT
//   ========================================================= */

//   const handleCancel = () => {
//     setProfile({
//       ...originalProfile,
//     });

//     setEditMode(false);
//   };

//   /* =========================================================
//      SAVE PROFILE
//   ========================================================= */

//   const handleSave = async () => {
//     try {
//       setSaving(true);

//       if (!profile.fullName?.trim()) {
//         toast.error(
//           t("please_fill_required_fields") ||
//             "Please enter your full name"
//         );

//         setSaving(false);
//         return;
//       }

//       if (!profile.mobile?.trim()) {
//         toast.error("Please enter your mobile number");

//         setSaving(false);
//         return;
//       }

//       if (!profile.farmName?.trim()) {
//         toast.error("Please enter your farm name");

//         setSaving(false);
//         return;
//       }

//       if (!profile.primaryCrop?.trim()) {
//         toast.error("Please enter your primary crop");

//         setSaving(false);
//         return;
//       }

//       if (!profile.state?.trim() || !profile.district?.trim()) {
//         toast.error("Please enter your location details");

//         setSaving(false);
//         return;
//       }

//       const updatedProfile = {
//         ...profile,
//         language: profile.language || i18n.language,
//       };

//       const response = await api.post(
//         "/farmer",
//         updatedProfile
//       );

//       const savedProfile =
//         response.data?.profile || updatedProfile;

//       setProfile(savedProfile);
//       setOriginalProfile(savedProfile);

//       setEditMode(false);

//       if (
//         savedProfile.language &&
//         savedProfile.language !== i18n.language
//       ) {
//         await i18n.changeLanguage(savedProfile.language);
//       }

//       toast.success(
//         t("profile_saved") ||
//           "Profile updated successfully"
//       );
//     } catch (err) {
//       console.error("Profile update error:", err);

//       toast.error(
//         err.response?.data?.error ||
//           t("profile_save_failed") ||
//           "Failed to update profile"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =========================================================
//      LOADING
//   ========================================================= */

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f3f6f4] flex items-center justify-center">
//         <div className="text-center">
//           <div
//             className="
//               w-10
//               h-10
//               mx-auto
//               border-[3px]
//               border-[#dce5df]
//               border-t-[#08753d]
//               rounded-full
//               animate-spin
//             "
//           />

//           <p
//             className="
//               mt-4
//               text-[15px]
//               font-medium
//               text-[#687771]
//             "
//           >
//             {t("loading_profile") || "Loading profile..."}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /* =========================================================
//      NO PROFILE
//   ========================================================= */

//   if (!profile) {
//     return (
//       <div
//         className="
//           min-h-screen
//           bg-[#f3f6f4]
//           flex
//           items-center
//           justify-center
//           px-5
//         "
//       >
//         <div
//           className="
//             w-full
//             max-w-[430px]
//             bg-white
//             rounded-[22px]
//             border
//             border-[#e0e7e3]
//             shadow-[0_12px_35px_rgba(26,47,38,0.08)]
//             p-10
//             text-center
//           "
//         >
//           <div
//             className="
//               w-16
//               h-16
//               mx-auto
//               rounded-2xl
//               bg-[#edf2ef]
//               text-[#08753d]
//               flex
//               items-center
//               justify-center
//             "
//           >
//             <User size={27} strokeWidth={1.7} />
//           </div>

//           <h2
//             className="
//               mt-5
//               text-[24px]
//               font-bold
//               text-[#20332a]
//             "
//           >
//             {t("profile_title") || "Your Profile"}
//           </h2>

//           <p
//             className="
//               mt-2
//               text-[14px]
//               leading-6
//               text-[#71807a]
//             "
//           >
//             Create your farmer profile to manage
//             your information.
//           </p>

//           <button
//             onClick={() => navigate("/farmer-profile")}
//             className="
//               mt-7
//               h-[45px]
//               px-7
//               rounded-xl
//               bg-[#08753d]
//               text-white
//               text-[14px]
//               font-semibold
//               hover:bg-[#056634]
//               transition
//             "
//           >
//             {t("edit_profile") || "Create Profile"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* =========================================================
//      LANGUAGE
//   ========================================================= */

//   const languageName =
//     i18n.language === "te"
//       ? "తెలుగు"
//       : i18n.language === "hi"
//       ? "हिंदी"
//       : "English";

//   /* =========================================================
//      MAP
//   ========================================================= */

//   const mapLat =
//     Number(profile.latitude) || 16.9891;

//   const mapLng =
//     Number(profile.longitude) || 82.2475;

//   const mapDelta = 0.08;

//   const mapUrl =
//     `https://www.openstreetmap.org/export/embed.html?bbox=` +
//     `${mapLng - mapDelta}%2C${mapLat - mapDelta}%2C` +
//     `${mapLng + mapDelta}%2C${mapLat + mapDelta}` +
//     `&layer=mapnik&marker=${mapLat}%2C${mapLng}`;

//   return (
//     <div
//       className="
//         min-h-screen
//         bg-[#f3f6f4]
//         px-4
//         sm:px-5
//         lg:px-7
//         py-6
//         lg:py-7
//       "
//     >
//       <div className="max-w-[1295px] mx-auto">

//         {/* =====================================================
//             PROFILE HEADER
//         ===================================================== */}

//         <motion.section
//           initial={{
//             opacity: 0,
//             y: 12,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             duration: 0.45,
//             ease: "easeOut",
//           }}
//           className="
//             relative
//             min-h-[215px]
//             overflow-hidden
//             rounded-[22px]
//             border
//             border-[#086c3a]
//             shadow-[0_12px_30px_rgba(5,78,43,0.18)]
//           "
//           style={{
//             background:
//               "linear-gradient(105deg, #056b37 0%, #08753d 48%, #0b8647 100%)",
//           }}
//         >

//           {/* =================================================
//               SUBTLE HEADER HIGHLIGHTS
//           ================================================= */}

//           <div
//             className="
//               absolute
//               -right-[100px]
//               -top-[180px]
//               w-[430px]
//               h-[430px]
//               rounded-full
//               bg-white/[0.035]
//               pointer-events-none
//             "
//           />

//           <div
//             className="
//               absolute
//               right-[80px]
//               -bottom-[230px]
//               w-[400px]
//               h-[400px]
//               rounded-full
//               border
//               border-white/[0.035]
//               pointer-events-none
//             "
//           />

//           <div
//             className="
//               absolute
//               left-[38%]
//               -bottom-[200px]
//               w-[370px]
//               h-[370px]
//               rounded-full
//               bg-black/[0.035]
//               pointer-events-none
//             "
//           />

//           {/* =================================================
//               HEADER CONTENT
//           ================================================= */}

//           <div
//             className="
//               relative
//               z-10
//               min-h-[215px]
//               px-6
//               sm:px-8
//               lg:px-[70px]
//               py-7
//               flex
//               flex-col
//               lg:flex-row
//               items-center
//               justify-between
//               gap-7
//             "
//           >

//             {/* =================================================
//                 PROFILE IDENTITY
//             ================================================= */}

//             <div
//               className="
//                 flex
//                 items-center
//                 gap-5
//                 sm:gap-6
//                 w-full
//                 lg:w-auto
//               "
//             >

//               {/* AVATAR */}

//               <div className="relative shrink-0">

//                 <div
//                   className="
//                     absolute
//                     -inset-[5px]
//                     rounded-full
//                     border
//                     border-white/20
//                   "
//                 />

//                 <div
//                   className="
//                     relative
//                     w-[92px]
//                     h-[92px]
//                     sm:w-[108px]
//                     sm:h-[108px]
//                     rounded-full

//                     bg-white/[0.08]
//                     backdrop-blur-sm

//                     border
//                     border-white/65

//                     flex
//                     items-center
//                     justify-center

//                     text-[39px]
//                     sm:text-[46px]
//                     font-bold
//                     text-white

//                     shadow-[0_8px_24px_rgba(0,0,0,0.16)]
//                   "
//                 >
//                   {profile.fullName
//                     ? profile.fullName
//                         .charAt(0)
//                         .toUpperCase()
//                     : "F"}
//                 </div>

//               </div>

//               {/* NAME */}

//               <div className="min-w-0">

//                 {editMode ? (
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={profile.fullName || ""}
//                     onChange={handleChange}
//                     className="
//                       w-full
//                       max-w-[360px]
//                       h-[46px]
//                       px-4
//                       rounded-xl

//                       bg-white/[0.10]
//                       border
//                       border-white/30

//                       text-[24px]
//                       sm:text-[28px]
//                       font-bold
//                       text-white

//                       outline-none

//                       placeholder:text-white/50

//                       focus:border-white/55
//                       focus:bg-white/[0.13]
//                     "
//                   />
//                 ) : (
//                   <h1
//                     className="
//                       text-[29px]
//                       sm:text-[33px]
//                       lg:text-[35px]

//                       leading-[1.12]

//                       font-bold
//                       tracking-[-0.7px]

//                       text-white
//                     "
//                   >
//                     {profile.fullName || "--"}
//                   </h1>
//                 )}

//                 <div
//                   className="
//                     flex
//                     items-center
//                     gap-2
//                     mt-2.5
//                   "
//                 >
//                   <span
//                     className="
//                       w-[7px]
//                       h-[7px]
//                       rounded-full
//                       bg-[#c4e8d3]
//                       shadow-[0_0_8px_rgba(196,232,211,0.35)]
//                     "
//                   />

//                   <p
//                     className="
//                       text-[14px]
//                       sm:text-[15px]
//                       text-[#e0f0e7]
//                       font-medium
//                     "
//                   >
//                     {t("smart_farmer") ||
//                       "Smart Farmer"}
//                   </p>
//                 </div>

//               </div>

//             </div>


//             {/* =================================================
//                 ACTION BUTTONS
//             ================================================= */}

//             <div
//               className="
//                 flex
//                 items-center
//                 justify-end
//                 gap-3
//                 w-full
//                 lg:w-auto
//                 shrink-0
//               "
//             >

//               {!editMode ? (
//                 <>
//                   {/* DASHBOARD */}

//                   <button
//                     type="button"
//                     onClick={() =>
//                       navigate("/dashboard")
//                     }
//                     className="
//                       group

//                       h-[46px]
//                       min-w-[124px]
//                       px-[18px]

//                       rounded-[11px]

//                       bg-white
//                       border
//                       border-white

//                       text-[#08753d]
//                       text-[14px]
//                       font-semibold

//                       flex
//                       items-center
//                       justify-center
//                       gap-2

//                       shadow-[0_5px_15px_rgba(0,0,0,0.13)]

//                       transition-all
//                       duration-200

//                       hover:bg-[#f7faf8]
//                       hover:-translate-y-[1px]
//                       hover:shadow-[0_7px_18px_rgba(0,0,0,0.16)]

//                       active:translate-y-0

//                       focus:outline-none
//                       focus:ring-2
//                       focus:ring-white/40
//                     "
//                   >
//                     <ArrowLeft
//                       size={17}
//                       strokeWidth={2.2}
//                       className="
//                         transition-transform
//                         duration-200
//                         group-hover:-translate-x-[2px]
//                       "
//                     />

//                     <span className="whitespace-nowrap">
//                       {t("nav_dashboard") ||
//                         "Dashboard"}
//                     </span>
//                   </button>


//                   {/* EDIT PROFILE */}

//                   <button
//                     type="button"
//                     onClick={handleEdit}
//                     className="
//                       group

//                       h-[46px]
//                       min-w-[132px]
//                       px-[18px]

//                       rounded-[11px]

//                       bg-white/[0.08]
//                       border
//                       border-white/45

//                       text-white
//                       text-[14px]
//                       font-semibold

//                       flex
//                       items-center
//                       justify-center
//                       gap-2

//                       backdrop-blur-sm

//                       shadow-[0_4px_14px_rgba(0,0,0,0.07)]

//                       transition-all
//                       duration-200

//                       hover:bg-white/[0.15]
//                       hover:border-white/65
//                       hover:-translate-y-[1px]
//                       hover:shadow-[0_7px_18px_rgba(0,0,0,0.12)]

//                       active:translate-y-0

//                       focus:outline-none
//                       focus:ring-2
//                       focus:ring-white/30
//                     "
//                   >
//                     <Edit3
//                       size={17}
//                       strokeWidth={2}
//                       className="
//                         transition-transform
//                         duration-200
//                         group-hover:scale-[1.04]
//                       "
//                     />

//                     <span className="whitespace-nowrap">
//                       {t("edit_profile") ||
//                         "Edit Profile"}
//                     </span>
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   {/* CANCEL */}

//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     disabled={saving}
//                     className="
//                       h-[46px]
//                       min-w-[100px]
//                       px-[18px]

//                       rounded-[11px]

//                       bg-white
//                       border
//                       border-white

//                       text-[#40534a]
//                       text-[14px]
//                       font-semibold

//                       flex
//                       items-center
//                       justify-center
//                       gap-2

//                       shadow-[0_5px_15px_rgba(0,0,0,0.12)]

//                       transition-all
//                       duration-200

//                       hover:bg-[#f7f9f8]
//                       hover:-translate-y-[1px]

//                       active:translate-y-0

//                       disabled:opacity-50
//                       disabled:cursor-not-allowed

//                       focus:outline-none
//                     "
//                   >
//                     <X
//                       size={17}
//                       strokeWidth={2.1}
//                     />

//                     <span>
//                       Cancel
//                     </span>
//                   </button>


//                   {/* SAVE */}

//                   <button
//                     type="button"
//                     onClick={handleSave}
//                     disabled={saving}
//                     className="
//                       group

//                       h-[46px]
//                       min-w-[138px]
//                       px-[18px]

//                       rounded-[11px]

//                       bg-[#eaf4ee]
//                       border
//                       border-white/70

//                       text-[#08753d]
//                       text-[14px]
//                       font-semibold

//                       flex
//                       items-center
//                       justify-center
//                       gap-2

//                       shadow-[0_5px_15px_rgba(0,0,0,0.10)]

//                       transition-all
//                       duration-200

//                       hover:bg-white
//                       hover:-translate-y-[1px]
//                       hover:shadow-[0_7px_18px_rgba(0,0,0,0.13)]

//                       active:translate-y-0

//                       disabled:opacity-50
//                       disabled:cursor-not-allowed

//                       focus:outline-none
//                     "
//                   >
//                     {saving ? (
//                       <Loader2
//                         size={17}
//                         className="animate-spin"
//                       />
//                     ) : (
//                       <Save
//                         size={17}
//                         strokeWidth={2.1}
//                       />
//                     )}

//                     <span className="whitespace-nowrap">
//                       {saving
//                         ? "Saving..."
//                         : "Save Changes"}
//                     </span>
//                   </button>
//                 </>
//               )}

//             </div>

//           </div>
//         </motion.section>


//         {/* =====================================================
//             PERSONAL + FARM INFORMATION
//         ===================================================== */}

//         <div
//           className="
//             grid
//             lg:grid-cols-2
//             gap-5
//             mt-6
//           "
//         >

//           {/* PERSONAL INFORMATION */}

//           <motion.section
//             initial={{
//               opacity: 0,
//               x: -12,
//             }}
//             animate={{
//               opacity: 1,
//               x: 0,
//             }}
//             transition={{
//               duration: 0.4,
//             }}
//             className="
//               bg-white
//               min-h-[390px]
//               rounded-[20px]
//               border
//               border-[#e0e7e3]
//               shadow-[0_7px_25px_rgba(30,57,45,0.055)]
//               px-6
//               sm:px-7
//               pt-6
//               pb-5
//             "
//           >

//             <CardHeader
//               icon={<User size={21} />}
//               title={
//                 t("personal_information") ||
//                 "Personal Information"
//               }
//               subtitle={
//                 t("personal_information_desc") ||
//                 "Basic details about the farmer"
//               }
//             />

//             <div className="mt-4">

//               {editMode ? (
//                 <>
//                   <EditRow
//                     icon={<User size={17} />}
//                     label={
//                       t("full_name") ||
//                       "Full Name"
//                     }
//                   >
//                     <StyledInput
//                       type="text"
//                       name="fullName"
//                       value={profile.fullName || ""}
//                       onChange={handleChange}
//                     />
//                   </EditRow>

//                   <EditRow
//                     icon={<Phone size={17} />}
//                     label={
//                       t("mobile_number") ||
//                       "Mobile Number"
//                     }
//                   >
//                     <StyledInput
//                       type="text"
//                       name="mobile"
//                       value={profile.mobile || ""}
//                       onChange={handleChange}
//                     />
//                   </EditRow>

//                   <EditRow
//                     icon={<Calendar size={17} />}
//                     label={
//                       t("age") || "Age"
//                     }
//                   >
//                     <StyledInput
//                       type="number"
//                       name="age"
//                       value={profile.age || ""}
//                       onChange={handleChange}
//                     />
//                   </EditRow>

//                   <EditRow
//                     icon={<User size={17} />}
//                     label={
//                       t("gender") ||
//                       "Gender"
//                     }
//                   >
//                     <StyledSelect
//                       name="gender"
//                       value={profile.gender || ""}
//                       onChange={handleChange}
//                     >
//                       <option value="">
//                         Select Gender
//                       </option>

//                       <option value="Male">
//                         Male
//                       </option>

//                       <option value="Female">
//                         Female
//                       </option>

//                       <option value="Other">
//                         Other
//                       </option>
//                     </StyledSelect>
//                   </EditRow>

//                   <EditRow
//                     icon={<Globe size={17} />}
//                     label={
//                       t("current_language") ||
//                       "Current Language"
//                     }
//                     last
//                   >
//                     <StyledSelect
//                       name="language"
//                       value={
//                         profile.language ||
//                         i18n.language
//                       }
//                       onChange={handleChange}
//                     >
//                       <option value="en">
//                         English
//                       </option>

//                       <option value="te">
//                         తెలుగు
//                       </option>

//                       <option value="hi">
//                         हिंदी
//                       </option>
//                     </StyledSelect>
//                   </EditRow>
//                 </>
//               ) : (
//                 <>
//                   <ProfileRow
//                     icon={<User size={17} />}
//                     label={
//                       t("full_name") ||
//                       "Full Name"
//                     }
//                     value={profile.fullName}
//                   />

//                   <ProfileRow
//                     icon={<Phone size={17} />}
//                     label={
//                       t("mobile_number") ||
//                       "Mobile Number"
//                     }
//                     value={profile.mobile}
//                   />

//                   <ProfileRow
//                     icon={<Calendar size={17} />}
//                     label={t("age") || "Age"}
//                     value={profile.age}
//                   />

//                   <ProfileRow
//                     icon={<User size={17} />}
//                     label={
//                       t("gender") ||
//                       "Gender"
//                     }
//                     value={profile.gender}
//                   />

//                   <ProfileRow
//                     icon={<Globe size={17} />}
//                     label={
//                       t("current_language") ||
//                       "Current Language"
//                     }
//                     value={languageName}
//                     last
//                   />
//                 </>
//               )}

//             </div>

//           </motion.section>


//           {/* FARM INFORMATION */}

//           <motion.section
//             initial={{
//               opacity: 0,
//               x: 12,
//             }}
//             animate={{
//               opacity: 1,
//               x: 0,
//             }}
//             transition={{
//               duration: 0.4,
//             }}
//             className="
//               bg-white
//               min-h-[390px]
//               rounded-[20px]
//               border
//               border-[#e0e7e3]
//               shadow-[0_7px_25px_rgba(30,57,45,0.055)]
//               px-6
//               sm:px-7
//               pt-6
//               pb-5
//             "
//           >

//             <CardHeader
//               icon={<Tractor size={21} />}
//               title={
//                 t("farm_information") ||
//                 "Farm Information"
//               }
//               subtitle={
//                 t("farm_information_desc") ||
//                 "Tell us about your farm"
//               }
//             />

//             <div
//               className="
//                 grid
//                 grid-cols-1
//                 sm:grid-cols-2
//                 gap-x-7
//                 mt-4
//               "
//             >

//               {/* LEFT */}

//               <div>

//                 {editMode ? (
//                   <>
//                     <EditRow
//                       icon={<Tractor size={17} />}
//                       label={
//                         t("farm_name") ||
//                         "Farm Name"
//                       }
//                     >
//                       <StyledInput
//                         type="text"
//                         name="farmName"
//                         value={
//                           profile.farmName || ""
//                         }
//                         onChange={handleChange}
//                       />
//                     </EditRow>

//                     <EditRow
//                       icon={<Sprout size={17} />}
//                       label={
//                         t("primary_crop") ||
//                         "Primary Crop"
//                       }
//                     >
//                       <StyledInput
//                         type="text"
//                         name="primaryCrop"
//                         value={
//                           profile.primaryCrop || ""
//                         }
//                         onChange={handleChange}
//                       />
//                     </EditRow>

//                     <EditRow
//                       icon={<Sprout size={17} />}
//                       label={
//                         t("secondary_crop") ||
//                         "Secondary Crop"
//                       }
//                     >
//                       <StyledInput
//                         type="text"
//                         name="secondaryCrop"
//                         value={
//                           profile.secondaryCrop || ""
//                         }
//                         onChange={handleChange}
//                       />
//                     </EditRow>

//                     <EditRow
//                       icon={<Mountain size={17} />}
//                       label={
//                         t("soil_type") ||
//                         "Soil Type"
//                       }
//                       last
//                     >
//                       <StyledInput
//                         type="text"
//                         name="soilType"
//                         value={
//                           profile.soilType || ""
//                         }
//                         onChange={handleChange}
//                       />
//                     </EditRow>
//                   </>
//                 ) : (
//                   <>
//                     <ProfileRow
//                       icon={<Tractor size={17} />}
//                       label={
//                         t("farm_name") ||
//                         "Farm Name"
//                       }
//                       value={
//                         profile.farmName
//                       }
//                     />

//                     <ProfileRow
//                       icon={<Sprout size={17} />}
//                       label={
//                         t("primary_crop") ||
//                         "Primary Crop"
//                       }
//                       value={
//                         profile.primaryCrop
//                       }
//                     />

//                     <ProfileRow
//                       icon={<Sprout size={17} />}
//                       label={
//                         t("secondary_crop") ||
//                         "Secondary Crop"
//                       }
//                       value={
//                         profile.secondaryCrop
//                       }
//                     />

//                     <ProfileRow
//                       icon={<Mountain size={17} />}
//                       label={
//                         t("soil_type") ||
//                         "Soil Type"
//                       }
//                       value={
//                         profile.soilType
//                       }
//                       last
//                     />
//                   </>
//                 )}

//               </div>


//               {/* RIGHT */}

//               <div>

//                 {editMode ? (
//                   <>
//                     <EditRow
//                       icon={<Droplets size={17} />}
//                       label={
//                         t("water_source") ||
//                         "Water Source"
//                       }
//                     >
//                       <StyledInput
//                         type="text"
//                         name="waterSource"
//                         value={
//                           profile.waterSource ||
//                           ""
//                         }
//                         onChange={handleChange}
//                       />
//                     </EditRow>

//                     <EditRow
//                       icon={<Mountain size={17} />}
//                       label={
//                         t("land_area") ||
//                         "Land Area"
//                       }
//                     >
//                       <div className="flex gap-2">

//                         <StyledInput
//                           type="number"
//                           name="landArea"
//                           value={
//                             profile.landArea ||
//                             ""
//                           }
//                           onChange={handleChange}
//                           className="!w-[85px]"
//                         />

//                         <StyledSelect
//                           name="landUnit"
//                           value={
//                             profile.landUnit ||
//                             "Acres"
//                           }
//                           onChange={handleChange}
//                           className="!w-[110px]"
//                         >
//                           <option value="Acres">
//                             Acres
//                           </option>

//                           <option value="Hectares">
//                             Hectares
//                           </option>
//                         </StyledSelect>

//                       </div>
//                     </EditRow>

//                     <EditRow
//                       icon={<Calendar size={17} />}
//                       label={
//                         t("experience") ||
//                         "Experience"
//                       }
//                     >
//                       <StyledInput
//                         type="number"
//                         name="farmingExperience"
//                         value={
//                           profile.farmingExperience ||
//                           ""
//                         }
//                         onChange={handleChange}
//                       />
//                     </EditRow>

//                     <EditRow
//                       icon={<Droplets size={17} />}
//                       label={
//                         t("irrigation_type") ||
//                         "Irrigation Type"
//                       }
//                       last
//                     >
//                       <StyledInput
//                         type="text"
//                         name="irrigationType"
//                         value={
//                           profile.irrigationType ||
//                           ""
//                         }
//                         onChange={handleChange}
//                       />
//                     </EditRow>
//                   </>
//                 ) : (
//                   <>
//                     <ProfileRow
//                       icon={<Droplets size={17} />}
//                       label={
//                         t("water_source") ||
//                         "Water Source"
//                       }
//                       value={
//                         profile.waterSource
//                       }
//                     />

//                     <ProfileRow
//                       icon={<Mountain size={17} />}
//                       label={
//                         t("land_area") ||
//                         "Land Area"
//                       }
//                       value={
//                         profile.landArea
//                           ? `${profile.landArea} ${
//                               profile.landUnit ||
//                               "Acres"
//                             }`
//                           : "--"
//                       }
//                     />

//                     <ProfileRow
//                       icon={<Calendar size={17} />}
//                       label={
//                         t("experience") ||
//                         "Experience"
//                       }
//                       value={
//                         profile.farmingExperience
//                           ? `${profile.farmingExperience} ${
//                               t("years") ||
//                               "years"
//                             }`
//                           : "--"
//                       }
//                     />

//                     <ProfileRow
//                       icon={<Droplets size={17} />}
//                       label={
//                         t("irrigation_type") ||
//                         "Irrigation Type"
//                       }
//                       value={
//                         profile.irrigationType
//                       }
//                       last
//                     />
//                   </>
//                 )}

//               </div>

//             </div>

//           </motion.section>

//         </div>


//         {/* =====================================================
//             FARM LOCATION
//         ===================================================== */}

//         <motion.section
//           initial={{
//             opacity: 0,
//             y: 12,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             duration: 0.45,
//           }}
//           className="
//             mt-6
//             bg-white
//             rounded-[20px]
//             border
//             border-[#e0e7e3]
//             shadow-[0_7px_25px_rgba(30,57,45,0.055)]
//             px-6
//             sm:px-7
//             pt-6
//             pb-6
//           "
//         >

//           <CardHeader
//             icon={<MapPin size={21} />}
//             title={
//               t("farm_location") ||
//               "Farm Location"
//             }
//             subtitle={
//               t("farm_location_desc") ||
//               "Where is your farm located?"
//             }
//           />

//           {editMode ? (
//             <div
//               className="
//                 grid
//                 sm:grid-cols-2
//                 lg:grid-cols-3
//                 gap-5
//                 mt-6
//               "
//             >

//               <EditInput
//                 label={
//                   t("state") || "State"
//                 }
//                 name="state"
//                 value={profile.state}
//                 onChange={handleChange}
//               />

//               <EditInput
//                 label={
//                   t("district") ||
//                   "District"
//                 }
//                 name="district"
//                 value={profile.district}
//                 onChange={handleChange}
//               />

//               <EditInput
//                 label={
//                   t("village") ||
//                   "Village"
//                 }
//                 name="village"
//                 value={profile.village}
//                 onChange={handleChange}
//               />

//               <EditInput
//                 label={
//                   t("pin_code") ||
//                   "PIN Code"
//                 }
//                 name="pincode"
//                 value={profile.pincode}
//                 onChange={handleChange}
//               />

//               <EditInput
//                 label="Latitude"
//                 name="latitude"
//                 value={profile.latitude}
//                 onChange={handleChange}
//               />

//               <EditInput
//                 label="Longitude"
//                 name="longitude"
//                 value={profile.longitude}
//                 onChange={handleChange}
//               />

//             </div>
//           ) : (
//             <div
//               className="
//                 grid
//                 xl:grid-cols-[1.15fr_1fr]
//                 gap-5
//                 mt-6
//               "
//             >

//               {/* MAP */}

//               <div
//                 className="
//                   h-[180px]
//                   rounded-[15px]
//                   overflow-hidden
//                   border
//                   border-[#dce5e0]
//                   bg-[#edf2ef]
//                 "
//               >
//                 <iframe
//                   title="Farm Location"
//                   src={mapUrl}
//                   className="
//                     w-full
//                     h-full
//                     border-0
//                   "
//                   loading="lazy"
//                 />
//               </div>


//               {/* LOCATION CARDS */}

//               <div
//                 className="
//                   grid
//                   grid-cols-2
//                   gap-3
//                 "
//               >

//                 <LocationCard
//                   icon={
//                     <Landmark size={19} />
//                   }
//                   title={
//                     t("state") || "State"
//                   }
//                   value={profile.state}
//                 />

//                 <LocationCard
//                   icon={
//                     <MapPin size={19} />
//                   }
//                   title={
//                     t("district") ||
//                     "District"
//                   }
//                   value={
//                     profile.district
//                   }
//                 />

//                 <LocationCard
//                   icon={
//                     <Home size={19} />
//                   }
//                   title={
//                     t("village") ||
//                     "Village"
//                   }
//                   value={
//                     profile.village
//                   }
//                 />

//                 <LocationCard
//                   icon={
//                     <Building2 size={19} />
//                   }
//                   title={
//                     t("pin_code") ||
//                     "PIN Code"
//                   }
//                   value={
//                     profile.pincode
//                   }
//                 />

//               </div>

//             </div>
//           )}

//         </motion.section>

//       </div>
//     </div>
//   );
// }


// /* ============================================================
//    CARD HEADER
// ============================================================ */

// function CardHeader({
//   icon,
//   title,
//   subtitle,
// }) {
//   return (
//     <div className="flex items-center gap-3.5">

//       <div
//         className="
//           w-[44px]
//           h-[44px]
//           rounded-[12px]
//           bg-[#edf2ef]
//           border
//           border-[#e0e7e3]
//           text-[#08753d]
//           flex
//           items-center
//           justify-center
//           shrink-0
//         "
//       >
//         {icon}
//       </div>

//       <div className="min-w-0">

//         <h2
//           className="
//             text-[19px]
//             font-bold
//             text-[#20342b]
//             leading-tight
//             tracking-[-0.25px]
//           "
//         >
//           {title}
//         </h2>

//         <p
//           className="
//             text-[12px]
//             sm:text-[13px]
//             text-[#78847f]
//             mt-1
//           "
//         >
//           {subtitle}
//         </p>

//       </div>

//     </div>
//   );
// }


// /* ============================================================
//    PROFILE ROW
// ============================================================ */

// function ProfileRow({
//   icon,
//   label,
//   value,
//   last = false,
// }) {
//   return (
//     <div
//       className={`
//         min-h-[57px]
//         py-2.5
//         flex
//         items-center
//         gap-3.5
//         ${
//           !last
//             ? "border-b border-[#edf1ee]"
//             : ""
//         }
//       `}
//     >

//       <div
//         className="
//           w-[35px]
//           h-[35px]
//           rounded-[9px]
//           bg-[#f0f4f1]
//           border
//           border-[#e4eae6]
//           text-[#08753d]
//           flex
//           items-center
//           justify-center
//           shrink-0
//         "
//       >
//         {icon}
//       </div>

//       <div className="min-w-0">

//         <p
//           className="
//             text-[12px]
//             text-[#7c8883]
//             leading-none
//           "
//         >
//           {label}
//         </p>

//         <p
//           className="
//             mt-1.5
//             text-[14px]
//             font-semibold
//             text-[#293b33]
//             truncate
//           "
//         >
//           {value || "--"}
//         </p>

//       </div>

//     </div>
//   );
// }


// /* ============================================================
//    EDIT ROW
// ============================================================ */

// function EditRow({
//   icon,
//   label,
//   children,
//   last = false,
// }) {
//   return (
//     <div
//       className={`
//         min-h-[59px]
//         py-2.5
//         flex
//         items-center
//         gap-3.5
//         ${
//           !last
//             ? "border-b border-[#edf1ee]"
//             : ""
//         }
//       `}
//     >

//       <div
//         className="
//           w-[35px]
//           h-[35px]
//           rounded-[9px]
//           bg-[#f0f4f1]
//           border
//           border-[#e4eae6]
//           text-[#08753d]
//           flex
//           items-center
//           justify-center
//           shrink-0
//         "
//       >
//         {icon}
//       </div>

//       <div className="flex-1 min-w-0">

//         <p
//           className="
//             text-[12px]
//             text-[#7c8883]
//             mb-1.5
//           "
//         >
//           {label}
//         </p>

//         {children}

//       </div>

//     </div>
//   );
// }


// /* ============================================================
//    STYLED INPUT
// ============================================================ */

// function StyledInput({
//   className = "",
//   ...props
// }) {
//   return (
//     <input
//       {...props}
//       className={`
//         w-full
//         h-[39px]
//         px-3
//         rounded-[9px]
//         border
//         border-[#d8e1dc]
//         bg-[#fafcfb]
//         text-[14px]
//         font-medium
//         text-[#293b33]
//         outline-none
//         transition

//         focus:border-[#08753d]
//         focus:bg-white
//         focus:ring-2
//         focus:ring-[#08753d]/10

//         placeholder:text-[#9aa49f]

//         ${className}
//       `}
//     />
//   );
// }


// /* ============================================================
//    STYLED SELECT
// ============================================================ */

// function StyledSelect({
//   className = "",
//   children,
//   ...props
// }) {
//   return (
//     <select
//       {...props}
//       className={`
//         w-full
//         h-[39px]
//         px-3
//         rounded-[9px]
//         border
//         border-[#d8e1dc]
//         bg-[#fafcfb]
//         text-[14px]
//         font-medium
//         text-[#293b33]
//         outline-none
//         cursor-pointer
//         transition

//         focus:border-[#08753d]
//         focus:bg-white
//         focus:ring-2
//         focus:ring-[#08753d]/10

//         ${className}
//       `}
//     >
//       {children}
//     </select>
//   );
// }


// /* ============================================================
//    LOCATION EDIT INPUT
// ============================================================ */

// function EditInput({
//   label,
//   name,
//   value,
//   onChange,
// }) {
//   return (
//     <div>

//       <label
//         className="
//           block
//           text-[12px]
//           font-semibold
//           text-[#687771]
//           mb-2
//         "
//       >
//         {label}
//       </label>

//       <input
//         type="text"
//         name={name}
//         value={value || ""}
//         onChange={onChange}
//         className="
//           w-full
//           h-[43px]
//           px-3.5
//           rounded-xl
//           border
//           border-[#d8e1dc]
//           bg-[#fafcfb]
//           text-[14px]
//           font-medium
//           text-[#293b33]
//           outline-none
//           transition

//           focus:border-[#08753d]
//           focus:bg-white
//           focus:ring-2
//           focus:ring-[#08753d]/10
//         "
//       />

//     </div>
//   );
// }


// /* ============================================================
//    LOCATION CARD
// ============================================================ */

// function LocationCard({
//   icon,
//   title,
//   value,
// }) {
//   return (
//     <motion.div
//       whileHover={{
//         y: -2,
//       }}
//       transition={{
//         duration: 0.2,
//       }}
//       className="
//         min-h-[88px]
//         rounded-[13px]
//         border
//         border-[#dfe7e2]
//         bg-[#fbfcfb]

//         flex
//         items-center
//         gap-3

//         px-4

//         transition

//         hover:border-[#ccd9d1]
//         hover:bg-[#f8faf9]
//       "
//     >

//       <div
//         className="
//           w-[36px]
//           h-[36px]
//           rounded-[9px]
//           bg-[#edf2ef]
//           border
//           border-[#e0e7e3]
//           text-[#08753d]

//           flex
//           items-center
//           justify-center
//           shrink-0
//         "
//       >
//         {icon}
//       </div>

//       <div className="min-w-0">

//         <p
//           className="
//             text-[11px]
//             font-medium
//             text-[#7b8782]
//           "
//         >
//           {title}
//         </p>

//         <p
//           className="
//             mt-1
//             text-[14px]
//             font-bold
//             text-[#293b33]
//             truncate
//           "
//         >
//           {value || "--"}
//         </p>

//       </div>

//     </motion.div>
//   );
// }








// src/pages/Profile.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  User,
  Phone,
  MapPin,
  Sprout,
  Tractor,
  Edit3,
  Calendar,
  Droplets,
  Mountain,
  ArrowLeft,
  Globe,
  Landmark,
  Home,
  Building2,
  Save,
  X,
  Loader2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import api from "../api";

export default function Profile() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  /* =========================================================
     FETCH PROFILE
  ========================================================= */

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get("/farmer");

      if (res.data.exists) {
        const loadedProfile = res.data.profile;

        /*
         * IMPORTANT:
         *
         * Do NOT change i18n language using the language
         * stored in the database when this page opens.
         *
         * Example:
         *
         * Database language = "en"
         * Current Topbar language = "te"
         *
         * Previously Profile would change the whole website
         * back to English.
         *
         * Now the currently active i18next language is preserved.
         */

        const activeLanguage =
          i18n.resolvedLanguage ||
          i18n.language ||
          "en";

        const profileWithActiveLanguage = {
          ...loadedProfile,
          language: activeLanguage,
        };

        setProfile(profileWithActiveLanguage);
        setOriginalProfile(profileWithActiveLanguage);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);

      toast.error(
        t("profile_load_failed") ||
          "Unable to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     HANDLE INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    /*
     * When language is changed inside My Profile,
     * immediately change the global i18next language.
     */

    if (name === "language") {
      i18n.changeLanguage(value);

      document.documentElement.lang = value;

      /*
       * Notify other FarmXpert components immediately.
       */

      window.dispatchEvent(
        new CustomEvent(
          "farmxpert:languageChanged",
          {
            detail: {
              language: value,
            },
          }
        )
      );
    }

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     EDIT PROFILE
  ========================================================= */

  const handleEdit = () => {
    setOriginalProfile({
      ...profile,
    });

    setEditMode(true);
  };

  /* =========================================================
     CANCEL EDIT
  ========================================================= */

  const handleCancel = () => {
    setProfile({
      ...originalProfile,
    });

    setEditMode(false);
  };

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const handleSave = async () => {
    try {
      setSaving(true);

      if (!profile.fullName?.trim()) {
        toast.error(
          t("please_fill_required_fields") ||
            "Please enter your full name"
        );

        setSaving(false);
        return;
      }

      if (!profile.mobile?.trim()) {
        toast.error(
          t("please_enter_mobile") ||
            "Please enter your mobile number"
        );

        setSaving(false);
        return;
      }

      if (!profile.farmName?.trim()) {
        toast.error(
          t("please_enter_farm_name") ||
            "Please enter your farm name"
        );

        setSaving(false);
        return;
      }

      if (!profile.primaryCrop?.trim()) {
        toast.error(
          t("please_enter_primary_crop") ||
            "Please enter your primary crop"
        );

        setSaving(false);
        return;
      }

      if (
        !profile.state?.trim() ||
        !profile.district?.trim()
      ) {
        toast.error(
          t("please_enter_location") ||
            "Please enter your location details"
        );

        setSaving(false);
        return;
      }

      /*
       * IMPORTANT:
       *
       * Always save the currently active i18next language.
       *
       * This prevents an old database language from becoming
       * the active website language.
       */

      const activeLanguage =
        i18n.resolvedLanguage ||
        i18n.language ||
        "en";

      const updatedProfile = {
        ...profile,
        language: activeLanguage,
      };

      const response = await api.post(
        "/farmer",
        updatedProfile
      );

      const savedProfile =
        response.data?.profile ||
        updatedProfile;

      /*
       * Keep the currently selected language in the local
       * profile state as well.
       */

      const profileToStore = {
        ...savedProfile,
        language: activeLanguage,
      };

      setProfile(profileToStore);

      setOriginalProfile(profileToStore);

      setEditMode(false);

      /*
       * Make sure the document language is synchronized.
       */

      document.documentElement.lang =
        activeLanguage;

      /*
       * DO NOT call:
       *
       * i18n.changeLanguage(savedProfile.language)
       *
       * here.
       *
       * The currently active language is already correct.
       */

      toast.success(
        t("profile_saved") ||
          "Profile updated successfully"
      );
    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );

      toast.error(
        err.response?.data?.error ||
          t("profile_save_failed") ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f6f4] flex items-center justify-center">
        <div className="text-center">

          <div
            className="
              w-10
              h-10
              mx-auto
              border-[3px]
              border-[#dce5df]
              border-t-[#08753d]
              rounded-full
              animate-spin
            "
          />

          <p
            className="
              mt-4
              text-[15px]
              font-medium
              text-[#687771]
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
     NO PROFILE
  ========================================================= */

  if (!profile) {
    return (
      <div
        className="
          min-h-screen
          bg-[#f3f6f4]
          flex
          items-center
          justify-center
          px-5
        "
      >

        <div
          className="
            w-full
            max-w-[430px]
            bg-white
            rounded-[22px]
            border
            border-[#e0e7e3]
            shadow-[0_12px_35px_rgba(26,47,38,0.08)]
            p-10
            text-center
          "
        >

          <div
            className="
              w-16
              h-16
              mx-auto
              rounded-2xl
              bg-[#edf2ef]
              text-[#08753d]
              flex
              items-center
              justify-center
            "
          >
            <User
              size={27}
              strokeWidth={1.7}
            />
          </div>

          <h2
            className="
              mt-5
              text-[24px]
              font-bold
              text-[#20332a]
            "
          >
            {t("profile_title") ||
              "Your Profile"}
          </h2>

          <p
            className="
              mt-2
              text-[14px]
              leading-6
              text-[#71807a]
            "
          >
            {t("create_profile_description") ||
              "Create your farmer profile to manage your information."}
          </p>

          <button
            onClick={() =>
              navigate("/farmer-profile")
            }
            className="
              mt-7
              h-[45px]
              px-7
              rounded-xl
              bg-[#08753d]
              text-white
              text-[14px]
              font-semibold
              hover:bg-[#056634]
              transition
            "
          >
            {t("edit_profile") ||
              "Create Profile"}
          </button>

        </div>

      </div>
    );
  }

  /* =========================================================
     LANGUAGE
  ========================================================= */

  const currentLanguage =
    i18n.resolvedLanguage ||
    i18n.language ||
    "en";

  const languageName =
    currentLanguage === "te"
      ? "తెలుగు"
      : currentLanguage === "hi"
      ? "हिंदी"
      : "English";

  /* =========================================================
     MAP
  ========================================================= */

  const mapLat =
    Number(profile.latitude) ||
    16.9891;

  const mapLng =
    Number(profile.longitude) ||
    82.2475;

  const mapDelta = 0.08;

  const mapUrl =
    `https://www.openstreetmap.org/export/embed.html?bbox=` +
    `${mapLng - mapDelta}%2C${mapLat - mapDelta}%2C` +
    `${mapLng + mapDelta}%2C${mapLat + mapDelta}` +
    `&layer=mapnik&marker=${mapLat}%2C${mapLng}`;

  return (
    <div
      className="
        min-h-screen
        bg-[#f3f6f4]
        px-4
        sm:px-5
        lg:px-7
        py-6
        lg:py-7
      "
    >

      <div className="max-w-[1295px] mx-auto">

        {/* =====================================================
            PROFILE HEADER
        ===================================================== */}

        <motion.section
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
            ease: "easeOut",
          }}
          className="
            relative
            min-h-[215px]
            overflow-hidden
            rounded-[22px]
            border
            border-[#086c3a]
            shadow-[0_12px_30px_rgba(5,78,43,0.18)]
          "
          style={{
            background:
              "linear-gradient(105deg, #056b37 0%, #08753d 48%, #0b8647 100%)",
          }}
        >

          {/* =================================================
              SUBTLE HEADER HIGHLIGHTS
          ================================================= */}

          <div
            className="
              absolute
              -right-[100px]
              -top-[180px]
              w-[430px]
              h-[430px]
              rounded-full
              bg-white/[0.035]
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              right-[80px]
              -bottom-[230px]
              w-[400px]
              h-[400px]
              rounded-full
              border
              border-white/[0.035]
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              left-[38%]
              -bottom-[200px]
              w-[370px]
              h-[370px]
              rounded-full
              bg-black/[0.035]
              pointer-events-none
            "
          />

          {/* =================================================
              HEADER CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              min-h-[215px]
              px-6
              sm:px-8
              lg:px-[70px]
              py-7
              flex
              flex-col
              lg:flex-row
              items-center
              justify-between
              gap-7
            "
          >

            {/* =================================================
                PROFILE IDENTITY
            ================================================= */}

            <div
              className="
                flex
                items-center
                gap-5
                sm:gap-6
                w-full
                lg:w-auto
              "
            >

              {/* AVATAR */}

              <div className="relative shrink-0">

                <div
                  className="
                    absolute
                    -inset-[5px]
                    rounded-full
                    border
                    border-white/20
                  "
                />

                <div
                  className="
                    relative
                    w-[92px]
                    h-[92px]
                    sm:w-[108px]
                    sm:h-[108px]
                    rounded-full
                    bg-white/[0.08]
                    backdrop-blur-sm
                    border
                    border-white/65
                    flex
                    items-center
                    justify-center
                    text-[39px]
                    sm:text-[46px]
                    font-bold
                    text-white
                    shadow-[0_8px_24px_rgba(0,0,0,0.16)]
                  "
                >
                  {profile.fullName
                    ? profile.fullName
                        .charAt(0)
                        .toUpperCase()
                    : "F"}
                </div>

              </div>

              {/* NAME */}

              <div className="min-w-0">

                {editMode ? (
                  <input
                    type="text"
                    name="fullName"
                    value={
                      profile.fullName ||
                      ""
                    }
                    onChange={handleChange}
                    className="
                      w-full
                      max-w-[360px]
                      h-[46px]
                      px-4
                      rounded-xl
                      bg-white/[0.10]
                      border
                      border-white/30
                      text-[24px]
                      sm:text-[28px]
                      font-bold
                      text-white
                      outline-none
                      placeholder:text-white/50
                      focus:border-white/55
                      focus:bg-white/[0.13]
                    "
                  />
                ) : (
                  <h1
                    className="
                      text-[29px]
                      sm:text-[33px]
                      lg:text-[35px]
                      leading-[1.12]
                      font-bold
                      tracking-[-0.7px]
                      text-white
                    "
                  >
                    {profile.fullName ||
                      "--"}
                  </h1>
                )}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-2.5
                  "
                >

                  <span
                    className="
                      w-[7px]
                      h-[7px]
                      rounded-full
                      bg-[#c4e8d3]
                      shadow-[0_0_8px_rgba(196,232,211,0.35)]
                    "
                  />

                  <p
                    className="
                      text-[14px]
                      sm:text-[15px]
                      text-[#e0f0e7]
                      font-medium
                    "
                  >
                    {t("smart_farmer") ||
                      "Smart Farmer"}
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div
              className="
                flex
                items-center
                justify-end
                gap-3
                w-full
                lg:w-auto
                shrink-0
              "
            >

              {!editMode ? (
                <>

                  {/* DASHBOARD */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/dashboard")
                    }
                    className="
                      group
                      h-[46px]
                      min-w-[124px]
                      px-[18px]
                      rounded-[11px]
                      bg-white
                      border
                      border-white
                      text-[#08753d]
                      text-[14px]
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-2
                      shadow-[0_5px_15px_rgba(0,0,0,0.13)]
                      transition-all
                      duration-200
                      hover:bg-[#f7faf8]
                      hover:-translate-y-[1px]
                      hover:shadow-[0_7px_18px_rgba(0,0,0,0.16)]
                      active:translate-y-0
                      focus:outline-none
                      focus:ring-2
                      focus:ring-white/40
                    "
                  >

                    <ArrowLeft
                      size={17}
                      strokeWidth={2.2}
                      className="
                        transition-transform
                        duration-200
                        group-hover:-translate-x-[2px]
                      "
                    />

                    <span className="whitespace-nowrap">
                      {t("nav_dashboard") ||
                        "Dashboard"}
                    </span>

                  </button>

                  {/* EDIT PROFILE */}

                  <button
                    type="button"
                    onClick={handleEdit}
                    className="
                      group
                      h-[46px]
                      min-w-[132px]
                      px-[18px]
                      rounded-[11px]
                      bg-white/[0.08]
                      border
                      border-white/45
                      text-white
                      text-[14px]
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-2
                      backdrop-blur-sm
                      shadow-[0_4px_14px_rgba(0,0,0,0.07)]
                      transition-all
                      duration-200
                      hover:bg-white/[0.15]
                      hover:border-white/65
                      hover:-translate-y-[1px]
                      hover:shadow-[0_7px_18px_rgba(0,0,0,0.12)]
                      active:translate-y-0
                      focus:outline-none
                      focus:ring-2
                      focus:ring-white/30
                    "
                  >

                    <Edit3
                      size={17}
                      strokeWidth={2}
                      className="
                        transition-transform
                        duration-200
                        group-hover:scale-[1.04]
                      "
                    />

                    <span className="whitespace-nowrap">
                      {t("edit_profile") ||
                        "Edit Profile"}
                    </span>

                  </button>

                </>
              ) : (
                <>

                  {/* CANCEL */}

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="
                      h-[46px]
                      min-w-[100px]
                      px-[18px]
                      rounded-[11px]
                      bg-white
                      border
                      border-white
                      text-[#40534a]
                      text-[14px]
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-2
                      shadow-[0_5px_15px_rgba(0,0,0,0.12)]
                      transition-all
                      duration-200
                      hover:bg-[#f7f9f8]
                      hover:-translate-y-[1px]
                      active:translate-y-0
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      focus:outline-none
                    "
                  >

                    <X
                      size={17}
                      strokeWidth={2.1}
                    />

                    <span>
                      {t("cancel") ||
                        "Cancel"}
                    </span>

                  </button>

                  {/* SAVE */}

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="
                      group
                      h-[46px]
                      min-w-[138px]
                      px-[18px]
                      rounded-[11px]
                      bg-[#eaf4ee]
                      border
                      border-white/70
                      text-[#08753d]
                      text-[14px]
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-2
                      shadow-[0_5px_15px_rgba(0,0,0,0.10)]
                      transition-all
                      duration-200
                      hover:bg-white
                      hover:-translate-y-[1px]
                      hover:shadow-[0_7px_18px_rgba(0,0,0,0.13)]
                      active:translate-y-0
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      focus:outline-none
                    "
                  >

                    {saving ? (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <Save
                        size={17}
                        strokeWidth={2.1}
                      />
                    )}

                    <span className="whitespace-nowrap">
                      {saving
                        ? t("saving") ||
                          "Saving..."
                        : t("save_changes") ||
                          "Save Changes"}
                    </span>

                  </button>

                </>
              )}

            </div>

          </div>

        </motion.section>

        {/* =====================================================
            PERSONAL + FARM INFORMATION
        ===================================================== */}

        <div
          className="
            grid
            lg:grid-cols-2
            gap-5
            mt-6
          "
        >

          {/* PERSONAL INFORMATION */}

          <motion.section
            initial={{
              opacity: 0,
              x: -12,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              bg-white
              min-h-[390px]
              rounded-[20px]
              border
              border-[#e0e7e3]
              shadow-[0_7px_25px_rgba(30,57,45,0.055)]
              px-6
              sm:px-7
              pt-6
              pb-5
            "
          >

            <CardHeader
              icon={<User size={21} />}
              title={
                t("personal_information") ||
                "Personal Information"
              }
              subtitle={
                t("personal_information_desc") ||
                "Basic details about the farmer"
              }
            />

            <div className="mt-4">

              {editMode ? (
                <>

                  <EditRow
                    icon={<User size={17} />}
                    label={
                      t("full_name") ||
                      "Full Name"
                    }
                  >
                    <StyledInput
                      type="text"
                      name="fullName"
                      value={
                        profile.fullName ||
                        ""
                      }
                      onChange={handleChange}
                    />
                  </EditRow>

                  <EditRow
                    icon={<Phone size={17} />}
                    label={
                      t("mobile_number") ||
                      "Mobile Number"
                    }
                  >
                    <StyledInput
                      type="text"
                      name="mobile"
                      value={
                        profile.mobile ||
                        ""
                      }
                      onChange={handleChange}
                    />
                  </EditRow>

                  <EditRow
                    icon={<Calendar size={17} />}
                    label={
                      t("age") ||
                      "Age"
                    }
                  >
                    <StyledInput
                      type="number"
                      name="age"
                      value={
                        profile.age ||
                        ""
                      }
                      onChange={handleChange}
                    />
                  </EditRow>

                  <EditRow
                    icon={<User size={17} />}
                    label={
                      t("gender") ||
                      "Gender"
                    }
                  >
                    <StyledSelect
                      name="gender"
                      value={
                        profile.gender ||
                        ""
                      }
                      onChange={handleChange}
                    >

                      <option value="">
                        {t("select_gender") ||
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

                    </StyledSelect>
                  </EditRow>

                  <EditRow
                    icon={<Globe size={17} />}
                    label={
                      t("current_language") ||
                      "Current Language"
                    }
                    last
                  >

                    <StyledSelect
                      name="language"
                      value={
                        profile.language ||
                        currentLanguage
                      }
                      onChange={handleChange}
                    >

                      <option value="en">
                        English
                      </option>

                      <option value="te">
                        తెలుగు
                      </option>

                      <option value="hi">
                        हिंदी
                      </option>

                    </StyledSelect>

                  </EditRow>

                </>
              ) : (
                <>

                  <ProfileRow
                    icon={<User size={17} />}
                    label={
                      t("full_name") ||
                      "Full Name"
                    }
                    value={
                      profile.fullName
                    }
                  />

                  <ProfileRow
                    icon={<Phone size={17} />}
                    label={
                      t("mobile_number") ||
                      "Mobile Number"
                    }
                    value={
                      profile.mobile
                    }
                  />

                  <ProfileRow
                    icon={<Calendar size={17} />}
                    label={
                      t("age") ||
                      "Age"
                    }
                    value={
                      profile.age
                    }
                  />

                  <ProfileRow
                    icon={<User size={17} />}
                    label={
                      t("gender") ||
                      "Gender"
                    }
                    value={
                      profile.gender
                    }
                  />

                  <ProfileRow
                    icon={<Globe size={17} />}
                    label={
                      t("current_language") ||
                      "Current Language"
                    }
                    value={
                      languageName
                    }
                    last
                  />

                </>
              )}

            </div>

          </motion.section>

          {/* FARM INFORMATION */}

          <motion.section
            initial={{
              opacity: 0,
              x: 12,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              bg-white
              min-h-[390px]
              rounded-[20px]
              border
              border-[#e0e7e3]
              shadow-[0_7px_25px_rgba(30,57,45,0.055)]
              px-6
              sm:px-7
              pt-6
              pb-5
            "
          >

            <CardHeader
              icon={<Tractor size={21} />}
              title={
                t("farm_information") ||
                "Farm Information"
              }
              subtitle={
                t("farm_information_desc") ||
                "Tell us about your farm"
              }
            />

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-x-7
                mt-4
              "
            >

              {/* LEFT */}

              <div>

                {editMode ? (
                  <>

                    <EditRow
                      icon={<Tractor size={17} />}
                      label={
                        t("farm_name") ||
                        "Farm Name"
                      }
                    >
                      <StyledInput
                        type="text"
                        name="farmName"
                        value={
                          profile.farmName ||
                          ""
                        }
                        onChange={handleChange}
                      />
                    </EditRow>

                    <EditRow
                      icon={<Sprout size={17} />}
                      label={
                        t("primary_crop") ||
                        "Primary Crop"
                      }
                    >
                      <StyledInput
                        type="text"
                        name="primaryCrop"
                        value={
                          profile.primaryCrop ||
                          ""
                        }
                        onChange={handleChange}
                      />
                    </EditRow>

                    <EditRow
                      icon={<Sprout size={17} />}
                      label={
                        t("secondary_crop") ||
                        "Secondary Crop"
                      }
                    >
                      <StyledInput
                        type="text"
                        name="secondaryCrop"
                        value={
                          profile.secondaryCrop ||
                          ""
                        }
                        onChange={handleChange}
                      />
                    </EditRow>

                    <EditRow
                      icon={<Mountain size={17} />}
                      label={
                        t("soil_type") ||
                        "Soil Type"
                      }
                      last
                    >
                      <StyledInput
                        type="text"
                        name="soilType"
                        value={
                          profile.soilType ||
                          ""
                        }
                        onChange={handleChange}
                      />
                    </EditRow>

                  </>
                ) : (
                  <>

                    <ProfileRow
                      icon={<Tractor size={17} />}
                      label={
                        t("farm_name") ||
                        "Farm Name"
                      }
                      value={
                        profile.farmName
                      }
                    />

                    <ProfileRow
                      icon={<Sprout size={17} />}
                      label={
                        t("primary_crop") ||
                        "Primary Crop"
                      }
                      value={
                        profile.primaryCrop
                      }
                    />

                    <ProfileRow
                      icon={<Sprout size={17} />}
                      label={
                        t("secondary_crop") ||
                        "Secondary Crop"
                      }
                      value={
                        profile.secondaryCrop
                      }
                    />

                    <ProfileRow
                      icon={<Mountain size={17} />}
                      label={
                        t("soil_type") ||
                        "Soil Type"
                      }
                      value={
                        profile.soilType
                      }
                      last
                    />

                  </>
                )}

              </div>

              {/* RIGHT */}

              <div>

                {editMode ? (
                  <>

                    <EditRow
                      icon={<Droplets size={17} />}
                      label={
                        t("water_source") ||
                        "Water Source"
                      }
                    >
                      <StyledInput
                        type="text"
                        name="waterSource"
                        value={
                          profile.waterSource ||
                          ""
                        }
                        onChange={handleChange}
                      />
                    </EditRow>

                    <EditRow
                      icon={<Mountain size={17} />}
                      label={
                        t("land_area") ||
                        "Land Area"
                      }
                    >

                      <div className="flex gap-2">

                        <StyledInput
                          type="number"
                          name="landArea"
                          value={
                            profile.landArea ||
                            ""
                          }
                          onChange={handleChange}
                          className="!w-[85px]"
                        />

                        <StyledSelect
                          name="landUnit"
                          value={
                            profile.landUnit ||
                            "Acres"
                          }
                          onChange={handleChange}
                          className="!w-[110px]"
                        >

                          <option value="Acres">
                            {t("acres") ||
                              "Acres"}
                          </option>

                          <option value="Hectares">
                            {t("hectares") ||
                              "Hectares"}
                          </option>

                        </StyledSelect>

                      </div>

                    </EditRow>

                    <EditRow
                      icon={<Calendar size={17} />}
                      label={
                        t("experience") ||
                        "Experience"
                      }
                    >
                      <StyledInput
                        type="number"
                        name="farmingExperience"
                        value={
                          profile.farmingExperience ||
                          ""
                        }
                        onChange={handleChange}
                      />
                    </EditRow>

                    <EditRow
                      icon={<Droplets size={17} />}
                      label={
                        t("irrigation_type") ||
                        "Irrigation Type"
                      }
                      last
                    >
                      <StyledInput
                        type="text"
                        name="irrigationType"
                        value={
                          profile.irrigationType ||
                          ""
                        }
                        onChange={handleChange}
                      />
                    </EditRow>

                  </>
                ) : (
                  <>

                    <ProfileRow
                      icon={<Droplets size={17} />}
                      label={
                        t("water_source") ||
                        "Water Source"
                      }
                      value={
                        profile.waterSource
                      }
                    />

                    <ProfileRow
                      icon={<Mountain size={17} />}
                      label={
                        t("land_area") ||
                        "Land Area"
                      }
                      value={
                        profile.landArea
                          ? `${profile.landArea} ${
                              profile.landUnit ||
                              t("acres") ||
                              "Acres"
                            }`
                          : "--"
                      }
                    />

                    <ProfileRow
                      icon={<Calendar size={17} />}
                      label={
                        t("experience") ||
                        "Experience"
                      }
                      value={
                        profile.farmingExperience
                          ? `${profile.farmingExperience} ${
                              t("years") ||
                              "years"
                            }`
                          : "--"
                      }
                    />

                    <ProfileRow
                      icon={<Droplets size={17} />}
                      label={
                        t("irrigation_type") ||
                        "Irrigation Type"
                      }
                      value={
                        profile.irrigationType
                      }
                      last
                    />

                  </>
                )}

              </div>

            </div>

          </motion.section>

        </div>

        {/* =====================================================
            FARM LOCATION
        ===================================================== */}

        <motion.section
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
          }}
          className="
            mt-6
            bg-white
            rounded-[20px]
            border
            border-[#e0e7e3]
            shadow-[0_7px_25px_rgba(30,57,45,0.055)]
            px-6
            sm:px-7
            pt-6
            pb-6
          "
        >

          <CardHeader
            icon={<MapPin size={21} />}
            title={
              t("farm_location") ||
              "Farm Location"
            }
            subtitle={
              t("farm_location_desc") ||
              "Where is your farm located?"
            }
          />

          {editMode ? (
            <div
              className="
                grid
                sm:grid-cols-2
                lg:grid-cols-3
                gap-5
                mt-6
              "
            >

              <EditInput
                label={
                  t("state") ||
                  "State"
                }
                name="state"
                value={profile.state}
                onChange={handleChange}
              />

              <EditInput
                label={
                  t("district") ||
                  "District"
                }
                name="district"
                value={profile.district}
                onChange={handleChange}
              />

              <EditInput
                label={
                  t("village") ||
                  "Village"
                }
                name="village"
                value={profile.village}
                onChange={handleChange}
              />

              <EditInput
                label={
                  t("pin_code") ||
                  "PIN Code"
                }
                name="pincode"
                value={profile.pincode}
                onChange={handleChange}
              />

              <EditInput
                label={
                  t("latitude") ||
                  "Latitude"
                }
                name="latitude"
                value={profile.latitude}
                onChange={handleChange}
              />

              <EditInput
                label={
                  t("longitude") ||
                  "Longitude"
                }
                name="longitude"
                value={profile.longitude}
                onChange={handleChange}
              />

            </div>
          ) : (
            <div
              className="
                grid
                xl:grid-cols-[1.15fr_1fr]
                gap-5
                mt-6
              "
            >

              {/* MAP */}

              <div
                className="
                  h-[180px]
                  rounded-[15px]
                  overflow-hidden
                  border
                  border-[#dce5e0]
                  bg-[#edf2ef]
                "
              >

                <iframe
                  title={
                    t("farm_location") ||
                    "Farm Location"
                  }
                  src={mapUrl}
                  className="
                    w-full
                    h-full
                    border-0
                  "
                  loading="lazy"
                />

              </div>

              {/* LOCATION CARDS */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                "
              >

                <LocationCard
                  icon={
                    <Landmark size={19} />
                  }
                  title={
                    t("state") ||
                    "State"
                  }
                  value={
                    profile.state
                  }
                />

                <LocationCard
                  icon={
                    <MapPin size={19} />
                  }
                  title={
                    t("district") ||
                    "District"
                  }
                  value={
                    profile.district
                  }
                />

                <LocationCard
                  icon={
                    <Home size={19} />
                  }
                  title={
                    t("village") ||
                    "Village"
                  }
                  value={
                    profile.village
                  }
                />

                <LocationCard
                  icon={
                    <Building2 size={19} />
                  }
                  title={
                    t("pin_code") ||
                    "PIN Code"
                  }
                  value={
                    profile.pincode
                  }
                />

              </div>

            </div>
          )}

        </motion.section>

      </div>

    </div>
  );
}


/* ============================================================
   CARD HEADER
============================================================ */

function CardHeader({
  icon,
  title,
  subtitle,
}) {
  return (
    <div className="flex items-center gap-3.5">

      <div
        className="
          w-[44px]
          h-[44px]
          rounded-[12px]
          bg-[#edf2ef]
          border
          border-[#e0e7e3]
          text-[#08753d]
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        {icon}
      </div>

      <div className="min-w-0">

        <h2
          className="
            text-[19px]
            font-bold
            text-[#20342b]
            leading-tight
            tracking-[-0.25px]
          "
        >
          {title}
        </h2>

        <p
          className="
            text-[12px]
            sm:text-[13px]
            text-[#78847f]
            mt-1
          "
        >
          {subtitle}
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   PROFILE ROW
============================================================ */

function ProfileRow({
  icon,
  label,
  value,
  last = false,
}) {
  return (
    <div
      className={`
        min-h-[57px]
        py-2.5
        flex
        items-center
        gap-3.5
        ${
          !last
            ? "border-b border-[#edf1ee]"
            : ""
        }
      `}
    >

      <div
        className="
          w-[35px]
          h-[35px]
          rounded-[9px]
          bg-[#f0f4f1]
          border
          border-[#e4eae6]
          text-[#08753d]
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p
          className="
            text-[12px]
            text-[#7c8883]
            leading-none
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1.5
            text-[14px]
            font-semibold
            text-[#293b33]
            truncate
          "
        >
          {value || "--"}
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   EDIT ROW
============================================================ */

function EditRow({
  icon,
  label,
  children,
  last = false,
}) {
  return (
    <div
      className={`
        min-h-[59px]
        py-2.5
        flex
        items-center
        gap-3.5
        ${
          !last
            ? "border-b border-[#edf1ee]"
            : ""
        }
      `}
    >

      <div
        className="
          w-[35px]
          h-[35px]
          rounded-[9px]
          bg-[#f0f4f1]
          border
          border-[#e4eae6]
          text-[#08753d]
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">

        <p
          className="
            text-[12px]
            text-[#7c8883]
            mb-1.5
          "
        >
          {label}
        </p>

        {children}

      </div>

    </div>
  );
}


/* ============================================================
   STYLED INPUT
============================================================ */

function StyledInput({
  className = "",
  ...props
}) {
  return (
    <input
      {...props}
      className={`
        w-full
        h-[39px]
        px-3
        rounded-[9px]
        border
        border-[#d8e1dc]
        bg-[#fafcfb]
        text-[14px]
        font-medium
        text-[#293b33]
        outline-none
        transition

        focus:border-[#08753d]
        focus:bg-white
        focus:ring-2
        focus:ring-[#08753d]/10

        placeholder:text-[#9aa49f]

        ${className}
      `}
    />
  );
}


/* ============================================================
   STYLED SELECT
============================================================ */

function StyledSelect({
  className = "",
  children,
  ...props
}) {
  return (
    <select
      {...props}
      className={`
        w-full
        h-[39px]
        px-3
        rounded-[9px]
        border
        border-[#d8e1dc]
        bg-[#fafcfb]
        text-[14px]
        font-medium
        text-[#293b33]
        outline-none
        cursor-pointer
        transition

        focus:border-[#08753d]
        focus:bg-white
        focus:ring-2
        focus:ring-[#08753d]/10

        ${className}
      `}
    >
      {children}
    </select>
  );
}


/* ============================================================
   LOCATION EDIT INPUT
============================================================ */

function EditInput({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div>

      <label
        className="
          block
          text-[12px]
          font-semibold
          text-[#687771]
          mb-2
        "
      >
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        className="
          w-full
          h-[43px]
          px-3.5
          rounded-xl
          border
          border-[#d8e1dc]
          bg-[#fafcfb]
          text-[14px]
          font-medium
          text-[#293b33]
          outline-none
          transition

          focus:border-[#08753d]
          focus:bg-white
          focus:ring-2
          focus:ring-[#08753d]/10
        "
      />

    </div>
  );
}


/* ============================================================
   LOCATION CARD
============================================================ */

function LocationCard({
  icon,
  title,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        min-h-[88px]
        rounded-[13px]
        border
        border-[#dfe7e2]
        bg-[#fbfcfb]
        flex
        items-center
        gap-3
        px-4
        transition
        hover:border-[#ccd9d1]
        hover:bg-[#f8faf9]
      "
    >

      <div
        className="
          w-[36px]
          h-[36px]
          rounded-[9px]
          bg-[#edf2ef]
          border
          border-[#e0e7e3]
          text-[#08753d]
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p
          className="
            text-[11px]
            font-medium
            text-[#7b8782]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-[14px]
            font-bold
            text-[#293b33]
            truncate
          "
        >
          {value || "--"}
        </p>

      </div>

    </motion.div>
  );
}