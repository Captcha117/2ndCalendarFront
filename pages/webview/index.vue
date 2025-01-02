<template>
  <web-view v-if="src" :src="src" style="height: 100%; width: 100%"></web-view>
</template>

<script>
export default {
  data() {
    return {
      src: "",
    };
  },
  onLoad(options) {
    if (options.src) {
      this.src = options.src;
    }
    uni.setNavigationBarTitle({
      title: options.title || "",
    });
  },
};
</script>

<style></style>
