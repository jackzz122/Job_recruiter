import TableRow from "@mui/material/TableRow";
import BusinessIcon from "@mui/icons-material/Business";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import VerifiedIcon from "@mui/icons-material/Verified";
import Button from "@mui/material/Button";
import { pendingType } from "../../context/types/pendingType";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";

export const PendingItem = (props: pendingType) => {
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const handleVerify = () => {
    setOpenVerifyDialog(true);
  };

  const handleCancel = () => {
    setOpenCancelDialog(true);
  };

  const handleConfirmVerify = () => {
    // Add your verification logic here
    setOpenVerifyDialog(false);
  };

  const handleConfirmCancel = () => {
    // Add your cancel logic here
    setOpenCancelDialog(false);
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
          >
            Verify
          </Button>
          <Button
            fullWidth
            sx={{ border: "1px solid red", color: "red" }}
            variant="outlined"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>

      {/* Verify Confirmation Dialog */}
      <Dialog
        open={openVerifyDialog}
        onClose={() => setOpenVerifyDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Verification</DialogTitle>
        <DialogContent>
          Are you sure you want to verify this recruiter? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVerifyDialog(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmVerify}
            variant="contained"
            color="primary"
          >
            Verify
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
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
          <Button onClick={() => setOpenCancelDialog(false)}>No, Keep</Button>
          <Button
            onClick={handleConfirmCancel}
            variant="contained"
            color="error"
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
