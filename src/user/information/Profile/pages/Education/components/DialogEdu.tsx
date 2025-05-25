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
import { useEffect } from "react";

type DialogEduProps = {
  openEducation: boolean;
  setOpenEducation: (check: boolean) => void;
  currentEducation?: educationType;
};

export const DialogEdu = ({
  openEducation,
  setOpenEducation,
  currentEducation,
}: DialogEduProps) => {
  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();

  const defaultEducationValue: { education: Omit<educationType, "_id"> } = {
    education: {
      major: "",
      school: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  };

  const { register, handleSubmit, reset, setValue } = useForm<{
    education: Omit<educationType, "_id">;
  }>({
    defaultValues: defaultEducationValue,
  });

  // Update form values when editing an existing education item
  useEffect(() => {
    if (currentEducation) {
      setValue("education.major", currentEducation.major);
      setValue("education.school", currentEducation.school);
      setValue("education.startDate", currentEducation.startDate);
      setValue("education.endDate", currentEducation.endDate);
      setValue("education.description", currentEducation.description);
    } else {
      reset(defaultEducationValue);
    }
  }, [currentEducation, setValue, reset]);

  const onsubmit: SubmitHandler<{
    education: Omit<educationType, "_id">;
  }> = async (data) => {
    try {
      if (currentEducation) {
        const response = await updateUser({
          education: {
            ...data.education,
            _id: currentEducation._id,
          } as educationType,
        });
        if (response.data?.success) {
          toast.success(response.data?.message || "Update success");
          setOpenEducation(false);
          reset();
        }
      } else {
        const response = await updateUser(data);
        if (response.data?.success) {
          toast.success(response.data?.message || "Update success");
          setOpenEducation(false);
          reset();
        }
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Update failed");
    }
  };

  const dialogTitle = currentEducation ? "Edit Education" : "Add Education";

  return (
    <>
      <EditDialog
        open={openEducation}
        onClose={() => {
          setOpenEducation(false);
          reset();
        }}
        submit={handleSubmit(onsubmit)}
        loading={isLoading}
        title={dialogTitle}
      >
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField label="Major" {...register("education.major")} fullWidth />
          <TextField
            label="School"
            {...register("education.school")}
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
          <TextField
            label="Description"
            {...register("education.description")}
            fullWidth
          />
        </Stack>
      </EditDialog>
    </>
  );
};
