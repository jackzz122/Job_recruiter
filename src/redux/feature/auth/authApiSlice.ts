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
    userLogin: builder.mutation({
      query: (credentials: loginData) => dataForLogin_Register(credentials, ""),
    }),
    userRegister: builder.mutation({
      query: (userData: regisData) => dataForLogin_Register(userData, ""),
    }),
    recruiterLogin: builder.mutation({
      query: (recruitCredentials: loginData) =>
        dataForLogin_Register(recruitCredentials, ""),
    }),
    recruiterRegister: builder.mutation({
      query: (recruiterData: recruiterData) =>
        dataForLogin_Register(recruiterData, ""),
    }),
    adminLogin: builder.mutation({
      query: (adminCredentials: loginData) =>
        dataForLogin_Register(adminCredentials, "adminLogin"),
    }),
    userLogOut: builder.query<void, void>({
      query: () => "logout",
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useRecruiterLoginMutation,
  useRecruiterRegisterMutation,
  useAdminLoginMutation,
} = authApiSlice;
