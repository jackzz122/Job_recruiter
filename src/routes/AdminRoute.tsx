import { Route } from "react-router-dom";
import { AdminLayout } from "../admin/component/layout/AdminLayout";
import { AdminLogin } from "../auth/admin/pages/AdminLogin";
import { Dashboard } from "../admin/Dashboard/Dashboard";
import { CandidateManagement } from "../admin/Candidate/CandidateManagement";
import { RecruiterManagement } from "../admin/Recruiter/RecruiterManagement";
import { MajorsManagement } from "../admin/Majors/MajorsManagement";
import { ReportsManagement } from "../admin/Reports/ReportsManagement";
import { PendingItem } from "../admin/Recruiter/pages/PendingItem";
import { ApprovedItem } from "../admin/Recruiter/pages/ApprovedItem";
import { BlockedItem } from "../admin/Recruiter/pages/BlockedItem";

export const AdminRoute = [
  <Route key="admin" path="admin">
    <Route path="login" element={<AdminLogin />} />
    <Route element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="account_manage" element={<CandidateManagement />} />
      <Route path="recruite_manage" element={<RecruiterManagement />}>
        <Route index element={<PendingItem />} />
        <Route path="approved" element={<ApprovedItem />} />
        <Route path="blocked" element={<BlockedItem />} />
      </Route>
      <Route path="major_manage" element={<MajorsManagement />} />
      <Route path="reports_manage" element={<ReportsManagement />} />
    </Route>
  </Route>,
];
