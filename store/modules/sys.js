import { getGameList } from "./api";

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
