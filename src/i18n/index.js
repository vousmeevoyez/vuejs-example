import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  en: {
    home: {
      north_star: "North Star",
      backlog: "Backlog",
      mentor: "Mentor",
      mentees: "Mentees"
    },
    diagnostic: {
      instruction:
        "Complete Your DreamDiagnostic Survey, if you have already completed the survey, kindly wait 7-10 days for the results to show here."
    },
    design: {
      instruction:
        "Complete Your DreamGPS Survey, if you have already completed the survey, kindly wait 7-10 days for the results to show here."
    },
    powermentorship: {
      instruction:
        "After click confirm, we will send invoice to your email <br> in order to complete your PowerMentorship"
    }
  },
  id: {}
};

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages
});

export default i18n;
