const getDefaultState = () => {
  return {
    doneList: [],
  };
};

const state = getDefaultState();

const mutations = {
  SET_DONE_LIST: (state, doneList) => {
    state.doneList = doneList;
  },
};

const actions = {
  addDone({ state, dispatch }, id) {
    if (state.doneList.includes(id)) {
      return;
    } else {
      let list = [...state.doneList, id];
      dispatch("setDontList", list);
    }
  },
  removeDone({ state, dispatch }, id) {
    let list = [...state.doneList];
    let index = list.indexOf(id);
    if (index >= 0) {
      list.splice(index, 1);
      dispatch("setDontList", list);
    }
  },
  setDontList({ dispatch }, doneList) {
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
