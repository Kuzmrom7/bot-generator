import axios from "axios";

export default {
  state: {
    data: {
      type: "",
      status: "",
      name: "",
    },
  },
  actions: {
    async addBot(ctx, botToken) {
      try {
        await axios.get(`/add/${botToken}`);
        return true;
      } catch (error) {
        return false;
      }
    },

    async fetchBot({ commit }, id) {
      try {
        const resp = await axios.get(`/bot/${id}`);
        const data = await resp.data.bot;

        await commit("setBot", data);
      } catch (error) {
        console.log(error);
      }
    },

    async bindType(ctx, data) {
      try {
        await axios.post("/bind_type", data);
        return true;
      } catch (error) {
        return false;
      }
    },

    async startBot({ dispatch }, id) {
      try {
        await axios.get(`/start/${id}`);
        await dispatch("fetchBotList");
        return true;
      } catch (error) {
        return false;
      }
    },

    async stopBot({ dispatch }, id) {
      try {
        await axios.get(`/stop/${id}`);
        await dispatch("fetchBotList");
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  mutations: {
    setBot(state, bot) {
      state.data = bot;
    },
  },
  getters: {
    getBotData(state) {
      return state.data;
    },
  },
};
