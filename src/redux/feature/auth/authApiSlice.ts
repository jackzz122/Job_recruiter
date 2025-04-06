import { loginData, recruiterData, regisData } from "../../../types/AuthType";
import ApiSlice from "../../api/apiSlice";

function dataForLogin_Register<T>(data: T, url: string) {
  return {
    url: url,
    method: "POST",
    body: data,
  };
}

export const authApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation<string, loginData>({
      query: (credentials: loginData) => ({
        url: "/loginAccount",
        method: "POST",
        body: credentials,
      }),
    }),
    userRegister: builder.mutation({
      query: (userData: regisData) =>
        dataForLogin_Register(userData, "createAccount"),
    }),
    recruiterLogin: builder.mutation({
      query: (recruitCredentials: loginData) =>
        dataForLogin_Register(recruitCredentials, "loginRecruiter"),
    }),
    recruiterRegister: builder.mutation({
      query: (recruiterData: recruiterData) =>
        dataForLogin_Register(recruiterData, "RegisterRecruiter"),
    }),
    adminLogin: builder.mutation({
      query: (adminCredentials: loginData) =>
        dataForLogin_Register(adminCredentials, "adminLogin"),
    }),
    userLogOut: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useRecruiterLoginMutation,
  useRecruiterRegisterMutation,
  useAdminLoginMutation,
  useUserLogOutMutation,
} = authApiSlice;
