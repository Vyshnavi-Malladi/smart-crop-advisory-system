// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, ShoppingBag, Sprout, LogOut, Globe } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';

// export default function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);
//     const { t, i18n } = useTranslation();
//     const location = useLocation();
//     const token = Cookies.get('token');

//     const links = [
//         { name: t('nav_dashboard'), path: '/dashboard' },
//         { name: t('nav_crop'), path: '/crop-recommend' },
//         { name: t('nav_yield'), path: '/yield-predict' },
//         { name: t('nav_disease'), path: '/disease-detect' },
//         { name: t('nav_store'), path: '/store' },
//     ];

//     const handleLogout = () => {
//         Cookies.remove('token');
//         window.location.href = '/login';
//     };

//     const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//     };

//     if (!token) return null;

//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
//             <div className="max-w-7xl mx-auto flex justify-between items-center">
//                 {/* Logo */}
//                 <Link to="/dashboard" className="flex items-center gap-2 text-primary-dark hover:scale-105 transition-transform">
//                     <div className="p-2 bg-primary/10 rounded-lg text-primary">
//                         <Sprout size={24} strokeWidth={2.5} />
//                     </div>
//                     <span className="text-xl font-bold tracking-tight">SmartCrop<span className="text-primary">.ai</span></span>
//                 </Link>

//                 {/* Desktop Links */}
//                 <div className="hidden md:flex items-center gap-8">
//                     {links.map((link) => (
//                         <Link
//                             key={link.path}
//                             to={link.path}
//                             className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-gray-600'
//                                 }`}
//                         >
//                             {link.name}
//                             {location.pathname === link.path && (
//                                 <motion.div
//                                     layoutId="underline"
//                                     className="h-1 w-full bg-primary rounded-full mt-1"
//                                 />
//                             )}
//                         </Link>
//                     ))}
//                 </div>

//                 {/* Actions */}
//                 <div className="hidden md:flex items-center gap-4">
//                     {/* Language Switcher */}
//                     <div className="relative group">
//                         <button className="p-2 text-gray-500 hover:text-primary transition-colors">
//                             <Globe size={20} />
//                         </button>
//                         {/* Wrapper with padding top to bridge the gap */}
//                         <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block hover:block z-50">
//                             <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
//                                 <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-600 font-medium">English</button>
//                                 <button onClick={() => changeLanguage('hi')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-600 font-medium">Hindi</button>
//                                 <button onClick={() => changeLanguage('te')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-600 font-medium">Telugu</button>
//                             </div>
//                         </div>
//                     </div>

//                     <Link to="/store" className="p-2 text-gray-500 hover:text-primary hover:bg-white/50 rounded-full transition-all">
//                         <ShoppingBag size={20} />
//                     </Link>

//                     <div className="h-6 w-px bg-gray-200"></div>

//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shadow-md">
//                             U
//                         </div>
//                         <button onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors flex items-center gap-1">
//                             {t('logout')} <LogOut size={14} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Toggle */}
//                 <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600">
//                     {isOpen ? <X /> : <Menu />}
//                 </button>
//             </div>

//             {/* Mobile Menu */}
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 mt-2 rounded-2xl shadow-xl"
//                     >
//                         <div className="flex flex-col p-4 gap-2">
//                             <div className="flex gap-2 mb-2 p-2 justify-center">
//                                 <button onClick={() => changeLanguage('en')} className="px-3 py-1 bg-gray-100 rounded-lg text-xs">En</button>
//                                 <button onClick={() => changeLanguage('hi')} className="px-3 py-1 bg-gray-100 rounded-lg text-xs">Hi</button>
//                                 <button onClick={() => changeLanguage('te')} className="px-3 py-1 bg-gray-100 rounded-lg text-xs">Te</button>
//                             </div>
//                             {links.map((link) => (
//                                 <Link
//                                     key={link.path}
//                                     to={link.path}
//                                     onClick={() => setIsOpen(false)}
//                                     className={`p-3 rounded-xl text-sm font-medium ${location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
//                                         }`}
//                                 >
//                                     {link.name}
//                                 </Link>
//                             ))}
//                             <hr className="my-2 border-gray-100" />
//                             <button onClick={handleLogout} className="p-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 text-left flex items-center gap-2">
//                                 <LogOut size={16} /> {t('logout')}
//                             </button>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </nav>
//     );
// }










// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, ShoppingBag, Sprout, LogOut, Globe } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';

// export default function Navbar({ cartCount, onCartClick }) {

//     const [isOpen, setIsOpen] = useState(false);
//     const { t, i18n } = useTranslation();
//     const location = useLocation();
//     const token = Cookies.get('token');

//     const links = [
//         { name: t('nav_dashboard'), path: '/dashboard' },
//         { name: t('nav_crop'), path: '/crop-recommend' },
//         { name: t('nav_yield'), path: '/yield-predict' },
//         { name: t('nav_disease'), path: '/disease-detect' },
//         { name: t('nav_store'), path: '/store' },
//     ];

//     const handleLogout = () => {
//         Cookies.remove('token');
//         window.location.href = '/login';
//     };

//     const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//     };

//     if (!token) return null;

//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
//             <div className="max-w-7xl mx-auto flex justify-between items-center">

//                 {/* Logo */}
//                 <Link to="/dashboard" className="flex items-center gap-2 text-primary-dark hover:scale-105 transition-transform">
//                     <div className="p-2 bg-primary/10 rounded-lg text-primary">
//                         <Sprout size={24} strokeWidth={2.5} />
//                     </div>
//                     <span className="text-xl font-bold tracking-tight">
//                         FarmXpert<span className="text-primary"></span>
//                     </span>
//                 </Link>

//                 {/* Desktop Links */}
//                 <div className="hidden md:flex items-center gap-8">
//                     {links.map((link) => (
//                         <Link
//                             key={link.path}
//                             to={link.path}
//                             className={`text-sm font-medium transition-colors hover:text-primary ${
//                                 location.pathname === link.path ? 'text-primary' : 'text-gray-600'
//                             }`}
//                         >
//                             {link.name}
//                             {location.pathname === link.path && (
//                                 <motion.div
//                                     layoutId="underline"
//                                     className="h-1 w-full bg-primary rounded-full mt-1"
//                                 />
//                             )}
//                         </Link>
//                     ))}
//                 </div>

//                 {/* Right Actions */}
//                 <div className="hidden md:flex items-center gap-4">

//                     {/* 🌍 Language Switcher */}
//                     <div className="relative group">
//                         <button className="p-2 text-gray-500 hover:text-primary transition-colors">
//                             <Globe size={20} />
//                         </button>

//                         <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block z-50">
//                             <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
//                                 <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                     English
//                                 </button>
//                                 <button onClick={() => changeLanguage('hi')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                     Hindi
//                                 </button>
//                                 <button onClick={() => changeLanguage('te')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                     Telugu
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* 🛒 Cart Button (Opens Drawer) */}
//                     <button
//                         onClick={onCartClick}
//                         className="relative p-2 text-gray-500 hover:text-primary"
//                     >
//                         <ShoppingBag size={20} />

//                         {cartCount > 0 && (
//                             <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
//                                 {cartCount}
//                             </span>
//                         )}
//                     </button>

//                     <div className="h-6 w-px bg-gray-200"></div>

//                     {/* Logout */}
//                     <button
//                         onClick={handleLogout}
//                         className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors flex items-center gap-1"
//                     >
//                         {t('logout')} <LogOut size={14} />
//                     </button>
//                 </div>

//                 {/* Mobile Toggle */}
//                 <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600">
//                     {isOpen ? <X /> : <Menu />}
//                 </button>
//             </div>
//         </nav>
//     );
// }













// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, ShoppingBag, Sprout, LogOut, Globe } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';

// export default function Navbar({ cartCount, onCartClick }) {

//     const [isOpen, setIsOpen] = useState(false);
//     const { t, i18n } = useTranslation();
//     const location = useLocation();

//     const token = Cookies.get('token');
//     const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

//     const isAdmin = user?.role === "admin";

//    const links = [
//     { name: t('nav_dashboard'), path: '/dashboard' },
//     { name: t('nav_crop'), path: '/crop-recommend' },
//     { name: t('nav_yield'), path: '/yield-predict' },
//     { name: t('nav_disease'), path: '/disease-detect' },
//     { name: t('nav_store'), path: '/store' },
//     ...(isAdmin ? [{ name: "Admin Orders", path: '/admin-orders' }] : [])
// ];
//     const handleLogout = () => {
//         Cookies.remove('token');
//         Cookies.remove('user');
//         window.location.href = '/login';
//     };

//     const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//     };

//     if (!token) return null;

//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
//             <div className="max-w-7xl mx-auto flex justify-between items-center">

//                 {/* Logo */}
//                 <Link
//                     to="/dashboard"
//                     className="flex items-center gap-2 text-primary-dark hover:scale-105 transition-transform"
//                 >
//                     <div className="p-2 bg-primary/10 rounded-lg text-primary">
//                         <Sprout size={24} strokeWidth={2.5} />
//                     </div>
//                     <span className="text-xl font-bold tracking-tight">
//                         FarmXpert
//                     </span>
//                 </Link>

//                 {/* Desktop Links */}
//                 <div className="hidden md:flex items-center gap-8">
//                     {links.map((link) => (
//                         <Link
//                             key={link.path}
//                             to={link.path}
//                             className={`text-sm font-medium transition-colors hover:text-primary ${
//                                 location.pathname === link.path
//                                     ? 'text-primary'
//                                     : 'text-gray-600'
//                             }`}
//                         >
//                             {link.name}
//                             {location.pathname === link.path && (
//                                 <motion.div
//                                     layoutId="underline"
//                                     className="h-1 w-full bg-primary rounded-full mt-1"
//                                 />
//                             )}
//                         </Link>
//                     ))}
//                 </div>

//                 {/* Right Section */}
//                 <div className="hidden md:flex items-center gap-4">

//                     {/* Language Switcher */}
//                     <div className="relative group">
//                         <button className="p-2 text-gray-500 hover:text-primary transition-colors">
//                             <Globe size={20} />
//                         </button>

//                         <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block z-50">
//                             <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
//                                 <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                     English
//                                 </button>
//                                 <button onClick={() => changeLanguage('hi')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                     Hindi
//                                 </button>
//                                 <button onClick={() => changeLanguage('te')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                     Telugu
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Cart */}
//                     <button
//                         onClick={onCartClick}
//                         className="relative p-2 text-gray-500 hover:text-primary"
//                     >
//                         <ShoppingBag size={20} />
//                         {cartCount > 0 && (
//                             <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
//                                 {cartCount}
//                             </span>
//                         )}
//                     </button>

//                     <div className="h-6 w-px bg-gray-200"></div>

//                     {/* Logout */}
//                     <button
//                         onClick={handleLogout}
//                         className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors flex items-center gap-1"
//                     >
//                         {t('logout')} <LogOut size={14} />
//                     </button>
//                 </div>

//                 {/* Mobile Toggle */}
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="md:hidden p-2 text-gray-600"
//                 >
//                     {isOpen ? <X /> : <Menu />}
//                 </button>
//             </div>
//         </nav>
//     );
// }













// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, ShoppingBag, Sprout, LogOut, Globe } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';

// export default function Navbar({ cartCount, onCartClick }) {

//     const [isOpen, setIsOpen] = useState(false);
//     const { t, i18n } = useTranslation();
//     const location = useLocation();

//     const token = Cookies.get('token');
//     const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

//     const isAdmin = user?.role === "admin";

//     // ================= LINKS =================
//     const links = [
//         { name: t('nav_dashboard'), path: '/dashboard' },
//         { name: t('nav_crop'), path: '/crop-recommend' },
//         { name: t('nav_yield'), path: '/yield-predict' },
//         { name: t('nav_disease'), path: '/disease-detect' },
//         { name: t('nav_store'), path: '/store' },

//         // Normal user Orders
//         ...(!isAdmin ? [{ name: "My Orders", path: '/orders' }] : []),

//         // Admin Links
//         ...(isAdmin ? [
//             { name: "Admin Orders", path: '/admin-orders' },
//             { name: "Admin Products", path: '/admin-products' }
//         ] : [])
//     ];

//     const handleLogout = () => {
//         Cookies.remove('token');
//         Cookies.remove('user');
//         window.location.href = '/login';
//     };

//     const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//     };

//     if (!token) return null;

//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
//             <div className="max-w-7xl mx-auto flex justify-between items-center">

//                 {/* ================= LOGO ================= */}
//                 <Link
//                     to="/dashboard"
//                     className="flex items-center gap-2 text-primary-dark hover:scale-105 transition-transform"
//                 >
//                     <div className="p-2 bg-primary/10 rounded-lg text-primary">
//                         <Sprout size={24} strokeWidth={2.5} />
//                     </div>
//                     <span className="text-xl font-bold tracking-tight">
//                         FarmXpert
//                     </span>
//                 </Link>

//                 {/* ================= DESKTOP LINKS ================= */}
//                 <div className="hidden md:flex items-center gap-8">
//                     {links.map((link) => (
//                         <Link
//                             key={link.path}
//                             to={link.path}
//                             className={`text-sm font-medium transition-colors hover:text-primary ${
//                                 location.pathname === link.path
//                                     ? 'text-primary'
//                                     : 'text-gray-600'
//                             }`}
//                         >
//                             {link.name}
//                             {location.pathname === link.path && (
//                                 <motion.div
//                                     layoutId="underline"
//                                     className="h-1 w-full bg-primary rounded-full mt-1"
//                                 />
//                             )}
//                         </Link>
//                     ))}
//                 </div>

//                 {/* ================= RIGHT SECTION ================= */}
//                 <div className="hidden md:flex items-center gap-4">

//                     {/* 🌍 Language Switcher */}
//                     <div className="relative group">
//                         <button className="p-2 text-gray-500 hover:text-primary transition-colors">
//                             <Globe size={20} />
//                         </button>

//                         <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block z-50">
//                             <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
//                                 <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                     English
//                                 </button>
//                                 <button onClick={() => changeLanguage('hi')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                     Hindi
//                                 </button>
//                                 <button onClick={() => changeLanguage('te')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                     Telugu
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* 🛒 Cart (Hide for Admin if you want) */}
//                     {!isAdmin && (
//                         <button
//                             onClick={onCartClick}
//                             className="relative p-2 text-gray-500 hover:text-primary"
//                         >
//                             <ShoppingBag size={20} />
//                             {cartCount > 0 && (
//                                 <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
//                                     {cartCount}
//                                 </span>
//                             )}
//                         </button>
//                     )}

//                     <div className="h-6 w-px bg-gray-200"></div>

//                     {/* Logout */}
//                     <button
//                         onClick={handleLogout}
//                         className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors flex items-center gap-1"
//                     >
//                         {t('logout')} <LogOut size={14} />
//                     </button>
//                 </div>

//                 {/* ================= MOBILE MENU ================= */}
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="md:hidden p-2 text-gray-600"
//                 >
//                     {isOpen ? <X /> : <Menu />}
//                 </button>
//             </div>
//         </nav>
//     );
// }













// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, ShoppingBag, Sprout, LogOut, Globe } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';

// export default function Navbar({ cartCount, onCartClick }) {

//     const [isOpen, setIsOpen] = useState(false);
//     const { t, i18n } = useTranslation();
//     const location = useLocation();

//     const token = Cookies.get('token');
//     const user = Cookies.get('user')
//         ? JSON.parse(Cookies.get('user'))
//         : null;

//     const isAdmin = user?.role === "admin";

//     // ================= ROLE BASED LINKS =================
//     const userLinks = [
//         { name: t('nav_dashboard'), path: '/dashboard' },
//         { name: t('nav_crop'), path: '/crop-recommend' },
//         { name: t('nav_yield'), path: '/yield-predict' },
//         { name: t('nav_disease'), path: '/disease-detect' },
//         { name: t('nav_store'), path: '/store' }
//     ];

//     const adminLinks = [
//         { name: "Admin Dashboard", path: '/admin-dashboard' },
//         { name: "Admin Orders", path: '/admin-orders' },
//         { name: "Admin Products", path: '/admin-products' }
//     ];

//     const links = isAdmin ? adminLinks : userLinks;

//     const handleLogout = () => {
//         Cookies.remove('token');
//         Cookies.remove('user');
//         window.location.href = '/login';
//     };

//     const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//     };

//     if (!token) return null;

//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
//             <div className="max-w-7xl mx-auto flex justify-between items-center">

//                 {/* ================= LOGO ================= */}
//                 <Link
//                     to={isAdmin ? "/admin-dashboard" : "/dashboard"}
//                     className="flex items-center gap-2 text-primary-dark hover:scale-105 transition-transform"
//                 >
//                     <div className="p-2 bg-primary/10 rounded-lg text-primary">
//                         <Sprout size={24} strokeWidth={2.5} />
//                     </div>
//                     <span className="text-xl font-bold tracking-tight">
//                         FarmXpert
//                     </span>
//                 </Link>

//                 {/* ================= DESKTOP LINKS ================= */}
//                 <div className="hidden md:flex items-center gap-8">
//                     {links.map((link) => (
//                         <Link
//                             key={link.path}
//                             to={link.path}
//                             className={`text-sm font-medium transition-colors hover:text-primary ${
//                                 location.pathname === link.path
//                                     ? 'text-primary'
//                                     : 'text-gray-600'
//                             }`}
//                         >
//                             {link.name}
//                             {location.pathname === link.path && (
//                                 <motion.div
//                                     layoutId="underline"
//                                     className="h-1 w-full bg-primary rounded-full mt-1"
//                                 />
//                             )}
//                         </Link>
//                     ))}
//                 </div>

//                 {/* ================= RIGHT SECTION ================= */}
//                 <div className="hidden md:flex items-center gap-4">

//                     {/* 🌍 Language Switcher */}
//                     {!isAdmin && (
//                         <div className="relative group">
//                             <button className="p-2 text-gray-500 hover:text-primary transition-colors">
//                                 <Globe size={20} />
//                             </button>

//                             <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block z-50">
//                                 <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
//                                     <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                         English
//                                     </button>
//                                     <button onClick={() => changeLanguage('hi')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                         Hindi
//                                     </button>
//                                     <button onClick={() => changeLanguage('te')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                         Telugu
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* 🛒 Cart – Only for Users */}
//                     {!isAdmin && (
//                         <button
//                             onClick={onCartClick}
//                             className="relative p-2 text-gray-500 hover:text-primary"
//                         >
//                             <ShoppingBag size={20} />
//                             {cartCount > 0 && (
//                                 <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
//                                     {cartCount}
//                                 </span>
//                             )}
//                         </button>
//                     )}

//                     <div className="h-6 w-px bg-gray-200"></div>

//                     {/* Logout */}
//                     <button
//                         onClick={handleLogout}
//                         className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors flex items-center gap-1"
//                     >
//                         {t('logout')} <LogOut size={14} />
//                     </button>
//                 </div>

//                 {/* ================= MOBILE MENU ================= */}
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="md:hidden p-2 text-gray-600"
//                 >
//                     {isOpen ? <X /> : <Menu />}
//                 </button>
//             </div>
//         </nav>
//     );
// }









// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, ShoppingBag, Sprout, LogOut, Globe } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';

// export default function Navbar({ cartCount, onCartClick }) {

//     const [isOpen, setIsOpen] = useState(false);
//     const { t, i18n } = useTranslation();
//     const location = useLocation();

//     const token = Cookies.get('token');
//     const user = Cookies.get('user')
//         ? JSON.parse(Cookies.get('user'))
//         : null;

//     const isAdmin = user?.role === "admin";

//     // ⭐ Force English for Admin
//     useEffect(() => {
//         if (isAdmin) {
//             i18n.changeLanguage("en");
//         }
//     }, [isAdmin, i18n]);

//     // ================= ROLE BASED LINKS =================
//     const userLinks = [
//         { name: t('nav_dashboard'), path: '/dashboard' },
//         { name: t('nav_crop'), path: '/crop-recommend' },
//         { name: t('nav_yield'), path: '/yield-predict' },
//         { name: t('nav_disease'), path: '/disease-detect' },
//         { name: t('nav_store'), path: '/store' }
//     ];

//     const adminLinks = [
//         { name: "Admin Dashboard", path: '/admin-dashboard' },
//         { name: "Admin Orders", path: '/admin-orders' },
//         { name: "Admin Products", path: '/admin-products' }
//     ];

//     const links = isAdmin ? adminLinks : userLinks;

//     const handleLogout = () => {
//         Cookies.remove('token');
//         Cookies.remove('user');
//         window.location.href = '/login';
//     };

//     const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//     };

//     if (!token) return null;

//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
//             <div className="max-w-7xl mx-auto flex justify-between items-center">

//                 {/* ================= LOGO ================= */}
//                 <Link
//                     to={isAdmin ? "/admin-dashboard" : "/dashboard"}
//                     className="flex items-center gap-2 text-primary-dark hover:scale-105 transition-transform"
//                 >
//                     <div className="p-2 bg-primary/10 rounded-lg text-primary">
//                         <Sprout size={24} strokeWidth={2.5} />
//                     </div>
//                     <span className="text-xl font-bold tracking-tight">
//                         FarmXpert
//                     </span>
//                 </Link>

//                 {/* ================= DESKTOP LINKS ================= */}
//                 <div className="hidden md:flex items-center gap-8">
//                     {links.map((link) => (
//                         <Link
//                             key={link.path}
//                             to={link.path}
//                             className={`text-sm font-medium transition-colors hover:text-primary ${
//                                 location.pathname === link.path
//                                     ? 'text-primary'
//                                     : 'text-gray-600'
//                             }`}
//                         >
//                             {link.name}
//                             {location.pathname === link.path && (
//                                 <motion.div
//                                     layoutId="underline"
//                                     className="h-1 w-full bg-primary rounded-full mt-1"
//                                 />
//                             )}
//                         </Link>
//                     ))}
//                 </div>

//                 {/* ================= RIGHT SECTION ================= */}
//                 <div className="hidden md:flex items-center gap-4">

//                     {/* 🌍 Language Switcher – Only for Users */}
//                     {!isAdmin && (
//                         <div className="relative group">
//                             <button className="p-2 text-gray-500 hover:text-primary transition-colors">
//                                 <Globe size={20} />
//                             </button>

//                             <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block z-50">
//                                 <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
//                                     <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                         English
//                                     </button>
//                                     <button onClick={() => changeLanguage('hi')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                         Hindi
//                                     </button>
//                                     <button onClick={() => changeLanguage('te')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
//                                         Telugu
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* 🛒 Cart – Only for Users */}
//                     {!isAdmin && (
//                         <button
//                             onClick={onCartClick}
//                             className="relative p-2 text-gray-500 hover:text-primary"
//                         >
//                             <ShoppingBag size={20} />
//                             {cartCount > 0 && (
//                                 <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
//                                     {cartCount}
//                                 </span>
//                             )}
//                         </button>
//                     )}

//                     <div className="h-6 w-px bg-gray-200"></div>

//                     {/* Logout */}
//                     <button
//                         onClick={handleLogout}
//                         className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors flex items-center gap-1"
//                     >
//                         {t('logout')} <LogOut size={14} />
//                     </button>
//                 </div>

//                 {/* ================= MOBILE MENU ================= */}
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="md:hidden p-2 text-gray-600"
//                 >
//                     {isOpen ? <X /> : <Menu />}
//                 </button>
//             </div>
//         </nav>
//     );
// }















// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, ShoppingBag, Sprout, LogOut, Globe } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';

// export default function Navbar({ cartCount, onCartClick }) {

//     const [isOpen, setIsOpen] = useState(false);
//     const { t, i18n } = useTranslation();
//     const location = useLocation();

//     const token = Cookies.get('token');

//     const user = Cookies.get('user')
//         ? JSON.parse(Cookies.get('user'))
//         : null;

//     const isAdmin = user?.role === "admin";

//     // Force English for admin
//     useEffect(() => {
//         if (isAdmin) {
//             i18n.changeLanguage("en");
//         }
//     }, [isAdmin, i18n]);

//     // ================= ROLE LINKS =================

//     const userLinks = [
//         { name: t('nav_dashboard'), path: '/dashboard' },
//         { name: t('nav_crop'), path: '/crop-recommend' },
//         { name: t('nav_yield'), path: '/yield-predict' },
//         { name: t('nav_disease'), path: '/disease-detect' },
//         { name: t('nav_store'), path: '/store' }
//     ];

//     const adminLinks = [
//         { name: "Admin Dashboard", path: '/admin-dashboard' },
//         { name: "Admin Orders", path: '/admin-orders' },
//         { name: "Admin Products", path: '/admin-products' }
//     ];

//     const links = isAdmin ? adminLinks : userLinks;

//     const handleLogout = () => {
//         Cookies.remove('token');
//         Cookies.remove('user');
//         window.location.href = '/login';
//     };

//     const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//     };

//     if (!token) return null;

//     return (

//         <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200 shadow-sm">

//             <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//                 {/* ================= LOGO ================= */}

//                 <Link
//                     to={isAdmin ? "/admin-dashboard" : "/dashboard"}
//                     className="flex items-center gap-3 group"
//                 >

//                     <div className="p-2 rounded-xl bg-green-100 text-green-600 group-hover:scale-110 transition-transform duration-300">
//                         <Sprout size={24} strokeWidth={2.5} />
//                     </div>

//                     <span className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-green-600 transition">
//                         FarmXpert
//                     </span>

//                 </Link>

//                 {/* ================= NAV LINKS ================= */}

//                 <div className="hidden md:flex items-center gap-8">

//                     {links.map((link) => (

//                         <Link
//                             key={link.path}
//                             to={link.path}
//                             className="relative text-sm font-medium text-gray-600 hover:text-green-600 transition"
//                         >

//                             {link.name}

//                             {location.pathname === link.path && (
//                                 <motion.div
//                                     layoutId="navbar-indicator"
//                                     className="absolute -bottom-2 left-0 right-0 h-[3px] bg-green-600 rounded-full"
//                                 />
//                             )}

//                         </Link>

//                     ))}

//                 </div>


//                 {/* ================= RIGHT SIDE ================= */}

//                 <div className="hidden md:flex items-center gap-5">

//                     {/* LANGUAGE SWITCHER */}

//                     {!isAdmin && (

//                         <div className="relative group">

//                             <button className="p-2 rounded-lg text-gray-500 hover:text-green-600 hover:bg-green-50 transition">
//                                 <Globe size={20} />
//                             </button>

//                             <div className="absolute right-0 top-full pt-2 hidden group-hover:block">

//                                 <motion.div
//                                     initial={{ opacity: 0, y: -5 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     className="bg-white rounded-xl shadow-lg border w-32 overflow-hidden"
//                                 >

//                                     <button
//                                         onClick={() => changeLanguage('en')}
//                                         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                                     >
//                                         English
//                                     </button>

//                                     <button
//                                         onClick={() => changeLanguage('hi')}
//                                         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                                     >
//                                         Hindi
//                                     </button>

//                                     <button
//                                         onClick={() => changeLanguage('te')}
//                                         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                                     >
//                                         Telugu
//                                     </button>

//                                 </motion.div>

//                             </div>

//                         </div>

//                     )}


//                     {/* CART */}

//                     {!isAdmin && (

//                         <button
//                             onClick={onCartClick}
//                             className="relative p-2 rounded-lg text-gray-500 hover:text-green-600 hover:bg-green-50 transition"
//                         >

//                             <ShoppingBag size={20} />

//                             {cartCount > 0 && (

//                                 <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">

//                                     {cartCount}

//                                 </span>

//                             )}

//                         </button>

//                     )}

//                     <div className="h-6 w-px bg-gray-200"></div>


//                     {/* LOGOUT */}

//                     <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition"
//                     >

//                         {t('logout')}

//                         <LogOut size={16} />

//                     </button>

//                 </div>


//                 {/* ================= MOBILE MENU BUTTON ================= */}

//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="md:hidden p-2 text-gray-600"
//                 >

//                     {isOpen ? <X /> : <Menu />}

//                 </button>

//             </div>


//             {/* ================= MOBILE MENU ================= */}

//             <AnimatePresence>

//                 {isOpen && (

//                     <motion.div
//                         initial={{ height: 0 }}
//                         animate={{ height: "auto" }}
//                         exit={{ height: 0 }}
//                         className="md:hidden bg-white border-t overflow-hidden"
//                     >

//                         <div className="flex flex-col p-4 gap-4">

//                             {links.map((link) => (

//                                 <Link
//                                     key={link.path}
//                                     to={link.path}
//                                     onClick={() => setIsOpen(false)}
//                                     className="text-gray-700 font-medium hover:text-green-600 transition"
//                                 >

//                                     {link.name}

//                                 </Link>

//                             ))}

//                             {!isAdmin && (

//                                 <button
//                                     onClick={onCartClick}
//                                     className="text-left text-gray-700 hover:text-green-600"
//                                 >
//                                     Cart ({cartCount})
//                                 </button>

//                             )}

//                             <button
//                                 onClick={handleLogout}
//                                 className="text-left text-red-500"
//                             >

//                                 {t('logout')}

//                             </button>

//                         </div>

//                     </motion.div>

//                 )}

//             </AnimatePresence>

//         </nav>

//     );
// }














// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, ShoppingBag, Sprout, LogOut, Globe } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';
// import { Play } from "lucide-react";
// import { useDemo } from "../context/DemoContext";
// export default function Navbar({ cartCount, onCartClick }) {

//     const [isOpen, setIsOpen] = useState(false);
//     const { t, i18n } = useTranslation();
//     const location = useLocation();
// const { startDemo } = useDemo();
//     const token = Cookies.get('token');

//     const user = Cookies.get('user')
//         ? JSON.parse(Cookies.get('user'))
//         : null;

//     const isAdmin = user?.role === "admin";

//     // Force English for admin
//     useEffect(() => {
//         if (isAdmin) {
//             i18n.changeLanguage("en");
//         }
//     }, [isAdmin, i18n]);

//     // ================= IRRIGATION LINK FUNCTION =================

//     const openIrrigationDashboard = () => {
//         window.open(
//             "https://blynk.cloud/dashboard/655373/global/devices/1/organization/655373/devices/2030309/dashboard",
//             "_blank"
//         );
//     };

//     // ================= ROLE LINKS =================

//     const userLinks = [
//         { name: t('nav_dashboard'), path: '/dashboard' },
//         { name: t('nav_crop'), path: '/crop-recommend' },
//         { name: t('nav_yield'), path: '/yield-predict' },
//         { name: t('nav_disease'), path: '/disease-detect' },
//         { name: t('nav_irrigation'), path: 'irrigation' },
//         { name: t('nav_store'), path: '/store' }
//     ];

//     const adminLinks = [
//         { name: "Admin Dashboard", path: '/admin-dashboard' },
//         { name: "Admin Orders", path: '/admin-orders' },
//         { name: "Admin Products", path: '/admin-products' }
//     ];

//     const links = isAdmin ? adminLinks : userLinks;

//     const handleLogout = () => {
//         Cookies.remove('token');
//         Cookies.remove('user');
//         window.location.href = '/login';
//     };

//     const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//     };

//     if (!token) return null;

//     return (

//         <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200 shadow-sm">

//             <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//                 {/* ================= LOGO ================= */}

//                 <Link
//                     to={isAdmin ? "/admin-dashboard" : "/dashboard"}
//                     className="flex items-center gap-3 group"
//                 >

//                     <div className="p-2 rounded-xl bg-green-100 text-green-600 group-hover:scale-110 transition-transform duration-300">
//                         <Sprout size={24} strokeWidth={2.5} />
//                     </div>

//                     <span className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-green-600 transition">
//                         FarmXpert
//                     </span>

//                 </Link>

//                 {/* ================= NAV LINKS ================= */}

//                 <div className="hidden md:flex items-center gap-8">

//                     {links.map((link) => (

//                         link.path === "irrigation" ? (

//                             <button
//                                 key="irrigation"
//                                 onClick={openIrrigationDashboard}
//                                 className="relative text-sm font-medium text-gray-600 hover:text-green-600 transition"
//                             >
//                                 {link.name}
//                             </button>

//                         ) : (

//                             <Link
//                                 key={link.path}
//                                 to={link.path}
//                                 className="relative text-sm font-medium text-gray-600 hover:text-green-600 transition"
//                             >

//                                 {link.name}

//                                 {location.pathname === link.path && (
//                                     <motion.div
//                                         layoutId="navbar-indicator"
//                                         className="absolute -bottom-2 left-0 right-0 h-[3px] bg-green-600 rounded-full"
//                                     />
//                                 )}

//                             </Link>

//                         )

//                     ))}

//                 </div>


//                 {/* ================= RIGHT SIDE ================= */}

//                 <div className="hidden md:flex items-center gap-5">

//                     {/* LANGUAGE SWITCHER */}

// {/* GUIDED TOUR BUTTON */}

// {!isAdmin && (

//     <button
//         onClick={startDemo}
//         className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
//     >
//         <Play size={16} fill="white" />
//         Guided Tour
//     </button>

// )}
//                     {!isAdmin && (

//                         <div className="relative group">

//                             <button className="p-2 rounded-lg text-gray-500 hover:text-green-600 hover:bg-green-50 transition">
//                                 <Globe size={20} />
//                             </button>

//                             <div className="absolute right-0 top-full pt-2 hidden group-hover:block">

//                                 <motion.div
//                                     initial={{ opacity: 0, y: -5 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     className="bg-white rounded-xl shadow-lg border w-32 overflow-hidden"
//                                 >

//                                     <button
//                                         onClick={() => changeLanguage('en')}
//                                         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                                     >
//                                         English
//                                     </button>

//                                     <button
//                                         onClick={() => changeLanguage('hi')}
//                                         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                                     >
//                                         Hindi
//                                     </button>

//                                     <button
//                                         onClick={() => changeLanguage('te')}
//                                         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                                     >
//                                         Telugu
//                                     </button>

//                                 </motion.div>

//                             </div>

//                         </div>

//                     )}


//                     {/* CART */}

//                     {!isAdmin && (

//                         <button
//                             onClick={onCartClick}
//                             className="relative p-2 rounded-lg text-gray-500 hover:text-green-600 hover:bg-green-50 transition"
//                         >

//                             <ShoppingBag size={20} />

//                             {cartCount > 0 && (

//                                 <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">

//                                     {cartCount}

//                                 </span>

//                             )}

//                         </button>

//                     )}

//                     <div className="h-6 w-px bg-gray-200"></div>


//                     {/* LOGOUT */}

//                     <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition"
//                     >

//                         {t('logout')}

//                         <LogOut size={16} />

//                     </button>

//                 </div>


//                 {/* ================= MOBILE MENU BUTTON ================= */}

//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="md:hidden p-2 text-gray-600"
//                 >

//                     {isOpen ? <X /> : <Menu />}

//                 </button>

//             </div>


//             {/* ================= MOBILE MENU ================= */}

//             <AnimatePresence>

//                 {isOpen && (

//                     <motion.div
//                         initial={{ height: 0 }}
//                         animate={{ height: "auto" }}
//                         exit={{ height: 0 }}
//                         className="md:hidden bg-white border-t overflow-hidden"
//                     >

//                         <div className="flex flex-col p-4 gap-4">

//                             {links.map((link) => (

//                                 link.path === "irrigation" ? (

//                                     <button
//                                         key="irrigation-mobile"
//                                         onClick={() => {
//                                             openIrrigationDashboard();
//                                             setIsOpen(false);
//                                         }}
//                                         className="text-left text-gray-700 font-medium hover:text-green-600 transition"
//                                     >
//                                         {link.name}
//                                     </button>

//                                 ) : (

//                                     <Link
//                                         key={link.path}
//                                         to={link.path}
//                                         onClick={() => setIsOpen(false)}
//                                         className="text-gray-700 font-medium hover:text-green-600 transition"
//                                     >

//                                         {link.name}

//                                     </Link>

//                                 )

//                             ))}

//                             {!isAdmin && (

//                                 <button
//                                     onClick={onCartClick}
//                                     className="text-left text-gray-700 hover:text-green-600"
//                                 >
//                                     Cart ({cartCount})
//                                 </button>

//                             )}

//                             <button
//                                 onClick={handleLogout}
//                                 className="text-left text-red-500"
//                             >

//                                 {t('logout')}

//                             </button>

//                         </div>

//                     </motion.div>

//                 )}

//             </AnimatePresence>

//         </nav>

//     );
// }




// import { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//     Menu,
//     X,
//     ShoppingBag,
//     Sprout,
//     LogOut,
//     Globe,
//     User,
//     ChevronDown
// } from "lucide-react";
// import { motion, AnimatePresence } from 'framer-motion';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';
// import { Play } from "lucide-react";
// import { useDemo } from "../context/DemoContext";
// import api from "../api";

// export default function Navbar({ cartCount, onCartClick }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [profileOpen, setProfileOpen] = useState(false);
//     const profileRef = useRef(null);
//     const { t, i18n } = useTranslation();
//     const location = useLocation();
//     const { startDemo } = useDemo();
//     const token = Cookies.get('token');

//     const user = Cookies.get('user')
//         ? JSON.parse(Cookies.get('user'))
//         : null;

//     const isAdmin = user?.role === "admin";
//     const [farmerProfile, setFarmerProfile] = useState(null);



//     useEffect(() => {

//     setProfileOpen(false);

// }, [location.pathname]);
// useEffect(() => {

//     const loadProfile = async () => {

//         if (isAdmin) return;

//         try {

//             const res = await api.get("/farmer");

//             if (res.data.exists) {

//                 setFarmerProfile(res.data.profile);

//             }

//         }

//         catch (err) {

//             console.log(err);

//         }

//     };

//     loadProfile();

// }, [isAdmin]);

//     // Force English for admin
//     useEffect(() => {
//         if (isAdmin) {
//             i18n.changeLanguage("en");
//         }
//     }, [isAdmin, i18n]);



//     useEffect(() => {

//     const handleClickOutside = (event) => {

//         if (
//             profileRef.current &&
//             !profileRef.current.contains(event.target)
//         ) {
//             setProfileOpen(false);
//         }

//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {

//         document.removeEventListener("mousedown", handleClickOutside);

//     };

// }, []);

//     // ================= ROLE LINKS =================

//     const userLinks = [
//     { name: t("nav_dashboard"), path: "/dashboard" },
//     { name: t("nav_crop"), path: "/crop-recommend" },
//     { name: t("nav_yield"), path: "/yield-predict" },
//     { name: t("nav_disease"), path: "/disease-detect" },
//     { name: t("nav_store"), path: "/store" }
// ];
//     const adminLinks = [
//         { name: "Admin Dashboard", path: '/admin-dashboard' },
//         { name: "Admin Orders", path: '/admin-orders' },
//         { name: "Admin Products", path: '/admin-products' }
//     ];

//     const links = isAdmin ? adminLinks : userLinks;

//     const handleLogout = () => {
//         Cookies.remove('token');
//         Cookies.remove('user');
//         window.location.href = '/login';
//     };

//    const changeLanguage = async (lng) => {
//     try {
//         // Change language immediately in the UI
//         await i18n.changeLanguage(lng);

//         // Save the selected language in the database
//         await api.post("/farmer/language", {
//             language: lng,
//         });

//         // Update local profile state so Navbar reflects the new language
//         setFarmerProfile((prev) => ({
//             ...prev,
//             language: lng,
//         }));
//     } catch (err) {
//         console.error("Language update failed:", err);
//     }
// };

//     if (!token) return null;

//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200 shadow-sm">
//            <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">

//                 {/* ================= LOGO ================= */}
//                <Link
//     to={isAdmin ? "/admin-dashboard" : "/dashboard"}
//     className="flex items-center gap-4 shrink-0"
// >
//     <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">

//     <Sprout
//         size={24}
//         className="text-green-600"
//     />

// </div>

// <span className="text-3xl font-bold tracking-tight text-gray-800">

//     Farm<span className="text-green-600">Xpert</span>

// </span>
//                 </Link>

//                 {/* ================= NAV LINKS ================= */}
//                 <div className="hidden lg:flex items-center gap-10 ml-12">
//                     {links.map((link) => (
//                         <Link
//                             key={link.path}
//                             to={link.path}
//                             className="relative text-[15px] font-semibold text-gray-600 hover:text-green-600 transition-all"
//                         >
//                             {link.name}
//                             {location.pathname === link.path && (
//                                 <motion.div
//                                     layoutId="navbar-indicator"
//                                     className="absolute -bottom-2 left-0 right-0 h-[3px] bg-green-600 rounded-full"
//                                 />
//                             )}
//                         </Link>
//                     ))}
//                 </div>

//                 {/* ================= RIGHT SIDE ================= */}
//                 <div className="hidden lg:flex items-center gap-4">

//                     {/* GUIDED TOUR BUTTON */}
//                     {!isAdmin && (
//                         <button
//                             onClick={startDemo}
//                             className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
//                         >
//                             <Play size={16} fill="white" />
//                             Guided Tour
//                         </button>
//                     )}

//                     {/* LANGUAGE SWITCHER */}
//                     {!isAdmin && (
//                         <div className="relative group">
//                             <button className="p-2 rounded-lg text-gray-500 hover:text-green-600 hover:bg-green-50 transition">
//                                 <Globe size={20} />
//                             </button>
//                             <div className="absolute right-0 top-full pt-2 hidden group-hover:block">
//                                 <motion.div
//                                     initial={{ opacity: 0, y: -5 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     className="bg-white rounded-xl shadow-lg border w-32 overflow-hidden"
//                                 >
//                                     <button
//                                         onClick={() => changeLanguage('en')}
//                                         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                                     >
//                                         English
//                                     </button>
//                                     <button
//                                         onClick={() => changeLanguage('hi')}
//                                         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                                     >
//                                         Hindi
//                                     </button>
//                                     <button
//                                         onClick={() => changeLanguage('te')}
//                                         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                                     >
//                                         Telugu
//                                     </button>
//                                 </motion.div>
//                             </div>
//                         </div>
//                     )}

//                     {/* CART */}
//                     {!isAdmin && (
//                         <button
//                             onClick={onCartClick}
//                             className="relative p-2 rounded-lg text-gray-500 hover:text-green-600 hover:bg-green-50 transition"
//                         >
//                             <ShoppingBag size={20} />
//                             {cartCount > 0 && (
//                                 <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
//                                     {cartCount}
//                                 </span>
//                             )}
//                         </button>
//                     )}

//                     {/* <div className="h-6 w-px bg-gray-200"></div>

                    
//                     <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition"
//                     >
//                         {t('logout')}
//                         <LogOut size={16} />
//                     </button> */}



//                     <div className="h-6 w-px bg-gray-200"></div>

// {/* PROFILE */}

// {!isAdmin && (

// <div className="relative" ref={profileRef}>

// {/* <button

// onClick={()=>setProfileOpen(!profileOpen)}

// className="flex items-center gap-3 hover:bg-green-50 rounded-xl px-3 py-2 transition"

// > */}



// <button
//     onClick={() => setProfileOpen(prev => !prev)}
//     className="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-green-50 transition"
// >

// <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">

// {

// farmerProfile?.fullName

// ?

// farmerProfile.fullName.charAt(0).toUpperCase()

// :

// <User size={18}/>

// }

// </div>

// <div className="hidden xl:block text-left">

// <p className="text-sm font-semibold text-gray-800">

// {

// farmerProfile?.fullName ||

// user?.name

// }

// </p>

// <p className="text-xs text-gray-500">
//     {t("farmer")}
// </p>

// </div>

// <ChevronDown size={16}/>

// </button>

// {

// profileOpen && (

// <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">

// <div className="p-5 border-b bg-gradient-to-r from-green-600 to-emerald-500 text-white">

// <p className="font-bold text-lg">

// {

// farmerProfile?.fullName ||

// user?.name

// }

// </p>

// <p className="text-sm opacity-90">

// {
//     farmerProfile?.farmName ||
//     t("my_farm")
// }

// </p>

// </div>

// <Link
//     to="/profile"
//     className="block px-5 py-3 hover:bg-gray-50 transition"
// >
//     👤 {t("my_profile")}
// </Link>

// <Link

// to="/dashboard"

// className="block px-5 py-3 hover:bg-gray-50 transition"

// >

// 🏡 {t("nav_dashboard")}

// </Link>

// <button

// onClick={handleLogout}

// className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-50"

// >

// {t("logout")}

// </button>

// </div>

// )

// }

// </div>

// )}

// {isAdmin && (

// <button
//     onClick={handleLogout}
//     className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition"
// >
//     {t("logout")}
//     <LogOut size={16}/>
// </button>

// )}
//                 </div>

//                 {/* ================= MOBILE MENU BUTTON ================= */}
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="md:hidden p-2 text-gray-600"
//                 >
//                     {isOpen ? <X /> : <Menu />}
//                 </button>
//             </div>

//             {/* ================= MOBILE MENU ================= */}
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ height: 0 }}
//                         animate={{ height: "auto" }}
//                         exit={{ height: 0 }}
//                         className="md:hidden bg-white border-t overflow-hidden"
//                     >
//                         <div className="flex flex-col p-4 gap-4">
//                             {links.map((link) => (
//                                 <Link
//                                     key={link.path}
//                                     to={link.path}
//                                     onClick={() => setIsOpen(false)}
//                                     className="text-gray-700 font-medium hover:text-green-600 transition"
//                                 >
//                                     {link.name}
//                                 </Link>
//                             ))}

//                             {!isAdmin && (
//                                 <button
//                                     onClick={onCartClick}
//                                     className="text-left text-gray-700 hover:text-green-600"
//                                 >
//                                     Cart ({cartCount})
//                                 </button>
//                             )}

//                             <button
//                                 onClick={handleLogout}
//                                 className="text-left text-red-500"
//                             >
//                                 {t('logout')}
//                             </button>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </nav>
//     );
// }













// import { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//     Menu,
//     X,
//     ShoppingBag,
//     Sprout,
//     LogOut,
//     Globe,
//     User,
//     ChevronDown
// } from "lucide-react";
// import { motion, AnimatePresence } from 'framer-motion';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';
// import { Play } from "lucide-react";
// import { useDemo } from "../context/DemoContext";
// import api from "../api";

// export default function Navbar({ cartCount, onCartClick }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [profileOpen, setProfileOpen] = useState(false);
//     const profileRef = useRef(null);
//     const { t, i18n } = useTranslation();
//     const location = useLocation();
//     const { startDemo } = useDemo();
//     const token = Cookies.get('token');

//     const user = Cookies.get('user')
//         ? JSON.parse(Cookies.get('user'))
//         : null;

//     const isAdmin = user?.role === "admin";
//     const [farmerProfile, setFarmerProfile] = useState(null);

//     useEffect(() => {
//         setProfileOpen(false);
//     }, [location.pathname]);

//     useEffect(() => {
//         const loadProfile = async () => {
//             if (isAdmin) return;
//             try {
//                 const res = await api.get("/farmer");
//                 if (res.data.exists) {
//                     setFarmerProfile(res.data.profile);
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         };
//         loadProfile();
//     }, [isAdmin]);

//     // Force English for admin
//     useEffect(() => {
//         if (isAdmin) {
//             i18n.changeLanguage("en");
//         }
//     }, [isAdmin, i18n]);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 profileRef.current &&
//                 !profileRef.current.contains(event.target)
//             ) {
//                 setProfileOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     // ================= ROLE LINKS =================
//     const userLinks = [
//         { name: t("nav_dashboard"), path: "/dashboard" },
//         { name: t("nav_crop"), path: "/crop-recommend" },
//         { name: t("nav_yield"), path: "/yield-predict" },
//         { name: t("nav_disease"), path: "/disease-detect" },
//         { name: t("nav_store"), path: "/store" }
//     ];
//     const adminLinks = [
//         { name: "Admin Dashboard", path: '/admin-dashboard' },
//         { name: "Admin Orders", path: '/admin-orders' },
//         { name: "Admin Products", path: '/admin-products' }
//     ];

//     const links = isAdmin ? adminLinks : userLinks;

//     const handleLogout = () => {
//         Cookies.remove('token');
//         Cookies.remove('user');
//         window.location.href = '/login';
//     };

//     const changeLanguage = async (lng) => {
//         try {
//             await i18n.changeLanguage(lng);
//             await api.post("/farmer/language", {
//                 language: lng,
//             });
//             setFarmerProfile((prev) => ({
//                 ...prev,
//                 language: lng,
//             }));
//         } catch (err) {
//             console.error("Language update failed:", err);
//         }
//     };

//     if (!token) return null;

//     return (
//         <>
//             <nav className="navbar">
//                 <div className="navbar-container">
//                     {/* ================= LOGO ================= */}
//                     <Link
//                         to={isAdmin ? "/admin-dashboard" : "/dashboard"}
//                         className="navbar-logo"
//                     >
//                         <div className="navbar-logo-icon">
//                             <Sprout size={24} className="navbar-logo-sprout" />
//                         </div>
//                         <span className="navbar-logo-text">
//                             Farm<span className="navbar-logo-highlight">Xpert</span>
//                         </span>
//                     </Link>

//                     {/* ================= NAV LINKS ================= */}
//                     <div className="navbar-links">
//                         {links.map((link) => (
//                             <Link
//                                 key={link.path}
//                                 to={link.path}
//                                 className="navbar-link"
//                             >
//                                 {link.name}
//                                 {location.pathname === link.path && (
//                                     <motion.div
//                                         layoutId="navbar-indicator"
//                                         className="navbar-indicator"
//                                     />
//                                 )}
//                             </Link>
//                         ))}
//                     </div>

//                     {/* ================= RIGHT SIDE ================= */}
//                     <div className="navbar-right">
//                         {/* GUIDED TOUR BUTTON */}
//                         {!isAdmin && (
//                             <button
//                                 onClick={startDemo}
//                                 className="navbar-tour-btn"
//                             >
//                                 <Play size={16} fill="white" />
//                                 Guided Tour
//                             </button>
//                         )}

//                         {/* LANGUAGE SWITCHER */}
//                         {!isAdmin && (
//                             <div className="navbar-language-wrapper">
//                                 <button className="navbar-language-btn">
//                                     <Globe size={20} />
//                                 </button>
//                                 <div className="navbar-language-dropdown">
//                                     <motion.div
//                                         initial={{ opacity: 0, y: -5 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         className="navbar-language-menu"
//                                     >
//                                         <button
//                                             onClick={() => changeLanguage('en')}
//                                             className="navbar-language-option"
//                                         >
//                                             English
//                                         </button>
//                                         <button
//                                             onClick={() => changeLanguage('hi')}
//                                             className="navbar-language-option"
//                                         >
//                                             Hindi
//                                         </button>
//                                         <button
//                                             onClick={() => changeLanguage('te')}
//                                             className="navbar-language-option"
//                                         >
//                                             Telugu
//                                         </button>
//                                     </motion.div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* CART */}
//                         {!isAdmin && (
//                             <button
//                                 onClick={onCartClick}
//                                 className="navbar-cart-btn"
//                             >
//                                 <ShoppingBag size={20} />
//                                 {cartCount > 0 && (
//                                     <span className="navbar-cart-badge">
//                                         {cartCount}
//                                     </span>
//                                 )}
//                             </button>
//                         )}

//                         <div className="navbar-divider"></div>

//                         {/* PROFILE */}
//                         {!isAdmin && (
//                             <div className="navbar-profile-wrapper" ref={profileRef}>
//                                 <button
//                                     onClick={() => setProfileOpen(prev => !prev)}
//                                     className="navbar-profile-btn"
//                                 >
//                                     <div className="navbar-profile-avatar">
//                                         {farmerProfile?.fullName
//                                             ? farmerProfile.fullName.charAt(0).toUpperCase()
//                                             : <User size={18} />
//                                         }
//                                     </div>
//                                     <div className="navbar-profile-info">
//                                         <p className="navbar-profile-name">
//                                             {farmerProfile?.fullName || user?.name}
//                                         </p>
//                                         <p className="navbar-profile-role">
//                                             {t("farmer")}
//                                         </p>
//                                     </div>
//                                     <ChevronDown size={16} className="navbar-profile-chevron" />
//                                 </button>

//                                 {profileOpen && (
//                                     <div className="navbar-profile-dropdown">
//                                         <div className="navbar-profile-header">
//                                             <p className="navbar-profile-header-name">
//                                                 {farmerProfile?.fullName || user?.name}
//                                             </p>
//                                             <p className="navbar-profile-header-farm">
//                                                 {farmerProfile?.farmName || t("my_farm")}
//                                             </p>
//                                         </div>
//                                         <Link
//                                             to="/profile"
//                                             className="navbar-profile-item"
//                                         >
//                                             👤 {t("my_profile")}
//                                         </Link>
//                                         <Link
//                                             to="/dashboard"
//                                             className="navbar-profile-item"
//                                         >
//                                             🏡 {t("nav_dashboard")}
//                                         </Link>
//                                         <button
//                                             onClick={handleLogout}
//                                             className="navbar-profile-logout"
//                                         >
//                                             {t("logout")}
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         {isAdmin && (
//                             <button
//                                 onClick={handleLogout}
//                                 className="navbar-admin-logout"
//                             >
//                                 {t("logout")}
//                                 <LogOut size={16} />
//                             </button>
//                         )}
//                     </div>

//                     {/* ================= MOBILE MENU BUTTON ================= */}
//                     <button
//                         onClick={() => setIsOpen(!isOpen)}
//                         className="navbar-mobile-btn"
//                     >
//                         {isOpen ? <X /> : <Menu />}
//                     </button>
//                 </div>

//                 {/* ================= MOBILE MENU ================= */}
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.div
//                             initial={{ height: 0 }}
//                             animate={{ height: "auto" }}
//                             exit={{ height: 0 }}
//                             className="navbar-mobile-menu"
//                         >
//                             <div className="navbar-mobile-content">
//                                 {links.map((link) => (
//                                     <Link
//                                         key={link.path}
//                                         to={link.path}
//                                         onClick={() => setIsOpen(false)}
//                                         className="navbar-mobile-link"
//                                     >
//                                         {link.name}
//                                     </Link>
//                                 ))}

//                                 {!isAdmin && (
//                                     <button
//                                         onClick={onCartClick}
//                                         className="navbar-mobile-cart"
//                                     >
//                                         Cart ({cartCount})
//                                     </button>
//                                 )}

//                                 <button
//                                     onClick={handleLogout}
//                                     className="navbar-mobile-logout"
//                                 >
//                                     {t('logout')}
//                                 </button>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </nav>

//             <style>{`
//                 /* ===== NAVBAR ===== */
//                 .navbar {
//                     position: fixed;
//                     top: 0;
//                     left: 0;
//                     right: 0;
//                     z-index: 50;
//                     background: rgba(255, 255, 255, 0.85);
//                     backdrop-filter: blur(20px);
//                     -webkit-backdrop-filter: blur(20px);
//                     border-bottom: 1px solid rgba(34, 197, 94, 0.1);
//                     box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
//                 }

//                 /* Dark mode support */
//                 @media (prefers-color-scheme: dark) {
//                     .navbar {
//                         background: rgba(18, 39, 28, 0.85);
//                         border-bottom: 1px solid rgba(233, 255, 226, 0.05);
//                         box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
//                     }
//                 }

//                 .navbar-container {
//                     max-width: 1400px;
//                     margin: 0 auto;
//                     padding: 0 2rem;
//                     height: 5rem;
//                     display: flex;
//                     align-items: center;
//                     justify-content: space-between;
//                 }

//                 /* ===== LOGO ===== */
//                 .navbar-logo {
//                     display: flex;
//                     align-items: center;
//                     gap: 0.75rem;
//                     text-decoration: none;
//                     flex-shrink: 0;
//                 }

//                 .navbar-logo-icon {
//                     width: 3rem;
//                     height: 3rem;
//                     border-radius: 0.75rem;
//                     background: rgba(34, 197, 94, 0.1);
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     border: 1px solid rgba(34, 197, 94, 0.15);
//                     transition: all 0.3s ease;
//                 }

//                 .navbar-logo:hover .navbar-logo-icon {
//                     background: rgba(34, 197, 94, 0.2);
//                     transform: scale(1.05);
//                 }

//                 .navbar-logo-sprout {
//                     color: #22c55e;
//                 }

//                 .navbar-logo-text {
//                     font-size: 1.5rem;
//                     font-weight: 700;
//                     color: #1a1a1a;
//                     font-family: 'Bricolage Grotesque', 'Segoe UI', sans-serif;
//                     letter-spacing: -0.02em;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-logo-text {
//                         color: #f2fbec;
//                     }
//                 }

//                 .navbar-logo-highlight {
//                     background: linear-gradient(135deg, #22c55e, #eab308);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                 }

//                 /* ===== NAV LINKS ===== */
//                 .navbar-links {
//                     display: none;
//                     align-items: center;
//                     gap: 2.5rem;
//                     margin-left: 3rem;
//                 }

//                 @media (min-width: 1024px) {
//                     .navbar-links {
//                         display: flex;
//                     }
//                 }

//                 .navbar-link {
//                     position: relative;
//                     font-size: 0.9375rem;
//                     font-weight: 500;
//                     color: #4b5563;
//                     text-decoration: none;
//                     transition: color 0.3s ease;
//                 }

//                 .navbar-link:hover {
//                     color: #22c55e;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-link {
//                         color: #a9c4b0;
//                     }
//                     .navbar-link:hover {
//                         color: #b6f03c;
//                     }
//                 }

//                 .navbar-indicator {
//                     position: absolute;
//                     bottom: -0.5rem;
//                     left: 0;
//                     right: 0;
//                     height: 3px;
//                     background: linear-gradient(135deg, #22c55e, #eab308);
//                     border-radius: 999px;
//                 }

//                 /* ===== RIGHT SECTION ===== */
//                 .navbar-right {
//                     display: none;
//                     align-items: center;
//                     gap: 1rem;
//                 }

//                 @media (min-width: 1024px) {
//                     .navbar-right {
//                         display: flex;
//                     }
//                 }

//                 /* Guided Tour Button */
//                 .navbar-tour-btn {
//                     display: flex;
//                     align-items: center;
//                     gap: 0.5rem;
//                     padding: 0.5rem 1rem;
//                     border-radius: 0.75rem;
//                     background: linear-gradient(135deg, #22c55e, #16a34a);
//                     color: #ffffff;
//                     font-size: 0.875rem;
//                     font-weight: 600;
//                     border: none;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     box-shadow: 0 2px 10px rgba(34, 197, 94, 0.2);
//                 }

//                 .navbar-tour-btn:hover {
//                     transform: translateY(-2px);
//                     box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
//                 }

//                 /* Language Switcher */
//                 .navbar-language-wrapper {
//                     position: relative;
//                 }

//                 .navbar-language-btn {
//                     padding: 0.5rem;
//                     border-radius: 0.5rem;
//                     color: #4b5563;
//                     background: none;
//                     border: none;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                 }

//                 .navbar-language-btn:hover {
//                     color: #22c55e;
//                     background: rgba(34, 197, 94, 0.08);
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-language-btn {
//                         color: #a9c4b0;
//                     }
//                     .navbar-language-btn:hover {
//                         color: #b6f03c;
//                         background: rgba(182, 240, 60, 0.08);
//                     }
//                 }

//                 .navbar-language-dropdown {
//                     position: absolute;
//                     right: 0;
//                     top: 100%;
//                     padding-top: 0.5rem;
//                     display: none;
//                 }

//                 .navbar-language-wrapper:hover .navbar-language-dropdown {
//                     display: block;
//                 }

//                 .navbar-language-menu {
//                     background: #ffffff;
//                     border: 1px solid rgba(34, 197, 94, 0.1);
//                     border-radius: 0.75rem;
//                     box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
//                     width: 8rem;
//                     overflow: hidden;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-language-menu {
//                         background: rgba(18, 39, 28, 0.95);
//                         border: 1px solid rgba(233, 255, 226, 0.05);
//                         box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
//                     }
//                 }

//                 .navbar-language-option {
//                     width: 100%;
//                     text-align: left;
//                     padding: 0.5rem 1rem;
//                     font-size: 0.875rem;
//                     color: #4b5563;
//                     background: none;
//                     border: none;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                 }

//                 .navbar-language-option:hover {
//                     background: rgba(34, 197, 94, 0.05);
//                     color: #22c55e;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-language-option {
//                         color: #a9c4b0;
//                     }
//                     .navbar-language-option:hover {
//                         background: rgba(182, 240, 60, 0.05);
//                         color: #b6f03c;
//                     }
//                 }

//                 /* Cart Button */
//                 .navbar-cart-btn {
//                     position: relative;
//                     padding: 0.5rem;
//                     border-radius: 0.5rem;
//                     color: #4b5563;
//                     background: none;
//                     border: none;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                 }

//                 .navbar-cart-btn:hover {
//                     color: #22c55e;
//                     background: rgba(34, 197, 94, 0.08);
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-cart-btn {
//                         color: #a9c4b0;
//                     }
//                     .navbar-cart-btn:hover {
//                         color: #b6f03c;
//                         background: rgba(182, 240, 60, 0.08);
//                     }
//                 }

//                 .navbar-cart-badge {
//                     position: absolute;
//                     top: -0.25rem;
//                     right: -0.25rem;
//                     background: linear-gradient(135deg, #22c55e, #16a34a);
//                     color: #ffffff;
//                     font-size: 0.625rem;
//                     padding: 0.125rem 0.5rem;
//                     border-radius: 999px;
//                     font-weight: 700;
//                     animation: pulse-badge 2s ease-in-out infinite;
//                 }

//                 @keyframes pulse-badge {
//                     0%, 100% { transform: scale(1); }
//                     50% { transform: scale(1.1); }
//                 }

//                 .navbar-divider {
//                     width: 1px;
//                     height: 1.5rem;
//                     background: rgba(0, 0, 0, 0.06);
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-divider {
//                         background: rgba(233, 255, 226, 0.05);
//                     }
//                 }

//                 /* Profile */
//                 .navbar-profile-wrapper {
//                     position: relative;
//                 }

//                 .navbar-profile-btn {
//                     display: flex;
//                     align-items: center;
//                     gap: 0.5rem;
//                     padding: 0.25rem 0.5rem;
//                     border-radius: 0.75rem;
//                     background: none;
//                     border: none;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                 }

//                 .navbar-profile-btn:hover {
//                     background: rgba(34, 197, 94, 0.05);
//                 }

//                 .navbar-profile-avatar {
//                     width: 2.5rem;
//                     height: 2.5rem;
//                     border-radius: 50%;
//                     background: linear-gradient(135deg, #22c55e, #16a34a);
//                     color: #ffffff;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     font-weight: 700;
//                     font-size: 0.875rem;
//                 }

//                 .navbar-profile-info {
//                     display: none;
//                     text-align: left;
//                 }

//                 @media (min-width: 1280px) {
//                     .navbar-profile-info {
//                         display: block;
//                     }
//                 }

//                 .navbar-profile-name {
//                     font-size: 0.875rem;
//                     font-weight: 600;
//                     color: #1a1a1a;
//                     margin: 0;
//                 }

//                 .navbar-profile-role {
//                     font-size: 0.75rem;
//                     color: #6b7280;
//                     margin: 0;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-profile-name {
//                         color: #f2fbec;
//                     }
//                     .navbar-profile-role {
//                         color: #a9c4b0;
//                     }
//                 }

//                 .navbar-profile-chevron {
//                     color: #6b7280;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-profile-chevron {
//                         color: #a9c4b0;
//                     }
//                 }

//                 .navbar-profile-dropdown {
//                     position: absolute;
//                     right: 0;
//                     margin-top: 0.75rem;
//                     width: 16rem;
//                     background: #ffffff;
//                     border: 1px solid rgba(34, 197, 94, 0.1);
//                     border-radius: 1rem;
//                     box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
//                     overflow: hidden;
//                     z-index: 50;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-profile-dropdown {
//                         background: rgba(18, 39, 28, 0.95);
//                         border: 1px solid rgba(233, 255, 226, 0.05);
//                         box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
//                     }
//                 }

//                 .navbar-profile-header {
//                     padding: 1.25rem;
//                     background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(234, 179, 8, 0.05));
//                     border-bottom: 1px solid rgba(34, 197, 94, 0.05);
//                 }

//                 .navbar-profile-header-name {
//                     font-weight: 700;
//                     font-size: 1.125rem;
//                     color: #1a1a1a;
//                     margin: 0;
//                 }

//                 .navbar-profile-header-farm {
//                     font-size: 0.875rem;
//                     color: #6b7280;
//                     margin: 0.25rem 0 0;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-profile-header-name {
//                         color: #f2fbec;
//                     }
//                     .navbar-profile-header-farm {
//                         color: #a9c4b0;
//                     }
//                 }

//                 .navbar-profile-item {
//                     display: block;
//                     padding: 0.75rem 1.25rem;
//                     color: #4b5563;
//                     text-decoration: none;
//                     transition: all 0.3s ease;
//                 }

//                 .navbar-profile-item:hover {
//                     background: rgba(34, 197, 94, 0.05);
//                     color: #22c55e;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-profile-item {
//                         color: #a9c4b0;
//                     }
//                     .navbar-profile-item:hover {
//                         background: rgba(182, 240, 60, 0.05);
//                         color: #b6f03c;
//                     }
//                 }

//                 .navbar-profile-logout {
//                     width: 100%;
//                     text-align: left;
//                     padding: 0.75rem 1.25rem;
//                     color: #ef4444;
//                     background: none;
//                     border: none;
//                     border-top: 1px solid rgba(0, 0, 0, 0.05);
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                 }

//                 .navbar-profile-logout:hover {
//                     background: rgba(239, 68, 68, 0.05);
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-profile-logout {
//                         border-top: 1px solid rgba(233, 255, 226, 0.05);
//                     }
//                 }

//                 /* Admin Logout */
//                 .navbar-admin-logout {
//                     display: flex;
//                     align-items: center;
//                     gap: 0.5rem;
//                     font-size: 0.875rem;
//                     font-weight: 500;
//                     color: #4b5563;
//                     background: none;
//                     border: none;
//                     cursor: pointer;
//                     transition: color 0.3s ease;
//                 }

//                 .navbar-admin-logout:hover {
//                     color: #ef4444;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-admin-logout {
//                         color: #a9c4b0;
//                     }
//                 }

//                 /* ===== MOBILE ===== */
//                 .navbar-mobile-btn {
//                     display: flex;
//                     padding: 0.5rem;
//                     color: #4b5563;
//                     background: none;
//                     border: none;
//                     cursor: pointer;
//                 }

//                 @media (min-width: 768px) {
//                     .navbar-mobile-btn {
//                         display: none;
//                     }
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-mobile-btn {
//                         color: #a9c4b0;
//                     }
//                 }

//                 .navbar-mobile-menu {
//                     display: flex;
//                     background: rgba(255, 255, 255, 0.98);
//                     border-top: 1px solid rgba(34, 197, 94, 0.05);
//                     overflow: hidden;
//                 }

//                 @media (min-width: 768px) {
//                     .navbar-mobile-menu {
//                         display: none;
//                     }
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-mobile-menu {
//                         background: rgba(18, 39, 28, 0.98);
//                         border-top: 1px solid rgba(233, 255, 226, 0.05);
//                     }
//                 }

//                 .navbar-mobile-content {
//                     display: flex;
//                     flex-direction: column;
//                     padding: 1rem;
//                     gap: 1rem;
//                     width: 100%;
//                 }

//                 .navbar-mobile-link {
//                     color: #4b5563;
//                     font-weight: 500;
//                     text-decoration: none;
//                     transition: color 0.3s ease;
//                 }

//                 .navbar-mobile-link:hover {
//                     color: #22c55e;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-mobile-link {
//                         color: #a9c4b0;
//                     }
//                     .navbar-mobile-link:hover {
//                         color: #b6f03c;
//                     }
//                 }

//                 .navbar-mobile-cart {
//                     text-align: left;
//                     color: #4b5563;
//                     background: none;
//                     border: none;
//                     font-weight: 500;
//                     cursor: pointer;
//                     transition: color 0.3s ease;
//                 }

//                 .navbar-mobile-cart:hover {
//                     color: #22c55e;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                     .navbar-mobile-cart {
//                         color: #a9c4b0;
//                     }
//                     .navbar-mobile-cart:hover {
//                         color: #b6f03c;
//                     }
//                 }

//                 .navbar-mobile-logout {
//                     text-align: left;
//                     color: #ef4444;
//                     background: none;
//                     border: none;
//                     font-weight: 500;
//                     cursor: pointer;
//                 }

//                 .navbar-mobile-logout:hover {
//                     color: #dc2626;
//                 }
//             `}</style>
//         </>
//     );
// }

















// Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Menu,
    X,
    ShoppingBag,
    Sprout,
    LogOut,
    Globe,
    User,
    ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { Play } from "lucide-react";
import { useDemo } from "../context/DemoContext"; // ✅ Correct import
import api from "../api";

export default function Navbar({ cartCount, onCartClick }) {
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const { startDemo } = useDemo(); // ✅ Now this will work
    const token = Cookies.get('token');

    const user = Cookies.get('user')
        ? JSON.parse(Cookies.get('user'))
        : null;

    const isAdmin = user?.role === "admin";
    const [farmerProfile, setFarmerProfile] = useState(null);

    useEffect(() => {
        setProfileOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const loadProfile = async () => {
            if (isAdmin) return;
            try {
                const res = await api.get("/farmer");
                if (res.data.exists) {
                    setFarmerProfile(res.data.profile);
                }
            } catch (err) {
                console.log(err);
            }
        };
        loadProfile();
    }, [isAdmin]);

    // Force English for admin
    useEffect(() => {
        if (isAdmin) {
            i18n.changeLanguage("en");
        }
    }, [isAdmin, i18n]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // ================= ROLE LINKS =================
    const userLinks = [
        { name: t("nav_dashboard"), path: "/dashboard" },
        { name: t("nav_crop"), path: "/crop-recommend" },
        { name: t("nav_yield"), path: "/yield-predict" },
        { name: t("nav_disease"), path: "/disease-detect" },
        { name: t("nav_store"), path: "/store" }
    ];
    const adminLinks = [
        { name: "Admin Dashboard", path: '/admin-dashboard' },
        { name: "Admin Orders", path: '/admin-orders' },
        { name: "Admin Products", path: '/admin-products' }
    ];

    const links = isAdmin ? adminLinks : userLinks;

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        window.location.href = '/login';
    };

    const changeLanguage = async (lng) => {
        try {
            await i18n.changeLanguage(lng);
            await api.post("/farmer/language", {
                language: lng,
            });
            setFarmerProfile((prev) => ({
                ...prev,
                language: lng,
            }));
        } catch (err) {
            console.error("Language update failed:", err);
        }
    };

    if (!token) return null;

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* ================= LOGO ================= */}
                    <Link
                        to={isAdmin ? "/admin-dashboard" : "/dashboard"}
                        className="navbar-logo"
                    >
                        <div className="navbar-logo-icon">
                            <Sprout size={24} className="navbar-logo-sprout" />
                        </div>
                        <span className="navbar-logo-text">
                            Farm<span className="navbar-logo-highlight">Xpert</span>
                        </span>
                    </Link>

                    {/* ================= NAV LINKS ================= */}
                    <div className="navbar-links">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="navbar-link"
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="navbar-indicator"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* ================= RIGHT SIDE ================= */}
                    <div className="navbar-right">
                        {/* GUIDED TOUR BUTTON */}
                        {!isAdmin && (
                            <button
                                onClick={startDemo}
                                className="navbar-tour-btn"
                            >
                                <Play size={16} fill="white" />
                                Guided Tour
                            </button>
                        )}

                        {/* LANGUAGE SWITCHER */}
                        {!isAdmin && (
                            <div className="navbar-language-wrapper">
                                <button className="navbar-language-btn">
                                    <Globe size={20} />
                                </button>
                                <div className="navbar-language-dropdown">
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="navbar-language-menu"
                                    >
                                        <button
                                            onClick={() => changeLanguage('en')}
                                            className="navbar-language-option"
                                        >
                                            English
                                        </button>
                                        <button
                                            onClick={() => changeLanguage('hi')}
                                            className="navbar-language-option"
                                        >
                                            Hindi
                                        </button>
                                        <button
                                            onClick={() => changeLanguage('te')}
                                            className="navbar-language-option"
                                        >
                                            Telugu
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        )}

                        {/* CART */}
                        {!isAdmin && (
                            <button
                                onClick={onCartClick}
                                className="navbar-cart-btn"
                            >
                                <ShoppingBag size={20} />
                                {cartCount > 0 && (
                                    <span className="navbar-cart-badge">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        )}

                        <div className="navbar-divider"></div>

                        {/* PROFILE */}
                        {!isAdmin && (
                            <div className="navbar-profile-wrapper" ref={profileRef}>
                                <button
                                    onClick={() => setProfileOpen(prev => !prev)}
                                    className="navbar-profile-btn"
                                >
                                    <div className="navbar-profile-avatar">
                                        {farmerProfile?.fullName
                                            ? farmerProfile.fullName.charAt(0).toUpperCase()
                                            : <User size={18} />
                                        }
                                    </div>
                                    <div className="navbar-profile-info">
                                        <p className="navbar-profile-name">
                                            {farmerProfile?.fullName || user?.name}
                                        </p>
                                        <p className="navbar-profile-role">
                                            {t("farmer")}
                                        </p>
                                    </div>
                                    <ChevronDown size={16} className="navbar-profile-chevron" />
                                </button>

                                {profileOpen && (
                                    <div className="navbar-profile-dropdown">
                                        <div className="navbar-profile-header">
                                            <p className="navbar-profile-header-name">
                                                {farmerProfile?.fullName || user?.name}
                                            </p>
                                            <p className="navbar-profile-header-farm">
                                                {farmerProfile?.farmName || t("my_farm")}
                                            </p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="navbar-profile-item"
                                        >
                                            👤 {t("my_profile")}
                                        </Link>
                                        <Link
                                            to="/dashboard"
                                            className="navbar-profile-item"
                                        >
                                            🏡 {t("nav_dashboard")}
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="navbar-profile-logout"
                                        >
                                            {t("logout")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {isAdmin && (
                            <button
                                onClick={handleLogout}
                                className="navbar-admin-logout"
                            >
                                {t("logout")}
                                <LogOut size={16} />
                            </button>
                        )}
                    </div>

                    {/* ================= MOBILE MENU BUTTON ================= */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="navbar-mobile-btn"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* ================= MOBILE MENU ================= */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="navbar-mobile-menu"
                        >
                            <div className="navbar-mobile-content">
                                {links.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="navbar-mobile-link"
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                {!isAdmin && (
                                    <button
                                        onClick={onCartClick}
                                        className="navbar-mobile-cart"
                                    >
                                        Cart ({cartCount})
                                    </button>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="navbar-mobile-logout"
                                >
                                    {t('logout')}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <style>{`
                /* ===== NAVBAR ===== */
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 50;
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(34, 197, 94, 0.1);
                    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
                }

                @media (prefers-color-scheme: dark) {
                    .navbar {
                        background: rgba(18, 39, 28, 0.85);
                        border-bottom: 1px solid rgba(233, 255, 226, 0.05);
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                    }
                }

                .navbar-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    height: 5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                /* ===== LOGO ===== */
                .navbar-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    text-decoration: none;
                    flex-shrink: 0;
                }

                .navbar-logo-icon {
                    width: 3rem;
                    height: 3rem;
                    border-radius: 0.75rem;
                    background: rgba(34, 197, 94, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(34, 197, 94, 0.15);
                    transition: all 0.3s ease;
                }

                .navbar-logo:hover .navbar-logo-icon {
                    background: rgba(34, 197, 94, 0.2);
                    transform: scale(1.05);
                }

                .navbar-logo-sprout {
                    color: #22c55e;
                }

                .navbar-logo-text {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1a1a1a;
                    font-family: 'Bricolage Grotesque', 'Segoe UI', sans-serif;
                    letter-spacing: -0.02em;
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-logo-text {
                        color: #f2fbec;
                    }
                }

                .navbar-logo-highlight {
                    background: linear-gradient(135deg, #22c55e, #eab308);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }

                /* ===== NAV LINKS ===== */
                .navbar-links {
                    display: none;
                    align-items: center;
                    gap: 2.5rem;
                    margin-left: 3rem;
                }

                @media (min-width: 1024px) {
                    .navbar-links {
                        display: flex;
                    }
                }

                .navbar-link {
                    position: relative;
                    font-size: 0.9375rem;
                    font-weight: 500;
                    color: #4b5563;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .navbar-link:hover {
                    color: #22c55e;
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-link {
                        color: #a9c4b0;
                    }
                    .navbar-link:hover {
                        color: #b6f03c;
                    }
                }

                .navbar-indicator {
                    position: absolute;
                    bottom: -0.5rem;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(135deg, #22c55e, #eab308);
                    border-radius: 999px;
                }

                /* ===== RIGHT SECTION ===== */
                .navbar-right {
                    display: none;
                    align-items: center;
                    gap: 1rem;
                }

                @media (min-width: 1024px) {
                    .navbar-right {
                        display: flex;
                    }
                }

                /* Guided Tour Button */
                .navbar-tour-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    border-radius: 0.75rem;
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    color: #ffffff;
                    font-size: 0.875rem;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 10px rgba(34, 197, 94, 0.2);
                }

                .navbar-tour-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
                }

                /* Language Switcher */
                .navbar-language-wrapper {
                    position: relative;
                }

                .navbar-language-btn {
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    color: #4b5563;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .navbar-language-btn:hover {
                    color: #22c55e;
                    background: rgba(34, 197, 94, 0.08);
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-language-btn {
                        color: #a9c4b0;
                    }
                    .navbar-language-btn:hover {
                        color: #b6f03c;
                        background: rgba(182, 240, 60, 0.08);
                    }
                }

                .navbar-language-dropdown {
                    position: absolute;
                    right: 0;
                    top: 100%;
                    padding-top: 0.5rem;
                    display: none;
                }

                .navbar-language-wrapper:hover .navbar-language-dropdown {
                    display: block;
                }

                .navbar-language-menu {
                    background: #ffffff;
                    border: 1px solid rgba(34, 197, 94, 0.1);
                    border-radius: 0.75rem;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
                    width: 8rem;
                    overflow: hidden;
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-language-menu {
                        background: rgba(18, 39, 28, 0.95);
                        border: 1px solid rgba(233, 255, 226, 0.05);
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                    }
                }

                .navbar-language-option {
                    width: 100%;
                    text-align: left;
                    padding: 0.5rem 1rem;
                    font-size: 0.875rem;
                    color: #4b5563;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .navbar-language-option:hover {
                    background: rgba(34, 197, 94, 0.05);
                    color: #22c55e;
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-language-option {
                        color: #a9c4b0;
                    }
                    .navbar-language-option:hover {
                        background: rgba(182, 240, 60, 0.05);
                        color: #b6f03c;
                    }
                }

                /* Cart Button */
                .navbar-cart-btn {
                    position: relative;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    color: #4b5563;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .navbar-cart-btn:hover {
                    color: #22c55e;
                    background: rgba(34, 197, 94, 0.08);
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-cart-btn {
                        color: #a9c4b0;
                    }
                    .navbar-cart-btn:hover {
                        color: #b6f03c;
                        background: rgba(182, 240, 60, 0.08);
                    }
                }

                .navbar-cart-badge {
                    position: absolute;
                    top: -0.25rem;
                    right: -0.25rem;
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    color: #ffffff;
                    font-size: 0.625rem;
                    padding: 0.125rem 0.5rem;
                    border-radius: 999px;
                    font-weight: 700;
                    animation: pulse-badge 2s ease-in-out infinite;
                }

                @keyframes pulse-badge {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .navbar-divider {
                    width: 1px;
                    height: 1.5rem;
                    background: rgba(0, 0, 0, 0.06);
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-divider {
                        background: rgba(233, 255, 226, 0.05);
                    }
                }

                /* Profile */
                .navbar-profile-wrapper {
                    position: relative;
                }

                .navbar-profile-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.75rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .navbar-profile-btn:hover {
                    background: rgba(34, 197, 94, 0.05);
                }

                .navbar-profile-avatar {
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.875rem;
                }

                .navbar-profile-info {
                    display: none;
                    text-align: left;
                }

                @media (min-width: 1280px) {
                    .navbar-profile-info {
                        display: block;
                    }
                }

                .navbar-profile-name {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #1a1a1a;
                    margin: 0;
                }

                .navbar-profile-role {
                    font-size: 0.75rem;
                    color: #6b7280;
                    margin: 0;
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-profile-name {
                        color: #f2fbec;
                    }
                    .navbar-profile-role {
                        color: #a9c4b0;
                    }
                }

                .navbar-profile-chevron {
                    color: #6b7280;
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-profile-chevron {
                        color: #a9c4b0;
                    }
                }

                .navbar-profile-dropdown {
                    position: absolute;
                    right: 0;
                    margin-top: 0.75rem;
                    width: 16rem;
                    background: #ffffff;
                    border: 1px solid rgba(34, 197, 94, 0.1);
                    border-radius: 1rem;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
                    overflow: hidden;
                    z-index: 50;
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-profile-dropdown {
                        background: rgba(18, 39, 28, 0.95);
                        border: 1px solid rgba(233, 255, 226, 0.05);
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                    }
                }

                .navbar-profile-header {
                    padding: 1.25rem;
                    background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(234, 179, 8, 0.05));
                    border-bottom: 1px solid rgba(34, 197, 94, 0.05);
                }

                .navbar-profile-header-name {
                    font-weight: 700;
                    font-size: 1.125rem;
                    color: #1a1a1a;
                    margin: 0;
                }

                .navbar-profile-header-farm {
                    font-size: 0.875rem;
                    color: #6b7280;
                    margin: 0.25rem 0 0;
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-profile-header-name {
                        color: #f2fbec;
                    }
                    .navbar-profile-header-farm {
                        color: #a9c4b0;
                    }
                }

                .navbar-profile-item {
                    display: block;
                    padding: 0.75rem 1.25rem;
                    color: #4b5563;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .navbar-profile-item:hover {
                    background: rgba(34, 197, 94, 0.05);
                    color: #22c55e;
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-profile-item {
                        color: #a9c4b0;
                    }
                    .navbar-profile-item:hover {
                        background: rgba(182, 240, 60, 0.05);
                        color: #b6f03c;
                    }
                }

                .navbar-profile-logout {
                    width: 100%;
                    text-align: left;
                    padding: 0.75rem 1.25rem;
                    color: #ef4444;
                    background: none;
                    border: none;
                    border-top: 1px solid rgba(0, 0, 0, 0.05);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .navbar-profile-logout:hover {
                    background: rgba(239, 68, 68, 0.05);
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-profile-logout {
                        border-top: 1px solid rgba(233, 255, 226, 0.05);
                    }
                }

                /* Admin Logout */
                .navbar-admin-logout {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #4b5563;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }

                .navbar-admin-logout:hover {
                    color: #ef4444;
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-admin-logout {
                        color: #a9c4b0;
                    }
                }

                /* ===== MOBILE ===== */
                .navbar-mobile-btn {
                    display: flex;
                    padding: 0.5rem;
                    color: #4b5563;
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                @media (min-width: 768px) {
                    .navbar-mobile-btn {
                        display: none;
                    }
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-mobile-btn {
                        color: #a9c4b0;
                    }
                }

                .navbar-mobile-menu {
                    display: flex;
                    background: rgba(255, 255, 255, 0.98);
                    border-top: 1px solid rgba(34, 197, 94, 0.05);
                    overflow: hidden;
                }

                @media (min-width: 768px) {
                    .navbar-mobile-menu {
                        display: none;
                    }
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-mobile-menu {
                        background: rgba(18, 39, 28, 0.98);
                        border-top: 1px solid rgba(233, 255, 226, 0.05);
                    }
                }

                .navbar-mobile-content {
                    display: flex;
                    flex-direction: column;
                    padding: 1rem;
                    gap: 1rem;
                    width: 100%;
                }

                .navbar-mobile-link {
                    color: #4b5563;
                    font-weight: 500;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .navbar-mobile-link:hover {
                    color: #22c55e;
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-mobile-link {
                        color: #a9c4b0;
                    }
                    .navbar-mobile-link:hover {
                        color: #b6f03c;
                    }
                }

                .navbar-mobile-cart {
                    text-align: left;
                    color: #4b5563;
                    background: none;
                    border: none;
                    font-weight: 500;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }

                .navbar-mobile-cart:hover {
                    color: #22c55e;
                }

                @media (prefers-color-scheme: dark) {
                    .navbar-mobile-cart {
                        color: #a9c4b0;
                    }
                    .navbar-mobile-cart:hover {
                        color: #b6f03c;
                    }
                }

                .navbar-mobile-logout {
                    text-align: left;
                    color: #ef4444;
                    background: none;
                    border: none;
                    font-weight: 500;
                    cursor: pointer;
                }

                .navbar-mobile-logout:hover {
                    color: #dc2626;
                }
            `}</style>
        </>
    );
}