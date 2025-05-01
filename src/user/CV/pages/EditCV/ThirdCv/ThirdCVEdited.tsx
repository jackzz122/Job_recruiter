import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/feature/user/userSlice";
import { EditableText } from "../components/EditableText";
import { usePdfExport } from "../../../../../hooks/usePdfExport";
import { useNavigate } from "react-router-dom";
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Tooltip from "@mui/material/Tooltip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import {
  certificateType,
  educationType,
  projectType,
  skillType,
  workExType,
} from "../../../../../types/UserType";
import { SortableItem } from "../components/SortableItem";

type CVSection =
  | { id: "skill"; type: "skill"; data: { items: skillType[] | undefined } }
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

const colorOptions = [
  { name: "Blue", primary: "#1976d2" },
  { name: "Purple", primary: "#9c27b0" },
  { name: "Green", primary: "#2e7d32" },
  { name: "Orange", primary: "#ed6c02" },
  { name: "Black", primary: "#212121" },
];

export const ThirdCVEdited = () => {
  const user = useSelector(selectUser);
  const { exportToPdf } = usePdfExport();
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const [sections, setSections] = useState<CVSection[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  useEffect(() => {
    if (user) {
      const cvSections: CVSection[] = [
        { id: "workEx", type: "workEx", data: { items: user?.workEx } },
        {
          id: "education",
          type: "education",
          data: { items: user?.education },
        },
        { id: "projects", type: "projects", data: { items: user?.projects } },
        { id: "skill", type: "skill", data: { items: user?.skills } },
        {
          id: "certificate",
          type: "certificate",
          data: { items: user?.certificate },
        },
      ];
      setSections(cvSections);
    }
  }, [user]);

  const handleExportPdf = async () => {
    setIsExporting(true);
    setTimeout(async () => {
      await exportToPdf(contentRef, {
        filename: "my-cv.pdf",
      });
      setIsExporting(false);
    }, 100);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    setSections((sections) => {
      const oldPos = sections.findIndex((section) => section.id === active.id);
      const newPos = sections.findIndex((section) => section.id === over.id);
      return arrayMove(sections, oldPos, newPos);
    });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ bgcolor: "background.paper", p: 3, height: "100%" }}
    >
      {/* Header Controls */}
      <Box sx={{ mb: 2.5 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            mb: 1.5,
            "& .MuiBreadcrumbs-separator": {
              mx: 0.5,
              fontSize: "0.75rem",
            },
            "& .MuiBreadcrumbs-ol": {
              flexWrap: "nowrap",
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
              fontSize: "0.75rem",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <HomeIcon sx={{ mr: 0.5, fontSize: "0.85rem" }} />
            Home
          </Link>
          <Link
            component="button"
            underline="hover"
            onClick={() => navigate(-1)}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              border: "none",
              background: "none",
              cursor: "pointer",
              p: 0,
              fontSize: "0.75rem",
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
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            Edit CV
          </Typography>
        </Breadcrumbs>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Chip
            icon={<EditIcon sx={{ fontSize: "1rem !important" }} />}
            label="Edit Mode"
            color="primary"
            size="small"
            sx={{ height: 28 }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Alert
              severity="warning"
              variant="outlined"
              sx={{
                py: 0,
                px: 1,
                borderRadius: 1,
                backgroundColor: "rgba(255, 244, 229, 0.5)",
                "& .MuiAlert-icon": {
                  fontSize: "0.875rem",
                  mr: 0.5,
                },
                "& .MuiAlert-message": {
                  fontSize: "0.75rem",
                  fontWeight: 500,
                },
              }}
            >
              Unsaved changes will be lost
            </Alert>

            <Button
              startIcon={<DragIndicatorIcon />}
              size="small"
              variant="text"
              sx={{ fontSize: "0.75rem", fontWeight: 500 }}
            >
              Drag to reorder
            </Button>

            <Button
              size="small"
              loading={isExporting}
              onClick={handleExportPdf}
              variant="contained"
              sx={{ px: 2, py: 0.5, fontSize: "0.75rem" }}
            >
              Download
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1.5,
            mb: 0.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ColorLensIcon
              fontSize="small"
              color="action"
              sx={{ fontSize: "1rem" }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              Theme
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            {colorOptions.map((color) => (
              <Tooltip key={color.name} title={color.name}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: color.primary,
                    cursor: "pointer",
                    border:
                      selectedColor.name === color.name
                        ? "2px solid #000"
                        : "1px solid transparent",
                    boxShadow:
                      selectedColor.name === color.name
                        ? "0 0 0 1px white"
                        : "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0 0 0 1px white",
                    },
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              </Tooltip>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* CV Content */}
      <Box
        ref={contentRef}
        sx={{
          mx: "auto",
          p: 4,
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          position: "relative",
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
              color={selectedColor.primary}
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
              Nhân viên tư vấn
            </Typography>
          </Box>

          <Box
            sx={{ ml: 2, display: "flex", flexDirection: "column", gap: 0.8 }}
          >
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.4,
                display: "block",
                textAlign: "right",
              }}
            >
              {user?.phone}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.4,
                display: "block",
                textAlign: "right",
              }}
            >
              {user?.email}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.4,
                display: "block",
                textAlign: "right",
              }}
            >
              {user?.address}
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
              borderBottom: `1px solid ${selectedColor.primary}`,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color={selectedColor.primary}
              sx={{ textTransform: "uppercase", pb: 0.5 }}
            >
              Mục tiêu nghề nghiệp
            </Typography>
          </Box>

          <EditableText
            value={user?.aboutMe as string}
            sx={{ fontSize: "0.9rem", lineHeight: 1.5 }}
          />
        </Box>

        {/* CV Sections */}
        <DndContext
          collisionDetection={closestCorners}
          modifiers={[restrictToParentElement]}
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
                    key={section.id}
                    data={section.data.items}
                    cvPos={3}
                    isExport={isExporting}
                    type={section.type}
                    id={section.id}
                  />
                );
              })}
            </Box>
          </SortableContext>
        </DndContext>
      </Box>
    </Container>
  );
};
