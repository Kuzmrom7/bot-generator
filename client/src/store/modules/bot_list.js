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

        await commit("SET_BOT_LIST", list);

        if (list.length === 0) {
          await router.push("/started");
        } else {
          await commit("SET_STATUS", "loaded");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addBot({ commit }, botToken) {
      try {
        await axios.get(`/add/${botToken}`);
        await commit("SET_STATUS", "added");

        await router.push("/");
      } catch (error) {
        await commit("SET_STATUS", "FAILED_ADDED");
        console.log(error);
      }
    },
  },
  mutations: {
    SET_BOT_LIST(state, list) {
      state.list = list;
      state.count = list.length;
    },
    SET_STATUS(state, status) {
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
