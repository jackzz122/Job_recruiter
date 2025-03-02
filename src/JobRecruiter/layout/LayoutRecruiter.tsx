import { Link, Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Drawer from "@mui/material/Drawer";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import Typography from "@mui/material/Typography";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
const listOfRecruiterSettings: {
  icon: React.ReactNode;
  name: string;
  href: string;
}[] = [
  {
    icon: <DashboardCustomizeOutlinedIcon />,
    name: "Dashboard",
    href: "",
  },
  {
    icon: <RecentActorsIcon />,
    name: "list of waiting",
    href: "",
  },
  {
    icon: <AddIcon />,
    name: "Create a new Job",
    href: "",
  },
];
const drawerPlaces = (
  <List sx={{ flexGrow: 2 }}>
    {listOfRecruiterSettings.map((setting, index) => {
      return (
        <Link key={index} to="/recruiter">
          <ListItem>
            <ListItemIcon>{setting.icon}</ListItemIcon>
            <ListItemText>{setting.name}</ListItemText>
          </ListItem>
        </Link>
      );
    })}
  </List>
);
export const LayoutRecruiter = () => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        {/* <Drawer
          sx={{ backgroundColor: "red", color: "white" }}
          variant="permanent"
        >
          <List sx={{ flexGrow: 1 }}>
            <ListItem>
              <Typography variant="h4" fontWeight="bold">
                {" "}
                <ScreenSearchDesktopOutlinedIcon fontSize="large" /> Recruiter
              </Typography>
            </ListItem>
          </List>
          {drawerPlaces}
          <List sx={{ flexGrow: 0 }}>
            <ListItem sx={{ justifyContent: "center", gap: 2 }}>
              <Typography>
                {" "}
                <ExitToAppOutlinedIcon /> LogOut
              </Typography>
            </ListItem>
          </List>
        </Drawer> */}
        <Box sx={{ marginLeft: "20rem" }} flexGrow={3}>
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};
