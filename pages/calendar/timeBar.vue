<template>
  <view
    class="time-bar"
    :class="[
      {
        'left-radius': firstDayBeforeStartTime(e),
        'right-radius': endTimeBeforeLastDay(e),
      },
    ]"
    :style="{
      width: getEventWidth(e) + 'px',
      left: getStartTimeOffset(e) + 'px',
      background: colorMap[e.gameId],
    }"
  >
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
import CountDown from "@/components/countDown";
import { mapGetters } from "vuex";
export default {
  components: { CountDown },
  props: ["e", "screenWidth", "colorMap"],
  data() {
    return {
      widthPerHour: (this.screenWidth - 80) / 7 / 24,
      barHeight: 40,
      firstDay: dayjs().add(-1, "day").startOf("day"),
      lastDay: dayjs().add(13, "day").startOf("day"),
    };
  },
  mounted() {},
  methods: {
    // 事件长度
    getEventWidth(event) {
      if (!event.startTime || !event.endTime) {
        return 0;
      }
      const date1 = dayjs(event.graphStartTime);
      const date2 = dayjs(event.graphEndTime);
      let diff = date2.diff(date1); // 毫秒
      let width = (diff / 1000 / 60 / 60) * this.widthPerHour;
      return Math.max(width, 0);
    },
    // 开始时间偏移
    getStartTimeOffset(event) {
      if (!event.startTime) {
        return 0;
      }
      const date1 = dayjs().add(-1, "day").startOf("day");
      const date2 = dayjs(event.graphStartTime);
      let diff = date2.diff(date1); // 毫秒
      let offset = (diff / 1000 / 60 / 60) * this.widthPerHour;
      return offset;
    },
    firstDayBeforeStartTime(event) {
      return dayjs(this.firstDay).isBefore(event.startTime);
    },
    endTimeBeforeLastDay(event) {
      return dayjs(event.endTime).isBefore(this.lastDay);
    },
  },
};
</script>

<style scoped lang="scss">
$bar-height: 80rpx;
.time-bar {
  width: 200rpx;
  height: $bar-height;
  position: absolute;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
}
.event-image {
  height: $bar-height;
  width: 0;
  background-size: auto $bar-height;
  background-repeat: no-repeat;
  // position: absolute;
}
.event-remain {
  position: absolute;
  right: 0;
  color: white;
  z-index: 10;
  margin-right: 20rpx;
  display: flex;
  text-shadow: 2rpx 2rpx 4rpx black;
  top: -20rpx;
  background: white;
  border-radius: 20rpx;
  padding: 4rpx 10rpx;
  font-size: 14rpx;
}
.left-radius {
  border-top-left-radius: 8rpx;
  border-bottom-left-radius: 8rpx;
}
.right-radius {
  border-top-right-radius: 8rpx;
  border-bottom-right-radius: 8rpx;
}
// .color1 {
//   background: linear-gradient(to right, #5597d8, #9acfff);
// }
// .color2 {
//   background: linear-gradient(to right, #8085df, #959dfa);
// }
// .color3 {
//   background: linear-gradient(to right, #84d6cf, #88e0d7);
// }
</style>
