import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { JobResponse } from "../../../../types/JobType";

interface DialogDeleteJobProps {
  open: boolean;
  handleClose: () => void;
  job: JobResponse;
  onConfirm: () => void;
  isLoading: boolean;
}

export const DialogDeleteJob = ({
  open,
  handleClose,
  job,
  onConfirm,
  isLoading,
}: DialogDeleteJobProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Job</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: 300 }}>
          <Typography>
            Are you sure you want to delete the job "{job.title}"? This action
            cannot be undone.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
