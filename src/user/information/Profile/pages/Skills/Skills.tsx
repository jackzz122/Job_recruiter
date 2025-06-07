import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import { skillType } from "../../../../../types/UserType";
import { DialogSkill } from "./components/DialogSkill";
import { useState } from "react";
import { handleError } from "../../../../../helper/HandleError/handleError";
import { useUpdateUserInfoMutation } from "../../../../../redux/feature/user/userApiSlice";
import { toast } from "react-toastify";
import DrawIcon from "@mui/icons-material/Draw";
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
      toast.error(error?.message || "Delete failed");
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
        <Typography
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          <DrawIcon sx={{ color: "blue" }} />
          Skills
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {skills.length === 0 ? (
            <Typography
              variant="body1"
              color="text.secondary"
              fontStyle="italic"
              gutterBottom
            >
              Not found skills
            </Typography>
          ) : (
            skills.map((skill) => (
              <Chip
                key={skill._id}
                onDelete={() => handleDelete(skill._id)}
                label={skill.value}
                sx={{
                  minWidth: "20px",
                  justifyContent: "center",

                  ".MuiChip-deleteIcon": {
                    opacity: 0,
                    width: 0,
                    transition: "opacity 0.3s, width 0.3s, margin-left 0.3s",
                  },

                  "&:hover": {
                    justifyContent: "space-between",
                  },
                  "&:hover .MuiChip-deleteIcon": {
                    opacity: 1,
                    width: "auto",
                    marginLeft: "1px",
                  },
                }}
                color="success"
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
