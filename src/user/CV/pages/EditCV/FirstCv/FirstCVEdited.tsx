import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid2 from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Alert from "@mui/material/Alert";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/feature/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { SortableItem } from "../components/SortableItem";
import {
  certificateType,
  educationType,
  projectType,
  workExType,
} from "../../../../../types/UserType";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Button from "@mui/material/Button";
import { colorButtonOrange } from "../../../../../themeContext";
import { usePdfExport } from "../../../../../hooks/usePdfExport";
// Color options for the CV
const colorOptions = [
  { name: "Gray", primary: "#f2f2f2", secondary: "#ffffff" },
  { name: "Default", primary: "#1976d2", secondary: "#f5f5f5" },
  { name: "Dark", primary: "#1a237e", secondary: "#f5f5f5" },
  { name: "Light", primary: "#4caf50", secondary: "#ffffff" },
  { name: "Orange", primary: "#f97316", secondary: "#ffffff" },
];

type CVSection =
  | { id: "aboutMe"; type: "aboutMe"; data: { items: string | undefined } }
  | { id: "workEx"; type: "workEx"; data: { items: workExType[] | undefined } }
  | {
      id: "education";
      type: "education";
      data: { items: educationType[] | undefined };
    }
  | {
      id: "projects";
      type: "projects";
      data: { items: projectType[] | undefined };
    }
  | {
      id: "certificate";
      type: "certificate";
      data: { items: certificateType[] | undefined };
    };

export const FirstCVEdited = () => {
  const theme = useTheme();
  const user = useSelector(selectUser);
  const { exportToPdf } = usePdfExport();
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const [sections, setSections] = useState<CVSection[]>([]);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [isExporting, setIsExporting] = useState(false);
  useEffect(() => {
    if (user) {
      const cvSections: CVSection[] = [
        { id: "aboutMe", type: "aboutMe", data: { items: user?.aboutMe } },
        { id: "workEx", type: "workEx", data: { items: user?.workEx } },
        {
          id: "education",
          type: "education",
          data: { items: user?.education },
        },
        { id: "projects", type: "projects", data: { items: user?.projects } },
        {
          id: "certificate",
          type: "certificate",
          data: { items: user?.certificate },
        },
      ];
      setSections(cvSections);
    }
  }, [user]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setSections((sections) => {
      const oldIndex = sections.findIndex(
        (section) => section.id === active.id
      );
      const newIndex = sections.findIndex((section) => section.id === over.id);
      return arrayMove(sections, oldIndex, newIndex);
    });
  };
  const handleExportPdf = async () => {
    setIsExporting(true);
    setTimeout(async () => {
      await exportToPdf(contentRef, {
        filename: "my-document.pdf",
      });
      setIsExporting(false);
    }, 100);
  };
  return (
    <>
      <Alert
        severity="info"
        sx={{
          mb: 2,
          "& .MuiAlert-message": {
            display: "flex",
            alignItems: "center",
            gap: 1,
          },
        }}
      >
        <EditIcon fontSize="small" />
        You can edit your title and content by clicking on them. Dates are not
        editable.
      </Alert>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          px: 4,
        }}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              mx: 1,
            },
          }}
        >
          <Link
            component="button"
            underline="hover"
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              border: "none",
              background: "none",
              cursor: "pointer",
              p: 0,
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Link
            component="button"
            underline="hover"
            onClick={() => navigate("/cv")}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              border: "none",
              background: "none",
              cursor: "pointer",
              p: 0,
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            CV
          </Link>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.primary",
            }}
          >
            Edit CV
          </Typography>
        </Breadcrumbs>
        <Alert
          severity="warning"
          variant="outlined"
          sx={{
            py: 0.5,
            px: 1.5,
            borderRadius: 1.5,
            backgroundColor: "rgba(255, 244, 229, 0.5)",
            "& .MuiAlert-icon": {
              fontSize: "1rem",
            },
            "& .MuiAlert-message": {
              fontSize: "0.8rem",
              fontWeight: 500,
            },
          }}
        >
          Unsaved changes will be lost if you leave this page
        </Alert>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box>
            <Button
              loading={isExporting}
              onClick={handleExportPdf}
              variant="contained"
              sx={{ backgroundColor: colorButtonOrange }}
            >
              Download
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ColorLensIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              Theme
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5}>
            {colorOptions.map((color) => (
              <Tooltip key={color.name} title={color.name}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: color.primary,
                    cursor: "pointer",
                    border:
                      selectedColor.name === color.name
                        ? "3px solid #000"
                        : "2px solid transparent",
                    boxShadow:
                      selectedColor.name === color.name
                        ? "0 0 0 2px white"
                        : "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0 0 0 2px white",
                    },
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              </Tooltip>
            ))}
          </Stack>
        </Box>
      </Box>

      <Container
        maxWidth="lg"
        ref={contentRef}
        sx={{ bgcolor: "background.paper", p: 4, height: "100%" }}
      >
        <Grid2 container spacing={3}>
          {/* Left column - Personal info */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: selectedColor.primary,
                p: 3,
                color: `${selectedColor.name !== "Gray" ? "white" : "black"}`,
                borderRadius: 2,
                height: "100%",
                position: "relative",
              }}
            >
              {/* Profile image */}
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Avatar
                  src={user?.avatarIMG}
                  alt={user?.fullname}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "4px solid white",
                    boxShadow: 1,
                  }}
                />
              </Box>

              {/* Personal details */}
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography
                  variant="h5"
                  component="h1"
                  fontWeight="bold"
                  color="text.primary"
                >
                  {user?.fullname}
                </Typography>
              </Box>

              {/* Contact information */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    pb: 0.5,
                    mb: 1,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  Contact Info
                </Typography>

                <Stack spacing={1.5}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2">{user?.email}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography variant="body2">{user?.phone}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2">{user?.address}</Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Skills */}
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    pb: 0.5,
                    mb: 1,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  Skills
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {user?.skills?.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill.value}
                      size="small"
                      sx={{
                        bgcolor: "grey.200",
                        color: "text.secondary",
                        "&:hover": { bgcolor: "grey.300" },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid2>

          <Box className="content-to-capture" sx={{ flexGrow: 1 }}>
            {/* Right column - Professional details */}
            <DndContext
              modifiers={[restrictToParentElement]}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sections.map((section) => section.id)}
                strategy={verticalListSortingStrategy}
              >
                <Box>
                  {sections.map((section) => {
                    return (
                      <SortableItem
                        selectedColor={selectedColor}
                        cvPos={1}
                        isExport={isExporting}
                        key={section.id}
                        id={section.id}
                        type={section.type}
                        data={section.data.items}
                      />
                    );
                  })}
                </Box>
              </SortableContext>
            </DndContext>
          </Box>
        </Grid2>
      </Container>
    </>
  );
};
