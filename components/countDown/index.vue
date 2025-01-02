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
    <view class="time__item" :style="{ color }"> {{ text }}</view>
  </u-count-down>
</template>

<script>
export default {
  name: "countDown",
  props: ["time", "color"],
  data() {
    return {
      text: "",
    };
  },
  methods: {
    onChange(e) {
      let timeData = e;
      let text = "";
      if (timeData.days > 0) {
        // text += timeData.days ? timeData.days + " 天 " : "";
        // text += timeData.hours ? timeData.hours + " 小时 " : "";
        text += timeData.days ? timeData.days + " d " : "";
        text += timeData.hours ? timeData.hours + " h " : "";
      } else if (timeData.hours > 0) {
        text += timeData.hours ? timeData.hours + " h " : "";
      } else if (timeData.minutes > 0) {
        text += timeData.minutes + " m";
      } else {
        text += timeData.seconds + " s";
      }
      // text += !timeData.days ? timeData.minutes + " 分" : "";
      this.text = text;
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
}
</style>
