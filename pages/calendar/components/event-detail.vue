<template>
  <view class="popup-content" :style="{ height: height * 0.6 + 'px' }">
    <view class="event-name">
      <view> {{ event.name }}</view>
      <event-status
        class="event-status"
        :event="event"
        color="black"
      ></event-status>
    </view>
    <view class="event-time">
      {{ event.startTime }} - {{ event.endTime }}
    </view>
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
import EventStatus from "./event-status.vue";
export default {
  props: ["event"],
  components: { EventStatus },
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}
.event-time {
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
}
.event-image {
  height: 160px;
  width: 100%;
  background-position: center;
  background-size: cover;
  margin: 10px 0;
}
</style>
