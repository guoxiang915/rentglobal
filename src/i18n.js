import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// english
import enCommon from "./common/locales/en/common.json";
import enHome from "./common/locales/en/common.json";

// french
import frCommon from "./common/locales/fr/common.json";
import frHome from "./common/locales/fr/common.json";

const moment = require("moment");

i18n.use(LanguageDetector).init({
  // init resources
  resources: {
    en: {
      common: enCommon,
      home: enHome
    },
    fr: {
      common: frCommon,
      home: frHome
    }
  },
  fallbackLng: "en",
  debug: true,

  // common namespace
  ns: ["common"],
  defaultNS: "common",
  fallbackNS: "common",

  // use content as keys
  keySeparator: false,

  interpolation: {
    escapeValue: false, // not needed
    formatSeparator: ",",
    format: function(value, format, lang) {
      if (format === "uppercase") return value.toUpperCase();
      if (value instanceof Date)
        return moment(value).format(format);
      return value;
    }
  },

  react: {
    wait: true
  }
});

export default i18n;
