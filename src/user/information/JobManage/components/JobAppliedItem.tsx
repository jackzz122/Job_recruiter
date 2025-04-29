import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { JobResponse, statusApplication } from "../../../../types/JobType";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CompanyType } from "../../../../types/CompanyType";

export const JobAppliedItem = ({
  userId,
  job,
}: {
  userId: string;
  job: JobResponse;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case statusApplication.Submitted:
        return "#3498db";
      case statusApplication.Reviewing:
        return "#f39c12";
      case statusApplication.Rejected:
        return "#e74c3c";
      case statusApplication.Success:
        return "green";
      default:
        return "#7f8c8d";
    }
  };
  const index =
    job.listAccount?.findIndex((account) => {
      return account.accountId === userId;
    }) ?? -1;
  const applicationStatus =
    (index !== undefined && index !== -1 && job.listAccount?.[index]?.status) ||
    statusApplication.Submitted;
  const applicationDate =
    index !== undefined && index !== -1 && job.listAccount?.[index]?.appliedAt
      ? new Date(job.listAccount?.[index]?.appliedAt)
      : new Date();

  const handleViewResume = (index: number) => {
    const resumeLink = job.listAccount?.[index]?.linkPdf;
    if (resumeLink) {
      window.open(resumeLink, "_blank");
    }
  };

  return (
    <Stack
      sx={{ backgroundColor: "white" }}
      direction="row"
      padding={2}
      spacing={2}
      marginBottom={2}
      borderRadius={4}
      justifyContent="space-between"
    >
      <Link to={`/job/${job._id}`}>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
          className="information jobs"
        >
          <Box>
            <img
              src={(job.companyId as CompanyType).logo}
              alt={(job.companyId as CompanyType).companyName}
              className="w-20 h-20 rounded-2xl border border-gray-300"
              onError={(e) => {
                e.currentTarget.src = "/bss_avatar.png";
              }}
            />
          </Box>
          <Box>
            <Typography fontWeight="bold" marginBottom={1}>
              {job.title}
            </Typography>
            <Typography variant="body2">
              {(job.companyId as CompanyType).companyName}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              marginTop={0.5}
            >
              <LocationOnIcon
                fontSize="small"
                sx={{ color: "gray", fontSize: 16 }}
              />
              <Typography
                variant="caption"
                sx={{ color: "gray" }}
                fontStyle="italic"
              >
                {job.location}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: "green", marginTop: 0.5 }}
            >
              ${job.minRange} - {job.maxRange}
            </Typography>
          </Box>
        </Stack>
      </Link>
      <Box className="Application_Status">
        <Stack direction="column" alignItems="flex-end" spacing={1}>
          <Chip
            label={applicationStatus}
            sx={{
              backgroundColor: getStatusColor(applicationStatus),
              color: "white",
              fontWeight: "bold",
              minWidth: "100px",
              mb: 1,
            }}
          />

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CalendarTodayIcon sx={{ fontSize: 14, color: "gray" }} />
            <Typography variant="caption" sx={{ color: "gray" }}>
              Applied{" "}
              {formatDistanceToNow(applicationDate, {
                addSuffix: true,
                locale: vi,
              })}
            </Typography>
          </Stack>

          <Typography variant="body2" sx={{ color: "orange", mt: 1 }}>
            {differenceInDays(new Date(job.applicationDeadline), new Date()) > 0
              ? `(${differenceInDays(
                  new Date(job.applicationDeadline),
                  new Date()
                )} days left)`
              : "(Deadline passed)"}
          </Typography>

          <Stack direction="row" spacing={1} marginTop={1}>
            <Button
              component={Link}
              to={`/job/${job._id}`}
              variant="outlined"
              size="small"
              startIcon={<VisibilityIcon />}
              sx={{ minWidth: "100px" }}
            >
              View
            </Button>
            {index !== undefined &&
              index !== -1 &&
              job.listAccount?.[index]?.linkPdf && (
                <IconButton
                  onClick={() => handleViewResume(index)}
                  size="small"
                  sx={{
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: "4px",
                  }}
                >
                  <PictureAsPdfIcon />
                </IconButton>
              )}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
