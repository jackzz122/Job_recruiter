import { MajorType, MajorTypeResponse } from "../../../types/MajorType";
import ApiSlice from "../../api/apiSlice";
import { generateProvidesTags } from "../../generateProvideTags";

export const majorApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMajors: builder.query<MajorTypeResponse<MajorType[]>, void>({
      query: () => "getAllMajorCate",
      providesTags: (result) =>
        generateProvidesTags("Majors", result?.data, (item) => item._id),
    }),
    addMajor: builder.mutation<
      MajorTypeResponse<MajorType>,
      Omit<MajorType, "_id">
    >({
      query: (body) => ({
        url: "createMajor",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Majors", id: "LIST" }],
    }),
    getMajorbyName: builder.query<MajorTypeResponse<string[]>, void>({
      query: () => "getNameMajors",
      providesTags: [{ type: "Majors", id: "LIST" }],
    }),
    getMajorbyLevel: builder.query<MajorTypeResponse<string[]>, void>({
      query: () => "getLevelMajors",
      providesTags: [{ type: "Majors", id: "LIST" }],
    }),
    updateMajor: builder.mutation<
      MajorTypeResponse<MajorType>,
      { _id: string; body: MajorType }
    >({
      query: (data) => ({
        url: `updateMajorCate/${data._id}`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: (results, error, data) => [
        { type: "Majors", id: data._id },
      ],
    }),
    deleteMajor: builder.mutation<MajorTypeResponse<MajorType>, string>({
      query: (id) => ({
        url: `deleteMajorCate/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (results, error, id) => [{ type: "Majors", id }],
    }),
  }),
});
export const {
  useAddMajorMutation,
  useDeleteMajorMutation,
  useGetMajorsQuery,
  useUpdateMajorMutation,
  useGetMajorbyNameQuery,
  useGetMajorbyLevelQuery,
} = majorApiSlice;
