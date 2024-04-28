<template>
  <div>
    <t-row :gutter="12">
      <t-col :span="3">
        <div class="tree-container">
          <t-space>
            <t-button theme="primary" size="small" variant="dashed">新增</t-button>
            <t-button theme="warning" size="small" variant="dashed">修改</t-button>
            <t-button theme="danger" size="small" variant="dashed">删除</t-button>
          </t-space>
          <t-tree activable="1" :data="items" lazy="1"/>
        </div>
      </t-col>
      <t-col :span="9">
        <div class="content-container">
          <t-descriptions title="科室信息" size="small">
            <t-descriptions-item label="科室代码">H-001</t-descriptions-item>
            <t-descriptions-item label="科室名称">XX科</t-descriptions-item>
            <t-descriptions-item label="科室人数">26人</t-descriptions-item>
            <t-descriptions-item label="科室描述">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</t-descriptions-item>
          </t-descriptions>
        </div>

        <div class="table-container">

        </div>
      </t-col>
    </t-row>

  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      title: "科室信息",
      items: [],
    }
  },
  created() {
  },
  mounted() {
    this.initTree();
  },
  methods: {
    initTree() {
      this.$store.dispatch("getDepartmentList").then((res) => {
        this.items = res.data
      }).catch((err) => {
        this.$message("error", err.message);
      })
    }
  },
}
</script>
<style scoped lang="less">
@import "./index";
</style>
