// // src/components/dashboard/MarketPrices.jsx

// import React from "react";
// import {
//   ArrowRight,
//   TrendingUp,
//   TrendingDown,
//   Minus,
//   Store,
//   RefreshCw,
//   BarChart3,
//   IndianRupee,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function MarketPrices({
//   prices = [],
//   loading = false,
//   onRefresh,
// }) {

//   // =========================================================
//   // TREND ICON
//   // =========================================================

//   const getTrendIcon = (trend) => {

//     if (trend === "up") {
//       return <TrendingUp size={13} />;
//     }

//     if (trend === "down") {
//       return <TrendingDown size={13} />;
//     }

//     return <Minus size={13} />;
//   };


//   // =========================================================
//   // TREND CLASS
//   // =========================================================

//   const getTrendClass = (trend) => {

//     if (trend === "up") {
//       return "fx-market-trend-up";
//     }

//     if (trend === "down") {
//       return "fx-market-trend-down";
//     }

//     return "fx-market-trend-neutral";
//   };


//   // =========================================================
//   // FORMAT PRICE
//   // =========================================================

//   const formatPrice = (price) => {

//     if (
//       price === undefined ||
//       price === null ||
//       price === ""
//     ) {
//       return "--";
//     }

//     const number =
//       Number(
//         String(price)
//           .replace(/,/g, "")
//           .replace(/[^\d.]/g, "")
//       );

//     if (Number.isNaN(number)) {
//       return price;
//     }

//     return number.toLocaleString("en-IN");
//   };


//   // =========================================================
//   // LOADING STATE
//   // =========================================================

//   if (loading) {

//     return (
//       <>
//         <section className="fx-market-card">

//           <div className="fx-market-header">

//             <div>

//               <div className="fx-market-title-skeleton" />

//               <div className="fx-market-subtitle-skeleton" />

//             </div>

//           </div>


//           <div className="fx-market-loading-list">

//             {[1, 2, 3].map((item) => (

//               <div
//                 className="fx-market-loading-row"
//                 key={item}
//               >

//                 <div className="fx-market-loading-icon" />

//                 <div className="fx-market-loading-content">

//                   <div className="fx-market-loading-line large" />

//                   <div className="fx-market-loading-line small" />

//                 </div>

//                 <div className="fx-market-loading-price" />

//               </div>

//             ))}

//           </div>

//         </section>


//         <style>{`

//           .fx-market-card {

//             width: 100%;

//             padding: 20px;

//             background: #ffffff;

//             border: 1px solid #e7eee9;

//             border-radius: 18px;

//             box-shadow:
//               0 3px 15px
//               rgba(15,23,42,0.035);

//             box-sizing: border-box;
//           }


//           .fx-market-title-skeleton {

//             width: 125px;

//             height: 17px;

//             background: #eef2f0;

//             border-radius: 6px;

//             margin-bottom: 7px;
//           }


//           .fx-market-subtitle-skeleton {

//             width: 190px;

//             height: 9px;

//             background: #f1f5f2;

//             border-radius: 5px;
//           }


//           .fx-market-loading-list {

//             margin-top: 20px;
//           }


//           .fx-market-loading-row {

//             display: flex;

//             align-items: center;

//             gap: 11px;

//             padding: 12px 0;

//             border-top:
//               1px solid #f1f5f2;
//           }


//           .fx-market-loading-icon {

//             width: 36px;

//             height: 36px;

//             flex-shrink: 0;

//             border-radius: 10px;

//             background:
//               linear-gradient(
//                 90deg,
//                 #eef2f0,
//                 #f8faf8,
//                 #eef2f0
//               );

//             background-size: 200% 100%;

//             animation:
//               fx-market-shimmer 1.5s infinite;
//           }


//           .fx-market-loading-content {

//             flex: 1;
//           }


//           .fx-market-loading-line {

//             height: 9px;

//             border-radius: 5px;

//             background:
//               linear-gradient(
//                 90deg,
//                 #eef2f0,
//                 #f8faf8,
//                 #eef2f0
//               );

//             background-size: 200% 100%;

//             animation:
//               fx-market-shimmer 1.5s infinite;
//           }


//           .fx-market-loading-line.large {

//             width: 55%;

//             margin-bottom: 7px;
//           }


//           .fx-market-loading-line.small {

//             width: 35%;
//           }


//           .fx-market-loading-price {

//             width: 65px;

//             height: 13px;

//             border-radius: 5px;

//             background:
//               linear-gradient(
//                 90deg,
//                 #eef2f0,
//                 #f8faf8,
//                 #eef2f0
//               );

//             background-size: 200% 100%;

//             animation:
//               fx-market-shimmer 1.5s infinite;
//           }


//           @keyframes fx-market-shimmer {

//             0% {
//               background-position: 200% 0;
//             }

//             100% {
//               background-position: -200% 0;
//             }

//           }

//         `}</style>
//       </>
//     );
//   }


//   // =========================================================
//   // EMPTY STATE
//   // =========================================================

//   if (!prices || prices.length === 0) {

//     return (
//       <>
//         <section className="fx-market-card">

//           <div className="fx-market-header">

//             <div>

//               <div className="fx-market-title-row">

//                 <h2 className="fx-market-title">
//                   Market Prices
//                 </h2>

//                 <span className="fx-market-title-icon">
//                   <BarChart3 size={13} />
//                 </span>

//               </div>

//               <p className="fx-market-subtitle">
//                 Latest crop prices from nearby markets.
//               </p>

//             </div>


//             {onRefresh && (

//               <button
//                 type="button"
//                 className="fx-market-refresh"
//                 onClick={onRefresh}
//                 aria-label="Refresh market prices"
//               >
//                 <RefreshCw size={15} />
//               </button>

//             )}

//           </div>


//           <div className="fx-market-empty">

//             <div className="fx-market-empty-icon">
//               <Store size={25} />
//             </div>

//             <h3>
//               Market prices unavailable
//             </h3>

//             <p>
//               Current crop prices will appear here
//               when market data is available.
//             </p>

//             <Link
//               to="/market"
//               className="fx-market-empty-button"
//             >
//               View Market
//               <ArrowRight size={14} />
//             </Link>

//           </div>

//         </section>


//         <style>{`

//           .fx-market-card {

//             width: 100%;

//             padding: 20px;

//             background: #ffffff;

//             border: 1px solid #e7eee9;

//             border-radius: 18px;

//             box-shadow:
//               0 3px 15px
//               rgba(15,23,42,0.035);

//             box-sizing: border-box;
//           }


//           .fx-market-header {

//             display: flex;

//             justify-content: space-between;

//             align-items: flex-start;

//             gap: 12px;
//           }


//           .fx-market-title-row {

//             display: flex;

//             align-items: center;

//             gap: 7px;
//           }


//           .fx-market-title {

//             margin: 0;

//             color: #172033;

//             font-size: 17px;

//             line-height: 1.3;

//             font-weight: 700;
//           }


//           .fx-market-title-icon {

//             width: 22px;

//             height: 22px;

//             display: flex;

//             align-items: center;

//             justify-content: center;

//             color: #15803d;

//             background: #f0fdf4;

//             border-radius: 7px;
//           }


//           .fx-market-subtitle {

//             margin: 5px 0 0;

//             color: #94a3b8;

//             font-size: 9px;

//             line-height: 1.5;
//           }


//           .fx-market-refresh {

//             width: 31px;

//             height: 31px;

//             display: flex;

//             align-items: center;

//             justify-content: center;

//             color: #64748b;

//             background: #f8faf9;

//             border: 1px solid #edf2ee;

//             border-radius: 9px;

//             cursor: pointer;

//             transition: all 0.2s ease;
//           }


//           .fx-market-refresh:hover {

//             color: #15803d;

//             background: #f0fdf4;

//             transform: rotate(15deg);
//           }


//           .fx-market-empty {

//             min-height: 220px;

//             display: flex;

//             flex-direction: column;

//             align-items: center;

//             justify-content: center;

//             padding: 25px;

//             text-align: center;
//           }


//           .fx-market-empty-icon {

//             width: 54px;

//             height: 54px;

//             display: flex;

//             align-items: center;

//             justify-content: center;

//             margin-bottom: 12px;

//             color: #15803d;

//             background: #f0fdf4;

//             border-radius: 15px;
//           }


//           .fx-market-empty h3 {

//             margin: 0 0 6px;

//             color: #334155;

//             font-size: 13px;

//             font-weight: 600;
//           }


//           .fx-market-empty p {

//             max-width: 280px;

//             margin: 0 0 15px;

//             color: #94a3b8;

//             font-size: 9px;

//             line-height: 1.6;
//           }


//           .fx-market-empty-button {

//             display: inline-flex;

//             align-items: center;

//             gap: 6px;

//             padding: 9px 14px;

//             color: white;

//             background: #16a34a;

//             border-radius: 9px;

//             text-decoration: none;

//             font-size: 9px;

//             font-weight: 600;
//           }

//         `}</style>
//       </>
//     );
//   }


//   // =========================================================
//   // MAIN MARKET COMPONENT
//   // =========================================================

//   return (
//     <>
//       <section className="fx-market-card">

//         {/* ===================================================
//             HEADER
//         =================================================== */}

//         <div className="fx-market-header">

//           <div>

//             <div className="fx-market-title-row">

//               <h2 className="fx-market-title">
//                 Market Prices
//               </h2>

//               <span className="fx-market-title-icon">
//                 <BarChart3 size={13} />
//               </span>

//             </div>

//             <p className="fx-market-subtitle">
//               Latest crop prices from nearby markets.
//             </p>

//           </div>


//           <div className="fx-market-header-right">

//             {onRefresh && (

//               <button
//                 type="button"
//                 className="fx-market-refresh"
//                 onClick={onRefresh}
//                 aria-label="Refresh market prices"
//               >
//                 <RefreshCw size={15} />
//               </button>

//             )}

//             <Link
//               to="/market"
//               className="fx-market-view-all"
//             >
//               View All
//               <ArrowRight size={13} />
//             </Link>

//           </div>

//         </div>


//         {/* ===================================================
//             MARKET LIST
//         =================================================== */}

//         <div className="fx-market-list">

//           {prices
//             .slice(0, 5)
//             .map((item, index) => {

//               const trend =
//                 item.trend || "neutral";

//               return (
//                 <div
//                   className="fx-market-row"
//                   key={
//                     item.id ||
//                     `${item.crop}-${index}`
//                   }
//                 >

//                   {/* =========================================
//                       CROP ICON
//                   ========================================= */}

//                   <div className="fx-market-crop-icon">
//                     <span>
//                       {item.icon || "🌾"}
//                     </span>
//                   </div>


//                   {/* =========================================
//                       CROP DETAILS
//                   ========================================= */}

//                   <div className="fx-market-crop-info">

//                     <h3>
//                       {item.crop ||
//                         item.name ||
//                         "Crop"}
//                     </h3>

//                     <span>
//                       {item.market ||
//                         "Local Market"}
//                     </span>

//                   </div>


//                   {/* =========================================
//                       PRICE
//                   ========================================= */}

//                   <div className="fx-market-price">

//                     <div className="fx-market-price-value">

//                       <IndianRupee size={12} />

//                       <strong>
//                         {formatPrice(
//                           item.price
//                         )}
//                       </strong>

//                     </div>

//                     <span>
//                       {item.unit ||
//                         "quintal"}
//                     </span>

//                   </div>


//                   {/* =========================================
//                       TREND
//                   ========================================= */}

//                   <div
//                     className={`
//                       fx-market-trend
//                       ${getTrendClass(trend)}
//                     `}
//                   >

//                     {getTrendIcon(trend)}

//                     {item.change !== undefined &&
//                     item.change !== null
//                       ? `${item.change}%`
//                       : trend === "up"
//                       ? "Rising"
//                       : trend === "down"
//                       ? "Falling"
//                       : "Stable"}

//                   </div>

//                 </div>
//               );
//             })}

//         </div>


//         {/* ===================================================
//             FOOTER
//         =================================================== */}

//         <div className="fx-market-footer">

//           <div className="fx-market-live">

//             <span className="fx-market-live-dot" />

//             <span>
//               Market data updated recently
//             </span>

//           </div>


//           <Link
//             to="/market"
//             className="fx-market-footer-link"
//           >
//             Explore Markets
//             <ArrowRight size={13} />
//           </Link>

//         </div>

//       </section>


//       {/* =====================================================
//           CSS
//       ===================================================== */}

//       <style>{`

//         /* =====================================================
//            CARD
//         ===================================================== */

//         .fx-market-card {

//           width: 100%;

//           padding: 20px;

//           background: #ffffff;

//           border: 1px solid #e7eee9;

//           border-radius: 18px;

//           box-shadow:
//             0 3px 15px
//             rgba(15,23,42,0.035);

//           box-sizing: border-box;
//         }


//         /* =====================================================
//            HEADER
//         ===================================================== */

//         .fx-market-header {

//           display: flex;

//           align-items: flex-start;

//           justify-content: space-between;

//           gap: 12px;

//           margin-bottom: 12px;
//         }


//         .fx-market-title-row {

//           display: flex;

//           align-items: center;

//           gap: 7px;
//         }


//         .fx-market-title {

//           margin: 0;

//           color: #172033;

//           font-size: 17px;

//           line-height: 1.3;

//           font-weight: 700;
//         }


//         .fx-market-title-icon {

//           width: 22px;

//           height: 22px;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           color: #15803d;

//           background: #f0fdf4;

//           border-radius: 7px;
//         }


//         .fx-market-subtitle {

//           margin: 5px 0 0;

//           color: #94a3b8;

//           font-size: 9px;

//           line-height: 1.5;
//         }


//         .fx-market-header-right {

//           display: flex;

//           align-items: center;

//           gap: 10px;

//           flex-shrink: 0;
//         }


//         /* =====================================================
//            REFRESH
//         ===================================================== */

//         .fx-market-refresh {

//           width: 31px;

//           height: 31px;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           color: #64748b;

//           background: #f8faf9;

//           border: 1px solid #edf2ee;

//           border-radius: 9px;

//           cursor: pointer;

//           transition:
//             color 0.2s ease,
//             background 0.2s ease,
//             transform 0.2s ease;
//         }


//         .fx-market-refresh:hover {

//           color: #15803d;

//           background: #f0fdf4;

//           transform: rotate(15deg);
//         }


//         /* =====================================================
//            VIEW ALL
//         ===================================================== */

//         .fx-market-view-all {

//           display: flex;

//           align-items: center;

//           gap: 4px;

//           color: #15803d;

//           font-size: 9px;

//           font-weight: 600;

//           text-decoration: none;

//           transition: gap 0.2s ease;
//         }


//         .fx-market-view-all:hover {

//           gap: 7px;
//         }


//         /* =====================================================
//            MARKET LIST
//         ===================================================== */

//         .fx-market-list {

//           display: flex;

//           flex-direction: column;

//           gap: 5px;
//         }


//         /* =====================================================
//            MARKET ROW
//         ===================================================== */

//         .fx-market-row {

//           display: grid;

//           grid-template-columns:
//             38px
//             minmax(0, 1fr)
//             auto
//             auto;

//           align-items: center;

//           gap: 10px;

//           min-width: 0;

//           padding: 9px;

//           background: #fbfdfb;

//           border: 1px solid #edf3ee;

//           border-radius: 11px;

//           transition:
//             transform 0.2s ease,
//             border-color 0.2s ease,
//             box-shadow 0.2s ease;
//         }


//         .fx-market-row:hover {

//           transform: translateY(-1px);

//           border-color: #d9e9dc;

//           box-shadow:
//             0 5px 16px
//             rgba(22,163,74,0.055);
//         }


//         /* =====================================================
//            CROP ICON
//         ===================================================== */

//         .fx-market-crop-icon {

//           width: 38px;

//           height: 38px;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           background: #f0fdf4;

//           border-radius: 10px;

//           font-size: 18px;
//         }


//         /* =====================================================
//            CROP INFO
//         ===================================================== */

//         .fx-market-crop-info {

//           min-width: 0;
//         }


//         .fx-market-crop-info h3 {

//           margin: 0;

//           overflow: hidden;

//           color: #334155;

//           font-size: 11px;

//           line-height: 1.4;

//           font-weight: 700;

//           text-overflow: ellipsis;

//           white-space: nowrap;
//         }


//         .fx-market-crop-info span {

//           display: block;

//           margin-top: 2px;

//           overflow: hidden;

//           color: #94a3b8;

//           font-size: 8px;

//           text-overflow: ellipsis;

//           white-space: nowrap;
//         }


//         /* =====================================================
//            PRICE
//         ===================================================== */

//         .fx-market-price {

//           text-align: right;

//           white-space: nowrap;
//         }


//         .fx-market-price-value {

//           display: flex;

//           align-items: center;

//           justify-content: flex-end;

//           gap: 1px;

//           color: #172033;
//         }


//         .fx-market-price-value strong {

//           font-size: 11px;

//           font-weight: 700;
//         }


//         .fx-market-price > span {

//           display: block;

//           margin-top: 2px;

//           color: #94a3b8;

//           font-size: 7px;

//           text-transform: uppercase;

//           letter-spacing: 0.03em;
//         }


//         /* =====================================================
//            TREND
//         ===================================================== */

//         .fx-market-trend {

//           min-width: 54px;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           gap: 3px;

//           padding: 5px 7px;

//           border-radius: 999px;

//           font-size: 7px;

//           font-weight: 700;

//           white-space: nowrap;
//         }


//         .fx-market-trend-up {

//           color: #15803d;

//           background: #dcfce7;
//         }


//         .fx-market-trend-down {

//           color: #dc2626;

//           background: #fee2e2;
//         }


//         .fx-market-trend-neutral {

//           color: #64748b;

//           background: #f1f5f9;
//         }


//         /* =====================================================
//            FOOTER
//         ===================================================== */

//         .fx-market-footer {

//           display: flex;

//           align-items: center;

//           justify-content: space-between;

//           gap: 10px;

//           margin-top: 12px;

//           padding-top: 10px;

//           border-top: 1px solid #eef3ef;
//         }


//         .fx-market-live {

//           display: flex;

//           align-items: center;

//           gap: 5px;

//           color: #94a3b8;

//           font-size: 8px;
//         }


//         .fx-market-live-dot {

//           width: 6px;

//           height: 6px;

//           border-radius: 50%;

//           background: #22c55e;

//           box-shadow:
//             0 0 0 3px
//             rgba(34,197,94,0.1);
//         }


//         .fx-market-footer-link {

//           display: flex;

//           align-items: center;

//           gap: 4px;

//           color: #15803d;

//           font-size: 8px;

//           font-weight: 600;

//           text-decoration: none;
//         }


//         /* =====================================================
//            LARGE DESKTOP
//         ===================================================== */

//         @media (min-width: 1920px) {

//           .fx-market-card {

//             padding: 22px;
//           }


//           .fx-market-title {

//             font-size: 19px;
//           }


//           .fx-market-subtitle {

//             font-size: 10px;
//           }


//           .fx-market-row {

//             padding: 11px;

//             grid-template-columns:
//               42px
//               minmax(0, 1fr)
//               auto
//               auto;
//           }


//           .fx-market-crop-icon {

//             width: 42px;

//             height: 42px;
//           }


//           .fx-market-crop-info h3 {

//             font-size: 12px;
//           }


//           .fx-market-price-value strong {

//             font-size: 12px;
//           }

//         }


//         /* =====================================================
//            DESKTOP
//         ===================================================== */

//         @media (
//           min-width: 1440px
//         ) and (
//           max-width: 1919px
//         ) {

//           .fx-market-card {

//             min-height: 335px;
//           }

//         }


//         /* =====================================================
//            LAPTOP
//         ===================================================== */

//         @media (
//           min-width: 1024px
//         ) and (
//           max-width: 1439px
//         ) {

//           .fx-market-card {

//             padding: 16px;
//           }


//           .fx-market-title {

//             font-size: 16px;
//           }


//           .fx-market-row {

//             grid-template-columns:
//               34px
//               minmax(0, 1fr)
//               auto
//               auto;

//             gap: 8px;

//             padding: 8px;
//           }


//           .fx-market-crop-icon {

//             width: 34px;

//             height: 34px;

//             font-size: 16px;
//           }


//           .fx-market-crop-info h3 {

//             font-size: 10px;
//           }


//           .fx-market-price-value strong {

//             font-size: 10px;
//           }


//           .fx-market-trend {

//             min-width: 47px;

//             padding: 4px 5px;

//             font-size: 6px;
//           }

//         }


//         /* =====================================================
//            TABLET
//         ===================================================== */

//         @media (
//           min-width: 768px
//         ) and (
//           max-width: 1023px
//         ) {

//           .fx-market-card {

//             padding: 18px;
//           }


//           .fx-market-title {

//             font-size: 17px;
//           }


//           .fx-market-row {

//             padding: 10px;
//           }


//           .fx-market-crop-info h3 {

//             font-size: 11px;
//           }


//           .fx-market-description {

//             font-size: 9px;
//           }

//         }


//         /* =====================================================
//            LARGE MOBILE
//         ===================================================== */

//         @media (
//           min-width: 480px
//         ) and (
//           max-width: 767px
//         ) {

//           .fx-market-card {

//             padding: 15px;

//             border-radius: 16px;
//           }


//           .fx-market-title {

//             font-size: 15px;
//           }


//           .fx-market-subtitle {

//             font-size: 8px;
//           }


//           .fx-market-row {

//             grid-template-columns:
//               34px
//               minmax(0, 1fr)
//               auto
//               auto;

//             gap: 8px;

//             padding: 9px;
//           }


//           .fx-market-crop-icon {

//             width: 34px;

//             height: 34px;

//             font-size: 16px;
//           }


//           .fx-market-crop-info h3 {

//             font-size: 10px;
//           }


//           .fx-market-crop-info span {

//             font-size: 7px;
//           }


//           .fx-market-price-value strong {

//             font-size: 10px;
//           }


//           .fx-market-trend {

//             min-width: 45px;

//             padding: 4px 5px;

//             font-size: 6px;
//           }


//           .fx-market-footer {

//             flex-wrap: wrap;
//           }

//         }


//         /* =====================================================
//            SMALL MOBILE
//         ===================================================== */

//         @media (max-width: 479px) {

//           .fx-market-card {

//             padding: 14px;

//             border-radius: 15px;
//           }


//           .fx-market-title {

//             font-size: 15px;
//           }


//           .fx-market-subtitle {

//             font-size: 8px;

//             max-width: 210px;
//           }


//           .fx-market-view-all {

//             width: 29px;

//             height: 29px;

//             display: flex;

//             align-items: center;

//             justify-content: center;

//             background: #f0fdf4;

//             border-radius: 8px;

//             font-size: 0;
//           }


//           .fx-market-row {

//             grid-template-columns:
//               32px
//               minmax(0, 1fr);

//             gap: 8px;

//             padding: 9px;
//           }


//           .fx-market-crop-icon {

//             width: 32px;

//             height: 32px;

//             font-size: 15px;
//           }


//           .fx-market-crop-info h3 {

//             font-size: 10px;
//           }


//           .fx-market-crop-info span {

//             font-size: 7px;
//           }


//           .fx-market-price {

//             grid-column: 2;

//             justify-self: start;

//             display: flex;

//             align-items: center;

//             gap: 5px;

//             margin-top: -3px;

//             text-align: left;
//           }


//           .fx-market-price-value {

//             justify-content: flex-start;
//           }


//           .fx-market-price-value strong {

//             font-size: 10px;
//           }


//           .fx-market-price > span {

//             margin-top: 0;

//             font-size: 6px;
//           }


//           .fx-market-trend {

//             grid-column: 2;

//             justify-self: start;

//             min-width: 45px;

//             padding: 4px 6px;

//             font-size: 6px;
//           }


//           .fx-market-footer {

//             align-items: flex-start;

//             flex-direction: column;

//             gap: 7px;
//           }


//           .fx-market-live {

//             font-size: 7px;
//           }


//           .fx-market-footer-link {

//             font-size: 8px;
//           }

//         }


//         /* =====================================================
//            EXTRA SMALL
//         ===================================================== */

//         @media (max-width: 359px) {

//           .fx-market-card {

//             padding: 12px;
//           }


//           .fx-market-title {

//             font-size: 14px;
//           }


//           .fx-market-row {

//             padding: 8px;

//             gap: 7px;
//           }


//           .fx-market-crop-icon {

//             width: 29px;

//             height: 29px;

//             font-size: 14px;
//           }


//           .fx-market-crop-info h3 {

//             font-size: 9px;
//           }


//           .fx-market-crop-info span {

//             font-size: 6px;
//           }


//           .fx-market-price-value strong {

//             font-size: 9px;
//           }


//           .fx-market-trend {

//             font-size: 5px;
//           }

//         }


//         /* =====================================================
//            REDUCED MOTION
//         ===================================================== */

//         @media (prefers-reduced-motion: reduce) {

//           .fx-market-row,
//           .fx-market-refresh,
//           .fx-market-view-all {

//             transition: none !important;
//           }

//         }

//       `}</style>
//     </>
//   );
// }