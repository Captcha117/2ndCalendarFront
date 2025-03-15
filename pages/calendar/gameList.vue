<template>
  <view class="u-page">
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
    <!-- <u-list>
      <u-list-item v-for="(item, index) in list" :key="index">
        <u-cell :title="item.name">
          <u-avatar
            slot="icon"
            shape="square"
            size="35"
            :src="item.url"
            customStyle="margin: -3px 5px -3px 0"
          ></u-avatar>
          <u-switch v-model="checked"></u-switch>

        </u-cell>
      </u-list-item>
    </u-list> -->
    <u-index-list :index-list="indexList">
      <template v-for="(item, i) in itemArr">
        <u-index-item>
          <u-index-anchor :text="indexList[i]"></u-index-anchor>
          <view class="list-cell" v-for="(cell, j) in item">
            <view class="list-cell-left">
              <u-avatar
                shape="square"
                size="35"
                :src="cell.url"
                customStyle="margin: -3px 5px -3px 0"
              ></u-avatar>
              {{ cell }}
            </view>
            <u-icon name="checkmark-circle-fill"></u-icon>
          </view>
        </u-index-item>
      </template>
    </u-index-list>
  </view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      checked: true,
      list: [],
      indexList: ["A", "B", "C", "d", "e"],
      itemArr: [
        ["列表A1", "列表A2", "列表A3"],
        ["列表B1", "列表B2", "列表B3"],
        ["列表C1", "列表C2", "列表C3"],
        ["列表C1", "列表C2", "列表C3"],
        ["列表C1", "列表C2", "列表C3"],
        ["列表C1", "列表C2", "列表C3"],
      ],
    };
  },
  computed: {
    ...mapGetters(["settings", "gameList"]),
  },
  mounted() {
    this.list = [...this.gameList];
  },
  methods: {
    back() {
      uni.navigateBack({ delta: 1 });
    },
  },
};
</script>

<style lang="scss" scoped>
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx 60rpx 20rpx 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
  justify-content: space-between;
}
.list-cell-left {
  display: flex;
}
</style>
