import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useRemoveApplicantMutation } from "../../redux/feature/job/jobApiSlice";
import { handleError } from "../../helper/HandleError/handleError";
import { toast } from "react-toastify";

export const DialogRemove = ({
  accountId,
  jobId,
  openDelete,
  setOpenDelete,
}: {
  accountId: string;
  jobId: string;
  openDelete: boolean;
  setOpenDelete: (check: boolean) => void;
}) => {
  const [removeApplicant] = useRemoveApplicantMutation();
  const handleDelete = async () => {
    try {
      if (jobId && accountId) {
        const response = await removeApplicant({
          jobId: jobId,
          userId: accountId,
        });
        if (response.data?.success) {
          toast.success(response.data?.message);
          setOpenDelete(false);
        }
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Delete failed");
    }
  };
  return (
    <Dialog open={openDelete} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: "1.25rem", fontWeight: 600 }}>
        Delete Applicant
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "text.secondary", mb: 2 }}>
          Are you sure you want to delete this applicant? This action cannot be
          undone.
        </DialogContentText>
        <DialogContentText
          sx={{ color: "text.secondary", fontSize: "0.875rem" }}
        >
          This will permanently remove the applicant from your records.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={() => setOpenDelete(false)}
          variant="outlined"
          sx={{
            borderColor: "grey.300",
            "&:hover": {
              borderColor: "grey.400",
              backgroundColor: "grey.100",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          sx={{
            backgroundColor: "#f97316",
            "&:hover": {
              backgroundColor: "#ea580c",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
