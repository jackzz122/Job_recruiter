import { EditDialog } from "../../../components/EditDialog";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { SubmitHandler, useForm } from "react-hook-form";
import { workExType } from "../../../../../../types/UserType";
import { handleError } from "../../../../../../helper/HandleError/handleError";
import Box from "@mui/material/Box";
import { useUpdateUserInfoMutation } from "../../../../../../redux/feature/user/userApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
export const DialogWorkEx = ({
  currentEx,
  openExperience,
  setOpenExperience,
}: {
  currentEx?: workExType;
  openExperience: boolean;
  setOpenExperience: (check: boolean) => void;
}) => {
  const defaultWorkValue: { workEx: Omit<workExType, "_id"> } = {
    workEx: {
      jobTitle: "",
      company: "",
      responsibilites: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  };
  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<{
    workEx: Omit<workExType, "_id">;
  }>({
    defaultValues: defaultWorkValue,
  });
  const watchStartDate = watch("workEx.startDate");
  const watchEndDate = watch("workEx.endDate");
  const isEndDateValid = watchEndDate && watchEndDate < watchStartDate;
  useEffect(() => {
    if (currentEx) {
      setValue("workEx.company", currentEx.company);
      setValue("workEx.jobTitle", currentEx.jobTitle);
      setValue("workEx.responsibilites", currentEx.responsibilites);
      setValue("workEx.startDate", currentEx.startDate);
      setValue("workEx.endDate", currentEx.endDate);
      setValue("workEx.description", currentEx.description);
    } else reset(defaultWorkValue);
  }, [currentEx, setValue, reset]);
  const onSubmit: SubmitHandler<{ workEx: Omit<workExType, "_id"> }> = async (
    data
  ) => {
    try {
      if (currentEx) {
        const response = await updateUser({
          workEx: {
            ...data.workEx,
            _id: currentEx._id,
          } as workExType,
        });
        if (response.data?.success) {
          toast.success(response.data?.message || "Update success");
          setOpenExperience(false);
          reset();
        }
      } else {
        const response = await updateUser(data);
        if (response.data?.success) {
          toast.success(response.data?.message || "Update success");
          setOpenExperience(false);
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
        submit={handleSubmit(onSubmit)}
        loading={isLoading}
        open={openExperience}
        onClose={() => setOpenExperience(false)}
        title="Edit Work Experience"
      >
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Current Position</Typography>
          <TextField
            label="Job Title"
            {...register("workEx.jobTitle", {
              required: "Job title is required",
            })}
            error={!!errors.workEx?.jobTitle}
            helperText={errors.workEx?.jobTitle?.message}
            fullWidth
          />
          <TextField
            label="Company"
            {...register("workEx.company", {
              required: "Company is required",
            })}
            error={!!errors.workEx?.company}
            helperText={errors.workEx?.company?.message}
            fullWidth
          />
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Enter the date of your work experience (Start date and End Date)
            </Typography>
            <TextField
              sx={{ mr: 2 }}
              {...register("workEx.startDate")}
              error={!!errors.workEx?.startDate}
              helperText={errors.workEx?.startDate?.message}
              type="date"
            />
            <TextField
              sx={{ mr: 2 }}
              {...register("workEx.endDate", {
                validate: () => {
                  if (isEndDateValid) {
                    return "End date must be after start date";
                  }
                  return true;
                },
              })}
              error={!!errors.workEx?.endDate}
              helperText={errors.workEx?.endDate?.message}
              type="date"
            />
          </Box>
          <TextField
            label="Responsibilities"
            {...register("workEx.responsibilites", {
              required: "Responsibilities are required",
            })}
            error={!!errors.workEx?.responsibilites}
            helperText={errors.workEx?.responsibilites?.message}
            multiline
            rows={4}
            fullWidth
            placeholder="• List your responsibilities
    • One per line
    • Be specific"
          />
          <TextField
            label="Description"
            {...register("workEx.description", {
              required: "Description is required",
            })}
            error={!!errors.workEx?.description}
            helperText={errors.workEx?.description?.message}
            fullWidth
          />
        </Stack>
      </EditDialog>
    </>
  );
};
