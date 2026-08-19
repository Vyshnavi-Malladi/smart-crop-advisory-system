// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Navbar from './components/Navbar';
// import Layout from './components/Layout';
// import ProtectedRoute from './components/ProtectedRoute';

// // Feature Pages
// import Dashboard from './pages/Dashboard';
// import CropRecommend from './pages/CropRecommend';
// import YieldPredict from './pages/YieldPredict';
// import DiseaseDetect from './pages/DiseaseDetect';
// import Store from './pages/Store';

// function App() {
//     return (
//         <div className="min-h-screen text-gray-800 font-sans bg-surface-light">
//             <Routes>
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />

//                 {/* Protected Routes */}
//                 <Route path="/" element={<ProtectedRoute><Layout><Navigate to="/dashboard" /></Layout></ProtectedRoute>} />
//                 <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
//                 <Route path="/crop-recommend" element={<ProtectedRoute><Layout><CropRecommend /></Layout></ProtectedRoute>} />
//                 <Route path="/yield-predict" element={<ProtectedRoute><Layout><YieldPredict /></Layout></ProtectedRoute>} />
//                 <Route path="/disease-detect" element={<ProtectedRoute><Layout><DiseaseDetect /></Layout></ProtectedRoute>} />
//                 <Route path="/store" element={<ProtectedRoute><Layout><Store /></Layout></ProtectedRoute>} />

//                 {/* Catch all */}
//                 <Route path="*" element={<Navigate to="/dashboard" />} />
//             </Routes>
//         </div>
//     );
// }

// export default App;













// import { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Layout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Dashboard from "./pages/Dashboard";
// import CropRecommend from "./pages/CropRecommend";
// import YieldPredict from "./pages/YieldPredict";
// import DiseaseDetect from "./pages/DiseaseDetect";
// import Store from "./pages/Store";

// function App() {

//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <Routes>

//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Dashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/crop-recommend"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <CropRecommend />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/yield-predict"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <YieldPredict />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/disease-detect"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <DiseaseDetect />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//     <Route
//   path="/store"
//   element={
//     <ProtectedRoute>
//       <Layout>
//         {({ setCart }) => (
//           <Store setCart={setCart} />
//         )}
//       </Layout>
//     </ProtectedRoute>
//   }
// />

//       <Route path="*" element={<Navigate to="/dashboard" />} />

//     </Routes>
//   );
// }

// export default App;










// import { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Layout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Dashboard from "./pages/Dashboard";
// import CropRecommend from "./pages/CropRecommend";
// import YieldPredict from "./pages/YieldPredict";
// import DiseaseDetect from "./pages/DiseaseDetect";
// import Store from "./pages/Store";
// import Orders from "./pages/Orders";

// function App() {

//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <Routes>

//       {/* Public Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Dashboard */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Dashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Crop Recommendation */}
//       <Route
//         path="/crop-recommend"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <CropRecommend />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Yield Prediction */}
//       <Route
//         path="/yield-predict"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <YieldPredict />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Disease Detection */}
//       <Route
//         path="/disease-detect"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <DiseaseDetect />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Store */}
//       <Route
//         path="/store"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Store setCart={setCart} />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Orders Page */}
//       <Route
//         path="/orders"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Orders />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/dashboard" />} />

//     </Routes>
//   );
// }

// export default App;







// import { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Layout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Dashboard from "./pages/Dashboard";
// import CropRecommend from "./pages/CropRecommend";
// import YieldPredict from "./pages/YieldPredict";
// import DiseaseDetect from "./pages/DiseaseDetect";
// import Store from "./pages/Store";
// import Orders from "./pages/Orders";

// function App() {

//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <Routes>

//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               cartCount={cart.length}   // ✅ ADDED
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Dashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/crop-recommend"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               cartCount={cart.length}   // ✅ ADDED
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <CropRecommend />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/yield-predict"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               cartCount={cart.length}   // ✅ ADDED
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <YieldPredict />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/disease-detect"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               cartCount={cart.length}   // ✅ ADDED
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <DiseaseDetect />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/store"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               cartCount={cart.length}   // ✅ ADDED
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Store setCart={setCart} cart={cart} />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/orders"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               cartCount={cart.length}   // ✅ ADDED
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Orders />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route path="*" element={<Navigate to="/dashboard" />} />

//     </Routes>
//   );
// }

// export default App;












// import { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Layout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";

// import Dashboard from "./pages/Dashboard";
// import CropRecommend from "./pages/CropRecommend";
// import YieldPredict from "./pages/YieldPredict";
// import DiseaseDetect from "./pages/DiseaseDetect";
// import Store from "./pages/Store";
// import Orders from "./pages/Orders";
// import AdminOrders from "./pages/AdminOrders";

// function App() {

//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <Routes>

//       {/* Public Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Dashboard */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Dashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Crop Recommendation */}
//       <Route
//         path="/crop-recommend"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <CropRecommend />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Yield Prediction */}
//       <Route
//         path="/yield-predict"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <YieldPredict />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Disease Detection */}
//       <Route
//         path="/disease-detect"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <DiseaseDetect />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Store */}
//       <Route
//         path="/store"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Store setCart={setCart} cart={cart} />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* User Orders */}
//       <Route
//         path="/orders"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Orders />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* 🔥 Admin Orders */}
//       <Route
//         path="/admin-orders"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminOrders />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/dashboard" />} />

//     </Routes>
//   );
// }

// export default App;









// import { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// import Layout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";

// import Dashboard from "./pages/Dashboard";
// import CropRecommend from "./pages/CropRecommend";
// import YieldPredict from "./pages/YieldPredict";
// import DiseaseDetect from "./pages/DiseaseDetect";
// import Store from "./pages/Store";
// import Orders from "./pages/Orders";

// import AdminOrders from "./pages/AdminOrders";
// import AdminProducts from "./pages/AdminProducts";

// import AdminDashboard from "./pages/AdminDashboard";

// function App() {

//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <Routes>

//       {/* ================= PUBLIC ROUTES ================= */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* ================= USER ROUTES ================= */}

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Dashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/crop-recommend"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <CropRecommend />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/yield-predict"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <YieldPredict />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/disease-detect"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <DiseaseDetect />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/store"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Store setCart={setCart} cart={cart} />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/orders"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Orders />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* ================= ADMIN ROUTES ================= */}

//       <Route
//         path="/admin-orders"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminOrders />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       <Route
//         path="/admin-products"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminProducts />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       {/* ================= FALLBACK ================= */}
//       <Route path="*" element={<Navigate to="/dashboard" />} />


//       <Route path="/admin-dashboard" element={<AdminDashboard />} />

//     </Routes>
//   );
// }

// export default App;

















// import { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// import Layout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";

// import Dashboard from "./pages/Dashboard";
// import CropRecommend from "./pages/CropRecommend";
// import YieldPredict from "./pages/YieldPredict";
// import DiseaseDetect from "./pages/DiseaseDetect";
// import Store from "./pages/Store";
// import Orders from "./pages/Orders";

// import AdminDashboard from "./pages/AdminDashboard";
// import AdminOrders from "./pages/AdminOrders";
// import AdminProducts from "./pages/AdminProducts";

// import Profile from "./pages/Profile";

// import FarmerProfile from "./pages/FarmerProfile";

// import SoilCenters from "./pages/SoilCenters";
// function App() {

//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <Routes>

//       {/* ================= PUBLIC ROUTES ================= */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />


// <Route
//     path="/farmer-profile"
//     element={
//         <ProtectedRoute>
//             <FarmerProfile />
//         </ProtectedRoute>
//     }
// />


// <Route
//     path="/profile"
//     element={
//         <ProtectedRoute>
//             <Layout
//                 cart={cart}
//                 setCart={setCart}
//                 isCartOpen={isCartOpen}
//                 setIsCartOpen={setIsCartOpen}
//             >
//                 <Profile />
//             </Layout>
//         </ProtectedRoute>
//     }
// />
//       {/* ================= USER ROUTES ================= */}

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Dashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/crop-recommend"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <CropRecommend />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/yield-predict"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <YieldPredict />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/disease-detect"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <DiseaseDetect />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/store"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Store setCart={setCart} cart={cart} />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/orders"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Orders />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />


//       {/* ================= ADMIN ROUTES ================= */}

//       <Route
//         path="/admin-dashboard"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminDashboard />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       <Route
//         path="/admin-orders"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminOrders />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       <Route
//         path="/admin-products"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminProducts />
//             </Layout>
//           </AdminRoute>
//         }
//       />



//       <Route
//     path="/soil-centers"
//     element={
//         <ProtectedRoute>
//             <Layout
//                 cart={cart}
//                 setCart={setCart}
//                 isCartOpen={isCartOpen}
//                 setIsCartOpen={setIsCartOpen}
//             >
//                 <SoilCenters />
//             </Layout>
//         </ProtectedRoute>
//     }
// />


//       {/* ================= FALLBACK ================= */}

//       <Route path="*" element={<Navigate to="/dashboard" />} />

//     </Routes>
//   );
// }

// export default App;



















// import { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Home from "./pages/Home";

// import Layout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";

// import Dashboard from "./pages/Dashboard";
// import CropRecommend from "./pages/CropRecommend";
// import YieldPredict from "./pages/YieldPredict";
// import DiseaseDetect from "./pages/DiseaseDetect";
// import Store from "./pages/Store";
// import Orders from "./pages/Orders";

// import AdminDashboard from "./pages/AdminDashboard";
// import AdminOrders from "./pages/AdminOrders";
// import AdminProducts from "./pages/AdminProducts";

// import Profile from "./pages/Profile";
// import FarmerProfile from "./pages/FarmerProfile";
// import SoilCenters from "./pages/SoilCenters";

// function App() {
//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <Routes>
//       {/* ================= PUBLIC ROUTES ================= */}
//       <Route path="/" element={<Home />} />
//       <Route path="/home" element={<Home />} />
      
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* ================= FARMER PROFILE ROUTE ================= */}
//       <Route
//         path="/farmer-profile"
//         element={
//           <ProtectedRoute>
//             <FarmerProfile />
//           </ProtectedRoute>
//         }
//       />

//       {/* ================= PROFILE ROUTE ================= */}
//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Profile />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* ================= USER ROUTES ================= */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Dashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/crop-recommend"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <CropRecommend />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/yield-predict"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <YieldPredict />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/disease-detect"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <DiseaseDetect />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/store"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Store setCart={setCart} cart={cart} />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/orders"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Orders />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* ================= SOIL CENTERS ROUTE ================= */}
//       <Route
//         path="/soil-centers"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <SoilCenters />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* ================= ADMIN ROUTES ================= */}
//       <Route
//         path="/admin-dashboard"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminDashboard />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       <Route
//         path="/admin-orders"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminOrders />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       <Route
//         path="/admin-products"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminProducts />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       {/* ================= FALLBACK ================= */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// export default App;



















// import { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import HeroBanner from "./components/HeroBanner"; // ✅ Import HeroBanner directly

// import Layout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";

// import Dashboard from "./pages/Dashboard";
// import CropRecommend from "./pages/CropRecommend";
// import YieldPredict from "./pages/YieldPredict";
// import DiseaseDetect from "./pages/DiseaseDetect";
// import Store from "./pages/Store";
// import Orders from "./pages/Orders";

// import AdminDashboard from "./pages/AdminDashboard";
// import AdminOrders from "./pages/AdminOrders";
// import AdminProducts from "./pages/AdminProducts";

// import Profile from "./pages/Profile";
// import FarmerProfile from "./pages/FarmerProfile";
// import SoilCenters from "./pages/SoilCenters";

// function App() {
//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <Routes>
//       {/* ================= PUBLIC ROUTES ================= */}
//       {/* ✅ HeroBanner is now the home page directly */}
//       <Route path="/" element={<HeroBanner />} />
//       <Route path="/home" element={<HeroBanner />} />
      
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* ================= FARMER PROFILE ROUTE ================= */}
//       <Route
//         path="/farmer-profile"
//         element={
//           <ProtectedRoute>
//             <FarmerProfile />
//           </ProtectedRoute>
//         }
//       />

//       {/* ================= PROFILE ROUTE ================= */}
//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Profile />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* ================= USER ROUTES ================= */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Dashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/crop-recommend"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <CropRecommend />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/yield-predict"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <YieldPredict />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/disease-detect"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <DiseaseDetect />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/store"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Store setCart={setCart} cart={cart} />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/orders"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <Orders />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* ================= SOIL CENTERS ROUTE ================= */}
//       <Route
//         path="/soil-centers"
//         element={
//           <ProtectedRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <SoilCenters />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* ================= ADMIN ROUTES ================= */}
//       <Route
//         path="/admin-dashboard"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminDashboard />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       <Route
//         path="/admin-orders"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminOrders />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       <Route
//         path="/admin-products"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminProducts />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       {/* ================= FALLBACK ================= */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// export default App;


















// import { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import HeroBanner from "./components/HeroBanner";

// // ===== LAYOUTS =====
// import Layout from "./components/Layout"; // Keep for backward compatibility
// import DashboardLayout from "./components/DashboardLayout"; // New Dashboard Layout

// // ===== PROTECTED ROUTES =====
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";

// // ===== USER PAGES =====
// import Dashboard from "./pages/Dashboard";
// import CropRecommend from "./pages/CropRecommend";
// import YieldPredict from "./pages/YieldPredict";
// import DiseaseDetect from "./pages/DiseaseDetect";
// import Store from "./pages/Store";
// import Orders from "./pages/Orders";
// import Profile from "./pages/Profile";
// import FarmerProfile from "./pages/FarmerProfile";
// import SoilCenters from "./pages/SoilCenters";

// // ===== ADMIN PAGES =====
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminOrders from "./pages/AdminOrders";
// import AdminProducts from "./pages/AdminProducts";



// function App() {
//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <Routes>
//       {/* ============================================================ */}
//       {/* ================= PUBLIC ROUTES ================= */}
//       {/* ============================================================ */}
//       <Route path="/" element={<HeroBanner />} />
//       <Route path="/home" element={<HeroBanner />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* ============================================================ */}
//       {/* ================= AUTHENTICATED ROUTES ================= */}
//       {/* ============================================================ */}

//       {/* ===== FARMER PROFILE (Standalone) ===== */}
//       <Route
//         path="/farmer-profile"
//         element={
//           <ProtectedRoute>
//             <FarmerProfile />
//           </ProtectedRoute>
//         }
//       />

//       {/* ============================================================ */}
//       {/* ===== DASHBOARD LAYOUT ROUTES (New Layout) ===== */}
//       {/* These routes use the new DashboardLayout with Sidebar + Topbar */}
//       {/* ============================================================ */}
//       <Route
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* Main Dashboard */}
//         <Route path="/dashboard" element={<Dashboard />} />
        
//         {/* Farm Intelligence */}
//         <Route path="/crop-recommend" element={<CropRecommend />} />
//         <Route path="/yield-predict" element={<YieldPredict />} />
//         <Route path="/disease-detect" element={<DiseaseDetect />} />
//         {/* <Route path="/weather" element={<Weather />} /> */}
        
      
        
//         {/* Marketplace */}
//         <Route path="/store" element={<Store setCart={setCart} cart={cart} />} />
//         <Route path="/orders" element={<Orders />} />
        
//         {/* Account */}
//         <Route path="/profile" element={<Profile />} />
      
//       </Route>

//       {/* ============================================================ */}
//       {/* ===== OLD LAYOUT ROUTES (Admin Only - Keep for now) ===== */}
//       {/* Admin routes still use the old Layout component */}
//       {/* ============================================================ */}
//       <Route
//         path="/admin-dashboard"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminDashboard />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       <Route
//         path="/admin-orders"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminOrders />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       <Route
//         path="/admin-products"
//         element={
//           <AdminRoute>
//             <Layout
//               cart={cart}
//               setCart={setCart}
//               isCartOpen={isCartOpen}
//               setIsCartOpen={setIsCartOpen}
//             >
//               <AdminProducts />
//             </Layout>
//           </AdminRoute>
//         }
//       />

//       {/* ============================================================ */}
//       {/* ===== FALLBACK ===== */}
//       {/* ============================================================ */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// export default App;

















// App.jsx
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HeroBanner from "./components/HeroBanner";

// ===== LAYOUTS =====
import Layout from "./components/Layout"; // Keep for backward compatibility
import DashboardLayout from "./components/DashboardLayout"; // New Dashboard Layout

// ===== PROTECTED ROUTES =====
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// ===== USER PAGES =====
import Dashboard from "./pages/Dashboard";
import CropRecommend from "./pages/CropRecommend";
import YieldPredict from "./pages/YieldPredict";
import DiseaseDetect from "./pages/DiseaseDetect";
import Store from "./pages/Store";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import FarmerProfile from "./pages/FarmerProfile";
import SoilCenters from "./pages/SoilCenters";



import Settings from "./pages/Settings";
// ===== ADMIN PAGES =====
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";

// ===== DEMO CONTEXT =====
import { DemoProvider } from "./context/DemoContext";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <DemoProvider>
      <Routes>
        {/* ============================================================ */}
        {/* ================= PUBLIC ROUTES ================= */}
        {/* ============================================================ */}
        <Route path="/" element={<HeroBanner />} />
        <Route path="/home" element={<HeroBanner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ============================================================ */}
        {/* ================= AUTHENTICATED ROUTES ================= */}
        {/* ============================================================ */}

        {/* ===== FARMER PROFILE (Standalone) ===== */}
        <Route
          path="/farmer-profile"
          element={
            <ProtectedRoute>
              <FarmerProfile />
            </ProtectedRoute>
          }
        />

        {/* ============================================================ */}
        {/* ===== DASHBOARD LAYOUT ROUTES (New Layout) ===== */}
        {/* These routes use the new DashboardLayout with Sidebar + Topbar */}
        {/* ============================================================ */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Main Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Farm Intelligence */}
          <Route path="/crop-recommend" element={<CropRecommend />} />
          <Route path="/yield-predict" element={<YieldPredict />} />
          <Route path="/disease-detect" element={<DiseaseDetect />} />
          
          {/* Farm Management */}
          <Route path="/soil-centers" element={<SoilCenters />} />
          
          {/* Marketplace */}
          <Route path="/store" element={<Store setCart={setCart} cart={cart} />} />
          <Route path="/orders" element={<Orders />} />
          
          {/* Account */}
          <Route path="/profile" element={<Profile />} />




          <Route
  path="/settings"
  element={<Settings />}
/>
        </Route>




        {/* ============================================================ */}
        {/* ===== OLD LAYOUT ROUTES (Admin Only - Keep for now) ===== */}
        {/* Admin routes still use the old Layout component */}
        {/* ============================================================ */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <Layout
                cart={cart}
                setCart={setCart}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
              >
                <AdminDashboard />
              </Layout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin-orders"
          element={
            <AdminRoute>
              <Layout
                cart={cart}
                setCart={setCart}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
              >
                <AdminOrders />
              </Layout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin-products"
          element={
            <AdminRoute>
              <Layout
                cart={cart}
                setCart={setCart}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
              >
                <AdminProducts />
              </Layout>
            </AdminRoute>
          }
        />

        {/* ============================================================ */}
        {/* ===== FALLBACK ===== */}
        {/* ============================================================ */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </DemoProvider>
  );
}

export default App;