import { regisData } from "./../../../types/AuthType";
import { UserType } from "../../../types/UserType";
import ApiSlice from "../../api/apiSlice";
import { CompanyType, CompanyTypeResponse } from "../../../types/CompanyType";
import { generateProvidesTags } from "../../generateProvideTags";

type UserResponse = {
  success: boolean;
  user: UserType;
};

interface recruiterAddType extends regisData {
  companyId: string | CompanyType;
}

export const userApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserType[], void>({
      query: () => "getListUser",
      providesTags: (results) =>
        generateProvidesTags("Users" as const, results, (item) => item._id),
    }),
    getUserInfo: builder.query<UserResponse, void>({
      query: () => "getAccount",
      providesTags: () => [{ type: "Users", id: "LIST" }],
    }),
    getRecruiters: builder.query<UserType[], string>({
      query: (id) => `getRecruiter/${id}`,
      providesTags: (results) =>
        generateProvidesTags("Recruiter", results, (item) => item._id),
    }),
    createRecruiter: builder.mutation<UserType, recruiterAddType>({
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
    deleteRecruiter: builder.mutation<UserType, string>({
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
} = userApiSlice;
