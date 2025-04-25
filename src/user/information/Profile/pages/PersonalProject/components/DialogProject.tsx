import { EditDialog } from "../../../components/EditDialog";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useUpdateUserInfoMutation } from "../../../../../../redux/feature/user/userApiSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { projectType } from "../../../../../../types/UserType";
import { handleError } from "../../../../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Box from "@mui/material/Box";
export const DialogProject = ({
  currentProject,
  openProjects,
  setOpenProjects,
}: {
  currentProject?: projectType;
  openProjects: boolean;
  setOpenProjects: (check: boolean) => void;
}) => {
  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
  const defaultProject: { projects: Omit<projectType, "_id"> } = {
    projects: {
      projectName: "",
      description: "",
      link: "",
      startDate: "",
      endDate: "",
      role: "",
    },
  };
  const { register, handleSubmit, setValue, reset } = useForm<{
    projects: Omit<projectType, "_id">;
  }>({
    defaultValues: defaultProject,
  });
  useEffect(() => {
    if (currentProject) {
      setValue("projects.link", currentProject.link);
      setValue("projects.description", currentProject.description);
      setValue("projects.projectName", currentProject.projectName);
      setValue("projects.startDate", currentProject.startDate);
      setValue("projects.endDate", currentProject.endDate);
      setValue("projects.role", currentProject.role);
    } else reset(defaultProject);
  }, [currentProject, setValue, reset]);
  const onSubmit: SubmitHandler<{
    projects: Omit<projectType, "_id">;
  }> = async (data) => {
    try {
      if (currentProject) {
        const response = await updateUser({
          projects: {
            _id: currentProject._id,
            description: data.projects.description,
            link: data.projects.link,
            projectName: data.projects.projectName,
          } as projectType,
        });
        if (response.data?.success) {
          toast.success(response.data?.message);
          setOpenProjects(false);
          reset();
        }
      } else {
        const response = await updateUser(data);
        if (response.data?.success) {
          toast.success(response.data?.message);
          setOpenProjects(false);
          reset();
        }
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
          <TextField label="Role" {...register("projects.role")} fullWidth />
          <TextField
            label="Project Link"
            {...register("projects.link")}
            fullWidth
          />
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Enter the date of your project (Start date and End Date)
            </Typography>
            <input
              {...register("projects.startDate")}
              className="border border-gray-300 p-4 mr-2"
              type="date"
            />
            <input
              {...register("projects.endDate")}
              className="border border-gray-300 p-4"
              type="date"
            />
          </Box>
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
