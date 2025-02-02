import { Outlet } from "react-router-dom";
import Grid2 from "@mui/material/Grid2";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
const styleButton = {
  gg: {
    backgroundColor: "red",
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  fb: {
    backgroundColor: "blue",
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  ap: {
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
    display: "flex",
    alignItems: "center",
  },
};
export const LayoutLog_Register = () => {
  return (
    <div className="flex justify-between h-screen">
      <div className="loginForm w-full flex justify-center items-center">
        <Box component="div" sx={{ width: "80%" }}>
          <Outlet />
          <p className="flex justify-center my-5">Hoặc đăng nhập bằng</p>
          <Grid2 container spacing={3}>
            <Grid2 size={4}>
              <Button fullWidth sx={styleButton.gg}>
                <GoogleIcon /> Google
              </Button>
            </Grid2>
            <Grid2 size={4}>
              <Button fullWidth sx={styleButton.fb}>
                <FacebookIcon />
                Facebook
              </Button>
            </Grid2>
            <Grid2 size={4}>
              <Button fullWidth sx={styleButton.ap}>
                <AppleIcon />
                Apple
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </div>
      <div className="imageLogin w-2/3 h-screen flex items-center">
        <img src="/banner_login.jpg" alt="" className="h-full" />
      </div>
    </div>
  );
};
