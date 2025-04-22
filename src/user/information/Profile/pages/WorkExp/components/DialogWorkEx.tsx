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
export const DialogWorkEx = ({
  openExperience,
  setOpenExperience,
}: {
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
    },
  };
  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
  const { register, handleSubmit } = useForm<{
    workEx: Omit<workExType, "_id">;
  }>({
    defaultValues: defaultWorkValue,
  });
  const onSubmit: SubmitHandler<{ workEx: Omit<workExType, "_id"> }> = async (
    data
  ) => {
    try {
      const response = await updateUser(data);
      if (response.data?.success) {
        toast.success(response.data?.message);
        setOpenExperience(false);
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
        </Stack>
      </EditDialog>
    </>
  );
};
