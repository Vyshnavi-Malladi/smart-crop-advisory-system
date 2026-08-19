// src/components/dashboard/WelcomeBanner.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, ChevronDown, Leaf, Sprout } from "lucide-react";

export default function WelcomeBanner({
  greeting,
  farmerName,
  location,
}) {
  const { t } = useTranslation();

  return (
    <>
      <section className="fx-welcome">

        {/* ================= LEFT CONTENT ================= */}

        <div className="fx-welcome-content">

          <div className="fx-welcome-text">

            <div className="fx-welcome-title">
              <h1>
                {greeting},{" "}
                <span>{farmerName}!</span>
              </h1>

              <div className="fx-title-leaf">
                <Sprout size={24} />
              </div>
            </div>

            <p>
              {t('dashboard_subtitle')}
            </p>

            {/* LOCATION */}

            <div className="fx-location">
              <MapPin size={15} />

              <span>
                {location || t('default_location')}
              </span>

              <ChevronDown size={14} />
            </div>

          </div>

        </div>

        {/* ================= FARM LANDSCAPE ================= */}

        <div className="fx-farm-scene">

          {/* Sun */}

          <div className="fx-sun" />

          {/* Clouds */}

          <div className="fx-cloud fx-cloud-one" />
          <div className="fx-cloud fx-cloud-two" />

          {/* Back hills */}

          <div className="fx-hill fx-hill-back" />

          {/* Main field */}

          <div className="fx-field fx-field-one" />
          <div className="fx-field fx-field-two" />
          <div className="fx-field fx-field-three" />

          {/* Farm house */}

          <div className="fx-house">

            <div className="fx-roof" />

            <div className="fx-house-body">
              <div className="fx-door" />

              <div className="fx-window fx-window-left" />
              <div className="fx-window fx-window-right" />
            </div>

          </div>

          {/* Tree */}

          <div className="fx-tree">
            <div className="fx-tree-top" />
            <div className="fx-tree-trunk" />
          </div>

          {/* Tractor */}

          <div className="fx-tractor">
            <div className="fx-tractor-body" />
            <div className="fx-tractor-cabin" />

            <div className="fx-wheel fx-wheel-one" />
            <div className="fx-wheel fx-wheel-two" />
          </div>

          {/* Small plants */}

          <div className="fx-plant fx-plant-one">
            <Leaf size={19} />
          </div>

          <div className="fx-plant fx-plant-two">
            <Leaf size={16} />
          </div>

        </div>

      </section>

      {/* =====================================================
          CSS
          Everything is contained inside this JSX file.
      ===================================================== */}

      <style>{`

        /* =====================================================
           WELCOME BANNER
        ===================================================== */

        .fx-welcome {
          position: relative;

          width: 100%;
          min-height: 150px;

          display: flex;
          align-items: stretch;

          overflow: hidden;

          background:
            linear-gradient(
              105deg,
              #f0fdf4 0%,
              #f7fdf8 42%,
              #fefce8 100%
            );

          border: 1px solid #e2eee5;
          border-radius: 20px;

          box-shadow:
            0 5px 20px rgba(22, 101, 52, 0.05);

          isolation: isolate;
        }


        /* =====================================================
           CONTENT
        ===================================================== */

        .fx-welcome-content {
          position: relative;

          z-index: 5;

          width: 55%;

          display: flex;
          align-items: center;

          padding: 25px 28px;
        }


        .fx-welcome-text {
          max-width: 580px;
        }


        /* =====================================================
           TITLE
        ===================================================== */

        .fx-welcome-title {
          display: flex;
          align-items: center;
          gap: 9px;

          margin-bottom: 7px;
        }


        .fx-welcome-title h1 {
          margin: 0;

          color: #172033;

          font-size: clamp(
            23px,
            2.2vw,
            32px
          );

          line-height: 1.15;

          font-weight: 700;

          letter-spacing: -0.6px;
        }


        .fx-welcome-title h1 span {
          color: #16803d;
        }


        .fx-title-leaf {
          width: 36px;
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #16a34a;

          background: #dcfce7;

          border-radius: 50%;

          transform: rotate(-8deg);
        }


        /* =====================================================
           DESCRIPTION
        ===================================================== */

        .fx-welcome-text > p {
          margin: 0;

          color: #64748b;

          font-size: 14px;

          line-height: 1.6;
        }


        /* =====================================================
           LOCATION
        ===================================================== */

        .fx-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;

          margin-top: 15px;

          padding: 7px 11px;

          background: rgba(
            255,
            255,
            255,
            0.72
          );

          border: 1px solid #dcebe0;

          border-radius: 999px;

          color: #475569;

          font-size: 12px;
          font-weight: 500;

          backdrop-filter: blur(8px);
        }


        .fx-location svg:first-child {
          color: #16a34a;
        }


        .fx-location svg:last-child {
          color: #94a3b8;
        }


        /* =====================================================
           FARM SCENE
        ===================================================== */

        .fx-farm-scene {
          position: absolute;

          top: 0;
          right: 0;

          width: 55%;
          height: 100%;

          overflow: hidden;

          pointer-events: none;
        }


        /* =====================================================
           SUN
        ===================================================== */

        .fx-sun {
          position: absolute;

          top: 17px;
          right: 28%;

          width: 60px;
          height: 60px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              #fff7b2 0%,
              #fde68a 48%,
              #facc15 100%
            );

          box-shadow:
            0 0 40px rgba(
              250,
              204,
              21,
              0.35
            );
        }


        /* =====================================================
           CLOUDS
        ===================================================== */

        .fx-cloud {
          position: absolute;

          width: 70px;
          height: 20px;

          background: rgba(
            255,
            255,
            255,
            0.75
          );

          border-radius: 999px;

          filter: blur(1px);
        }


        .fx-cloud::before,
        .fx-cloud::after {
          content: "";

          position: absolute;

          background: inherit;

          border-radius: 50%;
        }


        .fx-cloud::before {
          width: 30px;
          height: 30px;

          left: 14px;
          bottom: 5px;
        }


        .fx-cloud::after {
          width: 24px;
          height: 24px;

          right: 14px;
          bottom: 5px;
        }


        .fx-cloud-one {
          top: 22px;
          right: 55%;
        }


        .fx-cloud-two {
          top: 42px;
          right: 7%;
          transform: scale(0.75);
        }


        /* =====================================================
           HILLS
        ===================================================== */

        .fx-hill {
          position: absolute;

          left: -5%;
          bottom: 42px;

          width: 110%;
          height: 75px;

          border-radius: 50% 50% 0 0;

          background: #bbdcae;
        }


        .fx-hill-back {
          bottom: 50px;

          background:
            linear-gradient(
              180deg,
              #cfe7c3,
              #a8d19a
            );

          transform:
            rotate(-2deg);
        }


        /* =====================================================
           FARM FIELDS
        ===================================================== */

        .fx-field {
          position: absolute;

          left: -5%;

          width: 115%;

          transform-origin: center;
        }


        .fx-field-one {
          bottom: -25px;

          height: 90px;

          background:
            linear-gradient(
              165deg,
              #73b96b 0%,
              #4d9d55 50%,
              #31804a 100%
            );

          clip-path:
            polygon(
              0 55%,
              100% 0,
              100% 100%,
              0 100%
            );
        }


        .fx-field-two {
          bottom: -5px;

          height: 75px;

          background:
            repeating-linear-gradient(
              165deg,
              rgba(255,255,255,0.12) 0px,
              rgba(255,255,255,0.12) 2px,
              transparent 2px,
              transparent 15px
            );

          clip-path:
            polygon(
              15% 60%,
              100% 12%,
              100% 100%,
              15% 100%
            );
        }


        .fx-field-three {
          bottom: 8px;

          height: 60px;

          background:
            repeating-linear-gradient(
              165deg,
              #9ccc76 0px,
              #9ccc76 3px,
              #81b965 3px,
              #81b965 12px
            );

          opacity: 0.7;

          clip-path:
            polygon(
              35% 70%,
              100% 28%,
              100% 100%,
              35% 100%
            );
        }


        /* =====================================================
           HOUSE
        ===================================================== */

        .fx-house {
          position: absolute;

          left: 34%;
          bottom: 48px;

          width: 70px;
          height: 55px;

          z-index: 4;
        }


        .fx-roof {
          position: absolute;

          top: 0;
          left: -8px;

          width: 86px;
          height: 38px;

          background: #c76b3b;

          clip-path:
            polygon(
              50% 0,
              100% 100%,
              0 100%
            );
        }


        .fx-house-body {
          position: absolute;

          left: 8px;
          bottom: 0;

          width: 54px;
          height: 38px;

          background: #eabf83;

          border-radius: 2px;
        }


        .fx-door {
          position: absolute;

          left: 22px;
          bottom: 0;

          width: 13px;
          height: 23px;

          background: #7c4a2d;

          border-radius: 2px 2px 0 0;
        }


        .fx-window {
          position: absolute;

          top: 8px;

          width: 10px;
          height: 10px;

          background: #9bd4dc;

          border: 2px solid #795b3e;
        }


        .fx-window-left {
          left: 6px;
        }


        .fx-window-right {
          right: 6px;
        }


        /* =====================================================
           TREE
        ===================================================== */

        .fx-tree {
          position: absolute;

          right: 23%;

          bottom: 45px;

          width: 45px;
          height: 75px;

          z-index: 4;
        }


        .fx-tree-top {
          position: absolute;

          top: 0;
          left: 0;

          width: 48px;
          height: 48px;

          background:
            radial-gradient(
              circle at 30% 35%,
              #5f9f48,
              #27743c 70%
            );

          border-radius: 50%;
        }


        .fx-tree-trunk {
          position: absolute;

          left: 20px;
          bottom: 0;

          width: 8px;
          height: 37px;

          background: #80552f;

          border-radius: 3px;
        }


        /* =====================================================
           TRACTOR
        ===================================================== */

        .fx-tractor {
          position: absolute;

          right: 9%;
          bottom: 33px;

          width: 75px;
          height: 48px;

          z-index: 5;
        }


        .fx-tractor-body {
          position: absolute;

          left: 15px;
          bottom: 11px;

          width: 48px;
          height: 20px;

          background: #dc8b24;

          border-radius: 4px;
        }


        .fx-tractor-cabin {
          position: absolute;

          left: 27px;
          top: 3px;

          width: 27px;
          height: 25px;

          border: 4px solid #3e5b43;

          border-bottom: none;

          background:
            rgba(
              191,
              219,
              254,
              0.5
            );
        }


        .fx-wheel {
          position: absolute;

          bottom: 0;

          border-radius: 50%;

          background: #25352b;

          border: 4px solid #516053;
        }


        .fx-wheel-one {
          left: 13px;

          width: 22px;
          height: 22px;
        }


        .fx-wheel-two {
          right: 4px;

          width: 30px;
          height: 30px;
        }


        /* =====================================================
           PLANTS
        ===================================================== */

        .fx-plant {
          position: absolute;

          bottom: 25px;

          color: #e0f2c7;

          opacity: 0.8;
        }


        .fx-plant-one {
          left: 16%;
        }


        .fx-plant-two {
          left: 27%;
          bottom: 30px;
        }


        /* =====================================================
           DESKTOP
        ===================================================== */

        @media (min-width: 1440px) {

          .fx-welcome {
            min-height: 155px;
          }

          .fx-welcome-content {
            padding: 27px 30px;
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

          .fx-welcome {
            min-height: 145px;
          }

          .fx-welcome-content {
            width: 58%;

            padding: 23px 24px;
          }

          .fx-farm-scene {
            width: 58%;
          }

          .fx-welcome-title h1 {
            font-size: 27px;
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

          .fx-welcome {
            min-height: 155px;
          }

          .fx-welcome-content {
            width: 65%;

            padding: 24px;
          }

          .fx-farm-scene {
            width: 58%;

            opacity: 0.8;
          }

          .fx-welcome-title h1 {
            font-size: 26px;
          }

          .fx-welcome-text > p {
            font-size: 13px;
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

          .fx-welcome {
            min-height: 175px;

            border-radius: 16px;
          }

          .fx-welcome-content {
            width: 100%;

            align-items: flex-start;

            padding: 23px 20px;

            background:
              linear-gradient(
                90deg,
                rgba(240,253,244,0.96),
                rgba(240,253,244,0.65)
              );
          }

          .fx-farm-scene {
            width: 100%;

            opacity: 0.42;
          }

          .fx-welcome-title h1 {
            font-size: 24px;
          }

          .fx-title-leaf {
            width: 31px;
            height: 31px;
          }

          .fx-welcome-text > p {
            font-size: 13px;
          }

          .fx-location {
            margin-top: 12px;
          }

        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 479px) {

          .fx-welcome {
            min-height: 175px;

            border-radius: 15px;
          }

          .fx-welcome-content {
            width: 100%;

            padding: 20px 16px;

            align-items: flex-start;

            background:
              linear-gradient(
                90deg,
                rgba(240,253,244,0.97),
                rgba(240,253,244,0.72)
              );
          }

          .fx-farm-scene {
            width: 100%;

            opacity: 0.3;
          }

          .fx-welcome-title {
            gap: 6px;
          }

          .fx-welcome-title h1 {
            font-size: 21px;

            letter-spacing: -0.35px;
          }

          .fx-title-leaf {
            width: 28px;
            height: 28px;

            flex-shrink: 0;
          }

          .fx-title-leaf svg {
            width: 17px;
            height: 17px;
          }

          .fx-welcome-text > p {
            max-width: 280px;

            font-size: 12px;
          }

          .fx-location {
            max-width: 100%;

            margin-top: 11px;

            padding: 6px 9px;

            font-size: 10px;
          }

        }


        /* =====================================================
           EXTRA SMALL
        ===================================================== */

        @media (max-width: 359px) {

          .fx-welcome {
            min-height: 165px;
          }

          .fx-welcome-content {
            padding: 18px 13px;
          }

          .fx-welcome-title h1 {
            font-size: 19px;
          }

          .fx-welcome-text > p {
            font-size: 11px;
          }

          .fx-location {
            font-size: 9px;
          }

          .fx-farm-scene {
            opacity: 0.22;
          }

        }

      `}</style>
    </>
  );
}