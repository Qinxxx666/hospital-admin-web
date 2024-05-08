import request from "@/utils/request";
import {TOKEN_NAME} from "@/config/global";

const actions = {
  async getDepartmentList() {
    try {
      const res = await request.request({
        url: "/department/list",
        method: "get",
      });
      return res.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
  async getDepartmentInfoById({state}, id) {
    try {
      const res = await request.request({
        url: `/department/info/${id}`,
        method: "get",
        headers: {
          Authorization: localStorage.getItem(TOKEN_NAME),
        },
      });
      return res.data;
    } catch (e) {
      console.log(e)
      throw e;
    }
  },
  async getDepartmentUsers({state}, id) {
    try {
      const res = await request.request({
        url: `/department/user/list/${id}`,
        method: "get",
        headers: {
          Authorization: localStorage.getItem(TOKEN_NAME),
        },
      });
      return res.data;
    } catch (e) {
      console.log(e)
      throw e;
    }
  },
  async addDepartment({state}, params) {
    try {
      const res = await request.request({
        url: "/department/add",
        method: "post",
        data: params,
        headers: {
          Authorization: localStorage.getItem(TOKEN_NAME),
          'content-type': 'application/x-www-form-urlencoded'
        },
      });
      return res.data;
    } catch (e) {
      console.log(e)
      throw e;
    }
  },

  async deleteDepartment({state}, ids) {
    try {
      const res = await request.request({
        url: '/department/delete/',
        method: "post",
        data: ids,
        headers: {
          'content-type': 'application/json',
          Authorization: localStorage.getItem(TOKEN_NAME),
        },
      })
      return res.data;
    } catch (e) {
      console.log(e)
      throw e;
    }
  },

  async getUserList({state}, id) {
    try {
      const res = await request.request({
        url: `/department/getUserList/${id}`,
        method: "get",
        headers: {
          Authorization: localStorage.getItem(TOKEN_NAME)
        }
      });
      return res.data;
    } catch (e) {
      console.log(e)
      throw e;
    }

  },
  async addUserList({state}, params) {
    try {
      const res = await request.request({
        url: `/department/addUser`,
        method: "post",
        data: params,
        headers: {
          Authorization: localStorage.getItem(TOKEN_NAME)
        }
      });
      return res.data;
    } catch (e) {
      console.log(e)
      throw e;
    }
  },
  async removeUser({state}, params) {
    const {departmentId, userId} = params;
    try {
      const res = await request.request({
        url: `/department/remove`,
        method: "post",
        params: {
          userId
        },
        data: departmentId,
        headers: {
          Authorization: localStorage.getItem(TOKEN_NAME)
        }
      });
      return res.data;
    } catch (e) {
      console.log(e)
      throw e;
    }
  }
}
export default {
  namespaced: true,
  actions
}
