import Stack from "@mui/material/Stack";
import { NavLink, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { DetailsHeader } from "../../pages/Company/DetailsPage/DetailsHeader";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { RecruiterComp } from "../Recruiter/RecruiterComp";
export const LayoutDetailsComp = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f3f5f7",
        minHeight: "100vh",
      }}
    >
      <div className="companyColor">
        <Box sx={{ marginInline: "2.5rem" }}>
          <DetailsHeader />
        </Box>
      </div>
      <Box marginTop={4}></Box>
      <Container
        sx={{ backgroundColor: "#f3f5f7", minHeight: "100vh" }}
        maxWidth="xl"
      >
        <Stack
          direction="row"
          spacing={3}
          sx={{
            padding: "0.75rem",
          }}
        >
          <Box
            sx={{
              flexGrow: 2,
            }}
          >
            <Box
              sx={{
                border: "1px solid #bfbfbf",
                padding: "1.5rem",
                backgroundColor: "white",
                maxHeight: "4.5rem",
                minWidth: "54.625rem",
                borderRadius: "0.5rem",
              }}
            >
              <NavLink
                to="."
                end
                className={({ isActive }) =>
                  `${isActive ? "text-red-500 font-bold" : ""}`
                }
              >
                Giới thiệu
              </NavLink>
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  `ml-5 ${isActive ? "text-red-500 font-bold" : ""}`
                }
              >
                Đánh giá
              </NavLink>
            </Box>
            <div className="h-screen ">
              <Outlet />
            </div>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              7 việc làm đang tuyển dụng{" "}
            </Typography>
            <RecruiterComp />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
