import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import AddIcon from "@mui/icons-material/Add";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import DescriptionIcon from "@mui/icons-material/Description";
import WarningIcon from "@mui/icons-material/Warning";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Chip from "@mui/material/Chip";
import {
  useRemoveCVMutation,
  useUploadCVMutation,
} from "../../../redux/feature/user/userApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { handleError } from "../../../helper/HandleError/handleError";
import { colorButtonOrange } from "../../../themeContext";

export const CVPages = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector(selectUser);
  const [uploadCV, { isLoading }] = useUploadCVMutation();
  const [removeCV, { isLoading: isRemoving }] = useRemoveCVMutation();
  const hasCV = user?.uploadCV?.nameFile && user?.uploadCV?.linkPdf;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("nameFile", file.name);
        formData.append("uploadCV", file);
        const response = await uploadCV(formData).unwrap();
        if (response.success) {
          toast.success("Upload CV successfully");
        }
      } catch (err) {
        const error = handleError(err);
        toast.error(error?.message || "Upload CV failed");
      }
    }
  };

  const handleDeleteCV = async () => {
    try {
      const response = await removeCV().unwrap();
      if (response.success) {
        toast.success("Delete CV successfully");
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Delete CV failed");
    }
  };

  const renderUploadBox = () => (
    <Box
      sx={{
        border: "2px dashed #e0e0e0",
        borderRadius: 2,
        p: 4,
        textAlign: "center",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      {isLoading ? (
        <Stack spacing={2} alignItems="center">
          <CircularProgress sx={{ color: "red" }} />
          <Typography variant="body2" color="text.secondary">
            Uploading your CV...
          </Typography>
        </Stack>
      ) : (
        <>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            No CV uploaded yet
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 2 }}
          >
            Upload your CV to start applying for jobs
          </Typography>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            startIcon={<DriveFolderUploadIcon />}
            onClick={handleUploadClick}
            disabled={isLoading}
            sx={{
              borderColor: "red",
              color: "red",
              "&:hover": {
                borderColor: "#d32f2f",
                backgroundColor: "rgba(211, 47, 47, 0.04)",
              },
            }}
          >
            Upload CV
          </Button>
        </>
      )}
    </Box>
  );

  const renderCVFile = () => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      {isRemoving ? (
        <Stack spacing={2} alignItems="center" py={2}>
          <CircularProgress sx={{ color: "red" }} />
          <Typography variant="body2" color="text.secondary">
            Removing your CV...
          </Typography>
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" spacing={2}>
          <PictureAsPdfIcon sx={{ color: "red", fontSize: 40 }} />
          <Box flexGrow={1}>
            <Typography variant="subtitle1" fontWeight="medium">
              {user?.uploadCV?.nameFile}
            </Typography>
            <Chip
              label="PDF"
              size="small"
              sx={{
                backgroundColor: "rgba(244, 67, 54, 0.1)",
                color: "red",
                fontWeight: 500,
              }}
            />
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={() => window.open(user?.uploadCV?.linkPdf, "_blank")}
              startIcon={<VisibilityIcon />}
              disabled={isLoading || isRemoving}
              sx={{
                borderColor: "red",
                color: "red",
                "&:hover": {
                  borderColor: "#d32f2f",
                  backgroundColor: "rgba(211, 47, 47, 0.04)",
                },
              }}
            >
              View
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleDeleteCV}
              disabled={isLoading || isRemoving}
              sx={{
                borderColor: "red",
                color: "red",
                "&:hover": {
                  borderColor: "#d32f2f",
                  backgroundColor: "rgba(211, 47, 47, 0.04)",
                },
              }}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      )}
    </Paper>
  );

  return (
    <Container maxWidth="xl">
      <Stack direction="row" sx={{ marginTop: "5rem", marginBottom: "2rem" }}>
        <Typography
          flexGrow={1}
          variant="h5"
          sx={{ color: colorButtonOrange }}
          fontWeight="bold"
        >
          CV Builder
        </Typography>
        <Stack flexGrow={0} direction="row" spacing={2}>
          <Button
            component={Link}
            to="/layoutCV"
            sx={{
              border: "1px solid red",
              color: "white",
              display: "flex",
              gap: "0.25rem",
              alignItems: "center",
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            Create CV <AddIcon />
          </Button>
        </Stack>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          backgroundColor: "#fafafa",
        }}
      >
        <Stack spacing={2}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DescriptionIcon sx={{ color: "red" }} />
            <Typography variant="h6">Your CV</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 2,
              bgcolor: "#fff3e0",
              borderRadius: 1,
              border: "1px solid #ffe0b2",
            }}
          >
            <WarningIcon sx={{ color: "#f57c00" }} />
            <Typography variant="body2" color="#e65100">
              You can only have one CV at a time. Uploading a new CV will
              replace your existing one.
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Upload your CV to apply for jobs. Supported formats: PDF, DOC, DOCX
            (Max: 5MB)
          </Typography>

          {!hasCV ? renderUploadBox() : renderCVFile()}
        </Stack>
      </Paper>
    </Container>
  );
};
