<template>
  <page-meta
    :page-style="'overflow:' + (showDetail ? 'hidden' : 'visible')"
  ></page-meta>
  <uni-nav-bar
    :fixed="true"
    shadow
    :border="false"
    background-color="#F8F8F8"
    color="black"
    status-bar
    title="我的日历"
  />
  <view class="calendar-page">
    <view class="background" v-if="showList.length">
      <view
        class="date"
        v-for="i in weekArray"
        :key="i"
        :style="{ 'background-color': i == 0 ? '#eeeeee' : '#f5f7fa' }"
      >
      </view>
    </view>
    <view class="week">
      <view
        class="date"
        v-for="i in weekArray"
        :key="-i"
        :style="{ 'background-color': i == 0 ? '#eeeeee' : 'white' }"
      >
        <view>{{ addDays(i) }}</view>
        <view>{{ getDay(i) }}</view>
      </view>
    </view>
    <my-scroll-view
      ref="scroll"
      style="position: relative; top: 120rpx"
      @doRefresh="refresh"
      :height="'100%'"
      @upSlide="opacity = 0.2"
      @downSlide="opacity = 1"
    >
      <view class="event">
        <view class="event-list">
          <view
            v-for="(e, i) in showList"
            class="event-row"
            :key="e.id"
            @click="clickEvent(e)"
          >
            <time-bar
              :e="e"
              :screenWidth="screenWidth"
              :colorMap="colorMap"
              :showImg="false"
              :firstDay="firstDay"
              :displayDays="displayDays"
            ></time-bar>
            <view class="event-text">
              <view class="event-name">{{ e.name }}</view>
            </view>
            <event-status
              v-if="e.done"
              class="event-status"
              :event="e"
            ></event-status>
            <event-remain v-else class="event-remain" :event="e">
            </event-remain>
          </view>
          <!-- #ifdef MP-WEIXIN -->
          <view class="event-row"></view>
          <!-- #endif -->
        </view>
      </view>
      <div v-if="showList.length == 0" style="margin-top: 120rpx">
        <u-empty mode="search" :text="emptyText"> </u-empty>
      </div>
    </my-scroll-view>
    <u-popup v-if="showDetail" :show="showDetail" @close="maskClick" round="10">
      <event-detail
        :event="currentEvent"
        @changeStatus="changeStatus"
      ></event-detail>
    </u-popup>
    <view
      class="corner-button tool-button"
      :style="{ opacity: showList.length == 0 ? 1 : opacity }"
      @click="toAdd"
    >
      <u-icon name="plus" color="white" size="24"></u-icon>
    </view>
    <my-tab-bar :index="1" />
  </view>
</template>

<script>
import { getToken } from "@/utils/auth";
import dayjs from "@/utils/dayjs";
import TimeBar from "../calendar/timeBar.vue";
import EventDetail from "./components/custom-detail.vue";
import EventRemain from "../calendar/components/event-remain.vue";
import EventStatus from "../calendar/components/event-status.vue";
import EventReward from "../calendar/components/event-reward.vue";
import MyTabBar from "@/components/myTabBar/index.vue";
import MyScrollView from "@/components/myScrollView/index.vue";
import { mapGetters } from "vuex";
import { getCustomList } from "./api";
export default {
  components: {
    TimeBar,
    EventDetail,
    EventRemain,
    EventStatus,
    EventReward,
    MyTabBar,
    MyScrollView,
  },
  data() {
    return {
      loading: false,

      firstDay: dayjs().add(-1, "day").startOf("day"),
      displayDays: 7,

      screenWidth: 0,
      screenHeight: 0,
      customList: [],
      days: ["日", "一", "二", "三", "四", "五", "六"],
      currentEvent: {},

      showDetail: false,
      opacity: 1,
    };
  },
  onLoad() {
    uni.getSystemInfo({
      success: (res) => {
        // console.log(res);
        let rpxWidth = res.windowWidth / (uni.upx2px(100) / 100);
        let rpxHeight = res.windowHeight / (uni.upx2px(100) / 100);
        this.screenWidth = rpxWidth;
        this.screenHeight = rpxHeight;
      },
    });
  },
  onShow() {
    let forceRefresh = uni.getStorageSync("refresh");
    if (forceRefresh) {
      uni.setStorageSync("refresh", false);
      this.startPullDownRefresh();
    }
    this.handleData();
  },
  computed: {
    ...mapGetters(["settings", "doneList"]),
    // 顶部日期数组
    weekArray() {
      return new Array(this.displayDays)
        .fill(1)
        .map((x, i) => i + this.daysDiff);
    },
    // 最后一天
    lastDay() {
      return this.firstDay.add(this.displayDays, "day").startOf("day");
    },
    // 第一天与今天的相差的天数
    daysDiff() {
      return this.firstDay.diff(dayjs(), "day");
    },
    showList() {
      // let { prop, order, status, done } = this.settings;
      // let list = this.customList.filter(
      //   (x) =>
      //     (status || []).includes(x.status) && (done || []).includes(x.done)
      // );
      // if (prop == "status") {
      //   list.sort((a, b) => {
      //     // 定义每个状态的优先级
      //     const priority = {
      //       "1-false": 0, // 未完成进行中
      //       "0-false": 1, // 未开始
      //       "1-true": 2, // 已完成（进行中且完成）
      //       "2-true": 2, // 已完成（已结束且完成）
      //       "2-false": 3, // 已结束
      //     };
      //     // 根据status和done生成排序键
      //     const keyA = `${a.status}-${a.done}`;
      //     const keyB = `${b.status}-${b.done}`;

      //     // 比较优先级
      //     if (priority[keyA] < priority[keyB]) {
      //       return -1;
      //     } else if (priority[keyA] > priority[keyB]) {
      //       return 1;
      //     } else {
      //       // 如果优先级相同，则根据状态内部的排序规则排序
      //       if (priority[keyA] === 1 && priority[keyB] === 1) {
      //         // 未开始的按startTime排序
      //         return new Date(a.startTime) - new Date(b.startTime);
      //       } else {
      //         // 其他状态按endTime排序
      //         return new Date(a.endTime) - new Date(b.endTime);
      //       }
      //     }
      //   });
      // } else if (prop == "game") {
      //   // 按游戏排序
      //   list.sort((a, b) => {
      //     if (a.gameId !== b.gameId) {
      //       return a.gameId.localeCompare(b.gameId);
      //     } else {
      //       return new Date(a.endTime) - new Date(b.endTime);
      //     }
      //   });
      // } else {
      //   list.sort((a, b) => {
      //     return new Date(a[prop]) - new Date(b[prop]);
      //   });
      // }
      // if (order === "desc") {
      //   list.reverse();
      // }
      // return list;
      // 默认按开始时间和结束时间排序
      let list = this.customList;
      list.sort((a, b) => {
        if (a.startTime != b.startTime) {
          return (
            new Date(a.startTime || "1970-01-01") -
            new Date(b.startTime || "1970-01-01")
          );
        } else {
          return (
            new Date(a.endTime || "9999-12-31") -
            new Date(b.endTime || "9999-12-31")
          );
        }
      });
      return list;
    },
    emptyText() {
      if (this.$refs.scroll?.triggered) {
        return "加载中.....";
      }
      return "暂无数据";
    },
    colorMap() {
      let r = {};
      // this.gameList.forEach((g) => {
      //   r[g.id] = g.color;
      // });
      return r;
    },
  },
  mounted() {
    this.startPullDownRefresh();
  },
  methods: {
    startPullDownRefresh() {
      this.$refs.scroll.onRefresh();
    },
    // 结束下拉刷新
    stopPullDownRefresh() {
      this.$refs.scroll.refreshFinish();
    },
    // 刷新
    refresh() {
      if (this.loading) return;
      this.getCustomList();
    },
    // 获取自定义列表
    getCustomList() {
      if (!getToken()) {
        uni.showToast({ icon: "none", title: "请登录后使用此功能" });
        this.customList = [];
        this.stopPullDownRefresh();
        return;
      }
      this.loading = true;
      this.showDetail = false;
      getCustomList()
        .then((_) => {
          this.customList = _.data || [];
          this.handleData();
        })
        .finally(() => {
          this.loading = false;
          this.stopPullDownRefresh();
        });
    },
    // 预处理数据
    handleData() {
      this.customList.forEach((e, i) => {
        this.$set(
          e,
          "graphStartTime",
          Math.max(
            +new Date(this.firstDay),
            +new Date(e.startTime || this.firstDay)
          )
        );
        this.$set(
          e,
          "graphEndTime",
          Math.min(
            +new Date(this.lastDay),
            +new Date(e.endTime || this.lastDay)
          )
        );
        this.$set(e, "done", this.doneList.includes(e.id));
        // this.$set(e, "imgUrlList", (e.imgUrl || "").split(";"));
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
      // 检查 startTime 和 endTime 是否为空
      const startTime = e.startTime ? dayjs(e.startTime) : dayjs("1970-01-01"); // 如果 startTime 为空，设置为远古时间
      const endTime = e.endTime ? dayjs(e.endTime) : dayjs("9999-12-31"); // 如果 endTime 为空，设置为未来时间
      const now = dayjs(); // 当前时间
      // 如果当前时间早于事件开始时间
      if (now.diff(startTime) < 0) {
        this.$set(e, "status", 0); // 未开始
        return;
      }
      // 如果当前时间在事件开始时间和结束时间之间
      if (endTime.diff(now) >= 0) {
        this.$set(e, "status", 1); // 进行中
        return;
      }
      // 如果当前时间晚于事件结束时间
      this.$set(e, "status", 2); // 已结束
    },
    toAdd() {
      if (!getToken()) {
        uni.showToast({ icon: "none", title: "请登录后使用此功能" });
        return;
      }
      uni.navigateTo({ url: "add" });
    },
    // 小程序兼容性写法，将 change 事件 emit 出来
    changeStatus() {
      if (this.currentEvent.status === 1) {
        if (this.currentEvent.done) {
          this.$store.dispatch("user/removeDone", this.currentEvent.id);
        } else {
          this.$store.dispatch("user/addDone", this.currentEvent.id);
        }
        this.currentEvent.done = !this.currentEvent.done;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-page {
  /* display: flex;
  flex-direction: column; */
  height: calc(100vh - var(--status-bar-height) - 44px - 120rpx - 50px);
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
  /* #ifdef H5 */
  top: calc(44px + var(--status-bar-height));
  /* #endif */
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
  z-index: 1;
  margin-right: 20rpx;
}
.event-status {
  z-index: 1;
  margin-right: 20rpx;
}

.corner-button {
  position: fixed;
  right: 40rpx;
  width: 88rpx;
  height: 88rpx;
  background: linear-gradient(315deg, #2f92fa 0%, #3ebafd 100%);
  border-radius: 50%;
  z-index: 2;
  box-shadow: 2px 0px 8px 0px rgba(27, 37, 70, 0.08);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  &.tool-button {
    bottom: 140rpx;
  }
  &.game-button {
    bottom: 240rpx;
  }
}
</style>
