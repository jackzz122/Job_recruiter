import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router-dom";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { MenuNavUser } from "../../homepage/component/MenuNavUser";
import { SkeletonCircle } from "../../../shared/components/SkeletonCircle";
import { LayoutFooter } from "../../../shared/layout/LayoutFooter";
import { useGetCurrentUser } from "../../../context/useGetCurrentUser";

export const LayoutHome = () => {
  const [anchorAvatar, setAnchorAvatar] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const openAvatar = Boolean(anchorAvatar);
  const handleCloseAvatar = () => {
    setAnchorAvatar(null);
  };
  const handleClickAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorAvatar(event.currentTarget);
  };

  const { user, isLoading } = useGetCurrentUser();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <AppBar
        elevation={1}
        sx={{
          background: "linear-gradient(to right, #000000, #5b0e0e) !important",
          color: "white",
        }}
        position="fixed"
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/homepage");
            }}
          >
            <IconButton>
              <LogoDevIcon fontSize="large" sx={{ color: "red" }} />
            </IconButton>
            <Typography sx={{ color: "white" }}>JOB for DEV</Typography>
          </Box>
          <Box sx={{ mr: 2 }}></Box>
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", lg: "flex" } }}
          >
            <Button
              onClick={() => navigate("/list_job")}
              sx={{ color: "white" }}
            >
              Jobs
            </Button>
            <Button
              onClick={() => navigate("/list_company")}
              sx={{ color: "white" }}
            >
              Companies
            </Button>
            <Button sx={{ color: "white" }} onClick={() => navigate("/CV")}>
              Create CV
            </Button>
          </Stack>

          <Box sx={{ flexGrow: 1 }}></Box>

          <Box>
            <Typography fontSize={12} sx={{ color: "white" }}>
              You are a recruiter ?
            </Typography>
            <Typography
              fontSize={12}
              sx={{
                color: "white",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() =>
                navigate("/recruiter/login", {
                  state: "user",
                })
              }
            >
              Sign up now
            </Typography>
          </Box>
          <Button
            id="avatar_btn"
            onClick={handleClickAvatar}
            sx={{
              ml: 2,
              display: { xs: "none", lg: "flex" },
              color: "white",
              textTransform: "none",
            }}
          >
            {!isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar src={user?.avatarIMG || "/avatar.png"} />
                <Typography sx={{ marginLeft: 2 }}>
                  {user?.fullname || "Guest User"}
                </Typography>
              </Box>
            ) : (
              <SkeletonCircle />
            )}
          </Button>
          {
            <MenuNavUser
              avatarMenuId="avatar_resources"
              openAvatar={openAvatar}
              anchorAvatar={anchorAvatar}
              handleCloseAvatar={handleCloseAvatar}
            />
          }
          <IconButton
            size="large"
            sx={{
              display: { md: "flex", lg: "none" },
              color: "green",
              fontWeight: "bold",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: "64px", flex: "1 0 auto" }}>
        <Outlet />
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        <LayoutFooter />
      </Box>
    </Box>
  );
};
