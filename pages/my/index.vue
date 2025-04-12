<template>
  <view>
    <uni-nav-bar
      :fixed="true"
      shadow
      :border="false"
      background-color="#F8F8F8"
      color="black"
      status-bar
      title="我的"
    />
    <my-list :list="menu" @command="handleCommand"> </my-list>
    <my-tab-bar :index="1" />
    <u-popup :show="showLogin" @close="showLogin = false" round="10">
      <view class="popup-content" :style="{ height: height * 0.4 + 'px' }">
        <view class="privacy" @click="checked = !checked">
          <u-icon
            name="checkmark-circle-fill"
            size="14"
            :color="checked ? '#3c9cff' : 'rgba(0, 0, 0, 0.15)'"
          ></u-icon>

          <text style="margin-left: 8rpx">
            我已阅读并同意<text class="link" @click.stop="toTerm('term')"
              >《服务条款》</text
            >和<text class="link" @click.stop="toTerm('privacy')">《隐私协议》</text>
          </text>
        </view>

        <u-button
          type="primary"
          text="登录"
          customStyle="margin-top: 50px"
          @click="login"
        ></u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
import MyList from "@/components/myList";
import MyTabBar from "@/components/myTabBar/index.vue";
import { mapGetters } from "vuex";
export default {
  components: { MyList, MyTabBar },
  data() {
    return {
      height: 0,
      version: "",
      showLogin: false,
      checked: false,
    };
  },
  onLoad() {
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
      this.version = widgetInfo.version;
    });
    // #endif
  },
  mounted() {
    uni.getSystemInfo({
      success: (res) => {
        this.height = res.windowHeight;
      },
    });
  },
  computed: {
    ...mapGetters(["user"]),
    menu() {
      {
        let menu = [
          {
            label: this.user.id ? this.user.name : "登录 / 注册",
            command: "account",
            // path: "/pages/my/account/index",
          },
          { label: "更新日志", path: "/pages/my/log/index?type=log" },
          // #ifdef APP-PLUS
          { label: "版本号", value: this.version },
          // #endif
        ];
        return menu;
      }
    },
  },
  methods: {
    handleCommand(item) {
      if (item.command == "account") {
        // TODO
        if (this.user.id) {
          // 已登录
          // uni.navigateTo({ url: "/pages/my/account/index" });
        } else {
          // 未登录
          this.checked = false;
          this.showLogin = true;
          // this.login();
        }
      }
    },
    toTerm(type) {
      uni.navigateTo({ url: "/pages/my/log/index?type=" + type });
    },
    login() {
      if (!this.checked) {
        uni.showToast({
          icon: "none",
          title: "请先阅读并勾选同意《服务条款》和《隐私协议》",
        });
        return;
      }
      // 获取一次性登录code
      uni.login({
        provider: "weixin", // 使用微信登录
        success: (loginRes) => {
          uni.showLoading({ title: "Loading", mask: true });
          this.$store
            .dispatch("user/wxLogin", loginRes.code)
            .then((_) => {
              this.$store
                .dispatch("user/getUserInfo")
                .then((data) => {
                  this.showLogin = false;
                  // 完善个人信息
                  // if (!data.mobile && !data.email) {
                  //   uni.navigateTo({ url: "/pages/my/account/index" });
                  // }
                })
                .finally(() => {
                  uni.hideLoading();
                });
            })
            .catch(() => {
              uni.hideLoading();
            });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-content {
  display: flex;
  flex-direction: column;
  padding: 30rpx;
  // height: 400px;
  background-color: #fff;
  border-radius: 40rpx 40rpx 0 0;
  justify-content: center;
}
.privacy {
  font-size: 28rpx;
  display: flex;
  text-align: center;
}
.link {
  color: #3c9cff;
}
</style>
