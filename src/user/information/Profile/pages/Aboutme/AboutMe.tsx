import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { EditDialog } from "../../components/EditDialog";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateUserInfoMutation } from "../../../../../redux/feature/user/userApiSlice";
import { handleError } from "../../../../../helper/HandleError/handleError";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { toast } from "react-toastify";
type AboutMeType = {
  aboutMe: string;
};
export const AboutMe = ({ aboutMe }: { aboutMe: string }) => {
  const [openAbout, setOpenAbout] = useState(false);
  const defaultValue = {
    aboutMe: aboutMe,
  };
  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AboutMeType>({
    defaultValues: defaultValue,
  });
  useEffect(() => {
    if (aboutMe) {
      reset(defaultValue);
    }
  }, [aboutMe]);
  const onSubmit: SubmitHandler<AboutMeType> = async (data) => {
    try {
      const response = await updateUser(data);
      if (response.data?.success) {
        toast.success(response.data.message || "Update success");
        setOpenAbout(false);
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Update failed");
    }
  };
  return (
    <>
      <Paper sx={{ p: 3, position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", right: 8, top: 8 }}
          onClick={() => setOpenAbout(true)}
        >
          <EditIcon />
        </IconButton>
        <Typography
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          <InfoOutlinedIcon sx={{ color: "blue" }} /> About Me
        </Typography>
        <Typography color="text.secondary">
          {aboutMe || "No information"}
        </Typography>
      </Paper>
      <EditDialog
        open={openAbout}
        onClose={() => setOpenAbout(false)}
        submit={handleSubmit(onSubmit)}
        loading={isLoading}
        title="Edit About Me"
      >
        <TextField
          multiline
          rows={4}
          fullWidth
          label="About Me"
          {...register("aboutMe", {
            required: "About me is required",
          })}
          error={!!errors.aboutMe}
          helperText={errors.aboutMe?.message}
          sx={{ mt: 2 }}
        />
      </EditDialog>
    </>
  );
};
