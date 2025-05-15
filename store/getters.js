import { getToken } from "@/utils/auth";
const getters = {
  gameList: (state) => state.sys.gameList,
  doneList: (state) => state.user.doneList,
  settings: (state) => state.user.settings,
  user: (state) => state.user.user,
  isLogin: (state) => getToken() && state.user.user.id,
};
export default getters;
