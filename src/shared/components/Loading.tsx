import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { themeColors } from "../../utils/themeColor";

interface LoadingProps {
  variant?: "circular" | "linear" | "fullscreen";
  message?: string;
  size?: number;
}

export const Loading = ({
  variant = "circular",
  message = "Loading...",
  size = 40,
}: LoadingProps) => {
  if (variant === "fullscreen") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          bgcolor: "rgba(255, 255, 255, 0.9)",
          zIndex: 9999,
        }}
      >
        <CircularProgress
          size={size}
          sx={{
            color: themeColors.primary,
            mb: 2,
          }}
        />
        <Typography variant="body1" color={themeColors.text}>
          {message}
        </Typography>
      </Box>
    );
  }

  if (variant === "linear") {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          sx={{
            height: 4,
            borderRadius: 2,
            backgroundColor: "#FFF5F0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: themeColors.primary,
            },
          }}
        />
        {message && (
          <Typography
            variant="body2"
            color={themeColors.text}
            sx={{ mt: 1, textAlign: "center" }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <CircularProgress
        size={size}
        sx={{
          color: themeColors.primary,
          mb: message ? 2 : 0,
        }}
      />
      {message && (
        <Typography variant="body2" color={themeColors.text}>
          {message}
        </Typography>
      )}
    </Box>
  );
};
