import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CodeIcon from "@mui/icons-material/Code";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const TechnologiesItem = () => {
  return (
    <TableRow hover>
      <TableCell>
        <Stack direction="row" spacing={1} alignItems="center">
          <CodeIcon color="primary" />
          <Typography>React</Typography>
        </Stack>
      </TableCell>
      <TableCell>0 jobs</TableCell>
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
