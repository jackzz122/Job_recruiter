import { pendingType } from "../../../context/types/pendingType";
import ApiSlice from "../../app/api/apiSlice";

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
    confirmPending: builder.mutation<string, { userId: string }>({
      query: ({ userId }) => ({
        url: `/confirmPending/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Pendings", id: "LIST" }],
    }),
    deletePendingItem: builder.mutation<string, { userId: string }>({
      query: ({ userId }) => ({
        url: `/deletePending/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Pendings", id: "LIST" }],
    }),
  }),
});
export const { useGetPendingListQuery } = pendingApiSlice;
