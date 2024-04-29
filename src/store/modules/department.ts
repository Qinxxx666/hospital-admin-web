import request from "@/utils/request";

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
  async getDepartmentInfoById({state},id){
    try {
      const res = await request.request({
        url: `/department/info/${id}`,
        method: "get",
      });
      return res.data;
    }catch (e) {
      console.log(e)
      throw e;
    }
  }
};
export default {
  namespace: true,
  actions
}
