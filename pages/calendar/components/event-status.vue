<template>
  <view
    class="event-status"
    :class="event.done ? 'done' : 'undone'"
    @click="changeStatus()"
  >
    <template v-if="event.done">
      <uni-icons type="checkbox" size="15" color="#89bf14"></uni-icons>
      已完成
    </template>
    <template v-else>
      <uni-icons type="circle" size="15" color="#bcb5af"></uni-icons>
      未完成
    </template>
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
      if (this.enabled) {
        this.event.done = !this.event.done;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.event-status {
  .uni-icons {
    margin-right: 5px;
  }
  height: 24px;
  border-radius: 4px;
  opacity: 1;
  line-height: 24px;
  padding: 0 7px;
  display: flex;
  align-items: center;
  font-size: 12px;
  background: #ffffffe6;
  &.done {
    color: #89bf14;
    border: 1px solid #89bf14;
  }
  &.undone {
    color: #bcb5af;
    border: 1px solid #bcb5af;
  }
}
</style>
