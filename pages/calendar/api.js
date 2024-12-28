import http from "@/utils/http";

// 活动列表
export function getEventList(data) {
  return http.request({
    url: "/calendar/event/eventListByGameIds",
    method: "post",
    data,
  });
}
