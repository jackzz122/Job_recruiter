import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { colorButtonOrange, styleButton } from "../../themeContext";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { useState } from "react";
import { DialogEmployeeAccount } from "./component/DialogEmployeeAccount";
import { ContainerBox } from "../component/ContainerBox";
import { SimpleInforStaff } from "./SimpleInforStaff";

import { useGetRecruiterQuery } from "../../redux/feature/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feature/user/userSlice";
import { Box, CircularProgress, Typography } from "@mui/material";

export const StaffManage = () => {
  const [openAccout, setOpenAccount] = useState(false);
  const handleOpenAccount = () => {
    setOpenAccount(true);
  };
  const handleCloseAccount = () => {
    setOpenAccount(false);
  };
  const recruiter = useSelector(selectUser);

  // Check if companyId is an object with _id property
  const companyId =
    recruiter?.companyId &&
    typeof recruiter.companyId === "object" &&
    "_id" in recruiter.companyId
      ? recruiter.companyId._id
      : undefined;

  // Only make the query if we have a valid companyId
  const {
    data: staff,
    isLoading,
    isError,
  } = useGetRecruiterQuery(companyId || "", {
    // Skip the query if companyId is undefined
    skip: !companyId,
  });

  // Handle loading state
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress sx={{ color: colorButtonOrange }} />
      </Box>
    );
  }

  // Handle error state
  // if (isError) {
  //   return (
  //     <Box sx={{ p: 4, textAlign: "center" }}>
  //       <Typography color="error">
  //         Error loading staff data. Please try again later.
  //       </Typography>
  //     </Box>
  //   );
  // }

  // Handle case when no staff data is available
  // if (!staff || staff.length === 0) {
  //   return (
  //     <Box sx={{ p: 4, textAlign: "center" }}>
  //       <Typography>
  //         No staff members found. Add your first staff member to get started.
  //       </Typography>
  //     </Box>
  //   );
  // }

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
      <br />
      <SimpleInforStaff staff={staff} />
    </ContainerBox>
  );
};
