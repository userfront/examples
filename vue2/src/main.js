import Vue from "vue";
import Userfront from "@userfront/toolkit/vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

Userfront.init("demo1234");

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
