<template>
  <div class="container">
    <t-row :gutter="[12, 12]" align="center">
      <t-col span="3" class="t-col-offset-4 contract">
        <t-image :src="UserInfoData.avatar"
                 :style="{ width: '160px', height: '160px' }"
                 shape="circle"
                 fit="cover">
        </t-image>
      </t-col>
    </t-row>
  </div>
</template>
<script lang="ts">

export default {
  methods: {
  },
  props: {
    UserInfoData: {
      type: Object,
    }
  },
}
</script>
<style scoped lang="less">
@import "userInfo";
</style>
