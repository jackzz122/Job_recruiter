import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { colorButtonOrange } from "../../../themeContext";
import { useCreateRecruiterMutation } from "../../../redux/feature/user/userApiSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormRegisterField } from "../../../pages/Login_Res/Register";
import { handleError } from "../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
import { UserType } from "../../../context/types/UserType";

interface StaffType extends FormRegisterField {
  companyId: string | undefined;
}

export const DialogEmployeeAccount = ({
  open,
  closeAccountFunct,
}: {
  open: boolean;
  closeAccountFunct: () => void;
}) => {
  const [createStaffAccount, { isLoading }] = useCreateRecruiterMutation();
  const user = useSelector(selectUser) as UserType;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffType>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      companyId: undefined,
    },
  });
  const onSumitTing: SubmitHandler<StaffType> = async (data) => {
    try {
      await createStaffAccount({
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        companyId: user?.companyId?._id,
      });
      toast.success("Account created successfully");
      closeAccountFunct();
    } catch (error) {
      const err = handleError(error);
      toast.error(err?.message);
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={closeAccountFunct}>
      <DialogTitle textAlign="center">Create Employee account</DialogTitle>
      <DialogContent sx={{ marginTop: 2.5 }}>
        <form onSubmit={handleSubmit(onSumitTing)}>
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            label="Email"
            fullWidth
            sx={{ marginBlock: 1 }}
          />
          <TextField
            {...register("fullname", {
              required: "Full name is required",
            })}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
            label="full Name"
            fullWidth
            sx={{ marginBlock: 1 }}
          />
          <TextField
            label="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
            fullWidth
            sx={{ marginBlock: 1 }}
          />
          <Button
            fullWidth
            sx={{ backgroundColor: colorButtonOrange, color: "white" }}
            variant="contained"
            type="submit"
            loading={isLoading}
          >
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
