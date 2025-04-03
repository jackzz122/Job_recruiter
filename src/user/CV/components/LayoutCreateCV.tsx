import { NavLink, Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import Button from "@mui/material/Button";
type CV_Type = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

const CV_Settings_list: CV_Type[] = [
  {
    name: "Information",
    href: "",
    icon: <PersonIcon />,
  },
  {
    name: "Summary Introduction",
    href: "",
    icon: <EditIcon />,
  },
  {
    name: "Working experience",
    href: "",
    icon: <WorkOutlineOutlinedIcon />,
  },
  {
    name: "Technical Skill",
    href: "",
    icon: <StarsOutlinedIcon />,
  },
  {
    name: "Education",
    href: "",
    icon: <SchoolOutlinedIcon />,
  },
];

const list_more_info: string[] = [
  "Project",
  "Hobby",
  "Reference person",
  "Activity",
  "Certificate",
  "More Information",
  "Language",
];

export const LayoutCreateCV = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Stack padding={3} direction="row" spacing={3}>
          <Box flexGrow={1}>
            <Typography sx={{ color: "red" }} fontWeight="bold">
              General Information
            </Typography>
            <Box>
              {CV_Settings_list.map((setting, index) => {
                return (
                  <NavLink
                    className="block my-3 px-2 py-4 border border-black"
                    to={setting.href}
                    key={index}
                  >
                    {setting.icon}{" "}
                    <span className="text-red-500">{setting.name}</span>{" "}
                    <em className="text-xs">(Default)</em>
                  </NavLink>
                );
              })}
            </Box>
            <Typography fontWeight="bold">More Information</Typography>
            <Box>
              {list_more_info.map((infor, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-3 my-3"
                  >
                    <div className="flex items-center">
                      <DragIndicatorOutlinedIcon />
                      <p>{infor}</p>
                    </div>
                    <Button
                      sx={{
                        backgroundColor: "red",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Add
                    </Button>
                  </div>
                );
              })}
            </Box>
          </Box>
          <Box flexGrow={2} maxWidth="50rem">
            <Outlet />
          </Box>
        </Stack>
      </Container>
    </>
  );
};
