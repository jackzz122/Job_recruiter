import { Navigate, Outlet } from "react-router-dom";
import { useGetUserInfoQuery } from "../../../redux/feature/user/userApiSlice";

export const ProtectedUser = () => {
  const { data, isSuccess, isLoading } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Add loading state handling
  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner component
  }

  // Only redirect if we have confirmation the user is NOT a guest
  return isSuccess && data?.user.role === "guest" ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" />
  );
};
