import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import TableCell from "@mui/material/TableCell";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export const SingleJobModel = () => {
  return (
    <>
      <TableCell>FrontEnd Developer</TableCell>
      <TableCell>Phòng ban</TableCell>
      <TableCell>Ha Noi</TableCell>
      <TableCell>12/03/2025</TableCell>
      <TableCell>03/02/2026</TableCell>
      <TableCell>On Going</TableCell>
      <TableCell>15</TableCell>
      <TableCell>
        <Box>
          <Tooltip title="Xem chi tiết">
            <IconButton size="small" sx={{ mr: 0.5 }}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <IconButton size="small" sx={{ mr: 0.5 }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton size="small" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </>
  );
};
