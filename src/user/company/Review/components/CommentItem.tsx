import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { CommentType } from "../../../../types/CommentType";
import Divider from "@mui/material/Divider";
export const CommentItem = ({ comment }: { comment: CommentType }) => {
  return (
    <>
      <Box marginBottom={3}>
        <Typography
          variant="body2"
          fontSize="1rem"
          marginBlock={1}
          sx={{ color: "gray" }}
        >
          {format(
            new Date(comment.createdDate),
            "'Đã đăng từ tháng' MM 'năm' yyyy",
            {
              locale: vi,
            }
          )}
        </Typography>
        <Typography variant="h6" fontWeight="bold" marginBlock={1}>
          {comment.title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Rating value={comment.rating} precision={0.5} readOnly />
          <Typography variant="body2" fontSize="1.2rem" sx={{ color: "gray" }}>
            {comment.rating}
          </Typography>
        </Stack>
        <Box marginBlock={1}>
          <Typography fontWeight="bold">Điều tôi thích: </Typography>
          <Typography>{comment.details.whyLove}</Typography>
        </Box>
        <Box marginBlock={1}>
          <Typography fontWeight="bold">Đề nghị cải thiện:</Typography>
          <Typography>{comment.details.suggest}</Typography>
        </Box>
      </Box>
      <Divider />
    </>
  );
};
