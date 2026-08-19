// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// import en from './locales/en.json';
// import hi from './locales/hi.json';
// import te from './locales/te.json';

// i18n
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//         resources: {
//             en: { translation: en },
//             hi: { translation: hi },
//             te: { translation: te },
//         },
//         fallbackLng: 'en',
//         interpolation: {
//             escapeValue: false,
//         },
//     });

// export default i18n;










import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import te from "./locales/te.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },

      hi: {
        translation: hi
      },

      te: {
        translation: te
      }
    },

    lng: "en",

    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    },

    react: {
      useSuspense: false
    }
  });

export default i18n;