import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import DescriptionIcon from "@mui/icons-material/Description";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { handleError } from "../../../helper/HandleError/handleError";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
import { useAddApplicantMutation } from "../../../redux/feature/job/jobApiSlice";
import { toast } from "react-toastify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
  marginBottom: theme.spacing(2),
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
}));

const StyledRadio = styled(Radio)(() => ({
  "&.Mui-checked": {
    color: "#E74C3C",
  },
}));

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  color: "#2C3E50",
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

export const DialogApplication = ({
  handleClose,
  open,
  title,
}: {
  handleClose: () => void;
  open: boolean;
  title: string;
}) => {
  const pdfRef = useRef<HTMLInputElement>(null);
  const [pdfName, setPdfName] = useState("");
  const [cvSource, setCvSource] = useState<"existing" | "new">("existing");
  const { id: postId } = useParams();
  const user = useSelector(selectUser);
  const hasExistingCV = user?.uploadCV?.nameFile && user?.uploadCV?.linkPdf;

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      setPdfName(file.name);
    }
  };

  const [addApplicant, { isLoading }] = useAddApplicantMutation();
  const { register, handleSubmit, reset } = useForm<{ coverLetter: string }>({
    defaultValues: {
      coverLetter: "",
    },
  });

  const onSubmit: SubmitHandler<{ coverLetter: string }> = async (data) => {
    try {
      if (user && postId) {
        const formData = new FormData();
        formData.append("coverLetter", data.coverLetter);

        if (cvSource === "new") {
          const file = pdfRef.current?.files?.[0];
          if (!file) {
            toast.error("Please select a CV file");
            return;
          }
          formData.append("linkPdf", file);
        }
        if (cvSource === "existing") {
          console.log("user?.uploadCV?.linkPdf", user?.uploadCV?.linkPdf);
          if (!user?.uploadCV?.linkPdf) {
            toast.error("No existing CV found. Please upload a new CV.");
            return;
          }
          formData.append("cvLink", user.uploadCV.linkPdf);
        }
        const response = await addApplicant({
          id: postId,
          applicant: formData,
        });

        if (response?.data?.success) {
          toast.success(response?.data.message);
          reset();
          handleClose();
        }
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Apply failed");
    }
  };

  const renderCVOptions = () => {
    return (
      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <StyledFormLabel>Choose CV Source</StyledFormLabel>
        <RadioGroup
          value={cvSource}
          onChange={(e) => setCvSource(e.target.value as "existing" | "new")}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              border: "1px solid #f0f0f0",
              borderRadius: 2,
              transition: "all 0.3s ease",
              opacity: hasExistingCV ? 1 : 0.5,
              "&:hover": {
                borderColor: hasExistingCV ? "#E74C3C" : "#f0f0f0",
                backgroundColor: hasExistingCV ? "#fff5f5" : "transparent",
              },
            }}
          >
            <FormControlLabel
              value="existing"
              control={<StyledRadio />}
              disabled={!hasExistingCV}
              label={
                <Stack direction="row" alignItems="center" spacing={2}>
                  <PictureAsPdfIcon sx={{ color: "#E74C3C", fontSize: 32 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      Use Existing CV
                    </Typography>
                    {hasExistingCV ? (
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {user?.uploadCV?.nameFile}
                        </Typography>
                        <Chip
                          label="PDF"
                          size="small"
                          sx={{
                            mt: 1,
                            backgroundColor: "rgba(231, 76, 60, 0.1)",
                            color: "#E74C3C",
                            fontWeight: 500,
                          }}
                        />
                      </>
                    ) : (
                      <Typography variant="body2" color="error">
                        You need to create a CV first. Please visit the CV page
                        to create one.
                      </Typography>
                    )}
                  </Box>
                </Stack>
              }
            />
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              border: "1px solid #f0f0f0",
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#E74C3C",
                backgroundColor: "#fff5f5",
              },
            }}
          >
            <FormControlLabel
              value="new"
              control={<StyledRadio />}
              label={
                <Stack direction="row" alignItems="center" spacing={2}>
                  <UploadFileIcon sx={{ color: "#E74C3C", fontSize: 32 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      Upload New CV
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Choose a new CV file from your computer
                    </Typography>
                  </Box>
                </Stack>
              }
            />
          </Paper>
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 3,
          backgroundColor: "#fafafa",
        },
      }}
    >
      <DialogTitle
        textAlign="center"
        sx={{
          fontSize: "1.75rem",
          fontWeight: 600,
          color: "#2C3E50",
          mb: 1,
        }}
      >
        {title}
      </DialogTitle>

      <Divider sx={{ mb: 3 }} />

      <form>
        <StyledPaper elevation={0}>
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <DescriptionIcon sx={{ color: "#E74C3C", fontSize: 28 }} />
            <Typography variant="h6" fontWeight={500}>
              Select your resume
            </Typography>
          </Stack>

          {renderCVOptions()}

          {cvSource === "new" && (
            <>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={`${pdfName || "Choose your CV"}`}
                disabled
                sx={{
                  mt: 3,
                  "& .MuiInputBase-input::placeholder": {
                    fontWeight: "bold",
                    opacity: 1,
                    color: "text.primary",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <Button
                        variant="contained"
                        component="label"
                        size="small"
                        sx={{
                          mr: 1,
                          backgroundColor: "#E74C3C",
                          "&:hover": {
                            backgroundColor: "#C0392B",
                          },
                        }}
                      >
                        Browse
                        <input
                          ref={pdfRef}
                          hidden
                          onChange={handlePdfChange}
                          accept="application/pdf"
                          type="file"
                        />
                      </Button>
                    ),
                  },
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block" }}
              >
                Accepted formats: PDF, DOCX (Max: 5MB)
              </Typography>
            </>
          )}
        </StyledPaper>

        <StyledPaper elevation={0}>
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <HistoryEduIcon sx={{ color: "#E74C3C", fontSize: 28 }} />
            <Typography variant="h6" fontWeight={500}>
              Write your introduction letter
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            fontStyle="italic"
            sx={{
              mb: 3,
              color: "#7F8C8D",
              backgroundColor: "#f8f9fa",
              p: 2,
              borderRadius: 2,
            }}
          >
            Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên
            nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={6}
            {...register("coverLetter")}
            variant="outlined"
            placeholder="Write about yourself to introduce to the recruiter. Highlight your relevant skills and experience for this position."
            sx={{
              mb: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            align="right"
            sx={{ display: "block" }}
          >
            0/500 characters
          </Typography>
        </StyledPaper>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 4, mb: 1 }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderColor: "#E74C3C",
              color: "#E74C3C",
              px: 4,
              py: 1,
              borderRadius: 2,
              "&:hover": {
                borderColor: "#C0392B",
                backgroundColor: "rgba(231, 76, 60, 0.04)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            loading={isLoading}
            onClick={handleSubmit(onSubmit)}
            disabled={!hasExistingCV && cvSource === "existing"}
            sx={{
              backgroundColor: "#E74C3C",
              color: "white",
              px: 4,
              py: 1,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#C0392B",
              },
            }}
          >
            Nộp Hồ Sơ
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
};
