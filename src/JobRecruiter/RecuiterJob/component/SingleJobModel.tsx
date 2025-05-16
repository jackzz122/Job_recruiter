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
import { JobResponse, statusJob } from "../../../types/JobType";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { DialogDeleteJob } from "./DialogJob/DialogDeleteJob";
import { DialogViewJob } from "./DialogJob/DialogViewJob";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
import { RoleName } from "../../../types/UserType";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import BlockIcon from "@mui/icons-material/Block";
import { useChangeStatusMutation } from "../../../redux/feature/job/jobApiSlice";
import { toast } from "react-toastify";

export const SingleJobModel = ({ jobs }: { jobs: JobResponse }) => {
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [status, setStatus] = useState<statusJob>(jobs.status);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const recruiter = useSelector(selectUser);
  const poster_id = jobs.accountId._id;
  const [changeStatus, { isLoading }] = useChangeStatusMutation();
  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = async (
    newStatus: statusJob.OnGoing | statusJob.Stop | statusJob.Close
  ) => {
    const response = await changeStatus({
      id: jobs._id,
      status: newStatus,
    }).unwrap();
    if (response?.success) {
      toast.success(response?.message);
      handleStatusClose();
      setStatus(newStatus);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case statusJob.OnGoing:
        return <PlayCircleOutlineIcon color="success" />;
      case statusJob.Stop:
        return <StopCircleOutlinedIcon color="error" />;
      case statusJob.Close:
        return <BlockIcon color="action" />;
      default:
        return <PlayCircleOutlineIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case statusJob.OnGoing:
        return "success";
      case statusJob.Stop:
        return "error";
      case statusJob.Close:
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="Change Status">
              <IconButton
                onClick={handleStatusClick}
                disabled={
                  poster_id !== recruiter?._id &&
                  recruiter?.role !== RoleName.RECRUIT
                }
                size="small"
              >
                {getStatusIcon(status)}
              </IconButton>
            </Tooltip>
            <Chip
              label={status}
              color={getStatusColor(status)}
              size="small"
              sx={{ textTransform: "capitalize" }}
            />
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleStatusClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            disabled={isLoading}
            onClick={() => handleStatusChange(statusJob.OnGoing)}
          >
            <ListItemIcon>
              <PlayCircleOutlineIcon color="success" />
            </ListItemIcon>
            <ListItemText>OnGoing</ListItemText>
          </MenuItem>
          <MenuItem
            disabled={isLoading}
            onClick={() => handleStatusChange(statusJob.Stop)}
          >
            <ListItemIcon>
              <StopCircleOutlinedIcon color="error" />
            </ListItemIcon>
            <ListItemText>Stop</ListItemText>
          </MenuItem>
          <MenuItem
            disabled={isLoading}
            onClick={() => handleStatusChange(statusJob.Close)}
          >
            <ListItemIcon>
              <BlockIcon color="action" />
            </ListItemIcon>
            <ListItemText>Close</ListItemText>
          </MenuItem>
        </Menu>

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
            <span>
              <IconButton
                disabled={
                  poster_id !== recruiter?._id &&
                  recruiter?.role !== RoleName.RECRUIT
                }
                onClick={() =>
                  navigate(`/recruiter/job_management/${jobs._id}/update`)
                }
                size="small"
              >
                <Edit fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete">
            <span>
              <IconButton
                disabled={
                  poster_id !== recruiter?._id &&
                  recruiter?.role !== RoleName.RECRUIT
                }
                size="small"
                color="error"
                onClick={() => setOpenDeleteDialog(true)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </span>
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
