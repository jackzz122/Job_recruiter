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

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
  marginBottom: theme.spacing(2),
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
  const { id: postId } = useParams();
  const user = useSelector(selectUser);
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
        const file = pdfRef.current?.files?.[0];
        const formData = new FormData();
        formData.append("coverLetter", data.coverLetter);
        if (file) {
          formData.append("linkPdf", file);
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
      console.log(error);
    }
  };
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: { borderRadius: 2, padding: 2 },
      }}
    >
      <DialogTitle
        textAlign="center"
        sx={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#2C3E50",
        }}
      >
        {title}
      </DialogTitle>

      <Divider sx={{ mb: 2 }} />

      <form>
        <StyledPaper elevation={0}>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <DescriptionIcon sx={{ color: "#E74C3C" }} />
            <Typography variant="subtitle1" fontWeight={500}>
              Select your resume
            </Typography>
          </Stack>

          <TextField
            fullWidth
            variant="outlined"
            placeholder={`${pdfName || "Choose your CV"}`}
            disabled
            sx={{
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
        </StyledPaper>

        <StyledPaper elevation={0}>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <HistoryEduIcon sx={{ color: "#E74C3C" }} />
            <Typography variant="subtitle1" fontWeight={500}>
              Write your introduction letter
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            fontStyle="italic"
            sx={{ mb: 2, color: "#7F8C8D" }}
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
            sx={{ mb: 1 }}
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
          sx={{ mt: 3, mb: 1 }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderColor: "#E74C3C",
              color: "#E74C3C",
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
            sx={{
              backgroundColor: "#E74C3C",
              color: "white",
              px: 4,
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
