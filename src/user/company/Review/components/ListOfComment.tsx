import { useParams } from "react-router-dom";
import { HeaderOfDetails } from "../../DetailsCompany/HeaderOfDetails";
import { CommentItem } from "./CommentItem";
import { useGetCommentsQuery } from "../../../../redux/feature/comment/commentApiSlice";

export const ListOfComment = () => {
  const { id } = useParams();
  const { data: commentList } = useGetCommentsQuery(id as string, {
    skip: !id,
  });
  return (
    <HeaderOfDetails name={`${commentList?.data.length} Đánh giá`}>
      {commentList?.data.map((comment) => {
        return <CommentItem key={comment._id} comment={comment} />;
      })}
    </HeaderOfDetails>
  );
};
