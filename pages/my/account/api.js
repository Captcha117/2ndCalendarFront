import http from "@/utils/http";

// 登录
export function login(data) {
  return http.request({
    url: "/sys/user/login",
    method: "post",
    data,
  });
}
