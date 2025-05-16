import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useGetJobByIdQuery } from "../../../redux/feature/job/jobApiSlice";
import {
  useAddFavouriteJobMutation,
  useRemoveFavouriteJobMutation,
} from "../../../redux/feature/user/userApiSlice";
import Divider from "@mui/material/Divider";
import { selectUser } from "../../../redux/feature/user/userSlice";
import { handleError } from "../../../helper/HandleError/handleError";
import { JobSaveResponse } from "../../../types/UserType";
import { ListOfRequirement } from "../../component/lists/ListOfRequirement";
import { DialogApplication } from "../components/DialogApplication";

export default function DetailsJobHeader() {
  const [isFavourite, setIsFavourite] = useState(false);
  const { id } = useParams();
  const [openApplication, setOpenApplication] = useState(false);
  const [addFavouriteJob, { isLoading: addLoading }] =
    useAddFavouriteJobMutation();
  const [removeFavouriteJob, { isLoading: removeLoading }] =
    useRemoveFavouriteJobMutation();
  const { data: job } = useGetJobByIdQuery(id as string, { skip: !id });
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      const isFavourite = (
        user.listFavouritesJobsID as JobSaveResponse[]
      )?.some((job) => job._id === id);
      if (isFavourite) setIsFavourite(true);
    }
  }, [user, id]);

  const company = job?.data.companyId;
  const isString = typeof company === "string";

  const handleAddFavourite = async () => {
    if (!id) return;
    try {
      const response = await addFavouriteJob(id).unwrap();
      if (response.success) {
        toast.success(response.message);
        setIsFavourite(true);
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };

  const handleRemoveFavourite = async () => {
    if (!id) return;
    try {
      const response = await removeFavouriteJob(id).unwrap();
      if (response.success) {
        toast.success(response.message);
        setIsFavourite(false);
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };

  return (
    <Box sx={{ p: 3, borderBottom: 1, borderColor: "divider" }}>
      <Stack spacing={2}>
        <Typography variant="h4" fontWeight="bold">
          {job?.data?.title}
        </Typography>

        <Typography variant="h6" color="text.secondary">
          {isString ? company : company?.companyName}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Chip
            icon={<MonetizationOnIcon />}
            label={`${job?.data.minRange}$ - ${job?.data.maxRange}$`}
            color="success"
            sx={{
              fontSize: "1rem",
              height: 32,
              "& .MuiChip-icon": { color: "inherit" },
            }}
          />
          <Box>
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpenApplication(true)}
              sx={{
                bgcolor: "error.main",
                "&:hover": { bgcolor: "error.dark" },
                px: 4,
              }}
            >
              Ứng tuyển
            </Button>
            <IconButton
              onClick={isFavourite ? handleRemoveFavourite : handleAddFavourite}
              disabled={addLoading || removeLoading}
              sx={{
                border: 1,
                borderColor: "divider",
                "&:hover": { borderColor: "error.main" },
              }}
            >
              {isFavourite ? (
                <FavoriteIcon sx={{ color: "error.main" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "text.secondary" }} />
              )}
            </IconButton>
          </Box>
        </Stack>

        <DialogApplication
          handleClose={() => setOpenApplication(false)}
          title="Ứng tuyển cho vị trí"
          open={openApplication}
        />

        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: "grey.50",
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={3}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOnIcon color="action" />
              <Typography variant="body2" color="text.secondary">
                {job?.data?.location}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <WorkOutlineIcon color="action" />
              <Typography variant="body2" color="text.secondary">
                Tại công ty
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeIcon color="action" />
              <Typography variant="body2" color="text.secondary">
                {job?.data?.createdAt
                  ? formatDistanceToNow(new Date(job.data.createdAt), {
                      addSuffix: true,
                      locale: vi,
                    })
                  : "Đang tải..."}
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        <Box>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Kỹ năng yêu cầu
          </Typography>
          <ListOfRequirement
            listOfRequire={job?.data?.description.keySkills.bulletPoints}
          />
        </Box>
      </Stack>
    </Box>
  );
}
