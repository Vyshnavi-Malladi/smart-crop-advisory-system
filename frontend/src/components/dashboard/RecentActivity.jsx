// src/components/dashboard/RecentActivity.jsx

import React from "react";
import {
  CloudSun,
  Sprout,
  FlaskConical,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  Bell,
  Clock3,
  ArrowRight,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function RecentActivity({
  activities = [],
  loading = false,
}) {

  // =========================================================
  // ICON MAPPING
  // =========================================================

  const getActivityIcon = (type) => {

    switch (type) {

      case "weather":
        return CloudSun;

      case "crop":
        return Sprout;

      case "soil":
        return FlaskConical;

      case "store":
        return ShoppingBag;

      case "yield":
        return TrendingUp;

      case "disease":
        return ShieldCheck;

      case "alert":
        return Bell;

      default:
        return Activity;
    }
  };


  // =========================================================
  // COLOR MAPPING
  // =========================================================

  const getActivityTheme = (type) => {

    switch (type) {

      case "weather":
        return "blue";

      case "crop":
        return "green";

      case "soil":
        return "purple";

      case "store":
        return "orange";

      case "yield":
        return "teal";

      case "disease":
        return "red";

      case "alert":
        return "yellow";

      default:
        return "green";
    }
  };


  // =========================================================
  // TIME FORMATTER
  // =========================================================

  const formatTime = (time) => {

    if (!time) {
      return "Recently";
    }

    try {

      const date = new Date(time);

      if (Number.isNaN(date.getTime())) {
        return time;
      }

      const now = new Date();

      const diff =
        Math.floor(
          (now.getTime() - date.getTime()) /
          1000
        );

      if (diff < 60) {
        return "Just now";
      }

      if (diff < 3600) {

        const minutes =
          Math.floor(diff / 60);

        return `${minutes} min ago`;
      }

      if (diff < 86400) {

        const hours =
          Math.floor(diff / 3600);

        return `${hours} ${
          hours === 1 ? "hour" : "hours"
        } ago`;
      }

      if (diff < 604800) {

        const days =
          Math.floor(diff / 86400);

        return `${days} ${
          days === 1 ? "day" : "days"
        } ago`;
      }

      return date.toLocaleDateString(
        undefined,
        {
          day: "numeric",
          month: "short",
        }
      );

    } catch {
      return "Recently";
    }
  };


  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {

    return (
      <>
        <section className="fx-activity-card">

          <div className="fx-activity-header">

            <div>

              <div className="fx-activity-title-skeleton" />

              <div className="fx-activity-subtitle-skeleton" />

            </div>

          </div>


          <div className="fx-activity-list">

            {[1, 2, 3, 4].map((item) => (

              <div
                className="fx-activity-loading-row"
                key={item}
              >

                <div className="fx-activity-loading-icon" />

                <div className="fx-activity-loading-content">

                  <div className="fx-activity-line large" />

                  <div className="fx-activity-line small" />

                </div>

              </div>

            ))}

          </div>

        </section>


        <style>{`

          .fx-activity-card {

            width: 100%;

            padding: 18px;

            background: #ffffff;

            border: 1px solid #e7eee9;

            border-radius: 18px;

            box-shadow:
              0 3px 15px
              rgba(15,23,42,0.035);
          }


          .fx-activity-title-skeleton {

            width: 125px;
            height: 16px;

            background: #eef2f0;

            border-radius: 6px;

            margin-bottom: 7px;
          }


          .fx-activity-subtitle-skeleton {

            width: 190px;
            height: 9px;

            background: #f1f5f2;

            border-radius: 5px;
          }


          .fx-activity-list {

            margin-top: 20px;
          }


          .fx-activity-loading-row {

            display: flex;

            align-items: center;

            gap: 12px;

            padding: 13px 0;

            border-top:
              1px solid #f1f5f2;
          }


          .fx-activity-loading-icon {

            width: 38px;
            height: 38px;

            flex-shrink: 0;

            border-radius: 11px;

            background:
              linear-gradient(
                90deg,
                #eef2f0,
                #f8faf8,
                #eef2f0
              );

            background-size: 200% 100%;

            animation:
              fx-activity-loading 1.5s infinite;
          }


          .fx-activity-loading-content {

            flex: 1;
          }


          .fx-activity-line {

            background:
              linear-gradient(
                90deg,
                #eef2f0,
                #f8faf8,
                #eef2f0
              );

            background-size: 200% 100%;

            animation:
              fx-activity-loading 1.5s infinite;

            border-radius: 5px;
          }


          .fx-activity-line.large {

            width: 65%;

            height: 11px;

            margin-bottom: 7px;
          }


          .fx-activity-line.small {

            width: 35%;

            height: 7px;
          }


          @keyframes fx-activity-loading {

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

  if (!activities || activities.length === 0) {

    return (
      <>
        <section
          className="fx-activity-card"
          aria-labelledby="recent-activity-title"
        >

          <div className="fx-activity-header">

            <div>

              <div className="fx-activity-title-row">

                <h2
                  id="recent-activity-title"
                  className="fx-activity-title"
                >
                  Recent Activity
                </h2>

                <span className="fx-activity-title-icon">
                  <Activity size={13} />
                </span>

              </div>

              <p className="fx-activity-subtitle">
                Your latest farm updates will appear here.
              </p>

            </div>

          </div>


          <div className="fx-activity-empty">

            <div className="fx-activity-empty-icon">
              <Clock3 size={24} />
            </div>

            <h3>
              No recent activity
            </h3>

            <p>
              Your farm activities, crop updates,
              weather changes and other actions
              will appear here.
            </p>

          </div>

        </section>


        <style>{`

          .fx-activity-card {

            width: 100%;

            padding: 18px;

            background: #ffffff;

            border: 1px solid #e7eee9;

            border-radius: 18px;

            box-shadow:
              0 3px 15px
              rgba(15,23,42,0.035);
          }


          .fx-activity-header {

            display: flex;

            align-items: flex-start;

            justify-content: space-between;

            gap: 10px;
          }


          .fx-activity-title-row {

            display: flex;

            align-items: center;

            gap: 7px;
          }


          .fx-activity-title {

            margin: 0;

            color: #172033;

            font-size: 16px;

            line-height: 1.3;

            font-weight: 700;
          }


          .fx-activity-title-icon {

            width: 22px;
            height: 22px;

            display: flex;

            align-items: center;
            justify-content: center;

            color: #15803d;

            background: #f0fdf4;

            border-radius: 7px;
          }


          .fx-activity-subtitle {

            margin: 4px 0 0;

            color: #94a3b8;

            font-size: 9px;
          }


          .fx-activity-empty {

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: center;

            min-height: 205px;

            padding: 20px;

            text-align: center;
          }


          .fx-activity-empty-icon {

            width: 50px;
            height: 50px;

            display: flex;

            align-items: center;
            justify-content: center;

            margin-bottom: 12px;

            color: #16a34a;

            background: #f0fdf4;

            border-radius: 14px;
          }


          .fx-activity-empty h3 {

            margin: 0 0 5px;

            color: #334155;

            font-size: 13px;

            font-weight: 600;
          }


          .fx-activity-empty p {

            max-width: 300px;

            margin: 0;

            color: #94a3b8;

            font-size: 9px;

            line-height: 1.6;
          }

        `}</style>
      </>
    );
  }


  // =========================================================
  // MAIN ACTIVITY LIST
  // =========================================================

  return (
    <>
      <section
        className="fx-activity-card"
        aria-labelledby="recent-activity-title"
      >

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="fx-activity-header">

          <div>

            <div className="fx-activity-title-row">

              <h2
                id="recent-activity-title"
                className="fx-activity-title"
              >
                Recent Activity
              </h2>

              <span className="fx-activity-title-icon">
                <Activity size={13} />
              </span>

            </div>

            <p className="fx-activity-subtitle">
              Latest updates from your farm.
            </p>

          </div>


          <Link
            to="/notifications"
            className="fx-activity-view-all"
          >
            View All
            <ArrowRight size={13} />
          </Link>

        </div>


        {/* ===================================================
            ACTIVITY LIST
        =================================================== */}

        <div className="fx-activity-list">

          {activities
            .slice(0, 6)
            .map((activity, index) => {

              const Icon =
                getActivityIcon(activity.type);

              const theme =
                getActivityTheme(activity.type);

              return (
                <div
                  className="fx-activity-item"
                  key={
                    activity.id ||
                    `${activity.type}-${index}`
                  }
                >

                  {/* =========================================
                      TIMELINE
                  ========================================= */}

                  {index <
                    Math.min(
                      activities.length,
                      6
                    ) - 1 && (
                    <div className="fx-activity-line" />
                  )}


                  {/* =========================================
                      ICON
                  ========================================= */}

                  <div
                    className={`
                      fx-activity-icon
                      fx-activity-${theme}
                    `}
                  >
                    <Icon size={17} />
                  </div>


                  {/* =========================================
                      CONTENT
                  ========================================= */}

                  <div className="fx-activity-content">

                    <div className="fx-activity-item-top">

                      <h3 className="fx-activity-item-title">
                        {activity.title ||
                          "Farm activity"}
                      </h3>

                      <time className="fx-activity-time">
                        {formatTime(
                          activity.time ||
                          activity.createdAt
                        )}
                      </time>

                    </div>


                    {activity.description && (
                      <p className="fx-activity-description">
                        {activity.description}
                      </p>
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

        .fx-activity-card {

          width: 100%;

          padding: 18px;

          background: #ffffff;

          border: 1px solid #e7eee9;

          border-radius: 18px;

          box-shadow:
            0 3px 15px
            rgba(15,23,42,0.035);
        }


        /* =====================================================
           HEADER
        ===================================================== */

        .fx-activity-header {

          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          gap: 12px;

          margin-bottom: 8px;
        }


        .fx-activity-title-row {

          display: flex;

          align-items: center;

          gap: 7px;
        }


        .fx-activity-title {

          margin: 0;

          color: #172033;

          font-size: 16px;

          line-height: 1.3;

          font-weight: 700;
        }


        .fx-activity-title-icon {

          width: 22px;
          height: 22px;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #15803d;

          background: #f0fdf4;

          border-radius: 7px;
        }


        .fx-activity-subtitle {

          margin: 4px 0 0;

          color: #94a3b8;

          font-size: 9px;
        }


        /* =====================================================
           VIEW ALL
        ===================================================== */

        .fx-activity-view-all {

          display: flex;

          align-items: center;

          gap: 4px;

          flex-shrink: 0;

          padding-top: 2px;

          color: #15803d;

          font-size: 9px;

          font-weight: 600;

          text-decoration: none;

          transition:
            gap 0.2s ease;
        }


        .fx-activity-view-all:hover {

          gap: 7px;
        }


        /* =====================================================
           LIST
        ===================================================== */

        .fx-activity-list {

          margin-top: 8px;
        }


        /* =====================================================
           ITEM
        ===================================================== */

        .fx-activity-item {

          position: relative;

          display: flex;

          align-items: flex-start;

          gap: 11px;

          min-width: 0;

          padding: 12px 0;
        }


        .fx-activity-item:first-child {

          padding-top: 11px;
        }


        .fx-activity-item:last-child {

          padding-bottom: 3px;
        }


        /* =====================================================
           TIMELINE
        ===================================================== */

        .fx-activity-line {

          position: absolute;

          top: 42px;
          bottom: -2px;

          left: 18px;

          width: 1px;

          background:
            #e5eee7;
        }


        /* =====================================================
           ICON
        ===================================================== */

        .fx-activity-icon {

          position: relative;

          z-index: 2;

          width: 36px;
          height: 36px;

          display: flex;

          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 10px;
        }


        .fx-activity-green {

          color: #15803d;

          background: #dcfce7;
        }


        .fx-activity-blue {

          color: #0369a1;

          background: #e0f2fe;
        }


        .fx-activity-purple {

          color: #7e22ce;

          background: #f3e8ff;
        }


        .fx-activity-orange {

          color: #c2410c;

          background: #ffedd5;
        }


        .fx-activity-teal {

          color: #0f766e;

          background: #ccfbf1;
        }


        .fx-activity-red {

          color: #dc2626;

          background: #fee2e2;
        }


        .fx-activity-yellow {

          color: #a16207;

          background: #fef3c7;
        }


        /* =====================================================
           CONTENT
        ===================================================== */

        .fx-activity-content {

          min-width: 0;

          flex: 1;

          padding-top: 1px;
        }


        .fx-activity-item-top {

          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          gap: 8px;
        }


        .fx-activity-item-title {

          min-width: 0;

          margin: 0;

          overflow: hidden;

          color: #334155;

          font-size: 11px;

          line-height: 1.4;

          font-weight: 600;

          text-overflow: ellipsis;

          white-space: nowrap;
        }


        .fx-activity-time {

          flex-shrink: 0;

          color: #94a3b8;

          font-size: 8px;

          white-space: nowrap;
        }


        .fx-activity-description {

          max-width: 95%;

          margin: 3px 0 0;

          overflow: hidden;

          color: #94a3b8;

          font-size: 9px;

          line-height: 1.45;

          text-overflow: ellipsis;

          white-space: nowrap;
        }


        /* =====================================================
           LARGE DESKTOP
        ===================================================== */

        @media (min-width: 1920px) {

          .fx-activity-card {

            padding: 20px;
          }


          .fx-activity-title {

            font-size: 18px;
          }


          .fx-activity-subtitle {

            font-size: 10px;
          }


          .fx-activity-item-title {

            font-size: 12px;
          }


          .fx-activity-description {

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

          .fx-activity-card {

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

          .fx-activity-card {

            padding: 15px;
          }


          .fx-activity-item {

            gap: 9px;

            padding: 10px 0;
          }


          .fx-activity-icon {

            width: 33px;
            height: 33px;
          }


          .fx-activity-line {

            left: 16px;

            top: 42px;
          }


          .fx-activity-item-title {

            font-size: 10px;
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

          .fx-activity-card {

            padding: 17px;
          }


          .fx-activity-title {

            font-size: 17px;
          }


          .fx-activity-item-title {

            font-size: 11px;
          }


          .fx-activity-description {

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

          .fx-activity-card {

            padding: 15px;

            border-radius: 16px;
          }


          .fx-activity-title {

            font-size: 15px;
          }


          .fx-activity-view-all {

            font-size: 8px;
          }


          .fx-activity-icon {

            width: 34px;
            height: 34px;
          }


          .fx-activity-item {

            gap: 9px;

            padding: 10px 0;
          }


          .fx-activity-item-title {

            font-size: 10px;
          }


          .fx-activity-time {

            font-size: 7px;
          }


          .fx-activity-description {

            font-size: 8px;
          }


          .fx-activity-line {

            left: 17px;

            top: 40px;
          }

        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 479px) {

          .fx-activity-card {

            padding: 14px;

            border-radius: 15px;
          }


          .fx-activity-header {

            margin-bottom: 6px;
          }


          .fx-activity-title {

            font-size: 15px;
          }


          .fx-activity-subtitle {

            font-size: 8px;
          }


          .fx-activity-view-all {

            width: 28px;
            height: 28px;

            align-items: center;
            justify-content: center;

            padding: 0;

            background: #f0fdf4;

            border-radius: 8px;
          }


          .fx-activity-view-all {

            font-size: 0;
          }


          .fx-activity-item {

            gap: 9px;

            padding: 10px 0;
          }


          .fx-activity-icon {

            width: 33px;
            height: 33px;

            border-radius: 9px;
          }


          .fx-activity-icon svg {

            width: 15px;
            height: 15px;
          }


          .fx-activity-item-top {

            display: block;
          }


          .fx-activity-item-title {

            display: block;

            font-size: 10px;

            white-space: normal;
          }


          .fx-activity-time {

            display: block;

            margin-top: 3px;

            font-size: 7px;
          }


          .fx-activity-description {

            max-width: 100%;

            font-size: 8px;

            white-space: normal;
          }


          .fx-activity-line {

            left: 16px;

            top: 40px;
          }


          .fx-activity-empty {

            min-height: 180px;
          }

        }


        /* =====================================================
           EXTRA SMALL
        ===================================================== */

        @media (max-width: 359px) {

          .fx-activity-card {

            padding: 12px;
          }


          .fx-activity-title {

            font-size: 14px;
          }


          .fx-activity-item-title {

            font-size: 9px;
          }


          .fx-activity-description {

            font-size: 8px;
          }


          .fx-activity-icon {

            width: 30px;
            height: 30px;
          }


          .fx-activity-line {

            left: 14px;
          }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .fx-activity-view-all,
          .fx-activity-line,
          .fx-activity-icon {

            transition: none !important;

            animation: none !important;
          }

        }

      `}</style>
    </>
  );
}