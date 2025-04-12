import http from "@/utils/http";

// 微信登录
export function wxLogin(data) {
  return http.request({
    url: "/sys/wx/login",
    method: "post",
    data,
  });
}

// 用户信息
export function getUserInfo() {
  return http.request({
    url: "/sys/wx/userInfo",
    method: "get",
  });
}

// 游戏列表
export function getGameList() {
  return http.request({
    url: "/calendar/game/gameList",
    method: "get",
  });
}
