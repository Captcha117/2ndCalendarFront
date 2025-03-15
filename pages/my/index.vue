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
  </view>
</template>

<script>
import MyList from "@/components/myList";
import MyTabBar from "@/components/myTabBar/index.vue";
export default {
  components: { MyList, MyTabBar },
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
  computed: {
    menu() {
      {
        let menu = [
          // #ifdef APP-PLUS
          { label: "版本号", value: this.version },
          // #endif
          { label: "更新日志", path: "/pages/my/log/index" },
        ];
        return menu;
      }
    },
  },
  methods: {
    handleCommand(item) {},
  },
};
</script>

<style></style>
