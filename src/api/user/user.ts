import axiosClient from "../axiosClient";

const userApi = {
  getUserInfor: async () => {
    const response = await axiosClient.get("/api/getAccount");
    return response;
  },
};
export default userApi;
