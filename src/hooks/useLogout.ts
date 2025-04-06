import { useUserLogOutMutation } from "../redux/feature/auth/authApiSlice";

export const useLogout = () => {
  const [userLogOut, { isLoading, isSuccess, isError, error }] =
    useUserLogOutMutation();

  const handleLogout = async () => {
    try {
      await userLogOut().unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogout, isLoading, isSuccess, isError, error };
};
