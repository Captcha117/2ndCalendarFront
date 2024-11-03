<template>
  <view class="popup-content" :style="{ height: height * 0.6 + 'px' }">
    <view class="event-name">{{ event.name }}</view>
    <view></view>
    <view
      class="event-image"
      :style="{
        'background-image': ` url(${event.img}`,
      }"
    >
    </view>
  </view>
</template>

<script>
export default {
  props: ["event"],
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    uni.getSystemInfo({
      success: (res) => {
        this.height = res.windowHeight;
      },
    });
  },
};
</script>

<style scoped lang="scss">
.popup-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  // height: 400px;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
}
.event-name {
  font-weight: bold;
}
.event-image {
  height: 160px;
  width: 100%;
  background-position: center;
  background-size: cover;
  margin: 10px 0;
}
</style>
