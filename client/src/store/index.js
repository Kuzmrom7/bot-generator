import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import bot_list from "./modules/bot_list";
import bot from "./modules/bot";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, bot_list, bot },
});
