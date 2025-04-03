import { useState } from "react";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import {
  ArrowBack as ArrowBackIcon,
  Upload as UploadIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { JobFormData } from "../../types/JobType";
import { colorButtonOrange } from "../../themeContext";

export const RecruiterEditJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<JobFormData>({
    title: "Fresher Frontend About React/Nodejs",
    sizingPeople: 1,
    majorId: [],
    salaryRange: 0,
    description: {
      keySkills: {
        mainText: "",
        bulletPoints: [],
      },
      whyYouLoveIt: {
        mainText: "",
        bulletPoints: [],
      },
    },
    image: null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [newKeySkill, setNewKeySkill] = useState("");
  const [newLovePoint, setNewLovePoint] = useState("");

  const handleInputChange =
    (field: keyof Omit<JobFormData, "description" | "image">) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleDescriptionChange = (
    section: "keySkills" | "whyYouLoveIt",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        [section]: {
          ...prev.description[section],
          mainText: event.target.value,
        },
      },
    }));
  };

  const handleAddBulletPoint = (section: "keySkills" | "whyYouLoveIt") => {
    const newPoint = section === "keySkills" ? newKeySkill : newLovePoint;
    if (newPoint.trim()) {
      setFormData((prev) => ({
        ...prev,
        description: {
          ...prev.description,
          [section]: {
            ...prev.description[section],
            bulletPoints: [
              ...prev.description[section].bulletPoints,
              newPoint.trim(),
            ],
          },
        },
      }));
      if (section === "keySkills") {
        setNewKeySkill("");
      } else {
        setNewLovePoint("");
      }
    }
  };

  const handleRemoveBulletPoint = (
    section: "keySkills" | "whyYouLoveIt",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        [section]: {
          ...prev.description[section],
          bulletPoints: prev.description[section].bulletPoints.filter(
            (_, i) => i !== index
          ),
        },
      },
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewImage(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const renderBulletPointsSection = (
    section: "keySkills" | "whyYouLoveIt",
    title: string,
    placeholder: string,
    newPoint: string,
    setNewPoint: (value: string) => void
  ) => (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={formData.description[section].mainText}
        onChange={(e) => handleDescriptionChange(section, e)}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />
      <Stack spacing={2}>
        {formData.description[section].bulletPoints.map((point, index) => (
          <Box key={index} sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              value={point}
              disabled
              variant="outlined"
              size="small"
            />
            <IconButton
              onClick={() => handleRemoveBulletPoint(section, index)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            value={newPoint}
            onChange={(e) => setNewPoint(e.target.value)}
            placeholder={`Add a new ${
              section === "keySkills" ? "skill" : "benefit"
            }...`}
            variant="outlined"
            size="small"
          />
          <IconButton
            onClick={() => handleAddBulletPoint(section)}
            color="primary"
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: colorButtonOrange }}
          >
            Edit Job Posting
          </Typography>
        </Box>

        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/recruiter/dashboard")}
            sx={{ cursor: "pointer" }}
          >
            Dashboard
          </Link>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/recruiter/recruiter_job")}
            sx={{ cursor: "pointer" }}
          >
            Jobs
          </Link>
          <Typography color="text.primary">Edit Job</Typography>
        </Breadcrumbs>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Job Title */}
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Job Title
                </Typography>
                <TextField
                  fullWidth
                  value={formData.title}
                  onChange={handleInputChange("title")}
                  variant="outlined"
                  size="small"
                />
              </Box>

              {/* Number of People */}
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Number of People Needed
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.sizingPeople}
                  onChange={handleInputChange("sizingPeople")}
                  variant="outlined"
                  size="small"
                />
              </Box>

              {/* Salary Range */}
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Salary Range
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.salaryRange}
                  onChange={handleInputChange("salaryRange")}
                  variant="outlined"
                  size="small"
                />
              </Box>

              <Divider />

              {/* Key Skills Section */}
              {renderBulletPointsSection(
                "keySkills",
                "Key Skills",
                "Describe the required skills and qualifications...",
                newKeySkill,
                setNewKeySkill
              )}

              <Divider />

              {/* Why You'll Love It Section */}
              {renderBulletPointsSection(
                "whyYouLoveIt",
                "Why You'll Love It",
                "Describe why candidates should choose this role...",
                newLovePoint,
                setNewLovePoint
              )}

              {/* Image Upload */}
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Job Image
                </Typography>
                <Box
                  sx={{
                    border: "2px dashed",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 3,
                    textAlign: "center",
                    position: "relative",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {previewImage ? (
                    <>
                      <Box
                        component="img"
                        src={previewImage}
                        alt="Preview"
                        sx={{
                          maxWidth: "100%",
                          maxHeight: "300px",
                          objectFit: "contain",
                        }}
                      />
                      <IconButton
                        onClick={handleRemoveImage}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "background.paper",
                          "&:hover": { backgroundColor: "background.paper" },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <UploadIcon
                        sx={{ fontSize: 48, color: "text.secondary", mb: 1 }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Drag and drop an image here, or click to select
                      </Typography>
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<UploadIcon />}
                        sx={{ mt: 1 }}
                      >
                        Upload Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </Button>
                    </>
                  )}
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{ borderColor: "divider" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{
                    backgroundColor: "primary.main",
                    "&:hover": { backgroundColor: "primary.dark" },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
};
