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
  const [currentEducation, setCurrentEducation] = useState<
    educationType | undefined
  >(undefined);

  const handleAddEducation = () => {
    setCurrentEducation(undefined);
    setOpenEducation(true);
  };

  const handleEditEducation = (id: string) => {
    const educationToEdit = educationList.find((edu) => edu._id === id);
    if (educationToEdit) {
      setCurrentEducation(educationToEdit);
      setOpenEducation(true);
    }
  };

  return (
    <>
      <Paper sx={{ p: 3, position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", right: 8, top: 8 }}
          onClick={handleAddEducation}
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
        {educationList.length > 0 ? (
          educationList.map((edu, index) => {
            return (
              <EducationItem
                key={index}
                {...edu}
                onEdit={handleEditEducation}
              />
            );
          })
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            fontStyle="italic"
            gutterBottom
          >
            Not found education
          </Typography>
        )}
      </Paper>
      <DialogEdu
        openEducation={openEducation}
        setOpenEducation={setOpenEducation}
        currentEducation={currentEducation}
      />
    </>
  );
};
