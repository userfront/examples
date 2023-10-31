import Vue from "vue";
import VueRouter from "vue-router";

import Userfront from "@userfront/toolkit/vue";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ResetView from "../views/ResetView.vue";
import DashboardView from "../views/DashboardView.vue";
import AdminView from "../views/AdminView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/reset",
    name: "Reset",
    component: ResetView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!Userfront.accessToken();
  if (to.name === "Dashboard" && !isLoggedIn) {
    return next({ name: "Login" });
  }
  next();
});

export default router;
