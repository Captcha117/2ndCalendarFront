<template>
  <view>
    <uni-nav-bar
      :fixed="true"
      shadow
      :border="false"
      background-color="#F8F8F8"
      color="black"
      status-bar
      title="设置"
    />
    <my-list :list="menu" @command="handleCommand"> </my-list>
  </view>
</template>

<script>
import MyList from "@/components/myList";
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
  computed: {
    menu() {
      {
        let menu = [{ label: "版本号", value: this.version }];
        return menu;
      }
    },
  },
  method: {
    handleCommand() {},
  },
};
</script>

<style></style>
