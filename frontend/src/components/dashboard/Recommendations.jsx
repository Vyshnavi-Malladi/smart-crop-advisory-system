// src/components/dashboard/Recommendations.jsx

import React from "react";
import {
  ArrowRight,
  BrainCircuit,
  Droplets,
  FlaskConical,
  Leaf,
  ShieldCheck,
  Sprout,
  Sun,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Recommendations({
  recommendations = [],
  loading = false,
  onRefresh,
}) {
  // =========================================================
  // ICON
  // =========================================================

  const getIcon = (type) => {
    switch (type) {
      case "irrigation":
        return Droplets;

      case "fertilizer":
        return FlaskConical;

      case "crop":
        return Sprout;

      case "disease":
        return ShieldCheck;

      case "weather":
        return Sun;

      case "soil":
        return Leaf;

      default:
        return BrainCircuit;
    }
  };

  // =========================================================
  // COLOR THEME
  // =========================================================

  const getTheme = (type) => {
    switch (type) {
      case "irrigation":
        return "blue";

      case "fertilizer":
        return "purple";

      case "crop":
        return "green";

      case "disease":
        return "red";

      case "weather":
        return "orange";

      case "soil":
        return "teal";

      default:
        return "green";
    }
  };

  // =========================================================
  // PRIORITY
  // =========================================================

  const getPriorityClass = (priority) => {
    if (priority === "high") {
      return "fx-rec-priority-high";
    }

    if (priority === "medium") {
      return "fx-rec-priority-medium";
    }

    return "fx-rec-priority-low";
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <>
        <section className="fx-rec-card">
          <div className="fx-rec-header">
            <div>
              <div className="fx-rec-title-skeleton" />
              <div className="fx-rec-subtitle-skeleton" />
            </div>
          </div>

          <div className="fx-rec-list">
            {[1, 2, 3].map((item) => (
              <div
                className="fx-rec-loading"
                key={item}
              >
                <div className="fx-rec-loading-icon" />

                <div className="fx-rec-loading-content">
                  <div className="fx-rec-loading-line large" />
                  <div className="fx-rec-loading-line medium" />
                  <div className="fx-rec-loading-line small" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <style>{`
          .fx-rec-card {
            width: 100%;
            padding: 20px;
            background: #ffffff;
            border: 1px solid #e7eee9;
            border-radius: 18px;
            box-shadow: 0 3px 15px rgba(15,23,42,0.035);
          }

          .fx-rec-title-skeleton {
            width: 145px;
            height: 17px;
            background: #eef2f0;
            border-radius: 6px;
            margin-bottom: 7px;
          }

          .fx-rec-subtitle-skeleton {
            width: 220px;
            height: 9px;
            background: #f1f5f2;
            border-radius: 5px;
          }

          .fx-rec-list {
            margin-top: 20px;
          }

          .fx-rec-loading {
            display: flex;
            gap: 12px;
            padding: 14px 0;
            border-top: 1px solid #f1f5f2;
          }

          .fx-rec-loading-icon,
          .fx-rec-loading-line {
            background:
              linear-gradient(
                90deg,
                #eef2f0,
                #f8faf8,
                #eef2f0
              );
            background-size: 200% 100%;
            animation: fx-rec-shimmer 1.5s infinite;
          }

          .fx-rec-loading-icon {
            width: 42px;
            height: 42px;
            flex-shrink: 0;
            border-radius: 12px;
          }

          .fx-rec-loading-content {
            flex: 1;
          }

          .fx-rec-loading-line {
            height: 9px;
            border-radius: 5px;
            margin-bottom: 7px;
          }

          .fx-rec-loading-line.large {
            width: 65%;
          }

          .fx-rec-loading-line.medium {
            width: 85%;
          }

          .fx-rec-loading-line.small {
            width: 35%;
          }

          @keyframes fx-rec-shimmer {
            0% {
              background-position: 200% 0;
            }

            100% {
              background-position: -200% 0;
            }
          }
        `}</style>
      </>
    );
  }

  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (!recommendations || recommendations.length === 0) {
    return (
      <>
        <section className="fx-rec-card">
          <div className="fx-rec-header">
            <div>
              <div className="fx-rec-title-row">
                <h2 className="fx-rec-title">
                  Recommended for You
                </h2>

                <span className="fx-rec-ai-badge">
                  <BrainCircuit size={12} />
                  AI
                </span>
              </div>

              <p className="fx-rec-subtitle">
                Smart suggestions based on your farm conditions.
              </p>
            </div>

            {onRefresh && (
              <button
                type="button"
                className="fx-rec-refresh"
                onClick={onRefresh}
                aria-label="Refresh recommendations"
              >
                <RefreshCw size={15} />
              </button>
            )}
          </div>

          <div className="fx-rec-empty">
            <div className="fx-rec-empty-icon">
              <BrainCircuit size={25} />
            </div>

            <h3>
              No recommendations yet
            </h3>

            <p>
              Add your crop, soil and farm information
              to receive personalized farming suggestions.
            </p>

            <Link
              to="/crop-recommend"
              className="fx-rec-empty-button"
            >
              Get Crop Advice
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <style>{`

          .fx-rec-card {
            width: 100%;
            padding: 20px;
            background: #ffffff;
            border: 1px solid #e7eee9;
            border-radius: 18px;
            box-shadow: 0 3px 15px rgba(15,23,42,0.035);
          }

          .fx-rec-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
          }

          .fx-rec-title-row {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .fx-rec-title {
            margin: 0;
            color: #172033;
            font-size: 17px;
            font-weight: 700;
          }

          .fx-rec-ai-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 7px;
            border-radius: 999px;
            color: #15803d;
            background: #ecfdf5;
            font-size: 8px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .fx-rec-subtitle {
            margin: 5px 0 0;
            color: #94a3b8;
            font-size: 9px;
          }

          .fx-rec-refresh {
            width: 31px;
            height: 31px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            color: #64748b;
            background: #f8faf9;
            border: 1px solid #edf2ee;
            border-radius: 9px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .fx-rec-refresh:hover {
            color: #15803d;
            background: #f0fdf4;
            transform: rotate(15deg);
          }

          .fx-rec-empty {
            min-height: 230px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 25px 15px;
            text-align: center;
          }

          .fx-rec-empty-icon {
            width: 54px;
            height: 54px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
            color: #15803d;
            background: #f0fdf4;
            border-radius: 15px;
          }

          .fx-rec-empty h3 {
            margin: 0 0 6px;
            color: #334155;
            font-size: 13px;
            font-weight: 600;
          }

          .fx-rec-empty p {
            max-width: 300px;
            margin: 0 0 15px;
            color: #94a3b8;
            font-size: 9px;
            line-height: 1.6;
          }

          .fx-rec-empty-button {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 9px 14px;
            color: #ffffff;
            background: #16a34a;
            border-radius: 9px;
            text-decoration: none;
            font-size: 9px;
            font-weight: 600;
          }

          @media (max-width: 479px) {

            .fx-rec-card {
              padding: 15px;
              border-radius: 15px;
            }

            .fx-rec-title {
              font-size: 15px;
            }

            .fx-rec-subtitle {
              font-size: 8px;
            }

          }

        `}</style>
      </>
    );
  }

  // =========================================================
  // MAIN COMPONENT
  // =========================================================

  return (
    <>
      <section className="fx-rec-card">

        {/* HEADER */}
        <div className="fx-rec-header">

          <div>

            <div className="fx-rec-title-row">

              <h2 className="fx-rec-title">
                Recommended for You
              </h2>

              <span className="fx-rec-ai-badge">
                <BrainCircuit size={12} />
                AI Powered
              </span>

            </div>

            <p className="fx-rec-subtitle">
              Smart suggestions based on your soil & weather conditions.
            </p>

          </div>

          {onRefresh && (
            <button
              type="button"
              className="fx-rec-refresh"
              onClick={onRefresh}
              aria-label="Refresh recommendations"
            >
              <RefreshCw size={15} />
            </button>
          )}

        </div>


        {/* RECOMMENDATION LIST */}

        <div className="fx-rec-list">

          {recommendations
            .slice(0, 4)
            .map((recommendation, index) => {

              const Icon =
                getIcon(recommendation.type);

              const theme =
                getTheme(recommendation.type);

              return (
                <div
                  className="fx-rec-item"
                  key={
                    recommendation.id ||
                    `${recommendation.type}-${index}`
                  }
                >

                  {/* ICON */}

                  <div
                    className={`
                      fx-rec-icon
                      fx-rec-${theme}
                    `}
                  >
                    <Icon size={19} />
                  </div>


                  {/* CONTENT */}

                  <div className="fx-rec-content">

                    <div className="fx-rec-item-heading">

                      <h3>
                        {recommendation.title ||
                          "Farm Recommendation"}
                      </h3>

                      {recommendation.priority && (
                        <span
                          className={`
                            fx-rec-priority
                            ${getPriorityClass(
                              recommendation.priority
                            )}
                          `}
                        >
                          {recommendation.priority}
                        </span>
                      )}

                    </div>


                    <p className="fx-rec-description">
                      {recommendation.description ||
                        "A recommendation is available for your farm."}
                    </p>


                    {/* META */}

                    {recommendation.meta && (
                      <div className="fx-rec-meta">

                        <CheckCircle2 size={12} />

                        <span>
                          {recommendation.meta}
                        </span>

                      </div>
                    )}


                    {/* ACTION */}

                    {recommendation.link && (
                      <Link
                        to={recommendation.link}
                        className="fx-rec-action"
                      >
                        View Details
                        <ArrowRight size={13} />
                      </Link>
                    )}

                  </div>

                </div>
              );
            })}

        </div>

      </section>


      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        /* =====================================================
           CARD
        ===================================================== */

        .fx-rec-card {

          width: 100%;

          padding: 20px;

          background: #ffffff;

          border: 1px solid #e7eee9;

          border-radius: 18px;

          box-shadow:
            0 3px 15px
            rgba(15,23,42,0.035);

          box-sizing: border-box;
        }


        /* =====================================================
           HEADER
        ===================================================== */

        .fx-rec-header {

          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          gap: 12px;

          margin-bottom: 12px;
        }


        .fx-rec-title-row {

          display: flex;

          align-items: center;

          flex-wrap: wrap;

          gap: 8px;
        }


        .fx-rec-title {

          margin: 0;

          color: #172033;

          font-size: 17px;

          line-height: 1.3;

          font-weight: 700;
        }


        .fx-rec-ai-badge {

          display: inline-flex;

          align-items: center;

          gap: 4px;

          padding: 4px 7px;

          color: #15803d;

          background: #ecfdf5;

          border: 1px solid #d1fae5;

          border-radius: 999px;

          font-size: 8px;

          font-weight: 700;

          text-transform: uppercase;

          letter-spacing: 0.04em;
        }


        .fx-rec-subtitle {

          margin: 5px 0 0;

          color: #94a3b8;

          font-size: 9px;

          line-height: 1.5;
        }


        /* =====================================================
           REFRESH BUTTON
        ===================================================== */

        .fx-rec-refresh {

          width: 31px;

          height: 31px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          color: #64748b;

          background: #f8faf9;

          border: 1px solid #edf2ee;

          border-radius: 9px;

          cursor: pointer;

          transition:
            color 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease;
        }


        .fx-rec-refresh:hover {

          color: #15803d;

          background: #f0fdf4;

          transform: rotate(15deg);
        }


        /* =====================================================
           LIST
        ===================================================== */

        .fx-rec-list {

          display: flex;

          flex-direction: column;

          gap: 8px;
        }


        /* =====================================================
           ITEM
        ===================================================== */

        .fx-rec-item {

          display: flex;

          align-items: flex-start;

          gap: 11px;

          min-width: 0;

          padding: 12px;

          background: #fbfdfb;

          border: 1px solid #edf3ee;

          border-radius: 13px;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
        }


        .fx-rec-item:hover {

          transform: translateY(-2px);

          border-color: #d8eadb;

          box-shadow:
            0 8px 22px
            rgba(22,163,74,0.07);
        }


        /* =====================================================
           ICON
        ===================================================== */

        .fx-rec-icon {

          width: 38px;

          height: 38px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          border-radius: 10px;
        }


        .fx-rec-green {

          color: #15803d;

          background: #dcfce7;
        }


        .fx-rec-blue {

          color: #0369a1;

          background: #e0f2fe;
        }


        .fx-rec-purple {

          color: #7e22ce;

          background: #f3e8ff;
        }


        .fx-rec-red {

          color: #dc2626;

          background: #fee2e2;
        }


        .fx-rec-orange {

          color: #c2410c;

          background: #ffedd5;
        }


        .fx-rec-teal {

          color: #0f766e;

          background: #ccfbf1;
        }


        /* =====================================================
           CONTENT
        ===================================================== */

        .fx-rec-content {

          flex: 1;

          min-width: 0;
        }


        .fx-rec-item-heading {

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 8px;
        }


        .fx-rec-item-heading h3 {

          min-width: 0;

          margin: 0;

          overflow: hidden;

          color: #334155;

          font-size: 11px;

          line-height: 1.4;

          font-weight: 700;

          text-overflow: ellipsis;

          white-space: nowrap;
        }


        /* =====================================================
           PRIORITY
        ===================================================== */

        .fx-rec-priority {

          flex-shrink: 0;

          padding: 3px 6px;

          border-radius: 999px;

          font-size: 7px;

          font-weight: 700;

          text-transform: uppercase;

          letter-spacing: 0.03em;
        }


        .fx-rec-priority-high {

          color: #b91c1c;

          background: #fee2e2;
        }


        .fx-rec-priority-medium {

          color: #a16207;

          background: #fef3c7;
        }


        .fx-rec-priority-low {

          color: #15803d;

          background: #dcfce7;
        }


        /* =====================================================
           DESCRIPTION
        ===================================================== */

        .fx-rec-description {

          margin: 4px 0 0;

          color: #64748b;

          font-size: 9px;

          line-height: 1.5;
        }


        /* =====================================================
           META
        ===================================================== */

        .fx-rec-meta {

          display: flex;

          align-items: center;

          gap: 4px;

          margin-top: 6px;

          color: #16a34a;

          font-size: 8px;

          font-weight: 500;
        }


        /* =====================================================
           ACTION
        ===================================================== */

        .fx-rec-action {

          display: inline-flex;

          align-items: center;

          gap: 4px;

          margin-top: 7px;

          color: #15803d;

          font-size: 8px;

          font-weight: 700;

          text-decoration: none;

          transition: gap 0.2s ease;
        }


        .fx-rec-action:hover {

          gap: 7px;
        }


        /* =====================================================
           LARGE DESKTOP
        ===================================================== */

        @media (min-width: 1920px) {

          .fx-rec-card {

            padding: 22px;
          }


          .fx-rec-title {

            font-size: 19px;
          }


          .fx-rec-subtitle {

            font-size: 10px;
          }


          .fx-rec-item {

            padding: 14px;
          }


          .fx-rec-icon {

            width: 42px;
            height: 42px;
          }


          .fx-rec-item-heading h3 {

            font-size: 12px;
          }


          .fx-rec-description {

            font-size: 10px;
          }

        }


        /* =====================================================
           DESKTOP
        ===================================================== */

        @media (
          min-width: 1440px
        ) and (
          max-width: 1919px
        ) {

          .fx-rec-card {

            min-height: 335px;
          }

        }


        /* =====================================================
           LAPTOP
        ===================================================== */

        @media (
          min-width: 1024px
        ) and (
          max-width: 1439px
        ) {

          .fx-rec-card {

            padding: 16px;
          }


          .fx-rec-title {

            font-size: 16px;
          }


          .fx-rec-item {

            padding: 10px;

            gap: 9px;
          }


          .fx-rec-icon {

            width: 34px;
            height: 34px;
          }


          .fx-rec-item-heading h3 {

            font-size: 10px;
          }


          .fx-rec-description {

            font-size: 8px;
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

          .fx-rec-card {

            padding: 18px;
          }


          .fx-rec-title {

            font-size: 17px;
          }


          .fx-rec-item {

            padding: 12px;
          }


          .fx-rec-item-heading h3 {

            font-size: 11px;
          }


          .fx-rec-description {

            font-size: 9px;
          }

        }


        /* =====================================================
           LARGE MOBILE
        ===================================================== */

        @media (
          min-width: 480px
        ) and (
          max-width: 767px
        ) {

          .fx-rec-card {

            padding: 15px;

            border-radius: 16px;
          }


          .fx-rec-title {

            font-size: 15px;
          }


          .fx-rec-subtitle {

            font-size: 8px;
          }


          .fx-rec-item {

            padding: 10px;

            gap: 9px;
          }


          .fx-rec-icon {

            width: 34px;
            height: 34px;
          }


          .fx-rec-item-heading h3 {

            font-size: 10px;
          }


          .fx-rec-description {

            font-size: 8px;
          }


          .fx-rec-priority {

            font-size: 6px;
          }

        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 479px) {

          .fx-rec-card {

            padding: 14px;

            border-radius: 15px;
          }


          .fx-rec-title {

            font-size: 15px;
          }


          .fx-rec-subtitle {

            font-size: 8px;

            max-width: 220px;
          }


          .fx-rec-ai-badge {

            padding: 3px 5px;

            font-size: 6px;
          }


          .fx-rec-refresh {

            width: 29px;

            height: 29px;
          }


          .fx-rec-item {

            padding: 10px;

            gap: 8px;

            border-radius: 11px;
          }


          .fx-rec-icon {

            width: 32px;

            height: 32px;

            border-radius: 8px;
          }


          .fx-rec-icon svg {

            width: 16px;

            height: 16px;
          }


          .fx-rec-item-heading {

            display: block;
          }


          .fx-rec-item-heading h3 {

            white-space: normal;

            font-size: 10px;

            line-height: 1.4;
          }


          .fx-rec-priority {

            display: inline-block;

            margin-top: 4px;

            font-size: 6px;
          }


          .fx-rec-description {

            font-size: 8px;

            line-height: 1.5;
          }


          .fx-rec-meta {

            font-size: 7px;
          }


          .fx-rec-action {

            font-size: 8px;
          }

        }


        /* =====================================================
           EXTRA SMALL MOBILE
        ===================================================== */

        @media (max-width: 359px) {

          .fx-rec-card {

            padding: 12px;
          }


          .fx-rec-title {

            font-size: 14px;
          }


          .fx-rec-subtitle {

            font-size: 7px;
          }


          .fx-rec-item {

            padding: 8px;
          }


          .fx-rec-icon {

            width: 29px;

            height: 29px;
          }


          .fx-rec-item-heading h3 {

            font-size: 9px;
          }


          .fx-rec-description {

            font-size: 7px;
          }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .fx-rec-item,
          .fx-rec-refresh,
          .fx-rec-action {

            transition: none !important;
          }

        }

      `}</style>
    </>
  );
}