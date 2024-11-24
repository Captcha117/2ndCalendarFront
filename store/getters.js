const getters = {
  gameList: (state) => state.sys.gameList,
  doneList: (state) => state.user.doneList,
  settings: (state) => state.user.settings,
};
export default getters;
