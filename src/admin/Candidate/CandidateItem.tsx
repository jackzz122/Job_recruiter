import { UserType, statusAccountType } from "../../types/UserType";
import { format } from "date-fns";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import {
  useApproveAccountMutation,
  useBlockAccountMutation,
} from "../../redux/feature/pending/pendingApiSlice";
import { handleError } from "../../helper/HandleError/handleError";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDeleteAccountByAdminMutation } from "../../redux/feature/admin/adminApiSlice";

export const CandidateItem = ({ candidate }: { candidate: UserType }) => {
  const [blockAccount, { isLoading }] = useBlockAccountMutation();
  const [approveAccount] = useApproveAccountMutation();
  const [deleteAccountByAdmin, { isLoading: isLoadingDelete }] =
    useDeleteAccountByAdminMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const getStatusColor = (status: statusAccountType | undefined) => {
    switch (status) {
      case statusAccountType.APPROVE:
        return "success";
      case statusAccountType.BLOCKED:
        return "error";
      case statusAccountType.PENDING:
        return "warning";
      case statusAccountType.REJECTED:
        return "error";
      default:
        return "default";
    }
  };

  const handleBlockToggle = async (candidateId: string) => {
    // TODO: Implement block/unblock functionality
    console.log("Toggle block status for:", candidateId);
    try {
      if (candidate.statusAccount === statusAccountType.BLOCKED) {
        const response = await approveAccount(candidateId).unwrap();
        if (response.success) {
          toast.success(response.message);
        }
      } else {
        const response = await blockAccount(candidateId).unwrap();
        if (response.success) {
          toast.success(response.message);
        }
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };

  const handleDelete = async (candidateId: string) => {
    try {
      // TODO: Implement delete functionality
      const response = await deleteAccountByAdmin(candidateId).unwrap();
      if (response.success) {
        toast.success(response.message);
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };

  return (
    <>
      <TableRow hover>
        {/* User Info Cell */}
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={candidate.avatarIMG || "/default-avatar.png"}
                alt={candidate.fullname}
                sx={{ width: 40, height: 40 }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: "2px solid white",
                  bgcolor:
                    candidate.statusAccount === statusAccountType.BLOCKED
                      ? "error.main"
                      : "success.main",
                }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {candidate.fullname}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ID: {candidate._id.slice(0, 8)}...
              </Typography>
            </Box>
          </Stack>
        </TableCell>

        {/* Role Cell */}
        <TableCell>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {candidate.role}
          </Typography>
        </TableCell>

        {/* Phone Cell */}
        <TableCell>
          <Typography variant="body2">
            {candidate.phone || "Not provided"}
          </Typography>
        </TableCell>

        {/* Email Cell */}
        <TableCell>
          <Typography variant="body2">{candidate.email}</Typography>
        </TableCell>

        {/* Status Cell */}
        <TableCell>
          <Chip
            label={candidate.statusAccount || "No status"}
            color={getStatusColor(candidate.statusAccount)}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        </TableCell>

        {/* Created Date Cell */}
        <TableCell>
          <Stack direction="column" spacing={0.5}>
            <Typography variant="body2">
              {format(new Date(candidate.createdAt), "MMM d, yyyy")}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {format(new Date(candidate.createdAt), "h:mm a")}
            </Typography>
          </Stack>
        </TableCell>

        {/* Actions Cell */}
        <TableCell align="right">
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              variant="outlined"
              size="small"
              loading={isLoading}
              color={
                candidate.statusAccount === statusAccountType.BLOCKED
                  ? "success"
                  : "warning"
              }
              onClick={() => handleBlockToggle(candidate._id)}
              sx={{
                textTransform: "none",
                minWidth: 90,
                borderWidth: 1.5,
                "&:hover": {
                  borderWidth: 1.5,
                },
              }}
            >
              {candidate.statusAccount === statusAccountType.BLOCKED
                ? "Unblock"
                : "Block"}
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => setOpenDeleteDialog(true)}
              startIcon={<DeleteIcon />}
              sx={{
                textTransform: "none",
                minWidth: 90,
                borderWidth: 1.5,
                "&:hover": {
                  borderWidth: 1.5,
                },
              }}
            >
              Delete
            </Button>
          </Stack>
        </TableCell>
      </TableRow>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete {candidate.fullname}'s account? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(candidate._id)}
            color="error"
            loading={isLoadingDelete}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
