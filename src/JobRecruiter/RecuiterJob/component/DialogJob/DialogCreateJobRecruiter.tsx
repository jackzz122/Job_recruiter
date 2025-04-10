import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
export const DialogCreateJobRecruiter = ({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>Create Job Recruiter</DialogTitle>
      <form action="" className="px-5">
        <TextField
          label="Enter job recruiter title"
          sx={{ marginBottom: "1rem" }}
          fullWidth
        />
        <Stack direction="row" spacing={2} marginBottom={2}>
          <Button fullWidth variant="contained">
            Cancel
          </Button>
          <Button
            onClick={() => navigate("/recruiter/job_management/create/123")}
            fullWidth
            variant="contained"
          >
            Create
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
};
