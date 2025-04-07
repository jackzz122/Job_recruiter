import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { colorButtonOrange } from "../../themeContext";

export const EmployeeItem = () => {
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
          <Typography variant="body1">Nguyễn Văn Đình</Typography>
        </Box>
      </TableCell>

      {/* Email with Icon */}
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmailOutlinedIcon sx={{ color: colorButtonOrange, fontSize: 20 }} />
          <Typography variant="body2">dinh0123@gmail.com</Typography>
        </Box>
      </TableCell>

      {/* Applied Position */}
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WorkOutlineIcon sx={{ color: colorButtonOrange, fontSize: 20 }} />
          <Box>
            <Typography variant="body2">FrontEnd Developer</Typography>
            <Typography variant="caption" color="text.secondary">
              Applied on: 15 Jun, 2023
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* Status with Chip */}
      <TableCell>
        <Chip
          icon={<VisibilityOffIcon fontSize="small" />}
          label="Not seen"
          size="small"
          sx={{
            bgcolor: "rgba(255, 108, 48, 0.1)",
            color: colorButtonOrange,
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
