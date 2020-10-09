import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";

import "./assets/main.scss";

Vue.config.productionTip = false;

/* Setup axios configurate */
Vue.prototype.$axios = Axios;
Vue.prototype.$axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8080";
Vue.prototype.$axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

/* Mount Vue App */
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
