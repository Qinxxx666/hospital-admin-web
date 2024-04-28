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
  }
};
export default {
  namespace: true,
  actions
}
