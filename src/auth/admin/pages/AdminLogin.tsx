import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handleError } from "../../../helper/HandleError/handleError";
import { useUserLoginMutation } from "../../../redux/feature/auth/authApiSlice";
import { FormField } from "../../user/pages/Login";
import { RoleName } from "../../../types/UserType";

export const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        ...data,
        roleGroup: [RoleName.ADMIN],
      }).unwrap();
      toast.success("Login successful");
      navigate("/admin");
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #0062ff 0%, #001a66 100%)",
        py: 3,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          <AdminPanelSettingsIcon
            sx={{ fontSize: 48, color: "#0062ff", mb: 2 }}
          />
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 3, color: "#0062ff", fontWeight: "bold" }}
          >
            Admin Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitTing)}
            sx={{ width: "100%", mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email?.message as string}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#0062ff",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#0062ff",
                },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors?.password}
              helperText={errors?.password?.message as string}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#0062ff",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#0062ff",
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                backgroundColor: "#0062ff",
                "&:hover": {
                  backgroundColor: "#0051d6",
                },
                fontWeight: "bold",
              }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
