import VueRouter from 'vue-router';

import baseRouters from './modules/base';
import componentsRouters from './modules/components';
import othersRouters from './modules/others';

const env = import.meta.env.MODE || 'development';

// 存放动态路由
export const asyncRouterList = [...baseRouters, ...componentsRouters, ...othersRouters];

// 存放固定的路由
const defaultRouterList = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },
  // 重定向根路径到登录页
  {
    path: '/',
    redirect: '/login',
  },
  // 其他不需要认证的公开路由可以放在这里
  // ...其他公开路由

  // 然后是可能需要认证的路由
  ...asyncRouterList, // 假设 asyncRouterList 包含需要认证的路由
];

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: env === 'site' ? '/starter/vue/' : null,
    routes: defaultRouterList,
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
