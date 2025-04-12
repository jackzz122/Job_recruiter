import {
  JobFormData,
  JobResponse,
  JobTypeResponse,
} from "../../../types/JobType";
import ApiSlice from "../../api/apiSlice";
import { generateProvidesTags } from "../../generateProvideTags";

export const jobApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobPostings: builder.query<JobTypeResponse<JobResponse[]>, void>({
      query: () => "/jobPostingList",
      providesTags: (results) =>
        generateProvidesTags("Jobs", results?.data, (item) => item._id),
    }),
    createJobs: builder.mutation<JobTypeResponse<JobResponse>, JobFormData>({
      query: (body) => ({
        url: "createJobPosting",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Jobs", id: "LIST" }],
    }),
    getJobById: builder.query<JobTypeResponse<JobResponse>, string>({
      query: (id: string) => `getDetailJob/${id}`,
    }),
    updateJobs: builder.mutation<
      JobTypeResponse<JobResponse>,
      JobFormData & { _id: string }
    >({
      query: ({ _id, ...body }) => ({
        url: `updateJobPosting/${_id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (results, error, data) => [
        { type: "Jobs", id: data._id },
      ],
    }),
    deleteJob: builder.mutation<JobTypeResponse<JobResponse>, string>({
      query: (id) => ({
        url: `/deleteJobPosting/${id}`,
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
  useGetJobByIdQuery,
} = jobApiSlice;
