import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { EditDialog } from "../../components/EditDialog";
import { skillType } from "../../../../../types/UserType";
export const Skills = ({ skills }: { skills: skillType[] }) => {
  const [openSkills, setOpenSkills] = useState(false);
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
          {["React", "TypeScript", "JavaScript", "HTML", "CSS"].map((skill) => (
            <Chip key={skill} label={skill} />
          ))}
        </Box>
      </Paper>
      <EditDialog
        open={openSkills}
        onClose={() => setOpenSkills(false)}
        title="Edit Skills"
      >
        <TextField
          label="Skills (comma-separated)"
          defaultValue="React, TypeScript, JavaScript, HTML, CSS"
          fullWidth
          sx={{ mt: 2 }}
        />
      </EditDialog>
    </>
  );
};
