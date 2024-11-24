const TOKEN_KEY = "X-USER-TOKEN";
const APPTYPE = "APPTYPE";

export function getToken() {
  return uni.getStorageSync(TOKEN_KEY);
}
export function setToken(token) {
  return uni.setStorageSync(TOKEN_KEY, token);
}

export function removeToken() {
  return uni.removeStorageSync(TOKEN_KEY);
}

export function getApptype() {
  return uni.getStorageSync(APPTYPE);
}

export function setApptype(appType) {
  return uni.setStorageSync(APPTYPE, appType);
}
