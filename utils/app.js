export function openApp(url, cb) {
  // #ifdef H5
  window.open(url);
  // #endif
  // #ifdef APP-PLUS
  if (plus) {
    plus.runtime.openURL(url, (res) => {
      console.log("res:", res);
      cb && cb();
    });
  }
  // #endif
}

export function openMihoyobbs(url, title) {
  if (url) {
    openApp("mihoyobbs://article" + url.substring(url.lastIndexOf("/")), () => {
      uni.navigateTo({
        url: `/pages/webview/index?title=${title}&src=${url}`,
      });
    });
  }
}
