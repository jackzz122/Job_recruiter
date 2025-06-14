import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Grid2 from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
import {
  useChangePasswordMutation,
  useDeleteAccountMutation,
} from "../../../redux/feature/user/userApiSlice";
import { handleError } from "../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { capitalizeStr } from "../../../utils/capitalizeStr";

export const Setting = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [isDeleted, setIsDeleted] = useState("");
  const navigate = useNavigate();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [updatePassword, { isLoading: updateLoading }] =
    useChangePasswordMutation();
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };
  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
  };

  const newPassword = watch("newPassword");

  const onSubmit: SubmitHandler<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }> = async (data) => {
    try {
      const response = await updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      if (response?.success) {
        toast.success(response.message);
        handleClosePasswordDialog();
        navigate("/");
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error.message);
    }
  };
  const handleDeleteAccount = async () => {
    if (isDeleted === "DELETE") {
      try {
        const response = await deleteAccount();
        if (response.data?.success) {
          toast.success("Delete account success");
          navigate("/");
        }
      } catch (err) {
        const error = handleError(err);
        toast.error(error?.message || "Delete account failed");
      }
      setOpenDeleteDialog(false);
    }
  };
  const user = useSelector(selectUser);
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        pb: 3,
      }}
    >
      <Container>
        <Stack spacing={3}>
          {/* Account Information */}
          <Paper sx={{ p: 4, borderRadius: 2 }} elevation={1}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Account Information
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 3 }}>
                  <Typography variant="body1" fontWeight="500">
                    Email:
                  </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 9 }}>
                  <Typography variant="body1" sx={{ mb: 0.5 }}>
                    {user?.email}
                  </Typography>
                </Grid2>
              </Grid2>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 3 }}>
                  <Typography variant="body1" fontWeight="500">
                    Fullname:
                  </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 9 }}>
                  <Typography variant="body1" sx={{ mb: 0.5 }}>
                    {user && capitalizeStr(user?.fullname)}
                  </Typography>

                  <Button
                    variant="text"
                    color="primary"
                    sx={{ mt: 1, p: 0, textTransform: "none" }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Update profile information
                  </Button>
                </Grid2>
              </Grid2>
            </Box>
          </Paper>

          {/* Password Section */}
          <Paper sx={{ p: 4, borderRadius: 2 }} elevation={1}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Password
            </Typography>

            <Button
              variant="outlined"
              color="error"
              sx={{
                textTransform: "none",
                borderColor: "error.main",
                color: "error.main",
              }}
              loading={updateLoading}
              onClick={handleOpenPasswordDialog}
            >
              Change password
            </Button>
          </Paper>

          {/* Delete Account Section */}
          <Paper sx={{ p: 4, borderRadius: 2 }} elevation={1}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="error"
              gutterBottom
            >
              Delete account
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Alert severity="warning" sx={{ mb: 3 }}>
              Warning: This action cannot be undone. All your data will be
              permanently deleted.
            </Alert>

            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleOpenDeleteDialog}
            >
              Delete my account
            </Button>
          </Paper>
        </Stack>

        {/* Delete Account Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="delete-dialog-title"
          disableEnforceFocus
          keepMounted
        >
          <DialogTitle id="delete-dialog-title" sx={{ fontWeight: "bold" }}>
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action cannot be undone. All your personal information, saved
              jobs and application history will be permanently deleted.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Enter 'DELETE' to confirm"
              onChange={(e) => setIsDeleted(e.target.value)}
              fullWidth
              variant="outlined"
              color="error"
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseDeleteDialog} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              variant="contained"
              color="error"
              loading={isLoading}
            >
              Permanently delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Change Password Dialog */}
        <Dialog
          open={openPasswordDialog}
          onClose={handleClosePasswordDialog}
          maxWidth="sm"
          fullWidth
          aria-labelledby="password-dialog-title"
          disableEnforceFocus
          keepMounted
        >
          <DialogTitle id="password-dialog-title" sx={{ fontWeight: "bold" }}>
            Change password
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Current password"
                type="password"
                fullWidth
                {...register("oldPassword", {
                  required: "Current password is required",
                })}
                variant="outlined"
                error={!!errors.oldPassword}
                helperText={errors.oldPassword?.message}
              />
              <TextField
                label="New password"
                type="password"
                fullWidth
                {...register("newPassword", {
                  required: "New password is required",
                })}
                variant="outlined"
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
              <TextField
                label="Confirm new password"
                type="password"
                {...register("confirmPassword", {
                  validate: (value) => {
                    return value === newPassword || "Passwords do not match";
                  },
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                fullWidth
                variant="outlined"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClosePasswordDialog} variant="outlined">
              Cancel
            </Button>
            <Button
              loading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};
