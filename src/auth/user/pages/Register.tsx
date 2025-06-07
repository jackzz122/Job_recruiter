import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-toastify";
import { handleError } from "../../../helper/HandleError/handleError";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import { useUserRegisterMutation } from "../../../redux/feature/auth/authApiSlice";
export type FormRegisterField = {
  fullname: string;
  email: string;
  password: string;
};

export const Register = () => {
  const navigate = useNavigate();
  const [userRegister, { isLoading }] = useUserRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterField>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });
  const onSubmitting: SubmitHandler<FormRegisterField> = async (data) => {
    try {
      const response = await userRegister({
        fullname: data.fullname,
        email: data.email.toLowerCase(),
        password: data.password,
      });
      if (response.data?.success) {
        toast.success(response.data?.message || "Registration successful");
        navigate("/", {
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
          sx={{ color: "#FF6B00" }}
        >
          Create Account
        </Typography>
        <Typography color="text.secondary">
          Build your outstanding profile and get ideal career opportunities
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmitting)}>
        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Full Name"
            {...register("fullname", {
              required: "fullname must be provided",
            })}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
            placeholder="Enter your full name"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            {...register("email", {
              required: "email must be provided",
            })}
            fullWidth
            label="Email"
            type="email"
            placeholder="Enter your email"
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
            {...register("password", {
              required: "password must be provided",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
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
            fullWidth
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Typography variant="caption" color="text.secondary" sx={{ mt: -1 }}>
            By registering, you agree to our Terms of Service and Privacy Policy
          </Typography>

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            loading={isLoading}
            sx={{
              bgcolor: "red",
              "&:hover": { bgcolor: "#FF8A3D" },
              textTransform: "none",
              py: 1.5,
              mt: 1,
            }}
          >
            Create Account
          </Button>
        </Stack>
      </form>

      <Typography textAlign="center" color="text.secondary">
        Already have an account?{" "}
        <Link
          component={RouterLink}
          to="/"
          sx={{
            color: "red",
            textDecoration: "none",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Sign in now
        </Link>
      </Typography>
    </Stack>
  );
};
