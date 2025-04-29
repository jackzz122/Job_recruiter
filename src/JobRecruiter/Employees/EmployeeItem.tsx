import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { colorButtonOrange } from "../../themeContext";
import { statusApplication } from "../../types/JobType";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Chip from "@mui/material/Chip";
import { format } from "date-fns";
import { useChangeStatusApplicantMutation } from "../../redux/feature/job/jobApiSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { DialogAccept } from "./DialogStatus/DialogAccept";
import { DialogRejected } from "./DialogStatus/DialogRejected";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feature/user/userSlice";
import { DialogRemove } from "./DialogRemove";
type EmployeeItemProps = {
  accountId: string;
  fullname: string;
  phone: string;
  avatarIMG: string;
  email: string;
  linkPdf: string;
  appliedAt: string;
  coverLetter: string;
  status: statusApplication;
  notes: string;
};

export const EmployeeItem = ({
  jobId,
  account,
}: {
  jobId: string;
  account: EmployeeItemProps;
}) => {
  const user = useSelector(selectUser);
  const [openAccept, setOpenAccept] = useState(false);
  const [openRejected, setopenRejected] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [changeStatus, { isLoading }] = useChangeStatusApplicantMutation();
  const handleChangeStatus = async (status: string) => {
    if (account?.accountId) {
      if (status === statusApplication.Success && user) {
        const response = await changeStatus({
          jobId: jobId,
          status: status,
          id: account?.accountId,
          ownerMail: user?.email,
          receiveMail: account.email,
        });
        if (response.data?.success) {
          toast.success(response.data?.message);
        }
      } else if (status === statusApplication.Rejected && user) {
        const response = await changeStatus({
          jobId: jobId,
          status: status,
          id: account?.accountId,
          ownerMail: user?.email,
          receiveMail: account.email,
        });
        if (response.data?.success) {
          toast.success(response.data?.message);
        }
      } else {
        const response = await changeStatus({
          jobId: jobId,
          status: status,
          id: account?.accountId,
        });
        if (response?.data?.success) {
          if (account?.linkPdf) {
            window.open(account?.linkPdf, "_blank");
          }
          if (account?.status !== statusApplication.Reviewing) {
            toast.success("Change status");
          }
        }
      }
    }
  };
  const getStatusChip = () => {
    switch (account?.status) {
      case statusApplication.Reviewing:
        return {
          icon: <RemoveRedEyeOutlinedIcon fontSize="small" />,
          label: "Reviewing",
          sx: {
            bgcolor: "rgba(255, 193, 7, 0.1)",
            color: "#F9A825",
          },
        };
      case statusApplication.Rejected:
        return {
          icon: <CancelOutlinedIcon fontSize="small" />,
          label: "Rejected",
          sx: {
            bgcolor: "rgba(244, 67, 54, 0.1)",
            color: "#E53935",
          },
        };
      case statusApplication.Success: {
        return {
          icon: <CheckCircleOutlineIcon fontSize="small" />,
          label: "Success",
          sx: {
            bgcolor: "rgba(76, 175, 80, 0.1)",
            color: "#4CAF50",
          },
        };
      }
      case statusApplication.Submitted:
      default:
        return {
          icon: <VisibilityOffIcon fontSize="small" />,
          label: "Not seen",
          sx: {
            bgcolor: "rgba(255, 108, 48, 0.1)",
            color: colorButtonOrange,
          },
        };
    }
  };

  // const statusChipConfig = getStatusChip();

  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: "rgba(255, 108, 48, 0.04)",
        },
      }}
    >
      {/* Employee Name with Icon */}
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PersonOutlineIcon sx={{ color: colorButtonOrange, fontSize: 20 }} />
          <Typography variant="body1">{account?.fullname}</Typography>
        </Box>
      </TableCell>

      {/* Email with Icon */}
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmailOutlinedIcon sx={{ color: colorButtonOrange, fontSize: 20 }} />
          <Typography variant="body2">
            {account?.email || "..........."}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocalPhoneIcon sx={{ color: colorButtonOrange, fontSize: 20 }} />
          <Typography variant="body2">
            {account?.phone || "..........."}
          </Typography>
        </Box>
      </TableCell>

      {/* Applied Position */}
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WorkOutlineIcon sx={{ color: colorButtonOrange, fontSize: 20 }} />
          <Box>
            <Typography variant="caption" color="text.secondary">
              Applied on: {format(account?.appliedAt as string, "dd MMMM yyyy")}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* Status with Chip */}
      <TableCell>
        <Chip
          icon={getStatusChip().icon}
          label={getStatusChip().label}
          size="small"
          sx={{
            ...getStatusChip().sx,
            fontWeight: 500,
            borderRadius: 1,
          }}
        />
      </TableCell>

      {/* Actions */}
      <TableCell>
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Details">
            <Button
              variant="outlined"
              onClick={() => handleChangeStatus(statusApplication.Reviewing)}
              size="small"
              sx={{
                minWidth: "36px",
                p: "6px",
                border: `1px solid ${colorButtonOrange}`,
                borderRadius: 1,
              }}
            >
              <RemoveRedEyeOutlinedIcon
                sx={{ color: colorButtonOrange, fontSize: 20 }}
              />
            </Button>
          </Tooltip>

          <Tooltip title="Accept">
            <Button
              variant="outlined"
              size="small"
              // disabled={Boolean(user?.role)}
              onClick={() => setOpenAccept(true)}
              sx={{
                minWidth: "36px",
                p: "6px",
                border: `1px solid ${colorButtonOrange}`,
                color: colorButtonOrange,
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 108, 48, 0.08)",
                },
              }}
              startIcon={<CheckCircleOutlineIcon />}
            >
              Accept
            </Button>
          </Tooltip>
          <DialogAccept
            loading={isLoading}
            openAccept={openAccept}
            handleAccept={handleChangeStatus}
            handleCloseAccept={() => setOpenAccept(false)}
          />

          <Tooltip title="Reject">
            <Button
              variant="outlined"
              size="small"
              // disabled={Boolean(user?.role)}
              onClick={() => setopenRejected(true)}
              sx={{
                minWidth: "36px",
                p: "6px",
                border: `1px solid ${colorButtonOrange}`,
                color: colorButtonOrange,
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 108, 48, 0.08)",
                },
              }}
              startIcon={<CancelOutlinedIcon />}
            >
              Reject
            </Button>
          </Tooltip>
          <DialogRejected
            loading={isLoading}
            openRejected={openRejected}
            handleRejected={handleChangeStatus}
            handleCloseRejected={() => setopenRejected(false)}
          />
          <Tooltip title="Delete">
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenDelete(true)}
              // disabled={Boolean(user?.role)}
              sx={{
                minWidth: "36px",
                p: "6px",
                border: `1px solid ${colorButtonOrange}`,
                borderRadius: 1,
              }}
            >
              <DeleteOutlineOutlinedIcon
                sx={{ color: colorButtonOrange, fontSize: 20 }}
              />
            </Button>
          </Tooltip>
          <DialogRemove
            jobId={jobId}
            accountId={account?.accountId}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
};
