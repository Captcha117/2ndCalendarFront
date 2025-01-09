<template>
  <u-tabbar
    :value="index"
    @change="change"
    :fixed="true"
    :placeholder="true"
    :safeAreaInsetBottom="true"
  >
    <u-tabbar-item
      v-for="item in items"
      :key="item.label"
      :text="item.label"
      :icon="item.icon"
    ></u-tabbar-item>
  </u-tabbar>
</template>

<script>
export default {
  props: ["index"],
  data() {
    return {
      items: [
        { label: "活动日历", icon: "calendar", path: "/pages/calendar/index" },
        { label: "我的", icon: "account", path: "/pages/settings/index" },
      ],
    };
  },
  methods: {
    change(i) {
      uni.switchTab({ url: this.items[i].path });
    },
  },
};
</script>

<style></style>
