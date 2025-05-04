import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

import translationEn from './locales/en/translation.json';
import translationUk from './locales/uk/translation.json';


const resources = {
    en: {
        translation: translationEn
    },
    uk: {
        translation: translationUk
    }
}

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "uk",
        resources,
        detection: {
            order: ["cookie", "localStorage"],
            caches: ["cookie", "localStorage"]
        },
        interpolation: {
            escapeValue: false,
        },

    });

export default i18n;
