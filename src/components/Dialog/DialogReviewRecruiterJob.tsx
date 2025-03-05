import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
export const DialogReviewRecruiterJob = ({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}) => {
  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle textAlign="center">Review Your Recruiter Job</DialogTitle>
      <Box paddingInline={2}>
        <Typography>
          Title: <strong>Fresher Frontend Developer</strong>
        </Typography>
      </Box>
    </Dialog>
  );
};
