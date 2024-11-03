<template>
  <view class="calendar-page">
    <view class="background">
      <view class="blank"></view>
      <view class="date" v-for="i in 7" :key="'date' + i"> </view>
    </view>
    <view class="week">
      <view class="blank"></view>
      <view class="date" v-for="i in 7" :key="'date' + i">
        <view>{{ addDays(i - 2) }}</view>
        <view>{{ getDay(i - 2) }}</view>
      </view>
    </view>
    <view class="event">
      <view class="img-list">
        <view
          v-for="(e, i) in eventList"
          class="img-item"
          :key="'event' + i"
          :style="{
            'background-image': ` url(${e.img}`,
          }"
        >
        </view>
      </view>
      <view class="event-list">
        <view
          v-for="(e, i) in eventList"
          class="event-row"
          :key="'event' + i"
          @click="clickEvent(e)"
        >
          <time-bar :e="e" :screenWidth="screenWidth"></time-bar>
          <view class="event-text">
            <view class="event-name">{{ e.name }}</view>
            <view class="event-reward">
              <view class="event-reward-item" v-for="r in e.reward">
                <reward-icon :name="r.name"></reward-icon>
                <text>{{ r.count }}</text>
              </view>
            </view>
          </view>
          <view class="remain-time" v-if="getRemainTime(e) > 0">
            <u-icon
              name="clock"
              color="white"
              size="12"
              style="margin-right: 3px"
            ></u-icon>
            <count-down :time="getRemainTime(e)"></count-down>
          </view>
        </view>
      </view>
    </view>
    <uni-popup ref="popup" background-color="#fff" type="bottom">
      <event-detail :event="currentEvent"></event-detail>
    </uni-popup>
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
import TimeBar from "./timeBar.vue";
import CountDown from "@/components/countDown";
import eventList from "./event.js";
import eventDetail from "./event-detail.vue";
export default {
  components: { TimeBar, CountDown, eventDetail },
  data() {
    return {
      firstDay: dayjs().add(-1, "day").startOf("day"),
      lastDay: dayjs().add(6, "day").startOf("day"),
      screenWidth: 0,
      eventList: eventList,
      days: ["日", "一", "二", "三", "四", "五", "六"],
      currentEvent: {},
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
    getRemainTime(event) {
      const date1 = dayjs();
      const date2 = dayjs(event.endTime);
      return date2.diff(date1);
    },
    clickEvent(e) {
      console.log(e);
      this.currentEvent = e;
      this.$refs.popup.open();
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
  display: flex;
}
.week {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  height: 60px;
}
.blank {
  width: 80px;
  background: white;
}
.date {
  box-sizing: border-box;
  border: 0.5px solid #e5e5e5;
  background-color: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.split-line {
  height: 100%;
  width: 1px;
  background-color: #e5e5e5;
  position: absolute;
}
.event {
  display: flex;
  margin-top: 60px;
}
.img-list {
  width: 80px;
  flex-shrink: 0;
  z-index: 1;
}
.img-item {
  height: 60px;
  border: 0.5px solid #e5e5e5;
  border-left-width: 0px;
  background-size: auto 60px;
  background-repeat: no-repeat;
  background-position: left;
}
.event-list {
  flex: 1;
}

.event-row {
  position: relative;
  text-shadow: 1px 1px 2px black;
  color: white;
  height: 60px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.event-text {
  z-index: 10;
  margin-left: 10px;
  // position: absolute;
}
.event-name {
}
.event-reward {
  font-size: 12px;
}
.event-reward-item {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
}
.remain-time {
  margin-right: 10px;
  display: flex;
  align-items: center;
  z-index: 10;
}
</style>
