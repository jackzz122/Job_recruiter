import { EditDialog } from "../../../components/EditDialog";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { certificateType } from "../../../../../../types/UserType";
import { useUpdateUserInfoMutation } from "../../../../../../redux/feature/user/userApiSlice";
import { handleError } from "../../../../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
export const DialogCerti = ({
  openCertificates,
  setOpenCertificates,
}: {
  openCertificates: boolean;
  setOpenCertificates: (check: boolean) => void;
}) => {
  const defaultValue = {
    certificate: {
      name: "",
      month: 0,
      organization: "",
      year: 0,
    },
  };
  const listOfMonth = [...Array(12)].map((_, i) => i + 0);
  const listOfYear = [...Array(new Date().getFullYear() - 2000)].map(
    (_, i) => i + 0
  );
  const { register, handleSubmit, control, reset } = useForm<{
    certificate: certificateType;
  }>({
    defaultValues: defaultValue,
  });
  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
  const onSubmit: SubmitHandler<{ certificate: certificateType }> = async (
    data
  ) => {
    try {
      const response = await updateUser(data);
      if (response.data?.success) {
        toast.success(response.data?.message);
        setOpenCertificates(false);
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
        submit={handleSubmit(onSubmit)}
        loading={isLoading}
        open={openCertificates}
        onClose={() => setOpenCertificates(false)}
        title="Edit Certificates"
      >
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Certificate Name"
            {...register("certificate.name")}
            fullWidth
          />
          <TextField
            label="Issuing Organization"
            {...register("certificate.organization")}
            fullWidth
          />
          <Controller
            name="certificate.month"
            control={control}
            render={({ field }) => {
              return (
                <>
                  <select
                    {...field}
                    className="border p-3 border-gray-400 rounded-md"
                  >
                    <option value="" hidden>
                      Choose month
                    </option>
                    {listOfMonth.map((month, index) => {
                      return (
                        <option key={index} value={month + 1}>
                          Tháng {month + 1}
                        </option>
                      );
                    })}
                  </select>
                </>
              );
            }}
          />
          <Controller
            name="certificate.year"
            control={control}
            render={({ field }) => {
              const baseYear =
                Math.floor(new Date().getFullYear() / 1000) * 1000;
              return (
                <>
                  <select
                    {...field}
                    className="border p-3 border-gray-400 rounded-md"
                  >
                    <option value="" hidden>
                      Choose month
                    </option>
                    {listOfYear.map((year, index) => {
                      return (
                        <option key={index} value={year + baseYear}>
                          Năm {year + baseYear}
                        </option>
                      );
                    })}
                  </select>
                </>
              );
            }}
          />
        </Stack>
      </EditDialog>
    </>
  );
};
