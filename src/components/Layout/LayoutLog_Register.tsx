import { Outlet } from "react-router-dom";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import StarIcon from "@mui/icons-material/Star";

export const LayoutLog_Register = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
      }}
    >
      <Grid2
        container
        sx={{
          maxWidth: 1200,
          bgcolor: "white",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Grid2 size={{ xs: 12, md: 5 }} sx={{ bgcolor: "#f5f5f5", p: 4 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              color: "#000000",
              mb: 2,
            }}
          >
            Dev<span style={{ color: "#ff0000" }}>Hub</span>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#666666",
              mb: 6,
            }}
          >
            Your Gateway to Professional Success
          </Typography>

          <Stack spacing={4}>
            <Stack direction="row" spacing={2} alignItems="center">
              <SpeedIcon sx={{ color: "#ff0000", fontSize: 32 }} />
              <Box>
                <Typography variant="h6" color="black">
                  Fast Recruitment
                </Typography>
                <Typography variant="body2" color="#666666">
                  Quick and efficient hiring process
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <SecurityIcon sx={{ color: "#ff0000", fontSize: 32 }} />
              <Box>
                <Typography variant="h6" color="black">
                  Verified Companies
                </Typography>
                <Typography variant="body2" color="#666666">
                  All employers are pre-screened
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <StarIcon sx={{ color: "#ff0000", fontSize: 32 }} />
              <Box>
                <Typography variant="h6" color="black">
                  Premium Jobs
                </Typography>
                <Typography variant="body2" color="#666666">
                  High-quality career opportunities
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 7 }} sx={{ p: 4 }}>
          <Box sx={{ maxWidth: 480, mx: "auto" }}>
            <Box sx={{ mb: 4 }}>
              <Outlet />
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};
