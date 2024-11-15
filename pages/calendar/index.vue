<template>
  <view class="calendar-page">
    <uni-nav-bar
      :fixed="true"
      shadow
      :border="false"
      background-color="#F8F8F8"
      color="black"
      status-bar
      right-icon="settings"
      title="活动日历"
      @clickRight="toSettings"
    />
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
          v-for="(e, i) in showList"
          class="img-item"
          :key="'event' + i"
          @click="clickEvent(e)"
          :style="{
            'background-image': ` url(${e.img}`,
          }"
        >
        </view>
      </view>
      <view class="event-list">
        <view
          v-for="(e, i) in showList"
          class="event-row"
          :key="'event' + i"
          @click="clickEvent(e)"
        >
          <time-bar :e="e" :screenWidth="screenWidth"></time-bar>
          <view class="event-text">
            <view class="event-name">{{ e.name }}</view>
            <event-reward :event="e"></event-reward>
          </view>
          <event-status
            v-if="e.done || e.status != 1"
            class="event-status"
            :event="e"
          ></event-status>
          <event-remain v-else class="event-remain" :event="e"> </event-remain>
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
import eventList from "./event.js";
import EventDetail from "./components/event-detail.vue";
import EventRemain from "./components/event-remain.vue";
import EventStatus from "./components/event-status.vue";
import EventReward from "./components/event-reward.vue";
import { mapGetters } from "vuex";
export default {
  components: { TimeBar, EventDetail, EventRemain, EventStatus, EventReward },
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
    this.$store.dispatch("user/getDoneList");
    this.$store.dispatch("user/getSettings");

    this.eventList.forEach((e, i) => {
      this.$set(
        e,
        "graphStartTime",
        Math.max(+new Date(this.firstDay), +new Date(e.startTime))
      );
      this.$set(
        e,
        "graphEndTime",
        Math.min(+new Date(this.lastDay), +new Date(e.endTime))
      );
      this.$set(e, "done", this.doneList.includes(e.id));
      this.getEventStatus(e);
    });
  },
  computed: {
    ...mapGetters(["doneList", "settings"]),
    showList() {
      let list = this.eventList.sort((a, b) => {
        if (a.done !== b.done) {
          return Number(a.done) - Number(b.done);
        } else {
          return new Date(a.endTime) - new Date(b.endTime);
        }
      });
      return list;
    },
  },
  methods: {
    addDays(offset) {
      return dayjs().add(offset, "day").format("D");
    },
    getDay(offset) {
      return this.days[dayjs().add(offset, "day").day()];
    },
    clickEvent(e) {
      this.currentEvent = e;
      this.$refs.popup.open();
    },
    getEventStatus(e) {
      const date1 = dayjs(e.startTime);
      const date2 = dayjs();
      let eventStartLeft = date2.diff(date1);
      if (eventStartLeft < 0) {
        this.$set(e, "status", 0); // 未开始
        return;
      }

      const date3 = dayjs(e.endTime);
      let eventEndLeft = date3.diff(date2);
      if (eventEndLeft >= 0) {
        this.$set(e, "status", 1); // 进行中
      } else {
        this.$set(e, "status", 2); // 已结束
      }
    },
    toSettings() {
      uni.navigateTo({ url: "settings" });
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
  top: 44px + var(--status-bar-height);
  width: 100%;
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
  color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 14px;
}
.event-text {
  z-index: 10;
  text-shadow: 0px 0px 4px black;
  // position: absolute;
}
.event-name {
}
.event-remain {
  font-size: 14px;
  z-index: 10;
}
.event-status {
  z-index: 10;
}
</style>
