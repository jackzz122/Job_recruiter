import { pendingType, PendingTypeResponse } from "../../../types/pendingType";
import ApiSlice from "../../api/apiSlice";
import { generateProvidesTags } from "../../generateProvideTags";

export const pendingApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingList: builder.query<PendingTypeResponse<pendingType[]>, void>({
      query: () => "/getPendingList",
      providesTags: (results) =>
        generateProvidesTags(
          "Pendings",
          results?.data,
          (item) => item.accountID._id
        ),
    }),
    confirmPending: builder.mutation<
      PendingTypeResponse<pendingType>,
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
    blockPending: builder.mutation<PendingTypeResponse<pendingType>, string>({
      query: (id) => ({
        url: `/blockPending/${id}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Pendings", id }],
    }),
    unblockPending: builder.mutation<PendingTypeResponse<pendingType>, string>({
      query: (id) => ({
        url: `/unblockPending/${id}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Pendings", id }],
    }),
    deletePendingItem: builder.mutation<
      PendingTypeResponse<pendingType>,
      string
    >({
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
