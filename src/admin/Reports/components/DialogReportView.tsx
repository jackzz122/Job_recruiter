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

    const target = reportDetail?.data?.reportContent;
    let content = null;
    if (
      reportDetail?.data?.targetType === targetType.COMMENT &&
      isCommentTarget(target)
    ) {
      content = (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Comment Content
          </Typography>
          <Typography variant="body1">{target.title || "No title"}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Why Love: {target.details?.whyLove || "No reason provided"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Suggestion: {target.details?.suggest || "No suggestion provided"}
          </Typography>
        </Box>
      );
    } else if (
      reportDetail?.data?.targetType === targetType.JOB &&
      isJobTarget(target)
    ) {
      content = (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Job Details
          </Typography>
          <Typography variant="body1">{target.title || "No title"}</Typography>
          <Typography variant="body2" color="text.secondary">
            Required People: {target.sizingPeople || "Not specified"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Salary Range: ${target.minRange || "0"} - ${target.maxRange || "0"}
          </Typography>
        </Box>
      );
    } else if (
      reportDetail?.data?.targetType === targetType.COMPANY &&
      isCompanyTarget(target)
    ) {
      content = (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Company Information
          </Typography>
          <Typography variant="body1">
            {target.companyName || "No company name"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Country: {target.country || "Not specified"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Company Phone: {target.phoneNumberCompany || "Not specified"}
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

  const reporterName =
    typeof reportDetail?.data?.report?.accountId === "string"
      ? reportDetail?.data?.report?.accountId
      : reportDetail?.data?.report?.accountId?.fullname || "Unknown Reporter";

  const reporterEmail =
    typeof reportDetail?.data?.report?.accountId === "string"
      ? reportDetail?.data?.report?.accountId
      : reportDetail?.data?.report?.accountId?.email || "No email provided";

  const targetName =
    typeof reportDetail?.data?.report?.target_id === "string"
      ? reportDetail?.data?.report?.target_id
      : reportDetail?.data?.report?.target_id?.fullname || "Unknown Target";

  const targetEmail =
    typeof reportDetail?.data?.report?.target_id === "string"
      ? reportDetail?.data?.report?.target_id
      : reportDetail?.data?.report?.target_id?.email || "No email provided";

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
              label={getReportTypeLabel(
                reportDetail.data.targetType || "unknown"
              )}
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
                <Typography>{reporterName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {reporterEmail}
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
                <Typography>{targetName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {targetEmail}
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
              {reportDetail.data.report?.reason?.reasonTitle ||
                "No reason provided"}
            </Typography>
            {reportDetail?.data?.report?.reason?.additionalReason && (
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
              {reportDetail.data.report?.createdAt
                ? new Date(reportDetail.data.report.createdAt).toLocaleString()
                : "Date not available"}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2.5 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={onReject}
          disabled={isUpdating || !reportDetail?.data?.report?.accountId}
          aria-label="Reject report"
        >
          Reject Report
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={isUpdating || !reportDetail?.data?.report?.accountId}
          onClick={onApprove}
          aria-label="Approve report"
        >
          Approve Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};
