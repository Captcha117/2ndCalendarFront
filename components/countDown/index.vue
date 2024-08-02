<template>
  <u-count-down
    v-if="time > 0"
    :time="time || 0"
    format="DD:HH:mm:ss"
    autoStart
    millisecond
    @change="onChange"
    class="count-down"
  >
    <view class="time__item" v-if="timeData.days"> {{ timeData.days }}天 </view>
    <view class="time__item"> {{ timeData.hours }}小时 </view>
    <text class="time__item" v-if="!timeData.days"
      >{{ timeData.minutes }}分</text
    >
    <!--  <text class="time__item">{{ timeData.seconds }}&nbsp;秒</text> -->
  </u-count-down>
</template>

<script>
export default {
  name: "countDown",
  props: ["time"],
  data() {
    return {
      timeData: {},
    };
  },
  methods: {
    onChange(e) {
      this.timeData = e;
    },
  },
};
</script>

<style scoped lang="scss">
.count-down {
  display: flex;
  flex-direction: row;
}
.time {
  align-items: center;

  &__item {
    color: #fff;
  }
}
</style>
