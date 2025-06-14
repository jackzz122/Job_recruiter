import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handleError } from "../../../helper/HandleError/handleError";
import { useUserLoginMutation } from "../../../redux/feature/auth/authApiSlice";
import { RoleName } from "../../../types/UserType";
import { InputAdornment } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
export type FormField = {
  email: string;
  password: string;
  roleGroup: string[];
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [login, { isLoading }] = useUserLoginMutation();
  const onSubmitTing: SubmitHandler<FormField> = async (data) => {
    try {
      await login({
        email: data.email.toLowerCase(),
        password: data.password,
        roleGroup: [RoleName.GUEST],
      }).unwrap();
      if (!isLoading) {
        toast.success("Login successful");
        navigate("/homepage", {
          replace: true,
        });
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message);
    }
  };

  return (
    <Stack spacing={4}>
      <Box textAlign="center">
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "red" }}
        >
          Welcome Back
        </Typography>
        <Typography color="text.secondary">
          Enter your credentials to access your account
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmitTing)}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Email"
            {...register("email", {
              required: "Email must be provided",
            })}
            placeholder="Enter your email"
            type="email"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            placeholder="Enter your password"
            label="Password"
            {...register("password", {
              required: "Password must be provided",
            })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
          />

          <Box textAlign="right">
            <Link
              component={RouterLink}
              to="/forgot_pass"
              sx={{
                color: "#FF6B00",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            loading={isSubmitting}
            sx={{
              bgcolor: "red",
              "&:hover": { bgcolor: "#FF8A3D" },
              textTransform: "none",
              py: 1.5,
            }}
          >
            Sign In
          </Button>
        </Stack>
      </form>

      <Typography textAlign="center" color="text.secondary">
        Don't have an account?{" "}
        <Link
          component={RouterLink}
          to="/register"
          sx={{
            color: "#FF6B00",
            textDecoration: "none",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Sign up now
        </Link>
      </Typography>
      <Typography textAlign="center" color="text.secondary">
        You are a recruiter?{" "}
        <Link
          component={RouterLink}
          to="/recruiter/login"
          sx={{
            color: "#FF6B00",
            textDecoration: "none",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Sign up for Recruite now
        </Link>
      </Typography>
    </Stack>
  );
};
