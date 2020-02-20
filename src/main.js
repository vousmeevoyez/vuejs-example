import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import elementLocale from "element-ui/lib/locale/lang/en";
import "@/assets/css/element-variables.scss";
// external
import VCalendar from "v-calendar";
import VueApexCharts from "vue-apexcharts";
import VueFriendlyIframe from "vue-friendly-iframe";
import VueCookies from "vue-cookies";
import Moment from "moment";

// lodash
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
// language
import i18n from "@/i18n";
// layout
import Base from "@/layout/Base.vue";

Vue.use(ElementUI, { locale: elementLocale });
Vue.use(VueApexCharts);
Vue.use(VueFriendlyIframe);
Vue.use(VCalendar, {
  componentPrefix: "vc"
});
Vue.use(VueCookies);
Vue.$cookies.config("30MIN");

Vue.component("apexchart", VueApexCharts);
Vue.component("base-layout", Base);
// component registration
// using this technique we dont need to import comopnent inside components because it automatically imported
const requireComponent = require.context(
  // The relative path of the components folder
  "@/components",
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName);
  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});

Vue.config.productionTip = false;
Vue.filter("humanDate", function(value) {
  if (value) {
    return Moment(value).format("MMMM Do YYYY");
  }
});

Vue.filter("humanHour", function(value) {
  if (value) {
    return Moment(value).format("HH:mm");
  }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
