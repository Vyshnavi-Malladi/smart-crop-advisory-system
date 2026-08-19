// // DashboardSidebar.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Sprout, 
//   TrendingUp, 
//   AlertCircle, 
//   Cloud, 
//   Wheat, 
//   FlaskConical, 
//   BarChart3, 
//   Store, 
//   User, 
//   Settings, 
//   HelpCircle,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';
// import styles from './DashboardSidebar.module.css';

// const DashboardSidebar = ({ isOpen }) => {
//   const navItems = [
//     { 
//       category: 'MAIN',
//       items: [
//         { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' }
//       ]
//     },
//     {
//       category: 'FARM INTELLIGENCE',
//       items: [
//         { icon: Sprout, label: 'Crop Consult', path: '/crop-recommend' },
//         { icon: TrendingUp, label: 'Yield Forecast', path: '/yield-predict' },
//         { icon: AlertCircle, label: 'Disease Lab', path: '/disease-detect' },
//         { icon: Cloud, label: 'Weather', path: '/weather' }
//       ]
//     },
//     {
//       category: 'FARM MANAGEMENT',
//       items: [
//         { icon: Wheat, label: 'My Crops', path: '/my-crops' },
//         { icon: FlaskConical, label: 'Soil Testing', path: '/soil-centers' },
//         { icon: BarChart3, label: 'Market Prices', path: '/market' }
//       ]
//     },
//     {
//       category: 'MARKETPLACE',
//       items: [
//         { icon: Store, label: 'Farm Store', path: '/store' }
//       ]
//     }
//   ];

//   const bottomItems = [
//     { icon: User, label: 'My Profile', path: '/profile' },
//     { icon: Settings, label: 'Settings', path: '/settings' },
//     { icon: HelpCircle, label: 'Help', path: '/help' }
//   ];

//   return (
//     <aside className={`${styles.sidebar} ${!isOpen ? styles.collapsed : ''}`}>
//       <div className={styles.sidebarHeader}>
//         <div className={styles.logo}>
//           <span className={styles.logoIcon}>🌱</span>
//           {isOpen && <span className={styles.logoText}>Farm<span className={styles.logoHighlight}>Xpert</span></span>}
//         </div>
//       </div>

//       <nav className={styles.nav}>
//         {navItems.map((category, idx) => (
//           <div key={idx} className={styles.navCategory}>
//             {isOpen && <span className={styles.categoryLabel}>{category.category}</span>}
//             {category.items.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) => 
//                   `${styles.navItem} ${isActive ? styles.active : ''}`
//                 }
//               >
//                 <item.icon size={20} className={styles.navIcon} />
//                 {isOpen && <span className={styles.navLabel}>{item.label}</span>}
//               </NavLink>
//             ))}
//           </div>
//         ))}

//         <div className={styles.navDivider}></div>

//         {bottomItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) => 
//               `${styles.navItem} ${isActive ? styles.active : ''}`
//             }
//           >
//             <item.icon size={20} className={styles.navIcon} />
//             {isOpen && <span className={styles.navLabel}>{item.label}</span>}
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default DashboardSidebar;











// // src/components/DashboardSidebar.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Sprout, 
//   TrendingUp, 
//   AlertCircle, 
//   Cloud, 
//   Wheat, 
//   FlaskConical, 
//   BarChart3, 
//   Store, 
//   User, 
//   Settings, 
//   HelpCircle,
//   X
// } from 'lucide-react';
// import styles from './DashboardSidebar.module.css';

// const DashboardSidebar = ({ isOpen, mobileOpen, onClose }) => {
//   const navItems = [
//     { 
//       category: 'MAIN',
//       items: [
//         { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', tour: 'dashboard' }
//       ]
//     },
//     {
//       category: 'FARM INTELLIGENCE',
//       items: [
//         { icon: Sprout, label: 'Crop Consult', path: '/crop-recommend', tour: 'crop-consult' },
//         { icon: TrendingUp, label: 'Yield Forecast', path: '/yield-predict', tour: 'yield-forecast' },
//         { icon: AlertCircle, label: 'Disease Lab', path: '/disease-detect', tour: 'disease-lab' },
//         { icon: Cloud, label: 'Weather', path: '/weather' }
//       ]
//     },
//     {
//       category: 'FARM MANAGEMENT',
//       items: [
//         { icon: Wheat, label: 'My Crops', path: '/my-crops' },
//         { icon: FlaskConical, label: 'Soil Testing', path: '/soil-centers' },
//         { icon: BarChart3, label: 'Market Prices', path: '/market' }
//       ]
//     },
//     {
//       category: 'MARKETPLACE',
//       items: [
//         { icon: Store, label: 'Farm Store', path: '/store', tour: 'farm-store' }
//       ]
//     }
//   ];

//   const bottomItems = [
//     { icon: User, label: 'My Profile', path: '/profile' },
//     { icon: Settings, label: 'Settings', path: '/settings' },
//     { icon: HelpCircle, label: 'Help', path: '/help' }
//   ];

//   const sidebarClasses = `
//     ${styles.sidebar} 
//     ${!isOpen ? styles.collapsed : ''} 
//     ${mobileOpen ? styles.mobileOpen : ''}
//   `;

//   return (
//     <>
//       {/* Mobile overlay */}
//       {mobileOpen && (
//         <div className={styles.overlay} onClick={onClose}></div>
//       )}
      
//       <aside className={sidebarClasses}>
//         <div className={styles.sidebarHeader}>
//           <div className={styles.logo}>
//             <span className={styles.logoIcon}>🌱</span>
//             {isOpen && <span className={styles.logoText}>Farm<span className={styles.logoHighlight}>Xpert</span></span>}
//           </div>
//           {mobileOpen && (
//             <button className={styles.closeBtn} onClick={onClose}>
//               <X size={20} />
//             </button>
//           )}
//         </div>

//         <nav className={styles.nav}>
//           {navItems.map((category, idx) => (
//             <div key={idx} className={styles.navCategory}>
//               {isOpen && <span className={styles.categoryLabel}>{category.category}</span>}
//               {category.items.map((item) => (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   data-tour={item.tour || ''}
//                   className={({ isActive }) => 
//                     `${styles.navItem} ${isActive ? styles.active : ''}`
//                   }
//                   onClick={onClose}
//                 >
//                   <item.icon size={20} className={styles.navIcon} />
//                   {isOpen && <span className={styles.navLabel}>{item.label}</span>}
//                 </NavLink>
//               ))}
//             </div>
//           ))}

//           <div className={styles.navDivider}></div>

//           {bottomItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) => 
//                 `${styles.navItem} ${isActive ? styles.active : ''}`
//               }
//               onClick={onClose}
//             >
//               <item.icon size={20} className={styles.navIcon} />
//               {isOpen && <span className={styles.navLabel}>{item.label}</span>}
//             </NavLink>
//           ))}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default DashboardSidebar;












// // src/components/DashboardSidebar.jsx

// import React from 'react';
// import { NavLink } from 'react-router-dom';

// import {
//   LayoutDashboard,
//   Sprout,
//   TrendingUp,
//   AlertCircle,
//   Cloud,
//   Wheat,
//   FlaskConical,
//   BarChart3,
//   Store,
//   User,
//   Settings,
//   HelpCircle,
//   X
// } from 'lucide-react';

// import styles from './DashboardSidebar.module.css';

// const DashboardSidebar = ({
//   isOpen,
//   mobileOpen,
//   onClose
// }) => {

//   // ==========================================
//   // MAIN NAVIGATION
//   // ==========================================

//   const navItems = [

//     // ------------------------------------------
//     // MAIN
//     // ------------------------------------------

//     {
//       category: 'MAIN',

//       items: [
//         {
//           icon: LayoutDashboard,
//           label: 'Dashboard',
//           path: '/dashboard',

//           // IMPORTANT:
//           // Guided Tour will highlight this item
//           tour: 'dashboard'
//         }
//       ]
//     },

//     // ------------------------------------------
//     // FARM INTELLIGENCE
//     // ------------------------------------------

//     {
//       category: 'FARM INTELLIGENCE',

//       items: [

//         {
//           icon: Sprout,
//           label: 'Crop Consult',
//           path: '/crop-recommend',
//           tour: 'crop-consult'
//         },

//         {
//           icon: TrendingUp,
//           label: 'Yield Forecast',
//           path: '/yield-predict',
//           tour: 'yield-forecast'
//         },

//         {
//           icon: AlertCircle,
//           label: 'Disease Lab',
//           path: '/disease-detect',
//           tour: 'disease-lab'
//         },

//         {
//           icon: Cloud,
//           label: 'Weather',
//           path: '/weather'
//         }

//       ]
//     },

//     // ------------------------------------------
//     // FARM MANAGEMENT
//     // ------------------------------------------

//     {
//       category: 'FARM MANAGEMENT',

//       items: [

//         {
//           icon: Wheat,
//           label: 'My Crops',
//           path: '/my-crops'
//         },

//         {
//           icon: FlaskConical,
//           label: 'Soil Testing',
//           path: '/soil-centers'
//         },

//         {
//           icon: BarChart3,
//           label: 'Market Prices',
//           path: '/market'
//         }

//       ]
//     },

//     // ------------------------------------------
//     // MARKETPLACE
//     // ------------------------------------------

//     {
//       category: 'MARKETPLACE',

//       items: [

//         {
//           icon: Store,
//           label: 'Farm Store',
//           path: '/store',
//           tour: 'farm-store'
//         }

//       ]
//     }

//   ];

//   // ==========================================
//   // BOTTOM NAVIGATION
//   // ==========================================

//   const bottomItems = [

//     {
//       icon: User,
//       label: 'My Profile',
//       path: '/profile'
//     },

//     {
//       icon: Settings,
//       label: 'Settings',
//       path: '/settings'
//     },

//     {
//       icon: HelpCircle,
//       label: 'Help',
//       path: '/help'
//     }

//   ];

//   // ==========================================
//   // SIDEBAR CLASSES
//   // ==========================================

//   const sidebarClasses = `
//     ${styles.sidebar}
//     ${!isOpen ? styles.collapsed : ''}
//     ${mobileOpen ? styles.mobileOpen : ''}
//   `;

//   // ==========================================
//   // RENDER
//   // ==========================================

//   return (
//     <>
//       {/* ======================================
//           MOBILE OVERLAY
//       ====================================== */}

//       {mobileOpen && (
//         <div
//           className={styles.overlay}
//           onClick={onClose}
//           aria-hidden="true"
//         />
//       )}

//       {/* ======================================
//           SIDEBAR
//       ====================================== */}

//       <aside className={sidebarClasses}>

//         {/* ====================================
//             HEADER
//         ==================================== */}

//         <div className={styles.sidebarHeader}>

//           <div className={styles.logo}>

//             <span className={styles.logoIcon}>
//               🌱
//             </span>

//             {isOpen && (
//               <span className={styles.logoText}>
//                 Farm
//                 <span className={styles.logoHighlight}>
//                   Xpert
//                 </span>
//               </span>
//             )}

//           </div>

//           {/* Mobile Close Button */}

//           {mobileOpen && (
//             <button
//               type="button"
//               className={styles.closeBtn}
//               onClick={onClose}
//               aria-label="Close sidebar"
//             >
//               <X size={20} />
//             </button>
//           )}

//         </div>

//         {/* ====================================
//             NAVIGATION
//         ==================================== */}

//         <nav
//           className={styles.nav}
//           aria-label="FarmXpert navigation"
//         >

//           {/* ==================================
//               MAIN NAVIGATION
//           ================================== */}

//           {navItems.map((category) => (

//             <div
//               key={category.category}
//               className={styles.navCategory}
//             >

//               {/* Category Title */}

//               {isOpen && (
//                 <span className={styles.categoryLabel}>
//                   {category.category}
//                 </span>
//               )}

//               {/* Category Items */}

//               {category.items.map((item) => {

//                 const Icon = item.icon;

//                 return (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}

//                     /*
//                       Guided Tour Target

//                       Examples:
//                       data-tour="dashboard"
//                       data-tour="crop-consult"
//                       data-tour="disease-lab"
//                       data-tour="yield-forecast"
//                       data-tour="farm-store"
//                     */

//                     {...(
//                       item.tour
//                         ? {
//                             'data-tour': item.tour
//                           }
//                         : {}
//                     )}

//                     className={({ isActive }) =>
//                       `${styles.navItem} ${
//                         isActive
//                           ? styles.active
//                           : ''
//                       }`
//                     }

//                     onClick={onClose}
//                   >

//                     <Icon
//                       size={20}
//                       className={styles.navIcon}
//                     />

//                     {isOpen && (
//                       <span className={styles.navLabel}>
//                         {item.label}
//                       </span>
//                     )}

//                   </NavLink>
//                 );
//               })}

//             </div>

//           ))}

//           {/* ==================================
//               DIVIDER
//           ================================== */}

//           <div className={styles.navDivider} />

//           {/* ==================================
//               ACCOUNT NAVIGATION
//           ================================== */}

//           {bottomItems.map((item) => {

//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}

//                 className={({ isActive }) =>
//                   `${styles.navItem} ${
//                     isActive
//                       ? styles.active
//                       : ''
//                   }`
//                 }

//                 onClick={onClose}
//               >

//                 <Icon
//                   size={20}
//                   className={styles.navIcon}
//                 />

//                 {isOpen && (
//                   <span className={styles.navLabel}>
//                     {item.label}
//                   </span>
//                 )}

//               </NavLink>
//             );

//           })}

//         </nav>

//       </aside>
//     </>
//   );
// };

// export default DashboardSidebar;















// // src/components/DashboardSidebar.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Sprout,
//   TrendingUp,
//   AlertCircle,
//   Cloud,
//   FlaskConical,
//   Store,
//   User,
//   Settings,
//   HelpCircle,
//   X,
//   Sparkles
// } from 'lucide-react';
// import styles from './DashboardSidebar.module.css';

// const DashboardSidebar = ({
//   isOpen,
//   mobileOpen,
//   onClose
// }) => {

//   const navItems = [
//     {
//       category: 'MAIN',
//       items: [
//         {
//           icon: LayoutDashboard,
//           label: 'Dashboard',
//           path: '/dashboard',
//           tour: 'dashboard'
//         }
//       ]
//     },
//     {
//       category: 'FARM INTELLIGENCE',
//       items: [
//         {
//           icon: Sprout,
//           label: 'Crop Consult',
//           path: '/crop-recommend',
//           tour: 'crop-consult'
//         },
//         {
//           icon: TrendingUp,
//           label: 'Yield Forecast',
//           path: '/yield-predict',
//           tour: 'yield-forecast'
//         },
//         {
//           icon: AlertCircle,
//           label: 'Disease Lab',
//           path: '/disease-detect',
//           tour: 'disease-lab'
//         },
//         {
//           icon: Cloud,
//           label: 'Weather',
//           path: '/weather'
//         }
//       ]
//     },
//     {
//       category: 'FARM MANAGEMENT',
//       items: [
//         {
//           icon: FlaskConical,
//           label: 'Soil Testing',
//           path: '/soil-centers'
//         }
//       ]
//     },
//     {
//       category: 'MARKETPLACE',
//       items: [
//         {
//           icon: Store,
//           label: 'Farm Store',
//           path: '/store',
//           tour: 'farm-store'
//         }
//       ]
//     }
//   ];

//   const bottomItems = [
//     {
//       icon: User,
//       label: 'My Profile',
//       path: '/profile'
//     },
//     {
//       icon: Settings,
//       label: 'Settings',
//       path: '/settings'
//     },
//     {
//       icon: HelpCircle,
//       label: 'Help',
//       path: '/help'
//     }
//   ];

//   const sidebarClasses = `
//     ${styles.sidebar}
//     ${!isOpen ? styles.collapsed : ''}
//     ${mobileOpen ? styles.mobileOpen : ''}
//   `;

//   return (
//     <>
//       {mobileOpen && (
//         <div
//           className={styles.overlay}
//           onClick={onClose}
//           aria-hidden="true"
//         />
//       )}

//       <aside className={sidebarClasses}>
//         <div className={styles.sidebarHeader}>
//           <div className={styles.logo}>
//             <span className={styles.logoIcon}>
//               🌱
//             </span>
//             {isOpen && (
//               <span className={styles.logoText}>
//                 Farm
//                 <span className={styles.logoHighlight}>
//                   Xpert
//                 </span>
//               </span>
//             )}
//           </div>
//           {mobileOpen && (
//             <button
//               type="button"
//               className={styles.closeBtn}
//               onClick={onClose}
//               aria-label="Close sidebar"
//             >
//               <X size={20} />
//             </button>
//           )}
//         </div>

//         <nav className={styles.nav} aria-label="FarmXpert navigation">
//           {navItems.map((category) => (
//             <div key={category.category} className={styles.navCategory}>
//               {isOpen && (
//                 <span className={styles.categoryLabel}>
//                   {category.category}
//                 </span>
//               )}
//               {category.items.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}
//                     {...(item.tour ? { 'data-tour': item.tour } : {})}
//                     className={({ isActive }) =>
//                       `${styles.navItem} ${isActive ? styles.active : ''}`
//                     }
//                     onClick={onClose}
//                   >
//                     <Icon size={20} className={styles.navIcon} />
//                     {isOpen && (
//                       <span className={styles.navLabel}>
//                         {item.label}
//                       </span>
//                     )}
//                   </NavLink>
//                 );
//               })}
//             </div>
//           ))}

//           <div className={styles.navDivider} />

//           {bottomItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `${styles.navItem} ${isActive ? styles.active : ''}`
//                 }
//                 onClick={onClose}
//               >
//                 <Icon size={20} className={styles.navIcon} />
//                 {isOpen && (
//                   <span className={styles.navLabel}>
//                     {item.label}
//                   </span>
//                 )}
//               </NavLink>
//             );
//           })}

          
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default DashboardSidebar;


















// // src/components/DashboardSidebar.jsx

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Sprout,
//   TrendingUp,
//   AlertCircle,
//   Cloud,
//   FlaskConical,
//   Store,
//   User,
//   Settings,
//   HelpCircle,
//   X
// } from 'lucide-react';

// import styles from './DashboardSidebar.module.css';

// const DashboardSidebar = ({
//   isOpen,
//   mobileOpen,
//   onClose
// }) => {

//   const navItems = [
//     {
//       category: 'MAIN',
//       items: [
//         {
//           icon: LayoutDashboard,
//           label: 'Dashboard',
//           path: '/dashboard',
//           tour: 'dashboard'
//         }
//       ]
//     },

//     {
//       category: 'FARM INTELLIGENCE',
//       items: [
//         {
//           icon: Sprout,
//           label: 'Crop Consult',
//           path: '/crop-recommend',
//           tour: 'crop-consult'
//         },
//         {
//           icon: TrendingUp,
//           label: 'Yield Forecast',
//           path: '/yield-predict',
//           tour: 'yield-forecast'
//         },
//         {
//           icon: AlertCircle,
//           label: 'Disease Lab',
//           path: '/disease-detect',
//           tour: 'disease-lab'
//         },

//         // WEATHER NOW OPENS DASHBOARD
//         {
//           icon: Cloud,
//           label: 'Weather',
//           path: '/dashboard'
//         }
//       ]
//     },

//     {
//       category: 'FARM MANAGEMENT',
//       items: [
//         {
//           icon: FlaskConical,
//           label: 'Soil Testing',
//           path: '/soil-centers'
//         }
//       ]
//     },

//     {
//       category: 'MARKETPLACE',
//       items: [
//         {
//           icon: Store,
//           label: 'Farm Store',
//           path: '/store',
//           tour: 'farm-store'
//         }
//       ]
//     }
//   ];


//   const bottomItems = [
//     {
//       icon: User,
//       label: 'My Profile',
//       path: '/profile'
//     },
//     {
//       icon: Settings,
//       label: 'Settings',
//       path: '/settings'
//     },
//     {
//       icon: HelpCircle,
//       label: 'Help',
//       path: '/help'
//     }
//   ];


//   const sidebarClasses = `
//     ${styles.sidebar}
//     ${!isOpen ? styles.collapsed : ''}
//     ${mobileOpen ? styles.mobileOpen : ''}
//   `;


//   return (
//     <>
//       {mobileOpen && (
//         <div
//           className={styles.overlay}
//           onClick={onClose}
//           aria-hidden="true"
//         />
//       )}


//       <aside className={sidebarClasses}>

//         {/* SIDEBAR HEADER */}

//         <div className={styles.sidebarHeader}>

//           <div className={styles.logo}>

//             <span className={styles.logoIcon}>
//               🌱
//             </span>

//             {isOpen && (
//               <span className={styles.logoText}>
//                 Farm
//                 <span className={styles.logoHighlight}>
//                   Xpert
//                 </span>
//               </span>
//             )}

//           </div>


//           {mobileOpen && (
//             <button
//               type="button"
//               className={styles.closeBtn}
//               onClick={onClose}
//               aria-label="Close sidebar"
//             >
//               <X size={20} />
//             </button>
//           )}

//         </div>


//         {/* NAVIGATION */}

//         <nav
//           className={styles.nav}
//           aria-label="FarmXpert navigation"
//         >

//           {navItems.map((category) => (

//             <div
//               key={category.category}
//               className={styles.navCategory}
//             >

//               {isOpen && (
//                 <span className={styles.categoryLabel}>
//                   {category.category}
//                 </span>
//               )}


//               {category.items.map((item) => {

//                 const Icon = item.icon;

//                 return (
//                   <NavLink
//                     key={item.label}
//                     to={item.path}

//                     {...(
//                       item.tour
//                         ? {
//                             'data-tour': item.tour
//                           }
//                         : {}
//                     )}

//                     className={({ isActive }) =>
//                       `${styles.navItem} ${
//                         isActive
//                           ? styles.active
//                           : ''
//                       }`
//                     }

//                     onClick={onClose}
//                   >

//                     <Icon
//                       size={20}
//                       className={styles.navIcon}
//                     />

//                     {isOpen && (
//                       <span className={styles.navLabel}>
//                         {item.label}
//                       </span>
//                     )}

//                   </NavLink>
//                 );

//               })}

//             </div>

//           ))}


//           {/* DIVIDER */}

//           <div className={styles.navDivider} />


//           {/* BOTTOM ITEMS */}

//           {bottomItems.map((item) => {

//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}

//                 className={({ isActive }) =>
//                   `${styles.navItem} ${
//                     isActive
//                       ? styles.active
//                       : ''
//                   }`
//                 }

//                 onClick={onClose}
//               >

//                 <Icon
//                   size={20}
//                   className={styles.navIcon}
//                 />

//                 {isOpen && (
//                   <span className={styles.navLabel}>
//                     {item.label}
//                   </span>
//                 )}

//               </NavLink>
//             );

//           })}

//         </nav>

//       </aside>
//     </>
//   );
// };


// export default DashboardSidebar;


















// // src/components/DashboardSidebar.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Sprout,
//   TrendingUp,
//   AlertCircle,
//   Cloud,
//   FlaskConical,
//   Store,
//   User,
//   Settings,
//   HelpCircle,
//   X
// } from 'lucide-react';

// import styles from './DashboardSidebar.module.css';

// const DashboardSidebar = ({
//   isOpen,
//   mobileOpen,
//   onClose
// }) => {

//   const navItems = [
//     {
//       category: 'MAIN',
//       items: [
//         {
//           icon: LayoutDashboard,
//           label: 'Dashboard',
//           path: '/dashboard',
//           tour: 'dashboard'
//         }
//       ]
//     },

//     {
//       category: 'FARM INTELLIGENCE',
//       items: [
//         {
//           icon: Sprout,
//           label: 'Crop Consult',
//           path: '/crop-recommend',
//           tour: 'crop-consult'
//         },
//         {
//           icon: TrendingUp,
//           label: 'Yield Forecast',
//           path: '/yield-predict',
//           tour: 'yield-forecast'
//         },
//         {
//           icon: AlertCircle,
//           label: 'Disease Lab',
//           path: '/disease-detect',
//           tour: 'disease-lab'
//         },

//         // WEATHER - added tour data
//         {
//   icon: Cloud,
//   label: 'Weather',
//   path: '/dashboard',
//   tour: 'weather-sidebar'
// }
//       ]
//     },

//     {
//       category: 'FARM MANAGEMENT',
//       items: [
//         {
//           icon: FlaskConical,
//           label: 'Soil Testing',
//           path: '/soil-centers',
//           tour: 'soil-testing'  // 👈 ADDED
//         }
//       ]
//     },

//     {
//       category: 'MARKETPLACE',
//       items: [
//         {
//           icon: Store,
//           label: 'Farm Store',
//           path: '/store',
//           tour: 'farm-store'
//         }
//       ]
//     }
//   ];


//   const bottomItems = [
//     {
//       icon: User,
//       label: 'My Profile',
//       path: '/profile'
//     },
//     {
//       icon: Settings,
//       label: 'Settings',
//       path: '/settings'
//     },
//     {
//       icon: HelpCircle,
//       label: 'Help',
//       path: '/help'
//     }
//   ];


//   const sidebarClasses = `
//     ${styles.sidebar}
//     ${!isOpen ? styles.collapsed : ''}
//     ${mobileOpen ? styles.mobileOpen : ''}
//   `;


//   return (
//     <>
//       {mobileOpen && (
//         <div
//           className={styles.overlay}
//           onClick={onClose}
//           aria-hidden="true"
//         />
//       )}


//       <aside className={sidebarClasses}>

//         {/* SIDEBAR HEADER */}

//         <div className={styles.sidebarHeader}>

//           <div className={styles.logo}>

//             <span className={styles.logoIcon}>
//               🌱
//             </span>

//             {isOpen && (
//               <span className={styles.logoText}>
//                 Farm
//                 <span className={styles.logoHighlight}>
//                   Xpert
//                 </span>
//               </span>
//             )}

//           </div>


//           {mobileOpen && (
//             <button
//               type="button"
//               className={styles.closeBtn}
//               onClick={onClose}
//               aria-label="Close sidebar"
//             >
//               <X size={20} />
//             </button>
//           )}

//         </div>


//         {/* NAVIGATION */}

//         <nav
//           className={styles.nav}
//           aria-label="FarmXpert navigation"
//         >

//           {navItems.map((category) => (

//             <div
//               key={category.category}
//               className={styles.navCategory}
//             >

//               {isOpen && (
//                 <span className={styles.categoryLabel}>
//                   {category.category}
//                 </span>
//               )}


//               {category.items.map((item) => {

//                 const Icon = item.icon;

//                 return (
//                   <NavLink
//                     key={item.label}
//                     to={item.path}

//                     {...(
//                       item.tour
//                         ? {
//                             'data-tour': item.tour
//                           }
//                         : {}
//                     )}

//                     className={({ isActive }) =>
//                       `${styles.navItem} ${
//                         isActive
//                           ? styles.active
//                           : ''
//                       }`
//                     }

//                     onClick={onClose}
//                   >

//                     <Icon
//                       size={20}
//                       className={styles.navIcon}
//                     />

//                     {isOpen && (
//                       <span className={styles.navLabel}>
//                         {item.label}
//                       </span>
//                     )}

//                   </NavLink>
//                 );

//               })}

//             </div>

//           ))}


//           {/* DIVIDER */}

//           <div className={styles.navDivider} />


//           {/* BOTTOM ITEMS */}

//           {bottomItems.map((item) => {

//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}

//                 className={({ isActive }) =>
//                   `${styles.navItem} ${
//                     isActive
//                       ? styles.active
//                       : ''
//                   }`
//                 }

//                 onClick={onClose}
//               >

//                 <Icon
//                   size={20}
//                   className={styles.navIcon}
//                 />

//                 {isOpen && (
//                   <span className={styles.navLabel}>
//                     {item.label}
//                   </span>
//                 )}

//               </NavLink>
//             );

//           })}

//         </nav>

//       </aside>
//     </>
//   );
// };


// export default DashboardSidebar;

















// src/components/DashboardSidebar.jsx

import React, {
  useState
} from "react";

import {
  NavLink
} from "react-router-dom";

import {
  LayoutDashboard,
  Sprout,
  TrendingUp,
  AlertCircle,
  Cloud,
  FlaskConical,
  Store,
  User,
  Settings,
  HelpCircle,
  X,
  Map,
  MessageSquare,
  ChevronDown
} from "lucide-react";

import {
  useTranslation
} from "react-i18next";

import styles from "./DashboardSidebar.module.css";


const DashboardSidebar = ({
  isOpen,
  mobileOpen,
  onClose
}) => {

  // =========================================================
  // TRANSLATION
  // =========================================================

  const { t } = useTranslation();


  // =========================================================
  // HELP MENU STATE
  // =========================================================

  const [helpOpen, setHelpOpen] =
    useState(false);


  // =========================================================
  // SIDEBAR ITEMS
  // =========================================================

  const navItems = [

    // =======================================================
    // MAIN
    // =======================================================

    {
      category: t(
        "sidebar.categories.main"
      ),

      items: [

        {
          icon: LayoutDashboard,

          label: t(
            "sidebar.dashboard"
          ),

          path: "/dashboard",

          tour: "dashboard"
        }

      ]
    },


    // =======================================================
    // FARM INTELLIGENCE
    // =======================================================

    {
      category: t(
        "sidebar.categories.farmIntelligence"
      ),

      items: [

        {
          icon: Sprout,

          label: t(
            "sidebar.cropConsult"
          ),

          path: "/crop-recommend",

          tour: "crop-consult"
        },


        {
          icon: TrendingUp,

          label: t(
            "sidebar.yieldForecast"
          ),

          path: "/yield-predict",

          tour: "yield-forecast"
        },


        {
          icon: AlertCircle,

          label: t(
            "sidebar.diseaseLab"
          ),

          path: "/disease-detect",

          tour: "disease-lab"
        },


        {
          icon: Cloud,

          label: t(
            "sidebar.weather"
          ),

          path: "/dashboard",

          tour: "weather-sidebar"
        }

      ]
    },


    // =======================================================
    // FARM MANAGEMENT
    // =======================================================

    {
      category: t(
        "sidebar.categories.farmManagement"
      ),

      items: [

        {
          icon: FlaskConical,

          label: t(
            "sidebar.soilTesting"
          ),

          path: "/soil-centers",

          tour: "soil-testing"
        }

      ]
    },


    // =======================================================
    // MARKETPLACE
    // =======================================================

    {
      category: t(
        "sidebar.categories.marketplace"
      ),

      items: [

        {
          icon: Store,

          label: t(
            "sidebar.farmStore"
          ),

          path: "/store",

          tour: "farm-store"
        }

      ]
    }

  ];


  // =========================================================
  // BOTTOM ITEMS
  // =========================================================

  const bottomItems = [

    {
      icon: User,

      label: t(
        "sidebar.myProfile"
      ),

      path: "/profile"
    },


    {
      icon: Settings,

      label: t(
        "sidebar.settings"
      ),

      path: "/settings"
    }

  ];


  // =========================================================
  // GUIDED TOUR
  // =========================================================

  const handleGuidedTour = () => {

    // Close Help dropdown

    setHelpOpen(false);


    // Close mobile sidebar

    if (onClose) {
      onClose();
    }


    // Start Guided Tour

    setTimeout(() => {

      window.dispatchEvent(
        new CustomEvent(
          "farmxpert:start-guided-tour"
        )
      );

    }, 150);

  };


  // =========================================================
  // CHATBOT
  // =========================================================

  const handleChatbot = () => {

    // Close Help dropdown

    setHelpOpen(false);


    // Close mobile sidebar

    if (onClose) {
      onClose();
    }


    // Open Chatbot

    setTimeout(() => {

      window.dispatchEvent(
        new CustomEvent(
          "farmxpert:open-chatbot"
        )
      );

    }, 150);

  };


  // =========================================================
  // SIDEBAR CLASS
  // =========================================================

  const sidebarClasses = `
    ${styles.sidebar}
    ${!isOpen ? styles.collapsed : ""}
    ${mobileOpen ? styles.mobileOpen : ""}
  `;


  // =========================================================
  // RETURN
  // =========================================================

  return (

    <>

      {/* =====================================================
          MOBILE OVERLAY
          ===================================================== */}

      {mobileOpen && (

        <div
          className={styles.overlay}

          onClick={onClose}

          aria-hidden="true"
        />

      )}


      <aside
        className={sidebarClasses}
      >

        {/* ===================================================
            SIDEBAR HEADER
            =================================================== */}

        <div
          className={
            styles.sidebarHeader
          }
        >

          <div
            className={
              styles.logo
            }
          >

            <span
              className={
                styles.logoIcon
              }
            >
              🌱
            </span>


            {isOpen && (

              <span
                className={
                  styles.logoText
                }
              >

                Farm

                <span
                  className={
                    styles.logoHighlight
                  }
                >
                  Xpert
                </span>

              </span>

            )}

          </div>


          {mobileOpen && (

            <button
              type="button"

              className={
                styles.closeBtn
              }

              onClick={
                onClose
              }

              aria-label={
                t(
                  "sidebar.closeSidebar"
                )
              }
            >

              <X
                size={20}
              />

            </button>

          )}

        </div>


        {/* ===================================================
            NAVIGATION
            =================================================== */}

        <nav
          className={
            styles.nav
          }

          aria-label={
            t(
              "sidebar.navigation"
            )
          }
        >

          {/* =================================================
              MAIN NAVIGATION
              ================================================= */}

          {navItems.map(
            (category) => (

              <div
                key={
                  category.category
                }

                className={
                  styles.navCategory
                }
              >

                {/* Category */}

                {isOpen && (

                  <span
                    className={
                      styles.categoryLabel
                    }
                  >

                    {
                      category.category
                    }

                  </span>

                )}


                {/* Category Items */}

                {category.items.map(
                  (item) => {

                    const Icon =
                      item.icon;


                    return (

                      <NavLink
                        key={
                          item.label
                        }

                        to={
                          item.path
                        }

                        {...(
                          item.tour
                            ? {
                                "data-tour":
                                  item.tour
                              }
                            : {}
                        )}

                        className={({
                          isActive
                        }) => `
                          ${styles.navItem}
                          ${
                            isActive
                              ? styles.active
                              : ""
                          }
                        `}

                        onClick={
                          onClose
                        }
                      >

                        <Icon
                          size={20}

                          className={
                            styles.navIcon
                          }
                        />


                        {isOpen && (

                          <span
                            className={
                              styles.navLabel
                            }
                          >

                            {
                              item.label
                            }

                          </span>

                        )}

                      </NavLink>

                    );

                  }
                )}

              </div>

            )
          )}


          {/* =================================================
              DIVIDER
              ================================================= */}

          <div
            className={
              styles.navDivider
            }
          />


          {/* =================================================
              PROFILE + SETTINGS
              ================================================= */}

          {bottomItems.map(
            (item) => {

              const Icon =
                item.icon;


              return (

                <NavLink
                  key={
                    item.path
                  }

                  to={
                    item.path
                  }

                  className={({
                    isActive
                  }) => `
                    ${styles.navItem}
                    ${
                      isActive
                        ? styles.active
                        : ""
                    }
                  `}

                  onClick={
                    onClose
                  }
                >

                  <Icon
                    size={20}

                    className={
                      styles.navIcon
                    }
                  />


                  {isOpen && (

                    <span
                      className={
                        styles.navLabel
                      }
                    >

                      {
                        item.label
                      }

                    </span>

                  )}

                </NavLink>

              );

            }
          )}


          {/* =================================================
              HELP
              ================================================= */}

          <div
            className="relative"
          >

            {/* Help Button */}

            <button
              type="button"

              onClick={() =>
                setHelpOpen(
                  previous =>
                    !previous
                )
              }

              className={`
                ${styles.navItem}
                w-full
                cursor-pointer
                border-0

                ${
                  helpOpen
                    ? styles.active
                    : ""
                }
              `}
            >

              <HelpCircle
                size={20}

                className={
                  styles.navIcon
                }
              />


              {isOpen && (

                <>

                  <span
                    className={
                      styles.navLabel
                    }
                  >

                    {t(
                      "sidebar.help"
                    )}

                  </span>


                  <ChevronDown
                    size={15}

                    className={`
                      ml-auto
                      transition-transform
                      duration-200

                      ${
                        helpOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />

                </>

              )}

            </button>


            {/* =================================================
                HELP OPTIONS
                ================================================= */}

            {helpOpen && isOpen && (

              <div
                className="
                  mx-2
                  mt-1
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#e2e9e4]
                  bg-white
                  p-1
                  shadow-[0_8px_25px_rgba(20,50,35,0.12)]
                "
              >

                {/* =============================================
                    GUIDED TOUR
                    ============================================= */}

                <button
                  type="button"

                  onClick={
                    handleGuidedTour
                  }

                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-[13px]
                    font-medium
                    text-[#405148]
                    transition-all
                    duration-200
                    hover:bg-[#eef7f1]
                    hover:text-[#087443]
                  "
                >

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#eaf5ee]
                      text-[#087443]
                    "
                  >

                    <Map
                      size={16}
                    />

                  </span>


                  <span>

                    {t(
                      "sidebar.guidedTour"
                    )}

                  </span>

                </button>


                {/* =============================================
                    CHATBOT
                    ============================================= */}

                <button
                  type="button"

                  onClick={
                    handleChatbot
                  }

                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-[13px]
                    font-medium
                    text-[#405148]
                    transition-all
                    duration-200
                    hover:bg-[#eef7f1]
                    hover:text-[#087443]
                  "
                >

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#eaf5ee]
                      text-[#087443]
                    "
                  >

                    <MessageSquare
                      size={16}
                    />

                  </span>


                  <span>

                    {t(
                      "sidebar.chatbot"
                    )}

                  </span>

                </button>

              </div>

            )}

          </div>

        </nav>

      </aside>

    </>

  );

};


export default DashboardSidebar;