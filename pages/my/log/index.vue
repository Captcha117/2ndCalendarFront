<template>
  <view>
    <uni-nav-bar
      :fixed="true"
      shadow
      :border="false"
      background-color="#F8F8F8"
      color="black"
      status-bar
      title="更新日志"
      left-icon="left"
      @clickLeft="back"
    />
    <zero-markdown-view :markdown="text"></zero-markdown-view>
  </view>
</template>

<script>
import { str } from "./log";
export default {
  data() {
    return {
      text: str,
    };
  },
  methods: {
    back() {
      uni.navigateBack({ delta: 1 });
    },
  },
};
</script>

<style></style>
