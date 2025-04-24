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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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

export const SecondCV: React.FC<CVProps> = ({ userData }) => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary;

  return (
    <Container
      maxWidth="lg"
      sx={{ bgcolor: "background.paper", p: 4, height: "100%" }}
    >
      {/* Header section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 3,
          mb: 3,
        }}
      >
        {/* Profile image */}
        <Box sx={{ mb: { xs: 2, md: 0 }, mr: { md: 3 } }}>
          <Avatar
            src={userData.avatarIMG || "/placeholder-avatar.png"}
            alt={userData.fullname}
            sx={{
              width: 140,
              height: 140,
              border: `2px solid ${theme.palette.grey[200]}`,
            }}
          />
        </Box>

        {/* Name and about */}
        <Box
          sx={{
            textAlign: { xs: "center", md: "left" },
            flex: 1,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="text.primary"
            mb={1}
          >
            {userData.fullname}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            mb={2}
            sx={{ maxWidth: "36rem" }}
          >
            {userData.aboutMe}
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            spacing={2}
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
              "& > *": { mb: 1 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <EmailIcon fontSize="small" color="primary" />
              <Typography variant="body2">{userData.email}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PhoneIcon fontSize="small" color="primary" />
              <Typography variant="body2">{userData.phone}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOnIcon fontSize="small" color="primary" />
              <Typography variant="body2">{userData.address}</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Skills section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={1.5}>
          Skills
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {userData.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              sx={{
                bgcolor: `${primaryColor.light}22`,
                color: "primary.main",
                border: `1px solid ${primaryColor.light}`,
                borderRadius: "16px",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Experience section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Work Experience
        </Typography>
        <Stack spacing={3}>
          {userData.workEx.map((job, index) => (
            <Box key={index} sx={{ position: "relative", pl: 4 }}>
              {/* Timeline dot */}
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                }}
              />
              {/* Timeline line */}
              {index < userData.workEx.length - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: 16,
                    width: 2,
                    height: "calc(100% + 24px)",
                    bgcolor: "primary.light",
                    opacity: 0.4,
                  }}
                />
              )}
              <Typography variant="h6" fontWeight="bold">
                {job.position}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={0.5}>
                {job.companyName}
              </Typography>
              <Typography
                variant="caption"
                color="primary"
                sx={{ display: "block", mb: 1 }}
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

      {/* Education section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Education
        </Typography>
        <Stack spacing={3}>
          {userData.education.map((edu, index) => (
            <Box key={index} sx={{ position: "relative", pl: 4 }}>
              {/* Timeline dot */}
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                }}
              />
              {/* Timeline line */}
              {index < userData.education.length - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: 16,
                    width: 2,
                    height: "calc(100% + 24px)",
                    bgcolor: "primary.light",
                    opacity: 0.4,
                  }}
                />
              )}
              <Typography variant="h6" fontWeight="bold">
                {edu.schoolName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={0.5}>
                {edu.major}
              </Typography>
              <Typography
                variant="caption"
                color="primary"
                sx={{ display: "block", mb: 1 }}
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

      {/* Projects section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
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
                  bgcolor: "grey.50",
                  border: `1px solid ${theme.palette.grey[200]}`,
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={0.5}>
                  {project.projectName}
                </Typography>
                <Typography variant="subtitle2" color="primary" mb={0.5}>
                  {project.role}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 1 }}
                >
                  {project.startDate} - {project.endDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Certificates section */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Certificates
        </Typography>
        <Grid container spacing={2}>
          {userData.certificate.map((cert, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Box sx={{ mt: 0.5 }}>
                  <CheckCircleIcon color="primary" />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {cert.certName}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {cert.organization}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{ display: "block", mb: 0.5 }}
                  >
                    {cert.issueDate}
                  </Typography>
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
  );
};
