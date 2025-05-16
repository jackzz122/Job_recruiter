import { ResponseUserType, UserType } from "../../../types/UserType";
import ApiSlice from "../../api/apiSlice";

export const adminApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteAccountByAdmin: builder.mutation<ResponseUserType<UserType>, string>({
      query: (id) => ({
        url: `deleteAccountByAdmin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});
export const { useDeleteAccountByAdminMutation } = adminApiSlice;
