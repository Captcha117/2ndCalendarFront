<template>
  <view>
    <scroll-view
      scroll-y="true"
      refresher-enabled="true"
      :refresher-triggered="triggered"
      :refresher-threshold="100"
      refresher-background="#f5f7fa"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
    >
      <slot />
    </scroll-view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      triggered: false,
    };
  },
  onLoad() {
    // this._freshing = false;
    // setTimeout(() => {
    //   this.triggered = true;
    // }, 1000);
  },
  methods: {
    onPulling(e) {
      // console.log("onpulling", e);
    },
    onRefresh() {
      if (this._freshing) return;
      this.triggered = true;
      this._freshing = true;
      this.$emit("onRefresh");
    },
    onRestore() {
      this.triggered = "restore"; // 需要重置
      // console.log("onRestore");
    },
    onAbort() {
      // console.log("onAbort");
    },
    refreshFinish() {
      this.triggered = false;
      this._freshing = false;
    },
  },
};
</script>
<style scoped lang="scss"></style>
