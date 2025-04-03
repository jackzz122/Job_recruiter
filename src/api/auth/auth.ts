import { loginData, recruiterData, regisData } from "../../types/AuthType";
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
  recruiterLogin: async (data: loginData) => {
    const response = await axiosClient.post("/api/loginRecruiter", data);
    return response;
  },
  recruiterRegister: async (data: recruiterData) => {
    const response = await axiosClient.post("/api/RegisterRecruiter", data);
    return response;
  },
  adminLogin: async (data: loginData) => {
    const response = await axiosClient.post("/api/loginAdmin", data);
    return response;
  },
};

export default authApi;
