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
    <view class="u-page">
      <view class="u-demo-block__content">
        <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
        <u--form labelPosition="left" :model="userInfo" ref="form">
          <u-form-item
            label="用户名"
            prop="name"
            borderBottom
            ref="item1"
            labelWidth="80"
          >
            <u--input v-model="userInfo.name" border="none"></u--input>
          </u-form-item>
          <u-form-item
            label="性别"
            prop="sex"
            borderBottom
            @click="
              showSex = true;
              hideKeyboard();
            "
            ref="item1"
            labelWidth="80"
          >
            <u--input
              v-model="userInfo.sex"
              disabled
              disabledColor="#ffffff"
              placeholder="请选择性别"
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item
            label="手机号"
            prop="mobile"
            labelWidth="80"
            borderBottom
          >
            <u--input
              v-model="userInfo.mobile"
              border="none"
              placeholder="请填写手机号"
            ></u--input>
          </u-form-item>
          <u-form-item label="邮箱" prop="email" labelWidth="80" borderBottom>
            <u--input
              v-model="userInfo.email"
              border="none"
              placeholder="请填写邮箱"
            ></u--input>
          </u-form-item>
        </u--form>
        <u-button
          type="primary"
          text="提交"
          customStyle="margin-top: 50px"
          @click="submit"
        ></u-button>
        <u-action-sheet
          :show="showSex"
          :actions="actions"
          title="请选择性别"
          @close="showSex = false"
          @select="sexSelect"
        >
        </u-action-sheet>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      fileList1: [],
      disabled1: false,
      tips: "",
      value: "",
      showCalendar: false,
      showBirthday: false,
      userInfo: {
        username: "",
        sex: "",
        mobile: "",
        email: "",
      },
      showSex: false,
      actions: [{ name: "男" }, { name: "女" }, { name: "保密" }],
      rules: {},
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  onReady() {
    // 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
    this.$refs.form.setRules(this.rules);
  },
  mounted() {
    this.userInfo = JSON.parse(JSON.stringify(this.user));
  },
  methods: {
    sexSelect(e) {
      this.userInfo.sex = e.name;
      this.$refs.form.validateField("userInfo.sex");
    },
    submit() {
      // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
      this.$refs.form
        .validate()
        .then((res) => {
          uni.$u.toast("校验通过");
        })
        .catch((errors) => {
          uni.$u.toast("校验失败");
        });
    },
    hideKeyboard() {
      uni.hideKeyboard();
    },
    back() {
      uni.navigateBack({ delta: 1 });
    },
  },
};
</script>

<style lang="scss" scoped>
.u-page {
  padding: 15px 15px 40px 15px;
}
</style>
