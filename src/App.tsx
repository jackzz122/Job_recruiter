import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login_Res/Login";
import { Register } from "./pages/Login_Res/Register";
import { LayoutLog_Register } from "./components/Layout/LayoutLog_Register";
import { ForgotPage } from "./pages/Login_Res/ForgotPass/ForgotPage";
import { NotFoundPage } from "./NotFoundPage";
import { AdminRoute } from "./routes/AdminRoute";
import { RecruiterRoute } from "./routes/RecruiterRoute";
import { EmployeeRoute } from "./routes/EmployeeRoute";
import { ToastContainer } from "react-toastify";
import { RecruiterLogin } from "./JobRecruiter/Login_Regis/RecruiterLogin";
import { RecruiterRegister } from "./JobRecruiter/Login_Regis/RecruiterRegister";
// import { AuthLayout } from "./JobRecruiter/layout/AuthLayout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {EmployeeRoute}
          <Route element={<LayoutLog_Register />}>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot_pass" element={<ForgotPage />} />
          </Route>
          <Route>
            <Route path="recruiter/login" element={<RecruiterLogin />} />
            <Route path="recruiter/register" element={<RecruiterRegister />} />
          </Route>
          {AdminRoute}
          {RecruiterRoute}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
