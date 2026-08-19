// // src/components/GuidedTour/GuidedTour.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { createPortal } from 'react-dom';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import './guidedTour.css';

// const GuidedTour = ({ isActive, onTourComplete }) => {
//   const navigate = useNavigate();
//   const [stepIndex, setStepIndex] = useState(0);
//   const [isTourVisible, setIsTourVisible] = useState(false);
//   const [spotlightRect, setSpotlightRect] = useState(null);
//   const isMounted = useRef(false);

//   // Helper to find sidebar items by exact text match
//   const getSidebarItemRect = (text) => {
//     const xpath = `//*[contains(text(), '${text}')]`;
//     const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
//     const element = result.singleNodeValue;
//     return element ? element.getBoundingClientRect() : null;
//   };

//   // Steps Data
//   const steps = [
//     {
//       id: 'welcome',
//       title: 'Welcome to FarmXpert! 👋',
//       content: (
//         <div className="welcome-text-wrapper">
//           <div className="mb-2">Let's take a quick tour to help you get started.</div>
//           <ul className="feature-list">
//             <li>✅ Dashboard Overview</li>
//             <li>✅ Smart Farm Tools</li>
//             <li>✅ Manage Your Farm</li>
//             <li>✅ Get Expert Insights</li>
//           </ul>
//         </div>
//       ),
//       selector: null,
//     },
//     {
//       id: 'dashboard',
//       title: '📊 This is your Dashboard',
//       content: 'Here you can see an overview of your farm, weather, crop status, and important alerts.',
//       matchText: 'Dashboard',
//     },
//     {
//       id: 'crop-consult',
//       title: '🌱 Crop Consult',
//       content: 'Get AI-based crop recommendations and insights based on your soil data.',
//       matchText: 'Crop Consult',
//       action: () => navigate('/crop-recommend'),
//     },
//     {
//       id: 'disease-lab',
//       title: '🔬 Disease Lab',
//       content: 'Upload a leaf image to detect diseases early and get suggested solutions.',
//       matchText: 'Disease Lab',
//       action: () => navigate('/disease-detect'),
//     },
//     {
//       id: 'yield-forecast',
//       title: '📈 Yield Forecast',
//       content: 'Estimate your harvest yield based on crop type, area, and historical data.',
//       matchText: 'Yield Forecast',
//       action: () => navigate('/yield-predict'),
//     },
//     {
//       id: 'farm-store',
//       title: '🛒 Farm Store',
//       content: 'Buy quality seeds, fertilizers, and other farming products at the best prices.',
//       matchText: 'Farm Store',
//       action: () => navigate('/store'),
//     },
//     {
//       id: 'complete',
//       title: '🎉 You\'re All Set!',
//       content: 'You are now ready to use FarmXpert for better farming decisions.',
//       selector: null,
//     },
//   ];

//   const currentStep = steps[stepIndex];
//   const isWelcome = stepIndex === 0;
//   const isComplete = stepIndex === steps.length - 1;

//   // Mount Guard
//   useEffect(() => {
//     isMounted.current = true;
//     return () => { isMounted.current = false; };
//   }, []);

//   // Activation Logic
//   useEffect(() => {
//     if (!isMounted.current) return;
//     const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
//     const tourCompleted = localStorage.getItem('farmxpert_tour_completed');
//     const tourSkipped = localStorage.getItem('farmxpert_tour_skipped');

//     if (isActive || (user && !tourCompleted && !tourSkipped)) {
//       setIsTourVisible(true);
//       setStepIndex(0);
//     }
//   }, [isActive]);

//   // Spotlight Calculation
//   useEffect(() => {
//     if (!isTourVisible || isWelcome || isComplete) {
//       setSpotlightRect(null);
//       return;
//     }

//     const timer = setTimeout(() => {
//       if (!isMounted.current) return;
      
//       let rect = null;
//       if (currentStep.matchText) {
//         rect = getSidebarItemRect(currentStep.matchText);
//       } else if (currentStep.selector) {
//         const element = document.querySelector(currentStep.selector);
//         if (element) rect = element.getBoundingClientRect();
//       }

//       if (rect) {
//         setSpotlightRect({
//           top: rect.top,
//           left: rect.left,
//           width: rect.width,
//           height: rect.height,
//         });
//       } else {
//         setSpotlightRect(null);
//       }
//     }, 500); 

//     return () => clearTimeout(timer);
//   }, [isTourVisible, stepIndex, currentStep, isWelcome, isComplete]);

//   // Navigation & Action Logic
//   const handleNext = async () => {
//     if (stepIndex === steps.length - 1) {
//       finishTour();
//     } else {
//       const nextStep = steps[stepIndex + 1];
//       if (nextStep.action) nextStep.action();
//       setStepIndex((prev) => prev + 1);
//     }
//   };

//   const handleBack = () => {
//     if (stepIndex > 0) setStepIndex((prev) => prev - 1);
//   };

//   const finishTour = () => {
//     setIsTourVisible(false);
//     localStorage.setItem('farmxpert_tour_completed', 'true');
//     if (onTourComplete) onTourComplete();
//     if (window.location.pathname !== '/dashboard') navigate('/dashboard');
//   };

//   if (!isTourVisible) return null;

//   return createPortal(
//     <div className="tour-overlay-wrapper">
      
//       {/* 
//           THE MAIN FIX: 
//           Instead of a separate <div className="tour-backdrop" />, 
//           we apply the dark color directly to the Spotlight div using a HUGE box-shadow.
//           This acts as a "mask" - dark everywhere EXCEPT where the spotlight is.
//       */}
//       {spotlightRect ? (
//         <div 
//           className="tour-spotlight-active" 
//           style={{
//             top: spotlightRect.top - 10,
//             left: spotlightRect.left - 10,
//             width: spotlightRect.width + 20,
//             height: spotlightRect.height + 20,
//             // Massive shadow that covers the whole screen, but leaves the spotlight empty
//             boxShadow: `0 0 0 99999px rgba(0, 0, 0, 0.7)`, 
//             backdropFilter: 'blur(2px)',
//           }}
//         />
//       ) : (
//         // Used only for the first Welcome screen (full dark overlay)
//         <div className="tour-backdrop-center" />
//       )}

//       {/* The White Pointer Arrow */}
//       {spotlightRect && (
//         <div 
//           className="tour-arrow" 
//           style={{
//             top: spotlightRect.top + spotlightRect.height / 2 - 10,
//             left: spotlightRect.left - 15,
//           }}
//         />
//       )}

//       {/* The Tooltip Card */}
//       <div className={`tour-tooltip-wrapper ${spotlightRect ? 'tour-with-target' : ''}`}>
//         <div className="tour-body">
//           {isWelcome ? (
//             <>
//               <div className="welcome-illustration">
//                 <img src="https://img.freepik.com/free-vector/farmer-concept-illustration_114360-1535.jpg" alt="Farmer" />
//               </div>
//               <div className="welcome-content">
//                 <h2>{currentStep.title}</h2>
//                 <div className="subtitle">{currentStep.content}</div>
//               </div>
//             </>
//           ) : (
//             <>
//               <h3 className="tour-title">{currentStep.title}</h3>
//               <div className="tour-desc">{currentStep.content}</div>
//             </>
//           )}
//         </div>

//         <div className="tour-footer">
//           <div className="tour-progress">{stepIndex + 1}/{steps.length}</div>
//           <div className="tour-actions">
//             <button onClick={handleBack} className="btn-back" disabled={stepIndex === 0}>
//               Back
//             </button>
//             <button onClick={finishTour} className="btn-skip">
//               Skip
//             </button>
//             <button onClick={handleNext} className="btn-primary">
//               {isComplete ? 'Finish' : 'Next'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default GuidedTour;







// // src/components/GuidedTour/GuidedTour.jsx

// import React, { useEffect, useState, useCallback } from 'react';
// import { createPortal } from 'react-dom';
// import Cookies from 'js-cookie';
// import './guidedTour.css';

// const TOUR_COMPLETED_KEY = 'farmxpert_tour_completed';
// const TOUR_SKIPPED_KEY = 'farmxpert_tour_skipped';

// const GuidedTour = ({
//   isActive = false,
//   onTourComplete,
//   onTourSkip
// }) => {

//   const [stepIndex, setStepIndex] = useState(0);
//   const [isTourVisible, setIsTourVisible] = useState(false);
//   const [tourStarted, setTourStarted] = useState(false);
//   const [spotlightRect, setSpotlightRect] = useState(null);

//   // =========================================================
//   // TOUR STEPS
//   // =========================================================

//   const steps = [
//     {
//       id: 'welcome',
//       title: 'Welcome to FarmXpert! 👋',

//       content: (
//         <div className="welcome-text-wrapper">

//           <div className="welcome-description">
//             Let's take a quick tour to help you get started.
//           </div>

//           <ul className="feature-list">
//             <li>✓ Dashboard Overview</li>
//             <li>✓ Smart Farm Tools</li>
//             <li>✓ Manage Your Farm</li>
//             <li>✓ Get Expert Insights</li>
//           </ul>

//         </div>
//       ),

//       target: null,
//       type: 'welcome'
//     },

//     // =====================================================
//     // DASHBOARD
//     // =====================================================

//     {
//       id: 'dashboard',

//       title: '📊 This is your Dashboard',

//       content:
//         'Here you can see an overview of your farm, weather, crop status, and important alerts.',

//       target: '[data-tour="dashboard"]',

//       type: 'sidebar'
//     },

//     // =====================================================
//     // WEATHER
//     // =====================================================

//     {
//       id: 'weather',

//       title: '🌤️ Weather Information',

//       content:
//         'Check real-time weather updates and forecasts to plan your farming activities.',

//       target: '[data-tour="weather"]',

//       type: 'weather'
//     },

//     // =====================================================
//     // CROP TRACKER
//     // =====================================================

//     {
//       id: 'crop-tracker',

//       title: '🌱 Crop Tracker',

//       content:
//         'Track your crop growth stage and days passed to take timely farming actions.',

//       target: '[data-tour="crop-tracker"]',

//       type: 'crop-tracker'
//     },

//     // =====================================================
//     // CROP CONSULT
//     // =====================================================

//     {
//       id: 'crop-consult',

//       title: '🌱 Crop Consult',

//       content:
//         'Get AI-based crop recommendations based on your soil and environmental conditions.',

//       target: '[data-tour="crop-consult"]',

//       type: 'sidebar'
//     },

//     // =====================================================
//     // DISEASE LAB
//     // =====================================================

//     {
//       id: 'disease-lab',

//       title: '🔬 Disease Lab',

//       content:
//         'Upload a leaf image to detect diseases early and get suggested solutions.',

//       target: '[data-tour="disease-lab"]',

//       type: 'sidebar'
//     },

//     // =====================================================
//     // YIELD FORECAST
//     // =====================================================

//     {
//       id: 'yield-forecast',

//       title: '📈 Yield Forecast',

//       content:
//         'Estimate your harvest yield based on your crop type, land area, and available data.',

//       target: '[data-tour="yield-forecast"]',

//       type: 'sidebar'
//     },

//     // =====================================================
//     // FARM STORE
//     // =====================================================

//     {
//       id: 'farm-store',

//       title: '🛒 Farm Store',

//       content:
//         'Buy quality seeds, fertilizers, and other farming products easily.',

//       target: '[data-tour="farm-store"]',

//       type: 'sidebar'
//     },

//     // =====================================================
//     // COMPLETE
//     // =====================================================

//     {
//       id: 'complete',

//       title: "You're All Set! 🎉",

//       content:
//         'You now know the main tools of FarmXpert. Happy Farming!',

//       target: null,

//       type: 'complete'
//     }
//   ];

//   const currentStep = steps[stepIndex];

//   const isWelcome = currentStep?.type === 'welcome';
//   const isComplete = currentStep?.type === 'complete';

//   /*
//    * Number of actual tour steps.
//    *
//    * Welcome is not counted.
//    * Complete is not counted.
//    *
//    * Dashboard = 1
//    * Weather = 2
//    * Crop Tracker = 3
//    * Crop Consult = 4
//    * Disease Lab = 5
//    * Yield Forecast = 6
//    * Farm Store = 7
//    */

//   const actualStepNumber = Math.max(1, stepIndex);

//   const totalTourSteps = 7;


//   // =========================================================
//   // FIND TARGET
//   // =========================================================

//   const findTarget = useCallback(() => {

//     if (!currentStep?.target) {
//       setSpotlightRect(null);
//       return;
//     }

//     const element = document.querySelector(
//       currentStep.target
//     );

//     if (!element) {
//       setSpotlightRect(null);
//       return;
//     }

//     const rect = element.getBoundingClientRect();

//     setSpotlightRect({
//       top: rect.top,
//       left: rect.left,
//       width: rect.width,
//       height: rect.height
//     });

//   }, [currentStep]);


//   // =========================================================
//   // FIRST-TIME USER / MANUAL TOUR
//   // =========================================================

//   useEffect(() => {

//     if (typeof window === 'undefined') {
//       return;
//     }

//     let user = null;

//     try {

//       const cookie = Cookies.get('user');

//       if (cookie) {
//         user = JSON.parse(cookie);
//       }

//     } catch (error) {

//       console.error(
//         'Unable to read FarmXpert user cookie',
//         error
//       );

//     }


//     // Manual Guided Tour
//     if (isActive) {

//       setStepIndex(0);
//       setTourStarted(false);
//       setIsTourVisible(true);

//       return;
//     }


//     // First-time user
//     const completed = localStorage.getItem(
//       TOUR_COMPLETED_KEY
//     );

//     const skipped = localStorage.getItem(
//       TOUR_SKIPPED_KEY
//     );


//     if (
//       user &&
//       !completed &&
//       !skipped
//     ) {

//       setStepIndex(0);
//       setTourStarted(false);
//       setIsTourVisible(true);

//     }

//   }, [isActive]);


//   // =========================================================
//   // UPDATE SPOTLIGHT
//   // =========================================================

//   useEffect(() => {

//     if (
//       !isTourVisible ||
//       !tourStarted ||
//       isWelcome ||
//       isComplete
//     ) {

//       setSpotlightRect(null);

//       return;
//     }


//     let attempts = 0;
//     let timer;


//     const locateTarget = () => {

//       const element = document.querySelector(
//         currentStep.target
//       );


//       if (element) {

//         const rect =
//           element.getBoundingClientRect();

//         setSpotlightRect({
//           top: rect.top,
//           left: rect.left,
//           width: rect.width,
//           height: rect.height
//         });

//         return;
//       }


//       attempts++;


//       if (attempts < 30) {

//         timer = setTimeout(
//           locateTarget,
//           100
//         );

//       } else {

//         setSpotlightRect(null);

//       }

//     };


//     locateTarget();


//     return () => {

//       if (timer) {
//         clearTimeout(timer);
//       }

//     };

//   }, [
//     isTourVisible,
//     tourStarted,
//     stepIndex,
//     currentStep,
//     isWelcome,
//     isComplete
//   ]);


//   // =========================================================
//   // UPDATE SPOTLIGHT ON SCROLL / RESIZE
//   // =========================================================

//   useEffect(() => {

//     if (!isTourVisible || !tourStarted) {
//       return;
//     }


//     const update = () => {
//       findTarget();
//     };


//     window.addEventListener(
//       'resize',
//       update
//     );

//     window.addEventListener(
//       'scroll',
//       update,
//       true
//     );


//     return () => {

//       window.removeEventListener(
//         'resize',
//         update
//       );

//       window.removeEventListener(
//         'scroll',
//         update,
//         true
//       );

//     };

//   }, [
//     isTourVisible,
//     tourStarted,
//     findTarget
//   ]);


//   // =========================================================
//   // START TOUR
//   // =========================================================

//   const startTour = () => {

//     setTourStarted(true);

//     setStepIndex(1);

//   };


//   // =========================================================
//   // NEXT
//   // =========================================================

//   const handleNext = () => {

//     if (isComplete) {

//       finishTour();

//       return;
//     }


//     if (stepIndex < steps.length - 1) {

//       setStepIndex(
//         previous => previous + 1
//       );

//     }

//   };


//   // =========================================================
//   // BACK
//   // =========================================================

//   const handleBack = () => {

//     if (stepIndex <= 1) {

//       setStepIndex(0);

//       setTourStarted(false);

//       return;
//     }


//     setStepIndex(
//       previous => previous - 1
//     );

//   };


//   // =========================================================
//   // SKIP
//   // =========================================================

//   const skipTour = () => {

//     setIsTourVisible(false);
//     setTourStarted(false);
//     setSpotlightRect(null);


//     localStorage.setItem(
//       TOUR_SKIPPED_KEY,
//       'true'
//     );

//     localStorage.removeItem(
//       TOUR_COMPLETED_KEY
//     );


//     if (onTourSkip) {

//       onTourSkip();

//     } else if (onTourComplete) {

//       onTourComplete();

//     }

//   };


//   const finishTour = () => {
//   setIsTourVisible(false);
//   setTourStarted(false);
//   setSpotlightRect(null);

//   localStorage.setItem(
//     TOUR_COMPLETED_KEY,
//     'true'
//   );

//   localStorage.removeItem(
//     TOUR_SKIPPED_KEY
//   );

//   if (onTourComplete) {
//     onTourComplete();
//   }

//   // Go to Dashboard
//   navigate('/dashboard');
// };


//   // =========================================================
//   // ESCAPE
//   // =========================================================

//   useEffect(() => {

//     if (!isTourVisible) {
//       return;
//     }


//     const handleEscape = (event) => {

//       if (event.key === 'Escape') {

//         skipTour();

//       }

//     };


//     document.addEventListener(
//       'keydown',
//       handleEscape
//     );


//     return () => {

//       document.removeEventListener(
//         'keydown',
//         handleEscape
//       );

//     };

//   }, [isTourVisible]);


//   // =========================================================
//   // TOOLTIP POSITION
//   // =========================================================

//   const getTooltipStyle = () => {

//     // Welcome / Complete
//     if (
//       isWelcome ||
//       isComplete ||
//       !spotlightRect
//     ) {

//       return {
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)'
//       };

//     }


//     const tooltipWidth = 360;
//     const gap = 18;


//     let top;
//     let left;


//     // Sidebar items
//     if (currentStep.type === 'sidebar') {

//       left =
//         spotlightRect.left +
//         spotlightRect.width +
//         gap;

//       top =
//         spotlightRect.top +
//         spotlightRect.height / 2;

//       return {
//         top: `${top}px`,
//         left: `${left}px`,
//         transform: 'translateY(-50%)'
//       };

//     }


//     // Weather / Crop Tracker
//     top =
//       spotlightRect.top +
//       spotlightRect.height +
//       18;

//     left =
//       spotlightRect.left +
//       spotlightRect.width / 2;


//     // Keep inside screen

//     if (
//       left - tooltipWidth / 2 < 20
//     ) {

//       left =
//         tooltipWidth / 2 + 20;

//     }


//     if (
//       left + tooltipWidth / 2 >
//       window.innerWidth - 20
//     ) {

//       left =
//         window.innerWidth -
//         tooltipWidth / 2 -
//         20;

//     }


//     return {
//       top: `${top}px`,
//       left: `${left}px`,
//       transform: 'translateX(-50%)'
//     };

//   };


//   // =========================================================
//   // NOT VISIBLE
//   // =========================================================

//   if (!isTourVisible) {
//     return null;
//   }


//   // =========================================================
//   // RENDER
//   // =========================================================

//   return createPortal(

//     <div className="tour-overlay-wrapper">

//       {/* ================================================
//           DARK OVERLAY + SPOTLIGHT
//       ================================================= */}

//       {spotlightRect ? (

//         <div
//           className="tour-spotlight-active"
//           style={{
//             top: `${spotlightRect.top - 8}px`,
//             left: `${spotlightRect.left - 8}px`,
//             width: `${spotlightRect.width + 16}px`,
//             height: `${spotlightRect.height + 16}px`
//           }}
//         />

//       ) : (

//         <div className="tour-backdrop-center" />

//       )}


//       {/* ================================================
//           POINTER
//       ================================================= */}

//       {spotlightRect && (
//         <div
//           className={`
//             tour-arrow
//             ${
//               currentStep.type === 'sidebar'
//                 ? 'arrow-left'
//                 : 'arrow-top'
//             }
//           `}
//           style={

//             currentStep.type === 'sidebar'

//               ? {
//                   top:
//                     spotlightRect.top +
//                     spotlightRect.height / 2 -
//                     10,

//                   left:
//                     spotlightRect.left +
//                     spotlightRect.width +
//                     3
//                 }

//               : {
//                   top:
//                     spotlightRect.top +
//                     spotlightRect.height +
//                     3,

//                   left:
//                     spotlightRect.left +
//                     spotlightRect.width / 2 -
//                     10
//                 }

//           }
//         />
//       )}


//       {/* ================================================
//           TOOLTIP
//       ================================================= */}

//       <div
//         className={`
//           tour-tooltip-wrapper

//           ${
//             isWelcome
//               ? 'tour-welcome-wrapper'
//               : ''
//           }

//           ${
//             isComplete
//               ? 'tour-complete-wrapper'
//               : ''
//           }

//           ${
//             currentStep.type === 'sidebar'
//               ? 'tour-sidebar-tooltip'
//               : ''
//           }
//         `}
//         style={getTooltipStyle()}
//       >

//         {/* ==============================================
//             WELCOME
//         ============================================== */}

//         {isWelcome && (

//           <>

//             <div className="tour-body">

//               <div className="welcome-illustration">

//                 <img
//                   src="https://img.freepik.com/free-vector/farmer-concept-illustration_114360-1535.jpg"
//                   alt="Farmer"
//                 />

//               </div>


//               <div className="welcome-content">

//                 <h2>
//                   {currentStep.title}
//                 </h2>

//                 <div className="subtitle">
//                   {currentStep.content}
//                 </div>

//               </div>

//             </div>


//             <div className="tour-welcome-footer">

//               <button
//                 type="button"
//                 className="btn-primary btn-start-tour"
//                 onClick={startTour}
//               >
//                 Start Tour
//               </button>

//               <button
//                 type="button"
//                 className="btn-skip-now"
//                 onClick={skipTour}
//               >
//                 Skip for now
//               </button>

//             </div>

//           </>

//         )}


//         {/* ==============================================
//             NORMAL STEP
//         ============================================== */}

//         {!isWelcome && !isComplete && (

//           <>

//             <div className="tour-body">

//               <h3 className="tour-title">
//                 {currentStep.title}
//               </h3>

//               <div className="tour-desc">
//                 {currentStep.content}
//               </div>

//             </div>


//             <div className="tour-footer">

//               <div className="tour-progress">
//                 {actualStepNumber}/{totalTourSteps}
//               </div>


//               <div className="tour-actions">

//                 <button
//                   type="button"
//                   className="btn-back"
//                   onClick={handleBack}
//                 >
//                   Back
//                 </button>


//                 <button
//                   type="button"
//                   className="btn-skip"
//                   onClick={skipTour}
//                 >
//                   Skip
//                 </button>


//                 <button
//                   type="button"
//                   className="btn-primary"
//                   onClick={handleNext}
//                 >
//                   Next
//                 </button>

//               </div>

//             </div>

//           </>

//         )}


//         {/* ==============================================
//             COMPLETE
//         ============================================== */}

//         {isComplete && (

//           <>

//             <div className="tour-complete-body">

//               <div className="complete-check">
//                 ✓
//               </div>


//               <h2>
//                 You're All Set! 🎉
//               </h2>


//               <p>
//                 You now know the main tools
//                 of FarmXpert.
//               </p>


//               <p className="happy-farming">
//                 Happy Farming!
//               </p>

//             </div>


//             <div className="tour-complete-footer">

//               <button
//                 type="button"
//                 className="btn-primary explore-dashboard-btn"
//                 onClick={finishTour}
//               >
//                 Explore Dashboard
//               </button>

//             </div>

//           </>

//         )}

//       </div>

//     </div>,

//     document.body

//   );

// };

// export default GuidedTour;








// // src/components/GuidedTour/GuidedTour.jsx

// import React, {
//   useEffect,
//   useState,
//   useCallback
// } from 'react';

// import { createPortal } from 'react-dom';
// import Cookies from 'js-cookie';

// import './guidedTour.css';

// const TOUR_COMPLETED_KEY =
//   'farmxpert_tour_completed';

// const TOUR_SKIPPED_KEY =
//   'farmxpert_tour_skipped';


// const GuidedTour = ({
//   isActive = false,
//   onTourComplete,
//   onTourSkip
// }) => {

//   const [stepIndex, setStepIndex] = useState(0);

//   const [isTourVisible, setIsTourVisible] =
//     useState(false);

//   const [tourStarted, setTourStarted] =
//     useState(false);

//   const [spotlightRect, setSpotlightRect] =
//     useState(null);


//   // =========================================================
//   // TOUR STEPS
//   // =========================================================

//   const steps = [

//     // =====================================================
//     // WELCOME
//     // =====================================================

//     {
//       id: 'welcome',

//       title: 'Welcome to FarmXpert! 👋',

//       content: (
//         <div className="welcome-text-wrapper">

//           <div className="welcome-description">
//             Let's take a quick tour to help you get started.
//           </div>

//           <ul className="feature-list">

//             <li>✓ Dashboard Overview</li>

//             <li>✓ Smart Farm Tools</li>

//             <li>✓ Manage Your Farm</li>

//             <li>✓ Get Expert Insights</li>

//           </ul>

//         </div>
//       ),

//       target: null,

//       type: 'welcome'
//     },


//     // =====================================================
//     // DASHBOARD
//     // =====================================================

//     {
//       id: 'dashboard',

//       title: '📊 This is your Dashboard',

//       content:
//         'Here you can see an overview of your farm, weather, crop status, and important alerts.',

//       // IMPORTANT:
//       // This targets the SIDEBAR Dashboard button
//       target: '[data-tour="dashboard"]',

//       // IMPORTANT:
//       // Tooltip appears beside sidebar
//       type: 'sidebar'
//     },


//     // =====================================================
//     // WEATHER
//     // =====================================================

//     {
//       id: 'weather',

//       title: '🌤️ Weather Information',

//       content:
//         'Check real-time weather updates and forecasts to plan your farming activities.',

//       target: '[data-tour="weather"]',

//       type: 'weather'
//     },


//     // =====================================================
//     // CROP TRACKER
//     // =====================================================

//     {
//       id: 'crop-tracker',

//       title: '🌱 Crop Tracker',

//       content:
//         'Track your crop growth stage and days passed to take timely farming actions.',

//       target: '[data-tour="crop-tracker"]',

//       type: 'crop-tracker'
//     },


//     // =====================================================
//     // CROP CONSULT
//     // =====================================================

//     {
//       id: 'crop-consult',

//       title: '🌱 Crop Consult',

//       content:
//         'Get AI-based crop recommendations based on your soil and environmental conditions.',

//       target: '[data-tour="crop-consult"]',

//       type: 'sidebar'
//     },


//     // =====================================================
//     // DISEASE LAB
//     // =====================================================

//     {
//       id: 'disease-lab',

//       title: '🔬 Disease Lab',

//       content:
//         'Upload a leaf image to detect diseases early and get suggested solutions.',

//       target: '[data-tour="disease-lab"]',

//       type: 'sidebar'
//     },


//     // =====================================================
//     // YIELD FORECAST
//     // =====================================================

//     {
//       id: 'yield-forecast',

//       title: '📈 Yield Forecast',

//       content:
//         'Estimate your harvest yield based on your crop type, land area, and available data.',

//       target: '[data-tour="yield-forecast"]',

//       type: 'sidebar'
//     },


//     // =====================================================
//     // FARM STORE
//     // =====================================================

//     {
//       id: 'farm-store',

//       title: '🛒 Farm Store',

//       content:
//         'Buy quality seeds, fertilizers, and other farming products easily.',

//       target: '[data-tour="farm-store"]',

//       type: 'sidebar'
//     },


//     // =====================================================
//     // COMPLETE
//     // =====================================================

//     {
//       id: 'complete',

//       title: "You're All Set! 🎉",

//       content:
//         'You now know the main tools of FarmXpert. Happy Farming!',

//       target: null,

//       type: 'complete'
//     }

//   ];


//   const currentStep =
//     steps[stepIndex];


//   const isWelcome =
//     currentStep?.type === 'welcome';


//   const isComplete =
//     currentStep?.type === 'complete';


//   // =========================================================
//   // TOUR STEP COUNTER
//   // =========================================================

//   const actualStepNumber =
//     Math.max(1, stepIndex);

//   const totalTourSteps = 7;


//   // =========================================================
//   // FIND TARGET
//   // =========================================================

//   const findTarget = useCallback(() => {

//     if (!currentStep?.target) {

//       setSpotlightRect(null);

//       return;
//     }


//     const element =
//       document.querySelector(
//         currentStep.target
//       );


//     if (!element) {

//       setSpotlightRect(null);

//       return;
//     }


//     const rect =
//       element.getBoundingClientRect();


//     setSpotlightRect({

//       top: rect.top,

//       left: rect.left,

//       width: rect.width,

//       height: rect.height

//     });

//   }, [currentStep]);


//   // =========================================================
//   // FIRST TIME USER / MANUAL TOUR
//   // =========================================================

//   useEffect(() => {

//     if (
//       typeof window === 'undefined'
//     ) {
//       return;
//     }


//     let user = null;


//     try {

//       const cookie =
//         Cookies.get('user');


//       if (cookie) {

//         user =
//           JSON.parse(cookie);

//       }

//     } catch (error) {

//       console.error(
//         'Unable to read FarmXpert user cookie',
//         error
//       );

//     }


//     // ---------------------------------------------
//     // Manual Guided Tour
//     // ---------------------------------------------

//     if (isActive) {

//       setStepIndex(0);

//       setTourStarted(false);

//       setIsTourVisible(true);

//       return;
//     }


//     // ---------------------------------------------
//     // First-time user
//     // ---------------------------------------------

//     const completed =
//       localStorage.getItem(
//         TOUR_COMPLETED_KEY
//       );


//     const skipped =
//       localStorage.getItem(
//         TOUR_SKIPPED_KEY
//       );


//     if (
//       user &&
//       !completed &&
//       !skipped
//     ) {

//       setStepIndex(0);

//       setTourStarted(false);

//       setIsTourVisible(true);

//     }

//   }, [isActive]);


//   // =========================================================
//   // UPDATE SPOTLIGHT
//   // =========================================================

//   useEffect(() => {

//     if (
//       !isTourVisible ||
//       !tourStarted ||
//       isWelcome ||
//       isComplete
//     ) {

//       setSpotlightRect(null);

//       return;
//     }


//     let attempts = 0;

//     let timer;


//     const locateTarget = () => {

//       const element =
//         document.querySelector(
//           currentStep.target
//         );


//       if (element) {

//         const rect =
//           element.getBoundingClientRect();


//         setSpotlightRect({

//           top: rect.top,

//           left: rect.left,

//           width: rect.width,

//           height: rect.height

//         });


//         return;
//       }


//       attempts++;


//       if (attempts < 30) {

//         timer =
//           setTimeout(
//             locateTarget,
//             100
//           );

//       } else {

//         setSpotlightRect(null);

//       }

//     };


//     locateTarget();


//     return () => {

//       if (timer) {

//         clearTimeout(timer);

//       }

//     };

//   }, [
//     isTourVisible,
//     tourStarted,
//     stepIndex,
//     currentStep,
//     isWelcome,
//     isComplete
//   ]);


//   // =========================================================
//   // UPDATE ON RESIZE / SCROLL
//   // =========================================================

//   useEffect(() => {

//     if (
//       !isTourVisible ||
//       !tourStarted
//     ) {

//       return;

//     }


//     const update =
//       () => {

//         findTarget();

//       };


//     window.addEventListener(
//       'resize',
//       update
//     );


//     window.addEventListener(
//       'scroll',
//       update,
//       true
//     );


//     return () => {

//       window.removeEventListener(
//         'resize',
//         update
//       );


//       window.removeEventListener(
//         'scroll',
//         update,
//         true
//       );

//     };

//   }, [
//     isTourVisible,
//     tourStarted,
//     findTarget
//   ]);


//   // =========================================================
//   // START TOUR
//   // =========================================================

//   const startTour = () => {

//     setTourStarted(true);

//     setStepIndex(1);

//   };


//   // =========================================================
//   // NEXT
//   // =========================================================

//   const handleNext = () => {

//     if (isComplete) {

//       finishTour();

//       return;
//     }


//     if (
//       stepIndex <
//       steps.length - 1
//     ) {

//       setStepIndex(
//         previous =>
//           previous + 1
//       );

//     }

//   };


//   // =========================================================
//   // BACK
//   // =========================================================

//   const handleBack = () => {

//     if (stepIndex <= 1) {

//       setStepIndex(0);

//       setTourStarted(false);

//       return;
//     }


//     setStepIndex(
//       previous =>
//         previous - 1
//     );

//   };


//   // =========================================================
//   // SKIP
//   // =========================================================

//   const skipTour = () => {

//     setIsTourVisible(false);

//     setTourStarted(false);

//     setSpotlightRect(null);


//     localStorage.setItem(
//       TOUR_SKIPPED_KEY,
//       'true'
//     );


//     localStorage.removeItem(
//       TOUR_COMPLETED_KEY
//     );


//     if (onTourSkip) {

//       onTourSkip();

//     } else if (onTourComplete) {

//       onTourComplete();

//     }

//   };


//   // =========================================================
//   // FINISH TOUR
//   // =========================================================

//   const finishTour = () => {

//     setIsTourVisible(false);

//     setTourStarted(false);

//     setSpotlightRect(null);


//     localStorage.setItem(
//       TOUR_COMPLETED_KEY,
//       'true'
//     );


//     localStorage.removeItem(
//       TOUR_SKIPPED_KEY
//     );


//     if (onTourComplete) {

//       onTourComplete();

//     }


//     // Explore Dashboard
//     window.history.replaceState(
//       null,
//       '',
//       '/dashboard'
//     );

//     window.dispatchEvent(
//       new PopStateEvent('popstate')
//     );

//   };


//   // =========================================================
//   // ESCAPE KEY
//   // =========================================================

//   useEffect(() => {

//     if (!isTourVisible) {

//       return;

//     }


//     const handleEscape =
//       (event) => {

//         if (
//           event.key === 'Escape'
//         ) {

//           skipTour();

//         }

//       };


//     document.addEventListener(
//       'keydown',
//       handleEscape
//     );


//     return () => {

//       document.removeEventListener(
//         'keydown',
//         handleEscape
//       );

//     };

//   }, [isTourVisible]);


//   // =========================================================
//   // TOOLTIP POSITION
//   // =========================================================

//   const getTooltipStyle = () => {

//     // ---------------------------------------------
//     // Welcome / Complete
//     // ---------------------------------------------

//     if (
//       isWelcome ||
//       isComplete ||
//       !spotlightRect
//     ) {

//       return {

//         top: '50%',

//         left: '50%',

//         transform:
//           'translate(-50%, -50%)'

//       };

//     }


//     const tooltipWidth = 360;

//     const tooltipHeight = 190;

//     const gap = 18;


//     // =====================================================
//     // SIDEBAR ITEMS
//     // =====================================================

//     if (
//       currentStep.type === 'sidebar'
//     ) {

//       let left =
//         spotlightRect.left +
//         spotlightRect.width +
//         gap;


//       let top =
//         spotlightRect.top +
//         spotlightRect.height / 2;


//       // ---------------------------------------------
//       // If tooltip doesn't fit on right,
//       // put it on left of sidebar target.
//       // ---------------------------------------------

//       if (
//         left + tooltipWidth >
//         window.innerWidth - 20
//       ) {

//         left =
//           spotlightRect.left -
//           tooltipWidth -
//           gap;

//       }


//       // ---------------------------------------------
//       // Keep tooltip inside screen vertically
//       // ---------------------------------------------

//       if (
//         top +
//           tooltipHeight / 2 >
//         window.innerHeight - 20
//       ) {

//         top =
//           window.innerHeight -
//           tooltipHeight / 2 -
//           20;

//       }


//       if (
//         top -
//           tooltipHeight / 2 <
//         20
//       ) {

//         top =
//           tooltipHeight / 2 +
//           20;

//       }


//       return {

//         top: `${top}px`,

//         left: `${left}px`,

//         transform:
//           'translateY(-50%)'

//       };

//     }


//     // =====================================================
//     // WEATHER / CROP TRACKER
//     // =====================================================

//     let top =
//       spotlightRect.top +
//       spotlightRect.height +
//       18;


//     let left =
//       spotlightRect.left +
//       spotlightRect.width / 2;


//     // Keep horizontally inside screen

//     if (
//       left -
//         tooltipWidth / 2 <
//       20
//     ) {

//       left =
//         tooltipWidth / 2 +
//         20;

//     }


//     if (
//       left +
//         tooltipWidth / 2 >
//       window.innerWidth - 20
//     ) {

//       left =
//         window.innerWidth -
//         tooltipWidth / 2 -
//         20;

//     }


//     // If not enough room below,
//     // place it above target.

//     if (
//       top + tooltipHeight >
//       window.innerHeight - 20
//     ) {

//       top =
//         spotlightRect.top -
//         tooltipHeight -
//         18;

//     }


//     return {

//       top: `${top}px`,

//       left: `${left}px`,

//       transform:
//         'translateX(-50%)'

//     };

//   };


//   // =========================================================
//   // NOT VISIBLE
//   // =========================================================

//   if (!isTourVisible) {

//     return null;

//   }


//   // =========================================================
//   // RENDER
//   // =========================================================

//   return createPortal(

//     <div className="tour-overlay-wrapper">

//       {/* ================================================
//           DARK OVERLAY + SPOTLIGHT
//       ================================================= */}

//       {spotlightRect ? (

//         <div
//           className="tour-spotlight-active"

//           style={{

//             top:
//               `${spotlightRect.top - 8}px`,

//             left:
//               `${spotlightRect.left - 8}px`,

//             width:
//               `${spotlightRect.width + 16}px`,

//             height:
//               `${spotlightRect.height + 16}px`

//           }}
//         />

//       ) : (

//         <div
//           className="tour-backdrop-center"
//         />

//       )}


//       {/* ================================================
//           POINTER ARROW
//       ================================================= */}

//       {spotlightRect && (

//         <div

//           className={`
//             tour-arrow
//             ${
//               currentStep.type === 'sidebar'
//                 ? 'arrow-left'
//                 : 'arrow-top'
//             }
//           `}

//           style={

//             currentStep.type === 'sidebar'

//               ? {

//                   /*
//                     Arrow points from tooltip
//                     toward sidebar item.
//                   */

//                   top:
//                     spotlightRect.top +
//                     spotlightRect.height / 2 -
//                     10,

//                   left:
//                     spotlightRect.left +
//                     spotlightRect.width +
//                     3

//                 }

//               : {

//                   top:
//                     spotlightRect.top +
//                     spotlightRect.height +
//                     3,

//                   left:
//                     spotlightRect.left +
//                     spotlightRect.width / 2 -
//                     10

//                 }

//           }

//         />

//       )}


//       {/* ================================================
//           TOOLTIP
//       ================================================= */}

//       <div

//         className={`
//           tour-tooltip-wrapper

//           ${
//             isWelcome
//               ? 'tour-welcome-wrapper'
//               : ''
//           }

//           ${
//             isComplete
//               ? 'tour-complete-wrapper'
//               : ''
//           }

//           ${
//             currentStep.type === 'sidebar'
//               ? 'tour-sidebar-tooltip'
//               : ''
//           }
//         `}

//         style={getTooltipStyle()}

//       >

//         {/* ==============================================
//             WELCOME
//         ============================================== */}

//         {isWelcome && (

//           <>

//             <div className="tour-body">

//               <div className="welcome-illustration">

//                 <img
//                   src="https://img.freepik.com/free-vector/farmer-concept-illustration_114360-1535.jpg"
//                   alt="Farmer"
//                 />

//               </div>


//               <div className="welcome-content">

//                 <h2>
//                   {currentStep.title}
//                 </h2>


//                 <div className="subtitle">
//                   {currentStep.content}
//                 </div>

//               </div>

//             </div>


//             <div className="tour-welcome-footer">

//               <button
//                 type="button"
//                 className="btn-primary btn-start-tour"
//                 onClick={startTour}
//               >
//                 Start Tour
//               </button>


//               <button
//                 type="button"
//                 className="btn-skip-now"
//                 onClick={skipTour}
//               >
//                 Skip for now
//               </button>

//             </div>

//           </>

//         )}


//         {/* ==============================================
//             NORMAL STEP
//         ============================================== */}

//         {!isWelcome && !isComplete && (

//           <>

//             <div className="tour-body">

//               <h3 className="tour-title">
//                 {currentStep.title}
//               </h3>


//               <div className="tour-desc">
//                 {currentStep.content}
//               </div>

//             </div>


//             <div className="tour-footer">

//               <div className="tour-progress">
//                 {actualStepNumber}/{totalTourSteps}
//               </div>


//               <div className="tour-actions">

//                 <button
//                   type="button"
//                   className="btn-back"
//                   onClick={handleBack}
//                 >
//                   Back
//                 </button>


//                 <button
//                   type="button"
//                   className="btn-skip"
//                   onClick={skipTour}
//                 >
//                   Skip
//                 </button>


//                 <button
//                   type="button"
//                   className="btn-primary"
//                   onClick={handleNext}
//                 >
//                   Next
//                 </button>

//               </div>

//             </div>

//           </>

//         )}


//         {/* ==============================================
//             COMPLETE
//         ============================================== */}

//         {isComplete && (

//           <>

//             <div className="tour-complete-body">

//               <div className="complete-check">
//                 ✓
//               </div>


//               <h2>
//                 You're All Set! 🎉
//               </h2>


//               <p>
//                 You now know the main tools
//                 of FarmXpert.
//               </p>


//               <p className="happy-farming">
//                 Happy Farming!
//               </p>

//             </div>


//             <div className="tour-complete-footer">

//               <button
//                 type="button"
//                 className="btn-primary explore-dashboard-btn"
//                 onClick={finishTour}
//               >
//                 Explore Dashboard
//               </button>

//             </div>

//           </>

//         )}

//       </div>

//     </div>,

//     document.body

//   );

// };


// export default GuidedTour;






















// // src/components/GuidedTour/GuidedTour.jsx
// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { createPortal } from 'react-dom';
// import Cookies from 'js-cookie';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './guidedTour.css';

// const TOUR_COMPLETED_KEY = 'farmxpert_tour_completed';
// const TOUR_SKIPPED_KEY = 'farmxpert_tour_skipped';

// const GuidedTour = ({ isActive = false, onTourComplete, onTourSkip }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [stepIndex, setStepIndex] = useState(0);
//   const [isTourVisible, setIsTourVisible] = useState(false);
//   const [tourStarted, setTourStarted] = useState(false);
//   const [spotlightRect, setSpotlightRect] = useState(null);
//   const [isAnimating, setIsAnimating] = useState(false); // For smooth transitions
  
//   const isNavigating = useRef(false);

//   // =========================================================
//   // TOUR STEPS
//   // =========================================================
//   const steps = [
//     {
//       id: 'welcome',
//       title: 'Welcome to FarmXpert! 👋',
//       content: (
//         <div className="welcome-text-wrapper">
//           <div className="welcome-description">
//             Let's take a quick tour to help you get started.
//           </div>
//           <ul className="feature-list">
//             <li>✓ Dashboard Overview</li>
//             <li>✓ Smart Farm Tools</li>
//             <li>✓ Manage Your Farm</li>
//             <li>✓ Get Expert Insights</li>
//           </ul>
//         </div>
//       ),
//       target: null,
//       type: 'welcome',
//       navigateTo: null,
//     },
//     {
//       id: 'dashboard',
//       title: '📊 This is your Dashboard',
//       content: 'Here you can see an overview of your farm, weather, crop status, and important alerts.',
//       target: '[data-tour="dashboard"]',
//       type: 'sidebar',
//       navigateTo: '/dashboard',
//     },
//     {
//       id: 'weather',
//       title: '🌤️ Weather Information',
//       content: 'Check real-time weather updates and forecasts to plan your farming activities.',
//       target: '[data-tour="weather"]',
//       type: 'weather',
//       navigateTo: '/dashboard',
//     },
//     {
//       id: 'crop-tracker',
//       title: '🌱 Crop Tracker',
//       content: 'Track your crop growth stage and days passed to take timely farming actions.',
//       target: '[data-tour="crop-tracker"]',
//       type: 'crop-tracker',
//       navigateTo: '/dashboard',
//     },
//     {
//       id: 'crop-consult',
//       title: '🌱 Crop Consult',
//       content: 'Get AI-based crop recommendations based on your soil and environmental conditions.',
//       target: '[data-tour="crop-consult"]',
//       type: 'sidebar',
//       navigateTo: '/crop-recommend',
//     },
//     {
//       id: 'disease-lab',
//       title: '🔬 Disease Lab',
//       content: 'Upload a leaf image to detect diseases early and get suggested solutions.',
//       target: '[data-tour="disease-lab"]',
//       type: 'sidebar',
//       navigateTo: '/disease-detect',
//     },
//     {
//       id: 'yield-forecast',
//       title: '📈 Yield Forecast',
//       content: 'Estimate your harvest yield based on your crop type, land area, and available data.',
//       target: '[data-tour="yield-forecast"]',
//       type: 'sidebar',
//       navigateTo: '/yield-predict',
//     },
//     {
//       id: 'farm-store',
//       title: '🛒 Farm Store',
//       content: 'Buy quality seeds, fertilizers, and other farming products easily.',
//       target: '[data-tour="farm-store"]',
//       type: 'sidebar',
//       navigateTo: '/store',
//     },
//     {
//       id: 'complete',
//       title: "You're All Set! 🎉",
//       content: 'You now know the main tools of FarmXpert. Happy Farming!',
//       target: null,
//       type: 'complete',
//       navigateTo: null,
//     }
//   ];

//   const currentStep = steps[stepIndex];
//   const isWelcome = currentStep?.type === 'welcome';
//   const isComplete = currentStep?.type === 'complete';
//   const actualStepNumber = Math.max(1, stepIndex);
//   const totalTourSteps = 7;

//   // =========================================================
//   // FIND TARGET
//   // =========================================================
//   const findTarget = useCallback(() => {
//     if (!currentStep?.target) {
//       setSpotlightRect(null);
//       return false;
//     }

//     const element = document.querySelector(currentStep.target);
//     if (!element) {
//       setSpotlightRect(null);
//       return false;
//     }

//     const rect = element.getBoundingClientRect();
//     setSpotlightRect({
//       top: rect.top,
//       left: rect.left,
//       width: rect.width,
//       height: rect.height,
//     });
//     return true;
//   }, [currentStep]);

//   // =========================================================
//   // FIRST TIME USER / MANUAL TOUR
//   // =========================================================
//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     let user = null;
//     try {
//       const cookie = Cookies.get('user');
//       if (cookie) user = JSON.parse(cookie);
//     } catch (error) {
//       console.error('Unable to read FarmXpert user cookie', error);
//     }

//     if (isActive) {
//       setStepIndex(0);
//       setTourStarted(false);
//       setIsTourVisible(true);
//       return;
//     }

//     const completed = localStorage.getItem(TOUR_COMPLETED_KEY);
//     const skipped = localStorage.getItem(TOUR_SKIPPED_KEY);

//     if (user && !completed && !skipped) {
//       setStepIndex(0);
//       setTourStarted(false);
//       setIsTourVisible(true);
//     }
//   }, [isActive]);

//   // =========================================================
//   // SMART SPOTLIGHT POLLING 
//   // =========================================================
//   useEffect(() => {
//     if (!isTourVisible || !tourStarted || isWelcome || isComplete || isNavigating.current) {
//       setSpotlightRect(null);
//       return;
//     }

//     let frameId;

//     const checkForElement = () => {
//       const found = findTarget();
//       if (found) {
//         setIsAnimating(false); // Stop animation lock
//         return; 
//       }
//       frameId = requestAnimationFrame(checkForElement);
//     };

//     frameId = requestAnimationFrame(checkForElement);

//     return () => {
//       if (frameId) cancelAnimationFrame(frameId);
//     };
//   }, [isTourVisible, tourStarted, stepIndex, currentStep, isWelcome, isComplete, findTarget]);

//   // =========================================================
//   // UPDATE ON RESIZE / SCROLL
//   // =========================================================
//   useEffect(() => {
//     if (!isTourVisible || !tourStarted) return;
//     const update = () => findTarget();
//     window.addEventListener('resize', update);
//     window.addEventListener('scroll', update, true);
//     return () => {
//       window.removeEventListener('resize', update);
//       window.removeEventListener('scroll', update, true);
//     };
//   }, [isTourVisible, tourStarted, findTarget]);

//   // =========================================================
//   // START TOUR
//   // =========================================================
//   const startTour = () => {
//     setTourStarted(true);
//     const nextStep = steps[1];
//     if (nextStep.navigateTo && location.pathname !== nextStep.navigateTo) {
//       navigate(nextStep.navigateTo);
//     }
//     setStepIndex(1);
//   };

//   // =========================================================
//   // NEXT (SMOOTH FADE GLIDE)
//   // =========================================================
//   const handleNext = () => {
//     if (isComplete) {
//       finishTour();
//       return;
//     }

//     const nextStep = steps[stepIndex + 1];
//     if (nextStep) {
//       setIsAnimating(true); // Trigger fade out

//       if (nextStep.navigateTo && location.pathname !== nextStep.navigateTo) {
//         isNavigating.current = true;
//         setSpotlightRect(null); 
//         navigate(nextStep.navigateTo);
        
//         // Navigate delay
//         setTimeout(() => {
//           isNavigating.current = false;
//           setStepIndex(prev => prev + 1);
//         }, 100); 
//       } else {
//         // Elegant fade-glide delay 
//         setTimeout(() => {
//           setStepIndex(prev => prev + 1);
//         }, 300); 
//       }
//     }
//   };

//   // =========================================================
//   // BACK, SKIP, FINISH
//   // =========================================================
//   const handleBack = () => {
//     if (stepIndex <= 1) {
//       setStepIndex(0);
//       setTourStarted(false);
//       return;
//     }
//     setStepIndex(prev => prev - 1);
//   };

//   const skipTour = () => {
//     setIsTourVisible(false);
//     setTourStarted(false);
//     setSpotlightRect(null);
//     localStorage.setItem(TOUR_SKIPPED_KEY, 'true');
//     localStorage.removeItem(TOUR_COMPLETED_KEY);
//     if (onTourSkip) onTourSkip();
//     else if (onTourComplete) onTourComplete();
//   };

//   const finishTour = () => {
//     setIsTourVisible(false);
//     setTourStarted(false);
//     setSpotlightRect(null);
//     localStorage.setItem(TOUR_COMPLETED_KEY, 'true');
//     localStorage.removeItem(TOUR_SKIPPED_KEY);
//     if (onTourComplete) onTourComplete();
//     if (location.pathname !== '/dashboard') navigate('/dashboard');
//   };

//   // =========================================================
//   // ESCAPE KEY
//   // =========================================================
//   useEffect(() => {
//     if (!isTourVisible) return;
//     const handleEscape = (event) => {
//       if (event.key === 'Escape') skipTour();
//     };
//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, [isTourVisible]);

//   // =========================================================
//   // TOOLTIP POSITION
//   // =========================================================
//   const getTooltipStyle = () => {
//     if (isWelcome || isComplete || !spotlightRect) {
//       return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
//     }

//     const tooltipWidth = 360;
//     const tooltipHeight = 190;
//     const gap = 18;

//     if (currentStep.type === 'sidebar') {
//       let left = spotlightRect.left + spotlightRect.width + gap;
//       let top = spotlightRect.top + spotlightRect.height / 2;

//       if (left + tooltipWidth > window.innerWidth - 20) {
//         left = spotlightRect.left - tooltipWidth - gap;
//       }
//       if (top + tooltipHeight / 2 > window.innerHeight - 20) {
//         top = window.innerHeight - tooltipHeight / 2 - 20;
//       }
//       if (top - tooltipHeight / 2 < 20) {
//         top = tooltipHeight / 2 + 20;
//       }

//       return { top: `${top}px`, left: `${left}px`, transform: 'translateY(-50%)' };
//     }

//     let top = spotlightRect.top + spotlightRect.height + 18;
//     let left = spotlightRect.left + spotlightRect.width / 2;

//     if (left - tooltipWidth / 2 < 20) left = tooltipWidth / 2 + 20;
//     if (left + tooltipWidth / 2 > window.innerWidth - 20) left = window.innerWidth - tooltipWidth / 2 - 20;
//     if (top + tooltipHeight > window.innerHeight - 20) top = spotlightRect.top - tooltipHeight - 18;

//     return { top: `${top}px`, left: `${left}px`, transform: 'translateX(-50%)' };
//   };

//   // =========================================================
//   // NOT VISIBLE
//   // =========================================================
//   if (!isTourVisible) return null;

//   // =========================================================
//   // RENDER
//   // =========================================================
//   return createPortal(
//     <div className="tour-overlay-wrapper">
//       {spotlightRect ? (
//         <div
//           className={`tour-spotlight-active ${isAnimating ? 'tour-animating' : ''}`}
//           style={{
//             top: `${spotlightRect.top - 8}px`,
//             left: `${spotlightRect.left - 8}px`,
//             width: `${spotlightRect.width + 16}px`,
//             height: `${spotlightRect.height + 16}px`
//           }}
//         />
//       ) : (
//         <div className="tour-backdrop-center" />
//       )}

//       {spotlightRect && (
//         <div
//           className={`tour-arrow ${currentStep.type === 'sidebar' ? 'arrow-left' : 'arrow-top'} ${isAnimating ? 'tour-animating' : ''}`}
//           style={
//             currentStep.type === 'sidebar'
//               ? {
//                   top: spotlightRect.top + spotlightRect.height / 2 - 10,
//                   left: spotlightRect.left + spotlightRect.width + 3
//                 }
//               : {
//                   top: spotlightRect.top + spotlightRect.height + 3,
//                   left: spotlightRect.left + spotlightRect.width / 2 - 10
//                 }
//           }
//         />
//       )}

//       <div
//         className={`tour-tooltip-wrapper ${isWelcome ? 'tour-welcome-wrapper' : ''} ${isComplete ? 'tour-complete-wrapper' : ''} ${currentStep.type === 'sidebar' ? 'tour-sidebar-tooltip' : ''} ${isAnimating ? 'tour-animating' : ''}`}
//         style={getTooltipStyle()}
//       >
//         {isWelcome && (
//           <>
//             <div className="tour-body">
//               <div className="welcome-illustration">
//                 <img src="https://img.freepik.com/free-vector/farmer-concept-illustration_114360-1535.jpg" alt="Farmer" />
//               </div>
//               <div className="welcome-content">
//                 <h2>{currentStep.title}</h2>
//                 <div className="subtitle">{currentStep.content}</div>
//               </div>
//             </div>
//             <div className="tour-welcome-footer">
//               <button type="button" className="btn-primary btn-start-tour" onClick={startTour}>
//                 Start Tour
//               </button>
//               <button type="button" className="btn-skip-now" onClick={skipTour}>
//                 Skip for now
//               </button>
//             </div>
//           </>
//         )}

//         {!isWelcome && !isComplete && (
//           <>
//             <div className="tour-body">
//               <h3 className="tour-title">{currentStep.title}</h3>
//               <div className="tour-desc">{currentStep.content}</div>
//             </div>
//             <div className="tour-footer">
//               <div className="tour-progress">{actualStepNumber}/{totalTourSteps}</div>
//               <div className="tour-actions">
//                 <button type="button" className="btn-back" onClick={handleBack}>Back</button>
//                 <button type="button" className="btn-skip" onClick={skipTour}>Skip</button>
//                 <button type="button" className="btn-primary" onClick={handleNext}>Next</button>
//               </div>
//             </div>
//           </>
//         )}

//         {isComplete && (
//           <>
//             <div className="tour-complete-body">
//               <div className="complete-check">✓</div>
//               <h2>You're All Set! 🎉</h2>
//               <p>You now know the main tools of FarmXpert.</p>
//               <p className="happy-farming">Happy Farming!</p>
//             </div>
//             <div className="tour-complete-footer">
//               <button type="button" className="btn-primary explore-dashboard-btn" onClick={finishTour}>
//                 Explore Dashboard
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default GuidedTour;













// // src/components/GuidedTour/GuidedTour.jsx

// import React, {
//   useEffect,
//   useState,
//   useCallback,
//   useRef
// } from "react";

// import { createPortal } from "react-dom";
// import Cookies from "js-cookie";

// import {
//   useNavigate,
//   useLocation
// } from "react-router-dom";

// import "./guidedTour.css";


// const TOUR_COMPLETED_KEY =
//   "farmxpert_tour_completed";

// const TOUR_SKIPPED_KEY =
//   "farmxpert_tour_skipped";


// const GuidedTour = ({
//   isActive = false,
//   onTourComplete,
//   onTourSkip
// }) => {

//   const navigate = useNavigate();
//   const location = useLocation();


//   // =========================================================
//   // STATE
//   // =========================================================

//   const [stepIndex, setStepIndex] =
//     useState(0);

//   const [isTourVisible, setIsTourVisible] =
//     useState(false);

//   const [tourStarted, setTourStarted] =
//     useState(false);

//   const [spotlightRect, setSpotlightRect] =
//     useState(null);

//   const [isAnimating, setIsAnimating] =
//     useState(false);


//   const isNavigating =
//     useRef(false);


//   // =========================================================
//   // TOUR STEPS
//   // =========================================================

//   const steps = [

//     // =======================================================
//     // WELCOME
//     // =======================================================

//     {
//       id: "welcome",

//       title:
//         "Welcome to FarmXpert! 👋",

//       content: (
//         <div className="welcome-text-wrapper">

//           <div className="welcome-description">
//             Let's take a quick tour to help you get started.
//           </div>

//           <ul className="feature-list">

//             <li>
//               ✓ Dashboard Overview
//             </li>

//             <li>
//               ✓ Smart Farm Tools
//             </li>

//             <li>
//               ✓ Manage Your Farm
//             </li>

//             <li>
//               ✓ Get Expert Insights
//             </li>

//           </ul>

//         </div>
//       ),

//       target: null,

//       type: "welcome",

//       navigateTo: null
//     },


//     // =======================================================
//     // DASHBOARD
//     // =======================================================

//     {
//       id: "dashboard",

//       title:
//         "📊 This is your Dashboard",

//       content:
//         "Here you can see an overview of your farm, weather, crop status, and important alerts.",

//       target:
//         '[data-tour="dashboard"]',

//       type: "sidebar",

//       navigateTo:
//         "/dashboard"
//     },


//     // =======================================================
//     // WEATHER
//     // =======================================================

//     {
//       id: "weather",

//       title:
//         "🌤️ Weather Information",

//       content:
//         "Check real-time weather updates and forecasts to plan your farming activities.",

//       target:
//         '[data-tour="weather-card"]',

//       type: "weather-card",

//       navigateTo:
//         "/dashboard"
//     },


//     // =======================================================
//     // CROP TRACKER
//     // =======================================================

//     {
//       id: "crop-tracker",

//       title:
//         "🌱 Crop Tracker",

//       content:
//         "Track your crop growth stage and days passed to take timely farming actions.",

//       target:
//         '[data-tour="crop-tracker"]',

//       type: "crop-tracker",

//       navigateTo:
//         "/dashboard"
//     },


//     // =======================================================
//     // CROP CONSULT
//     // =======================================================

//     {
//       id: "crop-consult",

//       title:
//         "🌱 Crop Consult",

//       content:
//         "Get AI-based crop recommendations based on your soil and environmental conditions.",

//       target:
//         '[data-tour="crop-consult"]',

//       type: "sidebar",

//       navigateTo:
//         "/crop-recommend"
//     },


//     // =======================================================
//     // YIELD FORECAST
//     // =======================================================

//     {
//       id: "yield-forecast",

//       title:
//         "📈 Yield Forecast",

//       content:
//         "Estimate your harvest yield based on your crop type, land area, and available data.",

//       target:
//         '[data-tour="yield-forecast"]',

//       type: "sidebar",

//       navigateTo:
//         "/yield-predict"
//     },


//     // =======================================================
//     // DISEASE LAB
//     // =======================================================

//     {
//       id: "disease-lab",

//       title:
//         "🔬 Disease Lab",

//       content:
//         "Upload a leaf image to detect diseases early and get suggested solutions.",

//       target:
//         '[data-tour="disease-lab"]',

//       type: "sidebar",

//       navigateTo:
//         "/disease-detect"
//     },


//     // =======================================================
//     // SOIL TESTING
//     // =======================================================

//     {
//       id: "soil-testing",

//       title:
//         "🧪 Soil Testing",

//       content:
//         "Find nearby soil testing centers and get expert analysis for better crop planning.",

//       target:
//         '[data-tour="soil-testing"]',

//       type: "sidebar",

//       navigateTo:
//         "/soil-centers"
//     },


//     // =======================================================
//     // FARM STORE
//     // =======================================================

//     {
//       id: "farm-store",

//       title:
//         "🛒 Farm Store",

//       content:
//         "Buy quality seeds, fertilizers, and other farming products easily.",

//       target:
//         '[data-tour="farm-store"]',

//       type: "sidebar",

//       navigateTo:
//         "/store"
//     },


//     // =======================================================
//     // COMPLETE
//     // =======================================================

//     {
//       id: "complete",

//       title:
//         "You're All Set! 🎉",

//       content:
//         "You now know the main tools of FarmXpert. Happy Farming!",

//       target: null,

//       type: "complete",

//       navigateTo: null
//     }

//   ];


//   // =========================================================
//   // CURRENT STEP
//   // =========================================================

//   const currentStep =
//     steps[stepIndex];

//   const isWelcome =
//     currentStep?.type === "welcome";

//   const isComplete =
//     currentStep?.type === "complete";


//   const actualStepNumber =
//     Math.max(1, stepIndex);


//   const totalTourSteps =
//     8;


//   // =========================================================
//   // FIND TARGET
//   // =========================================================

//   const findTarget = useCallback(() => {

//     if (!currentStep?.target) {

//       setSpotlightRect(null);

//       return false;

//     }


//     const element =
//       document.querySelector(
//         currentStep.target
//       );


//     if (!element) {

//       setSpotlightRect(null);

//       return false;

//     }


//     const rect =
//       element.getBoundingClientRect();


//     setSpotlightRect({

//       top:
//         rect.top,

//       left:
//         rect.left,

//       width:
//         rect.width,

//       height:
//         rect.height

//     });


//     return true;

//   }, [currentStep]);


//   // =========================================================
//   // NORMAL / FIRST-TIME TOUR
//   // =========================================================

//   useEffect(() => {

//     if (
//       typeof window === "undefined"
//     ) {
//       return;
//     }


//     let user = null;


//     try {

//       const cookie =
//         Cookies.get("user");


//       if (cookie) {

//         user =
//           JSON.parse(cookie);

//       }

//     } catch (error) {

//       console.error(
//         "Unable to read FarmXpert user cookie",
//         error
//       );

//     }


//     // -------------------------------------------------------
//     // EXTERNAL ACTIVE TOUR
//     // -------------------------------------------------------

//     if (isActive) {

//       setStepIndex(0);

//       setTourStarted(false);

//       setIsTourVisible(true);

//       return;

//     }


//     // -------------------------------------------------------
//     // FIRST TIME USER
//     // -------------------------------------------------------

//     const completed =
//       localStorage.getItem(
//         TOUR_COMPLETED_KEY
//       );


//     const skipped =
//       localStorage.getItem(
//         TOUR_SKIPPED_KEY
//       );


//     if (
//       user &&
//       !completed &&
//       !skipped
//     ) {

//       setStepIndex(0);

//       setTourStarted(false);

//       setIsTourVisible(true);

//     }

//   }, [isActive]);


//   // =========================================================
//   // START TOUR BUTTON
//   //
//   // This is used ONLY when the user sees the Welcome screen.
//   // =========================================================

//   const startTour = useCallback(() => {

//     setIsTourVisible(true);

//     setTourStarted(true);


//     const nextStep =
//       steps[1];


//     if (
//       nextStep.navigateTo &&
//       location.pathname !==
//         nextStep.navigateTo
//     ) {

//       navigate(
//         nextStep.navigateTo
//       );

//     }


//     setStepIndex(1);

//   }, [
//     location.pathname,
//     navigate
//   ]);


//   // =========================================================
//   // SIDEBAR → HELP → GUIDED TOUR
//   //
//   // IMPORTANT:
//   // This DOES NOT show the Welcome screen.
//   // It directly starts at Dashboard.
//   // =========================================================

//   useEffect(() => {

//     const handleSidebarGuidedTour =
//       () => {

//         // ---------------------------------------------------
//         // RESET EVERYTHING
//         // ---------------------------------------------------

//         setSpotlightRect(null);

//         setIsAnimating(false);

//         isNavigating.current =
//           false;


//         // ---------------------------------------------------
//         // DIRECTLY START TOUR
//         // STEP 1 = DASHBOARD
//         // ---------------------------------------------------

//         setIsTourVisible(true);

//         setTourStarted(true);

//         setStepIndex(1);


//         // ---------------------------------------------------
//         // MAKE SURE DASHBOARD IS OPEN
//         // ---------------------------------------------------

//         if (
//           location.pathname !==
//           "/dashboard"
//         ) {

//           navigate(
//             "/dashboard"
//           );

//         }

//       };


//     window.addEventListener(
//       "farmxpert:start-guided-tour",
//       handleSidebarGuidedTour
//     );


//     return () => {

//       window.removeEventListener(
//         "farmxpert:start-guided-tour",
//         handleSidebarGuidedTour
//       );

//     };

//   }, [
//     location.pathname,
//     navigate
//   ]);


//   // =========================================================
//   // SPOTLIGHT
//   // =========================================================

//   useEffect(() => {

//     if (
//       !isTourVisible ||
//       !tourStarted ||
//       isWelcome ||
//       isComplete
//     ) {

//       setSpotlightRect(null);

//       return;

//     }


//     let frameId;


//     const checkForElement =
//       () => {

//         const found =
//           findTarget();


//         if (found) {

//           setIsAnimating(
//             false
//           );

//           return;

//         }


//         frameId =
//           requestAnimationFrame(
//             checkForElement
//           );

//       };


//     frameId =
//       requestAnimationFrame(
//         checkForElement
//       );


//     return () => {

//       if (frameId) {

//         cancelAnimationFrame(
//           frameId
//         );

//       }

//     };

//   }, [
//     isTourVisible,
//     tourStarted,
//     stepIndex,
//     currentStep,
//     isWelcome,
//     isComplete,
//     findTarget
//   ]);


//   // =========================================================
//   // RESIZE / SCROLL
//   // =========================================================

//   useEffect(() => {

//     if (
//       !isTourVisible ||
//       !tourStarted
//     ) {
//       return;
//     }


//     const update =
//       () => findTarget();


//     window.addEventListener(
//       "resize",
//       update
//     );


//     window.addEventListener(
//       "scroll",
//       update,
//       true
//     );


//     return () => {

//       window.removeEventListener(
//         "resize",
//         update
//       );


//       window.removeEventListener(
//         "scroll",
//         update,
//         true
//       );

//     };

//   }, [
//     isTourVisible,
//     tourStarted,
//     findTarget
//   ]);


//   // =========================================================
//   // NEXT
//   // =========================================================

//   const handleNext = () => {

//     if (isComplete) {

//       finishTour();

//       return;

//     }


//     const nextStep =
//       steps[stepIndex + 1];


//     if (!nextStep) {
//       return;
//     }


//     setIsAnimating(true);


//     if (
//       nextStep.navigateTo &&
//       location.pathname !==
//         nextStep.navigateTo
//     ) {

//       isNavigating.current =
//         true;


//       setSpotlightRect(
//         null
//       );


//       navigate(
//         nextStep.navigateTo
//       );


//       setTimeout(() => {

//         isNavigating.current =
//           false;


//         setStepIndex(
//           previous =>
//             previous + 1
//         );

//       }, 250);

//     } else {

//       setTimeout(() => {

//         setStepIndex(
//           previous =>
//             previous + 1
//         );

//         setIsAnimating(
//           false
//         );

//       }, 250);

//     }

//   };


//   // =========================================================
//   // BACK
//   // =========================================================

//   const handleBack = () => {

//     if (stepIndex <= 1) {

//       setStepIndex(0);

//       setTourStarted(false);

//       return;

//     }


//     setStepIndex(
//       previous =>
//         previous - 1
//     );

//   };


//   // =========================================================
//   // SKIP
//   // =========================================================

//   const skipTour = () => {

//     setIsTourVisible(
//       false
//     );

//     setTourStarted(
//       false
//     );

//     setSpotlightRect(
//       null
//     );


//     localStorage.setItem(
//       TOUR_SKIPPED_KEY,
//       "true"
//     );


//     localStorage.removeItem(
//       TOUR_COMPLETED_KEY
//     );


//     if (onTourSkip) {

//       onTourSkip();

//     }

//   };


//   // =========================================================
//   // FINISH
//   // =========================================================

//   const finishTour = () => {

//     setIsTourVisible(
//       false
//     );

//     setTourStarted(
//       false
//     );

//     setSpotlightRect(
//       null
//     );


//     localStorage.setItem(
//       TOUR_COMPLETED_KEY,
//       "true"
//     );


//     localStorage.removeItem(
//       TOUR_SKIPPED_KEY
//     );


//     if (onTourComplete) {

//       onTourComplete();

//     }


//     if (
//       location.pathname !==
//       "/dashboard"
//     ) {

//       navigate(
//         "/dashboard"
//       );

//     }

//   };


//   // =========================================================
//   // ESCAPE
//   // =========================================================

//   useEffect(() => {

//     if (!isTourVisible) {
//       return;
//     }


//     const handleEscape =
//       (event) => {

//         if (
//           event.key ===
//           "Escape"
//         ) {

//           skipTour();

//         }

//       };


//     document.addEventListener(
//       "keydown",
//       handleEscape
//     );


//     return () => {

//       document.removeEventListener(
//         "keydown",
//         handleEscape
//       );

//     };

//   }, [isTourVisible]);


//   // =========================================================
//   // TOOLTIP POSITION
//   // =========================================================

//   const getTooltipStyle =
//     () => {

//       if (
//         isWelcome ||
//         isComplete ||
//         !spotlightRect
//       ) {

//         return {

//           top: "50%",

//           left: "50%",

//           transform:
//             "translate(-50%, -50%)"

//         };

//       }


//       const tooltipWidth =
//         360;

//       const tooltipHeight =
//         190;

//       const gap =
//         18;


//       // -----------------------------------------------------
//       // SIDEBAR
//       // -----------------------------------------------------

//       if (
//         currentStep.type ===
//         "sidebar"
//       ) {

//         let left =
//           spotlightRect.left +
//           spotlightRect.width +
//           gap;


//         let top =
//           spotlightRect.top +
//           spotlightRect.height /
//             2;


//         if (
//           left +
//             tooltipWidth >
//           window.innerWidth - 20
//         ) {

//           left =
//             spotlightRect.left -
//             tooltipWidth -
//             gap;

//         }


//         if (
//           top +
//             tooltipHeight / 2 >
//           window.innerHeight - 20
//         ) {

//           top =
//             window.innerHeight -
//             tooltipHeight / 2 -
//             20;

//         }


//         if (
//           top -
//             tooltipHeight / 2 <
//           20
//         ) {

//           top =
//             tooltipHeight / 2 +
//             20;

//         }


//         return {

//           top:
//             `${top}px`,

//           left:
//             `${left}px`,

//           transform:
//             "translateY(-50%)"

//         };

//       }


//       // -----------------------------------------------------
//       // DASHBOARD CARDS
//       // -----------------------------------------------------

//       let top =
//         spotlightRect.top +
//         spotlightRect.height +
//         18;


//       let left =
//         spotlightRect.left +
//         spotlightRect.width /
//           2;


//       if (
//         left -
//           tooltipWidth / 2 <
//         20
//       ) {

//         left =
//           tooltipWidth / 2 +
//           20;

//       }


//       if (
//         left +
//           tooltipWidth / 2 >
//         window.innerWidth - 20
//       ) {

//         left =
//           window.innerWidth -
//           tooltipWidth / 2 -
//           20;

//       }


//       if (
//         top +
//           tooltipHeight >
//         window.innerHeight - 20
//       ) {

//         top =
//           spotlightRect.top -
//           tooltipHeight -
//           18;

//       }


//       return {

//         top:
//           `${top}px`,

//         left:
//           `${left}px`,

//         transform:
//           "translateX(-50%)"

//       };

//     };


//   // =========================================================
//   // NOT VISIBLE
//   // =========================================================

//   if (!isTourVisible) {

//     return null;

//   }


//   // =========================================================
//   // RENDER
//   // =========================================================

//   return createPortal(

//     <div
//       className="tour-overlay-wrapper"
//     >

//       {/* ====================================================
//           SPOTLIGHT
//           ==================================================== */}

//       {spotlightRect ? (

//         <div
//           className={`
//             tour-spotlight-active
//             ${
//               isAnimating
//                 ? "tour-animating"
//                 : ""
//             }
//           `}
//           style={{

//             top:
//               `${spotlightRect.top - 8}px`,

//             left:
//               `${spotlightRect.left - 8}px`,

//             width:
//               `${spotlightRect.width + 16}px`,

//             height:
//               `${spotlightRect.height + 16}px`

//           }}
//         />

//       ) : (

//         <div
//           className="tour-backdrop-center"
//         />

//       )}


//       {/* ====================================================
//           ARROW
//           ==================================================== */}

//       {spotlightRect && (

//         <div
//           className={`
//             tour-arrow
//             ${
//               currentStep.type ===
//               "sidebar"
//                 ? "arrow-left"
//                 : "arrow-top"
//             }
//             ${
//               isAnimating
//                 ? "tour-animating"
//                 : ""
//             }
//           `}
//           style={

//             currentStep.type ===
//             "sidebar"

//               ? {

//                   top:
//                     spotlightRect.top +
//                     spotlightRect.height /
//                       2 -
//                     10,

//                   left:
//                     spotlightRect.left +
//                     spotlightRect.width +
//                     3

//                 }

//               : {

//                   top:
//                     spotlightRect.top +
//                     spotlightRect.height +
//                     3,

//                   left:
//                     spotlightRect.left +
//                     spotlightRect.width /
//                       2 -
//                     10

//                 }

//           }
//         />

//       )}


//       {/* ====================================================
//           TOOLTIP
//           ==================================================== */}

//       <div
//         className={`
//           tour-tooltip-wrapper

//           ${
//             isWelcome
//               ? "tour-welcome-wrapper"
//               : ""
//           }

//           ${
//             isComplete
//               ? "tour-complete-wrapper"
//               : ""
//           }

//           ${
//             currentStep.type ===
//             "sidebar"
//               ? "tour-sidebar-tooltip"
//               : ""
//           }

//           ${
//             isAnimating
//               ? "tour-animating"
//               : ""
//           }
//         `}
//         style={
//           getTooltipStyle()
//         }
//       >

//         {/* ==================================================
//             WELCOME
//             ================================================== */}

//         {isWelcome && (

//           <>

//             <div className="tour-body">

//               <div className="welcome-illustration">

//                 <img
//                   src="https://img.freepik.com/free-vector/farmer-concept-illustration_114360-1535.jpg"
//                   alt="Farmer"
//                 />

//               </div>


//               <div className="welcome-content">

//                 <h2>
//                   {currentStep.title}
//                 </h2>

//                 <div className="subtitle">
//                   {currentStep.content}
//                 </div>

//               </div>

//             </div>


//             <div
//               className="tour-welcome-footer"
//             >

//               <button
//                 type="button"
//                 className="btn-primary btn-start-tour"
//                 onClick={
//                   startTour
//                 }
//               >
//                 Start Tour
//               </button>


//               <button
//                 type="button"
//                 className="btn-skip-now"
//                 onClick={
//                   skipTour
//                 }
//               >
//                 Skip for now
//               </button>

//             </div>

//           </>

//         )}


//         {/* ==================================================
//             NORMAL STEPS
//             ================================================== */}

//         {!isWelcome &&
//           !isComplete && (

//             <>

//               <div
//                 className="tour-body"
//               >

//                 <h3
//                   className="tour-title"
//                 >
//                   {currentStep.title}
//                 </h3>


//                 <div
//                   className="tour-desc"
//                 >
//                   {currentStep.content}
//                 </div>

//               </div>


//               <div
//                 className="tour-footer"
//               >

//                 <div
//                   className="tour-progress"
//                 >
//                   {actualStepNumber}
//                   /
//                   {totalTourSteps}
//                 </div>


//                 <div
//                   className="tour-actions"
//                 >

//                   <button
//                     type="button"
//                     className="btn-back"
//                     onClick={
//                       handleBack
//                     }
//                   >
//                     Back
//                   </button>


//                   <button
//                     type="button"
//                     className="btn-skip"
//                     onClick={
//                       skipTour
//                     }
//                   >
//                     Skip
//                   </button>


//                   <button
//                     type="button"
//                     className="btn-primary"
//                     onClick={
//                       handleNext
//                     }
//                   >
//                     Next
//                   </button>

//                 </div>

//               </div>

//             </>

//           )}


//         {/* ==================================================
//             COMPLETE
//             ================================================== */}

//         {isComplete && (

//           <>

//             <div
//               className="tour-complete-body"
//             >

//               <div
//                 className="complete-check"
//               >
//                 ✓
//               </div>


//               <h2>
//                 You're All Set! 🎉
//               </h2>


//               <p>
//                 You now know the main tools
//                 of FarmXpert.
//               </p>


//               <p
//                 className="happy-farming"
//               >
//                 Happy Farming!
//               </p>

//             </div>


//             <div
//               className="tour-complete-footer"
//             >

//               <button
//                 type="button"
//                 className="btn-primary explore-dashboard-btn"
//                 onClick={
//                   finishTour
//                 }
//               >
//                 Explore Dashboard
//               </button>

//             </div>

//           </>

//         )}

//       </div>

//     </div>,

//     document.body

//   );

// };


// export default GuidedTour;










import React, {
  useEffect,
  useState,
  useCallback,
  useRef
} from "react";

import { createPortal } from "react-dom";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  useTranslation
} from "react-i18next";

import {
  getCurrentUserId,
  getUserLanguage,
  saveUserLanguage,
  getUserTourCompletedKey,
  getUserTourSkippedKey
} from "../../utils/userLanguage";

import "./guidedTour.css";

import api from "../../api";

const GuidedTour = ({
  isActive = false,
  onTourComplete,
  onTourSkip
}) => {

  const getOnboardingStartedKey =
    useCallback(() => {

      const userId =
        getCurrentUserId();

      if (!userId) {

        return null;

      }

      return `farmxpert_onboarding_started_${userId}`;

    }, []);

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    t,
    i18n
  } = useTranslation();

  const [
    stepIndex,
    setStepIndex
  ] = useState(0);

  const [
    isTourVisible,
    setIsTourVisible
  ] = useState(false);

  const [
    tourStarted,
    setTourStarted
  ] = useState(false);

  const [
    spotlightRect,
    setSpotlightRect
  ] = useState(null);

  const [
    isAnimating,
    setIsAnimating
  ] = useState(false);

  const [
    showLanguageSelection,
    setShowLanguageSelection
  ] = useState(false);

  const isNavigating =
    useRef(false);

  const steps = [

    {
      id: "welcome",

      title:
        t(
          "guidedTour.welcome.title"
        ),

      content: (
        <div
          className="welcome-text-wrapper"
        >

          <div
            className="welcome-description"
          >

            {t(
              "guidedTour.welcome.description"
            )}

          </div>

          <ul
            className="feature-list"
          >

            <li>
              ✓{" "}
              {t(
                "guidedTour.welcome.features.dashboard"
              )}
            </li>

            <li>
              ✓{" "}
              {t(
                "guidedTour.welcome.features.smartTools"
              )}
            </li>

            <li>
              ✓{" "}
              {t(
                "guidedTour.welcome.features.manageFarm"
              )}
            </li>

            <li>
              ✓{" "}
              {t(
                "guidedTour.welcome.features.expertInsights"
              )}
            </li>

          </ul>

        </div>
      ),

      target: null,

      type: "welcome",

      navigateTo: null
    },

    {
      id: "dashboard",

      title:
        t(
          "guidedTour.steps.dashboard.title"
        ),

      content:
        t(
          "guidedTour.steps.dashboard.description"
        ),

      target:
        '[data-tour="dashboard"]',

      type: "sidebar",

      navigateTo:
        "/dashboard"
    },

    {
      id: "weather",

      title:
        t(
          "guidedTour.steps.weather.title"
        ),

      content:
        t(
          "guidedTour.steps.weather.description"
        ),

      target:
        '[data-tour="weather-card"]',

      type: "weather-card",

      navigateTo:
        "/dashboard"
    },

    {
      id: "crop-tracker",

      title:
        t(
          "guidedTour.steps.cropTracker.title"
        ),

      content:
        t(
          "guidedTour.steps.cropTracker.description"
        ),

      target:
        '[data-tour="crop-tracker"]',

      type: "crop-tracker",

      navigateTo:
        "/dashboard"
    },

    {
      id: "crop-consult",

      title:
        t(
          "guidedTour.steps.cropConsult.title"
        ),

      content:
        t(
          "guidedTour.steps.cropConsult.description"
        ),

      target:
        '[data-tour="crop-consult"]',

      type: "sidebar",

      navigateTo:
        "/crop-recommend"
    },

    {
      id: "yield-forecast",

      title:
        t(
          "guidedTour.steps.yieldForecast.title"
        ),

      content:
        t(
          "guidedTour.steps.yieldForecast.description"
        ),

      target:
        '[data-tour="yield-forecast"]',

      type: "sidebar",

      navigateTo:
        "/yield-predict"
    },

    {
      id: "disease-lab",

      title:
        t(
          "guidedTour.steps.diseaseLab.title"
        ),

      content:
        t(
          "guidedTour.steps.diseaseLab.description"
        ),

      target:
        '[data-tour="disease-lab"]',

      type: "sidebar",

      navigateTo:
        "/disease-detect"
    },

    {
      id: "soil-testing",

      title:
        t(
          "guidedTour.steps.soilTesting.title"
        ),

      content:
        t(
          "guidedTour.steps.soilTesting.description"
        ),

      target:
        '[data-tour="soil-testing"]',

      type: "sidebar",

      navigateTo:
        "/soil-centers"
    },

    {
      id: "farm-store",

      title:
        t(
          "guidedTour.steps.farmStore.title"
        ),

      content:
        t(
          "guidedTour.steps.farmStore.description"
        ),

      target:
        '[data-tour="farm-store"]',

      type: "sidebar",

      navigateTo:
        "/store"
    },

    {
      id: "complete",

      title:
        t(
          "guidedTour.complete.title"
        ),

      content:
        t(
          "guidedTour.complete.description"
        ),

      target: null,

      type: "complete",

      navigateTo: null
    }

  ];

  const currentStep =
    steps[stepIndex];

  const isWelcome =
    currentStep?.type ===
    "welcome";

  const isComplete =
    currentStep?.type ===
    "complete";

  const actualStepNumber =
    Math.max(
      1,
      stepIndex
    );

  const totalTourSteps =
    8;

  const findTarget =
    useCallback(() => {

      if (
        !currentStep?.target
      ) {

        setSpotlightRect(
          null
        );

        return false;

      }

      const element =
        document.querySelector(
          currentStep.target
        );

      if (!element) {

        setSpotlightRect(
          null
        );

        return false;

      }

      const rect =
        element.getBoundingClientRect();

      setSpotlightRect({

        top:
          rect.top,

        left:
          rect.left,

        width:
          rect.width,

        height:
          rect.height

      });

      return true;

    }, [
      currentStep
    ]);

  /*
   * ============================================================
   * INITIAL TOUR / ONBOARDING LOGIC
   *
   * New user:
   *
   * Language Card
   *      ↓
   * Welcome Card
   *      ↓
   * Start Tour / Skip
   *      ↓
   * Guided Tour
   *
   * Old user:
   *
   * Dashboard directly
   *
   * The important part is that saved language is NOT used
   * to determine whether a user is old or new.
   *
   * We check the actual farmer profile.
   * ============================================================
   */

  useEffect(() => {

    if (
      typeof window ===
      "undefined"
    ) {

      return;

    }

    let cancelled = false;

    const resetTourState = () => {

      if (cancelled) {
        return;
      }

      setIsTourVisible(
        false
      );

      setShowLanguageSelection(
        false
      );

      setTourStarted(
        false
      );

      setStepIndex(
        0
      );

      setSpotlightRect(
        null
      );

      setIsAnimating(
        false
      );

    };

    const showLanguageCard = () => {

      if (cancelled) {
        return;
      }

      setIsTourVisible(
        true
      );

      setShowLanguageSelection(
        true
      );

      setTourStarted(
        false
      );

      setStepIndex(
        0
      );

      setSpotlightRect(
        null
      );

      setIsAnimating(
        false
      );

    };

    const showWelcomeCard = () => {

      if (cancelled) {
        return;
      }

      setIsTourVisible(
        true
      );

      setShowLanguageSelection(
        false
      );

      setTourStarted(
        false
      );

      setStepIndex(
        0
      );

      setSpotlightRect(
        null
      );

      setIsAnimating(
        false
      );

    };

    const startManualTour = () => {

      if (cancelled) {
        return;
      }

      setIsTourVisible(
        true
      );

      setShowLanguageSelection(
        false
      );

      setTourStarted(
        true
      );

      setStepIndex(
        1
      );

      setSpotlightRect(
        null
      );

      setIsAnimating(
        false
      );

    };

    const checkProfileAndStart =
      async () => {

        const completedKey =
          getUserTourCompletedKey();

        const skippedKey =
          getUserTourSkippedKey();

        const onboardingStartedKey =
          getOnboardingStartedKey();

        const completed =
          completedKey
            ? localStorage.getItem(
                completedKey
              )
            : null;

        const skipped =
          skippedKey
            ? localStorage.getItem(
                skippedKey
              )
            : null;

        const onboardingStarted =
          onboardingStartedKey
            ? localStorage.getItem(
                onboardingStartedKey
              )
            : null;

        /*
         * User has already finished or skipped
         * onboarding.
         */

        if (
          completed === "true" ||
          skipped === "true"
        ) {

          resetTourState();

          return;

        }

        /*
         * IMPORTANT:
         *
         * Check the actual farmer profile.
         *
         * Do NOT decide old/new based only on:
         *
         * getUserLanguage()
         *
         * because a language may already exist in
         * localStorage even for a new user.
         */

        let profileComplete =
          false;

        try {

          const response =
            await api.get(
              "/farmer/check"
            );

          if (cancelled) {
            return;
          }

          profileComplete =
            response?.data?.exists ===
              true &&
            response?.data?.isComplete ===
              true;

        } catch (error) {

          console.error(
            "GuidedTour profile check failed:",
            error
          );

          /*
           * If the profile request fails, don't
           * immediately start the tour.
           */

          profileComplete =
            false;

        }

        /*
         * ======================================================
         * OLD USER
         * ======================================================
         *
         * A completed farmer profile means the user is already
         * an existing/onboarded user.
         *
         * Do not show language card.
         * Do not show welcome card.
         * Do not automatically start tour.
         */

        if (
          profileComplete &&
          onboardingStarted !== "true"
        ) {

          if (completedKey) {

            localStorage.setItem(
              completedKey,
              "true"
            );

          }

          resetTourState();

          return;

        }

        /*
         * ======================================================
         * MANUAL GUIDED TOUR FROM TOPBAR
         * ======================================================
         */

        if (isActive) {

          const savedLanguage =
            getUserLanguage();

          /*
           * New/incomplete user.
           */

          if (!profileComplete) {

            /*
             * No language yet.
             *
             * Show Language Card.
             */

            if (!savedLanguage) {

              showLanguageCard();

              return;

            }

            /*
             * Language already selected and onboarding
             * was started earlier.
             *
             * Show Welcome Card instead of directly
             * jumping into the tour.
             */

            if (
              onboardingStarted ===
              "true"
            ) {

              showWelcomeCard();

              return;

            }

            /*
             * Language exists but onboarding has not
             * been confirmed.
             *
             * Show Language Card again.
             */

            showLanguageCard();

            return;

          }

          /*
           * Existing user manually clicking Guided Tour.
           *
           * Start directly at Dashboard step.
           */

          startManualTour();

          return;

        }

        /*
         * ======================================================
         * AUTOMATIC NEW USER ONBOARDING
         * ======================================================
         */

        const savedLanguage =
          getUserLanguage();

        if (!profileComplete) {

          /*
           * New user with no language.
           *
           * ALWAYS show language card first.
           */

          if (!savedLanguage) {

            showLanguageCard();

            return;

          }

          /*
           * Language selected but onboarding has not
           * been completed.
           *
           * Show Welcome card.
           */

          if (
            onboardingStarted ===
            "true"
          ) {

            showWelcomeCard();

            return;

          }

          /*
           * A language exists but this is still a
           * new/incomplete user.
           *
           * Do NOT directly start tour.
           *
           * Show Language Card.
           */

          showLanguageCard();

          return;

        }

        /*
         * Safe fallback.
         */

        resetTourState();

      };

    checkProfileAndStart();

    return () => {

      cancelled = true;

    };

  }, [
    isActive,
    getOnboardingStartedKey
  ]);

  /*
   * ============================================================
   * LANGUAGE SELECTION
   * ============================================================
   */

  const handleLanguageSelect =
    async (
      language
    ) => {

      try {

        /*
         * Change i18next immediately.
         */

        await i18n.changeLanguage(
          language
        );

        /*
         * Save language for the CURRENT USER.
         */

        saveUserLanguage(
          language
        );

        /*
         * Mark that this user has started onboarding.
         */

        const onboardingStartedKey =
          getOnboardingStartedKey();

        if (
          onboardingStartedKey
        ) {

          localStorage.setItem(
            onboardingStartedKey,
            "true"
          );

        }

        /*
         * Update HTML language.
         */

        document.documentElement.lang =
          language;

        /*
         * Hide language card.
         */

        setShowLanguageSelection(
          false
        );

        /*
         * Show Welcome card.
         *
         * IMPORTANT:
         *
         * tourStarted remains false.
         *
         * Therefore the user sees:
         *
         * Welcome to FarmXpert
         * Start Tour
         * Skip for now
         */

        setStepIndex(
          0
        );

        setTourStarted(
          false
        );

        setSpotlightRect(
          null
        );

        setIsAnimating(
          false
        );

        setIsTourVisible(
          true
        );

      } catch (error) {

        console.error(
          "Unable to change language:",
          error
        );

      }

    };

  /*
   * ============================================================
   * START TOUR
   * ============================================================
   */

  const startTour =
    useCallback(() => {

      setShowLanguageSelection(
        false
      );

      setIsTourVisible(
        true
      );

      setTourStarted(
        true
      );

      const nextStep =
        steps[1];

      if (
        nextStep.navigateTo &&
        location.pathname !==
        nextStep.navigateTo
      ) {

        navigate(
          nextStep.navigateTo
        );

      }

      setStepIndex(
        1
      );

    }, [
      location.pathname,
      navigate
    ]);

  /*
   * ============================================================
   * TOPBAR -> GUIDED TOUR EVENT
   * ============================================================
   *
   * When Topbar asks for Guided Tour:
   *
   * - New/incomplete user -> Language / Welcome card
   * - Existing user -> Tour directly
   *
   * This prevents the Topbar event from bypassing onboarding.
   */

  useEffect(() => {

    const handleGuidedTour =
      async () => {

        const savedLanguage =
          getUserLanguage();

        let profileComplete =
          false;

        try {

          const response =
            await api.get(
              "/farmer/check"
            );

          profileComplete =
            response?.data?.exists ===
              true &&
            response?.data?.isComplete ===
              true;

        } catch (error) {

          console.error(
            "GuidedTour profile check failed:",
            error
          );

          profileComplete =
            false;

        }

        const onboardingStartedKey =
          getOnboardingStartedKey();

        const onboardingStarted =
          onboardingStartedKey
            ? localStorage.getItem(
                onboardingStartedKey
              )
            : null;

        const completedKey =
          getUserTourCompletedKey();

        const skippedKey =
          getUserTourSkippedKey();

        const completed =
          completedKey
            ? localStorage.getItem(
                completedKey
              )
            : null;

        const skipped =
          skippedKey
            ? localStorage.getItem(
                skippedKey
              )
            : null;

        /*
         * Already completed/skipped.
         *
         * This is a MANUAL tour request, so old users
         * can still start the tour from Topbar.
         */

        if (
          completed === "true" ||
          skipped === "true"
        ) {

          setShowLanguageSelection(
            false
          );

          setSpotlightRect(
            null
          );

          setIsAnimating(
            false
          );

          isNavigating.current =
            false;

          setIsTourVisible(
            true
          );

          setTourStarted(
            true
          );

          setStepIndex(
            1
          );

          if (
            location.pathname !==
            "/dashboard"
          ) {

            navigate(
              "/dashboard"
            );

          }

          return;

        }

        /*
         * New/incomplete user.
         */

        if (!profileComplete) {

          /*
           * No language.
           */

          if (!savedLanguage) {

            setIsTourVisible(
              true
            );

            setShowLanguageSelection(
              true
            );

            setTourStarted(
              false
            );

            setStepIndex(
              0
            );

            setSpotlightRect(
              null
            );

            return;

          }

          /*
           * Language exists but onboarding has started.
           *
           * Show Welcome card.
           */

          if (
            onboardingStarted ===
            "true"
          ) {

            setIsTourVisible(
              true
            );

            setShowLanguageSelection(
              false
            );

            setTourStarted(
              false
            );

            setStepIndex(
              0
            );

            setSpotlightRect(
              null
            );

            setIsAnimating(
              false
            );

            return;

          }

          /*
           * Language exists but this is still a new
           * incomplete user.
           *
           * Show language card instead of starting
           * the tour directly.
           */

          setIsTourVisible(
            true
          );

          setShowLanguageSelection(
            true
          );

          setTourStarted(
            false
          );

          setStepIndex(
            0
          );

          setSpotlightRect(
            null
          );

          return;

        }

        /*
         * Existing user manually opening Guided Tour.
         */

        setShowLanguageSelection(
          false
        );

        setSpotlightRect(
          null
        );

        setIsAnimating(
          false
        );

        isNavigating.current =
          false;

        setIsTourVisible(
          true
        );

        setTourStarted(
          true
        );

        setStepIndex(
          1
        );

        if (
          location.pathname !==
          "/dashboard"
        ) {

          navigate(
            "/dashboard"
          );

        }

      };

    window.addEventListener(
      "farmxpert:start-guided-tour",
      handleGuidedTour
    );

    return () => {

      window.removeEventListener(
        "farmxpert:start-guided-tour",
        handleGuidedTour
      );

    };

  }, [
    location.pathname,
    navigate,
    getOnboardingStartedKey
  ]);

  /*
   * ============================================================
   * SPOTLIGHT
   * ============================================================
   */

  useEffect(() => {

    if (
      !isTourVisible ||
      !tourStarted ||
      isWelcome ||
      isComplete ||
      showLanguageSelection
    ) {

      setSpotlightRect(
        null
      );

      return;

    }

    let frameId;

    const checkForElement =
      () => {

        const found =
          findTarget();

        if (found) {

          setIsAnimating(
            false
          );

          return;

        }

        frameId =
          requestAnimationFrame(
            checkForElement
          );

      };

    frameId =
      requestAnimationFrame(
        checkForElement
      );

    return () => {

      if (frameId) {

        cancelAnimationFrame(
          frameId
        );

      }

    };

  }, [
    isTourVisible,
    tourStarted,
    stepIndex,
    currentStep,
    isWelcome,
    isComplete,
    findTarget,
    showLanguageSelection
  ]);

  /*
   * ============================================================
   * RESIZE / SCROLL
   * ============================================================
   */

  useEffect(() => {

    if (
      !isTourVisible ||
      !tourStarted
    ) {

      return;

    }

    const update =
      () => {

        findTarget();

      };

    window.addEventListener(
      "resize",
      update
    );

    window.addEventListener(
      "scroll",
      update,
      true
    );

    return () => {

      window.removeEventListener(
        "resize",
        update
      );

      window.removeEventListener(
        "scroll",
        update,
        true
      );

    };

  }, [
    isTourVisible,
    tourStarted,
    findTarget
  ]);

  /*
   * ============================================================
   * NEXT
   * ============================================================
   */

  const handleNext =
    () => {

      if (
        isComplete
      ) {

        finishTour();

        return;

      }

      const nextStep =
        steps[
          stepIndex + 1
        ];

      if (
        !nextStep
      ) {

        return;

      }

      setIsAnimating(
        true
      );

      if (
        nextStep.navigateTo &&
        location.pathname !==
        nextStep.navigateTo
      ) {

        isNavigating.current =
          true;

        setSpotlightRect(
          null
        );

        navigate(
          nextStep.navigateTo
        );

        setTimeout(
          () => {

            isNavigating.current =
              false;

            setStepIndex(
              previous =>
                previous + 1
            );

            setIsAnimating(
              false
            );

          },
          300
        );

      } else {

        setTimeout(
          () => {

            setStepIndex(
              previous =>
                previous + 1
            );

            setIsAnimating(
              false
            );

          },
          250
        );

      }

    };

  /*
   * ============================================================
   * BACK
   * ============================================================
   */

  const handleBack =
    () => {

      if (
        stepIndex <= 1
      ) {

        setStepIndex(
          0
        );

        setTourStarted(
          false
        );

        return;

      }

      setStepIndex(
        previous =>
          previous - 1
      );

    };

  /*
   * ============================================================
   * SKIP TOUR
   * ============================================================
   */

  const skipTour =
    () => {

      setIsTourVisible(
        false
      );

      setTourStarted(
        false
      );

      setShowLanguageSelection(
        false
      );

      setSpotlightRect(
        null
      );

      const completedKey =
        getUserTourCompletedKey();

      const skippedKey =
        getUserTourSkippedKey();

      /*
       * Mark completed so the onboarding cards do not
       * appear again for this user.
       */

      if (
        completedKey
      ) {

        localStorage.setItem(
          completedKey,
          "true"
        );

      }

      if (
        skippedKey
      ) {

        localStorage.setItem(
          skippedKey,
          "true"
        );

      }

      if (
        onTourSkip
      ) {

        onTourSkip();

      }

    };

  /*
   * ============================================================
   * FINISH TOUR
   * ============================================================
   */

  const finishTour =
    () => {

      setIsTourVisible(
        false
      );

      setTourStarted(
        false
      );

      setShowLanguageSelection(
        false
      );

      setSpotlightRect(
        null
      );

      const completedKey =
        getUserTourCompletedKey();

      const skippedKey =
        getUserTourSkippedKey();

      if (
        completedKey
      ) {

        localStorage.setItem(
          completedKey,
          "true"
        );

      }

      if (
        skippedKey
      ) {

        localStorage.removeItem(
          skippedKey
        );

      }

      if (
        onTourComplete
      ) {

        onTourComplete();

      }

      if (
        location.pathname !==
        "/dashboard"
      ) {

        navigate(
          "/dashboard"
        );

      }

    };

  /*
   * ============================================================
   * ESCAPE
   * ============================================================
   */

  useEffect(() => {

    if (
      !isTourVisible
    ) {

      return;

    }

    const handleEscape =
      event => {

        if (
          event.key ===
          "Escape"
        ) {

          skipTour();

        }

      };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {

      document.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, [
    isTourVisible
  ]);

  /*
   * ============================================================
   * TOOLTIP POSITION
   * ============================================================
   */

  const getTooltipStyle =
    () => {

      if (
        isWelcome ||
        isComplete ||
        !spotlightRect
      ) {

        return {

          top:
            "50%",

          left:
            "50%",

          transform:
            "translate(-50%, -50%)"

        };

      }

      const tooltipWidth =
        360;

      const tooltipHeight =
        190;

      const gap =
        18;

      if (
        currentStep.type ===
        "sidebar"
      ) {

        let left =
          spotlightRect.left +
          spotlightRect.width +
          gap;

        let top =
          spotlightRect.top +
          spotlightRect.height /
          2;

        if (
          left +
          tooltipWidth >
          window.innerWidth -
          20
        ) {

          left =
            spotlightRect.left -
            tooltipWidth -
            gap;

        }

        if (
          top +
          tooltipHeight /
          2 >
          window.innerHeight -
          20
        ) {

          top =
            window.innerHeight -
            tooltipHeight /
            2 -
            20;

        }

        if (
          top -
          tooltipHeight /
          2 <
          20
        ) {

          top =
            tooltipHeight /
            2 +
            20;

        }

        return {

          top:
            `${top}px`,

          left:
            `${left}px`,

          transform:
            "translateY(-50%)"

        };

      }

      let top =
        spotlightRect.top +
        spotlightRect.height +
        18;

      let left =
        spotlightRect.left +
        spotlightRect.width /
        2;

      if (
        left -
        tooltipWidth /
        2 <
        20
      ) {

        left =
          tooltipWidth /
          2 +
          20;

      }

      if (
        left +
        tooltipWidth /
        2 >
        window.innerWidth -
        20
      ) {

        left =
          window.innerWidth -
          tooltipWidth /
          2 -
          20;

      }

      if (
        top +
        tooltipHeight >
        window.innerHeight -
        20
      ) {

        top =
          spotlightRect.top -
          tooltipHeight -
          18;

      }

      return {

        top:
          `${top}px`,

        left:
          `${left}px`,

        transform:
          "translateX(-50%)"

      };

    };

  if (
    !isTourVisible
  ) {

    return null;

  }

  /*
   * ============================================================
   * LANGUAGE CARD
   * ============================================================
   */

  if (
    showLanguageSelection
  ) {

    return createPortal(

      <div
        className="tour-overlay-wrapper"
        style={{
          zIndex:
            999999
        }}
      >

        <div
          className="tour-backdrop-center"
          style={{
            zIndex:
              999998
          }}
        />

        <div
          className="
            tour-tooltip-wrapper
            tour-welcome-wrapper
          "
          style={{
            position:
              "fixed",

            top:
              "50%",

            left:
              "50%",

            transform:
              "translate(-50%, -50%)",

            zIndex:
              1000000,

            width:
              "min(460px, calc(100vw - 40px))"
          }}
        >

          <div
            className="tour-body"
          >

            <div
              className="welcome-content"
            >

              <h2>

                {t(
                  "languageSelection.title"
                )}

              </h2>

              <div
                className="subtitle"
              >

                {t(
                  "languageSelection.description"
                )}

              </div>

            </div>

          </div>

          <div
            className="tour-welcome-footer"
            style={{
              display:
                "flex",

              flexDirection:
                "column",

              gap:
                "12px",

              padding:
                "20px"
            }}
          >

            <button
              type="button"
              className="btn-primary"
              onClick={() =>
                handleLanguageSelect(
                  "en"
                )
              }
            >

              🇬🇧{" "}

              {t(
                "languageSelection.english"
              )}

            </button>

            <button
              type="button"
              className="btn-primary"
              onClick={() =>
                handleLanguageSelect(
                  "te"
                )
              }
            >

              🇮🇳{" "}

              {t(
                "languageSelection.telugu"
              )}

            </button>

            <button
              type="button"
              className="btn-primary"
              onClick={() =>
                handleLanguageSelect(
                  "hi"
                )
              }
            >

              🇮🇳{" "}

              {t(
                "languageSelection.hindi"
              )}

            </button>

          </div>

        </div>

      </div>,

      document.body

    );

  }

  /*
   * ============================================================
   * NORMAL TOUR
   * ============================================================
   */

  return createPortal(

    <div
      className="tour-overlay-wrapper"
    >

      {spotlightRect ? (

        <div
          className={`
            tour-spotlight-active
            ${
              isAnimating
                ? "tour-animating"
                : ""
            }
          `}
          style={{

            top:
              `${spotlightRect.top - 8}px`,

            left:
              `${spotlightRect.left - 8}px`,

            width:
              `${spotlightRect.width + 16}px`,

            height:
              `${spotlightRect.height + 16}px`

          }}
        />

      ) : (

        <div
          className="tour-backdrop-center"
        />

      )}

      {spotlightRect && (

        <div
          className={`
            tour-arrow
            ${
              currentStep.type ===
              "sidebar"
                ? "arrow-left"
                : "arrow-top"
            }
          `}
          style={

            currentStep.type ===
            "sidebar"

              ? {

                  top:
                    spotlightRect.top +
                    spotlightRect.height /
                    2 -
                    10,

                  left:
                    spotlightRect.left +
                    spotlightRect.width +
                    3

                }

              : {

                  top:
                    spotlightRect.top +
                    spotlightRect.height +
                    3,

                  left:
                    spotlightRect.left +
                    spotlightRect.width /
                    2 -
                    10

                }

          }
        />

      )}

      <div
        className={`
          tour-tooltip-wrapper

          ${
            isWelcome
              ? "tour-welcome-wrapper"
              : ""
          }

          ${
            isComplete
              ? "tour-complete-wrapper"
              : ""
          }

          ${
            currentStep.type ===
            "sidebar"
              ? "tour-sidebar-tooltip"
              : ""
          }
        `}
        style={
          getTooltipStyle()
        }
      >

        {isWelcome && (

          <>

            <div
              className="tour-body"
            >

              <div
                className="welcome-illustration"
              >

                <img
                  src="https://img.freepik.com/free-vector/farmer-concept-illustration_114360-1535.jpg"
                  alt={t(
                    "guidedTour.welcome.imageAlt"
                  )}
                />

              </div>

              <div
                className="welcome-content"
              >

                <h2>

                  {currentStep.title}

                </h2>

                <div
                  className="subtitle"
                >

                  {currentStep.content}

                </div>

              </div>

            </div>

            <div
              className="tour-welcome-footer"
            >

              <button
                type="button"
                className="
                  btn-primary
                  btn-start-tour
                "
                onClick={
                  startTour
                }
              >

                {t(
                  "guidedTour.buttons.startTour"
                )}

              </button>

              <button
                type="button"
                className="btn-skip-now"
                onClick={
                  skipTour
                }
              >

                {t(
                  "guidedTour.buttons.skipForNow"
                )}

              </button>

            </div>

          </>

        )}

        {!isWelcome &&
          !isComplete && (

          <>

            <div
              className="tour-body"
            >

              <h3
                className="tour-title"
              >

                {currentStep.title}

              </h3>

              <div
                className="tour-desc"
              >

                {currentStep.content}

              </div>

            </div>

            <div
              className="tour-footer"
            >

              <div
                className="tour-progress"
              >

                {actualStepNumber}
                /
                {totalTourSteps}

              </div>

              <div
                className="tour-actions"
              >

                <button
                  type="button"
                  className="btn-back"
                  onClick={
                    handleBack
                  }
                >

                  {t(
                    "guidedTour.buttons.back"
                  )}

                </button>

                <button
                  type="button"
                  className="btn-skip"
                  onClick={
                    skipTour
                  }
                >

                  {t(
                    "guidedTour.buttons.skip"
                  )}

                </button>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={
                    handleNext
                  }
                >

                  {t(
                    "guidedTour.buttons.next"
                  )}

                </button>

              </div>

            </div>

          </>

        )}

        {isComplete && (

          <>

            <div
              className="tour-complete-body"
            >

              <div
                className="complete-check"
              >

                ✓

              </div>

              <h2>

                {t(
                  "guidedTour.complete.title"
                )}

              </h2>

              <p>

                {t(
                  "guidedTour.complete.description"
                )}

              </p>

              <p
                className="happy-farming"
              >

                {t(
                  "guidedTour.complete.happyFarming"
                )}

              </p>

            </div>

            <div
              className="tour-complete-footer"
            >

              <button
                type="button"
                className="
                  btn-primary
                  explore-dashboard-btn
                "
                onClick={
                  finishTour
                }
              >

                {t(
                  "guidedTour.buttons.exploreDashboard"
                )}

              </button>

            </div>

          </>

        )}

      </div>

    </div>,

    document.body

  );

};

export default GuidedTour;