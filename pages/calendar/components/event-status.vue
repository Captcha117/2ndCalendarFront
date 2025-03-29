<template>
  <view class="event-status" :class="event.done ? 'done' : 'undone'">
    <template v-if="event.status === 0">
      <uni-icons type="calendar" size="15" color="#bcb5af"></uni-icons>
      <text class="status-text">未开始</text>
    </template>
    <template v-else-if="event.status === 1">
      <template v-if="event.done">
        <uni-icons type="checkbox" size="15" color="#89bf14"></uni-icons>
        <text class="status-text">已完成</text>
      </template>
      <template v-else>
        <uni-icons type="circle" size="15" color="#bcb5af"></uni-icons>
        <text class="status-text">未完成</text>
      </template>
    </template>
    <template v-else>
      <uni-icons type="close" size="15" color="#bcb5af"></uni-icons>
      <text class="status-text">已结束</text>
    </template>
  </view>
</template>

<script>
export default {
  props: {
    event: Object,
    enabled: Boolean,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.event-status {
  // .uni-icons {
  //   margin-right: 10rpx;
  // }
  height: 48rpx;
  border-radius: 6rpx;
  opacity: 1;
  line-height: 48rpx;
  padding: 0 14rpx;
  display: flex;
  align-items: center;
  font-size: 24rpx;
  background: #ffffffe6;
  &.done {
    color: #89bf14;
    border: 2rpx solid #89bf14;
  }
  &.undone {
    color: #bcb5af;
    border: 2rpx solid #bcb5af;
  }
}
.status-text {
  margin-left: 10rpx;
}
</style>
