<template>
  <t-card :bordered="false">
    <t-space direction="vertical">
      <t-space>
        <t-select clearable placeholder="请选择部门" style="width: 11rem"/>
        <t-input placeholder="姓名" style="width: 11rem">
          <template #prefixIcon>
            <search-icon :style="{ cursor: 'pointer' }"/>
          </template>
        </t-input>
        <t-button>查询</t-button>
        <t-button variant="outline" @click="() => this.$router.push({name: 'UserForm'})">新增</t-button>
      </t-space>
      <t-table
        :columns="columns"
        row-key="id"
        :data="data"
        :bordered="bordered"
        :hover="hover"
        :table-layout="tableLayout"
        resizable
      >

      </t-table>
    </t-space>
  </t-card>
</template>

<script lang="jsx">
import {
  SearchIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon
} from 'tdesign-icons-vue';

const initData = [];
const initColumn = [
  {title: '序号', colKey: 'col', width: 60, align: 'center', cell: (h, {rowIndex}) => rowIndex + 1},
  {title: '姓名', colKey: 'realName', ellipsis: true, align: 'center'},
  {title: '职位', colKey: 'role', ellipsis: true, align: 'center'},
  {title: '部门', colKey: 'department', ellipsis: true, align: 'center'},
  {title: '年龄', colKey: 'age', ellipsis: true, align: 'center'},
  {
    title: '性别', colKey: 'sex', ellipsis: true, align: 'center', cell: (h, {row}) => {
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
  {title: '联系方式', colKey: 'phoneNumber', ellipsis: true, align: 'center'},
  {title: '邮箱', colKey: 'email', ellipsis: true, align: 'center'},
  {
    title: '是否允许登录', colKey: 'enabledLogin', ellipsis: true, align: 'center', cell: (h, {row}) => {
      const enabledLoginMap = {
        "0": {label: '拒绝登录', theme: 'danger', icon: <CloseCircleFilledIcon/>},
        "1": {label: '允许登录', theme: 'success', icon: <CheckCircleFilledIcon/>}
      };
      if (row.enabledLogin === null || row.enabledLogin === undefined) {
        return "";
      }
      return <t-tag shape="round" theme={enabledLoginMap[row.enabledLogin].theme} variant="light-outline" size="small">
        {enabledLoginMap[row.enabledLogin].icon}
        {enabledLoginMap[row.enabledLogin].label}
      </t-tag>;
    }
  },
  {title: '头像', colKey: 'avatar', ellipsis: true, align: 'center'}];
export default {
  components: {
    SearchIcon,
  },
  data() {
    return {
      data: initData,
      hover: true,
      bordered: true,
      columns: initColumn,
      tableLayout: 'fixed',
      dialogHeader: "新增",
      visible: false,
    }
  },
  created() {
    this.initDataFun();
  },
  mounted() {
  },
  methods: {
    async initDataFun() {
      const res = await this.$store.dispatch('userManage/getUserList');
      if (res.code !== 200) {
        await this.$notify.warning({title: '提示', content: res.msg, duration: 2000})
        return;
      }
      this.data = res.data;
    },
  }
}
</script>
<style scoped lang="less">

</style>

