import { Navigate, Outlet } from "react-router-dom";
import { useGetUserInfoQuery } from "../../../redux/feature/user/userApiSlice";
import { RoleName } from "../../../types/UserType";

export const ProtectedRecruiter = () => {
  const { data: user, isLoading } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return user?.data?.role === RoleName.RECRUIT ? (
    <Outlet />
  ) : (
    <Navigate replace to="/recruiter/login" />
  );
};
