<template>
  <div class="result-success">
    <check-circle-icon class="result-success-icon" />
    <div class="result-success-title">新建成功</div>
    <div class="result-success-describe">人员新建成功</div>
    <div>
      <t-button @click="() => this.$router.push('/hospital/userManage')">返回上一级</t-button>
      <t-button @click="() => this.$router.push('/form/base')" theme="default">返回首页</t-button>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon } from 'tdesign-icons-vue';

export default {
  name: 'ResultSuccess',
  components: {
    CheckCircleIcon,
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.result-success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;

  &-icon {
    font-size: 72px;
    color: var(--td-success-color);
  }

  &-title {
    margin-top: 28px;
    font-size: 20px;
    color: var(--td-text-color-primary);
    text-align: center;
    line-height: 28px;
    font-weight: 500;
  }

  &-describe {
    margin: 8px 0 32px;
    font-size: 14px;
    color: var(--td-text-color-secondary);
    line-height: 22px;
  }
}

.t-button + .t-button {
  margin-left: var(--td-comp-margin-s);
}
</style>
