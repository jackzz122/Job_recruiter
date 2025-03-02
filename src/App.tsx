import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LayoutHome } from "./components/Layout/LayoutHome";
import { HomePage } from "./pages/HomePage/HomePage";
import { Information } from "./pages/Information/Information";
import { ChangePass } from "./pages/Information/ChangePass";
import { Login } from "./pages/Login_Res/Login";
import { Register } from "./pages/Login_Res/Register";
import { LayoutLog_Register } from "./components/Layout/LayoutLog_Register";
import { ForgotPage } from "./pages/Login_Res/ForgotPass/ForgotPage";
import { DetailsComp } from "./pages/Company/DetailsPage/DetailsComp";
import { DetailsJob } from "./pages/DetailsJob/DetailsJob";
import { LayoutUser } from "./components/Layout/LayoutUser";
import { MyJobs } from "./pages/Information/MyJobs/MyJobs";
import { ListCompCareer } from "./pages/Company/ListCompany/ListCompCareer";
import { LayoutDetailsComp } from "./components/Layout/LayoutDetailsComp";
import { ReviewComp } from "./pages/Company/ReviewCompany/ReviewComp";
import { LayoutListComp } from "./components/Layout/LayoutListComp";
import { ShortInfoComp } from "./pages/Company/ListCompany/ShortInfoComp";
import { Home } from "./JobRecruiter/HomeSettings/Home";
import { NotFoundPage } from "./NotFoundPage";
import { LayoutRecruiter } from "./JobRecruiter/layout/LayoutRecruiter";
import { ListOfCompany } from "./pages/CompanyList/ListOfCompany";
import { CVPages } from "./pages/CV/CVPages";
import { LayoutCreateCV } from "./components/Layout/LayoutCreateCV";
import { CreateCVPage } from "./pages/CV/CreateCVPage";
import { Dashboard } from "@mui/icons-material";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* This is for employees */}
          <Route element={<LayoutHome />}>
            <Route path="/" element={<HomePage />} />
            {/* Information pages */}
            <Route element={<LayoutUser />}>
              <Route path="information" element={<Information />} />
              <Route path="myJobs" element={<MyJobs />} />
              <Route path="change_pass" element={<ChangePass />} />
            </Route>
            {/* CV page */}
            <Route path="CV" element={<CVPages />} />
            <Route element={<LayoutCreateCV />}>
              <Route path="CV/edit/:id" element={<CreateCVPage />} />
            </Route>
            <Route path="list_company" element={<ListOfCompany />} />
            <Route path="job/:name" element={<DetailsJob />} />
            {/* Specifics of Job in list company */}
            <Route element={<LayoutListComp />}>
              <Route
                path="list_job/:name/:nameComp"
                element={<ListCompCareer />}
              >
                <Route index element={<ShortInfoComp />} />
              </Route>
            </Route>
            {/* Details page of Company */}
            <Route path="company/:name" element={<LayoutDetailsComp />}>
              <Route index element={<DetailsComp />} />
              <Route path="reviews" element={<ReviewComp />} />
            </Route>
          </Route>
          {/* Login_Regis pages for employee */}
          <Route element={<LayoutLog_Register />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot_pass" element={<ForgotPage />} />
          </Route>
          {/* This is for admin  */}
          <Route></Route>
          {/* This is for recruiter */}
          <Route path="recruiter">
            <Route></Route>
            <Route element={<LayoutRecruiter />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
