import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MajorType } from "../../types/MajorType";

export const MajorItem = ({
  major,
  handleOpenNameDialog,
  handleDelete,
}: {
  major: MajorType;
  handleOpenNameDialog: (major: MajorType) => void;
  handleDelete: (id: string) => void;
}) => {
  return (
    <TableRow key={major._id} hover>
      <TableCell>{major.name}</TableCell>
      <TableCell align="right">
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleOpenNameDialog(major)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(major._id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
