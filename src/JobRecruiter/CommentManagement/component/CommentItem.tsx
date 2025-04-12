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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useState } from "react";

export const CommentItem = ({ comment }: { comment: CommentType }) => {
  // Get first letter of fullname for avatar
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Report dialog state
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState("inappropriate");
  const [reportDetails, setReportDetails] = useState("");

  const handleOpenReportDialog = () => {
    setReportDialogOpen(true);
  };

  const handleCloseReportDialog = () => {
    setReportDialogOpen(false);
  };

  const handleReportReasonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReportReason(event.target.value);
  };

  const handleReportDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReportDetails(event.target.value);
  };

  const handleSubmitReport = () => {
    // Here you would implement the actual report submission
    console.log("Submitting report:", {
      commentId: comment._id,
      reason: reportReason,
      details: reportDetails,
    });

    // Close the dialog and reset form
    setReportDialogOpen(false);
    setReportReason("inappropriate");
    setReportDetails("");
  };
  console.log("comment", comment);
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
                {getInitials(comment.account_id.fullname)}
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, lineHeight: 1.2 }}
                >
                  {comment.account_id.fullname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {comment.account_id.email}
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
              {comment.details[0].whylove}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
              <Box component="span" sx={{ fontWeight: 600 }}>
                Suggestion:{" "}
              </Box>
              {comment.details[1].suggest}
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
      <Dialog
        open={reportDialogOpen}
        onClose={handleCloseReportDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            pb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FlagIcon color="error" />
          <Typography variant="h6" component="span">
            Report Comment
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText sx={{ mb: 3 }}>
            Please provide details about why you're reporting this comment from{" "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {comment.account_id.fullname}
            </Box>
            .
          </DialogContentText>

          <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
              Reason for Report
            </FormLabel>
            <RadioGroup
              value={reportReason}
              onChange={handleReportReasonChange}
              name="report-reason"
            >
              <FormControlLabel
                value="inappropriate"
                control={
                  <Radio
                    sx={{
                      color: "orange",
                      "&.Mui-checked": { color: "orange" },
                    }}
                  />
                }
                label="Inappropriate Content"
              />
              <FormControlLabel
                value="spam"
                control={
                  <Radio
                    sx={{
                      color: "orange",
                      "&.Mui-checked": { color: "orange" },
                    }}
                  />
                }
                label="Spam"
              />
              <FormControlLabel
                value="offensive"
                control={
                  <Radio
                    sx={{
                      color: "orange",
                      "&.Mui-checked": { color: "orange" },
                    }}
                  />
                }
                label="Offensive Language"
              />
              <FormControlLabel
                value="false"
                control={
                  <Radio
                    sx={{
                      color: "orange",
                      "&.Mui-checked": { color: "orange" },
                    }}
                  />
                }
                label="False Information"
              />
              <FormControlLabel
                value="other"
                control={
                  <Radio
                    sx={{
                      color: "orange",
                      "&.Mui-checked": { color: "orange" },
                    }}
                  />
                }
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Additional Details"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={reportDetails}
            onChange={handleReportDetailsChange}
            placeholder="Please provide any additional information about this report..."
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "orange",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "orange",
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{ px: 3, py: 2, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Button
            onClick={handleCloseReportDialog}
            variant="outlined"
            sx={{
              borderRadius: 2,
              borderColor: "divider",
              color: "text.primary",
              "&:hover": {
                borderColor: "divider",
                backgroundColor: "action.hover",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitReport}
            variant="contained"
            sx={{
              borderRadius: 2,
              bgcolor: "error.main",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
