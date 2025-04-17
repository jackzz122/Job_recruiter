import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import LocationOn from "@mui/icons-material/LocationOn";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Group from "@mui/icons-material/Group";
import { JobResponse } from "../../../types/JobType";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { DialogDeleteJob } from "./DialogJob/DialogDeleteJob";
import { DialogViewJob } from "./DialogJob/DialogViewJob";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
export const SingleJobModel = ({ jobs }: { jobs: JobResponse }) => {
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const recruiter = useSelector(selectUser);
  const poster_id = jobs.accountId._id;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "OnGoing":
        return "success";
      case "Stop":
        return "error";
      case "Close":
        return "default";
      default:
        return "primary";
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          backgroundColor: "white",
          "&:hover": {
            boxShadow: 2,
            borderColor: "primary.main",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {jobs.title}
          </Typography>
          <Chip
            label={jobs.status}
            color={getStatusColor(jobs.status)}
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonIcon fontSize="small" color="action" />
            <Typography variant="body2">
              Poster: {jobs.accountId.fullname}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2">{jobs.location}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarToday fontSize="small" color="action" />
            <Typography variant="body2">
              Posted: {new Date(jobs.startDate).toLocaleDateString()} •
              Deadline:{" "}
              {new Date(jobs.applicationDeadline).toLocaleDateString()}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Group fontSize="small" color="action" />
            <Typography variant="body2">
              {jobs.sizingPeople} applicants
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AttachMoneyIcon sx={{ color: "green" }} />
            <Typography
              sx={{ color: "green", fontWeight: "bold" }}
              variant="body2"
            >
              Min: {jobs.minRange}$ • Max: {jobs.maxRange}$
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => setOpenViewDialog(true)}>
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              disabled={poster_id !== recruiter?._id}
              onClick={() =>
                navigate(`/recruiter/job_management/${jobs._id}/update`)
              }
              size="small"
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              disabled={poster_id !== recruiter?._id}
              size="small"
              color="error"
              onClick={() => setOpenDeleteDialog(true)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* View Dialog */}
      <DialogViewJob
        job={jobs}
        open={openViewDialog}
        handleClose={() => setOpenViewDialog(false)}
      />
      {/* Delete Dialog */}
      <DialogDeleteJob
        id={jobs._id}
        open={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        title={jobs.title}
      />
    </>
  );
};
