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
    userLogin: builder.mutation<string, loginData & { roleGroup: string[] }>({
      query: (credentials: loginData) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    userRegister: builder.mutation({
      query: (userData: regisData) =>
        dataForLogin_Register(userData, "createAccount"),
    }),
    recruiterRegister: builder.mutation({
      query: (recruiterData: recruiterData) =>
        dataForLogin_Register(recruiterData, "RegisterRecruiter"),
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
  useRecruiterRegisterMutation,
  useUserLogOutMutation,
} = authApiSlice;
