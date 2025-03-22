import { Route } from "react-router-dom";
import { AdminLayout } from "../admin/AdminLayout";
import { AdminDashboard } from "../admin/AdminDashboard";
import { AdminLogin } from "../admin/Login_Res_Admin/AdminLogin";

export const AdminRoute =  [
    <Route path="admin">
      <Route path="login" element={<AdminLogin />} />
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Route>
]
