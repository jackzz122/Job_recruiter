import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import authApi from "../../api/auth/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { FormField } from "../../pages/Login_Res/Login";
import { toast } from "react-toastify";
import { colorButtonOrange } from "../../themeContext";
import { handleError } from "../../helper/HandleError/handleError";
export const RecruiterLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormField>();
  const onSubmitTing = async (data: FormField) => {
    try {
      const response = await authApi.recruiterLogin(data);
      if (response.status === 200) {
        toast.success("Login successfull");
        navigate("/recruiter");
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            borderRadius: 2,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitTing)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <LoginOutlined
                sx={{
                  fontSize: 40,
                  color: colorButtonOrange,
                }}
              />
              <Typography variant="h5" fontWeight="bold" mt={2}>
                Recruiter Login
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register("email", {
                required: "Email must be provided",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              {...register("password", {
                required: "password must be provided",
                minLength: {
                  value: 6,
                  message: "password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              label="Password"
              type="password"
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link to="/recruiter/forgot-password" className="underline">
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
              fullWidth
              sx={{ mt: 2, backgroundColor: colorButtonOrange }}
            >
              Login
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
                <Link to="/recruiter/register" className="underline">
                  Register here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
