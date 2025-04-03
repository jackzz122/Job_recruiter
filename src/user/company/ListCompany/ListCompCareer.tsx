import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { RecruiterComp } from "../components/RecruiterComp";
import { Outlet } from "react-router-dom";
export const ListCompCareer = () => {
  return (
    <div className="relative">
      <Stack direction="row" spacing={2}>
        <Box flexGrow={0}>
          <RecruiterComp isChoose={true} isHotOrNot={true} />
          <RecruiterComp />
          <RecruiterComp />
          <RecruiterComp />
          <RecruiterComp />
          <RecruiterComp />
        </Box>
        <Box flexGrow={1} sx={{ height: "100vh" }}>
          <Outlet />
        </Box>
      </Stack>
    </div>
  );
};
