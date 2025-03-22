import { Route } from "react-router-dom";
import { LayoutRecruiter } from "../JobRecruiter/layout/LayoutRecruiter";
import { List_employ } from "../JobRecruiter/Employees/List_employ";
import { RecruiterCompany } from "../JobRecruiter/RecuiterJob/RecruiterCompany";
import { Company_Intro } from "../JobRecruiter/Information_Recruiter/Company_Intro";
import { RecruiterEditJob } from "../JobRecruiter/RecuiterJob/RecruiterEditJob";
import { Dashboard } from "../JobRecruiter/HomeSettings/Dashboard";

export const RecruiterRoute = [
  <Route path="recruiter">
    <Route element={<LayoutRecruiter />}>
      <Route index element={<Dashboard />} />
      <Route path="list_employees" element={<List_employ />} />
      <Route path="job_management" element={<RecruiterCompany />} />
      <Route path="candidate_management" element={<List_employ />} />
      <Route path="comment_management" element={<RecruiterCompany />} />
      <Route path="staff_management" element={<RecruiterCompany />} />
      <Route path="create/:id" element={<RecruiterEditJob />} />
      <Route path="settings" element={<Company_Intro />} />
    </Route>
  </Route>,
];
