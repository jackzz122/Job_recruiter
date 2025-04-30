import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTheme, alpha } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/feature/user/userSlice";

export const ThirdCVEdited = () => {
  const theme = useTheme();
  const user = useSelector(selectUser);

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
      <Box
        sx={{
          bgcolor: "purple.700",
          color: "black",
          p: 4,
          position: "relative",
        }}
      >
        {/* Drag Handle for Header */}
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "white",
            "&:hover": { color: alpha("#ffffff", 0.8) },
            cursor: "grab",
            zIndex: 10,
          }}
        >
          <DragIndicatorIcon />
        </IconButton>

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
              src={user?.avatarIMG}
              alt={user?.fullname}
              sx={{
                width: 128,
                height: 128,
                border: "4px solid white",
              }}
            />

            <Box>
              <Typography variant="h3" fontWeight={800} mb={1}>
                {user?.fullname}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: alpha(theme.palette.common.black, 0.8),
                  maxWidth: "36rem",
                }}
              >
                {user?.aboutMe}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Contact bar */}
      <Box
        sx={{
          bgcolor: "#4a148c",
          color: "white",
          py: 1.5,
          position: "relative",
        }}
      >
        {/* Drag Handle for Contact */}
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            color: "white",
            "&:hover": { color: alpha("#ffffff", 0.8) },
            cursor: "grab",
            zIndex: 10,
          }}
        >
          <DragIndicatorIcon />
        </IconButton>

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
              <Typography variant="body2">{user?.email}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon
                sx={{ color: alpha(theme.palette.common.white, 0.7) }}
              />
              <Typography variant="body2">{user?.phone}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon
                sx={{ color: alpha(theme.palette.common.white, 0.7) }}
              />
              <Typography variant="body2">{user?.address}</Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Main content */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Skills section */}
        <Box sx={{ mb: 5, position: "relative" }}>
          {/* Drag Handle for Skills */}
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "grey.500",
              "&:hover": { color: "grey.700" },
              cursor: "grab",
            }}
          >
            <DragIndicatorIcon />
          </IconButton>

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
            {user?.skills?.map((skill, index) => (
              <Chip
                key={index}
                label={skill.value}
                sx={{
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
        <Grid2 container spacing={4} sx={{ mb: 5 }}>
          {/* Experience */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative" }}>
              {/* Drag Handle for Experience */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "grey.500",
                  "&:hover": { color: "grey.700" },
                  cursor: "grab",
                }}
              >
                <DragIndicatorIcon />
              </IconButton>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{ width: 8, height: 32, bgcolor: "error.main", mr: 2 }}
                />
                <Typography variant="h5" fontWeight="bold" color="error.main">
                  Work Experience
                </Typography>
              </Box>

              <Stack spacing={3} sx={{ ml: 3 }}>
                {user?.workEx?.map((job, index) => (
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
                      {job.jobTitle}
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
                        {job.company}
                        <Box component="span" sx={{ mx: 1 }}>
                          •
                        </Box>
                        <Box component="span" sx={{ fontSize: "0.875rem" }}>
                          {job.startDate} - {job.endDate}
                        </Box>
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {job.responsibilites}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid2>

          {/* Education */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative" }}>
              {/* Drag Handle for Education */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "grey.500",
                  "&:hover": { color: "grey.700" },
                  cursor: "grab",
                }}
              >
                <DragIndicatorIcon />
              </IconButton>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{ width: 8, height: 32, bgcolor: "info.main", mr: 2 }}
                />
                <Typography variant="h5" fontWeight="bold" color="info.main">
                  Education
                </Typography>
              </Box>

              <Stack spacing={3} sx={{ ml: 3 }}>
                {user?.education?.map((edu, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      borderLeft: `2px solid ${alpha(
                        theme.palette.info.main,
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
                        bgcolor: "info.main",
                      }}
                    />
                    <Typography variant="h6" fontWeight="bold">
                      {edu.school}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "info.main",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="info.main"
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
            </Box>
          </Grid2>
        </Grid2>

        {/* Projects and Certificates */}
        <Grid2 container spacing={4}>
          {/* Projects */}
          <Grid2 size={{ xs: 12, md: 7 }}>
            <Box sx={{ position: "relative" }}>
              {/* Drag Handle for Projects */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "grey.500",
                  "&:hover": { color: "grey.700" },
                  cursor: "grab",
                }}
              >
                <DragIndicatorIcon />
              </IconButton>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{ width: 8, height: 32, bgcolor: "success.main", mr: 2 }}
                />
                <Typography variant="h5" fontWeight="bold" color="success.main">
                  Projects
                </Typography>
              </Box>

              <Stack spacing={3} sx={{ ml: 3 }}>
                {user?.projects?.map((project, index) => (
                  <Paper
                    key={index}
                    elevation={2}
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      borderTop: `4px solid ${theme.palette.success.main}`,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {project.projectName}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="success.main"
                      sx={{ mb: 1 }}
                    >
                      {project.role} | {project.startDate} - {project.endDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Grid2>

          {/* Certificates */}
          <Grid2 size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: "relative" }}>
              {/* Drag Handle for Certificates */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "grey.500",
                  "&:hover": { color: "grey.700" },
                  cursor: "grab",
                }}
              >
                <DragIndicatorIcon />
              </IconButton>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{ width: 8, height: 32, bgcolor: "warning.main", mr: 2 }}
                />
                <Typography variant="h5" fontWeight="bold" color="warning.main">
                  Certificates
                </Typography>
              </Box>

              <Stack spacing={3} sx={{ ml: 3 }}>
                {user?.certificate?.map((cert, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "flex-start",
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{ color: "warning.main", fontSize: 28 }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {cert.name}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {cert.organization} | {cert.month} {cert.year}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {cert.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};
