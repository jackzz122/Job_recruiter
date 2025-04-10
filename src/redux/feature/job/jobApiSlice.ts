import { JobFormData, JobResponse } from "../../../types/JobType";
import ApiSlice from "../../api/apiSlice";
import { generateProvidesTags } from "../../generateProvideTags";

export const jobApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobPostings: builder.query<JobResponse[], void>({
      query: () => "/jobPostingList",
      providesTags: (results) =>
        generateProvidesTags("Jobs", results, (item) => item._id),
    }),
    createJobs: builder.mutation<JobResponse, JobFormData>({
      query: (body) => ({
        url: "createJobPosting",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Jobs", id: "LIST" }],
    }),
    updateJobs: builder.mutation<JobResponse, Partial<JobResponse>>({
      query: (body) => ({
        url: "",
        method: "PUT",
        body,
      }),
      invalidatesTags: (results, error, data) => [
        { type: "Jobs", id: data._id },
      ],
    }),
    deleteJob: builder.mutation<JobResponse, string>({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (results, error, id) => [{ type: "Jobs", id }],
    }),
  }),
});

export const {
  useGetJobPostingsQuery,
  useCreateJobsMutation,
  useDeleteJobMutation,
  useUpdateJobsMutation,
} = jobApiSlice;
