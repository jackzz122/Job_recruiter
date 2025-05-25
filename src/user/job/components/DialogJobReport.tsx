import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { useCreateReportMutation } from "../../../redux/feature/report/reportApiSlice";
import { handleError } from "../../../helper/HandleError/handleError";
import { targetType } from "../../../types/ReportType";
import { useForm } from "react-hook-form";

interface DialogJobReportProps {
  open: boolean;
  handleClose: () => void;
  jobTitle: string;
  jobId: string;
  accountJobId: string;
}

export const DialogJobReport = ({
  open,
  handleClose,
  jobTitle,
  jobId,
  accountJobId,
}: DialogJobReportProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      reportTitle: "",
      reportReason: "",
    },
  });
  const [createReport, { isLoading }] = useCreateReportMutation();
  const handleCloseDialog = () => {
    handleClose();
  };

  const handleSubmitReport = async (data: {
    reportTitle: string;
    reportReason: string;
  }) => {
    // TODO: Implement report submission logic
    try {
      const response = await createReport({
        target_id: accountJobId,
        target_type: targetType.JOB,
        reportTarget: jobId,
        reason: {
          additionalReason: data.reportReason,
          reasonTitle: data.reportTitle,
        },
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message || "Your report has been sent");
        handleCloseDialog();
      }
    } catch (error) {
      const err = handleError(error);
      toast.error(err.message || "Your report has not been sent");
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "error.main", fontWeight: "bold" }}>
        Báo cáo tin tuyển dụng
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2, color: "text.secondary" }}>
          Vui lòng cho chúng tôi biết lý do bạn muốn báo cáo tin tuyển dụng "
          {jobTitle}". Chúng tôi sẽ xem xét báo cáo của bạn một cách cẩn thận.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Tiêu đề báo cáo"
          type="text"
          {...register("reportTitle", {
            required: true,
          })}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Lý do báo cáo"
          type="text"
          fullWidth
          multiline
          rows={4}
          {...register("reportReason", {
            required: true,
          })}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={handleCloseDialog}
          sx={{
            color: "text.secondary",
            mr: 1,
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleSubmit(handleSubmitReport)}
          variant="contained"
          loading={isLoading}
          sx={{
            backgroundColor: "error.main",
            color: "white",
            "&:hover": {
              backgroundColor: "error.dark",
            },
          }}
        >
          Gửi báo cáo
        </Button>
      </DialogActions>
    </Dialog>
  );
};
