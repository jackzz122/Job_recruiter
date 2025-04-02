import { UserType } from "../../../context/types/UserType";
import ApiSlice from "../../app/api/apiSlice";

type UserResponse = {
  success: boolean;
  user: UserType;
};

export const userApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserType[], void>({
      query: () => "getListUser",
      providesTags: (results) => {
        if (results) {
          const final = [
            ...results.map(({ id }) => ({ type: "Users" as const, id })),
            { type: "Users" as const, id: "LIST" },
          ];
          return final;
        }
        return [{ type: "Users", id: "LIST" }];
      },
    }),
    getUserInfo: builder.query<UserResponse, void>({
      query: () => "getAccount",
      providesTags: () => [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserInfoQuery } = userApiSlice;
