import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";
import { useLogout } from "../../../hooks/useLogout";
import { toast } from "react-toastify";
const listOfNavUser: {
  name: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "Information",
    href: "myInfo",
    icon: <DashboardIcon />,
  },
  {
    name: "Job manage",
    href: "jobManage",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    name: "Settings",
    href: "settings",
    icon: <DashboardIcon />,
  },
  {
    name: "Logout",
    href: "/login",
    icon: <LogoutIcon />,
  },
];
export const MenuNavUser = ({
  avatarMenuId,
  openAvatar,
  anchorAvatar,
  handleCloseAvatar,
}: {
  avatarMenuId: string;
  openAvatar: boolean;
  anchorAvatar: null | HTMLElement;
  handleCloseAvatar: () => void;
}) => {
  const classSetColor = (isActive: boolean) => {
    return ` p-2 w-full ${isActive ? "text-white" : "text-gray-400"}`;
  };
  const { handleLogout, isLoading } = useLogout();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) {
      navigate("/");
      toast.success("Logged out successfully");
    }
  }, [isLoading]);
  return (
    <Menu
      id={avatarMenuId}
      open={openAvatar}
      anchorEl={anchorAvatar}
      sx={{
        "& .MuiPaper-root": {
          width: "300px",
          maxHeight: "400px",
          padding: "10px",
          backgroundColor: "black",
        },
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: 60,
      }}
      onClose={handleCloseAvatar}
    >
      {listOfNavUser.map((navUser) => {
        return (
          <MenuItem key={navUser.name} onClick={handleCloseAvatar}>
            {navUser.name === "Logout" ? (
              <div
                onClick={() => handleLogout()}
                className="text-gray-400 py-2 ml-2"
              >
                {" "}
                {navUser.icon} {navUser.name}
              </div>
            ) : (
              <NavLink
                to={navUser.href}
                className={({ isActive }) => classSetColor(isActive)}
              >
                {navUser.icon} {navUser.name}
              </NavLink>
            )}
          </MenuItem>
        );
      })}
    </Menu>
  );
};
