import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { colorButtonOrange, styleButton } from "../../themeContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ContainerBox } from "../component/ContainerBox";
export const List_employ = () => {
  return (
    <ContainerBox>
      <form action="">
        <Stack direction="row" spacing={2}>
          <TextField label="Search" fullWidth />
          <Button
            sx={{
              backgroundColor: colorButtonOrange,
              color: "white",
              border: "none",
            }}
            variant="contained"
          >
            Search
          </Button>
        </Stack>
      </form>
      <Stack marginTop={2} direction="row" spacing={1}>
        <Button sx={styleButton} variant="outlined">
          Sort <SortByAlphaIcon />
        </Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                    <RemoveRedEyeOutlinedIcon
                      sx={{ color: colorButtonOrange }}
                    />
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
                    <DeleteOutlineOutlinedIcon
                      sx={{ color: colorButtonOrange }}
                    />
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </ContainerBox>
  );
};
