<template>
  <view>
    <uni-nav-bar
      :fixed="true"
      shadow
      :border="false"
      background-color="#F8F8F8"
      color="black"
      status-bar
      title="账号"
      left-icon="left"
      @clickLeft="back"
    />
    <u-button
      @click="login"
      :custom-style="{ 'border-radius': '9px' }"
      type="primary"
    >
      登录
    </u-button>
    <u-modal :content="content" :show="show" @confirm="confirm"> </u-modal>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import * as api from "./api";
export default {
  data() {
    return {
      show: false,
      content: "",
    };
  },
  methods: {
    login() {
      uni.login({
        provider: "weixin", //使用微信登录
        success: (loginRes) => {
          console.log(loginRes);
          console.log(loginRes.authResult);
          api.login(loginRes.code).then((_) => {
            this.show = true;
          });
        },
      });
    },
    confirm() {
      if (uni.getUserProfile) {
        uni.getUserProfile({
          // 显示用户信息的语言
          lang: "zh_CN",
          // 声明获取用户个人信息后的用途，不超过30个字符
          desc: "用来授权登录该小程序!",
          // 接口调用成功回调函数
          success: (userInfo) => {
            console.log(userInfo);
            this.content = JSON.stringify(userInfo);
            // this.$refs.uToast.show({
            //   type: "default",
            //   title: "默认主题",
            //   message: JSON.stringify(userInfo),
            // });

            // 成功的回调里自带一个参数, 这个参数就是用户信息对象(userInfo)。其属性为:
            // rawDate: String,不包括敏感信息的原始数据字符串,用于计算签名;
            // signature: String, 使用 sha1(rawData + sessionkey) 得到字符串用于校验用户信息;
            // encryptedData: String, 包括敏感信息在内的加密数据详细见加密数据解密算法;
            // iv: String, 加密算法的初始向量,相见加密数据机密算法;
            // cloudID: String, 敏感数据对应的云 ID, 开通云开发的小程序才会返回,可通过云调用直接获取开放数据,详见云开发直接获取开放数据;
            // errMsg: String, 错误的描述
          },
          // 接口调用失败回调函数
          fail: (e) => {
            console.log(e);
          },
          // 接口调用完成回调函数
          complete: () => {},
        });
      }
    },
    back() {
      uni.navigateBack({ delta: 1 });
    },
  },
};
</script>

<style></style>
