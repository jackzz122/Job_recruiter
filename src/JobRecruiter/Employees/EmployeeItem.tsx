import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { colorButtonOrange } from "../../themeContext";
export const EmployeeItem = () => {
  return (
    <TableRow>
      <TableCell>Nguyễn Văn Đình</TableCell>
      <TableCell>dinh0123@gmail.com</TableCell>
      <TableCell>FrontEnd</TableCell>
      <TableCell>Not seen</TableCell>
      <TableCell>
        <Stack direction="row" spacing={1}>
          <Button
            sx={{ border: `1px solid ${colorButtonOrange}` }}
            variant="outlined"
          >
            <RemoveRedEyeOutlinedIcon sx={{ color: colorButtonOrange }} />
          </Button>
          <Button
            variant="outlined"
            sx={{
              border: `1px solid ${colorButtonOrange}`,
              color: colorButtonOrange,
            }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            sx={{
              border: `1px solid ${colorButtonOrange}`,
              color: colorButtonOrange,
            }}
          >
            Reject
          </Button>
          <Button
            variant="outlined"
            sx={{
              border: `1px solid ${colorButtonOrange}`,
              color: colorButtonOrange,
            }}
          >
            <DeleteOutlineOutlinedIcon sx={{ color: colorButtonOrange }} />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
