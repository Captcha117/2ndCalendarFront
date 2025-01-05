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
      <view
        class="date"
        v-for="i in 7"
        :key="'date' + i"
        :style="{ 'background-color': i == 2 ? '#eeeeee' : '#f5f7fa' }"
      >
      </view>
    </view>
    <view class="week">
      <view class="blank"></view>
      <view
        class="date"
        v-for="i in 7"
        :key="'date' + i"
        :style="{ 'background-color': i == 2 ? '#eeeeee' : 'white' }"
      >
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
        >
          <u-image
            :src="e.imgUrl"
            mode="scaleToFill"
            width="100%"
            height="80rpx"
          ></u-image>
          <view
            class="img-cover"
            :style="{
              background: `linear-gradient(to right, transparent, ${
                colorMap[e.gameId]
              })`,
            }"
          ></view>
        </view>
      </view>
      <view class="event-list">
        <view
          v-for="(e, i) in showList"
          class="event-row"
          :key="'event' + i"
          @click="clickEvent(e)"
        >
          <time-bar
            :e="e"
            :screenWidth="screenWidth"
            :colorMap="colorMap"
          ></time-bar>
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
    <u-popup :show="showDetail" @close="maskClick" round="10">
      <event-detail :event="currentEvent"></event-detail>
    </u-popup>
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
import TimeBar from "./timeBar.vue";
import events from "./event.js";
import EventDetail from "./components/event-detail.vue";
import EventRemain from "./components/event-remain.vue";
import EventStatus from "./components/event-status.vue";
import EventReward from "./components/event-reward.vue";
import { mapGetters } from "vuex";
import { getEventList, getGameList } from "./api";
export default {
  components: { TimeBar, EventDetail, EventRemain, EventStatus, EventReward },
  data() {
    return {
      loading: false,

      firstDay: dayjs().add(-1, "day").startOf("day"),
      lastDay: dayjs().add(6, "day").startOf("day"),
      screenWidth: 0,
      eventList: [],
      days: ["日", "一", "二", "三", "四", "五", "六"],
      currentEvent: {},

      showDetail: false,
    };
  },
  onLoad() {
    uni.getSystemInfo({
      success: (res) => {
        let rpx = res.screenWidth / (uni.upx2px(100) / 100);
        this.screenWidth = rpx;
      },
    });
    this.refresh();
  },
  computed: {
    ...mapGetters(["doneList", "settings", "gameList"]),
    showList() {
      let { prop, order, status, done } = this.settings;
      let list = this.eventList.filter(
        (x) => status.includes(x.status) && done.includes(x.done)
      );
      if (prop == "status") {
        list.sort((a, b) => {
          // 已结束排最后
          if (a.status == 2) {
            return 1;
          }
          if (b.status == 2) {
            return -1;
          }
          // 未结束中，已完成排最后
          if (a.done !== b.done) {
            return a.done - b.done;
          }
          // 否则按照结束时间排序
          return new Date(a.endTime) - new Date(b.endTime);
        });
      } else if (prop == "game") {
        // 按游戏排序
        list.sort((a, b) => {
          if (a.gameId !== b.gameId) {
            return Number(a.gameId) - Number(b.gameId);
          } else {
            return new Date(a.endTime) - new Date(b.endTime);
          }
        });
      } else {
        list.sort((a, b) => {
          return new Date(a[prop]) - new Date(b[prop]);
        });
      }
      if (order === "desc") {
        list.reverse();
      }
      return list;
    },
    colorMap() {
      let r = {};
      this.gameList.forEach((g) => {
        r[g.id] = g.color;
      });
      return r;
    },
  },
  onShow() {
    this.refresh();
  },
  mounted() {
    this.$store.dispatch("sys/getGameList").then((_) => {
      this.refresh();
    });
  },
  methods: {
    // 刷新
    refresh() {
      if (this.loading) return;
      this.$store.dispatch("user/getDoneList");
      this.$store.dispatch("user/getSettings");
      this.getEventList();
    },
    // 获取事件列表
    getEventList() {
      this.loading = true;
      getEventList(this.settings.games)
        .then((_) => {
          this.eventList = _.data || [];
          this.handleData();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 预处理数据
    handleData() {
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
    addDays(offset) {
      return dayjs().add(offset, "day").format("D");
    },
    getDay(offset) {
      return this.days[dayjs().add(offset, "day").day()];
    },
    clickEvent(e) {
      this.currentEvent = e;
      this.showDetail = true;
    },
    maskClick() {
      this.showDetail = false;
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
  background-color: #f5f7fa;
  display: flex;
}
.week {
  position: fixed;
  top: 44px + var(--status-bar-height);
  width: 100%;
  display: flex;
  height: 120rpx;
  z-index: 11;
}
.blank {
  width: 160rpx;
  background: white;
  border: 1rpx solid #e5e5e5;
  border-width: 0 1rpx 1rpx 0;
}
.date {
  box-sizing: border-box;
  border: 1rpx solid #e5e5e5;
  border-width: 1rpx 1rpx 1rpx 0;
  background-color: #f5f7fa;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.split-line {
  height: 100%;
  width: 2rpx;
  background-color: #e5e5e5;
  position: absolute;
}
.event {
  display: flex;
  margin-top: 120rpx;
}
.img-list {
  width: 160rpx;
  flex-shrink: 0;
  z-index: 1;
}
.img-item {
  height: 80rpx;
  // border: 1rpx solid #e5e5e5;
  border-left-width: 0;
  background-size: auto 120rpx;
  background-repeat: no-repeat;
  background-position: left;
  margin-top: 20rpx;
  position: relative;
}
.img-cover {
  width: 50%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
}
.event-list {
  flex: 1;
}

.event-row {
  position: relative;
  color: white;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // padding: 0 20rpx;
  font-size: 28rpx;
  margin-top: 20rpx;
}
.event-text {
  // z-index: 10;
  margin-left: 20rpx;
  color: rgba(0, 0, 0, 0.85);
  // text-shadow: 0 0 8rpx black;
  // position: absolute;
}
.event-name {
  font-size: 28rpx;
  font-weight: bold;
}
.event-remain {
  z-index: 10;
  margin-right: 20rpx;
}
.event-status {
  z-index: 10;
  margin-right: 20rpx;
}
</style>
