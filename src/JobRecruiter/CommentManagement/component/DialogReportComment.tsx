import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Flag as FlagIcon } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CommentType } from "../../../types/CommentType";
import { Controller, useForm } from "react-hook-form";
import { ReportType } from "../../../types/ReportType";
export const DialogReportComment = ({
  comment,
  reportDialogOpen,
  handleCloseReportDialog,
}: {
  comment: CommentType;
  reportDialogOpen: boolean;
  handleCloseReportDialog: () => void;
}) => {
  //   const methods = useForm<ReportType>({
  //     defaultValues: {
  //       reason: [],
  //     },
  //   });
  //   const { register, handleSubmit } = methods;
  return (
    <>
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
            <RadioGroup defaultValue="inappropriate" name="report-reason">
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
