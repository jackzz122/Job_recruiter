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
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<{
    projects: Omit<projectType, "_id">;
  }>({
    defaultValues: defaultProject,
  });
  const watchStartDate = watch("projects.startDate");
  const watchEndDate = watch("projects.endDate");
  const isEndDateValid =
    watchStartDate && watchEndDate
      ? new Date(watchEndDate) < new Date(watchStartDate)
      : false;
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
            ...data.projects,
            _id: currentProject._id,
          } as projectType,
        });
        if (response.data?.success) {
          toast.success(response.data?.message || "Update success");
          setOpenProjects(false);
          reset();
        }
      } else {
        const response = await updateUser(data);
        if (response.data?.success) {
          toast.success(response.data?.message || "Update success");
          setOpenProjects(false);
          reset();
        }
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Update failed");
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
            {...register("projects.projectName", {
              required: "Project name is required",
            })}
            fullWidth
            error={!!errors.projects?.projectName}
            helperText={errors.projects?.projectName?.message}
          />
          <TextField
            label="Role"
            {...register("projects.role", {
              required: "Role is required",
            })}
            error={!!errors.projects?.role}
            helperText={errors.projects?.role?.message}
            fullWidth
          />
          <TextField
            label="Project Link"
            {...register("projects.link", {
              required: "Project link is required",
            })}
            error={!!errors.projects?.link}
            helperText={errors.projects?.link?.message}
            fullWidth
          />
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Enter the date of your project (Start date and End Date)
            </Typography>
            <TextField
              sx={{ mr: 2 }}
              {...register("projects.startDate", {
                required: "Start date is required",
              })}
              type="date"
              error={!!errors.projects?.startDate}
              helperText={errors.projects?.startDate?.message}
            />
            <TextField
              sx={{ mr: 2 }}
              {...register("projects.endDate", {
                required: "End date is required",
                validate: () => {
                  if (isEndDateValid) {
                    return "End date must be after start date";
                  }
                  return true;
                },
              })}
              type="date"
              error={!!errors.projects?.endDate}
              helperText={errors.projects?.endDate?.message}
            />
          </Box>
          <TextField
            label="Description"
            {...register("projects.description", {
              required: "Description is required",
            })}
            multiline
            rows={4}
            fullWidth
            error={!!errors.projects?.description}
            helperText={errors.projects?.description?.message}
            placeholder="• Technologies used
• Key features
• Your role"
          />
        </Stack>
      </EditDialog>
    </>
  );
};
