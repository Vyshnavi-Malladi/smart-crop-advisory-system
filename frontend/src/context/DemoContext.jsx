// // import { createContext, useContext, useState } from "react";

// // const DemoContext = createContext();

// // export const DemoProvider = ({ children }) => {
// //   const [demoRunning, setDemoRunning] = useState(false);
// //   const [step, setStep] = useState(0);

// //   const steps = [
// //     "/dashboard",
// //     "/crop-recommend",
// //     "/yield-predict",
// //     "/disease-detect",
// //     "/store",
// //     "/dashboard",
// //   ];

// //   const startDemo = () => {
// //     setDemoRunning(true);
// //     setStep(0);
// //   };

// //   const stopDemo = () => {
// //     setDemoRunning(false);
// //     setStep(0);
// //   };

// //   const nextStep = () => {
// //     if (step < steps.length - 1) {
// //       setStep(step + 1);
// //     } else {
// //       stopDemo();
// //     }
// //   };

// //   const prevStep = () => {
// //     if (step > 0) {
// //       setStep(step - 1);
// //     }
// //   };

// //   return (
// //     <DemoContext.Provider
// //       value={{
// //         demoRunning,
// //         step,
// //         steps,
// //         startDemo,
// //         stopDemo,
// //         nextStep,
// //         prevStep,
// //       }}
// //     >
// //       {children}
// //     </DemoContext.Provider>
// //   );
// // };

// // export const useDemo = () => useContext(DemoContext);





// import { createContext, useContext, useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';

// const DemoContext = createContext();

// export const useDemo = () => useContext(DemoContext);

// export const DemoProvider = ({ children }) => {
//   const { t, i18n } = useTranslation();
//   const [demoRunning, setDemoRunning] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [targetId, setTargetId] = useState(null);

//   const getTourSteps = () => {
//     return [
//       {
//         id: 'weather-card',
//         title: t('guided_tour.weather.title'),
//         description: t('guided_tour.weather.description'),
//         features: t('guided_tour.weather.features', { returnObjects: true })
//       },
//       {
//         id: 'crop-tracker',
//         title: t('guided_tour.crop_tracker.title'),
//         description: t('guided_tour.crop_tracker.description'),
//         features: t('guided_tour.crop_tracker.features', { returnObjects: true })
//       },
//       {
//         id: 'crop-consult-card',
//         title: t('guided_tour.crop_consult.title'),
//         description: t('guided_tour.crop_consult.description'),
//         features: t('guided_tour.crop_consult.features', { returnObjects: true })
//       },
//       {
//         id: 'yield-card',
//         title: t('guided_tour.yield_forecast.title'),
//         description: t('guided_tour.yield_forecast.description'),
//         features: t('guided_tour.yield_forecast.features', { returnObjects: true })
//       },
//       {
//         id: 'disease-card',
//         title: t('guided_tour.disease_lab.title'),
//         description: t('guided_tour.disease_lab.description'),
//         features: t('guided_tour.disease_lab.features', { returnObjects: true })
//       },
//       {
//         id: 'store-card',
//         title: t('guided_tour.farm_store.title'),
//         description: t('guided_tour.farm_store.description'),
//         features: t('guided_tour.farm_store.features', { returnObjects: true })
//       }
//     ];
//   };

//   const startDemo = () => {
//     const steps = getTourSteps();
//     setDemoRunning(true);
//     setCurrentStep(0);
//     setTargetId(steps[0].id);
//   };

//   const stopDemo = () => {
//     setDemoRunning(false);
//     setCurrentStep(0);
//     setTargetId(null);
//   };

//   const nextStep = () => {
//     const steps = getTourSteps();
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//       setTargetId(steps[currentStep + 1].id);
//     } else {
//       stopDemo();
//     }
//   };

//   const previousStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//       const steps = getTourSteps();
//       setTargetId(steps[currentStep - 1].id);
//     }
//   };

//   useEffect(() => {
//     if (!demoRunning) return;

//     const handleUpdate = () => {
//       setTargetId(prev => prev);
//     };

//     window.addEventListener('resize', handleUpdate);
//     window.addEventListener('scroll', handleUpdate);

//     return () => {
//       window.removeEventListener('resize', handleUpdate);
//       window.removeEventListener('scroll', handleUpdate);
//     };
//   }, [demoRunning]);

//   useEffect(() => {
//     if (demoRunning) {
//       const steps = getTourSteps();
//       if (targetId) {
//         const currentStepIndex = steps.findIndex(step => step.id === targetId);
//         if (currentStepIndex !== -1) {
//           setCurrentStep(currentStepIndex);
//         }
//       }
//     }
//   }, [i18n.language, demoRunning]);

//   const tourSteps = getTourSteps();
//   const currentStepData = tourSteps[currentStep] || tourSteps[0];

//   const value = {
//     demoRunning,
//     isActive: demoRunning,
//     currentStep,
//     targetId,
//     totalSteps: tourSteps.length,
//     currentStepData,
//     startDemo,
//     stopDemo,
//     nextStep,
//     previousStep
//   };

//   return (
//     <DemoContext.Provider value={value}>
//       {children}
//     </DemoContext.Provider>
//   );
// };





// import { createContext, useContext, useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';

// const DemoContext = createContext();

// export const useDemo = () => useContext(DemoContext);

// export const DemoProvider = ({ children }) => {
//   const { t, i18n } = useTranslation();
//   const [demoRunning, setDemoRunning] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [targetId, setTargetId] = useState(null);

//   const getTourSteps = () => {
//     return [
//       {
//         id: 'weather-card',
//         title: t('guided_tour.weather.title'),
//         description: t('guided_tour.weather.description'),
//         features: t('guided_tour.weather.features', { returnObjects: true })
//       },
//       {
//         id: 'crop-tracker',  // This will be on the left
//         title: t('guided_tour.crop_tracker.title'),
//         description: t('guided_tour.crop_tracker.description'),
//         features: t('guided_tour.crop_tracker.features', { returnObjects: true })
//       },
//       {
//         id: 'crop-consult-card',
//         title: t('guided_tour.crop_consult.title'),
//         description: t('guided_tour.crop_consult.description'),
//         features: t('guided_tour.crop_consult.features', { returnObjects: true })
//       },
//       {
//         id: 'yield-card',
//         title: t('guided_tour.yield_forecast.title'),
//         description: t('guided_tour.yield_forecast.description'),
//         features: t('guided_tour.yield_forecast.features', { returnObjects: true })
//       },
//       {
//         id: 'disease-card',  // This will be on the left
//         title: t('guided_tour.disease_lab.title'),
//         description: t('guided_tour.disease_lab.description'),
//         features: t('guided_tour.disease_lab.features', { returnObjects: true })
//       },
//       {
//         id: 'store-card',  // This will be on the left
//         title: t('guided_tour.farm_store.title'),
//         description: t('guided_tour.farm_store.description'),
//         features: t('guided_tour.farm_store.features', { returnObjects: true })
//       }
//     ];
//   };

//   const startDemo = () => {
//     const steps = getTourSteps();
//     setDemoRunning(true);
//     setCurrentStep(0);
//     setTargetId(steps[0].id);
//   };

//   const stopDemo = () => {
//     setDemoRunning(false);
//     setCurrentStep(0);
//     setTargetId(null);
//   };

//   const nextStep = () => {
//     const steps = getTourSteps();
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//       setTargetId(steps[currentStep + 1].id);
//     } else {
//       stopDemo();
//     }
//   };

//   const previousStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//       const steps = getTourSteps();
//       setTargetId(steps[currentStep - 1].id);
//     }
//   };

//   useEffect(() => {
//     if (!demoRunning) return;

//     const handleUpdate = () => {
//       setTargetId(prev => prev);
//     };

//     window.addEventListener('resize', handleUpdate);
//     window.addEventListener('scroll', handleUpdate);

//     return () => {
//       window.removeEventListener('resize', handleUpdate);
//       window.removeEventListener('scroll', handleUpdate);
//     };
//   }, [demoRunning]);

//   useEffect(() => {
//     if (demoRunning) {
//       const steps = getTourSteps();
//       if (targetId) {
//         const currentStepIndex = steps.findIndex(step => step.id === targetId);
//         if (currentStepIndex !== -1) {
//           setCurrentStep(currentStepIndex);
//         }
//       }
//     }
//   }, [i18n.language, demoRunning]);

//   const tourSteps = getTourSteps();
//   const currentStepData = tourSteps[currentStep] || tourSteps[0];

//   const value = {
//     isActive: demoRunning,
//     demoRunning,
//     currentStep,
//     targetId,
//     totalSteps: tourSteps.length,
//     currentStepData,
//     startDemo,
//     stopDemo,
//     nextStep,
//     previousStep
//   };

//   return (
//     <DemoContext.Provider value={value}>
//       {children}
//     </DemoContext.Provider>
//   );
// };















// src/context/DemoContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DemoContext = createContext();

// Export the hook as a named export
export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};

export const DemoProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetId, setTargetId] = useState(null);

  // Get tour steps with translations
  const getTourSteps = () => {
    return [
      {
        id: 'weather-card',
        title: t('guided_tour.weather.title') || '🌤️ Weather Intelligence',
        description: t('guided_tour.weather.description') || 'Get real-time weather updates for your farm.',
        features: t('guided_tour.weather.features', { returnObjects: true }) || ['Live weather data', 'Spray safety alerts', 'Humidity & wind tracking']
      },
      {
        id: 'crop-tracker',
        title: t('guided_tour.crop_tracker.title') || '🌾 Crop Tracker',
        description: t('guided_tour.crop_tracker.description') || 'Track your crop growth from sowing to harvest.',
        features: t('guided_tour.crop_tracker.features', { returnObjects: true }) || ['Crop stage tracking', 'Growth progress bar', 'Smart farming advice']
      },
      {
        id: 'crop-consult-card',
        title: t('guided_tour.crop_consult.title') || '🌱 Crop Consult',
        description: t('guided_tour.crop_consult.description') || 'Get AI-powered crop recommendations.',
        features: t('guided_tour.crop_consult.features', { returnObjects: true }) || ['AI recommendations', 'Personalized advice', 'Data-driven insights']
      },
      {
        id: 'yield-card',
        title: t('guided_tour.yield_forecast.title') || '📈 Yield Forecast',
        description: t('guided_tour.yield_forecast.description') || 'Predict your harvest volume.',
        features: t('guided_tour.yield_forecast.features', { returnObjects: true }) || ['Harvest prediction', 'Data analysis', 'Planning insights']
      },
      {
        id: 'disease-card',
        title: t('guided_tour.disease_lab.title') || '🦠 Disease Lab',
        description: t('guided_tour.disease_lab.description') || 'Detect crop diseases early.',
        features: t('guided_tour.disease_lab.features', { returnObjects: true }) || ['Image detection', 'Early warning', 'Treatment recommendations']
      },
      {
        id: 'store-card',
        title: t('guided_tour.farm_store.title') || '🛒 Farm Store',
        description: t('guided_tour.farm_store.description') || 'Buy seeds and farming essentials.',
        features: t('guided_tour.farm_store.features', { returnObjects: true }) || ['Quality products', 'Easy ordering', 'Farm supplies']
      }
    ];
  };

  const tourSteps = getTourSteps();

  const startDemo = () => {
    setIsActive(true);
    setCurrentStep(0);
    setTargetId(tourSteps[0]?.id || null);
  };

  const stopDemo = () => {
    setIsActive(false);
    setCurrentStep(0);
    setTargetId(null);
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      setTargetId(tourSteps[nextStepIndex]?.id || null);
    } else {
      stopDemo();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      setTargetId(tourSteps[prevStepIndex]?.id || null);
    }
  };

  const currentStepData = tourSteps[currentStep] || tourSteps[0];

  // Update steps when language changes
  useEffect(() => {
    if (isActive) {
      const newSteps = getTourSteps();
      const currentTargetId = targetId;
      const newIndex = newSteps.findIndex(step => step.id === currentTargetId);
      if (newIndex !== -1 && newIndex !== currentStep) {
        setCurrentStep(newIndex);
      }
    }
  }, [i18n.language]);

  const value = {
    isActive,
    currentStep,
    targetId,
    totalSteps: tourSteps.length,
    currentStepData,
    startDemo,
    stopDemo,
    nextStep,
    previousStep
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
};

// Also export the context itself if needed
export default DemoContext;