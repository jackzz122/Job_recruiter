import Table from "@mui/material/Table";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import TableContainer from "@mui/material/TableContainer";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { colorButtonOrange } from "../../themeContext";
import Typography from "@mui/material/Typography";
export const SimpleInforStaff = () => {
  const isActive = true;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Activate</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Nguyễn Văn Đình</TableCell>
            <TableCell>Nguyễn Văn Đình</TableCell>
            <TableCell>
              {isActive ? (
                <Typography
                  sx={{ color: colorButtonOrange }}
                  variant="body2"
                  fontWeight="bold"
                >
                  {" "}
                  <ToggleOnIcon fontSize="large" />
                  Active
                </Typography>
              ) : (
                <Typography variant="body2" fontWeight="bold">
                  {" "}
                  <ToggleOffIcon fontSize="large" />
                  Non active
                </Typography>
              )}
            </TableCell>
            <TableCell>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined">
                  <RemoveRedEyeOutlinedIcon />
                </Button>
                <Button variant="outlined">Delete</Button>
              </Stack>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
