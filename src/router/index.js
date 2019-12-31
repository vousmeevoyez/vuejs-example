import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: { visible: false },
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    icon: "el-icon-s-home",
    meta: { layout: "base", visible: true },
    component: () => import("@/views/home/Home.vue")
  },
  {
    path: "/dream-diagnostic",
    name: "Dream Diagnostic",
    icon: "el-icon-s-platform",
    meta: { layout: "base", visible: true },
    component: () => import("@/views/home/Home.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
