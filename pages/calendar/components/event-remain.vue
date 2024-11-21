<template>
  <view class="event-remain" :class="className" v-if="getRemainTime() > 0">
    <u-icon
      name="clock"
      :color="color || statusColor || 'white'"
      size="12"
      style="margin-right: 10rpx"
    ></u-icon>
    <count-down
      :time="getRemainTime()"
      :color="color || statusColor"
    ></count-down>
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
import CountDown from "@/components/countDown";
export default {
  props: ["event", "color"],
  components: { CountDown },
  computed: {
    getRemainTime() {
      return () => {
        const date1 = dayjs();
        const date2 = dayjs(this.event.endTime);
        return date2.diff(date1);
      };
    },
    getRemainDay() {
      return parseInt(this.getRemainTime() / 1000 / 60 / 60 / 24);
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
  border-radius: 8rpx;
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
