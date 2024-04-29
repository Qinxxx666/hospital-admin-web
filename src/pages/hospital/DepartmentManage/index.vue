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
          <t-tree :data="items" @click="onClick" activable="true"/>
        </div>
      </t-col>
      <t-col :span="9">
        <div class="content-container">
         <t-row :gutter="16">
           <t-col :span="16">
           <span class="head">{{title}}</span>
           </t-col>
         </t-row>
          <t-row :gutter="16" style="margin-top: 20px;margin-left: 10px;">
            <t-col :span="3">
              <span class="span_title">科室编码:</span>
            </t-col>
            <t-col :span="3">
              <span>{{descriptions.code}}</span>
            </t-col>
            <t-col :span="3">
              <span class="span_title">科室名称:</span>
            </t-col>
            <t-col :span="3">
              <span>{{descriptions.name}}</span>
            </t-col>
          </t-row>
          <t-row :gutter="16" style="margin-top: 22px;margin-left: 10px;">
            <t-col :span="3">
              <span class="span_title">科室人数:</span>
            </t-col>
            <t-col :span="3">
              <span>{{descriptions.number}}</span>
            </t-col>
          </t-row>
          <t-row :gutter="16" style="margin-top: 22px;margin-left: 10px;">
            <t-col :span="3">
              <span class="span_title">科室简介:</span>
            </t-col>
            <t-col :span="13">
              <t-tooltip :content="descriptions.description" placement="bottom">
                <div class="span_desc">{{descriptions.description}}</div>
              </t-tooltip>
            </t-col>
          </t-row>
        </div>

        <div class="table-container">

        </div>
      </t-col>
    </t-row>

  </div>
</template>
<script lang="ts">

const descriptionsData = [
  {code: ""},
  {name: ""},
  {number: ""},
  {description: ""},
];
export default {
  data() {
    return {
      title: "科室信息",
      descriptions: descriptionsData,
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
    },

    onClick(obj) {
      this.$store.dispatch("getDepartmentInfoById", obj.node.value).then((res) => {
        this.descriptions = res.data;
        console.log("-----", this.descriptions)
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
