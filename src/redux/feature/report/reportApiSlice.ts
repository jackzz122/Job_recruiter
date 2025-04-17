import {
  getReportItem,
  ReportResponseType,
  ReportType,
} from "../../../types/ReportType";
import ApiSlice from "../../api/apiSlice";
import { generateProvidesTags } from "../../generateProvideTags";

export const reportApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<ReportResponseType<getReportItem[]>, void>({
      query: () => "getListReports",
      providesTags: (results) =>
        generateProvidesTags("Reports", results?.data, (item) => item._id),
    }),
    createReport: builder.mutation<
      ReportResponseType<ReportType>,
      Omit<ReportType, "accountId" | "_id" | "createdAt" | "status">
    >({
      query: (data) => ({
        url: "createReport",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Reports", id: "LIST" }],
    }),
    updateStatusReport: builder.mutation<
      ReportResponseType<ReportType>,
      { id: string; status: string }
    >({
      query: (data) => ({
        url: `updateReport/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (results, error, data) => [
        { type: "Reports", id: data.id },
      ],
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
export const {
  useCreateReportMutation,
  useGetReportsQuery,
  useUpdateStatusReportMutation,
  useDeleteReportMutation,
} = reportApiSlice;
