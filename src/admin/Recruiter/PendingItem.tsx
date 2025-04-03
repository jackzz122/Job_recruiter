import TableRow from "@mui/material/TableRow";
import BusinessIcon from "@mui/icons-material/Business";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { pendingType } from "../../types/pendingType";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import {
  useConfirmPendingMutation,
  useDeletePendingItemMutation,
} from "../../redux/feature/pending/pendingApiSlice";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

export const PendingItem = (props: pendingType) => {
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [confirmPending, { isLoading }] = useConfirmPendingMutation();
  const [deletePending, { isLoading: isDeleting }] =
    useDeletePendingItemMutation();

  const handleVerify = () => {
    setOpenVerifyDialog(true);
  };

  const handleCancel = () => {
    setOpenCancelDialog(true);
  };

  const handleConfirmVerify = async (data: pendingType) => {
    try {
      await confirmPending({
        id: data.accountID._id,
        body: {
          accountID: data.accountID,
          email: data.accountID.email,
          companyName: data.companyName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          websiteUrl: data.websiteUrl,
          createdAt: data.createdAt,
        },
      }).unwrap();
      toast.success("Recruiter verified successfully!");
      setOpenVerifyDialog(false);
    } catch (err) {
      toast.error("Failed to verify recruiter. Please try again.");
      console.error("Verification error:", err);
    }
  };

  const handleConfirmCancel = async (id: string) => {
    try {
      await deletePending(id).unwrap();
      toast.success("Recruiter deleted successfully!");
      setOpenCancelDialog(false);
    } catch (err) {
      toast.error("Failed to delete recruiter. Please try again.");
      console.error("Delete error:", err);
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src="/path-to-avatar.jpg" />
            <Box>
              <Typography variant="subtitle2">
                {props.accountID.fullname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.accountID._id}
              </Typography>
            </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={1} alignItems="center">
            <BusinessIcon color="action" fontSize="small" />
            <Typography>{props.companyName}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {props.phoneNumber}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Box>
            <Typography variant="body2">{props.accountID.email}</Typography>
          </Box>
        </TableCell>
        <TableCell>{new Date(props.createdAt).toLocaleDateString()}</TableCell>
        <TableCell>
          <Chip label="Pending " color="warning" size="small" />
        </TableCell>

        <TableCell>
          <Button
            fullWidth
            sx={{ marginBottom: 2 }}
            variant="outlined"
            color="primary"
            onClick={handleVerify}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Verify"}
          </Button>
          <Button
            fullWidth
            sx={{ border: "1px solid red", color: "red" }}
            variant="outlined"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>

      {/* Verify Confirmation Dialog */}
      <Dialog
        open={openVerifyDialog}
        onClose={() => !isLoading && setOpenVerifyDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Verification</DialogTitle>
        <DialogContent>
          Are you sure you want to verify this recruiter? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenVerifyDialog(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmVerify(props)}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Verify"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={openCancelDialog}
        onClose={() => !isLoading && setOpenCancelDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: "error.main" }}>
          Confirm Cancellation
        </DialogTitle>
        <DialogContent>
          Are you sure you want to cancel this recruiter's verification? This
          action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenCancelDialog(false)}
            disabled={isLoading}
          >
            No, Keep
          </Button>
          <Button
            onClick={() => handleConfirmCancel(props._id)}
            variant="contained"
            color="error"
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={24} /> : "Yes, Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
