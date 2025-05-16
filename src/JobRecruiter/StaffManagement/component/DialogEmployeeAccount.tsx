import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { colorButtonOrange } from "../../../themeContext";
import { useCreateRecruiterMutation } from "../../../redux/feature/user/recruiterApiSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormRegisterField } from "../../../auth/user/pages/Register";
import { handleError } from "../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
import { CompanyType } from "../../../types/CompanyType";
import { InputAdornment } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockClockIcon from "@mui/icons-material/LockClock";
import Box from "@mui/material/Box";
import KeyIcon from "@mui/icons-material/Key";
export interface StaffType extends FormRegisterField {
  companyId: { _id: string | undefined };
}

export const DialogEmployeeAccount = ({
  open,
  closeAccountFunct,
}: {
  open: boolean;
  closeAccountFunct: () => void;
}) => {
  const [createStaffAccount, { isLoading }] = useCreateRecruiterMutation();
  const user = useSelector(selectUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StaffType>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      companyId: user?.companyId
        ? typeof user.companyId === "string"
          ? { _id: user.companyId }
          : { _id: user.companyId._id }
        : undefined,
    },
  });

  const onSumitTing: SubmitHandler<StaffType> = async (data) => {
    try {
      const companyId =
        typeof user?.companyId === "string"
          ? user.companyId
          : user?.companyId?._id;
      await createStaffAccount({
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        companyId: companyId as string | CompanyType,
      }).unwrap();
      toast.success("Account created successfully");
      closeAccountFunct();
      reset();
    } catch (error) {
      const err = handleError(error);
      toast.error(err?.message);
    }
  };

  const generatePassword = (length = 12) => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    reset({ ...register("password"), password });
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
            placeholder="Enter your email"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: colorButtonOrange }} />
                  </InputAdornment>
                ),
              },
            }}
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
            placeholder="Enter your full name"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: colorButtonOrange }} />
                  </InputAdornment>
                ),
              },
            }}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
            label="Full Name"
            fullWidth
            sx={{ marginBlock: 1 }}
          />
          <Box sx={{ position: "relative", marginBlock: 1 }}>
            <TextField
              label="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              placeholder="Enter your password"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockClockIcon sx={{ color: colorButtonOrange }} />
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
            />
            <Button
              variant="outlined"
              size="small"
              onClick={() => generatePassword()}
              startIcon={<KeyIcon />}
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                mr: 1,
                borderColor: colorButtonOrange,
                color: colorButtonOrange,
                "&:hover": {
                  borderColor: colorButtonOrange,
                  backgroundColor: "rgba(255, 108, 48, 0.04)",
                },
              }}
            >
              Generate
            </Button>
          </Box>
          <Button
            fullWidth
            sx={{
              backgroundColor: colorButtonOrange,
              color: "white",
              mt: 2,
              "&:hover": {
                backgroundColor: "#E65100",
              },
            }}
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
