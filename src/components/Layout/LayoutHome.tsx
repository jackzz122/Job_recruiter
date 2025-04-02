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
import { useState, useEffect } from "react";
import { MenuNavHomePage } from "../MenuNav/MenuNavHomePage";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { MenuNavUser } from "../MenuNav/MenuNavUser";
import { useGetUserInfoQuery } from "../../redux/feature/user/userApiSlice";
import { SkeletonCircle } from "../Skeleton/SkeletonCircle";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/feature/user/userSlice";
import { LayoutFooter } from "./LayoutFooter";

export const LayoutHome = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorAvatar, setAnchorAvatar] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
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

  const { data, isError, isLoading } = useGetUserInfoQuery();

  useEffect(() => {
    if (isError) {
      toast.error(
        "Something on the server went wrong, please contact to our team"
      );
    }

    if (!isLoading && data) {
      dispatch(getUserInfo(data?.user));
    }
  }, [data, isError, isLoading, dispatch]);

  const user = data?.user;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "00vh" }}>
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
            <Link to="/recruiter/register" className="hover:underline">
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
              textTransform: "none",
            }}
          >
            {!isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar src={user?.avatarImg ?? "/avatar.png"} />
                <Typography sx={{ marginLeft: 2 }}>
                  {user?.fullname ?? "Guest User"}
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
      <Box sx={{ mt: "64px" }} />
      <Box>
        <Outlet />
      </Box>
      <LayoutFooter />
    </Box>
  );
};
