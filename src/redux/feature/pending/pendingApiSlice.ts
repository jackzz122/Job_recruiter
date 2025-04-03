import { pendingType } from "../../../types/pendingType";
import ApiSlice from "../../api/apiSlice";

export const pendingApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingList: builder.query<pendingType[], void>({
      query: () => "/getPendingList",
      providesTags: (results) => {
        if (results) {
          const final = [
            ...results.map(({ _id }) => ({
              type: "Pendings" as const,
              id: _id,
            })),
            { type: "Pendings" as const, id: "LISt" },
          ];
          return final;
        }
        return [{ type: "Pendings" as const, id: "LIST" }];
      },
    }),
    confirmPending: builder.mutation<
      string,
      { id: string; body: Omit<pendingType, "status" | "_id"> }
    >({
      query: (data) => ({
        url: `/confirmPendingItem/${data.id}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Pendings", id: data.id },
      ],
    }),
    deletePendingItem: builder.mutation<string, string>({
      query: (id) => ({
        url: `/deletePendingApprove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Pendings", id }],
    }),
  }),
});
export const {
  useGetPendingListQuery,
  useConfirmPendingMutation,
  useDeletePendingItemMutation,
} = pendingApiSlice;
