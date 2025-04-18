import Stack from "@mui/material/Stack";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { DetailsHeader } from "../DetailsCompany/DetailsHeader";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { RecruiterComp } from "./RecruiterComp";
import { useGetJobPostingsQuery } from "../../../redux/feature/job/jobApiSlice";

export const LayoutDetailsComp = () => {
  const { id } = useParams();
  const { data: jobs } = useGetJobPostingsQuery(id || " ", { skip: !id });
  return (
    <Box
      sx={{
        backgroundColor: "#f3f5f7",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="companyColor">
        <Box sx={{ marginInline: "2.5rem" }}>
          <DetailsHeader />
        </Box>
      </div>
      <Box marginTop={4}></Box>
      <Container
        sx={{
          backgroundColor: "#f3f5f7",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
        maxWidth="xl"
      >
        <Stack
          direction="row"
          spacing={3}
          sx={{
            padding: "0.75rem",
            flex: 1,
          }}
        >
          <Box
            sx={{
              flexGrow: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                border: "1px solid #bfbfbf",
                padding: "1.5rem",
                backgroundColor: "white",
                maxHeight: "4.5rem",
                maxWidth: "59.563rem",
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
            <Box sx={{ flex: 1 }}>
              <Outlet />
            </Box>
          </Box>
          <Box
            sx={{
              position: "sticky",
              top: "6rem",
              height: "calc(100vh - 2rem)",
              width: "29.375rem",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {jobs?.data?.length} việc làm đang tuyển dụng
            </Typography>
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "#555",
                  },
                },
              }}
            >
              {jobs?.data?.map((job) => (
                <RecruiterComp key={job._id} jobDetail={job} />
              ))}
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
