import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { EditDialog } from "../../../components/EditDialog";
import { educationType } from "../../../../../../types/UserType";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handleError } from "../../../../../../helper/HandleError/handleError";
import { useUpdateUserInfoMutation } from "../../../../../../redux/feature/user/userApiSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export const DialogEdu = ({
  openEducation,
  setOpenEducation,
}: {
  openEducation: boolean;
  setOpenEducation: (check: boolean) => void;
}) => {
  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
  const educationValue: { education: Omit<educationType, "_id"> } = {
    education: {
      major: "",
      school: "",
      startDate: "",
      endDate: "",
    },
  };
  const { register, handleSubmit, reset } = useForm<{
    education: Omit<educationType, "_id">;
  }>({
    defaultValues: educationValue,
  });
  const onsubmit: SubmitHandler<{
    education: Omit<educationType, "_id">;
  }> = async (data) => {
    try {
      const response = await updateUser(data);
      if (response.data?.success) {
        toast.success(response.data?.message);
        setOpenEducation(false);
        reset();
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };
  return (
    <>
      <EditDialog
        open={openEducation}
        onClose={() => setOpenEducation(false)}
        submit={handleSubmit(onsubmit)}
        loading={isLoading}
        title="Edit Education"
      >
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Major"
            defaultValue="Công nghệ thông tin"
            {...register("education.major")}
            fullWidth
          />
          <TextField
            label="School"
            {...register("education.school")}
            defaultValue="Đại học Kinh Tế Quốc Dân"
            fullWidth
          />
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Enter the date of your education (Start date and End Date)
            </Typography>
            <input
              {...register("education.startDate")}
              className="border border-gray-300 p-4 mr-2"
              type="date"
            />
            <input
              {...register("education.endDate")}
              className="border border-gray-300 p-4"
              type="date"
            />
          </Box>
        </Stack>
      </EditDialog>
    </>
  );
};
