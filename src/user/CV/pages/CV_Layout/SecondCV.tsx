import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/feature/user/userSlice";

export const SecondCV = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary;

  const user = useSelector(selectUser);
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
            src={user?.avatarIMG}
            alt={user?.fullname}
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
            {user?.fullname}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            mb={2}
            sx={{ maxWidth: "36rem" }}
          >
            {user?.aboutMe}
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
              <Typography variant="body2">{user?.email}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PhoneIcon fontSize="small" color="primary" />
              <Typography variant="body2">{user?.phone}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOnIcon fontSize="small" color="primary" />
              <Typography variant="body2">{user?.address}</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Skills section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Skills
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            bgcolor: `${primaryColor.light}10`,
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {user?.skills?.map((skill, index) => (
              <Chip
                key={index}
                label={skill.value}
                size="small"
                sx={{
                  bgcolor: "#fff",
                  color: primaryColor.main,
                  border: `1px solid ${primaryColor.light}`,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  fontWeight: 500,
                  "&:hover": {
                    bgcolor: primaryColor.light,
                    color: "#fff",
                  },
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Experience section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Work Experience
        </Typography>
        {user?.workEx?.map((job, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              mb: 2,
              position: "relative",
              backgroundImage:
                index % 2 === 0
                  ? `linear-gradient(to right, ${primaryColor.light}15, transparent)`
                  : "none",
              borderLeft: `3px solid ${primaryColor.main}`,
              overflow: "hidden",
              p: 1.5,
              pl: 2,
            }}
          >
            {/* Date badge */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: primaryColor.main,
                color: "white",
                px: 1.5,
                py: 0.5,
                fontWeight: "bold",
                fontSize: "0.7rem",
                borderBottomLeftRadius: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {job.startDate} - {job.endDate}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", pr: 5 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ lineHeight: 1.2 }}
                >
                  {job.jobTitle}
                </Typography>
              </Box>

              <Typography
                variant="subtitle1"
                sx={{
                  mb: 0.75,
                  color: primaryColor.main,
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                }}
              >
                {job.company}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.9rem",
                }}
              >
                {job.responsibilites}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Education section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Education
        </Typography>
        {user?.education?.map((edu, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              mb: 2,
              position: "relative",
              backgroundImage:
                index % 2 === 0
                  ? `linear-gradient(to right, ${primaryColor.light}15, transparent)`
                  : "none",
              borderLeft: `3px solid ${primaryColor.main}`,
              overflow: "hidden",
              p: 1.5,
              pl: 2,
            }}
          >
            {/* Date badge */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: primaryColor.main,
                color: "white",
                px: 1.5,
                py: 0.5,
                fontWeight: "bold",
                fontSize: "0.7rem",
                borderBottomLeftRadius: "8px",
              }}
            >
              {edu.startDate} - {edu.endDate}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", pr: 5 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ lineHeight: 1.2 }}
              >
                {edu.school}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  mb: 0.75,
                  color: primaryColor.main,
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                }}
              >
                {edu.major}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.9rem",
                }}
              >
                {edu.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Projects section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Projects
        </Typography>
        <Grid2 container spacing={1.5}>
          {user?.projects?.map((project, index) => (
            <Grid2 key={index} size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={1}
                sx={{
                  position: "relative",
                  height: "100%",
                  p: 1.5,
                  pl: 2,
                  overflow: "hidden",
                  borderRadius: 1,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: theme.shadows[3],
                  },
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "4px",
                    background: `linear-gradient(to bottom, ${primaryColor.main}, ${primaryColor.light})`,
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: `${primaryColor.main}20`,
                    px: 1,
                    py: 0.25,
                    borderRadius: 0.5,
                    fontSize: "0.7rem",
                    color: primaryColor.dark,
                  }}
                >
                  {project.startDate} - {project.endDate}
                </Box>

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ fontSize: "0.95rem", mb: 0.5, pr: 5 }}
                >
                  {project.projectName}
                </Typography>

                <Box
                  sx={{
                    mb: 1,
                    color: primaryColor.main,
                    fontWeight: "medium",
                    fontSize: "0.85rem",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: primaryColor.main, fontWeight: "bold" }}
                  >
                    {project.role}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.85rem" }}
                >
                  {project.description}
                </Typography>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Certificates section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Certificates
        </Typography>
        <Grid2 container spacing={1.5}>
          {user?.certificate?.map((cert, index) => (
            <Grid2 key={index} size={{ xs: 12, sm: 6 }}>
              <Paper
                elevation={1}
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  p: 1.5,
                  borderRadius: 1,
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: theme.shadows[2],
                  },
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30%",
                    height: "4px",
                    backgroundColor: primaryColor.main,
                    borderBottomLeftRadius: 4,
                  },
                }}
              >
                <CheckCircleIcon
                  color="primary"
                  sx={{
                    fontSize: "1.4rem",
                    mt: 0.5,
                    mr: 1.5,
                    color: primaryColor.main,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ fontSize: "0.95rem" }}
                    >
                      {cert.name}
                    </Typography>
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mb: 0.75,
                      color: primaryColor.main,
                      fontWeight: "bold",
                    }}
                  >
                    {cert.organization} • {cert.month} {cert.year}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "0.85rem" }}
                  >
                    {cert.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Container>
  );
};
