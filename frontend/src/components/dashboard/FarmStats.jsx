// src/components/dashboard/FarmStats.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import {
  Sprout,
  CloudRain,
  Thermometer,
  Droplets,
  TrendingUp,
  Minus,
  AlertCircle,
} from "lucide-react";

export default function FarmStats({
  crop,
  cropStage,
  rainfall,
  temperature,
  feelsLike,
  soilMoisture,
  loading = false,
}) {
  const { t } = useTranslation();

  // =========================================================
  // CROP STAGE
  // =========================================================

  const getStageName = (stage) => {
    if (!stage) return t('growing');

    if (typeof stage === "string") {
      return stage;
    }

    if (typeof stage === "object") {
      const stageKey = stage.key;

      if (!stageKey) return t('growing');

      const stageNames = {
        germination: t('germination'),
        vegetative: t('vegetative'),
        flowering: t('flowering'),
        harvest: t('harvest_ready'),
      };

      return (
        stageNames[stageKey] ||
        stageKey.charAt(0).toUpperCase() +
          stageKey.slice(1)
      );
    }

    return t('growing');
  };


  // =========================================================
  // SAFE VALUES
  // =========================================================

  const activeCrop = crop || t('rice');

  const currentStage = getStageName(cropStage);

  const rainfallValue =
    rainfall !== undefined &&
    rainfall !== null &&
    rainfall !== ""
      ? rainfall
      : null;

  const temperatureValue =
    temperature !== undefined &&
    temperature !== null &&
    temperature !== ""
      ? temperature
      : null;

  const feelsLikeValue =
    feelsLike !== undefined &&
    feelsLike !== null &&
    feelsLike !== ""
      ? feelsLike
      : null;

  const soilValue =
    soilMoisture !== undefined &&
    soilMoisture !== null &&
    soilMoisture !== ""
      ? soilMoisture
      : null;


  // =========================================================
  // RAINFALL STATUS
  // =========================================================

  const getRainfallStatus = () => {
    if (rainfallValue === null) {
      return {
        text: t('no_data'),
        type: "neutral",
      };
    }

    const value = Number(rainfallValue);

    if (value === 0) {
      return {
        text: t('no_rain'),
        type: "neutral",
      };
    }

    if (value <= 10) {
      return {
        text: t('rain_light'),
        type: "good",
      };
    }

    if (value <= 30) {
      return {
        text: t('rain_moderate'),
        type: "warning",
      };
    }

    return {
      text: t('rain_heavy'),
      type: "danger",
    };
  };


  // =========================================================
  // TEMPERATURE STATUS
  // =========================================================

  const getTemperatureStatus = () => {
    if (temperatureValue === null) {
      return {
        text: t('no_data'),
        type: "neutral",
      };
    }

    const value = Number(temperatureValue);

    if (value >= 18 && value <= 32) {
      return {
        text: t('temp_normal'),
        type: "good",
      };
    }

    if (value > 32) {
      return {
        text: t('temp_high'),
        type: "warning",
      };
    }

    return {
      text: t('temp_low'),
      type: "warning",
    };
  };


  // =========================================================
  // SOIL STATUS
  // =========================================================

  const getSoilStatus = () => {
    if (soilValue === null) {
      return {
        text: t('soil_not_available'),
        type: "neutral",
      };
    }

    const value = Number(soilValue);

    if (value >= 40 && value <= 70) {
      return {
        text: t('soil_good'),
        type: "good",
      };
    }

    if (value < 40) {
      return {
        text: t('soil_low'),
        type: "warning",
      };
    }

    return {
      text: t('soil_high'),
      type: "warning",
    };
  };


  const rainfallStatus = getRainfallStatus();

  const temperatureStatus =
    getTemperatureStatus();

  const soilStatus = getSoilStatus();


  // =========================================================
  // STAT CARDS
  // =========================================================

  const stats = [
    {
      id: "active-crop",

      title: t('active_crop'),

      value: activeCrop,

      subtitle: currentStage,

      icon: Sprout,

      iconClass: "green",

      status: {
        text: t('active'),
        type: "good",
      },

      decoration: "green",
    },

    {
      id: "rainfall",

      title: t('rainfall_today'),

      value:
        rainfallValue !== null
          ? `${rainfallValue} mm`
          : "--",

      subtitle: rainfallStatus.text,

      icon: CloudRain,

      iconClass: "blue",

      status: rainfallStatus,

      decoration: "blue",
    },

    {
      id: "temperature",

      title: t('temperature'),

      value:
        temperatureValue !== null
          ? `${temperatureValue}°C`
          : "--",

      subtitle:
        feelsLikeValue !== null
          ? `${t('feels_like')} ${feelsLikeValue}°C`
          : t('current_temp'),

      icon: Thermometer,

      iconClass: "orange",

      status: temperatureStatus,

      decoration: "orange",
    },

    {
      id: "soil",

      title: t('soil_moisture'),

      value:
        soilValue !== null
          ? `${soilValue}%`
          : "--",

      subtitle: soilStatus.text,

      icon: Droplets,

      iconClass: "purple",

      status: soilStatus,

      decoration: "purple",
    },
  ];


  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <>
        <section
          className="fx-stats-grid"
          aria-label={t('loading_farm_stats')}
        >
          {[1, 2, 3, 4].map((item) => (
            <div
              className="fx-stat-card fx-stat-loading"
              key={item}
            >
              <div className="fx-skeleton fx-skeleton-icon" />

              <div className="fx-skeleton-content">
                <div className="fx-skeleton fx-skeleton-title" />

                <div className="fx-skeleton fx-skeleton-value" />

                <div className="fx-skeleton fx-skeleton-subtitle" />
              </div>
            </div>
          ))}
        </section>

        <FarmStatsStyles />
      </>
    );
  }


  // =========================================================
  // MAIN RENDER
  // =========================================================

  return (
    <>
      <section
        className="fx-stats-grid"
        aria-label={t('farm_statistics')}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              className="fx-stat-card"
              key={stat.id}
            >

              {/* =================================================
                 ICON
              ================================================= */}

              <div
                className={`
                  fx-stat-icon-box
                  fx-icon-${stat.iconClass}
                `}
              >
                <Icon
                  size={25}
                  strokeWidth={2}
                />
              </div>

              {/* =================================================
                 CONTENT
              ================================================= */}

              <div className="fx-stat-content">

                <div className="fx-stat-title-row">

                  <span className="fx-stat-title">
                    {stat.title}
                  </span>

                  <span
                    className={`
                      fx-stat-status
                      fx-status-${stat.status.type}
                    `}
                  >

                    {stat.status.type === "good" && (
                      <TrendingUp size={9} />
                    )}

                    {stat.status.type === "warning" && (
                      <AlertCircle size={9} />
                    )}

                    {stat.status.type === "danger" && (
                      <AlertCircle size={9} />
                    )}

                    {stat.status.type === "neutral" && (
                      <Minus size={9} />
                    )}

                    <span>
                      {stat.status.text}
                    </span>

                  </span>

                </div>

                <div className="fx-stat-value">
                  {stat.value}
                </div>

                <div
                  className={`
                    fx-stat-subtitle
                    fx-subtitle-${stat.iconClass}
                  `}
                >

                  {stat.id === "active-crop" && (
                    <span className="fx-stage-dot" />
                  )}

                  {stat.subtitle}

                </div>

              </div>

              {/* =================================================
                 DECORATIVE CIRCLE
              ================================================= */}

              <div
                className={`
                  fx-stat-decoration
                  fx-decoration-${stat.decoration}
                `}
              />

            </article>
          );
        })}
      </section>

      <FarmStatsStyles />
    </>
  );
}


/* =============================================================
   FARM STATS STYLES
   ============================================================= */

function FarmStatsStyles() {
  return (
    <style>{`

      /* =======================================================
         GRID
      ======================================================= */

      .fx-stats-grid {
        width: 100%;

        display: grid;

        grid-template-columns:
          repeat(2, minmax(0, 1fr));

        gap: 10px;

        align-items: stretch;
      }


      /* =======================================================
         CARD
      ======================================================= */

      .fx-stat-card {
        position: relative;

        width: 100%;

        height: 122px;

        min-height: 122px;

        padding: 13px 15px;

        display: flex;

        align-items: center;

        gap: 12px;

        overflow: hidden;

        box-sizing: border-box;

        border: 1px solid #e3ebe5;

        border-radius: 15px;

        background: #ffffff;

        box-shadow:
          0 3px 12px
          rgba(15, 23, 42, 0.035);

        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease,
          border-color 0.2s ease;
      }


      .fx-stat-card:hover {
        transform: translateY(-2px);

        border-color: #d0e1d5;

        box-shadow:
          0 7px 18px
          rgba(15, 23, 42, 0.065);
      }


      /* =======================================================
         ICON
      ======================================================= */

      .fx-stat-icon-box {
        position: relative;

        z-index: 2;

        width: 50px;

        height: 50px;

        flex-shrink: 0;

        display: flex;

        align-items: center;

        justify-content: center;

        border-radius: 13px;
      }


      .fx-stat-icon-box svg {
        width: 25px;

        height: 25px;
      }


      /* =======================================================
         GREEN ICON
      ======================================================= */

      .fx-icon-green {
        color: #ffffff;

        background:
          linear-gradient(
            145deg,
            #4caf50,
            #218b45
          );

        box-shadow:
          0 5px 12px
          rgba(33, 139, 69, 0.17);
      }


      /* =======================================================
         BLUE ICON
      ======================================================= */

      .fx-icon-blue {
        color: #ffffff;

        background:
          linear-gradient(
            145deg,
            #4b9bea,
            #2875c9
          );

        box-shadow:
          0 5px 12px
          rgba(40, 117, 201, 0.15);
      }


      /* =======================================================
         ORANGE ICON
      ======================================================= */

      .fx-icon-orange {
        color: #ffffff;

        background:
          linear-gradient(
            145deg,
            #ffad42,
            #f27d17
          );

        box-shadow:
          0 5px 12px
          rgba(242, 125, 23, 0.15);
      }


      /* =======================================================
         PURPLE ICON
      ======================================================= */

      .fx-icon-purple {
        color: #ffffff;

        background:
          linear-gradient(
            145deg,
            #a46be8,
            #7943c6
          );

        box-shadow:
          0 5px 12px
          rgba(121, 67, 198, 0.15);
      }


      /* =======================================================
         CONTENT
      ======================================================= */

      .fx-stat-content {
        position: relative;

        z-index: 3;

        min-width: 0;

        flex: 1;

        display: flex;

        flex-direction: column;

        justify-content: center;
      }


      /* =======================================================
         TITLE ROW
      ======================================================= */

      .fx-stat-title-row {
        width: 100%;

        display: flex;

        align-items: center;

        justify-content: space-between;

        gap: 7px;

        margin-bottom: 4px;
      }


      .fx-stat-title {
        min-width: 0;

        overflow: hidden;

        color: #526174;

        font-size: 10.5px;

        line-height: 1.2;

        font-weight: 500;

        white-space: nowrap;

        text-overflow: ellipsis;
      }


      /* =======================================================
         STATUS
      ======================================================= */

      .fx-stat-status {
        display: inline-flex;

        align-items: center;

        justify-content: center;

        gap: 3px;

        flex-shrink: 0;

        max-width: 90px;

        padding: 4px 6px;

        overflow: hidden;

        border-radius: 999px;

        font-size: 7px;

        line-height: 1;

        font-weight: 600;

        white-space: nowrap;

        text-overflow: ellipsis;
      }


      .fx-status-good {
        color: #15803d;

        background: #edf9f0;
      }


      .fx-status-warning {
        color: #b66a00;

        background: #fff7e7;
      }


      .fx-status-danger {
        color: #c0392b;

        background: #fff0ee;
      }


      .fx-status-neutral {
        color: #6b7280;

        background: #f1f4f7;
      }


      /* =======================================================
         VALUE
      ======================================================= */

      .fx-stat-value {
        max-width: 100%;

        overflow: hidden;

        color: #172033;

        font-size: 20px;

        line-height: 1.1;

        font-weight: 700;

        letter-spacing: -0.3px;

        white-space: nowrap;

        text-overflow: ellipsis;
      }


      /* =======================================================
         SUBTITLE
      ======================================================= */

      .fx-stat-subtitle {
        max-width: 100%;

        margin-top: 4px;

        display: flex;

        align-items: center;

        gap: 5px;

        overflow: hidden;

        font-size: 9px;

        line-height: 1.2;

        white-space: nowrap;

        text-overflow: ellipsis;
      }


      .fx-subtitle-green {
        color: #258348;
      }


      .fx-subtitle-blue {
        color: #3279c4;
      }


      .fx-subtitle-orange {
        color: #e87516;
      }


      .fx-subtitle-purple {
        color: #7750b8;
      }


      /* =======================================================
         CROP DOT
      ======================================================= */

      .fx-stage-dot {
        width: 6px;

        height: 6px;

        flex-shrink: 0;

        border-radius: 50%;

        background: #28b463;
      }


      /* =======================================================
         DECORATIONS
      ======================================================= */

      .fx-stat-decoration {
        position: absolute;

        z-index: 1;

        pointer-events: none;

        border-radius: 50%;

        opacity: 0.45;
      }


      .fx-decoration-green {
        width: 95px;

        height: 95px;

        right: -50px;

        bottom: -53px;

        background: #e9f8ed;
      }


      .fx-decoration-blue {
        width: 92px;

        height: 92px;

        right: -48px;

        top: -50px;

        background: #edf7ff;
      }


      .fx-decoration-orange {
        width: 92px;

        height: 92px;

        right: -48px;

        bottom: -50px;

        background: #fff4e5;
      }


      .fx-decoration-purple {
        width: 92px;

        height: 92px;

        right: -47px;

        top: -49px;

        background: #f5edff;
      }


      /* =======================================================
         LOADING
      ======================================================= */

      .fx-stat-loading {
        display: flex;

        align-items: center;

        gap: 12px;
      }


      .fx-skeleton {
        background:
          linear-gradient(
            90deg,
            #edf2ee 25%,
            #f8faf8 50%,
            #edf2ee 75%
          );

        background-size: 200% 100%;

        animation:
          fx-loading 1.4s infinite;

        border-radius: 6px;
      }


      .fx-skeleton-icon {
        width: 50px;

        height: 50px;

        flex-shrink: 0;

        border-radius: 13px;
      }


      .fx-skeleton-content {
        flex: 1;

        min-width: 0;
      }


      .fx-skeleton-title {
        width: 65px;

        height: 8px;

        margin-bottom: 8px;
      }


      .fx-skeleton-value {
        width: 90px;

        height: 17px;

        margin-bottom: 6px;
      }


      .fx-skeleton-subtitle {
        width: 70px;

        height: 7px;
      }


      @keyframes fx-loading {

        0% {
          background-position: 200% 0;
        }

        100% {
          background-position: -200% 0;
        }

      }


      /* =======================================================
         LARGE DESKTOP
      ======================================================= */

      @media (min-width: 1440px) {

        .fx-stats-grid {
          gap: 11px;
        }


        .fx-stat-card {
          height: 122px;

          min-height: 122px;

          padding: 13px 15px;
        }

      }


      /* =======================================================
         LAPTOP
      ======================================================= */

      @media (
        min-width: 1024px
      ) and (
        max-width: 1439px
      ) {

        .fx-stats-grid {
          gap: 9px;
        }


        .fx-stat-card {
          height: 119px;

          min-height: 119px;

          padding: 12px 13px;

          gap: 10px;

          border-radius: 14px;
        }


        .fx-stat-icon-box {
          width: 46px;

          height: 46px;

          border-radius: 12px;
        }


        .fx-stat-icon-box svg {
          width: 23px;

          height: 23px;
        }


        .fx-stat-title {
          font-size: 10px;
        }


        .fx-stat-value {
          font-size: 19px;
        }


        .fx-stat-subtitle {
          font-size: 8.5px;
        }


        .fx-stat-status {
          padding: 3px 5px;

          font-size: 6.5px;
        }

      }


      /* =======================================================
         TABLET
      ======================================================= */

      @media (
        min-width: 768px
      ) and (
        max-width: 1023px
      ) {

        .fx-stats-grid {
          gap: 10px;
        }


        .fx-stat-card {
          height: 120px;

          min-height: 120px;

          padding: 12px;

          gap: 10px;
        }


        .fx-stat-icon-box {
          width: 46px;

          height: 46px;
        }


        .fx-stat-value {
          font-size: 19px;
        }

      }


      /* =======================================================
         MOBILE
      ======================================================= */

      @media (max-width: 767px) {

        .fx-stats-grid {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 9px;
        }


        .fx-stat-card {
          height: 116px;

          min-height: 116px;

          padding: 11px;

          gap: 9px;

          border-radius: 13px;
        }


        .fx-stat-icon-box {
          width: 42px;

          height: 42px;

          border-radius: 11px;
        }


        .fx-stat-icon-box svg {
          width: 21px;

          height: 21px;
        }


        .fx-stat-title {
          font-size: 8.5px;
        }


        .fx-stat-value {
          font-size: 17px;
        }


        .fx-stat-subtitle {
          font-size: 8px;
        }


        .fx-stat-status {
          padding: 3px 5px;

          font-size: 6px;
        }

      }


      /* =======================================================
         SMALL MOBILE
      ======================================================= */

      @media (max-width: 479px) {

        .fx-stats-grid {
          gap: 7px;
        }


        .fx-stat-card {
          height: 108px;

          min-height: 108px;

          padding: 9px;

          gap: 8px;

          border-radius: 12px;
        }


        .fx-stat-icon-box {
          width: 37px;

          height: 37px;

          border-radius: 10px;
        }


        .fx-stat-icon-box svg {
          width: 19px;

          height: 19px;
        }


        .fx-stat-title-row {
          margin-bottom: 3px;
        }


        .fx-stat-title {
          font-size: 7.5px;
        }


        .fx-stat-value {
          font-size: 15.5px;
        }


        .fx-stat-subtitle {
          margin-top: 3px;

          font-size: 7px;
        }


        .fx-stat-status {
          display: none;
        }

      }


      /* =======================================================
         EXTRA SMALL
      ======================================================= */

      @media (max-width: 359px) {

        .fx-stat-card {
          height: 102px;

          min-height: 102px;

          padding: 8px;

          gap: 7px;
        }


        .fx-stat-icon-box {
          width: 34px;

          height: 34px;
        }


        .fx-stat-icon-box svg {
          width: 17px;

          height: 17px;
        }


        .fx-stat-value {
          font-size: 14px;
        }

      }


      /* =======================================================
         ACCESSIBILITY
      ======================================================= */

      @media (prefers-reduced-motion: reduce) {

        .fx-stat-card,
        .fx-skeleton {
          animation: none !important;

          transition: none !important;
        }

      }

    `}</style>
  );
}