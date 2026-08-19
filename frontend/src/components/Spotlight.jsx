// import { useEffect, useState } from "react";

// export default function Spotlight({ targetId }) {
//   const [rect, setRect] = useState(null);

//   useEffect(() => {
//     const updatePosition = () => {
//       const el = document.getElementById(targetId);
//       if (!el) return;

//       const r = el.getBoundingClientRect();

//       setRect({
//         top: r.top,
//         left: r.left,
//         width: r.width,
//         height: r.height,
//       });
//     };

//     updatePosition();

//     window.addEventListener("resize", updatePosition);
//     window.addEventListener("scroll", updatePosition);

//     return () => {
//       window.removeEventListener("resize", updatePosition);
//       window.removeEventListener("scroll", updatePosition);
//     };
//   }, [targetId]);

//   if (!rect) return null;

//   return (
//     <>
//       {/* Background Overlay */}
//       <div
//         className="fixed inset-0 z-[9996]"
//         style={{
//           background: "rgba(15,23,42,0.35)", // lighter than before
//         }}
//       />

//       {/* Highlight */}
//       <div
//         className="fixed pointer-events-none z-[9998] rounded-3xl"
//         style={{
//           top: rect.top - 8,
//           left: rect.left - 8,
//           width: rect.width + 16,
//           height: rect.height + 16,

//           border: "3px solid #22c55e",
//           boxShadow:
//             "0 0 0 6px rgba(34,197,94,0.12), 0 10px 40px rgba(34,197,94,0.35)",
//         }}
//       />
//     </>
//   );
// }




// import { useEffect, useState } from "react";

// export default function Spotlight({ targetId }) {
//   const [rect, setRect] = useState(null);

//   useEffect(() => {
//     const update = () => {
//       const el = document.getElementById(targetId);

//       if (!el) return;

//       const r = el.getBoundingClientRect();

//       setRect({
//         top: r.top,
//         left: r.left,
//         width: r.width,
//         height: r.height,
//       });
//     };

//     update();

//     window.addEventListener("resize", update);
//     window.addEventListener("scroll", update);

//     return () => {
//       window.removeEventListener("resize", update);
//       window.removeEventListener("scroll", update);
//     };
//   }, [targetId]);

//   if (!rect) return null;

//   return (
//     <>
//       {/* TOP */}
//       <div
//         className="fixed z-[9995] bg-black/25"
//         style={{
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: rect.top,
//         }}
//       />

//       {/* LEFT */}
//       <div
//         className="fixed z-[9995] bg-black/25"
//         style={{
//           top: rect.top,
//           left: 0,
//           width: rect.left,
//           height: rect.height,
//         }}
//       />

//       {/* RIGHT */}
//       <div
//         className="fixed z-[9995] bg-black/25"
//         style={{
//           top: rect.top,
//           left: rect.left + rect.width,
//           width: `calc(100% - ${rect.left + rect.width}px)`,
//           height: rect.height,
//         }}
//       />

//       {/* BOTTOM */}
//       <div
//         className="fixed z-[9995] bg-black/25"
//         style={{
//           top: rect.top + rect.height,
//           left: 0,
//           width: "100%",
//           height: `calc(100% - ${rect.top + rect.height}px)`,
//         }}
//       />

//       {/* Glow */}
//       <div
//         className="pointer-events-none fixed rounded-[30px] z-[9997]"
//         style={{
//           top: rect.top - 8,
//           left: rect.left - 8,
//           width: rect.width + 16,
//           height: rect.height + 16,

//           border: "3px solid #8BFFB5",

//           boxShadow: `
//           0 0 20px rgba(34,197,94,.45),
//           0 0 50px rgba(34,197,94,.25),
//           inset 0 0 0 2px rgba(255,255,255,.45)
//           `,
//         }}
//       />
//     </>
//   );
// }














// src/components/Spotlight.jsx
import { useEffect, useState } from "react";

export default function Spotlight({ targetId }) {
  const [rect, setRect] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(targetId);
      if (!el) return;

      const r = el.getBoundingClientRect();
      
      // Check if element is in viewport with some tolerance
      const isInViewport = (
        r.top >= -100 &&
        r.left >= -100 &&
        r.bottom <= (window.innerHeight + 100) &&
        r.right <= (window.innerWidth + 100)
      );

      if (!isInViewport) {
        el.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        });
        
        setTimeout(() => {
          const updatedRect = el.getBoundingClientRect();
          setRect({
            top: updatedRect.top,
            left: updatedRect.left,
            width: updatedRect.width,
            height: updatedRect.height,
          });
          setIsVisible(true);
        }, 500);
      } else {
        setRect({
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height,
        });
        setIsVisible(true);
      }
    };

    const timeoutId = setTimeout(update, 300);
    
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update);
    window.addEventListener('load', update);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
      window.removeEventListener('load', update);
    };
  }, [targetId]);

  if (!rect || !isVisible) return null;

  const padding = 20;
  const radius = 20;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  // Calculate the exact clip path to ONLY show the target element
  // This creates a cutout exactly around the target element
  const top = rect.top - padding;
  const bottom = rect.bottom + padding;
  const left = rect.left - padding;
  const right = rect.right + padding;

  // Create a clean cutout - only the target area is visible
  // Everything else is covered by the dark overlay
  const clipPath = `
    polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      0% 100%,
      0% ${top}px,
      ${left}px ${top}px,
      ${left}px ${bottom}px,
      ${right}px ${bottom}px,
      ${right}px ${top}px,
      0% ${top}px
    )
  `;

  // Alternative: Use radial gradient for smoother edges
  // const clipPath = `
  //   inset(0px round 0px),
  //   inset(
  //     ${top}px ${windowWidth - right}px ${windowHeight - bottom}px ${left}px
  //     round ${radius}px
  //   )
  // `;

  return (
    <>
      {/* Dark overlay with spotlight cutout - ONLY the target is visible */}
      <div
        className="fixed inset-0 z-[9995]"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          clipPath: clipPath,
          transition: 'clip-path 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      {/* Glow ring - only around the target */}
      <div
        className="pointer-events-none fixed z-[9997]"
        style={{
          top: rect.top - padding - 4,
          left: rect.left - padding - 4,
          width: rect.width + padding * 2 + 8,
          height: rect.height + padding * 2 + 8,
          borderRadius: `${radius + 4}px`,
          border: '3px solid rgba(74, 222, 128, 0.9)',
          boxShadow: `
            0 0 40px rgba(74, 222, 128, 0.4),
            0 0 80px rgba(74, 222, 128, 0.2),
            inset 0 0 40px rgba(74, 222, 128, 0.1)
          `,
          animation: 'pulse-glow 2s ease-in-out infinite',
        }}
      />

      {/* Inner highlight - only inside the target */}
      <div
        className="pointer-events-none fixed z-[9996]"
        style={{
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
          borderRadius: `${radius}px`,
          background: 'rgba(74, 222, 128, 0.05)',
          boxShadow: 'inset 0 0 50px rgba(74, 222, 128, 0.06)',
        }}
      />

      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 40px rgba(74, 222, 128, 0.4), 0 0 80px rgba(74, 222, 128, 0.2);
            border-color: rgba(74, 222, 128, 0.9);
          }
          50% {
            box-shadow: 0 0 60px rgba(74, 222, 128, 0.6), 0 0 100px rgba(74, 222, 128, 0.3);
            border-color: rgba(74, 222, 128, 1);
          }
        }
      `}</style>
    </>
  );
}