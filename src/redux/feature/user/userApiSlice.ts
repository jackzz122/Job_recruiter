import { regisData } from "./../../../types/AuthType";
import { UserType } from "../../../types/UserType";
import ApiSlice from "../../api/apiSlice";
import { CompanyType } from "../../../types/CompanyType";

type UserResponse = {
  success: boolean;
  user: UserType;
};

interface recruiterAddType extends regisData {
  companyId: string | CompanyType;
}

export const userApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserType[], void>({
      query: () => "getListUser",
      providesTags: (results) => {
        if (results) {
          const final = [
            ...results.map(({ _id }) => ({ type: "Users" as const, id: _id })),
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
    getRecruiter: builder.query<UserType[], string>({
      query: (id) => `getRecruiter/${id}`,
      providesTags: () => [{ type: "Recruiter", id: "LIST" }],
    }),
    createRecruiter: builder.mutation<UserType, recruiterAddType>({
      query: (data) => ({
        url: "createStaff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Recruiter", id: "LIST" }],
    }),
    deleteRecruiter: builder.mutation<UserType, string>({
      query: (id) => ({
        url: `deleteStaffAccount/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (results, error, id) => [{ type: "Users", id }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  useCreateRecruiterMutation,
  useGetRecruiterQuery,
  useDeleteRecruiterMutation,
} = userApiSlice;
