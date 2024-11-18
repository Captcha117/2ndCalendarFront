<template>
  <view
    class="event-status"
    :class="event.done ? 'done' : 'undone'"
    @click="changeStatus()"
  >
    <template v-if="event.status === 0"> 未开始 </template>
    <template v-else-if="event.status === 1">
      <template v-if="event.done">
        <uni-icons type="checkbox" size="15" color="#89bf14"></uni-icons>
        已完成
      </template>
      <template v-else>
        <uni-icons type="circle" size="15" color="#bcb5af"></uni-icons>
        未完成
      </template>
    </template>
    <template v-else> 已结束 </template>
  </view>
</template>

<script>
export default {
  props: {
    event: Object,
    enabled: Boolean,
  },
  methods: {
    changeStatus() {
      if (this.enabled && this.event.status === 1) {
        if (this.event.done) {
          this.$store.dispatch("user/removeDone", this.event.id);
        } else {
          this.$store.dispatch("user/addDone", this.event.id);
        }
        this.event.done = !this.event.done;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.event-status {
  .uni-icons {
    margin-right: 10rpx;
  }
  height: 48rpx;
  border-radius: 8rpx;
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
</style>
