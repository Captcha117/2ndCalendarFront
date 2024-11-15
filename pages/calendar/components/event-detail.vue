<template>
  <view class="popup-content" :style="{ height: height * 0.6 + 'px' }">
    <view class="event-name">
      <view> {{ event.name }}</view>
    </view>
    <view class="event-time">
      <view>{{ event.startTime }} - {{ event.endTime }}</view>
      <event-remain :event="event"></event-remain>
    </view>
    <view class="event-execution">
      <event-reward :event="event" size="14"></event-reward>
      <event-status :event="event" enabled></event-status>
    </view>
    <image class="event-image" :src="event.img" mode="widthFix"></image>
  </view>
</template>

<script>
import EventRemain from "./event-remain.vue";
import EventReward from "./event-reward.vue";
import EventStatus from "./event-status.vue";
export default {
  props: ["event"],
  components: { EventRemain, EventStatus, EventReward },
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  line-height: 22px;
  margin: 10px 0;
  color: rgba(0, 0, 0, 0.85);
}
.event-execution {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.event-image {
  width: 100%;
  margin: 10px 0;
}
</style>
