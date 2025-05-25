import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ArrowBack } from "@mui/icons-material";
import { colorButtonOrange } from "../../../../themeContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyCodeMutation } from "../../../../redux/feature/auth/authApiSlice";
import { toast } from "react-toastify";

export const VerificationPage = () => {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);
  const navigate = useNavigate();
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeLeft, isTimerActive, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;

    if (!code) {
      toast.error("Please enter the verification code");
      return;
    }

    try {
      const response = await verifyCode({
        id: localStorage.getItem("id") || "",
        code: code.trim(),
      }).unwrap();
      if (response.success) {
        toast.success(response.message);
        navigate("/forgot_pass/change", {
          replace: true,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to verify code";
      toast.error(errorMessage);
    }
  };

  const handleBack = () => {
    navigate("/forgot_pass");
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
          Enter the verification code
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={3}>
          {isTimerActive
            ? `Please enter the code sent to your email (${formatTime(
                timeLeft
              )} remaining)`
            : "Code expired. Please request a new code"}
        </Typography>

        <TextField
          name="code"
          fullWidth
          label="Verification code"
          required
          disabled={!isTimerActive}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isLoading || !isTimerActive}
          sx={{
            bgcolor: colorButtonOrange,
            "&:hover": { bgcolor: colorButtonOrange },
            mb: 2,
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Verify"}
        </Button>

        <Button startIcon={<ArrowBack />} fullWidth onClick={handleBack}>
          Try another email
        </Button>
      </Box>
    </Box>
  );
};
