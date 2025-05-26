import { CompanyType, CompanyTypeResponse } from "./../../../types/CompanyType";
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
      invalidatesTags: (_result, _error, data) => [
        { type: "Pendings", id: data.id },
      ],
    }),
    blockAccount: builder.mutation<PendingTypeResponse<pendingType>, string>({
      query: (id) => ({
        url: `/blockedAccount/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    approveAccount: builder.mutation<PendingTypeResponse<pendingType>, string>({
      query: (id) => ({
        url: `/approveAccount/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getListRecruiterCompanyAccount: builder.query<
      PendingTypeResponse<
        {
          _id: string;
          avatarIMG: string;
          name: string;
          companyName: string;
          email: string;
          status: string;
          phone: string;
          createdAt: string;
        }[]
      >,
      void
    >({
      query: () => "/getListRecruiterCompanyAccount",
      providesTags: [{ type: "Pendings", id: "LIST" }],
    }),
    blockRecruiterCompanyAccount: builder.mutation<
      CompanyTypeResponse<CompanyType>,
      string
    >({
      query: (id) => ({
        url: `/blockedCompanyAccount/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Pendings", id: "LIST" }],
    }),
    unblockRecruiterCompanyAccount: builder.mutation<
      CompanyTypeResponse<CompanyType>,
      string
    >({
      query: (id) => ({
        url: `/unBlockedCompanyAccount/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Pendings", id: "LIST" }],
    }),

    changeStatusPendingItem: builder.mutation<
      PendingTypeResponse<pendingType>,
      {
        id: string;
        status: string;
      }
    >({
      query: (data) => ({
        url: `changePendingApproveStatus/${data.id}`,
        method: "PUT",
        body: {
          status: data.status,
        },
      }),
      invalidatesTags: [{ type: "Pendings", id: "LIST" }],
    }),

    deletePendingItem: builder.mutation<
      PendingTypeResponse<pendingType>,
      string
    >({
      query: (id) => ({
        url: `/deletePendingApprove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Pendings", id }],
    }),
    deleteUserByAdmin: builder.mutation<
      PendingTypeResponse<pendingType>,
      string
    >({
      query: (id) => ({
        url: `/deleteAccountByAdmin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});
export const {
  useGetPendingListQuery,
  useConfirmPendingMutation,
  useDeletePendingItemMutation,
  useBlockAccountMutation,
  useApproveAccountMutation,
  useChangeStatusPendingItemMutation,
  useGetListRecruiterCompanyAccountQuery,
  useBlockRecruiterCompanyAccountMutation,
  useUnblockRecruiterCompanyAccountMutation,
} = pendingApiSlice;
