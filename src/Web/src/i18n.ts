import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import pl from "./translations/pl.json";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en,
			pl
		},
		lng: "pl",
		fallbackLng: {
			default: ["pl"]
		},
		debug: true,
		ns: ["defaultNamespace"],
		defaultNS: "defaultNamespace",
		react: {
			wait: true,
		}
	});

export default i18n;