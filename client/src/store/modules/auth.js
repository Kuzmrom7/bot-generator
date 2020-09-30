import router from "@/router";

export default {
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
  },
  actions: {
    async login({ commit }, data) {
      try {
        let response = await fetch("http://localhost:3000/sign_in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        });
        let result = await response.json();

        localStorage.setItem("token", result.token);

        await commit("setUser", result.token);
        await router.push("/");
      } catch (e) {
        console.log(e, "=e");
      }
    },
    async register({ commit }, data) {
      try {
        let response = await fetch("http://localhost:3000/sign_up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        });
        let result = await response.json();

        localStorage.setItem("token", result.token);

        await commit("setUser", result.token);
        await router.push("/");
      } catch (e) {
        console.log(e, "=e");
      }
    },
    logout() {},
  },
  mutations: {
    setUser(state, token) {
      state.token = token;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
};
