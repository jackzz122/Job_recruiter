import { Navigate, Outlet } from "react-router-dom";
import { useGetUserInfoQuery } from "../../../redux/feature/user/userApiSlice";

export const ProtectedUser = () => {
  const { data: user, isLoading } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user?.data?.role === "guest" ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" />
  );
};
