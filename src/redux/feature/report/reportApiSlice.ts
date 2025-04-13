import { ReportResponseType, ReportType } from "../../../types/ReportType";
import ApiSlice from "../../api/apiSlice";
import { generateProvidesTags } from "../../generateProvideTags";

export const reportApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<ReportResponseType<ReportType[]>, void>({
      query: () => "reports",
      providesTags: (results) =>
        generateProvidesTags("Reports", results?.data, (item) => item._id),
    }),
    createReport: builder.mutation<ReportResponseType<ReportType>, ReportType>({
      query: (data) => ({
        url: "createReport",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Reports", id: "LIST" }],
    }),
    deleteReport: builder.mutation<ReportResponseType<ReportType>, string>({
      query: (id: string) => ({
        url: `/reports/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (results, error, id) => [{ type: "Reports", id }],
    }),
  }),
});
export const { useCreateReportMutation, useGetReportsQuery } = reportApiSlice;
