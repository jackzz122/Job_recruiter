import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import Button from "@mui/material/Button";
import { useFormContext, UseFormRegister } from "react-hook-form";
import { JobFormData } from "../../../types/JobType";
export const UploadImage = ({
  handleImageUpload,
  handleRemoveImage,
  previewImage,
}: {
  register: UseFormRegister<JobFormData>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  previewImage: string | null;
}) => {
  const { register } = useFormContext<JobFormData>();
  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
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
            <UploadIcon sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              {...register("image", {
                required: "Image is required",
              })}
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
  );
};
