import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;

const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$axios.defaults.headers.common["Authorization"] = token;
}

Vue.prototype.$axios.defaults.baseURL = "http://localhost:3000";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
