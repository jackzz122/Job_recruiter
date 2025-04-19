import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { NavLink, Outlet } from "react-router-dom";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";

const listOfInformations: {
  name: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "Hồ sơ",
    href: "myInfo",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    name: "Việc làm của tôi",
    href: "jobManage",
    icon: <WorkOutlineOutlinedIcon />,
  },
  {
    name: "Cài đặt",
    href: "settings",
    icon: <SettingsOutlinedIcon />,
  },
];

export const LayoutUser = () => {
  const user = useSelector(selectUser);
  return (
    <Box
      sx={{
        backgroundColor: "#f3f5f7",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "2.5rem",
        paddingInline: "3.125rem",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          gap: "2rem",
          flex: 1,
          position: "relative",
        }}
      >
        <div className="w-1/4 h-fit bg-white p-4 rounded-lg border border-gray-200 sticky top-20">
          <div className="flex items-center gap-2 mb-2">
            <WavingHandIcon sx={{ color: "red" }} />
            <p>Xin Chào </p>
          </div>
          <Typography variant="h5" fontWeight="bold">
            {user?.fullname}
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
        <div className="w-2/4 flex-grow flex flex-col">
          <Outlet />
        </div>
      </Container>
    </Box>
  );
};
