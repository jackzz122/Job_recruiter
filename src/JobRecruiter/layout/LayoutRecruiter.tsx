import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
const drawerWidth = 270;

type setting_types = {
  name: string;
  href: string;
  icons: React.ReactNode;
};

const recruiter_settings: setting_types[] = [
  {
    name: "dashboard",
    href: "dashboard",
    icons: "",
  },
  {
    name: "Recruiter Job management",
    href: "recruiter_job",
    icons: "",
  },
  {
    name: "Employees management",
    href: "list_employees",
    icons: "",
  },
  {
    name: "Company information",
    href: "company_info",
    icons: "",
  },
];

export function LayoutRecruiter() {
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {recruiter_settings.map((text, index) => (
          <NavLink key={index} to={text.href}>
            <ListItem>{text.name.toUpperCase()}</ListItem>
          </NavLink>
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
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Recruiter Page
            </Typography>
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
              },
            }}
            open
          >
            <Box flexGrow={1}>{drawer}</Box>
            <Box sx={{ paddingInline: "1rem" }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginBlock: "2rem" }}
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
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
