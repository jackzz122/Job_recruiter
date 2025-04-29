import {
  candidateJobPostingType,
  JobFormData,
  JobResponse,
  JobTypeResponse,
  listAccountType,
} from "../../../types/JobType";
import ApiSlice from "../../api/apiSlice";
import { generateProvidesTags } from "../../generateProvideTags";

export const jobApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobPostings: builder.query<JobTypeResponse<JobResponse[]>, string>({
      query: (id) => `/jobPostingList/${id}`,
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
    changeStatusApplicant: builder.mutation<
      JobTypeResponse<listAccountType>,
      {
        status: string;
        id: string;
        jobId: string;
        ownerMail?: string;
        receiveMail?: string;
      }
    >({
      query: (data) => {
        const { id, ...dataStatus } = data;
        return {
          url: `changeStatus/${id}`,
          method: "POST",
          body: dataStatus,
        };
      },
      invalidatesTags: [{ type: "Jobs", id: "LIST" }],
    }),
    addApplicant: builder.mutation<
      JobTypeResponse<listAccountType>,
      {
        id: string;
        applicant: FormData;
      }
    >({
      query: (data) => ({
        url: `addApplicant/${data.id}`,
        method: "POST",
        body: data.applicant,
      }),
      invalidatesTags: [{ type: "Jobs", id: "LIST" }],
    }),
    removeApplicant: builder.mutation<
      JobTypeResponse<JobResponse[]>,
      {
        jobId: string;
        userId: string;
      }
    >({
      query: (data) => ({
        url: `deleteApplicant/${data.userId}`,
        method: "DELETE",
        body: {
          jobId: data.jobId,
        },
      }),
      invalidatesTags: [{ type: "Jobs", id: "LIST" }],
    }),
    getCandidateJobPosingList: builder.query<
      JobTypeResponse<candidateJobPostingType[]>,
      void
    >({
      query: () => "getCandidateFromJobPosting",
      providesTags: (results) =>
        generateProvidesTags("Jobs", results?.data, (item) => item.jobId),
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
  useAddApplicantMutation,
  useGetCandidateJobPosingListQuery,
  useChangeStatusApplicantMutation,
  useRemoveApplicantMutation,
} = jobApiSlice;
