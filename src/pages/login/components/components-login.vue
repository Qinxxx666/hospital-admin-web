<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'password'">
      <t-form-item name="account">
        <t-input v-model="formData.account" size="large" placeholder="请输入账号">
          <template #prefix-icon>
            <user-icon/>
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          key="password"
          placeholder="请输入登录密码"
        >
          <template #prefix-icon>
            <lock-on-icon />
          </template>
          <template #suffix-icon>
            <browse-icon v-if="showPsw" @click="showPsw = !showPsw" key="browse" />
            <browse-off-icon v-else @click="showPsw = !showPsw" key="browse-off" />
          </template>
        </t-input>
      </t-form-item>

      <div class="check-container remember-pwd">
        <t-checkbox>记住账号</t-checkbox>
        <span class="tip">忘记账号？</span>
      </div>
    </template>

    <!-- 扫码登陆 -->
    <template v-else-if="type == 'qrcode'">
      <div class="tip-container">
        <span class="tip">请使用微信扫一扫登录</span>
        <span class="refresh"
          >刷新
          <refresh-icon color="#0052D9" />
        </span>
      </div>
      <qrcode-vue value="" :size="192" level="H" />
    </template>

    <!-- 手机号登陆 -->
    <template v-else>
      <t-form-item name="phone">
        <t-input v-model="formData.phone" size="large" placeholder="请输入您的手机号">
          <template #prefix-icon>
            <user-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item class="verification-code" name="verifyCode">
        <t-input v-model="formData.verifyCode" size="large" placeholder="请输入验证码" key="verifyCode" />
        <t-button variant="outline" :disabled="countDown > 0" @click="handleCounter">
          {{ countDown == 0 ? '发送验证码' : `${countDown}秒后可重发` }}
        </t-button>
      </t-form-item>
    </template>

    <t-form-item v-if="type !== 'qrcode'" class="btn-container">
      <t-button
                block size="large" type="submit"> 登录 </t-button>

<!--      <t-button @click="requestGet"-->
<!--                block size="large"> 获取用户信息 </t-button>-->
    </t-form-item>

    <div class="switch-container">
      <span v-if="type !== 'password'" class="tip" @click="switchType('password')">使用账号密码登录</span>
<!--      <span v-if="type !== 'qrcode'" class="tip" @click="switchType('qrcode')">使用微信扫码登录</span>-->
      <span v-if="type !== 'phone'" class="tip" @click="switchType('phone')">使用手机号登录</span>
    </div>
  </t-form>
</template>
<script lang="ts">
import Vue from 'vue';
import QrcodeVue from 'qrcode.vue';
import { UserIcon, LockOnIcon, BrowseOffIcon, BrowseIcon, RefreshIcon } from 'tdesign-icons-vue';
import axios from "axios";
import {TOKEN_NAME} from "@/config/global";

const INITIAL_DATA = {
  phone: '',
  account: '',
  password: '',
  verifyCode: '',
  checked: false,
};

const FORM_RULES = {
  phone: [{ required: true, message: '手机号必填', type: 'error' }],
  account: [{ required: true, message: '账号必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  verifyCode: [{ required: true, message: '验证码必填', type: 'error' }],
};

/** 高级详情 */
export default Vue.extend({
  name: 'Login',
  components: {
    QrcodeVue,
    UserIcon,
    LockOnIcon,
    BrowseOffIcon,
    BrowseIcon,
    RefreshIcon,
  },
  data() {
    return {
      FORM_RULES,
      type: 'password',
      formData: { ...INITIAL_DATA },
      showPsw: false,
      countDown: 0,
      intervalTimer: null,
    };
  },
  beforeDestroy() {
    clearInterval(this.intervalTimer);
  },
  methods: {
    // requestPost() {
    //   // axios发起post请求，并携带post参数name
    //   axios
    //     .post("/api/Test/index", { name: "anbin" })
    //     .then((res) => {
    //       console.log("post类型请求", res.data.data[0]);
    //       this.$refs.post.innerHTML = JSON.stringify(res.data.data);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // },
    requestGet() {
      // axios发起get请求，不携带参数,此处是get请求简写，完整写法为 axios.get("/index/index/getData")
      axios({
        method: "get",
        url: "/user/getUserList",
        headers: {
          'Authorization': localStorage.getItem(TOKEN_NAME)
        }
      })
        .then((res) => {
          this.$message.success(res.data[1].realName);
        })
        .catch((err) => {
          if (err.response.status === 403)
          {
            this.$message.warning("非法用户");
          }
          if (err.response.status === 401)
          {
            this.$message.warning("用户认证过期");
          }
          console.error(err);
        });
    },
    switchType(val) {
      this.type = val;
      this.$refs.form.reset();
    },
    async onSubmit({ validateResult }) {
      if (validateResult === true) {
        const  res = await this.$store.dispatch('user/login', this.formData);
        if (res.code !== 200)
        {
          this.$message.warning(res.message);
          return;
        }
        this.$message.success('登录成功');
        this.$router.replace('/dashboard/base/').catch(() => '');
      }
    },
    handleCounter() {
      this.countDown = 60;
      this.intervalTimer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown -= 1;
        } else {
          clearInterval(this.intervalTimer);
          this.countDown = 0;
        }
      }, 1000);
    },
  },
});
</script>
