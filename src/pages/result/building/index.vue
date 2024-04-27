<template>
  <div class="result-container">
    <div class="result-bg-img">
      <t-image :src="require('@/assets/assets-result-building.png')" />
    </div>
    <div class="result-title">网站建设中...</div>
    <div class="result-tip">请耐心等待</div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'building',
}

</script>
<style scoped lang="less">
.result {
  &-link {
    color: var(--td-brand-color);
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: var(--td-brand-color);
    }

    &:active {
      color: var(--td-brand-color);
    }

    &--active {
      color: var(--td-brand-color);
    }

    &:focus {
      text-decoration: none;
    }
  }

  &-container {
    min-height: 400px;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  &-bg-img {
    width: 200px;
    color: var(--td-brand-color);
  }

  &-title {
    color: var(--td-text-color-primary);
    font: var(--td-font-title-large);
    font-weight: 500;
    font-style: normal;
    margin-top: 8px;
  }

  &-tip {
    margin: 8px 0 32px;
    font: var(--td-font-body-medium);
    color: var(--td-text-color-secondary);
  }
}
</style>
