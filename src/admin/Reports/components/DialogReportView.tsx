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
import { useGetDetailReportQuery } from "../../../redux/feature/report/reportApiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { CommentType } from "../../../types/CommentType";
import { CompanyType } from "../../../types/CompanyType";
import { JobTarget, targetType } from "../../../types/ReportType";
import { useRef, useEffect } from "react";

const isCommentTarget = (target: unknown): target is CommentType => {
  return (
    typeof target === "object" &&
    target !== null &&
    "title" in target &&
    "details" in target
  );
};

const isJobTarget = (target: unknown): target is JobTarget => {
  return (
    typeof target === "object" &&
    target !== null &&
    "title" in target &&
    "sizingPeople" in target &&
    "minRange" in target &&
    "maxRange" in target
  );
};

const isCompanyTarget = (target: unknown): target is CompanyType => {
  console.log("target", target);
  return (
    typeof target === "object" &&
    target !== null &&
    "companyName" in target &&
    "country" in target &&
    "phoneNumberCompany" in target
  );
};

export const DialogReportView = ({
  openDialog,
  isUpdating,
  handleCloseDialog,
  getReportTypeLabel,
  reportId,
  color,
  onApprove,
  onReject,
}: {
  openDialog: boolean;
  isUpdating: boolean;
  getReportTypeLabel: (type: string) => string;
  handleCloseDialog: () => void;
  reportId: string;
  color: string;
  onApprove: () => void;
  onReject: () => void;
}) => {
  const { data: reportDetail, isLoading } = useGetDetailReportQuery(reportId, {
    skip: !openDialog,
  });
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openDialog && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [openDialog]);

  const getReportContent = () => {
    if (!reportDetail?.data) return null;

    const target = reportDetail.data.reportContent;
    console.log("target", reportDetail.data);
    let content = null;
    if (
      reportDetail.data.targetType === targetType.COMMENT &&
      isCommentTarget(target)
    ) {
      content = (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Comment Content
          </Typography>
          <Typography variant="body1">{target.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Why Love: {target.details.whyLove}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Suggestion: {target.details.suggest}
          </Typography>
        </Box>
      );
    } else if (
      reportDetail.data.targetType === targetType.JOB &&
      isJobTarget(target)
    ) {
      content = (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Job Details
          </Typography>
          <Typography variant="body1">{target.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            Required People: {target.sizingPeople}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Salary Range: ${target.minRange} - ${target.maxRange}
          </Typography>
        </Box>
      );
    } else if (
      reportDetail.data.targetType === targetType.COMPANY &&
      isCompanyTarget(target)
    ) {
      content = (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Company Information
          </Typography>
          <Typography variant="body1">{target.companyName}</Typography>
          <Typography variant="body2" color="text.secondary">
            Country: {target.country}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Companny Phone: {target.phoneNumberCompany}
          </Typography>
        </Box>
      );
    }

    return content;
  };

  if (isLoading) {
    return (
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        keepMounted={false}
        disablePortal={false}
        container={document.body}
        aria-labelledby="report-dialog-title"
      >
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  if (!reportDetail?.data) {
    return (
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        keepMounted={false}
        disablePortal={false}
        container={document.body}
        aria-labelledby="report-dialog-title"
      >
        <DialogContent>
          <Typography color="error">Failed to load report details</Typography>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
      keepMounted={false}
      disablePortal={false}
      container={document.body}
      aria-labelledby="report-dialog-title"
      ref={dialogRef}
      tabIndex={-1}
    >
      <DialogTitle id="report-dialog-title">Report Details</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Report Type
            </Typography>
            <Chip
              icon={<FlagIcon />}
              label={getReportTypeLabel(reportDetail.data.targetType)}
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
              <Box>
                <Typography>
                  {typeof reportDetail.data.report.accountId === "string"
                    ? reportDetail.data.report.accountId
                    : reportDetail.data.report.accountId.fullname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {typeof reportDetail.data.report.accountId === "string"
                    ? reportDetail.data.report.accountId
                    : reportDetail.data.report.accountId.email}
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
                <Typography>
                  {typeof reportDetail.data.report.target_id === "string"
                    ? reportDetail.data.report.target_id
                    : reportDetail.data.report.target_id.fullname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {typeof reportDetail.data.report.target_id === "string"
                    ? reportDetail.data.report.target_id
                    : reportDetail.data.report.target_id.email}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {getReportContent()}

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Reason for Report
            </Typography>
            <Typography>
              {reportDetail.data.report.reason.reasonTitle}
            </Typography>
            {reportDetail.data.report.reason.additionalReason && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {reportDetail.data.report.reason.additionalReason}
              </Typography>
            )}
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Report Date
            </Typography>
            <Typography>
              {new Date(reportDetail.data.report.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2.5 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={onReject}
          loading={isUpdating}
          aria-label="Reject report"
        >
          Reject Report
        </Button>
        <Button
          variant="contained"
          color="success"
          loading={isUpdating}
          onClick={() => {
            onApprove();
          }}
          aria-label="Approve report"
        >
          Approve Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};
