// // DashboardTopbar.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Menu, 
//   Search, 
//   Bell, 
//   Globe, 
//   User, 
//   ChevronDown,
//   LogOut,
//   Settings,
//   HelpCircle,
//   UserCircle,
//   Check,
//   Play
// } from 'lucide-react';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';
// import { useDemo } from '../context/DemoContext';
// import styles from './DashboardTopbar.module.css';

// const DashboardTopbar = ({ onMenuClick }) => {
//   const { t, i18n } = useTranslation();
//   const { startDemo } = useDemo();
//   const [notifications, setNotifications] = useState(3);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [notifOpen, setNotifOpen] = useState(false);
//   const [langOpen, setLangOpen] = useState(false);
//   const profileRef = useRef(null);
//   const notifRef = useRef(null);
//   const langRef = useRef(null);
//   const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

//   // Language options
//   const languages = [
//     { code: 'en', label: 'English', flag: '🇬🇧' },
//     { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
//     { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
//   ];

//   const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileOpen(false);
//       }
//       if (notifRef.current && !notifRef.current.contains(event.target)) {
//         setNotifOpen(false);
//       }
//       if (langRef.current && !langRef.current.contains(event.target)) {
//         setLangOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     Cookies.remove('token');
//     Cookies.remove('user');
//     window.location.href = '/login';
//   };

//   const changeLanguage = (langCode) => {
//     i18n.changeLanguage(langCode);
//     setLangOpen(false);
//     localStorage.setItem('preferred-language', langCode);
//   };

//   // Check if user is admin (hide guided tour for admin)
//   const isAdmin = user?.role === "admin";

//   return (
//     <header className={styles.topbar}>
//       <div className={styles.left}>
//         <button onClick={onMenuClick} className={styles.menuBtn}>
//           <Menu size={20} />
//         </button>
//         <div className={styles.searchWrapper}>
//           <Search size={16} className={styles.searchIcon} />
//           <input 
//             type="text" 
//             placeholder={t('search_placeholder') || "Search your farm..."} 
//             className={styles.searchInput}
//           />
//         </div>
//       </div>

//       <div className={styles.right}>
//         {/* Guided Tour Button */}
//         {!isAdmin && (
//           <button
//             onClick={startDemo}
//             className={styles.tourBtn}
//           >
//             <Play size={16} fill="white" />
//             <span>Guided Tour</span>
//           </button>
//         )}

//         {/* Language Switcher */}
//         <div className={styles.langWrapper} ref={langRef}>
//           <button 
//             className={styles.iconBtn}
//             onClick={() => setLangOpen(!langOpen)}
//             aria-label="Change language"
//           >
//             <Globe size={20} />
//             <span className={styles.langIndicator}>{currentLanguage.flag}</span>
//           </button>
          
//           {langOpen && (
//             <div className={styles.langDropdown}>
//               <div className={styles.langHeader}>
//                 <span>Select Language</span>
//               </div>
//               <div className={styles.langList}>
//                 {languages.map((lang) => (
//                   <button
//                     key={lang.code}
//                     className={`${styles.langOption} ${i18n.language === lang.code ? styles.langActive : ''}`}
//                     onClick={() => changeLanguage(lang.code)}
//                   >
//                     <span className={styles.langFlag}>{lang.flag}</span>
//                     <span className={styles.langLabel}>{lang.label}</span>
//                     {i18n.language === lang.code && (
//                       <Check size={16} className={styles.langCheck} />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Notifications */}
//         <div className={styles.notifWrapper} ref={notifRef}>
//           <button 
//             className={styles.iconBtn}
//             onClick={() => setNotifOpen(!notifOpen)}
//           >
//             <Bell size={20} />
//             {notifications > 0 && (
//               <span className={styles.notifBadge}>{notifications}</span>
//             )}
//           </button>
//           {notifOpen && (
//             <div className={styles.notifDropdown}>
//               <div className={styles.notifHeader}>
//                 <span>Notifications</span>
//                 <button>Mark all read</button>
//               </div>
//               <div className={styles.notifList}>
//                 <div className={styles.notifItem}>
//                   <span className={styles.notifDot}></span>
//                   <div>
//                     <p className={styles.notifText}>Your crop is ready for harvest</p>
//                     <span className={styles.notifTime}>2 hours ago</span>
//                   </div>
//                 </div>
//                 <div className={styles.notifItem}>
//                   <span className={styles.notifDot}></span>
//                   <div>
//                     <p className={styles.notifText}>Weather alert: Heavy rain expected</p>
//                     <span className={styles.notifTime}>5 hours ago</span>
//                   </div>
//                 </div>
//                 <div className={styles.notifItem}>
//                   <span className={styles.notifDot}></span>
//                   <div>
//                     <p className={styles.notifText}>Soil test results available</p>
//                     <span className={styles.notifTime}>1 day ago</span>
//                   </div>
//                 </div>
//               </div>
//               <Link to="/notifications" className={styles.notifViewAll}>
//                 View all notifications
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Profile */}
//         <div className={styles.profileWrapper} ref={profileRef}>
//           <button 
//             className={styles.profileBtn}
//             onClick={() => setProfileOpen(!profileOpen)}
//           >
//             <div className={styles.avatar}>
//               {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
//             </div>
//             <span className={styles.profileName}>{user?.name || 'Farmer'}</span>
//             <ChevronDown size={16} className={styles.profileChevron} />
//           </button>
//           {profileOpen && (
//             <div className={styles.profileDropdown}>
//               <div className={styles.profileHeader}>
//                 <div className={styles.profileAvatar}>
//                   {user?.name ? user.name.charAt(0).toUpperCase() : <User size={24} />}
//                 </div>
//                 <div>
//                   <p className={styles.profileHeaderName}>{user?.name || 'Farmer'}</p>
//                   <p className={styles.profileHeaderRole}>Farmer</p>
//                 </div>
//               </div>
//               <Link to="/profile" className={styles.dropdownItem}>
//                 <UserCircle size={18} /> My Profile
//               </Link>
//               <Link to="/settings" className={styles.dropdownItem}>
//                 <Settings size={18} /> Settings
//               </Link>
//               <Link to="/help" className={styles.dropdownItem}>
//                 <HelpCircle size={18} /> Help Center
//               </Link>
//               <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutItem}`}>
//                 <LogOut size={18} /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardTopbar;











// // src/components/DashboardTopbar.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Menu, 
//   Search, 
//   Bell, 
//   Globe, 
//   User, 
//   ChevronDown,
//   LogOut,
//   Settings,
//   HelpCircle,
//   UserCircle,
//   Check,
//   Play
// } from 'lucide-react';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';
// import { useDemo } from '../context/DemoContext';
// import styles from './DashboardTopbar.module.css';

// const DashboardTopbar = ({ onMenuClick }) => {
//   const { t, i18n } = useTranslation();
//   const { startDemo } = useDemo();
//   const [notifications, setNotifications] = useState(3);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [notifOpen, setNotifOpen] = useState(false);
//   const [langOpen, setLangOpen] = useState(false);
//   const profileRef = useRef(null);
//   const notifRef = useRef(null);
//   const langRef = useRef(null);
//   const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

//   // Language options
//   const languages = [
//     { code: 'en', label: 'English', flag: '🇬🇧' },
//     { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
//     { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
//   ];

//   const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileOpen(false);
//       }
//       if (notifRef.current && !notifRef.current.contains(event.target)) {
//         setNotifOpen(false);
//       }
//       if (langRef.current && !langRef.current.contains(event.target)) {
//         setLangOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     Cookies.remove('token');
//     Cookies.remove('user');
//     window.location.href = '/login';
//   };

//   const changeLanguage = async (langCode) => {
//     i18n.changeLanguage(langCode);
//     setLangOpen(false);
//     localStorage.setItem('preferred-language', langCode);
//   };

//   // Handle Guided Tour
//   const handleGuidedTour = () => {
//     setProfileOpen(false);
//     // Reset tour state
//     localStorage.removeItem('farmxpert_tour_completed');
//     localStorage.removeItem('farmxpert_tour_skipped');
//     // Trigger guided tour
//     window.dispatchEvent(new CustomEvent('start-guided-tour'));
//   };

//   // Check if user is admin (hide guided tour for admin)
//   const isAdmin = user?.role === "admin";

//   return (
//     <header className={styles.topbar}>
//       <div className={styles.left}>
//         <button onClick={onMenuClick} className={styles.menuBtn}>
//           <Menu size={20} />
//         </button>
//         <div className={styles.searchWrapper}>
//           <Search size={16} className={styles.searchIcon} />
//           <input 
//             type="text" 
//             placeholder={t('search_placeholder') || "Search your farm..."} 
//             className={styles.searchInput}
//           />
//         </div>
//       </div>

//       <div className={styles.right}>
//         {/* Guided Tour Button */}
//         {!isAdmin && (
//           <button
//             onClick={handleGuidedTour}
//             className={styles.tourBtn}
//           >
//             <Play size={16} fill="white" />
//             <span>Guided Tour</span>
//           </button>
//         )}

//         {/* Language Switcher */}
//         <div className={styles.langWrapper} ref={langRef}>
//           <button 
//             className={styles.iconBtn}
//             onClick={() => setLangOpen(!langOpen)}
//             aria-label="Change language"
//           >
//             <Globe size={20} />
//             <span className={styles.langIndicator}>{currentLanguage.flag}</span>
//           </button>
          
//           {langOpen && (
//             <div className={styles.langDropdown}>
//               <div className={styles.langHeader}>
//                 <span>Select Language</span>
//               </div>
//               <div className={styles.langList}>
//                 {languages.map((lang) => (
//                   <button
//                     key={lang.code}
//                     className={`${styles.langOption} ${i18n.language === lang.code ? styles.langActive : ''}`}
//                     onClick={() => changeLanguage(lang.code)}
//                   >
//                     <span className={styles.langFlag}>{lang.flag}</span>
//                     <span className={styles.langLabel}>{lang.label}</span>
//                     {i18n.language === lang.code && (
//                       <Check size={16} className={styles.langCheck} />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Notifications */}
//         <div className={styles.notifWrapper} ref={notifRef}>
//           <button 
//             className={styles.iconBtn}
//             onClick={() => setNotifOpen(!notifOpen)}
//           >
//             <Bell size={20} />
//             {notifications > 0 && (
//               <span className={styles.notifBadge}>{notifications}</span>
//             )}
//           </button>
//           {notifOpen && (
//             <div className={styles.notifDropdown}>
//               <div className={styles.notifHeader}>
//                 <span>Notifications</span>
//                 <button>Mark all read</button>
//               </div>
//               <div className={styles.notifList}>
//                 <div className={styles.notifItem}>
//                   <span className={styles.notifDot}></span>
//                   <div>
//                     <p className={styles.notifText}>Your crop is ready for harvest</p>
//                     <span className={styles.notifTime}>2 hours ago</span>
//                   </div>
//                 </div>
//                 <div className={styles.notifItem}>
//                   <span className={styles.notifDot}></span>
//                   <div>
//                     <p className={styles.notifText}>Weather alert: Heavy rain expected</p>
//                     <span className={styles.notifTime}>5 hours ago</span>
//                   </div>
//                 </div>
//                 <div className={styles.notifItem}>
//                   <span className={styles.notifDot}></span>
//                   <div>
//                     <p className={styles.notifText}>Soil test results available</p>
//                     <span className={styles.notifTime}>1 day ago</span>
//                   </div>
//                 </div>
//               </div>
//               <Link to="/notifications" className={styles.notifViewAll}>
//                 View all notifications
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Profile */}
//         <div className={styles.profileWrapper} ref={profileRef}>
//           <button 
//             className={styles.profileBtn}
//             onClick={() => setProfileOpen(!profileOpen)}
//           >
//             <div className={styles.avatar}>
//               {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
//             </div>
//             <span className={styles.profileName}>{user?.name || 'Farmer'}</span>
//             <ChevronDown size={16} className={styles.profileChevron} />
//           </button>
//           {profileOpen && (
//             <div className={styles.profileDropdown}>
//               <div className={styles.profileHeader}>
//                 <div className={styles.profileAvatar}>
//                   {user?.name ? user.name.charAt(0).toUpperCase() : <User size={24} />}
//                 </div>
//                 <div>
//                   <p className={styles.profileHeaderName}>{user?.name || 'Farmer'}</p>
//                   <p className={styles.profileHeaderRole}>Farmer</p>
//                 </div>
//               </div>
//               <Link to="/profile" className={styles.dropdownItem}>
//                 <UserCircle size={18} /> My Profile
//               </Link>
//               <Link to="/settings" className={styles.dropdownItem}>
//                 <Settings size={18} /> Settings
//               </Link>
//               <button onClick={handleGuidedTour} className={styles.dropdownItem}>
//                 <HelpCircle size={18} /> Guided Tour
//               </button>
//               <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutItem}`}>
//                 <LogOut size={18} /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardTopbar;












// // src/components/DashboardTopbar.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Menu, 
//   Search, 
//   Bell, 
//   Globe, 
//   User, 
//   ChevronDown,
//   LogOut,
//   Settings,
//   HelpCircle,
//   UserCircle,
//   Check,
//   Play
// } from 'lucide-react';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';
// import { useDemo } from '../context/DemoContext';
// import styles from './DashboardTopbar.module.css';

// const DashboardTopbar = ({ onMenuClick }) => {
//   const { t, i18n } = useTranslation();
//   const { startDemo } = useDemo();
//   const [notifications, setNotifications] = useState(3);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [notifOpen, setNotifOpen] = useState(false);
//   const [langOpen, setLangOpen] = useState(false);
//   const profileRef = useRef(null);
//   const notifRef = useRef(null);
//   const langRef = useRef(null);
//   const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

//   const languages = [
//     { code: 'en', label: 'English', flag: '🇬🇧' },
//     { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
//     { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
//   ];

//   const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileOpen(false);
//       }
//       if (notifRef.current && !notifRef.current.contains(event.target)) {
//         setNotifOpen(false);
//       }
//       if (langRef.current && !langRef.current.contains(event.target)) {
//         setLangOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     Cookies.remove('token');
//     Cookies.remove('user');
//     window.location.href = '/login';
//   };

//   const changeLanguage = async (langCode) => {
//     i18n.changeLanguage(langCode);
//     setLangOpen(false);
//     localStorage.setItem('preferred-language', langCode);
//   };

//   const handleGuidedTour = () => {
//     setProfileOpen(false);
//     localStorage.removeItem('farmxpert_tour_completed');
//     localStorage.removeItem('farmxpert_tour_skipped');
//     window.dispatchEvent(new CustomEvent('start-guided-tour'));
//   };

//   const isAdmin = user?.role === "admin";

//   return (
//     <header className={styles.topbar}>
//       <div className={styles.left}>
//         <button onClick={onMenuClick} className={styles.menuBtn}>
//           <Menu size={20} />
//         </button>
//         <div className={styles.searchWrapper}>
//           <Search size={16} className={styles.searchIcon} />
//           <input 
//             type="text" 
//             placeholder={t('search_placeholder') || "Search your farm..."} 
//             className={styles.searchInput}
//           />
//         </div>
//       </div>

//       <div className={styles.right}>
//         {!isAdmin && (
//           <button onClick={handleGuidedTour} className={styles.tourBtn}>
//             <Play size={16} />
//             <span>Guided Tour</span>
//           </button>
//         )}

//         <div className={styles.langWrapper} ref={langRef}>
//           <button 
//             className={styles.iconBtn}
//             onClick={() => setLangOpen(!langOpen)}
//             aria-label="Change language"
//           >
//             <Globe size={20} />
//             <span className={styles.langIndicator}>{currentLanguage.flag}</span>
//           </button>
          
//           {langOpen && (
//             <div className={styles.langDropdown}>
//               <div className={styles.langHeader}>
//                 <span>Select Language</span>
//               </div>
//               <div className={styles.langList}>
//                 {languages.map((lang) => (
//                   <button
//                     key={lang.code}
//                     className={`${styles.langOption} ${i18n.language === lang.code ? styles.langActive : ''}`}
//                     onClick={() => changeLanguage(lang.code)}
//                   >
//                     <span className={styles.langFlag}>{lang.flag}</span>
//                     <span className={styles.langLabel}>{lang.label}</span>
//                     {i18n.language === lang.code && (
//                       <Check size={16} className={styles.langCheck} />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className={styles.notifWrapper} ref={notifRef}>
//           <button 
//             className={styles.iconBtn}
//             onClick={() => setNotifOpen(!notifOpen)}
//           >
//             <Bell size={20} />
//             {notifications > 0 && (
//               <span className={styles.notifBadge}>{notifications}</span>
//             )}
//           </button>
//           {notifOpen && (
//             <div className={styles.notifDropdown}>
//               <div className={styles.notifHeader}>
//                 <span>Notifications</span>
//                 <button>Mark all read</button>
//               </div>
//               <div className={styles.notifList}>
//                 <div className={styles.notifItem}>
//                   <span className={styles.notifDot}></span>
//                   <div>
//                     <p className={styles.notifText}>Your crop is ready for harvest</p>
//                     <span className={styles.notifTime}>2 hours ago</span>
//                   </div>
//                 </div>
//                 <div className={styles.notifItem}>
//                   <span className={styles.notifDot}></span>
//                   <div>
//                     <p className={styles.notifText}>Weather alert: Heavy rain expected</p>
//                     <span className={styles.notifTime}>5 hours ago</span>
//                   </div>
//                 </div>
//                 <div className={styles.notifItem}>
//                   <span className={styles.notifDot}></span>
//                   <div>
//                     <p className={styles.notifText}>Soil test results available</p>
//                     <span className={styles.notifTime}>1 day ago</span>
//                   </div>
//                 </div>
//               </div>
//               <Link to="/notifications" className={styles.notifViewAll}>
//                 View all notifications
//               </Link>
//             </div>
//           )}
//         </div>

//         <div className={styles.profileWrapper} ref={profileRef}>
//           <button 
//             className={styles.profileBtn}
//             onClick={() => setProfileOpen(!profileOpen)}
//           >
//             <div className={styles.avatar}>
//               {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
//             </div>
//             <span className={styles.profileName}>{user?.name || 'Farmer'}</span>
//             <ChevronDown size={16} className={styles.profileChevron} />
//           </button>
//           {profileOpen && (
//             <div className={styles.profileDropdown}>
//               <div className={styles.profileHeader}>
//                 <div className={styles.profileAvatar}>
//                   {user?.name ? user.name.charAt(0).toUpperCase() : <User size={24} />}
//                 </div>
//                 <div>
//                   <p className={styles.profileHeaderName}>{user?.name || 'Farmer'}</p>
//                   <p className={styles.profileHeaderRole}>Farmer</p>
//                 </div>
//               </div>
//               <Link to="/profile" className={styles.dropdownItem}>
//                 <UserCircle size={18} /> My Profile
//               </Link>
//               <Link to="/settings" className={styles.dropdownItem}>
//                 <Settings size={18} /> Settings
//               </Link>
//               <button onClick={handleGuidedTour} className={styles.dropdownItem}>
//                 <HelpCircle size={18} /> Guided Tour
//               </button>
//               <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutItem}`}>
//                 <LogOut size={18} /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardTopbar;



















// // src/components/DashboardTopbar.jsx

// import React, {
//   useState,
//   useRef,
//   useEffect,
// } from "react";

// import { Link } from "react-router-dom";

// import {
//   Menu,
//   Bell,
//   Globe,
//   User,
//   ChevronDown,
//   LogOut,
//   Settings,
//   HelpCircle,
//   UserCircle,
//   Check,
//   Play,
//   ShoppingCart,
//   Sprout,
// } from "lucide-react";

// import Cookies from "js-cookie";
// import { useTranslation } from "react-i18next";
// import { useDemo } from "../context/DemoContext";

// import api from "../api";
// import CartDrawer from "../pages/CartDrawer";

// import styles from "./DashboardTopbar.module.css";


// const DashboardTopbar = ({ onMenuClick }) => {

//   const { t, i18n } = useTranslation();
//   const { startDemo } = useDemo();

//   const [notifications, setNotifications] =
//     useState(3);

//   const [profileOpen, setProfileOpen] =
//     useState(false);

//   const [notifOpen, setNotifOpen] =
//     useState(false);

//   const [langOpen, setLangOpen] =
//     useState(false);

//   const [cartOpen, setCartOpen] =
//     useState(false);

//   const [cart, setCart] =
//     useState([]);


//   const profileRef = useRef(null);
//   const notifRef = useRef(null);
//   const langRef = useRef(null);


//   /* ============================================================
//      USER
//   ============================================================ */

//   const user = Cookies.get("user")
//     ? JSON.parse(Cookies.get("user"))
//     : null;


//   /* ============================================================
//      LANGUAGES
//   ============================================================ */

//   const languages = [
//     {
//       code: "en",
//       label: t('english'),
//       flag: "🇬🇧",
//     },
//     {
//       code: "hi",
//       label: t('hindi'),
//       flag: "🇮🇳",
//     },
//     {
//       code: "te",
//       label: t('telugu'),
//       flag: "🇮🇳",
//     },
//   ];


//   const currentLanguage =
//     languages.find(
//       (lang) =>
//         lang.code === i18n.language
//     ) || languages[0];


//   /* ============================================================
//      FETCH CART
//   ============================================================ */

//   const fetchCart = async () => {

//     try {

//       const { data } =
//         await api.get("/cart");


//       const cleanedCart =
//         (data?.items || [])
//           .filter(
//             (item) =>
//               item.productId
//           )
//           .map((item) => ({
//             _id:
//               item.productId._id,

//             name:
//               item.productId.name,

//             price:
//               item.productId.price,

//             quantity:
//               item.quantity,
//           }));


//       setCart(cleanedCart);

//       return cleanedCart;

//     } catch (error) {

//       console.error(
//         "Failed to fetch cart:",
//         error
//       );

//       return [];

//     }

//   };


//   /* ============================================================
//      INITIAL CART + REAL-TIME UPDATE
//   ============================================================ */

//   useEffect(() => {

//     fetchCart();


//     const handleCartUpdate = (
//       event
//     ) => {

//       if (
//         event.detail &&
//         event.detail.cart
//       ) {

//         setCart(
//           event.detail.cart
//         );

//       } else {

//         fetchCart();

//       }

//     };


//     window.addEventListener(
//       "cart-updated",
//       handleCartUpdate
//     );


//     return () => {

//       window.removeEventListener(
//         "cart-updated",
//         handleCartUpdate
//       );

//     };

//   }, []);


//   /* ============================================================
//      CLICK OUTSIDE
//   ============================================================ */

//   useEffect(() => {

//     const handleClickOutside = (
//       event
//     ) => {

//       if (
//         profileRef.current &&
//         !profileRef.current.contains(
//           event.target
//         )
//       ) {

//         setProfileOpen(false);

//       }


//       if (
//         notifRef.current &&
//         !notifRef.current.contains(
//           event.target
//         )
//       ) {

//         setNotifOpen(false);

//       }


//       if (
//         langRef.current &&
//         !langRef.current.contains(
//           event.target
//         )
//       ) {

//         setLangOpen(false);

//       }

//     };


//     document.addEventListener(
//       "mousedown",
//       handleClickOutside
//     );


//     return () => {

//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );

//     };

//   }, []);


//   /* ============================================================
//      LOGOUT
//   ============================================================ */

//   const handleLogout = () => {

//     Cookies.remove("token");
//     Cookies.remove("user");

//     window.location.href =
//       "/login";

//   };


//   /* ============================================================
//      LANGUAGE
//   ============================================================ */

//   const changeLanguage = async (
//     langCode
//   ) => {

//     await i18n.changeLanguage(
//       langCode
//     );

//     setLangOpen(false);

//     localStorage.setItem(
//       "preferred-language",
//       langCode
//     );

//   };


//   /* ============================================================
//      GUIDED TOUR
//   ============================================================ */

//   const handleGuidedTour = () => {

//     setProfileOpen(false);

//     localStorage.removeItem(
//       "farmxpert_tour_completed"
//     );

//     localStorage.removeItem(
//       "farmxpert_tour_skipped"
//     );

//     window.dispatchEvent(
//       new CustomEvent(
//         "start-guided-tour"
//       )
//     );

//   };


//   /* ============================================================
//      OPEN CART
//   ============================================================ */

//   const openCart = async () => {

//     const latestCart =
//       await fetchCart();


//     if (latestCart) {
//       setCart(latestCart);
//     }


//     setCartOpen(true);

//     setProfileOpen(false);
//     setNotifOpen(false);
//     setLangOpen(false);

//   };


//   /* ============================================================
//      CART COUNT
//   ============================================================ */

//   const cartCount =
//     cart.reduce(
//       (total, item) =>
//         total +
//         Number(
//           item.quantity || 0
//         ),
//       0
//     );


//   const isAdmin =
//     user?.role === "admin";


//   return (
//     <>
//       {/* ======================================================
//           TOPBAR
//       ====================================================== */}

//       <header
//         className={
//           styles.topbar
//         }
//       >

//         {/* ====================================================
//             LEFT SECTION
//         ==================================================== */}

//         <div
//           className={
//             styles.left
//           }
//         >

//           {/* MENU BUTTON */}

//           <button
//             onClick={
//               onMenuClick
//             }
//             className={
//               styles.menuBtn
//             }
//             aria-label={t('open_menu')}
//           >
//             <Menu size={22} />
//           </button>


//           {/* BRAND / PAGE CONTEXT */}

//           <div
//             className={
//               styles.brandArea
//             }
//           >

//             <div
//               className={
//                 styles.brandIcon
//               }
//             >
//               <Sprout
//                 size={20}
//                 strokeWidth={2.2}
//               />
//             </div>


//             <div
//               className={
//                 styles.brandText
//               }
//             >

//               <span
//                 className={
//                   styles.brandName
//                 }
//               >
//                 FarmXpert
//               </span>

//               <span
//                 className={
//                   styles.brandSubtitle
//                 }
//               >
//                 {t('smart_agriculture')}
//               </span>

//             </div>

//           </div>

//         </div>


//         {/* ====================================================
//             RIGHT SECTION
//         ==================================================== */}

//         <div
//           className={
//             styles.right
//           }
//         >

//           {/* ==================================================
//               GUIDED TOUR
//           ================================================== */}

//           {!isAdmin && (

//             <button
//               onClick={
//                 handleGuidedTour
//               }
//               className={
//                 styles.tourBtn
//               }
//             >

//               <span
//                 className={
//                   styles.tourIcon
//                 }
//               >
//                 <Play
//                   size={14}
//                   fill="currentColor"
//                 />
//               </span>

//               <span
//                 className={
//                   styles.tourText
//                 }
//               >
//                 {t('guided_tour')}
//               </span>

//             </button>

//           )}


//           {/* ==================================================
//               DIVIDER
//           ================================================== */}

//           <span
//             className={
//               styles.actionDivider
//             }
//           />


//           {/* ==================================================
//               LANGUAGE
//           ================================================== */}

//           <div
//             className={
//               styles.langWrapper
//             }
//             ref={
//               langRef
//             }
//           >

//             <button
//               className={
//                 styles.iconBtn
//               }
//               onClick={() =>
//                 setLangOpen(
//                   !langOpen
//                 )
//               }
//               aria-label={t('change_language')}
//             >

//               <Globe
//                 size={20}
//                 strokeWidth={1.9}
//               />

//               <span
//                 className={
//                   styles.langIndicator
//                 }
//               >
//                 {
//                   currentLanguage.flag
//                 }
//               </span>

//             </button>


//             {langOpen && (

//               <div
//                 className={
//                   styles.langDropdown
//                 }
//               >

//                 <div
//                   className={
//                     styles.dropdownTitle
//                   }
//                 >

//                   <div
//                     className={
//                       styles.dropdownTitleIcon
//                     }
//                   >
//                     <Globe
//                       size={17}
//                     />
//                   </div>

//                   <div>

//                     <p>
//                       {t('select_language')}
//                     </p>

//                     <span>
//                       {t('choose_preferred_language')}
//                     </span>

//                   </div>

//                 </div>


//                 <div
//                   className={
//                     styles.langList
//                   }
//                 >

//                   {languages.map(
//                     (lang) => (

//                       <button
//                         key={
//                           lang.code
//                         }
//                         className={` 
//                           ${styles.langOption}
//                           ${
//                             i18n.language ===
//                             lang.code
//                               ? styles.langActive
//                               : ""
//                           }
//                         `}
//                         onClick={() =>
//                           changeLanguage(
//                             lang.code
//                           )
//                         }
//                       >

//                         <span
//                           className={
//                             styles.langFlag
//                           }
//                         >
//                           {
//                             lang.flag
//                           }
//                         </span>

//                         <span
//                           className={
//                             styles.langLabel
//                           }
//                         >
//                           {
//                             lang.label
//                           }
//                         </span>

//                         {i18n.language ===
//                           lang.code && (

//                           <Check
//                             size={17}
//                             className={
//                               styles.langCheck
//                             }
//                           />

//                         )}

//                       </button>

//                     )
//                   )}

//                 </div>

//               </div>

//             )}

//           </div>


//           {/* ==================================================
//               CART
//           ================================================== */}

//           <button
//             type="button"
//             className={
//               styles.cartBtn
//             }
//             onClick={
//               openCart
//             }
//             aria-label={t('open_cart')}
//           >

//             <ShoppingCart
//               size={20}
//               strokeWidth={1.9}
//             />


//             {cartCount > 0 && (

//               <span
//                 className={
//                   styles.cartBadge
//                 }
//               >
//                 {
//                   cartCount > 99
//                     ? "99+"
//                     : cartCount
//                 }
//               </span>

//             )}

//           </button>


//           {/* ==================================================
//               NOTIFICATIONS
//           ================================================== */}

//           <div
//             className={
//               styles.notifWrapper
//             }
//             ref={
//               notifRef
//             }
//           >

//             <button
//               className={
//                 styles.iconBtn
//               }
//               onClick={() =>
//                 setNotifOpen(
//                   !notifOpen
//                 )
//               }
//               aria-label={t('notifications')}
//             >

//               <Bell
//                 size={20}
//                 strokeWidth={1.9}
//               />


//               {notifications > 0 && (

//                 <span
//                   className={
//                     styles.notifBadge
//                   }
//                 >
//                   {
//                     notifications
//                   }
//                 </span>

//               )}

//             </button>


//             {notifOpen && (

//               <div
//                 className={
//                   styles.notifDropdown
//                 }
//               >

//                 <div
//                   className={
//                     styles.notifHeader
//                   }
//                 >

//                   <div>

//                     <p>
//                       {t('notifications')}
//                     </p>

//                     <span>
//                       {t('recent_updates')}
//                     </span>

//                   </div>

//                   <button>
//                     {t('mark_all_read')}
//                   </button>

//                 </div>


//                 <div
//                   className={
//                     styles.notifList
//                   }
//                 >

//                   <div
//                     className={
//                       styles.notifItem
//                     }
//                   >

//                     <span
//                       className={
//                         styles.notifIcon
//                       }
//                     >
//                       🌾
//                     </span>

//                     <div>

//                       <p
//                         className={
//                           styles.notifText
//                         }
//                       >
//                         {t('crop_ready_harvest')}
//                       </p>

//                       <span
//                         className={
//                           styles.notifTime
//                         }
//                       >
//                         {t('hours_ago', { hours: 2 })}
//                       </span>

//                     </div>

//                   </div>


//                   <div
//                     className={
//                       styles.notifItem
//                     }
//                   >

//                     <span
//                       className={
//                         styles.notifIcon
//                       }
//                     >
//                       ☁️
//                     </span>

//                     <div>

//                       <p
//                         className={
//                           styles.notifText
//                         }
//                       >
//                         {t('weather_alert_heavy_rain')}
//                       </p>

//                       <span
//                         className={
//                           styles.notifTime
//                         }
//                       >
//                         {t('hours_ago', { hours: 5 })}
//                       </span>

//                     </div>

//                   </div>


//                   <div
//                     className={
//                       styles.notifItem
//                     }
//                   >

//                     <span
//                       className={
//                         styles.notifIcon
//                       }
//                     >
//                       🧪
//                     </span>

//                     <div>

//                       <p
//                         className={
//                           styles.notifText
//                         }
//                       >
//                         {t('soil_test_results_available')}
//                       </p>

//                       <span
//                         className={
//                           styles.notifTime
//                         }
//                       >
//                         {t('days_ago', { days: 1 })}
//                       </span>

//                     </div>

//                   </div>

//                 </div>


//                 <Link
//                   to="/notifications"
//                   className={
//                     styles.notifViewAll
//                   }
//                   onClick={() =>
//                     setNotifOpen(
//                       false
//                     )
//                   }
//                 >
//                   {t('view_all_notifications')}
//                 </Link>

//               </div>

//             )}

//           </div>


//           {/* ==================================================
//               VERTICAL DIVIDER
//           ================================================== */}

//           <span
//             className={
//               styles.profileDivider
//             }
//           />


//           {/* ==================================================
//               PROFILE
//           ================================================== */}

//           <div
//             className={
//               styles.profileWrapper
//             }
//             ref={
//               profileRef
//             }
//           >

//             <button
//               className={
//                 styles.profileBtn
//               }
//               onClick={() =>
//                 setProfileOpen(
//                   !profileOpen
//                 )
//               }
//             >

//               <div
//                 className={
//                   styles.avatar
//                 }
//               >

//                 {user?.name
//                   ? user.name
//                       .charAt(0)
//                       .toUpperCase()
//                   : (
//                     <User size={17} />
//                   )}

//               </div>


//               <div
//                 className={
//                   styles.profileInfo
//                 }
//               >

//                 <span
//                   className={
//                     styles.profileName
//                   }
//                 >
//                   {user?.name ||
//                     t('farmer')}
//                 </span>

//                 <span
//                   className={
//                     styles.profileRole
//                   }
//                 >
//                   {t('farmer')}
//                 </span>

//               </div>


//               <ChevronDown
//                 size={16}
//                 className={
//                   styles.profileChevron
//                 }
//               />

//             </button>


//             {profileOpen && (

//               <div
//                 className={
//                   styles.profileDropdown
//                 }
//               >

//                 <div
//                   className={
//                     styles.profileHeader
//                   }
//                 >

//                   <div
//                     className={
//                       styles.profileAvatar
//                     }
//                   >
//                     {user?.name
//                       ? user.name
//                           .charAt(0)
//                           .toUpperCase()
//                       : (
//                         <User size={24} />
//                       )}
//                   </div>


//                   <div
//                     className={
//                       styles.profileHeaderInfo
//                     }
//                   >

//                     <p
//                       className={
//                         styles.profileHeaderName
//                       }
//                     >
//                       {user?.name ||
//                         t('farmer')}
//                     </p>

//                     <p
//                       className={
//                         styles.profileHeaderRole
//                       }
//                     >
//                       {t('farmer_account')}
//                     </p>

//                   </div>

//                 </div>


//                 <Link
//                   to="/profile"
//                   className={
//                     styles.dropdownItem
//                   }
//                   onClick={() =>
//                     setProfileOpen(
//                       false
//                     )
//                   }
//                 >

//                   <UserCircle
//                     size={19}
//                   />

//                   <span>
//                     {t('my_profile')}
//                   </span>

//                 </Link>


//                 <Link
//                   to="/settings"
//                   className={
//                     styles.dropdownItem
//                   }
//                   onClick={() =>
//                     setProfileOpen(
//                       false
//                     )
//                   }
//                 >

//                   <Settings
//                     size={19}
//                   />

//                   <span>
//                     {t('settings')}
//                   </span>

//                 </Link>


//                 <button
//                   onClick={
//                     handleGuidedTour
//                   }
//                   className={
//                     styles.dropdownItem
//                   }
//                 >

//                   <HelpCircle
//                     size={19}
//                   />

//                   <span>
//                     {t('guided_tour')}
//                   </span>

//                 </button>


//                 <button
//                   onClick={
//                     handleLogout
//                   }
//                   className={`
//                     ${styles.dropdownItem}
//                     ${styles.logoutItem}
//                   `}
//                 >

//                   <LogOut
//                     size={19}
//                   />

//                   <span>
//                     {t('logout')}
//                   </span>

//                 </button>

//               </div>

//             )}

//           </div>

//         </div>

//       </header>


//       {/* ========================================================
//           CART DRAWER
//       ======================================================== */}

//       <CartDrawer
//         cart={cart}
//         setCart={setCart}
//         isOpen={cartOpen}
//         onClose={() =>
//           setCartOpen(false)
//         }
//       />

//     </>
//   );
// };


// export default DashboardTopbar;

























// // src/components/DashboardTopbar.jsx

// import React, {
//   useState,
//   useRef,
//   useEffect
// } from "react";

// import { Link } from "react-router-dom";

// import {
//   Menu,
//   Bell,
//   Globe,
//   User,
//   ChevronDown,
//   LogOut,
//   Settings,
//   HelpCircle,
//   UserCircle,
//   Check,
//   Play,
//   ShoppingCart,
//   Sprout
// } from "lucide-react";

// import Cookies from "js-cookie";

// import {
//   useTranslation
// } from "react-i18next";

// import {
//   useDemo
// } from "../context/DemoContext";

// import api from "../api";

// import CartDrawer
//   from "../pages/CartDrawer";

// import styles
//   from "./DashboardTopbar.module.css";


// const DashboardTopbar = ({
//   onMenuClick
// }) => {

//   const {
//     t,
//     i18n
//   } = useTranslation();

//   const {
//     startDemo
//   } = useDemo();


//   // ==========================================================
//   // STATE
//   // ==========================================================

//   const [
//     notifications,
//     setNotifications
//   ] = useState(3);

//   const [
//     profileOpen,
//     setProfileOpen
//   ] = useState(false);

//   const [
//     notifOpen,
//     setNotifOpen
//   ] = useState(false);

//   const [
//     langOpen,
//     setLangOpen
//   ] = useState(false);

//   const [
//     cartOpen,
//     setCartOpen
//   ] = useState(false);

//   const [
//     cart,
//     setCart
//   ] = useState([]);


//   // ==========================================================
//   // REFS
//   // ==========================================================

//   const profileRef =
//     useRef(null);

//   const notifRef =
//     useRef(null);

//   const langRef =
//     useRef(null);


//   // ==========================================================
//   // USER
//   // ==========================================================

//   const user =
//     Cookies.get("user")
//       ? JSON.parse(
//           Cookies.get("user")
//         )
//       : null;


//   // ==========================================================
//   // LANGUAGES
//   // ==========================================================

//   const languages = [

//     {
//       code: "en",
//       label: t("english"),
//       flag: "🇬🇧"
//     },

//     {
//       code: "hi",
//       label: t("hindi"),
//       flag: "🇮🇳"
//     },

//     {
//       code: "te",
//       label: t("telugu"),
//       flag: "🇮🇳"
//     }

//   ];


//   const currentLanguage =
//     languages.find(
//       lang =>
//         lang.code ===
//         i18n.language
//     ) || languages[0];


//   // ==========================================================
//   // FETCH CART
//   // ==========================================================

//   const fetchCart =
//     async () => {

//       try {

//         const {
//           data
//         } = await api.get(
//           "/cart"
//         );


//         const cleanedCart =
//           (data?.items || [])
//             .filter(
//               item =>
//                 item.productId
//             )
//             .map(
//               item => ({
//                 _id:
//                   item.productId._id,

//                 name:
//                   item.productId.name,

//                 price:
//                   item.productId.price,

//                 quantity:
//                   item.quantity
//               })
//             );


//         setCart(
//           cleanedCart
//         );


//         return cleanedCart;

//       } catch (error) {

//         console.error(
//           "Failed to fetch cart:",
//           error
//         );

//         return [];

//       }

//     };


//   // ==========================================================
//   // INITIAL CART + REAL-TIME UPDATE
//   // ==========================================================

//   useEffect(() => {

//     fetchCart();


//     const handleCartUpdate =
//       event => {

//         if (
//           event.detail &&
//           event.detail.cart
//         ) {

//           setCart(
//             event.detail.cart
//           );

//         } else {

//           fetchCart();

//         }

//       };


//     window.addEventListener(
//       "cart-updated",
//       handleCartUpdate
//     );


//     return () => {

//       window.removeEventListener(
//         "cart-updated",
//         handleCartUpdate
//       );

//     };

//   }, []);


//   // ==========================================================
//   // CLICK OUTSIDE
//   // ==========================================================

//   useEffect(() => {

//     const handleClickOutside =
//       event => {

//         if (
//           profileRef.current &&
//           !profileRef.current.contains(
//             event.target
//           )
//         ) {

//           setProfileOpen(false);

//         }


//         if (
//           notifRef.current &&
//           !notifRef.current.contains(
//             event.target
//           )
//         ) {

//           setNotifOpen(false);

//         }


//         if (
//           langRef.current &&
//           !langRef.current.contains(
//             event.target
//           )
//         ) {

//           setLangOpen(false);

//         }

//       };


//     document.addEventListener(
//       "mousedown",
//       handleClickOutside
//     );


//     return () => {

//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );

//     };

//   }, []);


//   // ==========================================================
//   // LOGOUT
//   // ==========================================================

//   const handleLogout =
//     () => {

//       Cookies.remove(
//         "token"
//       );

//       Cookies.remove(
//         "user"
//       );

//       window.location.href =
//         "/login";

//     };


//   // ==========================================================
//   // LANGUAGE
//   // ==========================================================

//   const changeLanguage =
//     async langCode => {

//       await i18n.changeLanguage(
//         langCode
//       );


//       setLangOpen(false);


//       localStorage.setItem(
//         "preferred-language",
//         langCode
//       );

//     };


//   // ==========================================================
//   // GUIDED TOUR
//   // ==========================================================

//   const handleGuidedTour =
//     () => {

//       setProfileOpen(false);


//       localStorage.removeItem(
//         "farmxpert_tour_completed"
//       );

//       localStorage.removeItem(
//         "farmxpert_tour_skipped"
//       );


//       window.dispatchEvent(
//         new CustomEvent(
//           "start-guided-tour"
//         )
//       );

//     };


//   // ==========================================================
//   // OPEN CART
//   // ==========================================================

//   const openCart =
//     async () => {

//       const latestCart =
//         await fetchCart();


//       if (latestCart) {

//         setCart(
//           latestCart
//         );

//       }


//       setCartOpen(true);

//       setProfileOpen(false);

//       setNotifOpen(false);

//       setLangOpen(false);

//     };


//   // ==========================================================
//   // CART COUNT
//   // ==========================================================

//   const cartCount =
//     cart.reduce(
//       (
//         total,
//         item
//       ) =>
//         total +
//         Number(
//           item.quantity || 0
//         ),
//       0
//     );


//   // ==========================================================
//   // ADMIN
//   // ==========================================================

//   const isAdmin =
//     user?.role === "admin";


//   // ==========================================================
//   // RETURN
//   // ==========================================================

//   return (

//     <>

//       {/* ======================================================
//           TOPBAR
//           ====================================================== */}

//       <header
//         className={
//           styles.topbar
//         }
//       >

//         {/* ====================================================
//             LEFT SECTION
//             ==================================================== */}

//         <div
//           className={
//             styles.left
//           }
//         >

//           {/* MENU */}

//           <button
//             type="button"

//             onClick={
//               onMenuClick
//             }

//             className={
//               styles.menuBtn
//             }

//             aria-label={
//               t(
//                 "topbar.openMenu"
//               )
//             }
//           >

//             <Menu
//               size={22}
//             />

//           </button>


//           {/* BRAND */}

//           <div
//             className={
//               styles.brandArea
//             }
//           >

//             <div
//               className={
//                 styles.brandIcon
//               }
//             >

//               <Sprout
//                 size={20}
//                 strokeWidth={2.2}
//               />

//             </div>


//             <div
//               className={
//                 styles.brandText
//               }
//             >

//               <span
//                 className={
//                   styles.brandName
//                 }
//               >
//                 FarmXpert
//               </span>


//               <span
//                 className={
//                   styles.brandSubtitle
//                 }
//               >

//                 {t(
//                   "smart_agriculture"
//                 )}

//               </span>

//             </div>

//           </div>

//         </div>


//         {/* ====================================================
//             RIGHT SECTION
//             ==================================================== */}

//         <div
//           className={
//             styles.right
//           }
//         >

//           {/* ==================================================
//               GUIDED TOUR
//               ================================================== */}

//           {!isAdmin && (

//             <button
//               type="button"

//               onClick={
//                 handleGuidedTour
//               }

//               className={
//                 styles.tourBtn
//               }
//             >

//               <span
//                 className={
//                   styles.tourIcon
//                 }
//               >

//                 <Play
//                   size={14}
//                   fill="currentColor"
//                 />

//               </span>


//               <span
//                 className={
//                   styles.tourText
//                 }
//               >

//                 {t(
//                   "topbar.guidedTour"
//                 )}

//               </span>

//             </button>

//           )}


//           {/* DIVIDER */}

//           <span
//             className={
//               styles.actionDivider
//             }
//           />


//           {/* ==================================================
//               LANGUAGE
//               ================================================== */}

//           <div
//             className={
//               styles.langWrapper
//             }

//             ref={
//               langRef
//             }
//           >

//             <button
//               type="button"

//               className={
//                 styles.iconBtn
//               }

//               onClick={() =>
//                 setLangOpen(
//                   previous =>
//                     !previous
//                 )
//               }

//               aria-label={
//                 t(
//                   "topbar.changeLanguage"
//                 )
//               }
//             >

//               <Globe
//                 size={20}
//                 strokeWidth={1.9}
//               />


//               <span
//                 className={
//                   styles.langIndicator
//                 }
//               >

//                 {
//                   currentLanguage.flag
//                 }

//               </span>

//             </button>


//             {langOpen && (

//               <div
//                 className={
//                   styles.langDropdown
//                 }
//               >

//                 <div
//                   className={
//                     styles.dropdownTitle
//                   }
//                 >

//                   <div
//                     className={
//                       styles.dropdownTitleIcon
//                     }
//                   >

//                     <Globe
//                       size={17}
//                     />

//                   </div>


//                   <div>

//                     <p>

//                       {t(
//                         "topbar.selectLanguage"
//                       )}

//                     </p>


//                     <span>

//                       {t(
//                         "topbar.choosePreferredLanguage"
//                       )}

//                     </span>

//                   </div>

//                 </div>


//                 <div
//                   className={
//                     styles.langList
//                   }
//                 >

//                   {languages.map(
//                     lang => (

//                       <button
//                         type="button"

//                         key={
//                           lang.code
//                         }

//                         className={`
//                           ${styles.langOption}
//                           ${
//                             i18n.language ===
//                             lang.code
//                               ? styles.langActive
//                               : ""
//                           }
//                         `}

//                         onClick={() =>
//                           changeLanguage(
//                             lang.code
//                           )
//                         }
//                       >

//                         <span
//                           className={
//                             styles.langFlag
//                           }
//                         >

//                           {
//                             lang.flag
//                           }

//                         </span>


//                         <span
//                           className={
//                             styles.langLabel
//                           }
//                         >

//                           {
//                             lang.label
//                           }

//                         </span>


//                         {i18n.language ===
//                           lang.code && (

//                           <Check
//                             size={17}
//                             className={
//                               styles.langCheck
//                             }
//                           />

//                         )}

//                       </button>

//                     )
//                   )}

//                 </div>

//               </div>

//             )}

//           </div>


//           {/* ==================================================
//               CART
//               ================================================== */}

//           <button
//             type="button"

//             className={
//               styles.cartBtn
//             }

//             onClick={
//               openCart
//             }

//             aria-label={
//               t(
//                 "topbar.openCart"
//               )
//             }
//           >

//             <ShoppingCart
//               size={20}
//               strokeWidth={1.9}
//             />


//             {cartCount > 0 && (

//               <span
//                 className={
//                   styles.cartBadge
//                 }
//               >

//                 {
//                   cartCount > 99
//                     ? "99+"
//                     : cartCount
//                 }

//               </span>

//             )}

//           </button>


//           {/* ==================================================
//               NOTIFICATIONS
//               ================================================== */}

//           <div
//             className={
//               styles.notifWrapper
//             }

//             ref={
//               notifRef
//             }
//           >

//             <button
//               type="button"

//               className={
//                 styles.iconBtn
//               }

//               onClick={() =>
//                 setNotifOpen(
//                   previous =>
//                     !previous
//                 )
//               }

//               aria-label={
//                 t(
//                   "topbar.notifications"
//                 )
//               }
//             >

//               <Bell
//                 size={20}
//                 strokeWidth={1.9}
//               />


//               {notifications > 0 && (

//                 <span
//                   className={
//                     styles.notifBadge
//                   }
//                 >

//                   {
//                     notifications
//                   }

//                 </span>

//               )}

//             </button>


//             {notifOpen && (

//               <div
//                 className={
//                   styles.notifDropdown
//                 }
//               >

//                 <div
//                   className={
//                     styles.notifHeader
//                   }
//                 >

//                   <div>

//                     <p>

//                       {t(
//                         "topbar.notifications"
//                       )}

//                     </p>


//                     <span>

//                       {t(
//                         "topbar.recentUpdates"
//                       )}

//                     </span>

//                   </div>


//                   <button
//                     type="button"
//                   >

//                     {t(
//                       "topbar.markAllRead"
//                     )}

//                   </button>

//                 </div>


//                 <div
//                   className={
//                     styles.notifList
//                   }
//                 >

//                   {/* Notification 1 */}

//                   <div
//                     className={
//                       styles.notifItem
//                     }
//                   >

//                     <span
//                       className={
//                         styles.notifIcon
//                       }
//                     >
//                       🌾
//                     </span>


//                     <div>

//                       <p
//                         className={
//                           styles.notifText
//                         }
//                       >

//                         {t(
//                           "topbar.cropReadyHarvest"
//                         )}

//                       </p>


//                       <span
//                         className={
//                           styles.notifTime
//                         }
//                       >

//                         {t(
//                           "topbar.hoursAgo",
//                           {
//                             hours: 2
//                           }
//                         )}

//                       </span>

//                     </div>

//                   </div>


//                   {/* Notification 2 */}

//                   <div
//                     className={
//                       styles.notifItem
//                     }
//                   >

//                     <span
//                       className={
//                         styles.notifIcon
//                       }
//                     >
//                       ☁️
//                     </span>


//                     <div>

//                       <p
//                         className={
//                           styles.notifText
//                         }
//                       >

//                         {t(
//                           "topbar.weatherAlertHeavyRain"
//                         )}

//                       </p>


//                       <span
//                         className={
//                           styles.notifTime
//                         }
//                       >

//                         {t(
//                           "topbar.hoursAgo",
//                           {
//                             hours: 5
//                           }
//                         )}

//                       </span>

//                     </div>

//                   </div>


//                   {/* Notification 3 */}

//                   <div
//                     className={
//                       styles.notifItem
//                     }
//                   >

//                     <span
//                       className={
//                         styles.notifIcon
//                       }
//                     >
//                       🧪
//                     </span>


//                     <div>

//                       <p
//                         className={
//                           styles.notifText
//                         }
//                       >

//                         {t(
//                           "topbar.soilTestResultsAvailable"
//                         )}

//                       </p>


//                       <span
//                         className={
//                           styles.notifTime
//                         }
//                       >

//                         {t(
//                           "topbar.daysAgo",
//                           {
//                             days: 1
//                           }
//                         )}

//                       </span>

//                     </div>

//                   </div>

//                 </div>


//                 <Link
//                   to="/notifications"

//                   className={
//                     styles.notifViewAll
//                   }

//                   onClick={() =>
//                     setNotifOpen(
//                       false
//                     )
//                   }
//                 >

//                   {t(
//                     "topbar.viewAllNotifications"
//                   )}

//                 </Link>

//               </div>

//             )}

//           </div>


//           {/* VERTICAL DIVIDER */}

//           <span
//             className={
//               styles.profileDivider
//             }
//           />


//           {/* ==================================================
//               PROFILE
//               ================================================== */}

//           <div
//             className={
//               styles.profileWrapper
//             }

//             ref={
//               profileRef
//             }
//           >

//             <button
//               type="button"

//               className={
//                 styles.profileBtn
//               }

//               onClick={() =>
//                 setProfileOpen(
//                   previous =>
//                     !previous
//                 )
//               }
//             >

//               <div
//                 className={
//                   styles.avatar
//                 }
//               >

//                 {user?.name
//                   ? user.name
//                       .charAt(0)
//                       .toUpperCase()
//                   : (
//                     <User
//                       size={17}
//                     />
//                   )}

//               </div>


//               <div
//                 className={
//                   styles.profileInfo
//                 }
//               >

//                 <span
//                   className={
//                     styles.profileName
//                   }
//                 >

//                   {user?.name ||
//                     t(
//                       "topbar.farmer"
//                     )}

//                 </span>


//                 <span
//                   className={
//                     styles.profileRole
//                   }
//                 >

//                   {t(
//                     "topbar.farmer"
//                   )}

//                 </span>

//               </div>


//               <ChevronDown
//                 size={16}

//                 className={
//                   styles.profileChevron
//                 }
//               />

//             </button>


//             {/* ==================================================
//                 PROFILE DROPDOWN
//                 ================================================== */}

//             {profileOpen && (

//               <div
//                 className={
//                   styles.profileDropdown
//                 }
//               >

//                 {/* Profile header */}

//                 <div
//                   className={
//                     styles.profileHeader
//                   }
//                 >

//                   <div
//                     className={
//                       styles.profileAvatar
//                     }
//                   >

//                     {user?.name
//                       ? user.name
//                           .charAt(0)
//                           .toUpperCase()
//                       : (
//                         <User
//                           size={24}
//                         />
//                       )}

//                   </div>


//                   <div
//                     className={
//                       styles.profileHeaderInfo
//                     }
//                   >

//                     <p
//                       className={
//                         styles.profileHeaderName
//                       }
//                     >

//                       {user?.name ||
//                         t(
//                           "topbar.farmer"
//                         )}

//                     </p>


//                     <p
//                       className={
//                         styles.profileHeaderRole
//                       }
//                     >

//                       {t(
//                         "topbar.farmerAccount"
//                       )}

//                     </p>

//                   </div>

//                 </div>


//                 {/* My Profile */}

//                 <Link
//                   to="/profile"

//                   className={
//                     styles.dropdownItem
//                   }

//                   onClick={() =>
//                     setProfileOpen(
//                       false
//                     )
//                   }
//                 >

//                   <UserCircle
//                     size={19}
//                   />

//                   <span>

//                     {t(
//                       "topbar.myProfile"
//                     )}

//                   </span>

//                 </Link>


//                 {/* Settings */}

//                 <Link
//                   to="/settings"

//                   className={
//                     styles.dropdownItem
//                   }

//                   onClick={() =>
//                     setProfileOpen(
//                       false
//                     )
//                   }
//                 >

//                   <Settings
//                     size={19}
//                   />

//                   <span>

//                     {t(
//                       "topbar.settings"
//                     )}

//                   </span>

//                 </Link>


//                 {/* Guided Tour */}

//                 <button
//                   type="button"

//                   onClick={
//                     handleGuidedTour
//                   }

//                   className={
//                     styles.dropdownItem
//                   }
//                 >

//                   <HelpCircle
//                     size={19}
//                   />

//                   <span>

//                     {t(
//                       "topbar.guidedTour"
//                     )}

//                   </span>

//                 </button>


//                 {/* Logout */}

//                 <button
//                   type="button"

//                   onClick={
//                     handleLogout
//                   }

//                   className={`
//                     ${styles.dropdownItem}
//                     ${styles.logoutItem}
//                   `}
//                 >

//                   <LogOut
//                     size={19}
//                   />

//                   <span>

//                     {t(
//                       "topbar.logout"
//                     )}

//                   </span>

//                 </button>

//               </div>

//             )}

//           </div>

//         </div>

//       </header>


//       {/* ========================================================
//           CART DRAWER
//           ======================================================== */}

//       <CartDrawer
//         cart={cart}
//         setCart={setCart}
//         isOpen={cartOpen}

//         onClose={() =>
//           setCartOpen(false)
//         }
//       />

//     </>

//   );

// };


// export default DashboardTopbar;











// src/components/DashboardTopbar.jsx

import React, {
  useState,
  useRef,
  useEffect
} from "react";

import { Link } from "react-router-dom";

import {
  Menu,
  Globe,
  User,
  ChevronDown,
  LogOut,
  Settings,
  HelpCircle,
  UserCircle,
  Check,
  Play,
  ShoppingCart,
  Sprout
} from "lucide-react";

import Cookies from "js-cookie";

import {
  useTranslation
} from "react-i18next";

import {
  useDemo
} from "../context/DemoContext";

import api from "../api";

import CartDrawer
  from "../pages/CartDrawer";

import styles
  from "./DashboardTopbar.module.css";


const DashboardTopbar = ({
  onMenuClick
}) => {

  const {
    t,
    i18n
  } = useTranslation();

  const {
    startDemo
  } = useDemo();


  // ==========================================================
  // STATE
  // ==========================================================

  const [
    profileOpen,
    setProfileOpen
  ] = useState(false);

  const [
    langOpen,
    setLangOpen
  ] = useState(false);

  const [
    cartOpen,
    setCartOpen
  ] = useState(false);

  const [
    cart,
    setCart
  ] = useState([]);


  // ==========================================================
  // REFS
  // ==========================================================

  const profileRef =
    useRef(null);

  const langRef =
    useRef(null);


  // ==========================================================
  // USER
  // ==========================================================

  const user =
    Cookies.get("user")
      ? JSON.parse(
          Cookies.get("user")
        )
      : null;


  // ==========================================================
  // LANGUAGES
  // ==========================================================

  const languages = [

    {
      code: "en",
      label: t("english"),
      flag: "🇬🇧"
    },

    {
      code: "hi",
      label: t("hindi"),
      flag: "🇮🇳"
    },

    {
      code: "te",
      label: t("telugu"),
      flag: "🇮🇳"
    }

  ];


  const currentLanguage =
    languages.find(
      lang =>
        lang.code ===
        i18n.language
    ) || languages[0];


  // ==========================================================
  // FETCH CART
  // ==========================================================

  const fetchCart =
    async () => {

      try {

        const {
          data
        } = await api.get(
          "/cart"
        );


        const cleanedCart =
          (data?.items || [])
            .filter(
              item =>
                item.productId
            )
            .map(
              item => ({
                _id:
                  item.productId._id,

                name:
                  item.productId.name,

                price:
                  item.productId.price,

                quantity:
                  item.quantity
              })
            );


        setCart(
          cleanedCart
        );


        return cleanedCart;

      } catch (error) {

        console.error(
          "Failed to fetch cart:",
          error
        );

        return [];

      }

    };


  // ==========================================================
  // INITIAL CART + REAL-TIME UPDATE
  // ==========================================================

  useEffect(() => {

    fetchCart();


    const handleCartUpdate =
      event => {

        if (
          event.detail &&
          event.detail.cart
        ) {

          setCart(
            event.detail.cart
          );

        } else {

          fetchCart();

        }

      };


    window.addEventListener(
      "cart-updated",
      handleCartUpdate
    );


    return () => {

      window.removeEventListener(
        "cart-updated",
        handleCartUpdate
      );

    };

  }, []);


  // ==========================================================
  // CLICK OUTSIDE
  // ==========================================================

  useEffect(() => {

    const handleClickOutside =
      event => {

        if (
          profileRef.current &&
          !profileRef.current.contains(
            event.target
          )
        ) {

          setProfileOpen(false);

        }


        if (
          langRef.current &&
          !langRef.current.contains(
            event.target
          )
        ) {

          setLangOpen(false);

        }

      };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout =
    () => {

      Cookies.remove(
        "token"
      );

      Cookies.remove(
        "user"
      );

      window.location.href =
        "/login";

    };


  // ==========================================================
  // LANGUAGE
  // ==========================================================

  const changeLanguage =
    async langCode => {

      await i18n.changeLanguage(
        langCode
      );

      setLangOpen(false);

      localStorage.setItem(
        "preferred-language",
        langCode
      );

    };


  // ==========================================================
  // GUIDED TOUR
  // ==========================================================

  const handleGuidedTour =
    () => {

      setProfileOpen(false);

      localStorage.removeItem(
        "farmxpert_tour_completed"
      );

      localStorage.removeItem(
        "farmxpert_tour_skipped"
      );

      window.dispatchEvent(
        new CustomEvent(
          "start-guided-tour"
        )
      );

    };


  // ==========================================================
  // OPEN CART
  // ==========================================================

  const openCart =
    async () => {

      const latestCart =
        await fetchCart();


      if (latestCart) {

        setCart(
          latestCart
        );

      }


      setCartOpen(true);

      setProfileOpen(false);

      setLangOpen(false);

    };


  // ==========================================================
  // CART COUNT
  // ==========================================================

  const cartCount =
    cart.reduce(
      (
        total,
        item
      ) =>
        total +
        Number(
          item.quantity || 0
        ),
      0
    );


  // ==========================================================
  // ADMIN
  // ==========================================================

  const isAdmin =
    user?.role === "admin";


  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <>

      {/* ======================================================
          TOPBAR
          ====================================================== */}

      <header
        className={
          styles.topbar
        }
      >

        {/* ====================================================
            LEFT SECTION
            ==================================================== */}

        <div
          className={
            styles.left
          }
        >

          {/* MENU */}

          <button
            type="button"

            onClick={
              onMenuClick
            }

            className={
              styles.menuBtn
            }

            aria-label={
              t(
                "topbar.openMenu"
              )
            }
          >

            <Menu
              size={22}
            />

          </button>


          {/* BRAND */}

          <div
            className={
              styles.brandArea
            }
          >

            <div
              className={
                styles.brandIcon
              }
            >

              <Sprout
                size={20}
                strokeWidth={2.2}
              />

            </div>


            <div
              className={
                styles.brandText
              }
            >

              <span
                className={
                  styles.brandName
                }
              >

                FarmXpert

              </span>


              <span
                className={
                  styles.brandSubtitle
                }
              >

                {t(
                  "smart_agriculture"
                )}

              </span>

            </div>

          </div>

        </div>


        {/* ====================================================
            RIGHT SECTION
            ==================================================== */}

        <div
          className={
            styles.right
          }
        >

          {/* ==================================================
              GUIDED TOUR
              ================================================== */}

          {!isAdmin && (

            <button
              type="button"

              onClick={
                handleGuidedTour
              }

              className={
                styles.tourBtn
              }
            >

              <span
                className={
                  styles.tourIcon
                }
              >

                <Play
                  size={14}
                  fill="currentColor"
                />

              </span>


              <span
                className={
                  styles.tourText
                }
              >

                {t(
                  "topbar.guidedTour"
                )}

              </span>

            </button>

          )}


          {/* DIVIDER */}

          <span
            className={
              styles.actionDivider
            }
          />


          {/* ==================================================
              LANGUAGE
              ================================================== */}

          <div
            className={
              styles.langWrapper
            }

            ref={
              langRef
            }
          >

            <button
              type="button"

              className={
                styles.iconBtn
              }

              onClick={() =>
                setLangOpen(
                  previous =>
                    !previous
                )
              }

              aria-label={
                t(
                  "topbar.changeLanguage"
                )
              }
            >

              <Globe
                size={20}
                strokeWidth={1.9}
              />


              <span
                className={
                  styles.langIndicator
                }
              >

                {
                  currentLanguage.flag
                }

              </span>

            </button>


            {langOpen && (

              <div
                className={
                  styles.langDropdown
                }
              >

                <div
                  className={
                    styles.dropdownTitle
                  }
                >

                  <div
                    className={
                      styles.dropdownTitleIcon
                    }
                  >

                    <Globe
                      size={17}
                    />

                  </div>


                  <div>

                    <p>

                      {t(
                        "topbar.selectLanguage"
                      )}

                    </p>


                    <span>

                      {t(
                        "topbar.choosePreferredLanguage"
                      )}

                    </span>

                  </div>

                </div>


                <div
                  className={
                    styles.langList
                  }
                >

                  {languages.map(
                    lang => (

                      <button
                        type="button"

                        key={
                          lang.code
                        }

                        className={`
                          ${styles.langOption}
                          ${
                            i18n.language ===
                            lang.code
                              ? styles.langActive
                              : ""
                          }
                        `}

                        onClick={() =>
                          changeLanguage(
                            lang.code
                          )
                        }
                      >

                        <span
                          className={
                            styles.langFlag
                          }
                        >

                          {
                            lang.flag
                          }

                        </span>


                        <span
                          className={
                            styles.langLabel
                          }
                        >

                          {
                            lang.label
                          }

                        </span>


                        {i18n.language ===
                          lang.code && (

                          <Check
                            size={17}
                            className={
                              styles.langCheck
                            }
                          />

                        )}

                      </button>

                    )
                  )}

                </div>

              </div>

            )}

          </div>


          {/* ==================================================
              CART
              ================================================== */}

          <button
            type="button"

            className={
              styles.cartBtn
            }

            onClick={
              openCart
            }

            aria-label={
              t(
                "topbar.openCart"
              )
            }
          >

            <ShoppingCart
              size={20}
              strokeWidth={1.9}
            />


            {cartCount > 0 && (

              <span
                className={
                  styles.cartBadge
                }
              >

                {
                  cartCount > 99
                    ? "99+"
                    : cartCount
                }

              </span>

            )}

          </button>


          {/* ==================================================
              VERTICAL DIVIDER
              ================================================== */}

          <span
            className={
              styles.profileDivider
            }
          />


          {/* ==================================================
              PROFILE
              ================================================== */}

          <div
            className={
              styles.profileWrapper
            }

            ref={
              profileRef
            }
          >

            <button
              type="button"

              className={
                styles.profileBtn
              }

              onClick={() =>
                setProfileOpen(
                  previous =>
                    !previous
                )
              }
            >

              <div
                className={
                  styles.avatar
                }
              >

                {user?.name
                  ? user.name
                      .charAt(0)
                      .toUpperCase()
                  : (
                    <User
                      size={17}
                    />
                  )}

              </div>


              <div
                className={
                  styles.profileInfo
                }
              >

                <span
                  className={
                    styles.profileName
                  }
                >

                  {user?.name ||
                    t(
                      "topbar.farmer"
                    )}

                </span>


                <span
                  className={
                    styles.profileRole
                  }
                >

                  {t(
                    "topbar.farmer"
                  )}

                </span>

              </div>


              <ChevronDown
                size={16}

                className={
                  styles.profileChevron
                }
              />

            </button>


            {/* ==================================================
                PROFILE DROPDOWN
                ================================================== */}

            {profileOpen && (

              <div
                className={
                  styles.profileDropdown
                }
              >

                {/* Profile header */}

                <div
                  className={
                    styles.profileHeader
                  }
                >

                  <div
                    className={
                      styles.profileAvatar
                    }
                  >

                    {user?.name
                      ? user.name
                          .charAt(0)
                          .toUpperCase()
                      : (
                        <User
                          size={24}
                        />
                      )}

                  </div>


                  <div
                    className={
                      styles.profileHeaderInfo
                    }
                  >

                    <p
                      className={
                        styles.profileHeaderName
                      }
                    >

                      {user?.name ||
                        t(
                          "topbar.farmer"
                        )}

                    </p>


                    <p
                      className={
                        styles.profileHeaderRole
                      }
                    >

                      {t(
                        "topbar.farmerAccount"
                      )}

                    </p>

                  </div>

                </div>


                {/* My Profile */}

                <Link
                  to="/profile"

                  className={
                    styles.dropdownItem
                  }

                  onClick={() =>
                    setProfileOpen(
                      false
                    )
                  }
                >

                  <UserCircle
                    size={19}
                  />

                  <span>

                    {t(
                      "topbar.myProfile"
                    )}

                  </span>

                </Link>


                {/* Settings */}

                <Link
                  to="/settings"

                  className={
                    styles.dropdownItem
                  }

                  onClick={() =>
                    setProfileOpen(
                      false
                    )
                  }
                >

                  <Settings
                    size={19}
                  />

                  <span>

                    {t(
                      "topbar.settings"
                    )}

                  </span>

                </Link>


                {/* Guided Tour */}

                <button
                  type="button"

                  onClick={
                    handleGuidedTour
                  }

                  className={
                    styles.dropdownItem
                  }
                >

                  <HelpCircle
                    size={19}
                  />

                  <span>

                    {t(
                      "topbar.guidedTour"
                    )}

                  </span>

                </button>


                {/* Logout */}

                <button
                  type="button"

                  onClick={
                    handleLogout
                  }

                  className={`
                    ${styles.dropdownItem}
                    ${styles.logoutItem}
                  `}
                >

                  <LogOut
                    size={19}
                  />

                  <span>

                    {t(
                      "topbar.logout"
                    )}

                  </span>

                </button>

              </div>

            )}

          </div>

        </div>

      </header>


      {/* ========================================================
          CART DRAWER
          ======================================================== */}

      <CartDrawer
        cart={cart}
        setCart={setCart}
        isOpen={cartOpen}

        onClose={() =>
          setCartOpen(false)
        }
      />

    </>

  );

};


export default DashboardTopbar;