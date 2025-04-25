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
  const { register, handleSubmit, setValue, reset } = useForm<{
    workEx: Omit<workExType, "_id">;
  }>({
    defaultValues: defaultWorkValue,
  });
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
          toast.success(response.data?.message);
          setOpenExperience(false);
          reset();
        }
      } else {
        const response = await updateUser(data);
        if (response.data?.success) {
          toast.success(response.data?.message);
          setOpenExperience(false);
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
            {...register("workEx.jobTitle")}
            fullWidth
          />
          <TextField
            label="Company"
            {...register("workEx.company")}
            fullWidth
          />
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Enter the date of your work experience (Start date and End Date)
            </Typography>
            <input
              {...register("workEx.startDate")}
              className="border border-gray-300 p-4 mr-2"
              type="date"
            />
            <input
              {...register("workEx.endDate")}
              className="border border-gray-300 p-4"
              type="date"
            />
          </Box>
          <TextField
            label="Responsibilities"
            {...register("workEx.responsibilites")}
            multiline
            rows={4}
            fullWidth
            placeholder="• List your responsibilities
    • One per line
    • Be specific"
          />
          <TextField
            label="Description"
            {...register("workEx.description")}
            fullWidth
          />
        </Stack>
      </EditDialog>
    </>
  );
};
