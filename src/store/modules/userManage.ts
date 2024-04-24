import request from "@/utils/request";
import {TOKEN_NAME} from "@/config/global";

const actions = {
  async getUserList() {
    const res = await request.request({
      url: "/user/getUserList",
      method: "get",
      headers: {
        Authorization: localStorage.getItem(TOKEN_NAME)
      }
    }).then(res => {
      if (res.status !== 200) {
        return {
          code: 500,
          msg: "请求失败"
        }
      }
      return {
        code: 200,
        msg: "请求成功",
        data: res.data
      };
    });
    return res;
  },
  async addUser({state}, formData) {
    const res = await request.request({
      url: "/user/add",
      method: "post",
      headers: {
        Authorization: localStorage.getItem(TOKEN_NAME),
        'content-type': 'multipart/form-data'
      },
      data: {
        userName: formData.userName,
        email: formData.email,
        realName: formData.realName,
        phoneNumber: formData.phoneNumber,
        enabledLogin: formData.enabledLogin,
        age: formData.age,
        avatarFile: formData.avatarFile[0].raw
      }
    }).then(res => {
      if (res.status !== 200) {
        return {
          code: 500,
          msg: "添加失败"
        }
      }
      return {
        code: 200,
        msg: "添加成功"
      };
    })
    return res;
  }
};
export default {
  namespaced: true,
  actions
};
