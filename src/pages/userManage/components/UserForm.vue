<template>
  <t-card>
    <router-view/>
    <t-form :data="formData" :rules="rules" ref="form" @reset="onReset" @submit="onSubmit">
      <t-form-item label="用户名" name="userName">
        <t-input v-model="formData.userName" placeholder="请输入用户名"/>
      </t-form-item>
      <t-form-item label="姓名" name="realName">
        <t-input v-model="formData.realName" placeholder="请输入姓名"/>
      </t-form-item>
      <t-form-item label="年龄" name="age">
        <t-input-number v-model="formData.age" placeholder="请输入年龄" :auto-width="true"/>
      </t-form-item>
      <t-form-item label="性别" name="sex">
        <t-radio-group v-model="formData.sex">
          <t-radio value="1">男</t-radio>
          <t-radio value="0">女</t-radio>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="联系方式" name="phoneNumber">
        <t-input v-model="formData.phoneNumber" placeholder="请输入联系方式"/>
      </t-form-item>
      <t-form-item label="电子邮箱" name="email">
        <t-input v-model="formData.email" placeholder="请输入电子邮箱"/>
      </t-form-item>
      <t-form-item label="头像" name="avatar">
        <t-upload
          ref="uploadRef2"
          action="http://localhost:8080/file/upload"
          :disabled="false"
          :autoUpload="false"
          theme="image"
          :formatResponse="formatResponse"
          tips="请选择头像"
          accept="image/*"
          :showImageFileName="true"

        ></t-upload>
      </t-form-item>
      <t-space size="10px" class="t-col-offset-9">
        <t-button theme="default" @click="() => this.$router.push('userManage')">取消</t-button>
        <t-button theme="default" type="reset">重置</t-button>
        <t-button type="submit">提交</t-button>
      </t-space>
      <t-form-item>
      </t-form-item>
    </t-form>
  </t-card>
</template>

<script lang="ts">

const INITIAL_DATA = {
  name: '',
  email: '',
  phone: '',
  password: '',
  role: '',
  status: '',
  sex: '1',
  avatar: [],
}
export default {
  name: 'UserForm',
  data() {
    return {
      formData: {...INITIAL_DATA},
      rules: {
        userName: [{required: true, message: '请输入用户名'}, {min: 1, message: '用户名长度不能小于1'}],
        realName: [{required: true, message: '请输入姓名'}, {min: 1, message: '姓名长度不能小于1'}],
        age: [{required: true, message: '请输入年龄'},
          {min: 1, message: '年龄不能等于0', type: 'warning'},
          {max: 100, message: '年龄不能大于100', type: 'warning'}
        ],
        sex: [{required: true, message: '请选择性别'}],
        phoneNumber: [{required: true, message: '请输入联系方式'},
          {pattern: /^1[3-9]\d{9}$/, message: '请输入正确格式的手机号码', type: 'error'}
        ],
        email: [{email: {ignore_max_length: true}, message: '请输入正确的邮箱地址'}]
      }
    }
  },
  methods: {
    onReset() {
      this.formData = INITIAL_DATA;
    },
    onSubmit() {
      this.$message.success('提交成功');
    },
    handleFail({file}){
      this.$message.error(`文件 ${file.name} 上传失败`);
    },
    formatResponse(){

    }
  },
}
</script>
<style scoped lang="less">

</style>
