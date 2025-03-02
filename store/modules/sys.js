import { getGameList } from "./api";
import * as data from "@/pages/calendar/data.js";

const getDefaultState = () => {
  return {
    gameList: [],
  };
};

const state = getDefaultState();

const mutations = {
  SET_GAME_LIST: (state, gameList) => {
    state.gameList = gameList;
  },
};

const actions = {
  getGameList({ commit }) {
    if (data.test) {
      commit("SET_GAME_LIST", data.gameList);
      return;
    }
    return getGameList().then((_) => {
      commit("SET_GAME_LIST", _.data || []);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
