<template>
  <scroll-view
    scroll-y="true"
    :style="{ height }"
    refresher-enabled="true"
    :refresher-triggered="triggered"
    :refresher-threshold="100"
    refresher-background="#f5f7fa"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @refresherabort="onAbort"
    @touchstart="touchStart"
    @touchend="touchEnd"
  >
    <slot />
  </scroll-view>
</template>
<script>
export default {
  props: {
    height: {
      type: String,
      default: "100px",
    },
  },
  data() {
    return {
      triggered: false,
      freshing: false,
      touchStartX: 0, // 触屏起始点x
      touchStartY: 0, // 触屏起始点y
    };
  },
  onLoad() {
    // this.freshing = false;
    // setTimeout(() => {
    //   this.triggered = true;
    // }, 1000);
  },
  methods: {
    onPulling(e) {
      // console.log("onpulling", e);
    },
    onRefresh() {
      if (this.freshing) return;
      this.freshing = true;
      if (!this.triggered) {
        this.triggered = true;
      }
      setTimeout(() => {
        this.$emit("doRefresh");
        // this.refreshFinish();
      }, 100);
    },
    onRestore() {
      // this.triggered = "restore"; // 需要重置
      // console.log("onRestore");
    },
    onAbort() {
      // console.log("onAbort");
    },
    refreshFinish() {
      this.triggered = false;
      this.freshing = false;
    },
    touchStart(e) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    },
    touchEnd(e) {
      let deltaX = e.changedTouches[0].clientX - this.touchStartX;
      let deltaY = e.changedTouches[0].clientY - this.touchStartY;
      if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX >= 0) {
          this.$emit("rightSlide");
        } else {
          this.$emit("leftSlide");
        }
      }
      if (Math.abs(deltaY) > 50 && Math.abs(deltaX) < Math.abs(deltaY)) {
        if (deltaY < 0) {
          this.$emit("upSlide");
        } else {
          this.$emit("downSlide");
        }
      } else {
        this.$emit("tap");
      }
    },
  },
};
</script>
<style scoped lang="scss"></style>
