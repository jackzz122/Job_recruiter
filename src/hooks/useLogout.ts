import { useUserLogOutMutation } from "../redux/feature/auth/authApiSlice";
import { handleError } from "../helper/HandleError/handleError";
import { toast } from "react-toastify";
export const useLogout = () => {
  const [userLogOut, { isLoading, isSuccess, isError, error }] =
    useUserLogOutMutation();

  const handleLogout = async () => {
    try {
      await userLogOut().unwrap();
    } catch (error) {
      const err = handleError(error);
      toast.error(err?.message);
    }
  };

  return { handleLogout, isLoading, isSuccess, isError, error };
};
