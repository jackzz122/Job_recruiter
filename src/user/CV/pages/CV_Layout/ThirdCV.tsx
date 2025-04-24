import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

type CVProps = {
  userData: {
    avatarIMG: string;
    fullname: string;
    phone: string;
    address: string;
    email: string;
    aboutMe: string;
    skills: string[];
    education: Array<{
      schoolName: string;
      major: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    workEx: Array<{
      companyName: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    projects: Array<{
      projectName: string;
      role: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    certificate: Array<{
      certName: string;
      organization: string;
      issueDate: string;
      description: string;
    }>;
  };
};

export const ThirdCV: React.FC<CVProps> = ({ userData }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.paper",
        color: "text.primary",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header with accent color */}
      <Box sx={{ bgcolor: "purple.700", color: "white", p: 4 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 3,
            }}
          >
            <Avatar
              src={userData.avatarIMG || "/placeholder-avatar.png"}
              alt={userData.fullname}
              sx={{
                width: 128,
                height: 128,
                border: "4px solid white",
              }}
            />

            <Box>
              <Typography variant="h3" fontWeight={800} mb={1}>
                {userData.fullname}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: alpha(theme.palette.common.white, 0.8),
                  maxWidth: "36rem",
                }}
              >
                {userData.aboutMe}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Contact bar */}
      <Box sx={{ bgcolor: "#4a148c", color: "white", py: 1.5 }}>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            flexWrap="wrap"
            spacing={2}
            justifyContent={{ xs: "center", md: "space-between" }}
            sx={{ "& > *": { mb: { xs: 1, md: 0 } } }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon
                sx={{ color: alpha(theme.palette.common.white, 0.7) }}
              />
              <Typography variant="body2">{userData.email}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon
                sx={{ color: alpha(theme.palette.common.white, 0.7) }}
              />
              <Typography variant="body2">{userData.phone}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon
                sx={{ color: alpha(theme.palette.common.white, 0.7) }}
              />
              <Typography variant="body2">{userData.address}</Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Main content */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Skills section */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                width: 8,
                height: 32,
                bgcolor: "purple.600",
                mr: 2,
              }}
            />
            <Typography variant="h5" fontWeight="bold" color="purple.700">
              Skills
            </Typography>
          </Box>
          <Box sx={{ ml: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {userData.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                sx={{
                  //   bgcolor: alpha(theme.palette.purple[100], 0.5),
                  color: "purple.800",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Two column layout for experience and education */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          {/* Experience */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{ width: 8, height: 32, bgcolor: "error.main", mr: 2 }}
              />
              <Typography variant="h5" fontWeight="bold" color="error.main">
                Work Experience
              </Typography>
            </Box>

            <Stack spacing={3} sx={{ ml: 3 }}>
              {userData.workEx.map((job, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    borderLeft: `2px solid ${alpha(
                      theme.palette.error.main,
                      0.2
                    )}`,
                    pl: 3,
                    pb: 3,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: -6,
                      top: 6,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: "error.main",
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {job.position}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "error.main",
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="error.main"
                      fontWeight="medium"
                    >
                      {job.companyName}
                      <Box component="span" sx={{ mx: 1 }}>
                        •
                      </Box>
                      <Box component="span" sx={{ fontSize: "0.875rem" }}>
                        {job.startDate} - {job.endDate}
                      </Box>
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {job.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Education */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{ width: 8, height: 32, bgcolor: "primary.main", mr: 2 }}
              />
              <Typography variant="h5" fontWeight="bold" color="primary.main">
                Education
              </Typography>
            </Box>

            <Stack spacing={3} sx={{ ml: 3 }}>
              {userData.education.map((edu, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    borderLeft: `2px solid ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )}`,
                    pl: 3,
                    pb: 3,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: -6,
                      top: 6,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {edu.schoolName}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "primary.main",
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="primary.main"
                      fontWeight="medium"
                    >
                      {edu.major}
                      <Box component="span" sx={{ mx: 1 }}>
                        •
                      </Box>
                      <Box component="span" sx={{ fontSize: "0.875rem" }}>
                        {edu.startDate} - {edu.endDate}
                      </Box>
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {edu.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Projects section */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{ width: 8, height: 32, bgcolor: "success.main", mr: 2 }}
            />
            <Typography variant="h5" fontWeight="bold" color="success.main">
              Projects
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ ml: 1 }}>
            {userData.projects.map((project, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.success.main, 0.05),
                    borderLeft: `4px solid ${theme.palette.success.main}`,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" mb={0.5}>
                    {project.projectName}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "success.main",
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="success.main"
                      fontWeight="medium"
                    >
                      {project.role}
                      <Box component="span" sx={{ mx: 1 }}>
                        •
                      </Box>
                      <Box component="span" sx={{ fontSize: "0.875rem" }}>
                        {project.startDate} - {project.endDate}
                      </Box>
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Certificates section */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{ width: 8, height: 32, bgcolor: "warning.main", mr: 2 }}
            />
            <Typography variant="h5" fontWeight="bold" color="warning.main">
              Certificates
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ ml: 1 }}>
            {userData.certificate.map((cert, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Box sx={{ mt: 0.5, flexShrink: 0 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                      }}
                    >
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: "warning.main" }}
                      />
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {cert.certName}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "warning.main",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="warning.main"
                        fontWeight="medium"
                      >
                        {cert.organization}
                        <Box component="span" sx={{ mx: 1 }}>
                          •
                        </Box>
                        <Box component="span" sx={{ fontSize: "0.875rem" }}>
                          {cert.issueDate}
                        </Box>
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {cert.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
