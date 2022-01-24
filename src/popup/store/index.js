import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import wallets from "./modules/wallets";
import network from "./modules/network";
import hrc20 from "./modules/hrc20";
import hrc721 from "./modules/hrc721";
import account from "./modules/account";
import transactions from "./modules/transactions";
import global from "./modules/global";
import settings from "./modules/settings";
import assets from "./modules/assets";
import * as getters from "./getters";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["wallets", "assets", "account", "network", "hrc20", "hrc721", "settings"],
});

export default new Vuex.Store({
  getters,
  modules: {
    transactions,
    global,
    assets,
    wallets,
    network,
    account,
    hrc20,
    hrc721,
    settings,
  },

  state: {
    loading: false,
  },

  mutations: {
    loading(state, loading) {
      state.loading = loading;
    },
  },

  plugins: [vuexLocal.plugin],
});
