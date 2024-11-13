<template>
  <view>
    <uni-nav-bar
      :fixed="true"
      shadow
      :border="false"
      background-color="#F8F8F8"
      color="black"
      status-bar
      title="活动日历设置"
      left-icon="left"
      @clickLeft="back"
    />
  </view>
</template>

<script>
export default {
  methods: {
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style></style>
