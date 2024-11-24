import http from "@/utils/http";

// 游戏列表
export function getGameList() {
  return http.request({
    url: "/calendar/game/gameList",
    method: "get",
  });
}
