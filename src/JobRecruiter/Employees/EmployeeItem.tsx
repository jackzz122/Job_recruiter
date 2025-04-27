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

type EmployeeItemProps = {
  account?: {
    accountId: string;
    fullname: string;
    phone: string;
    avatarIMG: string;
    linkPdf: string;
    appliedAt: string;
    coverLetter: string;
    status: statusApplication;
    notes: string;
  };
};

export const EmployeeItem = ({ account }: EmployeeItemProps) => {
  // Format the applied date

  console.log(account);
  // Get status chip configuration based on application status
  // const getStatusChip = () => {
  //   switch (employeeData.status) {
  //     case statusApplication.Reviewing:
  //       return {
  //         icon: <RemoveRedEyeOutlinedIcon fontSize="small" />,
  //         label: "Reviewing",
  //         sx: {
  //           bgcolor: "rgba(255, 193, 7, 0.1)",
  //           color: "#F9A825",
  //         },
  //       };
  //     case statusApplication.Rejected:
  //       return {
  //         icon: <CancelOutlinedIcon fontSize="small" />,
  //         label: "Rejected",
  //         sx: {
  //           bgcolor: "rgba(244, 67, 54, 0.1)",
  //           color: "#E53935",
  //         },
  //       };
  //     case statusApplication.Submitted:
  //     default:
  //       return {
  //         icon: <VisibilityOffIcon fontSize="small" />,
  //         label: "Not seen",
  //         sx: {
  //           bgcolor: "rgba(255, 108, 48, 0.1)",
  //           color: colorButtonOrange,
  //         },
  //       };
  //   }
  // };

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
          <Typography variant="body2">{account?.phone}</Typography>
        </Box>
      </TableCell>

      {/* Applied Position */}
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WorkOutlineIcon sx={{ color: colorButtonOrange, fontSize: 20 }} />
          <Box>
            <Typography variant="caption" color="text.secondary">
              Applied on: {account?.appliedAt}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* Status with Chip */}
      <TableCell>
        {/* <Chip
          icon={statusChipConfig.icon}
          label={statusChipConfig.label}
          size="small"
          sx={{
            ...statusChipConfig.sx,
            fontWeight: 500,
            borderRadius: 1,
          }}
        /> */}
      </TableCell>

      {/* Actions */}
      <TableCell>
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Details">
            <Button
              variant="outlined"
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

          <Tooltip title="Reject">
            <Button
              variant="outlined"
              size="small"
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

          <Tooltip title="Delete">
            <Button
              variant="outlined"
              size="small"
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
  );
};
