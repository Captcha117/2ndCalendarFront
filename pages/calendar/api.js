import http from "@/utils/http";

// 活动列表
export function getEventList(data) {
  return http.request({
    url: "/calendar/event/eventListByGameIds",
    method: "post",
    data,
  });
}

// 根据文章ID获取活动详情
export function getEventDetailByPostId(postId) {
  return http.request({
    url: "/calendar/event/getEventDetailByPostId",
    method: "post",
    data: { postId },
  });
}
