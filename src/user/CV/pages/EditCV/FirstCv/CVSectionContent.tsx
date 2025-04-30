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
} from "../../../../../types/UserType";
import { useTheme } from "@mui/material";
import { EditableText } from "../components/EditableText";
import { dataType, itemType } from "../components/SortableItem";

export type DragHandleProps = {
  onMouseDown?: (event: React.SyntheticEvent) => void;
  onTouchStart?: (event: React.SyntheticEvent) => void;
  role?: string;
  tabIndex?: number;
};

export const CVSectionContent = ({
  exportLoading,
  type,
  data,
  dragHandleProps,
}: {
  exportLoading: boolean;
  type: itemType;
  data: dataType;
  dragHandleProps?: DragHandleProps;
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
          {!exportLoading && (
            <IconButton
              {...dragHandleProps}
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
          )}
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
          <EditableText value={data as string} />
        </Box>
      );
    case "workEx":
      return (
        <Box sx={{ mb: 3, position: "relative" }}>
          {!exportLoading && (
            <IconButton
              {...dragHandleProps}
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
          )}
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
                <EditableText
                  value={job.jobTitle}
                  variant="subtitle1"
                  fontWeight="bold"
                />
                <EditableText value={job.company} variant="subtitle2" />

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  {job.startDate} - {job.endDate}
                </Typography>
                <EditableText variant="body2" value={job.responsibilites} />
              </Box>
            ))}
          </Stack>
        </Box>
      );
    case "education":
      return (
        <Box sx={{ mb: 3, position: "relative" }}>
          {!exportLoading && (
            <IconButton
              {...dragHandleProps}
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
          )}
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
          {!exportLoading && (
            <IconButton
              {...dragHandleProps}
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
          )}
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
                <EditableText
                  variant="subtitle1"
                  fontWeight="bold"
                  value={project.projectName}
                />
                <EditableText value={project.role} variant="subtitle2" />

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  {project.startDate} - {project.endDate}
                </Typography>
                <EditableText variant="body2" value={project.description} />
              </Box>
            ))}
          </Stack>
        </Box>
      );
    case "certificate":
      return (
        <Box sx={{ mb: 3, position: "relative" }}>
          {!exportLoading && (
            <IconButton
              {...dragHandleProps}
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
          )}
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
                <EditableText
                  variant="subtitle1"
                  fontWeight="bold"
                  value={cert.name}
                />
                <EditableText variant="subtitle2" value={cert.organization} />

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  Month: {cert.month}, {cert.year}
                </Typography>
                <EditableText variant="body2" value={cert.description} />
              </Box>
            ))}
          </Stack>
        </Box>
      );
    default:
      return <div>Unknown section type</div>;
  }
};
