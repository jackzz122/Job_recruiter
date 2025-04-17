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
import { useForm } from "react-hook-form";
import { ReportType, targetType } from "../../../types/ReportType";
import { useCreateReportMutation } from "../../../redux/feature/report/reportApiSlice";
import { handleError } from "../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
export const DialogReportComment = ({
  comment,
  reportDialogOpen,
  handleCloseReportDialog,
}: {
  comment: CommentType;
  reportDialogOpen: boolean;
  handleCloseReportDialog: () => void;
}) => {
  const { register, handleSubmit, reset } = useForm<ReportType>({
    defaultValues: {
      reason: { reasonTitle: "", additionalReason: "" },
    },
  });
  const handleCloseReportDialogFixed = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    handleCloseReportDialog();
    reset();
  };

  const [createReport, { isLoading }] = useCreateReportMutation();
  const handleReport = async (data: ReportType) => {
    try {
      const report = {
        target_id: comment.account_id._id,
        target_type: targetType.COMMENT,
        reportTarget: comment._id,
        reason: {
          reasonTitle: data.reason.reasonTitle,
          additionalReason: data.reason.additionalReason,
        },
      };
      const response = await createReport(report);
      if (response?.data?.success) {
        toast.success("Report created successfully");
        handleCloseReportDialogFixed();
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error.message);
    }
  };
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
                {...register("reason.reasonTitle")}
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
                {...register("reason.reasonTitle")}
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
                {...register("reason.reasonTitle")}
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
                {...register("reason.reasonTitle")}
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
                {...register("reason.reasonTitle")}
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
            {...register("reason.additionalReason")}
            variant="outlined"
            placeholder="Please provide any additional information about this report..."
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
            onClick={handleSubmit(handleReport)}
            loading={isLoading}
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
