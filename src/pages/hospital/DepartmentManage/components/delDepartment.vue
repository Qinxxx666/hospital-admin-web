<template>
  <t-dialog header="提示" :visible="visibleDel" :body="delMessage" @close="closeDialog" @confirm="confirmDialog">

  </t-dialog>
</template>

<script lang="ts">
export default ({
  props: {
    visibleDel: {
      type: Boolean,
      default: false,
    },
    delMessage: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeDialog(){
      this.$emit('close');
    },
    confirmDialog(){
      this.$emit('confirm');
    }
  }
})
</script>

<style scoped lang="less">

</style>
