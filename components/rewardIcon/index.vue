<template>
  <img
    :src="map[name]"
    alt="icon"
    :style="{ width: size + 'px', height: size + 'px' }"
  />
</template>

<script>
import arknights from "./arknights";
import genshin from "./genshin";
import startail from "./starrail";
import zzz from "./zzz";
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "16",
    },
  },
  data() {
    return {
      map: { ...arknights, ...genshin, ...startail, ...zzz },
    };
  },
};
</script>

<style scoped></style>
