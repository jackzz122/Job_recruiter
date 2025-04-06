import { Route } from "react-router-dom";
import { LayoutHome } from "../user/component/Layout/LayoutHome";
import { HomePage } from "../user/homepage/HomePage";
import { LayoutUser } from "../user/component/Layout/LayoutUser";
import { Information } from "../user/information/Dashboard/Information";
import { ChangePass } from "../user/information/ChangePass/ChangePass";
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
// import { ProtectedUser } from "../auth/user/components/ProtectedUser";

export const EmployeeRoute = [
  // <Route key="employee" element={<ProtectedUser />}>
  <Route element={<LayoutHome />}>
    <Route path="/homepage" element={<HomePage />} />
    {/* Information pages */}
    <Route element={<LayoutUser />}>
      <Route path="information" element={<Information />} />
      <Route path="myInfo" element={<MyInfo />} />
      <Route path="change_pass" element={<ChangePass />} />
    </Route>
    {/* CV page */}
    <Route path="CV" element={<CVPages />} />
    <Route element={<LayoutCreateCV />}>
      <Route path="CV/edit/:id" element={<CreateCVPage />} />
    </Route>
    <Route path="list_company" element={<ListOfCompany />} />
    <Route path="job/:name" element={<DetailsJob />} />
    {/* Company related routes */}
    <Route element={<LayoutListComp />}>
      <Route path="list_job/:name/:nameComp" element={<ListCompCareer />}>
        <Route index element={<ShortInfoComp />} />
      </Route>
    </Route>
    <Route path="company/:name" element={<LayoutDetailsComp />}>
      <Route index element={<DetailsComp />} />
      <Route path="reviews" element={<ReviewComp />} />
    </Route>
  </Route>,
  // </Route>,
];
