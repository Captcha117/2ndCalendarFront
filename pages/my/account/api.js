import http from "@/utils/http";

// 登录
export function login(data) {
  return http.request({
    url: "/sys/wx/login",
    method: "post",
    data,
  });
}

// 注册
export function register(data) {
  return http.request({
    url: "/sys/wx/register",
    method: "post",
    data,
  });
}
