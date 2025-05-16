import { JobResponse, JobTypeResponse } from "../../../types/JobType";
import {
  certificateType,
  educationType,
  projectType,
  ResponseUserType,
  skillType,
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
    uploadCV: builder.mutation<ResponseUserType<UserType>, FormData>({
      query: (data) => ({
        url: "uploadCV",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    removeCV: builder.mutation<ResponseUserType<UserType>, void>({
      query: () => ({
        url: "removeCV",
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUserInfo: builder.mutation<
      ResponseUserType<UserType[]>,
      | Partial<
          Omit<UserType, "avatarIMG"> & {
            avatarIMG: File | null;
          }
        >
      | FormData
      | { education: Partial<Omit<educationType, "_id">> & { _id: string } }
      | { education: Partial<Omit<educationType, "_id">> }
      | { certificate: Omit<certificateType, "_id"> }
      | { workEx: Omit<workExType, "_id"> }
      | { projects: Omit<projectType, "_id"> }
      | { skills: Partial<Omit<skillType, "_id">> & { _id: string } }
      | { skills: Partial<Omit<skillType, "_id">> }
    >({
      query: (data) => {
        return {
          url: "updateAccount",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    generateTextAi: builder.mutation<
      {
        success: boolean;
        data: {
          original: string;
          improved: string;
          field: string;
        };
      },
      { field: string; content: string }
    >({
      query: (data) => ({
        url: "improve_text",
        method: "POST",
        body: data,
      }),
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
    getAppliedJob: builder.query<JobTypeResponse<JobResponse[]>, string>({
      query: (id) => `appliedJobList/${id}`,
      providesTags: (result) =>
        generateProvidesTags("Jobs", result?.data, (items) => items._id),
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
  useGetAppliedJobQuery,
  useGenerateTextAiMutation,
  useUploadCVMutation,
  useRemoveCVMutation,
} = userApiSlice;
