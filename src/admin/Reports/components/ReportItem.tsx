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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useUpdateStatusReportMutation } from "../../../redux/feature/report/reportApiSlice";
export const ReportItem = ({ report }: { report: getReportItem }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  let color = "primary";
  if (report.target_type === "comment") {
    color = "warning";
  } else if (report.target_type === "jobPosting") {
    color = "primary";
  } else if (report.target_type === "companyInfo") {
    color = "success";
  }

  const getReportTypeLabel = (type: string) => {
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
  const [updateStatus] = useUpdateStatusReportMutation();
  return (
    <>
      <TableRow hover>
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src="/path-to-avatar.jpg" />
            <Typography>{report.accountId.fullname}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Chip
            icon={<FlagIcon />}
            label={getReportTypeLabel(report.target_type)}
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
        <TableCell>{report.target_id.email}</TableCell>
        <TableCell>
          <Typography noWrap sx={{ maxWidth: 200 }}>
            {report.reason.reasonTitle}
          </Typography>
        </TableCell>
        <TableCell>
          {new Date(report.createdAt).toLocaleDateString()} -{" "}
          {new Date(report.createdAt).toDateString()}
        </TableCell>
        <TableCell>
          <Chip
            label={report.status}
            size="small"
            color={
              report.status === statusTypeReport.PENDING
                ? "warning"
                : report.status === statusTypeReport.RESOLVED
                ? "success"
                : "error"
            }
          />
        </TableCell>
        <TableCell align="right">
          {report.status !== statusTypeReport.PENDING && (
            <IconButton
              onClick={() =>
                updateStatus({
                  id: report._id,
                  status: statusTypeReport.PENDING,
                })
              }
              size="small"
              color="primary"
            >
              <ChangeCircleIcon />
            </IconButton>
          )}
          {report.status === statusTypeReport.PENDING && (
            <IconButton size="small" color="primary" onClick={handleOpenDialog}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          )}
          {report.status === statusTypeReport.RESOLVED && (
            <>
              <IconButton size="small" color="success">
                <CheckCircleIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="warning">
                <WarningAmberIcon fontSize="small" />
              </IconButton>
            </>
          )}
          {report.status === statusTypeReport.REJECTED && (
            <>
              <IconButton size="small" color="success">
                <CheckCircleIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </TableCell>
      </TableRow>

      <DialogReportView
        getReportTypeLabel={getReportTypeLabel}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        report={report}
        color={color}
      />
    </>
  );
};
