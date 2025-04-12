import { Navigate, Outlet } from "react-router-dom";
import { useGetUserInfoQuery } from "../../../redux/feature/user/userApiSlice";

export const ProtectedUser = () => {
  const { data, isSuccess, isLoading } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data?.user.role);
  return isSuccess && data?.user.role === "guest" ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" />
  );
};
