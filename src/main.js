import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import elementLocale from "element-ui/lib/locale/lang/en";
import "@/assets/css/element-variables.scss";
// external
import VueCookies from "vue-cookies";

// lodash
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
// language
import i18n from "@/i18n";
// layout
import Base from "@/layout/Base.vue";

Vue.use(ElementUI, { locale: elementLocale });
Vue.use(VueCookies);
Vue.$cookies.config("30MIN");

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

const filters = require.context("@/filters", true, /[A-Z]\w+\.(js|vue)$/i);
filters.keys().forEach(key => {
  const uri = key.substr(key.lastIndexOf("/") + 1, key.length);
  let name = uri.substr(0, uri.indexOf("."));
  name = name.replace(/([A-Z])/g, "-$1");
  name = name.toLowerCase();
  Vue.component(name, filters(key).default);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
