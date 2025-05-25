import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ArrowBack } from "@mui/icons-material";
import { colorButtonOrange } from "../../../../themeContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "../../../../redux/feature/auth/authApiSlice";
import { toast } from "react-toastify";

export const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{
    newPassword: string;
    confirmPassword: string;
  }>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await resetPassword({
        id: localStorage.getItem("id") as string,
        newPassword: data.newPassword,
      });
      if (response.data) {
        toast.success("Password renewed successfully");
        navigate("/forgot_pass/success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    navigate("/forgot_pass");
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
          Renew password
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={3}>
          Please enter your new password
        </Typography>

        <TextField
          fullWidth
          placeholder="New password"
          {...register("newPassword", {
            required: "New password is required",
          })}
          error={!!errors.newPassword}
          helperText={errors?.newPassword?.message}
          type="password"
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value: string) => {
              if (value !== getValues("newPassword")) {
                return "Passwords do not match";
              }
            },
          })}
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message}
          type="password"
          required
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isLoading}
          sx={{
            bgcolor: colorButtonOrange,
            "&:hover": { bgcolor: colorButtonOrange },
            mb: 2,
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Renew password"}
        </Button>

        <Button startIcon={<ArrowBack />} fullWidth onClick={handleBack}>
          Go back
        </Button>
      </Box>
    </Box>
  );
};
