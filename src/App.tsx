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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutHome />}>
            <Route path="/" element={<HomePage />} />
            <Route element={<LayoutUser />}>
              <Route path="information" element={<Information />} />
              <Route path="myJobs" element={<MyJobs />} />
              <Route path="change_pass" element={<ChangePass />} />
            </Route>
            <Route path="job/:name" element={<DetailsJob />} />
            <Route element={<LayoutListComp />}>
              <Route
                path="list_job/:name/:nameComp"
                element={<ListCompCareer />}
              >
                <Route index element={<ShortInfoComp />} />
              </Route>
            </Route>
            <Route path="company/:name" element={<LayoutDetailsComp />}>
              <Route index element={<DetailsComp />} />
              <Route path="reviews" element={<ReviewComp />} />
            </Route>
          </Route>
          <Route element={<LayoutLog_Register />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot_pass" element={<ForgotPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
