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
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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

export const FirstCV: React.FC<CVProps> = ({ userData }) => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{ bgcolor: "background.paper", p: 4, height: "100%" }}
    >
      <Grid container spacing={3}>
        {/* Left column - Personal info */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: "grey.100",
              p: 3,
              borderRadius: 2,
              height: "100%",
            }}
          >
            {/* Profile image */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Avatar
                src={userData.avatarIMG || "/placeholder-avatar.png"}
                alt={userData.fullname}
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid white",
                  boxShadow: 1,
                }}
              />
            </Box>

            {/* Personal details */}
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                variant="h5"
                component="h1"
                fontWeight="bold"
                color="text.primary"
              >
                {userData.fullname}
              </Typography>
            </Box>

            {/* Contact information */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  pb: 0.5,
                  mb: 1,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                Contact Info
              </Typography>

              <Stack spacing={1.5}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography variant="body2">{userData.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon fontSize="small" color="action" />
                  <Typography variant="body2">{userData.phone}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2">{userData.address}</Typography>
                </Box>
              </Stack>
            </Box>

            {/* Skills */}
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  pb: 0.5,
                  mb: 1,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {userData.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    sx={{
                      bgcolor: "grey.200",
                      color: "text.secondary",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right column - Professional details */}
        <Grid item xs={12} md={8}>
          {/* About me */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                pb: 0.5,
                mb: 1,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              About Me
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {userData.aboutMe}
            </Typography>
          </Box>

          {/* Work Experience */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                pb: 0.5,
                mb: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              Work Experience
            </Typography>
            <Stack spacing={2}>
              {userData.workEx.map((job, index) => (
                <Box
                  key={index}
                  sx={{
                    pl: 2,
                    ml: 1,
                    borderLeft: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {job.position}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {job.companyName}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 0.5 }}
                  >
                    {job.startDate} - {job.endDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Education */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                pb: 0.5,
                mb: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              Education
            </Typography>
            <Stack spacing={2}>
              {userData.education.map((edu, index) => (
                <Box
                  key={index}
                  sx={{
                    pl: 2,
                    ml: 1,
                    borderLeft: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {edu.schoolName}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {edu.major}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 0.5 }}
                  >
                    {edu.startDate} - {edu.endDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Projects */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                pb: 0.5,
                mb: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              Projects
            </Typography>
            <Stack spacing={2}>
              {userData.projects.map((project, index) => (
                <Box
                  key={index}
                  sx={{
                    pl: 2,
                    ml: 1,
                    borderLeft: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {project.projectName}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {project.role}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 0.5 }}
                  >
                    {project.startDate} - {project.endDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Certificates */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                pb: 0.5,
                mb: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              Certificates
            </Typography>
            <Stack spacing={2}>
              {userData.certificate.map((cert, index) => (
                <Box
                  key={index}
                  sx={{
                    pl: 2,
                    ml: 1,
                    borderLeft: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {cert.certName}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {cert.organization}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 0.5 }}
                  >
                    {cert.issueDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cert.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
