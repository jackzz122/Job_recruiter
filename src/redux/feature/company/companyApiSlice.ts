import ApiSlice from "../../api/apiSlice";

export const companyApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: (id) => `companyInfo/${id}`,
    }),
  }),
});
export const { useGetCompanyQuery } = companyApiSlice;
