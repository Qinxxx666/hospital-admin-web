import Layout from "@/layouts/index.vue";
import Building from "@/pages/result/building/index.vue";
import Department from "@/pages/hospital/DepartmentManage/index.vue"

export default [
  {
    path: '/baseData',
    name: 'baseData',
    meta: {title: '基础数据', icon: 'setting-1'},
    component: Layout,
    children: [
      {
        path: 'role',
        name: 'role',
        component: Building,
        meta: {title: '职称管理', icon: 'member'},
      },
      {
        path: 'department',
        name: 'department',
        component: Department,
        meta: {title: '科室管理', icon: 'city-8'},
      }
    ]
  }
];
