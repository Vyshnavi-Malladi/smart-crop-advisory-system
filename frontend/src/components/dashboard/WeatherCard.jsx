// // src/components/dashboard/WeatherCard.jsx

// import React from "react";
// import { useTranslation } from "react-i18next";

// import {
//   Sun,
//   CloudSun,
//   Cloud,
//   CloudRain,
//   CloudLightning,
//   CloudFog,
//   Snowflake,
//   Droplets,
//   Wind,
//   RefreshCw,
//   CheckCircle2,
//   AlertTriangle,
//   MapPin,
// } from "lucide-react";


// export default function WeatherCard({
//   weather,
//   loading,
//   error,
//   location,
//   isSafeToSpray,
//   onRetry,
// }) {

//   const { t } = useTranslation();

//   // =========================================================
//   // WEATHER ICON
//   // =========================================================

//   const getWeatherIcon = () => {

//     if (!weather) {
//       return <Sun size={58} />;
//     }

//     const code = weather.code;

//     if (code === 0) {
//       return <Sun size={58} />;
//     }

//     if (code >= 1 && code <= 3) {
//       return <CloudSun size={58} />;
//     }

//     if (code >= 45 && code <= 48) {
//       return <CloudFog size={58} />;
//     }

//     if (code >= 51 && code <= 67) {
//       return <CloudRain size={58} />;
//     }

//     if (code >= 71 && code <= 77) {
//       return <Snowflake size={58} />;
//     }

//     if (code >= 80 && code <= 82) {
//       return <CloudRain size={58} />;
//     }

//     if (code >= 95) {
//       return <CloudLightning size={58} />;
//     }

//     return <Cloud size={58} />;
//   };


//   // =========================================================
//   // WEATHER TYPE
//   // =========================================================

//   const getWeatherType = () => {

//     if (!weather) {
//       return "clear";
//     }

//     const code = weather.code;

//     if (code === 0) {
//       return "clear";
//     }

//     if (code >= 1 && code <= 3) {
//       return "partly";
//     }

//     if (code >= 45 && code <= 48) {
//       return "fog";
//     }

//     if (code >= 51 && code <= 67) {
//       return "rain";
//     }

//     if (code >= 71 && code <= 77) {
//       return "snow";
//     }

//     if (code >= 80 && code <= 82) {
//       return "rain";
//     }

//     if (code >= 95) {
//       return "storm";
//     }

//     return "clear";
//   };


//   // =========================================================
//   // DESCRIPTION
//   // =========================================================

//   const getDescription = () => {

//     if (!weather) {
//       return t('weather_info');
//     }

//     if (weather.condition) {
//       return weather.condition;
//     }

//     const code = weather.code;

//     if (code === 0) {
//       return t('weather_clear_sky');
//     }

//     if (code <= 3) {
//       return t('weather_partly_cloudy');
//     }

//     if (code <= 48) {
//       return t('weather_foggy');
//     }

//     if (code <= 67) {
//       return t('weather_rainy');
//     }

//     if (code <= 77) {
//       return t('weather_snowy');
//     }

//     return t('weather_stormy');
//   };


//   const weatherType = getWeatherType();
//   const displayLocation = location || t('location_unavailable');


//   // =========================================================
//   // RENDER
//   // =========================================================

//   return (

//     <section
//       className={`
//         fx-weather-card
//         fx-weather-${weatherType}
//       `}
//     >

//       {/* ===================================================
//           DECORATIONS
//       =================================================== */}

//       <div
//         className="
//           fx-weather-glow
//           fx-weather-glow-one
//         "
//       />

//       <div
//         className="
//           fx-weather-glow
//           fx-weather-glow-two
//         "
//       />

//       <div
//         className="
//           fx-weather-orb
//         "
//       />

//       <div
//         className="
//           fx-weather-cloud
//           cloud-one
//         "
//       />

//       <div
//         className="
//           fx-weather-cloud
//           cloud-two
//         "
//       />


//       {/* ===================================================
//           INNER
//       =================================================== */}

//       <div
//         className="
//           fx-weather-inner
//         "
//       >

//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <div
//           className="
//             fx-weather-header
//           "
//         >

//           <div>

//             <div
//               className="
//                 fx-weather-title
//               "
//             >
//               {t('weather_today')}
//             </div>

//             <div
//               className="
//                 fx-weather-location
//               "
//             >

//               <MapPin size={11} />

//               <span>
//                 {displayLocation}
//               </span>

//             </div>

//           </div>

//           <div
//             className="
//               fx-weather-live
//             "
//           >

//             <span
//               className="
//                 fx-live-dot
//               "
//             />

//             {t('live')}

//           </div>

//         </div>

//         {/* =================================================
//             CONTENT
//         ================================================= */}

//         {loading ? (

//           <div
//             className="
//               fx-weather-loading
//             "
//           >

//             <div
//               className="
//                 fx-loading-icon
//             "
//             >
//               <RefreshCw
//                 size={27}
//               />
//             </div>

//             <div>

//               <div
//                 className="
//                   fx-loading-title
//                 "
//               >
//                 {t('loading_weather')}
//               </div>

//               <div
//                 className="
//                   fx-loading-subtitle
//                 "
//               >
//                 {t('getting_conditions')}
//               </div>

//             </div>

//           </div>

//         ) : error ? (

//           <div
//             className="
//               fx-weather-error
//             "
//           >

//             <div
//               className="
//                 fx-error-icon
//               "
//             >
//               <AlertTriangle
//                 size={22}
//               />
//             </div>

//             <div
//               className="
//                 fx-error-content
//               "
//             >

//               <strong>
//                 {t('unable_to_load_weather')}
//               </strong>

//               <span>
//                 {t('check_connection')}
//               </span>

//             </div>

//             <button
//               type="button"
//               onClick={onRetry}
//               className="
//                 fx-weather-retry
//               "
//             >
//               <RefreshCw
//                 size={14}
//               />
//             </button>

//           </div>

//         ) : (

//           <>

//             {/* =============================================
//                 MAIN WEATHER
//             ============================================= */}

//             <div
//               className="
//                 fx-weather-main
//               "
//             >

//               <div
//                 className={`
//                   fx-weather-icon
//                   fx-icon-${weatherType}
//                 `}
//               >

//                 {getWeatherIcon()}

//               </div>

//               <div
//                 className="
//                   fx-temperature-wrapper
//                 "
//               >

//                 <div
//                   className="
//                     fx-temperature
//                   "
//                 >

//                   {weather?.temp ??
//                     "--"}

//                   <span>
//                     °C
//                   </span>

//                 </div>

//                 <div
//                   className="
//                     fx-weather-condition
//                   "
//                 >
//                   {getDescription()}
//                 </div>

//                 {weather?.feelsLike !==
//                   undefined &&
//                   weather?.feelsLike !==
//                     null && (

//                     <div
//                       className="
//                         fx-feels-like
//                       "
//                     >
//                       {t('feels_like')}{" "}
//                       {weather.feelsLike}°C
//                     </div>

//                   )}

//               </div>

//             </div>

//             {/* =============================================
//                 WEATHER STATS
//             ============================================= */}

//             <div
//               className="
//                 fx-weather-stats
//               "
//             >

//               {/* HUMIDITY */}

//               <div
//                 className="
//                   fx-weather-stat
//                 "
//               >

//                 <div
//                   className="
//                     fx-stat-icon
//                   "
//                 >
//                   <Droplets
//                     size={14}
//                   />
//                 </div>

//                 <div
//                   className="
//                     fx-stat-info
//                   "
//                 >

//                   <span
//                     className="
//                       fx-stat-label
//                     "
//                   >
//                     {t('humidity')}
//                   </span>

//                   <strong>
//                     {weather?.humidity ??
//                       "--"}
//                     %
//                   </strong>

//                 </div>

//               </div>

//               <div
//                 className="
//                   fx-stat-divider
//                 "
//               />

//               {/* WIND */}

//               <div
//                 className="
//                   fx-weather-stat
//                 "
//               >

//                 <div
//                   className="
//                     fx-stat-icon
//                   "
//                 >
//                   <Wind
//                     size={14}
//                   />
//                 </div>

//                 <div
//                   className="
//                     fx-stat-info
//                   "
//                 >

//                   <span
//                     className="
//                       fx-stat-label
//                     "
//                   >
//                     {t('wind')}
//                   </span>

//                   <strong>
//                     {weather?.wind ??
//                       "--"}{" "}
//                     km/h
//                   </strong>

//                 </div>

//               </div>

//               <div
//                 className="
//                   fx-stat-divider
//                 "
//               />

//               {/* RAIN */}

//               <div
//                 className="
//                   fx-weather-stat
//                 "
//               >

//                 <div
//                   className="
//                     fx-stat-icon
//                   "
//                 >
//                   <CloudRain
//                     size={14}
//                   />
//                 </div>

//                 <div
//                   className="
//                     fx-stat-info
//                   "
//                 >

//                   <span
//                     className="
//                       fx-stat-label
//                     "
//                   >
//                     {t('rain_chance')}
//                   </span>

//                   <strong>
//                     {weather?.rain_prob ??
//                       0}%
//                   </strong>

//                 </div>

//               </div>

//             </div>

//             {/* =============================================
//                 SPRAY GUIDANCE
//             ============================================= */}

//             <div
//               className={`
//                 fx-spray-guidance
//                 ${
//                   isSafeToSpray
//                     ? "fx-spray-safe"
//                     : "fx-spray-unsafe"
//                 }
//               `}
//             >

//               {isSafeToSpray ? (

//                 <>

//                   <CheckCircle2
//                     size={14}
//                   />

//                   <div>

//                     <strong>
//                       {t('good_spray_conditions')}
//                     </strong>

//                     <span>
//                       {t('weather_favorable')}
//                     </span>

//                   </div>

//                 </>

//               ) : (

//                 <>

//                   <AlertTriangle
//                     size={14}
//                   />

//                   <div>

//                     <strong>
//                       {t('avoid_spraying')}
//                     </strong>

//                     <span>
//                       {t('wind_rain_warning')}
//                     </span>

//                   </div>

//                 </>

//               )}

//             </div>

//           </>

//         )}

//       </div>

//       {/* ===================================================
//           STYLES
//       =================================================== */}

//       <style>{`

//         .fx-weather-card {

//           position: relative;

//           width: 100%;

//           height: 255px;

//           min-height: 255px;

//           overflow: hidden;

//           box-sizing: border-box;

//           border-radius: 18px;

//           color: white;

//           background:
//             linear-gradient(
//               145deg,
//               #087f5b 0%,
//               #059669 48%,
//               #065f46 100%
//             );

//           border:
//             1px solid
//             rgba(255,255,255,0.08);

//           box-shadow:
//             0 10px 28px
//             rgba(6,95,70,0.16);

//           isolation: isolate;

//         }


//         .fx-weather-clear {

//           background:
//             linear-gradient(
//               145deg,
//               #087f5b,
//               #059669,
//               #065f46
//             );

//         }


//         .fx-weather-partly {

//           background:
//             linear-gradient(
//               145deg,
//               #086f57,
//               #087f5b,
//               #064e3b
//             );

//         }


//         .fx-weather-rain {

//           background:
//             linear-gradient(
//               145deg,
//               #075985,
//               #0f766e,
//               #064e3b
//             );

//         }


//         .fx-weather-storm {

//           background:
//             linear-gradient(
//               145deg,
//               #312e81,
//               #164e63,
//               #064e3b
//             );

//         }


//         .fx-weather-snow {

//           background:
//             linear-gradient(
//               145deg,
//               #155e75,
//               #0f766e,
//               #064e3b
//             );

//         }


//         .fx-weather-inner {

//           position: relative;

//           z-index: 5;

//           width: 100%;

//           height: 100%;

//           padding:
//             17px
//             19px;

//           display: flex;

//           flex-direction: column;

//           box-sizing: border-box;

//         }


//         .fx-weather-glow {

//           position: absolute;

//           border-radius: 50%;

//           pointer-events: none;

//           filter: blur(4px);

//         }


//         .fx-weather-glow-one {

//           width: 160px;

//           height: 160px;

//           top: -75px;

//           right: -35px;

//           background:
//             rgba(255,255,255,0.08);

//         }


//         .fx-weather-glow-two {

//           width: 110px;

//           height: 110px;

//           bottom: -65px;

//           left: -35px;

//           background:
//             rgba(134,239,172,0.08);

//         }


//         .fx-weather-orb {

//           position: absolute;

//           top: 18px;

//           right: 35px;

//           width: 68px;

//           height: 68px;

//           border-radius: 50%;

//           background:
//             radial-gradient(
//               circle at 35% 35%,
//               #fff7ae,
//               #fde68a 35%,
//               #f59e0b
//             );

//           opacity: 0.78;

//           filter:
//             drop-shadow(
//               0 0 18px
//               rgba(250,204,21,0.22)
//             );

//         }


//         .fx-weather-cloud {

//           position: absolute;

//           width: 65px;

//           height: 17px;

//           background:
//             rgba(255,255,255,0.13);

//           border-radius: 999px;

//           pointer-events: none;

//         }


//         .fx-weather-cloud::before,
//         .fx-weather-cloud::after {

//           content: "";

//           position: absolute;

//           border-radius: 50%;

//           background: inherit;

//         }


//         .fx-weather-cloud::before {

//           width: 28px;

//           height: 28px;

//           left: 12px;

//           bottom: 2px;

//         }


//         .fx-weather-cloud::after {

//           width: 23px;

//           height: 23px;

//           right: 10px;

//           bottom: 2px;

//         }


//         .cloud-one {

//           top: 62px;

//           right: 4%;

//           transform:
//             scale(0.75);

//         }


//         .cloud-two {

//           top: 105px;

//           right: 25%;

//           transform:
//             scale(0.5);

//           opacity: 0.65;

//         }


//         .fx-weather-header {

//           display: flex;

//           align-items: flex-start;

//           justify-content: space-between;

//           gap: 8px;

//         }


//         .fx-weather-title {

//           font-size: 15px;

//           line-height: 1.2;

//           font-weight: 700;

//         }


//         .fx-weather-location {

//           display: flex;

//           align-items: center;

//           gap: 4px;

//           margin-top: 4px;

//           max-width: 250px;

//           overflow: hidden;

//           color:
//             rgba(255,255,255,0.68);

//           font-size: 9px;

//           white-space: nowrap;

//           text-overflow: ellipsis;

//         }


//         .fx-weather-location svg {

//           flex-shrink: 0;

//           color: #86efac;

//         }


//         .fx-weather-live {

//           display: flex;

//           align-items: center;

//           gap: 4px;

//           padding:
//             4px
//             7px;

//           color:
//             rgba(255,255,255,0.78);

//           background:
//             rgba(255,255,255,0.08);

//           border:
//             1px solid
//             rgba(255,255,255,0.08);

//           border-radius: 999px;

//           font-size: 7px;

//           font-weight: 600;

//           text-transform: uppercase;

//         }


//         .fx-live-dot {

//           width: 5px;

//           height: 5px;

//           border-radius: 50%;

//           background: #4ade80;

//           animation:
//             fx-live-pulse 2s infinite;

//         }


//         @keyframes fx-live-pulse {

//           0%,
//           100% {
//             opacity: 1;
//           }

//           50% {
//             opacity: 0.35;
//           }

//         }


//         .fx-weather-main {

//           display: flex;

//           align-items: center;

//           gap: 14px;

//           margin-top: 15px;

//         }


//         .fx-weather-icon {

//           width: 62px;

//           height: 62px;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           flex-shrink: 0;

//           color: #fef08a;

//           background:
//             rgba(255,255,255,0.08);

//           border:
//             1px solid
//             rgba(255,255,255,0.08);

//           border-radius: 15px;

//         }


//         .fx-weather-icon svg {

//           width: 47px;

//           height: 47px;

//         }


//         .fx-icon-rain {

//           color: #bae6fd;

//         }


//         .fx-icon-storm {

//           color: #ddd6fe;

//         }


//         .fx-icon-snow {

//           color: #e0f2fe;

//         }


//         .fx-icon-fog {

//           color: #e2e8f0;

//         }


//         .fx-temperature {

//           display: flex;

//           align-items: flex-start;

//           color: white;

//           font-size: 44px;

//           line-height: 0.9;

//           font-weight: 700;

//           letter-spacing: -1.7px;

//         }


//         .fx-temperature span {

//           margin:
//             2px 0 0 2px;

//           font-size: 18px;

//           font-weight: 400;

//         }


//         .fx-weather-condition {

//           margin-top: 5px;

//           color:
//             rgba(255,255,255,0.9);

//           font-size: 11px;

//           font-weight: 500;

//         }


//         .fx-feels-like {

//           margin-top: 2px;

//           color:
//             rgba(255,255,255,0.55);

//           font-size: 8px;

//         }


//         .fx-weather-stats {

//           display: flex;

//           align-items: center;

//           margin-top: 15px;

//           padding:
//             8px
//             10px;

//           background:
//             rgba(255,255,255,0.08);

//           border:
//             1px solid
//             rgba(255,255,255,0.07);

//           border-radius: 10px;

//           backdrop-filter:
//             blur(8px);

//         }


//         .fx-weather-stat {

//           flex: 1;

//           min-width: 0;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           gap: 5px;

//         }


//         .fx-stat-icon {

//           width: 26px;

//           height: 26px;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           flex-shrink: 0;

//           color: #bbf7d0;

//           background:
//             rgba(255,255,255,0.08);

//           border-radius: 7px;

//         }


//         .fx-stat-info {

//           min-width: 0;

//           display: flex;

//           flex-direction: column;

//           gap: 1px;

//         }


//         .fx-stat-label {

//           color:
//             rgba(255,255,255,0.55);

//           font-size: 7px;

//           white-space: nowrap;

//         }


//         .fx-stat-info strong {

//           color: white;

//           font-size: 10px;

//           font-weight: 700;

//           white-space: nowrap;

//         }


//         .fx-stat-divider {

//           width: 1px;

//           height: 25px;

//           background:
//             rgba(255,255,255,0.12);

//         }


//         .fx-spray-guidance {

//           display: flex;

//           align-items: center;

//           gap: 7px;

//           margin-top: 8px;

//           padding:
//             7px
//             9px;

//           min-height: 32px;

//           box-sizing: border-box;

//           border-radius: 8px;

//         }


//         .fx-spray-guidance svg {

//           flex-shrink: 0;

//         }


//         .fx-spray-guidance div {

//           min-width: 0;

//           display: flex;

//           flex-direction: column;

//           gap: 1px;

//         }


//         .fx-spray-guidance strong {

//           font-size: 8px;

//           line-height: 1.1;

//           white-space: nowrap;

//         }


//         .fx-spray-guidance span {

//           font-size: 7px;

//           line-height: 1.1;

//           opacity: 0.75;

//           white-space: nowrap;

//           overflow: hidden;

//           text-overflow: ellipsis;

//         }


//         .fx-spray-safe {

//           color: #dcfce7;

//           background:
//             rgba(34,197,94,0.12);

//           border:
//             1px solid
//             rgba(134,239,172,0.12);

//         }


//         .fx-spray-unsafe {

//           color: #fee2e2;

//           background:
//             rgba(239,68,68,0.15);

//           border:
//             1px solid
//             rgba(252,165,165,0.15);

//         }


//         .fx-weather-loading {

//           display: flex;

//           align-items: center;

//           gap: 10px;

//           margin-top: 28px;

//           padding: 10px;

//           background:
//             rgba(255,255,255,0.06);

//           border-radius: 10px;

//         }


//         .fx-loading-icon {

//           width: 43px;

//           height: 43px;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           color: #fde68a;

//           background:
//             rgba(255,255,255,0.08);

//           border-radius: 10px;

//           animation:
//             fx-spin 1.5s linear infinite;

//         }


//         @keyframes fx-spin {

//           from {
//             transform:
//               rotate(0deg);
//           }

//           to {
//             transform:
//               rotate(360deg);
//           }

//         }


//         .fx-loading-title {

//           color: white;

//           font-size: 12px;

//           font-weight: 600;

//         }


//         .fx-loading-subtitle {

//           margin-top: 2px;

//           color:
//             rgba(255,255,255,0.5);

//           font-size: 8px;

//         }


//         .fx-weather-error {

//           display: flex;

//           align-items: center;

//           gap: 9px;

//           margin-top: 28px;

//           padding: 10px;

//           background:
//             rgba(255,255,255,0.07);

//           border-radius: 10px;

//         }


//         .fx-error-icon {

//           width: 36px;

//           height: 36px;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           flex-shrink: 0;

//           color: #fed7aa;

//           background:
//             rgba(249,115,22,0.15);

//           border-radius: 9px;

//         }


//         .fx-error-content {

//           flex: 1;

//           min-width: 0;

//           display: flex;

//           flex-direction: column;

//           gap: 2px;

//         }


//         .fx-error-content strong {

//           color: white;

//           font-size: 10px;

//         }


//         .fx-error-content span {

//           color:
//             rgba(255,255,255,0.55);

//           font-size: 8px;

//         }


//         .fx-weather-retry {

//           width: 32px;

//           height: 32px;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           flex-shrink: 0;

//           color: white;

//           background:
//             rgba(255,255,255,0.08);

//           border:
//             1px solid
//             rgba(255,255,255,0.1);

//           border-radius: 8px;

//           cursor: pointer;

//         }


//         /* =====================================================
//            LAPTOP
//         ===================================================== */

//         @media (
//           min-width: 1024px
//         ) and (
//           max-width: 1199px
//         ) {

//           .fx-weather-card {

//             height: 245px;

//             min-height: 245px;

//           }


//           .fx-weather-inner {

//             padding:
//               15px
//               16px;

//           }


//           .fx-temperature {

//             font-size: 41px;

//           }


//           .fx-weather-icon {

//             width: 58px;

//             height: 58px;

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

//           .fx-weather-card {

//             height: 245px;

//             min-height: 245px;

//           }

//         }


//         /* =====================================================
//            MOBILE
//         ===================================================== */

//         @media (max-width: 767px) {

//           .fx-weather-card {

//             height: 245px;

//             min-height: 245px;

//             border-radius: 15px;

//           }


//           .fx-weather-inner {

//             padding:
//               14px;

//           }


//           .fx-weather-main {

//             margin-top: 12px;

//           }


//           .fx-weather-stats {

//             margin-top: 11px;

//           }

//         }


//         /* =====================================================
//            SMALL MOBILE
//         ===================================================== */

//         @media (max-width: 479px) {

//           .fx-weather-card {

//             height: 240px;

//             min-height: 240px;

//           }


//           .fx-weather-inner {

//             padding:
//               12px;

//           }


//           .fx-weather-title {

//             font-size: 13px;

//           }


//           .fx-weather-location {

//             max-width: 160px;

//             font-size: 7px;

//           }


//           .fx-weather-icon {

//             width: 50px;

//             height: 50px;

//           }


//           .fx-weather-icon svg {

//             width: 37px;

//             height: 37px;

//           }


//           .fx-temperature {

//             font-size: 35px;

//           }


//           .fx-weather-stats {

//             padding:
//               6px;

//           }


//           .fx-stat-icon {

//             width: 22px;

//             height: 22px;

//           }


//           .fx-stat-label {

//             font-size: 6px;

//           }


//           .fx-stat-info strong {

//             font-size: 8px;

//           }

//         }

//       `}</style>

//     </section>

//   );

// }


















// src/components/dashboard/WeatherCard.jsx
import React from "react";
import { useTranslation } from "react-i18next";

import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  Snowflake,
  Droplets,
  Wind,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  MapPin,
} from "lucide-react";


export default function WeatherCard({
  weather,
  loading,
  error,
  location,
  isSafeToSpray,
  onRetry,
  ...props  // 👈 This allows data-tour attribute to be passed
}) {

  const { t } = useTranslation();

  // =========================================================
  // WEATHER ICON
  // =========================================================

  const getWeatherIcon = () => {

    if (!weather) {
      return <Sun size={58} />;
    }

    const code = weather.code;

    if (code === 0) {
      return <Sun size={58} />;
    }

    if (code >= 1 && code <= 3) {
      return <CloudSun size={58} />;
    }

    if (code >= 45 && code <= 48) {
      return <CloudFog size={58} />;
    }

    if (code >= 51 && code <= 67) {
      return <CloudRain size={58} />;
    }

    if (code >= 71 && code <= 77) {
      return <Snowflake size={58} />;
    }

    if (code >= 80 && code <= 82) {
      return <CloudRain size={58} />;
    }

    if (code >= 95) {
      return <CloudLightning size={58} />;
    }

    return <Cloud size={58} />;
  };


  // =========================================================
  // WEATHER TYPE
  // =========================================================

  const getWeatherType = () => {

    if (!weather) {
      return "clear";
    }

    const code = weather.code;

    if (code === 0) {
      return "clear";
    }

    if (code >= 1 && code <= 3) {
      return "partly";
    }

    if (code >= 45 && code <= 48) {
      return "fog";
    }

    if (code >= 51 && code <= 67) {
      return "rain";
    }

    if (code >= 71 && code <= 77) {
      return "snow";
    }

    if (code >= 80 && code <= 82) {
      return "rain";
    }

    if (code >= 95) {
      return "storm";
    }

    return "clear";
  };


  // =========================================================
  // DESCRIPTION
  // =========================================================

  const getDescription = () => {

    if (!weather) {
      return t('weather_info');
    }

    if (weather.condition) {
      return weather.condition;
    }

    const code = weather.code;

    if (code === 0) {
      return t('weather_clear_sky');
    }

    if (code <= 3) {
      return t('weather_partly_cloudy');
    }

    if (code <= 48) {
      return t('weather_foggy');
    }

    if (code <= 67) {
      return t('weather_rainy');
    }

    if (code <= 77) {
      return t('weather_snowy');
    }

    return t('weather_stormy');
  };


  const weatherType = getWeatherType();
  const displayLocation = location || t('location_unavailable');


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <section
      className={`
        fx-weather-card
        fx-weather-${weatherType}
      `}
      {...props}  // 👈 This passes data-tour="weather" to the section
    >

      {/* ===================================================
          DECORATIONS
      =================================================== */}

      <div
        className="
          fx-weather-glow
          fx-weather-glow-one
        "
      />

      <div
        className="
          fx-weather-glow
          fx-weather-glow-two
        "
      />

      <div
        className="
          fx-weather-orb
        "
      />

      <div
        className="
          fx-weather-cloud
          cloud-one
        "
      />

      <div
        className="
          fx-weather-cloud
          cloud-two
        "
      />


      {/* ===================================================
          INNER
      =================================================== */}

      <div
        className="
          fx-weather-inner
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            fx-weather-header
          "
        >

          <div>

            <div
              className="
                fx-weather-title
              "
            >
              {t('weather_today')}
            </div>

            <div
              className="
                fx-weather-location
              "
            >

              <MapPin size={11} />

              <span>
                {displayLocation}
              </span>

            </div>

          </div>

          <div
            className="
              fx-weather-live
            "
          >

            <span
              className="
                fx-live-dot
              "
            />

            {t('live')}

          </div>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        {loading ? (

          <div
            className="
              fx-weather-loading
            "
          >

            <div
              className="
                fx-loading-icon
            "
            >
              <RefreshCw
                size={27}
              />
            </div>

            <div>

              <div
                className="
                  fx-loading-title
                "
              >
                {t('loading_weather')}
              </div>

              <div
                className="
                  fx-loading-subtitle
                "
              >
                {t('getting_conditions')}
              </div>

            </div>

          </div>

        ) : error ? (

          <div
            className="
              fx-weather-error
            "
          >

            <div
              className="
                fx-error-icon
              "
            >
              <AlertTriangle
                size={22}
              />
            </div>

            <div
              className="
                fx-error-content
              "
            >

              <strong>
                {t('unable_to_load_weather')}
              </strong>

              <span>
                {t('check_connection')}
              </span>

            </div>

            <button
              type="button"
              onClick={onRetry}
              className="
                fx-weather-retry
              "
            >
              <RefreshCw
                size={14}
              />
            </button>

          </div>

        ) : (

          <>

            {/* =============================================
                MAIN WEATHER
            ============================================= */}

            <div
              className="
                fx-weather-main
              "
            >

              <div
                className={`
                  fx-weather-icon
                  fx-icon-${weatherType}
                `}
              >

                {getWeatherIcon()}

              </div>

              <div
                className="
                  fx-temperature-wrapper
                "
              >

                <div
                  className="
                    fx-temperature
                  "
                >

                  {weather?.temp ??
                    "--"}

                  <span>
                    °C
                  </span>

                </div>

                <div
                  className="
                    fx-weather-condition
                  "
                >
                  {getDescription()}
                </div>

                {weather?.feelsLike !==
                  undefined &&
                  weather?.feelsLike !==
                    null && (

                    <div
                      className="
                        fx-feels-like
                      "
                    >
                      {t('feels_like')}{" "}
                      {weather.feelsLike}°C
                    </div>

                  )}

              </div>

            </div>

            {/* =============================================
                WEATHER STATS
            ============================================= */}

            <div
              className="
                fx-weather-stats
              "
            >

              {/* HUMIDITY */}

              <div
                className="
                  fx-weather-stat
                "
              >

                <div
                  className="
                    fx-stat-icon
                  "
                >
                  <Droplets
                    size={14}
                  />
                </div>

                <div
                  className="
                    fx-stat-info
                  "
                >

                  <span
                    className="
                      fx-stat-label
                    "
                  >
                    {t('humidity')}
                  </span>

                  <strong>
                    {weather?.humidity ??
                      "--"}
                    %
                  </strong>

                </div>

              </div>

              <div
                className="
                  fx-stat-divider
                "
              />

              {/* WIND */}

              <div
                className="
                  fx-weather-stat
                "
              >

                <div
                  className="
                    fx-stat-icon
                  "
                >
                  <Wind
                    size={14}
                  />
                </div>

                <div
                  className="
                    fx-stat-info
                  "
                >

                  <span
                    className="
                      fx-stat-label
                    "
                  >
                    {t('wind')}
                  </span>

                  <strong>
                    {weather?.wind ??
                      "--"}{" "}
                    km/h
                  </strong>

                </div>

              </div>

              <div
                className="
                  fx-stat-divider
                "
              />

              {/* RAIN */}

              <div
                className="
                  fx-weather-stat
                "
              >

                <div
                  className="
                    fx-stat-icon
                  "
                >
                  <CloudRain
                    size={14}
                  />
                </div>

                <div
                  className="
                    fx-stat-info
                  "
                >

                  <span
                    className="
                      fx-stat-label
                    "
                  >
                    {t('rain_chance')}
                  </span>

                  <strong>
                    {weather?.rain_prob ??
                      0}%
                  </strong>

                </div>

              </div>

            </div>

            {/* =============================================
                SPRAY GUIDANCE
            ============================================= */}

            <div
              className={`
                fx-spray-guidance
                ${
                  isSafeToSpray
                    ? "fx-spray-safe"
                    : "fx-spray-unsafe"
                }
              `}
            >

              {isSafeToSpray ? (

                <>

                  <CheckCircle2
                    size={14}
                  />

                  <div>

                    <strong>
                      {t('good_spray_conditions')}
                    </strong>

                    <span>
                      {t('weather_favorable')}
                    </span>

                  </div>

                </>

              ) : (

                <>

                  <AlertTriangle
                    size={14}
                  />

                  <div>

                    <strong>
                      {t('avoid_spraying')}
                    </strong>

                    <span>
                      {t('wind_rain_warning')}
                    </span>

                  </div>

                </>

              )}

            </div>

          </>

        )}

      </div>

      {/* ===================================================
          STYLES
      =================================================== */}

      <style>{`

        .fx-weather-card {

          position: relative;

          width: 100%;

          height: 255px;

          min-height: 255px;

          overflow: hidden;

          box-sizing: border-box;

          border-radius: 18px;

          color: white;

          background:
            linear-gradient(
              145deg,
              #087f5b 0%,
              #059669 48%,
              #065f46 100%
            );

          border:
            1px solid
            rgba(255,255,255,0.08);

          box-shadow:
            0 10px 28px
            rgba(6,95,70,0.16);

          isolation: isolate;

        }


        .fx-weather-clear {

          background:
            linear-gradient(
              145deg,
              #087f5b,
              #059669,
              #065f46
            );

        }


        .fx-weather-partly {

          background:
            linear-gradient(
              145deg,
              #086f57,
              #087f5b,
              #064e3b
            );

        }


        .fx-weather-rain {

          background:
            linear-gradient(
              145deg,
              #075985,
              #0f766e,
              #064e3b
            );

        }


        .fx-weather-storm {

          background:
            linear-gradient(
              145deg,
              #312e81,
              #164e63,
              #064e3b
            );

        }


        .fx-weather-snow {

          background:
            linear-gradient(
              145deg,
              #155e75,
              #0f766e,
              #064e3b
            );

        }


        .fx-weather-inner {

          position: relative;

          z-index: 5;

          width: 100%;

          height: 100%;

          padding:
            17px
            19px;

          display: flex;

          flex-direction: column;

          box-sizing: border-box;

        }


        .fx-weather-glow {

          position: absolute;

          border-radius: 50%;

          pointer-events: none;

          filter: blur(4px);

        }


        .fx-weather-glow-one {

          width: 160px;

          height: 160px;

          top: -75px;

          right: -35px;

          background:
            rgba(255,255,255,0.08);

        }


        .fx-weather-glow-two {

          width: 110px;

          height: 110px;

          bottom: -65px;

          left: -35px;

          background:
            rgba(134,239,172,0.08);

        }


        .fx-weather-orb {

          position: absolute;

          top: 18px;

          right: 35px;

          width: 68px;

          height: 68px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 35%,
              #fff7ae,
              #fde68a 35%,
              #f59e0b
            );

          opacity: 0.78;

          filter:
            drop-shadow(
              0 0 18px
              rgba(250,204,21,0.22)
            );

        }


        .fx-weather-cloud {

          position: absolute;

          width: 65px;

          height: 17px;

          background:
            rgba(255,255,255,0.13);

          border-radius: 999px;

          pointer-events: none;

        }


        .fx-weather-cloud::before,
        .fx-weather-cloud::after {

          content: "";

          position: absolute;

          border-radius: 50%;

          background: inherit;

        }


        .fx-weather-cloud::before {

          width: 28px;

          height: 28px;

          left: 12px;

          bottom: 2px;

        }


        .fx-weather-cloud::after {

          width: 23px;

          height: 23px;

          right: 10px;

          bottom: 2px;

        }


        .cloud-one {

          top: 62px;

          right: 4%;

          transform:
            scale(0.75);

        }


        .cloud-two {

          top: 105px;

          right: 25%;

          transform:
            scale(0.5);

          opacity: 0.65;

        }


        .fx-weather-header {

          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          gap: 8px;

        }


        .fx-weather-title {

          font-size: 15px;

          line-height: 1.2;

          font-weight: 700;

        }


        .fx-weather-location {

          display: flex;

          align-items: center;

          gap: 4px;

          margin-top: 4px;

          max-width: 250px;

          overflow: hidden;

          color:
            rgba(255,255,255,0.68);

          font-size: 9px;

          white-space: nowrap;

          text-overflow: ellipsis;

        }


        .fx-weather-location svg {

          flex-shrink: 0;

          color: #86efac;

        }


        .fx-weather-live {

          display: flex;

          align-items: center;

          gap: 4px;

          padding:
            4px
            7px;

          color:
            rgba(255,255,255,0.78);

          background:
            rgba(255,255,255,0.08);

          border:
            1px solid
            rgba(255,255,255,0.08);

          border-radius: 999px;

          font-size: 7px;

          font-weight: 600;

          text-transform: uppercase;

        }


        .fx-live-dot {

          width: 5px;

          height: 5px;

          border-radius: 50%;

          background: #4ade80;

          animation:
            fx-live-pulse 2s infinite;

        }


        @keyframes fx-live-pulse {

          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.35;
          }

        }


        .fx-weather-main {

          display: flex;

          align-items: center;

          gap: 14px;

          margin-top: 15px;

        }


        .fx-weather-icon {

          width: 62px;

          height: 62px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          color: #fef08a;

          background:
            rgba(255,255,255,0.08);

          border:
            1px solid
            rgba(255,255,255,0.08);

          border-radius: 15px;

        }


        .fx-weather-icon svg {

          width: 47px;

          height: 47px;

        }


        .fx-icon-rain {

          color: #bae6fd;

        }


        .fx-icon-storm {

          color: #ddd6fe;

        }


        .fx-icon-snow {

          color: #e0f2fe;

        }


        .fx-icon-fog {

          color: #e2e8f0;

        }


        .fx-temperature {

          display: flex;

          align-items: flex-start;

          color: white;

          font-size: 44px;

          line-height: 0.9;

          font-weight: 700;

          letter-spacing: -1.7px;

        }


        .fx-temperature span {

          margin:
            2px 0 0 2px;

          font-size: 18px;

          font-weight: 400;

        }


        .fx-weather-condition {

          margin-top: 5px;

          color:
            rgba(255,255,255,0.9);

          font-size: 11px;

          font-weight: 500;

        }


        .fx-feels-like {

          margin-top: 2px;

          color:
            rgba(255,255,255,0.55);

          font-size: 8px;

        }


        .fx-weather-stats {

          display: flex;

          align-items: center;

          margin-top: 15px;

          padding:
            8px
            10px;

          background:
            rgba(255,255,255,0.08);

          border:
            1px solid
            rgba(255,255,255,0.07);

          border-radius: 10px;

          backdrop-filter:
            blur(8px);

        }


        .fx-weather-stat {

          flex: 1;

          min-width: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 5px;

        }


        .fx-stat-icon {

          width: 26px;

          height: 26px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          color: #bbf7d0;

          background:
            rgba(255,255,255,0.08);

          border-radius: 7px;

        }


        .fx-stat-info {

          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 1px;

        }


        .fx-stat-label {

          color:
            rgba(255,255,255,0.55);

          font-size: 7px;

          white-space: nowrap;

        }


        .fx-stat-info strong {

          color: white;

          font-size: 10px;

          font-weight: 700;

          white-space: nowrap;

        }


        .fx-stat-divider {

          width: 1px;

          height: 25px;

          background:
            rgba(255,255,255,0.12);

        }


        .fx-spray-guidance {

          display: flex;

          align-items: center;

          gap: 7px;

          margin-top: 8px;

          padding:
            7px
            9px;

          min-height: 32px;

          box-sizing: border-box;

          border-radius: 8px;

        }


        .fx-spray-guidance svg {

          flex-shrink: 0;

        }


        .fx-spray-guidance div {

          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 1px;

        }


        .fx-spray-guidance strong {

          font-size: 8px;

          line-height: 1.1;

          white-space: nowrap;

        }


        .fx-spray-guidance span {

          font-size: 7px;

          line-height: 1.1;

          opacity: 0.75;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;

        }


        .fx-spray-safe {

          color: #dcfce7;

          background:
            rgba(34,197,94,0.12);

          border:
            1px solid
            rgba(134,239,172,0.12);

        }


        .fx-spray-unsafe {

          color: #fee2e2;

          background:
            rgba(239,68,68,0.15);

          border:
            1px solid
            rgba(252,165,165,0.15);

        }


        .fx-weather-loading {

          display: flex;

          align-items: center;

          gap: 10px;

          margin-top: 28px;

          padding: 10px;

          background:
            rgba(255,255,255,0.06);

          border-radius: 10px;

        }


        .fx-loading-icon {

          width: 43px;

          height: 43px;

          display: flex;

          align-items: center;

          justify-content: center;

          color: #fde68a;

          background:
            rgba(255,255,255,0.08);

          border-radius: 10px;

          animation:
            fx-spin 1.5s linear infinite;

        }


        @keyframes fx-spin {

          from {
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
          }

        }


        .fx-loading-title {

          color: white;

          font-size: 12px;

          font-weight: 600;

        }


        .fx-loading-subtitle {

          margin-top: 2px;

          color:
            rgba(255,255,255,0.5);

          font-size: 8px;

        }


        .fx-weather-error {

          display: flex;

          align-items: center;

          gap: 9px;

          margin-top: 28px;

          padding: 10px;

          background:
            rgba(255,255,255,0.07);

          border-radius: 10px;

        }


        .fx-error-icon {

          width: 36px;

          height: 36px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          color: #fed7aa;

          background:
            rgba(249,115,22,0.15);

          border-radius: 9px;

        }


        .fx-error-content {

          flex: 1;

          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 2px;

        }


        .fx-error-content strong {

          color: white;

          font-size: 10px;

        }


        .fx-error-content span {

          color:
            rgba(255,255,255,0.55);

          font-size: 8px;

        }


        .fx-weather-retry {

          width: 32px;

          height: 32px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          color: white;

          background:
            rgba(255,255,255,0.08);

          border:
            1px solid
            rgba(255,255,255,0.1);

          border-radius: 8px;

          cursor: pointer;

        }


        /* =====================================================
           LAPTOP
        ===================================================== */

        @media (
          min-width: 1024px
        ) and (
          max-width: 1199px
        ) {

          .fx-weather-card {

            height: 245px;

            min-height: 245px;

          }


          .fx-weather-inner {

            padding:
              15px
              16px;

          }


          .fx-temperature {

            font-size: 41px;

          }


          .fx-weather-icon {

            width: 58px;

            height: 58px;

          }

        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (
          min-width: 768px
        ) and (
          max-width: 1023px
        ) {

          .fx-weather-card {

            height: 245px;

            min-height: 245px;

          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 767px) {

          .fx-weather-card {

            height: 245px;

            min-height: 245px;

            border-radius: 15px;

          }


          .fx-weather-inner {

            padding:
              14px;

          }


          .fx-weather-main {

            margin-top: 12px;

          }


          .fx-weather-stats {

            margin-top: 11px;

          }

        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 479px) {

          .fx-weather-card {

            height: 240px;

            min-height: 240px;

          }


          .fx-weather-inner {

            padding:
              12px;

          }


          .fx-weather-title {

            font-size: 13px;

          }


          .fx-weather-location {

            max-width: 160px;

            font-size: 7px;

          }


          .fx-weather-icon {

            width: 50px;

            height: 50px;

          }


          .fx-weather-icon svg {

            width: 37px;

            height: 37px;

          }


          .fx-temperature {

            font-size: 35px;

          }


          .fx-weather-stats {

            padding:
              6px;

          }


          .fx-stat-icon {

            width: 22px;

            height: 22px;

          }


          .fx-stat-label {

            font-size: 6px;

          }


          .fx-stat-info strong {

            font-size: 8px;

          }

        }

      `}</style>

    </section>

  );

}