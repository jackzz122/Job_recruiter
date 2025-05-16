import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid2 from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocationIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import MoneyIcon from "@mui/icons-material/Money";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { JobResponse } from "../../../../types/JobType";
import { CompanyType } from "../../../../types/CompanyType";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/feature/user/userSlice";
import { useEffect, useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { JobSaveResponse } from "../../../../types/UserType";
import {
  useAddFavouriteJobMutation,
  useRemoveFavouriteJobMutation,
} from "../../../../redux/feature/user/userApiSlice";
import { handleError } from "../../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const CardJob = ({ job }: { job: JobResponse }) => {
  const company = job.companyId as CompanyType;
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [isSaved, setIsSaved] = useState(false);
  const [addFavouriteJob, { isLoading: isAdding }] =
    useAddFavouriteJobMutation();
  const [removeFavouriteJob, { isLoading: isRemoving }] =
    useRemoveFavouriteJobMutation();
  useEffect(() => {
    if (user) {
      const checkSaved = (
        user?.listFavouritesJobsID as JobSaveResponse[]
      )?.some((singleJob) => singleJob._id === job._id);
      setIsSaved(checkSaved);
    }
  }, [user]);
  const handleSaveJob = async () => {
    try {
      const response = await addFavouriteJob(job._id).unwrap();
      if (response.success) {
        toast.success(response.message);
        setIsSaved(true);
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };
  const handleRemoveJob = async () => {
    try {
      const response = await removeFavouriteJob(job._id).unwrap();
      if (response.success) {
        toast.success(response.message);
        setIsSaved(false);
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };
  return (
    <Card
      key={job._id}
      variant="outlined"
      sx={{ "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}
    >
      <CardContent>
        <Grid2 container>
          {/* Company Logo */}
          <Grid2
            size={{ xs: 12, md: 1.5, sm: 2 }}
            sx={{ pr: 2, display: "flex", alignItems: "center" }}
          >
            <Avatar
              src={company.logo}
              alt={`${company.companyName} logo`}
              variant="rounded"
              sx={{ flexGrow: 1 }}
            />
          </Grid2>

          {/* Job Details */}
          <Grid2 size={{ xs: 12, md: 10.5, sm: 10 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography variant="h6" component="h2" fontWeight="bold">
                  {job.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  {company.companyName}
                </Typography>
              </Box>
              <IconButton
                loading={isAdding || isRemoving}
                aria-label="Save job"
                onClick={isSaved ? handleRemoveJob : handleSaveJob}
              >
                {isSaved ? (
                  <BookmarkIcon sx={{ color: "orange" }} />
                ) : (
                  <BookmarkBorderIcon sx={{ color: "orange" }} />
                )}
              </IconButton>
            </Box>

            <Typography variant="body2" marginBottom={2}>
              {job.description.summary}
            </Typography>

            {/* Job Metadata */}
            <Grid2 container spacing={2} sx={{ mb: 2 }}>
              <Grid2 size={{ sm: 4, md: 3, lg: 2, xs: 6 }}>
                <Box display="flex" alignItems="center">
                  <LocationIcon
                    fontSize="small"
                    color="action"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {job.location}
                  </Typography>
                </Box>
              </Grid2>

              <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                <Box display="flex" alignItems="center">
                  <WorkIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {job.experience}+ years
                  </Typography>
                </Box>
              </Grid2>

              <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                <Box display="flex" alignItems="center">
                  <MoneyIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    ${job.minRange.toLocaleString()} - $
                    {job.maxRange.toLocaleString()}
                  </Typography>
                </Box>
              </Grid2>

              <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                <Box display="flex" alignItems="center">
                  <CalendarIcon
                    fontSize="small"
                    color="action"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Deadline:{" "}
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid2>

              <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                <Box display="flex" alignItems="center">
                  <PeopleIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Hiring {job.sizingPeople} people
                  </Typography>
                </Box>
              </Grid2>
            </Grid2>

            {/* Skills/Majors */}
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              {job.majorId.map((major, index) => (
                <Chip
                  key={index}
                  label={major.value}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>

            {/* Apply Button */}
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={() => navigate(`/job/${job._id}`)}
                variant="contained"
                color="primary"
              >
                View Details
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};
