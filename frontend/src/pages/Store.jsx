// import { ShoppingBag, Plus, Check } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import { toast } from 'react-toastify';
// import { useState } from 'react';

// export default function Store() {
//     const { t } = useTranslation();
//     const [cartCount, setCartCount] = useState(0);

//     const products = [
//         { id: 1, name: 'Premium Urea', price: '₹450', category: t('farm_store'), image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=400' },
//         { id: 2, name: 'DAP Fertilizer', price: '₹1200', category: t('farm_store'), image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=400' },
//         { id: 3, name: 'Hybrid Rice Seeds', price: '₹800/kg', category: t('category_seeds'), image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400' },
//         { id: 4, name: 'Organic Pest Control', price: '₹350', category: t('category_pesticide'), image: 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=400' },
//         { id: 5, name: 'Potash 50kg', price: '₹950', category: t('category_fertilizer'), image: 'https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?auto=format&fit=crop&w=400' },
//         { id: 6, name: 'Wheat Seeds High Yield', price: '₹60/kg', category: t('category_seeds'), image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400' },
//     ];

//     const addToCart = (name) => {
//         setCartCount(prev => prev + 1);
//         toast.success(`${name} ${t('added_to_cart')}`);
//     };

//     return (
//         <div className="space-y-8">
//             <div className="flex justify-between items-end">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-800">{t('farm_store')}</h1>
//                     <p className="text-gray-500">{t('farm_store_desc')}</p>
//                 </div>
//                 <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2 px-4">
//                     <ShoppingBag size={18} className="text-primary" />
//                     <span className="font-bold text-gray-700">{t('cart_items', { count: cartCount })}</span>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {products.map(p => (
//                     <div key={p.id} className="glass-card bg-white p-0 overflow-hidden group">
//                         <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center relative">
//                             <img
//                                 src={p.image}
//                                 alt={p.name}
//                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                             />
//                             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
//                         </div>
//                         <div className="p-6">
//                             <span className="text-xs font-bold text-primary uppercase tracking-wider">{p.category}</span>
//                             <h3 className="text-lg font-bold text-gray-800 mt-1">{p.name}</h3>
//                             <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
//                                 <span className="text-xl font-bold text-gray-900">{p.price}</span>
//                                 <button
//                                     onClick={() => addToCart(p.name)}
//                                     className="p-2 bg-gray-900 text-white rounded-lg hover:bg-primary transition-colors active:scale-95"
//                                 >
//                                     <Plus size={20} />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }










// import { useEffect, useState } from "react";
// import api from "../api";

// export default function Store() {

//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [showCheckout, setShowCheckout] = useState(false);
//   const [customer, setCustomer] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: ""
//   });

//   // Load Razorpay Script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   // Fetch Products
//   useEffect(() => {
//     api.get("/store/products")
//       .then(res => setProducts(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   const addToCart = (item) => {
//     setCart(prev => [...prev, item]);
//   };

//   const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

//   const handlePayment = async () => {

//     if (totalAmount === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     try {

//       const { data: order } = await api.post("/payment/create-order", {
//         amount: totalAmount
//       });

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: "INR",
//         name: "Agri Fertilizer Store",
//         description: "Order Payment",
//         order_id: order.id,

//         handler: async function (response) {

//           const verify = await api.post("/payment/verify-payment", response);

//           if (verify.data.success) {
//             alert("Payment Successful 🎉");
//             setCart([]);
//             setShowCheckout(false);
//           } else {
//             alert("Payment Failed ❌");
//           }
//         },

//         prefill: {
//           name: customer.name,
//           email: customer.email,
//           contact: customer.phone
//         },

//         theme: {
//           color: "#16a34a"
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (err) {
//       console.log(err);
//       alert("Payment initialization failed");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* PRODUCTS SECTION */}
//       <div className="flex-1 p-8">

//         <h1 className="text-4xl font-bold mb-8">
//           Agri Fertilizer Store
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

//           {products.map(item => (

//             <div
//               key={item._id}
//               className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4"
//             >

//               {/* Image Container */}
//               <div className="h-56 flex items-center justify-center bg-gray-50 rounded">

//                 <img
//                   src={`/products/${item.image}`}
//                   alt={item.name}
//                   className="max-h-52 object-contain"
//                   loading="lazy"
//                 />

//               </div>

//               <h3 className="font-semibold mt-4 text-lg">
//                 {item.name}
//               </h3>

//               <p className="text-green-600 font-bold text-xl mt-1">
//                 ₹{item.price}
//               </p>

//               <button
//                 onClick={() => addToCart(item)}
//                 className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg w-full transition"
//               >
//                 Add to Cart
//               </button>

//             </div>

//           ))}

//         </div>
//       </div>

//       {/* CART SECTION */}
//       <div className="w-80 bg-white shadow-lg p-6">

//         <h2 className="text-2xl font-bold mb-4">
//           Cart ({cart.length})
//         </h2>

//         {cart.map((item, i) => (
//           <div key={i} className="border-b py-2">
//             <p>{item.name}</p>
//             <p className="text-green-600 font-bold">₹{item.price}</p>
//           </div>
//         ))}

//         <p className="mt-4 font-bold text-lg">
//           Total: ₹{totalAmount}
//         </p>

//         {cart.length > 0 && (
//           <button
//             onClick={() => setShowCheckout(true)}
//             className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
//           >
//             Buy Now
//           </button>
//         )}

//       </div>

//       {/* CHECKOUT MODAL */}
//       {showCheckout && (

//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

//           <div className="bg-white p-6 rounded-lg w-96">

//             <h2 className="text-xl font-bold mb-4">
//               Checkout Details
//             </h2>

//             <input
//               placeholder="Full Name"
//               className="border p-2 w-full mb-2 rounded"
//               onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
//             />

//             <input
//               placeholder="Email"
//               className="border p-2 w-full mb-2 rounded"
//               onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
//             />

//             <input
//               placeholder="Phone"
//               className="border p-2 w-full mb-2 rounded"
//               onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
//             />

//             <textarea
//               placeholder="Delivery Address"
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
//             />

//             <button
//               onClick={handlePayment}
//               className="bg-green-600 hover:bg-green-700 text-white py-2 rounded w-full"
//             >
//               Proceed to Payment
//             </button>

//             <button
//               onClick={() => setShowCheckout(false)}
//               className="mt-2 text-red-500 w-full"
//             >
//               Cancel
//             </button>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }




















// import { useEffect, useState, useMemo } from "react";
// import api from "../api";

// export default function Store({ setCart }) {

//   const [products, setProducts] = useState([]);

//   const [filters, setFilters] = useState({
//     category: "fertilizer",
//     seedType: "",
//     type: "",
//     nutrient: ""
//   });

//   useEffect(() => {
//     api.get("/store/products")
//       .then(res => setProducts(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   const filteredProducts = useMemo(() => {
//     return products.filter(item => {

//       const category = (item.category || "").toLowerCase();
//       const type = (item.type || "").toLowerCase();
//       const nutrient = (item.nutrient || "").toLowerCase();
//       const seedType = (item.seedType || "").toLowerCase();

//       if (filters.category === "fertilizer") {
//         if (category !== "fertilizer") return false;

//         const typeMatch =
//           filters.type === "" || type === filters.type;

//         const nutrientMatch =
//           filters.nutrient === "" || nutrient === filters.nutrient;

//         return typeMatch && nutrientMatch;
//       }

//       if (filters.category === "seed") {
//         if (category !== "seed") return false;

//         const seedMatch =
//           filters.seedType === "" || seedType === filters.seedType;

//         return seedMatch;
//       }

//       return true;
//     });
//   }, [products, filters]);

//   const addToCart = (item) => {
//     setCart(prev => [...prev, item]);
//   };

//   const clearFilters = () => {
//     setFilters({
//       category: "fertilizer",
//       seedType: "",
//       type: "",
//       nutrient: ""
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 transition-all duration-500">

//       <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">

//         {/* ================= FILTER ================= */}
//         <div className="w-56 bg-white rounded-2xl shadow-md p-4 h-fit sticky top-24 border border-gray-100 transition-all duration-300 hover:shadow-lg">

//           <h2 className="text-base font-semibold text-gray-800 mb-4">
//             Filters
//           </h2>

//           {/* CATEGORY */}
//           <div className="mb-4">
//             <p className="text-sm font-medium text-gray-600 mb-2">
//               Category
//             </p>

//             <div className="space-y-2">
//               {["fertilizer", "seed"].map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() =>
//                     setFilters({
//                       category: cat,
//                       seedType: "",
//                       type: "",
//                       nutrient: ""
//                     })
//                   }
//                   className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all duration-300 transform hover:scale-[1.02] ${
//                     filters.category === cat
//                       ? "bg-green-600 text-white shadow-md"
//                       : "bg-gray-100 hover:bg-green-100 text-gray-700"
//                   }`}
//                 >
//                   {cat === "fertilizer" ? "Fertilizers" : "Seeds"}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* SEED FILTER */}
//           {filters.category === "seed" && (
//             <div className="mb-4">
//               <p className="text-sm font-medium text-gray-600 mb-2">
//                 Seed Type
//               </p>

//               <div className="flex flex-wrap gap-2">
//                 {["vegetable", "fruit"].map((type) => (
//                   <button
//                     key={type}
//                     onClick={() =>
//                       setFilters(prev => ({ ...prev, seedType: type }))
//                     }
//                     className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 ${
//                       filters.seedType === type
//                         ? "bg-green-600 text-white shadow"
//                         : "bg-gray-100 hover:bg-green-100 text-gray-700"
//                     }`}
//                   >
//                     {type === "vegetable" ? "Vegetables" : "Fruits"}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* FERTILIZER FILTERS */}
//           {filters.category === "fertilizer" && (
//             <>
//               <div className="mb-4">
//                 <p className="text-sm font-medium text-gray-600 mb-2">
//                   Type
//                 </p>

//                 <div className="flex flex-wrap gap-2">
//                   {["organic", "inorganic", "bio"].map((type) => (
//                     <button
//                       key={type}
//                       onClick={() =>
//                         setFilters(prev => ({ ...prev, type }))
//                       }
//                       className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 ${
//                         filters.type === type
//                           ? "bg-green-600 text-white shadow"
//                           : "bg-gray-100 hover:bg-green-100 text-gray-700"
//                       }`}
//                     >
//                       {type === "bio"
//                         ? "Bio"
//                         : type.charAt(0).toUpperCase() + type.slice(1)}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <p className="text-sm font-medium text-gray-600 mb-2">
//                   Nutrient
//                 </p>

//                 <div className="flex flex-wrap gap-2">
//                   {["nitrogen", "phosphorus", "potassium"].map((nut) => (
//                     <button
//                       key={nut}
//                       onClick={() =>
//                         setFilters(prev => ({ ...prev, nutrient: nut }))
//                       }
//                       className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 ${
//                         filters.nutrient === nut
//                           ? "bg-green-600 text-white shadow"
//                           : "bg-gray-100 hover:bg-green-100 text-gray-700"
//                       }`}
//                     >
//                       {nut.charAt(0).toUpperCase() + nut.slice(1)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}

//           <button
//             onClick={clearFilters}
//             className="mt-3 w-full border border-gray-300 hover:border-green-600 text-sm py-1.5 rounded-lg transition-all duration-300 hover:bg-green-50"
//           >
//             Clear
//           </button>

//         </div>

//         {/* ================= PRODUCTS ================= */}
//         <div className="flex-1">

//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-2xl font-semibold text-gray-800">
//               SmartCrop Store
//             </h1>
//             <span className="text-sm text-gray-500">
//               {filteredProducts.length} Products
//             </span>
//           </div>

//           {filteredProducts.length === 0 && (
//             <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
//               No products found.
//             </div>
//           )}

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

//             {filteredProducts.map(item => (
//               <div
//                 key={item._id}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 group"
//               >
//                 <div className="h-48 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
//                   <img
//                     src={`/products/${item.image}`}
//                     alt={item.name}
//                     className="max-h-36 object-contain transition-transform duration-500 group-hover:scale-110"
//                   />
//                 </div>

//                 <div className="p-4">
//                   <h3 className="font-medium text-gray-800 text-sm mb-2">
//                     {item.name}
//                   </h3>

//                   <p className="text-green-600 text-base font-semibold">
//                     ₹{item.price}
//                   </p>

//                   <button
//                     onClick={() => addToCart(item)}
//                     className="mt-3 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-lg w-full text-sm transition-all duration-300 hover:scale-[1.02]"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }














// import { useEffect, useState, useMemo } from "react";
// import { Search, Heart, X } from "lucide-react";
// import api from "../api";
// import Cookies from "js-cookie";
// import { Package } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// export default function Store({ setCart }) {
//   const { t } = useTranslation();
// const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");
//   const [wishlist, setWishlist] = useState([]);
//   const [wishlistOpen, setWishlistOpen] = useState(false);

//   const [filters, setFilters] = useState({
//     category: "fertilizer",
//     seedType: "",
//     type: "",
//     nutrient: ""
//   });

//   useEffect(() => {
//     api.get("/store/products")
//       .then(res => setProducts(res.data))
//       .catch(err => console.log(err));
//   }, []);


//   useEffect(() => {
//   const fetchWishlist = async () => {
//     try {
//       const token = Cookies.get("token");
//       if (!token) return;

//       const { data } = await api.get("/wishlist");

//       if (data && data.products) {
//         setWishlist(data.products);
//       }
//     } catch (err) {
//       console.error("Wishlist fetch error:", err.response?.data || err.message);
//     }
//   };

//   fetchWishlist();
// }, []);




//   const toggleWishlist = async (item) => {
//   try {
//     await api.post("/wishlist/toggle", {
//       productId: item._id
//     });

//     // Fetch updated wishlist
//     const { data } = await api.get("/wishlist");

//     if (data?.products) {
//       setWishlist(data.products);
//     }

//   } catch (err) {
//     console.error("Wishlist error:", err.response?.data || err.message);
//   }
// };

//   const filteredProducts = useMemo(() => {

//   let result = products.filter(item => {

//     const category = (item.category || "").toLowerCase();
//     const type = (item.type || "").toLowerCase();
//     const nutrient = (item.nutrient || "").toLowerCase();
//     const seedType = (item.seedType || "").toLowerCase();
//     const name = (item.name || "").toLowerCase();

//     // 🔍 Search
//     if (!name.includes(search.toLowerCase())) return false;

//     // ================= FERTILIZER =================
//     if (filters.category === "fertilizer") {
//       if (category !== "fertilizer") return false;

//       // ✅ IF NO SUB FILTER → SHOW ALL
//       if (!filters.type && !filters.nutrient) return true;

//       // ✅ APPLY SUB FILTER ONLY IF SELECTED
//       if (filters.type && type !== filters.type) return false;
//       if (filters.nutrient && nutrient !== filters.nutrient) return false;

//       return true;
//     }

//     // ================= SEED =================
//     if (filters.category === "seed") {
//       if (category !== "seed") return false;

//       // ✅ IF NO SUB FILTER → SHOW ALL
//       if (!filters.seedType) return true;

//       // ✅ APPLY FILTER
//       return seedType === filters.seedType;
//     }

//     return true;

//   });

//   // SORT
//   if (sort === "low") result.sort((a, b) => a.price - b.price);
//   if (sort === "high") result.sort((a, b) => b.price - a.price);
//   if (sort === "az") result.sort((a, b) => a.name.localeCompare(b.name));

//   return result;

// }, [products, filters, search, sort]);




// const addToCart = async (item) => {
//   try {
//     const token = Cookies.get("token");
//     if (!token) {
//       console.log("User not logged in");
//       return;
//     }

//     // ✅ CORRECT URL (NO /api HERE)
//     await api.post("/cart/add", {
//       productId: item._id
//     });

//     // Fetch updated cart
//     const { data } = await api.get("/cart");

//     if (data?.items) {
//       setCart(
//         data.items.map(i => ({
//           ...i.productId,
//           quantity: i.quantity
//         }))
//       );
//     }

//   } catch (err) {
//     console.error("Add to cart error:", err.response?.data || err.message);
//   }
// };
//   const clearFilters = () => {
//     setFilters({
//       category: "fertilizer",
//       seedType: "",
//       type: "",
//       nutrient: ""
//     });
//   };

//   console.log("STORE FILE RUNNING");
//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* HEADER */}
//       <div className="bg-white shadow-sm py-8">
//         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

//           <div>
//            <h1 className="text-3xl font-semibold text-gray-800">
// {t("farm_store")}
// </h1>
//             <p className="text-gray-500 mt-1">
// {t("store_desc")}
// </p>
//           </div>

//        <div className="flex items-center gap-4">

//   {/* ✅ MY ORDERS BUTTON */}
//   <button
//     onClick={() => navigate("/orders")}
//     className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-green-50 hover:border-green-600 transition"
//   >
//     <Package size={18} />
//    <span className="text-sm font-medium">
// {t("my_orders")}
// </span>
//   </button>

//   {/* EXISTING WISHLIST BUTTON */}
//   <button
//     onClick={() => setWishlistOpen(true)}
//     className="relative p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition"
//   >
//     <Heart size={20} />
//     {wishlist.length > 0 && (
//       <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
//         {wishlist.length}
//       </span>
//     )}
//   </button>

// </div>

//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">

//         {/* ================= FILTER (FIRST CODE STYLE) ================= */}
//         <div className="w-60 bg-white rounded-2xl shadow-md p-4 h-fit sticky top-24 border border-gray-100">

//           <h2 className="text-base font-semibold text-gray-800 mb-4">
// {t("filters")}
// </h2>

//           {/* CATEGORY */}
//           <div className="mb-4">
//            <p className="text-sm font-medium text-gray-600 mb-2">
//   {t("category")}
// </p>

//             <div className="space-y-2">
//               {["fertilizer", "seed"].map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() =>
//                     setFilters({
//                       category: cat,
//                       seedType: "",
//                       type: "",
//                       nutrient: ""
//                     })
//                   }
//                   className={`w-full text-left px-3 py-1.5 rounded-lg text-sm ${
//                     filters.category === cat
//                       ? "bg-green-600 text-white"
//                       : "bg-gray-100 hover:bg-green-100 text-gray-700"
//                   }`}
//                 >
//                   {cat === "fertilizer" ? t("fertilizers") : t("seeds")}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* SEED FILTER */}
//           {filters.category === "seed" && (
//             <div className="mb-4">
//               <p className="text-sm font-medium text-gray-600 mb-2">
//                 {t("seed_type")}
//               </p>

//               <div className="flex flex-wrap gap-2">
//                 {["vegetable", "fruit"].map((type) => (
//                   <button
//                     key={type}
//                     onClick={() =>
//                       setFilters(prev => ({ ...prev, seedType: type }))
//                     }
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       filters.seedType === type
//                         ? "bg-green-600 text-white"
//                         : "bg-gray-100 hover:bg-green-100 text-gray-700"
//                     }`}
//                   >
//                     {type === "vegetable" ? t("vegetables") : t("fruits")}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* FERTILIZER FILTERS */}
//           {filters.category === "fertilizer" && (
//             <>
//               <div className="mb-4">
//                 <p className="text-sm font-medium text-gray-600 mb-2">
//                   {t("fertilizer_type")}
//                 </p>

//                 <div className="flex flex-wrap gap-2">
//                 {["organic", "inorganic", "bio"].map((type) => (
//   <button
//     key={type}
//     onClick={() =>
//       setFilters(prev => ({ ...prev, type }))
//     }
//     className={`px-3 py-1 rounded-full text-sm ${
//       filters.type === type
//         ? "bg-green-600 text-white"
//         : "bg-gray-100 hover:bg-green-100 text-gray-700"
//     }`}
//   >
//     {t(type)}
//   </button>
// ))}
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <p className="text-sm font-medium text-gray-600 mb-2">
//                   {t("nutrient")}
//                 </p>

//                 <div className="flex flex-wrap gap-2">
//                  {["nitrogen", "phosphorus", "potassium"].map((nut) => (
//   <button
//     key={nut}
//     onClick={() =>
//       setFilters(prev => ({ ...prev, nutrient: nut }))
//     }
//     className={`px-3 py-1 rounded-full text-sm ${
//       filters.nutrient === nut
//         ? "bg-green-600 text-white"
//         : "bg-gray-100 hover:bg-green-100 text-gray-700"
//     }`}
//   >
//     {t(nut)}
//   </button>
// ))}
//                 </div>
//               </div>
//             </>
//           )}

//           <button
//             onClick={clearFilters}
//             className="mt-3 w-full border border-gray-300 hover:border-green-600 text-sm py-1.5 rounded-lg hover:bg-green-50"
//           >
//             {t("clear")}
//           </button>

//         </div>

//         {/* ================= PRODUCTS ================= */}
//         <div className="flex-1">

//           {/* SEARCH + SORT */}
//           <div className="flex justify-between items-center mb-8 gap-4">

//             <div className="relative w-full max-w-md">
//               <Search size={18} className="absolute left-3 top-3 text-gray-400" />
//               <input
//                placeholder={t("search_products")}
//                 className="pl-10 pr-4 py-2 w-full border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>

//             <select
//               onChange={(e) => setSort(e.target.value)}
//               className="border px-4 py-2 rounded-xl"
//             >
//              <option value="">{t("sort")}</option>
// <option value="low">{t("price_low_high")}</option>
// <option value="high">{t("price_high_low")}</option>
// <option value="az">{t("sort_az")}</option>
//             </select>
//           </div>

//           {/* GRID */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

//   {filteredProducts.map(item => {
//     console.log("IMAGE VALUE:", item.image); // 👈 DEBUG LINE

//     return (
//       <div
//         key={item._id}
//         className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 relative"
//       >
//         <button
//           onClick={() => toggleWishlist(item)}
//           className="absolute top-4 right-4"
//         >
//           <Heart
//             size={20}
//             className={
//               wishlist.some(p => p._id?.toString() === item._id?.toString())
//                 ? "fill-red-500 text-red-500"
//                 : "text-gray-400 hover:text-gray-600"
//             }
//           />
//         </button>

//         <div className="h-52 flex items-center justify-center bg-gray-50 rounded-xl mb-5">
//           <img
//             src={
//               item.image
//                 ? `/products/${item.image.split("/").pop().trim().toLowerCase()}`
//                 : "/products/urea.jpg"
//             }
//             alt={item.name}
//             className="max-h-40 object-contain"
//           />
//         </div>

//         <h3 className="text-base font-medium text-gray-800 mb-2">
//           {item.name}
//         </h3>

//         <p className="text-2xl font-semibold text-green-600 mb-4">
//           ₹{item.price}
//         </p>

//         <button
//           onClick={() => addToCart(item)}
//           className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
//         >
//           {t("add_to_cart")}
//         </button>
//       </div>
//     );
//   })}

// </div>
//         </div>
//       </div>

//      {/* ================= IMPROVED WISHLIST DRAWER ================= */}
// {wishlistOpen && (
//   <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-end z-50">

//     {/* Drawer */}
//     <div className="w-96 bg-white h-full shadow-2xl flex flex-col animate-slideIn">

//       {/* Header */}
//       <div className="flex justify-between items-center px-6 py-5 border-b">
//         <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//           <Heart size={20} className="text-red-500" />
//           {t("wishlist")}
//         </h2>

//         <button
//           onClick={() => setWishlistOpen(false)}
//           className="p-2 hover:bg-gray-100 rounded-full transition"
//         >
//           <X size={18} />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">

//         {wishlist.length === 0 && (
//           <div className="text-center mt-16">
//             <Heart size={40} className="mx-auto text-gray-300 mb-4" />
//             <p className="text-gray-500">
//               {t("your_wishlist_empty")}
//             </p>
//           </div>
//         )}

//         {wishlist.map(item => (
//           <div
//             key={item._id}
//             className="flex gap-4 p-4 bg-gray-50 rounded-2xl hover:shadow-sm transition"
//           >

//             {/* Image */}
//             <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
//              <img
//   src={
//     item.image
//       ? `/products/${item.image.split("/").pop().trim().toLowerCase()}`
//       : "/products/urea.jpg"
//   }
//   alt={item.name}
//   className="max-h-40 object-contain"
// />
//             </div>

//             {/* Info */}
//             <div className="flex-1">
//               <p className="font-medium text-gray-800">
//                 {item.name}
//               </p>
//               <p className="text-green-600 font-semibold mt-1">
//                 ₹{item.price}
//               </p>
//             </div>

//             {/* Remove */}
//             <button
//               onClick={() => toggleWishlist(item)}
//               className="text-gray-400 hover:text-red-500 transition"
//             >
//               <X size={18} />
//             </button>

//           </div>
//         ))}

//       </div>

//       {/* Footer */}
//       {wishlist.length > 0 && (
//         <div className="border-t px-6 py-4 bg-gray-50">
//           <button
//   onClick={() => setWishlistOpen(false)}
//   className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
// >
//   {t("continue_shopping")}
// </button>
//         </div>
//       )}

//     </div>
//   </div>
// )}

//     </div>
//   );
// }





















import { useEffect, useState, useMemo } from "react";

import {
  Search,
  Heart,
  X,
  Package,
  SlidersHorizontal,
  Leaf,
  ShoppingCart,
  RotateCcw,
} from "lucide-react";

import api from "../api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import storeBanner from "../assets/store-banner.png";

export default function Store({ setCart }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: "fertilizer",
    seedType: "",
    type: "",
    nutrient: "",
  });

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

  useEffect(() => {
    api
      .get("/store/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /* =========================================================
     FETCH WISHLIST
  ========================================================= */

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = Cookies.get("token");

        if (!token) return;

        const { data } = await api.get("/wishlist");

        if (data?.products) {
          setWishlist(data.products);
        }
      } catch (err) {
        console.error(
          "Wishlist fetch error:",
          err.response?.data || err.message
        );
      }
    };

    fetchWishlist();
  }, []);

  /* =========================================================
     TOGGLE WISHLIST
  ========================================================= */

  const toggleWishlist = async (item) => {
    try {
      await api.post("/wishlist/toggle", {
        productId: item._id,
      });

      const { data } = await api.get("/wishlist");

      if (data?.products) {
        setWishlist(data.products);
      }
    } catch (err) {
      console.error(
        "Wishlist error:",
        err.response?.data || err.message
      );
    }
  };

  /* =========================================================
     FILTER PRODUCTS
  ========================================================= */

  const filteredProducts = useMemo(() => {
    let result = products.filter((item) => {
      const category = (item.category || "").toLowerCase();
      const type = (item.type || "").toLowerCase();
      const nutrient = (item.nutrient || "").toLowerCase();
      const seedType = (item.seedType || "").toLowerCase();
      const name = (item.name || "").toLowerCase();

      /* SEARCH */

      if (!name.includes(search.toLowerCase())) {
        return false;
      }

      /* FERTILIZER */

      if (filters.category === "fertilizer") {
        if (category !== "fertilizer") {
          return false;
        }

        if (!filters.type && !filters.nutrient) {
          return true;
        }

        if (filters.type && type !== filters.type) {
          return false;
        }

        if (
          filters.nutrient &&
          nutrient !== filters.nutrient
        ) {
          return false;
        }

        return true;
      }

      /* SEED */

      if (filters.category === "seed") {
        if (category !== "seed") {
          return false;
        }

        if (!filters.seedType) {
          return true;
        }

        return seedType === filters.seedType;
      }

      return true;
    });

    /* SORT */

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "az") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [products, filters, search, sort]);

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const addToCart = async (item) => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        console.log("User not logged in");
        return;
      }

      await api.post("/cart/add", {
        productId: item._id,
      });

      const { data } = await api.get("/cart");

      if (data?.items) {
        const updatedCart = data.items
          .filter((i) => i.productId)
          .map((i) => ({
            ...i.productId,
            quantity: i.quantity,
          }));

        setCart(updatedCart);

        window.dispatchEvent(
          new CustomEvent("cart-updated", {
            detail: {
              cart: updatedCart,
            },
          })
        );
      }
    } catch (err) {
      console.error(
        "Add to cart error:",
        err.response?.data || err.message
      );
    }
  };

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setFilters({
      category: "fertilizer",
      seedType: "",
      type: "",
      nutrient: "",
    });
  };

  /* =========================================================
     PRODUCT IMAGE
  ========================================================= */

  const getProductImage = (item) => {
    return item.image
      ? `/products/${item.image
          .split("/")
          .pop()
          .trim()
          .toLowerCase()}`
      : "/products/urea.jpg";
  };

  return (
    <div
      className="
        w-full
        h-[calc(100vh-70px)]
        bg-[#f6f9f7]
        overflow-hidden
      "
    >
      <div className="h-full flex flex-col">

        {/* =====================================================
            HERO HEADER
        ===================================================== */}

        <section
          className="
            relative
            flex-shrink-0
            h-[110px]
            bg-white
            border-b
            border-[#e9efec]
            overflow-hidden
          "
        >
          <img
            src={storeBanner}
            alt=""
            className="
              absolute
              right-[145px]
              bottom-0
              w-[650px]
              h-[110px]
              object-contain
              object-bottom
              mix-blend-multiply
              pointer-events-none
              select-none
              z-0
            "
          />

          <div
            className="
              relative
              z-10
              max-w-[1280px]
              mx-auto
              h-full
              px-7
              flex
              items-center
              justify-between
            "
          >
            <div>
              <h1
                className="
                  text-[30px]
                  leading-none
                  font-bold
                  tracking-[-0.5px]
                  text-[#10262e]
                "
              >
                {t("farm_store")}
              </h1>

              <p
                className="
                  mt-2
                  text-[14px]
                  text-[#61727b]
                "
              >
                {t("store_desc")}
              </p>
            </div>

            {/* RIGHT ACTIONS */}

            <div
              className="
                relative
                z-20
                flex
                items-center
                gap-3
              "
            >
              {/* MY ORDERS */}

              <button
                onClick={() => navigate("/orders")}
                className="
                  h-[44px]
                  px-5
                  rounded-xl
                  bg-white
                  border
                  border-[#dfe7e3]
                  shadow-[0_2px_7px_rgba(30,60,45,0.04)]
                  flex
                  items-center
                  gap-2
                  text-[#26373e]
                  text-[14px]
                  font-medium
                  hover:border-[#18a158]
                  hover:bg-[#f4faf6]
                  transition
                "
              >
                <Package
                  size={19}
                  strokeWidth={1.8}
                />

                {t("my_orders")}
              </button>

              {/* WISHLIST */}

              <button
                onClick={() => setWishlistOpen(true)}
                className="
                  relative
                  w-[46px]
                  h-[44px]
                  rounded-xl
                  bg-white
                  border
                  border-[#dfe7e3]
                  shadow-[0_2px_7px_rgba(30,60,45,0.04)]
                  flex
                  items-center
                  justify-center
                  hover:bg-[#f5faf7]
                  transition
                "
              >
                <Heart
                  size={22}
                  strokeWidth={1.7}
                  className="text-[#33464e]"
                />

                {wishlist.length > 0 && (
                  <span
                    className="
                      absolute
                      -top-2
                      -right-2
                      min-w-[23px]
                      h-[23px]
                      rounded-full
                      px-1
                      bg-[#16a05a]
                      border-2
                      border-white
                      text-white
                      text-[10px]
                      font-bold
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN STORE AREA
        ===================================================== */}

        <div
          className="
            flex-1
            min-h-0
            max-w-[1280px]
            w-full
            mx-auto
            px-7
            pt-1
            pb-2
            flex
            flex-col
          "
        >

          {/* ===================================================
              SEARCH + SORT
          =================================================== */}

          <div
            className="
              flex
              gap-4
              flex-shrink-0

              /* GAP BELOW SEARCH BAR */
              mb-4
            "
          >
            {/* FILTER SPACER */}

            <div
              className="
                w-[275px]
                flex-shrink-0
              "
            />

            {/* SEARCH */}

            <div className="flex-1">
              <div className="relative">

                <Search
                  size={17}
                  strokeWidth={1.8}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#7c8d95]
                  "
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder={t("search_products")}
                  className="
                    w-full
                    h-[38px]
                    pl-[44px]
                    pr-4
                    bg-white
                    border
                    border-[#dfe7e3]
                    rounded-xl
                    outline-none
                    text-[14px]
                    text-[#25373e]
                    placeholder:text-[#8a999f]
                    focus:border-[#19a25a]
                    focus:ring-2
                    focus:ring-[#19a25a]/10
                    transition
                  "
                />
              </div>
            </div>

            {/* SORT */}

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="
                w-[220px]
                h-[38px]
                px-4
                bg-white
                border
                border-[#dfe7e3]
                rounded-xl
                outline-none
                text-[14px]
                text-[#26373e]
                cursor-pointer
                focus:border-[#19a25a]
              "
            >
              <option value="">
                {t("sort")}
              </option>

              <option value="low">
                {t("price_low_high")}
              </option>

              <option value="high">
                {t("price_high_low")}
              </option>

              <option value="az">
                {t("sort_az")}
              </option>
            </select>
          </div>

          {/* ===================================================
              FILTERS + PRODUCTS

              FILTER SECTION IS NOT CHANGED
          =================================================== */}

          <div
            className="
              flex
              gap-4
              flex-1
              min-h-0
            "
          >

            {/* =================================================
                FILTER SIDEBAR
            ================================================= */}

            <aside
              className="
                w-[275px]
                flex-shrink-0
                self-start

                bg-white

                border
                border-[#e3ebe7]

                rounded-[18px]

                shadow-[0_3px_12px_rgba(22,54,42,0.06)]

                px-[17px]
                py-[15px]
              "
            >

              {/* FILTER HEADER */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  pb-3
                  mb-3
                  border-b
                  border-[#edf2ef]
                "
              >
                <div
                  className="
                    w-[36px]
                    h-[36px]
                    rounded-xl
                    bg-[#edf8f1]
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                  "
                >
                  <SlidersHorizontal
                    size={17}
                    strokeWidth={1.9}
                    className="text-[#159447]"
                  />
                </div>

                <h2
                  className="
                    text-[17px]
                    font-bold
                    text-[#20343b]
                  "
                >
                  {t("filters")}
                </h2>
              </div>

              {/* CATEGORY */}

              <div className="mb-4">

                <p
                  className="
                    text-[13px]
                    font-semibold
                    text-[#24363d]
                    mb-2
                  "
                >
                  {t("category")}
                </p>

                <div className="space-y-1.5">

                  {[
                    "fertilizer",
                    "seed",
                  ].map((cat) => (

                    <button
                      key={cat}
                      onClick={() =>
                        setFilters({
                          category: cat,
                          seedType: "",
                          type: "",
                          nutrient: "",
                        })
                      }
                      className={`
                        w-full
                        h-[36px]
                        px-3
                        rounded-xl
                        flex
                        items-center
                        gap-2.5
                        text-left
                        text-[12px]
                        border
                        transition-all
                        duration-200

                        ${
                          filters.category === cat
                            ? "bg-[#e8f7ed] text-[#148b4e] font-semibold border-[#ccebd8]"
                            : "bg-[#f7f9f8] text-[#53636b] border-[#edf1ef] hover:bg-[#eef7f1]"
                        }
                      `}
                    >
                      <span
                        className={`
                          w-7
                          h-7
                          rounded-lg
                          flex
                          items-center
                          justify-center

                          ${
                            filters.category === cat
                              ? "bg-white text-[#159447]"
                              : "bg-white text-[#718088]"
                          }
                        `}
                      >
                        <Leaf
                          size={14}
                          strokeWidth={1.8}
                        />
                      </span>

                      {cat === "fertilizer"
                        ? t("fertilizers")
                        : t("seeds")}
                    </button>

                  ))}

                </div>
              </div>

              {/* SEED TYPE */}

              {filters.category === "seed" && (

                <div className="mb-4">

                  <p
                    className="
                      text-[13px]
                      font-semibold
                      text-[#24363d]
                      mb-2
                    "
                  >
                    {t("seed_type")}
                  </p>

                  <div className="flex flex-wrap gap-1.5">

                    {[
                      "vegetable",
                      "fruit",
                    ].map((type) => (

                      <button
                        key={type}
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            seedType: type,
                          }))
                        }
                        className={`
                          px-3
                          py-1.5
                          rounded-full
                          text-[11px]
                          font-medium
                          border
                          transition-all

                          ${
                            filters.seedType === type
                              ? "bg-[#ddf3e5] text-[#12874b] border-[#c9e8d4]"
                              : "bg-[#f5f7f7] text-[#56666e] border-[#e8edeb]"
                          }
                        `}
                      >
                        {type === "vegetable"
                          ? t("vegetables")
                          : t("fruits")}
                      </button>

                    ))}

                  </div>
                </div>
              )}

              {/* FERTILIZER FILTERS */}

              {filters.category === "fertilizer" && (
                <>

                  {/* TYPE */}

                  <div className="mb-4">

                    <p
                      className="
                        text-[13px]
                        font-semibold
                        text-[#24363d]
                        mb-2
                      "
                    >
                      {t("fertilizer_type")}
                    </p>

                    <div className="flex flex-wrap gap-1.5">

                      {[
                        "organic",
                        "inorganic",
                        "bio",
                      ].map((type) => (

                        <button
                          key={type}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              type,
                            }))
                          }
                          className={`
                            px-3
                            py-1.5
                            rounded-full
                            text-[11px]
                            font-medium
                            border
                            transition-all

                            ${
                              filters.type === type
                                ? "bg-[#dff4e6] text-[#12874b] border-[#c9e8d4]"
                                : "bg-[#f5f7f7] text-[#56666e] border-[#e8edeb]"
                            }
                          `}
                        >
                          {t(type)}
                        </button>

                      ))}

                    </div>
                  </div>

                  {/* NUTRIENT */}

                  <div className="mb-4">

                    <p
                      className="
                        text-[13px]
                        font-semibold
                        text-[#24363d]
                        mb-2
                      "
                    >
                      {t("nutrient")}
                    </p>

                    <div className="flex flex-wrap gap-1.5">

                      {[
                        "nitrogen",
                        "phosphorus",
                        "potassium",
                      ].map((nut) => (

                        <button
                          key={nut}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              nutrient: nut,
                            }))
                          }
                          className={`
                            px-3
                            py-1.5
                            rounded-full
                            text-[11px]
                            font-medium
                            border
                            transition-all

                            ${
                              filters.nutrient === nut
                                ? "bg-[#dff4e6] text-[#12874b] border-[#c9e8d4]"
                                : "bg-[#f5f7f7] text-[#56666e] border-[#e8edeb]"
                            }
                          `}
                        >
                          {t(nut)}
                        </button>

                      ))}

                    </div>
                  </div>

                </>
              )}

              {/* CLEAR */}

              <button
                onClick={clearFilters}
                className="
                  w-full
                  h-[36px]
                  rounded-xl

                  flex
                  items-center
                  justify-center
                  gap-2

                  border
                  border-[#d7e9de]

                  bg-[#f5faf7]

                  text-[12px]
                  font-semibold

                  text-[#149151]

                  hover:bg-[#eaf7ef]

                  hover:border-[#c7e4d2]

                  transition-all
                  duration-200
                "
              >
                <RotateCcw
                  size={14}
                  strokeWidth={1.8}
                />

                {t("clear")}
              </button>

            </aside>


            {/* =================================================
                PRODUCT AREA
            ================================================= */}

            <main
              className="
                flex-1
                min-w-0
                min-h-0
                overflow-y-auto
                pr-1
                pb-1
              "
            >

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  xl:grid-cols-3
                  gap-3.5
                "
              >

                {filteredProducts.map((item) => {

                  const isWishlisted =
                    wishlist.some(
                      (p) =>
                        p._id?.toString() ===
                        item._id?.toString()
                    );

                  return (

                    <div
                      key={item._id}
                      className="
                        bg-white
                        border
                        border-[#e3eae7]
                        rounded-[16px]
                        p-3

                        shadow-[0_2px_8px_rgba(22,54,42,0.04)]

                        hover:shadow-[0_6px_18px_rgba(22,54,42,0.08)]

                        transition-all
                        duration-300

                        flex
                        flex-col

                        h-[310px]
                      "
                    >

                      {/* PRODUCT HEADER */}

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          h-[25px]
                          mb-1.5
                        "
                      >

                        <span
                          className={`
                            px-2
                            py-0.5
                            rounded-md
                            text-[10px]
                            font-medium
                            flex
                            items-center
                            gap-1

                            ${
                              (item.type || "")
                                .toLowerCase() === "bio"
                                ? "bg-[#eaf3fb] text-[#3477a9]"
                                : "bg-[#e8f7ed] text-[#16874d]"
                            }
                          `}
                        >
                          <Leaf size={10} />

                          {item.type || item.category}
                        </span>

                        <button
                          onClick={() =>
                            toggleWishlist(item)
                          }
                          className="
                            w-7
                            h-7
                            rounded-full
                            flex
                            items-center
                            justify-center
                            hover:bg-[#f4f7f5]
                            transition
                          "
                        >
                          <Heart
                            size={18}
                            strokeWidth={1.7}
                            className={
                              isWishlisted
                                ? "fill-red-500 text-red-500"
                                : "text-[#718088]"
                            }
                          />
                        </button>

                      </div>


                      {/* PRODUCT IMAGE */}

                      <div
                        className="
                          h-[128px]
                          bg-[#fbfcfb]
                          rounded-[11px]
                          flex
                          items-center
                          justify-center
                          overflow-hidden
                          mb-2.5
                        "
                      >

                        <img
                          src={getProductImage(item)}
                          alt={item.name}
                          className="
                            max-h-[120px]
                            max-w-[86%]
                            object-contain
                            hover:scale-105
                            transition-transform
                            duration-300
                          "
                        />

                      </div>


                      {/* PRODUCT INFORMATION */}

                      <div className="flex-1">

                        <h3
                          className="
                            text-[15px]
                            font-semibold
                            text-[#182c34]
                            line-clamp-1
                          "
                        >
                          {item.name}
                        </h3>

                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                            mt-1
                          "
                        >

                          <span
                            className="
                              text-[11px]
                              text-[#f2aa20]
                              font-semibold
                            "
                          >
                            ★
                          </span>

                          <span
                            className="
                              text-[11px]
                              text-[#53656d]
                            "
                          >
                            4.6
                          </span>

                          <span className="text-[#c8d0ce]">
                            |
                          </span>

                          <span
                            className="
                              text-[11px]
                              text-[#63747b]
                            "
                          >
                            1kg
                          </span>

                        </div>

                        <p
                          className="
                            text-[18px]
                            font-bold
                            text-[#148e4c]
                            mt-1
                          "
                        >
                          ₹{item.price}
                        </p>

                      </div>


                      {/* ADD TO CART */}

                      <button
                        onClick={() =>
                          addToCart(item)
                        }
                        className="
                          w-full
                          h-[37px]
                          mt-2
                          rounded-lg

                          bg-[#159d51]

                          hover:bg-[#118845]

                          text-white

                          font-semibold
                          text-[13px]

                          flex
                          items-center
                          justify-center
                          gap-1.5

                          shadow-[0_3px_8px_rgba(21,157,81,0.12)]

                          transition
                        "
                      >

                        <ShoppingCart size={15} />

                        {t("add_to_cart")}

                      </button>

                    </div>

                  );
                })}


                {/* NO PRODUCTS */}

                {filteredProducts.length === 0 && (

                  <div
                    className="
                      col-span-full
                      min-h-[300px]
                      bg-white
                      rounded-[16px]
                      border
                      border-[#e3eae7]
                      flex
                      flex-col
                      items-center
                      justify-center
                    "
                  >

                    <Package
                      size={40}
                      className="
                        text-[#c5d0cc]
                        mb-3
                      "
                    />

                    <h3
                      className="
                        text-[16px]
                        font-semibold
                        text-[#30434b]
                      "
                    >
                      No products found
                    </h3>

                    <p
                      className="
                        text-[12px]
                        text-[#819097]
                        mt-1
                      "
                    >
                      Try changing your search or filters.
                    </p>

                  </div>

                )}

              </div>

            </main>

          </div>

        </div>

      </div>


      {/* =======================================================
          WISHLIST DRAWER
      ======================================================= */}

      {wishlistOpen && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            backdrop-blur-sm
            flex
            justify-end
          "
        >

          <div
            className="
              w-[390px]
              max-w-full
              h-full
              bg-white
              shadow-2xl
              flex
              flex-col
            "
          >

            {/* HEADER */}

            <div
              className="
                h-[72px]
                flex
                items-center
                justify-between
                px-6
                border-b
                border-[#e8edeb]
              "
            >

              <h2
                className="
                  text-[19px]
                  font-semibold
                  text-[#26383e]
                  flex
                  items-center
                  gap-2
                "
              >

                <Heart
                  size={20}
                  className="text-red-500"
                />

                {t("wishlist")}

              </h2>


              <button
                onClick={() =>
                  setWishlistOpen(false)
                }
                className="
                  w-9
                  h-9
                  rounded-full
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-100
                "
              >

                <X size={18} />

              </button>

            </div>


            {/* WISHLIST CONTENT */}

            <div
              className="
                flex-1
                overflow-y-auto
                p-6
                space-y-4
              "
            >

              {wishlist.length === 0 && (

                <div className="text-center mt-16">

                  <Heart
                    size={40}
                    className="
                      mx-auto
                      text-gray-300
                      mb-4
                    "
                  />

                  <p className="text-gray-500">
                    {t("your_wishlist_empty")}
                  </p>

                </div>

              )}


              {wishlist.map((item) => (

                <div
                  key={item._id}
                  className="
                    flex
                    gap-4
                    p-4
                    bg-gray-50
                    rounded-2xl
                  "
                >

                  <div
                    className="
                      w-16
                      h-16
                      bg-white
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                    "
                  >

                    <img
                      src={getProductImage(item)}
                      alt={item.name}
                      className="
                        max-h-14
                        max-w-14
                        object-contain
                      "
                    />

                  </div>


                  <div className="flex-1">

                    <p
                      className="
                        text-[14px]
                        font-medium
                        text-gray-800
                      "
                    >
                      {item.name}
                    </p>

                    <p
                      className="
                        mt-1
                        font-semibold
                        text-green-600
                      "
                    >
                      ₹{item.price}
                    </p>

                  </div>


                  <button
                    onClick={() =>
                      toggleWishlist(item)
                    }
                    className="
                      text-gray-400
                      hover:text-red-500
                    "
                  >

                    <X size={18} />

                  </button>

                </div>

              ))}

            </div>


            {/* FOOTER */}

            {wishlist.length > 0 && (

              <div
                className="
                  p-5
                  border-t
                  border-[#e8edeb]
                  bg-gray-50
                "
              >

                <button
                  onClick={() =>
                    setWishlistOpen(false)
                  }
                  className="
                    w-full
                    h-[43px]
                    rounded-xl
                    bg-[#159d51]
                    hover:bg-[#118845]
                    text-white
                    font-medium
                  "
                >
                  {t("continue_shopping")}
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}