<template>
  <view class="calendar-page">
    <scroll-view
      class="date-scroll-view"
      scroll-x
      :show-scrollbar="false"
      :scroll-left="scrollLeft"
    >
      <view class="date" v-for="i in 14" :key="'date' + i">
        <view>{{ addDays(i - 2) }}</view>
        <view>{{ getDay(i - 2) }}</view>
      </view>
    </scroll-view>

    <view class="event-content">
      <scroll-view
        class="name-scroll-view"
        scroll-y
        :show-scrollbar="false"
        :scroll-top="scrollTop"
      >
        <view v-for="(e, i) in eventList" class="name-item" :key="'event' + i">
          {{ e.name }}
        </view>
      </scroll-view>
      <scroll-view
        class="event-scroll-view"
        scroll-x
        scroll-y
        :show-scrollbar="false"
        :scroll-top="mainScrollTop"
        :scroll-left="mainScrollLeft"
        @scroll="scroll"
      >
        <view
          class="split-line"
          v-for="i in 14"
          :key="'line' + i"
          :style="{
            left: 60 * i + 'px',
            height: 60 * eventList.length + 'px',
          }"
        >
        </view>
        <view class="event-row" v-for="(e, i) in eventList" :key="e.id">
          <view>{{ e.name }}{{ i }}</view>
        </view>
      </scroll-view>
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
      scrollTop: 0,
      scrollLeft: 0,
      mainScrollTop: 0,
      mainScrollLeft: 0,
      firstDay: dayjs().add(-1, "day").startOf("day"),
      lastDay: dayjs().add(6, "day").startOf("day"),
      screenWidth: 0,
      eventList: [
        {
          id: 1,
          name: "画外旅照·浮露之章",
          startTime: "2024/07/29 10:00",
          endTime: "2024/08/04 03:59",
          gameId: "1",
          mainColor: "#61a5d4",
          reward: "420 原石",
          img: "https://upload-bbs.miyoushe.com/upload/2024/07/26/75276539/2250a5ca44dacacf56d7b9b59c5cbe3f_147733397602620236.jpg",
        },
        {
          id: 2,
          name: "选香入门",
          startTime: "2024/08/01 12:00",
          endTime: "2024/08/07 23:59",
          gameId: "1",
          mainColor: "rgb(178, 181, 109)",
          url: "https://www.miyoushe.com/ys/article/55790552",
          img: "https://upload-bbs.miyoushe.com/upload/2024/07/31/75276539/2465cd7ebc412d846be323281245b067_2068653672708340083.jpg?",
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
    scroll: function (e) {
      this.scrollTop = e.detail.scrollTop;
      this.scrollLeft = e.detail.scrollLeft;
    },
  },
};
</script>

<style scoped lang="scss">
page {
  height: 100%;
}
.calendar-page {
  display: flex;
  flex-direction: column;
  height: 500px;
  border: 1px solid black;
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
.date-scroll-view {
  white-space: nowrap;
  width: calc(100% - 80px);
  margin-left: 80px;
}
.date {
  display: inline-block;
  width: 60px;
  box-sizing: border-box;
  text-align: center;
  border: 0.5px solid #e5e5e5;
  padding: 5px 0;
  line-height: 20px;
  height: 50px;
  background-color: white;
}

.event-content {
  display: flex;
  flex: 1;
  overflow: auto;
  height: 100%;
}

.name-scroll-view {
  width: 80px;
  display: inline-block;
  height: 100%;
}
.name-item {
  height: 60px;
  border: 0.5px solid #e5e5e5;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}

.event-scroll-view {
  white-space: nowrap;
  width: calc(100% - 80px);
  display: inline-block;
}
.split-line {
  width: 1px;
  background-color: #e5e5e5;
  position: absolute;
  top: 0;
}
.events {
  margin-top: 60px;
  flex: 1;
}
.event-row {
  height: 60px;
  display: flex;
  align-items: center;
  width: 840px;
  border: 0.5px solid #e5e5e5;
}
.event-text {
  color: white;
  z-index: 10;
  margin-left: 10px;
  text-shadow: 1px 1px 2px black;
  position: absolute;
}
.event-name {
}
.event-reward {
  font-size: 12px;
}
</style>
