<template>
  <view class="event-reward" :style="{ 'font-size': (size || 12) + 'px' }">
    <view class="event-reward-item" v-for="r in event.rewardList">
      <reward-icon
        :name="r.rewardCode"
        :size="size"
        style="margin-right: 2px"
      ></reward-icon>
      <text>{{ r.rewardNum }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: ["event", "size"],
  computed: {},
};
</script>

<style scoped lang="scss">
.event-reward {
  font-size: 24px;
}
.event-reward-item {
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
}
</style>
