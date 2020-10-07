import router from "@/router";
import axios from "axios";

export default {
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
  },
  actions: {
    async login({ commit }, data) {
      try {
        let response = await axios.post("/sign_in", data);
        let result = await response.data;

        localStorage.setItem("token", result.token);

        await commit("SET_TOKEN", result.token);
        await router.push("/");
      } catch (e) {
        console.log(e, "e");
      }
    },
    async register({ commit }, data) {
      try {
        let response = await axios.post("/sign_up", data);
        let result = await response.data;

        localStorage.setItem("token", result.token);

        await commit("SET_TOKEN", result.token);
        await router.push("/");
      } catch (e) {
        console.log(e, "e");
      }
    },
    async logout({ commit }) {
      try {
        localStorage.removeItem("token");
        await commit("SET_TOKEN", "");
        await router.push("/login");
      } catch (e) {
        console.log(e, "e");
      }
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
};
