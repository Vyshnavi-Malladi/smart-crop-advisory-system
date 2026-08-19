// // DashboardLayout.jsx - Authenticated Application Layout
// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import DashboardSidebar from './DashboardSidebar';
// import DashboardTopbar from './DashboardTopbar';
// import styles from './DashboardLayout.module.css';

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className={styles.layout}>
//       <DashboardSidebar isOpen={sidebarOpen} />
//       <div className={`${styles.mainContent} ${!sidebarOpen ? styles.expanded : ''}`}>
//         <DashboardTopbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
//         <main className={styles.contentArea}>
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;















// // src/components/DashboardLayout.jsx

// import React, { useState, useEffect } from 'react';
// import { Outlet } from 'react-router-dom';

// import DashboardSidebar from './DashboardSidebar';
// import DashboardTopbar from './DashboardTopbar';
// import GuidedTour from './GuidedTour/GuidedTour';

// import styles from './DashboardLayout.module.css';
// import { useDemo } from '../context/DemoContext';

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   // Guided Tour state
//   const [tourActive, setTourActive] = useState(false);

//   const { stopDemo } = useDemo();

//   // ==========================================
//   // Toggle Sidebar
//   // ==========================================

//   const toggleSidebar = () => {
//     if (window.innerWidth <= 768) {
//       setMobileSidebarOpen((prev) => !prev);
//     } else {
//       setSidebarOpen((prev) => !prev);
//     }
//   };

//   // ==========================================
//   // Listen for manual Guided Tour start
//   // Help -> Guided Tour
//   // ==========================================

//   useEffect(() => {
//     const handleTourStart = () => {
//       setTourActive(true);
//     };

//     window.addEventListener(
//       'start-guided-tour',
//       handleTourStart
//     );

//     return () => {
//       window.removeEventListener(
//         'start-guided-tour',
//         handleTourStart
//       );
//     };
//   }, []);

//   // ==========================================
//   // Tour Completed
//   // ==========================================

//   const handleTourComplete = () => {
//     setTourActive(false);

//     if (stopDemo) {
//       stopDemo();
//     }
//   };

//   // ==========================================
//   // Tour Skipped
//   // ==========================================

//   const handleTourSkip = () => {
//     setTourActive(false);

//     if (stopDemo) {
//       stopDemo();
//     }
//   };

//   // ==========================================
//   // Render
//   // ==========================================

//   return (
//     <div className={styles.layout}>

//       {/* ======================================
//           SIDEBAR
//       ====================================== */}

//       <DashboardSidebar
//         isOpen={sidebarOpen}
//         mobileOpen={mobileSidebarOpen}
//         onClose={() => setMobileSidebarOpen(false)}
//       />

//       {/* ======================================
//           MAIN CONTENT
//       ====================================== */}

//       <div
//         className={`${styles.mainContent} ${
//           !sidebarOpen ? styles.expanded : ''
//         }`}
//       >

//         {/* Topbar */}

//         <DashboardTopbar
//           onMenuClick={toggleSidebar}
//         />

//         {/* Page Content */}

//         <main className={styles.contentArea}>
//           <Outlet />
//         </main>

//       </div>

//       {/* ======================================
//           GUIDED TOUR
//       ====================================== */}

//       <GuidedTour
//         isActive={tourActive}
//         onTourComplete={handleTourComplete}
//         onTourSkip={handleTourSkip}
//       />

//     </div>
//   );
// };

// export default DashboardLayout;














// // src/components/DashboardLayout.jsx
// import React, { useState, useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
// import DashboardSidebar from './DashboardSidebar';
// import DashboardTopbar from './DashboardTopbar';
// import GuidedTour from './GuidedTour/GuidedTour';

// import styles from './DashboardLayout.module.css';
// import { useDemo } from '../context/DemoContext';

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const [tourActive, setTourActive] = useState(false);
//   const { stopDemo } = useDemo();

//   const toggleSidebar = () => {
//     if (window.innerWidth <= 768) {
//       setMobileSidebarOpen((prev) => !prev);
//     } else {
//       setSidebarOpen((prev) => !prev);
//     }
//   };

//   useEffect(() => {
//     const handleTourStart = () => {
//       setTourActive(true);
//     };
//     window.addEventListener('start-guided-tour', handleTourStart);
//     return () => {
//       window.removeEventListener('start-guided-tour', handleTourStart);
//     };
//   }, []);

//   const handleTourComplete = () => {
//     setTourActive(false);
//     if (stopDemo) stopDemo();
//   };

//   const handleTourSkip = () => {
//     setTourActive(false);
//     if (stopDemo) stopDemo();
//   };

//   return (
//     <div className={styles.layout}>
//       <DashboardSidebar
//         isOpen={sidebarOpen}
//         mobileOpen={mobileSidebarOpen}
//         onClose={() => setMobileSidebarOpen(false)}
//       />

//       <div className={`${styles.mainContent} ${!sidebarOpen ? styles.expanded : ''}`}>
//         <DashboardTopbar onMenuClick={toggleSidebar} />
//         <main className={styles.contentArea}>
//           <Outlet />
//         </main>
//       </div>

//       <GuidedTour
//         isActive={tourActive}
//         onTourComplete={handleTourComplete}
//         onTourSkip={handleTourSkip}
//       />

     
//     </div>
//   );
// };

// export default DashboardLayout;














// src/components/DashboardLayout.jsx

import React, {
  useState,
  useEffect
} from "react";

import {
  Outlet,
  useLocation
} from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";
import GuidedTour from "./GuidedTour/GuidedTour";

import styles from "./DashboardLayout.module.css";

import { useDemo } from "../context/DemoContext";


const DashboardLayout = () => {

  // =========================================================
  // SIDEBAR STATE
  // =========================================================

  const [
    sidebarOpen,
    setSidebarOpen
  ] = useState(true);

  const [
    mobileSidebarOpen,
    setMobileSidebarOpen
  ] = useState(false);


  // =========================================================
  // GUIDED TOUR STATE
  // =========================================================

  const [
    tourActive,
    setTourActive
  ] = useState(false);


  // =========================================================
  // ROUTER LOCATION
  // =========================================================

  const location = useLocation();


  // =========================================================
  // DEMO CONTEXT
  // =========================================================

  const { stopDemo } = useDemo();


  // =========================================================
  // SIDEBAR TOGGLE
  // =========================================================

  const toggleSidebar = () => {

    if (window.innerWidth <= 768) {

      setMobileSidebarOpen(
        previous => !previous
      );

    } else {

      setSidebarOpen(
        previous => !previous
      );

    }

  };


  // =========================================================
  // AUTOMATIC FIRST-TIME USER TOUR
  // =========================================================

  useEffect(() => {

    /*
     * FarmerProfile sends the user to:
     *
     * /dashboard
     *
     * with:
     *
     * {
     *   startGuidedTour: true
     * }
     *
     * This tells DashboardLayout that the user
     * has just completed the first-time profile
     * onboarding.
     */

    if (
      location.pathname === "/dashboard" &&
      location.state?.startGuidedTour === true
    ) {

      /*
       * Give the Dashboard, Sidebar and Topbar
       * a moment to render before GuidedTour
       * searches for its target elements.
       */

      const timer = setTimeout(() => {

        setTourActive(true);

      }, 400);


      /*
       * Clear the navigation state after
       * consuming it.
       *
       * This prevents the same navigation state
       * from triggering the tour again.
       */

      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );


      return () => {

        clearTimeout(timer);

      };

    }

  }, [
    location.pathname,
    location.state
  ]);


  // =========================================================
  // MANUAL TOUR START
  // =========================================================

  useEffect(() => {

    const handleTourStart = () => {

      setTourActive(true);

    };


    window.addEventListener(
      "start-guided-tour",
      handleTourStart
    );


    return () => {

      window.removeEventListener(
        "start-guided-tour",
        handleTourStart
      );

    };

  }, []);


  // =========================================================
  // TOUR COMPLETE
  // =========================================================

  const handleTourComplete = () => {

    setTourActive(false);


    if (stopDemo) {

      stopDemo();

    }

  };


  // =========================================================
  // TOUR SKIP
  // =========================================================

  const handleTourSkip = () => {

    setTourActive(false);


    if (stopDemo) {

      stopDemo();

    }

  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className={styles.layout}>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <DashboardSidebar
        isOpen={sidebarOpen}
        mobileOpen={mobileSidebarOpen}
        onClose={() =>
          setMobileSidebarOpen(false)
        }
      />


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className={`
          ${styles.mainContent}
          ${
            !sidebarOpen
              ? styles.expanded
              : ""
          }
        `}
      >

        {/* ===================================================
            TOPBAR
        =================================================== */}

        <DashboardTopbar
          onMenuClick={toggleSidebar}
        />


        {/* ===================================================
            PAGE CONTENT
        =================================================== */}

        <main
          className={styles.contentArea}
        >

          <Outlet />

        </main>

      </div>


      {/* =====================================================
          GUIDED TOUR
      ===================================================== */}

      <GuidedTour
        isActive={tourActive}
        onTourComplete={
          handleTourComplete
        }
        onTourSkip={
          handleTourSkip
        }
      />

    </div>

  );

};


export default DashboardLayout;