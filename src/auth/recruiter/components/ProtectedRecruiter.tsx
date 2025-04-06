import { Navigate, Outlet } from "react-router-dom";
import { useGetUserInfoQuery } from "../../../redux/feature/user/userApiSlice";

export const ProtectedRecruiter = () => {
  const { data } = useGetUserInfoQuery();
  return (
    <>
      {data?.user.role === "recruit" || data?.user.role === "staffRecruit" ? (
        <Outlet />
      ) : (
        <Navigate replace to="/" />
      )}
    </>
  );
};
