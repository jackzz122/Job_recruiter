import { loginData, regisData } from "../../context/types/AuthType";
import axiosClient from "../axiosClient";

const authApi = {
  login: async (data: loginData) => {
    const response = await axiosClient.post("/api/loginAccount", data);
    return response;
  },
  register: async (data: regisData) => {
    console.log("data", data);
    const response = await axiosClient.post("/api/createAccount", data);
    return response;
  },
};

export default authApi;
