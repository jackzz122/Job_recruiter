import { Outlet } from "react-router-dom";
// import { useGetUserInfoQuery } from "../../../redux/feature/user/userApiSlice";

export const ProtectedAdmin = () => {
  // const { data, isSuccess, isLoading } = useGetUserInfoQuery(undefined, {
  //   refetchOnMountOrArgChange: true,
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // return isSuccess && data?.user.role === "admin" ? (
  //   <Outlet />
  // ) : (
  //   <Navigate replace to="/admin/login" />
  // );
  return <Outlet />;
};
