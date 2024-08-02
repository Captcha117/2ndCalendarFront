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
      'background-color': mainColor,
    }"
  >
    <view
      class="event-image"
      :class="{ 'left-radius': firstDayBeforeStartTime(e) }"
      :style="{
        'background-image': `linear-gradient(90deg,transparent,${mainColor}), url(${e.img})`,
        width: imgWidth + 'px',
      }"
    ></view>
    <view class="event-name">{{ e.name }}</view>
    <view class="event-remain">
      <text>剩余</text>
      <count-down :time="getRemainTime(e)"></count-down>
    </view>
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
import CountDown from "@/components/countDown";
import { getImageColor } from "@/utils/mainColor";
export default {
  components: { CountDown },
  props: ["e", "screenWidth"],
  data() {
    return {
      barHeight: 40,
      firstDay: dayjs().add(-1, "day").startOf("day"),
      lastDay: dayjs().add(6, "day").startOf("day"),
      imgWidth: 0,
      mainColor: "#ffffff",
    };
  },
  computed: {
    widthPerHour() {
      return this.screenWidth / 7 / 24;
    },
  },
  mounted() {
    if (this.e.img) {
      let img = new Image();
      img.src = this.e.img;
      img.crossOrigin = "anonymous";
      img.addEventListener("load", () => {
        try {
          this.mainColor = getImageColor(img);
          console.log(this.mainColor);
        } catch (error) {
          this.mainColor = "#ffffff";
        }
        try {
          let { height, width } = img;
          this.imgWidth = (this.barHeight / height) * width;
        } catch (error) {
          this.imgWidth = 0;
        }
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
  position: absolute;
}
.event-name {
  color: white;
  z-index: 10;
  margin-left: 10px;
}
.event-remain {
  color: white;
  z-index: 10;
  margin-right: 10px;
  display: flex;
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
