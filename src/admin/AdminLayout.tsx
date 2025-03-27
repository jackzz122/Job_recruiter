import { Outlet } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TerminalIcon from "@mui/icons-material/Terminal";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import ApartmentIcon from "@mui/icons-material/Apartment";
import {
  LayoutForRecruiter_Admin,
  setting_types,
} from "../components/Layout/LayoutForRecruiter_Admin";

const admin_setting: setting_types[] = [
  {
    name: "dashboard",
    href: "",
    icons: <DashboardIcon />,
  },
  {
    name: "Candidate Management",
    href: "account_manage",
    icons: <ManageAccountsIcon />,
  },
  {
    name: "Recruiter Management",
    href: "recruite_manage",
    icons: <ApartmentIcon />,
  },
  {
    name: "Majors Management",
    href: "major_manage",
    icons: <TerminalIcon />,
  },
  {
    name: "Reports Management",
    href: "reports_manage",
    icons: <ReportGmailerrorredIcon />,
  },
];
export const AdminLayout = () => {
  return (
    <>
      <LayoutForRecruiter_Admin
        titleWeb="Admin Page"
        listSetting={admin_setting}
      >
        <Outlet />
      </LayoutForRecruiter_Admin>
    </>
  );
};
