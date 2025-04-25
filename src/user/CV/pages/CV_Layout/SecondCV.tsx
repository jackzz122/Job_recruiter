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
        <Typography variant="h5" fontWeight="bold" color="primary" mb={1.5}>
          Skills
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {user?.skills?.map((skill, index) => (
            <Chip
              key={index}
              label={skill.value}
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
          {user?.workEx?.map((job, index) => (
            <Box key={index} sx={{ position: "relative", pl: 4 }}>
              {/* Timeline dot */}
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 10,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                }}
              />
              {/* Timeline line */}
              {index < (user?.workEx?.length || 0) - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 7,
                    top: 26,
                    width: 2,
                    height: "calc(100% + 24px)",
                    bgcolor: "primary.light",
                    opacity: 0.4,
                  }}
                />
              )}
              <Typography variant="h6" fontWeight="bold">
                {job.jobTitle}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={0.5}>
                {job.company}
              </Typography>
              <Typography
                variant="caption"
                color="primary"
                sx={{ display: "block", mb: 1 }}
              >
                {job.startDate} - {job.endDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.responsibilites}
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
          {user?.education?.map((edu, index) => (
            <Box key={index} sx={{ position: "relative", pl: 4 }}>
              {/* Timeline dot */}
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 10,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                }}
              />
              {/* Timeline line */}
              {index < (user?.education?.length || 0) - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: 26,
                    width: 2,
                    height: "calc(100% + 24px)",
                    bgcolor: "primary.light",
                    opacity: 0.4,
                  }}
                />
              )}
              <Typography variant="h6" fontWeight="bold">
                {edu.school}
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
        <Grid2 container spacing={2}>
          {user?.projects?.map((project, index) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={index}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  height: "100%",
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={0.5}>
                  {project.projectName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  <Box component="span" sx={{ fontWeight: "medium" }}>
                    {project.role}
                  </Box>{" "}
                  • {project.startDate} - {project.endDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Certificates section */}
      <Box>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Certificates
        </Typography>
        <Stack spacing={2}>
          {user?.certificate?.map((cert, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
            >
              <CheckCircleIcon color="primary" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {cert.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={0.5}>
                  {cert.organization} • {cert.month} {cert.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cert.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};
