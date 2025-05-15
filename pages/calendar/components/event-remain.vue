<template>
  <view
    class="event-remain"
    :class="className"
    v-if="event.startTime && getStartTimeRemain() > 0"
  >
    <u-icon
      name="hourglass"
      :color="color || statusColor || 'white'"
      size="14"
    ></u-icon>
    <count-down
      style="margin-left: 10rpx"
      :time="getStartTimeRemain()"
      :color="color || statusColor"
    ></count-down>
    <text style="margin-left: 10rpx">后开始</text>
  </view>
  <view
    class="event-remain"
    :class="className"
    v-else-if="event.endTime && getEndTimeRemain() > 0"
  >
    <u-icon
      name="clock"
      :color="color || statusColor || 'white'"
      size="12"
    ></u-icon>
    <count-down
      style="margin-left: 10rpx"
      :time="getEndTimeRemain()"
      :color="color || statusColor"
    ></count-down>
  </view>
  <view class="event-remain" :class="className" v-else-if="!event.endTime">
    <u-icon
      name="clock"
      :color="color || statusColor || 'white'"
      size="12"
    ></u-icon>
    <text style="margin-left: 10rpx">∞</text>
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
import CountDown from "@/components/countDown";
export default {
  props: ["event", "color"],
  components: { CountDown },
  computed: {
    // 距离结束时间剩余
    getEndTimeRemain() {
      return () => {
        const date1 = dayjs();
        const date2 = dayjs(this.event.endTime);
        return date2.diff(date1);
      };
    },
    // 距离开始时间剩余
    getStartTimeRemain() {
      return () => {
        const date1 = dayjs();
        const date2 = dayjs(this.event.startTime);
        return date2.diff(date1);
      };
    },
    getRemainDay() {
      return parseInt(this.getEndTimeRemain() / 1000 / 60 / 60 / 24);
    },
    className() {
      if (this.getRemainDay <= 3) {
        return "danger";
      } else if (this.getRemainDay <= 7) {
        return "warning";
      } else {
        return "";
      }
    },
    statusColor() {
      let map = { danger: "#ff6155", warning: "#ffb806" };
      return map[this.className] || "#bcb5af";
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.event-remain {
  display: flex;
  align-items: center;
  height: 48rpx;
  line-height: 48rpx;
  font-size: 24rpx;
  padding: 0 14rpx;
  border-radius: 6rpx;
  background: #ffffffe6;
  color: #bcb5af;
  border: 2rpx solid #bcb5af;
  &.danger {
    color: #ff6155;
    border: 2rpx solid #ff6155;
  }
  &.warning {
    color: #ffb806;
    border: 2rpx solid #ffb806;
  }
}
</style>
