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
          <t-tree :data="items" @click="onClick" :activable="isActive"/>
        </div>
      </t-col>
      <t-col :span="9">
        <div class="content-container">
          <t-row :gutter="16">
            <t-col :span="16">
              <span class="head">{{ title }}</span>
            </t-col>
          </t-row>
          <t-row :gutter="16" style="margin-top: 20px;margin-left: 10px;">
            <t-col :span="3">
              <span class="span_title">科室编码:</span>
            </t-col>
            <t-col :span="3">
              <span>{{ descriptions.code }}</span>
            </t-col>
            <t-col :span="3">
              <span class="span_title">科室名称:</span>
            </t-col>
            <t-col :span="3">
              <span>{{ descriptions.name }}</span>
            </t-col>
          </t-row>
          <t-row :gutter="16" style="margin-top: 22px;margin-left: 10px;">
            <t-col :span="3">
              <span class="span_title">科室人数:</span>
            </t-col>
            <t-col :span="3">
              <span>{{ descriptions.number }}</span>
            </t-col>
          </t-row>
          <t-row :gutter="16" style="margin-top: 22px;margin-left: 10px;">
            <t-col :span="3">
              <span class="span_title">科室简介:</span>
            </t-col>
            <t-col :span="13">
              <t-tooltip :content="descriptions.description" placement="bottom">
                <div class="span_desc">{{ descriptions.description }}</div>
              </t-tooltip>
            </t-col>
          </t-row>
        </div>

        <div class="table-container">
          <t-table :columns="columnsData" :display-columns="displayColumns" :data="tableData" :row-key="tableData.id">
            <template #operation="{ row }">
              <t-tooltip content="查看详情" placement="bottom">
                <t-button shape="circle" theme="primary" variant="text" @click="openDetail(row)">
                  <browse-icon/>
                </t-button>
              </t-tooltip>
            </template>
          </t-table>
        </div>
      </t-col>
    </t-row>
    <t-dialog :visible="isVisible"
              @close="closeDialog"
              @confirm="closeDialog"
              :cancelBtn="null"
              mode="modeless"
              header="个人信息"
              confirm-btn="关闭">
      <user-info :user-info-data="userInfo"/>
    </t-dialog>
  </div>
</template>
<script lang="ts">
import {BrowseIcon} from 'tdesign-icons-vue';
import UserInfo from "@/pages/hospital/DepartmentManage/components/userInfo.vue";

const descriptionsData = [
  {code: ""},
  {name: ""},
  {number: ""},
  {description: ""},
];

const INITIALIZE_COLUMNS = [
  {title: '序号', colKey: 'col', width: 50, align: 'center', cell: (h, {rowIndex}) => rowIndex + 1},
  {title: '姓名', colKey: 'realName', width: 80},
  {title: '年龄', colKey: 'age', width: 80},
  {
    title: '性别', colKey: 'sex', width: 80, cell: (h, {row}) => {
      const sexMap = {
        "0": "女",
        "1": "男"
      };
      if (row.sex === null || row.sex === undefined) {
        return "";
      }
      return sexMap[row.sex];
    }
  },
  {title: '联系方式', colKey: 'phoneNumber', width: 100},
  {title: '专业', colKey: 'profession', width: 60},
  {title: '学历', colKey: 'diploma', width: 60},
  {title: '操作', colKey: 'operation', width: 60,},
  {title: 'id', colKey: 'id', width: 0},
  {title: '住址', colKey: 'address', width: 60},
  {title: '头像', colKey: 'avatar', width: 60},
  {title: '注册时间', colKey: 'registertime', width: 60},
];

export default {
  components: {UserInfo, BrowseIcon},
  data() {
    return {
      title: "科室信息",
      isActive: true,
      descriptions: descriptionsData,
      items: [],
      columnsData: INITIALIZE_COLUMNS,
      tableData: [],
      displayColumns: ['col', 'realName', 'age', 'sex', 'phoneNumber', 'diploma', 'profession', 'operation'],
      userInfo: {},
      isVisible: false,
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
        console.log("数据：", res.data)
        this.descriptions = res.data;
      }).catch((err) => {
        this.$message("error", err.message);
      });
      this.$store.dispatch("getDepartmentUsers", obj.node.value).then((res) => {
        this.tableData = res.data;
      }).catch((err) => {
        this.$message("error", err.message);
      })
    },
    openDetail(row) {
      console.log(row)
      this.userInfo = row;
      this.isVisible = true;
    },
    closeDialog() {
      this.isVisible = false;
    }
  },
}
</script>
<style scoped lang="less">
@import "./index";
</style>
