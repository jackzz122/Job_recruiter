import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
const listOfNavUser: {
  name: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "Tổng quan",
    href: "information",
    icon: <DashboardIcon />,
  },
  {
    name: "Hồ sơ đính kèm",
    href: "informations",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    name: "Đổi mật khẩu",
    href: "change_pass",
    icon: <DashboardIcon />,
  },
  {
    name: "Đăng xuất",
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
  return (
    <Menu
      id={avatarMenuId}
      open={openAvatar}
      anchorEl={anchorAvatar}
      MenuListProps={{
        "aria-labelledby": "avatar_btn",
      }}
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
            <NavLink
              to={navUser.href}
              className={({ isActive }) => classSetColor(isActive)}
            >
              {navUser.icon} {navUser.name}
            </NavLink>
          </MenuItem>
        );
      })}
    </Menu>
  );
};
