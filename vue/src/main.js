import Vue from "vue";
import Userfront from "@userfront/vue";
import App from "./App.vue";
import router from "./router";

Userfront.init("demo1234");

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
