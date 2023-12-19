import i18n from "i18next"
import {initReactI18next} from 'react-i18next'
import LanguageDetector from  "i18next-browser-languagedetector"
import EN from "./languages/EN.json"
import TR from "./languages/TR.json"

const resources = {
    en: {
        translation: EN
    },
    tr: {
        translation: TR
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    });

export default i18n
