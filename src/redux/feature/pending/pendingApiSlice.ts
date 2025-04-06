import { pendingType } from "../../../types/pendingType";
import ApiSlice from "../../api/apiSlice";

export const pendingApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingList: builder.query<pendingType[], void>({
      query: () => "/getPendingList",
      providesTags: (results) => {
        if (results) {
          const final = [
            ...results.map(({ accountID }) => ({
              type: "Pendings" as const,
              id: accountID._id,
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
    blockPending: builder.mutation<string, string>({
      query: (id) => ({
        url: `/blockPending/${id}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Pendings", id }],
    }),
    unblockPending: builder.mutation<string, string>({
      query: (id) => ({
        url: `/unblockPending/${id}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Pendings", id }],
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
  useBlockPendingMutation,
  useDeletePendingItemMutation,
  useUnblockPendingMutation,
} = pendingApiSlice;
