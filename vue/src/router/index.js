import Vue from "vue";
import VueRouter from "vue-router";
import Userfront from "@userfront/vue";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Reset from "../views/Reset.vue";
import Dashboard from "../views/Dashboard.vue";
import Admin from "../views/Admin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/reset",
    name: "Reset",
    component: Reset,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
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
