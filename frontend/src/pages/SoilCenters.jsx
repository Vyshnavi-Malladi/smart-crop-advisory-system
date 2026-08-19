// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//     MapPin,
//     Phone,
//     Navigation,
//     Loader2,
//     MapPinned
// } from "lucide-react";

// import api from "../api";

// export default function SoilCenters() {

//     const [loading, setLoading] = useState(true);

//     const [centers, setCenters] = useState([]);

//     const [location, setLocation] = useState({

//         latitude: null,

//         longitude: null

//     });

//     useEffect(() => {

//         getCurrentLocation();

//     }, []);

//     const getCurrentLocation = () => {

//         if (!navigator.geolocation) {

//             alert("Geolocation is not supported.");

//             setLoading(false);

//             return;

//         }

//         navigator.geolocation.getCurrentPosition(

//             async (position) => {

//                 const lat = position.coords.latitude;

//                 const lon = position.coords.longitude;

//                 setLocation({

//                     latitude: lat,

//                     longitude: lon

//                 });

//                 fetchCenters(lat, lon);

//             },

//             (err) => {

//                 console.log(err);

//                 alert("Unable to access your location.");

//                 setLoading(false);

//             },

//             {

//                 enableHighAccuracy: true,

//                 timeout: 10000,

//                 maximumAge: 0

//             }

//         );

//     };

//     const fetchCenters = async (lat, lon) => {

//         try {

//             const res = await api.get(

//                 `/soil-centers?lat=${lat}&lon=${lon}`

//             );

//             if (res.data.success) {

//                 setCenters(res.data.centers);

//             }

//         }

//         catch (err) {

//             console.log(err);

//         }

//         finally {

//             setLoading(false);

//         }

//     };

//     const openDirections = (mapsUrl) => {

//         window.open(

//             mapsUrl,

//             "_blank"

//         );

//     };

//     const callCenter = (phone) => {

//         if (

//             phone === "Not Available"

//         ) {

//             alert("Phone number unavailable.");

//             return;

//         }

//         window.location.href = `tel:${phone}`;

//     };
//         if (loading) {

//         return (

//             <div className="min-h-screen flex items-center justify-center bg-green-50">

//                 <div className="flex flex-col items-center">

//                     <Loader2
//                         className="animate-spin text-green-600"
//                         size={50}
//                     />

//                     <p className="mt-4 text-gray-600 font-medium">

//                         Finding Nearby Soil Testing Centers...

//                     </p>

//                 </div>

//             </div>

//         );

//     }

//     return (

//         <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-10">

//             <div className="max-w-7xl mx-auto px-6">

//                 {/* HEADER */}

//                 <motion.div

//                     initial={{ opacity: 0, y: -20 }}

//                     animate={{ opacity: 1, y: 0 }}

//                     className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl shadow-xl text-white p-8"

//                 >

//                     <div className="flex items-center gap-4">

//                         <div className="bg-white/20 p-4 rounded-2xl">

//                             <MapPinned size={40} />

//                         </div>

//                         <div>

//                             <h1 className="text-4xl font-bold">

//                                 Nearby Soil Testing Centers

//                             </h1>

//                             <p className="mt-2 text-green-100">

//                                 Find the nearest agricultural soil testing laboratories.

//                             </p>

//                         </div>

//                     </div>

//                 </motion.div>

//                 {/* CURRENT LOCATION */}

//                 <motion.div

//                     initial={{ opacity: 0 }}

//                     animate={{ opacity: 1 }}

//                     transition={{ delay: 0.2 }}

//                     className="bg-white mt-8 rounded-3xl shadow-lg p-6 border"

//                 >

//                     <div className="flex items-center gap-3">

//                         <MapPin

//                             className="text-red-500"

//                             size={26}

//                         />

//                         <div>

//                             <h2 className="font-bold text-xl">

//                                 Your Current Location

//                             </h2>

//                             <p className="text-gray-600">

//                                 Latitude :

//                                 {" "}

//                                 {location.latitude?.toFixed(5)}

//                                 <br />

//                                 Longitude :

//                                 {" "}

//                                 {location.longitude?.toFixed(5)}

//                             </p>

//                         </div>

//                     </div>

//                 </motion.div>

//                 {/* SOIL CENTER LIST */}

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

//                     {

//                         centers.map((center) => (

//                             <motion.div

//                                 key={center.id}

//                                 whileHover={{

//                                     scale: 1.03

//                                 }}

//                                 className="bg-white rounded-3xl shadow-lg border overflow-hidden"

//                             >

//                                 <div className="bg-green-600 text-white p-5">

//                                     <h2 className="font-bold text-xl">

//                                         {center.name}

//                                     </h2>

//                                 </div>

//                                 <div className="p-6">

//                                     <div className="flex items-start gap-3">

//                                         <MapPin

//                                             className="text-red-500"

//                                             size={20}

//                                         />

//                                         <p className="text-gray-600">

//                                             {center.address}

//                                         </p>

//                                     </div>

//                                     <div className="mt-4">

//                                         <p className="text-sm text-gray-500">

//                                             Contact

//                                         </p>

//                                         <p className="font-semibold">

//                                             {center.phone}

//                                         </p>

//                                     </div>
//                                                                         <div className="flex gap-3 mt-6">

//                                         <button
//                                             onClick={() => callCenter(center.phone)}
//                                             className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
//                                         >
//                                             <Phone size={18} />
//                                             Call
//                                         </button>

//                                         <button
//                                             onClick={() => openDirections(center.maps)}
//                                             className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
//                                         >
//                                             <Navigation size={18} />
//                                             Directions
//                                         </button>

//                                     </div>

//                                 </div>

//                             </motion.div>

//                         ))

//                     }

//                 </div>

//                 {/* NO RESULTS */}

//                 {

//                     !loading && centers.length === 0 && (

//                         <motion.div

//                             initial={{ opacity: 0 }}

//                             animate={{ opacity: 1 }}

//                             className="bg-white rounded-3xl shadow-lg p-12 text-center mt-10"

//                         >

//                             <MapPinned
//                                 className="mx-auto text-green-600"
//                                 size={60}
//                             />

//                             <h2 className="text-2xl font-bold mt-5">

//                                 No Nearby Soil Testing Centers Found

//                             </h2>

//                             <p className="text-gray-500 mt-3">

//                                 We couldn't find any nearby agricultural laboratories
//                                 around your current location.

//                             </p>

//                         </motion.div>

//                     )

//                 }

//             </div>

//         </div>

//     );

// }



// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   Phone,
//   Navigation,
//   Loader2,
//   Search,
//   RefreshCw,
//   Clock,
//   Globe,
//   Star,
//   AlertCircle
// } from "lucide-react";

// import api from "../api";

// export default function SoilCenters() {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [centers, setCenters] = useState([]);
//   const [filteredCenters, setFilteredCenters] = useState([]);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [radius, setRadius] = useState(10000);
//   const [selectedCenter, setSelectedCenter] = useState(null);
//   const [location, setLocation] = useState({
//     latitude: null,
//     longitude: null
//   });

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   useEffect(() => {
//     filterCenters();
//   }, [search, centers]);

//   const filterCenters = () => {
//     if (search.trim() === "") {
//       setFilteredCenters(centers);
//       return;
//     }
//     const list = centers.filter(center =>
//       center.name.toLowerCase().includes(search.toLowerCase()) ||
//       center.address.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredCenters(list);
//   };

//   const getCurrentLocation = async () => {
//     setLoading(true);
//     setError("");
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported.");
//       setLoading(false);
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         setLocation({
//           latitude: lat,
//           longitude: lon
//         });
//         await fetchCenters(lat, lon, radius);
//       },
//       () => {
//         setLoading(false);
//         setError("Unable to get current location.");
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000
//       }
//     );
//   };

//   const fetchCenters = async (lat, lon, rad) => {
//     try {
//       setLoading(true);
//       const res = await api.get(
//         `/soil-centers?lat=${lat}&lon=${lon}&radius=${rad}`
//       );
//       if (res.data.success) {
//         setCenters(res.data.centers);
//         setFilteredCenters(res.data.centers);
//       }
//     } catch (err) {
//       console.log(err);
//       setError("Failed to fetch centers.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refresh = () => {
//     if (location.latitude && location.longitude) {
//       setRefreshing(true);
//       fetchCenters(location.latitude, location.longitude, radius)
//         .finally(() => setRefreshing(false));
//     } else {
//       getCurrentLocation();
//     }
//   };

//   const callCenter = (phone) => {
//     if (phone === "Not Available" || !phone) {
//       alert("Phone number unavailable.");
//       return;
//     }
//     window.location.href = `tel:${phone}`;
//   };

//   const openDirections = (mapsUrl) => {
//     if (!mapsUrl) {
//       alert("Directions unavailable.");
//       return;
//     }
//     window.open(mapsUrl, "_blank");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-green-50">
//         <div className="flex flex-col items-center">
//           <Loader2 className="animate-spin text-green-600" size={50} />
//           <p className="mt-4 text-gray-600 font-medium">
//             Finding Nearby Soil Testing Centers...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-green-50">
//         <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
//           <AlertCircle className="mx-auto text-red-500" size={60} />
//           <h2 className="text-2xl font-bold mt-5 text-gray-800">Error</h2>
//           <p className="text-gray-600 mt-3">{error}</p>
//           <button
//             onClick={refresh}
//             className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
//       {/* ================= HEADER ================= */}
//       <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 shadow-xl">
//         <div className="max-w-7xl mx-auto px-6 py-10">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-col lg:flex-row justify-between items-center"
//           >
//             <div>
//               <h1 className="text-4xl font-bold text-white">
//                 🌱 Nearby Soil Testing Centers
//               </h1>
//               <p className="mt-3 text-green-100 text-lg">
//                 Find Government & Private Soil Testing Laboratories Near You
//               </p>
//             </div>
//             <button
//               onClick={refresh}
//               disabled={refreshing}
//               className="mt-6 lg:mt-0 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-100 transition disabled:opacity-50"
//             >
//               <RefreshCw
//                 size={18}
//                 className={`inline mr-2 ${refreshing ? "animate-spin" : ""}`}
//               />
//               Refresh
//             </button>
//           </motion.div>
//         </div>
//       </div>

//       {/* ================= SEARCH ================= */}
//       <div className="max-w-7xl mx-auto px-6 mt-8">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="bg-white rounded-3xl shadow-lg p-6"
//         >
//           <div className="grid lg:grid-cols-3 gap-5">
//             {/* Search */}
//             <div className="relative">
//               <Search
//                 size={20}
//                 className="absolute left-4 top-4 text-gray-400"
//               />
//               <input
//                 type="text"
//                 placeholder="Search by name or address..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
//               />
//             </div>

//             {/* Radius */}
//             <select
//               value={radius}
//               onChange={(e) => {
//                 const r = Number(e.target.value);
//                 setRadius(r);
//                 if (location.latitude && location.longitude) {
//                   fetchCenters(location.latitude, location.longitude, r);
//                 }
//               }}
//               className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
//             >
//               <option value={5000}>5 KM</option>
//               <option value={10000}>10 KM</option>
//               <option value={25000}>25 KM</option>
//               <option value={50000}>50 KM</option>
//             </select>

//             {/* Location */}
//             <div className="flex items-center gap-3">
//               <MapPin size={22} className="text-red-500" />
//               <div>
//                 <h3 className="font-semibold">Current Location</h3>
//                 <p className="text-sm text-gray-500">
//                   {location.latitude?.toFixed(4)}, {location.longitude?.toFixed(4)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Total Centers */}
//           <div className="mt-6 flex items-center gap-3">
//             <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
//               {filteredCenters.length} Centers Found
//             </span>
//           </div>
//         </motion.div>
//       </div>

//       {/* ================= SOIL CENTER CARDS ================= */}
//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
//           {filteredCenters.map((center, index) => (
//             <motion.div
//               key={center._id || index}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//               whileHover={{
//                 y: -8,
//                 transition: { duration: 0.2 }
//               }}
//               className="bg-white rounded-3xl shadow-lg overflow-hidden border hover:shadow-2xl"
//             >
//               {/* Card Header */}
//               <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-5 text-white">
//                 <div className="flex justify-between">
//                   <h2 className="font-bold text-xl leading-7">{center.name}</h2>
//                   {center.verified && (
//                     <span className="bg-blue-500 px-3 py-1 rounded-full text-xs">
//                       Verified
//                     </span>
//                   )}
//                 </div>
//                 <div className="mt-3">
//                   <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
//                     📍 {center.distance?.toFixed(1) || "N/A"} km Away
//                   </span>
//                 </div>
//               </div>

//               {/* Body */}
//               <div className="p-6">
//                 <div className="flex items-start gap-3">
//                   <MapPin className="text-red-500" size={20} />
//                   <p className="text-gray-600">{center.address}</p>
//                 </div>

//                 <div className="mt-4">
//                   <p className="text-sm text-gray-500">Contact</p>
//                   <p className="font-semibold">{center.phone || "Not Available"}</p>
//                 </div>

//                 <div className="flex gap-3 mt-6">
//                   <button
//                     onClick={() => callCenter(center.phone)}
//                     className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
//                   >
//                     <Phone size={18} />
//                     Call
//                   </button>
//                   <button
//                     onClick={() => openDirections(center.maps)}
//                     className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
//                   >
//                     <Navigation size={18} />
//                     Directions
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => setSelectedCenter(center)}
//                   className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl transition"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* ================= NO CENTERS FOUND ================= */}
//         {!loading && filteredCenters.length === 0 && (
//           <div className="max-w-5xl mx-auto py-20">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-white rounded-3xl shadow-xl p-12 text-center"
//             >
//               <MapPin size={70} className="mx-auto text-green-600" />
//               <h2 className="text-3xl font-bold mt-6">No Soil Testing Centers Found</h2>
//               <p className="text-gray-500 mt-4">
//                 We couldn't find any nearby soil testing centers.
//               </p>
//               <button
//                 onClick={refresh}
//                 className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"
//               >
//                 Search Again
//               </button>
//             </motion.div>
//           </div>
//         )}
//       </div>

//       {/* ================= DETAILS MODAL ================= */}
//       {selectedCenter && (
//         <div
//           className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
//           onClick={() => setSelectedCenter(null)}
//         >
//           <div
//             className="bg-white rounded-3xl w-full max-w-xl p-8 max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 className="text-3xl font-bold">{selectedCenter.name}</h2>
//             <div className="mt-6 space-y-5">
//               <div>
//                 <p className="font-semibold">Address</p>
//                 <p className="text-gray-600">{selectedCenter.address}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">Phone</p>
//                 <p className="text-gray-600">{selectedCenter.phone || "Not Available"}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">Working Hours</p>
//                 <p className="text-gray-600">{selectedCenter.operating_hours || "Not Specified"}</p>
//               </div>
//               {selectedCenter.website && (
//                 <div>
//                   <p className="font-semibold">Website</p>
//                   <a
//                     href={selectedCenter.website}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-blue-600 hover:underline"
//                   >
//                     Visit Website
//                   </a>
//                 </div>
//               )}
//               <div>
//                 <p className="font-semibold">Description</p>
//                 <p className="text-gray-600">{selectedCenter.description || "No description available."}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4 mt-8">
//               <button
//                 onClick={() => {
//                   callCenter(selectedCenter.phone);
//                   setSelectedCenter(null);
//                 }}
//                 className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
//               >
//                 Call
//               </button>
//               <button
//                 onClick={() => {
//                   openDirections(selectedCenter.maps);
//                   setSelectedCenter(null);
//                 }}
//                 className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
//               >
//                 Directions
//               </button>
//             </div>
//             <button
//               onClick={() => setSelectedCenter(null)}
//               className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ================= FOOTER ================= */}
//       <footer className="bg-green-700 text-white mt-16">
//         <div className="max-w-7xl mx-auto px-6 py-8 text-center">
//           <h3 className="text-xl font-bold">🌱 FarmXpert</h3>
//           <p className="mt-2 text-green-100">
//             Helping Farmers Find Nearby Soil Testing Centers
//           </p>
//           <p className="mt-4 text-sm text-green-200">
//             © {new Date().getFullYear()} FarmXpert
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }






// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   Phone,
//   Navigation,
//   Loader2,
//   Search,
//   RefreshCw,
//   Clock,
//   Globe,
//   Star,
//   AlertCircle
// } from "lucide-react";

// import api from "../api";
// import { useTranslation } from "react-i18next";

// export default function SoilCenters() {
//   const { t } = useTranslation();
  
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [centers, setCenters] = useState([]);
//   const [filteredCenters, setFilteredCenters] = useState([]);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [radius, setRadius] = useState(10000);
//   const [selectedCenter, setSelectedCenter] = useState(null);
//   const [location, setLocation] = useState({
//     latitude: null,
//     longitude: null
//   });

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   useEffect(() => {
//     filterCenters();
//   }, [search, centers]);

//   const filterCenters = () => {
//     if (search.trim() === "") {
//       setFilteredCenters(centers);
//       return;
//     }
//     const list = centers.filter(center =>
//       center.name.toLowerCase().includes(search.toLowerCase()) ||
//       center.address.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredCenters(list);
//   };

//   const getCurrentLocation = async () => {
//     setLoading(true);
//     setError("");
//     if (!navigator.geolocation) {
//       setError(t("common.geolocationNotSupported"));
//       setLoading(false);
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         setLocation({
//           latitude: lat,
//           longitude: lon
//         });
//         await fetchCenters(lat, lon, radius);
//       },
//       () => {
//         setLoading(false);
//         setError(t("common.geolocationError"));
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000
//       }
//     );
//   };

//   const fetchCenters = async (lat, lon, rad) => {
//     try {
//       setLoading(true);
//       const res = await api.get(
//         `/soil-centers?lat=${lat}&lon=${lon}&radius=${rad}`
//       );
//       if (res.data.success) {
//         setCenters(res.data.centers);
//         setFilteredCenters(res.data.centers);
//       }
//     } catch (err) {
//       console.log(err);
//       setError(t("common.fetchError"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refresh = () => {
//     if (location.latitude && location.longitude) {
//       setRefreshing(true);
//       fetchCenters(location.latitude, location.longitude, radius)
//         .finally(() => setRefreshing(false));
//     } else {
//       getCurrentLocation();
//     }
//   };

//   const callCenter = (phone) => {
//     if (phone === "Not Available" || !phone) {
//       alert(t("common.phoneUnavailable"));
//       return;
//     }
//     window.location.href = `tel:${phone}`;
//   };

//   const openDirections = (mapsUrl) => {
//     if (!mapsUrl) {
//       alert(t("common.directionsUnavailable"));
//       return;
//     }
//     window.open(mapsUrl, "_blank");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-green-50">
//         <div className="flex flex-col items-center">
//           <Loader2 className="animate-spin text-green-600" size={50} />
//           <p className="mt-4 text-gray-600 font-medium">
//             {t("soilCenters.loading")}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-green-50">
//         <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
//           <AlertCircle className="mx-auto text-red-500" size={60} />
//           <h2 className="text-2xl font-bold mt-5 text-gray-800">{t("common.error")}</h2>
//           <p className="text-gray-600 mt-3">{error}</p>
//           <button
//             onClick={refresh}
//             className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
//           >
//             {t("common.tryAgain")}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
//       {/* ================= HEADER ================= */}
//       <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 shadow-xl">
//         <div className="max-w-7xl mx-auto px-6 py-10">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-col lg:flex-row justify-between items-center"
//           >
//             <div>
//               <h1 className="text-4xl font-bold text-white">
//                 🌱 {t("soilCenters.title")}
//               </h1>
//               <p className="mt-3 text-green-100 text-lg">
//                 {t("soilCenters.subtitle")}
//               </p>
//             </div>
//             <button
//               onClick={refresh}
//               disabled={refreshing}
//               className="mt-6 lg:mt-0 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-100 transition disabled:opacity-50"
//             >
//               <RefreshCw
//                 size={18}
//                 className={`inline mr-2 ${refreshing ? "animate-spin" : ""}`}
//               />
//               {t("common.refresh")}
//             </button>
//           </motion.div>
//         </div>
//       </div>

//       {/* ================= SEARCH ================= */}
//       <div className="max-w-7xl mx-auto px-6 mt-8">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="bg-white rounded-3xl shadow-lg p-6"
//         >
//           <div className="grid lg:grid-cols-3 gap-5">
//             {/* Search */}
//             <div className="relative">
//               <Search
//                 size={20}
//                 className="absolute left-4 top-4 text-gray-400"
//               />
//               <input
//                 type="text"
//                 placeholder={t("soilCenters.search")}
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
//               />
//             </div>

//             {/* Radius */}
//             <select
//               value={radius}
//               onChange={(e) => {
//                 const r = Number(e.target.value);
//                 setRadius(r);
//                 if (location.latitude && location.longitude) {
//                   fetchCenters(location.latitude, location.longitude, r);
//                 }
//               }}
//               className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
//             >
//               <option value={5000}>5 {t("common.km")}</option>
//               <option value={10000}>10 {t("common.km")}</option>
//               <option value={25000}>25 {t("common.km")}</option>
//               <option value={50000}>50 {t("common.km")}</option>
//             </select>

//             {/* Location */}
//             <div className="flex items-center gap-3">
//               <MapPin size={22} className="text-red-500" />
//               <div>
//                 <h3 className="font-semibold">{t("soilCenters.currentLocation")}</h3>
//                 <p className="text-sm text-gray-500">
//                   {location.latitude?.toFixed(4)}, {location.longitude?.toFixed(4)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Total Centers */}
//           <div className="mt-6 flex items-center gap-3">
//             <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
//               {filteredCenters.length} {t("soilCenters.centersFound")}
//             </span>
//           </div>
//         </motion.div>
//       </div>

//       {/* ================= SOIL CENTER CARDS ================= */}
//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
//           {filteredCenters.map((center, index) => (
//             <motion.div
//               key={center._id || index}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//               whileHover={{
//                 y: -8,
//                 transition: { duration: 0.2 }
//               }}
//               className="bg-white rounded-3xl shadow-lg overflow-hidden border hover:shadow-2xl"
//             >
//               {/* Card Header */}
//               <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-5 text-white">
//                 <div className="flex justify-between">
//                   <h2 className="font-bold text-xl leading-7">{center.name}</h2>
//                   {center.verified && (
//                     <span className="bg-blue-500 px-3 py-1 rounded-full text-xs">
//                       {t("soilCenters.verified")}
//                     </span>
//                   )}
//                 </div>
//                 <div className="mt-3">
//                   <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
//                     📍 {center.distance?.toFixed(1) || "N/A"} {t("soilCenters.kmAway")}
//                   </span>
//                 </div>
//               </div>

//               {/* Body */}
//               <div className="p-6">
//                 <div className="flex items-start gap-3">
//                   <MapPin className="text-red-500" size={20} />
//                   <p className="text-gray-600">{center.address}</p>
//                 </div>

//                 <div className="mt-4">
//                   <p className="text-sm text-gray-500">{t("soilCenters.contact")}</p>
//                   <p className="font-semibold">{center.phone || t("common.notAvailable")}</p>
//                 </div>

//                 <div className="flex gap-3 mt-6">
//                   <button
//                     onClick={() => callCenter(center.phone)}
//                     className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
//                   >
//                     <Phone size={18} />
//                     {t("common.call")}
//                   </button>
//                   <button
//                     onClick={() => openDirections(center.maps)}
//                     className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
//                   >
//                     <Navigation size={18} />
//                     {t("common.directions")}
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => setSelectedCenter(center)}
//                   className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl transition"
//                 >
//                   {t("soilCenters.viewDetails")}
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* ================= NO CENTERS FOUND ================= */}
//         {!loading && filteredCenters.length === 0 && (
//           <div className="max-w-5xl mx-auto py-20">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-white rounded-3xl shadow-xl p-12 text-center"
//             >
//               <MapPin size={70} className="mx-auto text-green-600" />
//               <h2 className="text-3xl font-bold mt-6">{t("soilCenters.noCenters")}</h2>
//               <p className="text-gray-500 mt-4">
//                 {t("soilCenters.noCentersDesc")}
//               </p>
//               <button
//                 onClick={refresh}
//                 className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"
//               >
//                 {t("common.searchAgain")}
//               </button>
//             </motion.div>
//           </div>
//         )}
//       </div>

//       {/* ================= DETAILS MODAL ================= */}
//       {selectedCenter && (
//         <div
//           className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
//           onClick={() => setSelectedCenter(null)}
//         >
//           <div
//             className="bg-white rounded-3xl w-full max-w-xl p-8 max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 className="text-3xl font-bold">{selectedCenter.name}</h2>
//             <div className="mt-6 space-y-5">
//               <div>
//                 <p className="font-semibold">{t("common.address")}</p>
//                 <p className="text-gray-600">{selectedCenter.address}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">{t("common.phone")}</p>
//                 <p className="text-gray-600">{selectedCenter.phone || t("common.notAvailable")}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">{t("soilCenters.workingHours")}</p>
//                 <p className="text-gray-600">{selectedCenter.operating_hours || t("common.notSpecified")}</p>
//               </div>
//               {selectedCenter.website && (
//                 <div>
//                   <p className="font-semibold">{t("common.website")}</p>
//                   <a
//                     href={selectedCenter.website}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-blue-600 hover:underline"
//                   >
//                     {t("common.visitWebsite")}
//                   </a>
//                 </div>
//               )}
//               <div>
//                 <p className="font-semibold">{t("common.description")}</p>
//                 <p className="text-gray-600">{selectedCenter.description || t("common.noDescription")}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4 mt-8">
//               <button
//                 onClick={() => {
//                   callCenter(selectedCenter.phone);
//                   setSelectedCenter(null);
//                 }}
//                 className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
//               >
//                 {t("common.call")}
//               </button>
//               <button
//                 onClick={() => {
//                   openDirections(selectedCenter.maps);
//                   setSelectedCenter(null);
//                 }}
//                 className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
//               >
//                 {t("common.directions")}
//               </button>
//             </div>
//             <button
//               onClick={() => setSelectedCenter(null)}
//               className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition"
//             >
//               {t("common.close")}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ================= FOOTER ================= */}
//       <footer className="bg-green-700 text-white mt-16">
//         <div className="max-w-7xl mx-auto px-6 py-8 text-center">
//           <h3 className="text-xl font-bold">🌱 FarmXpert</h3>
//           <p className="mt-2 text-green-100">
//             {t("soilCenters.footer")}
//           </p>
//           <p className="mt-4 text-sm text-green-200">
//             © {new Date().getFullYear()} FarmXpert
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }









// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   Phone,
//   Navigation,
//   Loader2,
//   Search,
//   RefreshCw,
//   Clock,
//   Globe,
//   Star,
//   AlertCircle
// } from "lucide-react";

// import api from "../api";
// import { useTranslation } from "react-i18next";

// export default function SoilCenters() {
//   const { t } = useTranslation();
  
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [centers, setCenters] = useState([]);
//   const [filteredCenters, setFilteredCenters] = useState([]);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [radius, setRadius] = useState(10000);
//   const [selectedCenter, setSelectedCenter] = useState(null);
//   const [location, setLocation] = useState({
//     latitude: null,
//     longitude: null
//   });

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   useEffect(() => {
//     filterCenters();
//   }, [search, centers]);

//   const filterCenters = () => {
//     if (search.trim() === "") {
//       setFilteredCenters(centers);
//       return;
//     }
//     const list = centers.filter(center =>
//       center.name.toLowerCase().includes(search.toLowerCase()) ||
//       center.address.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredCenters(list);
//   };

//   const getCurrentLocation = async () => {
//     setLoading(true);
//     setError("");
//     if (!navigator.geolocation) {
//       setError(t("geolocation_not_supported"));
//       setLoading(false);
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         setLocation({
//           latitude: lat,
//           longitude: lon
//         });
//         await fetchCenters(lat, lon, radius);
//       },
//       () => {
//         setLoading(false);
//         setError(t("location_denied"));
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000
//       }
//     );
//   };

//   const fetchCenters = async (lat, lon, rad) => {
//     try {
//       setLoading(true);
//       const res = await api.get(
//         `/soil-centers?lat=${lat}&lon=${lon}&radius=${rad}`
//       );
//       if (res.data.success) {
//         setCenters(res.data.centers);
//         setFilteredCenters(res.data.centers);
//       }
//     } catch (err) {
//       console.log(err);
//       setError(t("fetch_error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refresh = () => {
//     if (location.latitude && location.longitude) {
//       setRefreshing(true);
//       fetchCenters(location.latitude, location.longitude, radius)
//         .finally(() => setRefreshing(false));
//     } else {
//       getCurrentLocation();
//     }
//   };

//   const callCenter = (phone) => {
//     if (phone === "Not Available" || !phone) {
//       alert(t("phone_unavailable"));
//       return;
//     }
//     window.location.href = `tel:${phone}`;
//   };

//   const openDirections = (mapsUrl) => {
//     if (!mapsUrl) {
//       alert(t("directions_unavailable"));
//       return;
//     }
//     window.open(mapsUrl, "_blank");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-green-50">
//         <div className="flex flex-col items-center">
//           <Loader2 className="animate-spin text-green-600" size={50} />
//           <p className="mt-4 text-gray-600 font-medium">
//             {t("soil_centers_loading")}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-green-50">
//         <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
//           <AlertCircle className="mx-auto text-red-500" size={60} />
//           <h2 className="text-2xl font-bold mt-5 text-gray-800">{t("error")}</h2>
//           <p className="text-gray-600 mt-3">{error}</p>
//           <button
//             onClick={refresh}
//             className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
//           >
//             {t("try_again")}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
//       {/* ================= HEADER ================= */}
//       <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 shadow-xl">
//         <div className="max-w-7xl mx-auto px-6 py-10">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-col lg:flex-row justify-between items-center"
//           >
//             <div>
//               <h1 className="text-4xl font-bold text-white">
//                 🌱 {t("soil_centers_title")}
//               </h1>
//               <p className="mt-3 text-green-100 text-lg">
//                 {t("soil_centers_subtitle")}
//               </p>
//             </div>
//             <button
//               onClick={refresh}
//               disabled={refreshing}
//               className="mt-6 lg:mt-0 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-100 transition disabled:opacity-50"
//             >
//               <RefreshCw
//                 size={18}
//                 className={`inline mr-2 ${refreshing ? "animate-spin" : ""}`}
//               />
//               {t("refresh")}
//             </button>
//           </motion.div>
//         </div>
//       </div>

//       {/* ================= SEARCH ================= */}
//       <div className="max-w-7xl mx-auto px-6 mt-8">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="bg-white rounded-3xl shadow-lg p-6"
//         >
//           <div className="grid lg:grid-cols-3 gap-5">
//             {/* Search */}
//             <div className="relative">
//               <Search
//                 size={20}
//                 className="absolute left-4 top-4 text-gray-400"
//               />
//               <input
//                 type="text"
//                 placeholder={t("search_by_name_address")}
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
//               />
//             </div>

//             {/* Radius */}
//             <select
//               value={radius}
//               onChange={(e) => {
//                 const r = Number(e.target.value);
//                 setRadius(r);
//                 if (location.latitude && location.longitude) {
//                   fetchCenters(location.latitude, location.longitude, r);
//                 }
//               }}
//               className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
//             >
//               <option value={5000}>5 {t("km")}</option>
//               <option value={10000}>10 {t("km")}</option>
//               <option value={25000}>25 {t("km")}</option>
//               <option value={50000}>50 {t("km")}</option>
//             </select>

//             {/* Location */}
//             <div className="flex items-center gap-3">
//               <MapPin size={22} className="text-red-500" />
//               <div>
//                 <h3 className="font-semibold">{t("current_location")}</h3>
//                 <p className="text-sm text-gray-500">
//                   {location.latitude?.toFixed(4)}, {location.longitude?.toFixed(4)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Total Centers */}
//           <div className="mt-6 flex items-center gap-3">
//             <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
//     {t("centers_found", { count: filteredCenters.length })}
// </span>
//           </div>
//         </motion.div>
//       </div>

//       {/* ================= SOIL CENTER CARDS ================= */}
//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
//           {filteredCenters.map((center, index) => (
//             <motion.div
//               key={center._id || index}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//               whileHover={{
//                 y: -8,
//                 transition: { duration: 0.2 }
//               }}
//               className="bg-white rounded-3xl shadow-lg overflow-hidden border hover:shadow-2xl"
//             >
//               {/* Card Header */}
//               <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-5 text-white">
//                 <div className="flex justify-between">
//                   <h2 className="font-bold text-xl leading-7">{center.name}</h2>
//                   {center.verified && (
//                     <span className="bg-blue-500 px-3 py-1 rounded-full text-xs">
//                       {t("verified")}
//                     </span>
//                   )}
//                 </div>
//                 <div className="mt-3">
//                   <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
//                     📍 {center.distance?.toFixed(1) || "N/A"} {t("km_away")}
//                   </span>
//                 </div>
//               </div>

//               {/* Body */}
//               <div className="p-6">
//                 <div className="flex items-start gap-3">
//                   <MapPin className="text-red-500" size={20} />
//                   <p className="text-gray-600">{center.address}</p>
//                 </div>

//                 <div className="mt-4">
//                   <p className="text-sm text-gray-500">{t("contact_label")}</p>
//                   <p className="font-semibold">{center.phone || t("not_available")}</p>
//                 </div>

//                 <div className="flex gap-3 mt-6">
//                   <button
//                     onClick={() => callCenter(center.phone)}
//                     className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
//                   >
//                     <Phone size={18} />
//                     {t("call")}
//                   </button>
//                   <button
//                     onClick={() => openDirections(center.maps)}
//                     className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
//                   >
//                     <Navigation size={18} />
//                     {t("directions")}
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => setSelectedCenter(center)}
//                   className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl transition"
//                 >
//                   {t("view_details")}
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* ================= NO CENTERS FOUND ================= */}
//         {!loading && filteredCenters.length === 0 && (
//           <div className="max-w-5xl mx-auto py-20">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-white rounded-3xl shadow-xl p-12 text-center"
//             >
//               <MapPin size={70} className="mx-auto text-green-600" />
//               <h2 className="text-3xl font-bold mt-6">{t("no_centers_found")}</h2>
//               <p className="text-gray-500 mt-4">
//                 {t("no_centers_message")}
//               </p>
//               <button
//                 onClick={refresh}
//                 className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"
//               >
//                 {t("search_again")}
//               </button>
//             </motion.div>
//           </div>
//         )}
//       </div>

//       {/* ================= DETAILS MODAL ================= */}
//       {selectedCenter && (
//         <div
//           className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
//           onClick={() => setSelectedCenter(null)}
//         >
//           <div
//             className="bg-white rounded-3xl w-full max-w-xl p-8 max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 className="text-3xl font-bold">{selectedCenter.name}</h2>
//             <div className="mt-6 space-y-5">
//               <div>
//                 <p className="font-semibold">{t("address")}</p>
//                 <p className="text-gray-600">{selectedCenter.address}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">{t("phone")}</p>
//                 <p className="text-gray-600">{selectedCenter.phone || t("not_available")}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">{t("working_hours_label")}</p>
//                 <p className="text-gray-600">{selectedCenter.operating_hours || t("not_specified")}</p>
//               </div>
//               {selectedCenter.website && (
//                 <div>
//                   <p className="font-semibold">{t("website")}</p>
//                   <a
//                     href={selectedCenter.website}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-blue-600 hover:underline"
//                   >
//                     {t("visit_website")}
//                   </a>
//                 </div>
//               )}
//               <div>
//                 <p className="font-semibold">{t("description")}</p>
//                 <p className="text-gray-600">{selectedCenter.description || t("no_description")}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4 mt-8">
//               <button
//                 onClick={() => {
//                   callCenter(selectedCenter.phone);
//                   setSelectedCenter(null);
//                 }}
//                 className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
//               >
//                 {t("call")}
//               </button>
//               <button
//                 onClick={() => {
//                   openDirections(selectedCenter.maps);
//                   setSelectedCenter(null);
//                 }}
//                 className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
//               >
//                 {t("directions")}
//               </button>
//             </div>
//             <button
//               onClick={() => setSelectedCenter(null)}
//               className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition"
//             >
//               {t("close")}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ================= FOOTER ================= */}
//       <footer className="bg-green-700 text-white mt-16">
//         <div className="max-w-7xl mx-auto px-6 py-8 text-center">
//           <h3 className="text-xl font-bold">🌱 FarmXpert</h3>
//           <p className="mt-2 text-green-100">
//             {t("soil_centers_desc")}
//           </p>
//           <p className="mt-4 text-sm text-green-200">
//             © {new Date().getFullYear()} FarmXpert
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }



















import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Navigation,
  Loader2,
  Search,
  RefreshCw,
  Globe,
  AlertCircle,
  Building2,
  CheckCircle2,
  ArrowRight,
  LocateFixed,
  FlaskConical,
  X,
  Clock,
} from "lucide-react";

import api from "../api";
import { useTranslation } from "react-i18next";
import soilBackground from "../assets/soil-background-image.png";

export default function SoilCenters() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [centers, setCenters] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [radius, setRadius] = useState(10000);
  const [selectedCenter, setSelectedCenter] = useState(null);

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  /* ============================================================
     GET LOCATION
  ============================================================ */

  useEffect(() => {
    getCurrentLocation();
  }, []);

  /* ============================================================
     FILTER
  ============================================================ */

  useEffect(() => {
    filterCenters();
  }, [search, centers]);

  const filterCenters = () => {
    if (search.trim() === "") {
      setFilteredCenters(centers);
      return;
    }

    const list = centers.filter(
      (center) =>
        center.name?.toLowerCase().includes(search.toLowerCase()) ||
        center.address?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredCenters(list);
  };

  /* ============================================================
     CURRENT LOCATION
  ============================================================ */

  const getCurrentLocation = async () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError(t("geolocation_not_supported"));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLocation({
          latitude: lat,
          longitude: lon,
        });

        await fetchCenters(lat, lon, radius);
      },
      () => {
        setLoading(false);
        setError(t("location_denied"));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  /* ============================================================
     FETCH SOIL CENTERS
  ============================================================ */

  const fetchCenters = async (lat, lon, rad) => {
    try {
      setLoading(true);

      const res = await api.get(
        `/soil-centers?lat=${lat}&lon=${lon}&radius=${rad}`
      );

      if (res.data.success) {
        setCenters(res.data.centers);
        setFilteredCenters(res.data.centers);
      }
    } catch (err) {
      console.log(err);
      setError(t("fetch_error"));
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     REFRESH
  ============================================================ */

  const refresh = () => {
    if (location.latitude && location.longitude) {
      setRefreshing(true);

      fetchCenters(
        location.latitude,
        location.longitude,
        radius
      ).finally(() => setRefreshing(false));
    } else {
      getCurrentLocation();
    }
  };

  /* ============================================================
     CALL CENTER
  ============================================================ */

  const callCenter = (phone) => {
    if (phone === "Not Available" || !phone) {
      alert(t("phone_unavailable"));
      return;
    }

    window.location.href = `tel:${phone}`;
  };

  /* ============================================================
     DIRECTIONS
  ============================================================ */

  const openDirections = (mapsUrl) => {
    if (!mapsUrl) {
      alert(t("directions_unavailable"));
      return;
    }

    window.open(mapsUrl, "_blank");
  };

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5faf7]">
        <div className="flex flex-col items-center">

          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Loader2
              className="animate-spin text-[#159447]"
              size={32}
            />
          </div>

          <p className="mt-5 text-[#4b6359] font-medium">
            {t("soil_centers_loading")}
          </p>

        </div>
      </div>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5faf7] px-6">

        <div className="bg-white rounded-[28px] shadow-[0_12px_40px_rgba(15,65,40,0.10)] p-12 text-center max-w-md w-full border border-green-50">

          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle
              className="text-red-500"
              size={32}
            />
          </div>

          <h2 className="text-2xl font-bold mt-5 text-[#173c2d]">
            {t("error")}
          </h2>

          <p className="text-gray-500 mt-3 leading-relaxed">
            {error}
          </p>

          <button
            onClick={refresh}
            className="mt-7 bg-[#159447] hover:bg-[#117d3c] text-white px-7 py-3 rounded-xl font-semibold transition"
          >
            {t("try_again")}
          </button>

        </div>
      </div>
    );
  }

  /* ============================================================
     MAIN PAGE
  ============================================================ */

  return (
    <div className="min-h-screen bg-[#f6faf8] text-[#173c2d]">

      {/* ========================================================
          HERO HEADER
      ======================================================== */}

      <section className="relative h-[220px] overflow-hidden">

        {/* YOUR ACTUAL ASSET IMAGE */}
        <img
          src={soilBackground}
          alt="Soil and agricultural background"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
          "
        />

        {/* Soft overlay for readability */}
        <div className="absolute inset-0 bg-white/30" />

        {/* Bottom soft green overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[70px] bg-gradient-to-t from-[#d9f0db]/60 to-transparent" />

        {/* Header Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="flex items-center gap-4"
          >

            <h1 className="text-[38px] md:text-[42px] font-extrabold tracking-[-1px] text-[#123d2e] drop-shadow-sm">
              {t("soil_centers_title")}
            </h1>

          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.15,
            }}
            className="mt-2 text-[17px] text-[#31594a] font-medium drop-shadow-sm"
          >
            {t("soil_centers_subtitle")}
          </motion.p>

        </div>

      </section>

      {/* ========================================================
          SEARCH PANEL
      ======================================================== */}

      <div className="relative z-20 max-w-[1200px] mx-auto px-5 -mt-[38px]">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            bg-white
            rounded-[22px]
            shadow-[0_12px_35px_rgba(20,75,45,0.12)]
            border
            border-[#edf3ef]
            p-5
            md:p-6
          "
        >

          <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr_1fr_auto] gap-4 items-center">

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8da198]"
              />

              <input
                type="text"
                placeholder={t("search_by_name_address")}
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  w-full
                  h-[48px]
                  bg-white
                  border
                  border-[#dfe8e3]
                  rounded-xl
                  pl-11
                  pr-4
                  text-[14px]
                  text-[#304c40]
                  placeholder:text-[#98aaa1]
                  outline-none
                  focus:border-[#159447]
                  focus:ring-2
                  focus:ring-[#159447]/10
                  transition
                "
              />

            </div>

            {/* RADIUS */}

            <div className="relative">

              <select
                value={radius}
                onChange={(e) => {

                  const r = Number(e.target.value);

                  setRadius(r);

                  if (
                    location.latitude &&
                    location.longitude
                  ) {
                    fetchCenters(
                      location.latitude,
                      location.longitude,
                      r
                    );
                  }

                }}
                className="
                  w-full
                  h-[48px]
                  appearance-none
                  bg-white
                  border
                  border-[#dfe8e3]
                  rounded-xl
                  px-4
                  text-[14px]
                  text-[#304c40]
                  outline-none
                  focus:border-[#159447]
                  focus:ring-2
                  focus:ring-[#159447]/10
                  cursor-pointer
                "
              >

                <option value={5000}>
                  5 {t("km")}
                </option>

                <option value={10000}>
                  10 {t("km")}
                </option>

                <option value={25000}>
                  25 {t("km")}
                </option>

                <option value={50000}>
                  50 {t("km")}
                </option>

              </select>

              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#587166]">
                ▾
              </span>

            </div>

            {/* LOCATION */}

            <div className="flex items-center gap-3 min-w-0 px-1">

              <div className="w-[42px] h-[42px] shrink-0 rounded-xl bg-[#eff9f2] flex items-center justify-center">

                <LocateFixed
                  size={20}
                  className="text-[#159447]"
                />

              </div>

              <div className="min-w-0">

                <h3 className="font-semibold text-[14px] text-[#193c2f]">
                  {t("current_location")}
                </h3>

                <p className="text-[12px] text-[#81928b] truncate">
                  {location.latitude?.toFixed(4)},{" "}
                  {location.longitude?.toFixed(4)}
                </p>

              </div>

            </div>

           

            

          </div>

          {/* RESULT BAR */}

          <div className="
            mt-5
            bg-[#f2faf5]
            border
            border-[#e2f2e7]
            rounded-xl
            px-5
            py-3.5
            flex
            flex-col
            sm:flex-row
            justify-between
            gap-3
          ">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">

                <FlaskConical
                  size={19}
                  className="text-[#159447]"
                />

              </div>

              <div>

                <p className="text-[14px] font-bold text-[#17643d]">
                  {t("centers_found", {
                    count: filteredCenters.length,
                  })}
                </p>

                <p className="text-[12px] text-[#769187]">
                  within {radius / 1000} km radius
                </p>

              </div>

            </div>

            <button
              onClick={refresh}
              disabled={refreshing}
              className="
                flex
                items-center
                gap-2
                text-[13px]
                font-medium
                text-[#17643d]
                hover:text-[#0c5835]
                transition
              "
            >

              <RefreshCw
                size={16}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              <span>
                {t("refresh")} Results
              </span>

            </button>

          </div>

        </motion.div>

      </div>

      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <div className="max-w-[1200px] mx-auto px-5 pt-5 pb-10">

        <div className="
          grid
          grid-cols-1
          xl:grid-cols-[1.18fr_0.82fr]
          gap-5
          items-start
        ">

          {/* ====================================================
              CENTER LIST
          ==================================================== */}

          <div className="space-y-4">

            {filteredCenters.map(
              (center, index) => (

                <motion.div
                  key={center._id || index}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    bg-white
                    rounded-[20px]
                    border
                    border-[#e7eee9]
                    shadow-[0_6px_22px_rgba(22,73,48,0.07)]
                    hover:shadow-[0_10px_30px_rgba(22,73,48,0.11)]
                    p-5
                    transition-all
                  "
                >

                  <div className="flex flex-col md:flex-row gap-5">

                    {/* NUMBER */}

                    <div className="hidden sm:flex shrink-0">

                      <div className="
                        w-[42px]
                        h-[42px]
                        rounded-xl
                        bg-[#159447]
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-[15px]
                        shadow-sm
                      ">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                    </div>

                    {/* INFORMATION */}

                    <div className="flex-1 min-w-0">

                      <div className="flex flex-wrap items-start gap-2">

                        <h2 className="
                          text-[20px]
                          font-bold
                          leading-6
                          text-[#143c2d]
                        ">
                          {center.name}
                        </h2>

                        {center.verified && (
                          <span className="
                            inline-flex
                            items-center
                            gap-1
                            px-2.5
                            py-1
                            rounded-full
                            bg-[#e9f8ee]
                            text-[#197342]
                            text-[11px]
                            font-semibold
                          ">

                            <CheckCircle2 size={12} />

                            {t("verified")}

                          </span>
                        )}

                      </div>

                      {/* DISTANCE */}

                      <div className="mt-3 flex items-center gap-2">

                        <MapPin
                          size={16}
                          className="text-[#159447]"
                        />

                        <span className="
                          text-[13px]
                          font-medium
                          text-[#516a60]
                        ">
                          {center.distance?.toFixed(1) ||
                            "N/A"}{" "}
                          {t("km_away")}
                        </span>

                      </div>

                      {/* ADDRESS */}

                      <div className="
                        mt-3
                        flex
                        items-start
                        gap-2.5
                      ">

                        <Building2
                          size={17}
                          className="
                            text-[#758a82]
                            mt-[2px]
                            shrink-0
                          "
                        />

                        <p className="
                          text-[13px]
                          leading-5
                          text-[#60746b]
                        ">
                          {center.address}
                        </p>

                      </div>

                      {/* PHONE */}

                      <div className="
                        mt-2.5
                        flex
                        items-center
                        gap-2.5
                      ">

                        <Phone
                          size={16}
                          className="text-[#758a82]"
                        />

                        <p className="
                          text-[13px]
                          text-[#60746b]
                        ">
                          {center.phone ||
                            t("not_available")}
                        </p>

                      </div>

                      {/* BUTTONS */}

                      <div className="
                        mt-5
                        flex
                        flex-wrap
                        items-center
                        gap-2.5
                      ">

                        <button
                          onClick={() =>
                            callCenter(
                              center.phone
                            )
                          }
                          className="
                            h-[38px]
                            px-6
                            rounded-lg
                            bg-[#159447]
                            hover:bg-[#117d3d]
                            text-white
                            text-[13px]
                            font-semibold
                            flex
                            items-center
                            justify-center
                            gap-2
                            transition
                          "
                        >

                          <Phone size={15} />

                          {t("call")}

                        </button>

                        <button
                          onClick={() =>
                            openDirections(
                              center.maps
                            )
                          }
                          className="
                            h-[38px]
                            px-5
                            rounded-lg
                            border
                            border-[#159447]
                            text-[#159447]
                            hover:bg-[#eff9f2]
                            text-[13px]
                            font-semibold
                            flex
                            items-center
                            justify-center
                            gap-2
                            transition
                          "
                        >

                          <Navigation size={15} />

                          {t("directions")}

                        </button>

                        <button
                          onClick={() =>
                            setSelectedCenter(
                              center
                            )
                          }
                          className="
                            ml-auto
                            h-[38px]
                            px-2
                            text-[#315b4a]
                            hover:text-[#159447]
                            text-[13px]
                            font-medium
                            flex
                            items-center
                            gap-1
                            transition
                          "
                        >

                          {t("view_details")}

                          <ArrowRight size={15} />

                        </button>

                      </div>

                    </div>

                    {/* CENTER IMAGE */}

                    <div className="
                      w-full
                      md:w-[200px]
                      lg:w-[205px]
                      h-[135px]
                      shrink-0
                      rounded-xl
                      overflow-hidden
                      bg-gradient-to-br
                      from-[#dff1e4]
                      to-[#a9d8b5]
                      relative
                    ">

                      {center.image ? (
                        <img
                          src={center.image}
                          alt={center.name}
                          className="
                            w-full
                            h-full
                            object-cover
                          "
                        />
                      ) : (
                        <>
                          <div className="
                            absolute
                            inset-0
                            bg-gradient-to-br
                            from-[#d9eee0]
                            via-[#b8dcbf]
                            to-[#7fb58b]
                          " />

                          <div className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-[#27603e]
                          ">

                            <FlaskConical size={34} />

                            <span className="
                              mt-2
                              text-[11px]
                              font-semibold
                            ">
                              Soil Testing Center
                            </span>

                          </div>
                        </>
                      )}

                    </div>

                  </div>

                </motion.div>

              )
            )}

            {/* NO RESULTS */}

            {!loading &&
              filteredCenters.length === 0 && (

                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  className="
                    bg-white
                    rounded-[22px]
                    border
                    border-[#e6eee9]
                    shadow-sm
                    p-12
                    text-center
                  "
                >

                  <div className="
                    w-16
                    h-16
                    mx-auto
                    rounded-full
                    bg-[#edf8f1]
                    flex
                    items-center
                    justify-center
                  ">

                    <MapPin
                      size={30}
                      className="text-[#159447]"
                    />

                  </div>

                  <h2 className="
                    text-2xl
                    font-bold
                    mt-5
                    text-[#173c2d]
                  ">
                    {t("no_centers_found")}
                  </h2>

                  <p className="text-gray-500 mt-3">
                    {t("no_centers_message")}
                  </p>

                  <button
                    onClick={refresh}
                    className="
                      mt-6
                      bg-[#159447]
                      hover:bg-[#117d3c]
                      text-white
                      px-7
                      py-3
                      rounded-xl
                      font-semibold
                      transition
                    "
                  >
                    {t("search_again")}
                  </button>

                </motion.div>

              )}

          </div>

          {/* ====================================================
              MAP PANEL
          ==================================================== */}

          <div className="xl:sticky xl:top-5">

            <div className="
              bg-white
              rounded-[20px]
              border
              border-[#e5ece8]
              overflow-hidden
              shadow-[0_6px_22px_rgba(22,73,48,0.07)]
            ">

              {/* MAP */}

              <div className="
                relative
                h-[455px]
                overflow-hidden
                bg-[#e8f1df]
              ">

                <div className="
                  absolute
                  inset-0
                  bg-[#e7f0dd]
                ">

                  {/* Roads */}

                  <div className="
                    absolute
                    w-[140%]
                    h-[3px]
                    bg-white
                    rotate-[20deg]
                    top-[42%]
                    left-[-20%]
                    shadow-sm
                  " />

                  <div className="
                    absolute
                    w-[120%]
                    h-[4px]
                    bg-white
                    rotate-[-30deg]
                    top-[55%]
                    left-[-10%]
                    shadow-sm
                  " />

                  <div className="
                    absolute
                    w-[100%]
                    h-[3px]
                    bg-white
                    rotate-[65deg]
                    top-[30%]
                    left-[20%]
                  " />

                  <div className="
                    absolute
                    w-[130%]
                    h-[2px]
                    bg-[#d1dfc7]
                    rotate-[10deg]
                    top-[62%]
                    left-[-10%]
                  " />

                  <div className="
                    absolute
                    w-[100%]
                    h-[2px]
                    bg-[#d1dfc7]
                    rotate-[-15deg]
                    top-[20%]
                    left-[10%]
                  " />

                  {/* WATER */}

                  <div className="
                    absolute
                    w-[170px]
                    h-[600px]
                    bg-[#c8e2e9]
                    opacity-70
                    rotate-[20deg]
                    right-[25%]
                    top-[-80px]
                    rounded-[50%]
                  " />

                  {/* GREEN AREAS */}

                  <div className="
                    absolute
                    w-[130px]
                    h-[80px]
                    bg-[#c8e2b5]
                    rounded-[50%]
                    top-[15%]
                    left-[15%]
                  " />

                  <div className="
                    absolute
                    w-[170px]
                    h-[100px]
                    bg-[#c2ddb1]
                    rounded-[50%]
                    bottom-[20%]
                    right-[10%]
                  " />

                  <div className="
                    absolute
                    w-[100px]
                    h-[70px]
                    bg-[#d0e5bf]
                    rounded-[50%]
                    bottom-[12%]
                    left-[20%]
                  " />

                  {/* LABELS */}

                  <span className="
                    absolute
                    top-[18%]
                    right-[18%]
                    text-[11px]
                    text-[#6b766d]
                    font-medium
                  ">
                    Rajole
                  </span>

                  <span className="
                    absolute
                    top-[42%]
                    left-[25%]
                    text-[11px]
                    text-[#68756c]
                  ">
                    Samarlakot
                  </span>

                  <span className="
                    absolute
                    top-[55%]
                    right-[20%]
                    text-[11px]
                    text-[#68756c]
                  ">
                    Rajamahendravaram
                  </span>

                  <span className="
                    absolute
                    bottom-[24%]
                    left-[45%]
                    text-[11px]
                    text-[#68756c]
                  ">
                    Peddapuram
                  </span>

                  <span className="
                    absolute
                    bottom-[18%]
                    right-[18%]
                    text-[11px]
                    text-[#68756c]
                  ">
                    Kakinada
                  </span>

                </div>

                {/* CURRENT LOCATION */}

                <div
                  className="absolute"
                  style={{
                    left: "40%",
                    top: "42%",
                  }}
                >

                  <div className="relative">

                    <div className="
                      absolute
                      -inset-2
                      bg-blue-400/20
                      rounded-full
                      animate-pulse
                    " />

                    <div className="
                      relative
                      w-[25px]
                      h-[25px]
                      rounded-full
                      bg-white
                      border-[5px]
                      border-blue-500
                      shadow-lg
                    " />

                  </div>

                </div>

                {/* CENTER MARKERS */}

                {filteredCenters.map(
                  (center, index) => {

                    const positions = [
                      {
                        left: "59%",
                        top: "31%",
                      },
                      {
                        left: "32%",
                        top: "69%",
                      },
                      {
                        left: "70%",
                        top: "54%",
                      },
                      {
                        left: "23%",
                        top: "37%",
                      },
                    ];

                    const pos =
                      positions[index] ||
                      positions[0];

                    return (
                      <motion.button
                        key={`map-${center._id || index}`}
                        initial={{
                          scale: 0,
                          opacity: 0,
                        }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                        }}
                        transition={{
                          delay: index * 0.1,
                        }}
                        onClick={() =>
                          setSelectedCenter(
                            center
                          )
                        }
                        className="absolute"
                        style={{
                          left: pos.left,
                          top: pos.top,
                        }}
                      >

                        <div className="relative">

                          <div className="
                            w-[34px]
                            h-[34px]
                            rounded-full
                            bg-[#159447]
                            border-[3px]
                            border-white
                            shadow-lg
                            flex
                            items-center
                            justify-center
                            text-white
                            text-[10px]
                            font-bold
                          ">
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </div>

                          <div className="
                            absolute
                            left-1/2
                            -bottom-[7px]
                            -translate-x-1/2
                            w-0
                            h-0
                            border-l-[6px]
                            border-r-[6px]
                            border-t-[8px]
                            border-l-transparent
                            border-r-transparent
                            border-t-[#159447]
                          " />

                        </div>

                      </motion.button>
                    );
                  }
                )}

                {/* ZOOM CONTROLS */}

                <div className="
                  absolute
                  right-4
                  bottom-4
                  bg-white
                  rounded-xl
                  shadow-md
                  overflow-hidden
                  border
                  border-gray-100
                ">

                  <button
                    className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      text-xl
                      text-[#315449]
                      hover:bg-gray-50
                    "
                    onClick={() => {}}
                  >
                    +
                  </button>

                  <div className="h-px bg-gray-100" />

                  <button
                    className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      text-xl
                      text-[#315449]
                      hover:bg-gray-50
                    "
                    onClick={() => {}}
                  >
                    −
                  </button>

                  <div className="h-px bg-gray-100" />

                  <button
                    className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      text-[#315449]
                      hover:bg-gray-50
                    "
                    onClick={getCurrentLocation}
                  >
                    <LocateFixed size={17} />
                  </button>

                </div>

                {/* MAP LABEL */}

                <div className="
                  absolute
                  left-4
                  top-4
                  bg-white/95
                  backdrop-blur
                  rounded-lg
                  px-3
                  py-2
                  shadow-sm
                ">

                  <div className="
                    flex
                    items-center
                    gap-2
                  ">

                    <Globe
                      size={15}
                      className="text-[#159447]"
                    />

                    <span className="
                      text-[12px]
                      font-semibold
                      text-[#315449]
                    ">
                      Soil Centers
                    </span>

                  </div>

                </div>

              </div>

              {/* MAP FOOTER */}

              <div className="
                px-5
                py-4
                border-t
                border-[#e8eee9]
              ">

                <div className="
                  flex
                  items-start
                  gap-3
                ">

                  <div className="mt-0.5">

                    <MapPin
                      size={17}
                      className="text-[#159447]"
                    />

                  </div>

                  <div>

                    <p className="
                      text-[13px]
                      font-semibold
                      text-[#315449]
                    ">
                      Showing results within{" "}
                      {radius / 1000} km radius
                    </p>

                    <p className="
                      text-[12px]
                      text-[#83938c]
                      mt-1
                    ">
                      Select a marker to view center
                      details
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          DETAILS MODAL
      ======================================================== */}

      {selectedCenter && (

        <div
          className="
            fixed
            inset-0
            bg-[#082319]/55
            backdrop-blur-[3px]
            flex
            justify-center
            items-center
            z-50
            p-4
          "
          onClick={() =>
            setSelectedCenter(null)
          }
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              bg-white
              rounded-[24px]
              w-full
              max-w-[560px]
              max-h-[90vh]
              overflow-y-auto
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="
              p-6
              border-b
              border-gray-100
              flex
              items-start
              justify-between
            ">

              <div>

                <div className="
                  flex
                  items-center
                  gap-2
                ">

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-[#eaf8ef]
                    flex
                    items-center
                    justify-center
                  ">

                    <FlaskConical
                      size={20}
                      className="text-[#159447]"
                    />

                  </div>

                  <div>

                    <h2 className="
                      text-[22px]
                      font-bold
                      text-[#163c2e]
                    ">
                      {selectedCenter.name}
                    </h2>

                    {selectedCenter.verified && (

                      <span className="
                        inline-flex
                        items-center
                        gap-1
                        text-[11px]
                        text-[#197342]
                        font-semibold
                        mt-1
                      ">

                        <CheckCircle2 size={12} />

                        {t("verified")}

                      </span>

                    )}

                  </div>

                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedCenter(null)
                }
                className="
                  w-9
                  h-9
                  rounded-full
                  hover:bg-gray-100
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  transition
                "
              >
                <X size={18} />
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="p-6 space-y-5">

              {/* ADDRESS */}

              <div className="
                flex
                items-start
                gap-3
              ">

                <MapPin
                  size={19}
                  className="
                    text-[#159447]
                    mt-0.5
                  "
                />

                <div>

                  <p className="
                    text-[12px]
                    font-semibold
                    text-[#82928b]
                    uppercase
                    tracking-wide
                  ">
                    {t("address")}
                  </p>

                  <p className="
                    text-[14px]
                    text-[#52685f]
                    mt-1
                    leading-6
                  ">
                    {selectedCenter.address}
                  </p>

                </div>

              </div>

              {/* PHONE */}

              <div className="
                flex
                items-start
                gap-3
              ">

                <Phone
                  size={19}
                  className="
                    text-[#159447]
                    mt-0.5
                  "
                />

                <div>

                  <p className="
                    text-[12px]
                    font-semibold
                    text-[#82928b]
                    uppercase
                    tracking-wide
                  ">
                    {t("phone")}
                  </p>

                  <p className="
                    text-[14px]
                    text-[#52685f]
                    mt-1
                  ">
                    {selectedCenter.phone ||
                      t("not_available")}
                  </p>

                </div>

              </div>

              {/* WORKING HOURS */}

              <div className="
                flex
                items-start
                gap-3
              ">

                <Clock
                  size={19}
                  className="
                    text-[#159447]
                    mt-0.5
                  "
                />

                <div>

                  <p className="
                    text-[12px]
                    font-semibold
                    text-[#82928b]
                    uppercase
                    tracking-wide
                  ">
                    {t("working_hours_label")}
                  </p>

                  <p className="
                    text-[14px]
                    text-[#52685f]
                    mt-1
                  ">
                    {selectedCenter.operating_hours ||
                      t("not_specified")}
                  </p>

                </div>

              </div>

              {/* WEBSITE */}

              {selectedCenter.website && (

                <div className="
                  flex
                  items-start
                  gap-3
                ">

                  <Globe
                    size={19}
                    className="
                      text-[#159447]
                      mt-0.5
                    "
                  />

                  <div>

                    <p className="
                      text-[12px]
                      font-semibold
                      text-[#82928b]
                      uppercase
                      tracking-wide
                    ">
                      {t("website")}
                    </p>

                    <a
                      href={selectedCenter.website}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        text-[14px]
                        text-[#159447]
                        hover:underline
                        mt-1
                        inline-block
                      "
                    >
                      {t("visit_website")}
                    </a>

                  </div>

                </div>

              )}

              {/* DESCRIPTION */}

              <div className="
                bg-[#f4faf6]
                border
                border-[#e5f0e8]
                rounded-xl
                p-4
              ">

                <p className="
                  text-[12px]
                  font-semibold
                  text-[#82928b]
                  uppercase
                  tracking-wide
                ">
                  {t("description")}
                </p>

                <p className="
                  text-[14px]
                  text-[#52685f]
                  mt-2
                  leading-6
                ">
                  {selectedCenter.description ||
                    t("no_description")}
                </p>

              </div>

            </div>

            {/* MODAL BUTTONS */}

            <div className="px-6 pb-6">

              <div className="
                grid
                grid-cols-2
                gap-3
              ">

                <button
                  onClick={() => {

                    callCenter(
                      selectedCenter.phone
                    );

                    setSelectedCenter(null);

                  }}
                  className="
                    h-[45px]
                    rounded-xl
                    bg-[#159447]
                    hover:bg-[#117d3d]
                    text-white
                    font-semibold
                    text-[13px]
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                  "
                >

                  <Phone size={16} />

                  {t("call")}

                </button>

                <button
                  onClick={() => {

                    openDirections(
                      selectedCenter.maps
                    );

                    setSelectedCenter(null);

                  }}
                  className="
                    h-[45px]
                    rounded-xl
                    border
                    border-[#159447]
                    text-[#159447]
                    hover:bg-[#eff9f2]
                    font-semibold
                    text-[13px]
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                  "
                >

                  <Navigation size={16} />

                  {t("directions")}

                </button>

              </div>

              <button
                onClick={() =>
                  setSelectedCenter(null)
                }
                className="
                  w-full
                  mt-3
                  h-[43px]
                  rounded-xl
                  bg-gray-100
                  hover:bg-gray-200
                  text-gray-600
                  font-medium
                  text-[13px]
                  transition
                "
              >
                {t("close")}
              </button>

            </div>

          </motion.div>

        </div>

      )}

    </div>
  );
}