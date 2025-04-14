<template>
  <view>
    <uni-nav-bar
      :fixed="true"
      shadow
      :border="false"
      background-color="#F8F8F8"
      color="black"
      status-bar
      title="关于"
      left-icon="left"
      @clickLeft="back"
    />
    <my-list :list="menu" @command="handleCommand"> </my-list>
  </view>
</template>

<script>
import MyList from "@/components/myList";
import { mapGetters } from "vuex";
export default {
  components: { MyList },
  data() {
    return {
      version: "",
    };
  },
  onLoad() {
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
      this.version = widgetInfo.version;
    });
    // #endif
  },
  mounted() {},
  computed: {
    ...mapGetters(["user"]),
    menu() {
      {
        let menu = [
          { label: "更新日志", path: "/pages/my/log/index?type=log" },
          { label: "服务条款", path: "/pages/my/log/index?type=term" },
          { label: "隐私协议", path: "/pages/my/log/index?type=privacy" },
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
    back() {
      uni.navigateBack({ delta: 1 });
    },
  },
};
</script>

<style lang="scss" scoped></style>
