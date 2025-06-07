import { Route } from "react-router-dom";
import { LayoutHome } from "../user/component/Layout/LayoutHome";
import { HomePage } from "../user/homepage/HomePage";
import { LayoutUser } from "../user/component/Layout/LayoutUser";
import { ChangePass } from "../user/information/UserSetting/ChangePass";
import { CVPages } from "../user/CV/pages/CVPages";
import { ListOfCompany } from "../user/company/ListCompany/ListOfCompany";
import { DetailsJob } from "../user/job/Detail/DetailsJob";
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
import { FirstCV } from "../user/CV/pages/CV_Layout/FirstCV";
import { SecondCV } from "../user/CV/pages/CV_Layout/SecondCV";
import { ThirdCV } from "../user/CV/pages/CV_Layout/ThirdCV";
import { CVLayoutPage } from "../user/CV/pages/CVLayoutPage";
import { FirstCVEdited } from "../user/CV/pages/EditCV/FirstCv/FirstCVEdited";
import { SecondCVEdited } from "../user/CV/pages/EditCV/SecondCv/SecondCVEdited";
import { ThirdCVEdited } from "../user/CV/pages/EditCV/ThirdCv/ThirdCVEdited";
import { ListJob } from "../user/job/ListJob";
import { ProtectedUser } from "../auth/user/components/ProtectedUser";

export const EmployeeRoute = [
  <Route key="employee" element={<ProtectedUser />}>
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
      <Route path="layoutCV" element={<CVLayoutPage />}>
        <Route index element={<FirstCV />} />
        <Route path="cv_2" element={<SecondCV />} />
        <Route path="cv_3" element={<ThirdCV />} />
      </Route>
      <Route path="edited" element={<FirstCVEdited />} />
      <Route path="edited/cv_2" element={<SecondCVEdited />} />
      <Route path="edited/cv_3" element={<ThirdCVEdited />} />
      <Route path="list_company" element={<ListOfCompany />} />
      <Route path="list_job" element={<ListJob />} />
      <Route path="job/:id" element={<DetailsJob />} />

      <Route path="writeReview" element={<WriteReview />} />
      <Route path="company/:id" element={<LayoutDetailsComp />}>
        <Route index element={<DetailsComp />} />
        <Route path="reviews" element={<ReviewComp />} />
      </Route>
    </Route>
    ,
  </Route>,
];
