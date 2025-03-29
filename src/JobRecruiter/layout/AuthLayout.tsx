import { Outlet } from "react-router-dom";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedIcon from "@mui/icons-material/Verified";
import { colorButtonOrange } from "../../themeContext";

export const AuthLayout = () => {
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
            IT<span style={{ color: colorButtonOrange }}>Dev</span>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#666666",
              mb: 6,
            }}
          >
            Your Partner in Tech Talent Acquisition
          </Typography>

          <Stack spacing={4}>
            <Stack direction="row" spacing={2} alignItems="center">
              <BusinessCenterIcon
                sx={{ color: colorButtonOrange, fontSize: 32 }}
              />
              <Box>
                <Typography variant="h6" color="black">
                  Talent Management
                </Typography>
                <Typography variant="body2" color="#666666">
                  Streamlined recruitment process
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <GroupsIcon sx={{ color: colorButtonOrange, fontSize: 32 }} />
              <Box>
                <Typography variant="h6" color="black">
                  Quality Candidates
                </Typography>
                <Typography variant="body2" color="#666666">
                  Access to skilled tech professionals
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <VerifiedIcon sx={{ color: colorButtonOrange, fontSize: 32 }} />
              <Box>
                <Typography variant="h6" color="black">
                  Verified Profiles
                </Typography>
                <Typography variant="body2" color="#666666">
                  Pre-screened developer profiles
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
