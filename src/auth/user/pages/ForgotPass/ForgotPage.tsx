import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { colorButtonOrange } from "../../../../themeContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../../../../redux/feature/auth/authApiSlice";
import { toast } from "react-toastify";
import { handleError } from "../../../../helper/HandleError/handleError";

export const ForgotPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data: { email: string }) => {
    try {
      const response = await forgotPassword(data.email.toLowerCase()).unwrap();
      if (response.success) {
        toast.success(response.message);
        navigate("/forgot_pass/verify", {
          replace: true,
        });
        localStorage.setItem("id", String(response.data));
      }
    } catch (error) {
      const err = handleError(error);
      toast.error(err?.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
          Forgot Password
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={3}>
          Enter your email to receive a verification code
        </Typography>

        <TextField
          fullWidth
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
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
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            "Send verification code"
          )}
        </Button>
        <Link
          to="/"
          style={{ textDecoration: "none", color: colorButtonOrange }}
        >
          <Typography
            variant="body1"
            sx={{ "&:hover": { textDecoration: "underline" } }}
            textAlign="center"
            mt={2}
          >
            Back to login
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};
