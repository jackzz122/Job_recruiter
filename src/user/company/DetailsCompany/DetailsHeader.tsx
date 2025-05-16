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

export const DetailsHeader = () => {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const { id } = useParams<{ id: string }>();
  const { data: companyDetail } = useGetDetailCompanyQuery(id ?? "", {
    skip: !id,
  });
  const { data: jobs } = useGetJobPostingsQuery(id ?? "", {
    skip: !id,
  });
  const user = useSelector(selectUser);
  const [removeFavouriteCompany, { isLoading: removeLoading }] =
    useRemoveFavouriteCompanyMutation();
  const [addFavouriteCompany, { isLoading: addLoading }] =
    useAddFavouriteCompanyMutation();

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
      console.log(error);
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
      console.log(error);
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
    setReportReason("");
  };

  const handleSubmitReport = () => {
    // TODO: Implement report submission logic
    toast.success("Báo cáo đã được gửi thành công");
    handleCloseReportDialog();
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
            src={companyDetail?.data.logo || "/bss_avatar.png"}
            alt=""
            className="w-1/4 h-40 rounded-lg"
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
                <WorkOutlineOutlinedIcon /> {jobs?.data?.length} việc làm đang
                tuyển dụng
              </Typography>
            </Stack>
            <br />
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() =>
                  navigate(
                    `/writeReview?companyName=${companyDetail?.data.companyName}&companyId=${companyDetail?.data._id}`
                  )
                }
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  minWidth: "10rem",
                  padding: "0.75rem",
                }}
              >
                Viết đánh giá
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
                  Theo Dõi
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
                  Hủy Theo Dõi
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
                Báo cáo
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
          Báo cáo công ty
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2, color: "text.secondary" }}>
            Vui lòng cho chúng tôi biết lý do bạn muốn báo cáo công ty này.
            Chúng tôi sẽ xem xét báo cáo của bạn một cách cẩn thận.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Lý do báo cáo"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
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
            Hủy
          </Button>
          <Button
            onClick={handleSubmitReport}
            variant="contained"
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
            disabled={!reportReason.trim()}
          >
            Gửi báo cáo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
