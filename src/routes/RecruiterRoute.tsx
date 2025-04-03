import { Route } from "react-router-dom";
import { LayoutRecruiter } from "../JobRecruiter/component/layout/LayoutRecruiter";
import { List_employ } from "../JobRecruiter/Employees/List_employ";
import { RecruiterCompany } from "../JobRecruiter/RecuiterJob/RecruiterCompany";
import { RecruiterEditJob } from "../JobRecruiter/RecuiterJob/RecruiterEditJob";
import { Dashboard } from "../JobRecruiter/HomeSettings/Dashboard";
import { StaffManage } from "../JobRecruiter/StaffManagement/StaffManage";
import { CommentManage } from "../JobRecruiter/CommentManagement/CommentManage";
import { CompanyInfo } from "../JobRecruiter/Information_Recruiter/CompanyInfo";
import { UpdateCompany } from "../JobRecruiter/Information_Recruiter/UpdateCompany";

export const RecruiterRoute = [
  <Route key="recruiter" path="recruiter">
    <Route element={<LayoutRecruiter />}>
      <Route index element={<Dashboard />} />
      <Route path="list_employees" element={<List_employ />} />
      <Route path="job_management" element={<RecruiterCompany />} />
      <Route path="candidate_management" element={<List_employ />} />
      <Route path="comment_management" element={<CommentManage />} />
      <Route path="staff_management" element={<StaffManage />} />
      <Route path="create/:id" element={<RecruiterEditJob />} />
      <Route path="settings" element={<CompanyInfo />} />
      <Route path="update_company/:companyId" element={<UpdateCompany />} />
    </Route>
  </Route>,
];
