import {TOKEN_NAME} from '@/config/global';
import request from '@/utils/request';

const InitUserInfo = {
  roles: [],
};

// 定义的state初始值
const state = {
  token: localStorage.getItem(TOKEN_NAME), // 默认token不走权限
  userInfo: InitUserInfo,
};

const mutations = {
  setToken(state, token) {
    localStorage.setItem(TOKEN_NAME, token);
    state.token = token;
  },
  removeToken(state) {
    localStorage.removeItem(TOKEN_NAME);
    state.token = '';
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
};

const getters = {
  token: (state) => state.token,
  roles: (state) => state.userInfo?.roles,
};

const actions = {
  async login({commit}, userInfo) {
    const mockLogin = async (userInfo) => {
      // 登录请求流程
      const {account, password} = userInfo;
      try {
        const res = await request.request({
          method: 'post',
          url: '/user/login',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': state.token
          },
          data: {
            userName: account,
            password: password
          },
          timeout: 3000
        })
        return {
          code: res.data.code,
          message: res.data.msg,
          data: res.data.data,
        }
      }catch (error) {
        return {
          code: error.code,
          message: error.message
        }
      }
    };
    const res = await mockLogin(userInfo);
    if (res.code === 200) {
      commit('setToken', res.data);
    }
    return res;
  },
  async getUserInfo({commit, state}) {
    const mockRemoteUserInfo = async (token) => {
      if (token === 'main_token') {
        return {
          name: 'td_main',
          roles: ['ALL_ROUTERS'],
        };
      }
      return {
        name: 'td_dev',
        roles: ['ALL_ROUTERS'],
      };
    };
    const res = await mockRemoteUserInfo(state.token);

    commit('setUserInfo', res);
  },
  async logout({commit}) {
    commit('setUserInfo', InitUserInfo);
  },
  async checkTokenExpiration({commit}, token) {
    const res = await request.request({
      method: "get",
      url: "/user/verify",
      headers: {
        'Authorization': token
      }
    });
    if (res.data.code === 200) {
      console.log(res.data.msg)
      return true;
    }
    if (res.data.code === 403) {
      commit('removeToken')
      return false;
    }
    if (res.data.code === 401) {
      commit('removeToken')
      return false;
    }
    return false;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
