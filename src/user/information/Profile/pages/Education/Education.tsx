import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import { educationType } from "../../../../../types/UserType";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { EducationItem } from "./components/EducationItem";
import { DialogEdu } from "./components/DialogEdu";

export const Education = ({
  educationList,
}: {
  educationList: educationType[];
}) => {
  const [openEducation, setOpenEducation] = useState(false);

  return (
    <>
      <Paper sx={{ p: 3, position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", right: 8, top: 8 }}
          onClick={() => setOpenEducation(true)}
        >
          {educationList.length === 0 ? (
            <EditIcon />
          ) : (
            <AddCircleOutlineRoundedIcon />
          )}
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <SchoolIcon color="primary" />
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Education
          </Typography>
        </Box>
        {educationList.map((edu) => {
          return <EducationItem key={edu._id} {...edu} />;
        })}
      </Paper>
      <DialogEdu
        openEducation={openEducation}
        setOpenEducation={setOpenEducation}
      />
    </>
  );
};
