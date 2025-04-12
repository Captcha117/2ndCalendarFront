import { getToken, setToken, removeToken } from "@/utils/auth";
import * as api from "./api";
const getDefaultState = () => {
  return {
    token: getToken(),
    user: {},

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
  showImg: 1,
};

const state = getDefaultState();

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  RESET_STATE: (state) => {
    state.user = {};
    // Object.assign(state, getDefaultState());
  },

  SET_DONE_LIST: (state, doneList) => {
    state.doneList = doneList;
  },
  SET_SETTINGS: (state, settings) => {
    state.settings = settings;
  },
};

const actions = {
  wxLogin({ commit, dispatch }, loginCode) {
    return new Promise((resolve, reject) => {
      api
        .wxLogin(loginCode)
        .then((res) => {
          // 微信登录后获取用户信息
          if (res.token) {
            commit("SET_TOKEN", res.token);
            setToken(res.token);
            // return dispatch("getUserInfo");
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getUserInfo({ state, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      if (state.token) {
        api
          .getUserInfo()
          .then((res) => {
            if (res.data && res.data.id) {
              commit("SET_USER", res.data);
            } else {
              dispatch("resetState");
            }
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        commit("SET_USER", {});
      }
    });
  },
  resetState({ commit }) {
    return new Promise((resolve) => {
      removeToken();
      commit("RESET_STATE");
      resolve();
    });
  },

  // 添加已完成活动
  addDone({ state, dispatch }, id) {
    if (state.doneList.includes(id)) {
      return;
    } else {
      let list = [...state.doneList, id];
      dispatch("setDoneList", list);
    }
  },
  // 移除已完成活动
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
      let s = uni.getStorageSync("settings");
      settings = { ...defaultSettings, ...s };
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
