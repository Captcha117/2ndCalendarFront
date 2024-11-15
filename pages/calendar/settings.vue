<template>
  <view>
    <uni-nav-bar
      :fixed="true"
      shadow
      :border="false"
      background-color="#F8F8F8"
      color="black"
      status-bar
      title="活动日历设置"
      left-icon="left"
      right-text="确定"
      @clickLeft="back"
      @clickRight="confirm"
    />
    <view class="calendar-setting">
      <uni-forms ref="baseForm" :modelValue="form">
        <uni-forms-item label="游戏">
          <uni-data-checkbox
            multiple
            v-model="form.games"
            :localdata="gameOptions"
          ></uni-data-checkbox>
        </uni-forms-item>

        <uni-forms-item label="排序">
          <uni-data-checkbox
            v-model="form.prop"
            wrap
            :localdata="propOptions"
          ></uni-data-checkbox>
        </uni-forms-item>
        <uni-forms-item label=" ">
          <uni-data-checkbox
            v-model="form.order"
            :localdata="orderOptions"
          ></uni-data-checkbox>
        </uni-forms-item>
        <uni-forms-item label="活动状态">
          <uni-data-checkbox
            multiple
            v-model="form.status"
            :localdata="statusOptions"
          ></uni-data-checkbox>
        </uni-forms-item>
        <uni-forms-item label="完成状态">
          <uni-data-checkbox
            multiple
            v-model="form.done"
            :localdata="doneOptions"
          ></uni-data-checkbox>
        </uni-forms-item>
      </uni-forms>
    </view>
  </view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {},
      gameOptions: [
        { text: "Genshin", value: 1 },
        { text: "Starrail", value: 2 },
        { text: "ZZZ", value: 3 },
      ],
      propOptions: [
        { text: "按状态", value: "status" },
        { text: "按开始时间", value: "startTime" },
        { text: "按结束时间", value: "endTime" },
      ],
      orderOptions: [
        { text: "升序", value: "asc" },
        { text: "降序", value: "desc" },
      ],
      statusOptions: [
        { text: "未开始", value: 0 },
        { text: "已开始", value: 1 },
        { text: "已结束", value: 2 },
      ],
      doneOptions: [
        { text: "未完成", value: false },
        { text: "已完成", value: true },
      ],
      platformOptions: [
        { text: "游戏内", value: "game" },
        { text: "H5", value: "h5" },
        { text: "微博", value: "wb" },
        { text: "bilibili", value: "bilibili" },
        { text: "小红书", value: "xhs" },
      ],
    };
  },
  computed: {
    ...mapGetters(["settings"]),
  },
  mounted() {
    this.form = { ...this.settings };
  },
  methods: {
    back() {
      uni.navigateBack({ delta: 1 });
    },
    confirm() {
      this.$store.dispatch("user/setSettings", this.form);
      this.back();
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-setting {
  padding: 20px;
}
::v-deep .uni-forms-item__content {
  display: flex;
  align-items: center;
}
</style>
