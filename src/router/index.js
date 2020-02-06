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
    meta: { layout: "base", visible: true, title: "DreamGPS Home" },
    component: () => import("@/views/home/Home.vue")
  },
  {
    path: "/diagnostic",
    name: "DreamDiagnostic",
    icon: "el-icon-s-order",
    meta: { layout: "base", visible: true, title: "DreamGPS Diagnostic" },
    component: () => import("@/views/diagnostic/Diagnostic.vue")
  },
  {
    path: "/design",
    name: "DreamGPS Design",
    icon: "el-icon-edit-outline",
    meta: { layout: "base", visible: true, title: "DreamGPS Design" },
    component: () => import("@/views/design/Design.vue")
  },
  {
    path: "/implementation",
    name: "DreamGPS Implementation",
    icon: "el-icon-discover",
    meta: { layout: "base", visible: true, title: "DreamGPS Implementation" },
    component: () => import("@/views/implementation/Implementation.vue")
  },
  {
    path: "/mentorship",
    name: "Power Mentorship",
    icon: "el-icon-user",
    meta: { layout: "base", visible: true, title: "Power Mentorship" },
    component: () => import("@/views/mentorship/Mentorship.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//  const publicPages = ["/login"];
//  const authRequired = !publicPages.includes(to.path);
//  const loggedIn = localStorage.getItem("user");
//
//  if (authRequired && !loggedIn) {
//    return next("/login");
//  }
//
//  next();
// });

export default router;
