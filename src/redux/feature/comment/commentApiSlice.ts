import { CommentType, CommentTypeResponse } from "../../../types/CommentType";
import ApiSlice from "../../api/apiSlice";
import { generateProvidesTags } from "../../generateProvideTags";

export const commentApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<CommentTypeResponse<CommentType[]>, string>({
      query: (id) => `/comments/${id}`,
      providesTags: (results) =>
        generateProvidesTags(
          "Comments",
          results?.data,
          (item) => item.companyId
        ),
    }),
    createComment: builder.mutation<
      CommentTypeResponse<CommentType>,
      CommentType
    >({
      query: (data) => ({
        url: "comments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
    deleteComment: builder.mutation<CommentTypeResponse<CommentType>, string>({
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
