import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/feature/user/userSlice";
import { useOutletContext } from "react-router-dom";
import { RefObject } from "react";

export const SecondCV = () => {
  const { cvRef } = useOutletContext<{ cvRef: RefObject<HTMLDivElement> }>();
  const theme = useTheme();
  const primaryColor = theme.palette.primary;

  const user = useSelector(selectUser);
  return (
    <Container
      ref={cvRef}
      maxWidth="lg"
      sx={{
        bgcolor: "background.paper",
        p: 4,
        height: "100%",
        fontFamily: "Arial, sans-serif",
        color: "text.primary",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          mb: 4,
          gap: 3,
        }}
      >
        {/* Avatar */}
        <Box sx={{ width: 120 }}>
          <Avatar
            src={user?.avatarIMG}
            alt={user?.fullname}
            sx={{
              width: 120,
              height: 140,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
            }}
          />
        </Box>

        {/* Personal Info */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={primaryColor.main}
            mb={0.5}
          >
            {user?.fullname.toUpperCase()}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            {user?.title || "........."}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              rowGap: 1,
            }}
          >
            <Typography variant="body2" fontWeight="medium">
              Date of Birth
            </Typography>
            <Typography variant="body2">{user?.dob || "........."}</Typography>

            <Typography variant="body2" fontWeight="medium">
              Gender
            </Typography>
            <Typography variant="body2">
              {user?.gender || "........."}
            </Typography>

            <Typography variant="body2" fontWeight="medium">
              Phone Number
            </Typography>
            <Typography variant="body2">
              {user?.phone || "........."}
            </Typography>

            <Typography variant="body2" fontWeight="medium">
              Email:
            </Typography>
            <Typography variant="body2">
              {user?.email || "........."}
            </Typography>

            <Typography variant="body2" fontWeight="medium">
              Website:
            </Typography>
            <Typography variant="body2" color={primaryColor.main}>
              {user?.linkingProfile || "........."}
            </Typography>

            <Typography variant="body2" fontWeight="medium">
              Address
            </Typography>
            <Typography variant="body2">
              {user?.address || "........."}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Section: Career Objective */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            borderBottom: "2px solid #000",
            mb: 2,
            pb: 0.5,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textTransform: "uppercase" }}
          >
            About Me
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
          {user?.aboutMe || "........."}
        </Typography>
      </Box>

      {/* Section: Education */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            borderBottom: "2px solid #000",
            mb: 2,
            pb: 0.5,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textTransform: "uppercase" }}
          >
            Education
          </Typography>
        </Box>

        {user?.education?.map((edu, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Box sx={{ width: "30%" }}>
                <Typography variant="body2" fontWeight="medium">
                  {edu.startDate || "........."} - {edu.endDate || "........."}
                </Typography>
              </Box>
              <Box sx={{ width: "70%" }}>
                <Typography variant="body1" fontWeight="bold">
                  {edu.school || "........."}
                </Typography>
                <Typography
                  variant="body2"
                  color={primaryColor.main}
                  sx={{ mb: 1, fontWeight: "medium" }}
                >
                  {edu.major || "........."}
                </Typography>
                <Typography variant="body2">
                  {edu.description || "........."}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Section: Work Experience */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            borderBottom: "2px solid #000",
            mb: 2,
            pb: 0.5,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textTransform: "uppercase" }}
          >
            Work Experience
          </Typography>
        </Box>

        {user?.workEx?.map((job, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Box sx={{ width: "30%" }}>
                <Typography variant="body2" fontWeight="medium">
                  {job.startDate || "........."} - {job.endDate || "........."}
                </Typography>
              </Box>
              <Box sx={{ width: "70%" }}>
                <Typography variant="body1" fontWeight="bold">
                  Company: {job.company || "........."}
                </Typography>
                <Typography
                  variant="body2"
                  color={primaryColor.main}
                  sx={{ mb: 1, fontWeight: "medium" }}
                >
                  {job.jobTitle || "........."}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {job.responsibilites || "........."}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {job.description || "........."}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Section: Skills */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            borderBottom: "2px solid #000",
            mb: 2,
            pb: 0.5,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textTransform: "uppercase" }}
          >
            Skills
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {user?.skills?.map((skill, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                border: `1px solid ${primaryColor.main}`,
                borderRadius: 0,
                px: 2,
                py: 0.5,
                color: primaryColor.main,
                fontWeight: 500,
              }}
            >
              {skill.value || "........."}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Section: Certificates */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            borderBottom: "2px solid #000",
            mb: 2,
            pb: 0.5,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textTransform: "uppercase" }}
          >
            Certificates
          </Typography>
        </Box>

        {user?.certificate?.map((cert, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ width: "30%" }}>
                <Typography variant="body2" fontWeight="medium">
                  {cert.month || "........."} {cert.year || "........."}
                </Typography>
              </Box>
              <Box sx={{ width: "70%" }}>
                <Typography variant="body1" fontWeight="bold">
                  {cert.name || "........."}
                </Typography>
                <Typography
                  variant="body2"
                  color={primaryColor.main}
                  sx={{ mb: 1 }}
                >
                  {cert.organization || "........."}
                </Typography>
                <Typography variant="body2">
                  {cert.description || "........."}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ mb: 3, position: "relative" }}>
        <Box
          sx={{
            borderBottom: "2px solid #000",
            mb: 2,
            pb: 0.5,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textTransform: "uppercase" }}
          >
            Projects
          </Typography>
        </Box>
        {user?.projects?.map((project, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Box sx={{ width: "30%" }}>
                <Typography variant="body2" fontWeight="medium">
                  {project.startDate} - {project.endDate}
                </Typography>
              </Box>
              <Box sx={{ width: "70%" }}>
                <Typography variant="body1" fontWeight="bold">
                  {project.projectName || "........."}
                </Typography>
                <Typography
                  variant="body2"
                  color={primaryColor.main}
                  sx={{ mb: 1 }}
                >
                  {project.role || "........."}
                </Typography>
                <Typography variant="body2">
                  {project.description || "........."}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};
