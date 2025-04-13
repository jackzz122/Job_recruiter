// import { CompanyType, CompanyTypeResponse } from "../../../types/CompanyType";
// import ApiSlice from "../../api/apiSlice";

// export const companyApiSlice = ApiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     updateCompanyInfo: builder.mutation<
//       CompanyTypeResponse<CompanyType>,
//       CompanyType
//     >({
//       query: (data) => ({
//         url: `updateCompany/${data._id}`,
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: [{ type: "Users", id: "LIST" }],
//     }),
//   }),
// });
// export const { useUpdateCompanyInfoMutation } = companyApiSlice;
