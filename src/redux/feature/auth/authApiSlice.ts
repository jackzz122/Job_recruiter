import { loginData, recruiterData, regisData } from "../../../types/AuthType";
import { ResponseType } from "../../../types/ResponseType";
import { UserType } from "../../../types/UserType";
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
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    userRegister: builder.mutation<ResponseType<UserType>, regisData>({
      query: (userData: regisData) =>
        dataForLogin_Register(userData, "createAccount"),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    forgotPassword: builder.mutation<ResponseType<{ id: string }>, string>({
      query: (email: string) => ({
        url: "/forgotPassword",
        method: "POST",
        body: { email },
      }),
    }),
    recruiterRegister: builder.mutation<ResponseType<UserType>, recruiterData>({
      query: (recruiterData: recruiterData) =>
        dataForLogin_Register(recruiterData, "RegisterRecruiter"),
    }),
    verifyCode: builder.mutation<
      ResponseType<UserType>,
      { id: string; code: string }
    >({
      query: ({ id, code }) => ({
        url: "/verifyCode",
        method: "POST",
        body: { id, code },
      }),
    }),
    resetPassword: builder.mutation<
      ResponseType<UserType>,
      { id: string; newPassword: string }
    >({
      query: ({ id, newPassword }) => ({
        url: "/resetPassword",
        method: "POST",
        body: { id, newPassword },
      }),
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
  useForgotPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} = authApiSlice;
