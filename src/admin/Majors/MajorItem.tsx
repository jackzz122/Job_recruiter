import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CodeIcon from "@mui/icons-material/Code";
import Typography from "@mui/material/Typography";
export const MajorItem = () => {
  return (
    <TableRow hover>
      <TableCell>
        <Stack direction="row" spacing={1} alignItems="center">
          <CodeIcon color="primary" />
          <Typography>React</Typography>
        </Stack>
      </TableCell>

      <TableCell align="right">
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton size="small" color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
