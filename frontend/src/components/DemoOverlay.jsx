// import { motion } from "framer-motion";

// export default function DemoOverlay({
//   title,
//   description,
//   step,
//   totalSteps,
//   onNext,
//   onSkip,
// }) {
//   return (
//     <>
//       {/* Dark Background */}
//       <div className="fixed inset-0 bg-black/50 z-[9998]" />

//       {/* Floating Guide Box */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="fixed bottom-8 right-8 w-[380px] bg-white rounded-2xl shadow-2xl z-[9999] p-6"
//       >
//         <p className="text-xs text-green-600 font-bold uppercase">
//           Guided Tour
//         </p>

//         <h2 className="text-2xl font-bold mt-2">
//           {title}
//         </h2>

//         <p className="text-gray-600 mt-3 leading-7">
//           {description}
//         </p>

//         <div className="mt-5 flex justify-between items-center">
//           <span className="text-sm text-gray-500">
//             Step {step} of {totalSteps}
//           </span>

//           <div className="space-x-2">
//             <button
//               onClick={onSkip}
//               className="px-4 py-2 rounded-lg border"
//             >
//               Skip
//             </button>

//             <button
//               onClick={onNext}
//               className="px-5 py-2 rounded-lg bg-green-600 text-white"
//             >
//               Next →
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// }











// import { motion } from "framer-motion";
// import { CheckCircle2, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
// import { useTranslation } from "react-i18next";

// export default function DemoOverlay({
//   title,
//   description,
//   features = [],
//   step,
//   totalSteps,
//   onNext,
//   onPrevious,
//   onSkip,
// }) {
//   const { t } = useTranslation();

//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 60,
//         scale: 0.95,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//         scale: 1,
//       }}
//       exit={{
//         opacity: 0,
//         y: 60,
//         scale: 0.95,
//       }}
//       transition={{
//         duration: 0.4,
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       }}
//       className="
//         fixed
//         bottom-6
//         right-6
//         w-[440px]
//         max-w-[calc(100vw-2rem)]
//         rounded-2xl
//         bg-white
//         shadow-[0_20px_80px_rgba(0,0,0,0.15)]
//         border
//         border-gray-100
//         z-[9999]
//         overflow-hidden
//       "
//     >
//       {/* Progress Bar */}
//       <div className="h-1 bg-gray-100 w-full">
//         <motion.div
//           initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
//           animate={{ width: `${(step / totalSteps) * 100}%` }}
//           className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
//           transition={{ duration: 0.5 }}
//         />
//       </div>

//       {/* Header */}
//       <div className="px-6 pt-5 pb-3 flex justify-between items-start gap-4">
//         <div className="flex items-start gap-3 flex-1">
//           <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center flex-shrink-0 shadow-sm">
//             <Sparkles className="text-green-600" size={20} />
//           </div>
//           <div className="min-w-0">
//             <div className="flex items-center gap-2">
//               <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">
//                 {t('guided_tour.title')}
//               </p>
//               <span className="text-[11px] text-gray-400 font-medium">
//                 {step}/{totalSteps}
//               </span>
//             </div>
//             <h2 className="text-xl font-bold text-slate-800 leading-tight mt-0.5">
//               {title}
//             </h2>
//           </div>
//         </div>
//         <button
//           onClick={onSkip}
//           className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center flex-shrink-0 transition-colors"
//         >
//           <X size={18} className="text-gray-400" />
//         </button>
//       </div>

//       {/* Description */}
//       <div className="px-6">
//         <p className="text-[14px] leading-6 text-gray-600">
//           {description}
//         </p>
//       </div>

//       {/* Features List - Clean Grid */}
//       {features && features.length > 0 && (
//         <div className="px-6 mt-3">
//           <div className="grid grid-cols-2 gap-1.5 bg-gray-50 rounded-xl p-3">
//             {features.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 text-[13px] text-gray-700"
//               >
//                 <CheckCircle2
//                   className="text-emerald-500 flex-shrink-0"
//                   size={14}
//                 />
//                 <span className="font-medium truncate">
//                   {item}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 mt-4">
//         <div className="flex gap-1">
//           {Array.from({ length: totalSteps }).map((_, i) => (
//             <div
//               key={i}
//               className={`h-1.5 rounded-full transition-all duration-300 ${
//                 i + 1 === step
//                   ? "w-6 bg-emerald-500"
//                   : i + 1 < step
//                   ? "w-3 bg-emerald-300"
//                   : "w-3 bg-gray-200"
//               }`}
//             />
//           ))}
//         </div>

//         <div className="flex gap-2">
//           {step > 1 && (
//             <button
//               onClick={onPrevious}
//               className="
//                 px-3
//                 py-1.5
//                 rounded-lg
//                 border
//                 border-gray-200
//                 hover:bg-gray-50
//                 transition
//                 text-sm
//                 font-medium
//                 text-gray-600
//               "
//             >
//               <ChevronLeft size={16} />
//             </button>
//           )}

//           <button
//             onClick={onSkip}
//             className="
//               px-4
//               py-1.5
//               rounded-lg
//               text-sm
//               font-medium
//               text-gray-400
//               hover:text-gray-600
//               hover:bg-gray-50
//               transition
//             "
//           >
//             {t('guided_tour.skip')}
//           </button>

//           <button
//             onClick={onNext}
//             className="
//               px-5
//               py-1.5
//               rounded-lg
//               bg-gradient-to-r
//               from-emerald-500
//               to-green-600
//               text-white
//               font-semibold
//               hover:shadow-lg
//               hover:scale-[1.02]
//               transition-all
//               text-sm
//             "
//           >
//             {step === totalSteps ? (
//               <span className="flex items-center gap-1">
//                 {t('guided_tour.finish')}
//               </span>
//             ) : (
//               <span className="flex items-center gap-1">
//                 {t('guided_tour.next')}
//                 <ChevronRight size={16} />
//               </span>
//             )}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }








// import { motion } from "framer-motion";
// import { CheckCircle2, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { useEffect, useState } from "react";

// export default function DemoOverlay({
//   title,
//   description,
//   features = [],
//   step,
//   totalSteps,
//   onNext,
//   onPrevious,
//   onSkip,
//   targetId,
// }) {
//   const { t } = useTranslation();
//   const [position, setPosition] = useState('bottom');
//   const [targetRect, setTargetRect] = useState(null);

//   useEffect(() => {
//     const updatePosition = () => {
//       const el = document.getElementById(targetId);
//       if (!el) return;

//       const rect = el.getBoundingClientRect();
//       setTargetRect(rect);

//       const windowHeight = window.innerHeight;
//       const windowWidth = window.innerWidth;
      
//       const spaceBelow = windowHeight - rect.bottom;
//       const spaceAbove = rect.top;
//       const spaceRight = windowWidth - rect.right;
//       const spaceLeft = rect.left;
      
//       const positions = [
//         { name: 'bottom', space: spaceBelow, priority: 1 },
//         { name: 'top', space: spaceAbove, priority: 2 },
//         { name: 'right', space: spaceRight, priority: 3 },
//         { name: 'left', space: spaceLeft, priority: 4 },
//       ];
      
//       const availablePositions = positions.filter(p => p.space > 380);
      
//       const bestPosition = availablePositions.length > 0 
//         ? availablePositions.sort((a, b) => b.space - a.space)[0]
//         : positions.sort((a, b) => b.space - a.space)[0];
      
//       setPosition(bestPosition.name);
//     };

//     updatePosition();
//     window.addEventListener('resize', updatePosition);
//     window.addEventListener('scroll', updatePosition);

//     return () => {
//       window.removeEventListener('resize', updatePosition);
//       window.removeEventListener('scroll', updatePosition);
//     };
//   }, [targetId]);

//   const getTooltipStyle = () => {
//     if (!targetRect) return {};

//     const cardWidth = 490;
//     const cardHeight = 390;
//     const gap = 18;
//     const padding = 18;

//     switch(position) {
//       case 'bottom':
//         return {
//           position: 'fixed',
//           zIndex: 9999,
//           top: targetRect.bottom + gap,
//           left: Math.max(padding, targetRect.left + (targetRect.width / 2) - (cardWidth / 2)),
//           width: cardWidth,
//           maxWidth: `calc(100vw - ${padding * 2}px)`,
//           maxHeight: `calc(100vh - ${targetRect.bottom + gap + padding}px)`,
//         };
//       case 'top':
//         return {
//           position: 'fixed',
//           zIndex: 9999,
//           bottom: window.innerHeight - targetRect.top + gap,
//           left: Math.max(padding, targetRect.left + (targetRect.width / 2) - (cardWidth / 2)),
//           width: cardWidth,
//           maxWidth: `calc(100vw - ${padding * 2}px)`,
//           maxHeight: `calc(100vh - ${padding}px)`,
//         };
//       case 'right':
//         return {
//           position: 'fixed',
//           zIndex: 9999,
//           top: Math.max(padding, targetRect.top + (targetRect.height / 2) - (cardHeight / 2)),
//           left: targetRect.right + gap,
//           width: cardWidth,
//           maxWidth: `calc(100vw - ${targetRect.right + gap + padding}px)`,
//           maxHeight: `calc(100vh - ${padding * 2}px)`,
//         };
//       case 'left':
//         return {
//           position: 'fixed',
//           zIndex: 9999,
//           top: Math.max(padding, targetRect.top + (targetRect.height / 2) - (cardHeight / 2)),
//           right: window.innerWidth - targetRect.left + gap,
//           width: cardWidth,
//           maxWidth: `calc(100vw - ${padding * 2}px)`,
//           maxHeight: `calc(100vh - ${padding * 2}px)`,
//         };
//       default:
//         return {
//           position: 'fixed',
//           zIndex: 9999,
//           bottom: padding,
//           right: padding,
//           width: cardWidth,
//           maxWidth: `calc(100vw - ${padding * 2}px)`,
//         };
//     }
//   };

//   const getPointerStyle = () => {
//     if (!targetRect) return {};

//     const pointerSize = 12;

//     switch(position) {
//       case 'bottom':
//         return {
//           position: 'fixed',
//           zIndex: 10000,
//           top: targetRect.bottom - 2,
//           left: targetRect.left + (targetRect.width / 2) - (pointerSize / 2),
//           width: 0,
//           height: 0,
//           borderLeft: `${pointerSize}px solid transparent`,
//           borderRight: `${pointerSize}px solid transparent`,
//           borderBottom: `${pointerSize}px solid white`,
//           filter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.05))',
//         };
//       case 'top':
//         return {
//           position: 'fixed',
//           zIndex: 10000,
//           bottom: window.innerHeight - targetRect.top + 2,
//           left: targetRect.left + (targetRect.width / 2) - (pointerSize / 2),
//           width: 0,
//           height: 0,
//           borderLeft: `${pointerSize}px solid transparent`,
//           borderRight: `${pointerSize}px solid transparent`,
//           borderTop: `${pointerSize}px solid white`,
//           filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))',
//         };
//       case 'right':
//         return {
//           position: 'fixed',
//           zIndex: 10000,
//           top: targetRect.top + (targetRect.height / 2) - (pointerSize / 2),
//           left: targetRect.right - 2,
//           width: 0,
//           height: 0,
//           borderTop: `${pointerSize}px solid transparent`,
//           borderBottom: `${pointerSize}px solid transparent`,
//           borderRight: `${pointerSize}px solid white`,
//           filter: 'drop-shadow(-2px 0 4px rgba(0,0,0,0.05))',
//         };
//       case 'left':
//         return {
//           position: 'fixed',
//           zIndex: 10000,
//           top: targetRect.top + (targetRect.height / 2) - (pointerSize / 2),
//           right: window.innerWidth - targetRect.left + 2,
//           width: 0,
//           height: 0,
//           borderTop: `${pointerSize}px solid transparent`,
//           borderBottom: `${pointerSize}px solid transparent`,
//           borderLeft: `${pointerSize}px solid white`,
//           filter: 'drop-shadow(2px 0 4px rgba(0,0,0,0.05))',
//         };
//       default:
//         return {};
//     }
//   };

//   if (!targetRect) return null;

//   return (
//     <>
//       {/* Pointer/Triangle */}
//       <div style={getPointerStyle()} />

//       {/* Card */}
//       <motion.div
//         initial={{
//           opacity: 0,
//           scale: 0.95,
//         }}
//         animate={{
//           opacity: 1,
//           scale: 1,
//         }}
//         exit={{
//           opacity: 0,
//           scale: 0.95,
//         }}
//         transition={{
//           duration: 0.3,
//           type: "spring",
//           stiffness: 350,
//           damping: 30,
//         }}
//         style={getTooltipStyle()}
//         className="
//           rounded-2xl
//           bg-white
//           shadow-[0_10px_50px_rgba(0,0,0,0.15)]
//           border
//           border-gray-100
//           overflow-hidden
//           overflow-y-auto
//         "
//       >
//         {/* Progress Bar */}
//         <div className="h-1.5 bg-gray-100 w-full">
//           <motion.div
//             initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
//             animate={{ width: `${(step / totalSteps) * 100}%` }}
//             className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
//             transition={{ duration: 0.5 }}
//           />
//         </div>

//         {/* Header */}
//         <div className="px-6 pt-5 pb-3 flex justify-between items-start gap-3">
//           <div className="flex items-start gap-3 flex-1 min-w-0">
//             <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center flex-shrink-0 shadow-sm">
//               <Sparkles className="text-green-600" size={20} />
//             </div>
//             <div className="min-w-0">
//               <div className="flex items-center gap-2">
//                 <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">
//                   {t('guided_tour.title')}
//                 </p>
//                 <span className="text-[11px] text-gray-400 font-medium">
//                   {step}/{totalSteps}
//                 </span>
//               </div>
//               <h2 className="text-xl font-bold text-slate-800 leading-tight mt-0.5">
//                 {title}
//               </h2>
//             </div>
//           </div>
//           <button
//             onClick={onSkip}
//             className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center flex-shrink-0 transition-colors"
//           >
//             <X size={18} className="text-gray-400" />
//           </button>
//         </div>

//         {/* Description */}
//         <div className="px-6">
//           <p className="text-[14px] leading-6 text-gray-600">
//             {description}
//           </p>
//         </div>

//         {/* Features List */}
//         {features && features.length > 0 && (
//           <div className="px-6 mt-3">
//             <div className="grid grid-cols-2 gap-2 bg-gray-50 rounded-xl p-3.5">
//               {features.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-2 text-[13px] text-gray-700"
//                 >
//                   <CheckCircle2
//                     className="text-emerald-500 flex-shrink-0"
//                     size={15}
//                   />
//                   <span className="font-medium">
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Footer */}
//         <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 mt-4">
//           <div className="flex gap-1.5">
//             {Array.from({ length: totalSteps }).map((_, i) => (
//               <div
//                 key={i}
//                 className={`h-1.5 rounded-full transition-all duration-300 ${
//                   i + 1 === step
//                     ? "w-6 bg-emerald-500"
//                     : i + 1 < step
//                     ? "w-3.5 bg-emerald-300"
//                     : "w-3.5 bg-gray-200"
//                 }`}
//               />
//             ))}
//           </div>

//           <div className="flex gap-1.5">
//             {step > 1 && (
//               <button
//                 onClick={onPrevious}
//                 className="
//                   px-3.5
//                   py-1.5
//                   rounded-lg
//                   border
//                   border-gray-200
//                   hover:bg-gray-50
//                   transition
//                   text-sm
//                   font-medium
//                   text-gray-600
//                 "
//               >
//                 <ChevronLeft size={16} />
//               </button>
//             )}

//             <button
//               onClick={onSkip}
//               className="
//                 px-4
//                 py-1.5
//                 rounded-lg
//                 text-sm
//                 font-medium
//                 text-gray-400
//                 hover:text-gray-600
//                 hover:bg-gray-50
//                 transition
//               "
//             >
//               {t('guided_tour.skip')}
//             </button>

//             <button
//               onClick={onNext}
//               className="
//                 px-5
//                 py-1.5
//                 rounded-lg
//                 bg-gradient-to-r
//                 from-emerald-500
//                 to-green-600
//                 text-white
//                 font-semibold
//                 hover:shadow-lg
//                 hover:scale-[1.02]
//                 transition-all
//                 text-sm
//                 whitespace-nowrap
//               "
//             >
//               {step === totalSteps ? (
//                 t('guided_tour.finish')
//               ) : (
//                 <span className="flex items-center gap-1">
//                   {t('guided_tour.next')}
//                   <ChevronRight size={16} />
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// }














// src/components/DemoOverlay.jsx
import { motion } from "framer-motion";
import { CheckCircle2, X, ChevronLeft, ChevronRight, Sparkles, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function DemoOverlay({
  title,
  description,
  features = [],
  step,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  targetId,
}) {
  const { t } = useTranslation();
  const [position, setPosition] = useState('bottom');
  const [targetRect, setTargetRect] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const el = document.getElementById(targetId);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      setTargetRect(rect);
      setIsVisible(true);

      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      const spaceBelow = windowHeight - rect.bottom;
      const spaceAbove = rect.top;
      const spaceRight = windowWidth - rect.right;
      const spaceLeft = rect.left;
      
      // Tooltip dimensions
      const tooltipHeight = 420;
      const tooltipWidth = 400;
      
      // Check available space
      const positions = [
        { name: 'bottom', space: spaceBelow, priority: 1 },
        { name: 'top', space: spaceAbove, priority: 2 },
        { name: 'right', space: spaceRight, priority: 3 },
        { name: 'left', space: spaceLeft, priority: 4 },
      ];
      
      // Filter positions with enough space
      const availablePositions = positions.filter(p => p.space > tooltipHeight + 30);
      
      let bestPosition;
      if (availablePositions.length > 0) {
        bestPosition = availablePositions.sort((a, b) => b.space - a.space)[0];
      } else {
        // If no position has enough space, use the one with most space
        bestPosition = positions.sort((a, b) => b.space - a.space)[0];
      }
      
      setPosition(bestPosition.name);
    };

    const timeoutId = setTimeout(updatePosition, 300);
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('load', updatePosition);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('load', updatePosition);
    };
  }, [targetId]);

  const getTooltipStyle = () => {
    if (!targetRect) return {};

    const cardWidth = 400;
    const cardHeight = 420;
    const gap = 20;
    const padding = 20;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    let top, left, right, bottom;

    // Try to position tooltip where there's enough space
    const tryPosition = (pos) => {
      switch(pos) {
        case 'bottom':
          top = targetRect.bottom + gap;
          left = Math.max(padding, targetRect.left + (targetRect.width / 2) - (cardWidth / 2));
          if (left + cardWidth > windowWidth - padding) {
            left = windowWidth - cardWidth - padding;
          }
          if (top + cardHeight > windowHeight - padding) {
            return null;
          }
          return { top: Math.max(padding, top), left: Math.max(padding, left) };
        case 'top':
          bottom = windowHeight - targetRect.top + gap;
          left = Math.max(padding, targetRect.left + (targetRect.width / 2) - (cardWidth / 2));
          if (left + cardWidth > windowWidth - padding) {
            left = windowWidth - cardWidth - padding;
          }
          if (bottom + cardHeight > windowHeight - padding) {
            return null;
          }
          return { bottom: Math.max(padding, bottom), left: Math.max(padding, left) };
        case 'right':
          top = Math.max(padding, targetRect.top + (targetRect.height / 2) - (cardHeight / 2));
          left = targetRect.right + gap;
          if (top + cardHeight > windowHeight - padding) {
            return null;
          }
          if (left + cardWidth > windowWidth - padding) {
            return null;
          }
          return { top: Math.max(padding, top), left: Math.min(left, windowWidth - cardWidth - padding) };
        case 'left':
          top = Math.max(padding, targetRect.top + (targetRect.height / 2) - (cardHeight / 2));
          right = windowWidth - targetRect.left + gap;
          if (top + cardHeight > windowHeight - padding) {
            return null;
          }
          if (right + cardWidth > windowWidth - padding) {
            return null;
          }
          return { top: Math.max(padding, top), right: Math.min(right, windowWidth - padding) };
        default:
          return null;
      }
    };

    // Try positions in order of priority
    const positionOrder = ['bottom', 'top', 'right', 'left'];
    let result = null;
    
    for (const pos of positionOrder) {
      const tryResult = tryPosition(pos);
      if (tryResult) {
        result = { ...tryResult, position: pos };
        break;
      }
    }

    // If no position works, use bottom with fallback
    if (!result) {
      top = Math.max(padding, Math.min(targetRect.bottom + gap, windowHeight - cardHeight - padding));
      left = Math.max(padding, targetRect.left + (targetRect.width / 2) - (cardWidth / 2));
      if (left + cardWidth > windowWidth - padding) {
        left = windowWidth - cardWidth - padding;
      }
      result = { top, left, position: 'bottom' };
    }

    const style = {
      position: 'fixed',
      zIndex: 9999,
      width: cardWidth,
      maxWidth: `calc(100vw - ${padding * 2}px)`,
      maxHeight: `calc(100vh - ${padding * 2}px)`,
    };

    if (result.top !== undefined) {
      style.top = result.top;
    }
    if (result.bottom !== undefined) {
      style.bottom = result.bottom;
    }
    if (result.left !== undefined) {
      style.left = result.left;
    }
    if (result.right !== undefined) {
      style.right = result.right;
    }

    return style;
  };

  const getPointerStyle = () => {
    if (!targetRect) return {};

    const pointerSize = 12;
    const gap = 2;

    // Get the actual position based on the tooltip placement
    const tooltipStyle = getTooltipStyle();
    if (!tooltipStyle) return {};

    // Determine pointer direction based on tooltip position
    const isBottom = tooltipStyle.top !== undefined && tooltipStyle.top > targetRect.bottom;
    const isTop = tooltipStyle.bottom !== undefined && tooltipStyle.bottom > window.innerHeight - targetRect.top;
    const isRight = tooltipStyle.left !== undefined && tooltipStyle.left > targetRect.right;
    const isLeft = tooltipStyle.right !== undefined && tooltipStyle.right > window.innerWidth - targetRect.left;

    if (isBottom) {
      return {
        position: 'fixed',
        zIndex: 10000,
        top: targetRect.bottom - gap,
        left: targetRect.left + (targetRect.width / 2) - (pointerSize / 2),
        width: 0,
        height: 0,
        borderLeft: `${pointerSize}px solid transparent`,
        borderRight: `${pointerSize}px solid transparent`,
        borderBottom: `${pointerSize}px solid white`,
        filter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.05))',
      };
    } else if (isTop) {
      return {
        position: 'fixed',
        zIndex: 10000,
        bottom: window.innerHeight - targetRect.top + gap,
        left: targetRect.left + (targetRect.width / 2) - (pointerSize / 2),
        width: 0,
        height: 0,
        borderLeft: `${pointerSize}px solid transparent`,
        borderRight: `${pointerSize}px solid transparent`,
        borderTop: `${pointerSize}px solid white`,
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))',
      };
    } else if (isRight) {
      return {
        position: 'fixed',
        zIndex: 10000,
        top: targetRect.top + (targetRect.height / 2) - (pointerSize / 2),
        left: targetRect.right - gap,
        width: 0,
        height: 0,
        borderTop: `${pointerSize}px solid transparent`,
        borderBottom: `${pointerSize}px solid transparent`,
        borderRight: `${pointerSize}px solid white`,
        filter: 'drop-shadow(-2px 0 4px rgba(0,0,0,0.05))',
      };
    } else if (isLeft) {
      return {
        position: 'fixed',
        zIndex: 10000,
        top: targetRect.top + (targetRect.height / 2) - (pointerSize / 2),
        right: window.innerWidth - targetRect.left + gap,
        width: 0,
        height: 0,
        borderTop: `${pointerSize}px solid transparent`,
        borderBottom: `${pointerSize}px solid transparent`,
        borderLeft: `${pointerSize}px solid white`,
        filter: 'drop-shadow(2px 0 4px rgba(0,0,0,0.05))',
      };
    }
    return {};
  };

  if (!targetRect || !isVisible) return null;

  // Get the final tooltip style
  const tooltipStyle = getTooltipStyle();

  return (
    <>
      {/* Pointer/Triangle */}
      <div style={getPointerStyle()} />

      {/* Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.95,
        }}
        transition={{
          duration: 0.35,
          type: "spring",
          stiffness: 300,
          damping: 28,
        }}
        style={tooltipStyle}
        className="rounded-2xl bg-white shadow-2xl border border-gray-100/80 overflow-hidden"
      >
        {/* Progress Bar */}
        <div className="h-1 bg-gray-100 w-full">
          <motion.div
            initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            className="h-full bg-gradient-to-r from-emerald-400 to-green-500"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Header */}
          <div className="flex justify-between items-start gap-3 mb-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-emerald-600" size={18} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600">
                    Guided Tour
                  </p>
                  <span className="text-[10px] text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                    {step}/{totalSteps}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-800 leading-tight mt-0.5">
                  {title}
                </h2>
              </div>
            </div>
            <button
              onClick={onSkip}
              className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center flex-shrink-0 transition-all"
            >
              <X size={16} className="text-gray-400" />
            </button>
          </div>

          {/* Description */}
          <p className="text-sm leading-6 text-gray-600 mb-3">
            {description}
          </p>

          {/* Features List */}
          {features && features.length > 0 && (
            <div className="grid grid-cols-2 gap-1.5 bg-gray-50 rounded-xl p-3 border border-gray-100/50 mb-3">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 text-xs text-gray-700"
                >
                  <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={13} />
                  <span className="font-medium truncate">{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i + 1 === step
                      ? "w-5 bg-emerald-500"
                      : i + 1 < step
                      ? "w-3 bg-emerald-300"
                      : "w-3 bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-1.5">
              {step > 1 && (
                <button
                  onClick={onPrevious}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all text-sm font-medium text-gray-600"
                >
                  <ChevronLeft size={15} />
                </button>
              )}

              <button
                onClick={onSkip}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
              >
                Skip
              </button>

              <button
                onClick={onNext}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-200/40 hover:scale-[1.02] transition-all text-sm whitespace-nowrap active:scale-95"
              >
                {step === totalSteps ? (
                  <span className="flex items-center gap-1">
                    <Play size={13} />
                    Finish
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    Next
                    <ChevronRight size={15} />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}