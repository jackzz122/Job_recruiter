import { EditDialog } from "../../../components/EditDialog";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useUpdateUserInfoMutation } from "../../../../../../redux/feature/user/userApiSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { projectType } from "../../../../../../types/UserType";
import { handleError } from "../../../../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
export const DialogProject = ({
  openProjects,
  setOpenProjects,
}: {
  openProjects: boolean;
  setOpenProjects: (check: boolean) => void;
}) => {
  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
  const defaultProject: { projects: Omit<projectType, "_id"> } = {
    projects: {
      projectName: "",
      description: "",
      link: "",
    },
  };
  const { register, handleSubmit } = useForm<{
    projects: Omit<projectType, "_id">;
  }>({
    defaultValues: defaultProject,
  });
  const onSubmit: SubmitHandler<{
    projects: Omit<projectType, "_id">;
  }> = async (data) => {
    try {
      const response = await updateUser(data);
      if (response.data?.success) {
        toast.success(response.data?.message);
        setOpenProjects(false);
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };
  return (
    <>
      <EditDialog
        open={openProjects}
        submit={handleSubmit(onSubmit)}
        loading={isLoading}
        onClose={() => setOpenProjects(false)}
        title="Edit Projects"
      >
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Project</Typography>
          <TextField
            label="Project Name"
            {...register("projects.projectName")}
            fullWidth
          />
          <TextField
            label="Project Link"
            {...register("projects.link")}
            fullWidth
          />
          <TextField
            label="Description"
            {...register("projects.description")}
            multiline
            rows={4}
            fullWidth
            placeholder="• Technologies used
• Key features
• Your role"
          />
        </Stack>
      </EditDialog>
    </>
  );
};
