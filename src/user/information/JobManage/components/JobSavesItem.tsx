import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { JobSaveResponse } from "../../../../types/UserType";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import { vi } from "date-fns/locale";
import { useRemoveFavouriteJobMutation } from "../../../../redux/feature/user/userApiSlice";
import { handleError } from "../../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
export const JobSavesItem = ({ job }: { job: JobSaveResponse }) => {
  const [removeFavouriteJob, { isLoading }] = useRemoveFavouriteJobMutation();
  const navigate = useNavigate();
  const handleRemoveFavouriteJob = async () => {
    try {
      const response = await removeFavouriteJob(job._id);
      if (response.data?.success) {
        toast.success(response.data.message);
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Remove failed");
    }
  };
  return (
    <>
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
                src={job.companyId.logo || "/companyNotFound.png"}
                alt=""
                className="w-20 h-20 rounded-2xl border border-gray-300"
              />
            </Box>
            <Box>
              <Typography fontWeight="bold" marginBottom={1}>
                {job.title}
              </Typography>
              <Typography variant="body2">
                {job.companyId.companyName}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "gray" }}
                fontStyle="italic"
              >
                {job.location}
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ color: "green" }}
              >
                ${job.minRange} - {job.maxRange}
              </Typography>
            </Box>
          </Stack>
        </Link>
        <Box className="Date_Applied">
          <Typography variant="body2" marginBottom={1}>
            Posted{" "}
            {formatDistanceToNow(new Date(job.startDate), {
              addSuffix: true,
              locale: vi,
            })}
          </Typography>
          <Typography variant="body2" sx={{ color: "orange", marginBottom: 2 }}>
            ({differenceInDays(new Date(job.applicationDeadline), new Date())}{" "}
            days left)
          </Typography>
          <Stack direction="row">
            <Button
              onClick={() => navigate(`/job/${job._id}`)}
              sx={{ minWidth: "100px", color: "red", border: "1px solid red" }}
              variant="outlined"
            >
              Apply
            </Button>
            <IconButton loading={isLoading} onClick={handleRemoveFavouriteJob}>
              <FavoriteIcon sx={{ color: "red" }} />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
