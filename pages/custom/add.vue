<template>
  <view>
    <uni-nav-bar
      :fixed="true"
      shadow
      :border="false"
      background-color="#F8F8F8"
      color="black"
      status-bar
      title="自定义日历"
      left-icon="left"
      @clickLeft="back"
    />
    <view class="custom-form">
      <u--form labelPosition="left" :model="form" ref="form">
        <u-form-item label="名称" prop="name" borderBottom>
          <u--input
            v-model="form.name"
            border="none"
            clearable
            maxlength="30"
            placeholder="不超过 30 字"
          ></u--input>
        </u-form-item>
        <view class="flex">
          <u-form-item
            label="开始时间"
            prop="startTime"
            borderBottom
            @click="selectTime('start')"
            :custom-style="{ flex: 1 }"
            style="flex: 1"
          >
            <u--input
              v-model="form.startTime"
              clearable
              disabled
              disabledColor="#ffffff"
              placeholder="请选择开始时间"
              border="none"
            ></u--input>
          </u-form-item>
          <u-icon
            v-if="!!form.startTime"
            name="close-circle-fill"
            @click="form.startTime = ''"
          ></u-icon>
        </view>
        <view class="flex">
          <u-form-item
            label="结束时间"
            prop="endTime"
            borderBottom
            @click="selectTime('end')"
            :custom-style="{ flex: 1 }"
            style="flex: 1"
          >
            <u-input
              v-model="form.endTime"
              clearable
              disabled
              disabledColor="#ffffff"
              placeholder="请选择结束时间"
              border="none"
            >
            </u-input>
          </u-form-item>
          <u-icon
            v-if="!!form.endTime"
            name="close-circle-fill"
            @click="form.endTime = ''"
          ></u-icon>
        </view>
        <u-form-item label="分类" prop="type" borderBottom>
          <u-radio-group
            v-model="form.type"
            placement="column"
            iconPlacement="right"
          >
            <u-radio
              v-for="(item, index) in typeList"
              :customStyle="{
                marginBottom: index == typeList.length - 1 ? 0 : '8px',
              }"
              :key="item"
              :label="item"
              :name="item"
            >
            </u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item label="备注" prop="remark">
          <u--textarea
            v-model="form.remark"
            maxlength="100"
            placeholder="不超过 100 字"
          ></u--textarea>
        </u-form-item>
      </u--form>
    </view>
    <div style="height: 140rpx"></div>
    <view class="footer">
      <u-button @click="back" :custom-style="{ 'border-radius': '9px' }">
        取消
      </u-button>
      <!-- <u-button
        v-if="form.id"
        @click="showDelete = true"
        :custom-style="{ 'border-radius': '9px', 'margin-left': '16rpx' }"
        type="error"
      >
        删除
      </u-button> -->
      <u-button
        @click="confirmForm"
        :custom-style="{ 'border-radius': '9px', 'margin-left': '16rpx' }"
        type="primary"
      >
        确定
      </u-button>
    </view>
    <u-datetime-picker
      :show="start"
      :maxDate="maxDate"
      :minDate="defaultMinDate"
      v-model="startTime"
      mode="datetime"
      closeOnClickOverlay
      @confirm="confirmDate"
      @cancel="cancel"
      @close="close"
    ></u-datetime-picker>
    <u-datetime-picker
      :show="end"
      :maxDate="defaultMaxDate"
      :minDate="minDate"
      v-model="endTime"
      mode="datetime"
      closeOnClickOverlay
      @confirm="confirmDate"
      @cancel="cancel"
      @close="close"
    ></u-datetime-picker>
    <u-modal
      content="确定要删除该日程吗？"
      :show="showDelete"
      showCancelButton
      closeOnClickOverlay
      @confirm="confirmDelete"
      @cancel="showDelete = false"
      @close="showDelete = false"
    ></u-modal>
  </view>
</template>

<script>
import dayjs from "@/utils/dayjs";
import { mapGetters } from "vuex";
import * as api from "./api";
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        startTime: "",
        endTime: "",
        type: "默认分类",
      },
      start: false,
      end: false,
      startTime: dayjs().format("YYYY-MM-DD HH:mm"),
      endTime: dayjs().format("YYYY-MM-DD HH:mm"),
      typeList: ["默认分类"],
      defaultMaxDate: +dayjs().add(10, "year"),
      defaultMinDate: +dayjs().subtract(10, "year"),

      rules: {
        name: [
          {
            type: "string",
            required: true,
            message: "请填写名称",
            trigger: ["blur", "change"],
          },
        ],
      },
      showDelete: false,
    };
  },
  onLoad(option) {
    if (option.id) {
      this.form.id = option.id;
    }
  },
  computed: {
    maxDate() {
      if (this.form.endTime) {
        return new Date(this.form.endTime).getTime();
      } else {
        return +dayjs().add(10, "year");
      }
    },
    minDate() {
      if (this.form.startTime) {
        return new Date(this.form.startTime).getTime();
      } else {
        return +dayjs().subtract(10, "year");
      }
    },
  },
  onReady() {
    // 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
    this.$refs.form.setRules(this.rules);
  },
  mounted() {
    if (this.form.id) {
      uni.showLoading({
        title: "Loading",
        mask: true,
      });
      api
        .getCustomById(this.form.id)
        .then((_) => {
          this.form = _.data || {};
        })
        .finally(() => {
          uni.hideLoading();
        });
    }
  },
  methods: {
    back() {
      uni.navigateBack({ delta: 1 });
    },
    selectTime(prop) {
      this.currentProp = prop;
      this[this.currentProp] = true;
      uni.hideKeyboard();
    },
    close() {
      this[this.currentProp] = false;
    },
    cancel() {
      this[this.currentProp] = false;
    },
    confirmDate(e) {
      this[this.currentProp] = false;
      this.form[this.currentProp + "Time"] = dayjs(e.value).format(
        "YYYY-MM-DD HH:mm"
      );
    },

    confirmForm() {
      if (this.form.startTime && this.form.endTime) {
        if (dayjs(this.form.startTime).diff(dayjs(this.form.endTime)) > 0) {
          uni.$u.toast("开始时间不能晚于结束时间");
          return;
        }
      }
      this.$refs.form
        .validate()
        .then((res) => {
          // uni.$u.toast("校验通过");
          let form = { ...this.form };
          if (form.startTime) {
            form.startTime += ":00";
          }
          if (form.endTime) {
            form.endTime += ":59";
          }
          uni.showLoading({
            title: "Loading",
            mask: true,
          });
          let func = this.form.id ? api.updateCustom : api.addCustom;
          func(form)
            .then((_) => {
              uni.setStorageSync("refresh", true);
              this.back();
            })
            .finally(() => {
              uni.hideLoading();
            });
        })
        .catch((errors) => {
          // uni.$u.toast("校验失败");
        });
    },
    confirmDelete() {
      uni.showLoading({
        title: "Loading",
        mask: true,
      });
      api
        .delCustom({ id: this.form.id })
        .then((_) => {
          uni.setStorageSync("refresh", true);
          this.back();
        })
        .finally(() => {
          uni.hideLoading();
        });
    },
  },
};
</script>

<style scoped lang="scss">
.custom-form {
  padding: 30rpx;
  background: white;
  border-radius: 20rpx;
  margin: 20rpx;
}
::v-deep .uni-forms-item__content {
  display: flex;
  align-items: center;
}
.flex {
  display: flex;
  align-items: center;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  padding: 30rpx;
  box-sizing: border-box;
  display: flex;
}
</style>
