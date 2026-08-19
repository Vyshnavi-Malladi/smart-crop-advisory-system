// import Navbar from './Navbar';
// import Chatbot from './Chatbot';
// import { motion } from 'framer-motion';

// export default function Layout({ children }) {
//     return (
//         <div className="min-h-screen bg-gray-50/50 pb-20">
//             <Navbar />
//             <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4 }}
//                 >
//                     {children}
//                 </motion.div>
//             </main>
//             <Chatbot />
//         </div>
//     );
// }











// import { useState } from "react";
// import Navbar from "./Navbar";
// import Chatbot from "./Chatbot";
// import CartDrawer from "../pages/CartDrawer";
// import { motion } from "framer-motion";

// export default function Layout({ children }) {

//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50/50 pb-20">

//       {/* NAVBAR */}
//       <Navbar
//         cartCount={cart.length}
//         onCartClick={() => setIsCartOpen(true)}
//       />

//       {/* PAGE CONTENT */}
//       <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           {/* Pass setCart into children safely */}
//           {typeof children === "function"
//             ? children({ setCart })
//             : children}
//         </motion.div>
//       </main>

//       {/* CART DRAWER */}
//       <CartDrawer
//         cart={cart}
//         setCart={setCart}
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//       />

//       <Chatbot />
//     </div>
//   );
// }









// import { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import Chatbot from "./Chatbot";
// import CartDrawer from "../pages/CartDrawer";
// import { motion } from "framer-motion";
// import React from "react";
// import api from "../api";
// import Cookies from "js-cookie";

// export default function Layout({ children }) {

//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // ================= FETCH CART FROM DATABASE =================
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const token = Cookies.get("token");
//         if (!token) return;

//         const { data } = await api.get("/cart", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         if (data?.items) {
//           setCart(
//             data.items.map(item => ({
//               ...item.productId,
//               quantity: item.quantity
//             }))
//           );
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchCart();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50/50 pb-20">

//       {/* ================= NAVBAR ================= */}
//       <Navbar
//         cartCount={cart.length}
//         onCartClick={() => setIsCartOpen(true)}
//       />

//       {/* ================= PAGE CONTENT ================= */}
//       <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           {React.isValidElement(children)
//             ? React.cloneElement(children, { setCart })
//             : children}
//         </motion.div>
//       </main>

//       {/* ================= CART DRAWER ================= */}
//       <CartDrawer
//         cart={cart}
//         setCart={setCart}
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//       />

//       {/* ================= CHATBOT ================= */}
//       <Chatbot />

//     </div>
//   );
// }













// import { useEffect } from "react";
// import Navbar from "./Navbar";
// import Chatbot from "./Chatbot";
// import CartDrawer from "../pages/CartDrawer";
// import { motion } from "framer-motion";
// import api from "../api";
// import Cookies from "js-cookie";

// export default function Layout({
//   children,
//   cart,
//   setCart,
//   isCartOpen,
//   setIsCartOpen
// }) {

//   // Fetch cart from DB when layout loads
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const token = Cookies.get("token");
//         if (!token) return;

//         const { data } = await api.get("/cart");

//         if (data?.items) {
//           setCart(
//             data.items.map(item => ({
//               ...item.productId,
//               quantity: item.quantity
//             }))
//           );
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchCart();
//   }, [setCart]);

//   return (
//     <div className="min-h-screen bg-gray-50/50 pb-20">

//       <Navbar
//         cartCount={cart.length}
//         onCartClick={() => setIsCartOpen(true)}
//       />

//       <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           {children}
//         </motion.div>
//       </main>

//       <CartDrawer
//         cart={cart}
//         setCart={setCart}
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//       />

//       <Chatbot />
//     </div>
//   );
// }















// import { useEffect } from "react";
// import Navbar from "./Navbar";
// import Chatbot from "./Chatbot";
// import CartDrawer from "../pages/CartDrawer";
// import { motion } from "framer-motion";
// import api from "../api";
// import Cookies from "js-cookie";
// import Spotlight from "./Spotlight";
// import DemoOverlay from "./DemoOverlay";
// import { useDemo } from "../context/DemoContext";
// export default function Layout({
//   children,
//   cart,
//   setCart,
//   isCartOpen,
//   setIsCartOpen
// }) {

//   const token = Cookies.get("token");

//   const user = Cookies.get("user")
//     ? JSON.parse(Cookies.get("user"))
//     : null;


//     const {
//     demoRunning,
//     stopDemo,
//     nextStep
// } = useDemo();

//   const isAdmin = user?.role === "admin";

//   // Fetch cart only for normal users
//   useEffect(() => {

//     if (isAdmin) return;

//     const fetchCart = async () => {
//       try {

//         if (!token) return;

//         const { data } = await api.get("/cart");

//         if (data?.items) {
//           setCart(
//             data.items.map(item => ({
//               ...item.productId,
//               quantity: item.quantity
//             }))
//           );
//         }

//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchCart();

//   }, [setCart, token, isAdmin]);

//   return (
//     <div className="min-h-screen bg-gray-50/50 pb-20">

//       <Navbar
//         cartCount={cart.length}
//         onCartClick={() => setIsCartOpen(true)}
//       />

//       <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           {children}
//         </motion.div>
//       </main>

//       {/* Cart only for normal users */}
//       {!isAdmin && (
//         <CartDrawer
//           cart={cart}
//           setCart={setCart}
//           isOpen={isCartOpen}
//           onClose={() => setIsCartOpen(false)}
//         />
//       )}

//       {/* Chatbot only for normal users */}
//       {!isAdmin && <Chatbot />}







// {demoRunning && (
//     <>
//         <Spotlight targetId="weather-card" />

//         <DemoOverlay
//             title="Weather Dashboard"
//             description="This card displays today's temperature, humidity, wind speed and tells the farmer whether it is safe to spray pesticides."
//             step={1}
//             totalSteps={7}
//             onNext={nextStep}
//             onSkip={stopDemo}
//         />
//     </>
// )}
//     </div>
//   );
// }








// import { useEffect } from "react";
// import Navbar from "./Navbar";
// import Chatbot from "./Chatbot";
// import CartDrawer from "../pages/CartDrawer";
// import { motion } from "framer-motion";
// import api from "../api";
// import Cookies from "js-cookie";
// import Spotlight from "./Spotlight";
// import DemoOverlay from "./DemoOverlay";
// import { useDemo } from "../context/DemoContext";

// export default function Layout({
//   children,
//   cart,
//   setCart,
//   isCartOpen,
//   setIsCartOpen
// }) {
//   const token = Cookies.get("token");
//   const user = Cookies.get("user")
//     ? JSON.parse(Cookies.get("user"))
//     : null;

//   const {
//     isActive,
//     currentStep,
//     targetId,
//     totalSteps,
//     currentStepData,
//     nextStep,
//     previousStep,
//     stopDemo
//   } = useDemo();

//   const isAdmin = user?.role === "admin";

//   // Fetch cart only for normal users
//   useEffect(() => {
//     if (isAdmin) return;

//     const fetchCart = async () => {
//       try {
//         if (!token) return;
//         const { data } = await api.get("/cart");
//         if (data?.items) {
//           setCart(
//             data.items.map(item => ({
//               ...item.productId,
//               quantity: item.quantity
//             }))
//           );
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchCart();
//   }, [setCart, token, isAdmin]);

//   return (
//     <div className="min-h-screen bg-gray-50/50 pb-20">
//       <Navbar
//         cartCount={cart.length}
//         onCartClick={() => setIsCartOpen(true)}
//       />

//       <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           {children}
//         </motion.div>
//       </main>

//       {/* Cart only for normal users */}
//       {!isAdmin && (
//         <CartDrawer
//           cart={cart}
//           setCart={setCart}
//           isOpen={isCartOpen}
//           onClose={() => setIsCartOpen(false)}
//         />
//       )}

//       {/* Chatbot only for normal users */}
//       {!isAdmin && <Chatbot />}

//       {/* Guided Tour Components */}
//       {isActive && targetId && (
//         <>
//           <Spotlight targetId={targetId} />
//           <DemoOverlay
//             title={currentStepData?.title || "Feature"}
//             description={currentStepData?.description || "Learn about this feature"}
//             features={currentStepData?.features || []}
//             step={currentStep + 1}
//             totalSteps={totalSteps}
//             onNext={nextStep}
//             onPrevious={previousStep}
//             onSkip={stopDemo}
//           />
//         </>
//       )}
//     </div>
//   );
// }






// import { useEffect } from "react";
// import Navbar from "./Navbar";
// import Chatbot from "./Chatbot";
// import CartDrawer from "../pages/CartDrawer";
// import { motion } from "framer-motion";
// import api from "../api";
// import Cookies from "js-cookie";
// import Spotlight from "./Spotlight";
// import DemoOverlay from "./DemoOverlay";
// import { useDemo } from "../context/DemoContext";

// export default function Layout({
//   children,
//   cart,
//   setCart,
//   isCartOpen,
//   setIsCartOpen
// }) {
//   const token = Cookies.get("token");
//   const user = Cookies.get("user")
//     ? JSON.parse(Cookies.get("user"))
//     : null;

//   const {
//     isActive,
//     currentStep,
//     targetId,
//     totalSteps,
//     currentStepData,
//     nextStep,
//     previousStep,
//     stopDemo
//   } = useDemo();

//   const isAdmin = user?.role === "admin";

//   // Fetch cart only for normal users
//   useEffect(() => {
//     if (isAdmin) return;

//     const fetchCart = async () => {
//       try {
//         if (!token) return;
//         const { data } = await api.get("/cart");
//         if (data?.items) {
//           setCart(
//             data.items.map(item => ({
//               ...item.productId,
//               quantity: item.quantity
//             }))
//           );
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchCart();
//   }, [setCart, token, isAdmin]);

//   return (
//     <div className="min-h-screen bg-gray-50/50 pb-20">
//       <Navbar
//         cartCount={cart.length}
//         onCartClick={() => setIsCartOpen(true)}
//       />

//       <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           {children}
//         </motion.div>
//       </main>

//       {/* Cart only for normal users */}
//       {!isAdmin && (
//         <CartDrawer
//           cart={cart}
//           setCart={setCart}
//           isOpen={isCartOpen}
//           onClose={() => setIsCartOpen(false)}
//         />
//       )}

//       {/* Chatbot only for normal users */}
//       {!isAdmin && <Chatbot />}

//       {/* Guided Tour Components */}
//       {isActive && targetId && (
//         <>
//           <Spotlight targetId={targetId} />
//           <DemoOverlay
//             title={currentStepData?.title || "Feature"}
//             description={currentStepData?.description || "Learn about this feature"}
//             features={currentStepData?.features || []}
//             step={currentStep + 1}
//             totalSteps={totalSteps}
//             onNext={nextStep}
//             onPrevious={previousStep}
//             onSkip={stopDemo}
//             targetId={targetId}
//           />
//         </>
//       )}
//     </div>
//   );
// }















import { useEffect } from "react";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot";
import CartDrawer from "../pages/CartDrawer";
import { motion } from "framer-motion";
import api from "../api";
import Cookies from "js-cookie";
import Spotlight from "./Spotlight";
import DemoOverlay from "./DemoOverlay";
import { useDemo } from "../context/DemoContext";

export default function Layout({
  children,
  cart,
  setCart,
  isCartOpen,
  setIsCartOpen
}) {
  const token = Cookies.get("token");
  const user = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  const {
    isActive,
    currentStep,
    targetId,
    totalSteps,
    currentStepData,
    nextStep,
    previousStep,
    stopDemo
  } = useDemo();

  const isAdmin = user?.role === "admin";

  // Fetch cart only for normal users
  useEffect(() => {
    if (isAdmin) return;

    const fetchCart = async () => {
      try {
        if (!token) return;
        const { data } = await api.get("/cart");
        if (data?.items) {
          setCart(
            data.items.map(item => ({
              ...item.productId,
              quantity: item.quantity
            }))
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCart();
  }, [setCart, token, isAdmin]);

  return (
    <div className="layout-container">
      <Navbar
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="layout-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Cart only for normal users */}
      {!isAdmin && (
        <CartDrawer
          cart={cart}
          setCart={setCart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      {/* Chatbot only for normal users */}
      {!isAdmin && <Chatbot />}

      {/* Guided Tour Components */}
      {isActive && targetId && (
        <>
          <Spotlight targetId={targetId} />
          <DemoOverlay
            title={currentStepData?.title || "Feature"}
            description={currentStepData?.description || "Learn about this feature"}
            features={currentStepData?.features || []}
            step={currentStep + 1}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrevious={previousStep}
            onSkip={stopDemo}
            targetId={targetId}
          />
        </>
      )}

      <style>{`
        .layout-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #fefce8 60%, #f0fdf4 100%);
          padding-bottom: 5rem;
        }

        .layout-main {
          padding-top: 6rem;
          padding-left: 1rem;
          padding-right: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .layout-main {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        /* Scrollbar Styling */
        .layout-container::-webkit-scrollbar {
          width: 8px;
        }

        .layout-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }

        .layout-container::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #22c55e, #eab308);
          border-radius: 999px;
        }

        .layout-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #16a34a, #ca8a04);
        }

        /* Dark mode scrollbar */
        @media (prefers-color-scheme: dark) {
          .layout-container::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
          }
        }
      `}</style>
    </div>
  );
}