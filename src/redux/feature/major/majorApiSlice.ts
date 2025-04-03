import { MajorType } from "../../../types/MajorType";
import ApiSlice from "../../api/apiSlice";

export const majorApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMajors: builder.query<MajorType[], void>({
      query: () => "getAllMajorCate",
      providesTags: (result) => {
        if (result) {
          const final = [
            ...result.map(({ _id }) => ({ type: "Majors" as const, id: _id })),
            { type: "Majors" as const, id: "LIST" },
          ];
          return final;
        }
        return [{ type: "Majors", id: "LIST" }];
      },
    }),
    addMajor: builder.mutation<MajorType, Omit<MajorType, "_id">>({
      query: (body) => ({
        url: "createMajorCate",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Majors", id: "LIST" }],
    }),
    updateMajor: builder.mutation<MajorType, { _id: string; body: MajorType }>({
      query: (data) => ({
        url: `updateMajorCate/${data._id}`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: (results, error, data) => [
        { type: "Majors", id: data._id },
      ],
    }),
    deleteMajor: builder.mutation<string, string>({
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
} = majorApiSlice;
