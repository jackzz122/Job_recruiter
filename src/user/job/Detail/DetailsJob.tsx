import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import DetailsInforCompany from "./DetailsInfoCompany";
import DetailsJobBody from "./DetailsJobBody";
import DetailsJobHeader from "./DetailsJobHeader";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const DetailsJob = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box className="relative min-h-screen">
      <Box className="gradient" />

      <Box className="relative z-10 px-10">
        <Box sx={{ py: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
              color: "white",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              },
              mb: 2,
              px: 3,
              py: 1,
              borderRadius: 2,
              transition: "all 0.2s ease",
            }}
          >
            Back to Jobs
          </Button>
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
