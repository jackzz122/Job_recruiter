import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import DetailsInforCompany from "./DetailsInfoCompany";
import DetailsJobBody from "./DetailsJobBody";
import DetailsJobHeader from "./DetailsJobHeader";

export const DetailsJob = () => {
  const breadCrumbs = [
    { label: "Trang chủ", path: "/" },
    { label: "Tất cả việc làm IT", path: "/" },
    { label: "Tuyển thực tập sinh React/NodeJS", path: null },
  ];

  return (
    <Box className="relative min-h-screen">
      <Box className="gradient" />

      <Box className="relative z-10 px-10">
        {/* Breadcrumbs */}
        <Box sx={{ py: 2 }}>
          <Breadcrumbs
            sx={{
              color: "white",
              "& .MuiBreadcrumbs-separator": { color: "rgba(255,255,255,0.6)" },
            }}
          >
            {breadCrumbs.map((crumb, index) => (
              <Link
                key={index}
                to={crumb.path || "#"}
                style={{
                  color: crumb.path ? "rgba(255,255,255,0.8)" : "white",
                  textDecoration: "none",
                  fontWeight: crumb.path ? "normal" : "500",
                }}
              >
                {crumb.label}
              </Link>
            ))}
          </Breadcrumbs>
        </Box>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Stack direction="row" spacing={3}>
            {/* Left Column - Job Details */}
            <Box sx={{ flex: 1, maxWidth: "55.813rem" }}>
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              >
                <DetailsJobHeader />
                <DetailsJobBody />
              </Box>
            </Box>

            {/* Right Column - Company Info */}
            <Box sx={{ width: "29.375rem" }}>
              <Box sx={{ position: "sticky", top: "6rem" }}>
                <DetailsInforCompany />
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
