<template>
  <view class="popup-content" :style="{ height: height * 0.3 + 'px' }">
    <view class="event-basic">
      <view class="event-header">
        <view class="event-name">
          <view>{{ event.name }}</view>
        </view>
        <view class="event-edit" @click="edit()">
          <u-icon name="edit-pen" size="18" style="margin-right: 4rpx"></u-icon>
          编辑
        </view>
      </view>
      <view class="event-time">
        <view>{{ dateStr }}</view>
        <event-remain :event="event"></event-remain>
      </view>
      <view class="event-execution">
        <u-tag v-if="event.type" :text="event.type" plain></u-tag>
        <view @click="changeStatus()">
          <event-status :event="event"></event-status>
        </view>
      </view>
    </view>
    <view class="event-scroll">
      <!-- <image
        v-for="img in event.imgUrlList"
        class="event-image"
        :src="img"
        mode="widthFix"
      ></image> -->
      <view class="event-desc">{{ event.remark || "" }}</view>
    </view>
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
import EventRemain from "../../calendar/components/event-remain.vue";
import EventStatus from "../../calendar/components/event-status.vue";
export default {
  props: ["event"],
  components: { EventRemain, EventStatus },
  data() {
    return {
      height: 0,
    };
  },
  computed: {
    dateStr() {
      const event = this.event || {};
      const now = dayjs(); // 当前时间

      // 处理 startTime
      const startTime = event.startTime ? dayjs(event.startTime) : null;
      const startTimeStr = startTime
        ? startTime.format(
            (startTime.year() !== now.year() ? "YYYY" : "") + "MM-DD HH:mm"
          )
        : "?";

      // 处理 endTime
      const endTime = event.endTime ? dayjs(event.endTime) : null;
      const endTimeStr = endTime
        ? endTime.format(
            (endTime.year() !== now.year() ? "YYYY" : "") + "MM-DD HH:mm"
          )
        : "?";

      return `${startTimeStr} ~ ${endTimeStr}`;
    },
  },
  mounted() {
    uni.getSystemInfo({
      success: (res) => {
        this.height = res.windowHeight;
      },
    });
  },
  methods: {
    changeStatus() {
      this.$emit("changeStatus");
    },
    edit() {
      uni.navigateTo({ url: "add?id=" + this.event.id });
    },
  },
};
</script>

<style scoped lang="scss">
.popup-content {
  display: flex;
  flex-direction: column;
  padding: 30rpx;
  // height: 400px;
  background-color: #fff;
  border-radius: 40rpx 40rpx 0 0;
}
.event-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.event-name {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  font-weight: bold;
}
.event-edit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 26rpx;
}
.event-time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28rpx;
  line-height: 44rpx;
  margin: 20rpx 0;
  color: rgba(0, 0, 0, 0.85);
}
.event-execution {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.event-image {
  width: 100%;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
}
.event-desc {
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 26rpx;
  line-height: 1.6;
}

.event-basic {
  flex-shrink: 0;
  margin-bottom: 20rpx;
}
.event-scroll {
  flex: 1;
  overflow: auto;
}
</style>
