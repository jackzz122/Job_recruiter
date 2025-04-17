import { Route } from "react-router-dom";
import { LayoutRecruiter } from "../JobRecruiter/component/layout/LayoutRecruiter";
import { List_employ } from "../JobRecruiter/Employees/List_employ";
import { RecruiterCompany } from "../JobRecruiter/RecuiterJob/pages/RecruiterCompany";
import { RecruiterEditJob } from "../JobRecruiter/RecuiterJob/pages/RecruiterEditJob";
import { Dashboard } from "../JobRecruiter/HomeSettings/Dashboard";
import { StaffManage } from "../JobRecruiter/StaffManagement/StaffManage";
import { CommentManage } from "../JobRecruiter/CommentManagement/CommentManage";
import { CompanyInfo } from "../JobRecruiter/Information_Recruiter/pages/CompanyInfo";
import { UpdateCompany } from "../JobRecruiter/Information_Recruiter/pages/UpdateCompany";
import { EmployeeInfor } from "../JobRecruiter/EmployeeInfor/EmployeeInfor";
import { EmployeeEdit } from "../JobRecruiter/EmployeeInfor/EmployeeEdit";

export const RecruiterRoute = [
  <Route key="recruiter" path="recruiter">
    <Route element={<LayoutRecruiter />}>
      <Route index element={<Dashboard />} />
      <Route path="list_employees" element={<List_employ />} />
      <Route path="job_management" element={<RecruiterCompany />} />
      <Route path="candidate_management" element={<List_employ />} />
      <Route path="comment_management" element={<CommentManage />} />
      <Route path="staff_management" element={<StaffManage />} />
      <Route
        path="job_management/create"
        element={<RecruiterEditJob mode="create" />}
      />
      <Route
        path="job_management/:id/update"
        element={<RecruiterEditJob mode="update" />}
      />
      <Route path="settings" element={<CompanyInfo />} />
      <Route path="manage_account" element={<EmployeeInfor />} />
      <Route path="manage_account/update" element={<EmployeeEdit />} />
      <Route
        path="settings/update_company/:companyId"
        element={<UpdateCompany />}
      />
    </Route>
  </Route>,
];
