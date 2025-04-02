import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colorButtonOrange } from "../../themeContext";
import Stack from "@mui/material/Stack";
import { NavLink, Outlet } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";

export const MajorsManagement = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{ color: colorButtonOrange }}
          fontWeight="bold"
          gutterBottom
        >
          Major Management
        </Typography>

        <Stack direction="row" spacing={2}>
          <NavLink
            to="technologies"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "white" : "inherit",
              backgroundColor: isActive ? colorButtonOrange : "transparent",
              padding: "8px 16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: isActive
                  ? colorButtonOrange
                  : "rgba(0, 0, 0, 0.04)",
              },
            })}
          >
            <CodeIcon />
            Technologies
          </NavLink>
          <NavLink
            to="levels"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "white" : "inherit",
              backgroundColor: isActive ? colorButtonOrange : "transparent",
              padding: "8px 16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: isActive
                  ? colorButtonOrange
                  : "rgba(0, 0, 0, 0.04)",
              },
            })}
          >
            <WorkIcon />
            Experience Levels
          </NavLink>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, overflow: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
