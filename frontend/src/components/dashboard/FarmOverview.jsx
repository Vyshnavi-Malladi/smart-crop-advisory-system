// src/components/dashboard/FarmOverview.jsx

import React from "react";
import {
  Sprout,
  CalendarDays,
  MapPin,
  Ruler,
  Droplets,
  Leaf,
  HeartPulse,
  ArrowRight,
} from "lucide-react";

export default function FarmOverview({
  farmerProfile,
  crop,
  cropStage,
  sowingDate,
  farmArea,
  location,
  soilType,
  soilMoisture,
  onViewFarm,
}) {
  // =========================================================
  // SAFE VALUES
  // =========================================================

  const activeCrop =
    crop || "Not available";

  const activeStage =
    typeof cropStage === "object"
      ? cropStage?.key
      : cropStage;

  const stageNames = {
    germination: "Germination",
    vegetative: "Vegetative Growth",
    flowering: "Flowering",
    harvest: "Ready for Harvest",
  };

  const stage =
    stageNames[activeStage] ||
    activeStage ||
    "Not tracked";

  const farmerName =
    farmerProfile?.fullName ||
    farmerProfile?.name ||
    "Farmer";

  const farmLocation =
    location ||
    farmerProfile?.location ||
    farmerProfile?.village ||
    "Location not available";

  const area =
    farmArea ||
    farmerProfile?.farmArea ||
    farmerProfile?.landArea ||
    "--";

  const soil =
    soilType ||
    farmerProfile?.soilType ||
    "Not available";

  const moisture =
    soilMoisture !== undefined &&
    soilMoisture !== null &&
    soilMoisture !== ""
      ? `${soilMoisture}%`
      : "--";

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // =========================================================
  // FARM HEALTH
  // =========================================================

  const getFarmHealth = () => {
    if (
      !farmerProfile &&
      !crop
    ) {
      return {
        label: "Getting started",
        description:
          "Add your farm details to get personalized insights.",
        type: "neutral",
      };
    }

    if (
      activeStage === "harvest"
    ) {
      return {
        label: "Ready for harvest",
        description:
          "Your crop is approaching the harvest stage.",
        type: "good",
      };
    }

    if (
      activeStage === "flowering"
    ) {
      return {
        label: "Crop progressing well",
        description:
          "Your crop is currently in the flowering stage.",
        type: "good",
      };
    }

    return {
      label: "Farm is active",
      description:
        "Keep monitoring your crop and soil conditions.",
      type: "good",
    };
  };


  const health = getFarmHealth();


  // =========================================================
  // FARM STATS
  // =========================================================

  const stats = [
    {
      id: "crop",
      label: "Active Crop",
      value: activeCrop,
      icon: Sprout,
      type: "green",
    },

    {
      id: "sowing",
      label: "Sowing Date",
      value: formatDate(sowingDate),
      icon: CalendarDays,
      type: "blue",
    },

    {
      id: "area",
      label: "Farm Area",
      value: area,
      icon: Ruler,
      type: "orange",
    },

    {
      id: "soil",
      label: "Soil Type",
      value: soil,
      icon: Leaf,
      type: "purple",
    },
  ];


  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <section className="fx-farm-card">

        {/* ===================================================
           HEADER
        =================================================== */}

        <div className="fx-farm-header">

          <div className="fx-farm-title-row">

            <div className="fx-farm-main-icon">
              <Sprout size={18} />
            </div>

            <div className="fx-farm-heading">

              <h2>
                Farm Overview
              </h2>

              <p>
                {farmerName}'s farm details
              </p>

            </div>

          </div>


          <div className="fx-farm-location">

            <MapPin size={11} />

            <span>
              {farmLocation}
            </span>

          </div>

        </div>


        {/* ===================================================
           FARM STATS
        =================================================== */}

        <div className="fx-farm-stats">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                className="fx-farm-stat"
                key={stat.id}
              >

                <div
                  className={`
                    fx-farm-stat-icon
                    fx-farm-icon-${stat.type}
                  `}
                >
                  <Icon size={15} />
                </div>

                <div className="fx-farm-stat-content">

                  <span className="fx-farm-stat-label">
                    {stat.label}
                  </span>

                  <strong
                    title={String(stat.value)}
                  >
                    {stat.value}
                  </strong>

                </div>

              </div>
            );
          })}

        </div>


        {/* ===================================================
           CROP STAGE
        =================================================== */}

        <div className="fx-farm-stage">

          <div className="fx-farm-stage-icon">
            <Sprout size={16} />
          </div>

          <div className="fx-farm-stage-content">

            <span>
              Current Crop Stage
            </span>

            <strong>
              {stage}
            </strong>

          </div>


          {cropStage?.progress !== undefined && (
            <div className="fx-farm-stage-progress">

              <strong>
                {cropStage.progress}%
              </strong>

              <div className="fx-farm-stage-progress-track">

                <div
                  className="fx-farm-stage-progress-fill"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        cropStage.progress
                      )
                    )}%`,
                  }}
                />

              </div>

            </div>
          )}

        </div>


        {/* ===================================================
           FARM HEALTH
        =================================================== */}

        <div
          className={`
            fx-farm-health
            fx-farm-health-${health.type}
          `}
        >

          <div className="fx-farm-health-icon">
            <HeartPulse size={15} />
          </div>

          <div className="fx-farm-health-content">

            <strong>
              {health.label}
            </strong>

            <span>
              {health.description}
            </span>

          </div>

        </div>


        {/* ===================================================
           FOOTER
        =================================================== */}

        <div className="fx-farm-footer">

          <div className="fx-farm-footer-info">

            <Droplets size={12} />

            <span>
              Soil moisture:{" "}
              <strong>
                {moisture}
              </strong>
            </span>

          </div>


          {onViewFarm && (
            <button
              type="button"
              className="fx-farm-footer-link"
              onClick={onViewFarm}
            >
              View Farm
              <ArrowRight size={11} />
            </button>
          )}

        </div>


        {/* ===================================================
           DECORATION
        =================================================== */}

        <div className="fx-farm-decoration" />

      </section>


      {/* =====================================================
         STYLES
      ===================================================== */}

      <style>{`

        /* ===================================================
           CARD
        =================================================== */

        .fx-farm-card {
          position: relative;

          width: 100%;

          padding: 15px;

          overflow: hidden;

          box-sizing: border-box;

          border: 1px solid #e3ebe5;

          border-radius: 16px;

          background: #ffffff;

          box-shadow:
            0 3px 12px
            rgba(15, 23, 42, 0.035);
        }


        /* ===================================================
           HEADER
        =================================================== */

        .fx-farm-header {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 10px;

          margin-bottom: 11px;
        }


        .fx-farm-title-row {
          min-width: 0;

          display: flex;

          align-items: center;

          gap: 8px;
        }


        .fx-farm-main-icon {
          width: 32px;

          height: 32px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 9px;

          color: #168747;

          background: #e9f8ed;
        }


        .fx-farm-heading {
          min-width: 0;
        }


        .fx-farm-heading h2 {
          margin: 0;

          color: #172033;

          font-size: 15px;

          line-height: 1.2;

          font-weight: 700;
        }


        .fx-farm-heading p {
          margin: 2px 0 0;

          color: #8b96a3;

          font-size: 8px;

          line-height: 1.2;
        }


        .fx-farm-location {
          max-width: 125px;

          display: flex;

          align-items: center;

          justify-content: flex-end;

          gap: 3px;

          overflow: hidden;

          color: #87929e;

          font-size: 7px;

          line-height: 1.2;

          text-align: right;

          white-space: nowrap;

          text-overflow: ellipsis;
        }


        /* ===================================================
           STATS GRID
        =================================================== */

        .fx-farm-stats {
          position: relative;

          z-index: 2;

          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 7px;

          margin-bottom: 9px;
        }


        /* ===================================================
           STAT
        =================================================== */

        .fx-farm-stat {
          min-width: 0;

          min-height: 48px;

          padding: 7px;

          display: flex;

          align-items: center;

          gap: 7px;

          box-sizing: border-box;

          border: 1px solid #edf2ee;

          border-radius: 9px;

          background: #f9fbfa;
        }


        .fx-farm-stat-icon {
          width: 29px;

          height: 29px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 8px;
        }


        .fx-farm-icon-green {
          color: #168747;

          background: #e8f8ec;
        }


        .fx-farm-icon-blue {
          color: #2875c9;

          background: #edf7ff;
        }


        .fx-farm-icon-orange {
          color: #e87516;

          background: #fff4e5;
        }


        .fx-farm-icon-purple {
          color: #7943c6;

          background: #f5edff;
        }


        .fx-farm-stat-content {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 2px;
        }


        .fx-farm-stat-label {
          color: #929daa;

          font-size: 7px;

          line-height: 1.1;

          font-weight: 500;
        }


        .fx-farm-stat-content strong {
          overflow: hidden;

          color: #334155;

          font-size: 9px;

          line-height: 1.2;

          font-weight: 700;

          white-space: nowrap;

          text-overflow: ellipsis;
        }


        /* ===================================================
           CROP STAGE
        =================================================== */

        .fx-farm-stage {
          position: relative;

          z-index: 2;

          min-height: 48px;

          padding: 8px;

          display: flex;

          align-items: center;

          gap: 7px;

          box-sizing: border-box;

          margin-bottom: 8px;

          border: 1px solid #e2f0e6;

          border-radius: 10px;

          background: #f3faf5;
        }


        .fx-farm-stage-icon {
          width: 29px;

          height: 29px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 8px;

          color: #168747;

          background: #e0f3e5;
        }


        .fx-farm-stage-content {
          min-width: 0;

          flex: 1;

          display: flex;

          flex-direction: column;

          gap: 2px;
        }


        .fx-farm-stage-content span {
          color: #7f8c85;

          font-size: 7px;

          line-height: 1.1;
        }


        .fx-farm-stage-content strong {
          overflow: hidden;

          color: #1d7540;

          font-size: 9px;

          line-height: 1.2;

          font-weight: 700;

          white-space: nowrap;

          text-overflow: ellipsis;
        }


        .fx-farm-stage-progress {
          width: 48px;

          flex-shrink: 0;

          display: flex;

          flex-direction: column;

          align-items: flex-end;

          gap: 3px;
        }


        .fx-farm-stage-progress strong {
          color: #168747;

          font-size: 7px;

          line-height: 1;
        }


        .fx-farm-stage-progress-track {
          width: 48px;

          height: 4px;

          overflow: hidden;

          border-radius: 10px;

          background: #dbece0;
        }


        .fx-farm-stage-progress-fill {
          height: 100%;

          border-radius: inherit;

          background: #34a853;

          transition: width 0.3s ease;
        }


        /* ===================================================
           FARM HEALTH
        =================================================== */

        .fx-farm-health {
          position: relative;

          z-index: 2;

          min-height: 42px;

          padding: 7px 8px;

          display: flex;

          align-items: center;

          gap: 7px;

          box-sizing: border-box;

          margin-bottom: 8px;

          border-radius: 9px;
        }


        .fx-farm-health-good {
          border: 1px solid #dcefe1;

          background: #f2faf4;

          color: #168747;
        }


        .fx-farm-health-neutral {
          border: 1px solid #e6ebef;

          background: #f7f9fa;

          color: #64748b;
        }


        .fx-farm-health-icon {
          width: 27px;

          height: 27px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 7px;

          background: rgba(255, 255, 255, 0.75);
        }


        .fx-farm-health-content {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 2px;
        }


        .fx-farm-health-content strong {
          overflow: hidden;

          color: currentColor;

          font-size: 8px;

          line-height: 1.15;

          font-weight: 700;

          white-space: nowrap;

          text-overflow: ellipsis;
        }


        .fx-farm-health-content span {
          overflow: hidden;

          color: #829087;

          font-size: 7px;

          line-height: 1.2;

          white-space: nowrap;

          text-overflow: ellipsis;
        }


        /* ===================================================
           FOOTER
        =================================================== */

        .fx-farm-footer {
          position: relative;

          z-index: 2;

          min-height: 27px;

          padding-top: 7px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 8px;

          border-top: 1px solid #edf2ee;
        }


        .fx-farm-footer-info {
          min-width: 0;

          display: flex;

          align-items: center;

          gap: 4px;

          color: #87929e;

          font-size: 7px;
        }


        .fx-farm-footer-info svg {
          flex-shrink: 0;

          color: #4a91d1;
        }


        .fx-farm-footer-info strong {
          color: #526174;

          font-weight: 700;
        }


        .fx-farm-footer-link {
          padding: 5px 7px;

          display: inline-flex;

          align-items: center;

          gap: 3px;

          flex-shrink: 0;

          border: 1px solid #dce8df;

          border-radius: 6px;

          background: #ffffff;

          color: #168747;

          font-family: inherit;

          font-size: 7px;

          font-weight: 600;

          cursor: pointer;

          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }


        .fx-farm-footer-link:hover {
          background: #f3faf5;

          transform: translateX(1px);
        }


        /* ===================================================
           DECORATION
        =================================================== */

        .fx-farm-decoration {
          position: absolute;

          z-index: 1;

          width: 115px;

          height: 115px;

          right: -65px;

          bottom: -62px;

          pointer-events: none;

          border-radius: 50%;

          background: #eef9f1;

          opacity: 0.65;
        }


        /* ===================================================
           LAPTOP
        =================================================== */

        @media (
          min-width: 1024px
        ) and (
          max-width: 1199px
        ) {

          .fx-farm-card {
            padding: 13px;
          }


          .fx-farm-header {
            margin-bottom: 9px;
          }


          .fx-farm-heading h2 {
            font-size: 14px;
          }


          .fx-farm-stat {
            min-height: 45px;

            padding: 6px;
          }


          .fx-farm-stat-icon {
            width: 27px;

            height: 27px;
          }


          .fx-farm-stage {
            min-height: 45px;

            padding: 7px;
          }


          .fx-farm-health {
            min-height: 40px;
          }

        }


        /* ===================================================
           TABLET
        =================================================== */

        @media (
          min-width: 768px
        ) and (
          max-width: 1023px
        ) {

          .fx-farm-card {
            padding: 13px;
          }


          .fx-farm-location {
            max-width: 180px;
          }

        }


        /* ===================================================
           MOBILE
        =================================================== */

        @media (max-width: 767px) {

          .fx-farm-card {
            padding: 12px;

            border-radius: 14px;
          }


          .fx-farm-header {
            margin-bottom: 9px;
          }


          .fx-farm-heading h2 {
            font-size: 14px;
          }


          .fx-farm-location {
            max-width: 120px;

            font-size: 6.5px;
          }


          .fx-farm-stat {
            min-height: 45px;

            padding: 6px;
          }


          .fx-farm-stat-icon {
            width: 27px;

            height: 27px;
          }


          .fx-farm-stat-label {
            font-size: 6.5px;
          }


          .fx-farm-stat-content strong {
            font-size: 8px;
          }


          .fx-farm-stage {
            min-height: 44px;
          }


          .fx-farm-health {
            min-height: 40px;
          }

        }


        /* ===================================================
           SMALL MOBILE
        =================================================== */

        @media (max-width: 479px) {

          .fx-farm-card {
            padding: 10px;
          }


          .fx-farm-heading h2 {
            font-size: 13px;
          }


          .fx-farm-main-icon {
            width: 29px;

            height: 29px;
          }


          .fx-farm-stats {
            gap: 6px;
          }


          .fx-farm-stat {
            gap: 5px;

            min-height: 43px;

            padding: 5px;
          }


          .fx-farm-stat-icon {
            width: 25px;

            height: 25px;
          }


          .fx-farm-stat-icon svg {
            width: 13px;

            height: 13px;
          }


          .fx-farm-stat-label {
            font-size: 6px;
          }


          .fx-farm-stat-content strong {
            font-size: 7.5px;
          }


          .fx-farm-stage-content span {
            font-size: 6px;
          }


          .fx-farm-stage-content strong {
            font-size: 8px;
          }


          .fx-farm-health-content strong {
            font-size: 7.5px;
          }


          .fx-farm-health-content span {
            font-size: 6.5px;
          }

        }

      `}</style>
    </>
  );
}