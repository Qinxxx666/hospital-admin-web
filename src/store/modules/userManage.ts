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
    }).then(res =>{
      if (res.status !== 200)
      {
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
  }
};
export default {
  namespaced: true,
  actions
};
