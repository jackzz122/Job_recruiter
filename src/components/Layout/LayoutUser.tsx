import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink, Outlet } from "react-router-dom";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
const listOfInformations: {
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
    href: "",
    icon: <AssignmentOutlinedIcon />,
  },
  {
    name: "Hồ sơ ITviec",
    href: "",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    name: "Việc làm của tôi",
    href: "myJobs",
    icon: <WorkOutlineOutlinedIcon />,
  },
  {
    name: "Lời mời công việc",
    href: "",
    icon: <AlternateEmailOutlinedIcon />,
  },
  {
    name: "Đăng ký nhận email",
    href: "",
    icon: <EmailOutlinedIcon />,
  },
  {
    name: "Cài đặt",
    href: "",
    icon: <SettingsOutlinedIcon />,
  },
];
export const LayoutUser = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f3f5f7",
        height: "100vh",
        paddingTop: "2.5rem",
        paddingInline: "3.125rem",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          gap: "2rem",
        }}
      >
        <div className="w-1/4 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <WavingHandIcon sx={{ color: "red" }} />
            <p>Xin Chào </p>
          </div>
          <Typography variant="h5" fontWeight="bold">
            Vương Đức Lương
          </Typography>
          <Box marginTop={2}>
            {listOfInformations.map((user) => {
              return (
                <NavLink
                  to={user.href}
                  className={({ isActive }) => {
                    return `flex items-center gap-3 px-2 py-4 hover:text-red-500 ${
                      isActive ? "bg-red-50 text-red-500 font-bold" : ""
                    } hover:bg-red-50 rounded-md`;
                  }}
                  key={user.name}
                >
                  {user.icon} {user.name}
                </NavLink>
              );
            })}
          </Box>
        </div>
        <div className="w-2/4 flex-grow">
          <Outlet />
        </div>
      </Container>
    </Box>
  );
};
