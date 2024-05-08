<template>
  <t-dialog header="添加用户到科室" theme="info" :visible="departmentUserDialogVisible"
            @confirm="onConfirm"
            @close="onClose">
    <t-select v-model="selectData" :options="options" placeholder="请选择人员" :clearable="true" :multiple="true"
              :minCollapsedNum="3"/>
  </t-dialog>
</template>

<script lang="ts">
export default ({
  props: {
    departmentUserDialogVisible: {
      type: Boolean,
      default: false
    },
    departmentInfo: {
      type: Object,
    }
  },
  data() {
    return {
      selectData: [],
      options: [],
    }
  },
  watch: {
    departmentUserDialogVisible(newVal) {
      if (newVal) {
        this.init();
      }
    }
  },
  methods: {
    init() {
      if (this.departmentInfo.id !== undefined) {
        this.$store.dispatch('department/getUserList', this.departmentInfo.id).then(res => {
          this.options = res.data;
        })
      }
    },
    onConfirm() {
      this.$emit('save', this.selectData);
      this.selectData = [];
    },
    onClose() {
      this.selectData = [];
      this.$emit('closeDialog', false);
    }
  }
})
</script>

<style scoped lang="less">

</style>
