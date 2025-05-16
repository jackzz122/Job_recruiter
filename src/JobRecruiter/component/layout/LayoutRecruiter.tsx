import { Outlet } from "react-router-dom";
import {
  LayoutForRecruiter_Admin,
  setting_types,
} from "../../../shared/layout/LayoutForRecruiter_Admin";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
// import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
const recruiter_settings: setting_types[] = [
  {
    name: "dashboard",
    href: ".",
    icons: <DashboardOutlinedIcon />,
  },
  {
    name: "Job management",
    href: "job_management",
    icons: <WorkOutlineRoundedIcon />,
  },
  {
    name: "Candidate management",
    href: "candidate_management",
    icons: <GroupRoundedIcon />,
  },
  // {
  //   name: "Staff management",
  //   href: "staff_management",
  //   icons: <ManageAccountsRoundedIcon />,
  // },
  {
    name: "Comment management",
    href: "comment_management",
    icons: <CommentRoundedIcon />,
  },
  {
    name: "Settings",
    href: "settings",
    icons: <SettingsIcon />,
  },
  {
    name: "Manage Account",
    href: "manage_account",
    icons: <ManageAccountsIcon />,
  },
];

export const LayoutRecruiter = () => {
  return (
    <LayoutForRecruiter_Admin
      titleWeb="Recruiter Page"
      listSetting={recruiter_settings}
    >
      <Outlet />
    </LayoutForRecruiter_Admin>
  );
};
