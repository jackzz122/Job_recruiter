import { Route } from "react-router-dom";
import { AdminLayout } from "../admin/AdminLayout";
import { AdminLogin } from "../admin/Login_Res_Admin/AdminLogin";
import { Dashboard } from "../admin/Dashboard/Dashboard";
import { CandidateManagement } from "../admin/Candidate/CandidateManagement";
import { RecruiterManagement } from "../admin/Recruiter/RecruiterManagement";
import { MajorsManagement } from "../admin/Majors/MajorsManagement";
import { ReportsManagement } from "../admin/Reports/ReportsManagement";
import { Technologies } from "../admin/Majors/Technologies";
import { Levels } from "../admin/Majors/Levels";

export const AdminRoute = [
  <Route key="admin" path="admin">
    <Route path="login" element={<AdminLogin />} />
    <Route element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="account_manage" element={<CandidateManagement />} />
      <Route path="recruite_manage" element={<RecruiterManagement />} />
      <Route path="major_manage" element={<MajorsManagement />}>
        <Route path="technologies" element={<Technologies />} />
        <Route path="levels" element={<Levels />} />
      </Route>
      <Route path="reports_manage" element={<ReportsManagement />} />
    </Route>
  </Route>,
];
