import { useDispatch } from "react-redux";
import { useGetUserInfoQuery } from "../redux/feature/user/userApiSlice";
import { useEffect } from "react";
import { getUserInfo } from "../redux/feature/user/userSlice";

export const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, refetch } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!isLoading && data?.user) {
      dispatch(getUserInfo(data.user));
    }
  }, [data, isLoading, dispatch]);

  return {
    user: data?.user,
    isLoading,
    isError,
    error: isError ? "Something went wrong, please contact our team" : null,
    refetch,
  };
};
