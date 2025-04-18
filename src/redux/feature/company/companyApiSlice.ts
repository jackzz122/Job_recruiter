import { generateProvidesTags } from "./../../generateProvideTags";
import { CompanyType, CompanyTypeResponse } from "../../../types/CompanyType";
import ApiSlice from "../../api/apiSlice";

export const companyApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query<CompanyTypeResponse<CompanyType[]>, void>({
      query: () => "companyList",
      providesTags: (results) =>
        generateProvidesTags("Companies", results?.data, (item) => item._id),
    }),
    getDetailCompany: builder.query<CompanyTypeResponse<CompanyType>, string>({
      query: (id) => `companyInfo/${id}`,
      providesTags: [{ type: "Companies", id: "LIST" }],
    }),
  }),
});
export const { useGetCompanyQuery, useGetDetailCompanyQuery } = companyApiSlice;
