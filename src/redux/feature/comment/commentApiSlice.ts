import { CommentType } from "../../../types/CommentType";
import ApiSlice from "../../api/apiSlice";
import { generateProvidesTags } from "../../generateProvideTags";

export const commentApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<CommentType[], string>({
      query: (id) => `/comments/${id}`,
      providesTags: (results) =>
        generateProvidesTags("Comments", results, (item) => item.companyId),
    }),
    createComment: builder.mutation<CommentType, CommentType>({
      query: (data) => ({
        url: "comments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
    deleteComment: builder.mutation<CommentType, string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (results, error, id) => [{ type: "Comments", id }],
    }),
  }),
});
export const { useGetCommentsQuery, useCreateCommentMutation } =
  commentApiSlice;
