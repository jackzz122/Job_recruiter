import { Route } from "react-router-dom";
import { LayoutHome } from "../user/component/Layout/LayoutHome";
import { HomePage } from "../user/homepage/HomePage";
import { LayoutUser } from "../user/component/Layout/LayoutUser";
import { ChangePass } from "../user/information/UserSetting/ChangePass";
import { CVPages } from "../user/CV/pages/CVPages";
import { LayoutCreateCV } from "../user/CV/components/LayoutCreateCV";
import { CreateCVPage } from "../user/CV/pages/CreateCVPage";
import { ListOfCompany } from "../user/company/ListCompany/ListOfCompany";
import { DetailsJob } from "../user/job/Detail/DetailsJob";
import { LayoutListComp } from "../user/component/Layout/LayoutListComp";
import { ListCompCareer } from "../user/company/ListCompany/ListCompCareer";
import { ShortInfoComp } from "../user/company/ListCompany/ShortInfoComp";
import { LayoutDetailsComp } from "../user/company/components/LayoutDetailsComp";
import { DetailsComp } from "../user/company/DetailsCompany/DetailsComp";
import { ReviewComp } from "../user/company/Review/ReviewComp";
import { MyInfo } from "../user/information/Profile/MyInfo";
import { WriteReview } from "../user/company/Review/WriteReview";
import { JobManage } from "../user/information/JobManage/JobManage";
import { JobApplied } from "../user/information/JobManage/pages/JobApplied";
import { JobSaves } from "../user/information/JobManage/pages/JobSaves";
import { CompanySave } from "../user/information/JobManage/pages/CompanySave";
import { Setting } from "../user/information/UserSetting/Setting";
// import { ProtectedUser } from "../auth/user/components/ProtectedUser";

export const EmployeeRoute = [
  // <Route key="employee" element={<ProtectedUser />}>
  <Route key="employee" element={<LayoutHome />}>
    <Route path="/homepage" element={<HomePage />} />
    {/* Information pages */}
    <Route element={<LayoutUser />}>
      <Route path="myInfo" element={<MyInfo />} />
      <Route path="jobManage" element={<JobManage />}>
        <Route index element={<JobApplied />} />
        <Route path="saved" element={<JobSaves />} />
        <Route path="companySaves" element={<CompanySave />} />
      </Route>
      <Route path="settings" element={<Setting />} />
      <Route path="change_pass" element={<ChangePass />} />
    </Route>
    {/* CV page */}
    <Route path="CV" element={<CVPages />} />
    <Route element={<LayoutCreateCV />}>
      <Route path="CV/edit/:id" element={<CreateCVPage />} />
    </Route>
    <Route path="list_company" element={<ListOfCompany />} />
    <Route path="job/:id" element={<DetailsJob />} />
    {/* Company related routes */}
    <Route element={<LayoutListComp />}>
      <Route path="list_job/:name/:nameComp" element={<ListCompCareer />}>
        <Route index element={<ShortInfoComp />} />
      </Route>
    </Route>
    <Route path="writeReview" element={<WriteReview />} />
    <Route path="company/:id" element={<LayoutDetailsComp />}>
      <Route index element={<DetailsComp />} />
      <Route path="reviews" element={<ReviewComp />} />
    </Route>
  </Route>,
  // </Route>,
];
