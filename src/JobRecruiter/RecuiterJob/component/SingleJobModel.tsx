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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useDeleteJobMutation } from "../../../redux/feature/job/jobApiSlice";
import { toast } from "react-toastify";

export const SingleJobModel = ({ jobs }: { jobs: JobResponse }) => {
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

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

  const handleDeleteJob = async () => {
    try {
      await deleteJob(jobs._id).unwrap();
      toast.success("Job deleted successfully");
      setOpenDeleteDialog(false);
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
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
            <IconButton size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
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
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{jobs.title}</Typography>
            <Chip
              label={jobs.status}
              color={getStatusColor(jobs.status)}
              size="small"
              sx={{ textTransform: "capitalize" }}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Basic Information */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn fontSize="small" color="action" />
                <Typography variant="body1">{jobs.location}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarToday fontSize="small" color="action" />
                <Typography variant="body1">
                  Posted: {new Date(jobs.startDate).toLocaleDateString()} •
                  Deadline:{" "}
                  {new Date(jobs.applicationDeadline).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Group fontSize="small" color="action" />
                <Typography variant="body1">
                  {jobs.sizingPeople} applicants
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AttachMoneyIcon sx={{ color: "green" }} />
                <Typography
                  sx={{ color: "green", fontWeight: "bold" }}
                  variant="body1"
                >
                  Min: {jobs.minRange}$ • Max: {jobs.maxRange}$
                </Typography>
              </Box>
            </Box>

            {/* Description */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Job Summary
              </Typography>
              <Typography variant="body1">
                {jobs.description.summary}
              </Typography>
            </Box>

            {/* Key Skills */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Key Skills
              </Typography>
              {/* <Typography variant="body1">
                {jobs.description.keySkills.mainText}
              </Typography> */}
              {/* <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                {jobs.description.keySkills.bulletPoints.map((point, index) => (
                  <Typography component="li" key={index} variant="body1">
                    {point.value}
                  </Typography>
                ))}
              </Box> */}
            </Box>

            {/* Why You'll Love It */}
            {/* <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Why You'll Love It
              </Typography>
              <Typography variant="body1">
                {jobs.description.whyYouLoveIt.mainText}
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                {jobs.description.whyYouLoveIt.bulletPoints.map(
                  (point, index) => (
                    <Typography component="li" key={index} variant="body1">
                      {point.value}
                    </Typography>
                  )
                )}
              </Box>
            </Box> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Job</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 300 }}>
            <Typography>
              Are you sure you want to delete the job "{jobs.title}"? This
              action cannot be undone.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteJob}
            color="error"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
