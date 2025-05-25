import { Box, Button, Typography } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { colorButtonOrange } from "../../../../themeContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("id");
  }, []);

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 2, textAlign: "center" }}>
      <CheckCircleOutline
        sx={{
          fontSize: 80,
          color: colorButtonOrange,
          mb: 2,
        }}
      />

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Renew password successfully
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Your password has been renewed successfully. Please login with the new
        password.
      </Typography>

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleLogin}
        sx={{
          bgcolor: colorButtonOrange,
          "&:hover": { bgcolor: colorButtonOrange },
        }}
      >
        Login
      </Button>
    </Box>
  );
};
