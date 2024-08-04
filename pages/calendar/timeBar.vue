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
      'background-color': e.mainColor,
    }"
  >
    <view
      class="event-image right-radius"
      :class="{ 'left-radius': firstDayBeforeStartTime(e) }"
      :style="{
        'background-image': `linear-gradient(90deg,transparent,${e.mainColor}), url(${e.img})`,
        width: imgWidth + 'px',
      }"
    ></view>
    <view
      v-if="getRemainTime(e) > 0"
      class="event-remain"
      :style="{ 'background-color': e.mainColor }"
    >
      <u-icon
        name="clock"
        color="white"
        size="12"
        style="margin-right: 3px"
      ></u-icon>
      <count-down :time="getRemainTime(e)"></count-down>
    </view>
    <canvas :canvas-id="'img' + e.id" style="visibility: hidden"></canvas>
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
import CountDown from "@/components/countDown";
export default {
  components: { CountDown },
  props: ["e", "screenWidth"],
  data() {
    return {
      barHeight: 40,
      firstDay: dayjs().add(-1, "day").startOf("day"),
      lastDay: dayjs().add(6, "day").startOf("day"),
      imgWidth: 0,
    };
  },
  computed: {
    widthPerHour() {
      return this.screenWidth / 7 / 24;
    },
  },
  mounted() {
    if (this.e.img) {
      uni.getImageInfo({
        src: this.e.img,
        success: (res) => {
          this.imgWidth = (this.barHeight / res.height) * res.width;
        },
      });
    }
  },
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
      return width;
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
    getRemainTime(event) {
      const date1 = dayjs();
      const date2 = dayjs(event.endTime);
      return date2.diff(date1);
    },
  },
};
</script>

<style scoped lang="scss">
$bar-height: 40px;
.time-bar {
  width: 100px;
  height: $bar-height;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  margin-right: 10px;
  display: flex;
  text-shadow: 1px 1px 2px black;
  top: -10px;
  background: white;
  border-radius: 10px;
  padding: 2px 5px;
  font-size: 12px;
}
.left-radius {
  border-top-left-radius: $bar-height / 2;
  border-bottom-left-radius: $bar-height / 2;
}
.right-radius {
  border-top-right-radius: $bar-height / 2;
  border-bottom-right-radius: $bar-height / 2;
}
.color1 {
  background: linear-gradient(to right, #bacfe4, #9acfff);
}
.color2 {
  background: linear-gradient(to right, #8085df, #959dfa);
}
.color3 {
  background: linear-gradient(to right, #84d6cf, #88e0d7);
}
</style>
