import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { colorButtonOrange, styleButton } from "../../themeContext";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useState } from "react";
import { DialogEmployeeAccount } from "../../components/Dialog/Recruiter/DialogEmployeeAccount";
import { ContainerBox } from "../../components/ContainerRecruiter/ContainerBox";

export const StaffManage = () => {
  const [openAccout, setOpenAccount] = useState(false);
  const handleOpenAccount = () => {
    setOpenAccount(true);
  };
  const handleCloseAccount = () => {
    setOpenAccount(false);
  };
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
        <Button
          sx={styleButton}
          onClick={handleOpenAccount}
          variant="contained"
        >
          Create Employee account
        </Button>
        <DialogEmployeeAccount
          open={openAccout}
          closeAccountFunct={handleCloseAccount}
        />
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Nguyễn Văn Đình</TableCell>
              <TableCell>Nguyễn Văn Đình</TableCell>
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
    </ContainerBox>
  );
};
