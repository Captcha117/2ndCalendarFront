import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

import user from "./modules/user";
import sys from "./modules/sys";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    sys,
  },
  getters,
});

export default store;
