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
      @clickLeft="back"
    />
    <view class="calendar-setting">
      <u--form labelPosition="left" :model="form" ref="uForm">
        <u-form-item label="游戏" prop="games" borderBottom>
          <view class="flex" @click="toGameList">
            {{ form.games ? `已选择${form.games.length}个游戏` : "" }}
            <u-icon name="arrow-right"></u-icon>
          </view>
          <!-- <u-checkbox-group v-model="form.games" placement="column">
            <u-checkbox
              :customStyle="{ marginBottom: '16rpx' }"
              v-for="(item, index) in gameOptions"
              :key="item.value"
              :label="item.text"
              :name="item.value"
            >
            </u-checkbox>
          </u-checkbox-group> -->
        </u-form-item>
        <u-form-item label="排序" prop="prop">
          <u-radio-group v-model="form.prop" placement="column">
            <u-radio label="按状态" name="status"> </u-radio>
            <view class="tip">进行中 > 未开始 > 已完成 > 已结束</view>
            <u-radio
              :customStyle="{ marginBottom: '16rpx' }"
              v-for="(item, index) in propOptions"
              :key="item.value"
              :label="item.text"
              :name="item.value"
            >
            </u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item label=" " prop="order" borderBottom>
          <u-radio-group v-model="form.order" placement="row">
            <u-radio
              :customStyle="{ marginRight: '16px' }"
              v-for="(item, index) in orderOptions"
              :key="item.value"
              :label="item.text"
              :name="item.value"
            >
            </u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item label="活动状态" prop="status" borderBottom>
          <u-checkbox-group v-model="form.status" placement="row">
            <u-checkbox
              :customStyle="{ marginRight: '16px' }"
              v-for="(item, index) in statusOptions"
              :key="item.value"
              :label="item.text"
              :name="item.value"
            >
            </u-checkbox>
          </u-checkbox-group>
        </u-form-item>
        <u-form-item label="完成状态" prop="done" borderBottom>
          <u-checkbox-group v-model="form.done" placement="row">
            <u-checkbox
              :customStyle="{ marginRight: '16px' }"
              v-for="(item, index) in doneOptions"
              :key="item.value"
              :label="item.text"
              :name="item.value"
            >
            </u-checkbox>
          </u-checkbox-group>
        </u-form-item>
        <u-form-item label="图片" prop="showImg">
          <u-radio-group v-model="form.showImg" placement="row">
            <u-radio
              :customStyle="{ marginRight: '16px' }"
              v-for="(item, index) in showImgOptions"
              :key="item.value"
              :label="item.text"
              :name="item.value"
            >
            </u-radio>
          </u-radio-group>
        </u-form-item>
      </u--form>
    </view>
    <div style="height: 140rpx"></div>
    <view class="footer">
      <u-button @click="back" :custom-style="{ 'border-radius': '9px' }">
        取消
      </u-button>
      <u-button
        @click="confirm"
        :custom-style="{ 'border-radius': '9px', 'margin-left': '16rpx' }"
        type="primary"
      >
        确定
      </u-button>
    </view>
  </view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {},
      propOptions: [
        // { text: "按状态", value: "status" },
        { text: "按游戏", value: "game" },
        { text: "按开始时间", value: "startTime" },
        { text: "按结束时间", value: "endTime" },
      ],
      orderOptions: [
        { text: "升序", value: "asc" },
        { text: "降序", value: "desc" },
      ],
      statusOptions: [
        { text: "未开始", value: 0 },
        { text: "进行中", value: 1 },
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
      showImgOptions: [
        { text: "显示", value: 1 },
        { text: "隐藏", value: 0 },
      ],
    };
  },
  computed: {
    ...mapGetters(["settings", "gameList"]),
    gameOptions() {
      return this.gameList.map((x) => ({ text: x.name, value: x.id }));
    },
  },
  mounted() {
    this.$store.dispatch("user/getSettings");
    this.form = { ...this.settings };
    // if (this.form?.games?.length == 0) {
    //   this.form.games = this.gameList.map((x) => x.id);
    // }
  },
  methods: {
    back() {
      // uni.navigateBack({ delta: 1 });
      uni.switchTab({ url: "/pages/calendar/index" });
    },
    confirm() {
      // if (this.form.games.length == 0) {
      //   uni.showToast({
      //     mask: true,
      //     icon: "none",
      //     title: "请选择游戏",
      //     duration: 2000,
      //   });
      //   return;
      // }
      this.$store.dispatch("user/setSettings", this.form);
      uni.setStorageSync("refresh", true);
      this.back();
    },
    toGameList() {
      uni.navigateTo({ url: "gameList" });
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-setting {
  padding: 30rpx;
  background: white;
  border-radius: 20rpx;
  margin: 20rpx;
}
::v-deep .uni-forms-item__content {
  display: flex;
  align-items: center;
}
.flex {
  display: flex;
  align-items: center;
}
.tip {
  font-size: 24rpx;
  color: #898989;
  margin-bottom: 16rpx;
  margin-left: 48rpx;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  padding: 30rpx;
  box-sizing: border-box;
  display: flex;
}
</style>
