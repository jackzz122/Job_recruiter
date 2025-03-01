import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { MenuNavHomePage } from "../MenuNav/MenuNavHomePage";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { MenuNavUser } from "../MenuNav/MenuNavUser";
import Divider from "@mui/material/Divider";

export const LayoutHome = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorAvatar, setAnchorAvatar] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const openAvatar = Boolean(anchorAvatar);
  const handleClickJob = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseAvatar = () => {
    setAnchorAvatar(null);
  };
  const handleClickAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorAvatar(event.currentTarget);
  };

  return (
    <>
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
              navigate("/");
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
              sx={{ color: "white" }}
              id="resources_btn"
              onClick={handleClickJob}
              aria-controls={open ? "job_resources" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              Việc làm IT <KeyboardArrowDownRoundedIcon />
            </Button>
            <Button
              onClick={() => navigate("/list_company")}
              sx={{ color: "white" }}
            >
              Công ty IT
            </Button>
            <Button sx={{ color: "white" }} onClick={() => navigate("/CV")}>
              Create CV
            </Button>
          </Stack>
          {
            <MenuNavHomePage
              menuJobId="job_resources"
              open={open}
              anchorEl={anchorEl}
              handleClose={handleClose}
            />
          }
          <Box sx={{ flexGrow: 1 }}></Box>

          <Box>
            <Typography fontSize={12} sx={{ color: "white" }}>
              Bạn là nhà tuyển dụng ?
            </Typography>
            <Link to="/" className="hover:underline">
              Đăng tuyển ngay
            </Link>
          </Box>
          <Button
            id="avatar_btn"
            onClick={handleClickAvatar}
            sx={{
              ml: 2,
              display: { xs: "none", lg: "flex" },
              color: "white",
            }}
          >
            <Avatar src="/avatar.png" />
            <Typography sx={{ ml: 2 }}>
              Vương Đức Lương <KeyboardArrowDownRoundedIcon />{" "}
            </Typography>
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
          <Box sx={{ display: "flex", gap: "2px" }}>
            <Typography>EN</Typography>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ backgroundColor: "white", fontWeight: "bold" }}
            />
            <Typography>VI</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: "64px" }}></Box>
      <Outlet />
    </>
  );
};
