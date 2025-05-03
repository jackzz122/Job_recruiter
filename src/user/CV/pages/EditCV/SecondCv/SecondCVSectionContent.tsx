import { dataType, itemType } from "../components/SortableItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Typography from "@mui/material/Typography";
import {
  certificateType,
  educationType,
  projectType,
  skillType,
  workExType,
} from "../../../../../types/UserType";
import { useTheme } from "@mui/material";
import { DragHandleProps } from "../FirstCv/CVSectionContent";
import { EditableText } from "../components/EditableText";

// Update itemType in SortableItem.ts if needed
type ExtendedItemType = itemType | "objective";

export const SecondCVSectionContent = ({
  exportLoading,
  type,
  data,
  dragHandleProps,
  selectedColor,
}: {
  exportLoading: boolean;
  type: ExtendedItemType;
  data: dataType;
  dragHandleProps?: DragHandleProps;
  selectedColor: { name: string; primary: string };
}) => {
  const theme = useTheme();
  const primaryColor = selectedColor?.primary || theme.palette.primary.main;

  switch (type) {
    case "aboutMe":
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
                cursor: "grab",
              }}
            >
              <DragIndicatorIcon />
            </IconButton>
          )}

          <Box
            sx={{
              borderBottom: `2px solid ${selectedColor.primary}`,
              mb: 2,
              pb: 0.5,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ textTransform: "uppercase", color: selectedColor.primary }}
            >
              Mục tiêu nghề nghiệp
            </Typography>
          </Box>

          <EditableText
            title="About Me"
            value={(data as string) || ""}
            variant="body2"
            sx={{ lineHeight: 1.6 }}
          />
        </Box>
      );

    case "skill":
      return (
        <Box sx={{ mb: 3, position: "relative" }}>
          <IconButton
            {...dragHandleProps}
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

          <Box
            sx={{
              borderBottom: `2px solid ${selectedColor.primary}`,
              mb: 2,
              pb: 0.5,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ textTransform: "uppercase", color: selectedColor.primary }}
            >
              Các kỹ năng
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {(data as skillType[])?.map((skill, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  border: `1px solid ${primaryColor}`,
                  borderRadius: 0,
                  px: 2,
                  py: 0.5,
                  color: primaryColor,
                  fontWeight: 500,
                }}
              >
                {skill.value}
              </Typography>
            ))}
          </Box>
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
                cursor: "grab",
              }}
            >
              <DragIndicatorIcon />
            </IconButton>
          )}

          <Box
            sx={{
              borderBottom: `2px solid ${selectedColor.primary}`,
              mb: 2,
              pb: 0.5,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ textTransform: "uppercase", color: selectedColor.primary }}
            >
              Kinh nghiệm làm việc
            </Typography>
          </Box>

          {(data as workExType[])?.map((job, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Box sx={{ width: "30%" }}>
                  <Typography variant="body2" fontWeight="medium">
                    {job.startDate} - {job.endDate}
                  </Typography>
                </Box>
                <Box sx={{ width: "70%" }}>
                  <EditableText
                    variant="body1"
                    fontWeight="bold"
                    value={`Công ty ${job.company}`}
                  />
                  <EditableText
                    variant="body2"
                    sx={{ mb: 1, fontWeight: "medium", color: primaryColor }}
                    value={job.jobTitle}
                  />

                  <EditableText
                    title={`Job responsibilites about ${job.jobTitle} in ${job.company}`}
                    value={job.responsibilites}
                    variant="body2"
                    sx={{ whiteSpace: "pre-line" }}
                  />
                  <EditableText
                    title={`Job description about ${job.jobTitle} in ${job.company}`}
                    variant="body2"
                    sx={{ marginTop: 1 }}
                    value={job.description}
                  />
                </Box>
              </Box>
            </Box>
          ))}
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
                cursor: "grab",
              }}
            >
              <DragIndicatorIcon />
            </IconButton>
          )}

          <Box
            sx={{
              borderBottom: `2px solid ${selectedColor.primary}`,
              mb: 2,
              pb: 0.5,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ textTransform: "uppercase", color: selectedColor.primary }}
            >
              Học vấn
            </Typography>
          </Box>

          {(data as educationType[])?.map((edu, index) => (
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
                    {edu.startDate} - {edu.endDate}
                  </Typography>
                </Box>
                <Box sx={{ width: "70%" }}>
                  <EditableText
                    value={edu.school}
                    variant="body1"
                    fontWeight="bold"
                  />
                  <EditableText
                    value={edu.major}
                    variant="body2"
                    sx={{ mb: 1, fontWeight: "medium", color: primaryColor }}
                  />
                  <EditableText
                    title={`education description in school ${edu.school} with major ${edu.major}`}
                    value={edu.description}
                    variant="body2"
                  />
                </Box>
              </Box>
            </Box>
          ))}
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
                cursor: "grab",
              }}
            >
              <DragIndicatorIcon />
            </IconButton>
          )}

          <Box
            sx={{
              borderBottom: `2px solid ${selectedColor.primary}`,
              mb: 2,
              pb: 0.5,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ textTransform: "uppercase", color: selectedColor.primary }}
            >
              Các dự án
            </Typography>
          </Box>

          {(data as projectType[])?.map((project, index) => (
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
                  <EditableText
                    value={project.projectName}
                    variant="body1"
                    fontWeight="bold"
                  />
                  <EditableText
                    value={project.role}
                    variant="body2"
                    sx={{ mb: 1, fontWeight: "medium", color: primaryColor }}
                  />
                  <EditableText
                    title={`Project description about ${project.projectName}`}
                    value={project.description}
                    variant="body2"
                  />
                </Box>
              </Box>
            </Box>
          ))}
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
                cursor: "grab",
              }}
            >
              <DragIndicatorIcon />
            </IconButton>
          )}

          <Box
            sx={{
              borderBottom: `2px solid ${selectedColor.primary}`,
              mb: 2,
              pb: 0.5,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ textTransform: "uppercase", color: selectedColor.primary }}
            >
              Chứng chỉ
            </Typography>
          </Box>

          {(data as certificateType[])?.map((cert, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ width: "30%" }}>
                  <Typography variant="body2" fontWeight="medium">
                    {cert.month} {cert.year}
                  </Typography>
                </Box>
                <Box sx={{ width: "70%" }}>
                  <EditableText
                    value={cert.name}
                    variant="body1"
                    fontWeight="bold"
                  />
                  <EditableText
                    value={cert.organization}
                    variant="body2"
                    sx={{ mb: 1, color: primaryColor }}
                  />
                  <EditableText
                    title={`Certificate description about ${cert.name} in ${cert.organization}`}
                    value={cert.description}
                    variant="body2"
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      );

    default:
      return <div>Unknown section type</div>;
  }
};
