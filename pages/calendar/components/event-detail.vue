<template>
  <view class="popup-content" :style="{ height: height * 0.6 + 'px' }">
    <view class="event-basic">
      <view class="event-name">
        <view> {{ event.name }}</view>
      </view>
      <view class="event-time">
        <view>{{ dateStr }}</view>
        <!-- <view>{{ event.startTime }} - {{ event.endTime }}</view> -->
        <event-remain :event="event"></event-remain>
      </view>
      <view class="event-execution">
        <event-reward :event="event" size="14"></event-reward>
        <event-status :event="event" enabled></event-status>
      </view>
    </view>
    <view class="event-scroll">
      <image class="event-image" :src="event.imgUrl" mode="widthFix"></image>
      <view class="event-desc">{{ event.description }}</view>
    </view>
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
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
  computed: {
    dateStr() {
      return (
        dayjs(this.event.startTime).format("MM-DD HH:mm") +
        " ~ " +
        dayjs(this.event.endTime).format("MM-DD HH:mm")
      );
    },
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
  padding: 30rpx;
  // height: 400px;
  background-color: #fff;
  border-radius: 40rpx 40rpx 0 0;
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
  font-size: 28rpx;
  line-height: 44rpx;
  margin: 20rpx 0;
  color: rgba(0, 0, 0, 0.85);
}
.event-execution {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.event-image {
  width: 100%;
  margin: 20rpx 0;
}
.event-desc {
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 26rpx;
  line-height: 1.6;
}

.event-basic {
  flex-shrink: 0;
  margin-bottom: 20rpx;
}
.event-scroll {
  flex: 1;
  overflow: auto;
}
</style>
