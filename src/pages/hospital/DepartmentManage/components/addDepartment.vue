<template>
  <t-dialog header="新增科室" :visible="isVisible" :departmentInfo="departmentInfo" @confirm="onConfirm"
            @close="close">
    <t-form :data="formData" ref="form">
      <t-form-item label="科室编码" name="code">
        <t-input v-model="formData.code" placeholder="请输入科室编码"/>
      </t-form-item>
      <t-form-item label="科室名称" name="name" :rules="[{ required: true, message: '科室名称必填' },]">
        <t-input v-model="formData.name" placeholder="请输入科室名称"/>
      </t-form-item>
      <t-form-item label="科室描述" name="description">
        <t-textarea v-model="formData.description" placeholder="请输入科室描述"/>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script lang="ts">

const INIT_FORM_DATA = {
  code: "",
  name: "",
  description: "",
  parentId: "",
}
export default ({
  props: {
    isVisible: {
      type: Boolean,
    },
    departmentInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {...INIT_FORM_DATA},
    }
  },
  mounted() {},
  methods: {
    async onConfirm() {
      // 手动触发校验
      const va = await this.$refs.form.validate();
      if (va === true) {
        this.formData.parentId = this.departmentInfo.id;
        this.$emit('confirm', this.formData);
        this.formData = {...INIT_FORM_DATA};
        this.$refs.form.clearValidate();
      }
    },
    close() {
      this.formData = {...INIT_FORM_DATA};
      this.$refs.form.clearValidate();
      this.$emit('closeDialog', false);
    },
  }
})
</script>
<style scoped lang="less">

</style>
