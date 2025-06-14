import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import { DialogWorkEx } from "./components/DialogWorkEx";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { workExType } from "../../../../../types/UserType";
import { WorkExItem } from "./components/WorkExItem";
export const WorkExp = ({ workEx }: { workEx: workExType[] }) => {
  const [openExperience, setOpenExperience] = useState(false);
  const [currenEx, setCurrentEx] = useState<workExType>();
  const handleEditEx = (id: string) => {
    const findEx = workEx.find((work) => work._id === id);
    if (findEx) {
      setCurrentEx(findEx);
      setOpenExperience(true);
    }
  };
  return (
    <>
      <Paper sx={{ p: 3, position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", right: 8, top: 8 }}
          onClick={() => setOpenExperience(true)}
        >
          {workEx.length === 0 ? <EditIcon /> : <AddCircleOutlineRoundedIcon />}
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <WorkIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Work Experience
          </Typography>
        </Box>
        <Stack spacing={3}>
          {workEx.length === 0 ? (
            <Typography
              variant="body1"
              color="text.secondary"
              fontStyle="italic"
              gutterBottom
            >
              Not found work experience
            </Typography>
          ) : (
            workEx.map((work) => {
              return (
                <WorkExItem
                  key={work._id}
                  {...work}
                  handleEdit={handleEditEx}
                />
              );
            })
          )}
        </Stack>
      </Paper>
      <DialogWorkEx
        currentEx={currenEx}
        openExperience={openExperience}
        setOpenExperience={setOpenExperience}
      />
    </>
  );
};
