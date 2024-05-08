<template>
  <div>
    <t-row :gutter="12">
      <t-col :span="3">
        <div class="tree-container">
          <t-space>
            <t-button theme="default" variant="outline" size="small" @click="addDepRoot">添加顶级节点</t-button>
          </t-space>
          <t-tree :data="items" @click="onClick" :activable="isActive">
            <template #operations="{ node }">
              <t-tooltip content="添加">
                <t-button shape="circle" theme="success" variant="text" @click="addNode(node)">
                  <add-icon style="color: #2ba471"/>
                </t-button>
              </t-tooltip>
              <t-tooltip content="删除">
                <t-button shape="circle" theme="danger" variant="text" @click="delDepartment(node)">
                  <delete-icon style="color: #d54941"/>
                </t-button>
              </t-tooltip>
            </template>
          </t-tree>
          <add-department :isVisible="addDialog" :departmentInfo="parentDepartmentInfo"
                          @closeDialog="controlAddDialog" @confirm="handleConfirm"/>
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
          <t-space>
            <t-tooltip content="添加人员">
              <t-button theme="default" variant="text" size="medium" @click="openAddUserDialog">
                <user-add-icon/>
              </t-button>
            </t-tooltip>
          </t-space>
          <t-table :columns="columnsData" :display-columns="displayColumns" :data="tableData" :row-key="tableData.id">
            <template #operation="{ row }">
              <t-space :size="2">
                <t-tooltip content="查看详情" placement="bottom">
                  <t-button shape="circle" size="small" theme="primary" variant="text" @click="openDetail(row)">
                    <browse-icon/>
                  </t-button>
                </t-tooltip>
                <t-tooltip content="移除人员" placement="bottom">
                  <t-button shape="circle" size="small" theme="danger" variant="text" @click="removeUser(row)">
                    <delete-icon/>
                  </t-button>
                </t-tooltip>
              </t-space>

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
    <del-department :visibleDel="delDialog" :delMessage="delMessageStr" @close="closeDelDialog" @confirm="confirmDel"/>
    <user-list :departmentUserDialogVisible="addUserDialog" @closeDialog="addUserDialog = false"
               :departmentInfo="parentDepartmentInfo" @save="addUserSave"/>
  </div>
</template>
<script lang="ts">
import {BrowseIcon, AddIcon, DeleteIcon, UserAddIcon} from 'tdesign-icons-vue';
import UserInfo from "@/pages/hospital/DepartmentManage/components/userInfo.vue";
import AddDepartment from "@/pages/hospital/DepartmentManage/components/addDepartment.vue";
import DelDepartment from "@/pages/hospital/DepartmentManage/components/delDepartment.vue";
import UserList from "@/pages/hospital/DepartmentManage/components/addUserDepartment.vue";

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
  components: {UserInfo, BrowseIcon, AddIcon, DeleteIcon, AddDepartment, DelDepartment, UserAddIcon, UserList},
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
      addDialog: false,
      delDialog: false,
      delMessageStr: '',
      childDepartmentIds: [],
      parentsDepartmentIds: [],
      parentDepartmentInfo: {},
      addUserDialog: false,
    }
  },
  created() {
  },
  mounted() {
    this.initTree();
  },
  methods: {
    initTree() {
      this.items = [];
      this.$store.dispatch("department/getDepartmentList").then((res) => {
        this.items = res.data
      }).catch((err) => {
        this.$message("error", err.message);
      })
    },
    onClick(obj) {
      this.parentDepartmentInfo = {};
      this.parentDepartmentInfo.name = obj.node.label;
      this.parentDepartmentInfo.id = obj.node.value;
      // 获取选择节点所有子科室信息包括自己
      this.childDepartmentIds = [];
      this.childDepartmentIds.push(obj.node.value);
      // 获取选择节点所有父科室信息包括自己
      this.parentsDepartmentIds = [];
      this.parentsDepartmentIds.push(obj.node.value)
      const parents = obj.node.getParents();
      if (parents.length > 0) {
        parents.forEach(parent => {
          this.parentsDepartmentIds.push(parent.value);
        });
      }
      this.getChildrenId(obj.node.data.children);
      this.$store.dispatch("department/getDepartmentInfoById", obj.node.value).then((res) => {
        this.descriptions = res.data;
      }).catch((err) => {
        this.$message("error", err.message);
      });
      this.$store.dispatch("department/getDepartmentUsers", obj.node.value).then((res) => {
        this.tableData = res.data;
      }).catch((err) => {
        this.$message("error", err.message);
      })
    },
    openDetail(row) {
      this.userInfo = row;
      this.isVisible = true;
    },
    removeUser(row) {
      const confirmDia = this.$dialog.confirm({
        header: '提示',
        theme: 'warning',
        body: '你确定要删除该项么？',
        confirmBtn: '确定',
        cancelBtn: '取消',
        onConfirm: () => {
          const allDepartment = [...this.parentsDepartmentIds, ...this.childDepartmentIds];
          const params = {
            departmentId: Array.from(new Set(allDepartment)),
            userId: row.id
          }
          this.$store.dispatch("department/removeUser", params).then(res => {
            if (res.code === 200) {
              this.$notify.success({title: "提示", content: "移除成功", closeBtn: true});
              // 请求成功后，销毁弹框
              confirmDia.destroy();
              this.$store.dispatch("department/getDepartmentUsers", this.parentDepartmentInfo.id).then((res) => {
                this.tableData = res.data;
              }).catch((err) => {
                this.$message("error", err.message);
              });
            } else {
              this.$notify.error({title: "提示", content: "移除失败", closeBtn: true});
            }
          }).catch(e => {
            this.$notify.error({title: "提示", content: `系统出现异常：${e}`, closeBtn: true});
          })
        },
        onClose: () => {
          confirmDia.hide();
        },
      });
    },
    closeDialog() {
      this.isVisible = false;
    },
    addNode() {
      this.addDialog = true;
    },
    controlAddDialog(param) {
      this.addDialog = param;
    },
    handleConfirm(formData) {
      this.$store.dispatch("department/addDepartment", formData).then(res => {
        if (res.code === 200) {
          this.$notify.success({title: "提示", content: "添加成功", closeBtn: true});
          this.addDialog = false;
          this.initTree();
        } else {
          this.$notify.error({title: "提示", content: "添加失败", closeBtn: true});
        }
      }).catch(e => {
        this.$notify.error({title: "提示", content: `系统出现异常：${e}`, closeBtn: true});
      }).finally(() => {
        this.parentDepartmentInfo = {};
      })
    },
    delDepartment(node) {
      const children = node.getChildren();
      if (children !== false) {
        this.delMessageStr = "是否删除该科室及其下所有子科室？";

      } else {
        this.delMessageStr = "是否删除该科室？";
      }
      this.delDialog = true;
    },
    closeDelDialog() {
      this.delDialog = false;
    },
    confirmDel() {
      this.$store.dispatch("department/deleteDepartment", this.childDepartmentIds).then(res => {
        if (res.code === 200) {
          this.$notify.success({title: "提示", content: "删除成功", closeBtn: true});
          this.initTree();
          this.delDialog = false;
        } else {
          this.$notify.error({title: "提示", content: "删除失败", closeBtn: true});
        }
      }).catch(e => {
        this.$notify.error({title: "提示", content: `系统出现异常：${e}`, closeBtn: true});
      }).finally(() => {
        this.childDepartmentIds = [];
      })
    },
    getChildrenId(children) {
      if (children === null) return;
      for (let i = 0; i < children.length; i++) {
        this.childDepartmentIds.push(children[i].value)
        this.getChildrenId(children[i].children);
      }
    },
    addDepRoot() {
      this.addDialog = true;
      this.parentDepartmentInfo = {}
    },
    openAddUserDialog() {
      if (this.parentDepartmentInfo.id === undefined) {
        this.$notify.warning({title: "提示", content: "请先选择一个科室", closeBtn: true});
        return;
      }
      this.addUserDialog = true;
    },
    addUserSave(userIds) {
      const params = {
        departmentListId: this.parentsDepartmentIds,
        userIdList: userIds
      };
      this.$store.dispatch('department/addUserList', params).then(res => {
        if (res.code === 200) {
          this.$notify.success({title: "提示", content: "添加成功", closeBtn: true});
          this.addUserDialog = false;
          this.$store.dispatch("department/getDepartmentUsers", this.parentDepartmentInfo.id).then((res) => {
            this.tableData = res.data;
          }).catch((err) => {
            this.$message("error", err.message);
          })
        } else {
          this.$notify.error({title: "提示", content: "添加失败", closeBtn: true});
        }
      }).catch(e => {
        this.$notify.error({title: "提示", content: `系统出现异常：${e}`, closeBtn: true});
      })
    }
  },
}
</script>
<style scoped lang="less">
@import "./index";
</style>
