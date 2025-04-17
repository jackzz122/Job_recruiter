import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import FlagIcon from "@mui/icons-material/Flag";
import { getReportItem, statusTypeReport } from "../../../types/ReportType";
import Avatar from "@mui/material/Avatar";
import { useUpdateStatusReportMutation } from "../../../redux/feature/report/reportApiSlice";

interface CommentTarget {
  content: string;
}

interface JobTarget {
  title: string;
  description: string;
}

interface CompanyTarget {
  name: string;
  description: string;
}

const isCommentTarget = (target: unknown): target is CommentTarget => {
  return typeof target === "object" && target !== null && "content" in target;
};

const isJobTarget = (target: unknown): target is JobTarget => {
  return (
    typeof target === "object" &&
    target !== null &&
    "title" in target &&
    "description" in target
  );
};

const isCompanyTarget = (target: unknown): target is CompanyTarget => {
  return (
    typeof target === "object" &&
    target !== null &&
    "name" in target &&
    "description" in target
  );
};

export const DialogReportView = ({
  openDialog,
  handleCloseDialog,
  getReportTypeLabel,
  report,
  color,
}: {
  openDialog: boolean;
  getReportTypeLabel: (type: string) => string;
  handleCloseDialog: () => void;
  report: getReportItem;
  color: string;
}) => {
  const getReportContent = () => {
    const target = report.reportTarget;
    let content = null;

    if (report.target_type === "comment" && isCommentTarget(target)) {
      content = (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Comment Content
          </Typography>
          <Typography variant="body1">{target.content}</Typography>
        </Box>
      );
    } else if (report.target_type === "jobPosting" && isJobTarget(target)) {
      content = (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Job Details
          </Typography>
          <Typography variant="body1">{target.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {target.description}
          </Typography>
        </Box>
      );
    } else if (
      report.target_type === "companyInfo" &&
      isCompanyTarget(target)
    ) {
      content = (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Company Information
          </Typography>
          <Typography variant="body1">{target.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {target.description}
          </Typography>
        </Box>
      );
    }

    return content;
  };
  const [updateStatus] = useUpdateStatusReportMutation();
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Report Details</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Report Type
            </Typography>
            <Chip
              icon={<FlagIcon />}
              label={getReportTypeLabel(report.target_type)}
              color={
                color as
                  | "primary"
                  | "secondary"
                  | "default"
                  | "error"
                  | "info"
                  | "success"
                  | "warning"
              }
              variant="outlined"
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Reported By
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src="/path-to-avatar.jpg" />
              <Box>
                <Typography>{report.accountId.fullname}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.accountId.email}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Reported Target
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box>
                <Typography>{report.target_id.fullname}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.target_id.email}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {getReportContent()}

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Reason for Report
            </Typography>
            <Typography>{report.reason.reasonTitle}</Typography>
            {report.reason.additionalReason && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {report.reason.additionalReason}
              </Typography>
            )}
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Report Date
            </Typography>
            <Typography>
              {new Date(report.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2.5 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            updateStatus({
              id: report._id,
              status: statusTypeReport.REJECTED,
            });
            handleCloseDialog();
          }}
        >
          Reject Report
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            updateStatus({
              id: report._id,
              status: statusTypeReport.RESOLVED,
            });
            handleCloseDialog();
          }}
        >
          Approve Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};
