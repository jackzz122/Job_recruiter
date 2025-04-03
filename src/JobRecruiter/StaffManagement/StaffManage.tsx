import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { colorButtonOrange, styleButton } from "../../themeContext";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { useState } from "react";
import { DialogEmployeeAccount } from "./component/DialogEmployeeAccount";
import { ContainerBox } from "../component/ContainerBox";
import { SimpleInforStaff } from "./SimpleInforStaff";
import { CardInforStaff } from "./CardInforStaff";
import Grid2 from "@mui/material/Grid2";
export const StaffManage = () => {
  const [openAccout, setOpenAccount] = useState(false);
  const [isSimple, setIsSimple] = useState(true);
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
        <Button
          sx={{ backgroundColor: colorButtonOrange, color: "white" }}
          onClick={() => setIsSimple(!isSimple)}
        >
          {isSimple ? "Show Advanced" : "Show Simple"}
        </Button>
      </Stack>
      <br />
      {isSimple ? (
        <SimpleInforStaff />
      ) : (
        <Grid2 container spacing={2}>
          <Grid2 size={3}>
            <CardInforStaff />
          </Grid2>
          <Grid2 size={3}>
            <CardInforStaff />
          </Grid2>
          <Grid2 size={3}>
            <CardInforStaff />
          </Grid2>
        </Grid2>
      )}
    </ContainerBox>
  );
};
