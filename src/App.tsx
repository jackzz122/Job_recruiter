import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login_Res/Login";
import { Register } from "./pages/Login_Res/Register";
import { LayoutLog_Register } from "./components/Layout/LayoutLog_Register";
import { ForgotPage } from "./pages/Login_Res/ForgotPass/ForgotPage";
import { NotFoundPage } from "./NotFoundPage";
import { AdminRoute } from "./routes/AdminRoute";
import { RecruiterRoute } from "./routes/RecruiterRoute";
import { EmployeeRoute } from "./routes/EmployeeRoute";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {EmployeeRoute}
          <Route element={<LayoutLog_Register />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot_pass" element={<ForgotPage />} />
          </Route>
          {AdminRoute}
          {RecruiterRoute}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;