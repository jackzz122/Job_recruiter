import {
  certificateType,
  educationType,
  projectType,
  ResponseUserType,
  UserType,
  workExType,
} from "../../../types/UserType";
import ApiSlice from "../../api/apiSlice";
import { generateProvidesTags } from "../../generateProvideTags";

export const userApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<ResponseUserType<UserType[]>, void>({
      query: () => "getListUser",
      providesTags: (results) =>
        generateProvidesTags("Users", results?.data, (item) => item._id),
    }),
    getUserInfo: builder.query<ResponseUserType<UserType>, void>({
      query: () => "getAccount",
      providesTags: () => [{ type: "Users", id: "LIST" }],
    }),
    updateUserInfo: builder.mutation<
      ResponseUserType<UserType[]>,
      | Partial<UserType>
      | { education: Omit<educationType, "_id"> }
      | { certificate: Omit<certificateType, "_id"> }
      | { workEx: Omit<workExType, "_id"> }
      | { projects: Omit<projectType, "_id"> }
    >({
      query: (data) => ({
        url: "updateAccount",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    changePassword: builder.mutation<
      ResponseUserType<UserType>,
      { oldPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: "changePassword",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    addFavouriteCompany: builder.mutation<ResponseUserType<string[]>, string>({
      query: (id: string) => ({
        url: `companyFavourite/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    removeFavouriteCompany: builder.mutation<
      ResponseUserType<string[]>,
      string
    >({
      query: (id: string) => ({
        url: `removeFavouriteCompany/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    addFavouriteJob: builder.mutation<ResponseUserType<string[]>, string>({
      query: (id: string) => ({
        url: `jobFavourite/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    removeFavouriteJob: builder.mutation<ResponseUserType<string[]>, string>({
      query: (id: string) => ({
        url: `removeFavouriteJob/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteAccount: builder.mutation<ResponseUserType<UserType>, void>({
      query: () => ({
        url: "deleteAccount",
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useAddFavouriteCompanyMutation,
  useRemoveFavouriteCompanyMutation,
  useRemoveFavouriteJobMutation,
  useAddFavouriteJobMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
} = userApiSlice;
