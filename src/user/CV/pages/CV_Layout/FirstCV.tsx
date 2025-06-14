import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid2 from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/feature/user/userSlice";
import { useOutletContext } from "react-router-dom";
import { RefObject } from "react";

export const FirstCV = () => {
  const { cvRef } = useOutletContext<{ cvRef: RefObject<HTMLDivElement> }>();
  const theme = useTheme();
  const user = useSelector(selectUser);
  return (
    <Container
      ref={cvRef}
      maxWidth="lg"
      sx={{ bgcolor: "background.paper", p: 4, height: "100%" }}
    >
      <Grid2 container spacing={3}>
        {/* Left column - Personal info */}
        <Grid2 size={{ xs: 12, md: 4 }}>
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
                src={user?.avatarIMG || "/avatar.png"}
                alt={user?.fullname}
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
                {user?.fullname.toUpperCase()}
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
                  <Typography variant="body2">{user?.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon fontSize="small" color="action" />
                  <Typography variant="body2">{user?.phone}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2">{user?.address}</Typography>
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
                {user?.skills?.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill.value}
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
        </Grid2>

        {/* Right column - Professional details */}
        <Grid2 size={{ xs: 12, md: 8 }}>
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
              {user?.aboutMe}
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
              {user?.workEx?.map((job, index) => (
                <Box
                  key={index}
                  sx={{
                    pl: 2,
                    ml: 1,
                    borderLeft: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {job.jobTitle}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {job.company}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 0.5 }}
                  >
                    {job.startDate} - {job.endDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.responsibilites}
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
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
              {user?.education?.map((edu, index) => (
                <Box
                  key={index}
                  sx={{
                    pl: 2,
                    ml: 1,
                    borderLeft: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {edu.school}
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
                  <Typography variant="subtitle2" color="text.secondary">
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
              {user?.projects?.map((project, index) => (
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
              {user?.certificate?.map((cert, index) => (
                <Box
                  key={index}
                  sx={{
                    pl: 2,
                    ml: 1,
                    borderLeft: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {cert.name}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {cert.organization}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 0.5 }}
                  >
                    Month: {cert.month}, {cert.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cert.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};
