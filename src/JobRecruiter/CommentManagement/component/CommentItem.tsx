import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import {
  Flag as FlagIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import { CommentType } from "../../../types/CommentType";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import { useState } from "react";
import { DialogReportComment } from "./DialogReportComment";

export const CommentItem = ({ comment }: { comment: CommentType }) => {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  console.log("comment", comment);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  const handleOpenReportDialog = () => {
    setReportDialogOpen(true);
  };

  const handleCloseReportDialog = () => {
    setReportDialogOpen(false);
  };

  return (
    <>
      <Paper
        key={comment._id}
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            borderColor: "orange",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Stack spacing={2.5}>
          {/* Comment Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {getInitials(comment.account_id?.fullname || "Candidate")}
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, lineHeight: 1.2 }}
                >
                  {comment.account_id?.fullname || "Candidate has been deleted"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {comment.account_id?.email || "Not found"}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={`${comment.rating.toFixed(1)}/5`}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ fontWeight: "bold" }}
            />
          </Box>

          {/* Rating */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating
              defaultValue={comment.rating}
              precision={0.5}
              readOnly
              sx={{ color: "orange" }}
            />
          </Box>

          {/* Comment Title */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: "1.1rem",
            }}
          >
            {comment.title}
          </Typography>

          {/* Comment Content */}
          <Box sx={{ px: 1 }}>
            <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
              <Box component="span" sx={{ fontWeight: 600 }}>
                Reason why love:{" "}
              </Box>
              {comment.details.whyLove}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
              <Box component="span" sx={{ fontWeight: 600 }}>
                Suggestion:{" "}
              </Box>
              {comment.details.suggest}
            </Typography>
          </Box>

          {/* Comment Footer */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {new Date(comment.createdDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                at{" "}
                {new Date(comment.createdDate).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Box>
            <Button
              startIcon={<FlagIcon />}
              color="error"
              size="small"
              variant="text"
              onClick={handleOpenReportDialog}
              sx={{
                borderRadius: 2,
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(211, 47, 47, 0.04)",
                },
              }}
            >
              Report
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Report Dialog */}
      <DialogReportComment
        comment={comment}
        reportDialogOpen={reportDialogOpen}
        handleCloseReportDialog={handleCloseReportDialog}
      />
    </>
  );
};
