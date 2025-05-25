import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Grid2 from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Business } from "@mui/icons-material";
import { colorButtonOrange } from "../../../themeContext";
import { SubmitHandler, useForm } from "react-hook-form";
import authApi from "../../../api/auth/auth";
import { toast } from "react-toastify";
import { handleError } from "../../../helper/HandleError/handleError";
import { useState } from "react";

interface RegisterFormData {
  companyName: string;
  email: string;
  phoneNumber: string;
  address: string;
  websiteUrl: string;
}

export const RecruiterRegister = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      companyName: "",
      email: "",
      phoneNumber: "",
      address: "",
      websiteUrl: "",
    },
  });

  const onSubmitting: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const response = await authApi.recruiterRegister({
        companyName: data.companyName,
        email: data.email.toLowerCase(),
        phoneNumber: data.phoneNumber,
        address: data.address,
        websiteUrl: data.websiteUrl,
      });
      if (response.status === 200) {
        setIsSuccess(true);
        toast.success(
          "Registration successful. Please wait for admin approval."
        );
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message);
    }
  };

  if (isSuccess) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <Paper
            elevation={3}
            sx={{ p: 4, width: "100%", textAlign: "center" }}
          >
            <Business sx={{ fontSize: 60, color: colorButtonOrange, mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Registration Submitted!
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Your request has been sent to admin for review. We'll notify you
              by email once approved.
            </Typography>
            <Link to="/recruiter/login">
              <Button
                variant="contained"
                sx={{
                  bgcolor: colorButtonOrange,
                  "&:hover": { bgcolor: colorButtonOrange },
                }}
              >
                Back to Login
              </Button>
            </Link>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Box onSubmit={handleSubmit(onSubmitting)} component="form">
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Business sx={{ fontSize: 40, color: colorButtonOrange }} />
              <Typography variant="h5" fontWeight="bold" mt={2}>
                Recruiter Registration
              </Typography>
              <Typography color="text.secondary" mt={1}>
                Fill in your company details to request an account
              </Typography>
              <Alert
                severity="info"
                sx={{
                  mt: 2,
                  textAlign: "left",
                  backgroundColor: "rgba(255, 133, 51, 0.1)",
                  "& .MuiAlert-icon": {
                    color: colorButtonOrange,
                  },
                }}
              >
                <Typography variant="body2">
                  <strong>Important:</strong> You need an existing candidate
                  account to register as a recruiter. This helps us verify your
                  identity and maintain platform security.
                </Typography>
                <Link to="/register" className="underline text-orange-500">
                  Create a candidate account first →
                </Link>
              </Alert>
            </Box>

            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  {...register("companyName", {
                    required: "Company name is required",
                  })}
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                  fullWidth
                  label="Company Name"
                  name="companyName"
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <TextField
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <TextField
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <TextField
                  {...register("address", {
                    required: "Address is required",
                  })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  fullWidth
                  label="Address"
                  name="address"
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  {...register("websiteUrl", {
                    required: "Website URL is required",
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                      message: "Invalid website URL",
                    },
                  })}
                  error={!!errors.websiteUrl}
                  helperText={errors.websiteUrl?.message}
                  fullWidth
                  label="Website URL"
                  name="websiteUrl"
                />
              </Grid2>
            </Grid2>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                mt: 3,
                bgcolor: colorButtonOrange,
                "&:hover": { bgcolor: colorButtonOrange },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} />
              ) : (
                "Submit Registration"
              )}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Link
                  to="/recruiter/login"
                  className="underline text-orange-500"
                >
                  Login here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
