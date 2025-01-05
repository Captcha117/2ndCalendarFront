<template>
  <view style="margin: 0 32rpx 16rpx">
    <view class="list">
      <view v-if="title" class="title top-border-radius">
        <text class="title-text" :style="style">{{ title }}</text>
      </view>
      <view
        v-for="(item, index) in list"
        :key="item.label"
        @click="itemClick(item)"
      >
        <view v-if="index != 0" class="divider">
          <view class="divider-content"></view>
        </view>
        <view
          v-if="item.type == 'avatar'"
          class="item"
          style="height: 128rpx"
          :class="{
            'top-border-radius': !title && index == 0,
            'bottom-border-radius': index == list.length - 1,
          }"
        >
          <view class="item-center">
            <text class="item-label" :style="style">{{ item.label }}</text>
          </view>
          <view>
            <image class="avatar" :src="item.avatar" mode="aspectFill"></image>
          </view>
        </view>
        <view
          v-else
          class="item"
          :class="{
            'top-border-radius': !title && index == 0,
            'bottom-border-radius': index == list.length - 1,
          }"
        >
          <view class="item-center">
            <text class="item-label" :style="style">{{ item.label }}</text>
          </view>
          <view>
            <text class="item-value">{{ item.value }}</text>
            <uni-icons
              style="margin-left: 16rpx"
              v-if="item.path || item.command"
              type="forward"
              size="16"
              :color="arrowColor"
            >
            </uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "MyList",
  props: {
    title: { type: String, default: "" },
    list: { type: Array, default: () => [] },
    showIcon: { type: Boolean, default: true },
    arrowColor: { type: String, default: "rgba(0, 0, 0, 0.45)" },
  },
  data() {
    return {};
  },
  computed: {
    style() {
      return {
        "align-self": "flex-start",
      };
    },
  },
  methods: {
    itemClick(item) {
      if (item.path) {
        uni.navigateTo({ url: item.path });
      } else {
        item.command && this.$emit("command", item);
      }
    },
    clickAvatar(item) {},
  },
};
</script>
<style scoped>
.list {
  margin-top: 16rpx;
}
.title {
  background-color: white;
  height: 64rpx;
  padding: 0 24rpx;
}
.title-text {
  font-size: 28rpx;
  font-weight: 500;
  line-height: 64rpx;
}
.item {
  display: flex;
  background-color: white;
  height: 108rpx;
  flex-direction: row;
  align-items: center;
  padding: 0 24rpx;
  /* border: black 1px solid; */
}
.item-center {
  /* padding: 0 24rpx; */
  flex: 1;
}
.item-icon {
  width: 40rpx;
  height: 40rpx;
}
.item-label {
  font-size: 28rpx;
  line-height: 44rpx;
}
.item-value {
  font-size: 28rpx;
  line-height: 44rpx;
  color: rgba(0, 0, 0, 0.45);
}
.top-border-radius {
  border-top-left-radius: 16rpx;
  border-top-right-radius: 16rpx;
}
.bottom-border-radius {
  border-bottom-left-radius: 16rpx;
  border-bottom-right-radius: 16rpx;
}
.divider {
  background-color: white;
}
.divider-content {
  margin: 0 20px;
  background-color: #f5f7fa;
  height: 1px;
}
.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  overflow: hidden;
}
</style>
