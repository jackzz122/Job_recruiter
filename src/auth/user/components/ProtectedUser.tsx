import { Navigate, Outlet } from "react-router-dom";
import { useGetUserInfoQuery } from "../../../redux/feature/user/userApiSlice";

export const ProtectedUser = () => {
  const {
    data: user,
    isSuccess,
    isLoading,
  } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isSuccess && user?.data?.role === "guest" ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" />
  );
};
