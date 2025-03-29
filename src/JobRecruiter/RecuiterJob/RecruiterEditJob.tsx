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
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface JobFormData {
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  image: File | null;
}

export const RecruiterEditJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<JobFormData>({
    title: "Fresher Frontend About React/Nodejs",
    description: "",
    requirements: "",
    benefits: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleInputChange =
    (field: keyof JobFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
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

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        {/* Header with Back Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
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

              <Divider />

              {/* Job Description */}
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Job Description
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange("description")}
                  placeholder="Describe the role and responsibilities..."
                  variant="outlined"
                  size="small"
                />
              </Box>

              {/* Requirements */}
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Requirements
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.requirements}
                  onChange={handleInputChange("requirements")}
                  placeholder="List the required skills and qualifications..."
                  variant="outlined"
                  size="small"
                />
              </Box>

              {/* Benefits */}
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Benefits
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.benefits}
                  onChange={handleInputChange("benefits")}
                  placeholder="Describe why candidates should choose this role..."
                  variant="outlined"
                  size="small"
                />
              </Box>

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
