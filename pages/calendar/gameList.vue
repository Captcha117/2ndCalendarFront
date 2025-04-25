<template>
  <view>
    <uni-nav-bar
      :fixed="true"
      shadow
      :border="false"
      background-color="#F8F8F8"
      color="black"
      status-bar
      title="游戏列表"
      left-icon="left"
      @clickLeft="back"
    />

    <u-checkbox-group v-model="checkList" placement="column">
      <view v-for="(item, index) in list" :key="index">
        <u-cell :title="item.name" @click="clickGame(item)">
          <image slot="icon" :src="item.icon" class="game-image"></image>
          <template slot="value">
            <!-- <u-icon name="minus-circle" color="#2979ff" size="18"></u-icon> -->
            <u-checkbox :key="index" :name="item.id"> </u-checkbox>
          </template>
        </u-cell>
      </view>
    </u-checkbox-group>
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
      checkList: [],
      list: [],
    };
  },
  computed: {
    ...mapGetters(["settings", "gameList"]),
  },
  mounted() {
    this.list = [...this.gameList];
    this.checkList = this.settings?.games || [];
  },
  methods: {
    back() {
      // uni.navigateBack({ delta: 1 });
      uni.switchTab({ url: "/pages/calendar/index" });
    },
    clickGame(item) {
      let index = this.checkList.indexOf(item.id);
      if (index >= 0) {
        this.checkList.splice(index, 1);
      } else {
        this.checkList.push(item.id);
      }
    },
    confirm() {
      let settings = { ...this.settings, games: this.checkList };
      this.$store.dispatch("user/setSettings", settings);
      uni.setStorageSync("refresh", true);
      this.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.game-image {
  border-radius: 10rpx;
  height: 70rpx;
  width: 70rpx;
  margin-right: 10rpx;
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
