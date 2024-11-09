<template>
  <view class="event-status" v-if="getRemainTime() > 0">
    <u-icon
      name="clock"
      :color="color || 'white'"
      size="12"
      style="margin-right: 5px"
    ></u-icon>
    <count-down :time="getRemainTime()" :color="color"></count-down>
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
import CountDown from "@/components/countDown";
export default {
  props: ["event", "color"],
  components: { CountDown },
  computed: {
    getRemainTime() {
      return () => {
        const date1 = dayjs();
        const date2 = dayjs(this.event.endTime);
        return date2.diff(date1);
      };
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.event-status {
  display: flex;
  align-items: center;
  line-height: 14px;
  font-size: 12px;
  font-weight: 200;
  padding: 4px 7px;
  border-radius: 3px;
  background-color: #8f939c69;
  border-width: 1px;
  border-style: solid;
  border-color: #8f939c;
  font-weight: bold;
}
</style>
