import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import { Email, ArrowBack } from "@mui/icons-material";
import { colorButtonOrange } from "../../../themeContext";
// import { colorButtonOrange } from '../../themeContext';

interface ForgotPasswordState {
  email: string;
  step: "email" | "verification" | "success";
  verificationCode: string;
  loading: boolean;
  error: string;
}

export const ForgotPage = () => {
  const [state, setState] = useState<ForgotPasswordState>({
    email: "",
    step: "email",
    verificationCode: "",
    loading: false,
    error: "",
  });

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true, error: "" }));

    try {
      // Simulate API call to send reset email
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setState((prev) => ({
        ...prev,
        loading: false,
        step: "verification",
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to send verification email. Please try again.",
      }));
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true, error: "" }));

    try {
      // Simulate API call to verify code
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setState((prev) => ({
        ...prev,
        loading: false,
        step: "success",
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Invalid verification code. Please try again.",
      }));
    }
  };

  const renderEmailStep = () => (
    <Box component="form" onSubmit={handleEmailSubmit}>
      <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
        Forgot Password
      </Typography>
      <Typography textAlign="center" color="text.secondary" mb={3}>
        Enter your email to receive a verification code
      </Typography>

      {state.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {state.error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={state.email}
        onChange={(e) =>
          setState((prev) => ({ ...prev, email: e.target.value }))
        }
        required
        sx={{ mb: 3 }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={state.loading}
        sx={{
          bgcolor: colorButtonOrange,
          "&:hover": { bgcolor: colorButtonOrange },
        }}
      >
        {state.loading ? (
          <CircularProgress size={24} />
        ) : (
          "Send Verification Code"
        )}
      </Button>
    </Box>
  );

  const renderVerificationStep = () => (
    <Box component="form" onSubmit={handleVerificationSubmit}>
      <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
        Enter Verification Code
      </Typography>
      <Typography textAlign="center" color="text.secondary" mb={3}>
        We've sent a code to {state.email}
      </Typography>

      {state.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {state.error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Verification Code"
        value={state.verificationCode}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            verificationCode: e.target.value,
          }))
        }
        required
        sx={{ mb: 3 }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={state.loading}
        sx={{
          bgcolor: colorButtonOrange,
          "&:hover": { bgcolor: colorButtonOrange },
          mb: 2,
        }}
      >
        {state.loading ? <CircularProgress size={24} /> : "Verify Code"}
      </Button>

      <Button
        startIcon={<ArrowBack />}
        fullWidth
        onClick={() => setState((prev) => ({ ...prev, step: "email" }))}
      >
        Try Different Email
      </Button>
    </Box>
  );

  const renderSuccessStep = () => (
    <Box sx={{ textAlign: "center" }}>
      <Email
        sx={{
          fontSize: 60,
          color: colorButtonOrange,
          mb: 2,
        }}
      />
      <Typography variant="h5" gutterBottom>
        Check Your Email For Verification Code
      </Typography>
      <Typography color="text.secondary" paragraph>
        We've sent password reset instructions to your email. Please check your
        inbox and follow the instructions to reset your password.
      </Typography>
      <Link
        href="/recruiter/login"
        sx={{
          color: colorButtonOrange,
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Back to Login
      </Link>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
      {state.step === "email" && renderEmailStep()}
      {state.step === "verification" && renderVerificationStep()}
      {state.step === "success" && renderSuccessStep()}
    </Box>
  );
};
