import { regisData } from "./../../../types/AuthType";
import { ResponseUserType, UserType } from "../../../types/UserType";
import ApiSlice from "../../api/apiSlice";
import { CompanyType, CompanyTypeResponse } from "../../../types/CompanyType";
import { generateProvidesTags } from "../../generateProvideTags";
import { userEdit } from "../../../JobRecruiter/EmployeeInfor/EmployeeEdit";

interface recruiterAddType extends regisData {
  companyId: string | CompanyType;
}

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
    updateUserInfo: builder.mutation<ResponseUserType<UserType[]>, userEdit>({
      query: (data) => ({
        url: "updateAccount",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getRecruiters: builder.query<ResponseUserType<UserType[]>, string>({
      query: (id) => `getRecruiter/${id}`,
      providesTags: (results) =>
        generateProvidesTags("Recruiter", results?.data, (item) => item._id),
    }),
    createRecruiter: builder.mutation<
      ResponseUserType<UserType>,
      recruiterAddType
    >({
      query: (data) => ({
        url: "createStaff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Recruiter", id: "LIST" }],
    }),
    updateCompanyInfo: builder.mutation<
      CompanyTypeResponse<CompanyType>,
      CompanyType
    >({
      query: (data) => ({
        url: `updateCompany/${data._id}`,
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
    removeFavouriteJob: builder.mutation<ResponseUserType<string[]>, string>({
      query: (id: string) => ({
        url: `removeFavouriteJob/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteRecruiter: builder.mutation<ResponseUserType<UserType>, string>({
      query: (id) => ({
        url: `deleteStaffAccount/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Recruiter", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  useCreateRecruiterMutation,
  useGetRecruitersQuery,
  useDeleteRecruiterMutation,
  useUpdateCompanyInfoMutation,
  useUpdateUserInfoMutation,
  useAddFavouriteCompanyMutation,
  useRemoveFavouriteCompanyMutation,
  useRemoveFavouriteJobMutation,
} = userApiSlice;
