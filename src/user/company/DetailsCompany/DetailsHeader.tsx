import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import Box from "@mui/material/Box";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetDetailCompanyQuery } from "../../../redux/feature/company/companyApiSlice";
import { useGetJobPostingsQuery } from "../../../redux/feature/job/jobApiSlice";
import {
  useAddFavouriteCompanyMutation,
  useRemoveFavouriteCompanyMutation,
} from "../../../redux/feature/user/userApiSlice";
import { handleError } from "../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
import { useEffect, useState } from "react";
import { CompanySaveResponse } from "../../../types/UserType";
import { useForm } from "react-hook-form";
import { useCreateReportMutation } from "../../../redux/feature/report/reportApiSlice";
import { targetType } from "../../../types/ReportType";
import { useGetCommentsQuery } from "../../../redux/feature/comment/commentApiSlice";
import { CommentType } from "../../../types/CommentType";

export const DetailsHeader = () => {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const { register, handleSubmit } = useForm<{
    reportTitle: string;
    reportReason: string;
  }>({
    defaultValues: {
      reportTitle: "",
      reportReason: "",
    },
  });
  const { id } = useParams<{ id: string }>();
  const { data: companyDetail } = useGetDetailCompanyQuery(id ?? "", {
    skip: !id,
  });
  const { data: jobs } = useGetJobPostingsQuery(id ?? "", {
    skip: !id,
  });
  const { data: comments } = useGetCommentsQuery(id ?? "", {
    skip: !id,
  });
  const user = useSelector(selectUser);
  const [removeFavouriteCompany, { isLoading: removeLoading }] =
    useRemoveFavouriteCompanyMutation();
  const [addFavouriteCompany, { isLoading: addLoading }] =
    useAddFavouriteCompanyMutation();
  const [createReport, { isLoading: createReportLoading }] =
    useCreateReportMutation();
  useEffect(() => {
    if (id && comments?.data && user?._id) {
      if (
        comments.data.some(
          (comment: CommentType) => comment?.account_id?._id === user._id
        )
      ) {
        setIsCommented(true);
      } else {
        setIsCommented(false);
      }
    }
  }, [comments, user, id]);
  const handleAddFavourite = async () => {
    if (!id) return;
    try {
      const response = await addFavouriteCompany(id).unwrap();
      if (response.success) {
        toast.success("Add favourite success");
        setIsFavourite(true);
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Add favourite failed");
    }
  };

  const handleRemoveFavourite = async () => {
    if (!id) return;
    try {
      const response = await removeFavouriteCompany(id).unwrap();
      if (response.success) {
        toast.success("Remove favourite success");
        setIsFavourite(false);
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Remove favourite failed");
    }
  };

  useEffect(() => {
    if (id) {
      if (
        (user?.listFavouritesCompanyID as CompanySaveResponse[])?.some(
          (job) => job._id === id
        )
      ) {
        setIsFavourite(true);
      }
    }
  }, [user, id]);

  const handleOpenReportDialog = () => {
    setOpenReportDialog(true);
  };

  const handleCloseReportDialog = () => {
    setOpenReportDialog(false);
  };

  const handleSubmitReport = async (data: {
    reportTitle: string;
    reportReason: string;
  }) => {
    try {
      const response = await createReport({
        target_id: companyDetail?.data.accountID ?? "",
        target_type: targetType.COMPANY,
        reportTarget: id as string,
        reason: {
          reasonTitle: data.reportTitle,
          additionalReason: data.reportReason,
        },
      }).unwrap();
      if (response.success) {
        toast.success("Report submitted successfully");
        handleCloseReportDialog();
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Stack
        justifyContent="space-between"
        direction="row"
        spacing={2}
        sx={{ marginTop: "1.5rem" }}
      >
        <Stack direction="row" spacing={2}>
          <img
            src={companyDetail?.data.logo || "/companyNotFound.png"}
            alt=""
            className="w-1/4 h-40 rounded-lg bg-white"
          />
          <Box sx={{ color: "white" }}>
            <Typography fontWeight="bold" variant="h5">
              {companyDetail?.data.companyName}
            </Typography>
            <Stack direction="row" spacing={3} sx={{ marginBlock: "0.75rem" }}>
              <Typography>
                {" "}
                <EditLocationAltOutlinedIcon />
                {companyDetail?.data.address}
              </Typography>
              <Typography>
                {" "}
                <WorkOutlineOutlinedIcon /> {jobs?.data?.length} jobs are hiring
              </Typography>
            </Stack>
            <br />
            <Stack direction="row" spacing={2}>
              <Button
                disabled={isCommented}
                onClick={() =>
                  navigate(
                    `/writeReview?companyName=${companyDetail?.data.companyName}&companyId=${companyDetail?.data._id}`
                  )
                }
                sx={{
                  textTransform: isCommented ? "none" : "uppercase",
                  backgroundColor: isCommented ? "gray" : "red",
                  color: "white",
                  minWidth: "10rem",
                }}
              >
                {isCommented ? "You already commented" : "Write Review"}
              </Button>
              {!isFavourite ? (
                <Button
                  onClick={handleAddFavourite}
                  loading={addLoading}
                  sx={{
                    backgroundColor: "white",
                    color: "red",
                    border: "1px solid red",
                    minWidth: "10rem",
                    padding: "0.75rem",
                  }}
                >
                  Follow
                </Button>
              ) : (
                <Button
                  onClick={handleRemoveFavourite}
                  loading={removeLoading}
                  sx={{
                    backgroundColor: "white",
                    color: "red",
                    border: "1px solid red",
                    minWidth: "10rem",
                    padding: "0.75rem",
                  }}
                >
                  Unfollow
                </Button>
              )}
              <Button
                onClick={handleOpenReportDialog}
                startIcon={<ReportProblemOutlinedIcon />}
                sx={{
                  backgroundColor: "white",
                  color: "red",
                  border: "1px solid red",
                  minWidth: "10rem",
                  padding: "0.75rem",
                }}
              >
                Report
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>

      <Dialog
        open={openReportDialog}
        onClose={handleCloseReportDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: "red", fontWeight: "bold" }}>
          Report Company
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2, color: "text.secondary" }}>
            Please let us know the reason you want to report this company. We
            will review your report carefully.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Report Title"
            type="text"
            fullWidth
            {...register("reportTitle", {
              required: true,
            })}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Report Reason"
            type="text"
            fullWidth
            multiline
            rows={4}
            {...register("reportReason", {
              required: true,
            })}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseReportDialog}
            sx={{
              color: "text.secondary",
              mr: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(handleSubmitReport)}
            variant="contained"
            loading={createReportLoading}
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
