import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "@/assets/css/element-variables.scss";
// external
import VCalendar from "v-calendar";
import VueApexCharts from "vue-apexcharts";

import Base from "@/layout/Base.vue";

Vue.use(ElementUI);

Vue.use(VueApexCharts);
Vue.use(VCalendar, {
  componentPrefix: "vc"
});

Vue.component("apexchart", VueApexCharts);
Vue.component("base-layout", Base);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.replace("/login");
