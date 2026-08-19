// src/components/dashboard/QuickAccess.jsx

import React from "react";

import {
  Link,
} from "react-router-dom";

import {
  Sprout,
  TrendingUp,
  ShieldCheck,
  ShoppingBag,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";


export default function QuickAccess({
  t,
}) {


  // =========================================================
  // TRANSLATION
  // =========================================================

  const translate = (
    key,
    fallback
  ) => {

    if (
      typeof t ===
      "function"
    ) {

      const value =
        t(key);


      if (
        value &&
        value !== key &&
        !String(value)
          .toLowerCase()
          .includes(
            "translation missing"
          )
      ) {

        return value;

      }

    }


    return fallback;

  };


  // =========================================================
  // TOOLS
  // =========================================================

  const tools = [

    {
      id: "crop",

      path:
        "/crop-recommend",

      title:
        translate(
          "crop_consult",
          "Crop Consult"
        ),

      description:
        translate(
          "crop_consult_desc",
          "Get AI-based crop recommendations for better yield."
        ),

      button:
        translate(
          "get_started",
          "Get Started"
        ),

      icon:
        Sprout,

      theme:
        "green",

      label:
        "AI Recommendation",
    },


    {
      id: "yield",

      path:
        "/yield-predict",

      title:
        translate(
          "yield_forecast",
          "Yield Forecast"
        ),

      description:
        translate(
          "yield_forecast_desc",
          "Predict your harvest and plan your farming season ahead."
        ),

      button:
        translate(
          "view_forecast",
          "View Forecast"
        ),

      icon:
        TrendingUp,

      theme:
        "blue",

      label:
        "Smart Prediction",
    },


    {
      id: "disease",

      path:
        "/disease-detect",

      title:
        translate(
          "disease_lab",
          "Disease Lab"
        ),

      description:
        translate(
          "disease_lab_desc",
          "Identify crop diseases from an image and get solutions."
        ),

      button:
        translate(
          "diagnose_now",
          "Diagnose Now"
        ),

      icon:
        ShieldCheck,

      theme:
        "red",

      label:
        "AI Diagnosis",
    },


    {
      id: "store",

      path:
        "/store",

      title:
        translate(
          "farm_store",
          "Farm Store"
        ),

      description:
        translate(
          "farm_store_desc",
          "Find quality seeds, fertilizers and farm essentials."
        ),

      button:
        translate(
          "shop_now",
          "Shop Now"
        ),

      icon:
        ShoppingBag,

      theme:
        "orange",

      label:
        "Farm Essentials",
    },

  ];


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <section
      className="
        fx-quick-section
      "
    >


      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        className="
          fx-quick-header
        "
      >

        <div>

          <div
            className="
              fx-quick-title-row
            "
          >

            <h2
              className="
                fx-quick-title
              "
            >
              {translate(
                "quick_access",
                "Quick Access"
              )}
            </h2>


            <span
              className="
                fx-quick-sparkle
              "
            >
              <Sparkles
                size={12}
              />
            </span>

          </div>


          <p
            className="
              fx-quick-subtitle
            "
          >
            {translate(
              "quick_access_subtitle",
              "Everything you need to manage your farm smarter."
            )}
          </p>

        </div>

      </div>


      {/* ===================================================
          GRID
      =================================================== */}

      <div
        className="
          fx-quick-grid
        "
      >

        {tools.map(
          (tool) => {

            const Icon =
              tool.icon;


            return (

              <Link
                key={
                  tool.id
                }

                to={
                  tool.path
                }

                className={`
                  fx-quick-card
                  fx-quick-${tool.theme}
                `}
              >


                {/* =========================================
                    TOP
                ========================================= */}

                <div
                  className="
                    fx-quick-card-top
                  "
                >

                  <div
                    className="
                      fx-quick-icon
                    "
                  >

                    <Icon
                      size={21}
                    />

                  </div>


                  <span
                    className="
                      fx-quick-label
                    "
                  >
                    {tool.label}
                  </span>

                </div>


                {/* =========================================
                    CONTENT
                ========================================= */}

                <div
                  className="
                    fx-quick-content
                  "
                >

                  <h3
                    className="
                      fx-quick-card-title
                    "
                  >
                    {tool.title}
                  </h3>


                  <p
                    className="
                      fx-quick-card-description
                    "
                  >
                    {tool.description}
                  </p>

                </div>


                {/* =========================================
                    FOOTER
                ========================================= */}

                <div
                  className="
                    fx-quick-footer
                  "
                >

                  <span
                    className="
                      fx-quick-button
                    "
                  >
                    {tool.button}
                  </span>


                  <span
                    className="
                      fx-quick-arrow
                    "
                  >

                    <ArrowUpRight
                      size={15}
                    />

                  </span>

                </div>


                <div
                  className="
                    fx-quick-decoration
                  "
                />

              </Link>

            );

          }
        )}

      </div>


      {/* ===================================================
          STYLES
      =================================================== */}

      <style>{`

        /* ===================================================
           SECTION
        =================================================== */

        .fx-quick-section {

          width: 100%;

          margin: 0;

        }


        /* ===================================================
           HEADER
        =================================================== */

        .fx-quick-header {

          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 9px;

        }


        .fx-quick-title-row {

          display: flex;

          align-items: center;

          gap: 6px;

        }


        .fx-quick-title {

          margin: 0;

          color: #172033;

          font-size: 16px;

          line-height: 1.2;

          font-weight: 700;

        }


        .fx-quick-sparkle {

          width: 21px;

          height: 21px;

          display: flex;

          align-items: center;

          justify-content: center;

          color: #168747;

          background: #eaf8ee;

          border-radius: 6px;

        }


        .fx-quick-subtitle {

          margin: 3px 0 0;

          color: #929daa;

          font-size: 8px;

        }


        /* ===================================================
           GRID
        =================================================== */

        .fx-quick-grid {

          width: 100%;

          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 10px;

        }


        /* ===================================================
           CARD
        =================================================== */

        .fx-quick-card {

          position: relative;

          min-width: 0;

          min-height: 145px;

          overflow: hidden;

          padding: 12px;

          display: flex;

          flex-direction: column;

          box-sizing: border-box;

          color: inherit;

          text-decoration: none;

          background: #ffffff;

          border:
            1px solid
            #e3ebe5;

          border-radius: 14px;

          box-shadow:
            0 3px 12px
            rgba(15,23,42,0.035);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;

        }


        .fx-quick-card:hover {

          transform:
            translateY(-3px);

          box-shadow:
            0 9px 20px
            rgba(15,23,42,0.07);

        }


        /* ===================================================
           TOP
        =================================================== */

        .fx-quick-card-top {

          position: relative;

          z-index: 3;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 6px;

        }


        /* ===================================================
           ICON
        =================================================== */

        .fx-quick-icon {

          width: 38px;

          height: 38px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          border-radius: 10px;

        }


        .fx-quick-green
        .fx-quick-icon {

          color: #168747;

          background: #e9f8ed;

        }


        .fx-quick-blue
        .fx-quick-icon {

          color: #2875c9;

          background: #edf7ff;

        }


        .fx-quick-red
        .fx-quick-icon {

          color: #d64a3d;

          background: #fff0ee;

        }


        .fx-quick-orange
        .fx-quick-icon {

          color: #e87516;

          background: #fff4e5;

        }


        /* ===================================================
           LABEL
        =================================================== */

        .fx-quick-label {

          max-width: 110px;

          overflow: hidden;

          padding:
            4px
            6px;

          color: #6b7280;

          background: #f7f9f8;

          border-radius: 999px;

          font-size: 5.5px;

          line-height: 1;

          font-weight: 600;

          white-space: nowrap;

          text-overflow: ellipsis;

        }


        /* ===================================================
           CONTENT
        =================================================== */

        .fx-quick-content {

          position: relative;

          z-index: 3;

          flex: 1;

          padding-top: 8px;

        }


        .fx-quick-card-title {

          margin:
            0 0 4px;

          overflow: hidden;

          color: #172033;

          font-size: 12px;

          line-height: 1.2;

          font-weight: 700;

          white-space: nowrap;

          text-overflow: ellipsis;

        }


        .fx-quick-card-description {

          display: -webkit-box;

          margin: 0;

          overflow: hidden;

          color: #7b8794;

          font-size: 7.5px;

          line-height: 1.45;

          -webkit-line-clamp: 3;

          -webkit-box-orient: vertical;

        }


        /* ===================================================
           FOOTER
        =================================================== */

        .fx-quick-footer {

          position: relative;

          z-index: 3;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 6px;

          padding-top: 6px;

          margin-top: 6px;

          border-top:
            1px solid
            #edf2ee;

        }


        .fx-quick-button {

          font-size: 7px;

          font-weight: 700;

        }


        .fx-quick-green
        .fx-quick-button {

          color: #168747;

        }


        .fx-quick-blue
        .fx-quick-button {

          color: #2875c9;

        }


        .fx-quick-red
        .fx-quick-button {

          color: #d64a3d;

        }


        .fx-quick-orange
        .fx-quick-button {

          color: #e87516;

        }


        .fx-quick-arrow {

          width: 23px;

          height: 23px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          border-radius: 7px;

        }


        .fx-quick-green
        .fx-quick-arrow {

          color: #168747;

          background: #e9f8ed;

        }


        .fx-quick-blue
        .fx-quick-arrow {

          color: #2875c9;

          background: #edf7ff;

        }


        .fx-quick-red
        .fx-quick-arrow {

          color: #d64a3d;

          background: #fff0ee;

        }


        .fx-quick-orange
        .fx-quick-arrow {

          color: #e87516;

          background: #fff4e5;

        }


        /* ===================================================
           DECORATION
        =================================================== */

        .fx-quick-decoration {

          position: absolute;

          z-index: 1;

          width: 90px;

          height: 90px;

          right: -43px;

          bottom: -45px;

          border-radius: 50%;

          pointer-events: none;

          opacity: 0.55;

        }


        .fx-quick-green
        .fx-quick-decoration {

          background: #effaf2;

        }


        .fx-quick-blue
        .fx-quick-decoration {

          background: #f0f8ff;

        }


        .fx-quick-red
        .fx-quick-decoration {

          background: #fff5f3;

        }


        .fx-quick-orange
        .fx-quick-decoration {

          background: #fff7ed;

        }


        /* ===================================================
           LAPTOP
        =================================================== */

        @media (
          min-width: 1024px
        ) and (
          max-width: 1199px
        ) {

          .fx-quick-grid {

            grid-template-columns:
              repeat(2, minmax(0, 1fr));

          }


          .fx-quick-card {

            min-height: 135px;

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

          .fx-quick-grid {

            grid-template-columns:
              repeat(2, minmax(0, 1fr));

          }

        }


        /* ===================================================
           MOBILE
        =================================================== */

        @media (max-width: 767px) {

          .fx-quick-grid {

            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            gap: 8px;

          }


          .fx-quick-card {

            min-height: 135px;

            padding: 10px;

          }


          .fx-quick-label {

            display: none;

          }

        }


        /* ===================================================
           SMALL MOBILE
        =================================================== */

        @media (max-width: 479px) {

          .fx-quick-title {

            font-size: 14px;

          }


          .fx-quick-card {

            min-height: 128px;

            padding: 9px;

          }


          .fx-quick-icon {

            width: 34px;

            height: 34px;

          }


          .fx-quick-card-title {

            font-size: 11px;

          }


          .fx-quick-card-description {

            font-size: 7px;

            -webkit-line-clamp: 2;

          }

        }

      `}</style>

    </section>

  );

}