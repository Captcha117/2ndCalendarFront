const getDefaultState = () => {
  return {
    doneList: [],
    settings: {},
  };
};

const defaultSettings = {
  games: [],
  prop: "status",
  order: "asc",
  status: [0, 1, 2],
  done: [false, true],
};

const state = getDefaultState();

const mutations = {
  SET_DONE_LIST: (state, doneList) => {
    state.doneList = doneList;
  },
  SET_SETTINGS: (state, settings) => {
    state.settings = settings;
  },
};

const actions = {
  addDone({ state, dispatch }, id) {
    if (state.doneList.includes(id)) {
      return;
    } else {
      let list = [...state.doneList, id];
      dispatch("setDoneList", list);
    }
  },
  removeDone({ state, dispatch }, id) {
    let list = [...state.doneList];
    let index = list.indexOf(id);
    if (index >= 0) {
      list.splice(index, 1);
      dispatch("setDoneList", list);
    }
  },
  setDoneList({ dispatch }, doneList) {
    try {
      uni.setStorageSync("doneList", doneList || []);
      dispatch("getDoneList");
    } catch (e) {}
  },
  getDoneList({ commit }) {
    let list = [];
    try {
      list = uni.getStorageSync("doneList") || [];
    } catch (e) {
      list = [];
    }
    commit("SET_DONE_LIST", list);
  },

  setSettings({ dispatch }, settings) {
    try {
      uni.setStorageSync("settings", settings || defaultSettings);
      dispatch("getSettings");
    } catch (e) {}
  },
  getSettings({ commit }) {
    let settings = {};
    try {
      settings = uni.getStorageSync("settings") || defaultSettings;
    } catch (e) {
      settings = defaultSettings;
    }
    commit("SET_SETTINGS", settings);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
