import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { colorButtonOrange, styleButton } from "../../themeContext";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { useState } from "react";
import { DialogEmployeeAccount } from "./component/DialogEmployeeAccount";
import { ContainerBox } from "../component/ContainerBox";
import { SimpleInforStaff } from "./SimpleInforStaff";

import { useGetRecruitersQuery } from "../../redux/feature/user/recruiterApiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feature/user/userSlice";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { UserType } from "../../types/UserType";
import { CompanyType } from "../../types/CompanyType";
import { RoleName } from "../../types/UserType";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";

export const StaffManage = () => {
  const [openAccout, setOpenAccount] = useState(false);
  const handleOpenAccount = () => {
    setOpenAccount(true);
  };
  const handleCloseAccount = () => {
    setOpenAccount(false);
  };
  const recruiter = useSelector(selectUser);

  const companyId = (recruiter?.companyId as CompanyType)?._id;

  const { data: staff, isLoading } = useGetRecruitersQuery(companyId || "", {
    skip: !companyId,
  });

  if (recruiter?.role !== RoleName.RECRUIT) {
    return (
      <ContainerBox>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            gap: 2,
          }}
        >
          <LockIcon sx={{ fontSize: 60, color: "gray" }} />
          <Typography variant="h5" color="text.secondary">
            Access Denied
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You do not have permission to view this page.
          </Typography>
        </Box>
      </ContainerBox>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress sx={{ color: colorButtonOrange }} />
      </Box>
    );
  }

  return (
    <ContainerBox>
      <form>
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
      <br />
      <SimpleInforStaff staff={staff?.data as UserType[]} />
    </ContainerBox>
  );
};
