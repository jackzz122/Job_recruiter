import { Navigate, Outlet } from "react-router-dom";
import { useGetUserInfoQuery } from "../../../redux/feature/user/userApiSlice";

export const ProtectedAdmin = () => {
  const { data, isLoading } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return data?.data?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate replace to="/admin/login" />
  );
};
