import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "@/assets/css/element-variables.scss";
// external
import VCalendar from "v-calendar";
import VueApexCharts from "vue-apexcharts";
import VueFriendlyIframe from "vue-friendly-iframe";

// lodash
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
// language
import i18n from "@/i18n";
// layout
import Base from "@/layout/Base.vue";

Vue.use(ElementUI);
Vue.use(VueApexCharts);
Vue.use(VueFriendlyIframe);
Vue.use(VCalendar, {
  componentPrefix: "vc"
});

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

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

router.replace("/login");
