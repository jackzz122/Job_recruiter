import {
  CommentTarget,
  CompanyTarget,
  getReportItem,
  JobTarget,
  ReportResponseType,
  ReportType,
  targetType,
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
    getDetailReport: builder.query<
      ReportResponseType<{
        report: ReportType;
        reportContent: CommentTarget | JobTarget | CompanyTarget;
        targetType: targetType.JOB | targetType.COMPANY | targetType.COMMENT;
      }>,
      string
    >({
      query: (id: string) => ({
        url: `getDetailsReport/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Reports", id: "LIST" }],
    }),
    changeStatusReportItem: builder.mutation<
      ReportResponseType<ReportType>,
      { id: string; status: string; targetType: string }
    >({
      query: (data) => ({
        url: `changeStatusReport`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (results, error, data) => [
        { type: "Reports", id: "LIST" },
        { type: "Comments", id: data.id },
        { type: "Jobs", id: data.id },
        { type: "Companies", id: data.id },
      ],
    }),
    deleteReportItem: builder.mutation<
      ReportResponseType<ReportType>,
      { id: string; targetType: string }
    >({
      query: (data) => ({
        url: `deleteReportItem`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: (results, error, data) => [
        { type: "Reports", id: "LIST" },
        { type: "Comments", id: data.id },
        { type: "Jobs", id: data.id },
        { type: "Companies", id: data.id },
      ],
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
  useGetDetailReportQuery,
  useChangeStatusReportItemMutation,
  useDeleteReportItemMutation,
} = reportApiSlice;
