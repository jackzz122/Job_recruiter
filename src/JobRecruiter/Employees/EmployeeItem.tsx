import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";

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
  const [openCoverLetter, setOpenCoverLetter] = useState(false);
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

  return (
    <>
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
            <PersonOutlineIcon
              sx={{ color: colorButtonOrange, fontSize: 20 }}
            />
            <Box>
              <Typography variant="body1" fontWeight={500}>
                {account?.fullname}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {account?.email}
              </Typography>
            </Box>
          </Box>
        </TableCell>

        {/* Phone with Icon */}
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocalPhoneIcon sx={{ color: colorButtonOrange, fontSize: 20 }} />
            <Typography variant="body2">
              {account?.phone || "..........."}
            </Typography>
          </Box>
        </TableCell>

        {/* Applied Date */}
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WorkOutlineIcon sx={{ color: colorButtonOrange, fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              {format(account?.appliedAt as string, "dd MMM yyyy")}
            </Typography>
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
          <Stack direction="row" spacing={1} justifyContent="space-around">
            <Tooltip title="View Cover Letter">
              <Button
                variant="outlined"
                onClick={() => setOpenCoverLetter(true)}
                size="small"
                sx={{
                  minWidth: "36px",
                  p: "6px",
                  border: `1px solid ${colorButtonOrange}`,
                  borderRadius: 1,
                }}
              >
                <DescriptionIcon
                  sx={{ color: colorButtonOrange, fontSize: 20 }}
                />
              </Button>
            </Tooltip>

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
                onClick={() => setOpenAccept(true)}
                sx={{
                  minWidth: "36px",
                  p: "6px",
                  border: `1px solid ${colorButtonOrange}`,
                  borderRadius: 1,
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{ color: colorButtonOrange, fontSize: 20 }}
                />
              </Button>
            </Tooltip>

            <Tooltip title="Reject">
              <Button
                variant="outlined"
                size="small"
                onClick={() => setopenRejected(true)}
                sx={{
                  minWidth: "36px",
                  p: "6px",
                  border: `1px solid ${colorButtonOrange}`,
                  borderRadius: 1,
                }}
              >
                <CancelOutlinedIcon
                  sx={{ color: colorButtonOrange, fontSize: 20 }}
                />
              </Button>
            </Tooltip>

            <Tooltip title="Delete">
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenDelete(true)}
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
          </Stack>
        </TableCell>
      </TableRow>

      {/* Cover Letter Dialog */}
      <Dialog
        open={openCoverLetter}
        onClose={() => setOpenCoverLetter(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            padding: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            pb: 1,
            color: colorButtonOrange,
            fontWeight: 600,
          }}
        >
          <DescriptionIcon />
          Cover Letter
          <IconButton
            onClick={() => setOpenCoverLetter(false)}
            sx={{ ml: "auto" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#f8f9fa",
            borderRadius: 2,
            p: 3,
            maxHeight: 400,
            overflowY: "auto",
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {account?.coverLetter || "No cover letter provided"}
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Existing dialogs */}
      <DialogAccept
        loading={isLoading}
        openAccept={openAccept}
        handleAccept={handleChangeStatus}
        handleCloseAccept={() => setOpenAccept(false)}
      />
      <DialogRejected
        loading={isLoading}
        openRejected={openRejected}
        handleRejected={handleChangeStatus}
        handleCloseRejected={() => setopenRejected(false)}
      />
      <DialogRemove
        jobId={jobId}
        accountId={account?.accountId}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
      />
    </>
  );
};
