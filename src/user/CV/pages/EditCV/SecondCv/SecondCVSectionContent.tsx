import { dataType, itemType } from "../components/SortableItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid2 from "@mui/material/Grid2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Paper from "@mui/material/Paper";
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
export const SecondCVSectionContent = ({
  type,
  data,
  dragHandleProps,
}: {
  type: itemType;
  data: dataType;
  dragHandleProps?: DragHandleProps;
}) => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary;
  switch (type) {
    case "skill":
      return (
        <Box sx={{ mb: 4, position: "relative" }}>
          {/* Drag Handle for Skills */}
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
              {(data as skillType[])?.map((skill, index) => (
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
      );
    case "workEx":
      return (
        <>
          <Box sx={{ mb: 4, position: "relative" }}>
            {/* Drag Handle for Experience */}
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
            <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
              Work Experience
            </Typography>

            {(data as workExType[])?.map((job, index) => (
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
                {/* Company & date badge */}
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
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    <EditableText
                      variant="h6"
                      fontWeight="bold"
                      value={job.jobTitle}
                      sx={{ lineHeight: 1.2 }}
                    />
                  </Box>

                  <EditableText
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      mb: 0.75,
                      color: primaryColor.main,
                      fontSize: "0.95rem",
                    }}
                    value={job.company}
                  />

                  <EditableText
                    variant="body2"
                    value={job.responsibilites}
                    sx={{
                      fontSize: "0.9rem",
                      color: "text.secondary",
                    }}
                  />
                </Box>
              </Paper>
            ))}
          </Box>
        </>
      );
    case "education":
      return (
        <>
          <Box sx={{ mb: 4, position: "relative" }}>
            {/* Drag Handle for Education */}
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

            <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
              Education
            </Typography>

            {(data as educationType[])?.map((edu, index) => (
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
                  <EditableText
                    variant="h6"
                    fontWeight="bold"
                    value={edu.school}
                    sx={{ lineHeight: 1.2 }}
                  />

                  <EditableText
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      mb: 0.75,
                      color: primaryColor.main,
                      fontSize: "0.95rem",
                    }}
                    value={edu.major}
                  />

                  <EditableText
                    variant="body2"
                    value={edu.description}
                    sx={{
                      fontSize: "0.9rem",
                      color: "text.secondary",
                    }}
                  />
                </Box>
              </Paper>
            ))}
          </Box>
        </>
      );
    case "projects":
      return (
        <>
          <Box sx={{ mb: 4, position: "relative" }}>
            {/* Drag Handle for Projects */}
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

            <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
              Projects
            </Typography>
            <Grid2 container spacing={1.5}>
              {(data as projectType[])?.map((project, index) => (
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

                    <EditableText
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ fontSize: "0.95rem", mb: 0.5, pr: 5 }}
                      value={project.projectName}
                    />

                    <Box
                      sx={{
                        mb: 1,
                        color: primaryColor.main,
                        fontWeight: "medium",
                        fontSize: "0.85rem",
                      }}
                    >
                      <EditableText
                        variant="body2"
                        value={project.role}
                        sx={{ color: primaryColor.main, fontWeight: "bold" }}
                      />
                    </Box>

                    <EditableText
                      variant="body2"
                      color="text.secondary"
                      value={project.description}
                      sx={{ fontSize: "0.85rem" }}
                    />
                  </Paper>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </>
      );
    case "certificate":
      return (
        <>
          <Box sx={{ position: "relative", mb: 4 }}>
            {/* Drag Handle for Certificates */}
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

            <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
              Certificates
            </Typography>
            <Grid2 container spacing={1.5}>
              {(data as certificateType[])?.map((cert, index) => (
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                      >
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
        </>
      );
    default:
      return <div>Unknown section type</div>;
  }
};
