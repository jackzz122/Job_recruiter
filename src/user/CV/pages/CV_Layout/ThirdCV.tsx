import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/feature/user/userSlice";
import { useOutletContext } from "react-router-dom";
import { RefObject } from "react";

export const ThirdCV = () => {
  const user = useSelector(selectUser);
  const { cvRef } = useOutletContext<{ cvRef: RefObject<HTMLDivElement> }>();
  return (
    <Container
      ref={cvRef}
      maxWidth="lg"
      sx={{
        bgcolor: "background.paper",
        p: 4,
        height: "100%",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header/Personal Info */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            {user?.fullname}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
            sx={{ fontStyle: "italic" }}
          >
            {user?.title || "........."}
          </Typography>
        </Box>

        <Box sx={{ ml: 2, display: "flex", flexDirection: "column", gap: 0.8 }}>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.4,
              display: "block",
              textAlign: "right",
            }}
          >
            {user?.phone || "........."}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.4,
              display: "block",
              textAlign: "right",
            }}
          >
            {user?.email || "........."}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.4,
              display: "block",
              textAlign: "right",
            }}
          >
            {user?.address || "........."}
          </Typography>
        </Box>
      </Box>

      {/* Objective Section */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            borderBottom: `1px solid`,
            borderBottomColor: "primary.main",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ textTransform: "uppercase", pb: 0.5 }}
          >
            Mục tiêu nghề nghiệp
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
          {user?.aboutMe || "........."}
        </Typography>
      </Box>

      {/* Work Experience Section */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            borderBottom: `1px solid`,
            borderBottomColor: "primary.main",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ textTransform: "uppercase", pb: 0.5 }}
          >
            Kinh nghiệm làm việc
          </Typography>
        </Box>

        {user?.workEx?.map((job, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <Box sx={{ width: "30%" }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Công ty {job.company || "........."}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.8rem" }}
                >
                  {job.startDate || "........."} - {job.endDate || "........."}
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary"
                >
                  {job.jobTitle || "........."}
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
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

      {/* Education Section */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            borderBottom: `1px solid`,
            borderBottomColor: "primary.main",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ textTransform: "uppercase", pb: 0.5 }}
          >
            Học vấn
          </Typography>
        </Box>

        {user?.education?.map((edu, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <Box sx={{ width: "30%" }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {edu.startDate || "........."} - {edu.endDate || "........."}
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="text.primary"
                >
                  {edu.major || "........."}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {edu.school || "........."}
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
                  {edu.description || "........."}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Certificate Section */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            borderBottom: `1px solid`,
            borderBottomColor: "primary.main",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ textTransform: "uppercase", pb: 0.5 }}
          >
            Chứng chỉ
          </Typography>
        </Box>

        {user?.certificate?.map((cert, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <Box sx={{ width: "30%" }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {cert.month || "........."} {cert.year || "........."}
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="text.primary"
                >
                  {cert.name || "........."}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {cert.organization || "........."}
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
                  {cert.description || "........."}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Skills Section */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            borderBottom: `1px solid`,
            borderBottomColor: "primary.main",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ textTransform: "uppercase", pb: 0.5 }}
          >
            Các kỹ năng
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.75,
            alignItems: "center",
            mt: 1,
          }}
        >
          {user?.skills?.map((skill, index) => (
            <Typography
              key={index}
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: "#fff",
                color: "primary.main",
                border: `1px solid`,
                borderColor: "primary.main",
                borderRadius: 1,
                fontSize: "0.85rem",
                fontWeight: 500,
                display: "inline-block",
                margin: "4px",
              }}
            >
              {skill.value || "........."}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  );
};
