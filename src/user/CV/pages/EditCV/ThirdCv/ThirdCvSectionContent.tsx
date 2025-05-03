import { dataType, itemType } from "../components/SortableItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { EditableText } from "../components/EditableText";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  certificateType,
  educationType,
  projectType,
  skillType,
  workExType,
} from "../../../../../types/UserType";
import { IconButton } from "@mui/material";
import { DragHandleProps } from "../FirstCv/CVSectionContent";
export const ThirdCvSectionContent = ({
  exportLoading,
  dragHandleProps,
  selectedColor,
  type,
  data,
}: {
  exportLoading: boolean;
  dragHandleProps: DragHandleProps;
  selectedColor: { name: string; primary: string };
  type: itemType;
  data: dataType;
}) => {
  switch (type) {
    case "skill":
      return (
        <>
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1,
                borderBottom: `1px solid ${selectedColor.primary}`,
                position: "relative",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color={selectedColor.primary}
                sx={{ textTransform: "uppercase", pb: 0.5 }}
              >
                Skills
              </Typography>
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
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.75,
                alignItems: "center",
                mt: 3,
              }}
            >
              {(data as skillType[])?.map((skill, index) => (
                <Typography
                  key={index}
                  sx={{
                    px: 2,
                    py: 0.75,
                    minWidth: 80,
                    textAlign: "center",
                    bgcolor: "#fff",
                    color: selectedColor.primary,
                    border: `1px solid ${selectedColor.primary}`,
                    borderRadius: 1,
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 32,
                  }}
                >
                  {skill.value}
                </Typography>
              ))}
            </Box>
          </Box>
        </>
      );
    case "workEx":
      return (
        <>
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                borderBottom: `1px solid ${selectedColor.primary}`,
                position: "relative",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color={selectedColor.primary}
                sx={{ textTransform: "uppercase", pb: 0.5 }}
              >
                Work Experience
              </Typography>
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
            </Box>

            {(data as workExType[])?.map((job, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <Box sx={{ width: "30%" }}>
                    <EditableText
                      variant="subtitle2"
                      fontWeight="bold"
                      value={`Công ty ${job.company}`}
                    />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      {job.startDate} - {job.endDate}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <EditableText
                      variant="subtitle1"
                      fontWeight="bold"
                      value={job.jobTitle}
                      sx={{ color: selectedColor.primary }}
                    />

                    <EditableText
                      title={`Job responsibilites about ${job.jobTitle} in ${job.company}`}
                      value={job.responsibilites}
                      sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}
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
        </>
      );
    case "education":
      return (
        <>
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                borderBottom: `1px solid ${selectedColor.primary}`,
                position: "relative",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color={selectedColor.primary}
                sx={{ textTransform: "uppercase", pb: 0.5 }}
              >
                Education
              </Typography>
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
            </Box>

            {(data as educationType[])?.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <Box sx={{ width: "30%" }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {edu.startDate} - {edu.endDate}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <EditableText
                      value={edu.major}
                      variant="subtitle1"
                      fontWeight="bold"
                    />

                    <EditableText
                      value={edu.school}
                      variant="body2"
                      sx={{ mb: 0.5 }}
                    />

                    <EditableText
                      title={`Education in ${edu.school} major ${edu.major} description`}
                      value={edu.description}
                      sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      );
    case "projects":
      return (
        <>
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                borderBottom: `1px solid ${selectedColor.primary}`,
                position: "relative",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color={selectedColor.primary}
                sx={{ textTransform: "uppercase", pb: 0.5 }}
              >
                Projects
              </Typography>
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
            </Box>
            {(data as projectType[])?.map((project, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  <Box sx={{ width: "30%" }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {project.startDate} - {project.endDate}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <EditableText
                      value={project.projectName}
                      variant="subtitle1"
                      fontWeight="bold"
                      color="text.primary"
                    />
                    <EditableText
                      value={project.role}
                      variant="body2"
                      sx={{ mb: 0.5 }}
                    />

                    <EditableText
                      title={`Project description about ${project.projectName}`}
                      value={project.description}
                      sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      );
    case "certificate":
      return (
        <>
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                borderBottom: `1px solid ${selectedColor.primary}`,
                position: "relative",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color={selectedColor.primary}
                sx={{ textTransform: "uppercase", pb: 0.5 }}
              >
                Certificates
              </Typography>
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
            </Box>

            {(data as certificateType[])?.map((cert, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <Box sx={{ width: "30%" }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {cert.month} {cert.year}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <EditableText
                      value={cert.name}
                      variant="subtitle1"
                      fontWeight="bold"
                      color="text.primary"
                    />
                    <EditableText
                      value={cert.organization}
                      variant="body2"
                      sx={{ mb: 0.5 }}
                    />

                    <EditableText
                      title={`Certificate description about ${cert.name} in ${cert.organization}`}
                      value={cert.description}
                      sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      );
    default:
      return <div>Unknown section type</div>;
  }
};
