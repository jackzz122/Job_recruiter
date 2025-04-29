import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Stack from "@mui/material/Stack";
import {
  projectType,
  workExType,
  certificateType,
  educationType,
  UserType,
} from "../../../../../types/UserType";
import { useTheme } from "@mui/material";
export const CVSectionContent = ({
  type,
  data,
}: {
  type: string;
  data:
    | string
    | workExType[]
    | projectType[]
    | certificateType[]
    | educationType[]
    | undefined
    | UserType;
}) => {
  const theme = useTheme();
  switch (type) {
    case "aboutMe":
      return (
        <Box
          sx={{
            mb: 3,
            position: "relative",
            zIndex: 10,
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "grey.500",
              "&:hover": { color: "grey.700" },
            }}
          >
            <DragIndicatorIcon />
          </IconButton>
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
            {data as string}
          </Typography>
        </Box>
      );
    case "workEx":
      return (
        <Box sx={{ mb: 3, position: "relative" }}>
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "grey.500",
              "&:hover": { color: "grey.700" },
            }}
          >
            <DragIndicatorIcon />
          </IconButton>
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
            {(data as workExType[])?.map((job, index) => (
              <Box
                key={index}
                sx={{
                  pl: 2,
                  ml: 1,
                  borderLeft: `2px solid ${theme.palette.divider}`,
                  position: "relative",
                  "&:hover": { bgcolor: "grey.50" },
                }}
              >
                <Typography
                  sx={{
                    "& [contentEditable]": {
                      outline: "none",
                      minWidth: "20px",
                      display: "inline-block",
                    },
                  }}
                  variant="subtitle1"
                  fontWeight="bold"
                >
                  <span
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      const newValue = e.target.textContent;
                      console.log(newValue);
                    }}
                    dangerouslySetInnerHTML={{ __html: job.jobTitle }}
                  />
                  {/* {job.jobTitle} */}
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
              </Box>
            ))}
          </Stack>
        </Box>
      );
    case "education":
      return (
        <Box sx={{ mb: 3, position: "relative" }}>
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "grey.500",
              "&:hover": { color: "grey.700" },
            }}
          >
            <DragIndicatorIcon />
          </IconButton>
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
            {(data as educationType[])?.map((edu, index) => (
              <Box
                key={index}
                sx={{
                  pl: 2,
                  ml: 1,
                  borderLeft: `2px solid ${theme.palette.divider}`,
                  position: "relative",
                  "&:hover": { bgcolor: "grey.50" },
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
      );
    case "projects":
      return (
        <Box sx={{ mb: 3, position: "relative" }}>
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "grey.500",
              "&:hover": { color: "grey.700" },
            }}
          >
            <DragIndicatorIcon />
          </IconButton>
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
            {(data as projectType[])?.map((project, index) => (
              <Box
                key={index}
                sx={{
                  pl: 2,
                  ml: 1,
                  borderLeft: `2px solid ${theme.palette.divider}`,
                  "&:hover": { bgcolor: "grey.50" },
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
      );
    case "certificate":
      return (
        <Box sx={{ mb: 3, position: "relative" }}>
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "grey.500",
              "&:hover": { color: "grey.700" },
            }}
          >
            <DragIndicatorIcon />
          </IconButton>
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
            {(data as certificateType[])?.map((cert, index) => (
              <Box
                key={index}
                sx={{
                  pl: 2,
                  ml: 1,
                  borderLeft: `2px solid ${theme.palette.divider}`,
                  position: "relative",
                  "&:hover": { bgcolor: "grey.50" },
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
      );
    default:
      return <div>Unknown section type</div>;
  }
};
