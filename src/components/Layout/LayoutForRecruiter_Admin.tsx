import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import CodeIcon from "@mui/icons-material/Code";
import {
  backgroundColorRecruiter,
  colorButtonOrange,
} from "../../themeContext";
const drawerWidth = 270;

export type setting_types = {
  name: string;
  href: string;
  icons: React.ReactNode;
};

export function LayoutForRecruiter_Admin({
  titleWeb,
  listSetting,
  children,
}: {
  titleWeb: string;
  listSetting: setting_types[];
  children: React.ReactNode;
}) {
  const location = useLocation();
  const getCurrentPath = () => {
    const currentPath = location.pathname.split("/").pop();
    const changeCurrentPathToCapitalize = currentPath
      ?.replace(/[_. ]/g, " ")
      .split(" ")
      .reduce((accu, curr) => {
        accu += curr.charAt(0).toUpperCase() + curr.slice(1) + " ";
        return accu;
      }, "");
    return changeCurrentPathToCapitalize;
  };
  const drawer = (
    <div>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        paddingInline="1rem"
        onClick={() => (window.location.href = "/recruiter")}
        marginBlock="1.2rem"
        sx={{ cursor: "pointer" }}
      >
        <CodeIcon sx={{ color: colorButtonOrange }} fontSize="large" />
        <Typography fontWeight="bold">{titleWeb}</Typography>
      </Stack>
      <Divider />
      <List>
        {listSetting.map((text, index) => (
          <ListItem
            sx={{ padding: 0, display: "flex", alignItems: "center" }}
            key={index}
          >
            <NavLink
              end
              className={({ isActive }) =>
                `p-2  my-2 ${
                  isActive
                    ? "border text-orange-500  border-l-4 border-l-orange-500 border-y-0 border-r-0"
                    : null
                }  w-full`
              }
              to={text.href}
            >
              {text.icons}{" "}
              <p className="text-white inline capitalize">{text.name}</p>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "#282c34",
          }}
        >
          <Toolbar>
            <Typography flexGrow={1} variant="h6" noWrap component="div">
              {getCurrentPath()}
            </Typography>
            <Stack alignItems="center" direction="row" spacing={2}>
              <IconButton>
                <NotificationsActiveOutlinedIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton>
                <NotificationsActiveOutlinedIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton>
                <Avatar alt="Company logo" src="/bss_avatar.png" />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: backgroundColorRecruiter,
                color: "white",
              },
            }}
            open
          >
            <Box flexGrow={1}>{drawer}</Box>
            <Box sx={{ paddingInline: "1rem" }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginBlock: "2rem", backgroundColor: colorButtonOrange }}
              >
                Logout
              </Button>
            </Box>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
