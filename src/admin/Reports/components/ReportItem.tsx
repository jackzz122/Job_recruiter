import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FlagIcon from "@mui/icons-material/Flag";
import { useState } from "react";
import { getReportItem, statusTypeReport } from "../../../types/ReportType";
import { DialogReportView } from "./DialogReportView";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {
  useChangeStatusReportItemMutation,
  useDeleteReportItemMutation,
  useUpdateStatusReportMutation,
} from "../../../redux/feature/report/reportApiSlice";
import { CommentStatus, CommentType } from "../../../types/CommentType";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { JobType, statusJob } from "../../../types/JobType";

export const ReportItem = ({ report }: { report: getReportItem }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateStatusReportMutation();
  const [changeStatusReportItem] = useChangeStatusReportItemMutation();
  const [deleteReportItem] = useDeleteReportItemMutation();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleApprove = async () => {
    if (!report?._id) return;
    try {
      await updateStatus({
        id: report._id,
        status: statusTypeReport.RESOLVED,
      }).unwrap();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to approve report:", error);
    }
  };

  const handleChangeStatus = async () => {
    try {
      if (report.target_type === "comment") {
        const currentStatus = (report.reportTarget as CommentType).status;
        await changeStatusReportItem({
          id: (report.reportTarget as CommentType)._id,
          status:
            currentStatus === CommentStatus.ACTIVE
              ? CommentStatus.INACTIVE
              : CommentStatus.ACTIVE,
          targetType: "comment",
        }).unwrap();
      }
      if (report.target_type === "jobPosting") {
        const jobTarget = report.reportTarget as JobType;
        await changeStatusReportItem({
          id: jobTarget._id,
          status:
            jobTarget.status === statusJob.OnGoing
              ? statusJob.Close
              : statusJob.OnGoing,
          targetType: "jobPosting",
        }).unwrap();
      }
    } catch (error) {
      console.error("Failed to change status:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (report.target_type === "comment") {
        await deleteReportItem({
          id: (report.reportTarget as CommentType)._id,
          targetType: "comment",
        }).unwrap();
      }
      if (report.target_type === "jobPosting") {
        const jobTarget = report.reportTarget as JobType;
        await deleteReportItem({
          id: jobTarget._id,
          targetType: "jobPosting",
        }).unwrap();
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleReject = async () => {
    if (!report?._id) return;
    try {
      await updateStatus({
        id: report._id,
        status: statusTypeReport.REJECTED,
      }).unwrap();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to reject report:", error);
    }
  };

  const handleRollback = async () => {
    if (!report?._id) return;
    try {
      await updateStatus({
        id: report._id,
        status: statusTypeReport.PENDING,
      }).unwrap();
    } catch (error) {
      console.error("Failed to rollback report:", error);
    }
  };

  let color = "primary";
  if (report?.target_type === "comment") {
    color = "warning";
  } else if (report?.target_type === "jobPosting") {
    color = "primary";
  } else if (report?.target_type === "companyInfo") {
    color = "success";
  }

  const getReportTypeLabel = (type?: string) => {
    if (!type) return "Unknown";

    switch (type) {
      case "comment":
        return "Comment";
      case "jobPosting":
        return "Job Post";
      case "companyInfo":
        return "Company";
      default:
        return type;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No date";
    try {
      const date = new Date(dateString);
      return `${date.toLocaleDateString()} - ${date.toDateString()}`;
    } catch (error) {
      console.log(error);
      return "Invalid date";
    }
  };

  const getStatusIcon = () => {
    if (report.target_type === "comment") {
      const currentStatus = (report.reportTarget as CommentType).status;
      return currentStatus === CommentStatus.ACTIVE ? (
        <VisibilityOffIcon fontSize="small" />
      ) : (
        <VisibilityIcon fontSize="small" />
      );
    }
    if (report.target_type === "jobPosting") {
      const jobTarget = report.reportTarget as JobType;
      return jobTarget.status === statusJob.OnGoing ? (
        <VisibilityOffIcon fontSize="small" />
      ) : (
        <VisibilityIcon fontSize="small" />
      );
    }
    return null;
  };

  const getStatusTooltip = () => {
    if (report.target_type === "comment") {
      const currentStatus = (report.reportTarget as CommentType).status;
      return currentStatus === CommentStatus.ACTIVE
        ? "Deactivate comment"
        : "Activate comment";
    }
    if (report.target_type === "jobPosting") {
      return "Close job posting";
    }
    return "";
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={report?.accountId?.avatarIMG || "/avatar.png"}
              alt={report?.accountId?.fullname || "User avatar"}
            />
            <Typography>{report?.accountId?.fullname || "Unknown"}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Chip
            icon={<FlagIcon />}
            label={getReportTypeLabel(report?.target_type)}
            size="small"
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
        </TableCell>
        <TableCell>{report?.target_id?.email || "No email"}</TableCell>
        <TableCell>
          <Typography noWrap sx={{ maxWidth: 200 }}>
            {report?.reason?.reasonTitle || "No reason provided"}
          </Typography>
        </TableCell>
        <TableCell>{formatDate(report?.createdAt)}</TableCell>
        <TableCell>
          <Chip
            label={report?.status || "UNKNOWN"}
            size="small"
            color={
              report?.status === statusTypeReport.PENDING
                ? "warning"
                : report?.status === statusTypeReport.RESOLVED
                ? "success"
                : "error"
            }
          />
        </TableCell>
        <TableCell align="right">
          {report?.status === statusTypeReport.PENDING && (
            <IconButton
              size="small"
              color="primary"
              onClick={handleOpenDialog}
              aria-label="View report details"
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          )}
          {report?.status === statusTypeReport.RESOLVED && (
            <>
              <IconButton
                size="small"
                color="error"
                onClick={handleRollback}
                aria-label="Rollback report status"
              >
                <ChangeCircleIcon fontSize="small" />
              </IconButton>
              {report?.target_type !== "companyInfo" && (
                <IconButton
                  onClick={handleChangeStatus}
                  size="small"
                  color="error"
                  aria-label={getStatusTooltip()}
                  title={getStatusTooltip()}
                >
                  {getStatusIcon()}
                </IconButton>
              )}
              <IconButton
                onClick={handleDelete}
                size="small"
                color="error"
                aria-label="Delete report"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          )}
          {report?.status === statusTypeReport.REJECTED && (
            <IconButton
              size="small"
              color="primary"
              onClick={handleRollback}
              aria-label="Rollback report status"
            >
              <ChangeCircleIcon fontSize="small" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <DialogReportView
        isUpdating={isUpdating}
        getReportTypeLabel={getReportTypeLabel}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        reportId={report._id}
        color={color}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  );
};
