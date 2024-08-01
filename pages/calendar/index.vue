<template>
  <view class="calendar-page">
    <view class="background">
      <view
        class="split-line"
        v-for="i in 6"
        :key="'line' + i"
        :style="{
          left: 14.285714285714 * i + '%',
        }"
      >
      </view>
    </view>
    <view class="week">
      <view class="date" v-for="i in 7" :key="'date' + i">
        <view>{{ addDays(i - 2) }}</view>
        <view>{{ getDay(i - 2) }}</view>
      </view>
    </view>
    <view class="events">
      <view v-for="(e, i) in eventList" class="event-row" :key="'event' + i">
        <view style="width: 100%">
          <time-bar :e="e" :screenWidth="screenWidth"></time-bar>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
import TimeBar from "./timeBar.vue";
export default {
  components: { TimeBar },
  data() {
    return {
      firstDay: dayjs().add(-1, "day").startOf("day"),
      lastDay: dayjs().add(6, "day").startOf("day"),
      screenWidth: 0,
      eventList: [
        {
          name: "画外旅照·浮露之章",
          startTime: "2024/07/29 10:00",
          endTime: "2024/08/08 03:59",
          gameId: "1",
          img: "https://upload-bbs.miyoushe.com/upload/2024/07/26/75276539/2250a5ca44dacacf56d7b9b59c5cbe3f_147733397602620236.jpg",
        },
      ],
      days: ["日", "一", "二", "三", "四", "五", "六"],
    };
  },
  onLoad() {
    uni.getSystemInfo({
      success: (res) => {
        this.screenWidth = res.screenWidth;
      },
    });
    this.eventList.forEach((e) => {
      e.graphStartTime = Math.max(
        +new Date(this.firstDay),
        +new Date(e.startTime)
      );
      e.graphEndTime = Math.min(+new Date(this.lastDay), +new Date(e.endTime));
    });
  },
  methods: {
    addDays(offset) {
      return dayjs().add(offset, "day").format("D");
    },
    getDay(offset) {
      return this.days[dayjs().add(offset, "day").day()];
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-page {
  /* display: flex;
  flex-direction: column; */
}
.background {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: white;
}
.week {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}
.date {
  width: 14.285714285714%;
  float: left;
  box-sizing: border-box;
  text-align: center;
  border: 0.5px solid #e5e5e5;
  padding: 5px 0;
  line-height: 20px;
  background-color: white;
}
.split-line {
  height: 100%;
  width: 1px;
  background-color: #e5e5e5;
  position: absolute;
}
.events {
  margin-top: 60px;
  flex: 1;
}
.event-row {
  height: 60px;
  display: flex;
  align-items: center;
}
</style>
