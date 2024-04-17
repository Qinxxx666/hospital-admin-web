import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

import store from '@/store';
import router from '@/router';
import request from "@/utils/request";

NProgress.configure({ showSpinner: false });

const whiteListRouters = store.getters['permission/whiteListRouters'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  async function checkTokenExpiration(token) {
    const res = await request.request({
      method: "get",
      url: "/user/verify",
      headers: {
        'Authorization': token
      }
    });
    console.log(res.data.code)
    if (res.data.code === 200) {
      console.log(res.data.msg)
      return true;
    }
    if (res.data.code === 403) {
      console.log(res.data.msg)
      return false;
    }
    if (res.data.code === 401) {
      console.log(res.data.msg)
      return false;
    }
  }

  const token = store.getters['user/token'];

  if (token) {
    if (!await checkTokenExpiration(token))
    {
      await store.commit('user/removeToken');

      next(`/login?redirect=${to.path}`);
      return;
    }
    if (to.path === '/login') {
      setTimeout(() => {
        store.dispatch('user/logout');
        store.dispatch('permission/restore');
      });
      next();
      return;
    }

    const roles = store.getters['user/roles'];

    if (roles && roles.length > 0) {
      next();
    } else {
      try {
        await store.dispatch('user/getUserInfo');

        await store.dispatch('permission/initRoutes', store.getters['user/roles']);

        next({ ...to });
      } catch (error) {
        await store.commit('user/removeToken');
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {
    /* white list router */
    if (whiteListRouters.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
