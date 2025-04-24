import React from "react";
import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

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

export const FourthCV: React.FC<CVProps> = ({ userData }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: "grey.900",
        color: "grey.200",
        height: "100%",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <Box sx={{ bgcolor: "grey.800", py: 5 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            {/* Avatar */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Box
                sx={{
                  width: 144,
                  height: 144,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid",
                  borderColor: "teal.500",
                }}
              >
                <Avatar
                  src={userData.avatarIMG || "/placeholder-avatar.png"}
                  alt={userData.fullname}
                  sx={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Grid>

            {/* Name and title */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Typography
                variant="h3"
                fontWeight={800}
                color="common.white"
                mb={1}
                letterSpacing="-0.5px"
              >
                {userData.fullname}
              </Typography>
              <Box
                sx={{
                  height: 4,
                  width: 64,
                  bgcolor: "teal.500",
                  mx: { xs: "auto", md: 0 },
                  mb: 1.5,
                }}
              />
              <Typography variant="subtitle1" color="teal.400" fontWeight={500}>
                Professional Resume
              </Typography>
            </Grid>

            {/* Contact info */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{ textAlign: { xs: "center", md: "right" } }}
            >
              <Stack spacing={1}>
                <Typography>
                  <Box component="span" sx={{ color: "teal.400" }}>
                    Email:{" "}
                  </Box>
                  {userData.email}
                </Typography>
                <Typography>
                  <Box component="span" sx={{ color: "teal.400" }}>
                    Phone:{" "}
                  </Box>
                  {userData.phone}
                </Typography>
                <Typography>
                  <Box component="span" sx={{ color: "teal.400" }}>
                    Location:{" "}
                  </Box>
                  {userData.address}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About me section */}
      <Container
        maxWidth="lg"
        sx={{ py: 4, borderBottom: "1px solid", borderColor: "grey.700" }}
      >
        <Typography variant="h5" fontWeight="bold" color="common.white" mb={2}>
          About Me
        </Typography>
        <Typography variant="body1" color="grey.300">
          {userData.aboutMe}
        </Typography>
      </Container>

      {/* Main content - Two column layout */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left column */}
          <Grid item xs={12} md={4}>
            {/* Skills */}
            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="common.white"
                mb={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    bgcolor: "teal.500",
                    mr: 1,
                  }}
                />
                Skills
              </Typography>
              <Stack spacing={1}>
                {userData.skills.map((skill, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Box sx={{ width: "100%", mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={85}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: "grey.700",
                          ".MuiLinearProgress-bar": {
                            bgcolor: "teal.500",
                          },
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      color="common.white"
                      sx={{ minWidth: 112 }}
                    >
                      {skill}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Education */}
            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="common.white"
                mb={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    bgcolor: "teal.500",
                    mr: 1,
                  }}
                />
                Education
              </Typography>
              <Stack spacing={3}>
                {userData.education.map((edu, index) => (
                  <Box
                    key={index}
                    sx={{
                      borderLeft: "2px solid",
                      borderColor: "grey.700",
                      pl: 2,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="teal.400"
                      mb={0.5}
                      display="block"
                    >
                      {edu.startDate} - {edu.endDate}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="common.white"
                    >
                      {edu.schoolName}
                    </Typography>
                    <Typography variant="subtitle2" color="teal.300" mb={1}>
                      {edu.major}
                    </Typography>
                    <Typography variant="body2" color="grey.400">
                      {edu.description}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Right column (spans 2 columns) */}
          <Grid item xs={12} md={8}>
            {/* Work Experience */}
            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="common.white"
                mb={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    bgcolor: "teal.500",
                    mr: 1,
                  }}
                />
                Professional Experience
              </Typography>
              <Stack spacing={4}>
                {userData.workEx.map((job, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={12} md={3}>
                      <Typography variant="caption" color="teal.400">
                        {job.startDate} - {job.endDate}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="common.white"
                      >
                        {job.position}
                      </Typography>
                      <Typography variant="subtitle2" color="teal.300" mb={1}>
                        {job.companyName}
                      </Typography>
                      <Typography variant="body2" color="grey.400">
                        {job.description}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            </Box>

            {/* Projects */}
            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="common.white"
                mb={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    bgcolor: "teal.500",
                    mr: 1,
                  }}
                />
                Projects
              </Typography>
              <Grid container spacing={2}>
                {userData.projects.map((project, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        bgcolor: "grey.800",
                        border: "1px solid",
                        borderColor: "grey.700",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="common.white"
                        mb={0.5}
                      >
                        {project.projectName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="teal.300"
                        mb={1}
                        display="block"
                      >
                        {project.role} | {project.startDate} - {project.endDate}
                      </Typography>
                      <Typography variant="body2" color="grey.400">
                        {project.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Certificates */}
            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="common.white"
                mb={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    bgcolor: "teal.500",
                    mr: 1,
                  }}
                />
                Certificates & Achievements
              </Typography>
              <Grid container spacing={3}>
                {userData.certificate.map((cert, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      <Box sx={{ mt: 0.5 }}>
                        <VerifiedIcon sx={{ color: "teal.500" }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="common.white"
                        >
                          {cert.certName}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="teal.300"
                          mb={0.5}
                          display="block"
                        >
                          {cert.organization} | {cert.issueDate}
                        </Typography>
                        <Typography variant="body2" color="grey.400">
                          {cert.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "grey.800", py: 2, mt: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="grey.500" align="center">
            &copy; {currentYear} {userData.fullname} - Professional Resume
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
