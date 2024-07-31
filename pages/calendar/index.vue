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
          <view
            class="time-bar"
            :class="[
              'color' + e.gameId,
              {
                'left-radius': firstDayBeforeStartTime(e),
                'right-radius': endTimeBeforeLastDay(e),
              },
            ]"
            :style="{
              width: getEventWidth(e) + 'px',
              left: getStartTimeOffset(e) + 'px',
            }"
          >
            <!-- <u--image
              shape="circle"
              src="/static/game/ys.png"
              width="40px"
              height="40px"
            ></u--image> -->
            <view
              class="event-image"
              :class="{ 'left-radius': firstDayBeforeStartTime(e) }"
              :style="{
                'background-image': `linear-gradient(90deg,transparent,#bacfe4), url(${e.img})`,
              }"
            ></view>
            <view class="event-name">{{ e.name }}</view>
            <view class="event-remain">
              <text>剩余</text>
              <count-down :time="getRemainTime(e)"></count-down>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
import CountDown from "@/components/countDown";
export default {
  components: { CountDown },
  data() {
    return {
      title: "Hello",
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
.time-bar {
  width: 100px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.event-image {
  height: 40px;
  width: 86px;
  background-size: auto 40px;
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
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.right-radius {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
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
