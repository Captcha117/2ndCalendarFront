import http from "@/utils/http";

// 自定义日历列表
export function getCustomList() {
  return http.request({
    url: "/calendar/custom/customList",
    method: "get",
  });
}
export function addCustom(data) {
  return http.request({
    url: "/calendar/custom/save",
    method: "post",
    data,
  });
}
export function getCustomById(id) {
  return http.request({
    url: "/calendar/custom/info/" + id,
    method: "get",
  });
}
export function updateCustom(data) {
  return http.request({
    url: "/calendar/custom/update",
    method: "post",
    data,
  });
}
export function delCustom(data) {
  return http.request({
    url: "/calendar/custom/del",
    method: "post",
    data,
  });
}