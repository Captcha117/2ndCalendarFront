<template>
  <view class="event-reward" :style="{ 'font-size': (size || 12) + 'px' }">
    <view class="event-reward-item" v-for="r in event.reward">
      <reward-icon
        :name="r.name"
        :size="size"
        style="margin-right: 2px"
      ></reward-icon>
      <text>{{ r.count }}</text>
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
