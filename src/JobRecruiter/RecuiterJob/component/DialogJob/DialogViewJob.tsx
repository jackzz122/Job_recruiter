import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import LocationOn from "@mui/icons-material/LocationOn";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Group from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { JobResponse } from "../../../../types/JobType";
import CircleIcon from "@mui/icons-material/Circle";
import { colorButtonOrange } from "../../../../themeContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PersonIcon from "@mui/icons-material/Person";
interface DialogViewJobProps {
  open: boolean;
  handleClose: () => void;
  job: JobResponse;
}

export const DialogViewJob = ({
  open,
  handleClose,
  job,
}: DialogViewJobProps) => {
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
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{job.title}</Typography>
          <Chip
            label={job.status}
            color={getStatusColor(job.status)}
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
              <PersonIcon fontSize="small" color="action" />
              <Typography fontWeight="bold" variant="body1">
                Poster:{" "}
                {(job.accountId as { _id: string; fullname: string }).fullname}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body1">{job.location}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarToday fontSize="small" color="action" />
              <Typography variant="body1">
                Posted: {new Date(job.startDate).toLocaleDateString()} •
                Deadline:{" "}
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Group fontSize="small" color="action" />
              <Typography variant="body1">
                {job.sizingPeople} applicants
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AttachMoneyIcon sx={{ color: "green" }} />
              <Typography
                sx={{ color: "green", fontWeight: "bold" }}
                variant="body1"
              >
                Min: {job.minRange}$ • Max: {job.maxRange}$
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 1, color: colorButtonOrange }}
            >
              <PlayArrowIcon sx={{ fontSize: 16 }} /> Job Summary
            </Typography>
            <Typography variant="body1">{job.description.summary}</Typography>
          </Box>

          {/* Key Skills */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 1, color: colorButtonOrange }}
            >
              <PlayArrowIcon sx={{ fontSize: 16 }} /> Key Skills
            </Typography>
            <Typography variant="body1">
              {job.description.keySkills.mainText}
            </Typography>
            <Box component="ul" sx={{ pl: 2, mt: 1 }}>
              {job.description.keySkills.bulletPoints.map((point, index) => (
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  component="li"
                  key={index}
                  variant="body1"
                >
                  <CircleIcon sx={{ fontSize: 9, color: colorButtonOrange }} />{" "}
                  {point.value}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Why You'll Love It */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 1, color: colorButtonOrange }}
            >
              <PlayArrowIcon sx={{ fontSize: 16 }} /> Why You'll Love It
            </Typography>
            <Typography variant="body1">
              {job.description.whyYouLoveIt.mainText}
            </Typography>
            <Box component="ul" sx={{ pl: 2, mt: 1 }}>
              {job.description.whyYouLoveIt.bulletPoints.map((point, index) => (
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  component="li"
                  key={index}
                  variant="body1"
                >
                  <CircleIcon sx={{ fontSize: 9, color: colorButtonOrange }} />{" "}
                  {point.value}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography sx={{ color: colorButtonOrange }} fontWeight="bold">
              Số lượng người ứng tuyển: {job.listAccount?.length}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
