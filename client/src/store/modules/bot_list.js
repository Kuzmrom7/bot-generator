import axios from "axios";
import router from "@/router";

export default {
  state: {
    count: -1,
    list: [],
    status: "initial",
  },
  actions: {
    async fetchBotList({ commit }) {
      try {
        const resp = await axios.get("/bot_list");
        const list = await resp.data.list;

        await commit("setBotList", list);

        if (list.length === 0) {
          await router.push("/started");
        } else {
          await commit("setStatus", "loaded");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addBot(ctx, botToken) {
      try {
        await axios.get(`/add/${botToken}`);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  mutations: {
    setBotList(state, list) {
      state.list = list;
      state.count = list.length;
    },
    setStatus(state, status) {
      state.status = status;
    },
  },
  getters: {
    isEmptyBotList(state) {
      return state.count === 0;
    },
    botStatus(state) {
      return state.status;
    },
    botList(state) {
      return state.list;
    },
  },
};
