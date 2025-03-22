import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
type admin_Type = {
  name: string;
  icons: React.ReactNode;
};

const admin_setting: admin_Type[] = [
  {
    name: "dashboard",
    icons: <DashboardIcon />,
  },
  {
    name: "user",
    icons: <ManageAccountsIcon />,
  },
];
export const AdminLayout = () => {
  const AdminDrawer = (
    <Box sx={{ width: 300 }}>
      <List>
        {admin_setting.map((setting, index) => {
          return (
            <ListItem disablePadding key={index}>
              <ListItemButton>
                <ListItemIcon>{setting.icons}</ListItemIcon>
                <ListItemText primary={setting.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
  const [openAdminDrawer, setOpenAdminDrawer] = useState(false);

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box>
          <Button onClick={() => setOpenAdminDrawer(true)}>
            <MenuIcon />
          </Button>
          <Drawer
            open={openAdminDrawer}
            onClose={() => setOpenAdminDrawer(false)}
          >
            {AdminDrawer}
          </Drawer>
        </Box>
        <Outlet />
      </Stack>
    </>
  );
};
