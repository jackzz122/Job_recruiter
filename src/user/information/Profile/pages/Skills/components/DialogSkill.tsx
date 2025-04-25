import { EditDialog } from "../../../components/EditDialog";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useGetMajorbyNameQuery } from "../../../../../../redux/feature/major/majorApiSlice";
import { skillType } from "../../../../../../types/UserType";
import { handleError } from "../../../../../../helper/HandleError/handleError";
import { useUpdateUserInfoMutation } from "../../../../../../redux/feature/user/userApiSlice";
import { toast } from "react-toastify";
import { FormHelperText } from "@mui/material";

export const DialogSkill = ({
  UserlistSkill,
  openSkills,
  setOpenSkills,
}: {
  UserlistSkill: skillType[];
  openSkills: boolean;
  setOpenSkills: (check: boolean) => void;
}) => {
  const defaultSkill = {
    skills: {
      value: "",
    },
  };
  const methods = useForm<{ skills: Omit<skillType, "_id"> }>({
    defaultValues: defaultSkill,
  });
  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
  const { data: listSkill } = useGetMajorbyNameQuery();
  const { handleSubmit, control, reset } = methods;

  const onSubmit: SubmitHandler<{ skills: Omit<skillType, "_id"> }> = async (
    data
  ) => {
    try {
      const response = await updateUser(data);
      if (response?.data?.success) {
        toast.success(response?.data.message);
        setOpenSkills(false);
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
        open={openSkills}
        onClose={() => setOpenSkills(false)}
        title="Edit Skills"
      >
        <Controller
          name="skills.value"
          defaultValue=""
          control={control}
          render={({ field }) => {
            return (
              <>
                <Select
                  fullWidth
                  {...field}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>Choose a skill</em>;
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Choose a skill</em>
                  </MenuItem>
                  {listSkill?.data?.map((skill, index) => {
                    const isSkillAlreadyChosen = UserlistSkill.some(
                      (userSkill) => userSkill.value === skill
                    );

                    return (
                      <MenuItem
                        value={skill}
                        key={index}
                        disabled={isSkillAlreadyChosen}
                      >
                        {skill}
                        {isSkillAlreadyChosen && " (Already added)"}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Select a skill from the list</FormHelperText>
              </>
            );
          }}
        />
      </EditDialog>
    </>
  );
};
