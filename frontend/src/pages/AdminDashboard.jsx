// import { useEffect, useState } from "react";
// import api from "../api";

// import {
// LineChart,
// Line,
// XAxis,
// YAxis,
// Tooltip,
// ResponsiveContainer,
// PieChart,
// Pie,
// Cell,
// BarChart,
// Bar
// } from "recharts";

// import {
// ShoppingCart,
// TrendingUp,
// Package
// } from "lucide-react";

// export default function AdminDashboard(){

// const [orders,setOrders]=useState([]);
// const [products,setProducts]=useState([]);

// useEffect(()=>{
// fetchOrders();
// fetchProducts();
// },[]);

// const fetchOrders=async()=>{
// const {data}=await api.get("/orders");
// setOrders(data || []);
// };

// const fetchProducts=async()=>{
// const {data}=await api.get("/store/products");
// setProducts(data || []);
// };

// /* ================= SUMMARY ================= */

// const totalOrders=orders.length;

// const totalRevenue=orders.reduce(
// (sum,o)=>sum+(o.totalAmount||0),0
// );

// const totalProducts=products.length;

// /* ================= ORDER STATUS ================= */

// const paid=orders.filter(o=>o.status==="Paid").length;
// const processing=orders.filter(o=>o.status==="Processing").length;
// const delivered=orders.filter(o=>o.status==="Delivered").length;

// const orderStatusData=[
// {name:"Paid",value:paid},
// {name:"Processing",value:processing},
// {name:"Delivered",value:delivered}
// ];

// /* ================= PRODUCT CATEGORY ================= */

// const fertilizer=products.filter(p=>p.category==="fertilizer").length;
// const seeds=products.filter(p=>p.category==="seed").length;

// const productCategoryData=[
// {category:"Fertilizer",count:fertilizer},
// {category:"Seeds",count:seeds}
// ];

// /* ================= REVENUE DATA ================= */

// const revenueMap={};

// orders.forEach(order=>{

// if(!order.createdAt)return;

// const date=new Date(order.createdAt).toLocaleDateString();

// if(!revenueMap[date]){
// revenueMap[date]=0;
// }

// revenueMap[date]+=order.totalAmount||0;

// });

// const revenueData=Object.keys(revenueMap).map(date=>({
// day:date,
// revenue:revenueMap[date]
// }));

// /* ================= TOP PRODUCTS ================= */

// const productSales={};

// orders.forEach(order=>{

// if(!order.items)return;

// order.items.forEach(item=>{

// const name=item.name||item.productName||"Product";

// if(!productSales[name]){
// productSales[name]=0;
// }

// productSales[name]+=item.quantity||1;

// });

// });

// const topProductsData=Object.keys(productSales).map(name=>({
// product:name,
// sales:productSales[name]
// }));


// return(

// <div className="max-w-7xl mx-auto px-6 py-8">

// {/* HEADER */}

// <div className="mb-10">
// <h1 className="text-4xl font-bold text-green-700 tracking-tight">
// Admin Dashboard
// </h1>

// <p className="text-gray-500 mt-2 text-sm">
// Store analytics and performance overview
// </p>
// </div>


// {/* SUMMARY CARDS */}

// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

// {/* Orders */}

// <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white p-7 rounded-3xl shadow-lg flex justify-between items-center hover:scale-105 transition">

// <div>
// <p className="text-sm text-white/80">Total Orders</p>
// <h2 className="text-3xl font-bold">{totalOrders}</h2>
// </div>

// <ShoppingCart size={40}/>

// </div>


// {/* Revenue */}

// <div className="bg-gradient-to-br from-emerald-400 via-green-500 to-green-600 text-white p-7 rounded-3xl shadow-lg flex justify-between items-center hover:scale-105 transition">

// <div>
// <p className="text-sm text-white/80">Total Revenue</p>
// <h2 className="text-3xl font-bold">₹{totalRevenue}</h2>
// </div>

// <TrendingUp size={40}/>

// </div>


// {/* Products */}

// <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 text-white p-7 rounded-3xl shadow-lg flex justify-between items-center hover:scale-105 transition">

// <div>
// <p className="text-sm text-white/80">Total Products</p>
// <h2 className="text-3xl font-bold">{totalProducts}</h2>
// </div>

// <Package size={40}/>

// </div>

// </div>


// {/* REVENUE CHART */}

// <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100 mb-10">

// <h2 className="text-lg font-semibold mb-6 text-gray-700">
// Revenue Trend
// </h2>

// {revenueData.length===0?(
// <p className="text-center text-gray-400 py-20">
// No revenue data yet
// </p>
// ):(

// <ResponsiveContainer width="100%" height={300}>

// <LineChart data={revenueData}>

// <XAxis dataKey="day"/>
// <YAxis/>
// <Tooltip/>

// <Line
// type="monotone"
// dataKey="revenue"
// stroke="#16a34a"
// strokeWidth={3}
// />

// </LineChart>

// </ResponsiveContainer>

// )}

// </div>


// {/* CHARTS */}

// <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

// {/* ORDER STATUS */}

// <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">

// <h2 className="text-lg font-semibold mb-6 text-gray-700">
// Order Status
// </h2>

// <div className="flex justify-center">

// <PieChart width={400} height={300}>

// <Pie
// data={orderStatusData}
// dataKey="value"
// outerRadius={110}
// label
// >

// <Cell fill="#16a34a"/>
// <Cell fill="#facc15"/>
// <Cell fill="#3b82f6"/>

// </Pie>

// <Tooltip/>

// </PieChart>

// </div>

// </div>


// {/* PRODUCT CATEGORY */}

// <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">

// <h2 className="text-lg font-semibold mb-6 text-gray-700">
// Product Categories
// </h2>

// <BarChart width={380} height={300} data={productCategoryData}>

// <XAxis dataKey="category"/>
// <YAxis/>
// <Tooltip/>

// <Bar dataKey="count" fill="#16a34a"/>

// </BarChart>

// </div>

// </div>


// {/* TOP PRODUCTS */}

// <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100 mt-10">

// <h2 className="text-lg font-semibold mb-6 text-gray-700">
// Top Selling Products
// </h2>

// {topProductsData.length===0?(
// <p className="text-center text-gray-400 py-20">
// No product sales yet
// </p>
// ):(

// <ResponsiveContainer width="100%" height={300}>

// <BarChart data={topProductsData}>

// <XAxis dataKey="product"/>
// <YAxis/>
// <Tooltip/>

// <Bar dataKey="sales" fill="#16a34a"/>

// </BarChart>

// </ResponsiveContainer>

// )}

// </div>

// </div>

// );

// }




// import { useEffect, useState } from "react";
// import api from "../api";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   AreaChart,
//   Area,
//   CartesianGrid
// } from "recharts";

// import {
//   ShoppingCart,
//   TrendingUp,
//   Package,
//   DollarSign,
//   Users,
//   Clock,
//   Truck,
//   CheckCircle,
//   AlertCircle,
//   CreditCard,
//   Leaf,
//   Sprout,
//   Activity,
//   Calendar
// } from "lucide-react";

// export default function AdminDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedChart, setSelectedChart] = useState("line");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       await Promise.all([fetchOrders(), fetchProducts()]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchOrders = async () => {
//     const { data } = await api.get("/orders");
//     setOrders(data || []);
//   };

//   const fetchProducts = async () => {
//     const { data } = await api.get("/store/products");
//     setProducts(data || []);
//   };

//   /* ================= SUMMARY ================= */
//   const totalOrders = orders.length;
//   const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
//   const totalProducts = products.length;
  
//   const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

//   /* ================= ORDER STATUS ================= */
//   const paid = orders.filter(o => o.status === "Paid").length;
//   const processing = orders.filter(o => o.status === "Processing").length;
//   const delivered = orders.filter(o => o.status === "Delivered").length;
//   const cancelled = orders.filter(o => o.status === "Cancelled").length;

//   const orderStatusData = [
//     { name: "Paid", value: paid, color: "#f59e0b" },
//     { name: "Processing", value: processing, color: "#3b82f6" },
//     { name: "Delivered", value: delivered, color: "#10b981" },
//     { name: "Cancelled", value: cancelled, color: "#ef4444" }
//   ].filter(item => item.value > 0);

//   /* ================= PRODUCT CATEGORY ================= */
//   const fertilizer = products.filter(p => p.category === "fertilizer").length;
//   const seeds = products.filter(p => p.category === "seed").length;

//   const productCategoryData = [
//     { category: "Fertilizer", count: fertilizer, color: "#10b981" },
//     { category: "Seeds", count: seeds, color: "#f59e0b" },

//   ];

//   /* ================= REVENUE DATA ================= */
//   const revenueMap = {};
//   orders.forEach(order => {
//     if (!order.createdAt) return;
//     const date = new Date(order.createdAt).toLocaleDateString();
//     if (!revenueMap[date]) revenueMap[date] = 0;
//     revenueMap[date] += order.totalAmount || 0;
//   });

//   const revenueData = Object.keys(revenueMap).map(date => ({
//     day: date,
//     revenue: revenueMap[date]
//   })).sort((a, b) => new Date(a.day) - new Date(b.day));

//   /* ================= TOP PRODUCTS ================= */
//   const productSales = {};
//   orders.forEach(order => {
//     if (!order.items) return;
//     order.items.forEach(item => {
//       const name = item.name || item.productName || "Product";
//       if (!productSales[name]) productSales[name] = 0;
//       productSales[name] += item.quantity || 1;
//     });
//   });

//   const topProductsData = Object.keys(productSales)
//     .map(name => ({
//       product: name.length > 12 ? name.substring(0, 12) + "..." : name,
//       fullName: name,
//       sales: productSales[name]
//     }))
//     .sort((a, b) => b.sales - a.sales)
//     .slice(0, 5);

//   /* ================= RECENT ORDERS ================= */
//   const recentOrders = [...orders]
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 5);

//   /* ================= STATS CARDS ================= */
//   const statsCards = [
//     {
//       title: "Total Revenue",
//       value: `₹${totalRevenue.toLocaleString()}`,
//       icon: DollarSign,
//       color: "from-green-400 to-emerald-600"
//     },
//     {
//       title: "Total Orders",
//       value: totalOrders.toString(),
//       icon: ShoppingCart,
//       color: "from-blue-400 to-indigo-600"
//     },
//     {
//       title: "Total Products",
//       value: totalProducts.toString(),
//       icon: Package,
//       color: "from-purple-400 to-pink-600"
//     },
//     {
//       title: "Avg. Order Value",
//       value: `₹${averageOrderValue}`,
//       icon: TrendingUp,
//       color: "from-orange-400 to-red-600"
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Paid": return "bg-amber-100 text-amber-700 border-amber-200";
//       case "Processing": return "bg-blue-100 text-blue-700 border-blue-200";
//       case "Delivered": return "bg-green-100 text-green-700 border-green-200";
//       case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
//       default: return "bg-gray-100 text-gray-700 border-gray-200";
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sprout className="w-8 h-8 text-green-600 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        
//         {/* Header Section */}
//         <div className="mb-10">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="space-y-2">
//               <div className="flex items-center gap-3">
//                 <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0">
//                   <TrendingUp className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-4xl font-bold text-gray-800">
//                     Admin Dashboard
//                   </h1>
//                   <p className="text-gray-500 flex items-center gap-2">
//                     <Clock className="h-4 w-4" />
//                     Last updated: {new Date().toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 bg-white rounded-2xl shadow-lg p-1 border border-gray-100 overflow-x-auto">
//               {["line", "area", "bar"].map((type) => (
//                 <button
//                   key={type}
//                   onClick={() => setSelectedChart(type)}
//                   className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
//                     selectedChart === type
//                       ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   {type.charAt(0).toUpperCase() + type.slice(1)} Chart
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           {statsCards.map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <div
//                 key={index}
//                 className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
//               >
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
//                       <Icon className="h-6 w-6 text-white" />
//                     </div>
//                   </div>
                  
//                   <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
//                   <p className="text-3xl font-bold text-gray-800 truncate">{stat.value}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Revenue Chart Section */}
//         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-10">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//                 <Activity className="h-6 w-6 text-green-500" />
//                 Revenue Analytics
//               </h2>
//               <p className="text-gray-500 text-sm">Track your revenue performance over time</p>
//             </div>
//           </div>

//           {revenueData.length === 0 ? (
//             <div className="text-center py-32">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
//                 <ShoppingCart className="h-10 w-10 text-gray-400" />
//               </div>
//               <p className="text-gray-500 text-lg">No revenue data yet</p>
//               <p className="text-gray-400 text-sm">Start selling to see your revenue analytics</p>
//             </div>
//           ) : (
//             <ResponsiveContainer width="100%" height={400}>
//               {selectedChart === "line" ? (
//                 <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
//                   <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} width={60} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "rgba(255, 255, 255, 0.95)",
//                       borderRadius: "12px",
//                       border: "1px solid #e5e7eb",
//                       boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="revenue"
//                     stroke="#10b981"
//                     strokeWidth={4}
//                     dot={{ fill: "#10b981", r: 6 }}
//                     activeDot={{ r: 8, fill: "#059669" }}
//                   />
//                 </LineChart>
//               ) : selectedChart === "area" ? (
//                 <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//                   <defs>
//                     <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
//                       <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
//                   <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} width={60} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "rgba(255, 255, 255, 0.95)",
//                       borderRadius: "12px",
//                       border: "1px solid #e5e7eb"
//                     }}
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="revenue"
//                     stroke="#10b981"
//                     strokeWidth={3}
//                     fillOpacity={1}
//                     fill="url(#colorRevenue)"
//                   />
//                 </AreaChart>
//               ) : (
//                 <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
//                   <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} width={60} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "rgba(255, 255, 255, 0.95)",
//                       borderRadius: "12px",
//                       border: "1px solid #e5e7eb"
//                     }}
//                   />
//                   <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
//                 </BarChart>
//               )}
//             </ResponsiveContainer>
//           )}
//         </div>

//         {/* Charts Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
//           {/* Order Status - Fixed Label Issue */}
//           <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
//             <div className="mb-6">
//               <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                 <Package className="h-5 w-5 text-green-500" />
//                 Order Status
//               </h2>
//               <p className="text-gray-500 text-sm">Current order distribution</p>
//             </div>

//             <div className="flex flex-col items-center justify-center">
//               {/* Pie Chart with fixed labels */}
//               <div className="w-full flex justify-center mb-6">
//                 <div className="relative" style={{ width: '440px', height: '320px' }}>
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={orderStatusData}
//                         dataKey="value"
//                         cx="50%"
//                         cy="50%"
//                         innerRadius={65}
//                         outerRadius={95}
//                         paddingAngle={3}
//                         label={({ name, percent, value }) => {
//                           // Only show label if value is greater than 0
//                           if (value === 0) return null;
//                           const percentage = Math.round(percent * 100);
//                           return `${name} ${percentage}%`;
//                         }}
//                         labelLine={true}
//                       >
//                         {orderStatusData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip 
//                         formatter={(value) => [value, 'Orders']}
//                         contentStyle={{
//                           backgroundColor: "rgba(255, 255, 255, 0.95)",
//                           borderRadius: "8px",
//                           border: "1px solid #e5e7eb",
//                           fontSize: "12px"
//                         }}
//                       />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Status Legend - Only show items with values > 0 */}
//               <div className="grid grid-cols-2 gap-3 w-full max-w-[320px]">
//                 {orderStatusData.map((item) => (
//                   <div 
//                     key={item.name} 
//                     className="flex items-center justify-between bg-gray-50 p-3 rounded-xl"
//                   >
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
//                       <span className="text-gray-600 text-sm font-medium">{item.name}</span>
//                     </div>
//                     <span className="font-bold text-gray-800">{item.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Product Categories */}
//           <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
//             <div className="mb-6">
//               <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                 <Sprout className="h-5 w-5 text-green-500" />
//                 Product Categories
//               </h2>
//               <p className="text-gray-500 text-sm">Inventory by category</p>
//             </div>

//             <div className="flex flex-col items-center">
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={productCategoryData} layout="vertical" margin={{ left: 70, right: 20 }}>
//                   <CartesianGrid strokeDasharray="3 3" horizontal={false} />
//                   <XAxis type="number" tick={{ fontSize: 12 }} />
//                   <YAxis 
//                     dataKey="category" 
//                     type="category" 
//                     tick={{ fontSize: 12 }}
//                     width={70}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "rgba(255, 255, 255, 0.95)",
//                       borderRadius: "8px",
//                       border: "1px solid #e5e7eb",
//                       fontSize: "12px"
//                     }}
//                   />
//                   <Bar dataKey="count" radius={[0, 8, 8, 0]}>
//                     {productCategoryData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>

//               <div className="grid grid-cols-2 gap-3 mt-6 w-full">
//                 {productCategoryData.map((item) => (
//                   <div key={item.category} className="text-center p-3 bg-gray-50 rounded-xl">
//                     <p className="text-lg font-bold text-gray-800">{item.count}</p>
//                     <p className="text-xs text-gray-500 truncate">{item.category}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Top Products - Cards moved to top */}
//         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-10">
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//               <TrendingUp className="h-6 w-6 text-green-500" />
//               Top Selling Products
//             </h2>
//             <p className="text-gray-500 text-sm">Best performing products by sales</p>
//           </div>

//           {topProductsData.length === 0 ? (
//             <div className="text-center py-20">
//               <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//               <p className="text-gray-500">No product sales yet</p>
//             </div>
//           ) : (
//             <div className="space-y-8">
//               {/* Product Cards - Now at the top */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                 {topProductsData.map((product, index) => (
//                   <div
//                     key={index}
//                     className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
//                   >
//                     <div className="absolute -top-2 -right-2">
//                       <span className="text-xs font-bold text-white bg-green-600 px-2 py-1 rounded-full shadow-md">
//                         #{index + 1}
//                       </span>
//                     </div>
//                     <div className="mb-3">
//                       <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//                         <Package className="h-6 w-6 text-green-600" />
//                       </div>
//                     </div>
//                     <h3 
//                       className="font-semibold text-gray-800 text-sm mb-1 truncate" 
//                       title={product.fullName}
//                     >
//                       {product.product}
//                     </h3>
//                     <p className="text-xs text-gray-500 mb-1">Total Sales</p>
//                     <p className="text-xl font-bold text-gray-800">{product.sales}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Bar Chart - Now below the cards */}
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-4">Sales Distribution</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={topProductsData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis
//                       dataKey="product"
//                       interval={0}
//                       angle={-35}
//                       textAnchor="end"
//                       height={100}
//                       tick={{ fontSize: 11, fill: '#4b5563' }}
//                     />
//                     <YAxis 
//                       tick={{ fontSize: 12 }}
//                       width={45}
//                     />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "rgba(255, 255, 255, 0.95)",
//                         borderRadius: "8px",
//                         border: "1px solid #e5e7eb",
//                         fontSize: "12px",
//                         padding: "8px"
//                       }}
//                       labelFormatter={(label) => {
//                         const product = topProductsData.find(p => p.product === label);
//                         return product?.fullName || label;
//                       }}
//                     />
//                     <Bar dataKey="sales" radius={[6, 6, 0, 0]}>
//                       {topProductsData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={`hsl(${120 + index * 30}, 70%, 50%)`} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Recent Orders */}
//         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//               <Truck className="h-6 w-6 text-green-500" />
//               Recent Orders
//             </h2>
//             <p className="text-gray-500 text-sm">Latest transactions and their status</p>
//           </div>

//           {recentOrders.length === 0 ? (
//             <div className="text-center py-20">
//               <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//               <p className="text-gray-500">No recent orders</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto -mx-6">
//               <div className="inline-block min-w-full align-middle px-6">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="border-b-2 border-gray-100">
//                       <th className="text-left py-4 pr-4 text-gray-600 font-medium text-sm">Customer</th>
//                       <th className="text-left py-4 px-4 text-gray-600 font-medium text-sm">Amount</th>
//                       <th className="text-left py-4 px-4 text-gray-600 font-medium text-sm">Status</th>
//                       <th className="text-left py-4 pl-4 text-gray-600 font-medium text-sm">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {recentOrders.map((order) => (
//                       <tr
//                         key={order._id}
//                         className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="py-4 pr-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
//                               <Users className="h-5 w-5 text-green-600" />
//                             </div>
//                             <div className="min-w-0">
//                               <p className="font-medium text-gray-800 text-sm truncate max-w-[150px]">
//                                 {order.customer?.name || "Guest Customer"}
//                               </p>
//                               <p className="text-xs text-gray-500 truncate max-w-[150px]">
//                                 {order.customer?.email || "No email"}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="py-4 px-4">
//                           <span className="font-bold text-gray-800">₹{order.totalAmount}</span>
//                         </td>
//                         <td className="py-4 px-4">
//                           <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap ${getStatusColor(order.status)}`}>
//                             {order.status}
//                           </span>
//                         </td>
//                         <td className="py-4 pl-4">
//                           <div className="flex items-center gap-2 text-gray-600 whitespace-nowrap">
//                             <Calendar className="h-4 w-4 flex-shrink-0" />
//                             <span className="text-sm">
//                               {new Date(order.createdAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }










import { useEffect, useState } from "react";
import api from "../api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";

import {
  ShoppingCart,
  TrendingUp,
  Package,
  DollarSign,
  Users,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Leaf,
  Sprout,
  Activity,
  Calendar
} from "lucide-react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedChart, setSelectedChart] = useState("line");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchOrders(), fetchProducts()]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    const { data } = await api.get("/orders");
    setOrders(data || []);
  };

  const fetchProducts = async () => {
    const { data } = await api.get("/store/products");
    setProducts(data || []);
  };

  /* ================= SUMMARY ================= */
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalProducts = products.length;
  
  const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  /* ================= ORDER STATUS ================= */
  const paid = orders.filter(o => o.status === "Paid").length;
  const processing = orders.filter(o => o.status === "Processing").length;
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const cancelled = orders.filter(o => o.status === "Cancelled").length;

  const orderStatusData = [
    { name: "Paid", value: paid, color: "#f59e0b" },
    { name: "Processing", value: processing, color: "#3b82f6" },
    { name: "Delivered", value: delivered, color: "#10b981" },
    { name: "Cancelled", value: cancelled, color: "#ef4444" }
  ].filter(item => item.value > 0);

  /* ================= PRODUCT CATEGORY ================= */
  const fertilizer = products.filter(p => p.category === "fertilizer").length;
  const seeds = products.filter(p => p.category === "seed").length;

  const productCategoryData = [
    { category: "Fertilizer", count: fertilizer, color: "#10b981" },
    { category: "Seeds", count: seeds, color: "#f59e0b" },

  ];

  /* ================= REVENUE DATA ================= */
  const revenueMap = {};
  
  // Sort orders first to ensure chronological order
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(a.createdAt) - new Date(b.createdAt)
  );

  sortedOrders.forEach(order => {
    if (!order.createdAt) return;
    // Create consistent date format (ignores time)
    const date = new Date(order.createdAt);
    const dateKey = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    if (!revenueMap[dateKey]) {
      revenueMap[dateKey] = 0;
    }
    revenueMap[dateKey] += order.totalAmount || 0;
  });

  // Convert to array with proper sorting
  const revenueData = Object.keys(revenueMap)
    .map(date => ({
      day: date,
      revenue: revenueMap[date],
      timestamp: new Date(date).getTime() // Add for sorting
    }))
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(({ day, revenue }) => ({ day, revenue }));

  /* ================= TOP PRODUCTS ================= */
  const productSales = {};
  orders.forEach(order => {
    if (!order.items) return;
    order.items.forEach(item => {
      const name = item.name || item.productName || "Product";
      if (!productSales[name]) productSales[name] = 0;
      productSales[name] += item.quantity || 1;
    });
  });

  const topProductsData = Object.keys(productSales)
    .map(name => ({
      product: name.length > 12 ? name.substring(0, 12) + "..." : name,
      fullName: name,
      sales: productSales[name]
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  /* ================= RECENT ORDERS ================= */
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  /* ================= STATS CARDS ================= */
  const statsCards = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-green-400 to-emerald-600"
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      icon: ShoppingCart,
      color: "from-blue-400 to-indigo-600"
    },
    {
      title: "Total Products",
      value: totalProducts.toString(),
      icon: Package,
      color: "from-purple-400 to-pink-600"
    },
    {
      title: "Avg. Order Value",
      value: `₹${averageOrderValue}`,
      icon: TrendingUp,
      color: "from-orange-400 to-red-600"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Processing": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Delivered": return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sprout className="w-8 h-8 text-green-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-800">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-500 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Last updated: {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-2xl shadow-lg p-1 border border-gray-100 overflow-x-auto">
              {["line", "area", "bar"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedChart(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedChart === type
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} Chart
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-800 truncate">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue Chart Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Activity className="h-6 w-6 text-green-500" />
                Revenue Analytics
              </h2>
              <p className="text-gray-500 text-sm">Track your revenue performance over time</p>
            </div>
          </div>

          {revenueData.length === 0 ? (
            <div className="text-center py-32">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <ShoppingCart className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No revenue data yet</p>
              <p className="text-gray-400 text-sm">Start selling to see your revenue analytics</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              {selectedChart === "line" ? (
                <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#9ca3af" 
                    tick={{ fontSize: 12 }} 
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} width={60} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={4}
                    dot={{ fill: "#10b981", r: 6 }}
                    activeDot={{ r: 8, fill: "#059669" }}
                  />
                </LineChart>
              ) : selectedChart === "area" ? (
                <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#9ca3af" 
                    tick={{ fontSize: 12 }} 
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} width={60} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              ) : (
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#9ca3af" 
                    tick={{ fontSize: 12 }} 
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} width={60} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb"
                    }}
                  />
                  <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          )}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Order Status - Fixed Label Issue */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Package className="h-5 w-5 text-green-500" />
                Order Status
              </h2>
              <p className="text-gray-500 text-sm">Current order distribution</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              {/* Pie Chart with fixed labels */}
              <div className="w-full flex justify-center mb-6">
                <div className="relative" style={{ width: '440px', height: '320px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
                      <Pie
                        data={orderStatusData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={3}
                        label={({ name, percent, value }) => {
                          // Only show label if value is greater than 0
                          if (value === 0) return null;
                          const percentage = Math.round(percent * 100);
                          return `${name} ${percentage}%`;
                        }}
                        labelLine={true}
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [value, 'Orders']}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          fontSize: "12px"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Status Legend - Only show items with values > 0 */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-[320px]">
                {orderStatusData.map((item) => (
                  <div 
                    key={item.name} 
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-600 text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Sprout className="h-5 w-5 text-green-500" />
                Product Categories
              </h2>
              <p className="text-gray-500 text-sm">Inventory by category</p>
            </div>

            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={productCategoryData} layout="vertical" margin={{ left: 70, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis 
                    dataKey="category" 
                    type="category" 
                    tick={{ fontSize: 12 }}
                    width={70}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "12px"
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                    {productCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                {productCategoryData.map((item) => (
                  <div key={item.category} className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-lg font-bold text-gray-800">{item.count}</p>
                    <p className="text-xs text-gray-500 truncate">{item.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Products - Cards moved to top */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              Top Selling Products
            </h2>
            <p className="text-gray-500 text-sm">Best performing products by sales</p>
          </div>

          {topProductsData.length === 0 ? (
            <div className="text-center py-20">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No product sales yet</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Product Cards - Now at the top */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {topProductsData.map((product, index) => (
                  <div
                    key={index}
                    className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="absolute -top-2 -right-2">
                      <span className="text-xs font-bold text-white bg-green-600 px-2 py-1 rounded-full shadow-md">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Package className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <h3 
                      className="font-semibold text-gray-800 text-sm mb-1 truncate" 
                      title={product.fullName}
                    >
                      {product.product}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">Total Sales</p>
                    <p className="text-xl font-bold text-gray-800">{product.sales}</p>
                  </div>
                ))}
              </div>

              {/* Bar Chart - Now below the cards */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Sales Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topProductsData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="product"
                      interval={0}
                      angle={-35}
                      textAnchor="end"
                      height={100}
                      tick={{ fontSize: 11, fill: '#4b5563' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      width={45}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        fontSize: "12px",
                        padding: "8px"
                      }}
                      labelFormatter={(label) => {
                        const product = topProductsData.find(p => p.product === label);
                        return product?.fullName || label;
                      }}
                    />
                    <Bar dataKey="sales" radius={[6, 6, 0, 0]}>
                      {topProductsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${120 + index * 30}, 70%, 50%)`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Truck className="h-6 w-6 text-green-500" />
              Recent Orders
            </h2>
            <p className="text-gray-500 text-sm">Latest transactions and their status</p>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No recent orders</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6">
              <div className="inline-block min-w-full align-middle px-6">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="text-left py-4 pr-4 text-gray-600 font-medium text-sm">Customer</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-medium text-sm">Amount</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-medium text-sm">Status</th>
                      <th className="text-left py-4 pl-4 text-gray-600 font-medium text-sm">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Users className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-gray-800 text-sm truncate max-w-[150px]">
                                {order.customer?.name || "Guest Customer"}
                              </p>
                              <p className="text-xs text-gray-500 truncate max-w-[150px]">
                                {order.customer?.email || "No email"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-gray-800">₹{order.totalAmount}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 pl-4">
                          <div className="flex items-center gap-2 text-gray-600 whitespace-nowrap">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}