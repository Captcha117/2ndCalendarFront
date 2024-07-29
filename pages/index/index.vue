<template>
  <view class="calendar-page">
    <view class="background">
      <view
        class="split-line"
        v-for="i in 6"
        :style="{
          left: 14.285714285714 * i + '%',
        }"
      >
      </view>
    </view>
    <uni-row class="week">
      <!-- <uni-col :span="3">1</uni-col> -->
      <view class="date" v-for="i in 7">
        <view>{{ addDays(i - 2) }}</view>
        <view>{{ getDay(i - 2) }}</view>
      </view>
    </uni-row>
    <view class="events">
      <uni-row v-for="e in eventList" class="event-row">
        <view style="width: 100%">
          <view
            class="time-bar"
            :class="e.color"
            :style="{
              width: getEventWidth(e) + 'px',
              left: getStartTimeOffset(e) + 'px',
            }"
          ></view>
        </view>
      </uni-row>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      firstDay: dayjs().add(-1, "day").startOf("day"),
      screenWidth: 0,
      eventList: Array(20).fill({
        name: 123,
        startTime: "2024-7-27 04:00",
        endTime: "2024-7-31 04:00",
        color: "color1",
      }),

      days: ["日", "一", "二", "三", "四", "五", "六"],
    };
  },
  onLoad() {
    uni.getSystemInfo({
      success: res => {
        this.screenWidth = res.screenWidth;
      },
    });
  },
  computed: {
    widthPerHour() {
      return this.screenWidth / 7 / 24;
    },
  },
  methods: {
    addDays(offset) {
      return dayjs().add(offset, "day").format("D");
    },
    getDay(offset) {
      return this.days[dayjs().add(offset, "day").day()];
    },
    getEventWidth(event) {
      if (!event.startTime || !event.endTime) {
        return 0;
      }
      const date1 = dayjs(event.startTime);
      const date2 = dayjs(event.endTime);
      let diff = date2.diff(date1); // 毫秒
      let width = (diff / 1000 / 60 / 60) * this.widthPerHour;
      return width;
    },
    getStartTimeOffset(event) {
      if (!event.startTime) {
        return 0;
      }
      const date1 = dayjs().add(-1, "day").startOf("day");
      const date2 = dayjs(event.startTime);
      let diff = date2.diff(date1); // 毫秒
      let offset = (diff / 1000 / 60 / 60) * this.widthPerHour;
      return offset;
    },
  },
};
</script>

<style scoped>
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
  top: 44px;
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
  height: 40px;
  display: flex;
  align-items: center;
}
.time-bar {
  width: 100px;
  height: 20px;
  border-radius: 10px;
  position: relative;
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
