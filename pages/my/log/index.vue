<template>
  <view>
    <uni-nav-bar
      :fixed="true"
      shadow
      :border="false"
      background-color="#F8F8F8"
      color="black"
      status-bar
      :title="title"
      left-icon="left"
      @clickLeft="back"
    />
    <zero-markdown-view :markdown="text"></zero-markdown-view>
  </view>
</template>

<script>
import { logStr } from "./log";
import { termStr } from "./term";
import { privacyStr } from "./privacy";
export default {
  data() {
    return {
      type: "",
      title: "",
      text: "",
    };
  },
  onLoad(option) {
    this.type = option.type || "";
  },
  mounted() {
    switch (this.type) {
      case "log": {
        this.title = "更新日志";
        this.text = logStr;
        break;
      }
      case "term": {
        this.title = "服务条款";
        this.text = termStr;
        break;
      }
      case "privacy": {
        this.title = "隐私协议";
        this.text = privacyStr;
        break;
      }
    }
  },
  methods: {
    back() {
      uni.navigateBack({ delta: 1 });
    },
  },
};
</script>

<style></style>
