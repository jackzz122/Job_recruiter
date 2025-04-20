import { regisData } from "../../../types/AuthType";
import { CompanyType, CompanyTypeResponse } from "../../../types/CompanyType";
import { ResponseUserType, UserType } from "../../../types/UserType";
import ApiSlice from "../../api/apiSlice";
import { generateProvidesTags } from "../../generateProvideTags";
interface recruiterAddType extends regisData {
  companyId: string | CompanyType;
}
export const recruiterApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  useCreateRecruiterMutation,
  useDeleteRecruiterMutation,
  useGetRecruitersQuery,
  useUpdateCompanyInfoMutation,
} = recruiterApiSlice;
