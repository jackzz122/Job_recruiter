import { Route } from "react-router-dom";
import { LayoutHome } from "../components/Layout/LayoutHome";
import { HomePage } from "../pages/HomePage/HomePage";
import { LayoutUser } from "../components/Layout/LayoutUser";
import { Information } from "../pages/Information/Information";
import { ChangePass } from "../pages/Information/ChangePass";
import { CVPages } from "../pages/CV/CVPages";
import { LayoutCreateCV } from "../components/Layout/LayoutCreateCV";
import { CreateCVPage } from "../pages/CV/CreateCVPage";
import { ListOfCompany } from "../pages/CompanyList/ListOfCompany";
import { DetailsJob } from "../pages/DetailsJob/DetailsJob";
import { LayoutListComp } from "../components/Layout/LayoutListComp";
import { ListCompCareer } from "../pages/Company/ListCompany/ListCompCareer";
import { ShortInfoComp } from "../pages/Company/ListCompany/ShortInfoComp";
import { LayoutDetailsComp } from "../components/Layout/LayoutDetailsComp";
import { DetailsComp } from "../pages/Company/DetailsPage/DetailsComp";
import { ReviewComp } from "../pages/Company/ReviewCompany/ReviewComp";
import { MyInfo } from "../pages/Information/InformationPage/MyInfo";

export const EmployeeRoute = [
  <Route key="recruiter" element={<LayoutHome />}>
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
];
