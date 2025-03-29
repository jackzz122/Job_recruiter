import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import LocationOn from "@mui/icons-material/LocationOn";
import Business from "@mui/icons-material/Business";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Group from "@mui/icons-material/Group";
interface JobProps {
  title: string;
  department: string;
  location: string;
  postedDate: string;
  deadline: string;
  status: string;
  applicants: number;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const SingleJobModel = ({
  title,
  department,
  location,
  postedDate,
  deadline,
  status,
  applicants,
  onView,
  onEdit,
  onDelete,
}: JobProps) => {
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
          {title}
        </Typography>
        <Chip
          label={status}
          color={getStatusColor(status)}
          size="small"
          sx={{ textTransform: "capitalize" }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Business fontSize="small" color="action" />
          <Typography variant="body2">{department}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2">{location}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarToday fontSize="small" color="action" />
          <Typography variant="body2">
            Posted: {postedDate} • Deadline: {deadline}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Group fontSize="small" color="action" />
          <Typography variant="body2">{applicants} applicants</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Tooltip title="View Details">
          <IconButton size="small" onClick={onView}>
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton size="small" onClick={onEdit}>
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" color="error" onClick={onDelete}>
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
