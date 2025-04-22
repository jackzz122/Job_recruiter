import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";
import { DialogProject } from "./components/DialogProject";
import { projectType } from "../../../../../types/UserType";
import { ProjectItem } from "./components/ProjectItem";
export const PersonalProject = ({ projects }: { projects: projectType[] }) => {
  const [openProjects, setOpenProjects] = useState(false);
  return (
    <>
      <Paper sx={{ p: 3, position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", right: 8, top: 8 }}
          onClick={() => setOpenProjects(true)}
        >
          {projects.length === 0 ? (
            <EditIcon />
          ) : (
            <AddCircleOutlineRoundedIcon />
          )}
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <LinkIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Personal Projects
          </Typography>
        </Box>
        <Stack spacing={3}>
          {projects.length === 0 ? (
            <p>........</p>
          ) : (
            projects.map((project) => {
              return <ProjectItem key={project._id} {...project} />;
            })
          )}
        </Stack>
      </Paper>
      <DialogProject
        openProjects={openProjects}
        setOpenProjects={setOpenProjects}
      />
    </>
  );
};
