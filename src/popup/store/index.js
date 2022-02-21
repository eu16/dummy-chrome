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
import VueCookies from 'vue-cookies'
import BootstrapVue from 'bootstrap-vue'
import * as getters from "./getters";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex);
Vue.use(VueCookies);
Vue.use(BootstrapVue);

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
