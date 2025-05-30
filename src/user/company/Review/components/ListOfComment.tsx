import { useParams } from "react-router-dom";
import { HeaderOfDetails } from "../../DetailsCompany/HeaderOfDetails";
import { CommentItem } from "./CommentItem";
import { useGetCommentsQuery } from "../../../../redux/feature/comment/commentApiSlice";
import { Box, Typography, SvgIcon, CircularProgress } from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";

export const ListOfComment = () => {
  const { id } = useParams();
  const { data: commentList, isLoading } = useGetCommentsQuery(id as string, {
    skip: !id,
  });

  const activeComments =
    commentList?.data?.filter((comment) => comment.status === "active") || [];

  const renderEmptyState = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: 2,
        textAlign: "center",
      }}
    >
      <SvgIcon
        component={ChatBubbleOutline}
        sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
      />
      <Typography variant="h6" color="text.primary" gutterBottom>
        No Comments Yet
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
        Be the first to share your thoughts and experiences about this company.
      </Typography>
    </Box>
  );

  return (
    <HeaderOfDetails name={`${activeComments.length} Reviews`}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : activeComments.length === 0 ? (
        renderEmptyState()
      ) : (
        activeComments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))
      )}
    </HeaderOfDetails>
  );
};
