// import { useEffect, useState } from "react";
// import api from "../api";
// import { Package, CalendarDays, Hash } from "lucide-react";

// export default function Orders() {

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const { data } = await api.get("/orders/my-orders");
//       setOrders(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR"
//     }).format(amount);

//   if (loading) {
//     return (
//       <div className="pt-10 text-center text-gray-400 text-lg">
//         Loading your orders...
//       </div>
//     );
//   }

//   return (
//     <div className="pt-16 pb-10 px-6 max-w-5xl mx-auto">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="bg-green-100 p-3 rounded-xl">
//           <Package className="text-green-600" size={26} />
//         </div>
//         <h1 className="text-3xl font-bold text-gray-800">
//           My Orders
//         </h1>
//       </div>

//       {/* EMPTY STATE */}
//       {orders.length === 0 && (
//         <div className="bg-white p-10 rounded-3xl shadow-sm border text-center">
//           <Package size={48} className="mx-auto text-gray-300 mb-4" />
//           <p className="text-gray-500 text-lg">
//             You haven't placed any orders yet.
//           </p>
//         </div>
//       )}

//       {/* ORDERS LIST */}
//       <div className="space-y-6">

//         {orders.map((order) => (

//           <div
//             key={order._id}
//             className="bg-white rounded-3xl shadow-sm border hover:shadow-md transition-all duration-300"
//           >

//             {/* ORDER HEADER */}
//             <div className="flex justify-between items-start p-5 border-b">

//               <div className="space-y-1">

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <Hash size={15} />
//                   <span>{order._id}</span>
//                 </div>

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <CalendarDays size={15} />
//                   <span>
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>

//               </div>

//               <span className={`px-4 py-1 rounded-full text-sm font-medium ${
//                 order.status === "Paid"
//                   ? "bg-green-100 text-green-700"
//                   : order.status === "Shipped"
//                   ? "bg-blue-100 text-blue-700"
//                   : order.status === "Delivered"
//                   ? "bg-purple-100 text-purple-700"
//                   : "bg-red-100 text-red-700"
//               }`}>
//                 {order.status}
//               </span>

//             </div>

//             {/* ITEMS */}
//             <div className="p-5 space-y-3">

//               {order.items.map((item, index) => (

//                 <div
//                   key={index}
//                   className="flex justify-between items-center bg-gray-50 p-4 rounded-xl"
//                 >

//                   <div>
//                     <p className="font-semibold text-gray-800">
//                       {item.name}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Quantity: {item.quantity}
//                     </p>
//                   </div>

//                   <div className="text-right">
//                     <p className="font-semibold text-gray-700">
//                       {formatCurrency(item.price)}
//                     </p>
//                     <p className="text-sm text-gray-400">
//                       Subtotal: {formatCurrency(item.price * item.quantity)}
//                     </p>
//                   </div>

//                 </div>

//               ))}

//             </div>

//             {/* TOTAL */}
//             <div className="flex justify-between items-center px-5 py-4 border-t bg-gray-50 rounded-b-3xl">

//               <p className="font-semibold text-gray-700 text-lg">
//                 Total Amount
//               </p>

//               <p className="text-2xl font-bold text-green-600">
//                 {formatCurrency(order.totalAmount)}
//               </p>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import api from "../api";
// import { Package, CalendarDays, Hash } from "lucide-react";
// import { useTranslation } from "react-i18next";

// export default function Orders() {

//   const { t } = useTranslation();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const { data } = await api.get("/orders/my-orders");
//       setOrders(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR"
//     }).format(amount);

//   if (loading) {
//     return (
//       <div className="pt-10 text-center text-gray-400 text-lg">
//         {t("loading_orders")}
//       </div>
//     );
//   }

//   return (
//     <div className="pt-16 pb-10 px-6 max-w-5xl mx-auto">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="bg-green-100 p-3 rounded-xl">
//           <Package className="text-green-600" size={26} />
//         </div>

//         <h1 className="text-3xl font-bold text-gray-800">
//           {t("my_orders")}
//         </h1>
//       </div>

//       {/* EMPTY STATE */}
//       {orders.length === 0 && (
//         <div className="bg-white p-10 rounded-3xl shadow-sm border text-center">

//           <Package size={48} className="mx-auto text-gray-300 mb-4" />

//           <p className="text-gray-500 text-lg">
//             {t("no_orders")}
//           </p>

//         </div>
//       )}

//       {/* ORDERS LIST */}
//       <div className="space-y-6">

//         {orders.map((order) => (

//           <div
//             key={order._id}
//             className="bg-white rounded-3xl shadow-sm border hover:shadow-md transition-all duration-300"
//           >

//             {/* ORDER HEADER */}
//             <div className="flex justify-between items-start p-5 border-b">

//               <div className="space-y-1">

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <Hash size={15} />
//                   <span>{order._id}</span>
//                 </div>

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <CalendarDays size={15} />
//                   <span>
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>

//               </div>

//               <span className={`px-4 py-1 rounded-full text-sm font-medium ${
//                 order.status === "Paid"
//                   ? "bg-green-100 text-green-700"
//                   : order.status === "Shipped"
//                   ? "bg-blue-100 text-blue-700"
//                   : order.status === "Delivered"
//                   ? "bg-purple-100 text-purple-700"
//                   : "bg-red-100 text-red-700"
//               }`}>
//                 {order.status}
//               </span>

//             </div>

//             {/* ITEMS */}
//             <div className="p-5 space-y-3">

//               {order.items.map((item, index) => (

//                 <div
//                   key={index}
//                   className="flex justify-between items-center bg-gray-50 p-4 rounded-xl"
//                 >

//                   <div>
//                     <p className="font-semibold text-gray-800">
//                       {item.name}
//                     </p>

//                     <p className="text-sm text-gray-500">
//                       {t("quantity")}: {item.quantity}
//                     </p>

//                   </div>

//                   <div className="text-right">

//                     <p className="font-semibold text-gray-700">
//                       {formatCurrency(item.price)}
//                     </p>

//                     <p className="text-sm text-gray-400">
//                       {t("subtotal")}: {formatCurrency(item.price * item.quantity)}
//                     </p>

//                   </div>

//                 </div>

//               ))}

//             </div>

//             {/* TOTAL */}
//             <div className="flex justify-between items-center px-5 py-4 border-t bg-gray-50 rounded-b-3xl">

//               <p className="font-semibold text-gray-700 text-lg">
//                 {t("total_amount")}
//               </p>

//               <p className="text-2xl font-bold text-green-600">
//                 {formatCurrency(order.totalAmount)}
//               </p>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }








// import { useEffect, useState } from "react";
// import api from "../api";
// import { Package, CalendarDays, Hash } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";

// export default function Orders() {

//   const { t } = useTranslation();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const { data } = await api.get("/orders/my-orders");
//       setOrders(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= CANCEL ORDER =================
//   const cancelOrder = async (id) => {
//     try {

//       await api.put(`/orders/${id}/status`, {
//         status: "Cancelled"
//       });

//       toast.success("Order cancelled successfully");

//       fetchOrders();

//     } catch (err) {

//       console.error(err);

//       toast.error("Failed to cancel order");

//     }
//   };

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR"
//     }).format(amount);

//   if (loading) {
//     return (
//       <div className="pt-10 text-center text-gray-400 text-lg">
//         {t("loading_orders")}
//       </div>
//     );
//   }

//   return (
//     <div className="pt-16 pb-10 px-6 max-w-5xl mx-auto">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="bg-green-100 p-3 rounded-xl">
//           <Package className="text-green-600" size={26} />
//         </div>

//         <h1 className="text-3xl font-bold text-gray-800">
//           {t("my_orders")}
//         </h1>
//       </div>

//       {/* EMPTY STATE */}
//       {orders.length === 0 && (
//         <div className="bg-white p-10 rounded-3xl shadow-sm border text-center">

//           <Package size={48} className="mx-auto text-gray-300 mb-4" />

//           <p className="text-gray-500 text-lg">
//             {t("no_orders")}
//           </p>

//         </div>
//       )}

//       {/* ORDERS LIST */}
//       <div className="space-y-6">

//         {orders.map((order) => (

//           <div
//             key={order._id}
//             className="bg-white rounded-3xl shadow-sm border hover:shadow-md transition-all duration-300"
//           >

//             {/* ORDER HEADER */}
//             <div className="flex justify-between items-start p-5 border-b">

//               <div className="space-y-1">

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <Hash size={15} />
//                   <span>{order._id}</span>
//                 </div>

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <CalendarDays size={15} />
//                   <span>
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>

//               </div>

//               <div className="flex flex-col items-end gap-2">

//                 {/* STATUS BADGE */}
//                 <span className={`px-4 py-1 rounded-full text-sm font-medium ${
//                   order.status === "Paid"
//                     ? "bg-green-100 text-green-700"
//                     : order.status === "Processing"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : order.status === "Shipped"
//                     ? "bg-blue-100 text-blue-700"
//                     : order.status === "Delivered"
//                     ? "bg-purple-100 text-purple-700"
//                     : "bg-red-100 text-red-700"
//                 }`}>
//                   {order.status}
//                 </span>

//                 {/* CANCEL BUTTON */}
//                 {(order.status === "Paid" || order.status === "Processing") && (
//                   <button
//                     onClick={() => cancelOrder(order._id)}
//                     className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
//                   >
//                     {t("cancel_order")}
//                   </button>
//                 )}

//               </div>

//             </div>

//             {/* ITEMS */}
//             <div className="p-5 space-y-3">

//               {order.items.map((item, index) => (

//                 <div
//                   key={index}
//                   className="flex justify-between items-center bg-gray-50 p-4 rounded-xl"
//                 >

//                   <div>
//                     <p className="font-semibold text-gray-800">
//                       {item.name}
//                     </p>

//                     <p className="text-sm text-gray-500">
//                       {t("quantity")}: {item.quantity}
//                     </p>

//                   </div>

//                   <div className="text-right">

//                     <p className="font-semibold text-gray-700">
//                       {formatCurrency(item.price)}
//                     </p>

//                     <p className="text-sm text-gray-400">
//                       {t("subtotal")}: {formatCurrency(item.price * item.quantity)}
//                     </p>

//                   </div>

//                 </div>

//               ))}

//             </div>

//             {/* TOTAL */}
//             <div className="flex justify-between items-center px-5 py-4 border-t bg-gray-50 rounded-b-3xl">

//               <p className="font-semibold text-gray-700 text-lg">
//                 {t("total_amount")}
//               </p>

//               <p className="text-2xl font-bold text-green-600">
//                 {formatCurrency(order.totalAmount)}
//               </p>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }









// import { useEffect, useState } from "react";
// import api from "../api";
// import { Package, CalendarDays, Hash } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";

// export default function Orders() {

//   const { t } = useTranslation();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCancelModal, setShowCancelModal] = useState(false);
// const [cancelOrderId, setCancelOrderId] = useState(null);
// const [cancelReason, setCancelReason] = useState("");

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const { data } = await api.get("/orders/my-orders");
//       setOrders(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= CANCEL ORDER =================
//   const cancelOrder = async (id) => {
//     try {

//       await api.put(`/orders/status/${id}`, {
//         status: "Cancelled"
//       });

//       toast.success(t("order_cancel_success"));

//       fetchOrders();

//     } catch (err) {

//       console.error(err);

//       toast.error(t("order_cancel_failed"));

//     }
//   };

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR"
//     }).format(amount);

//   if (loading) {
//     return (
//       <div className="pt-10 text-center text-gray-400 text-lg">
//         {t("loading_orders")}
//       </div>
//     );
//   }

//   return (
//     <div className="pt-16 pb-10 px-6 max-w-5xl mx-auto">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="bg-green-100 p-3 rounded-xl">
//           <Package className="text-green-600" size={26} />
//         </div>

//         <h1 className="text-3xl font-bold text-gray-800">
//           {t("my_orders")}
//         </h1>
//       </div>

//       {/* EMPTY STATE */}
//       {orders.length === 0 && (
//         <div className="bg-white p-10 rounded-3xl shadow-sm border text-center">

//           <Package size={48} className="mx-auto text-gray-300 mb-4" />

//           <p className="text-gray-500 text-lg">
//             {t("no_orders")}
//           </p>

//         </div>
//       )}

//       {/* ORDERS LIST */}
//       <div className="space-y-6">

//         {orders.map((order) => (

//           <div
//             key={order._id}
//             className="bg-white rounded-3xl shadow-sm border hover:shadow-md transition-all duration-300"
//           >

//             {/* ORDER HEADER */}
//             <div className="flex justify-between items-start p-5 border-b">

//               <div className="space-y-1">

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <Hash size={15} />
//                   <span>{order._id}</span>
//                 </div>

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <CalendarDays size={15} />
//                   <span>
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>

//               </div>

//               <div className="flex flex-col items-end gap-2">

//                 {/* STATUS BADGE */}
//                 <span className={`px-4 py-1 rounded-full text-sm font-medium ${
//                   order.status === "Paid"
//                     ? "bg-green-100 text-green-700"
//                     : order.status === "Processing"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : order.status === "Shipped"
//                     ? "bg-blue-100 text-blue-700"
//                     : order.status === "Delivered"
//                     ? "bg-purple-100 text-purple-700"
//                     : "bg-red-100 text-red-700"
//                 }`}>
//                   {t("order_status_label")} - {t(`order_status.${order.status}`)}
//                 </span>

//                 {/* CANCEL BUTTON */}
//                 {(order.status === "Paid" || order.status === "Processing") && (
//                   <button
//                     onClick={() => {
//   setCancelOrderId(order._id);
//   setShowCancelModal(true);
// }}
//                     className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
//                   >
//                     {t("cancel_order")}
//                   </button>
//                 )}

//               </div>

//             </div>

//             {/* ITEMS */}
//             <div className="p-5 space-y-3">

//               {order.items.map((item, index) => (

//                 <div
//                   key={index}
//                   className="flex justify-between items-center bg-gray-50 p-4 rounded-xl"
//                 >

//                   <div>
//                     <p className="font-semibold text-gray-800">
//                       {item.name}
//                     </p>

//                     <p className="text-sm text-gray-500">
//                       {t("quantity")}: {item.quantity}
//                     </p>

//                   </div>

//                   <div className="text-right">

//                     <p className="font-semibold text-gray-700">
//                       {formatCurrency(item.price)}
//                     </p>

//                     <p className="text-sm text-gray-400">
//                       {t("subtotal")}: {formatCurrency(item.price * item.quantity)}
//                     </p>

//                   </div>

//                 </div>

//               ))}

//             </div>

//             {/* TOTAL */}
//             <div className="flex justify-between items-center px-5 py-4 border-t bg-gray-50 rounded-b-3xl">

//               <p className="font-semibold text-gray-700 text-lg">
//                 {t("total_amount")}
//               </p>

//               <p className="text-2xl font-bold text-green-600">
//                 {formatCurrency(order.totalAmount)}
//               </p>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }









// import { useEffect, useState } from "react";
// import api from "../api";
// import { Package, CalendarDays, Hash } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";

// export default function Orders() {

//   const { t } = useTranslation();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [cancelOrderId, setCancelOrderId] = useState(null);
//   const [cancelReason, setCancelReason] = useState("");

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const { data } = await api.get("/orders/my-orders");
//       setOrders(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // CANCEL ORDER
//   const cancelOrder = async () => {
//     try {

//       await api.put(`/orders/status/${cancelOrderId}`, {
//         status: "Cancelled",
//         reason: cancelReason
//       });

//       toast.success(t("order_cancel_success"));

//       setShowCancelModal(false);
//       setCancelReason("");
//       setCancelOrderId(null);

//       fetchOrders();

//     } catch (err) {

//       console.error(err);
//       toast.error(t("order_cancel_failed"));

//     }
//   };

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR"
//     }).format(amount);

//   if (loading) {
//     return (
//       <div className="pt-10 text-center text-gray-400 text-lg">
//         {t("loading_orders")}
//       </div>
//     );
//   }

//   return (
//     <div className="pt-16 pb-10 px-6 max-w-5xl mx-auto">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="bg-green-100 p-3 rounded-xl">
//           <Package className="text-green-600" size={26} />
//         </div>

//         <h1 className="text-3xl font-bold text-gray-800">
//           {t("my_orders")}
//         </h1>
//       </div>

//       {orders.length === 0 && (
//         <div className="bg-white p-10 rounded-3xl shadow-sm border text-center">
//           <Package size={48} className="mx-auto text-gray-300 mb-4" />
//           <p className="text-gray-500 text-lg">
//             {t("no_orders")}
//           </p>
//         </div>
//       )}

//       <div className="space-y-6">

//         {orders.map((order) => (

//           <div key={order._id}
//             className="bg-white rounded-3xl shadow-sm border hover:shadow-md transition-all duration-300">

//             {/* HEADER */}
//             <div className="flex justify-between items-start p-5 border-b">

//               <div className="space-y-1">

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <Hash size={15} />
//                   <span>{order._id}</span>
//                 </div>

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <CalendarDays size={15} />
//                   <span>
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>

//               </div>

//               <div className="flex flex-col items-end gap-2">

//                 {/* STATUS */}
//                 <span className={`px-4 py-1 rounded-full text-sm font-medium ${
//                   order.status === "Paid"
//                     ? "bg-green-100 text-green-700"
//                     : order.status === "Processing"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : order.status === "Shipped"
//                     ? "bg-blue-100 text-blue-700"
//                     : order.status === "Delivered"
//                     ? "bg-purple-100 text-purple-700"
//                     : "bg-red-100 text-red-700"
//                 }`}>
//                   {t("order_status_label")} - {t(`order_status.${order.status}`)}
//                 </span>

//                 {(order.status === "Paid" || order.status === "Processing") && (
//                   <button
//                     onClick={() => {
//                       setCancelOrderId(order._id);
//                       setShowCancelModal(true);
//                     }}
//                     className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
//                   >
//                     {t("cancel_order")}
//                   </button>
//                 )}

//               </div>

//             </div>

//             {/* ITEMS */}
//             <div className="p-5 space-y-3">

//               {order.items.map((item, index) => (

//                 <div key={index}
//                   className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">

//                   <div>
//                     <p className="font-semibold text-gray-800">{item.name}</p>
//                     <p className="text-sm text-gray-500">
//                       {t("quantity")}: {item.quantity}
//                     </p>
//                   </div>

//                   <div className="text-right">
//                     <p className="font-semibold text-gray-700">
//                       {formatCurrency(item.price)}
//                     </p>
//                     <p className="text-sm text-gray-400">
//                       {t("subtotal")}: {formatCurrency(item.price * item.quantity)}
//                     </p>
//                   </div>

//                 </div>

//               ))}

//             </div>

//             {/* TOTAL */}
//             <div className="flex justify-between items-center px-5 py-4 border-t bg-gray-50 rounded-b-3xl">

//               <p className="font-semibold text-gray-700 text-lg">
//                 {t("total_amount")}
//               </p>

//               <p className="text-2xl font-bold text-green-600">
//                 {formatCurrency(order.totalAmount)}
//               </p>

//             </div>

//           </div>

//         ))}

//       </div>

//       {/* CANCEL MODAL */}
//       {showCancelModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

//           <div className="bg-white p-6 rounded-2xl w-[400px] shadow-lg">

//             <h2 className="text-lg font-semibold mb-3">
//               {t("cancel_order")}
//             </h2>

//             <p className="text-sm text-gray-500 mb-3">
//               {t("cancel_reason")}
//             </p>

//             <select
//               value={cancelReason}
//               onChange={(e) => setCancelReason(e.target.value)}
//               className="w-full border rounded-lg p-2 mb-4"
//             >
//               <option value="">{t("select_reason")}</option>
//               <option value="mistake">{t("cancel_reason_mistake")}</option>
//               <option value="cheaper">{t("cancel_reason_cheaper")}</option>
//               <option value="late">{t("cancel_reason_late")}</option>
//               <option value="mind">{t("cancel_reason_mind")}</option>
//             </select>

//             <div className="flex justify-end gap-3">

//               <button
//                 onClick={() => setShowCancelModal(false)}
//                 className="px-4 py-2 bg-gray-200 rounded-lg"
//               >
//                 {t("close")}
//               </button>

//               <button
//                 onClick={cancelOrder}
//                 disabled={!cancelReason}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
//               >
//                 {t("confirm_cancel")}
//               </button>

//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }














import { useEffect, useState } from "react";
import api from "../api";
import {
  Package,
  CalendarDays,
  Hash,
  ChevronRight,
  ShoppingBag,
  IndianRupee,
  X,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Truck,
  PackageCheck,
  Ban,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function Orders() {
  const { t } = useTranslation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/my-orders");
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     CANCEL ORDER
  ============================================================ */

  const cancelOrder = async () => {
    try {
      await api.put(`/orders/status/${cancelOrderId}`, {
        status: "Cancelled",
        reason: cancelReason,
      });

      toast.success(t("order_cancel_success"));

      setShowCancelModal(false);
      setCancelReason("");
      setCancelOrderId(null);

      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error(t("order_cancel_failed"));
    }
  };

  /* ============================================================
     CURRENCY
  ============================================================ */

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  /* ============================================================
     STATUS HELPERS
  ============================================================ */

  const getStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return {
          wrapper: "bg-emerald-50 text-emerald-700 border-emerald-100",
          icon: <CheckCircle2 size={14} />,
        };

      case "Processing":
        return {
          wrapper: "bg-amber-50 text-amber-700 border-amber-100",
          icon: <Clock3 size={14} />,
        };

      case "Shipped":
        return {
          wrapper: "bg-blue-50 text-blue-700 border-blue-100",
          icon: <Truck size={14} />,
        };

      case "Delivered":
        return {
          wrapper: "bg-purple-50 text-purple-700 border-purple-100",
          icon: <PackageCheck size={14} />,
        };

      case "Cancelled":
        return {
          wrapper: "bg-red-50 text-red-700 border-red-100",
          icon: <Ban size={14} />,
        };

      default:
        return {
          wrapper: "bg-gray-50 text-gray-600 border-gray-100",
          icon: <Package size={14} />,
        };
    }
  };

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6faf8] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#eaf7ef] flex items-center justify-center">
            <Package
              size={28}
              className="text-[#159447] animate-pulse"
            />
          </div>

          <p className="mt-4 text-sm font-medium text-[#6d8178]">
            {t("loading_orders")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6faf8] text-[#173c2d] px-5 sm:px-6 lg:px-8 py-8">

      <div className="max-w-[1100px] mx-auto">

        {/* ======================================================
            PAGE HEADER
        ====================================================== */}

        <div className="mb-7">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="
                w-12
                h-12
                rounded-[14px]
                bg-[#e8f7ee]
                flex
                items-center
                justify-center
                shrink-0
              ">
                <ShoppingBag
                  size={23}
                  className="text-[#159447]"
                />
              </div>

              <div>

                <h1 className="
                  text-[27px]
                  sm:text-[30px]
                  font-bold
                  tracking-[-0.5px]
                  text-[#173c2d]
                ">
                  {t("my_orders")}
                </h1>

                <p className="
                  mt-1
                  text-[13px]
                  sm:text-[14px]
                  text-[#7b8d85]
                ">
                  View and manage your recent FarmXpert orders
                </p>

              </div>

            </div>

            {/* ORDER COUNT */}

            {orders.length > 0 && (
              <div className="
                hidden
                sm:flex
                items-center
                gap-2
                bg-white
                border
                border-[#e4ece7]
                rounded-xl
                px-4
                py-2.5
                shadow-sm
              ">

                <Package
                  size={16}
                  className="text-[#159447]"
                />

                <span className="
                  text-[13px]
                  font-semibold
                  text-[#52675e]
                ">
                  {orders.length}{" "}
                  {orders.length === 1
                    ? "Order"
                    : "Orders"}
                </span>

              </div>
            )}

          </div>

          <div className="
            mt-6
            h-px
            bg-[#e6eee9]
          " />

        </div>

        {/* ======================================================
            EMPTY STATE
        ====================================================== */}

        {orders.length === 0 && (
          <div className="
            bg-white
            border
            border-[#e5ede8]
            rounded-[24px]
            shadow-[0_6px_24px_rgba(22,73,48,0.05)]
            p-10
            sm:p-14
            text-center
          ">

            <div className="
              w-20
              h-20
              mx-auto
              rounded-full
              bg-[#eef8f2]
              flex
              items-center
              justify-center
            ">
              <ShoppingBag
                size={35}
                className="text-[#9ab5a7]"
              />
            </div>

            <h2 className="
              mt-5
              text-xl
              font-bold
              text-[#294b3c]
            ">
              {t("no_orders")}
            </h2>

            <p className="
              mt-2
              text-sm
              text-[#8a9b94]
            ">
              Your orders will appear here once you make a purchase.
            </p>

          </div>
        )}

        {/* ======================================================
            ORDERS
        ====================================================== */}

        <div className="space-y-5">

          {orders.map((order, orderIndex) => {

            const statusStyle = getStatusStyle(
              order.status
            );

            return (
              <div
                key={order._id}
                className="
                  bg-white
                  rounded-[22px]
                  border
                  border-[#e4ece7]
                  shadow-[0_5px_22px_rgba(22,73,48,0.06)]
                  hover:shadow-[0_9px_30px_rgba(22,73,48,0.09)]
                  transition-all
                  duration-300
                  overflow-hidden
                "
              >

                {/* =================================================
                    ORDER TOP SECTION
                ================================================= */}

                <div className="
                  px-5
                  sm:px-6
                  py-5
                  border-b
                  border-[#edf1ee]
                ">

                  <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                  ">

                    {/* LEFT */}

                    <div className="min-w-0">

                      <div className="
                        flex
                        items-center
                        gap-2.5
                        mb-2
                      ">

                        <div className="
                          w-9
                          h-9
                          rounded-lg
                          bg-[#eff8f2]
                          flex
                          items-center
                          justify-center
                        ">
                          <Package
                            size={18}
                            className="text-[#159447]"
                          />
                        </div>

                        <div>

                          <p className="
                            text-[11px]
                            uppercase
                            tracking-[0.08em]
                            font-semibold
                            text-[#91a098]
                          ">
                            Order
                          </p>

                          <p className="
                            text-[14px]
                            font-bold
                            text-[#29493b]
                            truncate
                            max-w-[260px]
                            sm:max-w-[400px]
                          ">
                            #{order._id}
                          </p>

                        </div>

                      </div>

                      <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-x-5
                        gap-y-2
                        ml-0
                        sm:ml-[46px]
                      ">

                        <div className="
                          flex
                          items-center
                          gap-1.5
                          text-[12px]
                          text-[#7b8d85]
                        ">

                          <CalendarDays size={14} />

                          <span>
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}
                          </span>

                        </div>

                        <div className="
                          flex
                          items-center
                          gap-1.5
                          text-[12px]
                          text-[#7b8d85]
                        ">

                          <Hash size={14} />

                          <span>
                            {order.items?.length || 0}{" "}
                            {order.items?.length === 1
                              ? "item"
                              : "items"}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* RIGHT */}

                    <div className="
                      flex
                      items-center
                      justify-between
                      md:justify-end
                      gap-3
                    ">

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          px-3
                          py-1.5
                          rounded-full
                          border
                          text-[12px]
                          font-semibold
                          ${statusStyle.wrapper}
                        `}
                      >

                        {statusStyle.icon}

                        {t("order_status_label")} -{" "}
                        {t(
                          `order_status.${order.status}`
                        )}

                      </span>

                      {(order.status === "Paid" ||
                        order.status === "Processing") && (
                        <button
                          onClick={() => {
                            setCancelOrderId(
                              order._id
                            );
                            setShowCancelModal(true);
                          }}
                          className="
                            px-3
                            py-1.5
                            rounded-lg
                            bg-red-50
                            border
                            border-red-100
                            text-red-600
                            text-[11px]
                            font-semibold
                            hover:bg-red-100
                            transition
                          "
                        >
                          {t("cancel_order")}
                        </button>
                      )}

                    </div>

                  </div>

                </div>

                {/* =================================================
                    ITEMS
                ================================================= */}

                <div className="px-5 sm:px-6 py-5">

                  <div className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  ">

                    <div className="
                      flex
                      items-center
                      gap-2
                    ">

                      <div className="
                        w-7
                        h-7
                        rounded-lg
                        bg-[#f0f8f3]
                        flex
                        items-center
                        justify-center
                      ">
                        <ShoppingBag
                          size={14}
                          className="text-[#159447]"
                        />
                      </div>

                      <p className="
                        text-[13px]
                        font-bold
                        text-[#395649]
                      ">
                        Order Items
                      </p>

                    </div>

                    <span className="
                      text-[11px]
                      text-[#9aa8a2]
                    ">
                      {order.items?.length || 0}{" "}
                      {order.items?.length === 1
                        ? "item"
                        : "items"}
                    </span>

                  </div>

                  <div className="space-y-2.5">

                    {order.items.map(
                      (item, index) => (

                        <div
                          key={index}
                          className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            bg-[#f8faf9]
                            border
                            border-[#edf1ee]
                            rounded-xl
                            px-4
                            py-3.5
                            hover:bg-[#f4f9f6]
                            transition
                          "
                        >

                          {/* ITEM INFO */}

                          <div className="
                            flex
                            items-center
                            gap-3
                            min-w-0
                          ">

                            <div className="
                              w-9
                              h-9
                              rounded-lg
                              bg-white
                              border
                              border-[#e6eee9]
                              flex
                              items-center
                              justify-center
                              shrink-0
                            ">

                              <Package
                                size={16}
                                className="text-[#779387]"
                              />

                            </div>

                            <div className="min-w-0">

                              <p className="
                                font-semibold
                                text-[13px]
                                sm:text-[14px]
                                text-[#334e42]
                                truncate
                              ">
                                {item.name}
                              </p>

                              <p className="
                                mt-0.5
                                text-[11px]
                                sm:text-[12px]
                                text-[#899891]
                              ">
                                {t("quantity")}:{" "}
                                {item.quantity}
                              </p>

                            </div>

                          </div>

                          {/* ITEM PRICE */}

                          <div className="
                            text-right
                            shrink-0
                          ">

                            <p className="
                              font-semibold
                              text-[13px]
                              sm:text-[14px]
                              text-[#40594e]
                            ">
                              {formatCurrency(
                                item.price
                              )}
                            </p>

                            <p className="
                              mt-0.5
                              text-[10px]
                              sm:text-[11px]
                              text-[#98a49f]
                            ">
                              {t("subtotal")}:{" "}
                              {formatCurrency(
                                item.price *
                                  item.quantity
                              )}
                            </p>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                </div>

                {/* =================================================
                    TOTAL
                ================================================= */}

                <div className="
                  bg-[#f5faf7]
                  border-t
                  border-[#e5eee8]
                  px-5
                  sm:px-6
                  py-4
                ">

                  <div className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  ">

                    <div>

                      <p className="
                        text-[11px]
                        uppercase
                        tracking-[0.07em]
                        font-semibold
                        text-[#8a9b94]
                      ">
                        {t("total_amount")}
                      </p>

                      <p className="
                        text-[11px]
                        text-[#9aa8a2]
                        mt-0.5
                      ">
                        Final order amount
                      </p>

                    </div>

                    <p className="
                      text-[21px]
                      sm:text-[23px]
                      font-bold
                      text-[#159447]
                    ">
                      {formatCurrency(
                        order.totalAmount
                      )}
                    </p>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* ========================================================
          CANCEL MODAL
      ======================================================== */}

      {showCancelModal && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-[#10251c]/50
            backdrop-blur-[3px]
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() =>
            setShowCancelModal(false)
          }
        >

          <div
            className="
              bg-white
              w-full
              max-w-[430px]
              rounded-[24px]
              shadow-[0_20px_60px_rgba(0,0,0,0.18)]
              overflow-hidden
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="
              px-6
              pt-6
              pb-5
              border-b
              border-[#edf1ee]
            ">

              <div className="
                flex
                items-start
                justify-between
                gap-4
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <div className="
                    w-11
                    h-11
                    rounded-xl
                    bg-red-50
                    flex
                    items-center
                    justify-center
                  ">

                    <AlertCircle
                      size={22}
                      className="text-red-500"
                    />

                  </div>

                  <div>

                    <h2 className="
                      text-[18px]
                      font-bold
                      text-[#263f34]
                    ">
                      {t("cancel_order")}
                    </h2>

                    <p className="
                      text-[12px]
                      text-[#8a9993]
                      mt-0.5
                    ">
                      Tell us why you want to cancel
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setShowCancelModal(false)
                  }
                  className="
                    w-8
                    h-8
                    rounded-full
                    hover:bg-gray-100
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    transition
                  "
                >
                  <X size={17} />
                </button>

              </div>

            </div>

            {/* MODAL BODY */}

            <div className="p-6">

              <p className="
                text-[13px]
                text-[#65776f]
                mb-3
              ">
                {t("cancel_reason")}
              </p>

              <select
                value={cancelReason}
                onChange={(e) =>
                  setCancelReason(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-[46px]
                  border
                  border-[#dfe7e2]
                  rounded-xl
                  px-4
                  text-[13px]
                  text-[#465d53]
                  bg-white
                  outline-none
                  focus:border-[#159447]
                  focus:ring-2
                  focus:ring-[#159447]/10
                  transition
                "
              >

                <option value="">
                  {t("select_reason")}
                </option>

                <option value="mistake">
                  {t("cancel_reason_mistake")}
                </option>

                <option value="cheaper">
                  {t("cancel_reason_cheaper")}
                </option>

                <option value="late">
                  {t("cancel_reason_late")}
                </option>

                <option value="mind">
                  {t("cancel_reason_mind")}
                </option>

              </select>

              {/* BUTTONS */}

              <div className="
                flex
                flex-col-reverse
                sm:flex-row
                justify-end
                gap-2.5
                mt-6
              ">

                <button
                  onClick={() =>
                    setShowCancelModal(false)
                  }
                  className="
                    h-[42px]
                    px-5
                    rounded-xl
                    bg-gray-100
                    hover:bg-gray-200
                    text-gray-600
                    text-[13px]
                    font-medium
                    transition
                  "
                >
                  {t("close")}
                </button>

                <button
                  onClick={cancelOrder}
                  disabled={!cancelReason}
                  className="
                    h-[42px]
                    px-5
                    rounded-xl
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    text-[13px]
                    font-semibold
                    transition
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  {t("confirm_cancel")}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}