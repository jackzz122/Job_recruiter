import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { RecruiterComp } from "../../../components/Recruiter/RecruiterComp";
import { Outlet } from "react-router-dom";
export const ListCompCareer = () => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Box flexGrow={0}>
          <RecruiterComp isChoose={true} />
        </Box>
        <Box flexGrow={2} sx={{ height: "100vh" }}>
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};
