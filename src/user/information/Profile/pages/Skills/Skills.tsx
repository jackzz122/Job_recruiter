import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { skillType } from "../../../../../types/UserType";
import { DialogSkill } from "./components/DialogSkill";
import { useState } from "react";
import { handleError } from "../../../../../helper/HandleError/handleError";
import { useUpdateUserInfoMutation } from "../../../../../redux/feature/user/userApiSlice";
import { toast } from "react-toastify";
export const Skills = ({ skills }: { skills: skillType[] }) => {
  const [openSkills, setOpenSkills] = useState(false);
  const [updateUser] = useUpdateUserInfoMutation();
  const handleDelete = async (id: string) => {
    try {
      const response = await updateUser({
        skills: {
          _id: id,
        },
      });
      if (response.data?.success) {
        toast.success(response.data?.message);
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };
  return (
    <>
      <Paper sx={{ p: 3, position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", right: 8, top: 8 }}
          onClick={() => setOpenSkills(true)}
        >
          <EditIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Skills
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {skills.length === 0 ? (
            <p>Not found any skills</p>
          ) : (
            skills.map((skill) => (
              <Chip
                key={skill._id}
                onDelete={() => handleDelete(skill._id)}
                label={skill.value}
                color="success"
                deleteIcon={<DeleteIcon />}
              />
            ))
          )}
        </Box>
      </Paper>
      <DialogSkill
        UserlistSkill={skills}
        openSkills={openSkills}
        setOpenSkills={setOpenSkills}
      />
    </>
  );
};
