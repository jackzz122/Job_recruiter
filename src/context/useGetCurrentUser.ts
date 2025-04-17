import { useDispatch } from "react-redux";
import { useGetUserInfoQuery } from "../redux/feature/user/userApiSlice";
import { useEffect } from "react";
import { getUserInfo } from "../redux/feature/user/userSlice";

export const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!isLoading && user?.data) {
      dispatch(getUserInfo(user?.data));
    }
  }, [user, isLoading, dispatch]);

  return {
    user: user?.data,
    isLoading,
    isError,
    error: isError ? "Something went wrong, please contact our team" : null,
    refetch,
  };
};
