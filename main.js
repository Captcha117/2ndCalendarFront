import App from "./App";

// #ifndef VUE3
import Vue from "vue";
import "./uni.promisify.adaptor";
Vue.config.productionTip = false;
App.mpType = "app";

import store from "./store";

import rewardIcon from "@/components/rewardIcon";
Vue.component("rewardIcon", rewardIcon);

const app = new Vue({
  store,
  ...App,
});
app.$mount();
// #endif

import uView from "@/uni_modules/uview-ui";
Vue.use(uView);

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
