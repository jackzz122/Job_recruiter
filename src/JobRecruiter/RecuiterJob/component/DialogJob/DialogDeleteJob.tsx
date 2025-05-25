import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDeleteJobMutation } from "../../../../redux/feature/job/jobApiSlice";
import { handleError } from "../../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
export const DialogDeleteJob = ({
  id,
  open,
  handleClose,
  title,
}: {
  id: string;
  open: boolean;
  handleClose: () => void;
  title: string;
}) => {
  const [deleteJob, { isLoading }] = useDeleteJobMutation();
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteJob(id).unwrap();
      if (response.success) {
        toast.success(response.message);
        handleClose();
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Delete failed");
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Job</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: 300 }}>
          <Typography>
            Are you sure you want to delete the job "{title}"? This action
            cannot be undone.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          loading={isLoading}
          onClick={() => handleDelete(id)}
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
